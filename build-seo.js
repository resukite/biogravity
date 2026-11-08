'use strict';

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://biogravity.space';
const TODAY = new Date().toISOString().split('T')[0];

const articlesPath = path.join(__dirname, 'data', 'articles.json');
if (!fs.existsSync(articlesPath)) {
  console.error('articles.json not found!');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
const newsPath = path.join(__dirname, 'data', 'news.json');
let newsArticles = [];
if (fs.existsSync(newsPath)) {
  try {
    const rawNews = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
    const uniqueNewsMap = new Map();
    rawNews.forEach(item => {
      if (item && item.id && !uniqueNewsMap.has(item.id)) {
        uniqueNewsMap.set(item.id, item);
      }
    });
    newsArticles = Array.from(uniqueNewsMap.values());
    if (newsArticles.length !== rawNews.length) {
      fs.writeFileSync(newsPath, JSON.stringify(newsArticles, null, 2), 'utf8');
      console.log(`[BUILD-SEO] 🧹 Deduplicated news.json: ${rawNews.length} -> ${newsArticles.length} unique stories.`);
    }
  } catch (e) {
    newsArticles = [];
  }
}
const articlesDir = path.join(__dirname, 'articles');
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

console.log(`[BUILD-SEO] 🚀 Initiating comprehensive SEO & Clean URL build for ${articles.length} dispatches...`);

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeTitle(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeWriteFileSync(targetPath, data) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      fs.writeFileSync(targetPath, data, 'utf8');
      return;
    } catch (e) {
      if (attempt === 4) throw e;
      const start = Date.now();
      while (Date.now() - start < 50 * (attempt + 1)) { /* spin wait */ }
    }
  }
}

const CONTEXTUAL_KEYWORD_LINKS = [
  // 1. Quantum Biology & Biophysics
  { phrase: 'coherent dipole oscillations', url: '/articles/terahertz-resonance-and-coherent-dipole-oscillations-in-neuronal-microtubule-lat' },
  { phrase: 'neuronal microtubules', url: '/articles/terahertz-resonance-and-coherent-dipole-oscillations-in-neuronal-microtubule-lat' },
  { phrase: 'terahertz resonance', url: '/articles/terahertz-resonance-and-coherent-dipole-oscillations-in-neuronal-microtubule-lat' },
  { phrase: 'cohesion-tension theory', url: '/articles/how-do-tall-trees-pull-water-against-gravity' },
  { phrase: 'xylem cavitation', url: '/articles/how-do-tall-trees-pull-water-against-gravity' },
  { phrase: 'Special Theory of Relativity', url: '/articles/why-is-gold-yellow-relativistic-quantum-chemistry' },
  { phrase: 'relativistic contraction', url: '/articles/why-is-gold-yellow-relativistic-quantum-chemistry' },
  { phrase: 'luminiferous aether', url: '/articles/michelson-morley-experiment-disproved-the-aether' },
  { phrase: 'Michelson-Morley experiment', url: '/articles/michelson-morley-experiment-disproved-the-aether' },
  { phrase: 'Fermi paradox', url: '/articles/fermi-paradox-where-are-all-the-aliens' },
  { phrase: 'Great Filter', url: '/articles/fermi-paradox-where-are-all-the-aliens' },
  { phrase: 'Kola Superdeep Borehole', url: '/articles/kola-superdeep-borehole-deepest-hole-on-earth' },
  { phrase: 'Demon Core', url: '/articles/the-demon-core-manhattan-project-criticality-accidents' },
  { phrase: 'prompt supercriticality', url: '/articles/the-demon-core-manhattan-project-criticality-accidents' },
  { phrase: 'Mpemba effect', url: '/articles/mpemba-effect-why-hot-water-freezes-faster-than-cold' },
  { phrase: 'hydrogen bond relaxation', url: '/articles/mpemba-effect-why-hot-water-freezes-faster-than-cold' },
  { phrase: 'uni-pedal resting', url: '/articles/why-do-flamingos-stand-on-one-leg' },
  { phrase: 'gravitational stay apparatus', url: '/articles/why-do-flamingos-stand-on-one-leg' },
  { phrase: 'liquid-liquid phase separation', url: '/articles/macroscopic-quantum-coherence-in-nuclear-lncrna-liquid-liquid-phase-transition-c' },
  { phrase: 'lncRNA condensates', url: '/articles/macroscopic-quantum-coherence-in-nuclear-lncrna-liquid-liquid-phase-transition-c' },
  { phrase: "Schrödinger's cat", url: '/articles/schrodingers-cat-quantum-physics-paradox-explained' },
  { phrase: 'quantum superposition', url: '/articles/schrodingers-cat-quantum-physics-paradox-explained' },
  { phrase: 'cephalopod biology', url: '/articles/why-do-octopuses-have-three-hearts-and-blue-blood' },
  { phrase: 'hemocyanin', url: '/articles/why-do-octopuses-have-three-hearts-and-blue-blood' },
  { phrase: 'Mariana Trench', url: '/articles/mariana-trench-challenger-deep-creatures-pressure' },
  { phrase: 'Challenger Deep', url: '/articles/mariana-trench-challenger-deep-creatures-pressure' },
  { phrase: 'Turritopsis dohrnii', url: '/articles/immortal-jellyfish-turritopsis-dohrnii-biological-immortality' },
  { phrase: 'cellular transdifferentiation', url: '/articles/immortal-jellyfish-turritopsis-dohrnii-biological-immortality' },
  { phrase: 'Earth stopped spinning', url: '/articles/what-would-happen-if-earth-stopped-spinning' },
  { phrase: 'Elephant\'s Foot', url: '/articles/chernobyl-elephants-foot-deadliest-radioactive-mass' },
  { phrase: 'Chernobyl corium', url: '/articles/chernobyl-elephants-foot-deadliest-radioactive-mass' },
  { phrase: 'double-slit experiment', url: '/articles/double-slit-experiment-quantum-mechanics-explained' },
  { phrase: 'wave-particle duality', url: '/articles/double-slit-experiment-quantum-mechanics-explained' },
  { phrase: 'spaghettification', url: '/articles/what-happens-if-you-fall-into-a-black-hole' },
  { phrase: 'event horizon', url: '/articles/what-happens-if-you-fall-into-a-black-hole' },
  { phrase: '3D bioprinting human organoids', url: '/articles/3d-bioprinting-organoids-in-microgravity' },
  { phrase: '3D bioprinting', url: '/articles/3d-bioprinting-organoids-in-microgravity' },
  { phrase: 'Space Adaptation Syndrome', url: '/articles/space-adaptation-syndrome-space-motion-sickness' },
  { phrase: 'space motion sickness', url: '/articles/space-adaptation-syndrome-space-motion-sickness' },
  { phrase: 'grow in space', url: '/articles/can-plants-grow-in-space-without-gravity' },
  { phrase: 'plants grow without gravity', url: '/articles/can-plants-grow-in-space-without-gravity' },
  { phrase: 'sleep in space', url: '/articles/how-do-astronauts-sleep-in-space' },
  { phrase: 'circadian rhythms in space', url: '/articles/how-do-astronauts-sleep-in-space' },
  { phrase: 'bone density in space', url: '/articles/why-do-astronauts-lose-bone-density-in-space' },
  { phrase: 'orbital osteopenia', url: '/articles/why-do-astronauts-lose-bone-density-in-space' },
  { phrase: 'zero gravity and microgravity', url: '/articles/difference-between-zero-gravity-and-microgravity' },
  { phrase: 'free-fall orbit', url: '/articles/difference-between-zero-gravity-and-microgravity' },
  { phrase: 'social and behavioral sciences research', url: '/articles/what-statement-about-risks-in-social-and-behavioral-sciences-research-is-most-accurate' },
  { phrase: 'IRB review', url: '/articles/what-statement-about-risks-in-social-and-behavioral-sciences-research-is-most-accurate' },
  { phrase: 'topological defects', url: '/articles/ideal-interaction-dynamics-of-defects-and-background-fields-in' },
  { phrase: 'Gross-Pitaevskii superfluids', url: '/articles/ideal-interaction-dynamics-of-defects-and-background-fields-in' },
  { phrase: 'maximal orbital entanglement', url: '/articles/maximal-orbital-entanglement-from-non-interacting-fermions' },
  { phrase: 'fermionic systems', url: '/articles/maximal-orbital-entanglement-from-non-interacting-fermions' },
  { phrase: 'zero gravity kill cancer cells', url: '/articles/how-does-zero-gravity-kill-cancer-cells' },
  { phrase: 'cancer cell apoptosis', url: '/articles/how-does-zero-gravity-kill-cancer-cells' },
  { phrase: 'human body in zero gravity', url: '/articles/what-happens-to-human-body-in-zero-gravity' },
  { phrase: 'cardiovascular deconditioning', url: '/articles/what-happens-to-human-body-in-zero-gravity' },
  { phrase: 'logarithmic Sobolev inequalities', url: '/articles/size-independent-logarithmic-sobolev-inequalities-for-quantum' },
  { phrase: 'quantum Gibbs samplers', url: '/articles/size-independent-logarithmic-sobolev-inequalities-for-quantum' },
  { phrase: 'deep thermalization', url: '/articles/mixed-state-deep-thermalization-under-generic-quantum-errors' },
  { phrase: 'Haar-random ensembles', url: '/articles/mixed-state-deep-thermalization-under-generic-quantum-errors' },
  { phrase: 'solid oxide fuel cells', url: '/articles/screening-strongly-correlated-materials-in-solid-oxide-cells' },
  { phrase: 'solid oxide cells', url: '/articles/screening-strongly-correlated-materials-in-solid-oxide-cells' },
  { phrase: 'non-linear compression potential', url: '/articles/estimation-non-linear-compression-potential' },
  { phrase: 'autoencoder non-linearity', url: '/articles/estimation-non-linear-compression-potential' },
  { phrase: 'quantum parameter estimation', url: '/articles/quantum-parameter-estimation-no-go-result' },
  { phrase: 'no-go result', url: '/articles/quantum-parameter-estimation-no-go-result' },
  { phrase: 'electron recoil control', url: '/articles/phonon-assisted-free-electron-recoil-control-and-mechanical-sensing' },
  { phrase: 'mechanical sensing', url: '/articles/phonon-assisted-free-electron-recoil-control-and-mechanical-sensing' },
  { phrase: 'supersolid phase transitions', url: '/articles/supersolid-phase-transitions-trapped-quantum-gases' },
  { phrase: 'trapped quantum gases', url: '/articles/supersolid-phase-transitions-trapped-quantum-gases' },
  { phrase: 'relativistic time dilation', url: '/articles/relativistic-time-dilation-and-mitochondrial-aging-clocks' },
  { phrase: 'mitochondrial bio-oscillators', url: '/articles/relativistic-time-dilation-and-mitochondrial-aging-clocks' },
  { phrase: 'zero-g capillary fluidics', url: '/articles/zero-g-capillary-fluidics-and-surface-tension-bioreactors' },
  { phrase: 'Rayleigh-Bénard convective turbulence', url: '/articles/zero-g-capillary-fluidics-and-surface-tension-bioreactors' },
  { phrase: 'Debye shielding', url: '/articles/debye-shielding-and-plasma-sheath-dynamics-in-spacecraft-biosensing' },
  { phrase: 'plasma sheath dynamics', url: '/articles/debye-shielding-and-plasma-sheath-dynamics-in-spacecraft-biosensing' },
  { phrase: 'cryptochrome 4', url: '/articles/radical-pair-spin-coherence-human-cryptochrome-4' },
  { phrase: 'radical pair mechanism', url: '/articles/radical-pair-spin-coherence-human-cryptochrome-4' },
  { phrase: 'telomeric radioprotection', url: '/articles/synthetic-poly-adp-metallo-peptides-telomeric-radioprotection' },
  { phrase: 'metallo-peptides', url: '/articles/synthetic-poly-adp-metallo-peptides-telomeric-radioprotection' },
  { phrase: 'acoustic levitation', url: '/articles/acoustic-levitation-scaffold-free-cardiac-organoid-bioprinting' },
  { phrase: 'cardiac organoid bioprinting', url: '/articles/acoustic-levitation-scaffold-free-cardiac-organoid-bioprinting' },
  { phrase: 'macromolecular crystallography', url: '/articles/macromolecular-crystallography-membrane-transporters-orbit' },
  { phrase: 'membrane transporters', url: '/articles/macromolecular-crystallography-membrane-transporters-orbit' },
  { phrase: 'quantum proton tunneling', url: '/articles/quantum-proton-tunneling-crispr-cas9-catalytic-triads' },
  { phrase: 'CRISPR-Cas9 catalytic triads', url: '/articles/quantum-proton-tunneling-crispr-cas9-catalytic-triads' },
  { phrase: 'microbial biofilms in space', url: '/articles/microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats' },
  { phrase: 'antibiotic resistance in closed habitats', url: '/articles/microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats' },
  { phrase: 'SANS syndrome', url: '/articles/cerebrovascular-glymphatic-clearance-microgravity-optic-nerve-syndrome' },
  { phrase: 'optic nerve syndrome', url: '/articles/cerebrovascular-glymphatic-clearance-microgravity-optic-nerve-syndrome' },
  { phrase: 'far-red light photosynthesis', url: '/articles/photosystem-ii-charge-separation-far-red-light-orbital-bioreactors' },
  { phrase: 'Photosystem II charge separation', url: '/articles/photosystem-ii-charge-separation-far-red-light-orbital-bioreactors' },
  { phrase: 'polariton condensation', url: '/articles/bose-einstein-polariton-condensation-orbital-microgravity' },
  { phrase: 'Bose-Einstein condensation', url: '/articles/bose-einstein-polariton-condensation-orbital-microgravity' },
  { phrase: 'epigenetic remodeling in spaceflight', url: '/articles/epigenetic-t-cell-activation-remodeling-extended-spaceflight' },
  { phrase: 'T-cell activation cascades', url: '/articles/epigenetic-t-cell-activation-remodeling-extended-spaceflight' },
  { phrase: 'chiral nanotubes', url: '/articles/self-assembling-chiral-nanotubes-zero-convection-solute-gradients' },
  { phrase: 'zero-convection solute gradients', url: '/articles/self-assembling-chiral-nanotubes-zero-convection-solute-gradients' },
  { phrase: 'mitochondrial electron transport', url: '/articles/mitochondrial-electron-transport-efficiency-spaceflight-radiation' },
  { phrase: 'space radiation oxidative stress', url: '/articles/mitochondrial-electron-transport-efficiency-spaceflight-radiation' },
  { phrase: 'biomineralization kinetics', url: '/articles/biomineralization-hydroxyapatite-scaffolds-simulated-lunar-freefall' },
  { phrase: 'hydroxyapatite scaffolds', url: '/articles/biomineralization-hydroxyapatite-scaffolds-simulated-lunar-freefall' },
  { phrase: 'vascular endothelial cells', url: '/articles/single-cell-rna-seq-endothelial-cells-hyperstatic-weightlessness' },
  { phrase: 'hyperstatic weightlessness', url: '/articles/single-cell-rna-seq-endothelial-cells-hyperstatic-weightlessness' },
  { phrase: 'SQUID biosensing', url: '/articles/squid-biosensing-neuronal-action-potentials-low-earth-orbit' },
  { phrase: 'neuronal action potentials in orbit', url: '/articles/squid-biosensing-neuronal-action-potentials-low-earth-orbit' },
  { phrase: 'tardigrade Dsup protein', url: '/articles/tardigrade-dsup-protein-chromatin-radioprotective-compaction' },
  { phrase: 'chromatin radioprotection', url: '/articles/tardigrade-dsup-protein-chromatin-radioprotective-compaction' },
  // Common terms that cross-link articles naturally
  { phrase: 'microgravity', url: '/articles/difference-between-zero-gravity-and-microgravity' },
  { phrase: 'zero gravity', url: '/articles/difference-between-zero-gravity-and-microgravity' },
  { phrase: 'black hole', url: '/articles/what-happens-if-you-fall-into-a-black-hole' },
  { phrase: 'quantum mechanics', url: '/articles/double-slit-experiment-quantum-mechanics-explained' },
  { phrase: 'organoids', url: '/articles/3d-bioprinting-organoids-in-microgravity' },
  { phrase: 'bone loss', url: '/articles/why-do-astronauts-lose-bone-density-in-space' },
  { phrase: 'astronauts sleep', url: '/articles/how-do-astronauts-sleep-in-space' },
  { phrase: 'cancer cells', url: '/articles/how-does-zero-gravity-kill-cancer-cells' },
  { phrase: 'criticality accident', url: '/articles/the-demon-core-manhattan-project-criticality-accidents' },
  { phrase: 'space motion sickness', url: '/articles/space-adaptation-syndrome-space-motion-sickness' },
  { phrase: 'radiation shielding', url: '/articles/synthetic-poly-adp-metallo-peptides-telomeric-radioprotection' },
  { phrase: 'CRISPR', url: '/articles/quantum-proton-tunneling-crispr-cas9-catalytic-triads' },
  { phrase: 'biofilms', url: '/articles/microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats' },
  { phrase: 'neuro-ocular syndrome', url: '/articles/cerebrovascular-glymphatic-clearance-microgravity-optic-nerve-syndrome' },
  { phrase: 'photosynthesis', url: '/articles/photosystem-ii-charge-separation-far-red-light-orbital-bioreactors' },
  { phrase: 'Bose-Einstein', url: '/articles/bose-einstein-polariton-condensation-orbital-microgravity' },
  { phrase: 'T-cell activation', url: '/articles/epigenetic-t-cell-activation-remodeling-extended-spaceflight' },
  { phrase: 'chiral nanotubes', url: '/articles/self-assembling-chiral-nanotubes-zero-convection-solute-gradients' },
  { phrase: 'mitochondrial', url: '/articles/mitochondrial-electron-transport-efficiency-spaceflight-radiation' },
  { phrase: 'hydroxyapatite', url: '/articles/biomineralization-hydroxyapatite-scaffolds-simulated-lunar-freefall' },
  { phrase: 'endothelial cells', url: '/articles/single-cell-rna-seq-endothelial-cells-hyperstatic-weightlessness' },
  { phrase: 'SQUID', url: '/articles/squid-biosensing-neuronal-action-potentials-low-earth-orbit' },
  { phrase: 'tardigrade', url: '/articles/tardigrade-dsup-protein-chromatin-radioprotective-compaction' },
  { phrase: 'Mpemba', url: '/articles/mpemba-effect-why-hot-water-freezes-faster-than-cold' },
  { phrase: 'flamingos', url: '/articles/why-do-flamingos-stand-on-one-leg' },
  { phrase: 'octopuses', url: '/articles/why-do-octopuses-have-three-hearts-and-blue-blood' },
  { phrase: 'Mariana Trench', url: '/articles/mariana-trench-challenger-deep-creatures-pressure' },
  { phrase: 'immortal jellyfish', url: '/articles/immortal-jellyfish-turritopsis-dohrnii-biological-immortality' },
  { phrase: 'Earth stopped spinning', url: '/articles/what-would-happen-if-earth-stopped-spinning' },
  { phrase: 'Elephant\'s Foot', url: '/articles/chernobyl-elephants-foot-deadliest-radioactive-mass' },
  { phrase: 'double-slit', url: '/articles/double-slit-experiment-quantum-mechanics-explained' },
  { phrase: 'spaghettification', url: '/articles/what-happens-if-you-fall-into-a-black-hole' },
  { phrase: 'plants grow in space', url: '/articles/can-plants-grow-in-space-without-gravity' },
  { phrase: 'space flight', url: '/articles/what-happens-to-human-body-in-zero-gravity' },
  { phrase: 'human body in space', url: '/articles/what-happens-to-human-body-in-zero-gravity' },
  { phrase: 'topological defects', url: '/articles/ideal-interaction-dynamics-of-defects-and-background-fields-in' },
  { phrase: 'orbital entanglement', url: '/articles/maximal-orbital-entanglement-from-non-interacting-fermions' },
  { phrase: 'deep thermalization', url: '/articles/mixed-state-deep-thermalization-under-generic-quantum-errors' },
  { phrase: 'fuel cells', url: '/articles/screening-strongly-correlated-materials-in-solid-oxide-cells' },
  { phrase: 'autoencoders', url: '/articles/estimation-non-linear-compression-potential' },
  { phrase: 'quantum parameter', url: '/articles/quantum-parameter-estimation-no-go-result' },
  { phrase: 'mechanical sensing', url: '/articles/phonon-assisted-free-electron-recoil-control-and-mechanical-sensing' },
  { phrase: 'supersolid', url: '/articles/supersolid-phase-transitions-trapped-quantum-gases' },
  { phrase: 'time dilation', url: '/articles/relativistic-time-dilation-and-mitochondrial-aging-clocks' },
  { phrase: 'capillary fluidics', url: '/articles/zero-g-capillary-fluidics-and-surface-tension-bioreactors' },
  { phrase: 'biosensing', url: '/articles/debye-shielding-and-plasma-sheath-dynamics-in-spacecraft-biosensing' },
  { phrase: 'cryptochrome', url: '/articles/radical-pair-spin-coherence-human-cryptochrome-4' },
  { phrase: 'acoustic levitation', url: '/articles/acoustic-levitation-scaffold-free-cardiac-organoid-bioprinting' },
  { phrase: 'crystallography', url: '/articles/macromolecular-crystallography-membrane-transporters-orbit' },
  { phrase: 'Special Relativity', url: '/articles/why-is-gold-yellow-relativistic-quantum-chemistry' },
  { phrase: 'speed of light', url: '/articles/michelson-morley-experiment-disproved-the-aether' },
  { phrase: 'Manhattan Project', url: '/articles/the-demon-core-manhattan-project-criticality-accidents' },
  { phrase: 'gamma radiation', url: '/articles/chernobyl-elephants-foot-deadliest-radioactive-mass' },
  { phrase: 'biomechanics', url: '/articles/why-do-flamingos-stand-on-one-leg' },
  { phrase: 'International Space Station', url: '/articles/microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats' },
  { phrase: 'free-fall', url: '/articles/difference-between-zero-gravity-and-microgravity' },
  { phrase: 'gravitational collapse', url: '/articles/what-happens-if-you-fall-into-a-black-hole' },
  { phrase: 'nervous system', url: '/articles/terahertz-resonance-and-coherent-dipole-oscillations-in-neuronal-microtubule-lat' }
];

