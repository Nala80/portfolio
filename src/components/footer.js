import { html } from './html.js';
import { externalLink } from './link.js';

export function siteFooter({ profile, year }) {
  return html`<footer class="site-footer">
  <div class="container site-footer__inner">
    <p>© ${year} ${profile.name}</p>
    <ul class="site-footer__links">
      <li>${externalLink({ href: profile.links.linkedin, label: 'LinkedIn' })}</li>
    </ul>
  </div>
</footer>`;
}
