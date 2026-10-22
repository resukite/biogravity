'use strict';

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

  const today = new Date();
  const startDate = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const endDate = today.toISOString().split('T')[0];

  console.log(`Analyzing GSC data from ${startDate} to ${endDate}...\n`);

  console.log('=== TOP QUERIES ===');
  const qRes = await sc.searchanalytics.query({
    siteUrl: SITE_PROPERTY,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 50
    }
  });
  console.log(JSON.stringify(qRes.data.rows || [], null, 2));

  console.log('\n=== TOP PAGES ===');
  const pRes = await sc.searchanalytics.query({
    siteUrl: SITE_PROPERTY,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 50
    }
  });
  console.log(JSON.stringify(pRes.data.rows || [], null, 2));

  console.log('\n=== QUERY + PAGE COMBINATIONS ===');
  const qpRes = await sc.searchanalytics.query({
    siteUrl: SITE_PROPERTY,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query', 'page'],
      rowLimit: 50
    }
  });
  console.log(JSON.stringify(qpRes.data.rows || [], null, 2));
}

main().catch(console.error);
