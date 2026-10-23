'use strict';

const fs = require('fs');

let code = fs.readFileSync('build-seo.js', 'utf8');

// 1. Add /contact to Desktop Header Nav
const oldNav = `<a href="/about" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Lab Notes / About</a>
      </nav>`;
const newNav = `<a href="/about" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Lab Notes / About</a>
        <a href="/contact" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Contact</a>
      </nav>`;
if (code.includes(oldNav)) {
  code = code.replace(oldNav, newNav);
  console.log('✅ Added /contact to desktop nav');
}

// 2. Add /contact to Mobile Drawer
const oldDrawer = `<a href="/about" class="block py-2 text-slate-300 hover:text-cyan-400">Lab Notes / About</a>`;
const newDrawer = `<a href="/about" class="block py-2 text-slate-300 hover:text-cyan-400">Lab Notes / About</a>
          <a href="/contact" class="block py-2 text-slate-300 hover:text-cyan-400">Contact & Support</a>`;
if (code.includes(oldDrawer)) {
  code = code.replace(oldDrawer, newDrawer);
  console.log('✅ Added /contact to mobile drawer');
}

// 3. Add /contact, /disclaimer, /sitemap to Footer Compliance column
const oldFooterCol = `<li><a href="/about" class="hover:text-cyan-400">Editorial & E-E-A-T Standards</a></li>
            <li><a href="/sitemap.xml" class="hover:text-cyan-400">XML Sitemap</a></li>`;
const newFooterCol = `<li><a href="/about" class="hover:text-cyan-400">Editorial & E-E-A-T Standards</a></li>
            <li><a href="/contact" class="hover:text-cyan-400">Contact & Support</a></li>
            <li><a href="/disclaimer" class="hover:text-cyan-400">Research & YMYL Disclaimer</a></li>
            <li><a href="/sitemap" class="hover:text-cyan-400">HTML Sitemap</a></li>
            <li><a href="/sitemap.xml" class="hover:text-cyan-400">XML Sitemap</a></li>`;
if (code.includes(oldFooterCol)) {
  code = code.replace(oldFooterCol, newFooterCol);
  console.log('✅ Added /contact & /disclaimer to footer columns');
}

// 4. Add /contact & /disclaimer to Bottom Bar
const oldBottom = `<div class="flex gap-4">
          <a href="/privacy-policy" class="hover:text-cyan-400">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-cyan-400">Terms</a>
          <span>•</span>
          <a href="/sitemap.xml" class="hover:text-cyan-400">Sitemap</a>
        </div>`;
const newBottom = `<div class="flex flex-wrap gap-4">
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
if (code.includes(oldBottom)) {
  code = code.replace(oldBottom, newBottom);
  console.log('✅ Added /contact & /disclaimer to bottom footer bar');
}

fs.writeFileSync('build-seo.js', code, 'utf8');
console.log('Successfully patched build-seo.js with sitewide contact links!');
