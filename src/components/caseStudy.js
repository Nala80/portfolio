// Building blocks shared by the case-study pages.

import { html } from './html.js';
import { stats } from './stats.js';
import { tagList } from './tags.js';

export function caseHeader({ root, eyebrow = 'Case study', title, meta, lead, intro, tags, aside }) {
  return html`<header class="case-header">
  <a class="back-link" href="${root}#projects"><span aria-hidden="true">←</span> All projects</a>
  <div class="case-header__grid">
    <div class="case-header__text">
      <p class="section__eyebrow">${eyebrow}</p>
      <h1 class="case-header__title">${title}</h1>
      <p class="case-header__meta">${meta.join(' · ')}</p>
      ${lead ? html`<blockquote class="lead-question"><p>${lead}</p></blockquote>` : null}
      ${intro ? html`<p class="case-header__intro">${intro}</p>` : null}
      ${tagList(tags, { label: 'Topics' })}
    </div>
    ${aside ? html`<div class="case-header__aside">${aside}</div>` : null}
  </div>
</header>`;
}

/** "On this page" jump links for long pages. */
export function onThisPage(items) {
  return html`<nav class="on-this-page" aria-label="On this page">
  <p class="on-this-page__title">On this page</p>
  <ol>${items.map((item) => html`<li><a href="#${item.id}">${item.label}</a></li>`)}</ol>
</nav>`;
}

/** Numbered horizontal process (stacks on small screens). */
export function stepList(steps) {
  return html`<ol class="steps">
  ${steps.map(
    (step, index) => html`<li class="step">
    <span class="step__number" aria-hidden="true">${index + 1}</span>
    <h3 class="step__title">${step.title}</h3>
    <p class="step__text">${step.text}</p>
  </li>`,
  )}
</ol>`;
}

/** Row of bordered panels with a title and a bullet list each. */
export function panelGrid(panels, { headingLevel = 3 } = {}) {
  return html`<div class="panel-grid">
  ${panels.map(
    (panel) => html`<div class="panel">
    ${headingLevel === 3 ? html`<h3 class="panel__title">${panel.title}</h3>` : html`<h4 class="panel__title">${panel.title}</h4>`}
    ${panel.text ? html`<p class="panel__text">${panel.text}</p>` : null}
    ${panel.items ? html`<ul>${panel.items.map((item) => html`<li>${item}</li>`)}</ul>` : null}
  </div>`,
  )}
</div>`;
}

export function keyFigures(figures) {
  return stats(figures, { large: true, label: 'Key figures' });
}

/** Links to the previous/next case study and back to the overview. */
export function caseStudyNav({ root, previous, next }) {
  const link = (project, direction) =>
    html`<a class="case-nav__link case-nav__link--${direction}" href="${root}${project.caseStudy}">
      <span class="case-nav__label">${direction === 'next' ? 'Next case study' : 'Previous case study'}</span>
      <span class="case-nav__title">${direction === 'previous' ? html`<span aria-hidden="true">← </span>` : null}${project.title}${direction === 'next' ? html`<span aria-hidden="true"> →</span>` : null}</span>
    </a>`;

  return html`<nav class="case-nav" aria-label="More projects">
  ${previous ? link(previous, 'previous') : html`<a class="case-nav__link" href="${root}#projects"><span class="case-nav__label">Overview</span><span class="case-nav__title"><span aria-hidden="true">← </span>All projects</span></a>`}
  ${next ? link(next, 'next') : null}
</nav>`;
}
