import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

/**
 * RSS feed with your field logs and your writeups, newest first.
 * @param {import('astro').APIContext} context
 */
export async function GET(context) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  const posts = (await getCollection('blog', (p) => !p.data.draft)).map((p) => ({
    title: p.data.title,
    pubDate: p.data.date,
    description: p.data.excerpt,
    link: `${base}/blog/${p.id}/`,
    categories: ['log', p.data.tag],
  }));

  // Writeups: their own page if the Markdown has body text, otherwise the first link (e.g. hosted elsewhere).
  const writeups = (await getCollection('security', (s) => !s.data.draft && s.data.type === 'writeup'))
    .map((w) => ({
      title: w.data.title,
      pubDate: w.data.date,
      description: w.data.summary,
      link: w.body?.trim() ? `${base}/writeups/${w.id}/` : w.data.links.find((l) => l.url)?.url,
      categories: ['writeup', ...(w.data.category ? [w.data.category] : [])],
    }))
    .filter((w) => w.link); // skip writeups with nowhere to link to

  const items = [...posts, ...writeups].sort(
    (a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0),
  );

  return rss({
    title: `${site.name} — logs & writeups`,
    description: site.description,
    site: /** @type {URL} */ (context.site), // set in astro.config.mjs
    items,
  });
}
