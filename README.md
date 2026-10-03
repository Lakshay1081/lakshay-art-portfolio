# Lakshay Pareek — Artist Portfolio

A fresh React/Vite artist portfolio built around the supplied artwork collection.

## Included

- Full artwork visibility throughout the site (`object-fit: contain`)
- Immersive animated hero
- About / artist story section
- Responsive selected-work gallery with category filters
- Full-screen artwork viewer with previous/next navigation
- Contact / social section
- Responsive layout for desktop, tablet and mobile
- Reduced-motion support
- No backend required

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Replace artwork

Put new images in `public/artworks/` and update `src/data/artworks.js`.

## Important design rule

Artwork images deliberately use `object-fit: contain`, so the source composition is never cropped by the interface.
