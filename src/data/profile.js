// Personal details shown on the site.
// Privacy rules: no email address, phone number or home location here, ever.
// tests/privacy.test.js fails the build if an email or phone number shows up
// in the generated HTML. LinkedIn is the only contact route.

export const profile = {
  name: 'Nalawi Woldeyohannes',
  role: 'HBO-ICT student · Software & Data',
  tagline:
    'Final-year HBO-ICT student who enjoys building functional, user-friendly software and turning data into insight.',
  photo: {
    src: 'images/profile.png',
    alt: 'Portrait of Nalawi Woldeyohannes',
    width: 249,
    height: 260,
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/nalawi-woldeyohannes',
  },
};

export const education = [
  {
    degree: 'HBO-ICT (BSc)',
    school: 'Windesheim University of Applied Sciences',
    period: '2023 – 2027 (expected)',
    coursework: [
      'Software Engineering',
      'Databases',
      'Web & Mobile Development',
      'Cyber Security',
      'Data Science',
      'Software Design',
      'Project Management',
      'Emerging Technologies (AI & Quantum Computing)',
    ],
  },
];

// Newest first.
export const experience = [
  { role: 'Freelancer', organisation: 'YoungOnes', period: 'Jun 2026 – Present' },
  { role: 'Courier', organisation: 'Spareribs Express', period: 'Jun 2025 – May 2026' },
  {
    role: 'Hackathon Guide',
    organisation: 'ROC van Amsterdam – Flevoland, Almere',
    period: 'Mar 2025',
    description: 'Guided a group of MBO students during a two-day hackathon commissioned by Brightcare ICT.',
  },
  { role: 'Courier', organisation: 'DHL', period: 'Feb 2025 – Jun 2025' },
];
