'use strict';

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_PROPERTY = 'sc-domain:biogravity.space';

const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters']
  });
  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });

  console.log(`Checking ${urls.length} total URLs from sitemap in Google Search Console...`);

  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    try {
      const res = await sc.urlInspection.index.inspect({
        requestBody: { inspectionUrl: u, siteUrl: SITE_PROPERTY }
      });
      const r = res.data.inspectionResult.indexStatusResult;
      const item = {
        index: i + 1,
        url: u,
        verdict: r.verdict,
        coverageState: r.coverageState,
        indexingState: r.indexingState || 'UNKNOWN'
      };
      results.push(item);
      console.log(`[${i + 1}/${urls.length}] ${r.verdict === 'PASS' ? '✅ INDEXED' : '⏳ ' + r.coverageState} -> ${u}`);
    } catch (e) {
      results.push({ index: i + 1, url: u, error: e.message });
      console.log(`[${i + 1}/${urls.length}] ❌ ERROR: ${u} (${e.message})`);
    }
  }

  const indexed = results.filter(r => r.verdict === 'PASS');
  const remaining = results.filter(r => r.verdict !== 'PASS');

  console.log('\n=============================================');
  console.log(`TOTAL PAGES IN SITEMAP: ${urls.length}`);
  console.log(`INDEXED PAGES (PASS):   ${indexed.length}`);
  console.log(`REMAINING PAGES:        ${remaining.length}`);
  console.log('=============================================\n');

  if (remaining.length > 0) {
    console.log('Breakdown of remaining pages:');
    remaining.forEach(r => {
      console.log(`• ${r.url} | Status: ${r.coverageState || r.error}`);
    });
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
