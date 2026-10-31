'use strict';

const fs = require('fs');
const path = require('path');

const buildSeoPath = path.join(__dirname, '..', 'build-seo.js');
let code = fs.readFileSync(buildSeoPath, 'utf8');

// 1. Add contextual cross-linking map and helper before renderArticleBody
const crossLinkHelper = `
const CONTEXTUAL_KEYWORD_LINKS = [
  { phrase: 'cohesion-tension theory', url: '/articles/how-do-tall-trees-pull-water-against-gravity' },
  { phrase: 'xylem cavitation', url: '/articles/how-do-tall-trees-pull-water-against-gravity' },
  { phrase: 'Special Theory of Relativity', url: '/articles/why-is-gold-yellow-relativistic-quantum-chemistry' },
  { phrase: 'relativistic contraction', url: '/articles/why-is-gold-yellow-relativistic-quantum-chemistry' },
  { phrase: 'luminiferous aether', url: '/articles/michelson-morley-experiment-disproved-the-aether' },
  { phrase: 'Michelson-Morley experiment', url: '/articles/michelson-morley-experiment-disproved-the-aether' },
  { phrase: 'Fermi paradox', url: '/articles/fermi-paradox-where-are-all-the-aliens' },
  { phrase: 'Great Filter', url: '/articles/fermi-paradox-where-are-all-the-aliens' },
  { phrase: 'Kola Superdeep Borehole', url: '/articles/kola-superdeep-borehole-deepest-hole-on-earth' },
  { phrase: 'Demon Core', url: '/articles/the-demon-core-manhattan-project-criticality-accidents' },
  { phrase: 'prompt supercriticality', url: '/articles/the-demon-core-manhattan-project-criticality-accidents' },
  { phrase: 'Mpemba effect', url: '/articles/mpemba-effect-why-hot-water-freezes-faster-than-cold' },
  { phrase: "Schrödinger's cat", url: '/articles/schrodingers-cat-quantum-physics-paradox-explained' },
  { phrase: 'hemocyanin', url: '/articles/why-do-octopuses-have-three-hearts-and-blue-blood' },
  { phrase: 'Mariana Trench', url: '/articles/mariana-trench-challenger-deep-creatures-pressure' },
  { phrase: 'Challenger Deep', url: '/articles/mariana-trench-challenger-deep-creatures-pressure' },
  { phrase: 'Turritopsis dohrnii', url: '/articles/immortal-jellyfish-turritopsis-dohrnii-biological-immortality' },
  { phrase: 'cellular transdifferentiation', url: '/articles/immortal-jellyfish-turritopsis-dohrnii-biological-immortality' },
  { phrase: 'Elephant\\'s Foot', url: '/articles/chernobyl-elephants-foot-deadliest-radioactive-mass' },
  { phrase: 'double-slit experiment', url: '/articles/the-double-slit-experiment-quantum-mechanics-explained' },
  { phrase: 'wave-particle duality', url: '/articles/the-double-slit-experiment-quantum-mechanics-explained' },
  { phrase: 'spaghettification', url: '/articles/what-happens-if-you-fall-into-a-black-hole-spaghettification' },
  { phrase: '3D bioprinting', url: '/articles/3d-bioprinting-organoids-in-microgravity' },
  { phrase: 'space motion sickness', url: '/articles/space-motion-sickness-space-adaptation-syndrome-vestibular' },
  { phrase: 'grow in space', url: '/articles/can-plants-grow-in-space-without-gravity' },
  { phrase: 'sleep in space', url: '/articles/how-do-astronauts-sleep-in-space-zero-gravity' },
  { phrase: 'bone density in space', url: '/articles/why-do-astronauts-lose-bone-density-in-space' },
  { phrase: 'zero gravity and microgravity', url: '/articles/difference-between-zero-gravity-and-microgravity' },
  { phrase: 'human body in zero gravity', url: '/articles/what-happens-to-human-body-in-zero-gravity' },
  { phrase: 'cryptochrome 4', url: '/articles/radical-pair-spin-coherence-and-magnetoreception-in-human-cryptochrome-4-photore' },
  { phrase: 'Pseudomonas aeruginosa biofilms', url: '/articles/microbial-biofilm-antibiotic-resistance-iss-closed-loop-habitats' },
  { phrase: 'SANS syndrome', url: '/articles/cerebrovascular-glymphatic-clearance-microgravity-optic-nerve-syndrome' },
  { phrase: 'Bose-Einstein', url: '/articles/bose-einstein-polariton-condensation-orbital-microgravity' },
  { phrase: 'Dsup protein', url: '/articles/tardigrade-dsup-protein-chromatin-radioprotective-compaction' },
  { phrase: 'acoustic levitation', url: '/articles/acoustic-levitation-and-scaffold-free-vascularized-cardiac-organoid-bioprinting-' }
];

function injectContextualLinks(html, currentArticleId) {
  let result = html;
  for (const item of CONTEXTUAL_KEYWORD_LINKS) {
    if (item.url.includes(currentArticleId)) continue;
    // Match the phrase only once, outside HTML tags
    const regex = new RegExp('(?<!<[^>]*)\\\\b(' + item.phrase.replace(/[-/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&') + ')\\\\b(?![^<]*>)', 'i');
    if (regex.test(result)) {
      result = result.replace(regex, '<a href="' + item.url + '" class="text-teal-700 hover:text-teal-900 underline font-medium">$1</a>');
    }
  }
  return result;
}
`;

