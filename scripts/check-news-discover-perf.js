'use strict';

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_PROPERTY = 'sc-domain:biogravity.space';

async function checkPerformance() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters']
  });
  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });

  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000);
  const startDate = thirtyDaysAgo.toISOString().split('T')[0];
  const endDate = today.toISOString().split('T')[0];

  console.log(`Querying GSC data from ${startDate} to ${endDate}...\n`);

  // 1. Check Discover Performance
  console.log('--- 1. GOOGLE DISCOVER PERFORMANCE ---');
  try {
    const discoverRes = await sc.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate,
        endDate,
        searchType: 'discover',
        dimensions: ['page']
      }
    });
    console.log('Discover rows:', discoverRes.data.rows || 'No Discover traffic yet.');
  } catch (e) {
    console.log('Discover Notice:', e.message);
  }

  // 2. Check Google News Search Performance
  console.log('\n--- 2. GOOGLE NEWS TAB PERFORMANCE ---');
  try {
    const newsRes = await sc.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate,
        endDate,
        searchType: 'news',
        dimensions: ['page']
      }
    });
    console.log('Google News rows:', newsRes.data.rows || 'No Google News tab traffic yet.');
  } catch (e) {
    console.log('Google News Notice:', e.message);
  }

  // 3. Check Web Search Performance for /news/ pages
  console.log('\n--- 3. WEB SEARCH PERFORMANCE FOR NEWS SECTION (/news) ---');
  try {
    const webNewsRes = await sc.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate,
        endDate,
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'page',
            operator: 'contains',
            expression: '/news'
          }]
        }],
        dimensions: ['page', 'query'],
        rowLimit: 20
      }
    });
    console.log('News section web performance:');
    if (webNewsRes.data.rows && webNewsRes.data.rows.length > 0) {
      webNewsRes.data.rows.forEach(r => {
        console.log(`Page: ${r.keys[0]} | Query: "${r.keys[1]}" | Clicks: ${r.clicks} | Impressions: ${r.impressions} | Pos: ${r.position.toFixed(1)}`);
      });
    } else {
      console.log('No web search queries/impressions for /news recorded yet in GSC (freshly indexed within the last 24-48 hours).');
    }
  } catch (e) {
    console.log('Web News Notice:', e.message);
  }

  // 4. Overall Site Web Performance
  console.log('\n--- 4. OVERALL SITE PERFORMANCE (LAST 28 DAYS) ---');
  try {
    const overallRes = await sc.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10
      }
    });
    if (overallRes.data.rows && overallRes.data.rows.length > 0) {
      overallRes.data.rows.forEach(r => {
        console.log(`Query: "${r.keys[0]}" | Clicks: ${r.clicks} | Impressions: ${r.impressions} | CTR: ${(r.ctr * 100).toFixed(1)}% | Avg Pos: ${r.position.toFixed(1)}`);
      });
    } else {
      console.log('No site queries recorded.');
    }
  } catch (e) {
    console.log('Overall Notice:', e.message);
  }
}

checkPerformance().catch(console.error);