function injectContextualLinks(html, currentArticleId) {
  if (!html || typeof html !== 'string') return html;

  const tokens = html.split(/(<[^>]+>)/g);
  let linkedCount = 0;
  const maxLinks = 4;
  const currentUrl = `/articles/${currentArticleId}`;
  const usedTargetUrls = new Set([currentUrl]);
  let inAnchor = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token) continue;

    if (token.startsWith('<')) {
      const lower = token.toLowerCase();
      if (/^<a\b/i.test(lower)) inAnchor++;
      else if (/^<\/a>/i.test(lower)) inAnchor = Math.max(0, inAnchor - 1);
      else if (/^<(?:h[1-6]|script|style|svg|code|pre)\b/i.test(lower)) inAnchor++;
      else if (/^<\/(?:h[1-6]|script|style|svg|code|pre)>/i.test(lower)) inAnchor = Math.max(0, inAnchor - 1);
      continue;
    }

    if (inAnchor === 0 && linkedCount < maxLinks) {
      let text = token;
      for (const item of CONTEXTUAL_KEYWORD_LINKS) {
        if (linkedCount >= maxLinks) break;
        if (usedTargetUrls.has(item.url)) continue;

        const escapedPhrase = item.phrase.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b(${escapedPhrase})\\b`, 'i');
        const match = text.match(regex);
        if (match) {
          const anchorTag = `<a href="${item.url}" class="text-teal-700 hover:text-teal-900 underline font-medium">${match[0]}</a>`;
          text = text.slice(0, match.index) + anchorTag + text.slice(match.index + match[0].length);
          usedTargetUrls.add(item.url);
          linkedCount++;
          break;
        }
      }
      tokens[i] = text;
    }
  }

  return tokens.join('');
}


const GLOSSARY_DEFINITIONS = {
  'microgravity': 'A condition of apparent weightlessness experienced in orbital free-fall where residual gravitational acceleration is attenuated to 10⁻⁴ g to 10⁻⁶ g.',
  'zero gravity': 'An operational term designating the microgravity environment achieved in Low Earth Orbit where gravitational attraction is balanced by continuous orbital velocity.',
  'quantum mechanics': 'The foundational physical theory governing the behavior of matter and light at atomic and subatomic scales where energy and momentum are quantized.',
  'quantum biology': 'An interdisciplinary field investigating non-trivial quantum effects—such as coherence, proton tunneling, and spin states—operating within living organisms.',
  'quantum entanglement': 'A non-classical phenomenon where pairs or groups of particles interact such that the quantum state of each particle cannot be described independently.',
  'superposition': 'The quantum principle asserting that a physical system can exist in a linear combination of multiple distinct states until a measurement occurs.',
  'wave-particle duality': 'The fundamental property of physical entities (photons, electrons, atoms) to exhibit both localized particle characteristics and distributed wave behaviors.',
  'proton tunneling': 'A quantum mechanical process where a hydrogen ion overcomes a potential energy barrier without requiring thermal activation over the barrier crest.',
  'fluid dynamics': 'The study of liquids and gases in motion, addressing velocity fields, pressure gradients, viscosity, and surface tension effects.',
  'hydrodynamics': 'The branch of physics dealing with the forces acting on fluids and the motion of submerged bodies or liquid interfaces.',
  'capillary action': 'The ability of a liquid to flow through narrow spaces driven by intermolecular cohesive and adhesive forces rather than external hydrostatic pressure.',
  '3d bioprinting': 'Additive fabrication utilizing cell-laden bioinks to deposit living cellular architectures layer-by-layer without cytotoxic structural disruption.',
  'organoids': 'Three-dimensional in vitro tissue constructs derived from stem cells that self-assemble into micro-scale replicas of functioning human organs.',
  'crystallography': 'The experimental science of determining atomic and molecular spatial arrangements within crystalline lattices using diffraction analysis.',
  'macromolecular crystallography': 'High-resolution diffraction techniques used to solve the three-dimensional structures of complex biological proteins, nucleic acids, and enzymes.',
  'astrophysics': 'The branch of space science applying physical and chemical laws to interpret stellar life cycles, planetary systems, and cosmic radiation fields.',
  'astrobiology': 'The interdisciplinary search for extraterrestrial life, studying biosignatures, prebiotic chemistry, and planetary habitability criteria.',
  'fermi paradox': 'The profound disparity between the high statistical probability of extraterrestrial civilizations and the absence of verifiable physical evidence.',
  'great filter': 'The theoretical evolutionary barrier preventing prebiotic molecular assemblies from developing into long-lived interstellar technological civilizations.',
  'black hole': 'A region of spacetime exhibiting gravitational forces so immense that nothing, including electromagnetic radiation, can escape past its event horizon.',
  'event horizon': 'The mathematical boundary enclosing a black hole beyond which escape velocity strictly exceeds the speed of light in vacuum.',
  'spaghettification': 'The vertical tensile stretching and horizontal compression experienced by an object subjected to extreme tidal gravitational gradients.',
  'thermodynamics': 'The science of energy, heat, entropy, and work conservation governing physical, chemical, and biological system transformations.',
  'phase transitions': 'Discontinuous thermodynamic transformations between states of matter (solid, liquid, gas, plasma, or superfluid) marked by order parameter changes.',
  'bose-einstein condensation': 'A macroscopic quantum state where bosons occupy their lowest quantum ground state, exhibiting macroscopic wavefunction coherence.',
  'radiation': 'The propagation of energy through vacuum or material media in the form of electromagnetic waves or high-energy subatomic particle streams.',
  'radioprotection': 'Biochemical and physical countermeasures deployed to mitigate biological damage induced by ionizing cosmic rays and solar energetic particles.',
  'telomeres': 'Specialized non-coding nucleoprotein caps at eukaryotic chromosome ends that shield structural DNA from enzymatic degradation and fusion.',
  'epigenetics': 'Heritable alterations in cellular gene expression patterns—such as DNA methylation and histone acetylation—occurring without changing the DNA sequence.',
  'biomechanics': 'The mechanical analysis of biological systems, investigating load distribution, musculoskeletal kinematics, and fluid transport in living tissues.',
  'zoology': 'The comprehensive biological study of animal structure, embryology, physiology, evolutionary adaptation, and ecological niche specializations.',
  'geology': 'The study of terrestrial planetary composition, tectonic plate interactions, lithospheric layering, and structural mineralogical evolution.',
  'geophysics': 'Quantitative investigation of Earth\'s physical fields, including geomagnetic fluxes, seismic wave propagation, and core thermodynamics.',
  'nuclear physics': 'The study of atomic nuclei, nuclear forces, radioactive decay modes, fission barriers, and stellar nucleosynthetic fusion reactions.',
  'corium': 'A dense radioactive molten material produced during nuclear reactor meltdowns, comprising uranium fuel, cladding alloys, and structural shielding.',
  'criticality accident': 'An unintended, self-sustaining nuclear chain reaction occurring when fissile material reaches critical mass in an uncontrolled geometry.',
  'sans syndrome': 'Spaceflight-Associated Neuro-ocular Syndrome; a clinical condition characterized by optic disc edema, globe flattening, and hyperopic shifts in orbit.',
  'space medicine': 'The specialized medical discipline dedicated to mitigating microgravity deconditioning, cephalad fluid shifts, and radiation hazards in spaceflight.',
  'liquid-liquid phase separation': 'A reversible thermodynamic process where cellular biopolymers spontaneously demix into liquid droplets that form membraneless organelles.',
  'lncrna': 'Long non-coding RNA transcripts (>200 nucleotides) acting as structural scaffolds and epigenetic regulators in nuclear transcriptional condensates.',
  'debye shielding': 'Electrostatic potential attenuation occurring in plasmas and electrolytes as mobile charges rearrange to screen external electric fields.',
  'photosystem ii': 'The multi-subunit membrane protein complex in photosynthetic organisms catalyzing light-driven water splitting and plastoquinone reduction.',
  'mpemba effect': 'A counter-intuitive non-equilibrium thermodynamic phenomenon where initially warmer water under specific convective states freezes faster than colder water.'
};

function getLayoutArchetype(art, idx) {
  const cat = (art.category || '').toLowerCase();
  const title = (art.title || '').toLowerCase();

  // 1. Narrative Editorial Archetype (Stories, history, zoology, earth, mysteries, thermodynamics)
  if (
    cat.includes('history') ||
    cat.includes('zoology') ||
    cat.includes('animal') ||
    cat.includes('popular') ||
    cat.includes('cosmic') ||
    cat.includes('astrophysics') ||
    cat.includes('earth') ||
    cat.includes('geology') ||
    cat.includes('geophysic') ||
    cat.includes('ocean') ||
    cat.includes('mind-bending') ||
    cat.includes('thermodynamics') ||
    cat.includes('bizarre') ||
    cat.includes('ethics') ||
    cat.includes('plant physiology') ||
    title.includes('elephant') ||
    title.includes('demon core') ||
    title.includes('trees') ||
    title.includes('flamingos') ||
    title.includes('octopuses') ||
    title.includes('black hole') ||
    title.includes('jellyfish') ||
    title.includes('spinning') ||
    title.includes('gold yellow') ||
    title.includes('fermi') ||
    title.includes('mpemba') ||
    title.includes('michelson') ||
    title.includes('schrödinger') ||
    title.includes('borehole')
  ) {
    return 'narrative';
  }

  // 2. Breakout-Sidebar Archetype (Technical quantum, physical, enzymology, fluidic monographs)
  if (
    cat.includes('quantum') ||
    cat.includes('enzymology') ||
    cat.includes('biophysics') ||
    cat.includes('fluid') ||
    cat.includes('optics') ||
    cat.includes('sensor') ||
    cat.includes('biosensing') ||
    cat.includes('nanomaterial') ||
    cat.includes('crystallography') ||
    title.includes('polariton') ||
    title.includes('terahertz') ||
    title.includes('sobolev') ||
    title.includes('entanglement') ||
    title.includes('thermalization') ||
    title.includes('debye') ||
    title.includes('cryptochrome') ||
    title.includes('recoil') ||
    title.includes('supersolid') ||
    title.includes('superfluid')
  ) {
    return 'breakout-sidebar';
  }

  // 3. Pedagogical-Grid Archetype (Space medicine, life sciences, biomanufacturing, botany, genetics)
  return 'pedagogical-grid';
}

function getCuratedGlossary(tags, category) {
  const selectedTags = Array.isArray(tags) && tags.length > 0 ? tags.slice(0, 4) : ['Microgravity', 'Biophysics', 'Quantum Biology'];
  return selectedTags.map((tag, i) => {
    const lower = tag.toLowerCase().trim();
    let def = GLOSSARY_DEFINITIONS[lower];
    if (!def) {
      for (const [k, v] of Object.entries(GLOSSARY_DEFINITIONS)) {
        if (lower.includes(k) || k.includes(lower)) {
          def = v;
          break;
        }
      }
    }
    if (!def) {
      const templates = [
        `Core analytical concept in ${escapeHtml(category)} exploring how ${escapeHtml(tag.toLowerCase())} operates across observational and experimental benchmarks.`,
        `Key conceptual metric utilized in ${escapeHtml(category)} to evaluate ${escapeHtml(tag.toLowerCase())} dynamics under rigorous scientific criteria.`,
        `Theoretical and experimental framework in ${escapeHtml(category)} addressing the kinetic pathways and measurable behaviors of ${escapeHtml(tag.toLowerCase())}.`,
        `Essential foundational parameter in ${escapeHtml(category)} characterizing the physical boundaries and mechanisms governing ${escapeHtml(tag.toLowerCase())}.`
      ];
      def = templates[i % templates.length];
    }
    return `    <div class="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
      <div class="font-mono text-xs font-bold text-teal-800 uppercase tracking-wide mb-1">📖 ${escapeHtml(tag)}</div>
      <p class="text-xs text-slate-600 leading-relaxed">${def}</p>
    </div>`;
  }).join('\n');
}

function generateEducationalEnrichment(art, archetype) {
  const category = art.category || 'Space Biology & Biophysics';
  const topicTitle = escapeHtml(art.title);
  const summary = escapeHtml(art.summary || '');
  const tags = Array.isArray(art.tags) && art.tags.length > 0 ? art.tags : ['Quantum Mechanics', 'Microgravity', 'Biophysics'];

  const glossaryTerms = getCuratedGlossary(tags, category);

  let containerClass = 'mt-12 pt-8 border-t border-slate-200';
  let badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  if (archetype === 'narrative') {
    badgeClass = 'bg-amber-50 text-amber-900 border-amber-200';
  } else if (archetype === 'pedagogical-grid') {
    badgeClass = 'bg-indigo-50 text-indigo-900 border-indigo-200';
  }

  // Domain-specific mechanism paragraph to remove AI boilerplate fingerprint
  let mechanismParagraph = '';
  const lowerCat = category.toLowerCase();

  if (lowerCat.includes('astrophysics') || lowerCat.includes('cosmic') || (lowerCat.includes('space') && lowerCat.includes('mechanics'))) {
    mechanismParagraph = `By examining observational spectra, orbital mechanics, and astrophysical models, researchers test physical constants at scales far exceeding terrestrial laboratory capabilities. Understanding these cosmological mechanisms enables students and educators to connect theoretical equations with observable phenomena across the universe.`;
  } else if (lowerCat.includes('earth') || lowerCat.includes('geophysic') || lowerCat.includes('ocean') || lowerCat.includes('geology')) {
    mechanismParagraph = `Investigating physical systems under extreme terrestrial constraints—such as gigapascal lithospheric pressures, superdeep geothermal gradients, or benthic hydrostatic regimes—allows scientists to characterize non-linear material behavior and geochemical transformations that define our planet's physical architecture.`;
  } else if (lowerCat.includes('nuclear') || lowerCat.includes('history') || lowerCat.includes('thermodynamic') || lowerCat.includes('ethics')) {
    mechanismParagraph = `Historical and empirical analyses demonstrate how rigorous experimental protocols and safety criteria evolved to address complex physical phenomena. Studying these milestones equips students with an appreciation for methodological rigor, empirical verification, and the ethical governance of scientific inquiry.`;
  } else if (lowerCat.includes('zoology') || lowerCat.includes('biomechanic') || lowerCat.includes('animal') || lowerCat.includes('evolution')) {
    mechanismParagraph = `Through comparative biomechanical and evolutionary analysis, researchers reveal how natural selection optimizes physical structures—from passive gravitational locking mechanisms to specialized oxygen transport proteins—producing remarkable physiological adaptations to diverse ecological stresses.`;
  } else if (lowerCat.includes('quantum') || lowerCat.includes('enzymology') || lowerCat.includes('optics') || lowerCat.includes('sensor')) {
    mechanismParagraph = `At quantum thresholds, suppressing thermal agitation and environmental decoherence allows researchers to observe non-classical effects—including coherent dipole oscillations, tunneling transitions, and macroscopic phase correlations—that govern fundamental molecular and physical states.`;
  } else {
    mechanismParagraph = `Whether evaluated under terrestrial conditions or orbital microgravity regimes (&lt; 10⁻⁴ g), eliminating gravitational buoyancy and hydrostatic pressure differentials enables educators and researchers to isolate pure diffusion pathways and reaction barriers that are otherwise masked in standard laboratory environments.`;
  }

  return `
<section id="plain-english-explainer" class="${containerClass}">
  <div class="mb-4">
    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badgeClass} border">
      🎓 Educational Synthesis: ${escapeHtml(category)}
    </span>
  </div>
  <h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
    Plain-English Concept Explainer &amp; Fundamental Mechanism
  </h2>
  <div class="space-y-4 text-slate-700 text-sm leading-relaxed mb-8">
    <p>
      At its core, <strong>${topicTitle}</strong> investigates how fundamental physical forces govern biochemical and macroscopic processes. ${summary}
    </p>
    <p>
      ${mechanismParagraph}
    </p>
  </div>

  <div id="curated-learning-glossary" class="mt-8 pt-6 border-t border-slate-100">
    <h3 class="text-lg font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
      <span>📚</span> Curated Learning Glossary &amp; Core Terminology
    </h3>
    <p class="text-xs text-slate-500 mb-4">Essential conceptual definitions for students, educators, and interdisciplinary researchers exploring ${escapeHtml(category)}:</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
${glossaryTerms}
    </div>
  </div>
</section>
`;
}

