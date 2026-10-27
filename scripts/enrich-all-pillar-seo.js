'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const SITE_URL = 'https://biogravity.space';

const PILLAR_CONFIG = [
  {
    slug: 'index',
    file: 'index.html',
    title: 'BioGravity | Space Biotechnology & Microgravity Science',
    description: 'BioGravity is an open-access scientific publication platform. Discover how orbital microgravity accelerates medicine, organ bioprinting, and human health on Earth.',
    canonical: `${SITE_URL}/`,
    image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=1200&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          'url': `${SITE_URL}/`,
          'name': 'BioGravity',
          'description': 'Open-access space biotechnology & microgravity science publication.',
          'publisher': {
            '@id': `${SITE_URL}/#organization`
          },
          'potentialAction': {
            '@type': 'SearchAction',
            'target': `${SITE_URL}/research?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'NewsMediaOrganization',
          '@id': `${SITE_URL}/#organization`,
          'name': 'BioGravity Science Bureau',
          'url': `${SITE_URL}/`,
          'logo': {
            '@type': 'ImageObject',
            'url': `${SITE_URL}/favicon.svg`
          },
          'sameAs': [
            'https://twitter.com/BioGravitySpace',
            'https://github.com/resukite/biogravity'
          ]
        }
      ]
    }
  },
  {
    slug: 'about',
    file: 'about.html',
    title: 'About BioGravity & Mission | Space Biotechnology Research',
    description: 'Discover the mission, research methodology, editorial board, and standards driving BioGravity open-access space biotechnology research.',
    canonical: `${SITE_URL}/about`,
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About BioGravity',
      'url': `${SITE_URL}/about`,
      'description': 'Mission, open-access methodology, and editorial standards of BioGravity.',
      'mainEntity': {
        '@type': 'Organization',
        'name': 'BioGravity',
        'url': `${SITE_URL}/`,
        'foundingDate': '2026',
        'knowsAbout': ['Microgravity', 'Space Biotechnology', 'Organ Bioprinting', 'Quantum Biology', 'Protein Crystallography']
      }
    }
  },
  {
    slug: 'research',
    file: 'research.html',
    title: 'Research Archive & Scientific Dispatches | BioGravity',
    description: 'Search and explore peer-reviewed open dispatches covering microgravity cellular biology, quantum biophysics, space medicine, and orbital pharmacology.',
    canonical: `${SITE_URL}/research`,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'BioGravity Research Archive',
      'url': `${SITE_URL}/research`,
      'description': 'Searchable repository of microgravity biological and physical science monographs.',
      'publisher': {
        '@type': 'Organization',
        'name': 'BioGravity Science Bureau',
        'url': `${SITE_URL}/`
      }
    }
  },
  {
    slug: 'news',
    file: 'news.html',
    title: 'Live Science News & Global Discoveries | BioGravity',
    description: '24/7 Live Science Wire covering today\'s breakthroughs in space exploration, geology, environmental science, quantum physics, and deep science history.',
    canonical: `${SITE_URL}/news`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&h=900&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'BioGravity Live Science Wire',
      'url': `${SITE_URL}/news`,
      'description': '24/7 autonomous breaking science reporting across space exploration, geophysics, climate history, and quantum mechanics.',
      'publisher': {
        '@type': 'NewsMediaOrganization',
        'name': 'BioGravity Live Science Bureau',
        'url': `${SITE_URL}/`
      }
    }
  },
  {
    slug: 'tools',
    file: 'tools.html',
    title: 'Microgravity Simulators & Research Calculators | BioGravity',
    description: 'Interactive computational tools for microgravity modeling: parabolic flight g-force simulators, clinostat rotational calculators, and radiation dosimeters.',
    canonical: `${SITE_URL}/tools`,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'BioGravity Microgravity Simulators',
      'url': `${SITE_URL}/tools`,
      'applicationCategory': 'ScientificTool',
      'operatingSystem': 'Any',
      'description': 'Computational astrophysics, clinostat, and microgravity biotechnology tools.'
    }
  },
  {
    slug: 'contact',
    file: 'contact.html',
    title: 'Contact Editorial & Academic Outreach | BioGravity',
    description: 'Get in touch with the BioGravity open science publishing team for academic collaborations, preprint submissions, and press inquiries.',
    canonical: `${SITE_URL}/contact`,
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact BioGravity Editorial Bureau',
      'url': `${SITE_URL}/contact`,
      'description': 'Editorial contact information, academic collaboration channels, and correspondence.'
    }
  },
  {
    slug: 'disclaimer',
    file: 'disclaimer.html',
    title: 'Scientific & Medical Disclaimer | BioGravity',
    description: 'Legal disclaimers, scientific accuracy disclosures, educational boundaries, and citation standards for BioGravity open research content.',
    canonical: `${SITE_URL}/disclaimer`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'BioGravity Scientific Disclaimer',
      'url': `${SITE_URL}/disclaimer`
    }
  },
  {
    slug: 'privacy-policy',
    file: 'privacy-policy.html',
    title: 'Privacy Policy & Data Transparency | BioGravity',
    description: 'BioGravity privacy policy detailing zero-tracking standards, cookie disclosures, Google AdSense compliance, and GDPR/CCPA rights.',
    canonical: `${SITE_URL}/privacy-policy`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'BioGravity Privacy Policy',
      'url': `${SITE_URL}/privacy-policy`
    }
  },
  {
    slug: 'terms',
    file: 'terms.html',
    title: 'Terms of Service & Creative Commons Licensing | BioGravity',
    description: 'Terms of service, Creative Commons Attribution 4.0 International (CC-BY 4.0) licensing rules, and permissible content syndication guidelines.',
    canonical: `${SITE_URL}/terms`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'BioGravity Terms of Service',
      'url': `${SITE_URL}/terms`
    }
  },
  {
    slug: 'sitemap',
    file: 'sitemap.html',
    title: 'Complete Site Index & XML Sitemaps | BioGravity',
    description: 'Full alphabetical index and directory of all research articles, live science wire dispatches, interactive tools, and editorial archives.',
    canonical: `${SITE_URL}/sitemap`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'BioGravity Site Directory & Sitemap',
      'url': `${SITE_URL}/sitemap`
    }
  }
];

