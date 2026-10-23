'use strict';
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
  const filePath = path.join(rootDir, f);
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  // 1. Relative styles.css -> /css/styles.css
  html = html.replace(/href=["']css\/styles\.css["']/g, 'href="/css/styles.css"');

  // 2. Relative sitemap.xml -> /sitemap.xml
  html = html.replace(/href=["']sitemap\.xml["']/g, 'href="/sitemap.xml"');

  // 3. article.html in nav / footer -> /research
  html = html.replace(/href=["']article\.html["']/g, 'href="/research"');

  // 4. logo.png -> /logo.png
  html = html.replace(/href=["']logo\.png["']/g, 'href="/logo.png"');

  // 5. Client JS template strings with .html
  html = html.replace(/href=["']articles\/\$\{encodeURIComponent\(article\.id\)\}\.html["']/g, 'href="/articles/${encodeURIComponent(article.id)}"');
  html = html.replace(/href=["']\/articles\/\$\{encodeURIComponent\(article\.id\)\}\.html["']/g, 'href="/articles/${encodeURIComponent(article.id)}"');

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated root file: ${f}`);
  }
});

console.log('✅ All root HTML files sanitized!');
