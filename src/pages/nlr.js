import { html } from '../components/html.js';
import { page } from '../components/page.js';
import { section } from '../components/section.js';
import { figureGroup } from '../components/figure.js';
import { caseHeader, caseStudyNav, keyFigures, panelGrid, stepList } from '../components/caseStudy.js';
import { profile } from '../data/profile.js';
import { nlr } from '../data/nlr.js';
import { neighbours } from '../data/projects.js';

function dataNote(data) {
  return html`<div class="data-note">
  <p class="data-equation">
    <span class="visually-hidden">${data.equation.map((part) => `${part.value} ${part.label}`).join(' times ')} makes about ${data.total.value.replace('~', '')} ${data.total.label}.</span>
    ${data.equation.map(
      (part, index) => html`${index > 0 ? html`<span class="data-equation__operator" aria-hidden="true">×</span>` : null}<span class="data-equation__term" aria-hidden="true"><strong>${part.value}</strong> ${part.label}</span>`,
    )}
    <span class="data-equation__operator" aria-hidden="true">=</span>
    <span class="data-equation__term data-equation__term--total" aria-hidden="true"><strong>${data.total.value}</strong> ${data.total.label}</span>
  </p>
  <div class="data-note__files">
    <p class="data-note__label">Files per pilot, per session</p>
    <ul class="tag-list">${data.files.map((file) => html`<li class="tag tag--mono">${file}</li>`)}</ul>
  </div>
  <p class="data-note__text">${data.note}</p>
</div>`;
}

function resultSection(result, index, { root }) {
  const number = index + 1;
  const id = `result-${number}`;
  return html`<article class="result" id="${id}" aria-labelledby="${id}-title">
  <div class="result__text">
    <h3 class="result__title" id="${id}-title">${result.title}</h3>
    <p class="result__takeaway"><strong>${result.takeaway}</strong></p>
    ${result.paragraphs.map((paragraph) => html`<p>${paragraph}</p>`)}
    ${result.bullets ? html`<ul class="result__list">${result.bullets.map((item) => html`<li>${item}</li>`)}</ul>` : null}
    ${result.closing ? html`<p>${result.closing}</p>` : null}
  </div>
  ${figureGroup(result.figures, { root })}
</article>`;
}

export function nlrPage() {
  const root = '../../';
  const { previous, next } = neighbours(nlr.slug);

  const content = html`<div class="container case-study">
  ${caseHeader({
    root,
    title: nlr.title,
    meta: [nlr.organisation, nlr.period, nlr.team],
    lead: nlr.leadQuestion,
    tags: nlr.tags,
  })}

  ${keyFigures(nlr.keyFigures)}


  ${section({
    id: 'approach',
    title: 'Approach in four steps',
    intro: 'We worked as a team of five on every step, from raw sensor exports to a predictive model.',
    content: stepList(nlr.approach),
  })}

  ${section({
    id: 'data',
    title: 'The data',
    content: dataNote(nlr.data),
  })}

  ${section({
    id: 'results',
    title: 'Results',
    intro: 'Five findings, each with its takeaway first. The charts come from our research paper, so their labels are in Dutch.',
    content: html`<div class="results">${nlr.results.map((result, index) => resultSection(result, index, { root }))}</div>`,
  })}

  ${section({
    id: 'reflection',
    title: 'Ethics, limitations & recommendations',
    content: panelGrid(nlr.reflection),
  })}

  ${caseStudyNav({ root, previous, next })}
</div>`;

  return page({
    title: `${nlr.title} — ${profile.name}`,
    description: nlr.description,
    root,
    profile,
    content,
  });
}
