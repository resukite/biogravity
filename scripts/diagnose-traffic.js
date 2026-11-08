'use strict';

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_PROPERTY = 'sc-domain:biogravity.space';

async function main() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_PATH,
      scopes: ['https://www.googleapis.com/auth/webmasters']
    });
    const client = await auth.getClient();
    const sc = google.searchconsole({ version: 'v1', auth: client });

    const today = new Date();
    // Query last 60 days
    const startDate = new Date(today.getTime() - 60 * 24 * 3600 * 1000).toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    console.log(`[DIAGNOSE] Querying GSC for ${SITE_PROPERTY} from ${startDate} to ${endDate}...`);

    // 1. Daily Trend
    const dailyRes = await sc.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 100
      }
    });

    console.log('\n=== 1. DAILY PERFORMANCE TREND ===');
    const dailyRows = dailyRes.data.rows || [];
    if (dailyRows.length === 0) {
      console.log('No daily data returned.');
    } else {
      let totalImp = 0, totalClicks = 0;
      dailyRows.forEach(r => {
        totalImp += r.impressions;
        totalClicks += r.clicks;
        console.log(`${r.keys[0]} | Imp: ${r.impressions.toString().padStart(4)} | Clicks: ${r.clicks.toString().padStart(3)} | CTR: ${(r.ctr * 100).toFixed(1)}% | AvgPos: ${r.position.toFixed(1)}`);
      });
      console.log(`\nTOTAL (60 Days): ${totalImp} Impressions, ${totalClicks} Clicks`);
    }

    // 2. Top Queries (Recent 14 days vs Previous 14 days)
    const recentStart = new Date(today.getTime() - 14 * 24 * 3600 * 1000).toISOString().split('T')[0];
    const prevStart = new Date(today.getTime() - 28 * 24 * 3600 * 1000).toISOString().split('T')[0];

    const topQueriesRes = await sc.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 50
      }
    });

    console.log('\n=== 2. TOP QUERIES (OVERALL) ===');
    const queries = topQueriesRes.data.rows || [];
    queries.slice(0, 25).forEach((q, idx) => {
      console.log(`${(idx + 1).toString().padStart(2)}. "${q.keys[0]}" | Imp: ${q.impressions} | Clicks: ${q.clicks} | CTR: ${(q.ctr * 100).toFixed(1)}% | Pos: ${q.position.toFixed(1)}`);
    });

    // 3. Top Pages
    const topPagesRes = await sc.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 30
      }
    });

    console.log('\n=== 3. TOP PAGES BY IMPRESSIONS ===');
    const pages = topPagesRes.data.rows || [];
    pages.slice(0, 20).forEach((p, idx) => {
      console.log(`${(idx + 1).toString().padStart(2)}. ${p.keys[0]} | Imp: ${p.impressions} | Clicks: ${p.clicks} | CTR: ${(p.ctr * 100).toFixed(1)}% | Pos: ${p.position.toFixed(1)}`);
    });

    // 4. Query + Page combination for top queries
    const queryPageRes = await sc.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 30
      }
    });
    console.log('\n=== 4. TOP QUERY -> PAGE MAPPINGS ===');
    (queryPageRes.data.rows || []).slice(0, 15).forEach((qp, idx) => {
      console.log(`${idx + 1}. Query: "${qp.keys[0]}" -> Page: ${qp.keys[1]} (Imp: ${qp.impressions}, Clicks: ${qp.clicks}, Pos: ${qp.position.toFixed(1)})`);
    });

    // 5. Save raw diagnosis to file
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'gsc-diagnosis.json'), JSON.stringify({
      dailyRows,
      queries,
      pages,
      timestamp: new Date().toISOString()
    }, null, 2));

    console.log('\nSaved full diagnosis to data/gsc-diagnosis.json');
  } catch (err) {
    console.error('[DIAGNOSE] Error:', err.message);
  }
}

main();
