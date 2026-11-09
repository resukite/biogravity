# 🤖 BioGravity AI Search & Generative Engine Optimization (GEO) Audit

> **Audit Timestamp**: Mon, 09 Nov 2026 06:14:41 GMT  
> **GEO Readiness Score**: **96 / 100**  
> **Status**: ⚡ **Fully Optimized for Google AI Overviews, ChatGPT Search, Perplexity & Claude**

---

## 1. Executive Summary

BioGravity has been optimized across all **5 AI Search Vectors**:
1. **Google AI Overviews & AI Mode**: Grounded via server-side rendered HTML, Googlebot crawling, and Schema `ScholarlyArticle` with `SpeakableSpecification`.
2. **OpenAI ChatGPT Search**: Fully accessible via dedicated `OAI-SearchBot` and `ChatGPT-User` user-agent permissions in `robots.txt`.
3. **Perplexity AI**: Optimized via self-contained definitions in the first 30% of content and `PerplexityBot` permission.
4. **Claude Search**: Unblocked via `Claude-SearchBot` in `robots.txt`.
5. **Bing Copilot**: Grounded through IndexNow instant indexation and Bingbot access.

---

## 2. AI Crawler & Bot Accessibility

| Crawler | Governed AI Surface | Status | robots.txt Permission |
| :--- | :--- | :---: | :---: |
| **Googlebot** | Google AI Overviews & Search | ✅ Active | `Allow: /` |
| **Google-Extended** | Gemini / Vertex AI Model Training | ✅ Active | `Allow: /` |
| **Google-CloudVertexBot** | Vertex AI Agents & Grounding | ✅ Active | `Allow: /` |
| **Google-Agent** | Google Agentic Web Browsing | ✅ Active | `Allow: /` |
| **OAI-SearchBot** | **ChatGPT Search Citations** | ✅ Active | `Allow: /` |
| **GPTBot** | OpenAI Model Training | ✅ Active | `Allow: /` |
| **ChatGPT-User** | ChatGPT Live Web Browsing | ✅ Active | `Allow: /` |
| **Claude-SearchBot** | Claude Live Search Citations | ✅ Active | `Allow: /` |
| **PerplexityBot** | Perplexity AI Search Citations | ✅ Active | `Allow: /` |
| **Applebot / Extended**| Apple Intelligence Siri / Safari | ✅ Active | `Allow: /` |
| **Bingbot** | Copilot & Microsoft Search | ✅ Active | `Allow: /` |

---

## 3. Passage-Level Citability Breakdown

Research by SE Ranking & Ahrefs confirms that **~44% of AI citations are extracted from the first 30% of an article**.

### How BioGravity Articles Are Structured for LLM Extraction:
- **Direct Definitions ("X is...")**: Each article leads with a 40–55 word direct answer block placed immediately beneath the primary `<h2>`.
- **Quotable Statistics & Telemetry**: Empirical figures (e.g., *12,262m depth, 180°C, 510 rem, 384 ps coherence lifetimes*) are highlighted in high-contrast data callouts.
- **Comparison Tables**: Formatted in semantic HTML `<table>` tags which LLMs extract directly when answering comparative user queries.
- **Knowledge Graph Linking**: Each article declares its Wikipedia and Wikidata entity in Schema `about` fields.

---

## 4. Machine-Readable LLM Delivery (`llms.txt` & `llms-full.txt`)

- **Root Location**: [`https://biogravity.space/llms.txt`](https://biogravity.space/llms.txt) & [`https://biogravity.space/llms-full.txt`](https://biogravity.space/llms-full.txt)
- **Alternate Link in Head**: `<link rel="alternate" type="text/markdown" href="https://biogravity.space/llms.txt">`
- **Content**: Plain-text Markdown summaries of all 56 peer-reviewed articles, providing immediate zero-latency grounding context for autonomous agents and LLMs.

---

## 5. Ongoing Automation

The GEO engine is integrated into BioGravity's daily cloud workflow:
- **Local command**: `npm run ai-optimize`
- **Scheduled runs**: Executes automatically in GitHub Actions on every daily content update.
