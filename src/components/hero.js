import { html } from './html.js';
import { externalLink } from './link.js';

export function hero({ profile, root }) {
  const { photo } = profile;
  return html`<section class="hero" aria-labelledby="hero-title">
  <div class="hero__text">
    <p class="hero__location">${profile.location}</p>
    <h1 class="hero__title" id="hero-title">${profile.name}</h1>
    <p class="hero__role">${profile.role}</p>
    <p class="hero__tagline">${profile.tagline}</p>
    <div class="button-row">
      <a class="button button--primary" href="${root}#projects">View projects</a>
      ${externalLink({ href: profile.links.linkedin, label: 'LinkedIn', className: 'button' })}
      ${externalLink({ href: profile.links.github, label: 'GitHub', className: 'button' })}
    </div>
  </div>
  <div class="hero__photo">
    <img src="${root}${photo.src}" alt="${photo.alt}" width="${photo.width}" height="${photo.height}" fetchpriority="high">
  </div>
</section>`;
}
