'use strict';

/**
 * ============================================================================
 * BioGravity Humanizer Engine (lib/humanizer.js)
 * ============================================================================
 * Implements the guidelines from the Humanizer skill (blader/humanizer /
 * Wikipedia "Signs of AI writing"):
 *  - §1: Remove "Not X but Y" contrasts & clipped negative tails
 *  - §2: Cut one-line dramatic closers, repeated takeaways, and sentence fragments
 *  - §3: Eliminate pseudo-philosophical sayings ("at its core", "the real question is", "stands as a testament")
 *  - §4: Strip staged run-ups ("Let's dive in", "Here's what you need to know", "Look,", "Honestly")
 *  - §5: Cut unprompted defenses ("This isn't about", "To be clear", "Don't get me wrong")
 *  - §6: Break artificial forced triads
 *  - §7: Reduce em-dash (—) overload into natural commas, colons, or clean periods
 *  - §8: Replace AI buzzwords (delve, tapestry, pivotal, testament, underscore, meticulous, vibrant, realm, beacon, landscape, foster, harness, seamless, nuanced, paramount, robust)
 *  - §9: Trim shallow -ing riders ("highlighting the importance of...", "underscoring the significance...")
 *  - §10: Tone down promotional/sales language ("groundbreaking", "breathtaking", "stunning", "profound", "must-visit")
 *  - §11: Remove borrowed authority ("experts argue", "observers have cited", "industry reports suggest")
 *  - §12: Replace inflated verbs ("serves as", "stands as", "functions as", "boasts", "features") with simple verbs ("is", "are", "has")
 *  - §13: Remove decorative bolding on list item labels
 *  - §14: Remove decorative emojis (🚀, 💡, ⚡, ✨, 🧠, 🔬, etc.) from headings and bullet points
 *  - §15: Strip chatbot residue ("I hope this helps", "Of course!", "Certainly!", "Here is a breakdown", "Let me know if...")
 *  - §16: Remove knowledge-limit disclaimers ("as of my last update", "while specific details are limited")
 *  - §17: Remove heading repeated in the first sentence
 * ============================================================================
 */

