# Flame Japanese Hibachi

Marketing and storefront website for **Flame Japanese Hibachi** — a hibachi restaurant brand with multiple locations. The site showcases the menu, restaurant locations, and ordering, with a bold dark/light themed design.

**Live site:** https://www.flamehibachi.com/

## Tech Stack

- **[Next.js](https://nextjs.org) 16.2.2** — App Router, built with Turbopack
- **React 19** + **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com) v4** — utility-first styling (via `@tailwindcss/postcss`)
- **Theming** — hand-rolled light/dark provider (`components/providers/ThemeProvider.tsx`), with a `beforeInteractive` init script to avoid a flash of the wrong theme
- **[Swiper](https://swiperjs.com)** — carousels / sliders
- **Maps** — embedded Google Maps iframes (no map library)
- **Fonts:** Work Sans + Raleway (via `next/font/google`)
- **Icons:** `lucide-react`, `react-icons`
- **Tooling:** ESLint 9 + Prettier

## Getting Started

### Prerequisites

- **Node.js 20+** (Next.js 16 requires Node 18.18 or newer)
- npm (a `package-lock.json` is committed)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server (Turbopack) |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |

## Project Structure

```
app/                      # App Router: routes, root layout, global styles
  layout.tsx              # Root layout (fonts, theme, Navbar/Footer)
  page.tsx                # Home
  menu/page.tsx           # Menu (generic, no location)
  menu/[location]/page.tsx      # Menu, one static page per location slug
  catering/page.tsx       # Catering (generic, no location)
  catering/[location]/page.tsx  # Catering, one static page per location slug
  order/[slug]/route.ts   # Redirects a location slug to its order.online URL
  locations/page.tsx      # Locations
  contact/page.tsx        # Contact
  sitemap.ts              # Sitemap, generated from locationsData.ts
  globals.css             # Global styles + design tokens (typography scale, colors)
components/
  blocks/                 # Page sections: hero, menu, locations, contact, about, catering, franchise
  blocks/location/        # LocationAutoRedirect, LocationBanner (shared by menu + catering location pages)
  layout/                 # Navbar, NavbarBottom, Footer
  providers/              # ThemeProvider, NearestLocationProvider (GPS/cache-based nearest-store resolver)
  sections/, ui/          # Shared sections and UI primitives
data/                     # Static content (e.g. locationsData.ts — the single source of truth for all 14 locations)
lib/
  api/                    # Data accessors (e.g. locations, getLocationBySlug)
  geo/                    # Distance sorting (Haversine) + order URL resolution
  seo/                    # Canonical URL + shared schema.org Restaurant JSON-LD builder
  constants.ts            # Shared constants (e.g. external order URL)
  types/                  # Shared TypeScript types
public/
  menupage/               # Menu item photos (organized by category)
  homepage/, site-logo/   # Home and brand assets
  theme-init.js, icon.png
```

See [docs/location-pages-guide.md](docs/location-pages-guide.md) for how the
per-location menu/catering routes work and how to add a new location.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, brand highlights, locations, catering |
| `/menu` | Interactive menu with category navigation (redirects to `/menu/[location]` once a nearest location is resolved) |
| `/menu/[location]` | Location-specific menu page, e.g. `/menu/baltimore-md` |
| `/catering` | Catering overview (redirects to `/catering/[location]` once a nearest location is resolved) |
| `/catering/[location]` | Location-specific catering page, e.g. `/catering/laurel-md` |
| `/locations` | Restaurant locations with an embedded map |
| `/contact` | Contact information and form |

## Configuration

- **Ordering / sign-in:** While the in-house storefront is being built, ordering and sign-in actions point to an external provider. This URL is centralized in `lib/constants.ts` (`ORDER_URL`) so it can be migrated in one place.
- **Theme:** Light/dark mode is handled by `ThemeProvider` plus `public/theme-init.js`, which sets the theme before hydration to prevent a flash.

## Images

Menu and site imagery in `public/` is pre-optimized (resized and compressed) and served via standard `<img>` tags. Filenames use lowercase `kebab-case` and are grouped into category folders under `public/menupage/`.

## Development Notes

- This repo pins **Next.js 16.2.2**, whose APIs and conventions differ from older versions. When in doubt, consult the bundled docs in `node_modules/next/dist/docs/` before writing code.
- See `AGENTS.md` / `CLAUDE.md` for contributor conventions.

## Deployment

The site builds with `next build` and can be deployed on any Next.js-compatible host (e.g. [Vercel](https://vercel.com)). The production site is served at https://www.flamehibachi.com/.
