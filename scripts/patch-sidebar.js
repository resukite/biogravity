const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'sidebar-menu.js');
let code = fs.readFileSync(filePath, 'utf8');

const target = '        <!-- Drawer Content -->';
const insertion = `
          <!-- Reader Account & Sign In Box -->
          <div id="sidebar-auth-card" class="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-sm">
            <div class="flex items-center gap-2.5">
              <span class="text-base">👤</span>
              <div>
                <div class="font-semibold text-xs">Reader Account</div>
                <div class="text-[10px] text-slate-400">Save papers & customize feed</div>
              </div>
            </div>
            <button id="mobile-drawer-signin-btn" class="py-1.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition cursor-pointer">
              Sign In
            </button>
          </div>
`;

if (code.includes(target) && !code.includes('mobile-drawer-signin-btn')) {
  code = code.replace(target, target + '\n' + insertion);
  fs.writeFileSync(filePath, code, 'utf8');
  fs.writeFileSync(path.join(__dirname, '..', 'js', 'sidebar-menu.min.js'), code, 'utf8');
  console.log('[SUCCESS] Injected mobile sign-in button into sidebar-menu');
} else {
  console.log('[INFO] Already present or target not matched');
}
