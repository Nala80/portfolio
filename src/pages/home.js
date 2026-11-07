import { html } from '../components/html.js';
import { page } from '../components/page.js';
import { profile } from '../data/profile.js';

export function homePage() {
  const content = html`<div class="container">
  <section class="section">
    <div class="section__header">
      <h1 class="section__title">${profile.name}</h1>
      <p class="section__intro">${profile.role}</p>
    </div>
  </section>
  <section class="section" id="projects"><h2 class="section__title">Projects</h2></section>
  <section class="section" id="skills"><h2 class="section__title">Skills</h2></section>
  <section class="section" id="background"><h2 class="section__title">Background</h2></section>
</div>`;

  return page({
    title: `${profile.name} — ${profile.role}`,
    description: `Portfolio of ${profile.name}, ${profile.role}.`,
    root: './',
    profile,
    content,
  });
}
