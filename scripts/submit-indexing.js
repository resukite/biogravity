'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://biogravity.space';
const HOST = 'biogravity.space';
const INDEXNOW_KEY = '7a9b3c4d5e6f708192a3b4c5d6e7f809';

const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

console.log(`[INDEXING] 🚀 Submitting ${urlList.length} clean URLs to IndexNow...`);

const payload = JSON.stringify({
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: urlList
});

function submitToEndpoint(hostname) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: hostname,
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
        resolve(res.statusCode);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  const endpoints = ['www.bing.com', 'api.indexnow.org'];
  for (const endpoint of endpoints) {
    try {
      const code = await submitToEndpoint(endpoint);
      console.log(`[INDEXNOW] ✅ Successfully submitted ${urlList.length} URLs via ${endpoint}! (HTTP ${code})`);
      process.exit(0);
    } catch (err) {
      console.warn(`[INDEXNOW] ⚠️ Notice from ${endpoint}: ${err.message}. Trying next endpoint...`);
    }
  }
  console.error('[INDEXNOW] ❌ All IndexNow endpoints failed.');
  process.exit(1);
}

run();
