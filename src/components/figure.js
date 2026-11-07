import { html } from './html.js';

/**
 * Image figure on a light "paper" frame, so charts and wireframes made on a
 * white background stay readable on the dark theme.
 */
export function figure({ src, alt, caption, width, height }, { root }) {
  return html`<figure class="figure">
  <div class="figure__frame">
    <img src="${root}${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async">
  </div>
  ${caption ? html`<figcaption>${caption}</figcaption>` : null}
</figure>`;
}

// Wider than this and a chart becomes unreadable at half the page width.
const MAX_SIDE_BY_SIDE_RATIO = 1.6;

/**
 * One or more figures. A pair of compact (near-square) figures sits side by
 * side on wide screens; wide charts always get the full width.
 */
export function figureGroup(figures, { root, stack = false } = {}) {
  if (!figures?.length) return null;
  const sideBySide =
    !stack && figures.length === 2 && figures.every((item) => item.width / item.height <= MAX_SIDE_BY_SIDE_RATIO);
  return html`<div class="figure-grid${sideBySide ? ' figure-grid--two' : ''}">
  ${figures.map((item) => figure(item, { root }))}
</div>`;
}
