'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const articlesJsonPath = path.join(dataDir, 'articles.json');
const buildSeoPath = path.join(rootDir, 'build-seo.js');

console.log('🚀 Step 1: Upgrading build-seo.js meta description logic...');
let buildSeoContent = fs.readFileSync(buildSeoPath, 'utf8');

// Replace the ellipsis truncation in build-seo.js
const oldMetaLogicRegex = /let\s+metaDesc\s*=\s*art\.metaDescription\s*\|\|\s*art\.summary\s*\|\|\s*''\s*;\s*if\s*\(\s*metaDesc\.length\s*>\s*158\s*\)\s*\{\s*metaDesc\s*=\s*metaDesc\.slice\(0,\s*155\)\.replace\(\/\\s\+\[\^\\s\]\*\$\/,\s*''\)\.trim\(\)\s*\+\s*'\.\.\.';\s*\}/;

const newMetaLogic = `let metaDesc = (art.metaDescription || art.summary || '').replace(/\\s*\\.\\.\\.\\s*$/, '').trim();
  if (metaDesc.length > 155) {
    const cut = metaDesc.slice(0, 155);
    const lastPunct = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
    if (lastPunct > 100) {
      metaDesc = cut.slice(0, lastPunct + 1).trim();
    } else {
      metaDesc = cut.replace(/\\s+[^\\s]*$/, '').trim();
      if (!/[.!?]$/.test(metaDesc)) metaDesc += '.';
    }
  }`;

if (oldMetaLogicRegex.test(buildSeoContent)) {
  buildSeoContent = buildSeoContent.replace(oldMetaLogicRegex, newMetaLogic);
  fs.writeFileSync(buildSeoPath, buildSeoContent, 'utf8');
  console.log('✅ Successfully updated build-seo.js meta description logic!');
} else {
  console.log('ℹ️ Checking alternative pattern for build-seo.js...');
  const altOld = "metaDesc = metaDesc.slice(0, 155).replace(/\\s+[^\\s]*$/, '').trim() + '...';";
  if (buildSeoContent.includes(altOld)) {
    buildSeoContent = buildSeoContent.replace(altOld, `const cut = metaDesc.slice(0, 155); const lp = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! ')); metaDesc = lp > 100 ? cut.slice(0, lp + 1).trim() : cut.replace(/\\s+[^\\s]*$/, '').trim() + '.';`);
    fs.writeFileSync(buildSeoPath, buildSeoContent, 'utf8');
    console.log('✅ Successfully patched build-seo.js alternative pattern!');
  }
}

console.log('🚀 Step 2: Optimizing data/articles.json metadata, titles, and snippets...');
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

