'use strict';

/**
 * =============================================================================
 * BioGravity Top 1 Ranking & Performance Booster
 * (scripts/boost-all-pages-ranking.js)
 * =============================================================================
 * 
 * Implements end-to-end optimizations to drive Position #1 rankings, max CTR,
 * Core Web Vitals performance, and Google AI Overviews / Featured Snippets.
 * 
 * 1. Generates concise, authoritative 45-60 word quickAnswer blocks for ALL articles
 *    (targeting Google Position 0 / Featured Snippet and AI search citations).
 * 2. Tightens all SEO titles to 45-62 characters with high-converting search intent,
 *    removing truncate-risk titles and aligning with exact user queries.
 * 3. Boosts striking-distance queries (demon core, social science risks, cryptochrome 4,
 *    human body zero-g, etc.) with targeted FAQ questions and keyword-exact hooks.
 * 4. Cleans and optimizes news titles in data/news.json, eliminating broken truncations
 *    and generic suffixes to maximize Google Discover & Google News CTR.
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const articlesPath = path.join(dataDir, 'articles.json');
const newsPath = path.join(dataDir, 'news.json');

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

console.log('🚀 Initiating BioGravity Sitewide Top 1 Ranking Boost...');

// 1. Title fixes for the 6 long titles
const TITLE_FIXES = {
  'chernobyl-elephants-foot-deadliest-radioactive-mass': {
    seoTitle: "Chernobyl Elephant's Foot: Inside Earth's Deadliest Object",
    metaDesc: "Inside Chernobyl's Reactor 4: what happens if you approach the Elephant's Foot? Corium lava physics, fatal 10,000-Roentgen radiation doses, and cleanup."
  },
  'screening-strongly-correlated-materials-in-solid-oxide-cells': {
    seoTitle: "Screening Fuel Cell Catalysts via Quantum Simulation",
    metaDesc: "How quantum computing and tensor network algorithms accelerate the screening of strongly correlated oxygen-electrode materials for solid oxide fuel cells."
  },
  'debye-shielding-and-plasma-sheath-dynamics-in-spacecraft-biosensing': {
    seoTitle: "Spacecraft Biosensors: Overcoming Plasma Sheaths in Orbit",
    metaDesc: "How ionospheric plasma sheaths and Debye screening lengths govern nano-electronic biosensor sensitivity on orbital spacecraft and space stations."
  },
  'photosystem-ii-charge-separation-far-red-light-orbital-bioreactors': {
    seoTitle: "Farming on Mars: Far-Red Photosynthesis in Space Bioreactors",
    metaDesc: "How far-red light charge separation in Photosystem II enables continuous biomass generation inside low-gravity orbital bioreactors for Mars colonization."
  },
  'self-assembling-chiral-nanotubes-zero-convection-solute-gradients': {
    seoTitle: "Flawless Space Nanotech: Chiral Nanotube Self-Assembly",
    metaDesc: "Discover how zero-convection solute gradients in microgravity enable defect-free self-assembly of chiral supramolecular nanotubes for advanced materials."
  },
  'tardigrade-dsup-protein-chromatin-radioprotective-compaction': {
    seoTitle: "Tardigrade Super-Shield: How Dsup Protein Protects DNA",
    metaDesc: "Discover how tardigrade Dsup (damage suppressor) protein binds and compacts chromatin fibers to shield cellular DNA against lethal cosmic radiation."
  },
  'what-statement-about-risks-in-social-and-behavioral-sciences-research-is-most-accurate': {
    seoTitle: "What Statement About Social Science Research Risks Is Accurate?",
    metaDesc: "Discover the definitive IRB answer on risks in social and behavioral sciences research under 45 CFR 46: non-physical harms, confidentiality, and minimal risk."
  }
};

// 2. High-converting quickAnswers for all 30 articles missing them
const QUICK_ANSWERS = {
  'terahertz-resonance-and-coherent-dipole-oscillations-in-neuronal-microtubule-lat':
    "Orbital experiments under 0.06 μg microgravity reveal that neuronal microtubules exhibit coherent terahertz dipole oscillations with kinetic isotope effects 4.7× above classical predictions. Without terrestrial buoyant convection and thermal shear, molecular quantum coherence persists up to 384 picoseconds, providing empirical support for non-classical cytoskeletal signaling.",

  'macroscopic-quantum-coherence-in-nuclear-lncrna-liquid-liquid-phase-transition-c':
    "Liquid-liquid phase separation (LLPS) of nuclear lncRNA in microgravity exhibits macroscopic quantum coherence lifetimes an order of magnitude longer than on Earth. Eliminating buoyant convective turbulence enables stable condensation boundaries, demonstrating that gravitational unloading reveals previously masked quantum transition states in nuclear gene regulation.",

  'ideal-interaction-dynamics-of-defects-and-background-fields-in':
    "A unified Hamiltonian formulation couples moving topological defects to continuous background fields in condensed matter. In orbital microgravity free-fall, the suppression of hydrostatic pressure gradients permits direct experimental observation of conservative vortex-sound interactions in Gross-Pitaevskii superfluids and liquid crystal defect dynamics.",

  'maximal-orbital-entanglement-from-non-interacting-fermions':
    "Non-interacting fermionic systems achieve maximal orbital entanglement through unitary basis rotations that distribute correlation across all modes. Unlike quantum chemistry which compresses correlation into few orbitals, quantum information protocols utilize orbital rotation algorithms to maximize accessible entanglement entropy for fault-tolerant computing.",

  'size-independent-logarithmic-sobolev-inequalities-for-quantum':
    "We establish system-size-independent logarithmic Sobolev inequalities for quantum Gibbs samplers satisfying KMS detailed balance. By bounding relative entropy contraction independently of particle count, these mathematical bounds prove rapid thermalization and stable convergence rates for open quantum dissipative simulators.",

  'mixed-state-deep-thermalization-under-generic-quantum-errors':
    "Under generic environmental noise and quantum channel errors, mixed-state quantum systems undergo deep thermalization into universal Haar-random ensembles across projected subsystems. This reveals that quantum chaotic scrambling and non-local information spreading remain robust against local dephasing and depolarizing error channels.",

  'screening-strongly-correlated-materials-in-solid-oxide-cells':
    "Quantum computing algorithms accelerate the screening of strongly correlated transition-metal oxides for solid oxide fuel cells (SOFCs). By mapping 3d orbital electron correlations and oxygen-vacancy formation energies onto qubit registers, quantum simulation bypasses the severe self-interaction errors of classical DFT methods.",

  'estimation-non-linear-compression-potential':
    "Non-linear autoencoders achieve up to 80% greater dimensional reduction than classical Proper Orthogonal Decomposition (POD) in turbulent flow modeling. An a priori metric quantifies manifold curvature and spectral energy decay, predicting whether deep neural network architectures outperform linear low-dimensional embeddings.",

  'quantum-parameter-estimation-no-go-result':
    "A rigorous no-go theorem proves that quantum parameter estimation cannot be interpreted as estimating pre-existing 'true' physical values under standard operational axioms. Quantum uncertainty and measurement disturbance establish that inferred parameters represent contextual properties generated by the measurement apparatus itself.",

  'phonon-assisted-free-electron-recoil-control-and-mechanical-sensing':
    "Optomechanical membranes interacting with free-electron beams enable sub-attosecond quantum recoil control. Phonon-assisted inelastic electron-light scattering creates a quantum transducer where mechanical vibration modes modulate the electron energy spectrum with quantum-limited force sensitivity.",

  'supersolid-phase-transitions-trapped-quantum-gases':
    "Tilted dipolar quantum gases confined in optical traps undergo phase transitions into supersolid states where crystalline order coexists with frictionless superfluid flow. Microgravity simulation allows observation of roton excitation softening and spontaneous droplet crystallization without gravitational collapse.",

  'relativistic-time-dilation-and-mitochondrial-aging-clocks':
    "Relativistic velocity Lorentz contractions and gravitational potential gradients in deep-space trajectories alter intracellular thermodynamic rates. Mitochondrial redox oscillations and circadian transcriptional feedback loops desynchronize, demonstrating that biological aging clocks require micro-chronobiological calibration during interplanetary transit.",

  'zero-g-capillary-fluidics-and-surface-tension-bioreactors':
    "In microgravity, capillary forces and surface tension replace gravity as dominant fluid drivers (Bond number << 1). Orbital bioreactors eliminate Rayleigh-Bénard convective shear stress, enabling uniform nutrient diffusion and three-dimensional cellular suspension without mechanical impellers or turbulent cell damage.",

  'debye-shielding-and-plasma-sheath-dynamics-in-spacecraft-biosensing':
    "Low Earth Orbit spacecraft traverse ambient ionospheric plasma where Debye screening layers attenuate biosensor electric fields. Operating biosensor arrays above Debye cutoff frequencies restores sub-nanomolar molecular detection, preventing orbital plasma charging from blinding external analytical instruments.",

  'radical-pair-spin-coherence-human-cryptochrome-4':
    "Human Cryptochrome 4 (hCry4) displays quantum radical pair spin dynamics sensitive to geomagnetic fields. In orbital microgravity free-fall, the absence of mechanical shear extends radical spin-state coherence lifetimes beyond 100 microseconds, confirming that human cryptochromes possess the biophysical apparatus for magnetoreceptive light sensing.",

  'synthetic-poly-adp-metallo-peptides-telomeric-radioprotection':
    "Synthetic poly-ADP metallo-peptides engineered for deep-space missions assemble into protective shields around telomeric chromatin. These nanopeptides scavenge high-linear-energy-transfer (HLET) cosmic ray hydroxyl radicals and crosslink fragile double-strand DNA ends, reducing chromosomal aberration rates by up to 74%.",

  'acoustic-levitation-scaffold-free-cardiac-organoid-bioprinting':
    "Acoustic levitation combined with orbital microgravity enables scaffold-free assembly of vascularized cardiac organoids. Standing ultrasonic wave fields guide cardiomyocytes and endothelial cells into uniform 3D tissue geometry without synthetic hydrogels, producing synchronized beating myocardium with native capillary networks.",

  'macromolecular-crystallography-membrane-transporters-orbit':
    "Sub-angstrom macromolecular crystallography of ABCB1 multidrug membrane transporters grown in orbital microgravity achieves 0.84 Å diffraction resolution. Suppressed buoyancy convection produces defect-free crystal lattices that reveal coordinated water channels and substrate binding pockets obscured in 1G terrestrial samples.",

  'quantum-proton-tunneling-crispr-cas9-catalytic-triads':
    "Quantum mechanical modeling demonstrates that CRISPR-Cas9 DNA cleavage relies on low-barrier proton tunneling within the catalytic triad. Kinetic isotope substitutions and orbital cryo-trapping confirm that hydrogen tunneling accelerates phosphodiester bond hydrolysis by orders of magnitude beyond classical transition-state theory.",

  'microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats':
    "Pseudomonas aeruginosa and Staphylococcus biofilms cultured in closed-loop ISS environmental systems develop thicker exopolysaccharide matrices and 4× higher antibiotic tolerance. Microgravity alters bacterial envelope stress responses, requiring specialized enzymatic and catalytic surface coatings to prevent life-support contamination.",

  'cerebrovascular-glymphatic-clearance-microgravity-optic-nerve-syndrome':
    "Spaceflight-Associated Neuro-ocular Syndrome (SANS) results from cephalad fluid shifts that impede cranial venous drainage and impair glymphatic clearance. Elevated intracranial pressure and optic disc edema can be mitigated through targeted lower-body negative pressure (LBNP) countermeasures that restore normal hydrostatic fluid distribution.",

  'photosystem-ii-charge-separation-far-red-light-orbital-bioreactors':
    "Far-red light (700-750 nm) driving chlorophyll d/f charge separation in Photosystem II enables productive photosynthesis in low-light orbital bioreactors. This photochemical adaptation allows space-based crop farms to operate with 35% less electrical energy while maintaining high oxygen and biomass yields for Mars crews.",

  'bose-einstein-polariton-condensation-orbital-microgravity':
    "Exciton-polariton condensation in microgravity semiconductor microcavities demonstrates macroscopic quantum coherence at elevated temperatures. Eliminating gravity-induced mechanical stress in the mirror distributed Bragg reflectors stabilizes polariton superfluid currents across millimeter-scale spatial geometries.",

  'epigenetic-t-cell-activation-remodeling-extended-spaceflight':
    "Extended spaceflight causes epigenetic remodeling in CD4+ and CD8+ T cells, marked by altered DNA methylation at promoter sites for interleukin-2 and interferon-gamma. Suppressed immune activation in orbit is reversible upon gravitational reloading, identifying specific epigenetic targets for immunological prophylaxis.",

  'self-assembling-chiral-nanotubes-zero-convection-solute-gradients':
    "In zero-gravity, pure Fickian diffusion creates smooth, undisturbed solute concentration gradients that guide chiral molecules into exceptionally long, defect-free nanotubes. These space-grown nanostructures exhibit electrical conductivity and mechanical tensile strength 3× higher than terrestrial equivalents.",

  'mitochondrial-electron-transport-efficiency-spaceflight-radiation':
    "High-energy galactic cosmic ray ions induce persistent oxidative damage in mitochondrial respiratory complexes I and III. Pre-treatment with targeted antioxidant peptide Szeto-Schiller 31 (SS-31) preserves electron transport chain stoichiometry and restores ATP synthesis efficiency during extended orbital exposure.",

  'biomineralization-hydroxyapatite-scaffolds-simulated-lunar-freefall':
    "Biomineralization of calcium hydroxyapatite within collagen matrices in simulated lunar gravity yields uniform nanocrystalline architecture with compressive strength matching natural cortical bone. This provides a blueprint for in-situ bone graft manufacturing on future lunar and Martian colonies.",

  'single-cell-rna-seq-endothelial-cells-hyperstatic-weightlessness':
    "Single-cell RNA sequencing reveals that vascular endothelial cells undergo immediate mechanotransductive reprogramming upon entering weightlessness. Genes governing shear-stress sensing (KLF2, eNOS) downregulate within hours, while angiogenic and cellular remodeling pathways upregulate to adapt to absent hydrostatic pressures.",

  'squid-biosensing-neuronal-action-potentials-low-earth-orbit':
    "Superconducting quantum interference devices (SQUIDs) deployed in orbital biosensing arrays detect sub-millivolt neuronal action potentials with picotesla magnetic sensitivity. The ultra-quiet microgravity platform isolates endogenous biomagnetic signals from terrestrial seismic, acoustic, and vibrational interference.",

  'tardigrade-dsup-protein-chromatin-radioprotective-compaction':
    "Tardigrade Damage Suppressor (Dsup) protein forms an electrostatic molecular cloud around nucleosomes, physically shielding chromatin fibers from radiolytic reactive oxygen species (ROS) and double-strand DNA breaks. Expressing Dsup in human cell cultures increases radiation tolerance by over 40%."
};

// 3. Apply updates to articles
let updatedArticles = 0;
articles.forEach(art => {
  let modified = false;

  // Apply Title & Meta Fixes
  if (TITLE_FIXES[art.id]) {
    art.seoTitle = TITLE_FIXES[art.id].seoTitle;
    art.metaDescription = TITLE_FIXES[art.id].metaDesc;
    modified = true;
  }

  // Apply QuickAnswers
  if (QUICK_ANSWERS[art.id]) {
    art.quickAnswer = QUICK_ANSWERS[art.id];
    modified = true;
  }

  // Ensure every article has a quickAnswer
  if (!art.quickAnswer) {
    art.quickAnswer = (art.summary || art.metaDescription || '').slice(0, 250);
    modified = true;
  }

  // Ensure striking distance FAQs for Demon Core
  if (art.id === 'the-demon-core-manhattan-project-criticality-accidents') {
    const hasRufus = (art.faqs || []).some(f => f.question.toLowerCase().includes('rufus'));
    if (!hasRufus) {
      art.faqs = art.faqs || [];
      art.faqs.unshift({
        question: "Who or what was Rufus in the Demon Core accidents?",
        answer: "Before its two fatal criticality accidents, the 6.2-kilogram plutonium sphere was affectionately nicknamed 'Rufus' by Los Alamos Manhattan Project scientists. It was only re-christened 'The Demon Core' after the fatal radiation bursts that killed Harry Daghlian in 1945 and Louis Slotin in 1946."
      });
      art.faqs.push({
        question: "What would happen if the Demon Core was left completely closed?",
        answer: "If the surrounding beryllium or tungsten carbide tamper hemisphere was left completely closed, the core would enter prompt supercriticality within microseconds. The resulting runaway nuclear chain reaction would release lethal neutron and gamma radiation bursts exceeding 1,000 Grays, ionizing the surrounding air and causing rapid thermal expansion disassembly."
      });
      modified = true;
    }
  }

  // Ensure striking distance FAQ for Cryptochrome 4
  if (art.id === 'radical-pair-spin-coherence-human-cryptochrome-4') {
    const hasHumanMag = (art.faqs || []).some(f => f.question.toLowerCase().includes('human'));
    if (!hasHumanMag) {
      art.faqs = art.faqs || [];
      art.faqs.unshift({
        question: "Do humans possess Cryptochrome 4 and can we sense magnetic fields?",
        answer: "Yes, humans express Cryptochrome 4 (hCry4) in retina and photoreceptor tissues. While humans do not consciously navigate by magnetic fields like migratory birds, purified hCry4 exhibits the exact same quantum radical-pair spin coherence mechanisms, functioning as a latent molecular magnetosensor."
      });
      modified = true;
    }
  }

  if (modified) updatedArticles++;
});

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`✅ Successfully updated ${updatedArticles} research dispatches in articles.json!`);

// 4. Clean & Optimize News Titles in news.json
const NEWS_TITLE_CLEANUPS = {
  'fast-and-accurate-neural-triage-decoding-of-new-evidence-in':
    'Fast and Accurate Neural Triage Decoding [2026 Breakthrough]',
  'using-domain-walls-to-benchmark-fast-quantum-anneals-new':
    'Benchmarking Fast Quantum Anneals with Domain Walls [2026]',
  'the-gauge-invariant-orbital-angular-momentum-of-vector-new':
    'Gauge-Invariant Orbital Angular Momentum of Vector Bosons',
  'mapping-stellar-obliquity-across-space-and-time-new-evidence-in':
    'Mapping Stellar Obliquity Across Space and Time [Astrophysics]',
  'grow-compress-and-perturb-a-hybrid-new-evidence-in-quantum':
    'Grow, Compress, and Perturb: Hybrid Quantum Tensor Networks',
  'algebraic-strong-to-weak-symmetry-breaking-and-partial-new':
    'Strong-to-Weak Symmetry Breaking in Quantum Many-Body Systems',
  'what-can-be-computed-with-indefinite-causal-structure-new':
    'Computing with Indefinite Causal Structure in Quantum Physics',
  'classical-communication-over-quantum-channels-does-new-evidence':
    'Classical Communication Limits Over Quantum Channels [Study]',
  'probing-fluctuations-in-photon-emission-statistics-of-new':
    'Probing Fluctuations in Single-Photon Emission Statistics',
  'algebraic-theory-of-abelian-fractons-and-beyond-new-evidence-in':
    'Algebraic Theory of Abelian Fractons in Topological Matter',
  'exceptional-points-as-witnesses-of-non-gaussian-noise-new':
    'Exceptional Points as Witnesses of Non-Gaussian Noise [2026]',
  'optimal-diamond-distance-estimation-for-unitary-channels-new':
    'Optimal Diamond Distance Estimation for Unitary Channels',
  'left-handed-transmission-lines-for-the-dynamical-new-evidence-in':
    'Left-Handed Transmission Lines for Dynamical Casimir Physics',
  'locality-in-dissipative-ground-state-preparation-new-evidence-in':
    'Locality in Dissipative Ground-State Preparation [Quantum]',
  'hyaluronic-acid-over-expression-drives-tissue-new-evidence-in':
    'Hyaluronic Acid Overexpression in Tissue Regeneration [LEO]',
  'comparison-of-entangling-strategies-for-unitary-synthesis-new':
    'Entangling Strategies for Unitary Quantum Circuit Synthesis',
  'renormalization-for-robust-memory-without-synchronization-new':
    'Renormalization for Robust Quantum Memory Synchronization',
  'reconstructing-hidden-observables-via-quantum-snapshot-new':
    'Reconstructing Hidden Quantum Observables via State Snapshots',
  'quantum-navigation-in-birds-researchers-clock-extended-radical':
    'Quantum Navigation in Birds: Clocking Radical Pair Coherence',
  'cosmic-echoes-sub-solar-gravitational-wave-detection-points-to':
    'Sub-Solar Gravitational Waves: Evidence for Primordial Dark Matter',
  'coral-survival-breakthrough-marine-biologists-discover-rapid':
    'Coral Survival Breakthrough: Rapid Epigenetic Heat Resistance',
  'beyond-lithium-non-flammable-sodium-solid-state-battery-achieves':
    'Beyond Lithium: Non-Flammable Sodium Battery Achieves 2,000 Cycles',
  'virus-proof-biology-scientists-build-synthetic-bacterial-genome':
    'Virus-Proof Biology: Synthetic Bacterial Genome Immune to Infection',
  'hidden-beneath-two-miles-of-antarctic-ice-scientists-discover':
    'Beneath Two Miles of Antarctic Ice: Immense River Canyon Found',
  'cosmic-monster-on-the-loose-runaway-supermassive-black-hole':
    'Runaway Supermassive Black Hole Leaves 200,000-Light-Year Star Trail',
  'the-forever-chemical-breakthrough-mutant-soil-fungi-wipe-out':
    "Mutant Soil Fungi Wipe Out Toxic 'Forever Chemicals' in 96 Hours",
  '50-000-year-old-dental-tartar-proves-neanderthals-used-natural':
    'Dental Tartar Proves Neanderthals Used Natural Aspirin & Penicillin',
  'fault-tolerant-quantum-leap-physicists-successfully-shield':
    'Fault-Tolerant Quantum Leap: Physicists Shield Qubits from Noise',
  'the-trillion-dollar-moon-economy-why-mining-lunar-ice-will-be':
    'The Trillion-Dollar Moon Economy: Why Mining Lunar Ice Is Feasible',
  'alien-life-at-14-000-feet-below-the-ocean-deep-sea-expedition':
    'Deep-Sea Expedition Finds Unseen Ecosystem 14,000 Feet Below Ocean',
  'metal-rain-and-vaporized-iron-webb-telescope-reveals-extreme':
    'Webb Telescope Reveals Metal Rain & Vaporized Iron on Exoplanet',
  'living-solar-panels-scientists-turn-plant-chloroplasts-into':
    'Living Solar Panels: Chloroplasts Converted to Clean Electricity',
  'ancient-greenland-ice-discloses-shocking-climate-flip-that':
    'Ancient Greenland Ice Reveals 20-Year Abrupt Climate Transition'
};

let updatedNews = 0;
news.forEach(n => {
  if (NEWS_TITLE_CLEANUPS[n.id]) {
    n.title = NEWS_TITLE_CLEANUPS[n.id];
    updatedNews++;
  }
});

fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
console.log(`✅ Successfully cleaned ${updatedNews} news wire titles in news.json!`);
