'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');
const { google } = require('googleapis');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const KEY_PATH = path.join(ROOT_DIR, 'gsc-key.json');
const SITE_URL = 'https://biogravity.space';
const SITE_PROPERTY = 'sc-domain:biogravity.space';
const INDEXNOW_KEY = '7a9b3c4d5e6f708192a3b4c5d6e7f809';

console.log('======================================================================');
console.log('🚀 BIOGRAVITY COMPLETE INDEXING & ADSENSE REMEDIATION ENGINE');
console.log('======================================================================\n');

// ----------------------------------------------------------------------------
// STEP 1: Deduplicate data/news.json
// ----------------------------------------------------------------------------
console.log('[STEP 1] 🧹 Deduplicating data/news.json...');
const newsJsonPath = path.join(DATA_DIR, 'news.json');
if (fs.existsSync(newsJsonPath)) {
  const rawNews = JSON.parse(fs.readFileSync(newsJsonPath, 'utf8'));
  const uniqueMap = new Map();
  for (const item of rawNews) {
    if (item && item.id && !uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  }
  const cleanNews = Array.from(uniqueMap.values());
  fs.writeFileSync(newsJsonPath, JSON.stringify(cleanNews, null, 2), 'utf8');
  console.log(`[STEP 1] ✅ Deduplicated news.json: ${rawNews.length} items -> ${cleanNews.length} unique stories.`);
}

// ----------------------------------------------------------------------------
// STEP 2: Patch Schema .html URLs in static pages
// ----------------------------------------------------------------------------
console.log('\n[STEP 2] 🔧 Normalizing schema and canonical URLs across pillar pages...');
const targetPages = [
  'world-space-week-2026.html',
  'molecular-biology-research.html',
  'microgravity-effects-on-human-body.html',
  'tools.html',
  'contact.html',
  'disclaimer.html'
];

targetPages.forEach(fileName => {
  const filePath = path.join(ROOT_DIR, fileName);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace any .html URLs in schema / canonical / links with clean URLs
  html = html.replace(/https:\/\/biogravity\.space\/world-space-week-2026\.html/g, 'https://biogravity.space/world-space-week-2026');
  html = html.replace(/https:\/\/biogravity\.space\/molecular-biology-research\.html/g, 'https://biogravity.space/molecular-biology-research');
  html = html.replace(/https:\/\/biogravity\.space\/microgravity-effects-on-human-body\.html/g, 'https://biogravity.space/microgravity-effects-on-human-body');
  html = html.replace(/https:\/\/biogravity\.space\/about\.html/g, 'https://biogravity.space/about');
  html = html.replace(/https:\/\/biogravity\.space\/research\.html/g, 'https://biogravity.space/research');
  html = html.replace(/https:\/\/biogravity\.space\/news\.html/g, 'https://biogravity.space/news');
  html = html.replace(/https:\/\/biogravity\.space\/tools\.html/g, 'https://biogravity.space/tools');
  html = html.replace(/https:\/\/biogravity\.space\/contact\.html/g, 'https://biogravity.space/contact');
  html = html.replace(/https:\/\/biogravity\.space\/disclaimer\.html/g, 'https://biogravity.space/disclaimer');
  html = html.replace(/https:\/\/biogravity\.space\/privacy-policy\.html/g, 'https://biogravity.space/privacy-policy');
  html = html.replace(/https:\/\/biogravity\.space\/terms\.html/g, 'https://biogravity.space/terms');

  fs.writeFileSync(filePath, html, 'utf8');

  // Also sync subdirectory index.html if it exists
  const slug = fileName.replace(/\.html$/, '');
  const dirPath = path.join(ROOT_DIR, slug);
  if (fs.existsSync(dirPath)) {
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf8');
  }
  console.log(`[STEP 2] ✅ Cleaned ${fileName} and ${slug}/index.html`);
});

// ----------------------------------------------------------------------------
// STEP 3: Rebuild Site, Sitemaps, Feeds via build-seo.js
// ----------------------------------------------------------------------------
console.log('\n[STEP 3] 🏗️ Rebuilding site, clean sitemaps, and RSS via build-seo.js...');
try {
  execSync('node build-seo.js', { cwd: ROOT_DIR, stdio: 'inherit' });
  console.log('[STEP 3] ✅ Full build-seo.js executed cleanly.');
} catch (e) {
  console.error('[STEP 3] ❌ Error running build-seo.js:', e.message);
}

// ----------------------------------------------------------------------------
// STEP 4: Verify Zero Duplicates in sitemap.xml
// ----------------------------------------------------------------------------
console.log('\n[STEP 4] 🧐 Verifying sitemap.xml integrity...');
const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const urlSet = new Set(sitemapUrls);
console.log(`[STEP 4] Total sitemap URLs: ${sitemapUrls.length} | Unique URLs: ${urlSet.size}`);
if (sitemapUrls.length === urlSet.size) {
  console.log('🎉 100% CLEAN: ZERO duplicate URLs in sitemap.xml!');
} else {
  console.warn(`⚠️ Warning: ${sitemapUrls.length - urlSet.size} duplicates still present.`);
}

// ----------------------------------------------------------------------------
// STEP 5: Submit Sitemaps to Google Search Console API
// ----------------------------------------------------------------------------
async function submitToGSC() {
  console.log('\n[STEP 5] 📡 Submitting Clean Sitemaps to Google Search Console API...');
  if (!fs.existsSync(KEY_PATH)) {
    console.log('[STEP 5] ⚠️ gsc-key.json not found, skipping direct API submission.');
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_PATH,
      scopes: ['https://www.googleapis.com/auth/webmasters']
    });
    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

    // Submit sitemap.xml
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_PROPERTY,
      feedpath: `${SITE_URL}/sitemap.xml`
    });
    console.log(`[STEP 5] ✅ Main Sitemap submitted to GSC: ${SITE_URL}/sitemap.xml`);

    // Submit sitemap-news.xml
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_PROPERTY,
      feedpath: `${SITE_URL}/sitemap-news.xml`
    });
    console.log(`[STEP 5] ✅ News Sitemap submitted to GSC: ${SITE_URL}/sitemap-news.xml`);
  } catch (err) {
    console.error(`[STEP 5] ⚠️ GSC Submission notice:`, err.message);
  }
}

