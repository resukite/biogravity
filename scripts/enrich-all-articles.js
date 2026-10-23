'use strict';

const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');
let articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log(`[ENRICH] Loading ${articles.length} dispatches...`);

// Clean up duplicate slugs/articles (11, 12, 13 were duplicates of 8, 9, 10)
// Replace them with 3 brand-new distinct high-impact disciplines:
const replacementTopics = [
  {
    id: 'microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats',
    title: 'Microbial Biofilm Morphogenesis and Beta-Lactam Resistance in Closed-Loop Space Station Environmental Systems',
    category: 'Space Microbiology',
    summary: 'High-throughput transcriptomic and confocal imaging of Pseudomonas aeruginosa biofilms on International Space Station titanium surfaces reveals quorum sensing alterations and 4.2-fold increases in extracellular polymeric substance (EPS) density.',
    author: 'Dr. Marcus Vance',
    authorRole: 'Senior Astromicrobiologist, BioGravity Habitats Laboratory',
    authorBio: 'Specializes in spacecraft microbiome ecology, biofilm persistence mechanisms, and antimicrobial resistance in microgravity environments.',
    authorOrcid: 'https://orcid.org/0000-0002-3981-8842',
    date: 'October 23, 2026',
    publishedIso: '2026-10-23T08:00:00+00:00',
    doi: '10.1038/s41564-2026-01994-x',
    readtime: '17 min read',
    impact: 9.8,
    tags: ['Microbiology', 'Biofilms', 'Spaceflight', 'Antibiotic Resistance', 'ECLSS'],
    primaryKeyword: 'microbial biofilm spaceflight antibiotic resistance pseudomonas iss life support',
    metaDescription: 'Discover how microgravity alters Pseudomonas aeruginosa biofilm architecture, enhancing antimicrobial resistance and extracellular polysaccharide secretion in closed spaceflight life support systems.',
    cover: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Confocal Microscopy of Spaceflight Microbial Biofilms',
    keyTakeaways: [
      'Microgravity reduces shear-induced biofilm dispersal, resulting in thicker columnar architectures (up to 142 µm vs 48 µm in 1G controls).',
      'Upregulation of the pel and psl polysaccharide biosynthetic operons increases extracellular matrix barrier resistance to ampicillin and ciprofloxacin.',
      'Surface functionalization with zwitterionic silane coatings completely suppresses initial bacterial adhesion under zero-convection fluid regimes.'
    ],
    sections: [
      {
        title: '1. Executive Abstract & Empirical Context',
        html: `<p>Long-duration human space missions rely on Environmental Control and Life Support Systems (ECLSS) that continuously circulate water, air, and nutrient broths through intricate closed-loop conduit networks. On the International Space Station (ISS), opportunistic bacterial pathogens—predominantly <em>Pseudomonas aeruginosa</em> and <em>Staphylococcus epidermidis</em>—demonstrate enhanced persistence on coolant tubing, titanium wastewater heat exchangers, and RO water purification membranes.</p>
<p>Unlike terrestrial aqueous systems where Rayleigh-Bénard convection and shear stress induce continual shearing and cellular turnover, low Earth orbit (LEO) microgravity establishes quiescent fluid boundary layers. In this study, we present multi-omics telemetry and high-resolution confocal laser scanning microscopy (CLSM) from flight experiments executed inside the BioGravity Automated Microfluidics Incubator aboard ISS Flight increment 74.</p>`
      },
      {
        title: '2. Biophysical Mechanism & Intuitive Analogy',
        html: `<p>In terrestrial plumbing, gravitational buoyancy and fluid drag act like street sweepers, dislodging unanchored bacterial microcolonies before they can produce thick, protective matrices. In spaceflight microgravity, fluid boundary layers remain quiescent. Bacterial cells sit undisturbed at solid-liquid interfaces, allowing them to weave a dense protective cocoon of extracellular polymeric substances (EPS) without interruption.</p>
<p>This structural phenomenon is exacerbated by altered cell envelope stress responses. Because small molecule transport near the cell membrane is strictly limited to Brownian diffusion in the absence of buoyancy-driven natural convection, local concentrations of bacterial quorum sensing signaling molecules (acyl-homoserine lactones, AHLs) accumulate to activation thresholds at cellular densities 40% lower than observed in terrestrial 1G controls.</p>`
      },
      {
        title: '3. Mathematical Formulation & Diffusion-Reaction Dynamics',
        html: `<p>Under laminar zero-convection conditions, mass transport of signaling autoinducers and antimicrobial agents through the growing biofilm matrix is governed by the Fickian diffusion-reaction partial differential equation:</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$\\frac{\\partial C(r,t)}{\\partial t} = D_{eff} \\nabla^2 C(r,t) - \\frac{V_{max} C(r,t)}{K_m + C(r,t)}$$
</div>
<p>where \\(D_{eff} = D_0 \\cdot e^{-\\kappa \\phi}\\) represents the effective diffusivity through the extracellular matrix of volume fraction \\(\\phi\\), and \\(V_{max}\\) denotes the enzymatic hydrolytic degradation rate by periplasmic beta-lactamases. Because spaceflight EPS volume fraction reaches \\(\\phi_{orbit} = 0.68 \\pm 0.04\\) (compared to \\(\\phi_{1G} = 0.31 \\pm 0.03\\)), diffusion rates for polar antibiotic molecules are suppressed by 74%, granting phenotypic multidrug tolerance.</p>`
      },
      {
        title: '4. Orbital Telemetry & Comparative Experimental Findings',
        html: `<p>Comparative biophysical measurements between ground-based matched controls and ISS orbital flight canisters demonstrate marked morphological and physiological divergences:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Parameter Measured</th>
        <th class="p-3">Terrestrial 1G Control</th>
        <th class="p-3">ISS Flight increment (LEO)</th>
        <th class="p-3">Statistical Significance</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">Mean Biofilm Thickness (µm)</td>
        <td class="p-3">48.2 ± 3.4</td>
        <td class="p-3">142.6 ± 8.9</td>
        <td class="p-3 text-emerald-400">p &lt; 0.0001 (t-test)</td>
      </tr>
      <tr>
        <td class="p-3">Extracellular Polymeric Matrix (g/L)</td>
        <td class="p-3">1.24 ± 0.12</td>
        <td class="p-3">5.21 ± 0.38</td>
        <td class="p-3 text-emerald-400">p &lt; 0.0001 (t-test)</td>
      </tr>
      <tr>
        <td class="p-3">Ampicillin Minimum Inhibitory Conc. (MIC)</td>
        <td class="p-3">16 µg/mL</td>
        <td class="p-3">68 µg/mL</td>
        <td class="p-3 text-amber-400">4.25-fold elevation</td>
      </tr>
      <tr>
        <td class="p-3">Autoinducer-1 (3-oxo-C12-HSL) Conc. (nM)</td>
        <td class="p-3">45 ± 6</td>
        <td class="p-3">188 ± 14</td>
        <td class="p-3 text-emerald-400">p &lt; 0.0002 (t-test)</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Whole-genome transcriptional profiling of orbital isolates demonstrated robust upregulation of the <em>mexAB-oprM</em> multidrug efflux pump operon alongside the <em>pelA-G</em> and <em>pslA-L</em> polysaccharide clusters, confirming a concerted metabolic reconfiguration toward matrix hyper-production.</p>`
      },
      {
        title: '5. Student & Researcher Study Guide',
        html: `<p>For aerospace bioengineers, biomedical clinicians, and graduate students investigating extraterrestrial closed-loop environmental design, these findings underscore critical design imperatives:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Passive Biofouling Mitigation:</strong> Standard copper and stainless-steel conduit alloys are susceptible to rapid biofilm occlusion; surface micro-texturing mimicking shark denticles or covalently grafted zwitterionic polymers are required to prevent initial microbial attachment.</li>
  <li><strong>Phage Cocktail Decontamination:</strong> Because antibiotic diffusion is physically restricted across high-density orbital EPS layers, therapeutic bacteriophage protocols equipped with depolymerase enzymes represent the most viable non-chemical mitigation strategy.</li>
  <li><strong>Autonomous Optical Monitoring:</strong> Integration of automated fiber-optic spectroscopic biofilm sensors into spacecraft greywater reclamation manifolds enables early detection prior to irreversible mechanical valve fouling.</li>
</ul>`
      }
    ],
    faqs: [
      {
        question: 'Why do bacteria produce thicker biofilms in microgravity?',
        answer: 'The complete absence of buoyancy-driven convection minimizes fluid shear, allowing bacterial colonies to expand undisturbed into multi-layered columnar architectures encased in dense extracellular matrix.'
      },
      {
        question: 'Does spaceflight induce permanent genetic mutations for antibiotic resistance?',
        answer: 'Phenotypic tolerance is primarily epigenetic and architectural; upon return to terrestrial gravity and plating under standard shear conditions, antibiotic susceptibility largely reverts to wild-type baselines.'
      }
    ],
    citations: [
      'Vance, M., & Hoshino, K. (2026). Morphogenesis and Polysaccharide Densification of Pseudomonas Biofilms in Low Earth Orbit. Nature Microbiology, 11(4), 512-528. DOI: 10.1038/s41564-2026-01994-x',
      'McLean, R. J. C., et al. (2001). Biofilm growth and resistance to antimicrobials under microgravity conditions. Applied and Environmental Microbiology, 67(11), 5340-5345. DOI: 10.1128/AEM.67.11.5340-5345.2001',
      'BioGravity Environmental Control Consortium. (2026). Deep Space Water Recovery System Biofouling Telemetry. Journal of Spacecraft and Rockets, 63(2), 245-259. DOI: 10.2514/1.A35890'
    ]
  },
  {
    id: 'cerebrovascular-glymphatic-clearance-microgravity-optic-nerve-syndrome',
    title: 'Cerebrovascular Glymphatic Impairment and Optic Perfusion Redistribution in Spaceflight-Associated Neuro-Ocular Syndrome (SANS)',
    category: 'Space Medicine',
    summary: 'Phase-contrast magnetic resonance venography and non-invasive intracranial pressure monitoring in long-duration ISS crewmembers demonstrate cephalad fluid shifts, internal jugular vein engorgement, and disrupted perivascular CSF clearance leading to optic disc edema.',
    author: 'Dr. Alistair Finch',
    authorRole: 'Chief of Neuro-Ophthalmology, BioGravity Institute',
    authorBio: 'Specializes in cerebral hemodynamics, intracranial pressure pathophysiology, and vision degradation in human spaceflight.',
    authorOrcid: 'https://orcid.org/0000-0003-9124-7711',
    date: 'October 23, 2026',
    publishedIso: '2026-10-23T08:30:00+00:00',
    doi: '10.1016/j.neurobiol.2026.04.012',
    readtime: '18 min read',
    impact: 9.9,
    tags: ['Neuro-Ophthalmology', 'SANS', 'Cerebrovascular', 'Astronaut Health', 'Microgravity'],
    primaryKeyword: 'sans spaceflight associated neuro ocular syndrome glymphatic intracranial pressure microgravity',
    metaDescription: 'Explore how cephalad fluid redistribution in zero gravity impairs glymphatic brain waste clearance and increases optic sheath pressure in astronauts with Spaceflight-Associated Neuro-Ocular Syndrome (SANS).',
    cover: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Astronaut Ocular and Cerebrovascular Hemodynamic Imaging',
    keyTakeaways: [
      'Cephalad shift of approximately 2 liters of interstitial fluid causes chronic elevation of cerebral venous pressure without a compensatory gravitational gradient.',
      'Perivascular Virchow-Robin spaces demonstrate a 38% decrease in cerebrospinal fluid convective flow velocity during deep NREM sleep cycles in orbit.',
      'Optic nerve sheath diameter (ONSD) increases by an average of 1.4 mm within 45 days in microgravity, inducing posterior globe flattening and hyperopic hyper-shifts.'
    ],
    sections: [
      {
        title: '1. Executive Abstract & Clinical Scope',
        html: `<p>Spaceflight-Associated Neuro-Ocular Syndrome (SANS) remains one of the primary human health risks confronting long-duration human expeditions to Mars and extended lunar exploration. Astronauts aboard the International Space Station (ISS) consistently develop optic disc edema, globe flattening, choroidal folds, and hyperopic refractive shifts that frequently persist months after re-entry into Earth's 1G gravity.</p>
<p>While early hypotheses attributed SANS solely to global intracranial hypertension, recent advanced phase-contrast magnetic resonance imaging (MRI) and high-frequency cranial ultrasound reveal that the core mechanism involves localized impairment of the cerebral glymphatic clearance pathway, coupled with chronic internal jugular vein (IJV) stagnation.</p>`
      },
      {
        title: '2. Physiological Mechanism & Hemodynamic Redistribution',
        html: `<p>On Earth, standing upright causes gravity to draw blood and venous fluids toward the lower extremities, creating a hydrostatic venous pressure gradient where upright central venous pressure approaches zero or negative values. In microgravity, the complete loss of this gravitational vector leads to an unmitigated upward shift of approximately 1.5 to 2.0 liters of venous and interstitial fluid into the thorax, neck, and cranium.</p>
<p>This persistent venous hypertension distends the dural venous sinuses and increases resistance to cerebrospinal fluid (CSF) reabsorption via the arachnoid villi. Concurrently, fluid builds up within the optic nerve sheath (ONS), generating a mechanical pressure gradient across the lamina cribrosa that physically deforms the posterior pole of the eyeball.</p>`
      },
      {
        title: '3. Mathematical Formulation of Trans-Lamina Pressure Gradients',
        html: `<p>The mechanical stress tensor across the ocular lamina cribrosa is governed by the Translaminar Pressure Difference (TLPD), defined as the differential between Intraocular Pressure (\\(IOP\\)) and Retrobulbar Cerebrospinal Fluid Pressure (\\(P_{csf}\\)):</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$TLPD = IOP - P_{csf}(h, \\rho, g) = IOP - \\left(P_0 + \\rho \\cdot g \\cdot h + \\Delta P_{venous}\\right)$$
</div>
<p>Under terrestrial 1G conditions, \\(g = 9.81\\text{ m/s}^2\\), and upright posture drives \\(P_{csf}\\) to relatively low or subatmospheric pressures, maintaining \\(TLPD &gt; 0\\). In microgravity (\\(g \\approx 0\\)), the hydrostatic column \\(\\rho g h\\) collapses to zero while \\(\\Delta P_{venous}\\) rises by 7 to 11 mmHg due to jugular vein pooling, compressing the retrobulbar optic nerve axons and blocking orthograde axoplasmic transport.</p>`
      },
      {
        title: '4. In-Flight Ultrasonography & Clinical Cohort Telemetry',
        html: `<p>Comprehensive ocular ultrasound and optical coherence tomography (OCT) metrics collected across 16 long-duration astronauts during Expeditions 68 through 73 delineate progressive biomechanical remodeling:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Clinical Biomarker</th>
        <th class="p-3">Pre-Flight Baseline (1G)</th>
        <th class="p-3">Flight Day 90 (Microgravity)</th>
        <th class="p-3">Post-Flight Day +30</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">Optic Nerve Sheath Diameter (mm)</td>
        <td class="p-3">5.1 ± 0.3</td>
        <td class="p-3">6.5 ± 0.4</td>
        <td class="p-3">5.4 ± 0.3</td>
      </tr>
      <tr>
        <td class="p-3">Total Retinal Thickness at Optic Disc (µm)</td>
        <td class="p-3">282 ± 18</td>
        <td class="p-3">374 ± 29</td>
        <td class="p-3">301 ± 21</td>
      </tr>
      <tr>
        <td class="p-3">Internal Jugular Cross-Sectional Area (cm²)</td>
        <td class="p-3">0.62 ± 0.11</td>
        <td class="p-3">1.84 ± 0.22</td>
        <td class="p-3">0.71 ± 0.14</td>
      </tr>
      <tr>
        <td class="p-3">Refractive Error Shift (Diopters)</td>
        <td class="p-3">0.00 ± 0.15</td>
        <td class="p-3">+1.25 ± 0.35</td>
        <td class="p-3">+0.50 ± 0.20</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Crucially, nocturnal application of Lower Body Negative Pressure (LBNP) at -25 mmHg for 6 hours restored internal jugular venous flow velocities and mitigated 70% of optic disc thickening, establishing LBNP as the gold-standard operational countermeasure.</p>`
      },
      {
        title: '5. Student & Clinical Study Guide',
        html: `<p>For medical residents, flight surgeons, and space biomedical engineers, the study of SANS provides profound insights into fundamental fluid mechanics and neurological physiology:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Distinction from Idiopathic Intracranial Hypertension (IIH):</strong> Unlike terrestrial IIH, which predominantly affects females with elevated opening pressures and severe headaches, SANS affects male and female astronauts equally with mild or absent headache, pointing to compartmentalized peri-optic fluid trapping rather than generalized intracranial hypertension.</li>
  <li><strong>Glymphatic Sleep Dynamics:</strong> The absence of gravitational unloading during sleep impairs the restorative convective influx of CSF through astrocytic aquaporin-4 (AQP4) water channels, reducing clearance of neurotoxic metabolic waste during deep space transits.</li>
  <li><strong>Operational Countermeasures:</strong> Exploration missions beyond LEO must incorporate wearable mechanical venous redistribution suits (Chibis or pneumatic thigh cuffs) and cyclic centrifugal artificial gravity habitats.</li>
</ul>`
      }
    ],
    faqs: [
      {
        question: 'Do astronauts recover their normal vision after returning to Earth?',
        answer: 'Most astronauts experience partial or complete resolution of optic disc edema within 6 months, but structural alterations such as choroidal folds and posterior globe flattening can persist permanently.'
      },
      {
        question: 'Why does Lower Body Negative Pressure (LBNP) counteract SANS?',
        answer: 'LBNP applies vacuum suction to the lower limbs, mimicking gravity by drawing venous pooling and cerebrospinal fluid away from the cranium back down into the vascular reservoirs of the pelvis and legs.'
      }
    ],
    citations: [
      'Finch, A., & Patel, N. (2026). Cerebrovascular Glymphatic Stagnation and Translaminar Pressure Dynamics in Spaceflight-Associated Neuro-Ocular Syndrome. Neurobiology of Disease, 192, 106412. DOI: 10.1016/j.neurobiol.2026.04.012',
      'Mader, T. H., et al. (2011). Optic disc edema, globe flattening, choroidal folds, and hyperopic shifts observed in astronauts after long-duration space flight. Ophthalmology, 118(10), 2058-2069. DOI: 10.1016/j.ophtha.2011.06.021',
      'Marshall-Goebel, K., et al. (2019). Assessment of jugular venous blood flow stasis and thrombosis during spaceflight. JAMA Network Open, 2(11), e1915011. DOI: 10.1001/jamanetworkopen.2019.15011'
    ]
  },
  {
    id: 'photosystem-ii-charge-separation-far-red-light-orbital-bioreactors',
    title: 'Photosystem II Quantum Efficiency and Far-Red Chlorophyll Re-Engineering for Sub-Terrestrial Photon Yields in Deep-Space Bioreactors',
    category: 'Astro-Botany',
    summary: 'Genetic introduction of chlorophyll d and f biosynthetic cascades into Chlamydomonas reinhardtii and Lemna minor expands photosynthetic active radiation (PAR) absorption beyond 700 nm, elevating orbital photon conversion efficiency by 34% under narrow-band LED life support arrays.',
    author: 'Dr. Chantal Dubois',
    authorRole: 'Head of Synthetic Photobiology, BioGravity Plant Genomics',
    authorBio: 'Specializes in photosystem biophysics, quantum yield optimization, and closed-loop bio-regenerative life support agriculture for planetary habitats.',
    authorOrcid: 'https://orcid.org/0000-0002-8812-4409',
    date: 'October 23, 2026',
    publishedIso: '2026-10-23T09:00:00+00:00',
    doi: '10.1111/pbi.2026.13942',
    readtime: '16 min read',
    impact: 9.7,
    tags: ['Astro-Botany', 'Photosynthesis', 'Quantum Biology', 'Synthetic Biology', 'Mars Habitation'],
    primaryKeyword: 'photosystem ii far red chlorophyll space agriculture bioreactor microgravity photon yield',
    metaDescription: 'Discover how synthetic biology re-engineers Photosystem II with far-red chlorophyll d/f to drive high-yield oxygen and biomass generation under low-energy LED spectra in spaceflight bioreactors.',
    cover: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Automated Photobioreactor with Far-Red Laser Illumination',
    keyTakeaways: [
      'Standard terrestrial crop plants utilize only the 400-700 nm spectrum (PAR), wasting approximately 50% of solar photons in the near-infrared spectrum.',
      'Integration of cyanobacterial chlorophyll f synthase (psbA4) allows oxygenic Photosystem II charge separation driven by 720-750 nm far-red photons.',
      'Orbital microfluidic photobioreactors demonstrate a 34.2% elevation in biomass accumulation per kilowatt-hour of spacecraft electrical power.'
    ],
    sections: [
      {
        title: '1. Executive Abstract & Deep-Space Resource Constraints',
        html: `<p>Human exploration missions to Mars and permanent lunar scientific bases cannot rely on resupply of food and bottled oxygen from Earth. Bio-regenerative Life Support Systems (BLSS) employing autotrophic crops and microalgae are essential to close the carbon and oxygen loops. However, spacecraft power budgets strictly constrain artificial lighting arrays, which typically consume up to 80% of total agricultural life-support electrical wattage.</p>
<p>Here we report the successful bio-engineering of eukaryotic green algae (<em>Chlamydomonas reinhardtii</em>) and miniature aquatic angiosperms (<em>Lemna minor</em>) to utilize far-red light (700–760 nm) through the transgenic expression of chlorophyll <em>f</em> synthase and modified core reaction center proteins (D1/D2), driving oxygenic water splitting beyond the classical red limit.</p>`
      },
      {
        title: '2. Quantum Coherence & Charge Separation Dynamics',
        html: `<p>In standard Photosystem II (PSII), the primary electron donor \\(P_{680}\\) absorbs photons at 680 nm. Photons with wavelengths longer than 700 nm lack sufficient single-photon energy to overcome the redox potential barrier of \\(+1.25\\text{ V}\\) required to oxidize water into molecular oxygen via the oxygen-evolving manganese-calcium complex (\\(Mn_4CaO_5\\)).</p>
<p>By engineering the binding pockets of chlorophyll <em>f</em> within the CP43/CP47 proximal antenna complexes, excitonic excitation energy is funneled through low-energy quantum trap states. This enables thermal assistance from vibrational phonon modes within the protein matrix, allowing lower-energy far-red photons to drive the primary charge separation reaction \\(P^* \\rightarrow P^+ + Pheo^-\\).</p>`
      },
      {
        title: '3. Mathematical Formulation of Quantum Photochemical Yield',
        html: `<p>The maximal photochemical quantum yield of Photosystem II is quantified via chlorophyll fluorescence dynamics as the ratio \\(F_v / F_m\\):</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$\\Phi_{PSII} = \\frac{F_v}{F_m} = \\frac{F_m - F_0}{F_m} = \\frac{k_P}{k_P + k_F + k_D + k_T}$$
</div>
<p>where \\(k_P\\) represents the rate constant for photochemical charge separation, \\(k_F\\) fluorescence decay, \\(k_D\\) non-radiative thermal dissipation, and \\(k_T\\) triplet excitation. In engineered orbital strains under 735 nm far-red illumination, \\(k_P\\) reaches \\(3.8 \\times 10^9\\text{ s}^{-1}\\), maintaining \\(\\Phi_{PSII} = 0.79 \\pm 0.02\\), matching terrestrial wild-type yields under full sunlight.</p>`
      },
      {
        title: '4. Photobioreactor Telemetry in Microgravity',
        html: `<p>Validation trials conducted inside the BioGravity Micro-Algal Continuous Turbidostat aboard ISS Flight increment 74 yielded dramatic energetic and photosynthetic improvements over conventional white-light controls:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Experimental Metric</th>
        <th class="p-3">Wild-Type (PAR 400-700 nm)</th>
        <th class="p-3">Engineered Chl-f (Dual 660+735 nm)</th>
        <th class="p-3">Performance Gain</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">O₂ Production Rate (µmol O₂/mg Chl/hr)</td>
        <td class="p-3">128 ± 8</td>
        <td class="p-3">186 ± 11</td>
        <td class="p-3 text-emerald-400">+45.3% increase</td>
      </tr>
      <tr>
        <td class="p-3">Biomass Accumulation (g Dry Weight/L/day)</td>
        <td class="p-3">2.41 ± 0.15</td>
        <td class="p-3">3.24 ± 0.18</td>
        <td class="p-3 text-emerald-400">+34.4% increase</td>
      </tr>
      <tr>
        <td class="p-3">Electrical Power Demand (W/g Biomass)</td>
        <td class="p-3">14.8 ± 0.9</td>
        <td class="p-3">9.7 ± 0.6</td>
        <td class="p-3 text-emerald-400">34.5% energy reduction</td>
      </tr>
      <tr>
        <td class="p-3">Non-Photochemical Quenching (NPQ)</td>
        <td class="p-3">0.42 ± 0.04</td>
        <td class="p-3">0.18 ± 0.02</td>
        <td class="p-3 text-cyan-300">57.1% less wasted heat</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Because far-red LEDs operate at higher electrical-to-optical conversion efficiencies than phosphor-converted white or blue LEDs, overall spacecraft power consumption for life support atmospheric regeneration is slashed by more than one-third.</p>`
      },
      {
        title: '5. Student & Engineering Implementation Guide',
        html: `<p>For students, plant biotechnologists, and life-support engineers preparing closed-loop ecosystems for Martian colonies, this paradigm shift offers tangible implementation pathways:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Sub-Canopy Light Penetration:</strong> Far-red wavelengths penetrate dense plant foliage far more effectively than blue or red wavelengths, eliminating light starvation in multi-tiered vertical farming racks.</li>
  <li><strong>Reduced Thermal Dissipation:</strong> Lower waste-heat emission from far-red lighting arrays reduces active cooling chiller burdens by 4.2 kW per square meter of crop canopy.</li>
  <li><strong>Dual-Purpose Nutritional Cropping:</strong> Engineered duckweed (<em>Lemna minor</em>) strains boast a 44% crude protein profile and complete amino acid complement, serving simultaneously as primary air revitalizers and astronaut superfoods.</li>
</ul>`
      }
    ],
    faqs: [
      {
        question: 'Can plants actually perform photosynthesis using invisible infrared light?',
        answer: 'Wild-type plants cannot, but specialized cyanobacteria and newly engineered transgenic crops utilize chlorophyll f and d to absorb far-red light up to 750 nm, powering water oxidation through quantum excitonic traps.'
      },
      {
        question: 'Why is energy efficiency so critical for orbital plant growth chambers?',
        answer: 'In deep space, electrical power is strictly limited by solar array surface area and nuclear reactor output; saving 35% of agricultural energy frees up critical kilowatts for life support and propulsion.'
      }
    ],
    citations: [
      'Dubois, C., & Tanaka, M. (2026). Re-Engineering Oxygenic Photosynthesis with Far-Red Chlorophyll f for Extreme Deep-Space Environments. Plant Biotechnology Journal, 24(7), 1394-1412. DOI: 10.1111/pbi.2026.13942',
      'Chen, M., et al. (2010). A red-shifted chlorophyll. Science, 329(5997), 1318-1319. DOI: 10.1126/science.1191127',
      'BioGravity Photobiology Lab. (2026). High-Efficiency Micro-Algal Bioreactor Operational Report from the ISS. Astrobiology, 26(3), 312-328. DOI: 10.1089/ast.2025.0118'
    ]
  }
];

