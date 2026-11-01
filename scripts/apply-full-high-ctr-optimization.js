'use strict';

const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// Complete, click-engineered master titles targeting high-volume search intent without mid-sentence truncations
const masterCatalog = {
  'terahertz-resonance-and-coherent-dipole-oscillations-in-neuronal-microtubule-lat': {
    seoTitle: 'Microtubule Quantum Resonance in Microgravity: New Evidence',
    metaDesc: 'Does human consciousness rely on quantum resonance? Orbital microgravity experiments reveal terahertz dipole oscillations in neuronal microtubule lattices.',
    primary: 'microtubules quantum resonance terahertz neuronal cytoskeleton'
  },
  'how-do-tall-trees-pull-water-against-gravity': {
    seoTitle: 'How Do Tall Trees Pull Water Against Gravity? Physics of Redwoods',
    metaDesc: 'How do 300-foot redwood trees pull tons of water upward against gravity? Discover how negative pressure, xylem cavitation, and cohesion-tension work.',
    primary: 'how do tall trees pull water against gravity'
  },
  'why-is-gold-yellow-relativistic-quantum-chemistry': {
    seoTitle: 'Why Is Gold Yellow? The Einstein Relativity Physics Explained',
    metaDesc: 'Why is gold yellow while other metals are silver? How Einstein\'s special relativity contracts 6s electron orbitals to absorb blue light and reflect warm gold.',
    primary: 'why is gold yellow relativity'
  },
  'michelson-morley-experiment-disproved-the-aether': {
    seoTitle: 'How the Michelson-Morley Experiment Disproved the Aether',
    metaDesc: 'How optical interferometry and the famous 1887 null result shattered the luminiferous aether theory and paved the way for Einstein\'s special relativity.',
    primary: 'michelson morley experiment aether'
  },
  'fermi-paradox-where-are-all-the-aliens': {
    seoTitle: 'The Fermi Paradox: If Aliens Exist, Where Is Everybody?',
    metaDesc: 'If intelligent alien civilizations are mathematically probable, why haven\'t we found any? Exploring the Great Filter, Zoo Hypothesis, and astrodynamic limits.',
    primary: 'fermi paradox where are all the aliens'
  },
  'kola-superdeep-borehole-deepest-hole-on-earth': {
    seoTitle: 'Kola Superdeep Borehole: What Did Scientists Find 12 km Down?',
    metaDesc: 'What did Soviet scientists discover inside Earth\'s deepest artificial hole? Boiling mineral water, microscopic fossils, and 180°C fractured rock at 40,000 feet.',
    primary: 'kola superdeep borehole deepest hole on earth'
  },
  'the-demon-core-manhattan-project-criticality-accidents': {
    seoTitle: 'The Demon Core: Deadly Physics of Manhattan Project Accidents',
    metaDesc: 'What happened when a screwdriver slipped on the 14-pound plutonium sphere? Inside the fatal prompt criticality accidents of Louis Slotin and Harry Daghlian.',
    primary: 'the demon core manhattan project'
  },
  'mpemba-effect-why-hot-water-freezes-faster-than-cold': {
    seoTitle: 'The Mpemba Effect: Why Hot Water Can Freeze Faster Than Cold',
    metaDesc: 'Can hot water actually freeze faster than cold water? Discover the non-equilibrium physics, hydrogen bond covalent relaxation, and micro-convection currents.',
    primary: 'why hot water freezes faster than cold water'
  },
  'why-do-flamingos-stand-on-one-leg': {
    seoTitle: 'Why Do Flamingos Stand on One Leg? Biomechanics Explained',
    metaDesc: 'Why do flamingos stand on one leg without muscle fatigue? Discover the passive gravitational stay apparatus, biomechanical balance, and heat retention secrets.',
    primary: 'why do flamingos stand on one leg'
  },
  'macroscopic-quantum-coherence-in-nuclear-lncrna-liquid-liquid-phase-transition-c': {
    seoTitle: 'Quantum Coherence in Nuclear lncRNA: Orbital Cell Dynamics',
    metaDesc: 'How low-gravity suppression of buoyant convection reveals macroscopic quantum coherence inside long non-coding RNA liquid-liquid phase condensates.',
    primary: 'lncRNA phase transition kinetics microgravity'
  },
  'schrodingers-cat-quantum-physics-paradox-explained': {
    seoTitle: 'Schrödinger\'s Cat Explained Simply: The Quantum Paradox',
    metaDesc: 'Can a cat be both alive and dead at the same time? Discover Erwin Schrödinger\'s famous thought experiment, quantum superposition, and the observer effect.',
    primary: 'schrodingers cat explained simply quantum superposition paradox'
  },
  'why-do-octopuses-have-three-hearts-and-blue-blood': {
    seoTitle: 'Why Do Octopuses Have Three Hearts and Blue Blood?',
    metaDesc: 'Why do octopuses have three separate hearts and copper-rich blue blood? How hemocyanin and branchial hearts power cephalopods in freezing, low-oxygen oceans.',
    primary: 'why do octopuses have three hearts and blue blood'
  },
  'mariana-trench-challenger-deep-creatures-pressure': {
    seoTitle: 'What Lives at the Bottom of Mariana Trench at 36,000 Feet?',
    metaDesc: 'How do deep-sea animals survive 1,100 atmospheres of crushing pressure in the Challenger Deep? Discover piezolyte TMAO stabilizers and abyssal trench biology.',
    primary: 'what lives in the mariana trench challenger deep pressure'
  },
  'immortal-jellyfish-turritopsis-dohrnii-biological-immortality': {
    seoTitle: 'The Immortal Jellyfish: How Turritopsis Cheats Natural Aging',
    metaDesc: 'How does Turritopsis dohrnii revert from an adult medusa back to a juvenile polyp colony? Discover cellular transdifferentiation and biological immortality.',
    primary: 'immortal jellyfish turritopsis dohrnii biological immortality'
  },
  'what-would-happen-if-earth-stopped-spinning': {
    seoTitle: 'What Would Happen If Earth Stopped Spinning for 5 Seconds?',
    metaDesc: 'What happens if Earth suddenly halts its 1,000 mph rotation for just 5 seconds? Supersonic winds, mega-tsunamis, and planetary inertia physics explained.',
    primary: 'what would happen if the earth stopped spinning 5 seconds'
  },
  'chernobyl-elephants-foot-deadliest-radioactive-mass': {
    seoTitle: 'Chernobyl\'s Elephant\'s Foot: Deadliest Radioactive Object on Earth',
    metaDesc: 'Inside Chernobyl\'s Unit 4: what happens if you stand in front of the Elephant\'s Foot? Radiation dosage, corium lava chemistry, and photographic decay.',
    primary: 'chernobyl elephants foot corium radioactive mass'
  },
  'double-slit-experiment-quantum-mechanics-explained': {
    seoTitle: 'The Double-Slit Experiment Explained Simply: Quantum Reality',
    metaDesc: 'How does observing a particle change its physical outcome? The double-slit experiment, wave-particle duality, and quantum superposition explained clearly.',
    primary: 'double slit experiment explained simply quantum mechanics wave particle duality observer effect'
  },
  'what-happens-if-you-fall-into-a-black-hole': {
    seoTitle: 'What Happens If You Fall into a Black Hole? Spaghettification',
    metaDesc: 'What would an astronaut experience crossing the event horizon of a black hole? Tidal gravitational forces, extreme spaghettification, and relativistic time dilation.',
    primary: 'what happens if you fall into a black hole spaghettification event horizon time dilation'
  },
  '3d-bioprinting-organoids-in-microgravity': {
    seoTitle: '3D Bioprinting Organs in Space: Why Zero-G Changes Everything',
    metaDesc: 'Why does zero gravity beat Earth for bioprinting complex vascularized human organs? How scaffold-free acoustic levitation prevents gravitational tissue collapse.',
    primary: '3d bioprinting organs in microgravity zero gravity tissue engineering'
  },
  'space-adaptation-syndrome-space-motion-sickness': {
    seoTitle: 'Space Motion Sickness: Why 70% of Astronauts Suffer in Orbit',
    metaDesc: 'Why do 70% of astronauts experience severe nausea during their first 48 hours in space? Sensory conflict theory, otolith fluid shifts, and vestibular adaptation.',
    primary: 'space motion sickness space adaptation syndrome astronaut nausea zero gravity'
  },
  'can-plants-grow-in-space-without-gravity': {
    seoTitle: 'Can Plants Grow in Space Without Gravity? NASA Astrobotany',
    metaDesc: 'Can plants orient roots and grow crops without gravitational cues? Discover how light phototropism substitutes for gravitropism in space station agriculture.',
    primary: 'can plants grow in space without gravity astrobotany'
  },
  'how-do-astronauts-sleep-in-space': {
    seoTitle: 'How Do Astronauts Sleep in Zero Gravity on the Space Station?',
    metaDesc: 'How do astronauts sleep without floating away or suffocating in exhaled CO2 pockets? Inside private ISS sleep quarters, tethered sleeping bags, and eye masks.',
    primary: 'how do astronauts sleep in space zero gravity sleeping bag space station'
  },
  'why-do-astronauts-lose-bone-density-in-space': {
    seoTitle: 'Why Astronauts Lose 1-2% Bone Density Every Month in Space',
    metaDesc: 'Why do astronauts lose bone mineral density faster than osteoporosis patients? Osteoclast overactivation, lack of mechanical loading, and NASA counter-measures.',
    primary: 'why do astronauts lose bone density in space microgravity osteopenia'
  },
  'difference-between-zero-gravity-and-microgravity': {
    seoTitle: 'Zero Gravity vs Microgravity: The Difference Explained',
    metaDesc: 'Is there really zero gravity on the Space Station? Why Earth\'s gravity is still 90% strong in orbit and why astronauts are actually in perpetual free-fall.',
    primary: 'difference between zero gravity and microgravity physics'
  },
  'what-statement-about-risks-in-social-and-behavioral-sciences-research-is-most-accurate': {
    seoTitle: 'Risks in Social & Behavioral Sciences: Most Accurate IRB Answer',
    metaDesc: 'What statement about risks in social and behavioral sciences research is most accurate? The definitive CITI IRB exam answer, minimal risk rules, and ethics guide.',
    primary: 'what statement about risks in social and behavioral sciences research is most accurate'
  },
  'ideal-interaction-dynamics-of-defects-and-background-fields-in': {
    seoTitle: 'Topological Defects and Background Fields in Quantum Systems',
    metaDesc: 'How background electromagnetic fields couple to topological solitons, skyrmions, and domain walls in condensed matter quantum systems.',
    primary: 'condensed matter defects background fields quantum dynamics'
  },
  'maximal-orbital-entanglement-from-non-interacting-fermions': {
    seoTitle: 'Maximal Orbital Entanglement from Non-Interacting Fermions',
    metaDesc: 'Can non-interacting fermions generate maximal quantum entanglement? Orbital partition schemes, Slater determinant bounds, and quantum state generation.',
    primary: 'orbital entanglement non interacting fermions quantum state generation'
  },
  'how-does-zero-gravity-kill-cancer-cells': {
    seoTitle: 'How Does Zero Gravity Kill Cancer Cells? Space Oncology Research',
    metaDesc: 'How does microgravity trigger apoptosis in malignant cancer cells without chemotherapy? Mechanical unloading, cytoskeleton disruption, and space oncology.',
    primary: 'how does zero gravity kill cancer cells space oncology apoptosis'
  },
  'what-happens-to-human-body-in-zero-gravity': {
    seoTitle: 'What Happens to the Human Body in Zero Gravity? Medical Guide',
    metaDesc: 'What happens to human muscles, bones, eyes, and heart in zero gravity? A complete medical guide to cephalic fluid shifts, muscle atrophy, and SANS syndrome.',
    primary: 'what happens to the human body in zero gravity space medicine'
  },
  'size-independent-logarithmic-sobolev-inequalities-for-quantum': {
    seoTitle: 'Logarithmic Sobolev Inequalities in Dissipative Quantum Systems',
    metaDesc: 'How size-independent logarithmic Sobolev inequalities guarantee rapid mixing times in open quantum Gibbs samplers and many-body quantum computing.',
    primary: 'quantum gibbs samplers logarithmic sobolev inequalities mixing times'
  },
  'mixed-state-deep-thermalization-under-generic-quantum-errors': {
    seoTitle: 'Deep Thermalization in Mixed Quantum States Under Decoherence',
    metaDesc: 'How quantum error channels drive mixed state deep thermalization and state design randomness in noisy intermediate-scale quantum (NISQ) systems.',
    primary: 'mixed state deep thermalization quantum errors decoherence open quantum systems'
  },
  'screening-strongly-correlated-materials-in-solid-oxide-cells': {
    seoTitle: 'Screening Catalysts for Solid Oxide Fuel Cells via Quantum Simulation',
    metaDesc: 'Accelerating solid oxide fuel cell efficiency using quantum computing and DFT simulations of strongly correlated transition metal oxide perovskites.',
    primary: 'solid oxide cells quantum simulation strongly correlated materials clean energy'
  },
  'estimation-non-linear-compression-potential': {
    seoTitle: 'AI in Turbulent Fluid Flows: Estimating Compression Potential',
    metaDesc: 'How deep convolutional autoencoders quantify non-linear compression limits and dimensional reduction in turbulent Navier-Stokes fluid flows.',
    primary: 'turbulent flows autoencoder non-linearity compression potential machine learning'
  },
  'quantum-parameter-estimation-no-go-result': {
    seoTitle: 'Can Quantum Physics Measure Reality? The No-Go Proof Explained',
    metaDesc: 'Does quantum parameter estimation reveal true physical values? Mathematical proof and no-go theorem exposing the fundamental limits of quantum metrology.',
    primary: 'what does quantum parameter estimation estimate a no go result for tru microgravity space research'
  },
  'phonon-assisted-free-electron-recoil-control-and-mechanical-sensing': {
    seoTitle: 'Controlling Free-Electron Recoil: Quantum Nanomechanics',
    metaDesc: 'How phonon coupling controls free-electron recoil in transmission electron microscopy, enabling sub-femtometre mechanical displacement sensing.',
    primary: 'phonon assisted electron recoil nanomechanics quantum sensors'
  },
  'supersolid-phase-transitions-trapped-quantum-gases': {
    seoTitle: 'Inside Supersolids: Trapping Matter That Is Liquid & Solid',
    metaDesc: 'How tilted dipolar quantum gases form supersolids—a paradoxical state of matter exhibiting simultaneous crystalline rigidity and frictionless superfluid flow.',
    primary: 'characterizing supersolid phase transitions in trapped quantum gases w microgravity space research'
  },
  'relativistic-time-dilation-and-mitochondrial-aging-clocks': {
    seoTitle: 'Do We Age Slower in Space? Relativity and Cellular Clocks',
    metaDesc: 'Does relativistic time dilation slow down human biological aging? How cellular mitochondrial oscillators interact with orbital velocity and gravitational potential.',
    primary: 'relativistic time dilation mitochondrial aging clocks space travel'
  },
  'zero-g-capillary-fluidics-and-surface-tension-bioreactors': {
    seoTitle: 'Growing Tissues Without Gravity: Zero-G Capillary Bioreactors',
    metaDesc: 'How suppressing Rayleigh-Bénard buoyancy convection allows pure surface-tension-driven fluidics in orbital tissue culture bioreactors.',
    primary: 'zero g capillary fluidics surface tension bioreactors space biotechnology'
  },
  'debye-shielding-and-plasma-sheath-dynamics-in-spacecraft-biosensing': {
    seoTitle: 'Spacecraft Biosensors in Orbit: Overcoming Plasma Sheath Shielding',
    metaDesc: 'Overcoming ionospheric Debye plasma sheath distortions in orbital biosensors and external spacecraft biological measurement arrays.',
    primary: 'debye shielding plasma sheath spacecraft biosensing low earth orbit'
  },
  'radical-pair-spin-coherence-human-cryptochrome-4': {
    seoTitle: 'Cryptochrome 4 in Humans: Can We Sense Earth\'s Magnetic Field?',
    metaDesc: 'Can humans detect geomagnetic fields? Quantum spin coherence in human Cryptochrome 4 proteins and the radical pair mechanism in microgravity.',
    primary: 'cryptochrome 4 in humans magnetoreception quantum biology radical pair mechanism'
  },
  'synthetic-poly-adp-metallo-peptides-telomeric-radioprotection': {
    seoTitle: 'Deep-Space Radiation Shield: Synthetic Peptides Protecting DNA',
    metaDesc: 'How synthetic metallo-peptides compact human telomeric chromatin, delivering an 88% reduction in double-strand DNA breaks from galactic cosmic rays.',
    primary: 'telomeric radioprotection deep space cosmic rays'
  },
  'acoustic-levitation-scaffold-free-cardiac-organoid-bioprinting': {
    seoTitle: 'Why Scientists Are 3D-Printing Beating Hearts in Zero Gravity',
    metaDesc: 'Using soundwaves instead of scaffolding: how ultrasound acoustic levitation prints functional, vascularized cardiac organoid tissue in microgravity.',
    primary: 'acoustic levitation zero gravity cardiac organoid bioprinting'
  },
  'macromolecular-crystallography-membrane-transporters-orbit': {
    seoTitle: 'Growing Perfect Protein Crystals in Zero Gravity for Drug Design',
    metaDesc: 'How orbital microgravity eliminates buoyancy convection, yielding sub-angstrom crystal structures of drug-resistant human membrane transporters.',
    primary: 'sub angstrom macromolecular crystallography membrane transporter microgravity crystal growth'
  },
  'quantum-proton-tunneling-crispr-cas9-catalytic-triads': {
    seoTitle: 'CRISPR in Zero Gravity: Does Quantum Tunneling Speed Up DNA Cuts?',
    metaDesc: 'Orbital experiments uncover temperature-independent proton tunneling in CRISPR-Cas9 catalytic triads, proving non-classical quantum kinetics in gene editing.',
    primary: 'quantum proton tunneling crispr cas9 catalytic triad microgravity kinetics isotope effect'
  },
  'microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats': {
    seoTitle: 'Space Station Superbugs: Why Biofilms Grow Thicker in Orbit',
    metaDesc: 'Why do bacterial biofilms mutate and resist antibiotics on the ISS? The fluid dynamic and biophysical triggers behind orbital antimicrobial resistance.',
    primary: 'microbial biofilm spaceflight antibiotic resistance pseudomonas iss life support'
  },
  'cerebrovascular-glymphatic-clearance-microgravity-optic-nerve-syndrome': {
    seoTitle: 'Why Astronauts Lose Vision in Space: SANS Syndrome Explained',
    metaDesc: 'Why does spaceflight impair astronauts\' vision? Spaceflight-Associated Neuro-Ocular Syndrome (SANS), cephalic venous congestion, and glymphatic fluid pooling.',
    primary: 'spaceflight associated neuro ocular syndrome sans glymphatic clearance microgravity'
  },
  'photosystem-ii-charge-separation-far-red-light-orbital-bioreactors': {
    seoTitle: 'Farming on Mars: Far-Red Light Photosynthesis in Orbital Bioreactors',
    metaDesc: 'Re-engineering Photosystem II for far-red photon harvesting to power ultra-low energy crops and cyanobacteria bioreactors for lunar and Martian colonies.',
    primary: 'photosystem ii far red light orbital bioreactors space agriculture cyanobacteria'
  },
  'bose-einstein-polariton-condensation-orbital-microgravity': {
    seoTitle: 'Bose-Einstein Condensates in Orbit: Fifth State of Matter',
    metaDesc: 'Achieving room-temperature polariton condensation in orbital microgravity cavities without gravitational phase separation or thermal collapse.',
    primary: 'bose einstein polariton condensation microgravity cold atom lab iss'
  },
  'epigenetic-t-cell-activation-remodeling-extended-spaceflight': {
    seoTitle: 'Astronaut Immunity: How Long Spaceflight Alters T-Cells',
    metaDesc: 'How prolonged weightlessness and cosmic radiation remodel T-lymphocyte epigenetic marks, causing astronaut immune suppression on extended missions.',
    primary: 'epigenetic t cell remodeling spaceflight immune dysregulation deep space'
  },
  'self-assembling-chiral-nanotubes-zero-convection-solute-gradients': {
    seoTitle: 'Flawless Nanotechnology in Space: Self-Assembling Chiral Nanotubes',
    metaDesc: 'How zero-gravity eliminates density-driven solute convection, allowing pristine self-assembly of defect-free chiral carbon nanotubes for advanced electronics.',
    primary: 'chiral nanotubes self assembly zero convection microgravity nanomaterials'
  },
  'mitochondrial-electron-transport-efficiency-spaceflight-radiation': {
    seoTitle: 'How Cosmic Radiation Damages Mitochondria and Cellular Energy',
    metaDesc: 'How deep-space galactic cosmic rays disrupt mitochondrial electron transport complexes I and IV, causing bioenergetic collapse and oxidative stress.',
    primary: 'mitochondrial electron transport space radiation cellular bioenergetics'
  },
  'biomineralization-hydroxyapatite-scaffolds-simulated-lunar-freefall': {
    seoTitle: 'Regenerating Bones on the Moon: Hydroxyapatite Biomineralization',
    metaDesc: 'Comparing hydroxyapatite bone regeneration kinetics under lunar 1/6th gravity versus orbital free-fall to heal astronaut bone loss in deep space.',
    primary: 'biomineralization hydroxyapatite scaffolds lunar gravity bone regeneration'
  },
  'single-cell-rna-seq-endothelial-cells-hyperstatic-weightlessness': {
    seoTitle: 'Blood Vessels in Space: Single-Cell RNA Sequencing in Free-Fall',
    metaDesc: 'How vascular endothelial cells adapt to the shock of rocket launch and weightlessness: single-cell RNA sequencing reveals mechanosensitive gene pathways.',
    primary: 'single cell rna sequencing endothelial cells weightlessness vascular adaptation'
  },
  'squid-biosensing-neuronal-action-potentials-low-earth-orbit': {
    seoTitle: 'Measuring Brainwaves in Orbit: SQUID Quantum Neuro-Sensors',
    metaDesc: 'Using Superconducting Quantum Interference Devices (SQUIDs) to record non-invasive femtotesla magnetic brain signals inside spacecraft environments.',
    primary: 'squid biosensing neuronal action potentials low earth orbit quantum neurobiology'
  },
  'tardigrade-dsup-protein-chromatin-radioprotective-compaction': {
    seoTitle: 'Tardigrade Super-Shield: How Dsup Protein Protects DNA from Radiation',
    metaDesc: 'How the extremophilic tardigrade Dsup (Damage Suppressor) protein wraps around human chromatin fibers like a physical shield to protect DNA against lethal radiation.',
    primary: 'tardigrade dsup protein damage suppressor chromatin radioprotection'
  }
};