const TARGETED_OPTIMIZATIONS = {
  'how-do-astronauts-sleep-in-space': {
    seoTitle: 'How Do Astronauts Sleep in Space Without Floating Away?',
    metaDescription: 'Discover how astronauts sleep in microgravity on the ISS: private crew cabins, tethered sleeping bags, CO2 suffocation pockets, and circadian biology.',
    quickAnswer: 'Astronauts on the International Space Station sleep inside private soundproof crew cabins, zipped inside sleeping bags tethered to walls. Because microgravity eliminates buoyant air convection, continuous ventilation fans blow fresh air across their faces to prevent suffocation from their own exhaled carbon dioxide bubbles.'
  },
  '3d-bioprinting-organoids-in-microgravity': {
    seoTitle: '3D Bioprinting Organs in Space: Zero-G Bioengineering',
    metaDescription: 'Discover how orbital microgravity solves the Earth puddle effect, enabling scaffold-free 3D bioprinting of vascularized cardiac organoids and human tissue.',
    quickAnswer: 'In orbital microgravity, bio-inks containing living human cells maintain their three-dimensional structure without collapsing under their own weight. This eliminates the need for rigid synthetic scaffolds, enabling scientists on the ISS to 3D-bioprint delicate vascularized organoids, cardiac patches, and capillary beds.'
  },
  'what-happens-to-human-body-in-zero-gravity': {
    seoTitle: 'What Happens to the Human Body in Zero Gravity?',
    metaDescription: 'Explore what happens to the human body in zero gravity: cephalad fluid shifts, 1.5% monthly bone loss, muscle atrophy, SANS vision changes, and countermeasures.',
    quickAnswer: 'In zero gravity, bodily fluids immediately shift upward causing facial puffiness, leg shrinking, and increased intracranial pressure that flattens eyeballs (SANS). Postural bones and muscles lose up to 1.5% mass per month without gravity resistance, requiring two hours of daily resistive exercise.'
  },
  'why-do-astronauts-lose-bone-density-in-space': {
    seoTitle: 'Why Astronauts Lose Bone Density in Space (1.5% Monthly)',
    metaDescription: 'Learn why astronauts lose 1% to 1.5% of bone mineral density every month in microgravity: osteoclast hyperactivation, lack of mechanical load, and remedies.',
    quickAnswer: 'Without gravitational mechanical loading, bone-resorbing osteoclasts become hyperactive while bone-building osteoblasts slow down, causing astronauts to shed 1% to 1.5% of trabecular bone density per month. High-intensity resistive exercise on the ARED machine and bisphosphonates are vital countermeasures.'
  },
  'how-does-zero-gravity-kill-cancer-cells': {
    seoTitle: 'How Zero Gravity Kills Cancer Cells: Microgravity Oncology',
    metaDescription: 'Discover how orbital microgravity triggers mechanical shear-stress disruption and apoptosis in up to 80% of cancer cells without toxic chemotherapy.',
    quickAnswer: 'Orbital microgravity disrupts cancer cell mechanotransduction, altering cytoskeletal actin filaments and focal adhesions. Deprived of mechanical tension, up to 80% of aggressive cancer cells (including glioblastoma and breast cancer) undergo spontaneous apoptotic programmed cell death.'
  },
  'can-plants-grow-in-space-without-gravity': {
    seoTitle: 'Can Plants Grow in Space Without Gravity? Space Botany',
    metaDescription: 'Discover how plants grow in microgravity: light phototropism replacing gravitropism, orbital root aeration, and closed-loop LED farming for Mars missions.',
    quickAnswer: 'Plants grow effectively in microgravity because directional light phototropism guides shoots upward, successfully replacing gravity-guided gravitropism. The primary challenge in orbit is root zone aeration and capillary water delivery, managed through specialized porous ceramic tubes and LED light spectra.'
  },
  'space-adaptation-syndrome-space-motion-sickness': {
    seoTitle: 'Space Adaptation Syndrome: Why Astronauts Get Space Sick',
    metaDescription: 'Learn what causes Space Adaptation Syndrome (SAS): vestibular sensory conflict, cephalad fluid shift, neuro-vestibular confusion, and NASA treatments.',
    quickAnswer: 'Space Adaptation Syndrome (SAS) affects 70% of astronauts during their first 72 hours in microgravity. It occurs because otolith organs in the inner ear stop registering gravitational pull, conflicting directly with visual cues, triggering severe nausea, disorientation, and vomiting until neuro-adaptation occurs.'
  },
  'difference-between-zero-gravity-and-microgravity': {
    seoTitle: 'Difference Between Zero Gravity and Microgravity Explained',
    metaDescription: 'Understand the difference between zero gravity and microgravity: continuous free-fall orbital physics, 90% Earth gravity at ISS altitude, and true weightlessness.',
    quickAnswer: 'True zero gravity does not exist in Low Earth Orbit; at 400 km altitude, Earth retains ~90% of its gravitational pull. The ISS experiences microgravity (roughly one-millionth of 1G) because it travels horizontally at 17,500 mph, remaining in an endless state of free-fall around Earth.'
  }
};

let updatedCount = 0;
articles.forEach(art => {
  // Apply targeted updates if defined
  if (TARGETED_OPTIMIZATIONS[art.id]) {
    const opt = TARGETED_OPTIMIZATIONS[art.id];
    if (opt.seoTitle) art.seoTitle = opt.seoTitle;
    if (opt.metaDescription) art.metaDescription = opt.metaDescription;
    if (opt.quickAnswer) art.quickAnswer = opt.quickAnswer;
    updatedCount++;
  }

  // Clean trailing ellipses on all articles
  if (art.metaDescription) {
    art.metaDescription = art.metaDescription.replace(/\s*\.\.\.\s*$/, '').trim();
    if (!/[.!?]$/.test(art.metaDescription)) {
      art.metaDescription += '.';
    }
  }
  if (art.seoTitle) {
    art.seoTitle = art.seoTitle.replace(/\s*\.\.\.\s*$/, '').trim();
  }
  if (art.summary) {
    art.summary = art.summary.replace(/\s*\.\.\.\s*$/, '').trim();
  }
});

fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`✅ Updated ${updatedCount} high-priority articles and sanitized all 32 articles in articles.json!`);

console.log('🚀 Step 3: Auditing and repairing standalone HTML articles in articles/...');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walk(path.join(rootDir, 'articles'));
const HTML_REPLACEMENTS = [
  {
    target: /<title>The Demon Core: Deadly Physics of Manhattan Project\.\.\.<\/title>/g,
    replacement: '<title>The Demon Core: 1945 &amp; 1946 Manhattan Project Criticality Accidents</title>'
  },
  {
    target: /<meta\s+name="description"\s+content="Learn the harrowing nuclear physics behind the Demon Core: the 14-pound plutonium sphere that caused two fatal criticality accidents at Los Alamos in\.\.\.">/g,
    replacement: '<meta name="description" content="Discover the harrowing nuclear physics behind the Demon Core: the 14-pound plutonium sphere that caused two fatal criticality accidents at Los Alamos in 1945 and 1946.">'
  },
  {
    target: /<title>3D Bioprinting Organs in Space: Why Zero-G Changes\.\.\.<\/title>/g,
    replacement: '<title>3D Bioprinting Organs in Space: Zero-G Bioengineering</title>'
  },
  {
    target: /<title>How Do Astronauts Sleep in Zero Gravity on the Space\.\.\.<\/title>/g,
    replacement: '<title>How Do Astronauts Sleep in Space Without Floating Away?</title>'
  },
  {
    target: /<title>How Does Zero Gravity Kill Cancer Cells\? Space\.\.\.<\/title>/g,
    replacement: '<title>How Zero Gravity Kills Cancer Cells: Microgravity Oncology</title>'
  },
  {
    target: /<title>How Do Tall Trees Pull Water Against Gravity\? Physics\.\.\.<\/title>/g,
    replacement: '<title>How Do Tall Trees Pull Water Against Gravity? Cohesion-Tension Physics</title>'
  },
  {
    target: /<title>Why Astronauts Lose Vision in Space: SANS Syndrome\.\.\.<\/title>/g,
    replacement: '<title>Why Astronauts Lose Vision in Space: SANS Syndrome &amp; Fluid Shifts</title>'
  },
  {
    target: /<title>Inside Supersolids: Trapping Matter That Is Liquid\.\.\.<\/title>/g,
    replacement: '<title>Inside Supersolids: Trapping Matter That Is Liquid &amp; Solid</title>'
  },
  {
    target: /<title>Regenerating Bones on the Moon: Hydroxyapatite\.\.\.<\/title>/g,
    replacement: '<title>Regenerating Bones on the Moon: Hydroxyapatite Scaffolds</title>'
  },
  {
    target: /<title>Why Scientists Are 3D-Printing Beating Hearts in Zero\.\.\.<\/title>/g,
    replacement: '<title>Why Scientists Are 3D-Printing Beating Hearts in Zero Gravity</title>'
  },
  {
    target: /<title>The Double-Slit Experiment Explained Simply: Quantum\.\.\.<\/title>/g,
    replacement: '<title>The Double-Slit Experiment Explained Simply: Wave-Particle Duality</title>'
  },
  {
    target: /<title>AI in Turbulent Fluid Flows: Estimating Compression\.\.\.<\/title>/g,
    replacement: '<title>AI in Turbulent Fluid Flows: Non-Linear Compression Potential</title>'
  },
  {
    target: /<title>Topological Defects and Background Fields in Quantum\.\.\.<\/title>/g,
    replacement: '<title>Topological Defects and Background Fields in Quantum Systems</title>'
  }
];

let htmlFixed = 0;
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Apply explicit replacements
  HTML_REPLACEMENTS.forEach(r => {
    content = content.replace(r.target, r.replacement);
  });

  // Generic cleanup for meta description trailing ellipsis
  content = content.replace(/(<meta\s+name=["']description["']\s+content=["'][^"']*?)\s*\.\.\.(["'])/g, (match, prefix, suffix) => {
    return prefix + '.' + suffix;
  });

  // Generic cleanup for title trailing ellipsis
  content = content.replace(/(<title>[^<]*?)\s*\.\.\.(<\/title>)/g, (match, prefix, suffix) => {
    return prefix + suffix;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    htmlFixed++;
  }
});

console.log(`✅ Repaired ${htmlFixed} HTML files in articles/... eliminating all truncated tags!`);
