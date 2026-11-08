import { html } from './html.js';

/** A quiet, comma-separated line of topics, optionally led by a status such as "In progress". */
export function tagList(tags, { label = 'Tags', status } = {}) {
  if (!tags?.length && !status) return null;
  const list = tags?.length ? html`<ul class="tag-list" aria-label="${label}">${tags.map((tag) => html`<li>${tag}</li>`)}</ul>` : null;
  if (!status) return list;
  return html`<div class="topics"><span class="status">${status}</span>${list}</div>`;
}
