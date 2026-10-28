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

  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000);
  const startDate = thirtyDaysAgo.toISOString().split('T')[0];
  const endDate = today.toISOString().split('T')[0];

  console.log(`=== PERFORMANCE DATA (${startDate} to ${endDate}) ===\n`);

  // 1. By Date
  const dateRes = await sc.searchanalytics.query({
    siteUrl: SITE_PROPERTY,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['date']
    }
  });

  console.log('--- DAILY TRAFFIC BREAKDOWN ---');
  let totalClicks = 0;
  let totalImpressions = 0;
  if (dateRes.data.rows && dateRes.data.rows.length > 0) {
    dateRes.data.rows.forEach(r => {
      console.log(`Date: ${r.keys[0]} | Clicks: ${r.clicks} | Impressions: ${r.impressions} | CTR: ${(r.ctr * 100).toFixed(1)}% | Avg Pos: ${r.position.toFixed(1)}`);
      totalClicks += r.clicks;
      totalImpressions += r.impressions;
    });
  } else {
    console.log('No daily rows recorded.');
  }
  console.log(`TOTALS -> Clicks: ${totalClicks}, Impressions: ${totalImpressions}\n`);

  // 2. By Page
  console.log('--- TOP PAGES ---');
  const pageRes = await sc.searchanalytics.query({
    siteUrl: SITE_PROPERTY,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 20
    }
  });
  if (pageRes.data.rows && pageRes.data.rows.length > 0) {
    pageRes.data.rows.forEach(r => {
      console.log(`Page: ${r.keys[0]} | Clicks: ${r.clicks} | Impressions: ${r.impressions} | CTR: ${(r.ctr * 100).toFixed(1)}% | Pos: ${r.position.toFixed(1)}`);
    });
  } else {
    console.log('No page data.');
  }

  // 3. By Country
  console.log('\n--- TOP COUNTRIES ---');
  const countryRes = await sc.searchanalytics.query({
    siteUrl: SITE_PROPERTY,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['country'],
      rowLimit: 10
    }
  });
  if (countryRes.data.rows && countryRes.data.rows.length > 0) {
    countryRes.data.rows.forEach(r => {
      console.log(`Country: ${r.keys[0]} | Clicks: ${r.clicks} | Impressions: ${r.impressions}`);
    });
  }

  // 4. By Device
  console.log('\n--- BY DEVICE ---');
  const deviceRes = await sc.searchanalytics.query({
    siteUrl: SITE_PROPERTY,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['device']
    }
  });
  if (deviceRes.data.rows && deviceRes.data.rows.length > 0) {
    deviceRes.data.rows.forEach(r => {
      console.log(`Device: ${r.keys[0]} | Clicks: ${r.clicks} | Impressions: ${r.impressions}`);
    });
  }

  // 5. Check Sitemaps
  console.log('\n--- SITEMAP SUBMISSIONS ---');
  try {
    const sitemapsRes = await sc.sitemaps.list({
      siteUrl: SITE_PROPERTY
    });
    if (sitemapsRes.data.sitemap) {
      sitemapsRes.data.sitemap.forEach(s => {
        console.log(`Sitemap: ${s.path} | Last Downloaded: ${s.lastDownloaded || 'N/A'} | Warnings: ${s.warnings || 0} | Errors: ${s.errors || 0}`);
      });
    } else {
      console.log('No sitemaps found.');
    }
  } catch (e) {
    console.log('Sitemaps query error:', e.message);
  }
}

main().catch(console.error);
