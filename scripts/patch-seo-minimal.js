'use strict';

const fs = require('fs');

let seoJs = fs.readFileSync('build-seo.js', 'utf8');

// 1. Remove fake telemetry ticker from article template
const fakeTickerRegex = /<!-- Orbital Command Telemetry Bar -->[\s\S]*?<!-- Global Header Navigation -->/i;
if (fakeTickerRegex.test(seoJs)) {
  seoJs = seoJs.replace(fakeTickerRegex, '<!-- Global Header Navigation -->');
  console.log('✅ Removed fake telemetry HUD from article template in build-seo.js');
}

// 2. Add /tools to sitemap
if (!seoJs.includes('<loc>${SITE_URL}/tools</loc>')) {
  seoJs = seoJs.replace(
    '<loc>${SITE_URL}/research</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.95</priority>\n  </url>',
    `<loc>\${SITE_URL}/research</loc>
    <lastmod>\${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>\${SITE_URL}/tools</loc>
    <lastmod>\${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`
  );
  console.log('✅ Added /tools to canonical sitemap in build-seo.js');
}

// 3. Add Tools link to desktop nav in article template
if (!seoJs.includes('href="/tools" class="nav-link')) {
  seoJs = seoJs.replace(
    '<a href="/research" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Research Feed</a>',
    '<a href="/research" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Research</a>\n        <a href="/tools" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Tools</a>'
  );
  console.log('✅ Added Tools link to desktop nav in build-seo.js');
}

// 4. Update clean route generation for /tools/
if (!seoJs.includes("createCleanRoute('tools.html', 'tools')")) {
  seoJs = seoJs.replace(
    "createCleanRoute('contact.html', 'contact');",
    "createCleanRoute('contact.html', 'contact');\ncreateCleanRoute('tools.html', 'tools');"
  );
  console.log('✅ Added clean route generator for /tools/ in build-seo.js');
}

fs.writeFileSync('build-seo.js', seoJs, 'utf8');
console.log('✅ build-seo.js fully updated with minimal legit design!');
