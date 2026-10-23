'use strict';

const fs = require('fs');

let js = fs.readFileSync('js/sidebar-menu.js', 'utf8');

const target = `<a href="/research" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 border border-slate-800/80 transition">
                <span class="font-medium text-xs">🔬 Research Feed & Archive</span>
                <span class="text-[10px] text-slate-500 font-mono">22 Dispatches</span>
              </a>`;

const replacement = `<a href="/research" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 border border-slate-800/80 transition">
                <span class="font-medium text-xs">🔬 Research Feed & Archive</span>
                <span class="text-[10px] text-slate-500 font-mono">22 Dispatches</span>
              </a>
              <a href="/tools" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 border border-slate-800/80 transition">
                <span class="font-medium text-xs">🧪 Tools &amp; Simulators</span>
                <span class="text-[10px] text-cyan-400 font-mono">Lab Suite</span>
              </a>`;

if (!js.includes('href="/tools"')) {
  js = js.replace(target, replacement);
  fs.writeFileSync('js/sidebar-menu.js', js, 'utf8');
  console.log('✅ Added /tools to sidebar-menu.js');
}
