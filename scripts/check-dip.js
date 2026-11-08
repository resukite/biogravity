'use strict';
const { google } = require('googleapis');
const path = require('path');
const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_PROPERTY = 'sc-domain:biogravity.space';

async function checkDip() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters']
  });
  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });

  for (const date of ['2026-11-04', '2026-11-05', '2026-11-06']) {
    const res = await sc.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate: date,
        endDate: date,
        dimensions: ['page'],
        rowLimit: 10
      }
    });
    console.log(`\n=== Date: ${date} ===`);
    let imp = 0, clk = 0;
    (res.data.rows || []).forEach(r => {
      imp += r.impressions;
      clk += r.clicks;
      console.log(`  ${r.impressions} imp | ${r.clicks} clk | Pos: ${r.position.toFixed(1)} | ${r.keys[0].replace('https://biogravity.space', '')}`);
    });
  }
}
checkDip();
