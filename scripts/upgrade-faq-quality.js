'use strict';
const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const upgrades = {
  'how-do-astronauts-sleep-in-space': [
    {
      question: 'How do astronauts prevent CO2 suffocation while sleeping in space?',
      answer: "In microgravity, warm exhaled carbon dioxide does not rise because there is no thermal buoyancy. Without cabin ventilation fans actively blowing air across an astronaut's face, an invisible bubble of CO2 accumulates, causing severe headaches, hypoxia, or asphyxiation."
    },
    {
      question: 'Do astronauts dream differently in zero gravity?',
      answer: 'Yes, many astronauts report vivid space-themed dreams, often involving floating or sudden alarms. Disruptions to circadian rhythms, cabin noise (60-70 dB from pumps), and light flashes from cosmic rays striking the retina during sleep also affect REM sleep cycles.'
    }
  ],
  'why-do-astronauts-lose-bone-density-in-space': [
    {
      question: 'Can lost bone density from spaceflight be fully recovered on Earth?',
      answer: 'Recovery takes 2 to 3 times longer than the flight duration, and trabecular micro-architecture is not always fully restored. While overall bone mineral density may return within a year via rehabilitation and weight-bearing exercise, the connectivity of the bone lattice can suffer permanent remodeling.'
    },
    {
      question: 'Why does space osteopenia increase kidney stone risks?',
      answer: 'As mechanical unloading stimulates osteoclasts to dissolve bone minerals, up to 250 mg of excess calcium is dumped into the bloodstream daily. The kidneys filter this hypercalcemic load into urine, where reduced fluid intake and altered urinary pH dramatically elevate calcium oxalate stone formation.'
    }
  ],
  '3d-bioprinting-organoids-in-microgravity': [
    {
      question: 'Can you 3D print a functional human heart in microgravity?',
      answer: 'Microgravity allows researchers to print complex vascular networks and cardiac patches without synthetic scaffold adhesives that collapse on Earth. While a full adult heart requires further maturation, orbital bioprinters on the ISS have successfully bioprinted vascularized cardiac tissue patches that beat autonomously.'
    },
    {
      question: "Why can't complex organs be 3D bioprinted easily on Earth?",
      answer: 'On Earth, gravity causes low-viscosity cellular bio-inks to sag, pool, and collapse before cells can cross-link and form self-supporting extracellular matrices. Microgravity suspends living cells in place, allowing capillary forces and surface tension to guide perfect cellular self-assembly.'
    }
  ],
  'space-adaptation-syndrome-space-motion-sickness': [
    {
      question: 'How long does Space Adaptation Syndrome (SAS) last?',
      answer: 'SAS symptoms typically peak within the first 24 to 48 hours after entering weightlessness and largely resolve within 72 hours as the neuro-vestibular system recalibrates to ignore conflicting otolith gravity signals.'
    },
    {
      question: 'What medications do astronauts take for space motion sickness?',
      answer: 'Astronauts commonly use intramuscular or oral promethazine (Phenergan), an H1 antihistamine with strong antiemetic and sedative properties, or scopolamine patches, to suppress vestibular nausea during initial flight days.'
    }
  ],
  'can-plants-grow-in-space-without-gravity': [
    {
      question: 'Do plant roots grow downward in space without gravity?',
      answer: "Without gravity, roots exhibit 'undirected wandering' unless guided by moisture gradients (hydrotropism) or nutrient concentrations. Shoots, however, reliably grow toward artificial LED light sources via phototropism."
    },
    {
      question: 'Why do plants experience root suffocation in zero gravity?',
      answer: 'In the absence of gravity-driven drainage, water adheres to root surfaces via capillary tension, creating a suffocating water film that blocks gas exchange. Specialized porous ceramic matrices and root-module aeration are required to deliver oxygen directly to root tips.'
    }
  ],
  'difference-between-zero-gravity-and-microgravity': [
    {
      question: 'Is there true zero gravity on the International Space Station?',
      answer: "No. At the ISS altitude (~400 km), Earth's gravity is still approximately 90% as strong as on the surface. Astronauts float because the station is in continuous free-fall, traveling sideways at 27,600 km/h so the Earth curves away at the same rate it falls."
    },
    {
      question: 'What causes residual acceleration in microgravity environments?',
      answer: 'Microgravity is not absolute zero because residual forces exist: upper atmospheric drag, solar radiation pressure, crew movement, attitude control thruster firings, and gravity-gradient forces between the top and bottom of the spacecraft, producing a baseline of 10^-6 g.'
    }
  ],
  'how-does-zero-gravity-kill-cancer-cells': [
    {
      question: 'Does microgravity cure cancer?',
      answer: 'Microgravity is not a cure by itself, but it acts as a unique research environment. Simulated and space microgravity induces apoptosis (programmed cell death) in aggressive cancer cells (such as thyroid and breast carcinoma) by disrupting mechanical cytoskeletal signaling and preventing 2D cell clustering.'
    },
    {
      question: 'Why do cancer cells behave differently in space?',
      answer: 'Cancer cell survival relies heavily on mechanotransduction—detecting physical stiffness in surrounding extracellular tissue. In zero gravity, the absence of mechanical compression disrupts integrin signaling, leading to focal adhesion kinase (FAK) inactivation and apoptotic gene upregulation.'
    }
  ],
  'what-happens-to-human-body-in-zero-gravity': [
    {
      question: 'Do astronauts grow taller in space?',
      answer: 'Yes. Without gravity compressing the spine, spinal intervertebral discs expand and hydrate, causing astronauts to temporarily grow 1 to 2 inches (2.5 to 5 cm) taller during their missions. This height returns to normal after re-adapting to Earth gravity.'
    },
    {
      question: 'Why does an astronaut’s face look puffy in zero gravity?',
      answer: 'On Earth, gravity pulls approximately 2 liters of blood and bodily fluids toward the lower extremities. In microgravity, fluids shift upward toward the chest and head (cephalic fluid shift), producing a rounded facial appearance and nasal congestion commonly called “puffy-head bird-legs syndrome.”'
    }
  ]
};

let updatedArticles = 0;
let totalFaqsAdded = 0;

articles.forEach(art => {
  if (upgrades[art.id]) {
    if (!art.faqs) art.faqs = [];
    // Remove robotic template questions
    art.faqs = art.faqs.filter(f => 
      !f.question.includes('critical for deep space exploration') && 
      !f.question.includes('differ from ground-based controls')
    );
    // Add real human search intent FAQs
    upgrades[art.id].forEach(item => {
      art.faqs.push(item);
      totalFaqsAdded++;
    });
    updatedArticles++;
  }
});

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`[UPGRADE] Updated ${updatedArticles} priority articles with ${totalFaqsAdded} high-intent FAQs.`);
