// Building blocks shared by the case-study pages.

import { html } from './html.js';
import { stats } from './stats.js';
import { tagList } from './tags.js';

export function caseHeader({ root, title, meta, lead, intro, tags, aside }) {
  return html`<header class="case-header">
  <a class="back-link" href="${root}#projects"><span aria-hidden="true">←</span> All projects</a>
  <div class="case-header__grid">
    <div class="case-header__text">
      <h1 class="case-header__title">${title}</h1>
      <p class="case-header__meta">${meta.join(' · ')}</p>
      ${lead ? html`<p class="case-header__lead">${lead}</p>` : null}
      ${intro ? html`<p class="case-header__lead">${intro}</p>` : null}
      ${tagList(tags, { label: 'Topics' })}
    </div>
    ${aside ? html`<div class="case-header__aside">${aside}</div>` : null}
  </div>
</header>`;
}

/** Process steps as short text blocks side by side (stacked on small screens). */
export function stepList(steps) {
  return html`<ol class="steps">
  ${steps.map(
    (step) => html`<li class="step">
    <h3 class="step__title">${step.title}</h3>
    <p class="step__text">${step.text}</p>
  </li>`,
  )}
</ol>`;
}

/** Text columns with a small heading each. */
export function panelGrid(panels, { headingLevel = 3 } = {}) {
  return html`<div class="columns">
  ${panels.map(
    (panel) => html`<div class="column">
    ${headingLevel === 3 ? html`<h3 class="column__title">${panel.title}</h3>` : html`<h4 class="column__title">${panel.title}</h4>`}
    ${panel.text ? html`<p class="column__text">${panel.text}</p>` : null}
    ${panel.items ? html`<ul class="column__list">${panel.items.map((item) => html`<li>${item}</li>`)}</ul>` : null}
  </div>`,
  )}
</div>`;
}

export function keyFigures(figures) {
  return stats(figures, { large: true, label: 'Key figures' });
}

/** Links to the previous/next case study and back to the overview. */
export function caseStudyNav({ root, previous, next }) {
  const item = (label, href, title, direction) => html`<a class="case-nav__link case-nav__link--${direction}" href="${href}">
    <span class="case-nav__label">${label}</span>
    <span class="case-nav__title">${direction === 'previous' ? html`<span aria-hidden="true">← </span>` : null}${title}${direction === 'next' ? html`<span aria-hidden="true"> →</span>` : null}</span>
  </a>`;

  return html`<nav class="case-nav" aria-label="More projects">
  ${previous
    ? item('Previous case study', `${root}${previous.caseStudy}`, previous.title, 'previous')
    : item('Overview', `${root}#projects`, 'All projects', 'previous')}
  ${next ? item('Next case study', `${root}${next.caseStudy}`, next.title, 'next') : null}
</nav>`;
}
