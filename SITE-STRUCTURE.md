# BioGravity (biogravity.space) Site Architecture & Hierarchy

## 1. Information Architecture Overview
BioGravity operates as an Open Science Publication and Interactive Scientific Hub focusing on space biology, microgravity research, aerospace medicine, and research ethics.

```
/ (Homepage: Portal & Research Highlights)
├── /research (Research Feed, Category Filters & Topic Taxonomy)
│   ├── /research?topic=microgravity
│   ├── /research?topic=space-medicine
│   ├── /research?topic=quantum-biology
│   └── /research?topic=research-ethics
├── /articles (Peer-Reviewed Guides & Dispatches)
│   ├── /articles/[slug]
│   └── /articles/[slug]/cite (BibTeX, RIS, EndNote export endpoints)
├── /news (Space Science News & Daily Updates - Google News Optimized)
│   └── /news/[slug]
├── /tools (Interactive Simulators & Scientific Calculators)
│   ├── /tools/microgravity-calc
│   ├── /tools/radiation-dosage
│   └── /tools/protein-crystallization
├── /topics (Topic Hubs / Topical Pillars)
│   ├── /topics/space-medicine
│   ├── /topics/quantum-enzymology
│   ├── /topics/microgravity-effects-on-human-body
│   └── /topics/research-ethics-common-rule
├── /authors (Academic Profiles & E-E-A-T Anchors)
│   ├── /authors/dr-elena-rostova
│   └── /authors/editorial-board
├── /about (Mission, Peer-Review Policy & Affiliations)
│   ├── /about
│   ├── /about/editorial-policy
│   ├── /about/peer-review-process
│   └── /about/corrections-retractions
├── /contact (Institutional Queries & Lab Collaborations)
├── /sitemap.xml (Sitemap Index)
├── /sitemap-news.xml (Google News XML Sitemap)
├── /feed.xml & /rss.xml (Syndication Feeds)
└── /llms.txt & /llms-full.txt (AI Engine Crawler & GEO Discovery Files)
```

---

## 2. URL Strategy & Hierarchy Rules
1. **Article URLs:** Flat, descriptive slug under `/articles/` (e.g., `/articles/what-statement-about-risks-in-social-and-behavioral-sciences-research-is-most-accurate`). Avoid nested dates for evergreen pillar guides.
2. **News URLs:** Time-stamped or short news slugs under `/news/` (e.g., `/news/nasa-organ-chip-iss-deployment-2026`).
3. **Pillar Topic Hubs:** `/topics/[cluster-name]` serving as internal PageRank consolidation points with curated links to dispatches, datasets, and calculators.
4. **Author Profiles:** `/authors/[author-slug]` linking ORCID IDs, institutional affiliations, published DOIs, and verified credentials.

---

## 3. Internal Linking Matrix (Hub & Spoke)
* **Pillar Hub Pages** link down to all related sub-articles and tools within the cluster.
* **Child Articles** link back to their parent Pillar Hub with consistent anchor text.
* **Horizontal Cross-Links:** Every dispatch links contextually to at least 2 relevant sibling research papers and 1 interactive simulator.
* **Breadcrumb Navigation:** Consistent 3-tier breadcrumbs on every article: `BioGravity > Research Feed > [Category/Topic] > [Article Title]`.
