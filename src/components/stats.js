import { html } from './html.js';

/** Row of key figures: [{ value, label }]. */
export function stats(figures, { large = false, label } = {}) {
  if (!figures?.length) return null;
  return html`<ul class="stats${large ? ' stats--large' : ''}"${label ? html` aria-label="${label}"` : null}>
  ${figures.map((figure) => html`<li class="stat"><span class="stat__label">${figure.label}</span><span class="stat__value">${figure.value}</span></li>`)}
</ul>`;
}
