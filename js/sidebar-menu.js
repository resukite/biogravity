/**
 * BioGravity Universal 3-Lined Sidebar Navigation & Quick Connect Drawer
 * Enhances site navigation with an organized, highly accessible, slide-over sidebar.
 */
(function() {
  'use strict';

  function initSidebar() {
    // If drawer already exists in DOM, just bind events; otherwise inject it.
    let drawer = document.getElementById('nav-sidebar-drawer');
    let overlay = document.getElementById('nav-sidebar-overlay');

    if (!drawer) {
      const drawerHtml = `
      <!-- Backdrop Overlay -->
      <div id="nav-sidebar-overlay" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300" aria-hidden="true"></div>

      <!-- Slide-over 3-Lined Sidebar Drawer -->
      <aside id="nav-sidebar-drawer" class="fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto" aria-label="Main Navigation Sidebar" role="dialog" aria-modal="true">
        
        <!-- Drawer Header -->
        <div class="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-950/95 backdrop-blur z-10">
          <a href="/" class="flex items-center gap-2.5 group">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 p-[1.5px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <div class="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center text-sm">⚛️</div>
            </div>
            <div>
              <span class="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition">BioGravity<span class="text-cyan-400">.</span></span>
              <span class="block text-[9px] font-mono tracking-widest text-emerald-400 uppercase -mt-0.5">Quick Navigator</span>
            </div>
          </a>
          <button id="nav-sidebar-close" class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition" aria-label="Close Navigation Sidebar">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Drawer Content -->
        <div class="p-5 space-y-6 flex-1 text-xs font-mono">
          
          <!-- Direct Connect Card (Gmail & X) -->
          <div class="rounded-xl p-4 bg-gradient-to-br from-cyan-950/50 via-slate-900 to-emerald-950/40 border border-cyan-500/30 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                Official Connect
              </span>
              <span class="text-[10px] text-emerald-400">Response &lt; 24h</span>
            </div>
            <div class="space-y-2">
              <a href="mailto:biogravity.space@gmail.com" class="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/80 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/40 text-slate-200 transition group">
                <span class="text-base">📧</span>
                <div class="flex-1 min-w-0">
                  <div class="text-[10px] text-slate-400">Official Gmail</div>
                  <div class="text-xs text-white group-hover:text-cyan-300 truncate font-semibold">biogravity.space@gmail.com</div>
                </div>
                <span class="text-slate-500 group-hover:text-cyan-400">→</span>
              </a>
              <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/80 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/40 text-slate-200 transition group">
                <span class="text-base text-cyan-400 font-bold">𝕏</span>
                <div class="flex-1 min-w-0">
                  <div class="text-[10px] text-slate-400">Official X Account</div>
                  <div class="text-xs text-white group-hover:text-cyan-300 truncate font-semibold">@Biogravityspace</div>
                </div>
                <span class="text-slate-500 group-hover:text-cyan-400">↗</span>
              </a>
            </div>
          </div>

          <!-- Section 1: Core Navigation Portals -->
          <div>
            <div class="text-[10px] uppercase tracking-wider text-slate-400 mb-2.5 font-bold flex items-center gap-1.5">
              <span>🏛️</span> Main Portals
            </div>
            <div class="grid grid-cols-1 gap-1.5 font-sans">
              <a href="/" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 border border-slate-800/80 transition">
                <span class="font-medium text-xs">🏠 Home Hub</span>
                <span class="text-[10px] text-slate-500 font-mono">/</span>
              </a>
              <a href="/research" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 border border-slate-800/80 transition">
                <span class="font-medium text-xs">🔬 Research Feed & Archive</span>
                <span class="text-[10px] text-slate-500 font-mono">22 Dispatches</span>
              </a>
              <a href="/tools" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 border border-slate-800/80 transition">
                <span class="font-medium text-xs">🧪 Tools &amp; Simulators</span>
                <span class="text-[10px] text-cyan-400 font-mono">Lab Suite</span>
              </a>
              <a href="/world-space-week-2026" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 border border-slate-800/80 transition">
                <span class="font-medium text-xs">🚀 World Space Week 2026 Guide</span>
                <span class="text-[10px] text-cyan-400 font-mono">Pillar</span>
              </a>
              <a href="/molecular-biology-research" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 border border-slate-800/80 transition">
                <span class="font-medium text-xs">🧬 Molecular Biology Research</span>
                <span class="text-[10px] text-cyan-400 font-mono">Pillar</span>
              </a>
              <a href="/about" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 border border-slate-800/80 transition">
                <span class="font-medium text-xs">📝 Lab Notes &amp; Facilities</span>
                <span class="text-[10px] text-slate-500 font-mono">About</span>
              </a>
              <a href="/contact" class="flex items-center justify-between p-2.5 rounded-lg bg-cyan-950/30 hover:bg-cyan-950/50 text-cyan-300 border border-cyan-500/40 transition">
                <span class="font-medium text-xs">✉️ Contact &amp; Inquiries</span>
                <span class="text-[10px] text-emerald-400 font-mono">Direct Desk</span>
              </a>
            </div>
          </div>

          <!-- Section 2: Research Categories -->
          <div>
            <div class="text-[10px] uppercase tracking-wider text-slate-400 mb-2.5 font-bold flex items-center gap-1.5">
              <span>🔬</span> Research Fields
            </div>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-sans">
              <a href="/research?q=Quantum" class="p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition block">
                ⚛️ Quantum Biology
              </a>
              <a href="/research?q=Crystallography" class="p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition block">
                🧪 Crystallography
              </a>
              <a href="/research?q=Bioprinting" class="p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition block">
                🧫 3D Bioprinting
              </a>
              <a href="/research?q=Radiation" class="p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition block">
                🛡️ Radioprotection
              </a>
              <a href="/research?q=Fluid" class="p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition block">
                💧 Microgravity Fluids
              </a>
              <a href="/research?q=Photosystem" class="p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition block">
                🌱 Space Bioreactors
              </a>
            </div>
          </div>

          <!-- Section 3: Legal & Governance -->
          <div class="pt-2 border-t border-slate-800/80">
            <div class="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-bold flex items-center gap-1.5">
              <span>⚖️</span> Policies &amp; Index
            </div>
            <div class="flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
              <a href="/disclaimer" class="hover:text-cyan-400 underline decoration-slate-700">Disclaimer</a>
              <span>•</span>
              <a href="/sitemap" class="hover:text-cyan-400 underline decoration-slate-700">Sitemap</a>
              <span>•</span>
              <a href="/privacy-policy" class="hover:text-cyan-400 underline decoration-slate-700">Privacy Policy</a>
              <span>•</span>
              <a href="/terms" class="hover:text-cyan-400 underline decoration-slate-700">Terms</a>
              <span>•</span>
              <a href="/rss.xml" class="hover:text-cyan-400 underline decoration-slate-700">RSS Feed</a>
            </div>
          </div>

        </div>

        <!-- Drawer Footer -->
        <div class="p-4 border-t border-slate-800/80 bg-slate-950/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>&copy; 2026 BioGravity Institute</span>
          <span class="text-emerald-400">● Nominal Status</span>
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

    // Bind triggers (any button with id 'nav-sidebar-toggle' or 'mobile-menu-btn')
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
