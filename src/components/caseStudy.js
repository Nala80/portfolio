// Building blocks shared by the case-study pages. A case study reads as an
// article: a header, a quiet process overview, then chapters of prose, each
// backed by one piece of evidence (a figure or a highlighted result).

import { html } from './html.js';
import { figure } from './figure.js';
import { stats } from './stats.js';
import { tagList } from './tags.js';
import { section } from './section.js';

export function caseHeader({ root, title, meta, lead, tags, aside }) {
  return html`<header class="case-header">
  <a class="back-link" href="${root}#projects"><span aria-hidden="true">←</span> All projects</a>
  <div class="case-header__grid">
    <div class="case-header__text">
      <h1 class="case-header__title">${title}</h1>
      <p class="case-header__meta">${meta.join(' · ')}</p>
      ${lead ? html`<p class="case-header__lead">${lead}</p>` : null}
      ${tagList(tags, { label: 'Topics' })}
    </div>
    ${aside ? html`<div class="case-header__aside">${aside}</div>` : null}
  </div>
</header>`;
}

export function keyFigures(figures) {
  return stats(figures, { large: true, label: 'Key figures' });
}

/** The process at a glance: step names joined by arrows, each linking to its chapter. */
export function processFlow(chapters) {
  return html`<nav class="flow" aria-label="Process">
  <ol>${chapters.map((chapter) => html`<li><a href="#${chapter.id}">${chapter.step}</a></li>`)}</ol>
</nav>`;
}

/**
 * One chapter of the story: prose, an optional highlighted result and an
 * optional figure, plus any extra content (e.g. a diagram) after the text.
 */
export function chapter({ id, title, paragraphs = [], highlight, figure: chapterFigure, extra, after, root }) {
  return section({
    id,
    title,
    className: 'chapter',
    content: html`<div class="chapter__body">
      <div class="prose">${paragraphs.map((paragraph) => html`<p>${paragraph}</p>`)}</div>
      ${extra}
      ${highlight ? html`<p class="highlight">${highlight}</p>` : null}
      ${chapterFigure ? figure(chapterFigure, { root }) : null}
      ${after}
    </div>`,
  });
}

/** Closing reflection: a few plain paragraphs under one heading. */
export function reflection(paragraphs) {
  return section({
    id: 'reflection',
    title: 'Looking back',
    className: 'chapter',
    content: html`<div class="prose">${paragraphs.map((paragraph) => html`<p>${paragraph}</p>`)}</div>`,
  });
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
