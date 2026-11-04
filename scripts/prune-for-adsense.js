'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const ARTICLES_JSON = path.join(DATA_DIR, 'articles.json');
const NEWS_JSON = path.join(DATA_DIR, 'news.json');
const ARTICLES_DIR = path.join(ROOT_DIR, 'articles');
const NEWS_DIR = path.join(ROOT_DIR, 'news');
const ARCHIVE_DIR = path.join(ROOT_DIR, 'archive');

if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
if (!fs.existsSync(path.join(ARCHIVE_DIR, 'articles'))) fs.mkdirSync(path.join(ARCHIVE_DIR, 'articles'), { recursive: true });
if (!fs.existsSync(path.join(ARCHIVE_DIR, 'news'))) fs.mkdirSync(path.join(ARCHIVE_DIR, 'news'), { recursive: true });

console.log('=== Step 1: Backing up current JSON data ===');
const articlesRaw = fs.readFileSync(ARTICLES_JSON, 'utf8');
const newsRaw = fs.readFileSync(NEWS_JSON, 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'articles.backup-pre-adsense.json'), articlesRaw, 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'news.backup-pre-adsense.json'), newsRaw, 'utf8');

const articles = JSON.parse(articlesRaw);
const news = JSON.parse(newsRaw);

console.log(`Original articles: ${articles.length}`);
console.log(`Original news: ${news.length}`);

// -------------------------------------------------------------
// Off-topic viral trivia and unreadable arXiv math papers to prune
// -------------------------------------------------------------
const offTopicOrLowValueIds = new Set([
  'why-do-flamingos-stand-on-one-leg',
  'kola-superdeep-borehole-deepest-hole-on-earth',
  'the-demon-core-manhattan-project-criticality-accidents',
  'mpemba-effect-why-hot-water-freezes-faster-than-cold',
  'schrodingers-cat-quantum-physics-paradox-explained',
  'why-do-octopuses-have-three-hearts-and-blue-blood',
  'mariana-trench-challenger-deep-creatures-pressure',
  'immortal-jellyfish-turritopsis-dohrnii-biological-immortality',
  'what-would-happen-if-earth-stopped-spinning',
  'chernobyl-elephants-foot-deadliest-radioactive-mass',
  'double-slit-experiment-quantum-mechanics-explained',
  'what-happens-if-you-fall-into-a-black-hole',
  'why-is-gold-yellow-relativistic-quantum-chemistry',
  'michelson-morley-experiment-disproved-the-aether',
  'what-statement-about-risks-in-social-and-behavioral-sciences-research-is-most-accurate',
  'size-independent-logarithmic-sobolev-inequalities-for-quantum',
  'mixed-state-deep-thermalization-under-generic-quantum-errors',
  'screening-strongly-correlated-materials-in-solid-oxide-cells',
  'estimation-non-linear-compression-potential',
  'quantum-parameter-estimation-no-go-result',
  'phonon-assisted-free-electron-recoil-control-and-mechanical-sensing',
  'supersolid-phase-transitions-trapped-quantum-gases',
  'ideal-interaction-dynamics-of-defects-and-background-fields-in',
  'maximal-orbital-entanglement-from-non-interacting-fermions'
]);

const keptArticles = articles.filter(a => !offTopicOrLowValueIds.has(a.id));
const removedArticles = articles.filter(a => offTopicOrLowValueIds.has(a.id));

fs.writeFileSync(path.join(DATA_DIR, 'articles.removed.json'), JSON.stringify(removedArticles, null, 2), 'utf8');
fs.writeFileSync(ARTICLES_JSON, JSON.stringify(keptArticles, null, 2), 'utf8');

console.log(`\n=== Step 2: Articles Pruned ===`);
console.log(`Kept: ${keptArticles.length} high-value articles`);
console.log(`Removed: ${removedArticles.length} off-topic/math articles`);

// Move removed article files to archive
removedArticles.forEach(a => {
  const htmlFile = path.join(ARTICLES_DIR, `${a.id}.html`);
  const mdFile = path.join(ARTICLES_DIR, `${a.id}.md`);
  if (fs.existsSync(htmlFile)) {
    fs.renameSync(htmlFile, path.join(ARCHIVE_DIR, 'articles', `${a.id}.html`));
  }
  if (fs.existsSync(mdFile)) {
    fs.renameSync(mdFile, path.join(ARCHIVE_DIR, 'articles', `${a.id}.md`));
  }
});

// -------------------------------------------------------------
// News Curation: Keep only top 6 genuine, readable dispatches
// -------------------------------------------------------------
const topNewsIds = new Set([
  'quantum-navigation-in-birds-researchers-clock-extended-radical',
  'coral-survival-breakthrough-marine-biologists-discover-rapid',
  'cosmic-echoes-sub-solar-gravitational-wave-detection-points-to',
  'mapping-stellar-obliquity-across-space-and-time-new-evidence-in',
  'benchmarking-fast-quantum-anneals-with-domain-walls-2026',
  'fast-and-accurate-neural-triage-decoding-of-new-evidence-in'
]);

// Map to cleanly formatted, non-template titles if needed
const keptNews = news.filter(n => topNewsIds.has(n.id) || topNewsIds.has(n.id.replace(/(-new|-2026)$/, ''))).slice(0, 6);
const removedNews = news.filter(n => !keptNews.some(k => k.id === n.id));

fs.writeFileSync(path.join(DATA_DIR, 'news.removed.json'), JSON.stringify(removedNews, null, 2), 'utf8');
fs.writeFileSync(NEWS_JSON, JSON.stringify(keptNews, null, 2), 'utf8');

console.log(`\n=== Step 3: News Pruned ===`);
console.log(`Kept: ${keptNews.length} curated news dispatches`);
console.log(`Removed: ${removedNews.length} repetitive news items`);

// Move removed news files to archive
removedNews.forEach(n => {
  const htmlFile = path.join(NEWS_DIR, `${n.id}.html`);
  if (fs.existsSync(htmlFile)) {
    fs.renameSync(htmlFile, path.join(ARCHIVE_DIR, 'news', `${n.id}.html`));
  }
});

console.log('\n=== Step 4: Prune completed successfully! ===');
