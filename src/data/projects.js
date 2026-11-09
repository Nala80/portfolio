// Project summaries for the home page, in chronological order (by start date).
// `caseStudy` is the route of the project's own page, or null if it has none.

export const projects = [
  {
    id: 'price',
    title: 'PRICE Hub sensor dashboard',
    organisation: 'PRICE Co-Makership (Internship), Almere',
    period: 'Jan 2025 – Jun 2025',
    summary:
      "A dashboard that shows visitors of the exhibition 'I am material' how biobased insulation materials really perform, built on live sensor data from four roof test setups.",
    figures: [
      { value: 'Lead', label: 'developer role' },
      { value: '4', label: 'biobased materials' },
      { value: '20', label: 'weeks, three days a week' },
    ],
    tags: ['Dashboard', 'Sensor data', 'Data visualisation'],
    caseStudy: 'projects/price/',
  },
  {
    id: 'nlr',
    title: 'Physiological signals & flight performance',
    organisation: 'MITC (NLR), Marknesse',
    period: 'Feb 2025 – Jun 2026',
    summary:
      'Five-student data science team project. We analysed EEG, heart rate, pupil size and blink rate of student pilots to find which signals best explain how well they fly their exercises.',
    figures: [
      { value: '~360', label: 'CSV files cleaned & merged' },
      { value: 'R² 0.43', label: 'Random Forest on test data' },
      { value: '+1.22', label: 'workload score in Climb' },
    ],
    tags: ['Python', 'Random Forest', 'ARIMA', 'Research'],
    caseStudy: 'projects/nlr/',
  },
  {
    id: 'classmatch',
    title: 'ClassMatch',
    organisation: 'Info Support, Veenendaal',
    period: 'Sep 2026 – Present',
    summary:
      'Scheduling application for primary schools that updates timetables when staff are absent, to minimise lesson disruption. Explores schedule recalculation and explainable suggestions, helping schedulers compare internal staff moves with external cover.',
    note: 'Ongoing project, so details follow later.',
    status: 'Work in progress',
    figures: [],
    tags: ['Scheduling', 'Explainable suggestions'],
    caseStudy: null,
  },
];

/** The case studies before and after the given project, in display order. */
export function neighbours(id) {
  const withCaseStudy = projects.filter((project) => project.caseStudy);
  const index = withCaseStudy.findIndex((project) => project.id === id);
  return {
    previous: index > 0 ? withCaseStudy[index - 1] : null,
    next: index >= 0 && index < withCaseStudy.length - 1 ? withCaseStudy[index + 1] : null,
  };
}
