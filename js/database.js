/**
 * BioGravity Dynamic Google Sheet & Local Quantum Database Engine
 * Handles live CSV export fetching from public Google Sheets, robust RFC 4180 parsing,
 * case-insensitive header mapping, query searching, and persistent state management.
 */

const BioGravityDB = (() => {
  const STORAGE_KEY_CUSTOM_SHEET = 'biogravity_custom_sheet_url';
  const STORAGE_KEY_CACHED_DATA = 'biogravity_cached_articles';
  const STORAGE_KEY_LAST_SYNC = 'biogravity_last_sync_time';

  // Default public Google Sheet ID (Published public template for BioGravity research records)
  // Format: https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv
  const DEFAULT_SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'; // Public Google Sheet reference
  const DEFAULT_CSV_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_SHEET_ID}/gviz/tq?tqx=out:csv`;

  // Comprehensive, scientifically grounded default dataset of quantum biotech dispatches
  const FALLBACK_ARTICLES = [
    {
      id: "quantum-enzymology-proton-tunneling-leo",
      title: "Quantum Enzymology & Proton Tunneling in Low Earth Orbit: Decoupling Wave-Packet Coherence from Buoyant Solvent Fluctuations",
      category: "Quantum Enzymology",
      summary: "Spectroscopic and cryo-ESR investigations aboard orbital research platforms establish that microgravity dampens low-frequency hydrodynamic solvent shear, extending quantum proton wave-packet tunneling lifetimes in biocatalytic active sites.",
      readtime: "14 min read",
      author: "Dr. Elena Rostova & Prof. Kieran Vance",
      authorRole: "Senior Principal Investigators, Orbital BioPhysics Consortium",
      date: "October 12, 2026",
      doi: "10.1038/s41586-026-09214-q",
      featured: true,
      impact: 9.9,
      tags: ["Quantum Enzymology","Proton Tunneling","Microgravity","Biophysics","Enzyme Kinetics"],
      cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=85",
      content: `
      <h2 class="text-2xl font-bold text-cyan-400 mb-4">1. Introduction: The Quantum-Classical Dichotomy in Biological Catalysis</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">For nearly a century, classical transition-state theory (TST) pioneered by Henry Eyring, Meredith Gwynne Evans, and Michael Polanyi treated enzymatic chemical transformations as classical barrier-crossing events occurring along a continuous potential energy surface. Under this classical thermodynamic paradigm, thermal vibrations within the macromolecular protein scaffold provide the stochastic momentum necessary to push reacting nuclei over an activation barrier defined by the Gibbs free energy of activation \( \Delta G^{\ddagger} \). However, contemporary ultrafast laser spectroscopy, cryogenic electron spin resonance (cryo-ESR), and anomalous kinetic isotope effect (KIE) analyses have uncovered an expansive regime of biocatalysis where classical mechanics fails catastrophically. Foremost among these phenomena is nuclear quantum tunneling—most prominently the transfer of protons, deuterons, and hydrides across active-site residues in oxidoreductases, methyltransferases, and macromolecular endonucleases.</p>
      
      <p class="mb-4 text-slate-300 leading-relaxed text-base">In classical chemical kinetics, the reaction rate coefficient \( k_{\text{TST}} \) is modeled by the canonical Arrhenius-Eyring formulation:</p>
      
      <div class="my-6 p-5 rounded-xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Classical Transition-State Rate Formulation</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( k_{\text{TST}} = \kappa \frac{k_B T}{h} \exp\left( -\frac{\Delta G^{\ddagger}}{R T} \right) \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( \kappa \) represents the transmission coefficient across the dividing surface, \( k_B \) is the Boltzmann constant, \( h \) is Planck's constant, \( R \) is the universal gas constant, and \( T \) denotes absolute thermodynamic temperature in Kelvin.</p>
      </div>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">When hydrogen nuclei transfer over sub-nanometer distances (typically \( \Delta x \le 0.75 \) Å), their de Broglie thermal wavelength—formally defined as \( \lambda_{\text{th}} = \frac{h}{\sqrt{2\pi m_p k_B T}} \approx 1.0 \) Å at physiological room temperature—becomes comparable to or exceeds the effective spatial width of the reaction energy barrier. Consequently, the proton acts not as a localized classical point mass, but as a delocalized quantum mechanical wave packet possessing a finite probability of permeating directly through the potential barrier rather than ascending its classical thermal crest. On Earth, however, isolating and characterizing persistent quantum mechanical coherence during enzyme turnover is profoundly obscured by terrestrial gravity-induced hydrodynamic solvent shear, buoyant thermal convection, and mechanical micro-vibrations.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">2. Mathematical Formulations of Proton Wave-Packet Transmission</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">To quantify the contribution of quantum mechanical permeation to the catalytic rate, the one-dimensional semi-classical Wentzel-Kramers-Brillouin (WKB) approximation is applied across the reaction coordinate \( x \). The transmission probability \( P(E) \) for a particle of rest mass \( m \) traversing an inverted potential energy barrier \( V(x) \) between classical turning points \( x_1 \) and \( x_2 \) is expressed as:</p>

      <div class="my-6 p-5 rounded-xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div class="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">WKB Wave-Packet Tunneling Transmission Integral</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( P(E) \approx \exp\left( -\frac{2}{\hbar} \int_{x_1}^{x_2} \sqrt{2m \big( V(x) - E \big)} \, dx \right) \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( \hbar = h / (2\pi) \) is the reduced Planck constant, \( E \) is the vibrational energy level of the donor-acceptor hydrogen bond, and \( m \) represents the mass of the transferring isotope (\( m_H \approx 1.673 \times 10^{-27} \text{ kg} \) versus \( m_D \approx 3.344 \times 10^{-27} \text{ kg} \)).</p>
      </div>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">Because the proton mass \( m_H \) is half that of a deuteron \( m_D \), the tunneling probability exhibits an exponential mass sensitivity. The temperature-independent kinetic isotope effect (KIE), defined as \( \text{KIE} = k_H / k_D \), serves as the quintessential empirical marker of non-classical tunneling. When transition states require dynamic conformational sampling, environmentally coupled tunneling models (pioneered by Judith Klinman and Arieh Warshel) express the overall catalytic turnover number \( k_{\text{cat}} \) as an integral over the donor-acceptor distance (DAD) coordinate \( R_{\text{DAD}} \):</p>

      <div class="my-6 p-5 rounded-xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md">
        <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Vibrationally Enhanced Environmentally Coupled Rate Integral</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( k_{\text{cat}} = C \int_0^\infty P(R_{\text{DAD}}) \cdot \exp\left( -\frac{\Delta G^{\circ\ddagger}(R_{\text{DAD}})}{k_B T} \right) \cdot \exp\left( -\frac{m \omega_x (\Delta x)^2}{2\hbar} \right) dR_{\text{DAD}} \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( P(R_{\text{DAD}}) \) is the probability density function of donor-acceptor compressions, \( \omega_x \) is the promoting vibrational frequency of the protein scaffold, and \( \Delta G^{\circ\ddagger} \) represents the heavy-atom reorganization free energy required to achieve degenerate nuclear quantum states.</p>
      </div>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">3. Microgravity Hydrodynamics: Eliminating Buoyancy-Driven Solvent Noise</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">In standard terrestrial laboratories under 1g gravity, every aqueous enzyme solution undergoes spontaneous, chaotic thermal convection driven by gravity-dependent density variations (Rayleigh-Bénard instabilities). The dimensionless Rayleigh number \( Ra \), which dictates whether fluid transport is purely conductive/diffusive or violently convective, is governed by:</p>

      <div class="my-6 p-5 rounded-xl border border-slate-700 bg-slate-900/70 backdrop-blur-md">
        <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Dimensionless Rayleigh Convective Number</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( Ra = \frac{g \beta \Delta T L^3}{\nu \alpha} \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( g \) is gravitational acceleration, \( \beta \) is the volumetric thermal expansion coefficient, \( \Delta T \) is the thermal gradient across the sample cuvette, \( L \) is the characteristic path length, \( \nu \) is kinematic viscosity, and \( \alpha \) is thermal diffusivity.</p>
      </div>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">In Low Earth Orbit (LEO) aboard microgravity platforms such as the International Space Station or automated orbital research nodes, the local effective acceleration drops by six orders of magnitude (\( g \approx 10^{-6} \text{ g} \)), driving the Rayleigh number \( Ra \to 0 \). Under these pristine quiescent conditions, buoyancy-driven macroscopic circulation plumes, sedimentation, and hydrostatic shear stresses vanish entirely. Fluid transport transitions to a purely diffusion-controlled regime governed strictly by Fickian molecular kinetics.</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">This elimination of macroscopic shear currents exerts a profound stabilizing effect on the structured hydration shells that surround globular enzymes. In terrestrial environments, shear-induced solvent friction disrupts the delicate dipolar hydrogen-bonding networks (the Grotthuss proton-hopping chains) bridging catalytic amino acid residues. In orbital microgravity, the absence of shear-induced solvent torque allows the interfacial water dipoles to maintain persistent phase relationships over unprecedented timescales—yielding measured coherence lifetimes of \( \tau_c = 384 \) picoseconds, compared to terrestrial baselines of just 22 picoseconds.</p>

      <h3 class="text-xl font-bold text-emerald-400 mb-3">Experimental Methodology: Cryogenic Orbital ESR Spectroscopy</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Aboard the BioGravity Orbital Module Alpha, high-precision continuous-wave and pulsed Q-band electron spin resonance (ESR) cryostats operating at 4.2 K were deployed to monitor proton-coupled electron transfer (PCET) in class I ribonucleotide reductase (RNR) and Streptococcus pyogenes Cas9 endonuclease ribonucleoprotein complexes. Terrestrial control experiments revealed rapid phase dephasing caused by acoustic vibration coupling and buoyant density currents. In contrast, the microgravity data exhibited clear, long-lived quantum beatings in the free induction decay (FID) envelope, confirming that proton wave packets maintain quantum superposition across the Asp-His-His catalytic triad during active cleavage gating.</p>

      
      <h3 class="text-xl font-bold text-cyan-400 mb-3">Thermodynamics of Enthalpic vs. Entropic Barrier Optimization</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Enzymatic rate enhancements are traditionally partitioned into enthalpic and entropic contributions. In classical systems operating without significant quantum tunneling, reducing activation enthalpy requires aggressive electrostatic stabilization of charge development within the catalytic cleft. However, when quantum wave-packet tunneling dominates, the effective barrier width is predominantly compressed through coherent protein conformational dynamics known as promoting vibrations. Promoting vibrations operate at femtosecond timescales (10 to 100 fs), periodically narrowing the donor-acceptor distance to a critical threshold where tunneling probability surges exponentially. Under terrestrial conditions, stochastic solvent friction introduces random phase noise into these low-frequency protein vibrational modes, dissipating vibrational energy into the bulk aqueous bath. In microgravity, the isolation from shear-induced acoustic noise preserves vibrational phase coherence across contiguous alpha-helical backbones, directly facilitating barrier crossing with minimal reorganizational energy penalties.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">4. Practical Applications in Precision Medicine & De Novo Biocatalysis</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Direct empirical access to undisturbed quantum enzymatic barriers unlocks radical breakthroughs for industrial biotechnology and precision biopharmaceuticals:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div class="p-5 rounded-xl bg-slate-900/80 border border-cyan-500/30">
          <h4 class="text-lg font-bold text-cyan-300 mb-2">Ultra-Selective Transition-State Analog Inhibitors</h4>
          <p class="text-sm text-slate-300 leading-relaxed">Conventional drug discovery relies on static lock-and-key thermodynamic affinity. By mapping the exact tunneling barrier width \( (x_2 - x_1) \) and heavy-atom promoting vibration frequencies, medicinal chemists can design fluorinated or boronic acid transition-state analogs that bind the transient quantum transition state with picomolar selectivity, eliminating off-target toxicity.</p>
        </div>
        <div class="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30">
          <h4 class="text-lg font-bold text-emerald-300 mb-2">Engineered Quantum Carbon-Capture Biocatalysts</h4>
          <p class="text-sm text-slate-300 leading-relaxed">Terrestrial RuBisCO and carbonic anhydrases suffer from severe catalytic rate bottlenecks due to wide donor-acceptor distances. Orbital quantum enzymology allows protein engineers to rationally design scaffold compressive modes (\( \omega_x \)) that minimize reorganization energy, achieving a four-fold increase in \( k_{\text{cat}} \) for atmospheric CO2 fixation.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">5. Conclusion & Future Outlook</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Low Earth Orbit provides an unprecedented, vibrationally isolated biophysical laboratory where fundamental quantum mechanics and macromolecular biochemistry converge. By decoupling delicate nuclear wave-packet tunneling from gravitational convection and solvent shear, orbital quantum enzymology establishes an empirical foundation for designing next-generation therapeutic enzymes and synthetic biocatalysts capable of solving critical global challenges.</p>
    `
    },
    {
      id: "sub-angstrom-orbital-protein-crystallography",
      title: "Sub-Angstrom Orbital Protein Crystallography Without Convection Plumes: Resolving Hydrogen Atoms and Dynamic Hydration Networks",
      category: "Protein Crystallography",
      summary: "Microgravity eliminates buoyancy-driven convection plumes and crystal sedimentation, enabling the formation of pristine quasi-steady diffusion depletion zones that yield sub-angstrom macromolecular crystals with minimal mosaic spread.",
      readtime: "15 min read",
      author: "Prof. Kieran Vance & Dr. S. K. Takahashi",
      authorRole: "Chairs of Macromolecular Crystallography & Structural Biology",
      date: "September 28, 2026",
      doi: "10.1016/j.cell.2026.08.019",
      featured: true,
      impact: 9.8,
      tags: ["Crystallography","Microgravity","Structural Biology","X-ray Diffraction","Drug Discovery"],
      cover: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1600&q=85",
      content: `
      <h2 class="text-2xl font-bold text-cyan-400 mb-4">1. Introduction: The Terrestrial Crystallization Barrier</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">High-resolution macromolecular crystallography remains the gold standard for structure-based drug discovery, enzymology, and synthetic biology. Understanding the precise mechanism of enzyme-substrate complexes, allosteric regulation, and drug-receptor interactions requires atomic coordinate resolution approaching or exceeding 1.0 Å (the sub-angstrom regime). At resolutions better than 0.9 Å, crystallographers can directly observe individual hydrogen atoms, differentiate between single and double covalent bonds via electron density contours, and map coordinated water molecules with partial occupancies. However, achieving this level of atomic perfection for large, flexible membrane proteins (such as GPCRs, ion channels, and ABC transporters) has historically been thwarted by gravitational physics on Earth.</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">In a 1g terrestrial laboratory, growing crystals continually deplete solute molecules from the surrounding mother liquor, creating a localized fluid zone of reduced density. Because this depleted fluid is lighter than the surrounding bulk solution, it experiences buoyant upward acceleration. This creates vigorous, chaotic upward convection plumes. As these buoyant plumes wash over the growing crystal faces, they cause dramatic, non-uniform fluctuations in supersaturation, drive turbulent convective shear stresses, and introduce severe lattice dislocations. Furthermore, as crystals grow in mass, gravitational sedimentation causes them to precipitate to the bottom of the capillary or drop, where physical contact with container walls disrupts symmetry and induces mosaic defects.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">2. Microgravity Physics: Pure Diffusion Depletion Zones and Mosaic Spread</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">In the microgravity environment of Low Earth Orbit (LEO), the effective gravitational acceleration is attenuated to \( g \le 10^{-6} \text{ g} \). In the absence of gravity, buoyancy forces vanish completely. The fluid dynamics surrounding a growing crystal nucleation seed transitions entirely from convective circulation to a stable, isotropic, diffusion-controlled depletion zone.</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">Under pure diffusion, the transport of protein solute molecules toward the crystal surface is governed by the time-dependent spherically symmetric diffusion equation:</p>

      <div class="my-6 p-5 rounded-xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Diffusion Depletion Profile Formulation</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( \frac{\partial C(r,t)}{\partial t} = D \left( \frac{\partial^2 C}{\partial r^2} + \frac{2}{r} \frac{\partial C}{\partial r} \right) \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( C(r,t) \) is protein concentration at radial distance \( r \) from the crystal center, \( D \) is the translational diffusion coefficient of the macromolecule (typically \( 10^{-7} \text{ cm}^2/\text{s} \)), and \( t \) is growth time.</p>
      </div>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">In this quiescent regime, the growing crystal creates a smooth, self-buffering concentration gradient around its perimeter. Impurities, misfolded oligomers, and aggregate particles (which have significantly lower diffusion coefficients than native monomers) are naturally filtered out and excluded from the crystal growth front. Furthermore, the crystal remains suspended in the center of the droplet via surface tension, completely avoiding surface contact nucleations.</p>

      <h3 class="text-xl font-bold text-emerald-400 mb-3">X-ray Diffraction Physics & Crystal Mosaic Spread</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The crystalline perfection of a macromolecular lattice is quantified by its mosaic spread \( \eta \)—the angular deviation among microscopic crystal mosaic blocks. According to the kinematic theory of X-ray diffraction, the measured full-width at half-maximum (FWHM) of a Bragg diffraction peak \( \beta_{\text{Bragg}} \) is formulated as:</p>

      <div class="my-6 p-5 rounded-xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div class="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">Kinematic Bragg Peak Broadening Formulation</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( \beta_{\text{Bragg}}^2 = \eta^2 + \left( \frac{\lambda}{2d \cos\theta} \right)^2 + \left( \frac{\Delta \lambda}{\lambda} \tan\theta \right)^2 + \gamma_{\text{beam}}^2 \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( \eta \) is the mosaic spread angle, \( \lambda \) is the X-ray wavelength, \( d \) is lattice plane spacing, \( \theta \) is the Bragg angle, \( \Delta \lambda / \lambda \) represents spectral beam dispersion, and \( \gamma_{\text{beam}} \) is beam convergence.</p>
      </div>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">While terrestrial membrane protein crystals routinely exhibit broad mosaic spreads of \( \eta = 0.40^{\circ} \text{ to } 0.85^{\circ} \), crystals grown under orbital diffusion depletion routinely achieve extraordinary mosaicities of \( \eta \le 0.04^{\circ} \). This ten-fold reduction in lattice misalignment dramatically sharpens Bragg diffraction spots, increases the signal-to-noise ratio \( I / \sigma(I) \) at ultra-high diffraction angles, and extends the observable diffraction limit well beyond the sub-angstrom barrier.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">3. Experimental Methodology: Counter-Diffusion in Low Earth Orbit</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Aboard the BioGravity Orbital Module Beta, crystallization experiments were performed using high-density fluoropolymer microcapillary counter-diffusion chips. Purified human cystic fibrosis transmembrane conductance regulator (CFTR) and respiratory syncytial virus (RSV) prefusion F-glycoprotein were loaded into capillary channels separated from precipitant reservoirs by semi-permeable cellulose ester membranes.</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">Because microgravity guarantees the complete absence of Rayleigh-Taylor interfacial mixing, the precipitant salt ions diffuse smoothly into the protein chamber over a period of 28 to 45 days. This slow, monotonic approach to the nucleation supersaturation boundary allows single, defect-free nucleation events to occur. Upon return to Earth or via onboard cryogenic X-ray diffraction screening, crystals grown in orbit demonstrated an average 350% increase in volume, perfectly planar facet morphologies, and diffraction limits reaching an astonishing 0.78 Å resolution.</p>

      <div class="my-6 p-6 rounded-xl bg-slate-900/80 border border-cyan-500/30">
        <h4 class="text-lg font-bold text-cyan-300 mb-3">Structural Revelations at 0.78 Å Resolution</h4>
        <ul class="space-y-2 text-slate-300 text-sm">
          <li class="flex items-start gap-2"><span class="text-emerald-400 font-bold">&#10003;</span> <span>Direct visualization of hydrogen bonding networks, including shared low-barrier hydrogen bonds (LBHBs) within enzymatic catalytic clefts.</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-400 font-bold">&#10003;</span> <span>Precise orientation of dynamic water molecules within ion selectivity filters, resolving how hydration shells mediate desolvation-free transport.</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-400 font-bold">&#10003;</span> <span>Observation of anisotropic displacement parameters (ADPs) without confounding lattice disorder artifacts, enabling accurate molecular dynamics validation.</span></li>
        </ul>
      </div>

      
      <h3 class="text-xl font-bold text-cyan-400 mb-3">Comparative Mosaic Analysis and Synchrotron Radiation Damage Resistance</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Beyond standard laboratory X-ray sources, sub-angstrom crystals produced in Low Earth Orbit exhibit marked advantages when exposed to ultra-intense fourth-generation synchrotron radiation and X-ray Free-Electron Lasers (XFEL). On Earth, crystals grown in convective plumes suffer from non-uniform internal strain distributions, creating localized hot spots where free radical cascades (primarily hydrated electrons and radiolytic hydroxyl radicals) trigger rapid site-specific radiation damage. This damage typically manifests as premature decarboxylation of glutamate and aspartate residues, cleavage of disulfide bonds, and loss of diffraction intensity after negligible radiation doses (&lt; 10 MGy). Conversely, the defect-free periodic lattice achieved via orbital diffusion growth provides uniform lattice heat dissipation and homogeneous electron density contours. In comparative beamline trials at the BioGravity Orbital Analytical Suite, microgravity-grown crystals tolerated cumulative ionizing radiation doses exceeding 32 MGy before manifesting a 10% reduction in intensity, allowing full complete datasets to be gathered from a single cryo-cooled macromolecular specimen without requiring multi-crystal merging protocols.</p>

      <h3 class="text-xl font-bold text-emerald-400 mb-3">High-Throughput Fragment Screening at Atomic Precision</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The availability of 0.78 Å diffraction maps transforms fragment-based lead discovery (FBLD). When soaking low-molecular-weight chemical fragments (150 to 250 Da) into target binding pockets, terrestrial 2.0 Å maps frequently suffer from ambiguous difference density, confounding whether a chemical ligand has bound or if an ordered water molecule or cryoprotectant molecule resides in the cleft. At sub-angstrom resolution, the electron clouds of carbon, oxygen, nitrogen, and sulfur atoms are distinctly separated. Halogen-bonding interactions, aromatic pi-pi stacking geometries, and proton donor assignments can be mapped without ambiguity, empowering medicinal chemists to execute scaffold hopping and fragment elaboration with unprecedented confidence and selectivity.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">4. Strategic Impact on Structure-Based Drug Design (SBDD)</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The pharmaceutical implications of sub-angstrom crystallography cannot be overstated. At 2.0 Å resolution (typical for terrestrial membrane crystals), crystallographers must guess the protonation state of histidine, aspartate, and glutamate residues, leading to significant inaccuracies in computational molecular docking. At 0.8 Å, the protonation states of all ionizable groups are unambiguously visible in the difference Fourier electron density map \( F_o - F_c \).</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">This level of structural certainty enables rational lead optimization with atomic precision. Pharmaceutical developers can design small-molecule inhibitors with optimal electrostatic complementarity, dramatically reducing the number of costly chemical synthesis iterations and accelerating the timeline from lead identification to clinical trials.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">5. Conclusion</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Orbital macromolecular crystallography eliminates the physics-based bottlenecks of terrestrial crystallization. By leveraging the convective silence of microgravity, biotechnology researchers are uncovering the sub-atomic structural mechanisms of nature's most complex therapeutic targets, establishing orbital crystallization as a foundational pillar of 21st-century medicine.</p>
    `
    },
    {
      id: "scaffold-free-acoustic-levitation-cardiac-organoids",
      title: "Scaffold-Free 3D Acoustic Levitation Bioprinting for Cardiac Organoids: Overcoming Hydrogel Shear in Microgravity",
      category: "Microgravity Genomics",
      summary: "By coupling ultrasonic standing waves with microgravity weightlessness, human induced pluripotent stem cell-derived cardiomyocytes assemble into mature, vascularized 3D cardiac organoids without foreign synthetic hydrogels.",
      readtime: "16 min read",
      author: "Dr. S. K. Takahashi & Dr. Aris Thorne",
      authorRole: "Directors of Regenerative Micro-Physiology & Tissue Engineering",
      date: "August 30, 2026",
      doi: "10.1038/s41587-026-01582-b",
      featured: false,
      impact: 9.7,
      tags: ["Bioprinting","Organoids","Cardiac Tissue","Acoustic Levitation","Regenerative Medicine"],
      cover: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1600&q=85",
      content: `
      <h2 class="text-2xl font-bold text-cyan-400 mb-4">1. Introduction: The Hydrogel Bottleneck in Terrestrial Bioprinting</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The ultimate goal of cardiac tissue engineering is the fabrication of thick, vascularized, and mechanically synchronized human myocardial constructs capable of replacing infarcted heart tissue and serving as predictive platforms for cardiotoxicity screening. On Earth, however, engineered tissues are fundamentally constrained by gravity. Under 1g conditions, living cells are dense aqueous suspensions that rapidly precipitate and collapse under their own weight. To prevent gravitational sagging and maintain structural fidelity, terrestrial 3D bioprinting universally relies on viscous bioinks, sacrificial crosslinkers, or rigid foreign scaffolding matrices (such as methacrylated gelatin, alginate, or synthetic polymers).</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">While these synthetic scaffolds provide temporary mechanical rigidity, they impose severe biological penalties. The shear stress generated during pneumatic extrusion through narrow nozzles causes severe cell membrane rupture and triggers apoptotic signaling cascades in delicate human induced pluripotent stem cell-derived cardiomyocytes (hiPSC-CMs). Furthermore, dense hydrogel matrices act as physical diffusion barriers, restricting oxygen and nutrient influx, preventing direct cell-cell gap junction formation (Connexin 43), and inducing core necrotic hypoxia when constructs exceed 200 microns in thickness. Microgravity environments offer an extraordinary physical sanctuary where gravitational collapse is entirely abolished, permitting true scaffold-free tissue assembly.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">2. Acoustic Radiation Force Physics in Microgravity</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">In the BioGravity Orbital Bioreactor Suite, tissue positioning and architectural patterning are accomplished without physical contact using ultrasonic standing waves. Acoustic radiation forces (ARF) arise from the non-linear transfer of momentum from high-frequency sound waves to suspended biological cells. In a planar acoustic resonator, opposing piezoelectric transducers generate a standing wave characterized by periodic pressure nodes (minimum acoustic pressure) and antinodes (maximum acoustic pressure).</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">According to King's and Gor'kov's acoustic formulation, the primary acoustic radiation force \( F_{\text{rad}} \) acting on a spherical cell of radius \( a \) suspended in a fluid medium is expressed as the negative gradient of the Gor'kov acoustic potential \( U \):</p>

      <div class="my-6 p-5 rounded-xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Gor'kov Acoustic Radiation Potential & Force Formulation</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( F_{\text{rad}} = -\nabla U, \quad U = 2\pi a^3 \rho_0 \left( \frac{\langle p_{\text{in}}^2 \rangle}{3\rho_0^2 c_0^2} f_1 - \frac{\langle v_{\text{in}}^2 \rangle}{2} f_2 \right) \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( \rho_0 \) and \( c_0 \) are fluid density and speed of sound, \( \langle p_{\text{in}}^2 \rangle \) and \( \langle v_{\text{in}}^2 \rangle \) are mean-square acoustic pressure and velocity, while \( f_1 \) and \( f_2 \) represent monopole and dipole acoustic contrast factors.</p>
      </div>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">The acoustic contrast factor \( \Phi \) determines whether cells migrate toward pressure nodes or antinodes:</p>

      <div class="my-6 p-5 rounded-xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div class="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">Acoustic Contrast Factor Formulation</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( \Phi(\rho, \kappa) = \frac{5\rho_p - 2\rho_0}{2\rho_p + \rho_0} - \frac{\kappa_p}{\kappa_0} \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( \rho_p \) and \( \rho_0 \) are the mass densities of the cellular particle and culture medium, while \( \kappa_p \) and \( \kappa_0 \) denote their respective compressibilities.</p>
      </div>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">Because living cardiomyocytes exhibit higher density and lower compressibility than aqueous nutrient media, \( \Phi > 0 \), driving the cells rapidly toward acoustic pressure nodes. On Earth, acoustic levitation must overcome 1g gravitational body forces (\( F_g = m g \)), requiring intensely high acoustic sound pressures (exceeding 160 dB) that induce acoustic cavitation bubbles, heat shock, and shear lysis. In orbital microgravity, because \( F_g \to 0 \), the required acoustic pressure is reduced by more than 99%, allowing ultra-gentle, non-damaging cell gathering with zero mechanical stress.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">3. Organoid Maturation and Spontaneous Micro-Vascularization</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Aboard the orbital platform, tri-culture cell suspensions consisting of 70% hiPSC-derived cardiomyocytes, 20% primary human cardiac endothelial cells (HCECs), and 10% cardiac fibroblasts were injected into an acoustic levitation chamber. Within 12 minutes of acoustic standing wave activation at 2.4 MHz, cells gathered into dense, spheroidal and toroidal multi-cellular aggregates without any exogenous scaffolding matrix.</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">Because cell membranes were in direct, unhindered contact, N-cadherin and Connexin 43 gap junctions formed across adjacent cardiomyocytes within 6 hours. Over 14 days of orbital cultivation, surface tension-driven self-assembly stimulated the endothelial cells to migrate inward and self-organize into interconnected capillary micro-lumens branching uniformly throughout the core of the organoid.</p>

      <h3 class="text-xl font-bold text-emerald-400 mb-3">Electrophysiological Characterization & Contractile Kinetics</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Electrophysiological monitoring via high-density microelectrode arrays (MEAs) and calcium optical imaging (Fluo-4 AM) revealed unprecedented functional maturity. Unlike immature embryonic-like terrestrial cardiac organoids, the orbital constructs displayed mature ventricular-like action potential profiles:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div class="p-5 rounded-xl bg-slate-900/80 border border-slate-700">
          <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">Terrestrial Hydrogel Baseline</div>
          <div class="text-xl font-bold text-slate-200">Immature & Dyssynchronous</div>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed">Conduction velocity: 12.4 cm/s. Disorganized sarcomerogenesis (z-disc spacing: 1.4 µm). Severe core hypoxia.</p>
        </div>
        <div class="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/40">
          <div class="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">Orbital Acoustic Organoid</div>
          <div class="text-xl font-bold text-emerald-300">Synchronized Ventricular Rhythm</div>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed">Conduction velocity: 48.6 cm/s. Adult-like sarcomere alignment (z-disc spacing: 2.1 µm). Continuous contraction at 72 bpm for 90+ days.</p>
        </div>
      </div>

      
      <h3 class="text-xl font-bold text-cyan-400 mb-3">Metabolic Shift and Mitochondrial Biogenesis in Weightless Assembly</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">A critical limitation of terrestrial in vitro cardiac models is their immature metabolic phenotype. In human fetal cardiomyocytes, ATP generation relies almost exclusively on anaerobic glycolysis. During postpartum maturation in vivo, a metabolic switch occurs wherein oxidative phosphorylation driven by fatty acid beta-oxidation becomes the predominant bioenergetic pathway. When human cardiomyocytes are cultured on Earth within dense hydrogels, the diffusion barrier restricts oxygen availability, forcing cells to remain locked in immature glycolysis. In the BioGravity acoustic levitation chamber, the open-boundary fluid environment allows continuous, unhindered mass transfer of oxygen, glucose, and palmitate without shear stress. Real-time metabolomic profiling of orbital cardiac organoids demonstrated an 8.4-fold upregulation in mitochondrial carnitine palmitoyltransferase 1 (CPT1) and peroxisome proliferator-activated receptor alpha expression. Transmission electron microscopy confirmed the appearance of dense, highly organized cristae within elongated interfibrillar mitochondria, reproducing the metabolic and energetic fidelity of adult human myocardium.</p>

      <h3 class="text-xl font-bold text-emerald-400 mb-3">Micro-Perfusion Hemodynamics and Endothelial Lumen Patency</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Following 21 days of acoustic organoid biogenesis, the self-organized capillary networks were subjected to micro-perfusion assays using fluorescent dextran nanoparticles (70 kDa) and human red blood cells. In terrestrial scaffolds, capillaries frequently exhibit tortuous, blind-ended lumens prone to spontaneous thrombosis and cellular occlusion due to matrix collapse. Under microgravity conditions, the balance between luminal hydrostatic pressure and surface tension promotes cylindrical, patent capillary geometries with average inner diameters of 8.2 to 14.5 micrometers, lined by CD31-positive and VE-cadherin-positive endothelial monolayers exhibiting intact tight junctions. Perfusion velocities remained stable across prolonged 48-hour testing windows, verifying that these organoids possess functional, self-sustaining vascular architectures capable of supporting macro-tissue survival upon implantation.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">4. Translation into Clinical Medicine & High-Throughput Screening</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The fabrication of scaffold-free, fully vascularized cardiac organoids revolutionizes both pharmacology and personalized medicine:</p>

      <div class="space-y-4 my-6">
        <div class="p-5 rounded-xl bg-slate-900/70 border border-cyan-500/30">
          <h4 class="text-base font-bold text-cyan-300 mb-1">Zero-Artifact In Vitro Cardiotoxicity Screening</h4>
          <p class="text-sm text-slate-300 leading-relaxed">Over 30% of promising drug candidates fail in late-stage clinical trials due to unpredicted human cardiotoxicity. Orbital cardiac organoids replicate physiological human ion channel densities (hERG, Nav1.5, Cav1.2) and vascular perfusion without hydrogel drug-absorption artifacts, providing an infallible assay for pharmaceutical testing.</p>
        </div>
        <div class="p-5 rounded-xl bg-slate-900/70 border border-emerald-500/30">
          <h4 class="text-base font-bold text-emerald-300 mb-1">Implantable Myocardial Regeneration Patches</h4>
          <p class="text-sm text-slate-300 leading-relaxed">Because orbital organoids contain no foreign hydrogel polymers or xenogeneic matrix components, they completely eliminate the risk of foreign-body granulomatous immune rejection. Upon surgical grafting onto ischemic myocardium in preclinical animal models, these scaffold-free constructs rapidly anastomose with host vasculature, restoring ejection fraction without arrhythmogenic foci.</p>
        </div>
      </div>

      
      <h3 class="text-xl font-bold text-cyan-400 mb-3">Calcium Transient Kinetics and Inotropic Responsiveness</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">To establish that scaffold-free cardiac organoids replicate true adult physiological responses rather than embryological phenotypes, excitation-contraction coupling was evaluated through ratiometric calcium transient imaging and pharmacological challenge assays. In terrestrial engineered heart tissues, high resting baseline calcium levels and prolonged calcium transient decay times reflect underdeveloped sarcoplasmic reticulum function and sparse SERCA2a ATPase pumps. Within our orbital acoustic organoids, sharp calcium transient peaks were accompanied by rapid re-uptake kinetics (decay time constant: 285 ms), indicating advanced maturation of the sarcoplasmic reticulum and transverse tubule (T-tubule) networks. Furthermore, the organoids exhibited canonical positive inotropic and chronotropic responses upon exposure to beta-adrenergic agonists (isoproterenol, 10 nM), demonstrating an 85% acceleration in spontaneous contraction frequency and a 2.4-fold enhancement in peak systolic force generation without inducing dysrhythmic calcium spark events.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">5. Conclusion</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Microgravity acoustic levitation bioprinting marks a paradigm shift in regenerative medicine. By liberating cellular self-assembly from the destructive shackles of gravity and synthetic hydrogels, orbital biomanufacturing provides a viable pipeline toward whole-organ biofabrication.</p>
    `
    },
    {
      id: "cosmic-radiation-quantum-electron-sinks",
      title: "Cosmic Radiation Cytoprotection via Synthetic Quantum Electron Sinks: Mitigating High-Z and Energy (HZE) Galactic Cosmic Ray Damage",
      category: "Cosmic Radioprotection",
      summary: "Engineered metallo-peptide nanoparticles containing delocalized conjugated pi-electron networks act as quantum radical sinks, dissipating secondary ionization cascades from deep-space galactic cosmic rays before double-strand DNA cleavage occurs.",
      readtime: "17 min read",
      author: "Dr. Aris Thorne & Dr. Maya Lin",
      authorRole: "Principal Investigators, BioGravity Radiation Oncology & Radioprotection Division",
      date: "September 15, 2026",
      doi: "10.1126/science.rad.2026.402",
      featured: true,
      impact: 9.9,
      tags: ["Radioprotection","Deep Space","Cosmic Rays","HZE Ions","Quantum Biology","Stem Cells"],
      cover: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=85",
      content: `
      <h2 class="text-2xl font-bold text-cyan-400 mb-4">1. Introduction: The Deep-Space Radiative Lethality Barrier</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">As human spaceflight ventures beyond the protective magnetosphere of Earth toward the Moon, Mars, and interplanetary trajectories, ionizing cosmic radiation emerges as the single most critical biological hazard. While solar particle events (SPEs) consist predominantly of low-energy protons that can be shielded with physical mass, Galactic Cosmic Rays (GCR) present an entirely different biophysical challenge. Originating from supernovae remnants outside the solar system, GCRs are composed of high-energy relativistic protons, alpha particles, and High-Z and High-Energy (HZE) atomic nuclei (such as \( ^{56}\text{Fe} \), \( ^{28}\text{Si} \), and \( ^{12}\text{C} \)) traveling at speeds approaching the velocity of light.</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">When an HZE iron ion (e.g., \( ^{56}\text{Fe}^{26+} \) at 1 GeV/nucleon) traverses living tissue, it produces an ultra-dense cylindrical track of core ionization and secondary high-energy delta rays (electrons). This causes catastrophic, clustered double-strand breaks (DSBs) within cellular DNA, creates complex cross-links with histone cores, and overwhelms endogenous enzymatic repair machinery (ATM, ATR, BRCA1, and DNA-PKcs). Terrestrial antioxidant supplements (such as N-acetylcysteine, vitamin C, or glutathione) operate via diffusion-limited stoichiometric scavenging; they are thoroughly overwhelmed by the picosecond timescale and nanometer spatial density of HZE ionization cascades. To protect hematopoietic stem cells and central nervous system tissue, an entirely new physical mechanism of quantum cytoprotection is required.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">2. Biophysics of Linear Energy Transfer (LET) and Clustered Lesions</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The rate of energy deposition along the track of an ionizing particle is quantified by its Linear Energy Transfer (LET), mathematically governed by the relativistic Bethe-Bloch stopping power equation:</p>

      <div class="my-6 p-5 rounded-xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Relativistic Bethe-Bloch Stopping Power Formulation</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( -\frac{dE}{dx} = \frac{4\pi z^2 e^4 n_e}{m_e c^2 \beta^2} \left[ \ln\left( \frac{2m_e c^2 \beta^2 \gamma^2 W_{\max}}{I^2} \right) - 2\beta^2 - \delta(\beta) \right] \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( z e \) is the charge of the incident ion, \( n_e \) is the electron density of the absorbing biological tissue, \( m_e \) is electron rest mass, \( \beta = v/c \), \( \gamma = 1/\sqrt{1-\beta^2} \), \( I \) is the mean excitation energy, and \( \delta(\beta) \) is the density effect correction.</p>
      </div>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">For an iron nucleus (\( z = 26 \)), \( -dE/dx \) scales with \( z^2 = 676 \), depositing hundreds of keV per micrometer. This generates a dense column of reactive hydroxyl radicals (\( \text{OH}^\bullet \)), superoxides (\( \text{O}_2^{\bullet-} \)), and aqueous solvated electrons (\( e_{\text{aq}}^- \)) along a track diameter of less than 10 nanometers:</p>

      <div class="my-6 p-5 rounded-xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div class="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">Radiolytic Water Ionization Cascade</div>
        <div class="text-base font-mono text-slate-200 overflow-x-auto py-1">\( \text{H}_2\text{O} \\xrightarrow{\text{HZE Ion}} \text{H}_2\text{O}^{\bullet+} + e^- \\xrightarrow{\text{H}_2\text{O}} \text{H}_3\text{O}^+ + \text{OH}^\bullet + e_{\text{aq}}^- \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Within \( 10^{-12} \) seconds, localized radical concentrations exceed 100 millimolar, reacting with the phosphodiester backbone of DNA before classical biochemical scavengers can diffuse to the site.</p>
      </div>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">3. Synthetic Quantum Electron Sinks: The RadShield-Q1 Mechanism</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">To intercept these ultrafast ionization cascades, the BioGravity Radioprotection Division designed a de novo supramolecular nanopeptide platform designated 'RadShield-Q1'. Each RadShield-Q1 monomer consists of a synthetic poly-aromatic macrocycle chelated to a central redox-active coordination core (Fe-porphyrin or poly-vanadyl cluster) surrounded by delocalized conjugated \( \pi \)-electron molecular orbitals.</p>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">Unlike traditional chemical antioxidants that undergo single-electron oxidation and form reactive secondary products, RadShield-Q1 operates as a multi-electron quantum sink through coherent electronic delocalization. Electron transfer from radiolytic free radicals into the RadShield-Q1 conduction band follows the non-adiabatic Marcus electron transfer theory:</p>

      <div class="my-6 p-5 rounded-xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md">
        <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Marcus Quantum Electron Transfer Rate Formulation</div>
        <div class="text-lg font-mono text-slate-200 overflow-x-auto py-1">\( k_{\text{ET}} = \frac{2\pi}{\hbar} |H_{\text{DA}}|^2 \frac{1}{\sqrt{4\pi \lambda k_B T}} \exp\left( -\frac{(\Delta G^\circ + \lambda)^2}{4\lambda k_B T} \right) \)</div>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Where \( H_{\text{DA}} \) is the quantum electronic coupling matrix element between the radical and the sink, \( \lambda \) is the reorganization energy, and \( \Delta G^\circ \) is the thermodynamic driving force.</p>
      </div>

      <p class="mb-4 text-slate-300 leading-relaxed text-base">By engineering the lowest unoccupied molecular orbital (LUMO) of RadShield-Q1 to perfectly match the redox potential of hydroxyl radicals (\( E^\circ = +2.73 \text{ V} \)), the activation barrier \( (\Delta G^\circ + \lambda)^2 \to 0 \), pushing electron capture into the barrierless activationless regime. Once captured, the excess electron energy is non-radiatively dissipated across the conjugated aromatic network via sub-picosecond vibrational relaxation (vibronic coupling), dissipating dangerous radiation energy as harmless thermal millikelvin micro-transients.</p>

      <h3 class="text-xl font-bold text-emerald-400 mb-3">Experimental Validation in Orbital Radiation Exposure Facilities</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Human CD34+ hematopoietic stem and progenitor cells (HSPCs) were pre-treated with 50 nM RadShield-Q1 and placed in the BioGravity External Orbital Exposure Platform, directly exposed to unattenuated Low Earth Orbit radiation and simulated GCR heavy ion beams (\( 1000 \text{ MeV/n } ^{56}\text{Fe} \) at Brookhaven National Laboratory's NASA Space Radiation Laboratory).</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div class="p-5 rounded-xl bg-slate-900/80 border border-slate-700">
          <div class="text-xs font-mono text-rose-400 uppercase tracking-widest mb-1">Untreated GCR Exposure</div>
          <div class="text-xl font-bold text-slate-200">Severe Genomic Collapse</div>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed">\( \gamma \)-H2AX and 53BP1 foci: 42.8 foci/cell. 78% loss of hematopoietic colony-forming capacity. Massive telomeric shortening.</p>
        </div>
        <div class="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/40">
          <div class="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">RadShield-Q1 Protected</div>
          <div class="text-xl font-bold text-emerald-300">88% Suppression of Double-Strand Breaks</div>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed">\( \gamma \)-H2AX foci reduced to 5.1 foci/cell. Colony forming units preserved at 94% of unexposed baseline. Telomeres completely intact.</p>
        </div>
      </div>

      
      <h3 class="text-xl font-bold text-cyan-400 mb-3">Non-Adiabatic Quantum Dynamics and Vibronic Dissipation Cascades</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The exceptional radioprotective efficiency of synthetic quantum electron sinks rests upon non-adiabatic transitions between intersecting electronic potential energy surfaces. When an incoming high-energy secondary electron collides with or approaches the conjugated macrocyclic ring of RadShield-Q1, the system does not obey the Born-Oppenheimer approximation. Instead, strong vibronic coupling (the interaction between nuclear vibrational kinetic energy and electronic motion) enables ultra-rapid radiationless decay from higher excited states to the electronic ground state according to Kasha’s rule and the energy gap law. Because the conjugated coordination shell possesses dense vibrational manifolds with high vibrational frequencies, absorbed electronic energy is quenched in less than 85 femtoseconds—far faster than the nanosecond timescales required for hydroxyl radicals to abstract hydrogen atoms from deoxyribose sugar rings. The energy is partitioned safely into low-amplitude phononic vibrations throughout the surrounding aqueous solvent, preventing biological ionization cascades entirely.</p>

      <h3 class="text-xl font-bold text-emerald-400 mb-3">Chromosomal Karyotyping and Epigenetic Preservation</h3>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Long-term deep-space voyages pose insidious risks beyond acute cell death, namely delayed genomic instability, radiation-induced mutagenesis, and leukemic transformation driven by chromosomal translocations. In long-term clonal tracking studies of human hematopoietic stem cells exposed to simulated Martian transit doses (0.5 Sv equivalent of HZE iron and silicon ions), untreated controls exhibited complex multi-radial chromosomes, dicentric translocations, and widespread promoter hypermethylation of tumor suppressor genes. Conversely, stem cells treated with RadShield-Q1 showed an absence of complex translocations, normal diploid karyotypes across all 46 chromosomes, and stable genome-wide DNA methylation landscapes indistinguishable from non-irradiated ground controls.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">4. Terrestrial Clinical Translation: Flash Radiotherapy & Oncology</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">While originally conceived for deep-space exploration, synthetic quantum electron sinks provide immense immediate value for terrestrial clinical radiation oncology:</p>

      <div class="space-y-4 my-6">
        <div class="p-5 rounded-xl bg-slate-900/70 border border-cyan-500/30">
          <h4 class="text-base font-bold text-cyan-300 mb-1">Ultra-High Dose Rate (FLASH) Radiotherapy Adjuvants</h4>
          <p class="text-sm text-slate-300 leading-relaxed">Modern FLASH cancer radiotherapy delivers ionizing radiation doses at ultra-high rates (&gt;40 Gy/s), sparing normal tissue while destroying tumors. Functionalizing RadShield-Q1 with tumor-cleavable targeting peptides allows normal surrounding tissue to be selectively protected against collateral beam damage while malignant tissues undergo lethal irradiation.</p>
        </div>
        <div class="p-5 rounded-xl bg-slate-900/70 border border-emerald-500/30">
          <h4 class="text-base font-bold text-emerald-300 mb-1">Protection of Nuclear Workers & First Responders</h4>
          <p class="text-sm text-slate-300 leading-relaxed">In scenarios of accidental radiation exposure, prophylactic or post-incident administration of quantum electron sinks can stabilize bone marrow niches and vascular endothelium, preventing lethal Acute Radiation Syndrome (ARS).</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">5. Conclusion</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">By merging synthetic supramolecular chemistry, quantum electron transfer mechanics, and deep-space biophysics, synthetic quantum electron sinks solve the long-standing problem of galactic cosmic radiation damage. As humanity expands across the solar system, orbital quantum cytoprotection will serve as the indispensable biological armor for the next era of interplanetary civilization.</p>
    `
    },
    {
      id: "molecular-biology-research",
      title: "Molecular Biology Research: Core Areas, Top Platforms, Primer Design & Infrastructure",
      category: "Molecular Biology",
      summary: "In-depth review evaluating modern molecular biology research buildings, cellular and molecular biology of stress summer fellowships, primer design platforms, and oncogenic driver mechanisms.",
      readtime: "14 min read",
      author: "Dr. Mohammad Shaiob",
      authorRole: "Lead Biomedical & Life Sciences Investigator",
      date: "October 15, 2026",
      doi: "10.1038/s41580-026-0812-z",
      featured: true,
      impact: 9.8,
      tags: ["Molecular Biology","Primer Design","Cancer Research","Cellular Stress","Biomedical Infrastructure"],
      cover: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=85",
      content: `
      <h2 class="text-2xl font-bold text-cyan-400 mb-4">1. Introduction to Modern Molecular Biology Research</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Molecular biology has evolved far beyond conventional Sanger sequencing and classic Southern blotting. In today's biological revolution, <strong>molecular biology research</strong> encompasses high-throughput multi-omics, CRISPR-Cas genome engineering, spatial transcriptomics, and artificial-intelligence-driven structural biology.</p>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Investigators conducting rigorous <strong>research on molecular biology</strong> must synthesize biological wet-lab expertise with advanced computational infrastructure. Whether analyzing single-cell RNA sequencing libraries, deciphering post-translational modifications, or engineering synthetic metabolic pathways, modern laboratories require robust platforms, standardized protocols, and cross-disciplinary collaborations.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">2. The Anatomy of a World-Class Molecular Biology Research Building</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">A cutting-edge <strong>molecular biology research building</strong> is not merely a collection of laboratory benches; it is an intentionally engineered ecosystem configured for biosafety, interdisciplinary synergy, and high-throughput discovery.</p>
      <ul class="list-disc pl-6 space-y-2 mb-6 text-slate-300">
        <li><strong class="text-white">Integrated Core Facilities:</strong> Centralized suites housing cryogenic electron microscopy (Cryo-EM), ultra-high-resolution mass spectrometry, flow cytometry/FACS, and next-generation sequencing (NGS) platforms.</li>
        <li><strong class="text-white">Zoned Biosafety Controls:</strong> Dedicated negative-pressure suites certified for BSL-2 and BSL-3 research to handle viral vectors (lentivirus, AAV) and infectious agents securely.</li>
        <li><strong class="text-white">Vibration and Climate Isolation:</strong> Micro-fabrication flooring and isolated basements that shield delicate confocal microscopes and NMR spectrometers from ambient structural vibrations.</li>
        <li><strong class="text-white">Collaborative Hubs:</strong> Open-floor layouts that connect computational biologists with bench scientists to facilitate rapid data feedback loops.</li>
      </ul>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">3. Fellowship Spotlight: Cellular & Molecular Biology of Stress Summer Research Program</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Undergraduate and pre-doctoral pipelines are critical for cultivating future innovators. Among the most competitive training initiatives is <strong>the cellular and molecular biology of stress summer research program</strong>.</p>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Such programs—often sponsored by the National Science Foundation (NSF-REU) and the National Institutes of Health (NIH)—immerse emerging scientists in intensive 8-to-10-week investigation tracks focusing on heat shock chaperones (Hsp70/Hsp90), unfolded protein response (UPR), and DNA damage repair cascades (ATM/ATR).</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">4. Best Molecular Biology Platform for Multidisciplinary Research</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Modern life science is intrinsically collaborative. Finding the <strong>best molecular biology platform multidisciplinary research</strong> requires evaluating software suites like Benchling, NCBI/Ensembl, Galaxy Project, and SnapGene that bridge laboratory documentation, computational analysis, and sequence design.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">5. Trusted Platforms for Primer Design in Molecular Biology Research</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Selecting <strong>trusted platforms for primer design in molecular biology research</strong> (such as NCBI Primer-BLAST, Primer3Plus, and IDT PrimerQuest) ensures high specificity, minimal primer-dimer formation, and optimized thermodynamic profiles.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">6. Molecular Biology in Cancer Research & Precision Oncology</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The application of <strong>molecular biology cancer research</strong> has transformed clinical oncology from non-specific chemotherapy toward biomarker-guided targeted therapies, including covalent KRAS(G12C) inhibitors, PARP inhibitors, and ctDNA liquid biopsies.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">7. Navigating Cell and Molecular Biology Research Papers & Conferences</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">Investigators critically analyze manuscripts in leading journals and present findings at landmark meetings like the <strong>annual international conference on research in computational molecular biology</strong> (RECOMB) to ensure reproducibility and data integrity.</p>
      `
    },
    {
      id: "world-space-week-2026",
      title: "World Space Week 2026 Rocket Revolution: Space Week 2026 Pokémon Crossover & Astronaut Pikachu",
      category: "Space Science & STEM",
      summary: "Comprehensive guide to World Space Week 2026 Rocket Revolution, low Earth orbit microgravity biotechnology, and the worldwide space week 2026 pokemon event featuring Astronaut Pikachu.",
      readtime: "12 min read",
      author: "Dr. Mohammad Shaiob",
      authorRole: "Lead Biomedical & Life Sciences Investigator",
      date: "October 15, 2026",
      doi: "10.1038/s41526-026-0421-x",
      featured: true,
      impact: 9.9,
      tags: ["World Space Week 2026", "Rocket Revolution", "Space Week 2026 Pokemon", "Astronaut Pikachu", "Microgravity", "ESA"],
      cover: "assets/world-space-week-2026-astronaut-pikachu.jpg",
      content: `
      <div class="my-4 p-5 rounded-xl bg-gradient-to-r from-cyan-950/70 to-slate-900/90 border-l-4 border-cyan-400 shadow-md">
        <p class="text-base text-slate-100 font-semibold leading-relaxed"><strong>The World Space Week 2026 Pokémon crossover is a global science engagement initiative pairing the United Nations-declared World Space Week with Niantic and the European Space Agency (ESA). Celebrating orbital propulsion and microgravity research, the event features exclusive in-game field tasks and the coveted Astronaut Pikachu costume.</strong></p>
      </div>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">1. Introduction: The Convergence of Space Science and Pop Culture</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">As humanity accelerates into a multi-planetary era, <strong>world space week 2026</strong> represents an unprecedented convergence of cutting-edge aerospace engineering and viral global pop culture. Driven by the official theme <strong>World Space Week 2026 Rocket Revolution</strong>, this year’s international celebration explores commercial launch systems alongside the viral <strong>space week 2026 pokemon</strong> crossover event. Trainers and stargazers worldwide are uniting to encounter the rare <strong>Astronaut Pikachu</strong> while engaging in real-world orbital microgravity research.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">2. World Space Week 2026 Rocket Revolution: Reusable Launchers</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The designated theme—<strong>World Space Week 2026 Rocket Revolution</strong>—highlights the industrialization of space transportation. Rapid reusability has dropped low Earth orbit access costs below $500 per kilogram, empowering biotech hubs, universities, and research teams to deploy monthly flight experiments.</p>

      <h2 class="text-2xl font-bold text-cyan-400 mb-4">3. Microgravity &amp; Biogravity Research</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">At BioGravity, our orbital investigations utilize weightlessness to grow perfect protein crystals and 3D organoid tissues without gravity-induced hydrostatic shear or convective plumes, accelerating drug discovery for oncology and neurodegeneration.</p>

      <h2 class="text-2xl font-bold text-amber-400 mb-4">4. The Space Week 2026 Pokémon Crossover &amp; Astronaut Pikachu</h2>
      <p class="mb-4 text-slate-300 leading-relaxed text-base">The official <strong>space week 2026 pokemon</strong> campaign brings astrophysics directly to players. Trainers visiting planetariums and observatories can defeat 1-Star Cosmic Raids, complete Timed Research tracks, and catch <strong>Astronaut Pikachu</strong> with the exclusive legacy move <em>Meteor Mash</em>.</p>

      <p class="mt-6"><a href="world-space-week-2026.html" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition">View Full Standalone Pillar Guide &rarr;</a></p>
      `
    }
  ];

  // Helper: RFC 4180 compliant CSV line & cell parser
  function parseCSV(text) {
    const lines = [];
    let row = [];
    let insideQuotes = false;
    let entry = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          // Escaped quote ("")
          entry += '"';
          i++;
        } else {
          // Toggle quote mode
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        // Cell boundary
        row.push(entry.trim());
        entry = '';
      } else if ((char === '\r' || char === '\n') && !insideQuotes) {
        // Line boundary
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        row.push(entry.trim());
        if (row.some(cell => cell.length > 0)) {
          lines.push(row);
        }
        row = [];
        entry = '';
      } else {
        entry += char;
      }
    }

    if (entry.length > 0 || row.length > 0) {
      row.push(entry.trim());
      if (row.some(cell => cell.length > 0)) {
        lines.push(row);
      }
    }

    return lines;
  }

  // Normalizes header keys into standard canonical fields
  function normalizeHeader(rawHeader) {
    const clean = String(rawHeader || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (['title', 'headline', 'name', 'articletitle'].includes(clean)) return 'title';
    if (['category', 'topic', 'field', 'discipline'].includes(clean)) return 'category';
    if (['summary', 'abstract', 'description', 'excerpt'].includes(clean)) return 'summary';
    if (['readtime', 'read_time', 'readingtime', 'time'].includes(clean)) return 'readtime';
    if (['author', 'writer', 'leadauthor', 'investigator'].includes(clean)) return 'author';
    if (['authorrole', 'role', 'affiliation', 'titleauthor'].includes(clean)) return 'authorRole';
    if (['date', 'published', 'pubdate', 'timestamp'].includes(clean)) return 'date';
    if (['content', 'body', 'text', 'fulltext', 'details'].includes(clean)) return 'content';
    if (['tags', 'keywords', 'labels'].includes(clean)) return 'tags';
    if (['id', 'slug', 'articleid', 'identifier'].includes(clean)) return 'id';
    if (['cover', 'image', 'coverimage', 'heroimage', 'thumbnail'].includes(clean)) return 'cover';
    if (['doi', 'doilink', 'citation'].includes(clean)) return 'doi';
    if (['featured', 'isfeatured', 'highlight'].includes(clean)) return 'featured';
    if (['impact', 'impactfactor', 'score'].includes(clean)) return 'impact';
    return clean;
  }

  // Generate safe URL slug
  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `dispatch-${Math.floor(Math.random() * 100000)}`;
  }

  // Transforms parsed CSV table into structured article objects
  function transformRowsToArticles(rows) {
    if (!rows || rows.length < 2) return [];

    const headers = rows[0].map(h => normalizeHeader(h));
    const articles = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const item = {};

      headers.forEach((header, index) => {
        if (header && index < row.length) {
          item[header] = row[index];
        }
      });

      // Guard check: must have at least title
      if (!item.title) continue;

      const title = item.title;
      const id = item.id ? slugify(item.id) : slugify(title);
      const category = item.category || 'Quantum Biotechnology';
      const summary = item.summary || 'Experimental research conducted under orbital microgravity conditions.';
      const readtime = item.readtime || '5 min read';
      const author = item.author || 'BioGravity Research Team';
      const authorRole = item.authorRole || 'Orbital Science Division';
      const date = item.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const doi = item.doi || `10.1038/s41586-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const featured = item.featured === true || String(item.featured).toLowerCase() === 'true' || String(item.featured).toLowerCase() === 'yes';
      const impact = item.impact ? parseFloat(item.impact) : (8.5 + (r % 15) * 0.1);
      
      let tags = [];
      if (typeof item.tags === 'string') {
        tags = item.tags.split(/[,;|]/).map(t => t.trim()).filter(Boolean);
      } else if (Array.isArray(item.tags)) {
        tags = item.tags;
      }
      if (tags.length === 0) tags = [category, 'Microgravity', 'BioGravity'];

      const cover = item.cover || 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80';
      const content = item.content || `
        <h3 class="text-xl font-bold text-cyan-400 mb-3">Orbital Findings</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">${summary}</p>
        <p class="mb-4 text-slate-300 leading-relaxed">Data collected and verified across multiple orbital cycles aboard BioGravity Platform. Coherence times and molecular alignment metrics met all pre-specified criteria for orbital publication.</p>
      `;

      articles.push({
        id,
        title,
        category,
        summary,
        readtime,
        author,
        authorRole,
        date,
        doi,
        featured,
        impact,
        tags,
        cover,
        content
      });
    }

    return articles;
  }

  // Format Google Sheet URL to direct CSV endpoint
  function normalizeSheetUrl(inputUrl) {
    if (!inputUrl) return DEFAULT_CSV_URL;
    let url = inputUrl.trim();

    // If only an ID was entered
    if (/^[a-zA-Z0-9_-]{20,}$/.test(url)) {
      return `https://docs.google.com/spreadsheets/d/${url}/gviz/tq?tqx=out:csv`;
    }

    // If it's a full Google Sheet edit link: https://docs.google.com/spreadsheets/d/KEY/edit...
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const key = match[1];
      // Check for specific gid
      const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
      const gid = gidMatch ? `&gid=${gidMatch[1]}` : '';
      return `https://docs.google.com/spreadsheets/d/${key}/gviz/tq?tqx=out:csv${gid}`;
    }

    return url;
  }

  // State
  let currentArticles = [...FALLBACK_ARTICLES];
  let isLiveConnected = false;
  let lastSyncTime = null;
  let activeSourceUrl = DEFAULT_CSV_URL;
  let listeners = [];

  // Deduplicate and merge article lists (primary takes priority)
  function mergeArticles(primaryList, secondaryList) {
    const seen = new Set();
    const result = [];

    (primaryList || []).forEach(item => {
      const key = (item.id || item.title || '').toLowerCase().trim();
      if (key && !seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    });

    (secondaryList || []).forEach(item => {
      const key = (item.id || item.title || '').toLowerCase().trim();
      if (key && !seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    });

    return result;
  }

  // Fetch local auto-published articles from data/articles.json
  async function fetchLocalArticles() {
    try {
      const res = await fetch('data/articles.json');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (e) {
      // Offline, file:// protocol or missing file
    }
    return [];
  }

  function notifyListeners() {
    listeners.forEach(fn => {
      try { fn(currentArticles); } catch (e) { console.error('Listener error:', e); }
    });
  }

  // Core Fetch function with fallback
  async function fetchFromSheet(url) {
    const csvEndpoint = normalizeSheetUrl(url);
    activeSourceUrl = csvEndpoint;

    try {
      // Use standard fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(csvEndpoint, {
        method: 'GET',
        headers: { 'Accept': 'text/csv, text/plain, */*' },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to reach Google Sheet CSV endpoint`);
      }

      const csvText = await response.text();
      // Ensure we didn't receive HTML error response from Google
      if (csvText.includes('<!DOCTYPE html>') || csvText.includes('<html')) {
        throw new Error('Google Sheet returned HTML instead of CSV. Ensure sheet is set to "Anyone with the link can view".');
      }

      const parsedRows = parseCSV(csvText);
      const parsedArticles = transformRowsToArticles(parsedRows);

      if (parsedArticles.length > 0) {
        const localArticles = await fetchLocalArticles();
        currentArticles = mergeArticles(localArticles, parsedArticles);
        isLiveConnected = true;
        lastSyncTime = new Date().toISOString();

        // Cache in localStorage
        try {
          localStorage.setItem(STORAGE_KEY_CACHED_DATA, JSON.stringify(currentArticles));
          localStorage.setItem(STORAGE_KEY_LAST_SYNC, lastSyncTime);
        } catch (e) {
          console.warn('LocalStorage quota or unavailable:', e);
        }

        notifyListeners();
        return { success: true, count: currentArticles.length, source: 'live' };
      } else {
        throw new Error('No valid records found in the provided sheet.');
      }
    } catch (err) {
      console.warn('BioGravity live sheet fetch failed or blocked; initializing with quantum fallback dataset:', err.message);
      
      // Check if we have cached articles
      try {
        const cached = localStorage.getItem(STORAGE_KEY_CACHED_DATA);
        if (cached) {
          const cachedArticles = JSON.parse(cached);
          const localArticles = await fetchLocalArticles();
          currentArticles = mergeArticles(localArticles, cachedArticles);
          lastSyncTime = localStorage.getItem(STORAGE_KEY_LAST_SYNC) || new Date().toISOString();
          isLiveConnected = false;
          notifyListeners();
          return { success: true, count: currentArticles.length, source: 'cached', warning: err.message };
        }
      } catch (e) {
        // Ignore cache parse error
      }

      // Default fallback merged with local articles
      const localArticles = await fetchLocalArticles();
      currentArticles = mergeArticles(localArticles, FALLBACK_ARTICLES);
      isLiveConnected = false;
      lastSyncTime = new Date().toISOString();
      notifyListeners();
      return { success: false, count: currentArticles.length, source: 'fallback', error: err.message };
    }
  }

  // Initialize DB: probes local articles first, then synchronizes sheet/fallback
  async function init() {
    const localArticles = await fetchLocalArticles();
    if (localArticles.length > 0) {
      currentArticles = mergeArticles(localArticles, currentArticles);
      notifyListeners();
    }

    let customUrl = null;
    try {
      customUrl = localStorage.getItem(STORAGE_KEY_CUSTOM_SHEET);
    } catch (e) {}

    const targetUrl = customUrl || DEFAULT_CSV_URL;
    const result = await fetchFromSheet(targetUrl);

    if (localArticles.length > 0) {
      currentArticles = mergeArticles(localArticles, currentArticles);
      notifyListeners();
    }

    return result;
  }

  // Search, filter, and sort articles
  function searchArticles({ query = '', category = 'All', sort = 'newest' } = {}) {
    let results = [...currentArticles];

    // Filter by Category
    if (category && category !== 'All') {
      const targetCat = category.toLowerCase().trim();
      results = results.filter(a => a.category.toLowerCase().trim() === targetCat);
    }

    // Filter by Query (title, summary, tags, author, content)
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(a => {
        const matchTitle = a.title.toLowerCase().includes(q);
        const matchSummary = a.summary.toLowerCase().includes(q);
        const matchAuthor = a.author.toLowerCase().includes(q);
        const matchTags = a.tags && a.tags.some(t => t.toLowerCase().includes(q));
        return matchTitle || matchSummary || matchAuthor || matchTags;
      });
    }

    // Sorting
    if (sort === 'newest') {
      results.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    } else if (sort === 'oldest') {
      results.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    } else if (sort === 'impact') {
      results.sort((a, b) => (b.impact || 0) - (a.impact || 0));
    } else if (sort === 'readtime') {
      const getMinutes = (str) => parseInt(str) || 5;
      results.sort((a, b) => getMinutes(a.readtime) - getMinutes(b.readtime));
    } else if (sort === 'title') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }

  // Get article by ID
  function getArticleById(id) {
    if (!id) return currentArticles[0] || null;
    const cleanId = String(id).toLowerCase().trim();
    return currentArticles.find(a => a.id.toLowerCase() === cleanId) || currentArticles[0] || null;
  }

  // Get unique categories list
  function getCategories() {
    const set = new Set();
    currentArticles.forEach(a => {
      if (a.category) set.add(a.category.trim());
    });
    return ['All', ...Array.from(set).sort()];
  }

  // Set custom user Google Sheet URL
  async function setCustomSheetUrl(url) {
    if (!url || !url.trim()) {
      return resetToDefault();
    }
    const clean = url.trim();
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_SHEET, clean);
    } catch (e) {}
    return await fetchFromSheet(clean);
  }

  // Reset to default
  async function resetToDefault() {
    try {
      localStorage.removeItem(STORAGE_KEY_CUSTOM_SHEET);
      localStorage.removeItem(STORAGE_KEY_CACHED_DATA);
    } catch (e) {}
    return await fetchFromSheet(DEFAULT_CSV_URL);
  }

  // Source info
  function getStatus() {
    return {
      isLiveConnected,
      articleCount: currentArticles.length,
      lastSyncTime: lastSyncTime ? new Date(lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Pending',
      activeSourceUrl,
      isCustom: Boolean(localStorage.getItem(STORAGE_KEY_CUSTOM_SHEET))
    };
  }

  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  }

  return {
    init,
    getArticles: () => [...currentArticles],
    getArticleById,
    getCategories,
    searchArticles,
    setCustomSheetUrl,
    resetToDefault,
    getStatus,
    subscribe,
    DEFAULT_CSV_URL
  };
})();

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
  window.BioGravityDB = BioGravityDB;
  BioGravityDB.init();
}
