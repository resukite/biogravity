'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const siteUrl = 'https://biogravity.space';

// Collect all HTML files
const coreHtmlFiles = [
  'index.html',
  'news.html',
  'research.html',
  'about.html',
  'contact.html',
  'tools.html',
  'disclaimer.html',
  'privacy-policy.html',
  'terms.html',
  'sitemap.html',
  'world-space-week-2026.html',
  'molecular-biology-research.html',
  'microgravity-effects-on-human-body.html'
];

const newsDir = path.join(rootDir, 'news');
const articlesDir = path.join(rootDir, 'articles');

const allFiles = [...coreHtmlFiles.map(f => path.join(rootDir, f))];

if (fs.existsSync(newsDir)) {
  fs.readdirSync(newsDir).forEach(f => {
    if (f.endsWith('.html') && f !== 'index.html') {
      allFiles.push(path.join(newsDir, f));
    }
  });
}

if (fs.existsSync(articlesDir)) {
  fs.readdirSync(articlesDir).forEach(f => {
    if (f.endsWith('.html') && f !== 'index.html') {
      allFiles.push(path.join(articlesDir, f));
    }
  });
}

console.log(`Starting Claude SEO Sitewide Audit across ${allFiles.length} pages...\n`);

const results = [];
let totalIssues = 0;

allFiles.forEach(filePath => {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  if (!fs.existsSync(filePath)) return;

  const html = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const warnings = [];

  // Check if it's an intentional redirect stub
  const isRedirectStub = html.includes('http-equiv="refresh"');
  if (isRedirectStub) {
    const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
    const hasNoIndex = robotsMatch && robotsMatch[1].includes('noindex');
    results.push({
      file: relPath,
      score: 100,
      title: 'Redirect Alias',
      canonical: 'Redirecting',
      schemaTypes: ['Redirect'],
      issues: hasNoIndex ? [] : ['Redirect stub missing noindex robots tag'],
      warnings: []
    });
    return;
  }

  // 1. Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) {
    issues.push('Missing <title> tag');
  } else if (title.length < 25) {
    warnings.push(`Short title (${title.length} chars): "${title}"`);
  } else if (title.length > 70) {
    warnings.push(`Long title (${title.length} chars): "${title}"`);
  }

  // 2. Meta Description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  if (!desc) {
    issues.push('Missing meta description');
  } else if (desc.length < 50) {
    warnings.push(`Short meta description (${desc.length} chars)`);
  } else if (desc.length > 170) {
    warnings.push(`Long meta description (${desc.length} chars)`);
  }

  // 3. Robots meta
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : '';
  if (!robots) {
    warnings.push('Missing meta robots');
  } else if (!robots.includes('max-image-preview:large')) {
    warnings.push('Robots missing max-image-preview:large (essential for Google Discover)');
  }

  // 4. Canonical
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const canonical = canonMatch ? canonMatch[1].trim() : '';
  if (!canonical) {
    issues.push('Missing canonical link tag');
  } else if (!canonical.startsWith('https://biogravity.space')) {
    issues.push(`Canonical URL domain mismatch: ${canonical}`);
  }

  // 5. OpenGraph
  const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);
  const ogUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"/i);

  if (!ogTitle) warnings.push('Missing og:title');
  if (!ogDesc) warnings.push('Missing og:description');
  if (!ogImage) warnings.push('Missing og:image');
  if (!ogUrl) warnings.push('Missing og:url');

  // 6. Twitter Card
  const twitterCard = html.match(/<meta\s+name="twitter:card"\s+content="([^"]*)"/i);
  if (!twitterCard) warnings.push('Missing twitter:card');

  // 7. Schema.org JSON-LD
  const schemaMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  let hasValidSchema = false;
  let schemaTypes = [];
  if (schemaMatches.length === 0) {
    issues.push('Missing Schema.org JSON-LD structured data');
  } else {
    schemaMatches.forEach(m => {
      try {
        const parsed = JSON.parse(m[1]);
        hasValidSchema = true;
        if (parsed['@type']) schemaTypes.push(parsed['@type']);
        if (parsed['@graph']) {
          parsed['@graph'].forEach(g => {
            if (g['@type']) schemaTypes.push(g['@type']);
          });
        }
      } catch (e) {
        issues.push(`Invalid JSON-LD schema syntax: ${e.message}`);
      }
    });
  }

  // 8. Heading Hierarchy
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  if (h1Matches.length === 0) {
    issues.push('Missing H1 heading');
  } else if (h1Matches.length > 1) {
    warnings.push(`Multiple H1 headings found (${h1Matches.length})`);
  }
  if (h2Matches.length === 0 && !relPath.includes('404')) {
    warnings.push('Missing H2 subheadings');
  }

  // 9. Images alt & dimensions
  const imgMatches = [...html.matchAll(/<img\s+([^>]*?)>/gi)];
  let imgsWithoutAlt = 0;
  let imgsWithoutDim = 0;
  imgMatches.forEach(img => {
    const attrs = img[1];
    if (!attrs.includes('alt=') || attrs.includes('alt=""')) {
      imgsWithoutAlt++;
    }
    if (!attrs.includes('width=') || !attrs.includes('height=')) {
      imgsWithoutDim++;
    }
  });

  if (imgsWithoutAlt > 0) warnings.push(`${imgsWithoutAlt} image(s) missing descriptive alt text`);
  if (imgsWithoutDim > 0) warnings.push(`${imgsWithoutDim} image(s) missing explicit width/height (causes CLS)`);

  const pageScore = Math.max(0, 100 - (issues.length * 15) - (warnings.length * 5));
  totalIssues += issues.length + warnings.length;

  results.push({
    file: relPath,
    score: pageScore,
    title,
    canonical,
    schemaTypes,
    issues,
    warnings
  });
});

console.log('--------------------------------------------------------------------------------');
console.log(`Audited ${results.length} total pages.`);
const averageScore = Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length);
console.log(`Average Claude SEO Health Score: ${averageScore}/100`);
console.log('--------------------------------------------------------------------------------\n');

// Group pages by issue severity
const pagesWithIssues = results.filter(r => r.issues.length > 0 || r.warnings.length > 0);
console.log(`Pages needing optimization: ${pagesWithIssues.length}/${results.length}`);

pagesWithIssues.slice(0, 15).forEach(p => {
  console.log(`\n📄 [${p.score}/100] ${p.file}`);
  p.issues.forEach(iss => console.log(`   ❌ ISSUE: ${iss}`));
  p.warnings.forEach(w => console.log(`   ⚠️ WARNING: ${w}`));
});

fs.writeFileSync(path.join(rootDir, 'data', 'claude-seo-audit-report.json'), JSON.stringify({
  timestamp: new Date().toISOString(),
  totalPages: results.length,
  averageScore,
  results
}, null, 2), 'utf8');

console.log(`\nFull audit report saved to data/claude-seo-audit-report.json`);
