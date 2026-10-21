'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const urls = [
  'https://biogravity.space/',
  'https://biogravity.space/research',
  'https://biogravity.space/about',
  'https://biogravity.space/sitemap.xml',
  'https://biogravity.space/robots.txt',
  ...articles.map(a => `https://biogravity.space/articles/${a.id}`)
];

console.log(`[MONITOR] 🔍 Checking health and indexability for ${urls.length} live URLs...`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let isNoIndex = false;
      const xRobots = res.headers['x-robots-tag'] || '';
      if (xRobots.toLowerCase().includes('noindex')) isNoIndex = true;

      resolve({
        url,
        status: res.statusCode,
        isIndexable: res.statusCode === 200 && !isNoIndex,
        xRobots: xRobots || 'none'
      });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message, isIndexable: false });
    });
  });
}

async function run() {
  const results = [];
  for (const u of urls) {
    const r = await checkUrl(u);
    results.push(r);
    const icon = r.isIndexable ? '✅' : '❌';
    console.log(`${icon} [HTTP ${r.status}] ${r.url}`);
  }

  const allPassed = results.every(r => r.isIndexable);
  console.log('\n[MONITOR] Summary:');
  console.log(`Total URLs Checked: ${results.length}`);
  console.log(`Indexable (HTTP 200, no noindex blocks): ${results.filter(r => r.isIndexable).length}/${results.length}`);
  if (allPassed) {
    console.log('🎉 100% of URLs are live, crawlable, and ready for Google indexing!');
  }
}

run();
