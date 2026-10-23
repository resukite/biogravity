'use strict';

const fs = require('fs');

const standardFooter = `  <!-- GLOBAL FOOTER -->
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
            <li><a href="/about" class="hover:text-cyan-400 transition">About BioGravity</a></li>
            <li><a href="/contact" class="hover:text-cyan-400 transition text-cyan-400">Contact & Inquiries</a></li>
            <li><a href="/disclaimer" class="hover:text-cyan-400 transition">Editorial Disclaimer</a></li>
            <li><a href="/sitemap" class="hover:text-cyan-400 transition">HTML Sitemap</a></li>
          </ul>
        </div>

        <div>
          <div class="font-mono text-white text-xs uppercase tracking-wider mb-3">Orbital Modules</div>
          <ul class="space-y-2 text-slate-400">
            <li>Module Alpha: Cryo-EM Spin Resonance</li>
            <li>Module Beta: Sub-Angstrom Crystallography</li>
            <li>Module Gamma: Acoustic 3D Bioprinting</li>
            <li>Module Delta: External Deep-Space Radiation Bay</li>
          </ul>
        </div>

        <div>
          <div class="font-mono text-white text-xs uppercase tracking-wider mb-3">Data Infrastructure</div>
          <p class="text-xs text-slate-400 leading-relaxed mb-3">
            High-integrity quantum biological datasets and mission telemetry compiled directly from LEO Station Alpha.
          </p>
          <div class="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Encrypted Core Synchronized
          </div>
        </div>

      </div>

      <div class="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-slate-500">
        <div>© 2026 BioGravity Institute for Quantum Biotechnology. All rights reserved.</div>
        <div class="flex gap-4">
          <a href="/contact" class="hover:text-cyan-400 transition">Contact</a>
          <span>•</span>
          <a href="/privacy-policy" class="hover:text-cyan-400 transition">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-cyan-400 transition">Terms of Service</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-cyan-400 transition">Disclaimer</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-cyan-400 transition">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
`;

const files = ['about/index.html', 'about.html', 'research/index.html', 'research.html'];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let html = fs.readFileSync(f, 'utf8');
  
  if (html.includes('<footer')) {
    const footerStart = html.indexOf('<footer');
    const footerEnd = html.indexOf('</footer>', footerStart) + 9;
    html = html.slice(0, footerStart) + standardFooter.trim() + '\n' + html.slice(footerEnd);
  } else {
    // Insert before closing body or script
    if (html.includes('<script')) {
      const scriptStart = html.indexOf('<script');
      html = html.slice(0, scriptStart) + standardFooter + '\n' + html.slice(scriptStart);
    } else {
      html = html.replace('</body>', standardFooter + '\n</body>');
    }
  }

  fs.writeFileSync(f, html, 'utf8');
  console.log(`✅ Updated footer with Contact link in ${f}`);
});
