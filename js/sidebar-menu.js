/**
 * BioGravity Bespoke Sidebar Navigation & Editorial Connect Drawer
 * Custom, human-crafted slide-over navigation with clean typography and direct contact links.
 */
(function() {
  'use strict';

  function initSidebar() {
    let drawer = document.getElementById('nav-sidebar-drawer');
    let overlay = document.getElementById('nav-sidebar-overlay');

    if (!drawer) {
      const drawerHtml = `
      <!-- Backdrop Overlay -->
      <div id="nav-sidebar-overlay" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300" aria-hidden="true"></div>

      <!-- Slide-over Bespoke Sidebar Drawer -->
      <aside id="nav-sidebar-drawer" class="fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-white border-l border-slate-200/80 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto" aria-label="Main Navigation Sidebar" role="dialog" aria-modal="true">
        
        <!-- Drawer Header -->
        <div class="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <a href="/" class="flex items-center gap-3 group">
            <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-sm shadow-sm group-hover:bg-slate-800 transition">
              ⚛️
            </div>
            <div>
              <span class="font-display font-bold text-lg text-slate-900 tracking-tight group-hover:text-teal-600 transition">BioGravity<span class="text-teal-600">.</span></span>
              <span class="block text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5">Scientific Publication</span>
            </div>
          </a>
          <button id="nav-sidebar-close" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition" aria-label="Close Navigation Sidebar">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Drawer Content -->
        <div class="p-6 space-y-7 flex-1 text-xs">
          
          <!-- Direct Editorial Desk (Gmail & X) -->
          <div class="rounded-2xl p-4 bg-[#f8fafc] border border-slate-200/80 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-semibold text-slate-900 uppercase tracking-wider">
                Direct Editorial Connect
              </span>
              <span class="text-[10px] text-teal-600 font-medium">Open Desk</span>
            </div>
            <div class="space-y-2">
              <a href="mailto:biogravity.space@gmail.com" class="flex items-center gap-3 p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 transition group shadow-sm">
                <span class="text-base text-slate-700">📧</span>
                <div class="flex-1 min-w-0">
                  <div class="text-[10px] text-slate-400">Official Gmail</div>
                  <div class="text-xs text-slate-900 group-hover:text-teal-600 truncate font-semibold">biogravity.space@gmail.com</div>
                </div>
                <span class="text-slate-400 group-hover:text-slate-800 font-medium">→</span>
              </a>
              <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 transition group shadow-sm">
                <span class="text-base font-bold text-slate-900">𝕏</span>
                <div class="flex-1 min-w-0">
                  <div class="text-[10px] text-slate-400">Official X Account</div>
                  <div class="text-xs text-slate-900 group-hover:text-teal-600 truncate font-semibold">@Biogravityspace</div>
                </div>
                <span class="text-slate-400 group-hover:text-slate-800 font-medium">↗</span>
              </a>
              <a href="https://buymeacoffee.com/biogravity" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80 text-amber-950 transition group shadow-xs">
                <span class="text-base">☕</span>
                <div class="flex-1 min-w-0">
                  <div class="text-[10px] text-amber-700 font-medium">Support Open Science</div>
                  <div class="text-xs text-amber-950 group-hover:text-amber-900 truncate font-semibold font-mono">buymeacoffee.com/biogravity</div>
                </div>
                <span class="text-amber-700 group-hover:text-amber-900 font-medium">↗</span>
              </a>
            </div>
          </div>

          <!-- Section 1: Main Navigation -->
          <div>
            <div class="text-[11px] uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Navigation
            </div>
            <div class="grid grid-cols-1 gap-1 text-sm font-sans">
              <a href="/" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 hover:text-teal-600 transition font-medium">
                <span>Home Hub</span>
                <span class="text-xs text-slate-400">/</span>
              </a>
              <a href="/research" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 hover:text-teal-600 transition font-medium">
                <span>Research Archive</span>
                <span class="text-xs text-slate-400">22 Dispatches</span>
              </a>
              <a href="/tools" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 hover:text-teal-600 transition font-medium">
                <span>Interactive Tools Suite</span>
                <span class="text-xs text-teal-600 font-medium">Predictors &amp; Simulators</span>
              </a>
              <a href="/world-space-week-2026" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 hover:text-teal-600 transition font-medium">
                <span>World Space Week 2026</span>
                <span class="text-xs text-slate-400">Pillar</span>
              </a>
              <a href="/molecular-biology-research" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 hover:text-teal-600 transition font-medium">
                <span>Molecular Biology Guide</span>
                <span class="text-xs text-slate-400">Pillar</span>
              </a>
              <a href="/about" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 hover:text-teal-600 transition font-medium">
                <span>About BioGravity</span>
                <span class="text-xs text-slate-400">Our Mission</span>
              </a>
              <a href="/contact" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 hover:text-teal-600 transition font-medium">
                <span>Contact Editorial Desk</span>
                <span class="text-xs text-slate-400">Inquiries</span>
              </a>
            </div>
          </div>

          <!-- Section 2: Research Topics -->
          <div>
            <div class="text-[11px] uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Research Categories
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <a href="/research?q=Quantum" class="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 hover:text-teal-600 transition block font-medium">
                Quantum Biology
              </a>
              <a href="/research?q=Crystallography" class="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 hover:text-teal-600 transition block font-medium">
                Crystallography
              </a>
              <a href="/research?q=Bioprinting" class="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 hover:text-teal-600 transition block font-medium">
                3D Bioprinting
              </a>
              <a href="/research?q=Radiation" class="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 hover:text-teal-600 transition block font-medium">
                Radioprotection
              </a>
              <a href="/research?q=Fluid" class="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 hover:text-teal-600 transition block font-medium">
                Microgravity Fluids
              </a>
              <a href="/research?q=Photosystem" class="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 hover:text-teal-600 transition block font-medium">
                Space Bioreactors
              </a>
            </div>
          </div>

          <!-- Section 3: Legal & Governance -->
          <div class="pt-3 border-t border-slate-100">
            <div class="text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-semibold">
              Compliance &amp; Policy
            </div>
            <div class="flex flex-wrap gap-2 text-xs text-slate-500">
              <a href="/disclaimer" class="hover:text-teal-600 transition">Disclaimer</a>
              <span>•</span>
              <a href="/sitemap" class="hover:text-teal-600 transition">Sitemap</a>
              <span>•</span>
              <a href="/privacy-policy" class="hover:text-teal-600 transition">Privacy Policy</a>
              <span>•</span>
              <a href="/terms" class="hover:text-teal-600 transition">Terms</a>
              <span>•</span>
              <a href="/rss.xml" class="hover:text-teal-600 transition">RSS Feed</a>
            </div>
          </div>

        </div>

        <!-- Drawer Footer -->
        <div class="p-5 border-t border-slate-100 bg-[#f8fafc] space-y-3">
          <a href="https://buymeacoffee.com/biogravity" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition shadow-sm">
            <span>☕</span>
            <span>Support BioGravity on Buy Me a Coffee</span>
          </a>
          <div class="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>&copy; 2026 BioGravity Institute</span>
            <span class="text-teal-600 font-medium">Open-Access Science</span>
          </div>
        </div>

      </aside>
      `;
      document.body.insertAdjacentHTML('beforeend', drawerHtml);
      drawer = document.getElementById('nav-sidebar-drawer');
      overlay = document.getElementById('nav-sidebar-overlay');
    }

    function openDrawer() {
      if (!drawer || !overlay) return;
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100', 'pointer-events-auto');
      drawer.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden');
    }

    function closeDrawer() {
      if (!drawer || !overlay) return;
      overlay.classList.add('opacity-0', 'pointer-events-none');
      overlay.classList.remove('opacity-100', 'pointer-events-auto');
      drawer.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    }

    // Bind triggers (any button with id 'nav-sidebar-toggle', 'menu-btn', etc.)
    document.querySelectorAll('#nav-sidebar-toggle, #mobile-menu-btn, .open-sidebar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    });

    const closeBtn = document.getElementById('nav-sidebar-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
