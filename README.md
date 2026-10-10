# Oscar Wedding Company

The Oscar Wedding Company website is a React, TypeScript, and Vite experience for wedding photography and films. It includes the main editorial landing page, a wedding-story portfolio, story and film viewers, and enquiry flows.

## Requirements

- Node.js
- npm

## Getting started

```sh
npm install
npm run dev
```

Vite serves the site at `http://localhost:3000`.

## Validation and production build

```sh
npm run lint
npm run build
npm run preview
```

The portfolio is available at `/portfolio`. Wedding photographs, fonts, and other static media are served from `public/`. Install Git LFS before cloning so the tracked image assets are downloaded.

## Deploy to GitHub Pages

The `main` branch deploys automatically through GitHub Actions. In the repository's **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The workflow checks out Git LFS images and builds the site for the repository's `/Oscar-wedding-company-website/` URL. Once enabled, the site is available at <https://prakasan183-pixel.github.io/Oscar-wedding-company-website/>.

## Configuration

Set `VITE_SITE_URL` to the public site origin when building for production. See [.env.example](./.env.example). No Gemini API key is required by this website.
