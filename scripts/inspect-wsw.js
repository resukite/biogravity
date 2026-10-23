'use strict';

const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_PROPERTY = 'sc-domain:biogravity.space';
const URL = 'https://biogravity.space/world-space-week-2026';

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters']
  });
  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });

  const res = await sc.urlInspection.index.inspect({
    requestBody: { inspectionUrl: URL, siteUrl: SITE_PROPERTY }
  });

  console.log(JSON.stringify(res.data.inspectionResult, null, 2));
}

main().catch(console.error);
