import { html } from './html.js';

const TALL_GROUP_SIZE = 5;

function skillGroup(group, { quiet = false } = {}) {
  const classes = ['skill-group', quiet && 'skill-group--quiet', group.items.length >= TALL_GROUP_SIZE && 'skill-group--tall'];
  return html`<div class="${classes.filter(Boolean).join(' ')}">
  <h3 class="skill-group__title">${group.title}</h3>
  <ul class="tag-list">${group.items.map((item) => html`<li class="tag">${item}</li>`)}</ul>
</div>`;
}

export function skills({ technical, other }) {
  return html`<div class="skills">
  <div class="skills__technical">${technical.map((group) => skillGroup(group))}</div>
  <div class="skills__other">${other.map((group) => skillGroup(group, { quiet: true }))}</div>
</div>`;
}
