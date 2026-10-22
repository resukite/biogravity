'use strict';

const path = require('path');
const { google } = require('googleapis');

const KEY_PATH = path.join(__dirname, '..', 'gsc-key.json');
const SITE_PROPERTY = 'sc-domain:biogravity.space';
const SITE_URL = 'https://biogravity.space';

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters']
  });
  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });

  console.log('[GSC] Re-submitting updated sitemap...');
  try {
    await sc.sitemaps.submit({
      siteUrl: SITE_PROPERTY,
      feedpath: `${SITE_URL}/sitemap.xml`
    });
    console.log('[GSC] ✅ Sitemap submitted successfully to domain property!');
  } catch (e) {
    console.log('[GSC] Error submitting to domain property:', e.message);
  }
}

main().catch(console.error);
