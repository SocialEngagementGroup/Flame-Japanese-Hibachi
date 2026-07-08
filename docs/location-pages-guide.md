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

## How a visitor lands on their page

`NearestLocationProvider` (wraps the whole app in `app/layout.tsx`) already
resolves the visitor's nearest store — via GPS, a 14-day localStorage cache,
or a manual pick — completely independent of this feature.

`components/blocks/location/LocationAutoRedirect.tsx` is a small client
component dropped into the generic `/menu` and `/catering` pages. It watches
that resolved location and, the moment one exists, does a client-side
`router.replace()` to the matching `/menu/[slug]` or `/catering/[slug]` page.

Important: it only fires once a location is actually **resolved**. First-time
visitors (no cache yet, no GPS answer yet) and crawlers (which never grant
geolocation) simply keep seeing the generic page — so `/menu` and `/catering`
stay indexable and don't cloak content for search engines.

## Order links on a location page

Every location page must link "Order Now" / "Add to Cart" to *that location's*
`order.online` URL — not whatever the visitor's browser-detected nearest store
happens to be (those can differ if someone opens a shared link from another
city). That's why `resolveOrderUrl(location)` (`lib/geo/orderUrl.ts`) is
called once per page and threaded down as an `orderUrl` prop through:

```
page.tsx → InteractiveMenu → MenuMainContent / MenuCTA
page.tsx → CateringMenuSection / CateringAddOns / MenuCTA
```

Each of those components falls back to the site-wide `useOrderUrl()` hook
(nearest-location context) when no `orderUrl` prop is passed — that's what
keeps the *generic* `/menu` and `/catering` pages working exactly as before.

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

## Deferred (not part of this pass)

IP-based geolocation and manual ZIP entry (tiers 2–3 of the fallback chain)
aren't implemented yet — today it's GPS + cache + manual store pick only. See
the auto-location brief for the planned approach (edge geo headers, a
server-side ZIP lookup) when that work starts.
