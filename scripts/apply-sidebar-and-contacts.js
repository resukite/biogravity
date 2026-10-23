'use strict';

const fs = require('fs');
const path = require('path');

const menuButtonHtml = `
      <!-- 3-Lined Sidebar Menu Button -->
      <button id="nav-sidebar-toggle" class="flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-cyan-400 hover:border-cyan-400/50 transition cursor-pointer shadow-sm group" aria-label="Open Navigation Sidebar">
        <svg class="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <span class="text-xs font-mono font-medium">Menu</span>
      </button>`;

const scriptTag = `<script defer src="/js/sidebar-menu.js"></script>`;

const standardFooterWithContacts = `  <!-- GLOBAL FOOTER -->
  <footer class="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-lg">⚛️</span>
            <span class="font-display font-bold text-white text-base">BioGravity</span>
          </div>
          <p class="text-slate-400 leading-relaxed text-xs">
            Global quantum biotechnology research collective operating orbital microgravity laboratories in Low Earth Orbit (LEO).
          </p>
          <div class="text-[11px] font-mono text-emerald-400">
            STATION TELEMETRY: NOMINAL 24/7
          </div>
        </div>

        <div>
          <div class="font-mono text-white text-xs uppercase tracking-wider mb-3">Site Architecture</div>
          <ul class="space-y-2">
            <li><a href="/" class="hover:text-cyan-400 transition">Home Hub</a></li>
            <li><a href="/research" class="hover:text-cyan-400 transition">Research Feed & Search</a></li>
            <li><a href="/world-space-week-2026" class="hover:text-cyan-400 transition">Space Week 2026 Guide</a></li>
            <li><a href="/molecular-biology-research" class="hover:text-cyan-400 transition">Molecular Biology Guide</a></li>
            <li><a href="/about" class="hover:text-cyan-400 transition">About BioGravity</a></li>
            <li><a href="/contact" class="hover:text-cyan-400 transition text-cyan-400">Contact & Inquiries</a></li>
          </ul>
        </div>

        <div>
          <div class="font-mono text-white text-xs uppercase tracking-wider mb-3">Direct Connect & Social</div>
          <ul class="space-y-2.5 text-slate-300">
            <li class="flex items-center gap-2">
              <span class="text-cyan-400">📧</span>
              <div>
                <div class="text-[10px] text-slate-500 uppercase">Official Gmail</div>
                <a href="mailto:biogravity.space@gmail.com" class="text-cyan-400 hover:underline font-mono">biogravity.space@gmail.com</a>
              </div>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-cyan-400 font-bold text-sm">𝕏</span>
              <div>
                <div class="text-[10px] text-slate-500 uppercase">Official X (Twitter)</div>
                <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="text-white hover:text-cyan-300 font-mono">@Biogravityspace</a>
              </div>
            </li>
            <li class="pt-1">
              <span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Direct Communications Active
              </span>
            </li>
          </ul>
        </div>

        <div>
          <div class="font-mono text-white text-xs uppercase tracking-wider mb-3">Orbital Modules</div>
          <ul class="space-y-2 text-slate-400">
            <li>Module Alpha: Cryo-EM Spin Resonance</li>
            <li>Module Beta: Sub-Angstrom Crystallography</li>
            <li>Module Gamma: Acoustic 3D Bioprinting</li>
            <li>Module Delta: External Radiation Exposure</li>
          </ul>
        </div>

      </div>

      <div class="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-slate-500">
        <div>© 2026 BioGravity Institute for Quantum Biotechnology. All rights reserved.</div>
        <div class="flex flex-wrap gap-4">
          <a href="mailto:biogravity.space@gmail.com" class="hover:text-cyan-400 transition">Email</a>
          <span>•</span>
          <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition">X: @Biogravityspace</a>
          <span>•</span>
          <a href="/contact" class="hover:text-cyan-400 transition">Contact</a>
          <span>•</span>
          <a href="/privacy-policy" class="hover:text-cyan-400 transition">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-cyan-400 transition">Terms</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-cyan-400 transition">Disclaimer</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-cyan-400 transition">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>`;

// 1. Update Core HTML Pages
const coreFiles = [
  'index.html',
  'contact.html', 'contact/index.html',
  'about.html', 'about/index.html',
  'research.html', 'research/index.html',
  'world-space-week-2026.html', 'world-space-week-2026/index.html',
  'molecular-biology-research.html', 'molecular-biology-research/index.html',
  'disclaimer.html', 'disclaimer/index.html',
  'sitemap.html', 'sitemap/index.html',
  'privacy-policy.html', 'privacy-policy/index.html',
  'terms.html', 'terms/index.html'
];

coreFiles.forEach(f => {
  if (!fs.existsSync(f)) return;
  let html = fs.readFileSync(f, 'utf8');

  // Inject sidebar script tag if not present
  if (!html.includes('sidebar-menu.js')) {
    html = html.replace('</head>', `  ${scriptTag}\n</head>`);
  }

  // Inject Menu button in header if not present
  if (!html.includes('id="nav-sidebar-toggle"')) {
    if (html.includes('id="mobile-menu-btn"')) {
      html = html.replace('id="mobile-menu-btn"', 'id="nav-sidebar-toggle"');
    } else if (html.includes('</header>')) {
      html = html.replace('</header>', `${menuButtonHtml}\n  </header>`);
    }
  }

  // Replace footer with standardFooterWithContacts
  if (html.includes('<footer')) {
    const fStart = html.indexOf('<footer');
    const fEnd = html.indexOf('</footer>', fStart) + 9;
    html = html.slice(0, fStart) + standardFooterWithContacts.trim() + '\n' + html.slice(fEnd);
  }

  // Special updates for Contact page
  if (f.includes('contact')) {
    if (!html.includes('biogravity.space@gmail.com')) {
      html = html.replace(
        'contact@biogravity.space',
        'biogravity.space@gmail.com</a><div class="text-[11px] text-slate-400 mt-1">Secondary: <a href="mailto:contact@biogravity.space" class="text-slate-300 hover:underline">contact@biogravity.space</a></div>'
      );
    }
    if (!html.includes('https://x.com/Biogravityspace')) {
      html = html.replace(/https:\/\/x\.com\/BioGravitySpace/gi, 'https://x.com/Biogravityspace');
      html = html.replace(/@BioGravitySpace/gi, '@Biogravityspace');
    }
  }

  fs.writeFileSync(f, html, 'utf8');
  console.log(`✅ Processed: ${f}`);
});

console.log('\nAll core pages updated with 3-lined sidebar menu, Gmail, and X links!');
