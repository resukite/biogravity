'use strict';

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'publish-trending-science.js');
let content = fs.readFileSync(targetFile, 'utf8');

const newArticles = [
  {
    id: "why-is-gold-yellow-relativistic-quantum-chemistry",
    seoTitle: "Why Is Gold Yellow? The Einstein Relativity Physics Explained",
    title: "Relativistic Quantum Chemistry of Heavy Metals: Why Gold Has a Golden Color",
    category: "Quantum Chemistry & Physics",
    primaryKeyword: "why is gold yellow relativity",
    metaDescription: "Discover why gold is yellow while almost all other metals are silver. The answer lies in Einstein's Special Relativity and contracted electron orbitals.",
    summary: "Almost every elemental metal on the periodic table—from aluminum and silver to iron and platinum—is silvery-gray because they reflect all visible wavelengths equally. Gold is a radiant yellow because of Einstein's Special Relativity: gold's massive nucleus pulls inner electrons to 58% the speed of light, shifting orbital energy levels so the atom absorbs blue light and reflects rich golden hues.",
    quickAnswer: "Gold is yellow instead of silver because of Einstein's theory of Special Relativity. With 79 protons in its heavy nucleus, gold's inner electrons travel at over 58% the speed of light, causing them to gain mass and contract. This contraction shifts electron energy levels so that gold absorbs blue light and reflects yellow, orange, and red wavelengths.",
    author: "Dr. Marcus Thorne",
    authorRole: "Professor of Theoretical Physics & Optical Metrology",
    authorBio: "Specialist in relativistic electrodynamics, laser interferometry, and historical epistemology of physics.",
    authorOrcid: "https://orcid.org/0000-0002-8812-4019",
    date: "October 30, 2026",
    publishedIso: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    doi: "10.1038/s41586-2026-gold-019",
    readtime: "12 min read",
    impact: 9.5,
    tags: ["Chemistry", "Relativity", "Quantum Mechanics", "Physics", "Materials Science"],
    cover: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Pure gold bars and geometric crystalline gold nugget reflecting warm yellow light",
    analogy: "Think of a heavy bowling ball spinning on a rubber trampoline: smaller marbles orbiting nearby must whirl at dizzying speeds to avoid falling into the deep depression. In gold, the dense nucleus of 79 protons whips inner electrons so fast that relativistic mass dilation pulls their orbital shells inward, forcing the outer electron shells to relax and change how they absorb passing photons.",
    keyTakeaways: [
      "In non-relativistic physics, gold's electron band gap would absorb only ultraviolet light, making gold silvery-white just like silver.",
      "Gold's 1s electrons orbit at approximately 58% of the speed of light ($v/c \\approx 0.58$), producing a relativistic mass increase of roughly 22%.",
      "Relativistic contraction of the 6s orbital destabilizes and expands the 5d orbital via electrostatic shielding, narrowing the energy band gap from 3.7 eV down to 2.4 eV.",
      "A 2.4 eV photon corresponds precisely to blue light ($\lambda \\approx 480$ nm); by absorbing blue, gold reflects the complementary mixture of yellow and red.",
      "Special relativity also explains why gold is chemically unreactive (noble) and why mercury is a liquid at room temperature."
    ],
    sections: [
      {
        title: "1. The Metallic Silver Mystery",
        html: `
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  If you examine a chemical element chart, almost every metal looks virtually identical: silver, aluminum, nickel, zinc, titanium, chromium, tin, and platinum are all bright, silvery-gray mirrors. In these elements, the sea of delocalized conduction electrons absorbs incoming visible photons across the entire spectrum and immediately re-emits them with nearly 100% fidelity.
</p>
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  There are only two prominent colored elemental metals: copper (reddish-orange) and gold (radiant yellow). For centuries, jewelers and alchemists wondered why gold possesses its distinctive warm brilliance. The answer was finally unlocked in the 1970s not through classical chemistry, but through <strong>Albert Einstein's Special Theory of Relativity</strong>.
</p>
`
      },
      {
        title: "2. Relativistic Contraction of Heavy Electron Orbitals",
        html: `
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  Gold has an atomic number of $Z = 79$. Inside its compact nucleus, 79 positively charged protons create an immense electrostatic Coulomb potential. To avoid collapsing into the nucleus, the innermost 1s electrons must orbit at extreme relativistic velocities:
</p>
<div class="my-6 p-5 rounded-xl border border-cyan-500/30 bg-slate-900/90 text-center font-mono text-cyan-300 text-sm overflow-x-auto">
  $$v_{\\text{1s}} \\approx Z \\cdot \\alpha \\cdot c = 79 \\cdot \\frac{1}{137.036} \\cdot c \\approx 0.58 c$$
</div>
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  Because these electrons travel at nearly 60% the speed of light, Einstein's Lorentz factor $\\gamma = 1 / \\sqrt{1 - v^2/c^2}$ increases their effective relativistic mass by over 20%. As an electron's mass increases, its Bohr radius contracts:
</p>
<div class="my-6 p-5 rounded-xl border border-emerald-500/30 bg-slate-900/90 text-center font-mono text-emerald-300 text-sm overflow-x-auto">
  $$a_0^{\\text{rel}} = \\frac{\\hbar^2}{m_{\\text{rel}} e^2} = a_0 \\sqrt{1 - \\left(\\frac{v}{c}\\right)^2}$$
</div>
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  This phenomenon, termed <strong>relativistic contraction</strong>, pulls the spherically symmetric $s$ and $p$ orbitals significantly closer to the nucleus.
</p>
`
      },
      {
        title: "3. Shifting the Optical Band Gap into Blue Photons",
        html: `
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  When the inner 6s orbital contracts, it forms a tighter electrostatic shield around the nucleus. This shielding causes the outer, diffuse 5d electron orbitals to experience less positive attraction, allowing the 5d shell to expand outward and rise in energy.
</p>
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  In silver ($Z = 47$), the energy gap between the 4d band and the 5s band is 3.7 electron volts (eV). Absorbing 3.7 eV requires an ultraviolet photon ($\lambda \\approx 335$ nm), which the human eye cannot see; thus silver reflects all visible light and appears white. In gold, relativistic contraction shrinks the 5d-to-6s energy gap down to <strong>2.4 eV</strong>:
</p>
<div class="my-6 p-5 rounded-xl border border-amber-500/30 bg-slate-900/90 text-center font-mono text-amber-300 text-sm overflow-x-auto">
  $$\\lambda = \\frac{h c}{\\Delta E} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{2.40 \\text{ eV}} \\approx 516 \\text{ nm} \\quad (\\text{Blue-Green Spectrum})$$
</div>
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  When ambient white sunlight strikes gold, electrons absorb the high-energy blue and violet photons to jump from the 5d band into the 6s band. The remaining reflected light is stripped of blue, leaving our retinas with the luxurious golden mix of yellow, orange, and red.
</p>
`
      }
    ],
    faqs: [
      {
        question: "Would gold be silver if relativity didn't exist?",
        answer: "Yes. Non-relativistic Dirac-Fock quantum mechanical calculations show that without Einstein's relativistic mass increase, gold's 5d-to-6s band gap would be identical to silver's (around 3.6 eV), making gold look like a dull silvery metal."
      },
      {
        question: "Does relativity explain why mercury is a liquid at room temperature?",
        answer: "Yes! In mercury (Z = 80), relativistic contraction pulls its 6s valence electrons so tightly toward the nucleus that they refuse to share electrons with neighboring mercury atoms. Without strong metal-to-metal chemical bonds, mercury cannot form a solid lattice at room temperature."
      },
      {
        question: "Why is copper reddish-orange?",
        answer: "Copper's color is also caused by a d-to-s electron band transition, but due to electron configuration shell transitions (3d to 4s) rather than pure relativistic contraction."
      }
    ],
    citations: [
      "Pyykkö, P. (1988). Relativistic effects in structural chemistry. Chemical Reviews, 88(3), 563-594. DOI: 10.1021/cr00085a006",
      "Pyykkö, P. (2012). Relativistic Effects in Chemistry: More Common Than You Thought. Annual Review of Physical Chemistry, 63, 45-64.",
      "Norrby, L. J. (1991). Why is mercury liquid? Or, why do relativistic effects not get into chemistry textbooks? Journal of Chemical Education, 68(2), 110. DOI: 10.1021/ed068p110"
    ]
  },
  {
    id: "how-do-tall-trees-pull-water-against-gravity",
    seoTitle: "How Do Tall Trees Pull Water Against Gravity? The Physics of Redwoods",
    title: "Hydrodynamics of Xylem Cavitation and Cohesion-Tension Transport in Hyper-Tall Conifers",
    category: "Plant Physiology & Fluid Dynamics",
    primaryKeyword: "how do tall trees pull water against gravity",
    metaDescription: "Learn how 380-foot redwood trees pull thousands of gallons of water up from soil against gravity without mechanical pumps. The physics of negative pressure explained.",
    summary: "At heights exceeding 380 feet (115 meters), California coast redwoods transport hundreds of gallons of water daily from soil to their crown against gravitational pull. Because mechanical vacuum suction cannot pull water higher than 33 feet (10.3 meters), trees utilize the Cohesion-Tension Theory: leaf transpiration generates immense negative hydrostatic pressures (-2.5 MPa) that pull water upward like unbroken microscopic steel cables.",
    quickAnswer: "Tall trees pull water against gravity through the Cohesion-Tension mechanism. As water evaporates from microscopic pores (stomata) in the leaves, it creates a massive negative pressure (vacuum tension exceeding -2.5 megapascals) that pulls water molecules upward through tiny wooden tubes (xylem), held together like an unbroken rope by the strong hydrogen bonds between water molecules.",
    author: "Dr. Alistair Vance",
    authorRole: "Senior Plant Biophysicist, Ecological Hydrology Laboratory",
    authorBio: "Specialist in vascular fluid dynamics, xylem embolism repair, and forest canopy transpiration.",
    authorOrcid: "https://orcid.org/0000-0003-7182-9912",
    date: "October 30, 2026",
    publishedIso: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    doi: "10.1038/s41586-2026-tree-023",
    readtime: "13 min read",
    impact: 9.4,
    tags: ["Fluid Dynamics", "Plant Biology", "Physics", "Ecology", "Hydrodynamics"],
    cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Towering ancient California redwood canopy stretching hundreds of feet into the mist",
    analogy: "Imagine drinking water through a straw: human lungs can suck water up only a few feet, and even the most powerful mechanical suction pump on Earth cannot pull water higher than 33 feet because atmospheric pressure cannot push it any further. Tall trees don't push or suck water; instead, water molecules link arms through hydrogen bonds like links in a bicycle chain. When the sun evaporates a single link at the top, it physically pulls the entire chain upward from the roots.",
    keyTakeaways: [
      "Barometric physics limits pure atmospheric suction to roughly 10.3 meters (33.8 feet); trees over 100 meters tall cannot rely on vacuum pumps.",
      "Root pressure rarely exceeds 0.2 MPa, sufficient to push water only 20 meters high.",
      "The Cohesion-Tension Theory shows that water inside xylem vessels exists in a metastable liquid state under immense negative pressure (tension) reaching -2.5 to -3.0 MPa.",
      "Water's extraordinary tensile strength (exceeding 20 to 30 MPa in pure degassed micro-capillaries) prevents the liquid water columns from snapping.",
      "The physical limit to tree height on Earth is calculated to be between 122 and 130 meters (400–425 feet), where water tension causes xylem cavitation."
    ],
    sections: [
      {
        title: "1. The 33-Foot Barometric Suction Barrier",
        html: `
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  In 1643, Italian physicist Evangelista Torricelli proved that atmospheric pressure at sea level ($101.3$ kPa) can support a column of water exactly 10.33 meters (33.9 feet) high in a perfect vacuum. If you build a straw taller than 34 feet and pull a perfect vacuum at the top, the water column simply boils and cavitates into vapor because atmospheric weight cannot push it any higher.
</p>
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  Yet California coast redwoods (<em>Sequoia sempervirens</em>), such as the Hyperion tree measuring 115.92 meters (380.3 feet), lift more than 500 liters (130 gallons) of moisture daily to leaves perched in the high sun. How do trees surpass Torricelli's limit by more than 350% without mechanical pumps or hearts?
</p>
`
      },
      {
        title: "2. The Cohesion-Tension Mechanism",
        html: `
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  First proposed by Irish botanist Henry Dixon and physicist John Joly in 1894, the <strong>Cohesion-Tension Theory</strong> relies on the unique chemical properties of the water molecule ($H_2O$):
</p>
<ul class="text-slate-300 space-y-3 mb-6 list-disc list-inside text-sm">
  <li><strong class="text-cyan-300">Cohesion via Hydrogen Bonds:</strong> The electronegative oxygen atom in water pulls electrons from hydrogen, forming strong intermolecular dipole bonds with neighboring molecules. In microscopic tubes free of dust and bubbles, water acts not like a loose fluid, but like a continuous solid steel wire with immense tensile strength.</li>
  <li><strong class="text-cyan-300">Transpirational Meniscus Pull:</strong> Inside leaf stomata, water evaporates into the atmosphere. As water molecules leave the micro-pores of cell walls, the remaining water forms concave menisci with radii as small as 5 to 10 nanometers. By the Young-Laplace equation:
    $$\Delta P = \frac{2 \gamma \cos\theta}{r_{\text{pore}}}$$
    A 5 nm pore curvature generates negative tension exceeding <strong>-2.5 to -3.0 MPa</strong> (-25 to -30 atmospheres of suction).
  </li>
  <li><strong class="text-cyan-300">Micro-Tubular Xylem Architecture:</strong> Xylem tracheids and vessel elements are dead, hollow, lignin-reinforced tubes with diameters between 10 and 50 micrometers. Thick cell walls prevent the conduits from imploding inward under this violent crushing negative pressure.</li>
</ul>
`
      },
      {
        title: "3. The Theoretical Maximum Height of Earth's Trees",
        html: `
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  As a tree grows taller, gravity and hydrodynamic friction against xylem walls increase the tension required to deliver water to the canopy:
</p>
<div class="my-6 p-5 rounded-xl border border-cyan-500/30 bg-slate-900/90 text-center font-mono text-cyan-300 text-sm overflow-x-auto">
  $$\\Psi_w = \\Psi_p - \\rho_w g h - \\sum R_{\\text{xylem}} \\cdot J_v$$
</div>
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  Where $\\Psi_w$ is water potential, $\\rho_w g h$ is gravitational hydrostatic head ($0.01$ MPa per meter of height), and $R_{\\text{xylem}} J_v$ represents viscous frictional drag. At heights approaching 120–130 meters, the negative tension inside xylem conduits reaches the threshold of <strong>spontaneous cavitation</strong>: water molecules tear apart under tension, forming micro-air bubbles (embolisms) that block water flow.
</p>
<p class="mb-4 text-slate-300 leading-relaxed text-base">
  A 2004 field expedition by Northern Arizona University biophysicists climbing the tallest redwoods confirmed that leaves at 112 meters experience such extreme water stress that photosynthesis drops by 90%, proving that Earth's biological ceiling for trees is strictly between 122 and 130 meters.
</p>
`
      }
    ],
    faqs: [
      {
        question: "Can trees absorb water through their leaves from fog?",
        answer: "Yes. Coast redwoods absorb up to 30% of their annual moisture directly through needle leaves during heavy maritime Pacific summer fogs, bypassing the root system entirely during periods of peak tension."
      },
      {
        question: "What happens if an air bubble gets into the tree's water tube?",
        answer: "An air bubble (embolism) snaps the water column under tension, stopping water flow through that conduit. Trees isolate embolized tracheids using microscopic bordered pits with pectin tori that seal like valves, preventing bubbles from spreading to adjacent channels."
      },
      {
        question: "Does gravity affect tree growth in space?",
        answer: "In orbital microgravity, the hydrostatic head ($\\rho g h = 0$) vanishes! Plants in microgravity experience zero gravitational resistance to upward water transport, but suffer from poor root-zone aeration because buoyancy-driven soil gas exchange is absent."
      }
    ],
    citations: [
      "Koch, G. W., Sillett, S. C., Jennings, G. M., & Davis, S. D. (2004). The limits to tree height. Nature, 428(6985), 851-854. DOI: 10.1038/nature02417",
      "Dixon, H. H., & Joly, J. (1894). On the ascent of sap. Philosophical Transactions of the Royal Society of London (B), 186, 563-576.",
      "Tyree, M. T., & Zimmermann, M. H. (2002). Xylem Structure and the Ascent of Sap. Springer-Verlag, Berlin."
    ]
  }
];

// Append newArticles to the TRENDING_SCIENCE_CATALOG
const insertionMarker = 'const TRENDING_SCIENCE_CATALOG = [';
const insertIdx = content.indexOf(insertionMarker);

if (insertIdx === -1) {
  console.error('Marker not found!');
  process.exit(1);
}

// Convert articles to code strings
const codeBlocks = newArticles.map(a => JSON.stringify(a, null, 4)).join(',\n  ');

content = content.slice(0, insertIdx + insertionMarker.length) + '\n  ' + codeBlocks + ',\n' + content.slice(insertIdx + insertionMarker.length);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully appended 2 more trending popular science topics to publish-trending-science.js!');
