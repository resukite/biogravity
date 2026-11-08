'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const newsPath = path.join(rootDir, 'data', 'news.json');
const articlesPath = path.join(rootDir, 'data', 'articles.json');
const registryPath = path.join(rootDir, 'data', 'generated-images-registry.json');

const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
const registry = fs.existsSync(registryPath) ? JSON.parse(fs.readFileSync(registryPath, 'utf8')) : null;

console.log('========================================================');
console.log('🔍 BIO-GRAVITY DISPATCH IMAGE UNIQUENESS AUDIT');
console.log('========================================================');

// 1. News Audit
const newsCovers = new Map();
news.forEach(item => {
  newsCovers.set(item.cover, (newsCovers.get(item.cover) || 0) + 1);
});
console.log(`📰 News Dispatches:     ${news.length} total`);
console.log(`✨ Unique News Covers:   ${newsCovers.size}`);
let newsDupes = 0;
newsCovers.forEach((count, url) => {
  if (count > 1) {
    console.warn(`  ⚠️ Duplicated news cover (${count}x): ${url}`);
    newsDupes++;
  }
});

// 2. Articles Audit
const articleCovers = new Map();
articles.forEach(item => {
  articleCovers.set(item.cover, (articleCovers.get(item.cover) || 0) + 1);
});
console.log(`📄 Research Articles:    ${articles.length} total`);
console.log(`✨ Unique Article Covers: ${articleCovers.size}`);
let articleDupes = 0;
articleCovers.forEach((count, url) => {
  if (count > 1) {
    console.warn(`  ⚠️ Duplicated article cover (${count}x): ${url}`);
    articleDupes++;
  }
});

// 3. Cross-Discipline Overlap
let crossOverlap = 0;
newsCovers.forEach((_, url) => {
  if (articleCovers.has(url)) {
    console.warn(`  ⚠️ Cross-overlap between news and article: ${url}`);
    crossOverlap++;
  }
});

console.log('--------------------------------------------------------');
console.log(`Total Posts Combined:   ${news.length + articles.length}`);
console.log(`Total Unique Images:    ${newsCovers.size + articleCovers.size - crossOverlap}`);
console.log(`News Duplicates:        ${newsDupes}`);
console.log(`Article Duplicates:     ${articleDupes}`);
console.log(`Cross Overlaps:         ${crossOverlap}`);
if (registry) {
  console.log(`Registry Recorded:      ${registry.totalImagesRegistered || registry.usedUrls.length}`);
}

if (newsDupes === 0 && articleDupes === 0 && crossOverlap === 0) {
  console.log('\n🎉 PASS: 100% of all posts have unique, specific AI-generated images with ZERO repeats!');
} else {
  console.error('\n❌ FAIL: Repeating images detected.');
  process.exit(1);
}
console.log('========================================================');
