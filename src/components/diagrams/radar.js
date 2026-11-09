import { html } from '../html.js';

// Radar chart: rings, axes and labels, plus an optional filled shape built from
// values between 0 and 1 (one per axis, in axis order).
// radarLayout() is exported so tests can check every label fits in the viewBox.

export const RADAR = {
  // Visible area, cropped tightly around the labels so the chart renders large.
  viewBox: { x: 70, y: 24, width: 480, height: 356 },
  cx: 300,
  cy: 200,
  radius: 108,
  rings: 4,
  labelOffset: 16,
  fontSize: 18,
  lineHeight: 21,
};

const round = (value) => Math.round(value * 10) / 10;

function point(angleDeg, distance) {
  const angle = (angleDeg * Math.PI) / 180;
  return { x: round(RADAR.cx + distance * Math.cos(angle)), y: round(RADAR.cy + distance * Math.sin(angle)) };
}

/** Positions of axes and labels; axis 0 points straight up, then clockwise. */
export function radarLayout(axes) {
  const step = 360 / axes.length;
  return axes.map((lines, index) => {
    const angle = -90 + index * step;
    const end = point(angle, RADAR.radius);
    const anchorPoint = point(angle, RADAR.radius + RADAR.labelOffset);
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);

    let anchor = 'middle';
    if (cos > 0.2) anchor = 'start';
    if (cos < -0.2) anchor = 'end';

    // Stack the label lines away from the chart: upwards at the top, downwards
    // at the bottom, centred on the anchor point at the sides.
    const totalHeight = (lines.length - 1) * RADAR.lineHeight;
    let firstBaseline;
    if (sin < -0.9) firstBaseline = anchorPoint.y - totalHeight;
    else if (sin > 0.9) firstBaseline = anchorPoint.y + RADAR.fontSize;
    else firstBaseline = anchorPoint.y - totalHeight / 2 + RADAR.fontSize / 3;

    return {
      lines,
      end,
      anchor,
      x: anchorPoint.x,
      baselines: lines.map((_, lineIndex) => round(firstBaseline + lineIndex * RADAR.lineHeight)),
    };
  });
}

/** Corner points of a shape in which axis i reaches fractions[i] of the radius. */
function shapePoints(fractions) {
  const step = 360 / fractions.length;
  return fractions.map((fraction, index) => point(-90 + index * step, RADAR.radius * fraction));
}

const toPoints = (points) => points.map(({ x, y }) => `${x},${y}`).join(' ');

function ringPoints(axisCount, fraction) {
  return toPoints(shapePoints(Array(axisCount).fill(fraction)));
}

function radarShape(values) {
  const corners = shapePoints(values);
  return html`<g class="radar-shape">
  <polygon class="radar-shape__area" points="${toPoints(corners)}"></polygon>
  ${corners.map(({ x, y }) => html`<circle class="radar-shape__point" cx="${x}" cy="${y}" r="4"></circle>`)}
</g>`;
}

export function radarChart({ axes, values, title, description, id = 'radar-chart' }) {
  if (values && (values.length !== axes.length || values.some((value) => value < 0 || value > 1))) {
    throw new Error('radarChart: give exactly one value between 0 and 1 per axis');
  }
  const layout = radarLayout(axes);
  const rings = Array.from({ length: RADAR.rings }, (_, index) => (index + 1) / RADAR.rings);

  const { viewBox } = RADAR;
  return html`<svg class="diagram radar" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}" role="img" aria-labelledby="${id}-title ${id}-desc">
  <title id="${id}-title">${title}</title>
  <desc id="${id}-desc">${description} Axes: ${axes.map((lines) => lines.join(' ')).join('; ')}.</desc>
  ${rings.map((fraction) => html`<polygon class="radar-ring${fraction === 1 ? ' radar-ring--outer' : ''}" points="${ringPoints(axes.length, fraction)}"></polygon>`)}
  ${layout.map((axis) => html`<line class="radar-axis" x1="${RADAR.cx}" y1="${RADAR.cy}" x2="${axis.end.x}" y2="${axis.end.y}"></line>`)}
  ${values ? radarShape(values) : null}
  ${layout.map(
    (axis) => html`<text class="radar-label" text-anchor="${axis.anchor}" font-size="${RADAR.fontSize}">${axis.lines.map(
      (line, index) => html`<tspan x="${axis.x}" y="${axis.baselines[index]}">${line}</tspan>`,
    )}</text>`,
  )}
  <circle class="radar-centre" cx="${RADAR.cx}" cy="${RADAR.cy}" r="3"></circle>
</svg>`;
}