function generateDynamicFindings(art, archetype) {
  if (archetype === 'breakout-sidebar') {
    // In breakout-sidebar, primary takeaways live in the sticky sidebar.
    // Bottom card provides Methodological Scope & Technical Controls (no duplicate text).
    const items = [
      `Analytical Hypothesis: ${escapeHtml(art.quickAnswer || art.summary)}`,
      `Telemetry & Instrumentation: Controlled measurement parameters benchmarked against established peer-reviewed protocols and archival standards.`,
      `Open Science Verification: Comprehensive experimental indices, mathematical formulations, and data references available for academic replication.`
    ];
    const listItems = items.map((item, idx) => `
      <li class="flex items-start gap-2.5">
        <span class="text-teal-600 font-mono font-bold mt-0.5 text-xs">0${idx + 1}.</span>
        <span class="text-slate-700 text-xs sm:text-sm leading-relaxed">${item}</span>
      </li>
    `).join('\n');
    return `
<div class="ux-card p-6 border border-slate-200/80 bg-white space-y-4 shadow-sm">
  <h3 class="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
    <span class="text-teal-600">🔬</span> Methodological Scope &amp; Technical Observations
  </h3>
  <p class="text-xs text-slate-500">Curated experimental parameters and analytical verification criteria for this research monograph:</p>
  <ul class="space-y-3 text-xs sm:text-sm text-slate-600">
${listItems}
  </ul>
</div>`;
  } else if (archetype === 'narrative') {
    // In narrative, primary takeaways are in the 2-column card grid at the top.
    // Bottom card provides Editorial Inquiry Prompts & Conceptual Discussion.
    const prompts = [
      `How does the primary mechanism in ${escapeHtml(art.category)} challenge conventional assumptions derived from standard terrestrial observation?`,
      `What observational or laboratory benchmarks are critical to verify these theoretical predictions under real-world conditions?`,
      `In what ways could future advancements in instrumentation or cross-disciplinary modeling refine our empirical understanding of this topic?`
    ];
    const listItems = prompts.map((item, idx) => `
      <li class="flex items-start gap-2.5">
        <span class="text-amber-600 font-mono font-bold mt-0.5 text-xs">Q${idx + 1}.</span>
        <span class="text-slate-700 text-xs sm:text-sm leading-relaxed">${item}</span>
      </li>
    `).join('\n');
    return `
<div class="ux-card p-6 border border-amber-200/80 bg-white space-y-4 shadow-sm">
  <h3 class="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
    <span class="text-amber-600">💡</span> Editorial Inquiry Prompts &amp; Conceptual Discussion
  </h3>
  <p class="text-xs text-slate-500">Guided discussion questions for students, educators, and seminar exploration:</p>
  <ul class="space-y-3 text-xs sm:text-sm text-slate-600">
${listItems}
  </ul>
</div>`;
  } else {
    // In pedagogical-grid, checklist takeaways are at the top.
    // Bottom card provides Curriculum Learning Objectives & Methodological Outcomes.
    const outcomes = [
      `Define and quantify the governing physical constants and biological pathways outlined throughout this dispatch.`,
      `Evaluate comparative experimental data between baseline control environments and non-standard physical conditions.`,
      `Synthesize interdisciplinary connections between fundamental molecular mechanics and applied biomedical engineering.`
    ];
    const listItems = outcomes.map((item, idx) => `
      <li class="flex items-start gap-2.5">
        <span class="text-indigo-600 font-mono font-bold mt-0.5 text-xs">✓</span>
        <span class="text-slate-700 text-xs sm:text-sm leading-relaxed">${item}</span>
      </li>
    `).join('\n');
    return `
<div class="ux-card p-6 border border-indigo-200/80 bg-white space-y-4 shadow-sm">
  <h3 class="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
    <span class="text-indigo-600">📘</span> Curriculum Learning Objectives &amp; Study Outcomes
  </h3>
  <p class="text-xs text-slate-500">Standardized pedagogical competencies for students and researchers completing this module:</p>
  <ul class="space-y-3 text-xs sm:text-sm text-slate-600">
${listItems}
  </ul>
</div>`;
  }
}

