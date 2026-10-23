'use strict';
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'build-seo.js');
let code = fs.readFileSync(file, 'utf8');

const targetRegex = /const corePages = \[\r?\n\s*\{\s*name:\s*'about'[^\]]*\];/;

const newCorePages = `const corePages = [
  { name: 'about', file: 'about.html', canonical: \`\${SITE_URL}/about\` },
  { name: 'contact', file: 'contact.html', canonical: \`\${SITE_URL}/contact\` },
  { name: 'disclaimer', file: 'disclaimer.html', canonical: \`\${SITE_URL}/disclaimer\` },
  { name: 'sitemap', file: 'sitemap.html', canonical: \`\${SITE_URL}/sitemap\` },
  { name: 'world-space-week-2026', file: 'world-space-week-2026.html', canonical: \`\${SITE_URL}/world-space-week-2026\` },
  { name: 'molecular-biology-research', file: 'molecular-biology-research.html', canonical: \`\${SITE_URL}/molecular-biology-research\` },
  { name: 'microgravity-effects-on-human-body', file: 'microgravity-effects-on-human-body.html', canonical: \`\${SITE_URL}/microgravity-effects-on-human-body\` },
  { name: 'privacy-policy', file: 'privacy-policy.html', canonical: \`\${SITE_URL}/privacy-policy\` },
  { name: 'terms', file: 'terms.html', canonical: \`\${SITE_URL}/terms\` }
];`;

if (targetRegex.test(code)) {
  code = code.replace(targetRegex, newCorePages);
  fs.writeFileSync(file, code, 'utf8');
  console.log('✅ Added contact, disclaimer, and sitemap to corePages via regex!');
} else {
  console.log('Regex did not match');
}
