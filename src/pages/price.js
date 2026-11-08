import { html } from '../components/html.js';
import { page } from '../components/page.js';
import { caseHeader, caseStudyNav, chapter, keyFigures, processFlow } from '../components/caseStudy.js';
import { crossSectionDiagram } from '../components/diagrams/crossSection.js';
import { radarTemplate } from '../components/diagrams/radar.js';
import { profile } from '../data/profile.js';
import { price } from '../data/price.js';
import { neighbours } from '../data/projects.js';

export function pricePage() {
  const root = '../../';
  const { previous, next } = neighbours(price.slug);
  const { logo } = price;

  // Diagrams that belong to a chapter, placed after its text.
  const diagrams = {
    setup: html`<figure class="diagram-figure diagram-figure--cross-section">
      ${crossSectionDiagram()}
      <figcaption><strong>Principle:</strong> ${price.chapters.find((c) => c.id === 'setup').principle}</figcaption>
    </figure>`,
    additions: html`<figure class="diagram-figure diagram-figure--radar">
      ${radarTemplate({ axes: price.radar.axes })}
      <figcaption>${price.radar.caption}</figcaption>
    </figure>`,
  };

  const content = html`<article class="container case-study">
  ${caseHeader({
    root,
    title: price.title,
    meta: [price.organisation, price.period],
    lead: price.intro,
    tags: price.tags,
    aside: html`<img class="case-logo" src="${root}${logo.src}" alt="${logo.alt}" width="${logo.width}" height="${logo.height}">`,
  })}

  ${keyFigures(price.facts)}
  ${processFlow(price.chapters)}

  ${price.chapters.map((item) => chapter({ ...item, root, after: diagrams[item.id] }))}

  ${caseStudyNav({ root, previous, next })}
</article>`;

  return page({
    title: `${price.title} — ${profile.name}`,
    description: price.description,
    root,
    profile,
    content,
  });
}
