import { html } from './html.js';
import { arrowLink } from './link.js';
import { stats } from './stats.js';
import { tagList } from './tags.js';

/** One project in the list on the home page. */
export function projectEntry(project, { root }) {
  const titleId = `project-${project.id}`;
  const href = project.caseStudy ? `${root}${project.caseStudy}` : null;

  return html`<article class="project" aria-labelledby="${titleId}">
  <p class="project__meta">${project.organisation} · ${project.period}</p>
  <h3 class="project__title" id="${titleId}">${href ? html`<a href="${href}">${project.title}</a>` : project.title}</h3>
  <p class="project__summary">${project.summary}</p>
  ${project.note ? html`<p class="project__note">${project.note}</p>` : null}
  ${stats(project.figures, { label: `Key figures: ${project.title}` })}
  <div class="project__footer">
    ${tagList(project.tags, { label: `Topics: ${project.title}`, status: project.status })}
    ${href ? arrowLink({ href, label: 'Read the case study', describedBy: titleId }) : null}
  </div>
</article>`;
}

export function projectList(projects, { root }) {
  return html`<div class="projects">${projects.map((project) => projectEntry(project, { root }))}</div>`;
}
