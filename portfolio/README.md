# Vanshika Rana — Data Analyst Portfolio

A premium, recruiter-ready React + TypeScript portfolio focused on data analysis, case studies, and business impact storytelling.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- TanStack Query
- React Hook Form + Zod
- Recharts

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

### GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json`:
   ```json
   {
     "homepage": "https://<username>.github.io/<repo>",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

### Vercel

1. Import repository in Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy.

### Netlify

1. Import repository in Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add SPA redirect in `public/_redirects` if needed:
   ```
   /* /index.html 200
   ```

## Notes

- GitHub API requests are public and unauthenticated in this starter; add a token proxy if you need higher rate limits.
- Resume, AI assistant, and advanced widgets are intentionally structured as production-ready placeholders for iterative enhancement.
