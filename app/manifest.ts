import type { MetadataRoute } from "next";

/** Web app manifest - makes the site installable and gives Android/Chrome a
 * proper name, colours and icon instead of guessing from the page. */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Flame Japanese Hibachi",
    short_name: "Flame Hibachi",
    description:
      "100% Halal Japanese hibachi cooked fresh in front of you, plus sushi, bento, loaded fries and boba. Find a location or order online.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    // Matches the brand orange used for the navbar CTA and active states.
    theme_color: "#FF7808",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
