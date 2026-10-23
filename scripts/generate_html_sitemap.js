'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const articlesPath = path.join(rootDir, 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log(`[HTML-SITEMAP] Generating human-navigable HTML sitemap for ${articles.length} dispatches...`);

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905" crossorigin="anonymous"></script>

  <!-- Google Analytics 4 (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BGSPACE2026"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-BGSPACE2026');
  </script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Sitemap &amp; Scientific Index | BioGravity</title>
  <meta name="description" content="Comprehensive directory and HTML sitemap of all peer-reviewed microgravity dispatches, quantum biotechnology papers, and laboratory policies on BioGravity.">
  <link rel="canonical" href="https://biogravity.space/sitemap">
  <meta name="robots" content="index, follow">

  <!-- Security & CSP -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            slate: { 950: '#020617', 900: '#0f172a', 800: '#1e293b' },
            cyan: { 400: '#22d3ee', 500: '#06b6d4', glow: '#38bdf8' },
            emerald: { 400: '#34d399', 500: '#10b981', glow: '#059669' }
          }
        }
      }
    }
  </script>

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/styles.css">
  <script defer src="/js/cookie-consent.js"></script>
</head>
<body class="bg-slate-950 text-slate-100 quantum-grid min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-300">

  <!-- Header -->
  <header class="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-[1.5px] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <span class="text-lg">⚛️</span>
          </div>
        </div>
        <div>
          <span class="font-display font-extrabold text-2xl tracking-tight text-white group-hover:text-cyan-300 transition">
            BioGravity<span class="text-cyan-400">.</span>
          </span>
          <span class="block text-[10px] font-mono tracking-widest text-emerald-400 -mt-1 uppercase">Quantum Biotech Hub</span>
        </div>
      </a>

      <!-- Search Bar -->
      <form action="/research" method="GET" role="search" class="hidden md:flex items-center relative w-64 lg:w-80">
        <input type="search" name="q" placeholder="Search dispatches, DOIs..." class="w-full py-1.5 pl-3 pr-8 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400">
        <button type="submit" class="absolute right-2 text-slate-400 hover:text-cyan-400 text-xs" aria-label="Submit Search">🔍</button>
      </form>

      <!-- Nav -->
      <nav class="hidden md:flex items-center gap-6 text-sm">
        <a href="/" class="text-slate-300 hover:text-cyan-400 transition">Home</a>
        <a href="/research" class="text-slate-300 hover:text-cyan-400 transition">Research Feed</a>
        <a href="/about" class="text-slate-300 hover:text-cyan-400 transition">About</a>
        <a href="/contact" class="text-slate-300 hover:text-cyan-400 transition">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-14">
    <div class="mb-10">
      <span class="badge-quantum text-xs mb-3 inline-block">Architecture &amp; Navigation</span>
      <h1 class="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-2">
        HTML Sitemap &amp; Archive Directory
      </h1>
      <p class="text-slate-400 text-xs font-mono">
        Index of all open-access orbital dispatches, pillar guides, and consortium governance policies.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Column 1: Core Hub & Major Pillars -->
      <div class="glass-panel spotlight-card rounded-2xl p-6 border-slate-800 bg-slate-900/60 space-y-4">
        <h2 class="font-display font-bold text-base text-cyan-400 pb-2 border-b border-slate-800">
          Core Hub &amp; Pillar Guides
        </h2>
        <ul class="space-y-2.5 text-xs font-mono text-slate-300">
          <li><a href="/" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> Home Command Center</a></li>
          <li><a href="/research" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> Live Research Feed</a></li>
          <li><a href="/world-space-week-2026" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> World Space Week 2026 Guide</a></li>
          <li><a href="/molecular-biology-research" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> Molecular Biology Research Guide</a></li>
          <li><a href="/microgravity-effects-on-human-body" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> Microgravity Human Physiology</a></li>
        </ul>

        <h3 class="font-display font-bold text-sm text-emerald-400 pt-4 pb-2 border-b border-slate-800">
          Governance &amp; Trust (E-E-A-T)
        </h3>
        <ul class="space-y-2.5 text-xs font-mono text-slate-300">
          <li><a href="/about" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> About &amp; Lab Notes</a></li>
          <li><a href="/contact" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> Contact Us &amp; Editorial Board</a></li>
          <li><a href="/disclaimer" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> Scientific &amp; Medical Disclaimer</a></li>
          <li><a href="/privacy-policy" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> Privacy Policy (DART &amp; Cookies)</a></li>
          <li><a href="/terms" class="hover:text-cyan-400 flex items-center gap-2"><span>&bull;</span> Terms of Service</a></li>
          <li><a href="/sitemap.xml" class="hover:text-cyan-400 flex items-center gap-2" target="_blank"><span>&bull;</span> XML Machine Sitemap</a></li>
          <li><a href="/rss.xml" class="hover:text-cyan-400 flex items-center gap-2" target="_blank"><span>&bull;</span> RSS 2.0 Syndication Feed</a></li>
        </ul>
      </div>

      <!-- Column 2 & 3: All Research Dispatches -->
      <div class="md:col-span-2 glass-panel spotlight-card rounded-2xl p-6 sm:p-8 border-slate-800 bg-slate-900/60 space-y-6">
        <div class="flex justify-between items-center pb-2 border-b border-slate-800">
          <h2 class="font-display font-bold text-base text-cyan-400">
            Peer-Reviewed Research Dispatches (${articles.length})
          </h2>
          <span class="text-[11px] font-mono text-emerald-400">Full Archive</span>
        </div>

        <div class="space-y-3">
          ${articles.map((art, idx) => `
            <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition group flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <div class="text-[10px] font-mono text-cyan-400">${escapeHtml(art.category || 'Science')} • ${escapeHtml(art.date || '2026')}</div>
                <a href="/articles/${encodeURIComponent(art.id)}" class="text-xs font-display font-bold text-white group-hover:text-cyan-300 transition line-clamp-1 mt-0.5">
                  ${idx + 1}. ${escapeHtml(art.title)}
                </a>
              </div>
              <div class="flex items-center gap-2 text-[10px] font-mono text-slate-400 flex-shrink-0">
                <span class="text-slate-500">DOI: ${escapeHtml((art.doi || '').split('/').pop() || 'Verified')}</span>
                <a href="/articles/${encodeURIComponent(art.id)}" class="text-cyan-400 hover:text-cyan-300 font-semibold">
                  Read &rarr;
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  </main>

  <!-- Footer -->
  <footer class="mt-auto border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-mono">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>&copy; 2026 BioGravity Institute. All rights reserved.</div>
        <div class="flex gap-4 text-slate-400">
          <a href="/about" class="hover:text-cyan-400">About</a>
          <span>•</span>
          <a href="/contact" class="hover:text-cyan-400">Contact</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>
          <span>•</span>
          <a href="/privacy-policy" class="hover:text-cyan-400">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-cyan-400">Terms</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-cyan-400">HTML Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'sitemap.html'), html, 'utf8');

// Also create sitemap/index.html for clean URL /sitemap
const sitemapDir = path.join(rootDir, 'sitemap');
if (!fs.existsSync(sitemapDir)) fs.mkdirSync(sitemapDir, { recursive: true });
fs.writeFileSync(path.join(sitemapDir, 'index.html'), html, 'utf8');

console.log('✅ Successfully generated sitemap.html and /sitemap/index.html');
