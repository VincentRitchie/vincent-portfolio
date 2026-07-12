/**
 * Asset path helper for GitHub Pages basePath support.
 *
 * In static export mode (GitHub Pages), the site is served under a subpath
 * like /vincent-portfolio/. Image paths like "/images/foo.jpeg" must become
 * "/vincent-portfolio/images/foo.jpeg".
 *
 * In full-stack mode (dev/Namecheap), basePath is empty so the path stays
 * as-is.
 *
 * Usage: <img src={assetPath("/images/foo.jpeg")} />
 */
export function assetPath(path: string): string {
  if (!path) return path;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // If the path already starts with the basePath, don't double-prefix.
  if (basePath && path.startsWith(basePath)) return path;
  // Only prefix root-absolute paths (starting with /).
  if (path.startsWith("/")) return `${basePath}${path}`;
  return path;
}
