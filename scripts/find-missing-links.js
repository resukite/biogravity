'use strict';
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const arts = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'articles.json'), 'utf8'));
const buildSeo = fs.readFileSync(path.join(rootDir, 'build-seo.js'), 'utf8');

const match = buildSeo.match(/const CONTEXTUAL_KEYWORD_LINKS = (\[[\s\S]*?\]);/);
if (!match) {
  console.log('CONTEXTUAL_KEYWORD_LINKS not found');
  process.exit(1);
}

const currentLinks = eval(match[1]);
const linkedTargets = new Set(currentLinks.map(l => l.url.replace('/articles/', '')));

const missing = arts.filter(a => !linkedTargets.has(a.id));
console.log(`Total articles: ${arts.length}, Targeted: ${linkedTargets.size}, Missing: ${missing.length}`);
missing.forEach(m => {
  console.log(`- ${m.id} (Category: ${m.category}, Title: ${m.title})`);
});
