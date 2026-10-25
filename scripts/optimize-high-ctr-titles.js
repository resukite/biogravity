'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const articlesPath = path.join(rootDir, 'data', 'articles.json');
const buildSeoPath = path.join(rootDir, 'build-seo.js');

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// High-converting, curiosity-driven titles & meta descriptions tailored for human readers & Google CTR
const optimizations = {
  'what-does-quantum-parameter-estimation-estimate-a-no-go-result-for-tru': {
    seoTitle: 'Can Quantum Physics Measure Reality? The No-Go Proof That Shook Metrology',
    metaDescription: 'A new mathematical no-go theorem proves quantum measurements cannot reveal a pre-existing "true value" without breaking entanglement. Here is what that means.'
  },
  'phonon-assisted-free-electron-recoil-control-and-mechanical-sensing': {
    seoTitle: 'Controlling Free-Electron Recoil: The Next Frontier in Quantum Nanomechanics',
    metaDescription: 'How phonon coupling enables sub-atomic mechanical sensing and directional electron recoil control without thermal noise interference.'
  },
  'characterizing-supersolid-phase-transitions-in-trapped-quantum-gases-w': {
    seoTitle: 'Inside Supersolids: How Microgravity Traps Matter That Is Both Liquid and Solid',
    metaDescription: 'Discover how orbital free-fall reveals finite-temperature supersolid phase transitions impossible to isolate under terrestrial gravity.'
  },
  'relativistic-time-dilation-and-mitochondrial-aging-clocks': {
    seoTitle: 'Do We Age Slower in Space? Orbital Telemetry on Cellular Aging Clocks',
    metaDescription: 'How relativistic time dilation and microgravity decouple mitochondrial bio-oscillators in deep space travel. See the orbital telemetry data.'
  },
  'zero-g-capillary-fluidics-and-surface-tension-bioreactors': {
    seoTitle: 'Growing Cells Without Gravity: How Space Bioreactors Eliminate Fluid Turbulence',
    metaDescription: 'In orbit, capillary surface tension replaces gravity. Discover how zero-G bioreactors eliminate convective shearing to grow delicate biological tissues.'
  },
  'debye-shielding-and-plasma-sheath-dynamics-in-spacecraft-biosensing': {
    seoTitle: 'Spacecraft Biosensors in Orbit: Overcoming the Ionosphere\'s Plasma Sheath',
    metaDescription: 'How dynamic Debye shielding and ionospheric atomic oxygen distort biosensors in Low Earth Orbit—and the radio-frequency solutions that fix it.'
  },
  'radical-pair-spin-coherence-and-magnetoreception-in-human-cryptochrome-4-photore': {
    seoTitle: 'Can Humans Sense Magnetic Fields? The Quantum Secret in Our Eyes',
    metaDescription: 'Microgravity spectroscopy reveals human Cryptochrome 4 proteins form quantum-coherent radical pairs capable of detecting geomagnetic fields.'
  },
  'synthetic-poly-adp-metallo-peptides-for-telomeric-radioprotection-in-deep-space-': {
    seoTitle: 'Deep-Space Radiation Shield: The Synthetic Peptides Protecting Human DNA',
    metaDescription: 'Synthetic metallo-peptides achieve an 88% reduction in double-strand DNA damage from cosmic rays. How this breakthrough protects future Mars astronauts.'
  },
  'acoustic-levitation-and-scaffold-free-vascularized-cardiac-organoid-bioprinting-': {
    seoTitle: 'Why Scientists Are 3D-Printing Beating Human Hearts in Zero Gravity',
    metaDescription: 'Using soundwaves instead of scaffolding: how ultrasound acoustic levitation prints functional, vascularized cardiac tissue in orbital microgravity.'
  },
  'sub-angstrom-macromolecular-crystallography-of-membrane-transporters-in-orbital-': {
    seoTitle: 'Atomic-Level Drug Design: Growing Perfect Protein Crystals in Space',
    metaDescription: 'By eliminating density-driven convection, orbital crystallography breaks the 0.74 Å barrier, revealing how drug-resistant membrane transporters function.'
  },
  'non-thermal-quantum-proton-tunneling-in-crispr-cas9-catalytic-triads-orbital-evi': {
    seoTitle: 'CRISPR in Zero Gravity: Does Quantum Tunneling Accelerate DNA Cuts?',
    metaDescription: 'Orbital experiments unmask temperature-independent proton tunneling during CRISPR-Cas9 DNA cleavage, proving quantum dynamics in gene editing.'
  },
  'microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats': {
    seoTitle: 'Space Station Superbugs: Why Biofilms Mutate and Resist Antibiotics in Orbit',
    metaDescription: 'Closed-loop life support systems on the ISS are breeding resistant microbial biofilms. Discover the biophysical mechanisms driving orbital mutation rates.'
  },
  'cerebrovascular-glymphatic-clearance-microgravity-optic-nerve-syndrome': {
    seoTitle: 'Why Astronauts Lose Vision in Space: The Brain Fluid Mystery of SANS',
    metaDescription: 'Spaceflight-Associated Neuro-Ocular Syndrome (SANS) threatens long missions. Discover how microgravity alters glymphatic drainage and ocular perfusion.'
  },
  'photosystem-ii-charge-separation-far-red-light-orbital-bioreactors': {
    seoTitle: 'Farming on Mars: Re-Engineering Photosynthesis Under Far-Red Orbital Light',
    metaDescription: 'How quantum charge separation in Photosystem II is being re-engineered to allow deep-space crops to grow with minimal photon energy.'
  },
  'bose-einstein-polariton-condensation-orbital-microgravity': {
    seoTitle: 'Creating Fifth-State Matter in Orbit: Polariton Condensation in Zero-G',
    metaDescription: 'How orbital microgravity enables non-equilibrium Bose-Einstein polariton condensation without gravitational de-phasing or thermal collapse.'
  },
  'epigenetic-t-cell-activation-remodeling-extended-spaceflight': {
    seoTitle: 'Astronaut Immunity: How Extended Spaceflight Silences Human T-Cells',
    metaDescription: 'Extended missions in microgravity suppress human immune response. Here is how spaceflight epigenetically locks critical T-cell activation pathways.'
  },
  'self-assembling-chiral-nanotubes-zero-convection-solute-gradients': {
    seoTitle: 'Flawless Nanotechnology in Space: Self-Assembling Chiral Nanotubes',
    metaDescription: 'Without Earth\'s buoyancy-driven currents, chemical solutes assemble with 99.8% structural purity. Discover orbital nanomaterial manufacturing.'
  },
  'mitochondrial-electron-transport-efficiency-spaceflight-radiation': {
    seoTitle: 'How Cosmic Rays Choke Cellular Power: Mitochondria Under Space Radiation',
    metaDescription: 'Galactic cosmic radiation degrades the mitochondrial electron transport chain. Discover the free radical cascades and countermeasures for astronauts.'
  },
  'biomineralization-hydroxyapatite-scaffolds-simulated-lunar-freefall': {
    seoTitle: 'Building Bones on the Moon: Hydroxyapatite Scaffolds in Lunar Gravity',
    metaDescription: 'Why low gravity weakens bone regeneration—and how novel biomimetic scaffolds accelerate osteoblast mineralization on lunar outposts.'
  },
  'single-cell-rna-seq-endothelial-cells-hyperstatic-weightlessness': {
    seoTitle: 'Blood Vessels in Free-Fall: Single-Cell RNA Sequencing of Astronaut Arteries',
    metaDescription: 'From rocket launch g-forces to orbital free-fall: how vascular endothelial cells react to weightlessness at the single-cell RNA level.'
  },
  'squid-biosensing-neuronal-action-potentials-low-earth-orbit': {
    seoTitle: 'Measuring Brainwaves in Orbit: SQUID Biosensors Detect Neural Action Potentials',
    metaDescription: 'Using ultra-sensitive superconducting quantum sensors to record neuronal action potentials aboard space stations shielded by the ionosphere.'
  },
  'tardigrade-dsup-protein-chromatin-radioprotective-compaction': {
    seoTitle: 'Tardigrade Super-Shield: How the Dsup Protein Can Protect Human Cells from Radiation',
    metaDescription: 'The water bear\'s secret weapon: how the Dsup protein clamps around DNA to deflect lethal cosmic radiation, with applications for human gene therapy.'
  }
};

