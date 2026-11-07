import { html } from './html.js';

/** Link that leaves the site: opens in a new tab and shares no referrer. */
export function externalLink({ href, label, className }) {
  return html`<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${label}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
}
