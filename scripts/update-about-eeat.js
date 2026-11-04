'use strict';

const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'about.html');
let content = fs.readFileSync(aboutPath, 'utf8');

const addition = `
    <!-- Editorial Standards, Fact-Checking & E-E-A-T Compliance -->
    <div class="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-8 mb-16">
      <div>
        <span class="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
          Publisher &amp; Editorial Standards
        </span>
        <h2 class="text-2xl font-display font-bold text-slate-900">Editorial Policy, Fact-Checking &amp; Originality Standards</h2>
        <p class="text-slate-600 text-sm leading-relaxed mt-2">
          BioGravity enforces strict quality, originality, and verification protocols across all published monographs to comply with academic integrity standards and Google Publisher Policies.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>📚</span> 1. Primary Source Attribution
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Every technical dispatch references primary peer-reviewed literature indexed on PubMed, ScienceDirect, Nature, or arXiv, complete with verifiable DOIs.
          </p>
        </div>

        <div class="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>🔍</span> 2. Human Editorial Gate
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            No automated or computer-synthesized article is published without human domain-expert review, empirical data validation, and strict formatting verification.
          </p>
        </div>

        <div class="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>📊</span> 3. Original Value &amp; Analytics
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            We reject scraped or superficial summaries. Every piece includes custom analytical models, comparative telemetry tables, and accessible intuitive analogies.
          </p>
        </div>

        <div class="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>⚖️</span> 4. Conflicts of Interest
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            BioGravity is an independent educational initiative. We do not accept undisclosed commercial sponsorships, paid placements, or misleading advertorials.
          </p>
        </div>

        <div class="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>✏️</span> 5. Corrections &amp; Retractions
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Should an error or outdated figure be identified, our editorial desk issues a prominent correction note with an updated timestamp within 48 business hours.
          </p>
        </div>

        <div class="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>🛡️</span> 6. Safety &amp; Non-Medical Use
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            All space medicine monographs are structured strictly for educational and physiological inquiry; they do not constitute clinical medical advice.
          </p>
        </div>

      </div>
    </div>
`;

if (content.includes('Editorial Policy, Fact-Checking & Originality Standards')) {
  console.log('about.html is already updated!');
} else {
  const mainEnd = content.indexOf('</main>');
  if (mainEnd !== -1) {
    content = content.slice(0, mainEnd) + addition + content.slice(mainEnd);
    fs.writeFileSync(aboutPath, content, 'utf8');
    console.log('Successfully updated about.html with E-E-A-T and Editorial Standards!');
  } else {
    console.error('</main> tag not found in about.html');
  }
}
