'use strict';

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_URL = 'https://biogravity.space';
const SITE_PROPERTY = 'sc-domain:biogravity.space'; // or 'https://biogravity.space/'

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const urls = [
  `${SITE_URL}/`,
  `${SITE_URL}/research`,
  `${SITE_URL}/about`,
  `${SITE_URL}/world-space-week-2026`,
  `${SITE_URL}/molecular-biology-research`,
  ...articles.map(a => `${SITE_URL}/articles/${a.id}`)
];

if (!fs.existsSync(KEY_PATH)) {
  console.log('======================================================================');
  console.log('🔑 GOOGLE SEARCH CONSOLE SERVICE ACCOUNT KEY NOT DETECTED');
  console.log('======================================================================\n');
  console.log('To allow Antigravity to automatically inspect, submit, and monitor');
  console.log('indexing and search performance, follow these 3 quick steps:\n');
  console.log('1. Go to Google Cloud Console (https://console.cloud.google.com)');
  console.log('   - Enable the "Google Search Console API" (and "Web Search Indexing API").');
  console.log('   - Go to "IAM & Admin" > "Service Accounts" > click "Create Service Account".');
  console.log('   - Name it "gsc-agent" and create it.');
  console.log('2. Create Key:');
  console.log('   - Click on the created service account > "Keys" tab > "Add Key" > "Create new key" (JSON).');
  console.log('   - Save the downloaded file as "gsc-key.json" in this project directory.');
  console.log('3. Add Service Account Email to Search Console:');
  console.log('   - Open Google Search Console > Settings > "Users and permissions"');
  console.log('   - Click "Add User" and paste the Service Account email address.');
  console.log('   - Set Permission to "Owner" (or "Full").\n');
  console.log('Once you drop "gsc-key.json" into this folder, run:');
  console.log('   node scripts/gsc-manager.js\n');
  process.exit(0);
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters', 'https://www.googleapis.com/auth/indexing']
  });

  const authClient = await auth.getClient();
  const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

  console.log('[GSC] 🚀 Connected to Google Search Console API!');

  // 1. Submit Sitemap
  try {
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_PROPERTY,
      feedpath: `${SITE_URL}/sitemap.xml`
    });
    console.log(`[GSC] ✅ Sitemap submitted successfully: ${SITE_URL}/sitemap.xml`);
  } catch (e) {
    // Try URL-prefix property if domain property throws
    try {
      await searchconsole.sitemaps.submit({
        siteUrl: `${SITE_URL}/`,
        feedpath: `${SITE_URL}/sitemap.xml`
      });
      console.log(`[GSC] ✅ Sitemap submitted to prefix property: ${SITE_URL}/sitemap.xml`);
    } catch (e2) {
      console.log(`[GSC] ℹ️ Sitemap submission notice: ${e2.message}`);
    }
  }

  // 2. Query Search Performance (Last 28 Days)
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000);
    const startDate = thirtyDaysAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    const perfRes = await searchconsole.searchanalytics.query({
      siteUrl: SITE_PROPERTY,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10
      }
    });

    console.log('\n[GSC] 📈 Top Search Queries (Last 28 Days):');
    if (perfRes.data.rows && perfRes.data.rows.length > 0) {
      perfRes.data.rows.forEach((r, i) => {
        console.log(`  ${i + 1}. "${r.keys[0]}" | Clicks: ${r.clicks} | Impressions: ${r.impressions} | CTR: ${(r.ctr * 100).toFixed(1)}% | Pos: ${r.position.toFixed(1)}`);
      });
    } else {
      console.log('  (No search clicks recorded yet - site is freshly indexed)');
    }
  } catch (e) {
    console.log(`[GSC] ℹ️ Performance query notice: ${e.message}`);
  }

  // 3. Inspect URLs
  console.log(`\n[GSC] 🔍 Inspecting Index Status for ${urls.length} live URLs...`);
  for (const u of urls.slice(0, 10)) { // GSC inspection quota
    try {
      const inspectRes = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: u,
          siteUrl: SITE_PROPERTY
        }
      });
      const result = inspectRes.data.inspectionResult;
      const coverage = result.indexStatusResult;
      console.log(`  • ${u}`);
      console.log(`    Status: ${coverage.verdict} | Coverage: ${coverage.coverageState}`);
      if (coverage.indexingState) console.log(`    Indexing State: ${coverage.indexingState}`);
    } catch (err) {
      console.log(`  • ${u}: ${err.message}`);
    }
  }
}

main().catch(console.error);
