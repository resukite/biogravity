'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlFiles = [];

function getHtml(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'skills' || e.name === 'embed') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) getHtml(full);
    else if (e.name.endsWith('.html')) htmlFiles.push(full);
  }
}
getHtml(root);

console.log('Total HTML files to inspect:', htmlFiles.length);

const issues = [];

for (const f of htmlFiles) {
  const rel = path.relative(root, f);
  if (rel.includes('.system_generated')) continue;
  
  const content = fs.readFileSync(f, 'utf8');
  
  // 1. Check title
  if (!content.includes('<title>') || !content.includes('</title>')) {
    issues.push({ file: rel, issue: 'Missing <title> tag' });
  }

  // 2. Check meta description
  if (!content.includes('name="description"') && !content.includes("name='description'")) {
    issues.push({ file: rel, issue: 'Missing meta description' });
  }

  // 3. Check canonical
  if (!content.includes('rel="canonical"') && !content.includes("rel='canonical'")) {
    issues.push({ file: rel, issue: 'Missing canonical link tag' });
  }

  // 4. Check AdSense script
  if (!content.includes('ca-pub-8576621614388905')) {
    issues.push({ file: rel, issue: 'Missing AdSense script ca-pub-8576621614388905' });
  }

  // 5. Check OpenGraph
  if (!content.includes('property="og:title"') && !content.includes("property='og:title'")) {
    issues.push({ file: rel, issue: 'Missing og:title' });
  }

  // 6. Check JSON-LD schema
  if (!content.includes('application/ld+json')) {
    issues.push({ file: rel, issue: 'Missing JSON-LD structured data' });
  }

  // 7. Check max-image-preview:large for Google Discover
  if (!content.includes('max-image-preview:large') && !rel.includes('404.html')) {
    issues.push({ file: rel, issue: 'Missing max-image-preview:large for Google Discover' });
  }
}

console.log('Total issues found across all pages:', issues.length);
const grouped = {};
for (const i of issues) {
  grouped[i.issue] = (grouped[i.issue] || 0) + 1;
}
console.log('Issue breakdown:\n', JSON.stringify(grouped, null, 2));

if (issues.length > 0) {
  console.log('\nAll affected files:');
  issues.forEach(i => console.log('  ' + i.file + ' -> ' + i.issue));
}
