'use strict';
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const articles = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'articles.json'), 'utf8'));

// High-relevance, natural keyword phrases mapped to exact canonical article URLs
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

// Test against all articles including their section html
let totalInjected = 0;
let articlesWithLinks = 0;

articles.forEach(art => {
  let fullText = art.content || '';
  if (art.sections) {
    art.sections.forEach(s => fullText += ' ' + (s.html || ''));
  }
  const injected = injectContextualLinks(fullText, art.id);
  const count = (injected.match(/<a href="\/articles\//g) || []).length;
  if (count > 0) {
    articlesWithLinks++;
    totalInjected += count;
  } else {
    console.log(`No links in: ${art.id} (${art.title})`);
  }
});

console.log(`Test injection with full sections:`);
console.log(`Articles receiving links: ${articlesWithLinks}/${articles.length}`);
console.log(`Total contextual internal links injected: ${totalInjected}`);
