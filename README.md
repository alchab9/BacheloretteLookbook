# Emily's Bachelorette Lookbook 🪩🍷

An interactive walkthrough of the weekend's outfits — Mamma Mia × disco, in Napa.
Travel the weekend chronologically and see what to wear at each stop.

- **Desktop:** a big blue disco map you pan and zoom. Click a disco-ball station (or
  use the arrow keys for a guided tour) to fly into that event's three outfits.
- **Mobile:** a swipe deck. Swipe **left/right** through an event's 9 photos
  (Alex → Natalie → Together, for Outfit 1, 2, 3); swipe **up/down** between events.
- Progress is tracked by a disco ball rolling across the 9 events.

## Run locally

```bash
npm install
npm run dev      # opens a local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Adding photos

Everything is driven by `src/data/journey.js`. Photos are placeholders until you drop
real images into `public/photos/` using this naming convention:

```
{event}-{outfit}-{alex|natalie|together}.jpg
```

- `event` = 1–9, in the order listed in `journey.js`
  (1 Airplane, 2 Play Clothes, 3 PJs, 4 Winery, 5 Play Clothes, 6 Bathing Suits,
   7 Pickleball, 8 Black Outfit, 9 Walking Around Town)
- `outfit` = 1, 2, or 3
- role = `alex` (Alex solo), `natalie` (Natalie solo), or `together` (both)

Example: `public/photos/4-1-together.jpg` = Winery, Outfit 1, Alex & Natalie together.

Photos are portrait (3:4). A missing file just shows a labelled placeholder, so you
can add them a few at a time. Edit captions and event names in `journey.js` too.

## Deploy (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. One-time setup in the repo:

1. Push this repo to GitHub as **`BacheloretteLookbook`** (the name matters — it's the
   `base` path in `vite.config.js`; if you use a different repo name, update `base`).
2. Repo **Settings → Pages → Build and deployment → Source = GitHub Actions**.

The site then serves from `https://<your-user>.github.io/BacheloretteLookbook/`.

## Tech

React + Vite · `react-zoom-pan-pinch` (desktop map) · `framer-motion` (mobile swipe &
transitions).
