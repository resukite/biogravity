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
    console.log(`[INDEXNOW] ✅ Successfully submitted ${urlList.length} URLs! (HTTP ${res.statusCode})`);
    process.exit(0);
  });
});

req.on('error', (err) => {
  console.error('[INDEXNOW] ❌ Request error:', err.message);
  process.exit(1);
});

req.write(payload);
req.end();
