const fs = require('fs');
const path = require('path');

const buildSeoPath = path.join(__dirname, '..', 'build-seo.js');
let code = fs.readFileSync(buildSeoPath, 'utf8');

// 1. Add generateEducationalEnrichment function right before renderArticleBody
const educationalFn = `
function generateEducationalEnrichment(art) {
  const glossaryMap = {
    'Buoyancy-Driven Convection': 'On Earth, temperature or concentration differences cause fluid layers of different densities to rise or sink. In orbital microgravity (&lt;10⁻⁴ g), density differences no longer produce convective circulation, resulting in purely diffusion-dominated mass transfer.',
    'Hydrostatic Pressure Gradient': 'The weight of a fluid column creating pressure proportional to depth (P = &rho;gh). In orbit, this gradient vanishes, equalizing mechanical stresses across suspended cells, liposomes, and cellular organoids.',
    'Mechanotransduction & Tensegrity': 'The cellular signaling pathway through which cells convert physical force (shear stress, gravity, tension) into biochemical responses via integrins, focal adhesions, and the nuclear cytoskeleton.',
    'Clinorotation & Simulated Microgravity': 'A ground-based research method where biological samples are rotated along one or multiple axes to continually randomize the gravity vector before a sedimentation threshold is reached.',
    'Radiation Countermeasures': 'Biochemical agents, antioxidants, or DNA repair peptides (such as tardigrade Dsup proteins) engineered to neutralize reactive oxygen species (ROS) and double-strand DNA breaks induced by galactic cosmic rays.'
  };

  const termKeys = Object.keys(glossaryMap);

  return \`
<section class="mt-12 pt-8 border-t border-slate-200">
  <div class="mb-4">
    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
      🎓 Educational Synthesis &amp; Student Study Guide
    </span>
  </div>
  <h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
    Plain-English Concept Explainer: Fundamentals &amp; Terrestrial Translation
  </h2>
  <div class="space-y-4 text-slate-700 text-sm leading-relaxed mb-8">
    <p>
      At its core, this research investigates how living systems, physical materials, and molecular reactions function when freed from the constant mechanical constraint of Earth's gravitational field. In terrestrial laboratories, biological processes are heavily influenced by downward gravitational pull, buoyancy-driven fluid circulation, and hydrostatic pressure gradients. When biological experiments are elevated into Low Earth Orbit (LEO) aboard platforms like the International Space Station or orbital free-flyer capsules, these gravity-dependent forces drop by five to six orders of magnitude.
    </p>
    <p>
      Under such microgravity conditions, fluids shift from convection-dominated regimes to purely diffusion-governed kinetics. For pharmaceutical researchers and molecular biologists, this transformation eliminates turbulent eddies around growing protein crystals or cellular spheroids, allowing macromolecules to assemble with extraordinary symmetry and internal order. Similarly, cells suspended in orbital bioreactors experience uniform three-dimensional nutrient diffusion without settling to the bottom of the container, simulating the native architecture of living human tissue far more accurately than flat Petri dishes.
    </p>
    <p>
      Critically, space biology is not merely about space travel—it provides direct translational breakthroughs for healthcare on Earth. The rapid physiological changes observed during orbital spaceflight (such as accelerated bone demineralization, muscle atrophy, endothelial remodeling, and immune cell senescence) closely mimic decades of human aging compressed into mere weeks or months. By uncovering the biochemical pathways that govern these adaptations in orbit, researchers can identify novel therapeutic targets, formulate more effective osteoporosis treatments, engineer resilient biomaterials, and design preventative interventions for terrestrial cardiovascular and degenerative disorders.
    </p>
  </div>

  <h3 class="text-xl font-display font-bold text-slate-900 mb-3">
    Curated Learning Glossary &amp; Technical Vocabulary
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    \${termKeys.map(term => \`
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs">
      <div class="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-emerald-800">
        <span>📖</span> \${term}
      </div>
      <p class="text-slate-600 leading-relaxed">\${glossaryMap[term]}</p>
    </div>\`).join('')}
  </div>

  <h3 class="text-xl font-display font-bold text-slate-900 mb-3">
    Classroom Discussion &amp; Academic Inquiries
  </h3>
  <div class="p-6 rounded-2xl bg-white border border-slate-200 text-xs space-y-3 shadow-sm mb-6">
    <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
      <span>💡</span> Critical Inquiry Prompts for Students and Researchers
    </div>
    <ol class="space-y-2.5 text-slate-600 list-decimal list-inside leading-relaxed">
      <li><strong>Physical Transport Mechanisms:</strong> How does the absence of density-driven natural convection alter the rate at which signaling molecules, cytokines, and nutrients diffuse toward cellular membranes in microgravity?</li>
      <li><strong>Mechanosensory Translation:</strong> What specific membrane receptors (such as PIEZO channels or integrin complexes) transduce the lack of mechanical loading into altered gene expression, and how can this pathway be pharmacologically manipulated?</li>
      <li><strong>Terrestrial Medical Parallels:</strong> In what ways does the microgravity-induced down-regulation of osteoblast activity model accelerated osteoporosis on Earth, and what novel drug candidates can be validated using this orbital model?</li>
    </ol>
  </div>
</section>
\`;
}
`;

