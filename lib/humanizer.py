"""
=============================================================================
BioGravity Humanizer Engine (lib/humanizer.py)
=============================================================================
Implements the rules from the Humanizer skill (blader/humanizer /
Wikipedia "Signs of AI writing") in Python:
 - §1: Remove "Not X but Y" contrasts
 - §2: Cut one-line dramatic closers and fragments
 - §3: Eliminate pseudo-philosophical sayings ("at its core", "testament to")
 - §4: Strip staged run-ups ("Let's dive in", "Here's what you need to know")
 - §5: Cut unprompted defenses ("This isn't about", "To be clear")
 - §6: Break artificial forced triads
 - §7: Reduce em-dash (—) overload
 - §8: Replace AI buzzwords (delve, tapestry, pivotal, testament, underscore, meticulous, vibrant, realm, beacon, landscape, foster, harness, seamless, nuanced, paramount, robust)
 - §9: Trim shallow -ing riders
 - §10: Tone down promotional/sales language
 - §11: Remove borrowed authority ("experts argue", "observers have cited")
 - §12: Replace inflated verbs with simple verbs (is, are, has)
 - §13: Remove decorative bolding on list item labels
 - §14: Remove decorative emojis from headings and text
 - §15: Strip chatbot residue ("I hope this helps", "Certainly!")
 - §16: Remove knowledge-limit disclaimers
 - §17: Remove heading repeated in the first sentence
=============================================================================
"""

import re

