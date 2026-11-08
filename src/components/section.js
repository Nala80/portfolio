import { html } from './html.js';

/** Page section: heading (and optional short intro) in the left column, content on the right. */
export function section({ id, title, intro, content, className = '' }) {
  const headingId = `${id}-title`;
  return html`<section class="section ${className}" id="${id}" aria-labelledby="${headingId}">
  <div class="section__head">
    <h2 class="section__title" id="${headingId}">${title}</h2>
    ${intro ? html`<p class="section__intro">${intro}</p>` : null}
  </div>
  <div class="section__body">
    ${content}
  </div>
</section>`;
}
