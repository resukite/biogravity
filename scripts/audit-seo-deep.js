'use strict';
const fs = require('fs');
const path = require('path');

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'articles.json'), 'utf8'));
console.log('--- TITLE & META AUDIT (55 articles) ---');
let longSeo = 0, shortSeo = 0, missingQa = 0, badDesc = 0;

articles.forEach(a => {
  const seo = a.seoTitle || a.title;
  const desc = a.metaDescription || a.summary || '';
  if (seo.length > 65) {
    console.log(`LONG SEO TITLE (${seo.length}): ${a.id} -> "${seo}"`);
    longSeo++;
  } else if (seo.length < 30) {
    console.log(`SHORT SEO TITLE (${seo.length}): ${a.id} -> "${seo}"`);
    shortSeo++;
  }
  if (!a.quickAnswer) {
    missingQa++;
  }
  if (desc.length < 80 || desc.length > 165) {
    badDesc++;
  }
});

console.log(`\nSummary: Long SEO Titles: ${longSeo} | Short SEO Titles: ${shortSeo} | Missing QuickAnswer: ${missingQa} | Suboptimal Desc Length: ${badDesc}`);
