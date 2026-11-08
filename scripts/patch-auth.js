const fs = require('fs');
const path = require('path');

const targetScript = '<script defer src="/js/sidebar-menu.min.js?v=2.2"></script>';
const authScripts = '<script defer src="/js/sidebar-menu.min.js?v=2.2"></script>\n  <script defer src="/js/firebase-config.js"></script>\n  <script defer src="/js/auth-system.js"></script>';

const staticAuthButton = `        <!-- User Sign In / Account Pill -->
        <div id="header-auth-container" class="flex items-center mr-1">
          <button id="nav-signin-btn" class="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition text-xs font-medium shadow-xs cursor-pointer group" aria-label="Sign In">
            <svg class="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <span>Sign In</span>
          </button>
        </div>\n\n`;

const pages = [
  'index.html',
  'newsletter.html',
  'about.html',
  'contact.html',
  'research.html',
  'tools.html',
  'news.html',
  'article.html'
];

pages.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Inject scripts if missing
    if (!content.includes('/js/auth-system.js')) {
      if (content.includes(targetScript)) {
        content = content.replace(targetScript, authScripts);
      } else if (content.includes('</head>')) {
        content = content.replace('</head>', `  <script defer src="/js/firebase-config.js"></script>\n  <script defer src="/js/auth-system.js"></script>\n</head>`);
      }
    }

    // Inject static auth button before nav-sidebar-toggle if not present
    if (!content.includes('id="header-auth-container"')) {
      const togglePatterns = [
        /<!-- Bespoke 3-Dot Navigation Menu Button -->\s*<button\s+id="nav-sidebar-toggle"/i,
        /<button\s+id="nav-sidebar-toggle"/i
      ];

      for (const pattern of togglePatterns) {
        if (pattern.test(content)) {
          content = content.replace(pattern, (match) => staticAuthButton + match);
          console.log(`[AUTH-BTN] Injected static Sign In button into ${file}`);
          break;
        }
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

// Also patch build-seo.js
const bPath = path.join(__dirname, '..', 'build-seo.js');
if (fs.existsSync(bPath)) {
  let bCode = fs.readFileSync(bPath, 'utf8');
  if (!bCode.includes('id="header-auth-container"')) {
    const pattern = /<!-- Bespoke 3-Dot Navigation Menu Button -->\s*<button\s+id="nav-sidebar-toggle"/i;
    if (pattern.test(bCode)) {
      bCode = bCode.replace(pattern, (match) => staticAuthButton + match);
      fs.writeFileSync(bPath, bCode, 'utf8');
      console.log('[AUTH-BTN] Injected static Sign In button into build-seo.js');
    }
  }
}
