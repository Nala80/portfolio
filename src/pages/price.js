import { html } from '../components/html.js';
import { page } from '../components/page.js';
import { section } from '../components/section.js';
import { figureGroup } from '../components/figure.js';
import { stats } from '../components/stats.js';
import { caseHeader, caseStudyNav, onThisPage, panelGrid } from '../components/caseStudy.js';
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
    aside: html`<div class="logo-chip"><img src="${root}${logo.src}" alt="${logo.alt}" width="${logo.width}" height="${logo.height}"></div>`,
  })}

  ${stats(price.facts, { label: 'Project facts' })}

  ${onThisPage([
    { id: 'setup', label: 'The test setup' },
    { id: 'sensors', label: 'What the sensors measure' },
    { id: 'assignment', label: 'The assignment' },
    { id: 'radar', label: 'Material analysis' },
    { id: 'wireframes', label: 'Wireframes' },
    { id: 'planning', label: 'Planning' },
  ])}

  ${section({
    id: 'setup',
    eyebrow: 'Context',
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
    eyebrow: 'Data sources',
    title: 'What the sensors measure',
    content: html`<div class="grid-2x2">${panelGrid(price.sensors)}</div>`,
  })}

  ${section({
    id: 'assignment',
    eyebrow: 'Brief',
    title: 'The assignment',
    content: html`<div class="split split--even">
      <div class="panel">
        <h3 class="panel__title">What was asked</h3>
        <ol class="numbered-list">${price.assignment.map((item) => html`<li>${item}</li>`)}</ol>
      </div>
      <div class="choice-list">
        <h3 class="choice-list__title">Extra assignments we chose</h3>
        ${price.extraAssignments.map(
          (item) => html`<div class="choice">
          <h4 class="choice__title">${item.title}</h4>
          <p class="choice__text">${item.text}</p>
        </div>`,
        )}
      </div>
    </div>`,
  })}

  ${section({
    id: 'radar',
    eyebrow: 'Extra assignment',
    title: 'Material analysis: the radar chart',
    intro: 'Every material gets the same six sustainability axes, so the four can be compared at a glance. The template below shows the axes only; it holds no scores.',
    content: html`<div class="split">
      <figure class="diagram-figure diagram-figure--radar">
        ${radarTemplate({ axes: price.radar.axes })}
        <figcaption>Template: six axes, no values.</figcaption>
      </figure>
      <ul class="note-list">${price.radar.notes.map((note) => html`<li>${note}</li>`)}</ul>
    </div>`,
  })}

  ${section({
    id: 'wireframes',
    eyebrow: 'Design',
    title: 'Wireframes',
    // Wireframes hold small text, so they always get the full width.
    content: figureGroup(price.wireframes, { root, stack: true }),
  })}

  ${section({
    id: 'planning',
    eyebrow: 'Timeline',
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
