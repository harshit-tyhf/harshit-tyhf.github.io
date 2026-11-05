/**
 * robots.txt: lets search engines crawl everything and tells them where the sitemap is.
 * Built from the site address in astro.config.mjs, so it's always correct.
 * @param {import('astro').APIContext} context
 */
export function GET(context) {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, context.site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
