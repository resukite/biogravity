'use strict';

const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const fixes = {
  'ideal-interaction-dynamics-of-defects-and-background-fields-in': {
    seoTitle: 'Defects in Condensed Matter: Quantum Background Field Dynamics',
    metaDescription: 'How do topological defects interact with background fields? Explore mathematical proofs and quantum dynamics in condensed matter physics.',
    primaryKeyword: 'condensed matter defects background fields quantum dynamics'
  },
  'maximal-orbital-entanglement-from-non-interacting-fermions': {
    seoTitle: 'Maximal Orbital Entanglement: Generating Pure Quantum States',
    metaDescription: 'Discover how maximal orbital entanglement can be generated from non-interacting fermions in orbital quantum simulation experiments.',
    primaryKeyword: 'orbital entanglement non interacting fermions quantum state generation'
  },
  'size-independent-logarithmic-sobolev-inequalities-for-quantum': {
    seoTitle: 'Quantum Gibbs Samplers: Sobolev Inequalities & Mixing Times',
    metaDescription: 'Discover why size-independent logarithmic Sobolev inequalities guarantee rapid thermalization in dissipative quantum computing systems.',
    primaryKeyword: 'quantum gibbs samplers logarithmic sobolev inequalities mixing times'
  },
  'mixed-state-deep-thermalization-under-generic-quantum-errors': {
    seoTitle: 'Mixed State Deep Thermalization: Quantum Error Dynamics',
    metaDescription: 'How do quantum errors induce deep thermalization in mixed states? Discover the statistical mechanics of open quantum computing architectures.',
    primaryKeyword: 'mixed state deep thermalization quantum errors decoherence open quantum systems'
  },
  'screening-strongly-correlated-materials-in-solid-oxide-cells': {
    seoTitle: 'Quantum Simulation of Solid Oxide Cells: Screening New Materials',
    metaDescription: 'Accelerating clean energy: using quantum simulation algorithms to screen strongly correlated catalyst materials for next-generation solid oxide fuel cells.',
    primaryKeyword: 'solid oxide cells quantum simulation strongly correlated materials clean energy'
  },
  'a-priori-estimation-of-the-non-linear-compression-potential-and': {
    seoTitle: 'AI in Turbulent Flows: Estimating Autoencoder Non-Linearity',
    metaDescription: 'Quantifying autoencoder non-linearity in turbulent fluid flows: a priori mathematical estimation of compression potential for aerodynamic and orbital models.',
    primaryKeyword: 'turbulent flows autoencoder non-linearity compression potential machine learning'
  },
  'radical-pair-spin-coherence-and-magnetoreception-in-human-cryptochrome-4-photore': {
    seoTitle: 'Cryptochrome 4 in Humans: Do We Have Quantum Magnetic Senses?',
    metaDescription: 'Can humans sense magnetic fields? Explore breakthrough orbital research on human Cryptochrome 4 (hCry4) protein spin coherence and magnetoreception.',
    primaryKeyword: 'cryptochrome 4 in humans magnetoreception quantum biology radical pair mechanism'
  }
};

let patched = 0;
articles.forEach(art => {
  if (fixes[art.id]) {
    Object.assign(art, fixes[art.id]);
    patched++;
  }
});

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`[FIX-TITLES] ✅ Successfully updated ${patched} articles with unique, high-CTR titles and descriptions!`);
