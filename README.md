# Flame Japanese Hibachi

Marketing and storefront website for **Flame Japanese Hibachi** — a hibachi restaurant brand with multiple locations. The site showcases the menu, restaurant locations, and ordering, with a bold dark/light themed design.

**Live site:** https://www.flamehibachi.com/

## Tech Stack

- **[Next.js](https://nextjs.org) 16.2.2** — App Router, built with Turbopack
- **React 19** + **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com) v4** — utility-first styling (via `@tailwindcss/postcss`)
- **[next-themes](https://github.com/pacocoursey/next-themes)** — dark/light theme (with a `beforeInteractive` init script to avoid a flash of the wrong theme)
- **[Swiper](https://swiperjs.com)** — carousels / sliders
- **[Leaflet](https://leafletjs.com)** — maps
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
  menu/page.tsx           # Menu
  locations/page.tsx      # Locations
  contact/page.tsx        # Contact
  globals.css             # Global styles + design tokens (typography scale, colors)
components/
  blocks/                 # Page sections: hero, menu, locations, contact, about, catering, franchise
  layout/                 # Navbar, NavbarBottom, Footer
  providers/              # ThemeProvider
  sections/, ui/          # Shared sections and UI primitives
data/                     # Static content (e.g. locationsData.ts)
lib/
  api/                    # Data accessors (e.g. locations)
  constants.ts            # Shared constants (e.g. external order URL)
  types/                  # Shared TypeScript types
public/
  menupage/               # Menu item photos (organized by category)
  homepage/, site-logo/   # Home and brand assets
  theme-init.js, icon.png
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, brand highlights, locations, catering |
| `/menu` | Interactive menu with category navigation |
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