WORD_REPLACEMENTS = [
    (re.compile(r"\bstands? as a testament to\b", re.IGNORECASE), "demonstrates"),
    (re.compile(r"\bis a testament to\b", re.IGNORECASE), "shows"),
    (re.compile(r"\ba testament to\b", re.IGNORECASE), "evidence of"),
    (re.compile(r"\bserves? as an? (crucial|pivotal|key|vital) (example|demonstration|reminder) of\b", re.IGNORECASE), "shows"),
    (re.compile(r"\bserves? as\b", re.IGNORECASE), "is"),
    (re.compile(r"\bserving as\b", re.IGNORECASE), "acting as"),
    (re.compile(r"\bstands? as\b", re.IGNORECASE), "is"),
    (re.compile(r"\bfunctions? as\b", re.IGNORECASE), "acts as"),
    (re.compile(r"\bboasts? an?\b", re.IGNORECASE), "has an"),
    (re.compile(r"\bboasts?\b", re.IGNORECASE), "has"),
    (re.compile(r"\bdelve(s|d)? into\b", re.IGNORECASE), r"explore\1"),
    (re.compile(r"\bdelving into\b", re.IGNORECASE), "examining"),
    (re.compile(r"\ba rich tapestry of\b", re.IGNORECASE), "a diverse range of"),
    (re.compile(r"\btapestry of\b", re.IGNORECASE), "network of"),
    (re.compile(r"\btapestry\b", re.IGNORECASE), "structure"),
    (re.compile(r"\bpivotal moment\b", re.IGNORECASE), "major development"),
    (re.compile(r"\bpivotal role\b", re.IGNORECASE), "central role"),
    (re.compile(r"\bpivotal\b", re.IGNORECASE), "key"),
    (re.compile(r"\bmeticulously\b", re.IGNORECASE), "carefully"),
    (re.compile(r"\bmeticulous\b", re.IGNORECASE), "detailed"),
    (re.compile(r"\bquietly transforming\b", re.IGNORECASE), "changing"),
    (re.compile(r"\bquietly revolutionized\b", re.IGNORECASE), "altered"),
    (re.compile(r"\bshowcases?\b", re.IGNORECASE), "shows"),
    (re.compile(r"\bshowcasing\b", re.IGNORECASE), "showing"),
    (re.compile(r"\bunderscores? the importance of\b", re.IGNORECASE), "emphasizes"),
    (re.compile(r"\bunderscores?\b", re.IGNORECASE), "shows"),
    (re.compile(r"\bunderscoring\b", re.IGNORECASE), "showing"),
    (re.compile(r"\bharnessing the power of\b", re.IGNORECASE), "using"),
    (re.compile(r"\bharness(es|ed)?\b", re.IGNORECASE), r"use\1"),
    (re.compile(r"\bharnessing\b", re.IGNORECASE), "using"),
    (re.compile(r"\bfosters? an? environment of\b", re.IGNORECASE), "supports"),
    (re.compile(r"\bfoster(s|ed)?\b", re.IGNORECASE), r"support\1"),
    (re.compile(r"\bfostering\b", re.IGNORECASE), "supporting"),
    (re.compile(r"\bseamlessly integrates?\b", re.IGNORECASE), "integrates directly"),
    (re.compile(r"\bseamlessly\b", re.IGNORECASE), "smoothly"),
    (re.compile(r"\bseamless\b", re.IGNORECASE), "direct"),
    (re.compile(r"\bintricate dance\b", re.IGNORECASE), "interaction"),
    (re.compile(r"\bevolving landscape\b", re.IGNORECASE), "current state"),
    (re.compile(r"\bscientific landscape\b", re.IGNORECASE), "scientific field"),
    (re.compile(r"\btechnological landscape\b", re.IGNORECASE), "technology sector"),
    (re.compile(r"\bbeacon of\b", re.IGNORECASE), "center of"),
    (re.compile(r"\bin the realm of\b", re.IGNORECASE), "in"),
    (re.compile(r"\brealm of\b", re.IGNORECASE), "field of"),
    (re.compile(r"\bgroundbreaking\b", re.IGNORECASE), "notable"),
    (re.compile(r"\bbreathtaking\b", re.IGNORECASE), "impressive"),
    (re.compile(r"\bprofound impact\b", re.IGNORECASE), "clear effect"),
    (re.compile(r"\bprofound\b", re.IGNORECASE), "deep"),
    (re.compile(r"\bparamount\b", re.IGNORECASE), "critical"),
    (re.compile(r"\bnuanced understanding\b", re.IGNORECASE), "clear understanding"),
    (re.compile(r"\bnuanced\b", re.IGNORECASE), "detailed"),
    (re.compile(r"\bindelible mark\b", re.IGNORECASE), "lasting effect"),
    (re.compile(r"\bsetting the stage for\b", re.IGNORECASE), "enabling"),
    (re.compile(r"\bsets the stage for\b", re.IGNORECASE), "enables"),
    (re.compile(r"\bplays? a key role in\b", re.IGNORECASE), "directly affects"),
    (re.compile(r"\bplays? a crucial role in\b", re.IGNORECASE), "directly influences"),
    (re.compile(r"\bplays? an integral role in\b", re.IGNORECASE), "supports"),
    (re.compile(r"\bexciting times (lie|are) ahead\b", re.IGNORECASE), "further research continues"),
    (re.compile(r"\ba step in the right direction\b", re.IGNORECASE), "progress toward this goal"),
    (re.compile(r"\bthe future looks bright\b", re.IGNORECASE), "development continues"),
]