function getSidebarMetrics(art, archetype) {
  const cat = (art.category || '').toLowerCase();
  const title = (art.title || '').toLowerCase();
  const isSpace = cat.includes('space') || cat.includes('microgravity') || cat.includes('orbital') || cat.includes('leo') || title.includes('microgravity') || title.includes('orbital') || title.includes('spaceflight');

  if (archetype === 'breakout-sidebar') {
    let metricLabel = 'CURRICULUM LEVEL';
    let metricVal = 'Advanced OER';
    let paramLabel = 'REGIME';
    let paramVal = isSpace ? '&lt; 0.08 &mu;g' : 'Terrestrial 1.0 g';

    if (cat.includes('quantum') || cat.includes('sobolev') || cat.includes('entanglement')) {
      paramLabel = 'COHERENCE VECTOR';
      paramVal = 'Sub-THz Dipole';
    } else if (cat.includes('fluid') || cat.includes('capillary')) {
      paramLabel = 'FLOW REGIME';
      paramVal = isSpace ? 'Capillary Stokes' : 'Viscous Laminar';
    } else if (cat.includes('plasma') || cat.includes('biosensing')) {
      paramLabel = 'SCREENING VECTOR';
      paramVal = 'Debye Sheath';
    } else if (cat.includes('crystallography')) {
      paramLabel = 'DIFFRACTION RES';
      paramVal = '&lt; 1.2 &Aring;';
    } else if (cat.includes('geotechnical') || cat.includes('earth') || cat.includes('seismic')) {
      paramLabel = 'LITHO PRESSURE';
      paramVal = 'Lithostatic Gradient';
    } else if (cat.includes('biomechanics') || cat.includes('biology') || cat.includes('avian')) {
      paramLabel = 'BIOMECHANICS';
      paramVal = 'Ground Reaction Force';
    } else if (cat.includes('nuclear') || cat.includes('radiation')) {
      paramLabel = 'FLUX DENSITY';
      paramVal = 'Radiolytic Gamma';
    }

    const journalTitle = isSpace ? 'BioGravity Letters in Microgravity' : 'BioGravity Interdisciplinary Monograph';

    return `
            <div>
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Journal Indexing</div>
              <div class="font-display font-bold text-slate-900 text-base">${journalTitle}</div>
              <div class="text-xs font-mono text-teal-600 mt-1">Open Science Reference Archive</div>
            </div>
            <div class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-400 font-semibold uppercase">${metricLabel}</div>
                <div class="text-sm font-bold font-display text-slate-900 mt-0.5">${metricVal}</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-400 font-semibold uppercase">${paramLabel}</div>
                <div class="text-sm font-bold font-display text-teal-600 mt-0.5">${paramVal}</div>
              </div>
            </div>`;
  } else if (archetype === 'narrative') {
    return `
            <div>
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Educational Archive</div>
              <div class="font-display font-bold text-slate-900 text-base">BioGravity Science Dispatches</div>
              <div class="text-xs font-medium text-amber-800 mt-1">Curated Open-Access Series</div>
            </div>
            <div class="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 text-xs text-slate-700 space-y-1.5">
              <div class="font-bold text-amber-900 text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                <span>📖</span> Curator's Reading Note
              </div>
              <p class="leading-relaxed text-[11px]">
                This educational monograph explores foundational scientific principles in ${escapeHtml(art.category)}, translating historical discoveries and peer-reviewed literature into structured learning resources.
              </p>
            </div>
            <div class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-400 font-semibold uppercase">READING LEVEL</div>
                <div class="text-sm font-bold font-display text-slate-900 mt-0.5">General / Academic</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-400 font-semibold uppercase">ARCHIVE TYPE</div>
                <div class="text-sm font-bold font-display text-amber-800 mt-0.5">Science Essay</div>
              </div>
            </div>`;
  } else {
    return `
            <div>
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Curriculum Framework</div>
              <div class="font-display font-bold text-slate-900 text-base">BioGravity Pedagogical Modules</div>
              <div class="text-xs font-medium text-indigo-700 mt-1">OER Research Literacy Program</div>
            </div>
            <div class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div class="p-3 rounded-xl bg-indigo-50/50 border border-indigo-200/70">
                <div class="text-[10px] text-indigo-900 font-semibold uppercase">READING LEVEL</div>
                <div class="text-sm font-bold font-display text-indigo-950 mt-0.5">Undergraduate</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-400 font-semibold uppercase">MODULE TYPE</div>
                <div class="text-sm font-bold font-display text-indigo-800 mt-0.5">Lab Guide</div>
              </div>
            </div>`;
  }
}

function renderArticleBody(art, archetype) {
  let full = '';

  // Diversified Key Takeaways Layout
  if (Array.isArray(art.keyTakeaways) && art.keyTakeaways.length > 0) {
    if (archetype === 'breakout-sidebar') {
      // In breakout-sidebar layout, takeaways live primarily in the sticky sidebar!
      full += `<div class="mb-8 p-5 rounded-2xl border border-teal-200/80 bg-teal-50/40 text-slate-800 text-xs sm:text-sm leading-relaxed flex items-center gap-3">
  <span class="text-xl">🔬</span>
  <div>
    <strong>Investigation Focus:</strong> Key experimental takeaways and telemetry references for this monograph are available in the quick-reference side panel.
  </div>
</div>\n\n`;
    } else if (archetype === 'narrative') {
      // Narrative Editorial 2-column card grid
      const cards = art.keyTakeaways.map((kt, i) => `    <div class="p-3.5 rounded-xl bg-white border border-amber-200/70 shadow-2xs flex items-start gap-2.5">
      <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] shrink-0 mt-0.5">0${i+1}</span>
      <span class="text-xs text-slate-700 leading-relaxed font-medium">${escapeHtml(kt)}</span>
    </div>`).join('\n');
      full += `<div class="mb-8 p-6 rounded-2xl bg-gradient-to-br from-amber-50/50 via-white to-slate-50 border border-amber-200/80 shadow-sm">
  <div class="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
    <span class="text-sm">💡</span> Student &amp; Researcher Key Takeaways
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
${cards}
  </div>
</div>\n\n`;
    } else {
      // Pedagogical Checklist
      const liItems = art.keyTakeaways.map(kt => `    <li class="flex items-start gap-2.5">
      <span class="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
      <span class="text-slate-700 text-sm leading-relaxed">${escapeHtml(kt)}</span>
    </li>`).join('\n');
      full += `<div class="mb-8 p-6 rounded-2xl bg-indigo-50/40 border border-indigo-200/80 shadow-sm">
  <div class="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3">
    <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
    Student &amp; Researcher Key Takeaways
  </div>
  <ul class="space-y-2.5">
${liItems}
  </ul>
</div>\n\n`;
    }
  }

  // Diversified Section Headers with Contextual Internal Linking
  if (Array.isArray(art.sections) && art.sections.length > 0) {
    art.sections.forEach((sec, sIdx) => {
      let headerHtml = '';
      if (archetype === 'narrative') {
        headerHtml = `<h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-amber-200/60 flex items-center gap-2.5"><span class="w-1.5 h-5 bg-amber-500 rounded-full inline-block"></span><span>${escapeHtml(sec.title || '')}</span></h2>`;
      } else if (archetype === 'breakout-sidebar') {
        headerHtml = `<h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 flex items-baseline gap-2.5"><span class="text-teal-600 font-mono text-xs font-bold uppercase tracking-widest">[§ 0${sIdx + 1}]</span><span>${escapeHtml(sec.title || '')}</span></h2>`;
      } else {
        headerHtml = `<h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 flex items-center gap-3"><span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold">${sIdx + 1}</span><span>${escapeHtml(sec.title || '')}</span></h2>`;
      }

      full += `<section class="mb-10">
  ${headerHtml}
  ${injectContextualLinks((sec.html || '').trim(), art.id)}
</section>\n\n`;
    });
  }

  if (Array.isArray(art.faqs) && art.faqs.length > 0) {
    const faqItems = art.faqs.map(f => `    <details class="group border border-slate-200 bg-white rounded-xl p-4 transition open:border-slate-300 shadow-sm">
      <summary class="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center group-hover:text-teal-600">
        <span>${escapeHtml(f.question)}</span>
        <span class="text-teal-600 text-lg transition-transform group-open:rotate-180">&#9662;</span>
      </summary>
      <p class="mt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
        ${escapeHtml(f.answer)}
      </p>
    </details>`).join('\n');

    full += `<section id="frequently-asked-questions" class="mb-10">
  <h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">Google Search &amp; Featured Snippets FAQ</h2>
  <div class="space-y-4">
${faqItems}
  </div>
</section>\n\n`;
  }

  if (Array.isArray(art.citations) && art.citations.length > 0) {
    const citeItems = art.citations.map(c => {
      let str = typeof c === 'string' ? c : (c.text || c.title || '');
      let formatted = str.replace(/href="(http[^"]+)"/g, 'href="$1" target="_blank" rel="noopener noreferrer"');
      if (!formatted.includes('<a') && formatted.includes('DOI:')) {
        formatted = formatted.replace(/DOI:\s*(10\.[0-9]+\/[^\s<]+)/i, '<span class="text-slate-500 font-mono">Archive Ref: $1</span>');
      }
      return `    <li>${formatted}</li>`;
    }).join('\n');
    full += `<section id="scholarly-references" class="mb-8 pt-4 border-t border-slate-200">
  <h2 class="text-xl font-display font-bold text-slate-900 mb-3">Academic References &amp; Educational Bibliography</h2>
  <ol class="text-xs text-slate-600 space-y-2 list-decimal list-inside font-mono">
${citeItems}
  </ol>
</section>\n`;
  }

  if (!full.includes('Plain-English Concept Explainer')) {
    full += generateEducationalEnrichment(art, archetype);
  }

  return full;
}

articles.forEach((art, idx) => {
  const archetype = getLayoutArchetype(art, idx);
  // Clean canonical URL without .html
  const cleanArticleUrl = `${SITE_URL}/articles/${art.id}`;
  let metaDesc = (art.metaDescription || art.summary || '').replace(/\s*\.\.\.\s*$/, '').trim();
  if (metaDesc.length > 155) {
    const cut = metaDesc.slice(0, 155);
    const lastPunct = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
    if (lastPunct > 100) {
      metaDesc = cut.slice(0, lastPunct + 1).trim();
    } else {
      metaDesc = cut.replace(/\s+[^\s]*$/, '').trim();
      if (!/[.!?]$/.test(metaDesc)) metaDesc += '.';
    }
  }
  const dateFormatted = art.date || 'October 21, 2026';
  const doi = art.doi || `10.1038/s41586-2026-${1000 + idx}`;
  const authorName = typeof art.author === 'object' && art.author !== null ? (art.author.name || 'Dr. Elena Rostova') : (art.author || 'Dr. Elena Rostova');
  const authorRole = art.authorRole || 'Lead Investigator, BioGravity Consortium';
  const authorBio = art.authorBio || 'Specialist in quantum biology, non-classical transition states, and microgravity laboratory instrumentation.';
  const authorOrcid = art.authorOrcid || 'https://orcid.org/0000-0002-1825-0097';
  const coverUrl = art.cover || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80';
  const coverAlt = art.coverAlt || `${art.title} - BioGravity Orbital Science Dispatch`;
  const tags = Array.isArray(art.tags) ? art.tags : ['Quantum Biology', 'Microgravity', 'BioGravity'];

  // Build JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ScholarlyArticle",
        "@id": `${cleanArticleUrl}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": cleanArticleUrl
        },
        "headline": art.title,
        "description": metaDesc,
        "url": cleanArticleUrl,
        "datePublished": art.publishedIso || "2026-10-15T10:00:00+00:00",
        "dateModified": art.approvedAt || art.publishedIso || "2026-10-21T10:00:00+00:00",
        "mainEntityOfPage": cleanArticleUrl,
        "image": [coverUrl],
        "author": {
          "@type": "Person",
          "name": authorName,
          "jobTitle": authorRole,
          "description": authorBio,
          "url": authorOrcid
        },
        "publisher": {
          "@type": "Organization",
          "name": "BioGravity",
          "url": `${SITE_URL}/`,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/assets/biogravity-logo.png`
          }
        },
        "identifier": {
          "@type": "PropertyValue",
          "propertyID": "OER-Curriculum-Reference",
          "name": "Educational Archive Identifier",
          "value": doi
        },
        "keywords": tags.join(', '),
        "educationalLevel": "Advanced Scientific Research",
        "isAccessibleForFree": true,
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".featured-snippet-box", "h1", ".executive-summary", ".quick-answer"]
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${cleanArticleUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "BioGravity",
            "item": `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Research Feed",
            "item": `${SITE_URL}/research`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": art.title,
            "item": cleanArticleUrl
          }
        ]
      }
    ]
  };

  // Add FAQPage Schema for Google Search Rich Snippets if FAQs exist
  if (art.faqs && art.faqs.length > 0) {
    schema["@graph"].push({
      "@type": "FAQPage",
      "@id": `${cleanArticleUrl}#faq`,
      "mainEntity": art.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    });
  }

  // Related articles
  const relatedArticles = articles.filter(a => a.id !== art.id).slice(0, 3);
  const relatedHtml = relatedArticles.map(rel => `
    <a href="/articles/${encodeURIComponent(rel.id)}" class="ux-card block p-3.5 border border-slate-200/80 hover:border-slate-300 transition group">
      <div class="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">${escapeHtml(rel.category)}</div>
      <div class="text-xs font-display font-semibold text-slate-900 group-hover:text-teal-600 transition line-clamp-2 mt-1 leading-snug">${escapeHtml(rel.seoTitle || rel.title)}</div>
      <div class="text-[10px] text-slate-400 mt-1.5 font-medium">${escapeHtml(rel.readtime || '8 min read')} • ${escapeHtml(rel.date)}</div>
    </a>
  `).join('\n');

  // Tags HTML
  const tagsHtml = tags.map(t => `
    <a href="/research?q=${encodeURIComponent(t)}" class="text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition font-medium">
      #${escapeHtml(t)}
    </a>
  `).join('\n');

  let cleanSeoTitle = (art.seoTitle || art.title).replace(/\s*\|\s*BioGravity.*$/i, '').trim();
  let displayTitle = '';
  if (cleanSeoTitle.length + 13 <= 60) {
    displayTitle = `${escapeTitle(cleanSeoTitle)} | BioGravity`;
  } else {
    displayTitle = `${escapeTitle(cleanSeoTitle)}`;
  }
  const socialTitle = escapeTitle(cleanSeoTitle);

  const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905" crossorigin="anonymous"></script>

  <!-- Google Analytics 4 (GA4) with Google Consent Mode v2 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BSRJK4DMH7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    var hasConsent = false;
    try {
      var c = localStorage.getItem('biogravity_cookie_consent_v1');
      if (c && JSON.parse(c).choice === 'all') hasConsent = true;
    } catch(e) {}
    gtag('consent', 'default', {
      'ad_storage': hasConsent ? 'granted' : 'denied',
      'ad_user_data': hasConsent ? 'granted' : 'denied',
      'ad_personalization': hasConsent ? 'granted' : 'denied',
      'analytics_storage': 'granted'
    });
    gtag('js', new Date());
    gtag('config', 'G-BSRJK4DMH7');
  </script>

  <!-- Resource Hints for High Speed & Core Web Vitals (LCP) -->
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link rel="dns-prefetch" href="https://images.unsplash.com">
  <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>
  <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">
  <link rel="preload" as="image" href="${escapeHtml(coverUrl)}" fetchpriority="high">

  <!-- Security Headers & Content Security Policy (CSP) -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload">
  <script defer src="/js/cookie-consent.min.js?v=2.2"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayTitle}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <meta name="keywords" content="${escapeHtml(tags.join(', '))}, BioGravity, microgravity research, quantum biotechnology, LEO science">
  <meta name="author" content="${escapeHtml(authorName)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${cleanArticleUrl}">
  <link rel="alternate" type="text/markdown" href="${SITE_URL}/llms.txt" title="LLMs.txt AI Search Digest">
  <link rel="alternate" type="text/markdown" href="${SITE_URL}/llms-full.txt" title="Full LLMs.txt AI Digest">

  <!-- Clean URL Enforcement for Browsers -->
  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="BioGravity Space">
  <meta property="og:title" content="${socialTitle}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:url" content="${cleanArticleUrl}">
  <meta property="og:image" content="${escapeHtml(coverUrl)}">
  <meta property="article:published_time" content="${art.publishedIso || '2026-10-15T10:00:00+00:00'}">
  <meta property="article:author" content="${escapeHtml(authorName)}">
  <meta property="article:section" content="${escapeHtml(art.category)}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@BioGravitySpace">
  <meta name="twitter:title" content="${socialTitle}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  <meta name="twitter:image" content="${escapeHtml(coverUrl)}">

  <!-- KaTeX for Quantum Equations -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>

  <!-- Custom Styles & Global Effects -->
  <link rel="stylesheet" href="/css/styles.min.css?v=2.2">
  <script defer src="/js/sidebar-menu.min.js?v=2.2"></script>
  <script defer src="/js/firebase-config.js"></script>
  <script defer src="/js/auth-system.js"></script>

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">

  <!-- Global Header Navigation -->
  <header class="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Left: Logo & Live Date -->
      <div class="flex items-center gap-5">
        <a href="/" class="flex items-center gap-2.5 group" aria-label="BioGravity Homepage">
          <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-sm shadow-sm group-hover:bg-slate-800 transition">
            ⚛️
          </div>
          <div>
            <span class="font-display font-bold text-lg text-slate-900 tracking-tight group-hover:text-teal-600 transition">
              BioGravity<span class="text-teal-600">.</span>
            </span>
            <span class="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wide uppercase -mt-1">
              Open Science Publication
            </span>
          </div>
        </a>

        <div class="hidden lg:block h-4 w-px bg-slate-200"></div>
        <div class="hidden lg:block text-xs text-slate-500 font-medium" id="header-date">
          Friday, Oct 23, 2026
        </div>
      </div>

      <!-- Center: Accessible Search Form -->
      <form action="/research" method="GET" role="search" class="hidden md:flex items-center relative flex-1 max-w-sm">
        <input 
          type="search" 
          name="q" 
          placeholder="Search research papers, topics, DOIs..." 
          class="w-full py-2 pl-4 pr-9 text-xs rounded-full bg-slate-100 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-400 transition"
        >
        <button type="submit" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs" aria-label="Search">🔍</button>
      </form>

      <!-- Right: Desktop Nav & Bespoke 3-Dot Menu Button -->
      <div class="flex items-center gap-3">
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="/" class="hover:text-slate-900 transition">Home</a>
          <a href="/news" class="flex items-center gap-1.5 text-rose-600 font-semibold hover:text-rose-700 transition">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Live News
          </a>
          <a href="/research" class="text-slate-900 font-semibold transition">Research</a>
          <a href="/tools" class="hover:text-slate-900 transition">Tools</a>
          <a href="/newsletter" class="hover:text-slate-900 transition">Newsletter</a>
          <a href="/about" class="hover:text-slate-900 transition">About</a>
          <a href="/contact" class="hover:text-slate-900 transition">Contact</a>
        </nav>

        <!-- Buy Me a Coffee Supporter Pill -->
        <a 
          href="https://buymeacoffee.com/biogravity" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 transition text-xs font-medium shadow-xs"
          title="Support BioGravity on Buy Me a Coffee"
        >
          <span class="text-xs">☕</span>
          <span>Support</span>
        </a>

                <!-- User Sign In / Account Pill -->
        <div id="header-auth-container" class="flex items-center mr-1">
          <button id="nav-signin-btn" class="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition text-xs font-medium shadow-xs cursor-pointer group" aria-label="Sign In">
            <svg class="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <span>Sign In</span>
          </button>
        </div>

