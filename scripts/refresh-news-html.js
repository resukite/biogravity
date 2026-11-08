'use strict';

const fs = require('fs');
const path = require('path');
const { SEOManager } = require('./live_news_engine');

const rootDir = path.join(__dirname, '..');
const newsJsonPath = path.join(rootDir, 'data', 'news.json');
const newsDir = path.join(rootDir, 'news');
const newsDatabase = JSON.parse(fs.readFileSync(newsJsonPath, 'utf8'));

console.log(`[NEWS-REFRESH] 🔄 Re-rendering ${newsDatabase.length} news pages with new AI covers...`);

for (const item of newsDatabase) {
  const itemHtml = SEOManager.compileNewsArticleHtml(item, newsDatabase);
  
  // Write news/<id>.html
  fs.writeFileSync(path.join(newsDir, `${item.id}.html`), itemHtml, 'utf8');

  // Write news/<id>/index.html for clean URL serving
  const singleDir = path.join(newsDir, item.id);
  if (!fs.existsSync(singleDir)) fs.mkdirSync(singleDir, { recursive: true });
  fs.writeFileSync(path.join(singleDir, 'index.html'), itemHtml, 'utf8');
}

// Render Central Live News Hub (/news.html & /news/index.html)
const hubHtml = SEOManager.compileNewsHubHtml(newsDatabase);
fs.writeFileSync(path.join(rootDir, 'news.html'), hubHtml, 'utf8');
fs.writeFileSync(path.join(newsDir, 'index.html'), hubHtml, 'utf8');

console.log('[NEWS-REFRESH] ✅ Successfully re-rendered all live news HTML pages and hubs with unique AI images!');