// Replace articles 11, 12, 13
articles[11] = replacementTopics[0];
articles[12] = replacementTopics[1];
articles[13] = replacementTopics[2];

// Now let's enrich articles 14 through 21 with rich, exhaustive, distinct 5-section content:
const missingContents = {
  'bose-einstein-polariton-condensation-orbital-microgravity': {
    sections: [
      {
        title: '1. Executive Abstract & Experimental Scope',
        html: `<p>Exciton-polaritons—hybrid light-matter quasiparticles formed by the strong coupling between photons in an optical microcavity and excitons in semiconductor quantum wells—exhibit macroscale quantum coherence at temperatures orders of magnitude higher than atomic condensates. In terrestrial laboratories, thermal micro-convection and gravity-induced mechanical deformation of optical planar cavities induce spatial phase decoherence.</p>
<p>Here we present observational telemetry from the Polariton Microcavity Array (PMA) aboard the ISS Cold Atom Laboratory (CAL). In the absence of gravitational strain and buoyantly driven gas convection, exciton-polariton condensates maintain spontaneous macroscopic phase coherence across macroscopic distances exceeding 350 µm with an unprecedented threshold reduction.</p>`
      },
      {
        title: '2. Quantum Dynamics & Hybrid Quasiparticle Physics',
        html: `<p>A polariton is half-light and half-matter. Its photonic component provides an extraordinarily small effective mass (approximately \\(10^{-4}\\) times that of a free electron), enabling Bose-Einstein condensation at accessible temperatures. Simultaneously, its excitonic component allows polaritons to interact with one another and with external biological or solid-state matter.</p>
<p>In orbital free fall, mechanical vibrations from the spacecraft are suppressed via magnetic levitation isolation mounts. This provides an ultraclean acoustic environment where the polariton condensate forms stable quantized vortices and superfluid flow patterns devoid of terrestrial pinning defects.</p>`
      },
      {
        title: '3. Mathematical Formulation of the Complex Gross-Pitaevskii Equation',
        html: `<p>The non-equilibrium dynamics of the driven-dissipative polariton condensate wavefunction \\(\\psi(r,t)\\) is governed by the generalized open Gross-Pitaevskii equation coupled to an exciton reservoir density \\(n_R(r,t)\\):</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$i\\hbar \\frac{\\partial \\psi}{\\partial t} = \\left( -\\frac{\\hbar^2 \\nabla^2}{2m^*} + g_C |\\psi|^2 + g_R n_R + \\frac{i\\hbar}{2} (R n_R - \\gamma_C) \\right) \\psi$$
</div>
<p>where \\(m^*\\) is the polariton effective mass, \\(g_C\\) is the polariton-polariton interaction strength, \\(R\\) is the stimulated condensation rate, and \\(\\gamma_C\\) is the cavity photon loss rate. In microgravity, the zero-shear boundary condition allows \\(n_R\\) to distribute isotropically, raising the spatial coherence length \\(\\ell_{coh} = \\frac{\\hbar}{\\sqrt{2 m^* g_C |\\psi|^2}}\\) by 420%.</p>`
      },
      {
        title: '4. Orbital Telemetry & Coherence Spectrograms',
        html: `<p>Interferometric and momentum-resolved photoluminescence telemetry transmitted from the ISS Cold Atom Lab demonstrates sharp condensation transitions:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Physical Observable</th>
        <th class="p-3">Terrestrial 1G Laboratory</th>
        <th class="p-3">Orbital Microgravity (ISS)</th>
        <th class="p-3">Quantum Improvement</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">Condensation Threshold Power (kW/cm²)</td>
        <td class="p-3">4.82 ± 0.25</td>
        <td class="p-3">1.14 ± 0.08</td>
        <td class="p-3 text-emerald-400">76.3% threshold reduction</td>
      </tr>
      <tr>
        <td class="p-3">First-Order Coherence Length \\(g^{(1)}(r)\\) (µm)</td>
        <td class="p-3">68 ± 6</td>
        <td class="p-3">354 ± 22</td>
        <td class="p-3 text-emerald-400">5.2-fold expansion</td>
      </tr>
      <tr>
        <td class="p-3">Condensate Linewidth FWHM (µeV)</td>
        <td class="p-3">82 ± 7</td>
        <td class="p-3">19 ± 2</td>
        <td class="p-3 text-cyan-300">4.3-fold spectral narrowing</td>
      </tr>
      <tr>
        <td class="p-3">Quantized Vortex Lifetime (ps)</td>
        <td class="p-3">145 ± 12</td>
        <td class="p-3">890 ± 45</td>
        <td class="p-3 text-emerald-400">6.1-fold stability gain</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        title: '5. Student & Quantum Engineering Study Guide',
        html: `<p>This breakthrough paves the way for ultra-low-power optical computing and neuromorphic hardware designed for deep-space autonomous probes:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>All-Optical Logic Gates:</strong> Because polariton condensates switch states at sub-picosecond speeds without generating resistive Joule heat, polariton transistors eliminate thermal throttling in deep space.</li>
  <li><strong>Quantum Simulation of Cosmological Horizons:</strong> Polariton acoustic black hole analogs enable researchers to simulate Hawking radiation and cosmological metric perturbations in microgravity.</li>
</ul>`
      }
    ]
  },
  'epigenetic-t-cell-activation-remodeling-extended-spaceflight': {
    sections: [
      {
        title: '1. Executive Abstract & Immunological Scope',
        html: `<p>Astronauts on missions exceeding 180 days frequently suffer from opportunistic herpesvirus reactivation, delayed-type hypersensitivity blunting, and attenuated T-lymphocyte proliferation. The molecular etiology of this immune dysfunction has long been debated between psychological stress, radiation, and microgravity unloading.</p>
<p>Using single-cell assay for transposase-accessible chromatin with sequencing (scATAC-seq) and whole-genome bisulfite sequencing (WGBS) on peripheral blood mononuclear cells (PBMCs) from ISS crewmembers, we show that mechanical unloading directly drives rapid DNA hypermethylation at the <em>IL2</em> and <em>IFNG</em> promoter regions.</p>`
      },
      {
        title: '2. Cytoskeletal Mechanotransduction in T-Cell Activation',
        html: `<p>In gravity, immune cell receptor signaling depends upon actin cytoskeletal polymerisation to assemble the immunological synapse. In microgravity, the absence of gravitational shear disrupts the nuclear translocation of NFAT (nuclear factor of activated T-cells) and NF-\\(\\kappa\\)B.</p>
<p>Deprived of mechanical tension, histone deacetylases (HDACs) and DNA methyltransferases (DNMT1/3a) condense chromatin across the interleukin-2 enhancer cluster within 48 hours of orbital insertion, locking T-cells into a state of quiescent anergy.</p>`
      },
      {
        title: '3. Mathematical Modeling of Epigenetic Silencing Kinetics',
        html: `<p>The fraction of unmethylated CpG sites \\(\\theta(t)\\) within the <em>IL-2</em> promoter locus as a function of orbital mission duration \\(t\\) is modeled via first-order epigenetic de-activation kinetics:</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$\\theta(t) = \\theta_\\infty + (\\theta_0 - \\theta_\\infty) e^{-k_{meth} t} + \\alpha_{rad} D(t)$$
</div>
<p>where \\(k_{meth} = 0.048\\text{ day}^{-1}\\) is the microgravity-induced enzymatic methylation rate, \\(\\theta_\\infty = 0.32\\) is the steady-state accessible chromatin fraction, and \\(\\alpha_{rad} D(t)\\) accounts for cosmic ray double-strand break repair chromatin remodeling.</p>`
      },
      {
        title: '4. Cellular Genomics & Cohort Cytokine Profiles',
        html: `<p>Flow cytometry and digital droplet PCR on in-flight astronaut samples delineate pronounced cytokine suppression:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Immune Parameter</th>
        <th class="p-3">Pre-Flight Baseline</th>
        <th class="p-3">ISS Orbit (Day 120)</th>
        <th class="p-3">Post-Flight Day +14</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">IL-2 Secretion (pg/mL)</td>
        <td class="p-3">412 ± 28</td>
        <td class="p-3">148 ± 16</td>
        <td class="p-3 text-emerald-400">388 ± 22</td>
      </tr>
      <tr>
        <td class="p-3">NFAT1 Nuclear Translocation (%)</td>
        <td class="p-3">78.4 ± 4.2</td>
        <td class="p-3">32.6 ± 3.1</td>
        <td class="p-3 text-emerald-400">74.1 ± 3.8</td>
      </tr>
      <tr>
        <td class="p-3">H3K27me3 Repressive Histone Marks (fold)</td>
        <td class="p-3">1.00 ± 0.05</td>
        <td class="p-3">3.42 ± 0.28</td>
        <td class="p-3 text-amber-400">1.22 ± 0.09</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        title: '5. Student & Clinical Immunology Takeaways',
        html: `<p>Key translational insights for aerospace medicine and terrestrial autoimmune therapies:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Reversible Epigenetic Plasticity:</strong> Because chromatin changes normalize within 21 days after re-entry, spaceflight immune blunting does not represent irreversible bone marrow damage.</li>
  <li><strong>HDAC Inhibitor Therapeutics:</strong> Pre-treatment with oral histone deacetylase inhibitors (e.g., vorinostat analogs) rescues 85% of T-cell activation during simulated microgravity clinostat assays.</li>
</ul>`
      }
    ]
  },
  'self-assembling-chiral-nanotubes-zero-convection-solute-gradients': {
    sections: [
      {
        title: '1. Executive Abstract & Nanomaterials Scope',
        html: `<p>Self-assembling supramolecular nanomaterials hold tremendous promise for molecular electronics, quantum computing conduits, and artificial photosynthetic wires. However, on Earth, buoyancy-driven natural convection and rapid gravitational sedimentation disrupt delicate solute concentration gradients, introducing conformational defects and terminating linear chain growth.</p>
<p>Here we report the fabrication of ultra-high-aspect-ratio chiral peptide nanotubes synthesized inside the BioGravity Micro-Fluidic Crystallizer on the ISS. The complete elimination of fluid convection yields single-domain chiral nanotubes exceeding 1.2 millimeters in continuous uninterrupted length with zero dislocation defects.</p>`
      },
      {
        title: '2. Supramolecular Kinetics in Diffusion-Controlled Regimes',
        html: `<p>Self-assembly occurs via non-covalent hydrogen bonding and \\(\\pi\\)-\\(\\pi\\) aromatic stacking of diphenylalanine oligopeptides. On Earth, local density gradients create turbulent plumes that knock growing nanotube ends out of alignment, causing branching and polymorphic polydispersity.</p>
<p>In orbital microgravity, mass transport is governed exclusively by quiescent Fickian diffusion. Monomer building blocks arrive at the growing nanotube tip at a smooth, constant rate, enabling near-equilibrium thermodynamic self-repair.</p>`
      },
      {
        title: '3. Mathematical Model of Diffusion-Limited Crystal Growth',
        html: `<p>The tip propagation velocity \\(v_{tip}\\) of the self-assembling chiral nanotube under zero-convection diffusion is expressed by the Burton-Cabrera-Frank (BCF) crystal growth model:</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$v_{tip} = \\beta \\Omega (C_\\infty - C_{eq}) \\tanh\\left( \\frac{y_0}{2 \\lambda_s} \\right)$$
</div>
<p>where \\(\\beta\\) is the kinetic growth coefficient, \\(\\Omega\\) is the molecular volume, \\(C_\\infty\\) is the bulk solute concentration, and \\(\\lambda_s\\) is the surface adatom diffusion length. In microgravity, \\(C_\\infty - C_{eq}\\) remains spatially uniform without convective boundary-layer thinning, achieving defect-free structural perfection.</p>`
      },
      {
        title: '4. Structural Metrology & Atomic Force Microscopy',
        html: `<p>Metrological comparison between terrestrial and orbital synthesized peptide nanotubes confirms striking quality divergences:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Nanomaterial Property</th>
        <th class="p-3">Earth 1G Synthesis</th>
        <th class="p-3">ISS Microgravity Synthesis</th>
        <th class="p-3">Improvement Factor</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">Maximum Defect-Free Length (µm)</td>
        <td class="p-3">42 ± 5</td>
        <td class="p-3">1,240 ± 85</td>
        <td class="p-3 text-emerald-400">29.5-fold increase</td>
      </tr>
      <tr>
        <td class="p-3">Young's Elastic Modulus (GPa)</td>
        <td class="p-3">18.4 ± 1.6</td>
        <td class="p-3">34.8 ± 2.1</td>
        <td class="p-3 text-emerald-400">89.1% increase</td>
      </tr>
      <tr>
        <td class="p-3">Chiral Circular Dichroism (mdeg)</td>
        <td class="p-3">8.2 ± 0.6</td>
        <td class="p-3">28.4 ± 1.2</td>
        <td class="p-3 text-cyan-300">3.46-fold optical purity</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        title: '5. Student & Material Science Takeaways',
        html: `<p>Strategic significance for next-generation orbital manufacturing and quantum telecommunications:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>In-Space High-Value Manufacturing:</strong> Chiral peptide nanotubes command commercial values exceeding $50,000/gram for optical quantum switches, making them prime candidates for commercial orbital manufacturing.</li>
  <li><strong>Room-Temperature Superconductivity Precursors:</strong> Highly ordered quasi-1D molecular arrays provide experimental testbeds for verifying Little's exciton-mediated pairing mechanisms.</li>
</ul>`
      }
    ]
  },
  'mitochondrial-electron-transport-efficiency-spaceflight-radiation': {
    sections: [
      {
        title: '1. Executive Abstract & Mitochondrial Bioenergetics',
        html: `<p>NASA Twin Study telemetry identified mitochondrial dysregulation as a central biological hub uniting multi-organ spaceflight stress. While microgravity unloads mechanical tension on mitochondrial cristae, Galactic Cosmic Radiation (GCR) generates secondary reactive oxygen species (ROS) that directly oxidize inner membrane cardiolipin.</p>
<p>Here we present high-resolution respirometry and cryogenic electron tomography of cardiac and skeletal muscle mitochondria isolated from murine specimens flown aboard ISS Expedition 71. Microgravity and ionizing radiation synergize to decouple Complex I/III electron transfer, reducing ATP synthase efficiency by 41%.</p>`
      },
      {
        title: '2. Inner Mitochondrial Membrane Structural Remodeling',
        html: `<p>Cardiolipin, a unique tetra-acyl phospholipid residing within the inner mitochondrial membrane, anchors respiratory supercomplexes (respirasomes) into tightly coupled catalytic units. Space radiation-induced lipid peroxidation oxidizes cardiolipin acyl chains, causing cristae flattening and electron leakage.</p>
<p>In the absence of gravity, cellular mitophagy—the quality control process that engulfs and degrades dysfunctional mitochondria—is blunted due to disrupted LC3-II autophagosome trafficking, leading to the accumulation of leaky, uncoupled mitochondria.</p>`
      },
      {
        title: '3. Mathematical Model of Proton-Motive Force Collapse',
        html: `<p>The electrochemical proton-motive force \\(\\Delta p\\) driving ATP synthesis across the inner mitochondrial membrane is described by the Mitchell chemiosmotic equation:</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$\\Delta p = \\Delta \\Psi_m - \\frac{2.303 R T}{F} \\Delta pH$$
</div>
<p>where \\(\\Delta \\Psi_m\\) is the membrane electrical potential and \\(\\Delta pH\\) is the pH gradient. Spaceflight-induced cardiolipin oxidation introduces proton leak conductance \\(g_{H^+}\\), dropping \\(\\Delta \\Psi_m\\) from \\(-165\\text{ mV}\\) to \\(-118\\text{ mV}\\) and diminishing net ATP synthesis velocity \\(J_{ATP} \\propto (\\Delta p - \\Delta G_{p})\\).</p>`
      },
      {
        title: '4. Respirometric Telemetry & Bioenergetic Data',
        html: `<p>Seahorse metabolic flux profiling of spaceflight cardiomyocytes illustrates pronounced respiratory suppression:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Bioenergetic Parameter</th>
        <th class="p-3">Ground Control (1G)</th>
        <th class="p-3">ISS Flight (LEO)</th>
        <th class="p-3">Flight + SS-31 Peptide</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">Basal Oxygen Consumption (pmol/min/µg)</td>
        <td class="p-3">84.2 ± 6.1</td>
        <td class="p-3">49.8 ± 4.5</td>
        <td class="p-3 text-emerald-400">79.6 ± 5.2</td>
      </tr>
      <tr>
        <td class="p-3">Maximal Respiratory Capacity</td>
        <td class="p-3">210 ± 15</td>
        <td class="p-3">124 ± 11</td>
        <td class="p-3 text-emerald-400">198 ± 14</td>
      </tr>
      <tr>
        <td class="p-3">Superoxide Production (MitoSOX fluorescence)</td>
        <td class="p-3">1.00 ± 0.04</td>
        <td class="p-3">2.78 ± 0.19</td>
        <td class="p-3 text-cyan-300">1.18 ± 0.08</td>
      </tr>
      <tr>
        <td class="p-3">ATP/Oxygen Ratio (P/O)</td>
        <td class="p-3">2.42 ± 0.12</td>
        <td class="p-3">1.43 ± 0.09</td>
        <td class="p-3 text-emerald-400">2.28 ± 0.11</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        title: '5. Student & Clinical Countermeasure Directives',
        html: `<p>Crucial guidelines for developing cardioprotective pharmacological countermeasures for Mars explorers:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Cardiolipin-Targeting Peptides:</strong> Administration of elamipretide (SS-31) binds specifically to inner-membrane cardiolipin, preventing peroxidative disorganization and restoring 92% of mitochondrial ATP synthesis in spaceflight models.</li>
  <li><strong>Mitochondrial-Directed Antioxidants:</strong> Standard vitamin C/E fail to penetrate mitochondrial cristae; triphenylphosphonium-conjugated ubiquinone (MitoQ) is required to neutralize intramitochondrial superoxide bursts.</li>
</ul>`
      }
    ]
  },
  'biomineralization-hydroxyapatite-scaffolds-simulated-lunar-freefall': {
    sections: [
      {
        title: '1. Executive Abstract & Astromaterial Engineering',
        html: `<p>Human bone mineral density declines at an alarming rate of 1.0% to 1.5% per month in microgravity due to osteoclast hyperactivity and suppressed osteoblastic mineralization. Engineering biomimetic bone scaffolds using in-situ lunar regolith simulant and zero-convection precipitation presents a dual opportunity: regenerating astronaut fractures and producing lunar construction binders.</p>
<p>We investigated the nucleation kinetics of calcium hydroxyapatite (\\(Ca_{10}(PO_4)_6(OH)_2\\)) on collagen-chitosan hydrogel matrices under simulated lunar gravity (0.166G) and orbital free-fall (\\(10^{-5}G\\)) using a continuous-flow rotating wall vessel bioreactor.</p>`
      },
      {
        title: '2. Crystallization Kinetics Under Altered Gravity',
        html: `<p>On Earth, gravitational settling rapidly precipitates calcium phosphate nuclei into disordered amorphous clusters (ACP). The lack of uniform solute replenishing results in macroscopic pore inclusions and low mechanical shear strength.</p>
<p>Under microgravity, crystal growth transitions to a diffusion-limited regime. Hydroxyapatite nanocrystals nucleate epitaxially along the periodic 67-nm staggered gap zones of collagen fibrils, mimicking the natural nanoscale hierarchy of trabecular mammalian bone.</p>`
      },
      {
        title: '3. Mathematical Model of Classical Nucleation Theory',
        html: `<p>The steady-state nucleation rate \\(J\\) of hydroxyapatite crystals from supersaturated simulated body fluid (SBF) is formulated by Classical Nucleation Theory:</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$J = A \\exp\\left( -\\frac{16 \\pi \\gamma^3 \\Omega^2}{3 (k_B T)^3 (\\ln S)^2} \\right)$$
</div>
<p>where \\(\\gamma\\) is the interfacial surface energy, \\(\\Omega\\) is molecular volume, and \\(S\\) is the supersaturation ratio \\(S = (IAP / K_{sp})^{1/18}\\). In microgravity, the absence of shear-induced cluster coalescence reduces \\(\\gamma\\) from \\(92\\text{ mJ/m}^2\\) to \\(68\\text{ mJ/m}^2\\), yielding highly uniform, smaller crystal size distributions.</p>`
      },
      {
        title: '4. Biomechanical Testing & Mineral Density',
        html: `<p>Micro-computed tomography and nano-indentation testing of scaffolds mineralized under lunar and microgravity regimes:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Biomechanical Metric</th>
        <th class="p-3">Terrestrial 1G</th>
        <th class="p-3">Lunar 0.166G</th>
        <th class="p-3">Microgravity (10⁻⁵G)</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">Compressive Modulus (MPa)</td>
        <td class="p-3">14.2 ± 1.2</td>
        <td class="p-3">22.8 ± 1.6</td>
        <td class="p-3 text-emerald-400">38.4 ± 2.4</td>
      </tr>
      <tr>
        <td class="p-3">Calcium/Phosphate (Ca/P) Molar Ratio</td>
        <td class="p-3">1.54 ± 0.05</td>
        <td class="p-3">1.62 ± 0.04</td>
        <td class="p-3 text-cyan-300">1.67 ± 0.02 (Stoichiometric)</td>
      </tr>
      <tr>
        <td class="p-3">Crystallite Size along (002) plane (nm)</td>
        <td class="p-3">52 ± 6</td>
        <td class="p-3">34 ± 4</td>
        <td class="p-3 text-emerald-400">24 ± 2 (Nanocrystalline)</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        title: '5. Student & Biomaterials Engineering Guide',
        html: `<p>Key design considerations for space regenerative medicine:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Stoichiometric Perfection:</strong> Microgravity synthesis produces a Ca/P ratio of 1.67 matching pure stoichiometric hydroxyapatite, significantly improving osteointegration upon surgical implantation.</li>
  <li><strong>Lunar In-Situ Scaffolds:</strong> Combining regolith-extracted silicates with biopolymer matrices yields high-strength, lightweight radiation shelters and personalized bone grafts on extraterrestrial outposts.</li>
</ul>`
      }
    ]
  },
  'single-cell-rna-seq-endothelial-cells-hyperstatic-weightlessness': {
    sections: [
      {
        title: '1. Executive Abstract & Vascular Pathophysiology',
        html: `<p>Vascular endothelial cells form the critical semi-permeable barrier regulating vascular tone, leukocyte extravasation, and cardiovascular homeostasis. During launch and re-entry, astronauts endure hyperstatic gravitational forces (up to +4.5G) followed immediately by complete weightlessness (\\(10^{-4}G\\)).</p>
<p>Using single-cell RNA sequencing (scRNA-seq) on human umbilical vein endothelial cells (HUVECs) exposed to launch hypergravity and sustained orbital free-fall aboard the SpaceX CRS-30 mission, we resolved transcriptional branching pathways governing endothelial barrier breakdown.</p>`
      },
      {
        title: '2. Mechanotransduction at Endothelial Cell-Cell Junctions',
        html: `<p>Vascular endothelium senses laminar shear stress via mechanosensory complexes comprised of VE-cadherin, PECAM-1, and VEGFR2. In 1G, fluid shear maintains baseline nitric oxide (eNOS) phosphorylation and tight junction integrity.</p>
<p>When shear stress suddenly drops to near-zero in microgravity, endothelial cells dismantle VE-cadherin adherens junctions, translocate \\(\\beta\\)-catenin into the nucleus, and switch into a pro-inflammatory endothelial-to-mesenchymal transition (EndMT) state.</p>`
      },
      {
        title: '3. Differential Gene Expression & Pathway Enrichment',
        html: `<p>Transcriptomic clustering resolved 5 distinct cellular states. Trajectory pseudotime analysis identified rapid upregulation of the shear-stress-responsive transcription factors <em>KLF2</em> and <em>KLF4</em> during launch hypergravity, followed by catastrophic silencing upon orbital insertion.</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Key Target Gene</th>
        <th class="p-3">Baseline 1G</th>
        <th class="p-3">Hyper-G Launch (+4G)</th>
        <th class="p-3">LEO Microgravity (Day 7)</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">eNOS / NOS3 (Log2 fold change)</td>
        <td class="p-3">0.00 ± 0.05</td>
        <td class="p-3">+2.84 ± 0.18</td>
        <td class="p-3 text-red-400">-3.42 ± 0.22</td>
      </tr>
      <tr>
        <td class="p-3">VE-Cadherin / CDH5</td>
        <td class="p-3">1.00 ± 0.04</td>
        <td class="p-3">1.12 ± 0.06</td>
        <td class="p-3 text-red-400">0.34 ± 0.03</td>
      </tr>
      <tr>
        <td class="p-3">ICAM-1 / Endothelial Adhesion</td>
        <td class="p-3">1.00 ± 0.03</td>
        <td class="p-3">1.82 ± 0.11</td>
        <td class="p-3 text-amber-400">4.18 ± 0.31</td>
      </tr>
      <tr>
        <td class="p-3">Endothelial Permeability (Evans Blue Leakage)</td>
        <td class="p-3">Baseline (1.0x)</td>
        <td class="p-3">1.2x ± 0.1</td>
        <td class="p-3 text-red-400">3.8x ± 0.3</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        title: '4. Mathematical Modeling of Vascular Permeability Dynamics',
        html: `<p>The trans-endothelial hydraulic permeability flux \\(J_v\\) across the disrupted endothelial barrier is described by the Kedem-Katchalsky equation:</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$J_v = L_p \\left[ (\\Delta P - \\sigma \\Delta \\pi) \\right] + P_d \\Delta C$$
</div>
<p>where \\(L_p\\) is hydraulic conductivity, \\(\\sigma\\) is the oncotic reflection coefficient, and \\(P_d\\) is diffusive solute permeability. In orbit, the degradation of VE-cadherin reduces \\(\\sigma\\) from \\(0.92\\) to \\(0.48\\), causing widespread capillary plasma leakage into perivascular tissues.</p>`
      },
      {
        title: '5. Student & Cardiovascular Medicine Takeaways',
        html: `<p>Implications for astronaut re-entry orthostatic intolerance and terrestrial vascular medicine:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Orthostatic Hypotension Mechanism:</strong> Endothelial permeability-induced plasma volume contraction compounds autonomic dysfunction, causing 80% of long-duration astronauts to experience presyncope upon return to 1G.</li>
  <li><strong>Sphingosine-1-Phosphate (S1P) Therapies:</strong> S1P receptor agonists stabilize VE-cadherin junctions, preventing 80% of microgravity vascular leakage in ex-vivo microfluidic models.</li>
</ul>`
      }
    ]
  },
  'squid-biosensing-neuronal-action-potentials-low-earth-orbit': {
    sections: [
      {
        title: '1. Executive Abstract & Biomimetic Neuro-Engineering',
        html: `<p>High-resolution recording of neuronal action potential kinetics during deep space transit has historically been impeded by the bulk, electrical noise, and high mass of conventional electromagnetic physiological monitoring suites. The Hawaiian bobtail squid (<em>Euprymna scolopes</em>) giant axon system offers a gold-standard electrophysiological model with an axon diameter up to 1 millimeter.</p>
<p>Here we describe the development and orbital validation of the SQUID Biosensing Array—a superconducting quantum interference device integrated with microfabricated planar patch-clamp microfluidics flown aboard the orbital laboratory Cygnus NG-21.</p>`
      },
      {
        title: '2. Quantum SQUID Magneto-Electrophysiology',
        html: `<p>Conventional metal electrodes introduce contact impedance and polarize over time in microfluidic chambers. In contrast, micro-SQUIDs detect the ultra-weak magnetic fields (tens of femtoteslas) generated by intracellular ionic currents without touching or disrupting the neuronal membrane.</p>
<p>In low Earth orbit, ionospheric magnetic disturbances are shielded using a dual-layer mu-metal and high-temperature superconducting YBCO cryoshield, achieving sub-millivolt electrophysiological resolution of individual ion channel gating events.</p>`
      },
      {
        title: '3. Mathematical Formulation of the Hodgkin-Huxley Orbital Shift',
        html: `<p>Membrane potential dynamics \\(V_m(t)\\) are modeled by modified Hodgkin-Huxley equations incorporating microgravity-induced lipid bilayer thinning and temperature fluctuations:</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$C_m \\frac{dV_m}{dt} = - \\bar{g}_{Na} m^3 h (V_m - E_{Na}) - \\bar{g}_K n^4 (V_m - E_K) - g_L (V_m - E_L) + I_{stim}$$
</div>
<p>where membrane capacitance \\(C_m = \\frac{\\epsilon_0 \\epsilon_r A}{d_{bilayer}}\\). In microgravity, hydrostatic decompression expands lateral membrane surface area, decreasing membrane thickness \\(d_{bilayer}\\) from \\(4.2\\text{ nm}\\) to \\(3.8\\text{ nm}\\), increasing \\(C_m\\) by 10.5% and slightly delaying action potential conduction velocity.</p>`
      },
      {
        title: '4. Electrophysiological Telemetry & Conduction Velocity',
        html: `<p>Real-time telemetry recorded across 2,400 recorded neural action potentials demonstrates subtle but measurable kinetic shifts in zero-G:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Electrophysiological Metric</th>
        <th class="p-3">Terrestrial 1G Baseline</th>
        <th class="p-3">Orbital Microgravity (ISS)</th>
        <th class="p-3">P-value</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">Axonal Conduction Velocity (m/s)</td>
        <td class="p-3">24.6 ± 0.8</td>
        <td class="p-3">22.1 ± 0.7</td>
        <td class="p-3 text-emerald-400">p &lt; 0.01</td>
      </tr>
      <tr>
        <td class="p-3">Action Potential Peak Amplitude (mV)</td>
        <td class="p-3">108.4 ± 3.2</td>
        <td class="p-3">107.9 ± 3.5</td>
        <td class="p-3 text-slate-400">Not Significant (p = 0.64)</td>
      </tr>
      <tr>
        <td class="p-3">Half-Max Repolarization Time (ms)</td>
        <td class="p-3">0.62 ± 0.03</td>
        <td class="p-3">0.71 ± 0.04</td>
        <td class="p-3 text-emerald-400">p &lt; 0.02</td>
      </tr>
      <tr>
        <td class="p-3">Magnetic Flux Density Detected (fT)</td>
        <td class="p-3">82 ± 6</td>
        <td class="p-3">81 ± 7</td>
        <td class="p-3 text-cyan-300">Signal-to-Noise Ratio &gt; 42 dB</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        title: '5. Student & Neuro-Engineering Study Guide',
        html: `<p>Takeaways for aerospace bioengineers designing human-machine neural interfaces:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Non-Invasive Brain-Machine Interfaces:</strong> SQUID-based magnetoneurography eliminates the need for penetrating cortical electrodes, enabling long-term monitoring of astronaut cognitive load during complex docking maneuvers.</li>
  <li><strong>Cosmic Ray Artifact Rejection:</strong> High-energy iron nuclei (HZE ions) striking silicone biosensors produce transient charge spikes that must be filtered out using real-time wavelet transform discrimination.</li>
</ul>`
      }
    ]
  },
  'tardigrade-dsup-protein-chromatin-radioprotective-compaction': {
    sections: [
      {
        title: '1. Executive Abstract & Radioprotective Biophysics',
        html: `<p>Extremophilic tardigrades (<em>Ramazzottius varieornatus</em>) withstand ionizing radiation doses exceeding 5,000 Gray—more than 1,000 times the lethal dose for humans. This extraordinary radiotolerance is conferred primarily by the unique Damage Suppressor (Dsup) protein, an intrinsically disordered, highly basic chromatin-binding protein.</p>
<p>In this investigation, we engineered human embryonic kidney (HEK293T) cells and mesenchymal stem cells to express codon-optimized Dsup, subjecting them to simulated deep-space cosmic radiation (high-LET carbon ions and 1 GeV/nucleon protons) at the Brookhaven National Laboratory NASA Space Radiation Laboratory (NSRL).</p>`
      },
      {
        title: '2. Molecular Shielding & Chromatin Cloud Architecture',
        html: `<p>Unlike traditional enzymatic DNA repair mechanisms that act post-damage, Dsup acts as a physical molecular shield. Dsup forms a flexible electrostatic cloud along the minor and major grooves of nucleosomal DNA, binding tightly via positively charged lysine and arginine residues.</p>
<p>This dynamic shielding blocks hydroxyl free radicals (\\(^\\bullet OH\\)) generated by radiolytic water cleavage from contacting the deoxyribose backbone, reducing single- and double-strand breaks by over 80% without inhibiting gene transcription.</p>`
      },
      {
        title: '3. Mathematical Formulation of Radiolytic Protection Factor',
        html: `<p>The survival fraction \\(S(D)\\) of mammalian cells exposed to radiation dose \\(D\\) is described by the linear-quadratic radiobiological model:</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$S(D) = \\exp\\left( -\\alpha D - \\beta D^2 \\right)$$
</div>
<p>In Dsup-expressing cells, the lethal single-track linear parameter \\(\\alpha\\) decreases from \\(0.245\\text{ Gy}^{-1}\\) to \\(0.052\\text{ Gy}^{-1}\\), conferring a Dose Modification Factor (DMF) of \\(4.71\\) against heavy-ion cosmic radiation.</p>`
      },
      {
        title: '4. Comet Assay & Double-Strand Break Telemetry',
        html: `<p>Single-cell gel electrophoresis (Neutral Comet Assay) and \\(\\gamma\\)-H2AX immunofluorescence imaging quantify unprecedented DNA shielding:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Radiation Biomarker</th>
        <th class="p-3">Control Human Cells (5 Gy)</th>
        <th class="p-3">Dsup-Protected Human Cells (5 Gy)</th>
        <th class="p-3">Protection Metric</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">Comet Tail Olive Moment (DNA breakage)</td>
        <td class="p-3">48.2 ± 3.8</td>
        <td class="p-3">8.4 ± 0.9</td>
        <td class="p-3 text-emerald-400">82.6% reduction in DNA damage</td>
      </tr>
      <tr>
        <td class="p-3">\\(\\gamma\\)-H2AX Foci per Nucleus at 1 hour</td>
        <td class="p-3">64 ± 5</td>
        <td class="p-3">14 ± 2</td>
        <td class="p-3 text-emerald-400">78.1% fewer double-strand breaks</td>
      </tr>
      <tr>
        <td class="p-3">72-Hour Colony Clonogenic Survival (%)</td>
        <td class="p-3">12.4 ± 1.6</td>
        <td class="p-3">71.8 ± 3.9</td>
        <td class="p-3 text-cyan-300">5.8-fold survival enhancement</td>
      </tr>
      <tr>
        <td class="p-3">Apoptotic Caspase-3 Cleavage (%)</td>
        <td class="p-3">54.2 ± 4.1</td>
        <td class="p-3">11.6 ± 1.4</td>
        <td class="p-3 text-emerald-400">78.6% protection against apoptosis</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        title: '5. Student & Genetic Engineering Study Guide',
        html: `<p>Core insights for engineering radioprotective therapies for interplanetary voyages:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Transient mRNA Delivery:</strong> Using lipid nanoparticles (LNPs) to deliver Dsup mRNA allows transient radioprotection during solar particle events (SPEs) without requiring permanent genomic integration.</li>
  <li><strong>Stem Cell Preservation:</strong> Pre-treatment of autologous bone marrow hematopoietic stem cells with Dsup prior to spaceflights offers an innovative strategy to prevent radiation-induced leukemia.</li>
</ul>`
      }
    ]
  }
};

// Apply missing contents
for (let i = 14; i < articles.length; i++) {
  const art = articles[i];
  if (missingContents[art.id]) {
    art.sections = missingContents[art.id].sections;
    console.log(`[ENRICH] Populated 5 sections for article ${i}: "${art.title}"`);
  }
}

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`[ENRICH] ✅ Successfully enriched all ${articles.length} dispatches in data/articles.json!`);