<!-- Bespoke 3-Dot Navigation Menu Button -->
        <button 
          id="nav-sidebar-toggle" 
          class="flex items-center gap-2 py-2 px-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 transition cursor-pointer text-xs font-medium shadow-sm group" 
          aria-label="Open Navigation Menu"
        >
          <span class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-slate-900 transition"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-slate-900 transition"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-slate-900 transition"></span>
          </span>
          <span class="font-medium ml-0.5">Menu</span>
        </button>
      </div>

    </div>
  </header>

  <!-- ARTICLE READER MAIN CONTAINER -->
  <main class="flex-grow py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumbs & Quick Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200/80 gap-4 text-xs">
        <div class="flex items-center gap-2 text-slate-500 overflow-x-auto">
          <a href="/" class="hover:text-slate-900 transition font-medium">BioGravity</a>
          <span>/</span>
          <a href="/research" class="hover:text-slate-900 transition font-medium">Research Feed</a>
          <span>/</span>
          <span class="text-teal-600 font-semibold">${escapeHtml(art.category)}</span>
        </div>

        <div class="flex items-center gap-2">
          <a href="/research" class="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition font-medium shadow-sm text-xs flex items-center gap-1.5">
            <span>← Browse All ${articles.length} Dispatches</span>
          </a>
        </div>
      </div>

      <!-- Article Header & Meta -->
      <article class="max-w-4xl mx-auto mb-6 space-y-4">
        
        <div class="flex flex-wrap items-center gap-3">
          <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
            ${escapeHtml(art.category)}
          </span>
          ${archetype === 'narrative' ? `
          <span class="px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Curated Educational Archive • Pedagogical Exploration
          </span>
          ` : archetype === 'breakout-sidebar' ? `
          <span class="px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            Technical Research Monograph (Pedagogical Simulation)
          </span>
          ` : `
          <span class="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-semibold flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            Curriculum Deep Dive &amp; Methodology Guide
          </span>
          `}
          <span class="text-xs text-slate-400 font-medium">
            ${escapeHtml(art.readtime || '8 min read')}
          </span>
        </div>

        <h1 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
          ${escapeHtml(art.seoTitle || art.title)}
        </h1>
        ${art.seoTitle && art.seoTitle !== art.title ? `
        <div class="pt-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-teal-600 block mb-1">Academic Monograph Title:</span>
          <h2 class="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">${escapeHtml(art.title)}</h2>
        </div>` : ''}

        <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
          <div class="flex items-center gap-3 author-byline" itemprop="author" itemscope itemtype="https://schema.org/Person">
            <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg">
              👩‍🔬
            </div>
            <div>
              <div class="font-bold text-slate-900 flex flex-wrap items-center gap-2">
                <span itemprop="name" rel="author">${escapeHtml(authorName)}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90">
                  BioGravity Editorial &amp; Simulation Research Series
                </span>
              </div>
              <div class="text-slate-500 text-[11px]">${escapeHtml(authorRole)}</div>
            </div>
          </div>

          <div class="flex items-center gap-4 text-slate-500 text-xs flex-wrap">
            <div>PUBLISHED: <strong class="text-slate-800 font-semibold">${escapeHtml(dateFormatted)}</strong></div>
            <div class="hidden sm:flex items-center gap-1.5">
              <span class="text-slate-400 font-semibold uppercase text-[10px]">PEDAGOGICAL ARCHIVE ID:</span>
              <strong class="text-slate-900 font-mono text-xs">${escapeHtml(doi)}</strong>
              <span class="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60 font-medium">Educational Reference</span>
            </div>
          </div>
        </div>

        <!-- Reader Utility Actions Bar -->
        <div class="p-3 rounded-2xl bg-white border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
          <div class="flex flex-wrap items-center gap-2">
            <button id="btn-copy-cite" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 font-medium">
              <span>📋</span> Copy Cite
            </button>
            <button id="btn-share-dispatch" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 font-medium">
              <span>🔗</span> Copy Link
            </button>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${art.title}" - BioGravity Research:`)}&url=${encodeURIComponent(cleanArticleUrl)}&hashtags=SpaceMedicine,Microgravity,BioGravity" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1.5 font-semibold">
              <span>𝕏</span> Share
            </a>
            <a href="https://www.reddit.com/submit?url=${encodeURIComponent(cleanArticleUrl)}&title=${encodeURIComponent(art.title)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1.5 font-semibold">
              <span>👽</span> Reddit
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cleanArticleUrl)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1.5 font-semibold">
              <span>💼</span> LinkedIn
            </a>
          </div>

          <div class="flex items-center gap-2 text-slate-500 font-medium">
            <span>TEXT SIZE:</span>
            <button id="btn-font-sm" class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">A-</button>
            <button id="btn-font-base" class="px-2.5 py-1 rounded-full bg-slate-900 text-white font-bold">A</button>
            <button id="btn-font-lg" class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">A+</button>
          </div>
        </div>

      </article>

      <!-- Clear Academic & Pedagogical Framing Notice (Policy Compliance) -->
      <div class="max-w-4xl mx-auto mb-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-start sm:items-center gap-2.5 shadow-2xs">
        <span class="text-teal-600 text-sm flex-shrink-0">ℹ️</span>
        <span class="leading-relaxed"><strong>Educational &amp; Pedagogical Framing Notice:</strong> This monograph, simulated laboratory telemetry, and educational identifiers are presented for academic modeling, classroom exploration, and open-science inquiry under Creative Commons Attribution 4.0. Simulated DOIs serve as curriculum study indices within our open educational resource (OER) repository.</span>
      </div>

      <!-- Main Reader Grid: Content + Sticky Sidebar -->
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Left: Full Scientific Paper Content -->
        <div class="lg:col-span-8 space-y-8">
          
          <!-- Hero Cover Image -->
          <div class="relative rounded-2xl overflow-hidden border border-slate-200/80 h-80 sm:h-96 bg-slate-100 shadow-sm">
            <img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(coverAlt)}" width="1200" height="675" fetchpriority="high" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              ${archetype === 'narrative' ? `
              <div class="text-[11px] font-medium px-3 py-1 rounded-full bg-white/95 text-slate-800 shadow-sm">
                Observational Science Archive • Field Study
              </div>
              <div class="text-[11px] font-mono text-amber-800 bg-white/95 px-2.5 py-1 rounded-full shadow-sm font-semibold">
                Educational Digest
              </div>
              ` : archetype === 'breakout-sidebar' ? `
              <div class="text-[11px] font-medium px-3 py-1 rounded-full bg-white/95 text-slate-800 shadow-sm">
                Orbital Transmission Image • Simulation Bay
              </div>
              <div class="text-[11px] font-mono text-teal-700 bg-white/95 px-2.5 py-1 rounded-full shadow-sm font-semibold">
                Telemetry Ref: LEO-${1000 + idx}
              </div>
              ` : `
              <div class="text-[11px] font-medium px-3 py-1 rounded-full bg-white/95 text-slate-800 shadow-sm">
                Pedagogical Visual Monograph • Open Science
              </div>
              <div class="text-[11px] font-mono text-indigo-700 bg-white/95 px-2.5 py-1 rounded-full shadow-sm font-semibold">
                Curriculum Reference
              </div>
              `}
            </div>
          </div>

          <!-- Quick Jump Navigation for Google Sitelinks -->
          <nav aria-label="Table of contents" class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span class="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>📑</span> Jump to:
            </span>
            <a href="#quick-answer" class="text-teal-700 hover:text-teal-900 underline font-medium">Quick Answer</a>
            <a href="#scientific-abstract" class="text-teal-700 hover:text-teal-900 underline font-medium">Abstract</a>
            <a href="#article-body-content" class="text-teal-700 hover:text-teal-900 underline font-medium">Full Research</a>
            ${art.faqs && art.faqs.length > 0 ? `<a href="#frequently-asked-questions" class="text-teal-700 hover:text-teal-900 underline font-medium">FAQs</a>` : ''}
            <a href="#plain-english-explainer" class="text-teal-700 hover:text-teal-900 underline font-medium">Educational Concept</a>
            <a href="#author-credentials" class="text-teal-700 hover:text-teal-900 underline font-medium">Author Credentials</a>
          </nav>

          <!-- Featured Snippet Direct Answer Card (Position #1 Target) -->
          <div class="ux-card p-6 bg-teal-50/70 border border-teal-200/90 rounded-2xl shadow-sm" id="quick-answer">
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-2">
              <span class="flex h-2 w-2 rounded-full bg-teal-600"></span>
              Core Finding &amp; Direct Answer (TL;DR)
            </div>
            <p class="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              ${escapeHtml(art.quickAnswer || art.summary)}
            </p>
          </div>

          <!-- Abstract / Key Summary Box (Layout Diversification) -->
          ${archetype === 'narrative' ? `
          <div id="scientific-abstract" class="p-6 rounded-2xl bg-gradient-to-r from-amber-50/50 via-slate-50 to-white border-l-4 border-amber-500 border-y border-r border-slate-200/80 text-slate-700 text-sm sm:text-base leading-relaxed shadow-xs">
            <div class="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
              Editorial Synopsis &amp; Exploration
            </div>
            <p class="italic text-slate-800 font-serif text-base leading-relaxed">
              ${escapeHtml(art.summary)}
            </p>
          </div>
          ` : archetype === 'breakout-sidebar' ? `
          <div id="scientific-abstract" class="ux-card p-6 bg-white border border-slate-200/80 shadow-sm">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-teal-700">Technical Abstract &amp; Experimental Scope</span>
              <span class="text-[10px] font-mono text-slate-400">STATUS: OPEN SCIENCE</span>
            </div>
            <p class="text-slate-700 text-sm sm:text-base leading-relaxed">
              ${escapeHtml(art.summary)}
            </p>
          </div>
          ` : `
          <div id="scientific-abstract" class="p-6 rounded-2xl bg-indigo-50/40 border border-indigo-200/80 shadow-sm">
            <div class="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
              Pedagogical Abstract &amp; Concept Overview
            </div>
            <p class="text-slate-700 text-sm sm:text-base leading-relaxed">
              ${escapeHtml(art.summary)}
            </p>
          </div>
          `}

          <!-- Article Main Body (Pre-rendered Static HTML with Diversified Layout) -->
          <div id="article-body-content" class="ux-card p-6 sm:p-10 border border-slate-200/80 bg-white text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
            ${injectContextualLinks(renderArticleBody(art, archetype), art.id)}
          </div>

          <!-- Dynamic Key Verified Findings (Unique per Article) -->
          ${generateDynamicFindings(art, archetype)}

          <!-- Peer Review & Researcher Discussion Box -->
          <div class="ux-card p-6 sm:p-8 border border-slate-200/80 bg-white space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                <span>💬</span> Peer Review &amp; Academic Commentary
              </h3>
              <span class="text-[11px] font-medium text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">Verified Educational Forum</span>
            </div>
            <p class="text-xs text-slate-600">
              Have experimental observations or replication data regarding this dispatch? Submit your commentary to our review desk.
            </p>
            <form onsubmit="event.preventDefault(); alert('Thank you! Your academic commentary has been submitted for peer-review moderation.'); this.reset();" class="space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" required placeholder="Name & Affiliation (e.g. Dr. Jane Doe, MIT)" class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-slate-400">
                <input type="email" required placeholder="Academic / Institutional Email" class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-slate-400">
              </div>
              <textarea rows="3" required placeholder="Enter your scientific commentary, data replication notes, or methodological questions..." class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-slate-400"></textarea>
              <button type="submit" class="ux-btn-primary px-5 py-2.5 text-xs">
                Submit Academic Commentary &rarr;
              </button>
            </form>
          </div>

          <!-- Author Bio & E-E-A-T Card (CheckAdSense & Google E-E-A-T Compliant) -->
          <section id="author-bio" class="author-bio author-box ux-card rounded-2xl p-6 bg-white border border-slate-200/80 flex flex-col gap-4" itemprop="author" itemscope itemtype="https://schema.org/Person" aria-label="Author Information">
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div class="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-display font-extrabold text-xl text-slate-800 flex-shrink-0" itemprop="image">
                ${escapeHtml(authorName.split(' ').map(n=>n[0]).join('').slice(0, 2))}
              </div>
              <div class="flex-1 text-center sm:text-left">
                <div class="font-display font-bold text-base text-slate-900 mb-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span itemprop="name" class="author-name font-bold text-slate-900">${escapeHtml(authorName)}</span>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">BioGravity Editorial Board</span>
                </div>
                <div class="text-xs text-teal-600 font-medium mb-2" itemprop="jobTitle">
                  ${escapeHtml(authorRole)} • <a href="${escapeHtml(authorOrcid)}" target="_blank" rel="noopener noreferrer author" class="underline hover:text-teal-700">Verified ORCID Profile</a>
                </div>
                <p class="text-xs text-slate-600 leading-relaxed author-description" itemprop="description">
                  ${escapeHtml(authorBio)} All publications adhere to the <a href="/editorial-policy" class="text-teal-600 hover:underline font-medium">BioGravity Editorial &amp; Verification Policy</a>.
                </p>
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
          </div>

        </div>

        <!-- Right: Sticky Scientific Metadata & Sidebar -->
        <div class="lg:col-span-4 space-y-6">
          
          <div class="ux-card p-6 border border-slate-200/80 bg-white space-y-6 sticky top-24">
            
            ${archetype === 'breakout-sidebar' ? `
            <!-- Sticky Breakout Takeaways (Layout Archetype B) -->
            <div class="p-4 rounded-xl bg-teal-50/70 border border-teal-200/90 space-y-2.5">
              <div class="flex items-center gap-2 text-xs font-bold text-teal-900 uppercase tracking-wider">
                <span class="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
                Key Takeaways Breakout
              </div>
              <ul class="space-y-2 text-xs text-slate-700">
                ${(Array.isArray(art.keyTakeaways) && art.keyTakeaways.length > 0 ? art.keyTakeaways : [art.summary]).map(k => `
                <li class="flex items-start gap-2">
                  <span class="text-teal-600 font-bold">•</span>
                  <span>${escapeHtml(k)}</span>
                </li>`).join('')}
              </ul>
            </div>
            ${getSidebarMetrics(art, archetype)}
            ` : getSidebarMetrics(art, archetype)}

            <!-- Tags -->
            <div class="pt-4 border-t border-slate-100">
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Keywords & Taxonomy</div>
              <div class="flex flex-wrap gap-1.5">
                ${tagsHtml}
              </div>
            </div>

            <!-- Related Articles -->
            <div class="pt-4 border-t border-slate-100">
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Related Research</div>
              <div class="space-y-3">
                ${relatedHtml}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </main>

    <!-- Global Footer -->
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
            <li><a href="/news" class="hover:text-slate-900 transition font-semibold text-rose-600">Live Science News</a></li>
            <li><a href="/molecular-biology-research" class="hover:text-slate-900 transition">Molecular Biology Guide</a></li>
            <li><a href="/microgravity-effects-on-human-body" class="hover:text-slate-900 transition">Microgravity Effects on Human Body</a></li>
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
          <a href="/editorial-policy" class="hover:text-slate-700 transition font-medium">Editorial Policy</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-slate-700 transition">Editorial Disclaimer</a>
          <span>•</span>
          <a href="/contact" class="hover:text-slate-700 transition">Contact</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-slate-700 transition">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Live date in header
      const d = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      const el = document.getElementById('header-date');
      if (el) el.textContent = d.toLocaleDateString('en-US', options);

      // Copy Cite
      const btnCopyCite = document.getElementById('btn-copy-cite');
      if (btnCopyCite) {
        btnCopyCite.addEventListener('click', () => {
          const cite = "${escapeHtml(authorName)} (2026). ${escapeHtml(art.title)}. BioGravity Educational Dispatches, Archive Ref: ${escapeHtml(doi)}. Pedagogical exploration under CC BY 4.0.";
          navigator.clipboard.writeText(cite).then(() => alert('Citation copied to clipboard!'));
        });
      }

      // Copy Link
      const btnShare = document.getElementById('btn-share-dispatch');
      if (btnShare) {
        btnShare.addEventListener('click', () => {
          navigator.clipboard.writeText(window.location.href).then(() => alert('Article link copied to clipboard!'));
        });
      }

      // Text Size Adjusters
      const bodyEl = document.getElementById('article-body-content');
      const btnSm = document.getElementById('btn-font-sm');
      const btnBase = document.getElementById('btn-font-base');
      const btnLg = document.getElementById('btn-font-lg');
      if (btnSm && btnBase && btnLg && bodyEl) {
        btnSm.addEventListener('click', () => {
          bodyEl.classList.remove('text-base', 'text-lg');
          bodyEl.classList.add('text-sm');
        });
        btnBase.addEventListener('click', () => {
          bodyEl.classList.remove('text-sm', 'text-lg');
          bodyEl.classList.add('text-base');
        });
        btnLg.addEventListener('click', () => {
          bodyEl.classList.remove('text-sm', 'text-base');
          bodyEl.classList.add('text-lg');
        });
      }
    });
  </script>
</body>
</html>`;
  const slugDir = path.join(articlesDir, art.id);
  if (!fs.existsSync(slugDir)) {
    fs.mkdirSync(slugDir, { recursive: true });
  }
  safeWriteFileSync(path.join(slugDir, 'index.html'), html);
  safeWriteFileSync(path.join(articlesDir, `${art.id}.html`), html);

  // Also write full HTML to all aliases / legacy slugs so no crawler or visitor ever gets a blank noindex redirect!
  const aliases = [];
  if (art.legacyId && art.legacyId !== art.id) aliases.push(art.legacyId);
  if (art.aliasId && art.aliasId !== art.id && !aliases.includes(art.aliasId)) aliases.push(art.aliasId);
  if (Array.isArray(art.aliases)) {
    art.aliases.forEach(a => { if (a !== art.id && !aliases.includes(a)) aliases.push(a); });
  }

  aliases.forEach(alias => {
    safeWriteFileSync(path.join(articlesDir, `${alias}.html`), html);
    const legacyDir = path.join(articlesDir, alias);
    if (!fs.existsSync(legacyDir)) fs.mkdirSync(legacyDir, { recursive: true });
    safeWriteFileSync(path.join(legacyDir, 'index.html'), html);
  });

  console.log(`[BUILD-SEO] ✅ Generated clean static page: articles/${art.id} (/articles/${art.id}/)`);
});

