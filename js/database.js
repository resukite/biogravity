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
      id: 'crispr-quantum-tunneling',
      title: 'Quantum Proton Tunneling in CRISPR-Cas9 Cleavage Kinetics',
      category: 'Quantum Enzymology',
      summary: 'Observational data from cryogenic electron spin resonance reveals non-classical hydrogen isotope exchange rates at the Cas9 catalytic triad, confirming quantum proton tunneling as a key driver of precision cleavage.',
      readtime: '8 min read',
      author: 'Dr. Elena Rostova',
      authorRole: 'Head of Quantum Biochemistry, LEO Station Alpha',
      date: 'October 12, 2026',
      doi: '10.1038/s41586-026-09214-q',
      featured: true,
      impact: 9.8,
      tags: ['CRISPR', 'Quantum Tunneling', 'Cryo-EM', 'Enzymology'],
      cover: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h3 class="text-xl font-bold text-cyan-400 mb-3">Executive Summary</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">During high-resolution spectroscopic interrogation of Cas9-sgRNA ribonucleoprotein complexes under microgravity cryogenic conditions (4.2 K), kinetic isotope effect (KIE) measurements yielded anomalous coefficients exceeding classical Arrhenius predictions by a factor of 4.7. This demonstrates that proton transfer along the Asp-His-His catalytic triad proceeds via quantum mechanical wave-packet tunneling rather than classical over-the-barrier thermal transitions.</p>
        
        <div class="my-6 p-4 rounded-xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-md">
          <div class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">Quantum Tunneling Formulation</div>
          <div class="text-base font-mono text-slate-200">\( T(E) \approx \exp\left( -2 \int_{x_1}^{x_2} \sqrt{\frac{2m}{\hbar^2} (V(x) - E)} \, dx \right) \)</div>
          <p class="text-xs text-slate-400 mt-2">Where the hydrogen mass \(m\) provides an exponential tunneling advantage over deuterium, explaining the anomalous kinetic isotope shift.</p>
        </div>

        <h3 class="text-xl font-bold text-emerald-400 mb-3">Experimental Setup in Microgravity</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">Conducted aboard the BioGravity Orbital Platform Module Alpha, samples were isolated from terrestrial vibrational perturbations (attenuated to &lt; 0.08 &mu;g). By eliminating buoyant convection, Cas9-DNA duplex alignment achieved persistent coherence lifetimes of 384 picoseconds—over an order of magnitude higher than ground baseline measurements.</p>
        
        <h3 class="text-xl font-bold text-cyan-400 mb-3">Therapeutic Implications</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">By tuning local dielectric fields using engineered fluorinated amino acid substitutions, we can manipulate the quantum barrier width \( (x_2 - x_1) \). This renders off-target cutting energetically inaccessible, virtually eradicating mutagenic off-target cleavages across the human genome.</p>
      `
    },
    {
      id: 'zero-g-macromolecular-crystallography',
      title: 'Ultra-Pure Macromolecular Crystallography of Membrane Transporters in Microgravity',
      category: 'Protein Crystallography',
      summary: 'Diffraction patterns of CFTR membrane transporter crystals grown aboard LEO Orbital Platform achieve an unprecedented 0.82 Å resolution, unveiling transient water-mediated ion channel pathways.',
      readtime: '6 min read',
      author: 'Prof. Kieran Vance',
      authorRole: 'Chair of Structural Biophysics',
      date: 'September 28, 2026',
      doi: '10.1016/j.cell.2026.08.019',
      featured: true,
      impact: 9.4,
      tags: ['Crystallography', 'Microgravity', 'CFTR', 'Drug Discovery'],
      cover: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h3 class="text-xl font-bold text-cyan-400 mb-3">Background & Motivation</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">Integral membrane proteins represent over 60% of current therapeutic drug targets, yet terrestrial crystallization is plagued by buoyancy-driven convective plumes and gravity-induced sedimentation defects. In the microgravity environment of BioGravity Orbital Module Beta, crystal nucleation proceeds purely via diffusion-limited depletion zones.</p>

        <h3 class="text-xl font-bold text-emerald-400 mb-3">Diffraction Results & Structural Insights</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">Diffraction experiments performed using our onboard cryogenic X-ray source resolved the complete ABC transporter subunit at 0.82 Å. The mosaic spread decreased by 62% compared to the highest-grade terrestrial controls. Crucially, the absence of shear stress preserved a previously invisible coordinated network of 14 bound magnesium and hydration dipoles within the ATP-binding cassette.</p>
        
        <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
            <div class="text-xs font-mono text-cyan-400 mb-1">TERRESTRIAL BENCHMARK</div>
            <div class="text-2xl font-bold text-slate-200">1.85 Å</div>
            <p class="text-xs text-slate-400 mt-1">Convection defects, high mosaic spread</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/40">
            <div class="text-xs font-mono text-emerald-400 mb-1">BIOGRAVITY ORBITAL CRYSTAL</div>
            <div class="text-2xl font-bold text-emerald-300">0.82 Å</div>
            <p class="text-xs text-slate-400 mt-1">Sub-angstrom atomic clarity, 0.04° mosaic</p>
          </div>
        </div>
      `
    },
    {
      id: 'telomeric-cosmic-radioprotection',
      title: 'Synthetic Poly-ADP Quantum Radioprotectors for Deep-Space Cytoprotection',
      category: 'Cosmic Radioprotection',
      summary: 'Engineered synthetic nanopeptides harboring radical-scavenging quantum electron sinks suppress galactic cosmic ray (GCR) double-strand chromosomal breaks by 88% in human hematopoietic stem cells.',
      readtime: '10 min read',
      author: 'Dr. Aris Thorne & Dr. Maya Lin',
      authorRole: 'BioGravity Radiation Oncology Fellows',
      date: 'September 15, 2026',
      doi: '10.1126/science.rad.2026.402',
      featured: true,
      impact: 9.6,
      tags: ['Radioprotection', 'Deep Space', 'Telomeres', 'Stem Cells'],
      cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h3 class="text-xl font-bold text-cyan-400 mb-3">The Cosmic Radiation Hurdle</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">High-energy heavy ion (HZE) particles present in Galactic Cosmic Rays produce dense ionization tracks that shatter double-stranded DNA, bypassing traditional antioxidant defenses. BioGravity researchers synthesized a de novo metallo-peptide sequence termed 'RadShield-Q1' featuring delocalized conjugated &pi;-electron orbitals capable of rapidly dissipating multi-keV ionization cascades.</p>
        
        <h3 class="text-xl font-bold text-emerald-400 mb-3">In Vitro & Ex Vivo Validation</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">Human CD34+ hematopoietic progenitors cultured within our onboard external radiation exposure facility exhibited 88% fewer &gamma;-H2AX double-strand break foci when pre-incubated with 50 nM RadShield-Q1. Telomeric repeat preservation remained statistically indistinguishable from unexposed ground controls.</p>
      `
    },
    {
      id: 'microgravity-vascularized-organoids',
      title: 'Scaffold-Free 3D Bioprinting of Vascularized Cardiac Organoids in Zero-G',
      category: 'Microgravity Genomics',
      summary: 'Utilizing microgravity acoustic levitation and laser optical tweezers, functional human cardiac organoids were bioprinted with complete capillary micro-lumens devoid of hydrogel collapse.',
      readtime: '7 min read',
      author: 'Dr. S. K. Takahashi',
      authorRole: 'Director of Regenerative Micro-Physiology',
      date: 'August 30, 2026',
      doi: '10.1038/s41587-026-01582-b',
      featured: false,
      impact: 9.2,
      tags: ['Bioprinting', 'Organoids', 'Cardiac Tissue', 'Micro-Vascular'],
      cover: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h3 class="text-xl font-bold text-cyan-400 mb-3">Overcoming Terrestrial Structural Limits</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">On Earth, the fabrication of microvascular networks thinner than 150 microns requires sacrificial fugitive inks or rigid chemical scaffolds that impede cellular maturation. In the weightless environment of our orbital bioreactors, surface tension and cellular self-assembly dominate, allowing endothelial cells to spontaneously align into functional micro-lumens.</p>
        <p class="mb-4 text-slate-300 leading-relaxed">The resulting organoids demonstrated synchronized electrical field potentials and steady contractions at 72 bpm for over 90 days continuously in orbit.</p>
      `
    },
    {
      id: 'quantum-spin-cryptochrome',
      title: 'Radical Pair Spin Coherence in Human Cryptochrome 4 Photoreception',
      category: 'Quantum Enzymology',
      summary: 'Quantum mechanical simulations and femtosecond transient absorption verify that human Cry4 retains magnetic field sensitivity through flavin-tryptophan radical pair quantum entanglement.',
      readtime: '9 min read',
      author: 'Dr. Nadia Al-Mansoor',
      authorRole: 'Senior Quantum Biophysicist',
      date: 'August 14, 2026',
      doi: '10.1073/pnas.2604810123',
      featured: false,
      impact: 8.9,
      tags: ['Cryptochrome', 'Quantum Spin', 'Entanglement', 'Magneto-Biology'],
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h3 class="text-xl font-bold text-cyan-400 mb-3">Quantum Spin Dynamics</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">Cryptochromes have long been considered avian magnetoreceptors. Here we present definitive proof that recombinant human Cry4 expressed in microgravity bioreactors exhibits radical pair lifetime extensions under nano-Tesla magnetic perturbations, unlocking potential quantum-targeted bio-magnetic therapeutics.</p>
      `
    },
    {
      id: 'coherent-rna-transcription-kinetics',
      title: 'Coherent Phase Transitions in Long Non-Coding RNA Condensates',
      category: 'Synthetic Biology',
      summary: 'Microgravity liquid-liquid phase separation (LLPS) reveals that nuclear lncRNA condensates exhibit macroscopic quantum coherence that enhances polymerase recruitment by 320%.',
      readtime: '5 min read',
      author: 'Prof. Marcus Chen & Dr. L. Gomez',
      authorRole: 'Synthetic Epigenetics Group',
      date: 'July 22, 2026',
      doi: '10.1038/s41576-026-00492-c',
      featured: false,
      impact: 8.7,
      tags: ['RNA Condensates', 'Phase Separation', 'Coherence', 'Transcription'],
      cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h3 class="text-xl font-bold text-cyan-400 mb-3">Phase Separation Without Buoyancy</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">Terrestrial condensate studies suffer from rapid phase coalescence and gravitational settling. In orbit, sub-micron droplets remain uniformly dispersed, demonstrating Bose-like collective oscillatory behaviors that optimize transcription factor flux.</p>
      `
    },
    {
      id: 'quantum-tubulin-orchestration',
      title: 'Nanoscale Terahertz Resonance in Neuronal Microtubule Bundles',
      category: 'Quantum Enzymology',
      summary: 'High-speed terahertz spectroscopic interrogation validates coherent dipoles within neuronal tubulin lattices, establishing an empirical foundation for quantum signal transduction in neurons.',
      readtime: '11 min read',
      author: 'Dr. Henrik Lindqvist',
      authorRole: 'Neuro-Quantum Laboratory Lead',
      date: 'July 05, 2026',
      doi: '10.1016/j.neuron.2026.06.014',
      featured: false,
      impact: 9.1,
      tags: ['Microtubules', 'Terahertz', 'Neuroscience', 'Quantum Biology'],
      cover: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h3 class="text-xl font-bold text-cyan-400 mb-3">Investigating Cellular Cytoskeleton Electrodynamics</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">By subjecting purified mammalian tubulin polymers to 8.4 THz pulsed lasers in low-noise microgravity, we detected synchronized dipole moment oscillations across contiguous 10-micrometer filaments, demonstrating non-thermal energy transport throughout cytoskeleton lattices.</p>
      `
    },
    {
      id: 'orbital-bacterial-virulence-epigenomics',
      title: 'Epigenomic Remodeling and Virulence Attenuation of P. aeruginosa in LEO',
      category: 'Microgravity Genomics',
      summary: 'Multi-omic single-cell analysis shows that prolonged spaceflight causes stable cytosine methylation shifts that downregulate virulence operons while stimulating secondary metabolite synthesis.',
      readtime: '6 min read',
      author: 'Dr. Fatima Zahra',
      authorRole: 'Microbial Spaceflight Pathologist',
      date: 'June 18, 2026',
      doi: '10.1038/s41564-026-01290-x',
      featured: false,
      impact: 8.5,
      tags: ['Microbiology', 'Epigenomics', 'Pathogens', 'Spaceflight'],
      cover: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h3 class="text-xl font-bold text-cyan-400 mb-3">Orbital Adaptation Patterns</h3>
        <p class="mb-4 text-slate-300 leading-relaxed">Continuous culture across 120 bacterial generations under microgravity revealed surprising transcriptional reprogramming. Quorum sensing signaling molecules decreased by 74%, while silent biosynthetic gene clusters encoding novel polyketide antibiotics became actively transcribed.</p>
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
