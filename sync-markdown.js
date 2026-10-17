'use strict';

const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, 'data', 'articles.json');
const articlesDir = path.join(__dirname, 'articles');

if (!fs.existsSync(articlesPath)) {
  console.error('articles.json not found!');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

articles.forEach(art => {
  const mdPath = path.join(articlesDir, art.id + '.md');
  const tagsYaml = (art.tags || []).map(t => `  - "${t.replace(/"/g, '\\"')}"`).join('\n');
  
  let body = art.content || '';
  body = body.replace(/<div[^>]*>/gi, '')
             .replace(/<\/div>/gi, '\n')
             .replace(/<section[^>]*>/gi, '\n')
             .replace(/<\/section>/gi, '\n')
             .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
             .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
             .replace(/<p[^>]*>/gi, '')
             .replace(/<\/p>/gi, '\n\n')
             .replace(/<span[^>]*>/gi, '')
             .replace(/<\/span>/gi, '')
             .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
             .replace(/<em>(.*?)<\/em>/gi, '*$1*')
             .replace(/&mu;/gi, 'μ')
             .replace(/&times;/gi, '×')
             .replace(/&approx;/gi, '≈')
             .replace(/&le;/gi, '≤')
             .replace(/&ge;/gi, '≥')
             .replace(/&plusmn;/gi, '±')
             .replace(/&Aring;/gi, 'Å')
             .replace(/&bull;/gi, '•')
             .replace(/&amp;/gi, '&')
             .replace(/&lt;/gi, '<')
             .replace(/&gt;/gi, '>');

  const md = [
    '---',
    `id: "${art.id}"`,
    `title: "${(art.title || '').replace(/"/g, '\\"')}"`,
    `category: "${art.category || 'Quantum Biotechnology'}"`,
    `summary: "${(art.summary || '').replace(/"/g, '\\"').replace(/\n/g, ' ')}"`,
    `author: "${art.author || 'Dr. Elena Rostova'}"`,
    `authorRole: "${art.authorRole || 'BioGravity Fellow'}"`,
    `authorOrcid: "${art.authorOrcid || ''}"`,
    `date: "${art.date || 'October 16, 2026'}"`,
    `publishedIso: "${art.publishedIso || '2026-10-16T13:30:00+00:00'}"`,
    `doi: "${art.doi || ''}"`,
    `readtime: "${art.readtime || '12 min read'}"`,
    `impact: ${art.impact || 9.0}`,
    `primaryKeyword: "${(art.primaryKeyword || '').replace(/"/g, '\\"')}"`,
    `metaDescription: "${(art.metaDescription || '').replace(/"/g, '\\"')}"`,
    `cover: "${art.cover || ''}"`,
    `coverAlt: "${(art.coverAlt || '').replace(/"/g, '\\"')}"`,
    'tags:',
    tagsYaml,
    '---',
    '',
    `# ${art.title}`,
    '',
    `**Author:** ${art.author} | **Affiliation:** ${art.authorOrg || 'BioGravity Institute'}  `,
    `**DOI:** [${art.doi}](https://doi.org/${art.doi}) | **Date:** ${art.date} | **Read Time:** ${art.readtime}`,
    '',
    '---',
    '',
    body.trim(),
    ''
  ].join('\n');

  fs.writeFileSync(mdPath, md, 'utf8');
  console.log(`[SYNC-MD] ✅ Created ${art.id}.md`);
});

console.log(`[SYNC-MD] Successfully converted all ${articles.length} articles to Markdown!`);