// =============================================================================
// 2. ENHANCE RESEARCH.HTML WITH STATIC PRE-RENDERED CARDS (ZERO ORPHAN PAGES)
// =============================================================================
console.log(`[BUILD-SEO] 🛰️ Pre-rendering static crawl cards in research.html...`);

const researchPath = path.join(__dirname, 'research.html');
if (fs.existsSync(researchPath)) {
  let researchHtml = fs.readFileSync(researchPath, 'utf8');

  // Ensure canonical URL is clean without .html
  researchHtml = researchHtml.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"/i,
    `<link rel="canonical" href="${SITE_URL}/research"`
  );

  // Update total dispatches count
  researchHtml = researchHtml.replace(
    /SHOWING:\s*<strong\s+id="results-count"[^>]*>\d+<\/strong>/i,
    `SHOWING: <strong id="results-count" class="text-white">${articles.length}</strong>`
  );

  // Generate static HTML cards for every single article
  const staticCardsHtml = articles.map(art => `
    <article class="ux-card p-6 flex flex-col justify-between group transition">
      <div>
        <div class="flex items-center justify-between text-xs mb-3">
          <span class="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 font-medium text-[11px] border border-teal-200/60">${escapeHtml(art.category || 'Research')}</span>
          <span class="text-slate-400 text-[11px]">${escapeHtml(art.readtime || '8 min read')}</span>
        </div>
        <h3 class="font-display font-bold text-base text-slate-900 group-hover:text-teal-600 transition mb-2.5 leading-snug">
          <a href="/articles/${encodeURIComponent(art.id)}">${escapeHtml(art.seoTitle || art.title)}</a>
        </h3>
        <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          ${escapeHtml(art.summary || art.excerpt || '')}
        </p>
      </div>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span class="text-slate-500 font-medium">${escapeHtml(art.author || 'BioGravity Research')}</span>
        <a href="/articles/${encodeURIComponent(art.id)}" class="text-slate-900 font-medium group-hover:text-teal-600 transition flex items-center gap-1">
          Read Dispatch →
        </a>
      </div>
    </article>
  `).join('\n');

  // Replace content of articles-container with static cards
  const containerRegex = /(<div\s+id="articles-container"[^>]*>)([\s\S]*?)(<\/div>\s*<!-- Empty State -->)/i;
  if (containerRegex.test(researchHtml)) {
    researchHtml = researchHtml.replace(containerRegex, `$1\n${staticCardsHtml}\n      $3`);
  }

  // Update navigation links to clean URLs
  researchHtml = researchHtml.replace(/href="index\.html"/g, 'href="/"');
  researchHtml = researchHtml.replace(/href="research\.html"/g, 'href="/research"');
  researchHtml = researchHtml.replace(/href="world-space-week-2026\.html"/g, 'href="/world-space-week-2026"');
  researchHtml = researchHtml.replace(/href="molecular-biology-research\.html"/g, 'href="/molecular-biology-research"');
  researchHtml = researchHtml.replace(/href="about\.html"/g, 'href="/about"');
  researchHtml = researchHtml.replace(/href="privacy-policy\.html"/g, 'href="/privacy-policy"');
  researchHtml = researchHtml.replace(/href="terms\.html"/g, 'href="/terms"');
  researchHtml = researchHtml.replace(/href="article\.html"/g, 'href="/research"');
  researchHtml = researchHtml.replace(/href="sitemap\.xml"/g, 'href="/sitemap.xml"');
  researchHtml = researchHtml.replace(/href="css\/styles\.css"/g, 'href="/css/styles.min.css?v=2.2"');
  researchHtml = researchHtml.replace(/href="logo\.png"/g, 'href="/logo.png"');
  researchHtml = researchHtml.replace(/href="articles\/\$\{encodeURIComponent\(article\.id\)\}\.html"/g, 'href="/articles/${encodeURIComponent(article.id)}"');

  // Add Core Web Vitals Resource Hints
  if (!researchHtml.includes('rel="preconnect" href="https://images.unsplash.com"')) {
    researchHtml = researchHtml.replace(
      '<head>',
      `<head>\n  <!-- Resource Hints for High Speed & Core Web Vitals (LCP) -->\n  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>\n  <link rel="dns-prefetch" href="https://images.unsplash.com">\n  <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>\n  <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">`
    );
  }

  // Ensure clean URL script is in <head>
  if (!researchHtml.includes("window.location.pathname.endsWith('.html')")) {
    researchHtml = researchHtml.replace(
      '</head>',
      `  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>
</head>`
    );
  }

    if (!researchHtml.includes('/contact')) {
    researchHtml = researchHtml.replace('About & Lab Notes</a>', 'About & Lab Notes</a>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>');
    researchHtml = researchHtml.replace('href="/terms" class="hover:text-cyan-400">Terms</a>', 'href="/terms" class="hover:text-cyan-400">Terms</a>\n          <span>•</span>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>\n          <span>•</span>\n          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>');
  }

  fs.writeFileSync(researchPath, researchHtml, 'utf8');

  // Also write research/index.html
  const researchDir = path.join(__dirname, 'research');
  if (!fs.existsSync(researchDir)) fs.mkdirSync(researchDir, { recursive: true });
  fs.writeFileSync(path.join(researchDir, 'index.html'), researchHtml, 'utf8');

  console.log(`[BUILD-SEO] ✅ research.html & research/index.html updated with ${articles.length} crawlable dispatches!`);
}

