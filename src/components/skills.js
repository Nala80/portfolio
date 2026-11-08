import { html } from './html.js';

function skillRow(group, { quiet = false } = {}) {
  return html`<div class="skill-row${quiet ? ' skill-row--quiet' : ''}">
  <dt>${group.title}</dt>
  <dd><ul class="tag-list">${group.items.map((item) => html`<li>${item}</li>`)}</ul></dd>
</div>`;
}

/** Skills as label/value rows: technical groups first, the rest quieter below. */
export function skills({ technical, other }) {
  return html`<dl class="skill-rows">
  ${technical.map((group) => skillRow(group))}
  ${other.map((group) => skillRow(group, { quiet: true }))}
</dl>`;
}
