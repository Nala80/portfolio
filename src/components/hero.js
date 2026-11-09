import { html } from './html.js';
import { externalLink } from './link.js';

export function hero({ profile, root }) {
  const { photo } = profile;
  return html`<section class="hero" aria-labelledby="hero-title">
  <div class="hero__text">
    <h1 class="hero__title" id="hero-title">${profile.name}</h1>
    <p class="hero__role">${profile.role}</p>
    <p class="hero__tagline">${profile.tagline}</p>
    <div class="actions">
      <a class="button" href="${root}#projects">View projects</a>
      ${externalLink({ href: profile.links.linkedin, label: 'LinkedIn', className: 'text-link text-link--external', arrow: true })}
    </div>
  </div>
  <img class="hero__photo" src="${root}${photo.src}" alt="${photo.alt}" width="${photo.width}" height="${photo.height}" fetchpriority="high">
</section>`;
}