// ----------------------------------------------------------------------------
// STEP 6: Submit All URLs to IndexNow (Bing, Yandex, Seznam, Naver)
// ----------------------------------------------------------------------------
async function submitIndexNow(urlList) {
  console.log(`\n[STEP 6] ⚡ Submitting ${urlList.length} unique URLs to IndexNow API...`);
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      host: 'biogravity.space',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urlList
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
        console.log(`[STEP 6] ✅ IndexNow submission complete! HTTP Status: ${res.statusCode} ${res.statusMessage}`);
        resolve();
      });
    });

    req.on('error', (err) => {
      console.error('[STEP 6] ⚠️ IndexNow error:', err.message);
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

// ----------------------------------------------------------------------------
// STEP 7: Ping Google and Bing sitemap endpoints
// ----------------------------------------------------------------------------
async function pingSearchEngines() {
  console.log('\n[STEP 7] 🔔 Pinging Google & Bing sitemap ping endpoints...');
  const pingTargets = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`,
    `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-news.xml`)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`
  ];

  for (const target of pingTargets) {
    await new Promise((resolve) => {
      https.get(target, (res) => {
        console.log(`[STEP 7] 📡 Ping -> ${target} (HTTP ${res.statusCode})`);
        resolve();
      }).on('error', (err) => {
        console.log(`[STEP 7] ℹ️ Ping notice: ${err.message}`);
        resolve();
      });
    });
  }
}

// ----------------------------------------------------------------------------
// MAIN EXECUTION FLOW
// ----------------------------------------------------------------------------
async function main() {
  await submitToGSC();
  await submitIndexNow(Array.from(urlSet));
  await pingSearchEngines();

  console.log('\n======================================================================');
  console.log('🎉 INDEXING & ADSENSE REMEDIATION COMPLETE!');
  console.log('======================================================================\n');
}

main().catch(console.error);
