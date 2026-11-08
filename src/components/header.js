import { html } from './html.js';

const NAV_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'background', label: 'Background' },
];

export function siteHeader({ root, profile }) {
  // On narrow screens only the first name is shown, so the navigation fits.
  const [firstName, ...others] = profile.name.split(' ');
  const rest = others.join(' ');
  return html`<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="${root}">${firstName}<span class="brand__rest"> ${rest}</span></a>
    <nav class="site-nav" aria-label="Main">
      <ul>
        ${NAV_ITEMS.map((item) => html`<li><a href="${root}#${item.id}">${item.label}</a></li>`)}
      </ul>
    </nav>
  </div>
</header>`;
}
