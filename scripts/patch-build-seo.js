'use strict';

const fs = require('fs');

let fileContent = fs.readFileSync('build-seo.js', 'utf8');

// 1. Add sidebar script
if (!fileContent.includes('/js/sidebar-menu.js')) {
  fileContent = fileContent.replace(
    '<script defer src="/js/command-center-fx.js"></script>',
    '<script defer src="/js/command-center-fx.js"></script>\n  <script defer src="/js/sidebar-menu.js"></script>'
  );
}

// 2. Add 3-lined sidebar menu button
const oldButton = `<button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>`;

const newButton = `<!-- 3-Lined Sidebar Menu Button -->
      <button id="nav-sidebar-toggle" class="flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-cyan-400 hover:border-cyan-400/50 transition cursor-pointer shadow-sm group" aria-label="Open Navigation Sidebar">
        <svg class="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <span class="text-xs font-mono font-medium">Menu</span>
      </button>`;

if (fileContent.includes(oldButton)) {
  fileContent = fileContent.replace(oldButton, newButton);
}

// 3. Update footer status / contact column
const oldStatusCol = `<div>
          <div class="text-white uppercase tracking-wider mb-3">Status</div>
          <div class="text-[11px] text-emerald-400 flex items-center gap-1.5 mb-2">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live on biogravity.space
          </div>
          <p class="text-slate-500 text-[11px]">Domain: biogravity.space<br>Hosting: GitHub Pages</p>
        </div>`;

const newContactCol = `<div>
          <div class="text-white uppercase tracking-wider mb-3">Direct Connect</div>
          <ul class="space-y-2 text-slate-400">
            <li class="flex items-center gap-2">
              <span class="text-cyan-400">📧</span>
              <a href="mailto:biogravity.space@gmail.com" class="text-cyan-400 hover:underline">biogravity.space@gmail.com</a>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-cyan-400 font-bold">𝕏</span>
              <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400">@Biogravityspace</a>
            </li>
            <li class="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Direct Communications Active
            </li>
          </ul>
        </div>`;

if (fileContent.includes(oldStatusCol)) {
  fileContent = fileContent.replace(oldStatusCol, newContactCol);
}

// 4. Update copyright bar
const oldCopyBar = `<div class="flex flex-wrap gap-4">
          <a href="/privacy-policy" class="hover:text-cyan-400">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-cyan-400">Terms</a>
          <span>•</span>
          <a href="/contact" class="hover:text-cyan-400">Contact</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-cyan-400">Sitemap</a>
        </div>`;

const newCopyBar = `<div class="flex flex-wrap gap-4">
          <a href="mailto:biogravity.space@gmail.com" class="hover:text-cyan-400">Email</a>
          <span>•</span>
          <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400">X: @Biogravityspace</a>
          <span>•</span>
          <a href="/contact" class="hover:text-cyan-400">Contact</a>
          <span>•</span>
          <a href="/privacy-policy" class="hover:text-cyan-400">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-cyan-400">Terms</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-cyan-400">Sitemap</a>
        </div>`;

if (fileContent.includes(oldCopyBar)) {
  fileContent = fileContent.replace(oldCopyBar, newCopyBar);
}

fs.writeFileSync('build-seo.js', fileContent, 'utf8');
console.log('✅ build-seo.js patched successfully!');
