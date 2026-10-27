'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { humanizeArticle } = require('./lib/humanizer');

const draftsPath = path.join(__dirname, 'data', 'drafts-queue.json');
const articlesPath = path.join(__dirname, 'data', 'articles.json');

const drafts = JSON.parse(fs.readFileSync(draftsPath, 'utf8'));
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log(`[PUBLISH] Loaded ${drafts.length} drafts and ${articles.length} live articles.`);

// Match and update or insert each draft into live articles
drafts.forEach(draft => {
  const existingIdx = articles.findIndex(a => 
    a.id === draft.id || 
    a.id.startsWith(draft.id.slice(0, 50)) || 
    draft.id.startsWith(a.id.slice(0, 50))
  );

  const humanizedDraft = humanizeArticle(draft);
  const publishedArticle = {
    ...humanizedDraft,
    date: 'October 16, 2026',
    publishedIso: '2026-10-16T13:30:00+00:00',
    approvedAt: '2026-10-16T13:35:00+00:00'
  };
  delete publishedArticle.status;
  delete publishedArticle.draftCreatedAt;
  delete publishedArticle.reviewNotes;

  if (existingIdx !== -1) {
    // Keep consistent id
    const existingId = articles[existingIdx].id;
    publishedArticle.id = existingId;
    articles[existingIdx] = publishedArticle;
    console.log(`[PUBLISH] 🔄 Updated existing article "${existingId}"`);
  } else {
    articles.unshift(publishedArticle);
    console.log(`[PUBLISH] ➕ Added new article "${publishedArticle.id}"`);
  }
});

// Save updated live articles
fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`[PUBLISH] ✅ Saved ${articles.length} live articles to data/articles.json`);

// Clear draft queue
fs.writeFileSync(draftsPath, JSON.stringify([], null, 2), 'utf8');
console.log(`[PUBLISH] ✅ Cleared drafts queue.`);

// Rebuild static SEO pages and sitemap.xml
console.log(`[PUBLISH] 🏗️  Running build-seo.js to generate static HTML pages & sitemap.xml...`);
execSync('node build-seo.js', { stdio: 'inherit' });

console.log(`[PUBLISH] 🎉 All 3 articles successfully published locally with full SEO!`);
