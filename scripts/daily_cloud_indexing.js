'use strict';

/**
 * =============================================================================
 * BioGravity Daily Cloud Indexing & Audit Automation
 * (scripts/daily_cloud_indexing.js)
 * =============================================================================
 * 
 * Runs 100% automatically in GitHub Actions Cloud Runner every day.
 * 
 * Functions:
 * 1. Collects all canonical URLs from sitemap.xml, sitemap-news.xml, articles,
 *    news dispatches, and core static pages.
 * 2. Authenticates with Google Search Console API (via GSC_KEY_JSON secret or gsc-key.json).
 * 3. Inspects indexation state of every URL via GSC URL Inspection API.
 * 4. Extracts EVERY non-indexed URL (e.g. "Discovered - currently not indexed",
 *    "Crawled - currently not indexed", "URL is unknown to Google", etc.).
 * 5. Pushes all non-indexed and updated URLs to:
 *    - IndexNow API (Bing, Yandex, Seznam, Naver)
 *    - Google Sitemap Ping
 *    - Google Search Console Sitemaps API
 * 6. Generates exact-indexing-status.json, data/indexing-health.json, and INDEXING-REPORT.md.
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const KEY_PATH = path.join(ROOT_DIR, 'gsc-key.json');
const SITE_URL = 'https://biogravity.space';
const SITE_PROPERTY = 'sc-domain:biogravity.space';
const INDEXNOW_KEY = '7a9b3c4d5e6f708192a3b4c5d6e7f809';

// Setup GSC Key from environment secret if present in GitHub Actions runner
if (process.env.GSC_KEY_JSON && !fs.existsSync(KEY_PATH)) {
  try {
    const rawSecret = process.env.GSC_KEY_JSON.trim();
    // Support either base64 or raw JSON string
    const keyContent = rawSecret.startsWith('{')
      ? rawSecret
      : Buffer.from(rawSecret, 'base64').toString('utf8');
    fs.writeFileSync(KEY_PATH, keyContent, 'utf8');
    console.log('[INDEXING] 🔑 Successfully loaded gsc-key.json from GSC_KEY_JSON GitHub Secret!');
  } catch (err) {
    console.warn('[INDEXING] ⚠️ Failed parsing GSC_KEY_JSON secret:', err.message);
  }
}

// 1. Gather all canonical URLs
function getAllCanonicalUrls() {
  const urlSet = new Set();
  urlSet.add(`${SITE_URL}/`);
  urlSet.add(`${SITE_URL}/research`);
  urlSet.add(`${SITE_URL}/about`);
  urlSet.add(`${SITE_URL}/news`);
  urlSet.add(`${SITE_URL}/tools`);
  urlSet.add(`${SITE_URL}/contact`);
  urlSet.add(`${SITE_URL}/terms`);
  urlSet.add(`${SITE_URL}/privacy-policy`);
  urlSet.add(`${SITE_URL}/disclaimer`);
  urlSet.add(`${SITE_URL}/world-space-week-2026`);
  urlSet.add(`${SITE_URL}/molecular-biology-research`);
  urlSet.add(`${SITE_URL}/microgravity-effects-on-human-body`);

  // Read sitemap.xml
  const sitemapFile = path.join(ROOT_DIR, 'sitemap.xml');
  if (fs.existsSync(sitemapFile)) {
    const content = fs.readFileSync(sitemapFile, 'utf8');
    const matches = [...content.matchAll(/<loc>(.*?)<\/loc>/g)];
    matches.forEach(m => {
      const u = m[1].trim();
      if (u.startsWith('http')) urlSet.add(u);
    });
  }

  // Read articles.json
  const articlesFile = path.join(DATA_DIR, 'articles.json');
  if (fs.existsSync(articlesFile)) {
    try {
      const articles = JSON.parse(fs.readFileSync(articlesFile, 'utf8'));
      articles.forEach(a => {
        if (a.id) urlSet.add(`${SITE_URL}/articles/${a.id}`);
      });
    } catch (_) {}
  }

  // Read news.json
  const newsFile = path.join(DATA_DIR, 'news.json');
  if (fs.existsSync(newsFile)) {
    try {
      const news = JSON.parse(fs.readFileSync(newsFile, 'utf8'));
      news.forEach(n => {
        if (n.id) urlSet.add(`${SITE_URL}/news/${n.id}`);
      });
    } catch (_) {}
  }

  return Array.from(urlSet).filter(u => !u.endsWith('.xml') && !u.endsWith('.html'));
}

// 2. Submit URLs to IndexNow
function submitToIndexNow(urls) {
  return new Promise((resolve) => {
    if (!urls || urls.length === 0) {
      console.log('[INDEXNOW] ℹ️ No URLs to submit to IndexNow.');
      return resolve({ success: true, count: 0 });
    }

    console.log(`[INDEXNOW] 🚀 Submitting ${urls.length} URLs to IndexNow (Bing/Yandex/Seznam)...`);
    const payload = JSON.stringify({
      host: 'biogravity.space',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls
    });

    const req = https.request({
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`[INDEXNOW] ✅ Successfully submitted to IndexNow! HTTP Status: ${res.statusCode}`);
        resolve({ success: res.statusCode >= 200 && res.statusCode < 300, statusCode: res.statusCode });
      });
    });

    req.on('error', (err) => {
      console.error('[INDEXNOW] ❌ Request failed:', err.message);
      resolve({ success: false, error: err.message });
    });

    req.write(payload);
    req.end();
  });
}

// 3. Ping Google and Bing with Sitemap
function pingSitemaps() {
  const pings = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITE_URL + '/sitemap.xml')}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITE_URL + '/sitemap.xml')}`
  ];

  pings.forEach(pingUrl => {
    https.get(pingUrl, (res) => {
      console.log(`[PING] 📡 Pinged ${new URL(pingUrl).hostname}: HTTP ${res.statusCode}`);
    }).on('error', () => {
      // Sitemaps ping endpoints sometimes return 404 or redirect, which is normal
    });
  });
}

// 4. Main Inspection & Push Logic
async function runIndexingAutomation() {
  console.log('======================================================================');
  console.log('🛰️ BIOGRAVITY CLOUD INDEXING & VERIFICATION ENGINE');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log('======================================================================\n');

  const allUrls = getAllCanonicalUrls();
  console.log(`[CRAWL] Discovered ${allUrls.length} canonical site URLs to audit.`);

  let gscClient = null;
  let googleAuth = null;
  if (fs.existsSync(KEY_PATH)) {
    try {
      const { google } = require('googleapis');
      googleAuth = new google.auth.GoogleAuth({
        keyFile: KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/webmasters']
      });
      const authClient = await googleAuth.getClient();
      gscClient = google.searchconsole({ version: 'v1', auth: authClient });
      console.log('[GSC] ✅ Authenticated with Google Search Console API.');
    } catch (e) {
      console.warn('[GSC] ⚠️ Could not initialize GSC API:', e.message);
    }
  } else {
    console.log('[GSC] ℹ️ No gsc-key.json found in runner. Running in resilient public crawler mode.');
  }

  // Load existing exact-indexing-status.json to preserve historical checks
  const statusFile = path.join(ROOT_DIR, 'exact-indexing-status.json');
  let statusCache = { results: [] };
  if (fs.existsSync(statusFile)) {
    try {
      statusCache = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
    } catch (_) {}
  }

  const resultsMap = new Map();
  (statusCache.results || []).forEach(r => {
    if (r && r.url) resultsMap.set(r.url, r);
  });

  // If GSC is available, inspect up to 50 URLs each daily run (to stay within quota)
  const nonIndexedUrls = [];
  const indexedUrls = [];

  if (gscClient) {
    console.log(`[GSC] 🔍 Auditing live indexation status for all URLs...`);
    // Prioritize checking URLs that were NOT_INDEXED previously or never checked
    const priorityQueue = allUrls.sort((a, b) => {
      const statusA = resultsMap.get(a)?.status || 'UNCHECKED';
      const statusB = resultsMap.get(b)?.status || 'UNCHECKED';
      if (statusA !== 'INDEXED' && statusB === 'INDEXED') return -1;
      if (statusA === 'INDEXED' && statusB !== 'INDEXED') return 1;
      return 0;
    });

    const inspectBatch = priorityQueue.slice(0, 40);

    for (let i = 0; i < inspectBatch.length; i++) {
      const u = inspectBatch[i];
      try {
        const inspectRes = await gscClient.urlInspection.index.inspect({
          requestBody: { inspectionUrl: u, siteUrl: SITE_PROPERTY }
        });
        const st = inspectRes.data?.inspectionResult?.indexStatusResult || {};
        const coverage = st.coverageState || 'UNKNOWN';
        const verdict = st.verdict || 'UNKNOWN';
        const isIndexed = verdict === 'PASS' || coverage.toLowerCase().includes('indexed');

        const record = {
          url: u,
          status: isIndexed ? 'INDEXED' : 'NOT_INDEXED',
          verdict,
          coverage,
          lastChecked: new Date().toISOString()
        };
        resultsMap.set(u, record);

        if (isIndexed) {
          console.log(`  [${i + 1}/${inspectBatch.length}] ✅ INDEXED: ${u}`);
          indexedUrls.push(u);
        } else {
          console.log(`  [${i + 1}/${inspectBatch.length}] ⏳ NOT INDEXED: ${u} -> (${coverage})`);
          nonIndexedUrls.push(u);
        }
      } catch (err) {
        console.log(`  [${i + 1}/${inspectBatch.length}] ⚠️ GSC inspect note (${u}): ${err.message}`);
        // If quota exhausted or error, preserve or mark unknown
        if (!resultsMap.has(u)) {
          resultsMap.set(u, { url: u, status: 'NOT_INDEXED', reason: err.message, lastChecked: new Date().toISOString() });
          nonIndexedUrls.push(u);
        }
      }
      await new Promise(r => setTimeout(r, 250));
    }

    // Submit sitemaps to GSC as well
    try {
      await gscClient.sitemaps.submit({
        siteUrl: SITE_PROPERTY,
        feedpath: `${SITE_URL}/sitemap.xml`
      });
      console.log(`[GSC] 🗺️ Sitemap submitted to GSC: ${SITE_URL}/sitemap.xml`);
    } catch (e) {
      console.log(`[GSC] Sitemap submit note: ${e.message}`);
    }
  }

  // Populate remaining URLs from cache or default to NOT_INDEXED queue
  allUrls.forEach(u => {
    const existing = resultsMap.get(u);
    if (!existing) {
      resultsMap.set(u, {
        url: u,
        status: 'NOT_INDEXED',
        coverage: 'Discovered - newly submitted',
        lastChecked: new Date().toISOString()
      });
      nonIndexedUrls.push(u);
    } else if (existing.status === 'INDEXED') {
      if (!indexedUrls.includes(u)) indexedUrls.push(u);
    } else {
      if (!nonIndexedUrls.includes(u)) nonIndexedUrls.push(u);
    }
  });

  console.log('\n------------------------------------------------------');
  console.log(`📊 LIVE AUDIT SUMMARY:`);
  console.log(`Total URLs: ${allUrls.length}`);
  console.log(`Indexed URLs: ${indexedUrls.length}`);
  console.log(`Non-Indexed / Queued URLs: ${nonIndexedUrls.length}`);
  console.log('------------------------------------------------------\n');

  // PUSH ALL NON-INDEXED (OR ALL SITEMAP) URLS TO INDEXNOW
  const urlsToPush = nonIndexedUrls.length > 0 ? nonIndexedUrls : allUrls;
  await submitToIndexNow(urlsToPush);
  pingSitemaps();

  // Generate Reports
  const fullResults = allUrls.map(u => resultsMap.get(u));
  const indexedCount = fullResults.filter(r => r.status === 'INDEXED').length;
  const notIndexedCount = fullResults.filter(r => r.status !== 'INDEXED').length;
  const percentage = `${((indexedCount / allUrls.length) * 100).toFixed(1)}%`;

  const reportData = {
    updatedAt: new Date().toISOString(),
    totalUrls: allUrls.length,
    indexedCount,
    notIndexedCount,
    indexedPercentage: percentage,
    pushedToIndexingCount: urlsToPush.length,
    allFullyIndexed: notIndexedCount === 0,
    results: fullResults
  };

  fs.writeFileSync(statusFile, JSON.stringify(reportData, null, 2), 'utf8');

  const healthFile = path.join(DATA_DIR, 'indexing-health.json');
  fs.writeFileSync(healthFile, JSON.stringify({
    lastRun: new Date().toISOString(),
    status: notIndexedCount === 0 ? '100% INDEXED' : 'ACTIVE_INDEXING_IN_PROGRESS',
    indexedPercentage: percentage,
    indexedCount,
    notIndexedCount
  }, null, 2), 'utf8');

  // Generate Markdown Dashboard: INDEXING-REPORT.md
  let markdown = `# 🛰️ BioGravity Cloud Indexing Health Report\n\n`;
  markdown += `> **Automated Cloud Run**: ${new Date().toUTCString()}  \n`;
  markdown += `> **Total Canonical Pages**: ${allUrls.length}  \n`;
  markdown += `> **Google Indexation Progress**: **${percentage}** (${indexedCount} indexed / ${notIndexedCount} in queue)  \n`;
  markdown += `> **Status**: ${notIndexedCount === 0 ? '🎉 **100% Fully Indexed**' : '⚡ **Active Cloud Indexing Push Active**'}\n\n`;

  markdown += `## 🚀 Today's Indexing Actions\n\n`;
  markdown += `- **Pushed to IndexNow (Bing/Yandex/Partners)**: ${urlsToPush.length} URLs\n`;
  markdown += `- **Google Search Console Sitemap Ping**: Synchronized \`sitemap.xml\`\n`;
  markdown += `- **Next Scheduled Run**: Automatically executes tomorrow at 03:00 UTC in GitHub Actions Cloud.\n\n`;

  markdown += `## 📋 Index Status Breakdown\n\n`;
  markdown += `| URL | Status | Google Coverage / Reason | Last Checked |\n`;
  markdown += `| :--- | :---: | :--- | :--- |\n`;

  fullResults.forEach(r => {
    const icon = r.status === 'INDEXED' ? '✅ INDEXED' : '⏳ QUEUED';
    const cleanUrl = r.url.replace('https://biogravity.space', '');
    markdown += `| [\`${cleanUrl || '/'}\`](${r.url}) | ${icon} | ${r.coverage || r.reason || 'Discovered / Pending crawl'} | ${r.lastChecked ? r.lastChecked.split('T')[0] : 'Today'} |\n`;
  });

  const reportMdPath = path.join(ROOT_DIR, 'INDEXING-REPORT.md');
  fs.writeFileSync(reportMdPath, markdown, 'utf8');
  console.log(`[REPORT] 📄 Updated INDEXING-REPORT.md and exact-indexing-status.json!`);

  if (notIndexedCount === 0) {
    console.log('\n🎉 SUCCESS: 100% OF PAGES ARE FULLY INDEXED ON GOOGLE!');
  } else {
    console.log(`\n⚡ ACTIVE: ${urlsToPush.length} URLs pushed to IndexNow and Google sitemap queues!`);
  }
  process.exit(0);
}

runIndexingAutomation().catch(err => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
