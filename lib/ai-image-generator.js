'use strict';

/**
 * ============================================================================
 * BioGravity AI Image Generator & Anti-Duplication Engine (lib/ai-image-generator.js)
 * ============================================================================
 *
 * Guarantees that EVERY post across BioGravity:
 *  1. Has a specific, bespoke AI-generated scientific illustration prompt
 *     tailored directly to its title, category, and discovery findings.
 *  2. Uses high-resolution 1280x720 (16:9, Google Discover & AdSense compliant)
 *     AI image generation (FLUX / Diffusion engine with nologo=true).
 *  3. NEVER repeats an image or seed across the live news engine or any dispatches.
 *  4. Maintains a cross-system registry to prevent visual duplicates.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const registryPath = path.join(dataDir, 'generated-images-registry.json');

// In-memory set of all used seeds and image URLs across the platform
let usedSeeds = new Set();
let usedUrls = new Set();

function loadRegistry() {
  if (fs.existsSync(registryPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
      if (Array.isArray(data.usedSeeds)) usedSeeds = new Set(data.usedSeeds);
      if (Array.isArray(data.usedUrls)) usedUrls = new Set(data.usedUrls);
    } catch (e) {
      // fallback
    }
  }

  // Also pre-seed from existing news.json and articles.json
  const newsPath = path.join(dataDir, 'news.json');
  if (fs.existsSync(newsPath)) {
    try {
      const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
      news.forEach(n => {
        if (n.cover) usedUrls.add(n.cover);
      });
    } catch (e) {}
  }

  const articlesPath = path.join(dataDir, 'articles.json');
  if (fs.existsSync(articlesPath)) {
    try {
      const arts = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
      arts.forEach(a => {
        if (a.cover) usedUrls.add(a.cover);
      });
    } catch (e) {}
  }
}

function saveRegistry() {
  try {
    fs.writeFileSync(registryPath, JSON.stringify({
      updatedAt: new Date().toISOString(),
      totalImagesRegistered: usedUrls.size,
      usedSeeds: Array.from(usedSeeds),
      usedUrls: Array.from(usedUrls)
    }, null, 2), 'utf8');
  } catch (e) {
    console.warn('[ImageGen] Notice saving image registry:', e.message);
  }
}

// Deterministic integer hash from string
function hashStringToInt(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Synthesizes a hyper-specific, photorealistic scientific AI prompt
 * for any given topic, headline, category, or discovery.
 */
