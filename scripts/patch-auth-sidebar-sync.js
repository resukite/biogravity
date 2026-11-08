const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'auth-system.js');
let code = fs.readFileSync(filePath, 'utf8');

const sidebarRenderFunc = `
  /* -------------------------------------------------------------------------
   * 6b. Sidebar Auth State Synchronization
   * ------------------------------------------------------------------------- */
  function renderSidebarAuth() {
    const card = document.getElementById('sidebar-auth-card');
    if (!card) return;

    if (currentUser) {
      const initials = (currentUser.displayName || currentUser.email || 'U').substring(0, 2).toUpperCase();
      const photo = currentUser.photoURL;

      card.innerHTML = \`
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3 min-w-0">
            \${photo 
              ? \`<img src="\${photo}" alt="Avatar" class="w-9 h-9 rounded-full object-cover border border-white/20">\`
              : \`<div class="w-9 h-9 rounded-full bg-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center border border-white/20">\${initials}</div>\`
            }
            <div class="min-w-0">
              <div class="font-bold text-xs text-white truncate">\${currentUser.displayName}</div>
              <div class="text-[10px] text-teal-300 font-mono truncate">\${currentUser.email}</div>
            </div>
          </div>
          <button id="sidebar-signout-btn" class="py-1 px-2.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-[10px] font-medium transition cursor-pointer" title="Sign Out">
            Sign Out
          </button>
        </div>
        <div class="flex items-center gap-2 pt-2 border-t border-white/10 mt-2 text-[11px] w-full">
          <button id="sidebar-open-lib-btn" class="flex-1 py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition text-center flex items-center justify-center gap-1.5 cursor-pointer">
            <span>📑</span> Library (\${savedArticles.length})
          </button>
          \${currentUser.isAdmin ? \`
          <a href="/admin" class="flex-1 py-1 px-2 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-semibold transition text-center flex items-center justify-center gap-1.5">
            <span>🛡️</span> Admin Panel
          </a>
          \` : ''}
        </div>
      \`;

      // Bind sidebar events
      const signOutBtn = card.querySelector('#sidebar-signout-btn');
      if (signOutBtn) {
        signOutBtn.onclick = () => {
          if (isFirebaseLive && window.bioGravitySignOut) {
            window.bioGravitySignOut();
          } else {
            mockSignOut();
          }
        };
      }

      const libBtn = card.querySelector('#sidebar-open-lib-btn');
      if (libBtn) libBtn.onclick = openLibraryDrawer;

    } else {
      card.innerHTML = \`
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2.5">
            <span class="text-base">👤</span>
            <div>
              <div class="font-semibold text-xs text-white">Reader Account</div>
              <div class="text-[10px] text-slate-400">Save papers &amp; customize feed</div>
            </div>
          </div>
          <button id="mobile-drawer-signin-btn" class="py-1.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition cursor-pointer">
            Sign In
          </button>
        </div>
      \`;

      const signInBtn = card.querySelector('#mobile-drawer-signin-btn');
      if (signInBtn) {
        signInBtn.onclick = () => openAuthModal('auth');
      }
    }
  }
`;

// Insert renderSidebarAuth before renderUI
if (!code.includes('renderSidebarAuth')) {
  code = code.replace('  function renderUI() {', sidebarRenderFunc + '\n  function renderUI() {\n    renderSidebarAuth();');
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('[SUCCESS] Injected renderSidebarAuth into js/auth-system.js');
} else {
  console.log('[INFO] renderSidebarAuth already present');
}
