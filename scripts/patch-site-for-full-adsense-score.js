'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

console.log('[PERFECTION-SUITE] 🚀 Starting 54-Point Full AdSense Compliance Patch...');

// 1. Tags to inject into all HTML <head>
const GA4_SNIPPET = `  <!-- Google Analytics 4 (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BSRJK4DMH7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-BSRJK4DMH7');
  </script>`;

const CSP_SECURITY_SNIPPET = `  <!-- Security Headers & Content Security Policy (CSP) -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <script defer src="/js/cookie-consent.js"></script>`;

// 2. Patch root HTML files
const htmlFiles = [
  'index.html',
  'about.html',
  'research.html',
  'privacy-policy.html',
  'terms.html',
  'contact.html',
  'disclaimer.html',
  'sitemap.html',
  'molecular-biology-research.html',
  'world-space-week-2026.html',
  'microgravity-effects-on-human-body.html',
  'article.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let html = fs.readFileSync(filePath, 'utf8');

  // Inject GA4 if missing
  if (!html.includes('G-BSRJK4DMH7')) {
    html = html.replace('<head>', `<head>\n${GA4_SNIPPET}`);
  }

  // Inject CSP & Cookie Consent if missing
  if (!html.includes('Content-Security-Policy')) {
    html = html.replace('<head>', `<head>\n${CSP_SECURITY_SNIPPET}`);
  }

  // Ensure cookie consent script is present
  if (!html.includes('/js/cookie-consent.js')) {
    html = html.replace('</head>', `  <script defer src="/js/cookie-consent.js"></script>\n</head>`);
  }

  // Ensure search form is present in desktop header
  if (!html.includes('role="search"') && html.includes('<header')) {
    const searchForm = `
      <!-- Accessible Search Form -->
      <form action="/research" method="GET" role="search" class="hidden md:flex items-center relative w-60 lg:w-72">
        <input type="search" name="q" placeholder="Search research dispatches..." class="w-full py-1.5 pl-3 pr-8 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400">
        <button type="submit" class="absolute right-2 text-slate-400 hover:text-cyan-400 text-xs" aria-label="Search">🔍</button>
      </form>`;
    
    // Inject before desktop nav
    html = html.replace(/(<nav\s+class="hidden md:flex)/i, `${searchForm}\n      $1`);
  }

  // Ensure social links are present in footer
  if (!html.includes('https://x.com/BioGravitySpace') && html.includes('<footer')) {
    const socialLinks = `
          <div class="mt-4 pt-3 border-t border-slate-800 flex gap-3 text-xs font-mono text-slate-400">
            <a href="https://x.com/BioGravitySpace" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400">𝕏 Twitter</a>
            <span>•</span>
            <a href="https://github.com/resukite/biogravity" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400">🐙 GitHub</a>
            <span>•</span>
            <a href="https://reddit.com/r/BioGravity" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400">👽 Reddit</a>
            <span>•</span>
            <a href="/rss.xml" class="hover:text-cyan-400">📡 RSS</a>
          </div>`;
    
    html = html.replace(/(<div>&copy; 2026 BioGravity Institute\. All rights reserved\.<\/div>)/i, `$1\n${socialLinks}`);
  }

  // Ensure contact, disclaimer, and sitemap are in footer links
  if (!html.includes('href="/disclaimer"')) {
    html = html.replace('href="/privacy-policy"', 'href="/contact" class="hover:text-cyan-400">Contact</a><span>•</span><a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a><span>•</span><a href="/sitemap" class="hover:text-cyan-400">Sitemap</a><span>•</span><a href="/privacy-policy"');
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Patched root file: ${file}`);
});

console.log('✅ All root HTML pages patched with GA4, CSP, Cookie Consent, Search, and Social Links!');
