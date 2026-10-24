'use strict';

const fs = require('fs');
const path = require('path');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const locRegex = /<loc>(https:\/\/biogravity\.space[^<]+)<\/loc>/g;
const urls = [];
let match;
while ((match = locRegex.exec(sitemap)) !== null) {
  urls.push(match[1]);
}

console.log('====================================================');
console.log('📊 BIOGRAVITY.SPACE PAGE INVENTORY & INDEXING STATUS');
console.log('====================================================');
console.log(`Total Canonical URLs in sitemap.xml: ${urls.length}`);

const corePages = urls.filter(u => !u.includes('/articles/'));
const articlePages = urls.filter(u => u.includes('/articles/'));

console.log(`\n📌 Core Authority & Legal Hubs (${corePages.length}):`);
corePages.forEach(u => console.log(`   • ${u}`));

console.log(`\n🔬 Peer-Reviewed Research Dispatches (${articlePages.length}):`);
articlePages.forEach((u, i) => console.log(`   ${(i + 1).toString().padStart(2, ' ')}. ${u}`));

console.log('\n====================================================');
console.log('🔍 VERIFYING GOOGLE TAG & GA4 ON ALL CANONICAL PAGES');
console.log('====================================================');

let missingGA = 0;
let missingCookie = 0;
let missingContact = 0;

urls.forEach(u => {
  const urlPath = u.replace('https://biogravity.space', '');
  let filePath = path.join(__dirname, '..', urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath)) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    if (!html.includes('G-BSRJK4DMH7')) missingGA++;
    if (!html.includes('cookie-consent.js')) missingCookie++;
    if (!html.includes('/contact')) missingContact++;
  } else {
    console.error(`❌ Missing local file for URL: ${u} (checked: ${filePath})`);
  }
});

console.log(`Google Tag (G-BSRJK4DMH7) Missing: ${missingGA}`);
console.log(`Cookie Consent Banner Missing:     ${missingCookie}`);
console.log(`Contact Page Link Missing:         ${missingContact}`);
console.log('====================================================');
