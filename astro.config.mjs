// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri'; // Astro's built-in Markdown processor

/**
 * GitHub Pages setup
 * ------------------
 * • User site  (repo named  <username>.github.io):  SITE = https://<username>.github.io, BASE = '/'
 * • Project site (any other repo name):             SITE = https://<username>.github.io, BASE = '/<repo-name>'
 * • Custom domain: SITE = https://yourdomain.com, BASE = '/' (and add public/CNAME)
 *
 * The deploy workflow fills these in automatically; edit the fallbacks below for local builds.
 */
const SITE = process.env.SITE_URL ?? 'https://your-username.github.io';
const BASE = process.env.BASE_PATH ?? '/';

/**
 * Makes links to other websites inside your Markdown (posts, writeups, game pages)
 * open in a new tab. Links to your own pages still open in the same tab.
 */
const externalLinks = {
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = String(node.properties?.href ?? '');
      if (/^https?:\/\//.test(href) && !href.startsWith(SITE)) {
        ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', ['noopener', 'noreferrer']);
      }
    },
  },
};

/**
 * In code blocks, text wrapped in [[double brackets]] is shown as typed input
 * (same colour as the command) and the brackets are removed.
 * Example:  Are you sure you want to continue connecting? [[yes]]
 */
const INPUT_COLOR = '#E1E4E8'; // matches the command colour in the code theme
const typedInput = {
  name: 'typed-input',
  preprocess(code) {
    const ranges = [];
    let out = '';
    let last = 0;
    for (const m of code.matchAll(/\[\[(.+?)\]\]/g)) {
      out += code.slice(last, m.index);
      ranges.push([out.length, out.length + m[1].length]);
      out += m[1];
      last = m.index + m[0].length;
    }
    this.meta.typedInput = ranges;
    return out + code.slice(last);
  },
  tokens(lines) {
    const ranges = this.meta.typedInput;
    if (!ranges?.length) return;
    return lines.map((line) =>
      line.flatMap((token) => {
        const start = token.offset;
        const end = start + token.content.length;
        // Cut the token wherever an input range starts or ends inside it.
        const cuts = new Set([start, end]);
        for (const [a, b] of ranges) {
          if (a > start && a < end) cuts.add(a);
          if (b > start && b < end) cuts.add(b);
        }
        const points = [...cuts].sort((x, y) => x - y);
        const pieces = [];
        for (let i = 0; i < points.length - 1; i++) {
          const [from, to] = [points[i], points[i + 1]];
          const isInput = ranges.some(([a, b]) => from >= a && to <= b);
          pieces.push({
            ...token,
            content: token.content.slice(from - start, to - start),
            offset: from,
            ...(isInput ? { color: INPUT_COLOR, htmlStyle: undefined } : {}),
          });
        }
        return pieces;
      }),
    );
  },
};

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
    shikiConfig: {
      transformers: [typedInput],
    },
  },
});
