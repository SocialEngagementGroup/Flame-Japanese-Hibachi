// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    // AVIF first, WebP fallback — the menu art is photographic and compresses
    // far better in both than the source PNG/JPG.
    formats: ['image/avif', 'image/webp'],
    // Optimized variants are content-hashed by source URL, so they can be held
    // for a year instead of Next's 60s default (which makes every cold visit
    // re-run the optimizer).
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'flamehibachi.com' }],
        destination: 'https://www.flamehibachi.com/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      {
        // Files in public/ are served with `max-age=0` by default, so every
        // visit re-validates them — including the multi-MB hero videos. Unlike
        // /_next/static, these filenames aren't content-hashed, so Next can't
        // safely cache them for us; we opt in explicitly.
        //
        // IMPORTANT: because this is `immutable`, a changed file at the same
        // path will NOT be picked up by browsers that already cached it.
        // When replacing one of these assets, give it a new filename.
        source: '/:path*.:ext(mp4|webm|jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

};

export default nextConfig;