let updatedCount = 0;
articles.forEach(art => {
  const opt = optimizations[art.id];
  if (opt) {
    art.seoTitle = opt.seoTitle;
    art.metaDescription = opt.metaDescription;
    updatedCount++;
  }
});

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`[OPTIMIZE] ✅ Successfully applied high-CTR titles and meta descriptions to ${updatedCount}/${articles.length} articles!`);

// Patch build-seo.js to ensure dual-headline display (Catchy Title + Formal Academic Subtitle)
let buildCode = fs.readFileSync(buildSeoPath, 'utf8');

// 1. Update H1 in article pages
const oldH1Regex = /<h1 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">\s*\$\{escapeHtml\(art\.title\)\}\s*<\/h1>/;
if (oldH1Regex.test(buildCode)) {
  const newH1 = `<h1 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
          \${escapeHtml(art.seoTitle || art.title)}
        </h1>
        \${art.seoTitle && art.seoTitle !== art.title ? \`
        <div class="pt-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-teal-600 block mb-1">Academic Research Monograph:</span>
          <h2 class="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">\${escapeHtml(art.title)}</h2>
        </div>\` : ''}`;
  buildCode = buildCode.replace(oldH1Regex, newH1);
  console.log('[OPTIMIZE] ✅ Patched build-seo.js for Dual-Headline display (Catchy H1 + Academic Subtitle)');
}

