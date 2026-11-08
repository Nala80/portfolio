import { html } from './html.js';

/** Link that leaves the site: opens in a new tab and shares no referrer. */
export function externalLink({ href, label, className, arrow = false }) {
  return html`<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${label}${arrow ? html`<span class="arrow" aria-hidden="true">↗</span>` : null}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
}

/** Internal link with a trailing arrow, used for "read more" style links. */
export function arrowLink({ href, label, describedBy }) {
  return html`<a class="text-link" href="${href}"${describedBy ? html` aria-describedby="${describedBy}"` : null}>${label}<span class="arrow" aria-hidden="true">→</span></a>`;
}
