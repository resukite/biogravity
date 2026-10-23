'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = [];

function getHtmlFiles(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === '.git' || f === '.system_generated') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) getHtmlFiles(full);
    else if (f.endsWith('.html')) htmlFiles.push(full);
  }
}
getHtmlFiles(rootDir);

console.log(`Auditing links in ${htmlFiles.length} HTML files...`);

const broken = [];
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Strip script and style tags to only audit actual HTML markup DOM elements
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  const matches = [...content.matchAll(/href=["']([^"']+)["']/g)];
  for (const m of matches) {
    const link = m[1].trim();

    // Skip anchors, mailto, tel, JS, external links, and template expressions
    if (link.startsWith('#') || 
        link.startsWith('http://') || 
        link.startsWith('https://') || 
        link.startsWith('mailto:') || 
        link.startsWith('tel:') || 
        link.startsWith('javascript:') ||
        link.startsWith('data:') ||
        link.includes('${')) {
      continue;
    }

    // Clean query/hash
    const clean = link.split('?')[0].split('#')[0];
    if (!clean) continue;

    // Check if target exists
    let target = clean.startsWith('/') ? path.join(rootDir, clean.slice(1)) : path.join(path.dirname(file), clean);
    
    // Check possible resolutions:
    // 1. Exact path (e.g. css/styles.css, logo.png, sitemap.xml)
    // 2. target + .html
    // 3. target/index.html
    const exists = fs.existsSync(target) ||
                   fs.existsSync(target + '.html') ||
                   (fs.existsSync(target) && fs.statSync(target).isDirectory() && fs.existsSync(path.join(target, 'index.html'))) ||
                   fs.existsSync(path.join(target, 'index.html'));

    if (!exists) {
      broken.push({ file: path.relative(rootDir, file), link, target });
    }
  }
});

console.log('\nAudit complete:');
if (broken.length === 0) {
  console.log('✅ ZERO broken internal links detected! Every link resolves to a valid file or directory.');
} else {
  console.log(`⚠️ Found ${broken.length} potentially broken links:`);
  broken.forEach(b => console.log(`  File: ${b.file} -> href="${b.link}"`));
}