// 2. Update card titles in related articles
buildCode = buildCode.replace(
  /\$\{escapeHtml\(rel\.title\)\}/g,
  '${escapeHtml(rel.seoTitle || rel.title)}'
);

// 3. Update card titles in research feed
buildCode = buildCode.replace(
  /<a href="\/articles\/\$\{encodeURIComponent\(art\.id\)\}"><span class="absolute inset-0"><\/span>\$\{escapeHtml\(art\.title\)\}<\/a>/g,
  '<a href="/articles/${encodeURIComponent(art.id)}"><span class="absolute inset-0"></span>${escapeHtml(art.seoTitle || art.title)}</a>'
);
buildCode = buildCode.replace(
  /<a href="\/articles\/\$\{encodeURIComponent\(art\.id\)\}"><span class="absolute inset-0"><\/span>\$\{escapeHtml\(art\.seoTitle \|\| art\.title\)\}<\/a>/g,
  '<a href="/articles/${encodeURIComponent(art.id)}"><span class="absolute inset-0"></span>${escapeHtml(art.seoTitle || art.title)}</a>'
);
buildCode = buildCode.replace(
  /<a href="\/articles\/\$\{encodeURIComponent\(art\.id\)\}"><span class="absolute inset-0"><\/span>\$\{escapeHtml\(art\.title\)\}<\/a>/g,
  '<a href="/articles/${encodeURIComponent(art.id)}"><span class="absolute inset-0"></span>${escapeHtml(art.seoTitle || art.title)}</a>'
);
buildCode = buildCode.replace(
  /<a href="\/articles\/\$\{encodeURIComponent\(art\.id\)\}">\$\{escapeHtml\(art\.title\)\}<\/a>/g,
  '<a href="/articles/${encodeURIComponent(art.id)}">${escapeHtml(art.seoTitle || art.title)}</a>'
);

// 4. Update homepage archive cards
buildCode = buildCode.replace(
  /<a href="\/articles\/\$\{encodeURIComponent\(a\.id\)\}">\$\{escapeHtml\(a\.title\)\}<\/a>/g,
  '<a href="/articles/${encodeURIComponent(a.id)}">${escapeHtml(a.seoTitle || a.title)}</a>'
);

// 5. Update RSS feed item title
buildCode = buildCode.replace(
  /<title>\$\{escapeXml\(art\.title\)\}<\/title>/g,
  '<title>${escapeXml(art.seoTitle || art.title)}</title>'
);

fs.writeFileSync(buildSeoPath, buildCode, 'utf8');
console.log('[OPTIMIZE] ✅ Saved updated build-seo.js');