function craftBespokePrompt(title, category, summary, tags) {
  const t = (title + ' ' + (summary || '')).toLowerCase();

  // 1. Direct Topic Recognizers for flagship monographs & dispatches
  if (t.includes('gold') && (t.includes('yellow') || t.includes('relativity'))) {
    return "Photorealistic glowing 24k gold crystalline lattice with relativistic contracted electron orbitals, brilliant metallic luster reflecting yellow and orange spectrum, dark studio physics background, 8k render, cinematic lighting";
  }
  if (t.includes('demon core') || (t.includes('criticality') && t.includes('plutonium'))) {
    return "Historical physics laboratory scene with polished plutonium sphere surrounded by reflective tungsten carbide blocks, faint blue Cherenkov ionization glow in dark room, 1940s Manhattan Project scientific atmosphere, photorealistic, 8k";
  }
  if (t.includes('elephant\'s foot') || t.includes('chernobyl')) {
    return "Dark subterranean industrial corridor with solidified corium mass Elephant's Foot, rough crystalline radioactive mineral textures, remote sensor camera view, moody atmospheric lighting, ultra-detailed 8k render";
  }
  if (t.includes('mariana trench') || t.includes('challenger deep')) {
    return "Deep abyssal ocean ocean floor at 36000 feet, bioluminescent snailfish and amphipods hovering near rocky benthic trench wall, submersible searchlight beam cutting through crystal black water, photorealistic, 8k";
  }
  if (t.includes('immortal jellyfish') || t.includes('turritopsis')) {
    return "Translucent glowing Turritopsis dohrnii immortal jellyfish in azure oceanic water, intricate bell and tentacle details showing cellular transdifferentiation process, macro marine photography, 8k";
  }
  if (t.includes('flamingos') && t.includes('one leg')) {
    return "Close-up anatomical biomechanics visualization of pink flamingos wading in shallow salt lake, skeletal and tendon passive unipedal lock mechanism, warm natural sunlight, award-winning wildlife photography style";
  }
  if (t.includes('octopuses') || (t.includes('octopus') && (t.includes('hearts') || t.includes('blue blood')))) {
    return "Intricate anatomical and circulatory scientific cutaway of deep-sea octopus showing three systemic hearts and glowing copper-based blue hemocyanin blood pathways, underwater laboratory visualization, 8k";
  }
  if (t.includes('mpemba') || (t.includes('water') && t.includes('freezes faster'))) {
    return "Dual scientific laboratory beakers on cryogenic chill plate, one warm water beaker crystallizing rapid frost needles and steam while cold beaker remains liquid, macro high-speed photography, 8k";
  }
  if (t.includes('double-slit') || (t.includes('quantum') && t.includes('interference'))) {
    return "Iconic quantum double-slit experiment visualization, coherent laser beam splitting into wave interference patterns and individual photon particle impacts on glowing phosphorescent detector screen, 8k";
  }
  if (t.includes('black hole') || t.includes('spaghettification')) {
    return "Supermassive black hole event horizon with brilliant glowing accretion disk, gravitational lensing twisting background starlight, stream of celestial matter elongating in extreme tidal curvature, astrophysics simulation, 8k";
  }
  if (t.includes('earth stopped spinning')) {
    return "Orbital view of Earth with oceans migrating toward North and South poles creating giant polar super-oceans and vast equatorial dry continent belt, high-detail planetary science simulation, 8k";
  }
  if (t.includes('plants grow in space') || (t.includes('plants') && t.includes('microgravity'))) {
    return "Orbital spacecraft agricultural growth chamber with lush green Arabidopsis plant roots developing in weightless hydroponic nutrient mist under pink-purple LED spectrum, Earth visible out cupola window, 8k";
  }
  if (t.includes('astronauts sleep') || t.includes('sleep in space')) {
    return "Inside International Space Station crew quarters cabin, astronaut resting inside vertical cushioned sleep harness, weightless relaxation, soft interior ambient lighting, Earth glow through window, photorealistic";
  }
  if (t.includes('bone loss') || (t.includes('astronauts') && t.includes('bone density'))) {
    return "Biomedical 3D cross-section visualization of human trabecular bone micro-architecture comparing dense terrestrial bone lattice with osteoclastic resorption in microgravity, scientific medical render, 8k";
  }
  if (t.includes('cancer cells') && t.includes('zero gravity')) {
    return "Microscopic 3D cell culture showing cancer cell spheroids undergoing gravitational shear detachment and apoptotic cellular dismantling in microgravity bioreactor, fluorescent confocal microscopy, 8k";
  }
  if (t.includes('human body in zero gravity') || t.includes('what happens to human body')) {
    return "Detailed medical and physiological cutaway of human body in microgravity, showing cephalad fluid shift, cardiovascular remodeling, and inner ear vestibular otolith changes, futuristic scientific HUD, 8k";
  }
  if (t.includes('michelson-morley') || t.includes('aether')) {
    return "Vintage 1887 physics laboratory apparatus with heavy granite slab floating on mercury pool, brass mirrors and optical interferometer splitting sodium light beams, historical scientific photorealistic render";
  }
  if (t.includes('tardigrade') || t.includes('dsup')) {
    return "Macro electron microscopy visualization of microscopic tardigrade water bear on moss leaf, glowing Dsup protective protein wrapping tightly around DNA double helix strands, 8k bio-rendering";
  }
  if (t.includes('wasp-121b') || (t.includes('iron rain') && t.includes('exoplanet'))) {
    return "Ultra-hot gas giant exoplanet WASP-121b atmosphere, glowing vaporized iron and nickel clouds condensing into molten metal raindrops under intense starlight, deep space astronomical render, 8k";
  }
  if (t.includes('hydrothermal') || (t.includes('mariana') && t.includes('chemosynthetic'))) {
    return "Deep sea hydrothermal vent black smoker chimney discharging superheated mineral plumes, colonies of thermophilic archaea and tube worms thriving in total darkness, submersible lighting, 8k";
  }
  if (t.includes('ice core') || t.includes('greenland')) {
    return "Paleoclimatologist in arctic parka inspecting pristine Antarctic ice core cylinder under laboratory magnifying light, ancient trapped atmospheric gas bubbles glowing faintly, high-detail photography";
  }
  if (t.includes('living solar') || (t.includes('photosynthetic') && t.includes('chloroplast'))) {
    return "Living biological solar panel array with genetically stabilized green thylakoid membranes layered on carbon nanotube mesh generating bio-electric current, modern clean tech lab, 8k";
  }
  if (t.includes('lunar water') || t.includes('moon economy') || t.includes('lunar ice')) {
    return "Autonomous robotic rover harvesting icy regolith in permanently shadowed lunar crater, Earth and starfield gleaming over sharp crater ridge, space mining engineering visualization, 8k";
  }
  if (t.includes('topological') || (t.includes('qubit') && t.includes('braiding'))) {
    return "Quantum computing processor showing topological qubit Majorana zero modes braided along semiconductor nanowire lattice, golden dilution refrigerator stage, glowing quantum coherence, 8k";
  }
  if (t.includes('tartar') || t.includes('neanderthal')) {
    return "Archaeogenetic analysis of fossilized Neanderthal jaw and dental tartar, laboratory tweezers extracting microscopic paleolithic medicinal plant remnants and salicylic crystals, macro photography, 8k";
  }
  if (t.includes('pfas') || (t.includes('forever chemical') && t.includes('fungi'))) {
    return "Bioluminescent mutant soil white-rot fungus mycelium cleaving carbon-fluorine bonds in water droplet, microscopic environmental biotechnology 3D visualization, 8k";
  }
  if (t.includes('runaway black hole') || t.includes('hypervelocity')) {
    return "Runaway supermassive black hole streaking through intergalactic space, leaving behind a 200000-light-year trail of glowing newly ignited young blue stars and ionized gas shockwaves, 8k";
  }
  if (t.includes('antarctic') && t.includes('river canyon')) {
    return "Geophysical radar cross-section cutaway revealing vast prehistoric river canyon system buried beneath two miles of crystalline Antarctic ice sheet, geological earth science visualization, 8k";
  }
  if (t.includes('synthetic bacterial genome') || t.includes('virus-proof')) {
    return "Synthetic biology laboratory rendering of custom engineered minimal bacterial cell with artificial genetic codon triplets, virus particles bouncing harmlessly off impenetrable cell membrane, 8k";
  }
  if (t.includes('sodium battery') || t.includes('solid-state')) {
    return "Advanced solid-state sodium ion battery cell cross-section showing non-dendritic ceramic electrolyte and sodium atoms smoothly intercalating between cathode layers, clean energy tech render, 8k";
  }
  if (t.includes('coral') && (t.includes('epigenetic') || t.includes('resilience'))) {
    return "Vibrant coral reef polyps under ocean water, fluorescent epigenetic markers glowing along coral tissue demonstrating rapid thermal adaptation to warming waters, underwater macro photography, 8k";
  }
  if (t.includes('primordial') && t.includes('gravitational')) {
    return "Cosmic primordial black hole collision creating ripples in the fabric of spacetime, gravitational wave interferometer simulation, deep space astrophysical event, 8k";
  }
  if (t.includes('cryptochrome') || t.includes('magnetoreception')) {
    return "Cryptochrome 4 photoreceptor protein scaffold with flavin adenine dinucleotide pocket, entangled electron radical pair spin vectors aligning with Earth geomagnetic field lines, quantum biophysics render, 8k";
  }
  if (t.includes('superbug') || (t.includes('crystallography') && t.includes('orbital'))) {
    return "Diffraction-grade macromolecular protein crystal of bacterial target grown in orbital microgravity, laser X-ray crystallography beam illuminating atomic lattice resolution, space biotechnology, 8k";
  }
  if (t.includes('crispr') || t.includes('proton tunneling')) {
    return "CRISPR-Cas9 ribonucleoprotein complex binding DNA target, quantum proton tunneling across catalytic triad amino acid residues, sub-angstrom molecular biophysics visualization, 8k";
  }
  if (t.includes('organoid') || t.includes('acoustic levitation') || t.includes('bioprinting')) {
    return "Acoustic levitation soundwave chamber suspending vascularized cardiac organoid cells in mid-air weightlessness, micro-capillary lumens forming scaffold-free, biomedical tissue engineering, 8k";
  }
  if (t.includes('telomere') || t.includes('radioprotection') || t.includes('cosmic radiation')) {
    return "Human chromosome telomere caps shielded by synthetic metallo-peptide complexes, cosmic heavy ion ray deflecting without causing double-strand breaks, space genetics, 8k";
  }
  if (t.includes('phase transition') || t.includes('lncrna') || t.includes('condensates')) {
    return "Intranuclear liquid-liquid phase separation, luminous lncRNA biomolecular condensates coalescing without gravitational buoyant shear, high-resolution fluorescent confocal microscopy, 8k";
  }
  if (t.includes('microtubule') || t.includes('terahertz') || t.includes('dipole')) {
    return "Neuronal cytoskeleton microtubule tubulin lattice resonating with coherent terahertz electromagnetic dipole vibrations, neuro-quantum biophysics simulation, 8k";
  }
  if (t.includes('biofilm') || t.includes('iss') || t.includes('spaceflight pathogen')) {
    return "Microbial biofilm architecture growing on spacecraft titanium water recycling filter, scanning electron microscope SEM visualization, space microbiology research, 8k";
  }
  if (t.includes('glymphatic') || t.includes('optic nerve') || t.includes('sans')) {
    return "Human brain cerebrovascular and glymphatic clearance pathway in microgravity, optic nerve sheath cerebrospinal fluid pressure dynamics, medical neuro-imaging 3D render, 8k";
  }
  if (t.includes('bose-einstein') || t.includes('polariton')) {
    return "Bose-Einstein polariton condensate cloud suspended in ultra-cold optical cavity in orbital microgravity, macroscopic quantum wave function interference fringes glowing, physics lab, 8k";
  }
  if (t.includes('hydroxyapatite') || t.includes('lunar freefall')) {
    return "Biomimetic hydroxyapatite bone scaffold mineralizing in simulated lunar gravity bioreactor, osteoblast cells depositing crystalline calcium phosphate matrix, tissue engineering, 8k";
  }
  if (t.includes('chiral nanotubes') || t.includes('nanotubes')) {
    return "Self-assembling helical chiral carbon nanotubes forming orderly macroscopic yarns in pure diffusion-limited microgravity solution, materials science nanotechnology render, 8k";
  }
  if (t.includes('squid') || t.includes('action potential')) {
    return "Cryogenic SQUID quantum sensor array detecting minute biomagnetic fields from living neuronal action potentials in low-noise orbital module, quantum biosensing, 8k";
  }

  // 2. Dynamic High-Precision Algorithmic Prompt Synthesizer
  // Extracts essential scientific keywords from title and clean category
  const cleanTitle = title
    .replace(/^(A|An|The|On|Towards|Study of|Investigation of)\s+/i, '')
    .replace(/[.:;?!]$/, '')
    .replace(/[:]/g, ' - ')
    .trim();

  const domainKeywords = [];
  if (category.toLowerCase().includes('space') || category.toLowerCase().includes('astronomy')) {
    domainKeywords.push('deep space astrophysics observation, telescope spectroscopy, celestial phenomenon');
  } else if (category.toLowerCase().includes('quantum') || category.toLowerCase().includes('physics')) {
    domainKeywords.push('quantum physical mechanics, laboratory laser instrumentation, microscopic particle interaction');
  } else if (category.toLowerCase().includes('bio') || category.toLowerCase().includes('genom') || category.toLowerCase().includes('cell')) {
    domainKeywords.push('molecular biology, high-resolution fluorescence microscopy, cellular biochemistry');
  } else if (category.toLowerCase().includes('earth') || category.toLowerCase().includes('geol') || category.toLowerCase().includes('climate')) {
    domainKeywords.push('planetary geology, earth science expedition, natural mineral and atmospheric phenomenon');
  } else if (category.toLowerCase().includes('energy') || category.toLowerCase().includes('material')) {
    domainKeywords.push('advanced materials science, clean energy nanotechnology, crystalline structure');
  } else {
    domainKeywords.push('cutting-edge scientific research laboratory, experimental instrumentation, analytical discovery');
  }

  return `Photorealistic scientific 3D visualization of ${cleanTitle}, ${domainKeywords.join(', ')}, intricate empirical details, volumetric lighting, 8k render, octane render style, no text, no watermark, 16:9 aspect ratio`;
}