function injectSEO(html, cfg) {
  // 1. Ensure robots tag has max-image-preview:large
  if (html.includes('<meta name="robots"')) {
    html = html.replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">');
  } else {
    html = html.replace('</head>', '  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">\n</head>');
  }

  // 2. Ensure canonical
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${cfg.canonical}">`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${cfg.canonical}">\n</head>`);
  }

  // 3. Remove existing OG & Twitter tags to avoid duplicates
  html = html.replace(/<meta property="og:[^>]*>/gi, '');
  html = html.replace(/<meta name="twitter:[^>]*>/gi, '');

  const metaSocialTags = `
  <!-- Open Graph / Facebook / Discover -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="BioGravity">
  <meta property="og:title" content="${cfg.title.replace(/"/g, '&quot;')}">
  <meta property="og:description" content="${cfg.description.replace(/"/g, '&quot;')}">
  <meta property="og:url" content="${cfg.canonical}">
  <meta property="og:image" content="${cfg.image}">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${cfg.title.replace(/"/g, '&quot;')}">
  <meta name="twitter:description" content="${cfg.description.replace(/"/g, '&quot;')}">
  <meta name="twitter:image" content="${cfg.image}">
`;

  // 4. Remove old structured data if present in header, then inject new
  const schemaScript = `
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(cfg.schema, null, 2)}
  </script>
`;

  // If there is already a schema, replace it or prepend
  if (html.includes('<script type="application/ld+json">')) {
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, schemaScript.trim());
  } else {
    html = html.replace('</head>', `${metaSocialTags}\n${schemaScript}\n</head>`);
  }

  // Double check metaSocialTags are in head
  if (!html.includes('property="og:title"')) {
    html = html.replace('</head>', `${metaSocialTags}\n</head>`);
  }

  return html;
}

console.log('🚀 Enriching all pillar pages with Discover-grade SEO, OpenGraph, Twitter Cards, and Schema.org JSON-LD...');

for (const cfg of PILLAR_CONFIG) {
  const filePath = path.join(ROOT_DIR, cfg.file);
  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');
  html = injectSEO(html, cfg);
  fs.writeFileSync(filePath, html, 'utf8');

  // Also update corresponding /slug/index.html if applicable
  if (cfg.slug !== 'index') {
    const dirPath = path.join(ROOT_DIR, cfg.slug);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf8');
  }

  console.log(`✅ Fully enriched: ${cfg.file} and /${cfg.slug}/`);
}

console.log('\n🎉 ALL PILLAR PAGES ENRICHED WITH 100% MAXIMUM SEO!');
