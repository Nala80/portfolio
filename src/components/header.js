import { html } from './html.js';

const NAV_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'background', label: 'Background' },
];

export function siteHeader({ root, profile }) {
  return html`<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="${root}" aria-label="${profile.name}, home">
      <span class="brand__mark" aria-hidden="true">${profile.initials}</span>
      <span class="brand__name">${profile.name}</span>
    </a>
    <nav class="site-nav" aria-label="Main">
      <ul>
        ${NAV_ITEMS.map((item) => html`<li><a href="${root}#${item.id}">${item.label}</a></li>`)}
      </ul>
    </nav>
  </div>
</header>`;
}
