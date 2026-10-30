# BioGravity (biogravity.space) 4-Phase Implementation Roadmap

## Overview
This roadmap establishes a 12-month phased trajectory to elevate `biogravity.space` into the definitive open-access space biology authority, driving organic search visibility, Google News syndication, and AI engine citation.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Phase 1: Weeks 1-4│ ──> │Phase 2: Weeks 5-12│ ──> │Phase 3: Wks 13-24│ ──> │Phase 4: Mos 7-12│
│  Foundation &   │     │   Topical Hubs  │     │ Scaling Content │     │  Authority & PR │
│ Technical Audit │     │ & Tool Integr.  │     │  & AI Overviews │     │ & Editorial Cit.│
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

### Phase 1: Foundation & Technical Baseline (Weeks 1–4)
* **Metadata & Snippet Polish:**
  * Refactor title tags site-wide to 50–60 characters to eliminate SERP truncation.
  * Rewrite echoing meta descriptions to open with direct value propositions.
* **Core Web Vitals & Image Optimization:**
  * Enforce explicit `width` and `height` on all article featured images to eliminate CLS.
  * Add `<link rel="preconnect">` for external CDN domains (Unsplash, Google Fonts).
  * Set `fetchpriority="high"` on hero images and `loading="lazy"` on all secondary images.
* **Schema Audit:**
  * Deploy standardized JSON-LD blocks across all articles: `ScholarlyArticle`, `BreadcrumbList`, and `QAPage` where applicable.
  * Ensure author entities are populated with valid ORCID IDs and institutional descriptions.
* **Crawlability & Search Console:**
  * Validate `sitemap.xml` and `sitemap-news.xml` in Google Search Console.
  * Ensure robots.txt explicitly allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended).

---

### Phase 2: Expansion & Topical Hubs (Weeks 5–12)
* **Pillar Hub Launch:**
  * Deploy 4 dedicated pillar pages (`/topics/space-medicine`, `/topics/microgravity-effects-on-human-body`, `/topics/quantum-enzymology`, `/topics/research-ethics`).
  * Aggregate relevant articles, datasets, and calculators onto each hub.
* **Interactive Tool Indexing:**
  * Optimize `/tools` with deep landing pages for individual calculators.
  * Implement `SoftwareApplication` / `WebApplication` schema for tools.
* **Internal Linking Engine:**
  * Automate or systematically cross-link dispatches with contextual anchor text.
  * Add "Related Research & Simulators" widget at the conclusion of every dispatch.
* **Google News Ingestion:**
  * Maintain consistent 3x weekly news dispatches under `/news/` with Google News publication tags.

---

### Phase 3: Scale & Generative Engine Optimization (GEO) (Weeks 13–24)
* **AI Overview / Citability Engineering:**
  * Format key research conclusions into structured tables, bulleted takeaways, and bolded "Key Verified Findings".
  * Expand `llms.txt` and `llms-full.txt` with concise entity definitions.
* **Scientific Community Outreach:**
  * Distribute pre-print analyses to arXiv, bioRxiv, and academic subreddits (r/space, r/biology, r/biotech).
  * Establish co-author and guest contributor pipelines with university space biology labs.
* **Internationalization / Multilingual Assessment:**
  * Evaluate top non-English search queries (ESA nations, JAXA) and test automated hreflang-tagged dispatches in German/French/Japanese.

---

### Phase 4: Authority, Institutional Recognition & Backlinks (Months 7–12)
* **Academic Backlink Acquisition:**
  * Submit BioGravity open dataset and interactive simulator links to university library resource directories.
  * Pursue citations in Nature, Science, and PubMed review articles.
* **Syndication & Newsletter Growth:**
  * Scale the scientific newsletter to build a direct audience buffer against search algorithm fluctuations.
* **Quarterly SEO Drift Audits:**
  * Run automated baseline comparisons using `scripts/drift_baseline.py` to prevent code deployments from regressing on-page metadata or schema.