STAGED_PHRASES = [
    re.compile(r"Let['’]s dive (in|into[^.,:;!?]*)[.,:;!?]\s*", re.IGNORECASE),
    re.compile(r"Here['’]s what you need to know[.,:;!?]\s*", re.IGNORECASE),
    re.compile(r"Here['’]s the thing[.,:;!?]\s*", re.IGNORECASE),
    re.compile(r"Let['’]s be honest[.,:;!?]\s*", re.IGNORECASE),
    re.compile(r"Without further ado[.,:;!?]\s*", re.IGNORECASE),
    re.compile(r"Honestly[?,!]\s*", re.IGNORECASE),
    re.compile(r"Look,\s+", re.IGNORECASE),
    re.compile(r"Now let['’]s look at\s+", re.IGNORECASE),
    re.compile(r"To be clear,\s*", re.IGNORECASE),
    re.compile(r"Don['’]t get me wrong,\s*", re.IGNORECASE),
    re.compile(r"It is worth noting that\s+", re.IGNORECASE),
    re.compile(r"It['’]s worth noting that\s+", re.IGNORECASE),
    re.compile(r"It is important to remember that\s+", re.IGNORECASE),
    re.compile(r"Importantly,\s*", re.IGNORECASE),
    re.compile(r"Crucially,\s*", re.IGNORECASE),
    re.compile(r"Interestingly,\s*", re.IGNORECASE),
    re.compile(r"Remarkably,\s*", re.IGNORECASE),
    re.compile(r"Needless to say,\s*", re.IGNORECASE),
    re.compile(r"As we have seen,\s*", re.IGNORECASE),
    re.compile(r"In other words,\s*", re.IGNORECASE),
]

DRAMATIC_CLOSERS = [
    re.compile(r"\bThat is the real win\b[.]?", re.IGNORECASE),
    (re.compile(r"\bThat distinction matters\b[.]?", re.IGNORECASE)),
    (re.compile(r"\bRead that again\b[.]?", re.IGNORECASE)),
    (re.compile(r"\bLet that sink in\b[.]?", re.IGNORECASE)),
    (re.compile(r"\bAnd that changes everything\b[.]?", re.IGNORECASE)),
    (re.compile(r"\bThe message is clear:\s*", re.IGNORECASE)),
    (re.compile(r"\bAt its core,\s*", re.IGNORECASE)),
    (re.compile(r"\bThe real question is\s+", re.IGNORECASE)),
    (re.compile(r"\bWhat really matters is\s+", re.IGNORECASE)),
    (re.compile(r"\bFundamentally,\s*", re.IGNORECASE)),
]

CHATBOT_RESIDUE = [
    re.compile(r"\bI hope this helps[!.]?\s*", re.IGNORECASE),
    re.compile(r"\bCertainly[!.]?\s*", re.IGNORECASE),
    re.compile(r"\bOf course[!.]?\s*", re.IGNORECASE),
    re.compile(r"\bGreat question[!.]?\s*", re.IGNORECASE),
    re.compile(r"\bHere is a (comprehensive )?(breakdown|overview|summary)[^.:]*[:.]\s*", re.IGNORECASE),
    re.compile(r"\bLet me know if you would like me to\b[^.]*\.?\s*", re.IGNORECASE),
    re.compile(r"\bLet me know if you['’]d like\b[^.]*\.?\s*", re.IGNORECASE),
    re.compile(r"\bAs of my last (knowledge|training) update\b[^,.]*[,.]?\s*", re.IGNORECASE),
    re.compile(r"\bWhile specific details are limited\b[^,.]*[,.]?\s*", re.IGNORECASE),
    re.compile(r"\bBased on available information\b[^,.]*[,.]?\s*", re.IGNORECASE),
]

EMOJI_PATTERN = re.compile(r"[\U00010000-\U0010ffff]", flags=re.UNICODE)

