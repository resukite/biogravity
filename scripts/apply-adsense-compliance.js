const fs = require('fs');
const path = require('path');

const STANDARDIZED_FOOTER = `  <!-- Global Standardized AdSense & Policy Compliant Footer -->
  <footer class="mt-auto border-t border-slate-200/80 bg-white py-12 text-xs text-slate-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Educational Platform Transparency Notice -->
      <div class="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-slate-600 leading-relaxed shadow-xs">
        <div class="flex items-center gap-2 font-bold text-slate-900 text-xs mb-2">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Educational Platform &amp; Open Science Transparency Notice</span>
        </div>
        <p class="text-xs leading-relaxed">
          <strong>BioGravity is an independent educational science platform and interactive simulation hub exploring theoretical space biology, microgravity fluidics, and quantum biotechnology concepts.</strong> All research monographs, interactive computational models, and educational dispatches are prepared strictly for educational inquiry, academic modeling, and open-science exploration under Creative Commons attribution.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-slate-600">
        <div>
          <div class="font-display font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
            <span>⚛️</span> BioGravity
          </div>
          <p class="text-slate-500 leading-relaxed text-xs">
            Open-access educational science initiative publishing structured research dispatches, computational simulation tools, and pedagogical guides in microgravity biophysics.
          </p>
          <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            <span>Licensed under </span>
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:underline font-medium">Creative Commons Attribution 4.0 International (CC BY 4.0)</a>.
          </div>
        </div>

        <div>
          <div class="font-semibold text-slate-900 uppercase tracking-wider mb-3">Educational Hub</div>
          <ul class="space-y-2">
            <li><a href="/" class="hover:text-slate-900 transition">Home Hub</a></li>
            <li><a href="/research" class="hover:text-slate-900 transition">Research &amp; Dispatches</a></li>
            <li><a href="/tools" class="hover:text-slate-900 transition">Interactive Simulators</a></li>
            <li><a href="/molecular-biology-research" class="hover:text-slate-900 transition">Molecular Biology Guide</a></li>
            <li><a href="/world-space-week-2026" class="hover:text-slate-900 transition">Space Week 2026</a></li>
            <li><a href="/about" class="hover:text-slate-900 transition">About BioGravity</a></li>
          </ul>
        </div>

        <div>
          <div class="font-semibold text-slate-900 uppercase tracking-wider mb-3">Policies &amp; Compliance</div>
          <ul class="space-y-2">
            <li><a href="/privacy-policy" class="hover:text-slate-900 transition">Privacy Policy</a></li>
            <li><a href="/terms" class="hover:text-slate-900 transition">Terms of Service</a></li>
            <li><a href="/disclaimer" class="hover:text-slate-900 transition">Editorial Disclaimer &amp; Open Access</a></li>
            <li><a href="/contact" class="hover:text-slate-900 transition">Contact &amp; Institutional Inquiries</a></li>
            <li><a href="/sitemap" class="hover:text-slate-900 transition">HTML Sitemap</a></li>
            <li><a href="/sitemap.xml" class="hover:text-slate-900 transition font-mono">XML Sitemap Index</a></li>
          </ul>
        </div>

        <div>
          <div class="font-semibold text-slate-900 uppercase tracking-wider mb-3">Community &amp; Reach</div>
          <ul class="space-y-2.5 text-slate-700">
            <li class="flex items-center gap-2">
              <span>📧</span>
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Official Editorial Contact</div>
                <a href="mailto:biogravity.space@gmail.com" class="text-slate-900 hover:underline font-mono">biogravity.space@gmail.com</a>
              </div>
            </li>
            <li class="flex items-center gap-2">
              <span class="font-bold">𝕏</span>
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Official Updates</div>
                <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="text-slate-900 hover:text-teal-600 font-mono">@Biogravityspace</a>
              </div>
            </li>
            <li class="flex items-center gap-2">
              <span>☕</span>
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Support Open Science</div>
                <a href="https://buymeacoffee.com/biogravity" target="_blank" rel="noopener noreferrer" class="text-slate-900 hover:text-amber-700 font-mono text-xs">buymeacoffee.com/biogravity</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-200/80 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>&copy; 2026 BioGravity Educational Science Platform. Open Access CC-BY 4.0.</div>
        <div class="flex flex-wrap items-center gap-3">
          <a href="/privacy-policy" class="hover:text-slate-700 transition">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-slate-700 transition">Terms of Service</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-slate-700 transition">Editorial Disclaimer</a>
          <span>•</span>
          <a href="/contact" class="hover:text-slate-700 transition">Contact</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-slate-700 transition">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>`;

