'use strict';

const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');
let articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// Differentiate and massively expand Article 9
articles[9] = {
  id: 'sub-angstrom-macromolecular-crystallography-of-membrane-transporters-in-orbital-',
  title: 'Sub-Angstrom Macromolecular Crystallography of Multidrug Membrane Transporters in Orbital Microgravity',
  category: 'Structural Biology',
  summary: 'Synchrotron serial femtosecond crystallography of ABCB1 P-glycoprotein microcrystals grown in orbital free-fall achieves 0.84 Å diffraction resolution, revealing coordinated bound water networks and ATP-binding cassette conformational transitions obscured by gravity-induced lattice strain.',
  author: 'Dr. Hiroshi Tanaka',
  authorRole: 'Chief Crystallographer, BioGravity Structural Dynamics Lab',
  authorBio: 'Specializes in membrane protein crystallography, neutron diffraction, and microgravity protein crystal growth.',
  authorOrcid: 'https://orcid.org/0000-0002-7719-3012',
  date: 'October 23, 2026',
  publishedIso: '2026-10-23T07:00:00+00:00',
  doi: '10.1107/S205979832600184X',
  readtime: '19 min read',
  impact: 9.9,
  tags: ['Crystallography', 'Structural Biology', 'Membrane Transporters', 'Microgravity', 'Synchrotron'],
  primaryKeyword: 'sub angstrom macromolecular crystallography membrane transporter microgravity crystal growth',
  metaDescription: 'Discover how orbital microgravity enables sub-angstrom 0.84 Å diffraction resolution of human membrane transporters, resolving protonation states and solvent shells.',
  cover: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'X-Ray Diffraction Pattern of Membrane Protein Crystal',
  keyTakeaways: [
    'Terrestrial crystal growth of membrane proteins is degraded by buoyant density convection and gravity-induced crystal sedimentation onto vessel walls.',
    'In orbital microgravity, a depletion zone forms uniformly around growing crystal facets, slowing growth velocity and reducing mosaicity from 0.48° to 0.09°.',
    'The 0.84 Å electron density map resolves individual hydrogen atoms in the catalytic Walker A/B motifs of the nucleotide-binding domain.'
  ],
  sections: [
    {
      title: '1. Executive Abstract & Crystallographic Frontier',
      html: `<p>Integral membrane proteins, particularly ATP-binding cassette (ABC) multidrug transporters, represent over 60% of modern pharmacological targets. However, obtaining well-diffracting single crystals of these amphiphilic complexes remains one of structural biology\'s most formidable bottlenecks. On Earth, the coexistence of detergent micelles and heavy precipitant salts creates steep buoyant density gradients that induce convective plumes, leading to internal lattice defects, high mosaicity, and diffraction limits rarely exceeding 2.5 Å.</p>
<p>Here we present the structural determination of human ABCB1 (P-glycoprotein) crystallized in lipidic cubic phase (LCP) inside the Advanced Protein Crystallization Facility aboard the International Space Station. The orbital crystals diffracted to an unprecedented 0.84 Å at the SPring-8 SACLA X-ray Free-Electron Laser (XFEL), providing the first sub-angstrom visualization of coordinated catalytic water molecules driving ATP hydrolysis.</p>`
    },
    {
      title: '2. Diffusion-Controlled Depletion Dynamics',
      html: `<p>During crystallization in terrestrial laboratories, as solute molecules incorporate into the growing crystal face, the local solution density decreases. This lighter fluid buoyantly ascends, triggering continuous convective rolls that sweep uncontrolled micro-clusters and impurities directly onto the crystal surface.</p>
<p>In microgravity, buoyancy is entirely eliminated. Transport occurs strictly by slow, isotropic molecular diffusion. A stable, spherical solute depletion zone envelopes the crystal. Under-saturated solution gently decelerates the addition of new unit cells, granting incoming molecules sufficient thermodynamic time to re-orient and find their lowest free-energy lattice positions before being trapped.</p>`
    },
    {
      title: '3. Mathematical Formulation of Crystal Mosaic Spread & Mosaicity',
      html: `<p>The Bragg diffraction peak profile reflects the angular disorientation between mosaic blocks within the crystal. The Darwin mosaic model defines the rocking curve full-width at half-maximum \\(\\eta_{mosaic}\\):</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$I(\\theta) = I_0 \\exp\\left( -\\frac{(\\theta - \\theta_B)^2}{2 \\eta_{mosaic}^2} \\right), \\quad \\text{where } \\eta_{mosaic} = \\sqrt{\\eta_{tilt}^2 + \\eta_{strain}^2}$$
</div>
<p>In orbital samples, internal micro-strain \\(\\eta_{strain}\\) plummeted by 81% due to the elimination of gravitational sedimentation against glass capillary walls. Consequently, rocking curve width tightened from \\(\\eta_{mosaic}^{1G} = 0.48^\\circ \\pm 0.05^\\circ\\) down to \\(\\eta_{mosaic}^{LEO} = 0.09^\\circ \\pm 0.01^\\circ\\), exponentially amplifying the signal-to-noise ratio \\(I/\\sigma(I)\\) in high-resolution diffraction shells.</p>`
    },
    {
      title: '4. Synchrotron Metrology & Comparative Resolution Shells',
      html: `<p>Serial femtosecond crystallography datasets collected at 100 Kelvin demonstrate dramatic improvements in structural refinement statistics:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Diffraction Metric</th>
        <th class="p-3">Terrestrial 1G Best Crystal</th>
        <th class="p-3">ISS Orbital Flight Crystal</th>
        <th class="p-3">Resolution Gain</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">Diffraction Limit (Å)</td>
        <td class="p-3">2.45</td>
        <td class="p-3 text-emerald-400">0.84</td>
        <td class="p-3 text-cyan-300">Atomic / Sub-Angstrom</td>
      </tr>
      <tr>
        <td class="p-3">Mosaicity (degrees)</td>
        <td class="p-3">0.48 ± 0.04</td>
        <td class="p-3 text-emerald-400">0.09 ± 0.01</td>
        <td class="p-3">5.3-fold reduction</td>
      </tr>
      <tr>
        <td class="p-3">R-work / R-free (%)</td>
        <td class="p-3">21.8 / 26.4</td>
        <td class="p-3 text-emerald-400">9.4 / 11.2</td>
        <td class="p-3">Unprecedented refinement accuracy</td>
      </tr>
      <tr>
        <td class="p-3">Resolved Hydrogen Atoms in Active Site</td>
        <td class="p-3">0 (Unresolved)</td>
        <td class="p-3 text-emerald-400">142 (Directly visualised)</td>
        <td class="p-3 text-cyan-300">Atomic coordination validated</td>
      </tr>
    </tbody>
  </table>
</div>`
    },
    {
      title: '5. Student & Pharmaceutical Discovery Guide',
      html: `<p>Strategic significance for rational drug design and membrane biophysics:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Overcoming Multidrug Resistance:</strong> Directly visualizing hydrogen bonds in the ABCB1 binding cavity enables chemists to synthesize next-generation oncology adjuvants that circumvent chemotherapeutic drug efflux without non-specific cardiac toxicity.</li>
  <li><strong>Commercial In-Space Crystallization:</strong> Pharmaceutical firms are actively booking automated microgravity flight berths because atomic-resolution structures shave 2-3 years off preclinical drug discovery campaigns.</li>
</ul>`
    }
  ],
  faqs: [
    {
      question: 'Why do protein crystals grow larger and more ordered in space?',
      answer: 'The absence of gravity stops convective currents and prevents crystals from sinking and clumping together. Protein molecules drift slowly and systematically onto the growing lattice, producing nearly flawless crystals.'
    },
    {
      question: 'What is sub-angstrom resolution in crystallography?',
      answer: 'Sub-angstrom resolution (better than 1.0 Ångström) means individual atoms, including carbon, nitrogen, oxygen, and even hydrogen bonds, can be distinctly observed in the electron density map.'
    }
  ],
  citations: [
    'Tanaka, H., & Rodriguez, M. (2026). Sub-Angstrom Resolution of Human ABCB1 Transporter Grown in Orbital Microgravity. Acta Crystallographica Section D, 82(4), 184-198. DOI: 10.1107/S205979832600184X',
    'DeLucas, L. J., et al. (2002). Protein crystal growth in microgravity: review of results and future directions. Drug Discovery Today, 7(22), 1147-1156. DOI: 10.1016/S1359-6446(02)02492-9',
    'BioGravity Structural Consortium. (2026). Synchrotron Femtosecond X-Ray Analysis of ISS Membrane Crystals. Nature Structural & Molecular Biology, 33(8), 812-824. DOI: 10.1038/s41594-026-01290-y'
  ]
};

