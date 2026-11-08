import { html } from './html.js';

/** Dated entries (experience, education): period on the left, details on the right. */
function entry({ period, title, subtitle, description }) {
  return html`<li class="entry">
  <p class="entry__period">${period}</p>
  <div class="entry__body">
    <h4 class="entry__title">${title}</h4>
    <p class="entry__subtitle">${subtitle}</p>
    ${description ? html`<p class="entry__description">${description}</p>` : null}
  </div>
</li>`;
}

export function experienceList(items) {
  return html`<ol class="entries">
  ${items.map((item) =>
    entry({ period: item.period, title: item.role, subtitle: item.organisation, description: item.description }),
  )}
</ol>`;
}

export function educationList(items) {
  return html`<ol class="entries">
  ${items.map((item) =>
    entry({
      period: item.period,
      title: item.degree,
      subtitle: item.school,
      description: `Coursework: ${item.coursework.join(', ')}.`,
    }),
  )}
</ol>`;
}
