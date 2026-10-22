'use strict';

const fs = require('fs');
const path = require('path');

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'articles.json'), 'utf8'));

console.log('=== ARTICLES SEO AUDIT ===');
articles.forEach((a, i) => {
  const faqCount = a.faqs ? a.faqs.length : 0;
  const title = a.title || '';
  const desc = a.metaDescription || a.summary || '';
  console.log(`[${i + 1}] ID: ${a.id}`);
  console.log(`    Title (${title.length} chars): "${title}"`);
  console.log(`    Desc (${desc.length} chars): "${desc.slice(0, 80)}..."`);
  console.log(`    FAQs: ${faqCount} | Keywords: ${a.tags ? a.tags.join(', ') : 'none'}`);
});
