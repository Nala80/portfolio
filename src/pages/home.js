import { html } from '../components/html.js';
import { page } from '../components/page.js';
import { hero } from '../components/hero.js';
import { section } from '../components/section.js';
import { projectCard } from '../components/projectCard.js';
import { skills } from '../components/skills.js';
import { educationList, experienceTimeline } from '../components/background.js';
import { education, experience, interests, profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { otherSkills, technicalSkills } from '../data/skills.js';

export function homePage() {
  const root = './';

  const content = html`<div class="container">
  ${hero({ profile, root })}

  ${section({
    id: 'projects',
    eyebrow: 'Selected work',
    title: 'Projects',
    intro: 'Research, a sensor dashboard and a scheduling application: from raw data to software people use.',
    content: html`<div class="project-grid">${projects.map((project, index) => projectCard(project, { root, index }))}</div>`,
  })}

  ${section({
    id: 'skills',
    eyebrow: 'Toolbox',
    title: 'Technical skills',
    content: skills({ technical: technicalSkills, other: otherSkills }),
  })}

  ${section({
    id: 'background',
    eyebrow: 'Background',
    title: 'Education & experience',
    content: html`<div class="background">
      <div class="background__column">
        <h3 class="background__heading">Education</h3>
        ${educationList(education)}
      </div>
      <div class="background__column">
        <h3 class="background__heading">Experience</h3>
        ${experienceTimeline(experience)}
      </div>
    </div>
    <p class="interests"><span class="interests__label">Outside of study:</span> ${interests.join(' · ')}</p>`,
  })}
</div>`;

  return page({
    title: `${profile.name} — ${profile.role}`,
    description: `Portfolio of ${profile.name}, final-year HBO-ICT student focused on software and data. Projects, technical skills and background.`,
    root,
    profile,
    content,
  });
}