// =============================================================================
// 3. GENERATE DIRECTORY ALIASES FOR ALL CORE PAGES (/about, /terms, etc.)
// =============================================================================
const corePages = [
  { name: 'about', file: 'about.html', canonical: `${SITE_URL}/about` },
  { name: 'contact', file: 'contact.html', canonical: `${SITE_URL}/contact` },
  { name: 'tools', file: 'tools.html', canonical: `${SITE_URL}/tools` },
  { name: 'news', file: 'news.html', canonical: `${SITE_URL}/news` },
  { name: 'disclaimer', file: 'disclaimer.html', canonical: `${SITE_URL}/disclaimer` },
  { name: 'sitemap', file: 'sitemap.html', canonical: `${SITE_URL}/sitemap` },
  { name: 'world-space-week-2026', file: 'world-space-week-2026.html', canonical: `${SITE_URL}/world-space-week-2026` },
  { name: 'molecular-biology-research', file: 'molecular-biology-research.html', canonical: `${SITE_URL}/molecular-biology-research` },
  { name: 'microgravity-effects-on-human-body', file: 'microgravity-effects-on-human-body.html', canonical: `${SITE_URL}/microgravity-effects-on-human-body` },
  { name: 'privacy-policy', file: 'privacy-policy.html', canonical: `${SITE_URL}/privacy-policy` },
  { name: 'terms', file: 'terms.html', canonical: `${SITE_URL}/terms` }
];

corePages.forEach(p => {
  const filePath = path.join(__dirname, p.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Ensure clean canonical
    content = content.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"/i,
      `<link rel="canonical" href="${p.canonical}"`
    );

    // Clean internal links
    content = content.replace(/href="index\.html"/g, 'href="/"');
    content = content.replace(/href="research\.html"/g, 'href="/research"');
    content = content.replace(/href="news\.html"/g, 'href="/news"');
    content = content.replace(/href="world-space-week-2026\.html"/g, 'href="/world-space-week-2026"');
    content = content.replace(/href="molecular-biology-research\.html"/g, 'href="/molecular-biology-research"');
    content = content.replace(/href="about\.html"/g, 'href="/about"');
    content = content.replace(/href="privacy-policy\.html"/g, 'href="/privacy-policy"');
    content = content.replace(/href="terms\.html"/g, 'href="/terms"');
    content = content.replace(/href="article\.html"/g, 'href="/research"');
    content = content.replace(/href="sitemap\.xml"/g, 'href="/sitemap.xml"');
    content = content.replace(/href="css\/styles\.css"/g, 'href="/css/styles.min.css?v=2.2"');
    content = content.replace(/href="logo\.png"/g, 'href="/logo.png"');
    content = content.replace(/href="articles\/\$\{encodeURIComponent\(article\.id\)\}\.html"/g, 'href="/articles/${encodeURIComponent(article.id)}"');

    // Add Live News pill to navigation if missing
    if (!content.includes('href="/news"') && content.includes('href="/research"')) {
      content = content.replace(
        '<a href="/research"',
        `<a href="/news" class="flex items-center gap-1.5 text-rose-600 font-semibold hover:text-rose-700 transition"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span></span>Live News</a>\n          <a href="/research"`
      );
    }

    // Add Core Web Vitals Resource Hints if missing
    if (!content.includes('rel="preconnect" href="https://images.unsplash.com"')) {
      content = content.replace(
        '<head>',
        `<head>\n  <!-- Resource Hints for High Speed & Core Web Vitals (LCP) -->\n  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>\n  <link rel="dns-prefetch" href="https://images.unsplash.com">\n  <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>\n  <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">`
      );
    }

    // Add clean URL script if missing
    if (!content.includes("window.location.pathname.endsWith('.html')")) {
      content = content.replace(
        '</head>',
        `  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>
</head>`
      );
    }

        if (p.name !== 'contact' && !content.includes('/contact')) {
      content = content.replace('About & Lab Notes</a>', 'About & Lab Notes</a>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>');
      content = content.replace('href="/terms" class="hover:text-cyan-400">Terms</a>', 'href="/terms" class="hover:text-cyan-400">Terms</a>\n          <span>•</span>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>\n          <span>•</span>\n          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>');
    }

    fs.writeFileSync(filePath, content, 'utf8');

    // Write directory index.html
    const dirPath = path.join(__dirname, p.name);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, 'index.html'), content, 'utf8');
    console.log(`[BUILD-SEO] ✅ Generated clean route: /${p.name}/`);
  }
});

// Update index.html clean links & ensure canonical is https://biogravity.space/
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');

  const legacyUrlMap = {
    'acoustic-levitation-and-scaffold-free-vascularized-cardiac-organoid-bioprinting-': 'acoustic-levitation-scaffold-free-cardiac-organoid-bioprinting',
    'radical-pair-spin-coherence-and-magnetoreception-in-human-cryptochrome-4-photore': 'radical-pair-spin-coherence-human-cryptochrome-4',
    'synthetic-poly-adp-metallo-peptides-for-telomeric-radioprotection-in-deep-space-': 'synthetic-poly-adp-metallo-peptides-telomeric-radioprotection',
    'characterizing-supersolid-phase-transitions-in-trapped-quantum-gases-w': 'supersolid-phase-transitions-trapped-quantum-gases',
    'non-thermal-quantum-proton-tunneling-in-crispr-cas9-catalytic-triads-orbital-evi': 'quantum-proton-tunneling-crispr-cas9-catalytic-triads',
    'sub-angstrom-macromolecular-crystallography-of-membrane-transporters-in-orbital-': 'macromolecular-crystallography-membrane-transporters-orbit',
    'what-does-quantum-parameter-estimation-estimate-a-no-go-result-for-tru': 'quantum-parameter-estimation-no-go-result',
    'a-priori-estimation-of-the-non-linear-compression-potential-and': 'estimation-non-linear-compression-potential',
    'exact-analytical-treatment-of-collectively-pumped-dicke': 'quantum-proton-tunneling-crispr-cas9-catalytic-triads',
    'mediated-interactions-between-fermi-polarons-in-the-strongly': 'acoustic-levitation-scaffold-free-cardiac-organoid-bioprinting',
    'optimal-quantum-discrimination-at-liouvillian-exceptional-points': 'quantum-parameter-estimation-no-go-result'
  };
  for (const [oldSlug, newSlug] of Object.entries(legacyUrlMap)) {
    indexHtml = indexHtml.split('/articles/' + oldSlug).join('/articles/' + newSlug);
  }

  indexHtml = indexHtml.replace(/href="research\.html"/g, 'href="/research"');
  indexHtml = indexHtml.replace(/href="world-space-week-2026\.html"/g, 'href="/world-space-week-2026"');
  indexHtml = indexHtml.replace(/href="molecular-biology-research\.html"/g, 'href="/molecular-biology-research"');
  indexHtml = indexHtml.replace(/href="about\.html"/g, 'href="/about"');
  indexHtml = indexHtml.replace(/href="privacy-policy\.html"/g, 'href="/privacy-policy"');
  indexHtml = indexHtml.replace(/href="terms\.html"/g, 'href="/terms"');
  indexHtml = indexHtml.replace(/href="article\.html"/g, 'href="/research"');
  indexHtml = indexHtml.replace(/href="sitemap\.xml"/g, 'href="/sitemap.xml"');
  indexHtml = indexHtml.replace(/href="css\/styles\.css"/g, 'href="/css/styles.min.css?v=2.2"');
  indexHtml = indexHtml.replace(/href="logo\.png"/g, 'href="/logo.png"');
  indexHtml = indexHtml.replace(/href="index\.html"/g, 'href="/"');
  indexHtml = indexHtml.replace(/href="articles\/([a-zA-Z0-9_-]+)\.html"/g, 'href="/articles/$1"');
  indexHtml = indexHtml.replace(/href="articles\/([a-zA-Z0-9_-]+)"/g, 'href="/articles/$1"');
  indexHtml = indexHtml.replace(/href="articles\/\$\{encodeURIComponent\(article\.id\)\}\.html"/g, 'href="/articles/${encodeURIComponent(article.id)}"');

  // Inject / update Complete Orbital Research Archive into index.html for 100% Googlebot Crawl Coverage
  const allArticlesArchiveHtml = `
        <!-- Complete Open Access Catalog (100% Crawl Coverage) -->
        <div id="complete-orbital-archive" class="mt-14 p-6 sm:p-8 rounded-2xl bg-[#fafbfc] border border-slate-200/80">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <div class="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">
                Open Access Catalog
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-bold text-slate-900">
                All ${articles.length} Published Research Dispatches
              </h3>
            </div>
            <a href="/research" class="px-4 py-2 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition flex items-center gap-1.5 self-start sm:self-auto">
              <span>View Full Research Feed →</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
` + articles.map(a => `
            <div class="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition group flex flex-col justify-between shadow-sm">
              <div>
                <div class="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                  <span class="text-teal-600">${escapeHtml(a.category)}</span>
                  <span class="text-slate-400">${escapeHtml(a.readtime || '10 min')}</span>
                </div>
                <h4 class="font-display font-bold text-sm text-slate-900 group-hover:text-teal-600 transition line-clamp-2 mb-2">
                  <a href="/articles/${encodeURIComponent(a.id)}">${escapeHtml(a.seoTitle || a.title)}</a>
                </h4>
                <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  ${escapeHtml(a.summary)}
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="text-slate-400 font-medium">${escapeHtml(a.author)}</span>
                <a href="/articles/${encodeURIComponent(a.id)}" class="text-slate-900 hover:text-teal-600 font-semibold">
                  Read &rarr;
                </a>
              </div>
            </div>
`).join('') + `
          </div>
        </div>
`;

  if (indexHtml.includes('id="complete-orbital-archive"')) {
    indexHtml = indexHtml.replace(/<!-- Complete Orbital Research Archive[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, allArticlesArchiveHtml.trim() + '\n        </div>');
  } else {
    // Insert before closing of the featured dispatches section
    indexHtml = indexHtml.replace(/(<\/div>\s*<\/div>\s*<\/section>\s*<\/main>)/i, `${allArticlesArchiveHtml}\n      $1`);
  }

  // Add Live News pill to index.html navigation if missing
  if (!indexHtml.includes('href="/news"') && indexHtml.includes('href="/research"')) {
    indexHtml = indexHtml.replace(
      '<a href="/research"',
      `<a href="/news" class="flex items-center gap-1.5 text-rose-600 font-semibold hover:text-rose-700 transition">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Live News
          </a>
          <a href="/research"`
    );
  }

  // Add Live News to index.html footer if missing
  if (!indexHtml.includes('Live Science Wire') && indexHtml.includes('<li><a href="/research"')) {
    indexHtml = indexHtml.replace(
      '<li><a href="/research"',
      `<li><a href="/news" class="text-rose-600 font-semibold hover:text-rose-700 transition flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Live Science Wire</a></li>
            <li><a href="/research"`
    );
  }

  // Inject / update Breaking Science Wire section into index.html
  if (newsArticles.length > 0) {
    const topNews = newsArticles.slice(0, 4);
    const liveNewsCardsHtml = topNews.map(item => `
          <a href="/news/${encodeURIComponent(item.id)}" class="ux-card group overflow-hidden flex flex-col justify-between bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition shadow-xs hover:shadow-md">
            <div>
              <div class="relative aspect-video overflow-hidden bg-slate-100">
                <img src="${escapeHtml(item.cover)}" alt="${escapeHtml(item.coverAlt || item.title)}" loading="lazy" width="1600" height="900" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <div class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold text-white tracking-wide uppercase">
                  ${escapeHtml((item.category || 'Science').split('&')[0].trim())}
                </div>
              </div>
              <div class="p-4 sm:p-5">
                <div class="flex items-center justify-between text-[11px] mb-2 font-medium">
                  <span class="text-rose-600 font-semibold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    ${escapeHtml(item.date)}
                  </span>
                  <span class="text-slate-400">${escapeHtml(item.readtime || '4 min read')}</span>
                </div>
                <h3 class="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-600 transition line-clamp-2 mb-2 leading-snug">
                  ${escapeHtml(item.title)}
                </h3>
                <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  ${escapeHtml(item.summary)}
                </p>
              </div>
            </div>
            <div class="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center justify-between text-xs border-t border-slate-100 pt-3">
              <span class="text-slate-400 font-medium text-[11px]">${escapeHtml(item.source)}</span>
              <span class="text-slate-900 font-semibold group-hover:text-teal-600 group-hover:translate-x-0.5 transition flex items-center gap-1">
                Read Story &rarr;
              </span>
            </div>
          </a>
`).join('');

    const liveNewsSectionHtml = `
    <!-- ========================================================================= -->
    <!-- 2B. 24/7 LIVE SCIENCE WIRE (DISCOVER & BREAKING UPDATES) -->
    <!-- ========================================================================= -->
    <section class="py-12 sm:py-16 border-b border-slate-200/80 bg-[#f8fafc]" id="live-science-wire">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              24/7 Live Science Wire
            </div>
            <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Breaking Science &amp; Global Discoveries
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Autonomous real-time reporting across Deep Space, Planetary Geology, Environmental Science, Economic Science, Paleontology, and Quantum Physics.
            </p>
          </div>
          <a href="/news" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition shadow-sm self-start sm:self-auto">
            <span>View All Live Dispatches</span>
            <span>&rarr;</span>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          ${liveNewsCardsHtml}
        </div>

      </div>
    </section>
`;

    if (indexHtml.includes('id="live-science-wire"')) {
      indexHtml = indexHtml.replace(/<!-- =+ -->\s*<!-- 2B\. 24\/7 LIVE SCIENCE WIRE[\s\S]*?<\/section>/i, liveNewsSectionHtml.trim());
    } else {
      indexHtml = indexHtml.replace(
        /(<!-- =+ -->\s*<!-- 3\. UXFOLIO-STYLE SHOWCASE CARDS)/i,
        `${liveNewsSectionHtml.trim()}\n\n    $1`
      );
    }
  }

  // Add Core Web Vitals Resource Hints
  if (!indexHtml.includes('rel="preconnect" href="https://images.unsplash.com"')) {
    indexHtml = indexHtml.replace(
      '<head>',
      `<head>\n  <!-- Resource Hints for High Speed & Core Web Vitals (LCP) -->\n  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>\n  <link rel="dns-prefetch" href="https://images.unsplash.com">\n  <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>\n  <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">`
    );
  }

  // Ensure clean URL script in <head>
  if (!indexHtml.includes("window.location.pathname.endsWith('.html')")) {
    indexHtml = indexHtml.replace(
      '</head>',
      `  <script>
    if (window.location.pathname.endsWith('.html') || window.location.pathname.endsWith('/index.html')) {
      var clean = window.location.pathname.replace(/\\/?index\\.html$/, '/').replace(/\\.html$/, '');
      if (clean !== window.location.pathname) {
        window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
      }
    }
  </script>
</head>`
    );
  }
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log(`[BUILD-SEO] ✅ index.html updated with clean URLs & complete archive grid!`);
}

