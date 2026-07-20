# Location-scoped menu & catering pages

How `/menu` and `/catering` became per-location, and how to work with them.

## The idea

One schema file drives everything: **`data/locationsData.ts`**. Every active
restaurant is one object in `activeLocations`, with a `slug` (used in URLs),
address fields, coordinates, and its own `order.online` URL. Nothing about a
location is hardcoded anywhere else — routes, metadata, JSON-LD, and the
sitemap are all generated from this one array.

## Routes

| Route | What it is |
| --- | --- |
| `/menu` | Generic menu page (no location). Same content as before. |
| `/menu/[location]` | One page per location, e.g. `/menu/baltimore-md`. Statically generated for every entry in `activeLocations`. |
| `/catering` | Generic catering page (no location). Same content as before. |
| `/catering/[location]` | One page per location, e.g. `/catering/laurel-md`. |
| `/order/[location]` | Existing redirect to that location's `order.online` link. |

`app/menu/[location]/page.tsx` and `app/catering/[location]/page.tsx` both use
`generateStaticParams()` to enumerate `getActiveLocations()` — that's the only
place the "14 pages" get created, and it's just a `.map()` over the data file.
**Adding a 15th location means adding one object to `locationsData.ts` — no
route file, no code change.**

If a slug isn't found (typo'd URL, or a location that no longer exists),
`generateMetadata`/the page both call `getLocationBySlug()` and bail out with
`notFound()` → real 404, not a broken page.

## Slug format

One rule:

```
slug = kebab-case(name without its state) + "-" + lowercase(state)
```

| `name` | slug |
| --- | --- |
| Laurel, MD | `laurel-md` |
| Royal Palm Beach, FL | `royal-palm-beach-fl` |
| Forest Hill (Richmond), VA | `forest-hill-richmond-va` |
| Northern Pkwy (Baltimore), MD | `northern-pkwy-baltimore-md` |

Derive it from **`name`, never `city`**. `city` is the postal city and often
isn't what the store is called — "Seven Corners" has `city: "Falls Church"`.
Three slugs used to be built from `city` (or with the words reversed), so
`/menu/falls-church-va` served a page headed "Seven Corners". They're now
`seven-corners-va`, `forest-hill-richmond-va` and `northern-pkwy-baltimore-md`.

**The slug is the store's permanent URL identity, shared by every
location-scoped section** — so a store is the same word in every URL it
appears in:

```
/menu/laurel-md
/catering/laurel-md
/order/laurel-md
/blog/laurel-md          <- a future section costs no new slug
```

Adding a section later means adding a route that reads the same `slug`, not
inventing a second identifier. Build these paths with `locationPath()`
(`lib/api/locations.ts`) rather than interpolating by hand — then a new
section only needs registering in one place:

```ts
locationPath("menu", store)      // "/menu/laurel-md"
```

Helpers in `lib/api/locations.ts`:

- `toLocationSlug(location)` — what a store's slug *should* be. `slug` stays a
  literal in the data file so it's greppable and can't silently change under a
  published store; this is for authoring and checking.
- `findMalformedLocationSlugs()` — returns every store that breaks the rule.
  Empty array means the file is consistent.

Renaming a slug changes a public URL. It was free here because production has
no `[location]` routes yet, so none of these had ever been served. **Once they
are live, a rename needs a 301 from the old path in `next.config.mjs`** or it
drops that page's search ranking and breaks shared links.

## How a visitor lands on their page

`NearestLocationProvider` (wraps the whole app in `app/layout.tsx`) already
resolves the visitor's nearest store — via GPS, a 14-day localStorage cache,
or a manual pick — completely independent of this feature.

`components/blocks/location/LocationAutoRedirect.tsx` is a small client
component dropped into the generic `/menu` and `/catering` pages. It watches
that resolved location and, the moment one exists, does a client-side
`router.replace()` to the matching `/menu/[slug]` or `/catering/[slug]` page.

Important: it only fires once a location is actually **resolved**. First-time
visitors (no cache yet, no GPS answer yet) simply keep seeing the generic page.

`proxy.ts` does the same job server-side (307 at the edge, using Vercel's geo
headers or the selected-store cookie) and is the fast path. The two don't
race: `LocationAutoRedirect` only mounts on `/menu` and `/catering`, so if the
proxy already redirected, that page never renders. It's the client-side
fallback for when the edge has no geo signal.

