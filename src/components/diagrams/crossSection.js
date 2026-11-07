import { html } from '../html.js';

// Cross-section of one roof test setup, drawn top (outside) to bottom (room).
// Colours come from CSS classes, so the diagram follows the site theme.

const VIEW = { width: 490, height: 400 };
const LAYER_X = 24;
const LAYER_WIDTH = 300;
const PROBE_X = 210;
const LABEL_X = 352;

const LAYERS = [
  { id: 'outside', label: 'Outside', y: 16, height: 72, className: 'xs-outside' },
  { id: 'roof', label: 'Roof', y: 88, height: 30, className: 'xs-roof' },
  { id: 'insulation', label: 'Biobased insulation', y: 118, height: 170, className: 'xs-insulation' },
  { id: 'room', label: 'Room (exhibition space)', y: 288, height: 96, className: 'xs-room' },
];

const insulation = LAYERS[2];
const SENSORS = [
  { label: 'T1', position: 'outer edge', y: insulation.y + 8 },
  { label: 'T2', position: 'middle', y: insulation.y + insulation.height / 2 },
  { label: 'T3', position: 'inner edge', y: insulation.y + insulation.height - 8 },
];

export function crossSectionDiagram({ id = 'cross-section' } = {}) {
  return html`<svg class="diagram cross-section" viewBox="0 0 ${VIEW.width} ${VIEW.height}" role="img" aria-labelledby="${id}-title ${id}-desc">
  <title id="${id}-title">Cross-section of a test setup</title>
  <desc id="${id}-desc">From top to bottom: outside, roof, biobased insulation and the room. Three temperature sensors sit in the insulation: T1 at the outer edge, T2 in the middle and T3 at the inner edge.</desc>
  <defs>
    <pattern id="${id}-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line class="xs-hatch" x1="0" y1="0" x2="0" y2="9"></line>
    </pattern>
  </defs>
  ${LAYERS.map(
    (layer) => html`<rect class="${layer.className}" x="${LAYER_X}" y="${layer.y}" width="${LAYER_WIDTH}" height="${layer.height}"></rect>`,
  )}
  <rect class="xs-insulation-hatch" x="${LAYER_X}" y="${insulation.y}" width="${LAYER_WIDTH}" height="${insulation.height}" fill="url(#${id}-hatch)"></rect>
  ${LAYERS.map(
    (layer) => html`<text class="xs-layer-label" x="${LAYER_X + 14}" y="${layer.y + 24}">${layer.label}</text>`,
  )}
  <line class="xs-probe" x1="${PROBE_X}" y1="${insulation.y}" x2="${PROBE_X}" y2="${insulation.y + insulation.height}"></line>
  ${SENSORS.map(
    (sensor) => html`<g class="xs-sensor">
    <line class="xs-leader" x1="${PROBE_X + 9}" y1="${sensor.y}" x2="${LABEL_X - 8}" y2="${sensor.y}"></line>
    <circle cx="${PROBE_X}" cy="${sensor.y}" r="7"></circle>
    <text class="xs-sensor-label" x="${LABEL_X}" y="${sensor.y + 5}"><tspan class="xs-sensor-id">${sensor.label}</tspan> · ${sensor.position}</text>
  </g>`,
  )}
  <text class="xs-axis" x="${LABEL_X}" y="${LAYERS[0].y + 24}">outside temperature</text>
  <text class="xs-axis" x="${LABEL_X}" y="${LAYERS[3].y + 24}">inside temperature</text>
</svg>`;
}