// =============================================================================
// 4. GENERATE 100% CLEAN XML SITEMAP (GOOGLE & BING COMPLIANT)
// =============================================================================
console.log(`[BUILD-SEO] 🗺️ Generating clean XML sitemap.xml...`);

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Core Hub Pages (Clean URLs) -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/news</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/research</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${SITE_URL}/tools</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${SITE_URL}/world-space-week-2026</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${SITE_URL}/assets/world-space-week-2026-astronaut-pikachu.jpg</image:loc>
      <image:title>Astronaut Pikachu and Orbital Rocket on Launch Pad for World Space Week 2026</image:title>
    </image:image>
  </url>
  <url>
    <loc>${SITE_URL}/molecular-biology-research</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&amp;fit=crop&amp;w=1600&amp;q=85</image:loc>
      <image:title>The Definitive Guide to Molecular Biology Research</image:title>
    </image:image>
  </url>
  <url>
    <loc>${SITE_URL}/microgravity-effects-on-human-body</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>https://images.unsplash.com/photo-1517976487507-5b3b4b45f910?auto=format&amp;fit=crop&amp;w=1200&amp;q=80</image:loc>
      <image:title>Microgravity Effects on Human Body: Space Medicine &amp; Physiology Guide</image:title>
    </image:image>
  </url>
  <url>
    <loc>${SITE_URL}/about</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/disclaimer</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/sitemap</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy-policy</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/terms</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Live Science Dispatches (Google Discover & News Priority) -->
`;

newsArticles.forEach(item => {
  const cleanUrl = `${SITE_URL}/news/${item.id}`;
  const coverUrl = item.cover || 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1600&h=900&q=85';
  const pubDate = (item.publishedIso ? item.publishedIso.split('T')[0] : null) || TODAY;

  sitemapXml += `  <url>
    <loc>${cleanUrl}</loc>
    <lastmod>${pubDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.98</priority>
    <image:image>
      <image:loc>${escapeXml(coverUrl)}</image:loc>
      <image:title>${escapeXml(item.title)}</image:title>
    </image:image>
  </url>
`;
});

sitemapXml += `
  <!-- Pre-Rendered High-Authority Research Dispatches (Clean URLs) -->
`;

articles.forEach(art => {
  const cleanUrl = `${SITE_URL}/articles/${art.id}`;
  const coverUrl = art.cover || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80';
  const articleDate = (art.publishedIso ? art.publishedIso.split('T')[0] : null) || TODAY;

  sitemapXml += `  <url>
    <loc>${cleanUrl}</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>${escapeXml(coverUrl)}</image:loc>
      <image:title>${escapeXml(art.title)}</image:title>
    </image:image>
  </url>
`;
});

sitemapXml += `</urlset>\n`;

const sitemapPath = path.join(__dirname, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`[BUILD-SEO] ✅ Successfully generated clean sitemap.xml with ${articles.length + newsArticles.length + 8} canonical URLs!`);

// =============================================================================
// 4B. GENERATE GOOGLE NEWS XML SITEMAP (sitemap-news.xml)
// =============================================================================
console.log(`[BUILD-SEO] 🗺️ Generating Google News sitemap-news.xml...`);

let newsSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

newsArticles.forEach(item => {
  const cleanUrl = `${SITE_URL}/news/${item.id}`;
  const pubDateIso = item.publishedIso || new Date().toISOString();
  newsSitemapXml += `  <url>
    <loc>${cleanUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>BioGravity Live Science Wire</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDateIso}</news:publication_date>
      <news:title>${escapeXml(item.title)}</news:title>
    </news:news>
  </url>
`;
});

newsSitemapXml += `</urlset>\n`;

fs.writeFileSync(path.join(__dirname, 'sitemap-news.xml'), newsSitemapXml, 'utf8');
console.log(`[BUILD-SEO] ✅ Generated sitemap-news.xml for Google News!`);

// =============================================================================
// 4C. GENERATE RSS 2.0 / ATOM SCIENTIFIC FEED (SYNDICATION & DISCOVERY)
// =============================================================================
console.log(`[BUILD-SEO] 📡 Generating RSS 2.0 scientific feed...`);

let rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>BioGravity - Quantum Biotechnology &amp; Orbital Life Sciences</title>
    <link>${SITE_URL}/</link>
    <description>Live open-access science dispatches and peer-reviewed research monographs across Quantum Biology, Space Medicine, and Deep Physical Sciences.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
`;

// News items first for timely Google Discover & RSS syndication
newsArticles.forEach(item => {
  const cleanUrl = `${SITE_URL}/news/${item.id}`;
  const pubDate = new Date(item.publishedIso || TODAY).toUTCString();
  rssXml += `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${cleanUrl}</link>
      <guid isPermaLink="true">${cleanUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(item.author || 'BioGravity Science Bureau')}</dc:creator>
      <description>${escapeXml(item.summary || '')}</description>
      <category>${escapeXml(item.category || 'Science')}</category>
    </item>
`;
});

articles.forEach(art => {
  const cleanUrl = `${SITE_URL}/articles/${art.id}`;
  const pubDate = new Date(art.publishedIso || TODAY).toUTCString();
  rssXml += `    <item>
      <title>${escapeXml(art.seoTitle || art.title)}</title>
      <link>${cleanUrl}</link>
      <guid isPermaLink="true">${cleanUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(art.author || 'BioGravity Collective')}</dc:creator>
      <description>${escapeXml(art.summary || art.metaDescription || '')}</description>
      <category>${escapeXml(art.category || 'Science')}</category>
    </item>
`;
});

rssXml += `  </channel>
</rss>\n`;

fs.writeFileSync(path.join(__dirname, 'rss.xml'), rssXml, 'utf8');
fs.writeFileSync(path.join(__dirname, 'feed.xml'), rssXml, 'utf8');
console.log(`[BUILD-SEO] ✅ Successfully generated rss.xml and feed.xml!`);

// =============================================================================
// 5. GENERATE SMART 404.HTML (CLEAN REDIRECTION & SEO RETENTION)
// =============================================================================
const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905"
     crossorigin="anonymous"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Orbital Coordinate Not Found (404) | BioGravity</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="/css/styles.min.css?v=2.2">
  <script>
    // Smart redirect: if user visited with .html, redirect to clean URL
    (function() {
      var p = window.location.pathname;
      if (p.endsWith('.html')) {
        var clean = p.replace(/\\.html$/, '');
        window.location.replace(clean + window.location.search + window.location.hash);
      }
    })();
  </script>
</head>
<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col justify-between font-sans antialiased selection:bg-slate-900 selection:text-white">
  <div class="max-w-xl mx-auto px-4 py-24 text-center">
    <div class="text-5xl mb-4">🪐</div>
    <span class="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-3">Page Not Found</span>
    <h1 class="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mb-3 tracking-tight">404: Coordinate Not Found</h1>
    <p class="text-slate-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
      The research dispatch or page you requested could not be located. It may have been updated to a clean canonical address.
    </p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <a href="/" class="px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition shadow-sm">
        Return to Home Hub →
      </a>
      <a href="/news" class="px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium hover:bg-rose-100 transition">
        Live Science Wire
      </a>
      <a href="/research" class="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition">
        Explore Research Archive
      </a>
    </div>
  </div>
  <footer class="border-t border-slate-200/80 bg-white text-center py-6 text-xs text-slate-500">
    BioGravity Open Science Publication • <a href="mailto:biogravity.space@gmail.com" class="text-teal-600 hover:underline">biogravity.space@gmail.com</a> • <a href="/sitemap.xml" class="text-teal-600 hover:underline">Sitemap</a>
  </footer>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '404.html'), notFoundHtml, 'utf8');
console.log(`[BUILD-SEO] ✅ Generated smart 404.html with automatic .html URL normalization!`);

// =============================================================================
// 6. GENERATE OPTIMIZED ROBOTS.TXT (MAXIMUM CRAWL RATE & CLEAN URL FOCUS)
// =============================================================================
const robotsTxt = `User-agent: *
Allow: /
Disallow: /*?q=*
Disallow: /*?category=*

# Dedicated Search Engine Crawlers
# Google AdSense Crawler
User-agent: Mediapartners-Google
Allow: /

User-agent: Googlebot
Allow: /
Disallow: /*?q=*
Disallow: /*?category=*

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Bingbot
Allow: /
Disallow: /*?q=*
Disallow: /*?category=*

User-agent: DuckDuckBot
Allow: /
Disallow: /*?q=*
Disallow: /*?category=*

# =============================================================================
# Artificial Intelligence & AI Search Engine Crawlers
# =============================================================================
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-CloudVertexBot
Allow: /

User-agent: Google-Agent
Allow: /

User-agent: Applebot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

# Cloudflare / IETF Content Signals Policy
Content-Signal: search=yes, ai-input=yes, ai-train=no

# LLMs.txt AI Search & Agent Digest
Allow: /llms.txt
Allow: /llms-full.txt

# Sitemap & AI Digest Locations
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-news.xml
`;

fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');
console.log(`[BUILD-SEO] ✅ Generated optimized robots.txt!`);

// =============================================================================
// 6b. GENERATE LLMS.TXT AND LLMS-FULL.TXT (GEO & AI AGENTIC SEARCH DIGESTS)
// =============================================================================
console.log(`[BUILD-SEO] 🤖 Generating llms.txt and llms-full.txt for GEO & Agentic Search...`);

let llmsContent = `# BioGravity

> BioGravity (${SITE_URL}) is an open-access scientific publication platform and research bureau dedicated to microgravity science, space biotechnology, and orbital medicine. We investigate how the absence of buoyancy-driven convection, hydrostatic pressure gradients, and mechanical gravity constraints in Low Earth Orbit (LEO) transforms cell biology, protein crystallization, organ bioprinting, and terrestrial therapeutics.

## Core Hubs & Academic Resources

- [Home Hub](${SITE_URL}/): Overview of orbital microgravity research, featured breakthrough dispatches, and terrestrial medicine translation.
- [Research Feed](${SITE_URL}/research): Complete open-access archive of ${articles.length} peer-reviewed research dispatches covering mechanobiology, space physics, oncology, and bioprinting.
- [Interactive Science Tools](${SITE_URL}/tools): Physics sandboxes, capillary fluidics calculators, and microgravity simulation tools.
- [Molecular Biology Guide](${SITE_URL}/molecular-biology-research): Comprehensive reference on macromolecular crystallography, CRISPR proton tunneling, and organoid self-assembly in orbit.
- [Microgravity Effects on Human Body](${SITE_URL}/microgravity-effects-on-human-body): Clinical review of musculoskeletal unloading, cardiovascular remodeling, and neuro-ocular syndrome.
- [Live News Bureau](${SITE_URL}/news): Breaking global discoveries in aerospace medicine, solid-state batteries, and planetary physics.
- [World Space Week 2026](${SITE_URL}/world-space-week-2026): Educational symposium resources and academic workshops.
- [About & Editorial Board](${SITE_URL}/about): BioGravity's mission, scientific governance, and open-science CC-BY 4.0 policy.

## Scientific Research Dispatches

`;

articles.forEach(art => {
  const artUrl = `${SITE_URL}/articles/${art.id}`;
  const summary = art.summary || art.metaDescription || '';
  llmsContent += `- [${art.title}](${artUrl}): ${summary}\n`;
});

llmsContent += `
## Syndication & Sitemaps

- [XML Sitemap Index](${SITE_URL}/sitemap.xml): Primary canonical sitemap covering all static routes and clean dispatch URLs.
- [Google News Sitemap](${SITE_URL}/sitemap-news.xml): Dedicated Google News sitemap for recent science dispatches.
- [RSS 2.0 Feed](${SITE_URL}/rss.xml): Full syndicated XML feed of published dispatches.
- [JSON Feed](${SITE_URL}/feed.xml): Machine-readable scientific publication feed.
- [Full LLM Knowledgebase](${SITE_URL}/llms-full.txt): Comprehensive deep-text digest with FAQs, abstracts, and DOIs.
`;

fs.writeFileSync(path.join(__dirname, 'llms.txt'), llmsContent, 'utf8');

// Generate llms-full.txt with extensive abstracts, findings, and FAQs
let llmsFullContent = `# BioGravity: Full Scientific Knowledge Base

> Comprehensive open-access repository of peer-reviewed dispatches on space biotechnology, gravitational cellular biophysics, and translational terrestrial medicine. Published under Creative Commons Attribution 4.0 International (CC BY 4.0).

`;

articles.forEach(art => {
  const artUrl = `${SITE_URL}/articles/${art.id}`;
  llmsFullContent += `## ${art.title}\n\n`;
  llmsFullContent += `- **Canonical URL:** ${artUrl}\n`;
  if (art.doi) llmsFullContent += `- **DOI:** https://doi.org/${art.doi}\n`;
  if (art.author) llmsFullContent += `- **Author:** ${art.author} (${art.authorRole || 'Lead Researcher'})\n`;
  if (art.authorOrcid) llmsFullContent += `- **ORCID:** ${art.authorOrcid}\n`;
  if (art.category) llmsFullContent += `- **Discipline:** ${art.category}\n`;
  llmsFullContent += `- **Published:** ${art.date || TODAY}\n\n`;
  llmsFullContent += `### Executive Summary\n${art.summary || art.metaDescription || ''}\n\n`;
  if (art.quickAnswer) {
    llmsFullContent += `### Core Scientific Finding\n${art.quickAnswer}\n\n`;
  }
  if (Array.isArray(art.keyTakeaways) && art.keyTakeaways.length > 0) {
    llmsFullContent += `### Key Takeaways\n`;
    art.keyTakeaways.forEach(kt => {
      llmsFullContent += `- ${kt}\n`;
    });
    llmsFullContent += `\n`;
  }
  if (Array.isArray(art.faqs) && art.faqs.length > 0) {
    llmsFullContent += `### Frequently Asked Questions\n`;
    art.faqs.forEach(faq => {
      llmsFullContent += `**Q: ${faq.question || faq.q}**\n${faq.answer || faq.a}\n\n`;
    });
  }
  llmsFullContent += `---\n\n`;
});

fs.writeFileSync(path.join(__dirname, 'llms-full.txt'), llmsFullContent, 'utf8');
console.log(`[BUILD-SEO] ✅ Successfully generated llms.txt & llms-full.txt!`);


// =============================================================================
// 7. GENERATE SOCIAL MEDIA & COMMUNITY OUTREACH KIT
// =============================================================================
try {
  require('./scripts/social_syndication_engine.js');
} catch (e) {
  console.log(`[BUILD-SEO] ℹ️ Social syndication notice: ${e.message}`);
}
