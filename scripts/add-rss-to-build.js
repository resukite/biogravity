'use strict';

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'build-seo.js');
let content = fs.readFileSync(file, 'utf8');

const target = "console.log(`[BUILD-SEO] ✅ Successfully generated clean sitemap.xml with ${articles.length + 7} canonical URLs!`);";

const rssCode = `console.log(\`[BUILD-SEO] ✅ Successfully generated clean sitemap.xml with \${articles.length + 7} canonical URLs!\`);

// =============================================================================
// 4B. GENERATE RSS 2.0 / ATOM SCIENTIFIC FEED (SYNDICATION & DISCOVERY)
// =============================================================================
console.log(\`[BUILD-SEO] 📡 Generating RSS 2.0 scientific feed...\`);

let rssXml = \`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>BioGravity - Quantum Biotechnology &amp; Orbital Life Sciences</title>
    <link>\${SITE_URL}/</link>
    <description>Open-access research dispatches on quantum enzymology, microgravity cell biology, and 3D organoid bioprinting in Low Earth Orbit.</description>
    <language>en-us</language>
    <lastBuildDate>\${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="\${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
\`;

articles.forEach(art => {
  const cleanUrl = \`\${SITE_URL}/articles/\${art.id}\`;
  const pubDate = new Date(art.publishedIso || TODAY).toUTCString();
  rssXml += \`    <item>
      <title>\${escapeXml(art.title)}</title>
      <link>\${cleanUrl}</link>
      <guid isPermaLink="true">\${cleanUrl}</guid>
      <pubDate>\${pubDate}</pubDate>
      <dc:creator>\${escapeXml(art.author || 'BioGravity Collective')}</dc:creator>
      <description>\${escapeXml(art.summary || art.metaDescription || '')}</description>
      <category>\${escapeXml(art.category || 'Science')}</category>
    </item>
\`;
});

rssXml += \`  </channel>
</rss>\\n\`;

fs.writeFileSync(path.join(__dirname, 'rss.xml'), rssXml, 'utf8');
fs.writeFileSync(path.join(__dirname, 'feed.xml'), rssXml, 'utf8');
console.log(\`[BUILD-SEO] ✅ Successfully generated rss.xml and feed.xml!\`);`;

if (!content.includes('GENERATE RSS 2.0')) {
  content = content.replace(target, rssCode);
  fs.writeFileSync(file, content, 'utf8');
  console.log('✅ Added RSS feed generation to build-seo.js');
} else {
  console.log('ℹ️ RSS generation already present in build-seo.js');
}
