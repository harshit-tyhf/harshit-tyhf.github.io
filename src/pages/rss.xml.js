import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export async function GET(context) {
  const posts = (await getCollection('blog', (p) => !p.data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: `${site.name} — field logs`,
    description: site.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.excerpt,
      link: `${base}/blog/${p.id}/`,
    })),
  });
}
