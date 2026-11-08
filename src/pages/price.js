import { html } from '../components/html.js';
import { page } from '../components/page.js';
import { section } from '../components/section.js';
import { figureGroup } from '../components/figure.js';
import { stats } from '../components/stats.js';
import { caseHeader, caseStudyNav, panelGrid } from '../components/caseStudy.js';
import { crossSectionDiagram } from '../components/diagrams/crossSection.js';
import { radarTemplate } from '../components/diagrams/radar.js';
import { profile } from '../data/profile.js';
import { price } from '../data/price.js';
import { neighbours } from '../data/projects.js';

function timeline(items) {
  return html`<ol class="h-timeline">
  ${items.map(
    (item) => html`<li class="h-timeline__item">
    <p class="h-timeline__date">${item.date}</p>
    <h3 class="h-timeline__title">${item.title}</h3>
    <p class="h-timeline__text">${item.text}</p>
  </li>`,
  )}
</ol>`;
}

export function pricePage() {
  const root = '../../';
  const { previous, next } = neighbours(price.slug);
  const { logo } = price;

  const content = html`<div class="container case-study">
  ${caseHeader({
    root,
    title: price.title,
    meta: [price.organisation, price.period],
    intro: price.intro,
    tags: price.tags,
    aside: html`<img class="case-logo" src="${root}${logo.src}" alt="${logo.alt}" width="${logo.width}" height="${logo.height}">`,
  })}

  ${stats(price.facts, { label: 'Project facts' })}

  ${section({
    id: 'setup',
    title: 'The test setup',
    content: html`<div class="split">
      <div class="prose">
        ${price.setup.paragraphs.map((paragraph) => html`<p>${paragraph}</p>`)}
        <ul class="tag-list" aria-label="Materials">${price.setup.materials.map((material) => html`<li class="tag">${material}</li>`)}</ul>
      </div>
      <figure class="diagram-figure">
        ${crossSectionDiagram()}
        <figcaption><strong>Principle:</strong> ${price.setup.principle}</figcaption>
      </figure>
    </div>`,
  })}

  ${section({
    id: 'sensors',
    title: 'What the sensors measure',
    content: html`${panelGrid(price.sensors)}`,
  })}

  ${section({
    id: 'assignment',
    title: 'The assignment',
    content: html`<div class="split split--even">
      <div class="column">
        <h3 class="column__title">What was asked</h3>
        <ul class="column__list">${price.assignment.map((item) => html`<li>${item}</li>`)}</ul>
      </div>
      <div class="column">
        <h3 class="column__title">Extra assignments we chose</h3>
        ${price.extraAssignments.map(
          (item) => html`<p class="column__text"><strong>${item.title}.</strong> ${item.text}</p>`,
        )}
      </div>
    </div>`,
  })}

  ${section({
    id: 'radar',
    title: 'Material analysis: the radar chart',
    intro: 'Every material gets the same six sustainability axes, so the four can be compared at a glance. The template below shows the axes only; it holds no scores.',
    content: html`<div class="split">
      <figure class="diagram-figure diagram-figure--radar">
        ${radarTemplate({ axes: price.radar.axes })}
        <figcaption>Template: six axes, no values.</figcaption>
      </figure>
      <div class="prose">${price.radar.notes.map((note) => html`<p>${note}</p>`)}</div>
    </div>`,
  })}

  ${section({
    id: 'wireframes',
    title: 'Wireframes',
    // Wireframes hold small text, so they always get the full width.
    content: figureGroup(price.wireframes, { root, stack: true }),
  })}

  ${section({
    id: 'planning',
    title: 'Planning',
    content: timeline(price.timeline),
  })}

  ${caseStudyNav({ root, previous, next })}
</div>`;

  return page({
    title: `${price.title} — ${profile.name}`,
    description: price.description,
    root,
    profile,
    content,
  });
}
