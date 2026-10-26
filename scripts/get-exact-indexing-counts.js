'use strict';

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_PROPERTY = 'sc-domain:biogravity.space';

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters']
  });
  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });

  const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

  console.log(`Inspecting all ${urls.length} live canonical URLs in Google Search Console...`);

  const results = {
    indexed: [],
    discoveredNotIndexed: [],
    crawledNotIndexed: [],
    unknownToGoogle: [],
    errors: []
  };

  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    try {
      const res = await sc.urlInspection.index.inspect({
        requestBody: { inspectionUrl: u, siteUrl: SITE_PROPERTY }
      });
      const st = res.data.inspectionResult.indexStatusResult;
      const coverage = st.coverageState || 'UNKNOWN';

      if (st.verdict === 'PASS' || coverage.toLowerCase().includes('indexed')) {
        results.indexed.push({ url: u, coverage });
        console.log(`[${i+1}/${urls.length}] ✅ INDEXED: ${u}`);
      } else if (coverage.toLowerCase().includes('discovered')) {
        results.discoveredNotIndexed.push({ url: u, coverage });
        console.log(`[${i+1}/${urls.length}] ⏳ DISCOVERED (Not Indexed): ${u}`);
      } else if (coverage.toLowerCase().includes('crawled')) {
        results.crawledNotIndexed.push({ url: u, coverage });
        console.log(`[${i+1}/${urls.length}] ⚠️ CRAWLED (Not Indexed): ${u}`);
      } else {
        results.unknownToGoogle.push({ url: u, coverage });
        console.log(`[${i+1}/${urls.length}] ❓ UNKNOWN TO GOOGLE: ${u}`);
      }
    } catch (e) {
      console.log(`[${i+1}/${urls.length}] ❌ Error ${u}: ${e.message}`);
      results.errors.push({ url: u, error: e.message });
    }
    // Rate limit buffer: 150ms
    await new Promise(r => setTimeout(r, 150));
  }

  const summary = {
    totalUrls: urls.length,
    indexedCount: results.indexed.length,
    notIndexedCount: results.discoveredNotIndexed.length + results.crawledNotIndexed.length + results.unknownToGoogle.length,
    breakdown: {
      indexed: results.indexed.length,
      discoveredNotIndexed: results.discoveredNotIndexed.length,
      crawledNotIndexed: results.crawledNotIndexed.length,
      unknownToGoogle: results.unknownToGoogle.length,
      errors: results.errors.length
    },
    details: results
  };

  fs.writeFileSync(path.join(__dirname, '..', 'indexing-count-report.json'), JSON.stringify(summary, null, 2));
  console.log('\n====================================');
  console.log(`TOTAL URLS: ${summary.totalUrls}`);
  console.log(`✅ INDEXED: ${summary.indexedCount} (${((summary.indexedCount / summary.totalUrls) * 100).toFixed(1)}%)`);
  console.log(`⏳ NOT INDEXED YET: ${summary.notIndexedCount} (${((summary.notIndexedCount / summary.totalUrls) * 100).toFixed(1)}%)`);
  console.log(`   - Discovered (queued in crawl backlog): ${summary.breakdown.discoveredNotIndexed}`);
  console.log(`   - Crawled (pending indexing evaluation): ${summary.breakdown.crawledNotIndexed}`);
  console.log(`   - Unknown to Google (fresh URLs): ${summary.breakdown.unknownToGoogle}`);
  console.log('====================================');
}

main().catch(console.error);
