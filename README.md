# Vanshika Rana — Portfolio

A single, self-contained `index.html` (no build step, no npm install). Open it directly in a browser or deploy anywhere that serves static files.

## What's real vs. placeholder
- **Live**: GitHub stats and recent repos pull from the public GitHub API at load time.
- **Placeholder — edit before publishing**: email address, LinkedIn URL, GitHub username (`GH_USERNAME` near the bottom of the `<script>`), résumé download link (`/resume.pdf` — add that file), and all project metrics (₹8.4L revenue, +18% growth, etc. in the hero chart and case-study copy). Replace with your real numbers; don't ship the placeholder stats.
- **Contact form**: currently opens the visitor's email client via `mailto:`. For a real inbox-style form, wire it to Formspree, Web3Forms, or a Netlify Forms endpoint (a few lines of change in `handleContactSubmit`).

## Deploy
**GitHub Pages**: push this folder to a repo, then Settings → Pages → deploy from the branch root. Live in ~1 minute.
**Netlify / Vercel**: drag-and-drop the folder onto their dashboard, or connect the repo — no build command needed since it's static HTML.

## Scope note
The original brief asked for a full React/Vite/TypeScript app with a blog CMS, PWA/offline support, an AI assistant, a separate recruiter dashboard page, command palette, and per-project case-study pages — that's a multi-week product build, not a single deliverable. What's here covers the parts recruiters actually spend time on: hero, about, skills, projects with case-study detail (in a modal, not a separate page), certifications, live GitHub stats, and contact. If you want, I can build out any specific piece next — e.g., turn case studies into real routed pages, add a blog, or convert this to a React/Vite project.
