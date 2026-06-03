export function getCanonicalUrl(pathname: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.flamehibachi.com";
  const cleanPath = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  return `${base}${cleanPath}`;
}