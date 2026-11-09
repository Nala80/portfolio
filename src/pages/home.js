import { html } from '../components/html.js';
import { page } from '../components/page.js';
import { hero } from '../components/hero.js';
import { section } from '../components/section.js';
import { projectList } from '../components/project.js';
import { skills } from '../components/skills.js';
import { educationList, experienceList } from '../components/background.js';
import { education, experience, profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { otherSkills, technicalSkills } from '../data/skills.js';

export function homePage() {
  const root = './';

  const content = html`<div class="container">
  ${hero({ profile, root })}

  ${section({
    id: 'projects',
    title: 'Projects',
    intro: 'A sensor dashboard, research and a scheduling application: from raw data to software people use.',
    content: projectList(projects, { root }),
  })}

  ${section({
    id: 'skills',
    title: 'Skills',
    content: skills({ technical: technicalSkills, other: otherSkills }),
  })}

  ${section({
    id: 'background',
    title: 'Background',
    content: html`<div class="background">
      <div class="background__group">
        <h3 class="background__heading">Education</h3>
        ${educationList(education)}
      </div>
      <div class="background__group">
        <h3 class="background__heading">Experience</h3>
        ${experienceList(experience)}
      </div>
    </div>`,
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