Crawlers are excluded from the proxy redirect by user-agent, so `/menu` and
`/catering` stay indexable on their own content instead of being bounced to
one arbitrary store.

## Keeping a location switch cheap

The per-location difference is tiny — a heading, a banner, the JSON-LD and the
order URL. Everything expensive (the menu grid, catering cards, contact
section) lives in `app/menu/layout.tsx` / `app/catering/layout.tsx`, which
persist across sibling route navigations. Measured on a
`/menu/baltimore-md → /menu/manassas-va` switch: **188 of 190 images stay
mounted and the whole switch costs ~4 KB** (the RSC payload). Only the two
hero variants remount, since `Hero` is in the page.

Two rules follow from this:

- **Don't move heavy shared UI into the page.** If it's identical across
  locations, it belongs in the layout.
- **Don't let `Hero` inherit the default `bgVideo`.** Pages that want a still
  background must pass `bgVideo={null}`, or they silently pull in the 26 MB
  homepage hero MP4 — which also re-downloads on every store switch, because
  `Hero` remounts. `/catering` passes its own video deliberately; `/menu`
  passes `null`.

## Order links on a location page

Every location page must link "Order Now" / "Add to Cart" to *that location's*
`order.online` URL — not whatever the visitor's browser-detected nearest store
happens to be (those can differ if someone opens a shared link from another
city).

This is enforced in one place: **`useOrderUrl()` (`lib/geo/useOrderUrl.ts`)
reads the `[location]` slug off the URL and prefers it**, falling back to the
nearest-location context only on pages with no location in the URL (`/`,
`/menu`, `/contact`, …) and then to the site-wide default.

Doing it in the hook rather than by prop-threading is deliberate. The heavy
menu/catering trees live in the *layout* (see below), so they can't receive a
prop from the page at all — an earlier prop-drilled version silently broke
when those components moved, leaving the hero button on one store and all 64
"Add to Cart" links on another.

Components may still accept an explicit `orderUrl` prop to override the hook;
nothing needs to pass one for correctness.

### Changing a store's ordering link

Edit `orderUrl` on that store in `data/locationsData.ts`. That is the only
place to change it — every "Order Now" / "Add to Cart" on the store's pages,
the navbar and footer CTAs, and `/order/[slug]` all read through it. No
ordering URL is hardcoded in any component.

A store with `orderUrl: ""` falls back to `ORDER_URL` in `lib/constants.ts`
(the brand-wide ordering page). `bristow-va` is currently in that state, and
its 184 order links resolve to the fallback — that's expected, not a bug.
Fill in the real URL when the store goes live and every button follows.

The same holds for the rest of the store record: `address` drives every map
embed and "Get Directions" link, `lat`/`lng` drive nearest-store detection,
and `slug` drives the routes.

## SEO pieces

- `generateMetadata()` on both dynamic routes builds a unique title,
  description, and canonical URL per location.
- `lib/seo/restaurantSchema.ts` builds the schema.org `Restaurant` JSON-LD
  embedded on `/locations`, `/menu/[location]`, and `/catering/[location]` —
  one shared builder instead of three copies.
- `app/sitemap.ts` loops `getActiveLocations()` to emit a `/menu/[slug]` and
  `/catering/[slug]` entry for every location automatically.
- Each location page has real, unique on-page content (city name in the H1,
  address/geo in the JSON-LD) so it doesn't read as duplicate content across
  all 14 pages — the menu items themselves are intentionally shared, since the
  menu genuinely doesn't change by store.

## Changing store

There is exactly one store picker: `FindFlamePopup`. It is mounted once in
`app/layout.tsx`, and its open state lives on `NearestLocationProvider`
(`findFlameOpen` / `openFindFlame()` / `closeFindFlame()`) rather than in any
one component. Both the navbar location button and the "Not your location?"
control on a location banner call `openFindFlame()`, so changing store is the
same interaction everywhere.

Anything new that needs to offer a store change should call `openFindFlame()`
too — don't link to `/locations` and don't mount a second popup.

Opening the popup prefetches every location's page for the section you're in.
That's affordable precisely because of the layout split above (~4 KB each), and
it's what makes picking a store feel instant.
