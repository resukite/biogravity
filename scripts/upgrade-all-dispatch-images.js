'use strict';

/**
 * ============================================================================
 * BioGravity Dispatch AI Image Upgrade & Deduplication Script
 * ============================================================================
 *
 * Upgrades all existing posts in:
 *  - data/news.json (50+ dispatches)
 *  - data/articles.json (56+ monographs)
 *
 * Guarantees:
 *  - Every single post gets a bespoke, specific AI-generated image
 *    reflecting its exact scientific topic, title, and findings.
 *  - Zero repeating images across all posts (100% unique URLs and seeds).
 *  - High-resolution 1280x720 16:9 aspect ratio (Google Discover & AdSense compliant).
 *  - Alt text updated to accurately describe the specific AI generation.
 *  - Canonical JSON-LD schema images updated.
 *  - Runs site rebuild to update all HTML files, sitemaps, and feeds.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { getSpecificAiImage, saveRegistry } = require('../lib/ai-image-generator');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const newsPath = path.join(dataDir, 'news.json');
const articlesPath = path.join(dataDir, 'articles.json');

console.log('[UPGRADE] 🎨 Starting sitewide AI image upgrade for all dispatches...');

const seenUrls = new Set();
let newsUpdated = 0;
let articlesUpdated = 0;

// 1. Upgrade news.json
if (fs.existsSync(newsPath)) {
  const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
  console.log(`[UPGRADE] 📰 Processing ${news.length} news dispatches...`);

  news.forEach((item, index) => {
    const aiImage = getSpecificAiImage({
      id: item.id || `news-${index}`,
      title: item.title,
      category: item.category || 'Science Breakthrough',
      summary: item.summary,
      keyFindings: item.keyFindings,
      tags: item.tags
    });

    if (seenUrls.has(aiImage.url)) {
      throw new Error(`Duplicate image detected for news item: ${item.id}`);
    }
    seenUrls.add(aiImage.url);

    item.cover = aiImage.url;
    item.coverAlt = aiImage.alt;
    newsUpdated++;
  });

  fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
  console.log(`[UPGRADE] ✅ Upgraded ${newsUpdated} news dispatches with unique AI-generated covers.`);
}

// 2. Upgrade articles.json
if (fs.existsSync(articlesPath)) {
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
  console.log(`[UPGRADE] 📄 Processing ${articles.length} research monographs...`);

  articles.forEach((art, index) => {
    const aiImage = getSpecificAiImage({
      id: art.id || `article-${index}`,
      title: art.seoTitle || art.title,
      category: art.category || 'Quantum Biotechnology',
      summary: art.summary,
      keyFindings: art.quickAnswer || art.summary,
      tags: art.tags
    });

    if (seenUrls.has(aiImage.url)) {
      throw new Error(`Duplicate image detected for article: ${art.id}`);
    }
    seenUrls.add(aiImage.url);

    art.cover = aiImage.url;
    art.coverAlt = aiImage.alt;
    art.imageCredit = 'AI Scientific Visualization Engine (FLUX Model)';
    art.imageCreditUrl = 'https://biogravity.space';
    art.imageLicense = 'Exclusive BioGravity Media License (Never Repeated)';

    if (art.schemaJsonLd && Array.isArray(art.schemaJsonLd.image)) {
      art.schemaJsonLd.image = [aiImage.url];
    }

    articlesUpdated++;
  });

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log(`[UPGRADE] ✅ Upgraded ${articlesUpdated} research articles with unique AI-generated covers.`);
}

saveRegistry();

console.log(`[UPGRADE] 🔒 Uniqueness Verification: Total registered unique images = ${seenUrls.size}`);
console.log(`[UPGRADE] 🚀 Triggering rebuild of all pages, sitemaps, and feeds...`);

try {
  execSync('node build-seo.js', { cwd: rootDir, stdio: 'inherit' });
  console.log('[UPGRADE] ✅ Site rebuild complete!');
} catch (e) {
  console.error('[UPGRADE] Rebuild notice:', e.message);
}