// 1. Process about.html
const aboutPath = path.join(__dirname, '..', 'about.html');
if (fs.existsSync(aboutPath)) {
  let aboutHtml = fs.readFileSync(aboutPath, 'utf8');

  // Insert mission disclosure badge if not present
  if (!aboutHtml.includes('BioGravity is an independent educational science platform and interactive simulation hub exploring theoretical space biology, microgravity fluidics, and quantum biotechnology concepts.')) {
    const heroPattern = /<!-- Hero Section -->[\s\S]*?<\/div>(\s*<!-- Core Pillars Grid -->)/i;
    const replacement = `<!-- Hero Section -->
    <div class="mb-10 text-center max-w-3xl mx-auto">
      <span class="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
        About BioGravity Open Science &amp; Simulation Hub
      </span>
      <h1 class="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
        Democratizing Space Biotechnology &amp; Microgravity Science
      </h1>
      <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
        BioGravity is an independent educational science platform and interactive simulation hub exploring theoretical space biology, microgravity fluidics, and quantum biotechnology concepts.
      </p>
    </div>

    <!-- Editorial Transparency & Disclosure Badge -->
    <div class="mb-14 p-6 sm:p-7 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-slate-700 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto shadow-sm">
      <div class="font-bold text-emerald-900 text-sm sm:text-base mb-2 flex items-center gap-2">
        <span>🔬</span> Educational Transparency &amp; Editorial Disclosure
      </div>
      <p class="leading-relaxed text-slate-700 mb-3">
        <strong>BioGravity is an independent educational science platform and interactive simulation hub exploring theoretical space biology, microgravity fluidics, and quantum biotechnology concepts.</strong>
      </p>
      <p class="text-xs text-slate-600 leading-relaxed">
        Our dispatches, interactive computational engines, and study monographs synthesize peer-reviewed literature and aerospace telemetry into accessible, open-access curriculum materials for students, researchers, and science enthusiasts worldwide. We operate independently as an educational initiative published under Creative Commons licensing.
      </p>
    </div>$1`;
    aboutHtml = aboutHtml.replace(heroPattern, replacement);
  }

  // Update footer
  aboutHtml = aboutHtml.replace(/<footer[\s\S]*?<\/footer>/i, STANDARDIZED_FOOTER);
  fs.writeFileSync(aboutPath, aboutHtml, 'utf8');
  console.log('[COMPLIANCE] ✅ Updated about.html with transparency badge & standardized footer');
}

// 2. Process disclaimer.html
const disclaimerPath = path.join(__dirname, '..', 'disclaimer.html');
if (fs.existsSync(disclaimerPath)) {
  let disclaimerHtml = fs.readFileSync(disclaimerPath, 'utf8');
  if (!disclaimerHtml.includes('BioGravity is an independent educational science platform and interactive simulation hub exploring theoretical space biology, microgravity fluidics, and quantum biotechnology concepts.')) {
    disclaimerHtml = disclaimerHtml.replace(
      /(<section class="space-y-3">\s*<h2 class="text-xl font-display font-bold text-slate-900">1\. Academic &amp; Educational Purpose Only<\/h2>[\s\S]*?)(<\/section>)/i,
      `$1\n        <div class="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 font-medium leading-relaxed">
          <strong>Editorial Identity:</strong> BioGravity is an independent educational science platform and interactive simulation hub exploring theoretical space biology, microgravity fluidics, and quantum biotechnology concepts.
        </div>\n      $2`
    );
  }
  disclaimerHtml = disclaimerHtml.replace(/<footer[\s\S]*?<\/footer>/i, STANDARDIZED_FOOTER);
  fs.writeFileSync(disclaimerPath, disclaimerHtml, 'utf8');
  console.log('[COMPLIANCE] ✅ Updated disclaimer.html');
}

// 3. Process all other static pillar HTML pages
const staticPages = [
  'index.html',
  'research.html',
  'tools.html',
  'news.html',
  'contact.html',
  'privacy-policy.html',
  'terms.html',
  'sitemap.html',
  'molecular-biology-research.html',
  'world-space-week-2026.html',
  'microgravity-effects-on-human-body.html'
];

staticPages.forEach(fileName => {
  const filePath = path.join(__dirname, '..', fileName);
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');
    html = html.replace(/<footer[\s\S]*?<\/footer>/i, STANDARDIZED_FOOTER);
    // Replace old institute references with educational platform
    html = html.replace(/BioGravity Institute for Quantum Biotechnology/g, 'BioGravity Educational Science Platform');
    html = html.replace(/BioGravity Institute/g, 'BioGravity Open Science Platform');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`[COMPLIANCE] ✅ Standardized footer in ${fileName}`);
  }
});
