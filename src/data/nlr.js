// Content of the NLR case study (team project, written as "we").
// Charts are taken from our research paper; their axis labels are in Dutch.

// Non-breaking spaces keep the formula on one line.
const WORKLOAD_FORMULA = 'beta_z − alpha_z';

const chart = (name, width, height, alt, caption) => ({
  src: `images/nlr/${name}.png`,
  width,
  height,
  alt,
  caption,
});

export const nlr = {
  slug: 'nlr',
  title: 'Physiological signals & flight performance',
  organisation: 'MITC (NLR), Marknesse',
  period: 'Feb 2025 – Jun 2026',
  team: 'Team project · 5 students',
  description:
    'Case study: which physiological signals (EEG, heart rate, pupil size, blink rate) best explain whether student pilots fly their exercises successfully. Data science team project with NLR.',
  leadQuestion:
    'Which physiological signals best explain whether a student pilot flies the exercises successfully, so trainers can give more targeted guidance?',
  keyFigures: [
    { value: '~360', label: 'CSV files (10 sessions × 6 pilots × 6 files)' },
    { value: 'R² 0.43', label: 'Random Forest on test data' },
    { value: '+1.22', label: 'workload score in Climb, the highest phase' },
    { value: 'r = 0.55', label: 'pupil size vs altitude error (session 5)' },
  ],
  tags: ['Python', 'Random Forest', 'K-means', 'PCA', 'ARIMA', 'Spearman', 'Data visualisation', 'Research'],

  approach: [
    {
      title: 'Clean & merge',
      text: 'Sessions linked per pilot on one timeline; missing values, column names and data types checked.',
    },
    {
      title: 'Engineer features',
      text: `Z-score standardisation and a workload score: ${WORKLOAD_FORMULA}.`,
    },
    {
      title: 'Analyse',
      text: 'Clustering, correlations, trend analysis and ARIMA.',
    },
    {
      title: 'Model',
      text: 'A Random Forest Regressor predicting altitude error from physiology.',
    },
  ],

  data: {
    equation: [
      { value: '10', label: 'training sessions' },
      { value: '6', label: 'pilots (Alpha – Foxtrot)' },
      { value: '6', label: 'CSV files each' },
    ],
    total: { value: '~360', label: 'CSV files' },
    files: ['Aurora', 'Data', 'EEG', 'Event-List', 'Features', 'HR'],
    note: 'Sessions 1, 5 and 9 were used for the EEG and precision analyses; all 10 sessions for the heart-rate trends.',
  },

  results: [
    {
      title: 'Workload differs per flight phase',
      takeaway: 'Climb is clearly the most demanding phase; Take-Off, our hypothesis for the heaviest, scores lower than expected.',
      paragraphs: [
        'The workload score is standardised beta minus standardised alpha: positive means relatively demanding, negative relatively relaxed. After Climb (+1.22) come Deceleration (+0.52), Descent (+0.35) and Take-Off (+0.29). Turn (−0.40), Level-Off (−0.45) and Initial Climb (−0.61) are relatively relaxed.',
        'The alpha/beta split shows why: in Climb, beta rises while alpha stays low.',
      ],
      figures: [
        chart(
          'workload-per-phase',
          870,
          432,
          'Bar chart of the combined workload score per flight phase for pilot Delta. Climb is highest at +1.22, followed by Deceleration +0.52, Descent +0.35 and Take-Off +0.29; Initial Climb is lowest at −0.61.',
          'Combined workload score (EEG + HRV, z-score) per flight phase — pilot Delta, sessions 1, 5 and 9.',
        ),
        chart(
          'alpha-beta-per-phase',
          878,
          310,
          `Two charts: left, average EEG alpha and beta activity per flight phase, with alpha lowest in Climb; right, the EEG workload score (${WORKLOAD_FORMULA}) per phase, highest in Climb.`,
          `Left: average EEG alpha and beta activity per flight phase. Right: the EEG-only workload score (${WORKLOAD_FORMULA}) per phase.`,
        ),
      ],
    },
    {
      title: 'EEG and instructor ratings',
      takeaway: 'Higher beta and gamma activity tends to go with better ratings, but this is a possible relation, not a cause.',
      paragraphs: [
        'In some sessions, better-rated flights show higher beta and gamma activity, which may reflect more focus and cognitive effort.',
        'With few sessions, differences between pilots and phases, and outside influences such as fatigue, stress, caffeine and time of day, we treat this as an indication only.',
      ],
      figures: [],
    },
    {
      title: 'Heart rate over experience',
      takeaway: 'Heart rate tends to rise with training for five of six pilots; only Delta trends down.',
      paragraphs: [
        'Most pilots start lower and end higher, which may point to growing performance pressure. ARIMA slopes per pilot: Alpha +2.66, Charlie +2.48, Foxtrot +2.12, Bravo +1.73 and Echo +1.08 bpm per session; Delta −0.74.',
        'Of the pilots with both morning and afternoon sessions, all except Bravo have a higher heart rate in the afternoon (Foxtrot has afternoon data only). Ten sessions are too few to forecast reliably.',
      ],
      figures: [
        chart(
          'heart-rate-day-part',
          1071,
          367,
          'Left: box plots of heart rate per pilot, morning versus afternoon. Right: afternoon minus morning difference per pilot; Charlie, Echo, Alpha and Delta are higher in the afternoon, Bravo is lower.',
          'Heart rate per pilot in the morning and afternoon (left) and the afternoon-minus-morning difference (right).',
        ),
        chart(
          'heart-rate-trend',
          1236,
          507,
          'Line chart of average heart rate per pilot over sessions 1 to 10. Most lines rise over the sessions; Delta’s line trends down.',
          'Average heart rate per pilot across the ten training sessions.',
        ),
        chart(
          'arima-trends',
          1067,
          575,
          'Six small line charts, one per pilot, with actual heart rate per session and an ARIMA trend line: Alpha +2.66, Bravo +1.73, Charlie +2.48, Delta −0.74, Echo +1.08 and Foxtrot +2.12 bpm per session.',
          'ARIMA heart-rate trend per pilot over ten sessions, with the slope in bpm per session in each panel title.',
        ),
      ],
    },
    {
      title: 'Physiology and flight precision',
      takeaway: 'No single sensor explains flight errors, but together they explain 43% of the variance in altitude error.',
      paragraphs: [
        'We computed Spearman correlations with altitude and speed error (RMSE) in stable flight phases:',
      ],
      bullets: [
        'Larger pupil size goes with larger altitude errors: r = 0.43 in session 1, 0.55 in session 5 and 0.03 in session 9.',
        'Blink rate shows a weaker link early and late (0.30 and 0.29; 0.06 in session 5).',
        'Heart rate sometimes correlates negatively (−0.28 with altitude error in session 5, −0.30 with speed error in session 1), which can indicate a “stressed but controlled” state.',
        'Session 9 followed a 96-day break, consistent with skill decay.',
      ],
      closing:
        'The Random Forest reached R² = 0.43, with heart rate (36.1%), blink rate (32.8%) and pupil size (31.1%) contributing almost equally.',
      figures: [
        chart(
          'spearman-correlations',
          1502,
          592,
          'Grouped bar charts of Spearman correlations for sessions 1, 5 and 9 between blink rate, pupil size and heart rate and flight precision. Left, altitude error: pupil size 0.43, 0.55 and 0.03. Right, speed error: all correlations between −0.30 and 0.07.',
          'Spearman correlation between physiology and flight precision for sessions 1, 5 and 9 — altitude error (left) and speed error (right).',
        ),
        chart(
          'feature-importance',
          989,
          489,
          'Horizontal bar chart of Random Forest feature importance: heart rate 36.1%, blink rate 32.8%, pupil size 31.1%.',
          'Random Forest feature importance for predicting altitude error.',
        ),
      ],
    },
    {
      title: 'Exploratory: clusters and correlations',
      takeaway: 'Three distinct physiological states, and brain-wave bands that move together.',
      paragraphs: [
        'K-means on EEG and heart rate, shown as a PCA projection, separated three states: high mental activity, a low-activity baseline, and high arousal/focus. The first two principal components explain 41.8% and 24.5% of the variance.',
        'In the correlation matrix, beta and gamma move together (0.76), as do delta and theta (0.66).',
      ],
      figures: [
        chart(
          'pca-clusters',
          1390,
          989,
          'Scatter plot of moments projected on the first two principal components, coloured by K-means cluster: high mental activity, low-activity baseline and high arousal/focus.',
          'K-means clusters of EEG and heart-rate moments, projected on PC1 (41.8%) and PC2 (24.5%).',
        ),
        chart(
          'correlation-matrix',
          676,
          590,
          'Correlation heat map between delta, theta, alpha, beta and gamma EEG bands and heart rate. Beta and gamma correlate at 0.76, delta and theta at 0.66.',
          'Correlation matrix of the EEG bands and heart rate.',
        ),
      ],
    },
  ],

  reflection: [
    {
      title: 'Ethics',
      items: [
        'Calculated or imputed values must be labelled and never look like real measurements (GDPR accuracy principle).',
        'Impute only when necessary.',
        'No automatic hard conclusion about a person — the trainer keeps the final judgement.',
      ],
    },
    {
      title: 'Limitations',
      items: [
        'Few sessions and pilots.',
        'Missing values and sensor noise.',
        'Sessions 1, 5 and 9 were selected for several analyses.',
        'No hard validation metrics in the first analysis.',
      ],
    },
    {
      title: 'Recommendations',
      items: [
        'Automate cleaning, merging and export.',
        'Label original vs imputed values.',
        'Build dashboards per flight phase.',
        'Validate results with trainers.',
        'Collect more sessions before predicting.',
        'Document model settings (number of clusters, ARIMA p/d/q).',
        'Make an ethics check a fixed step.',
      ],
    },
  ],
};