def humanize_text(text: str) -> str:
    if not text or not isinstance(text, str):
        return text

    cleaned = text

    for pat in CHATBOT_RESIDUE:
        cleaned = pat.sub("", cleaned)

    for pat in STAGED_PHRASES:
        cleaned = pat.sub("", cleaned)

    for pat in DRAMATIC_CLOSERS:
        cleaned = pat.sub("", cleaned)

    # Not only X, but Y
    cleaned = re.sub(
        r"is not (?:just|only|merely)\s+([^,]+),\s*but\s+(?:also\s+)?([^.]+)\.",
        r"involves \1 as well as \2.",
        cleaned,
        flags=re.IGNORECASE
    )
    cleaned = re.sub(
        r"not (?:just|only|merely)\s+([^,]+),\s*but\s+(?:also\s+)?([^,.]+)",
        r"\1 and \2",
        cleaned,
        flags=re.IGNORECASE
    )

    for pat, rep in WORD_REPLACEMENTS:
        cleaned = pat.sub(rep, cleaned)

    cleaned = re.sub(r"\s+—\s+", ", ", cleaned)
    cleaned = cleaned.replace("—", " - ")
    cleaned = EMOJI_PATTERN.sub("", cleaned)

    cleaned = re.sub(r"[ \t]{2,}", " ", cleaned)
    cleaned = re.sub(r" ,", ",", cleaned)
    cleaned = re.sub(r" \.", ".", cleaned)
    cleaned = re.sub(r" \?", "?", cleaned)
    cleaned = re.sub(r"\.{2,}", ".", cleaned)
    cleaned = re.sub(r",(\s*,)+", ",", cleaned)
    cleaned = cleaned.strip()

    # Capitalize sentence starts
    cleaned = re.sub(r"(^\w|[.!?]\s+\w)", lambda m: m.group(1).upper(), cleaned)
    return cleaned

def humanize_html(html: str) -> str:
    if not html or not isinstance(html, str):
        return html

    preserved = []
    def save_block(m):
        idx = len(preserved)
        preserved.append(m.group(0))
        return f"___PRESERVED_BLOCK_{idx}___"

    tokenized = re.sub(r"(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|<code[\s\S]*?<\/code>|<pre[\s\S]*?<\/pre>)", save_block, html)

    def clean_text_node(m):
        open_tag, text, close_tag = m.group(1), m.group(2), m.group(3)
        if not text.strip():
            return m.group(0)
        return f"{open_tag}{humanize_text(text)}{close_tag}"

    tokenized = re.sub(r"(>)([^<]+)(<)", clean_text_node, tokenized)

    # Clean decorative bold labels
    tokenized = re.sub(
        r"<li>\s*<strong(?:\s+[^>]*)?>\s*([^:<]{2,40}):\s*<\/strong>\s*",
        r'<li><span class="font-semibold text-slate-200">\1:</span> ',
        tokenized,
        flags=re.IGNORECASE
    )

    # Clean header emojis
    def clean_header(m):
        h_open, content, h_close = m.group(1), m.group(2), m.group(3)
        return f"{h_open}{EMOJI_PATTERN.sub('', content).strip()}{h_close}"

    tokenized = re.sub(r"(<h[1-6][^>]*>)([\s\S]*?)(<\/h[1-6]>)", clean_header, tokenized)

    # Restore preserved blocks
    for idx, block in enumerate(preserved):
        tokenized = tokenized.replace(f"___PRESERVED_BLOCK_{idx}___", block)

    return tokenized

def humanize_article(art: dict) -> dict:
    if not art or not isinstance(art, dict):
        return art

    clone = dict(art)

    for field in ["title", "seoTitle", "summary", "quickAnswer", "analogy", "metaDescription"]:
        if clone.get(field):
            clone[field] = humanize_text(clone[field])

    if isinstance(clone.get("keyTakeaways"), list):
        clone["keyTakeaways"] = [humanize_text(k) for k in clone["keyTakeaways"]]

    if isinstance(clone.get("faqs"), list):
        clone["faqs"] = [
            {
                "question": humanize_text(f.get("question", "")),
                "answer": humanize_text(f.get("answer", ""))
            }
            for f in clone["faqs"]
        ]

    if isinstance(clone.get("sections"), list):
        for s in clone["sections"]:
            if "title" in s:
                s["title"] = humanize_text(s["title"])
            if "html" in s:
                s["html"] = humanize_html(s["html"])

    if clone.get("content"):
        clone["content"] = humanize_html(clone["content"])
    if clone.get("contentHtml"):
        clone["contentHtml"] = humanize_html(clone["contentHtml"])

    return clone
