'use strict';

const fs = require('fs');
const path = require('path');

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'articles.json'), 'utf8'));

// High-impact, click-worthy, Google-compliant SEO titles that directly target high-search-volume queries
const masterSeoTitles = {
  'terahertz-resonance-and-coherent-dipole-oscillations-in-neuronal-microtubule-lat': {
    seoTitle: 'Microtubule Quantum Resonance in Microgravity: New Evidence',
    primaryKeyword: 'microtubules quantum resonance terahertz neuronal cytoskeleton'
  },
  'how-do-tall-trees-pull-water-against-gravity': {
    seoTitle: 'How Do Tall Trees Pull Water Against Gravity? Physics of Redwoods',
    primaryKeyword: 'how do tall trees pull water against gravity'
  },
  'why-is-gold-yellow-relativistic-quantum-chemistry': {
    seoTitle: 'Why Is Gold Yellow? The Einstein Relativity Physics Explained',
    primaryKeyword: 'why is gold yellow relativity'
  },
  'michelson-morley-experiment-disproved-the-aether': {
    seoTitle: 'How the Michelson-Morley Experiment Disproved the Aether',
    primaryKeyword: 'michelson morley experiment aether'
  },
  'fermi-paradox-where-are-all-the-aliens': {
    seoTitle: 'The Fermi Paradox: If Aliens Exist, Where Is Everybody?',
    primaryKeyword: 'fermi paradox where are all the aliens'
  },
  'kola-superdeep-borehole-deepest-hole-on-earth': {
    seoTitle: 'Kola Superdeep Borehole: What Did Scientists Find 12 km Down?',
    primaryKeyword: 'kola superdeep borehole deepest hole on earth'
  },
  'the-demon-core-manhattan-project-criticality-accidents': {
    seoTitle: 'The Demon Core: Deadly Physics of Manhattan Project Accidents',
    primaryKeyword: 'the demon core manhattan project'
  },
  'mpemba-effect-why-hot-water-freezes-faster-than-cold': {
    seoTitle: 'The Mpemba Effect: Why Hot Water Can Freeze Faster Than Cold',
    primaryKeyword: 'why hot water freezes faster than cold water'
  },
  'why-do-flamingos-stand-on-one-leg': {
    seoTitle: 'Why Do Flamingos Stand on One Leg? Biomechanics Explained',
    primaryKeyword: 'why do flamingos stand on one leg'
  },
  'macroscopic-quantum-coherence-in-nuclear-lncrna-liquid-liquid-phase-transition-c': {
    seoTitle: 'Quantum Coherence in Nuclear lncRNA: Orbital Cell Dynamics',
    primaryKeyword: 'lncRNA phase transition kinetics microgravity'
  },
  'schrodingers-cat-quantum-physics-paradox-explained': {
    seoTitle: "Schrödinger's Cat Explained: The Famous Quantum Paradox",
    primaryKeyword: 'schrodingers cat explained simply quantum superposition paradox'
  },
  'why-do-octopuses-have-three-hearts-and-blue-blood': {
    seoTitle: 'Why Do Octopuses Have Three Hearts and Blue Blood?',
    primaryKeyword: 'why do octopuses have three hearts and blue blood'
  },
  'mariana-trench-challenger-deep-creatures-pressure': {
    seoTitle: 'What Lives at the Bottom of the Mariana Trench at 36,000 Feet?',
    primaryKeyword: 'what lives in the mariana trench challenger deep pressure'
  },
  'immortal-jellyfish-turritopsis-dohrnii-biological-immortality': {
    seoTitle: 'The Immortal Jellyfish: How Turritopsis Cheats Natural Aging',
    primaryKeyword: 'immortal jellyfish turritopsis dohrnii biological immortality'
  },
  'what-would-happen-if-earth-stopped-spinning': {
    seoTitle: 'What Would Happen If Earth Stopped Spinning for 5 Seconds?',
    primaryKeyword: 'what would happen if the earth stopped spinning 5 seconds'
  },
  'chernobyl-elephants-foot-deadliest-radioactive-mass': {
    seoTitle: "Chernobyl's Elephant's Foot: Deadliest Radioactive Object on Earth",
    primaryKeyword: 'chernobyl elephants foot corium radioactive mass'
  },
  'the-double-slit-experiment-quantum-mechanics-explained': {
    seoTitle: 'The Double-Slit Experiment Explained: Wave-Particle Duality',
    primaryKeyword: 'double slit experiment quantum mechanics explained'
  },
  'what-happens-if-you-fall-into-a-black-hole-spaghettification': {
    seoTitle: 'What Happens If You Fall into a Black Hole? Spaghettification',
    primaryKeyword: 'what happens if you fall into a black hole spaghettification'
  },
  '3d-bioprinting-organoids-in-microgravity': {
    seoTitle: '3D Bioprinting Organs in Space: Why Zero-G Changes Everything',
    primaryKeyword: '3d bioprinting organs in microgravity zero gravity tissue engineering'
  },
  'space-motion-sickness-space-adaptation-syndrome-vestibular': {
    seoTitle: 'Space Motion Sickness: Why 70% of Astronauts Suffer in Orbit',
    primaryKeyword: 'space motion sickness space adaptation syndrome vestibular'
  },
  'can-plants-grow-in-space-without-gravity': {
    seoTitle: 'Can Plants Grow in Space Without Gravity? NASA Astrobotany',
    primaryKeyword: 'can plants grow in space without gravity astrobotany'
  },
  'how-do-astronauts-sleep-in-space-zero-gravity': {
    seoTitle: 'How Do Astronauts Sleep in Zero Gravity on the Space Station?',
    primaryKeyword: 'how do astronauts sleep in space zero gravity iss'
  },
  'why-do-astronauts-lose-bone-density-in-space': {
    seoTitle: 'Why Astronauts Lose 1-2% Bone Density Every Month in Space',
    primaryKeyword: 'why do astronauts lose bone density in space microgravity osteopenia'
  },
  'difference-between-zero-gravity-and-microgravity': {
    seoTitle: 'Zero Gravity vs Microgravity: The Difference Explained',
    primaryKeyword: 'difference between zero gravity and microgravity physics'
  },
  'what-statement-about-risks-in-social-and-behavioral-sciences-research-is-most-accurate': {
    seoTitle: 'Risks in Social and Behavioral Sciences Research: Complete Guide',
    primaryKeyword: 'what statement about risks in social and behavioral sciences research is most accurate'
  },
  'ideal-interaction-dynamics-of-defects-and-background-fields-in': {
    seoTitle: 'Topological Defects and Background Fields in Quantum Systems',
    primaryKeyword: 'condensed matter defects background fields quantum dynamics'
  },
  'maximal-orbital-entanglement-from-non-interacting-fermions': {
    seoTitle: 'Maximal Orbital Entanglement from Non-Interacting Fermions',
    primaryKeyword: 'orbital entanglement non interacting fermions quantum state generation'
  },
  'how-does-zero-gravity-kill-cancer-cells': {
    seoTitle: 'How Does Zero Gravity Kill Cancer Cells? Space Oncology Research',
    primaryKeyword: 'how does zero gravity kill cancer cells space oncology apoptosis'
  },
  'what-happens-to-human-body-in-zero-gravity': {
    seoTitle: 'What Happens to the Human Body in Zero Gravity? Full Medical Breakdown',
    primaryKeyword: 'what happens to the human body in zero gravity space medicine'
  },
  'size-independent-logarithmic-sobolev-inequalities-for-quantum': {
    seoTitle: 'Logarithmic Sobolev Inequalities in Dissipative Quantum Systems',
    primaryKeyword: 'quantum gibbs samplers logarithmic sobolev inequalities mixing times'
  },
  'mixed-state-deep-thermalization-under-generic-quantum-errors': {
    seoTitle: 'Deep Thermalization in Mixed Quantum States Under Decoherence',
    primaryKeyword: 'mixed state deep thermalization quantum errors decoherence open quantum systems'
  },
  'screening-strongly-correlated-materials-in-solid-oxide-cells': {
    seoTitle: 'Screening Catalysts for Solid Oxide Fuel Cells via Quantum Simulation',
    primaryKeyword: 'solid oxide cells quantum simulation strongly correlated materials clean energy'
  },
  'a-priori-estimation-of-the-non-linear-compression-potential-and': {
    seoTitle: 'AI in Turbulent Fluid Flows: Estimating Compression Potential',
    primaryKeyword: 'turbulent flows autoencoder non-linearity compression potential machine learning'
  },
  'what-does-quantum-parameter-estimation-estimate-a-no-go-result-for-tru': {
    seoTitle: 'Can Quantum Physics Measure Reality? The No-Go Proof Explained',
    primaryKeyword: 'quantum parameter estimation no go theorem quantum measurement problem'
  },
  'phonon-assisted-free-electron-recoil-control-and-mechanical-sensing': {
    seoTitle: 'Controlling Free-Electron Recoil: Quantum Nanomechanics',
    primaryKeyword: 'phonon assisted electron recoil nanomechanics quantum sensors'
  },
  'characterizing-supersolid-phase-transitions-in-trapped-quantum-gases-w': {
    seoTitle: 'Inside Supersolids: Trapping Matter That Is Liquid and Solid',
    primaryKeyword: 'supersolid phase transitions trapped quantum gases microgravity'
  },
  'relativistic-time-dilation-and-mitochondrial-aging-clocks': {
    seoTitle: 'Do We Age Slower in Space? Relativity and Cellular Clocks',
    primaryKeyword: 'relativistic time dilation mitochondrial aging clocks space travel'
  },
  'zero-g-capillary-fluidics-and-surface-tension-bioreactors': {
    seoTitle: 'Growing Tissues Without Gravity: Zero-G Capillary Bioreactors',
    primaryKeyword: 'zero g capillary fluidics surface tension bioreactors space biotechnology'
  },
  'debye-shielding-and-plasma-sheath-dynamics-in-spacecraft-biosensing': {
    seoTitle: 'Spacecraft Biosensors in Orbit: Overcoming Plasma Sheath Shielding',
    primaryKeyword: 'debye shielding plasma sheath spacecraft biosensing low earth orbit'
  },
  'radical-pair-spin-coherence-and-magnetoreception-in-human-cryptochrome-4-photore': {
    seoTitle: 'Can Humans Sense Magnetic Fields? Cryptochrome 4 Quantum Biology',
    primaryKeyword: 'cryptochrome 4 in humans magnetoreception quantum biology radical pair mechanism'
  },
  'synthetic-poly-adp-metallo-peptides-for-telomeric-radioprotection-in-deep-space-': {
    seoTitle: 'Deep-Space Radiation Shield: Synthetic Peptides Protecting DNA',
    primaryKeyword: 'synthetic metallo peptides deep space radiation telomeric radioprotection mars mission'
  },
  'acoustic-levitation-and-scaffold-free-vascularized-cardiac-organoid-bioprinting-': {
    seoTitle: '3D-Printing Beating Human Heart Tissue via Acoustic Levitation',
    primaryKeyword: 'acoustic levitation cardiac organoid bioprinting microgravity tissue engineering'
  },
  'atomic-resolution-cryo-electron-microscopy-of-membrane-protein-crystals-grown-in': {
    seoTitle: 'Growing Perfect Protein Crystals in Zero Gravity for Drug Design',
    primaryKeyword: 'cryo electron microscopy membrane protein crystallization microgravity space drug discovery'
  },
  'quantum-coherent-energy-transfer-in-orbital-photosynthetic-antennae-complexes': {
    seoTitle: 'Quantum Energy Transfer in Space Photosynthetic Complexes',
    primaryKeyword: 'quantum coherent energy transfer orbital photosynthesis astrobotany bioreactors'
  },
  'microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats': {
    seoTitle: 'Space Station Superbugs: Why Biofilms Grow Thicker in Orbit',
    primaryKeyword: 'microbial biofilm spaceflight antibiotic resistance pseudomonas iss life support'
  },
  'cerebrovascular-glymphatic-clearance-microgravity-optic-nerve-syndrome': {
    seoTitle: 'Why Astronauts Lose Vision in Space: SANS Syndrome Explained',
    primaryKeyword: 'spaceflight associated neuro ocular syndrome sans glymphatic clearance microgravity'
  },
  'photosystem-ii-charge-separation-far-red-light-orbital-bioreactors': {
    seoTitle: 'Farming on Mars: Far-Red Light Photosynthesis in Orbital Bioreactors',
    primaryKeyword: 'photosystem ii far red light orbital bioreactors space agriculture cyanobacteria'
  },
  'bose-einstein-polariton-condensation-orbital-microgravity': {
    seoTitle: 'Bose-Einstein Condensates in Orbit: Fifth State of Matter',
    primaryKeyword: 'bose einstein polariton condensation microgravity cold atom lab iss'
  },
  'epigenetic-t-cell-activation-remodeling-extended-spaceflight': {
    seoTitle: 'Astronaut Immunity: How Long Spaceflight Alters T-Cells',
    primaryKeyword: 'epigenetic t cell remodeling spaceflight immune dysregulation deep space'
  },
  'self-assembling-chiral-nanotubes-zero-convection-solute-gradients': {
    seoTitle: 'Flawless Nanotechnology in Space: Self-Assembling Chiral Nanotubes',
    primaryKeyword: 'chiral nanotubes self assembly zero convection microgravity nanomaterials'
  },
  'mitochondrial-electron-transport-efficiency-spaceflight-radiation': {
    seoTitle: 'How Cosmic Radiation Impacts Cellular Energy and Mitochondria',
    primaryKeyword: 'mitochondrial electron transport space radiation cellular bioenergetics'
  },
  'biomineralization-hydroxyapatite-scaffolds-simulated-lunar-freefall': {
    seoTitle: 'Regenerating Bones on the Moon: Hydroxyapatite Biomineralization',
    primaryKeyword: 'biomineralization hydroxyapatite scaffolds lunar gravity bone regeneration'
  },
  'single-cell-rna-seq-endothelial-cells-hyperstatic-weightlessness': {
    seoTitle: 'Blood Vessels in Space: Single-Cell RNA Sequencing in Free-Fall',
    primaryKeyword: 'single cell rna sequencing endothelial cells weightlessness vascular adaptation'
  },
  'squid-biosensing-neuronal-action-potentials-low-earth-orbit': {
    seoTitle: 'Measuring Brainwaves in Orbit: SQUID Quantum Neuro-Sensors',
    primaryKeyword: 'squid biosensing neuronal action potentials low earth orbit quantum neurobiology'
  },
  'tardigrade-dsup-protein-chromatin-radioprotective-compaction': {
    seoTitle: 'Tardigrade Super-Shield: How Dsup Protein Protects DNA from Radiation',
    primaryKeyword: 'tardigrade dsup protein damage suppressor chromatin radioprotection'
  }
};

let count = 0;
articles.forEach(art => {
  if (masterSeoTitles[art.id]) {
    art.seoTitle = masterSeoTitles[art.id].seoTitle;
    art.primaryKeyword = masterSeoTitles[art.id].primaryKeyword;
    count++;
  }
});

fs.writeFileSync(path.join(__dirname, '..', 'data', 'articles.json'), JSON.stringify(articles, null, 2), 'utf8');
console.log(`Updated ${count} articles with complete, high-CTR, Google-optimized SEO titles and keywords!`);