let updatedCount = 0;
articles.forEach(art => {
  const master = masterCatalog[art.id];
  if (master) {
    art.seoTitle = master.seoTitle;
    art.primaryKeyword = master.primary;
    if (master.metaDesc) {
      art.description = master.metaDesc;
    }
    updatedCount++;
  }
});

// Also ensure high-intent Featured Snippet direct answers are present
const irbArt = articles.find(a => a.id === 'what-statement-about-risks-in-social-and-behavioral-sciences-research-is-most-accurate');
if (irbArt) {
  const snippetBox = `<div class="p-6 my-8 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm">
    <div class="flex items-center gap-2 mb-2 text-amber-900 font-bold text-sm tracking-wide uppercase">
      <span>💡</span> Quick Answer for IRB & CITI Exams:
    </div>
    <p class="text-base sm:text-lg text-slate-900 font-semibold leading-relaxed mb-3">
      <strong>The most accurate statement is:</strong> "Risks in social and behavioral sciences research are primarily psychological, social, or economic (such as breach of confidentiality, social stigmatization, legal liability, or reputational harm), rather than physical."
    </p>
    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
      Unlike biomedical trials where participants face physical harm or adverse drug reactions, behavioral and observational studies carry risks related to privacy loss, distress during sensitive questioning, or discrimination if personal data is exposed.
    </p>
  </div>`;
  
  if (irbArt.content && !irbArt.content.includes('Quick Answer for IRB & CITI Exams')) {
    irbArt.content = snippetBox + '\n' + irbArt.content;
  }
}

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`[HIGH-CTR] Successfully updated ${updatedCount} / ${articles.length} articles with complete, high-CTR titles, meta descriptions, and featured snippet callouts!`);
