import { html } from './html.js';

export function experienceTimeline(items) {
  return html`<ol class="timeline">
  ${items.map(
    (item) => html`<li class="timeline__item">
    <p class="timeline__period">${item.period}</p>
    <h4 class="timeline__role">${item.role}</h4>
    <p class="timeline__org">${item.organisation}</p>
    ${item.description ? html`<p class="timeline__description">${item.description}</p>` : null}
  </li>`,
  )}
</ol>`;
}

export function educationList(items) {
  return html`${items.map(
    (item) => html`<div class="card education">
  <div>
    <p class="timeline__period">${item.period}</p>
    <h4 class="education__degree">${item.degree}</h4>
    <p class="timeline__org">${item.school}</p>
  </div>
  <div>
    <p class="education__label">Coursework</p>
    <ul class="tag-list">${item.coursework.map((course) => html`<li class="tag">${course}</li>`)}</ul>
  </div>
</div>`,
  )}`;
}
