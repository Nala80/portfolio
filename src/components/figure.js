import { html } from './html.js';

/**
 * Image figure on a soft light backdrop, so charts made on a white background
 * stay readable on the dark theme.
 */
export function figure({ src, alt, caption, width, height }, { root }) {
  return html`<figure class="figure">
  <div class="figure__frame">
    <img src="${root}${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async">
  </div>
  ${caption ? html`<figcaption>${caption}</figcaption>` : null}
</figure>`;
}
