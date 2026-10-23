'use strict';
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'build-seo.js');
let content = fs.readFileSync(file, 'utf8');

// 1. In researchHtml replacements:
const oldResearchBlock = `  researchHtml = researchHtml.replace(/href="terms\\.html"/g, 'href="/terms"');`;
const newResearchBlock = `  researchHtml = researchHtml.replace(/href="terms\\.html"/g, 'href="/terms"');
  researchHtml = researchHtml.replace(/href="article\\.html"/g, 'href="/research"');
  researchHtml = researchHtml.replace(/href="sitemap\\.xml"/g, 'href="/sitemap.xml"');
  researchHtml = researchHtml.replace(/href="css\\/styles\\.css"/g, 'href="/css/styles.css"');
  researchHtml = researchHtml.replace(/href="logo\\.png"/g, 'href="/logo.png"');
  researchHtml = researchHtml.replace(/href="articles\\/\\\$\\{encodeURIComponent\\(article\\.id\\)\\}\\\.html"/g, 'href="/articles/\${encodeURIComponent(article.id)}"');`;

if (content.includes(oldResearchBlock)) {
  content = content.replace(oldResearchBlock, newResearchBlock);
} else {
  console.log('Warning: oldResearchBlock not matched');
}

// 2. In corePages replacements:
const oldCoreBlock = `    content = content.replace(/href="terms\\.html"/g, 'href="/terms"');`;
const newCoreBlock = `    content = content.replace(/href="terms\\.html"/g, 'href="/terms"');
    content = content.replace(/href="article\\.html"/g, 'href="/research"');
    content = content.replace(/href="sitemap\\.xml"/g, 'href="/sitemap.xml"');
    content = content.replace(/href="css\\/styles\\.css"/g, 'href="/css/styles.css"');
    content = content.replace(/href="logo\\.png"/g, 'href="/logo.png"');
    content = content.replace(/href="articles\\/\\\$\\{encodeURIComponent\\(article\\.id\\)\\}\\\.html"/g, 'href="/articles/\${encodeURIComponent(article.id)}"');`;

if (content.includes(oldCoreBlock)) {
  content = content.replace(oldCoreBlock, newCoreBlock);
} else {
  console.log('Warning: oldCoreBlock not matched');
}

// 3. In indexHtml replacements:
const oldIndexBlock = `  indexHtml = indexHtml.replace(/href="terms\\.html"/g, 'href="/terms"');`;
const newIndexBlock = `  indexHtml = indexHtml.replace(/href="terms\\.html"/g, 'href="/terms"');
  indexHtml = indexHtml.replace(/href="article\\.html"/g, 'href="/research"');
  indexHtml = indexHtml.replace(/href="sitemap\\.xml"/g, 'href="/sitemap.xml"');
  indexHtml = indexHtml.replace(/href="css\\/styles\\.css"/g, 'href="/css/styles.css"');
  indexHtml = indexHtml.replace(/href="logo\\.png"/g, 'href="/logo.png"');`;

if (content.includes(oldIndexBlock)) {
  content = content.replace(oldIndexBlock, newIndexBlock);
} else {
  console.log('Warning: oldIndexBlock not matched');
}

// 4. In robotsTxt:
const oldRobotsBlock = `const robotsTxt = \`User-agent: *
Allow: /

# Dedicated Search Engine Crawlers`;

const newRobotsBlock = `const robotsTxt = \`User-agent: *
Allow: /

# Google AdSense Crawler
User-agent: Mediapartners-Google
Allow: /

# Dedicated Search Engine Crawlers`;

if (content.includes('User-agent: *') && !content.includes('Mediapartners-Google')) {
  content = content.replace(
    'User-agent: Googlebot\nAllow: /',
    '# Google AdSense Crawler\nUser-agent: Mediapartners-Google\nAllow: /\n\nUser-agent: Googlebot\nAllow: /'
  );
  if (!content.includes('Mediapartners-Google')) {
    content = content.replace(
      'User-agent: Googlebot\r\nAllow: /',
      '# Google AdSense Crawler\r\nUser-agent: Mediapartners-Google\r\nAllow: /\r\n\r\nUser-agent: Googlebot\r\nAllow: /'
    );
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('✅ build-seo.js updated successfully!');
