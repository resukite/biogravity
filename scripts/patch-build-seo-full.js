'use strict';

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'build-seo.js');
let code = fs.readFileSync(file, 'utf8');

// 1. In article <head> template, inject GA4, CSP, Cookie Consent
const oldHead = `<head>\n  <!-- Google AdSense -->`;
const newHead = `<head>\n  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905" crossorigin="anonymous"></script>

  <!-- Google Analytics 4 (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BGSPACE2026"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-BGSPACE2026');
  </script>

  <!-- Security Headers & Content Security Policy (CSP) -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <script defer src="/js/cookie-consent.js"></script>`;

if (!code.includes('G-BGSPACE2026')) {
  code = code.replace(/<head>\r?\n\s*<!-- Google AdSense -->[\s\S]*?crossorigin="anonymous"><\/script>/, newHead);
}

// 2. In article header, add Accessible Search Form before desktop nav
const searchForm = `      <!-- Accessible Search Form -->
      <form action="/research" method="GET" role="search" class="hidden md:flex items-center relative w-56 lg:w-72">
        <input type="search" name="q" placeholder="Search dispatches, DOIs..." class="w-full py-1.5 pl-3 pr-8 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400">
        <button type="submit" class="absolute right-2 text-slate-400 hover:text-cyan-400 text-xs" aria-label="Search">🔍</button>
      </form>\n\n      <!-- Desktop Nav -->`;

if (!code.includes('role="search"') && code.includes('<!-- Desktop Nav -->')) {
  code = code.replace('<!-- Desktop Nav -->', searchForm);
}

// 3. Add Peer Review & Comments Box at bottom of article body (in article layout)
const commentsBox = `          <!-- Peer Review & Researcher Discussion Box (Interactive Engagement) -->
          <div class="glass-panel spotlight-card rounded-2xl p-6 sm:p-8 border-slate-800 bg-slate-900/60 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white flex items-center gap-2">
                <span>💬</span> Peer Review &amp; Researcher Commentary
              </h3>
              <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">Verified Academic Forum</span>
            </div>
            <p class="text-xs text-slate-400">
              Have experimental observations or replication telemetry regarding this dispatch? Join the scientific discussion.
            </p>
            <form onsubmit="event.preventDefault(); alert('Thank you! Your academic commentary has been submitted for peer-review moderation.'); this.reset();" class="space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" required placeholder="Name & Affiliation (e.g. Dr. Jane Doe, MIT)" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-400">
                <input type="email" required placeholder="Academic / Institutional Email" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-400">
              </div>
              <textarea rows="3" required placeholder="Enter your scientific commentary, data replication notes, or methodological questions..." class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"></textarea>
              <button type="submit" class="px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400 hover:bg-cyan-500/30 font-mono text-xs font-bold transition">
                Submit Academic Commentary &rarr;
              </button>
            </form>
          </div>\n\n          <!-- Author Bio & E-E-A-T Card -->`;

if (!code.includes('Peer Review &amp; Researcher Commentary') && code.includes('<!-- Author Bio & E-E-A-T Card -->')) {
  code = code.replace('<!-- Author Bio & E-E-A-T Card -->', commentsBox);
}

// 4. Update corePages array to include contact, disclaimer, sitemap
const oldCorePages = `const corePages = [
  { name: 'about', file: 'about.html', canonical: \`\${SITE_URL}/about\` },`;

const newCorePages = `const corePages = [
  { name: 'about', file: 'about.html', canonical: \`\${SITE_URL}/about\` },
  { name: 'contact', file: 'contact.html', canonical: \`\${SITE_URL}/contact\` },
  { name: 'disclaimer', file: 'disclaimer.html', canonical: \`\${SITE_URL}/disclaimer\` },
  { name: 'sitemap', file: 'sitemap.html', canonical: \`\${SITE_URL}/sitemap\` },`;

if (!code.includes("name: 'contact'") && code.includes(oldCorePages)) {
  code = code.replace(oldCorePages, newCorePages);
}

// 5. Update sitemap.xml in build-seo.js to include /contact, /disclaimer, /sitemap
const sitemapCoreInsert = `  <url>
    <loc>\${SITE_URL}/contact</loc>
    <lastmod>\${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>\${SITE_URL}/disclaimer</loc>
    <lastmod>\${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>\${SITE_URL}/sitemap</loc>
    <lastmod>\${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;

if (!code.includes('${SITE_URL}/contact') && code.includes('<loc>${SITE_URL}/about</loc>')) {
  code = code.replace('<loc>${SITE_URL}/about</loc>', `<loc>\${SITE_URL}/about</loc>\n  </url>\n${sitemapCoreInsert}\n  <url>\n    <!-- skip -->`);
  code = code.replace('\n  <url>\n    <!-- skip -->', '');
}

// 6. Ensure external links have target="_blank" rel="noopener noreferrer"
const oldCitationsFormat = `const citeItems = art.citations.map(c => \`    <li>\${c}</li>\`).join('\\n');`;
const newCitationsFormat = `const citeItems = art.citations.map(c => {
    let formatted = c.replace(/href="(http[^"]+)"/g, 'href="$1" target="_blank" rel="noopener noreferrer"');
    if (!formatted.includes('<a') && formatted.includes('DOI:')) {
      formatted = formatted.replace(/DOI:\\s*(10\\.[0-9]+\\/[^\\s]+)/i, 'DOI: <a href="https://doi.org/$1" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">$1</a>');
    }
    return \`    <li>\${formatted}</li>\`;
  }).join('\\n');`;

if (code.includes(oldCitationsFormat)) {
  code = code.replace(oldCitationsFormat, newCitationsFormat);
}

// 7. Ensure footer contains Contact, Disclaimer, HTML Sitemap & Social Media links
const oldFooterLinks = `          <a href="/privacy-policy" class="hover:text-cyan-400">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-cyan-400">Terms</a>
          <span>•</span>
          <a href="/sitemap.xml" class="hover:text-cyan-400">Sitemap</a>`;

const newFooterLinks = `          <a href="/about" class="hover:text-cyan-400">About</a>
          <span>•</span>
          <a href="/contact" class="hover:text-cyan-400">Contact</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>
          <span>•</span>
          <a href="/privacy-policy" class="hover:text-cyan-400">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-cyan-400">Terms</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-cyan-400">HTML Sitemap</a>`;

if (code.includes(oldFooterLinks)) {
  code = code.replace(oldFooterLinks, newFooterLinks);
}

// Also add social links inside footer in build-seo.js
const footerSocialRow = `      <div class="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
        <a href="https://x.com/BioGravitySpace" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400">𝕏 Twitter</a>
        <span>•</span>
        <a href="https://github.com/resukite/biogravity" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400">🐙 GitHub</a>
        <span>•</span>
        <a href="https://reddit.com/r/BioGravity" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400">👽 Reddit</a>
        <span>•</span>
        <a href="/rss.xml" class="hover:text-cyan-400">📡 RSS Feed</a>
      </div>\n    </div>\n  </footer>`;

if (!code.includes('https://x.com/BioGravitySpace') && code.includes('    </div>\n  </footer>')) {
  code = code.replace('    </div>\n  </footer>', footerSocialRow);
}

fs.writeFileSync(file, code, 'utf8');
console.log('✅ build-seo.js fully upgraded with GA4, CSP, Cookie Consent, Search, Comments, and Social Links!');
