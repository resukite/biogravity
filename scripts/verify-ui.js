'use strict';

const fs = require('fs');

const testFiles = [
  'index.html',
  'contact/index.html',
  'about/index.html',
  'research/index.html',
  'articles/what-does-quantum-parameter-estimation-estimate-a-no-go-result-for-tru/index.html',
  'articles/tardigrade-dsup-protein-chromatin-radioprotective-compaction/index.html'
];

testFiles.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  console.log(`[VERIFY] ${f}`);
  console.log(`  - 3-lined Menu Toggle: ${c.includes('nav-sidebar-toggle')}`);
  console.log(`  - Sidebar Script Tag:  ${c.includes('sidebar-menu.js')}`);
  console.log(`  - Official Gmail:      ${c.includes('biogravity.space@gmail.com')}`);
  console.log(`  - Official X handle:   ${c.includes('@Biogravityspace')}`);
});
