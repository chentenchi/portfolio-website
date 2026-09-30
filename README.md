# Tenchi Chen — Data & Business Analytics

A React/Vite portfolio with a curated homepage, professional experience, and four interactive project pages.

## Develop and validate

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

The production output is `dist/`. Existing Vercel SPA rewrites are retained; direct case-study URLs resolve through `index.html`.

## Design

The visual direction combines neutral dark gray, restrained blue accents, Manrope typography, and an occasional serif emphasis. Open editorial sections give the work hierarchy without wrapping every paragraph in a card. Project previews use actual repository findings or clearly labeled fictional samples.

The homepage puts selected work and relevant analytics experience ahead of the personal introduction. Detailed project routes retain the interactive dashboard, district map, model pipeline, and document demo. Shared navigation includes a mobile menu, keyboard focus states, a skip link, cross-page section links, and next-project navigation. Motion respects reduced-motion preferences.

## Content and source map

- `src/App.jsx`: homepage narrative, project index, and dataset-derived grocery preview.
- `src/Experience.jsx`: detailed employment history.
- `src/SiteLayout.jsx`: shared navigation and footers.
- `src/PortfolioRouter.jsx`: routes, document titles, scroll handling, loading and not-found views.
- `src/index.css`: theme tokens, locally hosted font, and accessibility foundations.
- `src/App.css`: homepage and shared components.
- `src/CaseStudies.css`: shared case-study styling; individual page styles sit beside their components.
- `public/data/`: saved grocery and BLS observations. Updating the grocery CSV updates both the homepage preview and the dashboard on the next build.
- `public/images/`: original project figures and portrait.
- `public/fonts/`: locally served Manrope with its SIL Open Font License.

Preserve the qualifications attached to findings: tree conditions refer to the 2025 coursework dataset; grocery observations are historical and location-specific; BLS comparisons may differ in product and observation date; model metrics are reported project results. The tax demo processes uploaded files locally using pattern matching and is distinct from the linked Custom GPT. Its samples are fictional.

The embedded Leaflet map retains its existing external map tiles and CDN dependencies; the rest of the portfolio fonts and project assets are locally hosted. No new production dependencies are required for the redesign.

Theme colors are centralized in the `:root` block in `src/index.css`, including custom panels and chart accents. The static favicon and browser theme color are set in `public/favicon.svg` and `index.html`. Original project images and map condition colors retain their data meaning.
