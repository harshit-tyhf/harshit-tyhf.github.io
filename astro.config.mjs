// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri'; // Astro's built-in Markdown processor
import sitemap from '@astrojs/sitemap';

/**
 * GitHub Pages setup
 * ------------------
 * • User site  (repo named  <username>.github.io):  SITE = https://<username>.github.io, BASE = '/'
 * • Project site (any other repo name):             SITE = https://<username>.github.io, BASE = '/<repo-name>'
 * • Custom domain: SITE = https://yourdomain.com, BASE = '/' (and add public/CNAME)
 *
 * The deploy workflow fills these in automatically; edit the fallbacks below for local builds.
 */
// Environment variables set by the deploy workflow. (`process` is Node's; the cast
// just stops the editor complaining, since Node's type definitions aren't installed.)
const env = /** @type {Record<string, string | undefined>} */ (/** @type {any} */ (globalThis).process.env);
const SITE = env.SITE_URL ?? 'https://harshit-tyhf.github.io';
const BASE = env.BASE_PATH ?? '/';

/**
 * Makes links to other websites inside your Markdown (posts, writeups, game pages)
 * open in a new tab. Links to your own pages still open in the same tab.
 */
/** @type {import('satteri').HastPluginDefinition} */
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
/** Where the [[input]] bits are in the current code block (start, end). */
/** @type {[number, number][]} */
let inputRanges = [];
/** @type {import('shiki').ShikiTransformer} */
const typedInput = {
  name: 'typed-input',
  preprocess(code) {
    /** @type {[number, number][]} */
    const ranges = [];
    let out = '';
    let last = 0;
    for (const m of code.matchAll(/\[\[(.+?)\]\]/g)) {
      out += code.slice(last, m.index);
      ranges.push([out.length, out.length + m[1].length]);
      out += m[1];
      last = m.index + m[0].length;
    }
    inputRanges = ranges;
    return out + code.slice(last);
  },
  tokens(lines) {
    const ranges = inputRanges;
    if (!ranges.length) return;
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
  // Builds sitemap-index.xml: a list of every page, so search engines can find them all.
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
    shikiConfig: {
      transformers: [typedInput],
    },
  },
});
