'use strict';

const fs = require('fs');

['research.html', 'research/index.html', 'about.html', 'about/index.html'].forEach(f => {
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, 'utf8');
    if (!html.includes('/contact')) {
      html = html.replace('About & Lab Notes</a>', 'About & Lab Notes</a>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>');
      html = html.replace('href="/terms" class="hover:text-cyan-400">Terms</a>', 'href="/terms" class="hover:text-cyan-400">Terms</a>\n          <span>•</span>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>');
      fs.writeFileSync(f, html, 'utf8');
      console.log('✅ Patched', f);
    }
  }
});
