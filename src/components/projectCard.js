import { html } from './html.js';
import { stats } from './stats.js';
import { tagList } from './tags.js';

export function projectCard(project, { root, index }) {
  const titleId = `project-${project.id}`;
  const link = project.caseStudy
    ? html`<a class="card__link" href="${root}${project.caseStudy}" aria-describedby="${titleId}">Read the case study <span aria-hidden="true">→</span></a>`
    : null;

  return html`<article class="card project-card${project.caseStudy ? ' card--interactive' : ''}" aria-labelledby="${titleId}">
  <header class="project-card__header">
    <span class="project-card__index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
    <div>
      <h3 class="card__title" id="${titleId}">${project.title}</h3>
      <p class="card__meta">${project.organisation} · ${project.period}</p>
    </div>
  </header>
  <p class="card__body">${project.summary}</p>
  ${project.note ? html`<p class="project-card__note">${project.note}</p>` : null}
  ${stats(project.figures, { label: `Key figures: ${project.title}` })}
  <footer class="project-card__footer">
    ${tagList(project.tags, { label: `Topics: ${project.title}`, status: project.status })}
    ${link}
  </footer>
</article>`;
}
