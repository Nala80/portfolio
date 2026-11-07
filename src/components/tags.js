import { html } from './html.js';

export function tagList(tags, { label = 'Tags', status } = {}) {
  if (!tags?.length && !status) return null;
  return html`<ul class="tag-list" aria-label="${label}">
  ${status ? html`<li class="tag tag--status">${status}</li>` : null}
  ${(tags ?? []).map((tag) => html`<li class="tag">${tag}</li>`)}
</ul>`;
}
