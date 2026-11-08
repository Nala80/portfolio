// Content of the NLR case study (team project, written as "we").
// The page tells how we got to the results; the results themselves are the proof,
// not the main subject. Charts come from our research paper (labels in Dutch).

// Non-breaking spaces keep the formula on one line.
const WORKLOAD_FORMULA = 'beta_z − alpha_z';

export const nlr = {
  slug: 'nlr',
  title: 'Physiological signals & flight performance',
  organisation: 'MITC (NLR), Marknesse',
  period: 'Feb 2025 – Jun 2026',
  team: 'Team project · 5 students',
  description:
    'Case study: how a team of five students turned about 360 sensor exports from student pilots into features, patterns and a model that relates physiology to flight performance.',
  leadQuestion:
    'Which physiological signals best explain whether a student pilot flies the exercises successfully, so trainers can give more targeted guidance?',
  keyFigures: [
    { value: '~360', label: 'CSV files cleaned and merged' },
    { value: '+1.22', label: 'workload score in Climb, the highest phase' },
    { value: 'r = 0.55', label: 'pupil size vs altitude error (session 5)' },
    { value: 'R² 0.43', label: 'Random Forest on test data' },
  ],
  tags: ['Python', 'Random Forest', 'K-means', 'PCA', 'ARIMA', 'Spearman', 'Data visualisation', 'Research'],

  chapters: [
    {
      id: 'data',
      step: 'Clean & merge',
      title: 'Making 360 files usable',
      paragraphs: [
        'Six student pilots, callsigns Alpha to Foxtrot, were measured during ten training sessions. Every session produced six CSV exports per pilot, each from a different source and with its own timestamps and columns.',
        'Before any analysis could start, we linked all sessions per pilot onto one timeline and checked missing values, column names and data types. Sessions 1, 5 and 9 became the basis for the EEG and precision analyses; all ten sessions fed the heart-rate trends.',
      ],
      data: {
        equation: [
          { value: '10', label: 'sessions' },
          { value: '6', label: 'pilots' },
          { value: '6', label: 'files' },
        ],
        total: { value: '~360', label: 'CSV files' },
        files: ['Aurora', 'Data', 'EEG', 'Event-List', 'Features', 'HR'],
      },
    },
    {
      id: 'features',
      step: 'Engineer features',
      title: 'Making signals comparable',
      paragraphs: [
        `Raw sensor values sit on different scales, so we standardised them as z-scores. From two brain-wave bands we then built one workload score, ${WORKLOAD_FORMULA}: positive means a phase is relatively demanding, negative relatively relaxed.`,
        'Applied to pilot Delta’s sessions 1, 5 and 9, the score made one phase stand out. We had expected Take-Off to be the heaviest, but it came in at +0.29, behind Deceleration (+0.52) and Descent (+0.35).',
      ],
      highlight: 'Climb scored +1.22: clearly the most demanding phase of the flight.',
      figure: {
        src: 'images/nlr/workload-per-phase.png',
        width: 870,
        height: 432,
        alt: 'Bar chart of the combined workload score per flight phase for pilot Delta. Climb is highest at +1.22, followed by Deceleration +0.52, Descent +0.35 and Take-Off +0.29; Initial Climb is lowest at −0.61.',
        caption: 'Combined workload score per flight phase — pilot Delta, sessions 1, 5 and 9. Chart from our research paper (labels in Dutch).',
      },
    },
    {
      id: 'patterns',
      step: 'Analyse',
      title: 'Finding patterns',
      paragraphs: [
        'With comparable signals we looked for structure in several ways. K-means on EEG and heart rate separated three physiological states — high mental activity, a low-activity baseline and high arousal/focus — and in the correlation matrix beta and gamma moved together (0.76), as did delta and theta (0.66).',
        'Over time, an ARIMA trend per pilot showed heart rate rising with training: Alpha +2.66, Charlie +2.48, Foxtrot +2.12, Bravo +1.73 and Echo +1.08 bpm per session, which may point to growing performance pressure. Higher beta and gamma activity also tended to go with better instructor ratings, but with this few sessions we treat that as an indication, not a cause.',
      ],
      highlight: 'Five of six pilots’ heart rate went up with experience; only Delta trended down (−0.74 bpm per session).',
      figure: {
        src: 'images/nlr/arima-trends.png',
        width: 1067,
        height: 575,
        alt: 'Six small line charts, one per pilot, with actual heart rate per session and an ARIMA trend line: Alpha +2.66, Bravo +1.73, Charlie +2.48, Delta −0.74, Echo +1.08 and Foxtrot +2.12 bpm per session.',
        caption: 'Heart-rate trend per pilot over ten sessions, with the ARIMA slope in each panel title.',
      },
    },
    {
      id: 'model',
      step: 'Model',
      title: 'Predicting performance',
      paragraphs: [
        'Finally we asked the question directly. In stable flight phases we correlated pupil size, blink rate and heart rate with altitude and speed error (Spearman). The strongest link was pupil size with altitude error, r = 0.55 in session 5, but no single sensor explained the errors on its own.',
        'So we combined them: a Random Forest Regressor predicting altitude error from all three signals. Heart rate (36.1%), blink rate (32.8%) and pupil size (31.1%) contributed almost equally.',
      ],
      highlight: 'Together, the three signals explained 43% of the variance in altitude error (R² = 0.43 on test data).',
      figure: {
        src: 'images/nlr/feature-importance.png',
        width: 989,
        height: 489,
        alt: 'Horizontal bar chart of Random Forest feature importance: heart rate 36.1%, blink rate 32.8%, pupil size 31.1%.',
        caption: 'How much each sensor contributes to the Random Forest’s prediction of altitude error.',
      },
    },
  ],

  reflection: [
    {
      lead: 'Ethics was part of the process.',
      text: 'Calculated or imputed values must be labelled and never look like real measurements (the GDPR accuracy principle), imputation should happen only where necessary, and no conclusion about a person should be drawn automatically: the trainer keeps the final judgement.',
    },
    {
      lead: 'The results have clear limits.',
      text: 'There were few sessions and pilots, missing values and sensor noise, sessions 1, 5 and 9 were selected for several analyses, and the first analysis had no hard validation metrics.',
    },
    {
      lead: 'That shaped our advice to NLR:',
      text: 'automate cleaning, merging and export; label original versus imputed values; build dashboards per flight phase; validate results with trainers; collect more sessions before predicting; document model settings such as the number of clusters and ARIMA p/d/q; and make an ethics check a fixed step.',
    },
  ],
};
