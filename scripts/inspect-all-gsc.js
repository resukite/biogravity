'use strict';

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_PROPERTY = 'sc-domain:biogravity.space';

async function inspectAll() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters']
  });
  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });

  // Read sitemap to get all URLs
  const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

  console.log(`[GSC-INSPECT] Total URLs to inspect: ${urls.length}`);
  const report = [];

  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    try {
      const res = await sc.urlInspection.index.inspect({
        requestBody: { inspectionUrl: u, siteUrl: SITE_PROPERTY }
      });
      const r = res.data.inspectionResult;
      const st = r.indexStatusResult;
      const item = {
        url: u,
        verdict: st.verdict,
        coverageState: st.coverageState,
        indexingState: st.indexingState,
        robotsTxtState: st.robotsTxtState,
        userCanonical: st.userCanonical,
        googleCanonical: st.googleCanonical,
        pageFetchState: st.pageFetchState,
        lastCrawlTime: st.lastCrawlTime,
        referringUrls: st.referringUrls || []
      };
      report.push(item);
      console.log(`[${i + 1}/${urls.length}] [${st.verdict}] ${u} -> ${st.coverageState} (Fetch: ${st.pageFetchState || 'N/A'})`);
    } catch (e) {
      console.log(`[${i + 1}/${urls.length}] [ERR] ${u}: ${e.message}`);
      report.push({ url: u, error: e.message });
    }
    await new Promise(r => setTimeout(r, 200));
  }

  const outPath = path.join(__dirname, '..', 'gsc-inspection-report.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`\n[GSC-INSPECT] ✅ Saved full report to ${outPath}`);
}

inspectAll().catch(console.error);