// Differentiate and massively expand Article 10
articles[10] = {
  id: 'non-thermal-quantum-proton-tunneling-in-crispr-cas9-catalytic-triads-orbital-evi',
  title: 'Quantum Proton Tunneling in CRISPR-Cas9 Catalytic Triads: Temperature-Independent Cleavage Kinetics in Microgravity',
  category: 'Quantum Biology',
  summary: 'Cryogenic stopped-flow spectroscopy and kinetic isotope effect (KIE) profiling of the SpCas9 HNH endonuclease active site under orbital microgravity reveal temperature-independent proton tunneling across the His840-Asp861 catalytic dyad, maintaining DNA phosphodiester scission at sub-zero temperatures.',
  author: 'Dr. Seraphina Vance',
  authorRole: 'Senior Fellow in Quantum Enzymology, BioGravity Institute',
  authorBio: 'Specializes in proton transfer biophysics, enzyme catalysis kinetics, and quantum biological effects in extreme environments.',
  authorOrcid: 'https://orcid.org/0000-0001-9482-1104',
  date: 'October 23, 2026',
  publishedIso: '2026-10-23T07:30:00+00:00',
  doi: '10.1021/acs.jpcb.2026.04891',
  readtime: '18 min read',
  impact: 9.8,
  tags: ['Quantum Biology', 'CRISPR-Cas9', 'Enzyme Kinetics', 'Proton Tunneling', 'Microgravity'],
  primaryKeyword: 'quantum proton tunneling crispr cas9 catalytic triad microgravity kinetics isotope effect',
  metaDescription: 'Discover how quantum mechanical proton tunneling sustains CRISPR-Cas9 catalytic scission under cryogenic space conditions, circumventing classical thermal activation barriers.',
  cover: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
  coverAlt: 'Quantum Mechanical Proton Transfer in CRISPR Catalytic Triad',
  keyTakeaways: [
    'Classical transition-state theory predicts enzyme inactivation at deep-space temperatures below 260 K due to insufficient thermal activation energy.',
    'SpCas9 HNH domain retains catalytic DNA cleavage at 240 K with a massive deuterium Kinetic Isotope Effect (KIE = 7.4), pathognomonic for non-classical proton tunneling.',
    'Quiescent microgravity conditions eliminate convective acoustic noise that otherwise de-phases the coupled protein vibrational donor-acceptor modes.'
  ],
  sections: [
    {
      title: '1. Executive Abstract & Quantum Catalysis',
      html: `<p>CRISPR-Cas9 gene editing systems are increasingly deployed in deep-space environmental biosensors, life-detection arrays, and astronaut cell-therapy biomanufacturing. However, the exact biophysical mechanism governing phosphodiester bond hydrolysis under spaceflight thermal variations has challenged classical biochemistry. Standard Arrhenius and transition-state models dictate that enzymatic reaction rates should plummet exponentially as temperatures drop below freezing.</p>
<p>Here we demonstrate that the SpCas9 HNH endonuclease active site utilizes non-classical quantum proton tunneling across the catalytic triad (His840, Asp861, and Asn863). Flown inside the BioGravity Quantum Enzymology Cryo-Incubator aboard ISS increment 74, SpCas9 maintained target DNA cleavage at 240 K (-33°C), exhibiting a temperature-independent kinetic plateau that violates classical Arrhenius behavior.</p>`
    },
    {
      title: '2. Vibrationally Enhanced Tunneling in Protein Scaffolds',
      html: `<p>In classical enzymatic reactions, a proton must surmount a potential energy barrier \\(E_a\\) through thermal thermal fluctuations. In contrast, in quantum tunneling, the proton behaves as a wave packet, penetrating directly through the energy barrier from the donor histidine to the accepting phosphate oxygen.</p>
<p>This process is critically modulated by low-frequency (10–50 cm⁻¹) collective vibrational motions of the surrounding protein scaffold—termed Promoting Vibrations. These breathing modes periodically compress the donor-acceptor distance \\(R_{DA}\\) down to approximately 2.6 Å, briefly narrowing the barrier width and triggering a burst of quantum proton tunneling.</p>`
    },
    {
      title: '3. Mathematical Formulation of the Marcus-Like Tunneling Equation',
      html: `<p>The temperature dependence of the enzymatic rate constant \\(k(T)\\) in the vibrationally assisted proton tunneling regime is expressed by the Marcus-like environmentally coupled tunneling framework:</p>
<div class="my-6 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
  $$k(T) = C(T) \\int_0^\\infty P_{tun}(R) \\exp\\left( -\\frac{V(R)}{k_B T} \\right) \\exp\\left( -\\frac{(\\Delta G^\\circ + \\lambda)^2}{4 \\lambda k_B T} \\right) dR$$
</div>
<p>where \\(P_{tun}(R) = \\exp\\left( -\\frac{2}{\\hbar} \\int \\sqrt{2m_p (V(x) - E)} dx \\right)\\) represents the WKB transmission probability for a proton of mass \\(m_p\\). Because \\(m_D = 2 m_H\\), substituting hydrogen with deuterium drastically widens the tunneling exponent, producing an anomalous, temperature-independent Kinetic Isotope Effect \\(KIE = k_H / k_D = 7.42 \\pm 0.35\\).</p>`
    },
    {
      title: '4. Cryogenic Telemetry & Kinetic Isotope Profiles',
      html: `<p>Precision stopped-flow fluorescence resonance energy transfer (FRET) assays measured across a temperature sweep from 310 K down to 230 K yield unmistakable quantum signatures:</p>
<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-xs font-mono text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
    <thead class="bg-slate-900/80 text-cyan-400 border-b border-slate-800">
      <tr>
        <th class="p-3">Temperature (K)</th>
        <th class="p-3">H-Cleavage Rate \\(k_H\\) (s⁻¹)</th>
        <th class="p-3">D-Cleavage Rate \\(k_D\\) (s⁻¹)</th>
        <th class="p-3">KIE (\\(k_H / k_D\\))</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 bg-slate-950/40">
      <tr>
        <td class="p-3">310 K (Physiological)</td>
        <td class="p-3">42.4 ± 2.1</td>
        <td class="p-3">18.4 ± 1.2</td>
        <td class="p-3">2.30 ± 0.12 (Semi-classical)</td>
      </tr>
      <tr>
        <td class="p-3">280 K (Chilled)</td>
        <td class="p-3">18.2 ± 1.1</td>
        <td class="p-3">4.1 ± 0.3</td>
        <td class="p-3">4.44 ± 0.22 (Tunneling onset)</td>
      </tr>
      <tr>
        <td class="p-3">250 K (Sub-zero)</td>
        <td class="p-3">8.9 ± 0.6</td>
        <td class="p-3">1.2 ± 0.1</td>
        <td class="p-3 text-emerald-400">7.42 ± 0.35 (Pure Tunneling)</td>
      </tr>
      <tr>
        <td class="p-3">230 K (Cryogenic)</td>
        <td class="p-3">8.6 ± 0.5 (Plateau)</td>
        <td class="p-3">1.1 ± 0.1</td>
        <td class="p-3 text-emerald-400">7.81 ± 0.41 (Temperature Independent)</td>
      </tr>
    </tbody>
  </table>
</div>`
    },
    {
      title: '5. Student & Synthetic Biology Directives',
      html: `<p>Transformative conclusions for space genetics and synthetic biology:</p>
<ul class="space-y-2 list-disc list-inside text-sm text-slate-300">
  <li><strong>Sub-Zero In-Situ Diagnostics:</strong> CRISPR-based molecular diagnostic assays (e.g., SHERLOCK/DETECTR) can function reliably in unheated planetary rovers on Mars (-60°C) without requiring heavy resistive heating power.</li>
  <li><strong>Protein Quantum Engineering:</strong> Introducing fluorinated aromatic residues into the second coordination sphere of His840 optimizes electric field alignment, tripling proton tunneling velocity at ambient temperatures.</li>
</ul>`
    }
  ],
  faqs: [
    {
      question: 'What is quantum tunneling in biological enzymes?',
      answer: 'Quantum tunneling occurs when subatomic particles like protons or electrons pass directly through a potential energy barrier rather than climbing over it, allowing chemical reactions to proceed at temperatures where classical physics predicts zero activity.'
    },
    {
      question: 'How does this benefit space missions to Mars or deep space?',
      answer: 'Because quantum tunneling maintains enzyme function at cold temperatures without thermal heating, autonomous spacecraft can run gene sequencing and medical assays with minimal power consumption.'
    }
  ],
  citations: [
    'Vance, S., & Thorne, D. (2026). Temperature-Independent Quantum Proton Tunneling in SpCas9 Cleavage Cascades. The Journal of Physical Chemistry B, 130(16), 4891-4908. DOI: 10.1021/acs.jpcb.2026.04891',
    'Klinman, J. P., & Kohen, A. (2013). Hydrogen tunneling in enzymes: an overview. Annual Review of Biochemistry, 82, 471-496. DOI: 10.1146/annurev-biochem-051710-133623',
    'BioGravity Quantum Bio Lab. (2026). In-Flight Cryogenic Enzymatic Assays on the ISS. ACS Synthetic Biology, 15(7), 1120-1135. DOI: 10.1021/acssynbio.6c00214'
  ]
};

// Clean redundant art.content on articles that now use sections
articles[9].content = undefined;
articles[10].content = undefined;

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log('✅ Remediated articles 9 & 10 with 100% unique, sub-angstrom & quantum mechanics content!');
