/**
 * Content collections — the "database" of your site.
 *
 * Every project, writeup and post is one Markdown file in src/content/<collection>/.
 * The frontmatter (the part between the --- lines) is checked against these schemas
 * when you run `npm run dev` or `npm run build`, so a typo or a missing required field
 * gives you a clear error instead of a broken page.
 *
 * Anything marked .optional() or with a .default() can be left out. The page simply
 * doesn't show that piece (no video → no video tab, no repo → no repo button, etc.).
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** A button/link attached to a project. `kind` picks the icon. */
const link = z.object({
  label: z.string(),
  url: z.string(),
  kind: z
    .enum(['github', 'itch', 'steam', 'youtube', 'web', 'docs', 'download', 'play'])
    .default('web'),
});

/** Fill this in when a project was made with another team or company. */
const collab = z.object({
  team: z.string(), // "Studio Name", "CTF team", "Company"
  role: z.string(), // what YOU did
  period: z.string().optional(), // "2025" or "Jan – Mar 2026"
  teamUrl: z.string().optional(), // link to the team / company
});

const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      hook: z.string(), // one line that makes people click
      order: z.number().default(100), // lower = shown first
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),

      // Media — all optional
      cover: image().optional(), // key art / thumbnail (src/assets/...)
      previewLoop: z.string().optional(), // short muted loop for the card, e.g. "/media/my-game-loop.mp4"
      video: z.string().optional(), // gameplay recording in /public, e.g. "/media/my-game.mp4"
      youtube: z.string().optional(), // OR a YouTube video id, e.g. "dQw4w9WgXcQ"
      screenshots: z.array(image()).default([]),

      links: z.array(link).default([]),
      specs: z
        .object({
          engine: z.string().optional(),
          platform: z.string().optional(),
          role: z.string().optional(),
          team: z.string().optional(),
          builtIn: z.string().optional(),
        })
        .default({}),
      features: z.array(z.string()).default([]),
      collab: collab.optional(),
    }),
});

const security = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/security' }),
  schema: z.object({
    type: z.enum(['writeup', 'tool']),
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date().optional(),
    category: z.string().optional(), // web, pwn, crypto, forensics, rev…
    platform: z.string().optional(), // HTB, TryHackMe, picoCTF 2026…
    links: z.array(link).default([]),
    collab: collab.optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(100),
    tags: z.array(z.string()).default([]),
    links: z.array(link).default([]),
    collab: collab.optional(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tag: z.string().default('notes'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { games, security, projects, blog };
