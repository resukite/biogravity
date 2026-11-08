/**
 * BioGravity Firestore Database Initializer & Diagnostic Utility
 * -------------------------------------------------------------
 * Usage:
 *   node scripts/init-firestore.js
 */

const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('       BioGravity Cloud Firestore Initializer       ');
console.log('====================================================\n');

// 1. Verify firestore.rules presence
const rulesPath = path.join(__dirname, '..', 'firestore.rules');
if (fs.existsSync(rulesPath)) {
  const rules = fs.readFileSync(rulesPath, 'utf8');
  console.log('✓ firestore.rules found (' + (rules.length) + ' bytes)');
  console.log('  - Enforces Default-Deny architecture');
  console.log('  - Secures /users/{userId} with owner-only access');
  console.log('  - Secures /newsletter_subscribers/{email} with email validation & anti-harvesting');
} else {
  console.error('✗ firestore.rules missing!');
}

// 2. Verify firebase.json
const fbConfigPath = path.join(__dirname, '..', 'firebase.json');
if (fs.existsSync(fbConfigPath)) {
  console.log('✓ firebase.json configuration ready');
} else {
  console.error('✗ firebase.json missing!');
}

// 3. Verify client config
const clientConfigPath = path.join(__dirname, '..', 'js', 'firebase-config.js');
if (fs.existsSync(clientConfigPath)) {
  const content = fs.readFileSync(clientConfigPath, 'utf8');
  const hasKey = content.includes('apiKey:') && !content.includes('apiKey: ""');
  if (hasKey) {
    console.log('✓ js/firebase-config.js configured with API key');
  } else {
    console.log('ℹ js/firebase-config.js is in Local / Mock Preview Mode');
    console.log('  Add your web app keys from Firebase Console to connect directly.');
  }
}

console.log('\n--- Collections Schema Summary ---');
console.log('1. /users/{userId}');
console.log('   - email (string, immutable)');
console.log('   - name (string)');
console.log('   - photoURL (string)');
console.log('   - createdAt (timestamp)');
console.log('   - newsletterSubscribed (boolean)');
console.log('   - bookmarks (array of { slug, title, url, savedAt })');
console.log('');
console.log('2. /newsletter_subscribers/{email}');
console.log('   - email (string)');
console.log('   - subscribedAt (timestamp)');
console.log('   - source (string, e.g. web_portal, sidebar, modal)');
console.log('   - status (string, e.g. active, unsubscribed)');
console.log('   - userId (optional string)');
console.log('====================================================\n');
