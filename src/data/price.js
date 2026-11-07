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
    { value: 'Lead developer', label: 'Role' },
    { value: '4', label: 'Biobased materials' },
    { value: '20 weeks', label: 'Duration' },
    { value: 'JavaScript · HTML · CSS', label: 'Built with' },
  ],
  tags: ['Dashboard', 'Sensor data', 'Data visualisation', 'Circular construction'],

  setup: {
    paragraphs: [
      'On a roof surface in the exhibition space, four test setups of about 1.2 × 1.2 m (three locations plus a control surface) hold cellulose, straw, isovlas and Hemkor (hemp with jute fibre).',
      'A plexiglass window lets visitors see the material, and the materials can be swapped so new products can be tested.',
    ],
    materials: ['Cellulose', 'Straw', 'Isovlas', 'Hemkor (hemp with jute fibre)'],
    principle:
      'The better the insulation, the more slowly the middle follows the outside and inside temperature.',
  },

  sensors: [
    {
      title: 'Temperature in the insulation',
      text: 'Three measuring points per setup; compare how the lines develop over time.',
    },
    {
      title: 'Moisture',
      text: 'Three points, one at the cold roof side. High moisture can cause mould in biobased materials, and it affects how fast the material takes over the outside temperature.',
    },
    {
      title: 'Sunlight vs temperature',
      text: 'Sunlight influences the temperature in the room.',
    },
    {
      title: 'Added by PRICE and Digilab',
      text: 'A heat-flux sensor, room temperature and CO₂, and wifi temperature/moisture sensors sending data straight to the database.',
    },
  ],

  assignment: [
    'Build on the existing dashboard with at least two new options.',
    'Fetch information about the environment.',
    'Describe the “why” of the software.',
    'Evaluate the test setups and advise on possible changes.',
    'Pick at least one extra assignment.',
  ],

  extraAssignments: [
    {
      title: 'Material analysis',
      text: 'A radar chart per material on six sustainability axes, so the four materials can be compared at a glance.',
    },
    {
      title: 'Dynamic heating',
      text: 'Inform visitors that the stove only runs when the energy price is lowest.',
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
    notes: [
      'The larger the area, the more sustainable the material.',
      'An indicative picture based on materials databases, not a full life-cycle assessment (LCA).',
    ],
  },

  wireframes: [
    {
      src: 'images/price/wireframe-materials.png',
      width: 1493,
      height: 937,
      alt: 'Wireframe of a material page for straw: a description, a hexagonal sustainability radar, hexagons with live temperature and moisture readings at the top, middle and bottom of the insulation, and a drawing of the roof cross-section.',
      caption: 'Wireframe — material page (here: straw) with the sustainability radar and live readings per measuring point.',
    },
    {
      src: 'images/price/wireframe-data.png',
      width: 1487,
      height: 932,
      alt: 'Wireframe of a data page for straw: a line chart of temperature over one year for outside, inside and three points in the insulation, with a filter and a material selector.',
      caption: 'Wireframe — data page with the temperature trend per measuring point. The chart shows illustrative data.',
    },
  ],

  timeline: [
    { date: '20 Jan 2025', title: 'Hackathon day', text: 'Joint hackathon day at PRICE with Windesheim and ROC van Flevoland students.' },
    { date: '6 Feb 2025', title: 'Official start', text: '20 weeks, three days per week.' },
    { date: 'End of Jun 2025', title: 'Delivery', text: 'End of the assignment.' },
  ],
};
