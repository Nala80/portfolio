import { html } from './html.js';

/** Page section with an eyebrow label, a heading and optional intro text. */
export function section({ id, eyebrow, title, intro, content, className = '' }) {
  const headingId = `${id}-title`;
  return html`<section class="section ${className}" id="${id}" aria-labelledby="${headingId}">
  <div class="section__header">
    ${eyebrow ? html`<p class="section__eyebrow">${eyebrow}</p>` : null}
    <h2 class="section__title" id="${headingId}">${title}</h2>
    ${intro ? html`<p class="section__intro">${intro}</p>` : null}
  </div>
  ${content}
</section>`;
}
