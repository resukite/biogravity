'use strict';

const fs = require('fs');
const path = require('path');

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'articles.json'), 'utf8'));
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const researchHtml = fs.readFileSync(path.join(__dirname, '..', 'research.html'), 'utf8');
const sitemapXml = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');

console.log('=== BIOGRAVITY SEO AUDIT: INDEXING & RANKING DIAGNOSIS ===\n');

// 1. Check sitemap presence
const inSitemap = articles.filter(a => sitemapXml.includes('/articles/' + a.id));
console.log(`Articles in sitemap.xml: ${inSitemap.length} / ${articles.length}`);

// 2. Check homepage links
const onHomepage = articles.filter(a => indexHtml.includes('/articles/' + a.id));
console.log(`Articles linked directly from Homepage (index.html): ${onHomepage.length} / ${articles.length}`);

// 3. Check research.html links
const onResearch = articles.filter(a => researchHtml.includes('/articles/' + a.id));
console.log(`Articles linked directly from Research page (research.html): ${onResearch.length} / ${articles.length}`);

// 4. Word count & Content Quality Breakdown
const stats = articles.map(a => {
  let text = '';
  if (a.content) text += ' ' + a.content;
  if (Array.isArray(a.sections)) {
    a.sections.forEach(s => text += ' ' + (s.html || ''));
  }
  if (Array.isArray(a.faqs)) {
    a.faqs.forEach(f => text += ' ' + f.question + ' ' + f.answer);
  }
  const cleanText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = cleanText ? cleanText.split(' ').length : 0;
  
  // Check headings
  const h2Count = (text.match(/<h2/gi) || []).length;
  const h3Count = (text.match(/<h3/gi) || []).length;
  const hasFaq = Array.isArray(a.faqs) && a.faqs.length > 0;
  const hasTakeaways = Array.isArray(a.keyTakeaways) && a.keyTakeaways.length > 0;
  
  // Internal cross-linking in body
  const internalLinks = (text.match(/href=["']\/articles\//gi) || []).length;

  return {
    id: a.id,
    title: a.title,
    primaryKeyword: a.primaryKeyword || '',
    words,
    h2Count,
    h3Count,
    hasFaq,
    hasTakeaways,
    internalLinks
  };
});

const thinArticles = stats.filter(s => s.words < 600);
const moderateArticles = stats.filter(s => s.words >= 600 && s.words < 1200);
const deepArticles = stats.filter(s => s.words >= 1200);

console.log(`\nContent Depth Analysis:`);
console.log(`  - Thin (< 600 words): ${thinArticles.length} (HIGH risk for "Crawled - not indexed")`);
console.log(`  - Moderate (600 - 1200 words): ${moderateArticles.length}`);
console.log(`  - Comprehensive (> 1200 words): ${deepArticles.length}`);

const zeroInternalLinks = stats.filter(s => s.internalLinks === 0);
console.log(`\nInternal Linking in Body Content:`);
console.log(`  - Articles with 0 contextual in-body links: ${zeroInternalLinks.length} / ${articles.length}`);

// Let's check target keywords and search intent alignment
console.log(`\nSearch Intent Sample:`);
stats.slice(0, 10).forEach(s => {
  console.log(`  • "${s.title.substring(0, 50)}..."`);
  console.log(`    Target Keyword: "${s.primaryKeyword}" | Words: ${s.words} | In-body Links: ${s.internalLinks}`);
});