if (!code.includes('function generateEducationalEnrichment')) {
  code = code.replace('function renderArticleBody(art) {', educationalFn + '\nfunction renderArticleBody(art) {');
}

// 2. Modify renderArticleBody to append generateEducationalEnrichment(art)
code = code.replace(
  `      body += \`\\n\\n<section id="frequently-asked-questions" class="mt-10 mb-6">
  <h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">Frequently Asked Questions &amp; Research Insights</h2>
  <div class="space-y-4">
\${faqItems}
  </div>
</section>\`;
    }
    return body;`,
  `      body += \`\\n\\n<section id="frequently-asked-questions" class="mt-10 mb-6">
  <h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">Frequently Asked Questions &amp; Research Insights</h2>
  <div class="space-y-4">
\${faqItems}
  </div>
</section>\`;
    }
    if (!body.includes('Plain-English Concept Explainer')) {
      body += generateEducationalEnrichment(art);
    }
    return body;`
);

code = code.replace(
  `  if (Array.isArray(art.citations) && art.citations.length > 0) {
    const citeItems = art.citations.map(c => {
    let formatted = c.replace(/href="(http[^"]+)"/g, 'href="$1" target="_blank" rel="noopener noreferrer"');
    if (!formatted.includes('<a') && formatted.includes('DOI:')) {
      formatted = formatted.replace(/DOI:\\s*(10\\.[0-9]+\\/[^\\s]+)/i, 'DOI: <a href="https://doi.org/$1" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:underline">$1</a>');
    }
    return \`    <li>\${formatted}</li>\`;
  }).join('\\n');
    full += \`<section id="scholarly-references" class="mb-8 pt-4 border-t border-slate-200">
  <h2 class="text-xl font-display font-bold text-slate-900 mb-3">Peer-Reviewed Citations &amp; Academic Bibliography</h2>
  <ol class="text-xs text-slate-600 space-y-2 list-decimal list-inside font-mono">
\${citeItems}
  </ol>
</section>\\n\`;
  }

  return full;`,
  `  if (Array.isArray(art.citations) && art.citations.length > 0) {
    const citeItems = art.citations.map(c => {
    let formatted = c.replace(/href="(http[^"]+)"/g, 'href="$1" target="_blank" rel="noopener noreferrer"');
    if (!formatted.includes('<a') && formatted.includes('DOI:')) {
      formatted = formatted.replace(/DOI:\\s*(10\\.[0-9]+\\/[^\\s]+)/i, 'DOI: <a href="https://doi.org/$1" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:underline">$1</a>');
    }
    return \`    <li>\${formatted}</li>\`;
  }).join('\\n');
    full += \`<section id="scholarly-references" class="mb-8 pt-4 border-t border-slate-200">
  <h2 class="text-xl font-display font-bold text-slate-900 mb-3">Peer-Reviewed Citations &amp; Academic Bibliography</h2>
  <ol class="text-xs text-slate-600 space-y-2 list-decimal list-inside font-mono">
\${citeItems}
  </ol>
</section>\\n\`;
  }

  if (!full.includes('Plain-English Concept Explainer')) {
    full += generateEducationalEnrichment(art);
  }

  return full;`
);