// Insert crossLinkHelper if not already present
if (!code.includes('CONTEXTUAL_KEYWORD_LINKS')) {
  code = code.replace('function renderArticleBody(art) {', crossLinkHelper + '\nfunction renderArticleBody(art) {');
}

// 2. Sanitize and inject contextual links in renderArticleBody
const oldRenderReturn = `  if (!full.includes('Plain-English Concept Explainer')) {
    full += generateEducationalEnrichment(art);
  }

  return full;
}`;

const newRenderReturn = `  if (!full.includes('Plain-English Concept Explainer')) {
    full += generateEducationalEnrichment(art);
  }

  // Sanitize low-contrast colors
  full = full
    .replace(/\\btext-slate-300\\b/g, 'text-slate-700')
    .replace(/(<p[^>]*class="[^"]*)\\btext-slate-400\\b([^"]*")/g, '$1text-slate-600$2')
    .replace(/\\btext-cyan-400\\b/g, 'text-teal-700 font-bold')
    .replace(/\\btext-emerald-400\\b/g, 'text-emerald-800 font-bold')
    .replace(/\\btext-amber-400\\b/g, 'text-amber-800 font-bold');

  return injectContextualLinks(full, art.id);
}`;

code = code.replace(oldRenderReturn, newRenderReturn);

// Also handle the art.content branch in renderArticleBody
const oldBodyReturn = `    if (!body.includes('Plain-English Concept Explainer')) {
      body += generateEducationalEnrichment(art);
    }
    return body;`;

const newBodyReturn = `    if (!body.includes('Plain-English Concept Explainer')) {
      body += generateEducationalEnrichment(art);
    }
    body = body
      .replace(/\\btext-slate-300\\b/g, 'text-slate-700')
      .replace(/(<p[^>]*class="[^"]*)\\btext-slate-400\\b([^"]*")/g, '$1text-slate-600$2')
      .replace(/\\btext-cyan-400\\b/g, 'text-teal-700 font-bold')
      .replace(/\\btext-emerald-400\\b/g, 'text-emerald-800 font-bold')
      .replace(/\\btext-amber-400\\b/g, 'text-amber-800 font-bold');
    return injectContextualLinks(body, art.id);`;

code = code.replace(oldBodyReturn, newBodyReturn);

// 3. Fix Related Articles and smart title formatting in article loop
const oldRelatedBlock = `  // Related articles
  const relatedArticles = articles.filter(a => a.id !== art.id).slice(0, 3);
  const relatedHtml = relatedArticles.map(rel => \`
    <a href="/articles/\${encodeURIComponent(rel.id)}" class="ux-card block p-3.5 border border-slate-200/80 hover:border-slate-300 transition group">
      <div class="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">\${escapeHtml(rel.category)}</div>
      <div class="text-xs font-display font-semibold text-slate-900 group-hover:text-teal-600 transition line-clamp-2 mt-1 leading-snug">\${escapeHtml(rel.seoTitle || rel.title)}</div>
      <div class="text-[10px] text-slate-400 mt-1.5 font-medium">\${escapeHtml(rel.readtime || '8 min read')} • \${escapeHtml(rel.date)}</div>
    </a>
  \`).join('\\n');

  // Tags HTML
  const tagsHtml = tags.map(t => \`
    <a href="/research?q=\${encodeURIComponent(t)}" rel="nofollow" class="text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition font-medium">
      #\${escapeHtml(t)}
    </a>
  \`).join('\\n');

  let cleanSeoTitle = (art.seoTitle || art.title).replace(/\\s*\\|\\s*BioGravity.*$/i, '').trim();
  if (cleanSeoTitle.length > 52) {
    cleanSeoTitle = cleanSeoTitle.slice(0, 52).replace(/\\s+[^\\s]*$/, '').trim();
  }
  const displayTitle = \`\${escapeHtml(cleanSeoTitle)} | BioGravity\`;
  const socialTitle = escapeHtml(art.seoTitle || art.title);`;