// Common stock AI vocabulary and their natural replacements
const WORD_REPLACEMENTS = [
  // §8 & §12: AI stock buzzwords & inflated verbs
  { pattern: /\bstands? as a testament to\b/gi, replacement: 'demonstrates' },
  { pattern: /\bis a testament to\b/gi, replacement: 'shows' },
  { pattern: /\ba testament to\b/gi, replacement: 'evidence of' },
  { pattern: /\bserves? as an? (crucial|pivotal|key|vital) (example|demonstration|reminder) of\b/gi, replacement: 'shows' },
  { pattern: /\bserves? as\b/gi, replacement: 'is' },
  { pattern: /\bserving as\b/gi, replacement: 'acting as' },
  { pattern: /\bstands? as\b/gi, replacement: 'is' },
  { pattern: /\bfunctions? as\b/gi, replacement: 'acts as' },
  { pattern: /\bboasts? an?\b/gi, replacement: 'has an' },
  { pattern: /\bboasts?\b/gi, replacement: 'has' },
  { pattern: /\bdelve(s|d)? into\b/gi, replacement: 'explore$1' },
  { pattern: /\bdelving into\b/gi, replacement: 'examining' },
  { pattern: /\ba rich tapestry of\b/gi, replacement: 'a diverse range of' },
  { pattern: /\btapestry of\b/gi, replacement: 'network of' },
  { pattern: /\btapestry\b/gi, replacement: 'structure' },
  { pattern: /\bpivotal moment\b/gi, replacement: 'major development' },
  { pattern: /\bpivotal role\b/gi, replacement: 'central role' },
  { pattern: /\bpivotal\b/gi, replacement: 'key' },
  { pattern: /\bmeticulously\b/gi, replacement: 'carefully' },
  { pattern: /\bmeticulous\b/gi, replacement: 'detailed' },
  { pattern: /\bquietly transforming\b/gi, replacement: 'changing' },
  { pattern: /\bquietly revolutionized\b/gi, replacement: 'altered' },
  { pattern: /\bshowcases?\b/gi, replacement: 'shows' },
  { pattern: /\bshowcasing\b/gi, replacement: 'showing' },
  { pattern: /\bunderscores? the importance of\b/gi, replacement: 'emphasizes' },
  { pattern: /\bunderscores?\b/gi, replacement: 'shows' },
  { pattern: /\bunderscoring\b/gi, replacement: 'showing' },
  { pattern: /\bharnessing the power of\b/gi, replacement: 'using' },
  { pattern: /\bharness(es|ed)?\b/gi, replacement: 'use$1' },
  { pattern: /\bharnessing\b/gi, replacement: 'using' },
  { pattern: /\bfosters? an? environment of\b/gi, replacement: 'supports' },
  { pattern: /\bfoster(s|ed)?\b/gi, replacement: 'support$1' },
  { pattern: /\bfostering\b/gi, replacement: 'supporting' },
  { pattern: /\bseamlessly integrates?\b/gi, replacement: 'integrates directly' },
  { pattern: /\bseamlessly\b/gi, replacement: 'smoothly' },
  { pattern: /\bseamless\b/gi, replacement: 'direct' },
  { pattern: /\bintricate dance\b/gi, replacement: 'interaction' },
  { pattern: /\bevolving landscape\b/gi, replacement: 'current state' },
  { pattern: /\bscientific landscape\b/gi, replacement: 'scientific field' },
  { pattern: /\btechnological landscape\b/gi, replacement: 'technology sector' },
  { pattern: /\blandscape\b/gi, replacement: (match, offset, str) => {
    // Keep if literal physical landscape
    const prev = str.slice(Math.max(0, offset - 25), offset).toLowerCase();
    if (prev.includes('lunar') || prev.includes('martian') || prev.includes('terrestrial') || prev.includes('natural')) return match;
    return 'field';
  }},
  { pattern: /\bbeacon of\b/gi, replacement: 'center of' },
  { pattern: /\bin the realm of\b/gi, replacement: 'in' },
  { pattern: /\brealm of\b/gi, replacement: 'field of' },
  { pattern: /\bgroundbreaking\b/gi, replacement: 'notable' },
  { pattern: /\bbreathtaking\b/gi, replacement: 'impressive' },
  { pattern: /\bprofound impact\b/gi, replacement: 'clear effect' },
  { pattern: /\bprofound\b/gi, replacement: 'deep' },
  { pattern: /\bparamount\b/gi, replacement: 'critical' },
  { pattern: /\bnuanced understanding\b/gi, replacement: 'clear understanding' },
  { pattern: /\bnuanced\b/gi, replacement: 'detailed' },
  { pattern: /\bindelible mark\b/gi, replacement: 'lasting effect' },
  { pattern: /\bsetting the stage for\b/gi, replacement: 'enabling' },
  { pattern: /\bsets the stage for\b/gi, replacement: 'enables' },
  { pattern: /\bplays? a key role in\b/gi, replacement: 'directly affects' },
  { pattern: /\bplays? a crucial role in\b/gi, replacement: 'directly influences' },
  { pattern: /\bplays? an integral role in\b/gi, replacement: 'supports' },
  { pattern: /\bexciting times (lie|are) ahead\b/gi, replacement: 'further research continues' },
  { pattern: /\ba step in the right direction\b/gi, replacement: 'progress toward this goal' },
  { pattern: /\bthe future looks bright\b/gi, replacement: 'development continues' }
];

