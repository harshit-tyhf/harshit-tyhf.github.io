// @ts-check
import { defineConfig } from 'astro/config';

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

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
});
