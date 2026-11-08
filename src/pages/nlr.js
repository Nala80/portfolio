import { html } from '../components/html.js';
import { page } from '../components/page.js';
import { section } from '../components/section.js';
import { caseHeader, caseStudyNav, chapter, keyFigures, processFlow } from '../components/caseStudy.js';
import { profile } from '../data/profile.js';
import { nlr } from '../data/nlr.js';
import { neighbours } from '../data/projects.js';

/** "10 sessions × 6 pilots × 6 files = ~360 CSV files", plus the file names. */
function dataOverview(data) {
  const spoken = `${data.equation.map((part) => `${part.value} ${part.label}`).join(' times ')} makes about ${data.total.value.replace('~', '')} ${data.total.label}.`;
  return html`<div class="data-overview">
  <p class="data-equation">
    <span class="visually-hidden">${spoken}</span>
    ${data.equation.map(
      (part, index) => html`${index > 0 ? html`<span class="data-equation__operator" aria-hidden="true">×</span>` : null}<span class="data-equation__term" aria-hidden="true"><strong>${part.value}</strong> ${part.label}</span>`,
    )}
    <span class="data-equation__operator" aria-hidden="true">=</span>
    <span class="data-equation__term" aria-hidden="true"><strong>${data.total.value}</strong> ${data.total.label}</span>
  </p>
  <p class="data-files">Per pilot, per session: ${data.files.map((file, index) => html`${index > 0 ? ', ' : ''}<code>${file}</code>`)}</p>
</div>`;
}

export function nlrPage() {
  const root = '../../';
  const { previous, next } = neighbours(nlr.slug);

  const content = html`<article class="container case-study">
  ${caseHeader({
    root,
    title: nlr.title,
    meta: [nlr.organisation, nlr.period, nlr.team],
    lead: nlr.leadQuestion,
    tags: nlr.tags,
  })}

  ${keyFigures(nlr.keyFigures)}
  ${processFlow(nlr.chapters)}

  ${nlr.chapters.map((item) =>
    chapter({
      ...item,
      root,
      extra: item.data ? dataOverview(item.data) : null,
    }),
  )}

  ${section({
    id: 'reflection',
    title: 'Looking back',
    className: 'chapter',
    content: html`<div class="prose">${nlr.reflection.map((part) => html`<p><strong>${part.lead}</strong> ${part.text}</p>`)}</div>`,
  })}

  ${caseStudyNav({ root, previous, next })}
</article>`;

  return page({
    title: `${nlr.title} — ${profile.name}`,
    description: nlr.description,
    root,
    profile,
    content,
  });
}
