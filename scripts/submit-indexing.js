'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://biogravity.space';
const HOST = 'biogravity.space';
const INDEXNOW_KEY = '7a9b3c4d5e6f708192a3b4c5d6e7f809';

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const urlList = [
  `${SITE_URL}/`,
  `${SITE_URL}/research`,
  `${SITE_URL}/world-space-week-2026`,
  `${SITE_URL}/molecular-biology-research`,
  `${SITE_URL}/about`,
  `${SITE_URL}/privacy-policy`,
  `${SITE_URL}/terms`,
  ...articles.map(a => `${SITE_URL}/articles/${a.id}`)
];

console.log(`[INDEXING] 🚀 Submitting ${urlList.length} clean URLs to Search Engines...`);

// 1. Submit to IndexNow (Bing, Yandex, Yahoo, Naver, Seznam)
function submitIndexNow() {
  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urlList
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`[INDEXNOW] ✅ Successfully submitted ${urlList.length} clean URLs to IndexNow! (Status: ${res.statusCode})`);
      } else {
        console.log(`[INDEXNOW] ℹ️ IndexNow response status: ${res.statusCode} ${body || '(Key validated on deploy)'}`);
      }
    });
  });

  req.on('error', (e) => {
    console.log(`[INDEXNOW] ⚠️ Notice: ${e.message}`);
  });

  req.write(payload);
  req.end();
}

// 2. Ping Google and Bing Sitemap endpoints
function pingSitemaps() {
  const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
  const googlePing = `https://www.google.com/ping?sitemap=${sitemapUrl}`;
  const bingPing = `https://www.bing.com/ping?sitemap=${sitemapUrl}`;

  https.get(googlePing, (res) => {
    console.log(`[GOOGLE] 📡 Google Sitemap Ping sent! (HTTP ${res.statusCode})`);
  }).on('error', (e) => {
    console.log(`[GOOGLE] ℹ️ Notice: ${e.message}`);
  });

  https.get(bingPing, (res) => {
    console.log(`[BING] 📡 Bing Sitemap Ping sent! (HTTP ${res.statusCode})`);
  }).on('error', (e) => {
    console.log(`[BING] ℹ️ Notice: ${e.message}`);
  });
}

submitIndexNow();
pingSitemaps();
