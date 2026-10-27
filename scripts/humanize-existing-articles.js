'use strict';

/**
 * ============================================================================
 * BioGravity Comprehensive Article Humanizer (scripts/humanize-existing-articles.js)
 * ============================================================================
 * Applies the blader/humanizer skill rules across all existing articles in
 * data/articles.json and data/drafts-queue.json, then rebuilds all static pages
 * and sitemaps via build-seo.js.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { humanizeArticle, humanizeText, humanizeHtml } = require('../lib/humanizer');

const ROOT_DIR = path.join(__dirname, '..');
const ARTICLES_JSON = path.join(ROOT_DIR, 'data', 'articles.json');
const DRAFTS_JSON = path.join(ROOT_DIR, 'data', 'drafts-queue.json');
const BACKUP_JSON = path.join(ROOT_DIR, 'data', 'articles.backup.json');

console.log('======================================================================');
console.log('🧬 BIOGRAVITY HUMANIZER ENGINE: UPGRADING EXISTING ARTICLES TO HUMAN PROSE');
console.log('======================================================================\n');

if (!fs.existsSync(ARTICLES_JSON)) {
  console.error('❌ data/articles.json not found!');
  process.exit(1);
}

// 1. Create safety backup
const rawArticles = fs.readFileSync(ARTICLES_JSON, 'utf8');
fs.writeFileSync(BACKUP_JSON, rawArticles, 'utf8');
console.log(`[BACKUP] 🛡️  Saved safety backup to ${path.relative(ROOT_DIR, BACKUP_JSON)}`);

const articles = JSON.parse(rawArticles);
console.log(`[HUMANIZER] 🔍 Loaded ${articles.length} existing articles for humanization.`);

let modifiedCount = 0;
let phrasesCleanedCount = 0;

const humanizedArticles = articles.map((art, idx) => {
  const originalJson = JSON.stringify(art);
  const upgraded = humanizeArticle(art);
  const upgradedJson = JSON.stringify(upgraded);

  if (originalJson !== upgradedJson) {
    modifiedCount++;
    console.log(`[HUMANIZED] ✨ [${idx + 1}/${articles.length}] "${upgraded.title || upgraded.seoTitle}"`);
  } else {
    console.log(`[UNCHANGED] ℹ️  [${idx + 1}/${articles.length}] "${art.title || art.seoTitle}"`);
  }

  return upgraded;
});

// 2. Save back to data/articles.json
fs.writeFileSync(ARTICLES_JSON, JSON.stringify(humanizedArticles, null, 2), 'utf8');
console.log(`\n[SAVE] ✅ Successfully saved ${humanizedArticles.length} humanized articles to data/articles.json (${modifiedCount} updated).`);

// 3. Humanize drafts-queue.json if present
if (fs.existsSync(DRAFTS_JSON)) {
  try {
    const rawDrafts = fs.readFileSync(DRAFTS_JSON, 'utf8');
    const drafts = JSON.parse(rawDrafts);
    if (Array.isArray(drafts) && drafts.length > 0) {
      const humanizedDrafts = drafts.map(d => humanizeArticle(d));
      fs.writeFileSync(DRAFTS_JSON, JSON.stringify(humanizedDrafts, null, 2), 'utf8');
      console.log(`[DRAFTS] ✅ Humanized ${humanizedDrafts.length} drafts in data/drafts-queue.json`);
    }
  } catch (e) {
    console.warn('[DRAFTS] ⚠️ Could not parse drafts queue:', e.message);
  }
}

// 4. Rebuild all static pages, schemas, and sitemaps via build-seo.js
console.log('\n[BUILD] 🔨 Rebuilding all static HTML dispatches, clean URLs, and sitemaps...');
try {
  execSync('node build-seo.js', { cwd: ROOT_DIR, stdio: 'inherit' });
  console.log('\n[BUILD] ✅ Rebuild completed successfully.');
} catch (e) {
  console.error('[BUILD] ❌ Error executing build-seo.js:', e.message);
}

console.log('\n======================================================================');
console.log(`🎉 COMPLETED: All ${humanizedArticles.length} articles are now free of AI writing tells and humanized!`);
console.log('======================================================================');
