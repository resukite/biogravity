'use strict';

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_PROPERTY = 'sc-domain:biogravity.space';

// We already verified URLs 0 to 29:
const knownResults = [
  { url: 'https://biogravity.space/', status: 'INDEXED' },
  { url: 'https://biogravity.space/news', status: 'INDEXED' },
  { url: 'https://biogravity.space/research', status: 'INDEXED' },
  { url: 'https://biogravity.space/tools', status: 'NOT_INDEXED', reason: 'Discovered / Unknown' },
  { url: 'https://biogravity.space/world-space-week-2026', status: 'INDEXED' },
  { url: 'https://biogravity.space/molecular-biology-research', status: 'INDEXED' },
  { url: 'https://biogravity.space/about', status: 'INDEXED' },
  { url: 'https://biogravity.space/contact', status: 'INDEXED' },
  { url: 'https://biogravity.space/disclaimer', status: 'INDEXED' },
  { url: 'https://biogravity.space/sitemap', status: 'NOT_INDEXED', reason: 'Discovered / Unknown' },
  { url: 'https://biogravity.space/privacy-policy', status: 'INDEXED' },
  { url: 'https://biogravity.space/terms', status: 'INDEXED' },
  { url: 'https://biogravity.space/news/alien-life-at-14-000-feet-below-the-ocean-deep-sea-expedition', status: 'INDEXED' },
  { url: 'https://biogravity.space/news/metal-rain-and-vaporized-iron-webb-telescope-reveals-extreme', status: 'INDEXED' },
  { url: 'https://biogravity.space/news/living-solar-panels-scientists-turn-plant-chloroplasts-into', status: 'INDEXED' },
  { url: 'https://biogravity.space/news/ancient-greenland-ice-discloses-shocking-climate-flip-that', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/size-independent-logarithmic-sobolev-inequalities-for-quantum', status: 'NOT_INDEXED', reason: 'Queued (Published Today)' },
  { url: 'https://biogravity.space/articles/mixed-state-deep-thermalization-under-generic-quantum-errors', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/screening-strongly-correlated-materials-in-solid-oxide-cells', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/a-priori-estimation-of-the-non-linear-compression-potential-and', status: 'NOT_INDEXED', reason: 'Discovered / Unknown' },
  { url: 'https://biogravity.space/articles/what-does-quantum-parameter-estimation-estimate-a-no-go-result-for-tru', status: 'NOT_INDEXED', reason: 'Discovered / Unknown' },
  { url: 'https://biogravity.space/articles/phonon-assisted-free-electron-recoil-control-and-mechanical-sensing', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/characterizing-supersolid-phase-transitions-in-trapped-quantum-gases-w', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/relativistic-time-dilation-and-mitochondrial-aging-clocks', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/zero-g-capillary-fluidics-and-surface-tension-bioreactors', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/debye-shielding-and-plasma-sheath-dynamics-in-spacecraft-biosensing', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/radical-pair-spin-coherence-and-magnetoreception-in-human-cryptochrome-4-photore', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/synthetic-poly-adp-metallo-peptides-for-telomeric-radioprotection-in-deep-space-', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/acoustic-levitation-and-scaffold-free-vascularized-cardiac-organoid-bioprinting-', status: 'INDEXED' },
  { url: 'https://biogravity.space/articles/sub-angstrom-macromolecular-crystallography-of-membrane-transporters-in-orbital-', status: 'INDEXED' }
];

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters']
  });
  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });

  const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

  console.log(`Checking the remaining URLs (indexes 30 to ${urls.length - 1})...`);
  const finalResults = [...knownResults];

  for (let i = 30; i < urls.length; i++) {
    const u = urls[i];
    try {
      const res = await sc.urlInspection.index.inspect({
        requestBody: { inspectionUrl: u, siteUrl: SITE_PROPERTY }
      });
      const st = res.data.inspectionResult.indexStatusResult;
      const coverage = st.coverageState || 'UNKNOWN';

      if (st.verdict === 'PASS' || coverage.toLowerCase().includes('indexed')) {
        finalResults.push({ url: u, status: 'INDEXED', coverage });
        console.log(`[${i+1}/${urls.length}] ✅ INDEXED: ${u}`);
      } else {
        finalResults.push({ url: u, status: 'NOT_INDEXED', coverage, reason: coverage });
        console.log(`[${i+1}/${urls.length}] ⏳ NOT INDEXED: ${u} -> ${coverage}`);
      }
    } catch (e) {
      console.log(`[${i+1}/${urls.length}] ❌ Error ${u}: ${e.message}`);
      finalResults.push({ url: u, status: 'ERROR', error: e.message });
    }
    await new Promise(r => setTimeout(r, 200));
  }

  const indexedCount = finalResults.filter(r => r.status === 'INDEXED').length;
  const notIndexedCount = finalResults.filter(r => r.status !== 'INDEXED').length;

  const fullReport = {
    totalUrls: urls.length,
    indexedCount,
    notIndexedCount,
    indexedPercentage: `${((indexedCount / urls.length) * 100).toFixed(1)}%`,
    results: finalResults
  };

  fs.writeFileSync(path.join(__dirname, '..', 'exact-indexing-status.json'), JSON.stringify(fullReport, null, 2));

  console.log('\n======================================================');
  console.log(`🎯 FINAL LIVE AUDIT SUMMARY:`);
  console.log(`Total Canonical Sitemap URLs: ${urls.length}`);
  console.log(`✅ INDEXED: ${indexedCount} / ${urls.length} (${fullReport.indexedPercentage})`);
  console.log(`⏳ NOT YET INDEXED: ${notIndexedCount} / ${urls.length}`);
  console.log('======================================================');
}

main().catch(console.error);