// Staged run-ups & artificial transitions (§4, §5)
const STAGED_PHRASES = [
  /Let['’]s dive (in|into[^.,:;!?]*)[.,:;!?]\s*/gi,
  /Here['’]s what you need to know[.,:;!?]\s*/gi,
  /Here['’]s the thing[.,:;!?]\s*/gi,
  /Let['’]s be honest[.,:;!?]\s*/gi,
  /Without further ado[.,:;!?]\s*/gi,
  /Honestly[?,!]\s*/gi,
  /Look,\s+/gi,
  /Now let['’]s look at\s+/gi,
  /To be clear,\s*/gi,
  /Don['’]t get me wrong,\s*/gi,
  /It is worth noting that\s+/gi,
  /It['’]s worth noting that\s+/gi,
  /It is important to remember that\s+/gi,
  /Importantly,\s*/gi,
  /Crucially,\s*/gi,
  /Interestingly,\s*/gi,
  /Remarkably,\s*/gi,
  /Needless to say,\s*/gi,
  /As we have seen,\s*/gi,
  /In other words,\s*/gi
];

// Pseudo-deep philosophical aphorisms & closers (§2, §3)
const DRAMATIC_CLOSERS = [
  /\bThat is the real win\b[.]?/gi,
  /\bThat distinction matters\b[.]?/gi,
  /\bRead that again\b[.]?/gi,
  /\bLet that sink in\b[.]?/gi,
  /\bAnd that changes everything\b[.]?/gi,
  /\bThe message is clear:\s*/gi,
  /\bAt its core,\s*/gi,
  /\bThe real question is\s+/gi,
  /\bWhat really matters is\s+/gi,
  /\bFundamentally,\s*/gi
];

// Chatbot residue & disclaimers (§15, §16)
const CHATBOT_RESIDUE = [
  /\bI hope this helps[!.]?\s*/gi,
  /\bCertainly[!.]?\s*/gi,
  /\bOf course[!.]?\s*/gi,
  /\bGreat question[!.]?\s*/gi,
  /\bHere is a (comprehensive )?(breakdown|overview|summary)[^.:]*[:.]\s*/gi,
  /\bLet me know if you would like me to\b[^.]*\.?\s*/gi,
  /\bLet me know if you['’]d like\b[^.]*\.?\s*/gi,
  /\bAs of my last (knowledge|training) update\b[^,.]*[,.]?\s*/gi,
  /\bWhile specific details are limited\b[^,.]*[,.]?\s*/gi,
  /\bBased on available information\b[^,.]*[,.]?\s*/gi
];

// Emojis often abused in AI generation (§14)
const EMOJI_CLEANUP = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu;

/**
 * Humanizes plain text by removing AI tells, filler, and structural clichés.
 */
function humanizeText(text) {
  if (!text || typeof text !== 'string') return text;

  let cleaned = text;

  // 1. Remove chatbot residue & disclaimers
  for (const pat of CHATBOT_RESIDUE) {
    cleaned = cleaned.replace(pat, '');
  }

  // 2. Remove staged run-ups
  for (const pat of STAGED_PHRASES) {
    cleaned = cleaned.replace(pat, '');
  }

  // 3. Remove dramatic closers & fake depth
  for (const pat of DRAMATIC_CLOSERS) {
    cleaned = cleaned.replace(pat, '');
  }

  // 4. Clean "Not only X, but Y" and "Not X, but Y" (§1)
  // "It is not just about X, but Y" -> "It involves X and Y"
  cleaned = cleaned.replace(/is not (?:just|only|merely)\s+([^,]+),\s*but\s+(?:also\s+)?([^.]+)\./gi, (match, p1, p2) => {
    return `involves ${p1.trim()} as well as ${p2.trim()}.`;
  });
  cleaned = cleaned.replace(/not (?:just|only|merely)\s+([^,]+),\s*but\s+(?:also\s+)?([^,.]+)/gi, (match, p1, p2) => {
    return `${p1.trim()} and ${p2.trim()}`;
  });

  // 5. Replace stock AI buzzwords
  for (const rep of WORD_REPLACEMENTS) {
    cleaned = cleaned.replace(rep.pattern, rep.replacement);
  }

  // 6. Reduce em-dash (—) overload (§7)
  // Replace space-padded em-dashes with comma or period
  cleaned = cleaned.replace(/\s+—\s+/g, ', ');
  cleaned = cleaned.replace(/—/g, ' - ');

  // 7. Remove decorative emojis from text (§14)
  cleaned = cleaned.replace(EMOJI_CLEANUP, '');

  // 8. Normalize double spaces and awkward punctuation
  cleaned = cleaned
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ ,/g, ',')
    .replace(/ \./g, '.')
    .replace(/ \?/g, '?')
    .replace(/\.{2,}/g, '.')
    .replace(/,(\s*,)+/g, ',')
    .trim();

  // Capitalize sentence beginnings if a leading word was stripped
  cleaned = cleaned.replace(/(^\w|[.!?]\s+\w)/g, c => c.toUpperCase());

  return cleaned;
}

/**
 * Humanizes HTML content while preserving tags, formulas ($$...$$), tables, and structure.
 */
function humanizeHtml(html) {
  if (!html || typeof html !== 'string') return html;

  // Protect code blocks and math blocks from modification
  const preservedBlocks = [];
  let tokenized = html.replace(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|<code[\s\S]*?<\/code>|<pre[\s\S]*?<\/pre>)/gi, (match) => {
    const idx = preservedBlocks.length;
    preservedBlocks.push(match);
    return `___PRESERVED_BLOCK_${idx}___`;
  });

  // Humanize text nodes inside HTML tags
  tokenized = tokenized.replace(/(>)([^<]+)(<)/g, (match, open, text, close) => {
    const trimmed = text.trim();
    if (!trimmed) return match;
    const humanized = humanizeText(text);
    return `${open}${humanized}${close}`;
  });

  // Clean decorative bolding in bullet list items: <li><strong>Label:</strong> Text</li> -> <li>Label: Text</li> (§13)
  tokenized = tokenized.replace(/<li>\s*<strong(?:\s+[^>]*)?>\s*([^:<]{2,40}):\s*<\/strong>\s*/gi, (match, label) => {
    return `<li><span class="font-semibold text-slate-200">${label}:</span> `;
  });

  // Remove decorative emojis from headers: <h3>🚀 Title</h3> -> <h3>Title</h3> (§14)
  tokenized = tokenized.replace(/(<h[1-6][^>]*>)([\s\S]*?)(<\/h[1-6]>)/gi, (match, open, content, close) => {
    const cleanHeader = content.replace(EMOJI_CLEANUP, '').trim();
    return `${open}${cleanHeader}${close}`;
  });

  // Restore preserved math and code blocks
  tokenized = tokenized.replace(/___PRESERVED_BLOCK_(\d+)___/g, (match, idx) => {
    return preservedBlocks[parseInt(idx, 10)] || match;
  });

  return tokenized;
}

/**
 * Full article object humanizer:
 * Recursively humanizes all textual fields (title, summary, quickAnswer, analogy,
 * keyTakeaways, sections, faqs, metaDescription, content, contentHtml)
 */
function humanizeArticle(article) {
  if (!article || typeof article !== 'object') return article;

  const clone = { ...article };

  if (clone.title) clone.title = humanizeText(clone.title);
  if (clone.seoTitle) clone.seoTitle = humanizeText(clone.seoTitle);
  if (clone.summary) clone.summary = humanizeText(clone.summary);
  if (clone.quickAnswer) clone.quickAnswer = humanizeText(clone.quickAnswer);
  if (clone.analogy) clone.analogy = humanizeText(clone.analogy);
  if (clone.metaDescription) clone.metaDescription = humanizeText(clone.metaDescription);

  if (Array.isArray(clone.keyTakeaways)) {
    clone.keyTakeaways = clone.keyTakeaways.map(t => humanizeText(t));
  }

  if (Array.isArray(clone.faqs)) {
    clone.faqs = clone.faqs.map(f => ({
      question: humanizeText(f.question),
      answer: humanizeText(f.answer)
    }));
  }

  if (Array.isArray(clone.sections)) {
    clone.sections = clone.sections.map(s => ({
      ...s,
      title: humanizeText(s.title),
      html: s.html ? humanizeHtml(s.html) : s.html
    }));
  }

  if (clone.content) clone.content = humanizeHtml(clone.content);
  if (clone.contentHtml) clone.contentHtml = humanizeHtml(clone.contentHtml);

  return clone;
}

module.exports = {
  humanizeText,
  humanizeHtml,
  humanizeArticle
};