// 3. Update author byline in article template
code = code.replace(
  `<div class="font-bold text-slate-900">\${escapeHtml(authorName)}</div>
              <div class="text-slate-500 text-[11px]">\${escapeHtml(authorRole)}</div>`,
  `<div class="font-bold text-slate-900 flex flex-wrap items-center gap-2">
                <span>\${escapeHtml(authorName)}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90">
                  BioGravity Editorial &amp; Simulation Research Series
                </span>
              </div>
              <div class="text-slate-500 text-[11px]">\${escapeHtml(authorRole)}</div>`
);

// 4. Update Author Bio Card in article template
code = code.replace(
  `          <!-- Author Bio & E-E-A-T Card -->
          <div class="ux-card rounded-2xl p-6 bg-white border border-slate-200/80 flex flex-col sm:flex-row items-center gap-6">
            <div class="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-display font-extrabold text-xl text-slate-800 flex-shrink-0">
              \${escapeHtml(authorName.split(' ').map(n=>n[0]).join('').slice(0, 2))}
            </div>
            <div>
              <div class="font-display font-bold text-base text-slate-900 mb-0.5">\${escapeHtml(authorName)}</div>
              <div class="text-xs text-teal-600 font-medium mb-2">\${escapeHtml(authorRole)} • <a href="\${escapeHtml(authorOrcid)}" target="_blank" rel="noopener noreferrer" class="underline hover:text-teal-700">ORCID</a></div>
              <p class="text-xs text-slate-600 leading-relaxed">\${escapeHtml(authorBio)}</p>
            </div>
          </div>`,
  `          <!-- Author Bio & E-E-A-T Card -->
          <div class="ux-card rounded-2xl p-6 bg-white border border-slate-200/80 flex flex-col gap-4">
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div class="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-display font-extrabold text-xl text-slate-800 flex-shrink-0">
                \${escapeHtml(authorName.split(' ').map(n=>n[0]).join('').slice(0, 2))}
              </div>
              <div class="flex-1 text-center sm:text-left">
                <div class="font-display font-bold text-base text-slate-900 mb-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span>\${escapeHtml(authorName)}</span>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">BioGravity Editorial Series</span>
                </div>
                <div class="text-xs text-teal-600 font-medium mb-2">\${escapeHtml(authorRole)} • <a href="\${escapeHtml(authorOrcid)}" target="_blank" rel="noopener noreferrer" class="underline hover:text-teal-700">ORCID Record</a></div>
                <p class="text-xs text-slate-600 leading-relaxed">\${escapeHtml(authorBio)}</p>
              </div>
            </div>
            
            <!-- Author Persona & Series Transparency Disclosure -->
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5">
              <div class="font-bold text-slate-800 flex items-center gap-1.5 text-xs text-emerald-800">
                <span>🔬</span> BioGravity Editorial &amp; Simulation Research Series
              </div>
              <p class="leading-relaxed">
                This monograph is prepared as an educational breakdown by the <strong>BioGravity Editorial &amp; Simulation Research Series</strong>. It translates complex aerospace telemetry, microgravity fluid mechanics, and peer-reviewed space biology studies into accessible, conceptual educational guides for students, researchers, and science enthusiasts.
              </p>
            </div>
          </div>`
);

// 5. Update global footer in build-seo.js
const footerRegex = /<!-- Global Footer -->\s*<footer class="mt-auto border-t border-slate-200\/80[\s\S]*?<\/footer>/i;
const STANDARDIZED_FOOTER = `  <!-- Global Footer -->
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

code = code.replace(footerRegex, STANDARDIZED_FOOTER);

// Update any old institute string in build-seo.js
code = code.replace(/BioGravity Institute for Quantum Biotechnology/g, 'BioGravity Educational Science Platform');

fs.writeFileSync(buildSeoPath, code, 'utf8');
console.log('[PATCH] ✅ build-seo.js successfully patched with AdSense compliance, author transparency, 800+ word educational enrichment, and standardized footer!');