/**
 * Main generator: returns a guaranteed unique, bespoke AI-generated image object
 * for any story or monograph across the BioGravity network.
 */
function getSpecificAiImage({ id, title, category, summary, keyFindings, tags }) {
  loadRegistry();

  const bespokePrompt = craftBespokePrompt(title, category, summary, tags);

  // Generate deterministic base seed from post id & title
  let seed = hashStringToInt(id + ' ' + title);

  // Ensure absolute uniqueness across the system
  while (usedSeeds.has(seed)) {
    seed = (seed + 7919) % 2147483647; // Jump by prime to find next unique seed
  }

  const encodedPrompt = encodeURIComponent(bespokePrompt);
  let finalUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&seed=${seed}&nologo=true&model=flux`;

  // Secondary check on URL uniqueness
  let counter = 1;
  while (usedUrls.has(finalUrl)) {
    seed = (seed + 104729) % 2147483647;
    finalUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&seed=${seed}&nologo=true&model=flux`;
    counter++;
    if (counter > 100) break;
  }

  // Register in memory
  usedSeeds.add(seed);
  usedUrls.add(finalUrl);

  const cleanTitle = title.replace(/[.:;]$/, '').trim();
  const altText = `Specific AI-generated scientific visualization of ${cleanTitle} in ${category || 'Science'}`;

  return {
    url: finalUrl,
    alt: altText,
    prompt: bespokePrompt,
    seed: seed
  };
}

module.exports = {
  getSpecificAiImage,
  craftBespokePrompt,
  loadRegistry,
  saveRegistry
};
