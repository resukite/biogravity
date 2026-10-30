/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './about/**/*.html',
    './articles/**/*.html',
    './contact/**/*.html',
    './disclaimer/**/*.html',
    './news/**/*.html',
    './outreach/**/*.html',
    './privacy-policy/**/*.html',
    './research/**/*.html',
    './sitemap/**/*.html',
    './terms/**/*.html',
    './tools/**/*.html',
    './world-space-week-2026/**/*.html',
    './data/**/*.json',
    './build-seo.js',
    './scripts/**/*.js',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#fafbfc',
        charcoal: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b'
        },
        teal: {
          600: '#0d9488',
          500: '#14b8a6',
          50: '#f0fdfa'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
};