const newRelatedBlock = `  // Smart category & semantic cluster interlinking (ends the orphan problem)
  const sameCategory = articles.filter(a => a.id !== art.id && a.category === art.category);
  const otherArticles = articles.filter(a => a.id !== art.id && a.category !== art.category);
  const artIdx = articles.findIndex(a => a.id === art.id);
  const rotatedOthers = [];
  for (let i = 1; i <= articles.length; i++) {
    const candidate = articles[(artIdx + i) % articles.length];
    if (candidate && candidate.id !== art.id && !sameCategory.includes(candidate)) {
      rotatedOthers.push(candidate);
    }
  }
  const relatedArticles = [...sameCategory, ...rotatedOthers].slice(0, 4);
  const relatedHtml = relatedArticles.map(rel => \`
    <a href="/articles/\${encodeURIComponent(rel.id)}" class="ux-card block p-3.5 border border-slate-200/80 hover:border-slate-300 transition group">
      <div class="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">\${escapeHtml(rel.category)}</div>
      <div class="text-xs font-display font-semibold text-slate-900 group-hover:text-teal-600 transition line-clamp-2 mt-1 leading-snug">\${escapeHtml(rel.seoTitle || rel.title)}</div>
      <div class="text-[10px] text-slate-400 mt-1.5 font-medium">\${escapeHtml(rel.readtime || '8 min read')} • \${escapeHtml(rel.date)}</div>
    </a>
  \`).join('\\n');

  // Tags HTML
  const tagsHtml = tags.map(t => \`
    <a href="/research?q=\${encodeURIComponent(t)}" rel="nofollow" class="text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition font-medium">
      #\${escapeHtml(t)}
    </a>
  \`).join('\\n');

  // Smart high-CTR title generator without awkward truncation
  let cleanSeoTitle = (art.seoTitle || art.title).replace(/\\s*\\|\\s*BioGravity.*$/i, '').trim();
  if (cleanSeoTitle.length + 13 > 65) {
    const separators = ['? ', ': ', ' - ', ' — '];
    let splitMatched = false;
    for (const sep of separators) {
      if (cleanSeoTitle.includes(sep)) {
        const parts = cleanSeoTitle.split(sep);
        let lead = parts[0].trim();
        if (sep.startsWith('?')) lead += '?';
        if (lead.length >= 20 && lead.length + 13 <= 65) {
          cleanSeoTitle = lead;
          splitMatched = true;
          break;
        }
      }
    }
    if (!splitMatched && cleanSeoTitle.length > 52) {
      cleanSeoTitle = cleanSeoTitle.slice(0, 52).replace(/\\s+[^\\s]*$/, '').trim();
      const stopWords = /\\b(the|a|an|of|in|on|for|and|to|with|at|from|by|is|did|what|how|why|its|it|their|our)\\b$/i;
      while (stopWords.test(cleanSeoTitle)) {
        cleanSeoTitle = cleanSeoTitle.replace(stopWords, '').trim();
      }
      cleanSeoTitle = cleanSeoTitle.replace(/[:,-–—]+$/, '').trim();
    }
  }
  const displayTitle = \`\${escapeHtml(cleanSeoTitle)} | BioGravity\`;
  const socialTitle = escapeHtml(art.seoTitle || art.title);`;

code = code.replace(oldRelatedBlock, newRelatedBlock);

// 4. Fix index.html archive replacement
const oldIndexReplace = `  if (indexHtml.includes('id="complete-orbital-archive"')) {
    indexHtml = indexHtml.replace(/<!-- Complete Orbital Research Archive[\\s\\S]*?<\\/div>\\s*<\\/div>\\s*<\\/div>/i, allArticlesArchiveHtml.trim() + '\\n        </div>');
  } else {
    // Insert before closing of the featured dispatches section
    indexHtml = indexHtml.replace(/(<\\/div>\\s*<\\/div>\\s*<\\/section>\\s*<\\/main>)/i, \`\${allArticlesArchiveHtml}\\n      $1\`);
  }`;

const newIndexReplace = `  if (indexHtml.includes('id="complete-orbital-archive"')) {
    indexHtml = indexHtml.replace(/(?:<!--[\\s\\S]*?-->\\s*)?<div id="complete-orbital-archive"[\\s\\S]*?<\\/div>\\s*<\\/div>\\s*(?=\\s*<\\/div>\\s*<\\/section>)/i, allArticlesArchiveHtml.trim());
  } else {
    // Insert before closing of the featured dispatches section
    indexHtml = indexHtml.replace(/(<\\/div>\\s*<\\/div>\\s*<\\/section>\\s*<\\/main>)/i, \`\${allArticlesArchiveHtml}\\n      $1\`);
  }`;

code = code.replace(oldIndexReplace, newIndexReplace);

fs.writeFileSync(buildSeoPath, code, 'utf8');
console.log('build-seo.js successfully patched with smart titles, cluster related articles, contextual linking, and homepage grid fix!');
