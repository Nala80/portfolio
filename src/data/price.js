// Content of the PRICE case study.
// Only what was confirmed: the assignment, the setup and what we chose to build.
// No results or deliverables are claimed beyond that.

export const price = {
  slug: 'price',
  title: 'PRICE Hub sensor dashboard',
  organisation: 'PRICE Co-Makership (Internship), Almere',
  period: 'Jan 2025 – Jun 2025',
  description:
    "Case study: extending a sensor dashboard that shows visitors of the exhibition 'I am material' how biobased insulation materials perform. Relay assignment with PRICE, Digilab, Windesheim and ROC van Flevoland.",
  intro:
    "How do biobased insulation materials really perform? In a relay assignment between PRICE, Digilab, Windesheim and ROC van Flevoland, we made that visible for visitors of the exhibition 'I am material'. As lead developer, I extended an existing dashboard built by ROC Flevoland students.",
  logo: { src: 'images/price/logo.png', alt: 'PRICE logo', width: 155, height: 95 },
  facts: [
    { value: 'Lead developer', label: 'My role' },
    { value: '4', label: 'biobased materials' },
    { value: '20 weeks', label: 'three days a week' },
  ],
  tags: ['Dashboard', 'Sensor data', 'Data visualisation', 'Circular construction'],

  chapters: [
    {
      id: 'brief',
      step: 'The brief',
      title: 'The brief',
      paragraphs: [
        'It started on 20 January 2025 with a joint hackathon day at PRICE, together with students from Windesheim and ROC van Flevoland. The assignment itself ran from 6 February for 20 weeks, three days a week, with delivery at the end of June.',
        'PRICE asked us to build on the existing dashboard with at least two new options, to fetch information about the environment, and to describe the “why” of the software. The brief also asked us to evaluate the test setups, advise on possible changes, and pick at least one extra assignment. We worked in JavaScript, HTML and CSS.',
      ],
    },
    {
      id: 'setup',
      step: 'The setup',
      title: 'Understanding the setup',
      paragraphs: [
        'On a roof surface in the exhibition space, four test setups of about 1.2 × 1.2 m — three locations plus a control surface — hold cellulose, straw, isovlas and Hemkor (hemp with jute fibre).',
        'A plexiglass window lets visitors see the material, and the materials can be swapped, so new products can be tested.',
      ],
      principle: 'The better the insulation, the more slowly the middle follows the outside and inside temperature.',
    },
    {
      id: 'data',
      step: 'The data',
      title: 'What the data can show',
      paragraphs: [
        'Each setup has three temperature measuring points, so you can compare how the lines develop over time. Three moisture points, one of them at the cold roof side, matter just as much: high moisture can cause mould in biobased materials, and it affects how fast the material takes over the outside temperature.',
        'Sunlight influences the temperature in the room, and PRICE and Digilab added a heat-flux sensor, room temperature and CO₂, and wifi temperature and moisture sensors that send their data straight to the database.',
      ],
    },
    {
      id: 'additions',
      step: 'Our additions',
      title: 'What we chose to add',
      paragraphs: [
        'Of the extra assignments we picked two. The first, material analysis, gives every material a radar chart on six sustainability axes, so the four materials can be compared at a glance: the larger the area, the more sustainable the material. It is an indicative picture based on materials databases, not a full life-cycle assessment.',
        'The second, dynamic heating, informs visitors that the stove only runs when the energy price is lowest.',
      ],
    },
  ],

  radar: {
    axes: [
      ['CO₂ emissions', 'in production'],
      ['Lifetime', 'environmental', 'impact'],
      ['Geographic', 'origin'],
      ['Health', 'impact'],
      ['Reuse /', 'disassembly'],
      ['Recycled', 'content'],
    ],
    // Illustrative values (0 = least, 1 = most sustainable), chosen to show how
    // a filled-in chart reads. They are NOT measured scores for any material.
    example: [0.72, 0.58, 0.86, 0.64, 0.47, 0.38],
    title: 'Example radar chart with six sustainability axes',
    description: 'A filled-in example with illustrative values, not measured scores for any of the materials.',
    caption: 'What a filled-in radar looks like. The values here are illustrative, not measured scores for any of the four materials.',
  },

  // Plain paragraphs, in the same voice as the NLR reflection.
  reflection: [
    'What made this project different from most school work is that we did not start from an empty repository. The dashboard was already there, built by ROC Flevoland students, and because it is a relay assignment it gets handed over again after us. In that situation, readable code and a clear explanation of the “why” matter just as much as new features, because someone else has to pick it up.',
    'It also meant keeping in mind who the dashboard is for. Visitors of an exhibition are not engineers, so a temperature line or a moisture value only helps when it tells them something about the material. A radar chart per material fits that idea, as long as it is clear that it gives an indicative picture and not a full life-cycle assessment.',
  ],
};
