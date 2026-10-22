'use strict';

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'build-seo.js');
let code = fs.readFileSync(file, 'utf8');

// 1. Add to corePages
if (!code.includes("'microgravity-effects-on-human-body'")) {
  code = code.replace(
    "{ name: 'molecular-biology-research', file: 'molecular-biology-research.html', canonical: `${SITE_URL}/molecular-biology-research` },",
    `{ name: 'molecular-biology-research', file: 'molecular-biology-research.html', canonical: \`\${SITE_URL}/molecular-biology-research\` },
  { name: 'microgravity-effects-on-human-body', file: 'microgravity-effects-on-human-body.html', canonical: \`\${SITE_URL}/microgravity-effects-on-human-body\` },`
  );
}

// 2. Add to sitemapXml
const sitemapEntry = `  <url>
    <loc>\${SITE_URL}/microgravity-effects-on-human-body</loc>
    <lastmod>\${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&amp;fit=crop&amp;w=1200&amp;q=80</image:loc>
      <image:title>Microgravity Effects on the Human Body: Space Medicine Guide</image:title>
    </image:image>
  </url>`;

if (!code.includes('/microgravity-effects-on-human-body</loc>')) {
  code = code.replace(
    '</image:image>\n  </url>\n  <url>\n    <loc>${SITE_URL}/about</loc>',
    `</image:image>\n  </url>\n${sitemapEntry}\n  <url>\n    <loc>\${SITE_URL}/about</loc>`
  );
}

fs.writeFileSync(file, code, 'utf8');
console.log('✅ Registered microgravity-effects-on-human-body into build-seo.js');
