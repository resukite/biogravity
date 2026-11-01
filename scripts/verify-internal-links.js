'use strict';
const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '..', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html'));

let totalArticles = 0;
let totalContextualLinks = 0;
const linkTargetCounts = {};

files.forEach(f => {
  const content = fs.readFileSync(path.join(articlesDir, f), 'utf8');
  const bodyMatch = content.match(/<div id="article-body-content"[\s\S]*?<!-- (?:Dynamic )?Key Verified Findings/);
  if (bodyMatch) {
    totalArticles++;
    const matches = [...bodyMatch[0].matchAll(/<a href="(\/articles\/[^"]*)" class="text-teal-700 hover:text-teal-900 underline font-medium">/g)];
    totalContextualLinks += matches.length;
    matches.forEach(m => {
      const url = m[1];
      linkTargetCounts[url] = (linkTargetCounts[url] || 0) + 1;
    });
  }
});

console.log(`Audited ${totalArticles} article HTML files.`);
console.log(`Total contextual internal links active: ${totalContextualLinks}`);
console.log('Top linked article targets:');
Object.entries(linkTargetCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([url, count]) => {
    console.log(`  ${url}: ${count} incoming contextual links`);
  });
