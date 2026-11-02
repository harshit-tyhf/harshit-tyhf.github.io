# Portfolio — Amber Ops theme

A security + game-dev portfolio built with [Astro](https://astro.build), deployed free on GitHub Pages.
All content lives in Markdown files; the design lives in one theme file.

## 1. Run it locally

You need **Node.js 22.22 or newer**.

```bash
npm install
npm run dev        # opens http://localhost:4321 and reloads as you edit
npm run build      # builds the final site into dist/
```

## 2. Put it online (GitHub Pages)

1. Create a repo on GitHub.
   - Name it `<your-username>.github.io` for a site at `https://<your-username>.github.io`.
   - Any other name works too; the site will be at `https://<your-username>.github.io/<repo-name>`.
2. Push this folder to the `main` branch.
3. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Every push to `main` now rebuilds and publishes the site (see the **Actions** tab).

The workflow works out the URL and base path for you, so links work for both repo types.
For a custom domain, set it in **Settings → Pages** and add a `public/CNAME` file containing the domain.

## 3. Where everything lives

```
src/data/site.ts              ← your name, tagline, status panel, about text, files, socials, loadout
src/content/games/*.md        ← one file per game
src/content/security/*.md     ← writeups and tools (type: writeup | tool)
src/content/projects/*.md     ← everything else
src/content/blog/*.md         ← blog posts ("Field logs")
src/assets/games/<game>/      ← cover art and screenshots (auto-compressed to WebP)
public/media/                 ← gameplay videos and preview loops
public/files/                 ← resume.pdf, cv.pdf, photo
src/styles/theme.css          ← ALL colors, fonts and spacing
src/content.config.ts         ← the list of fields each content type accepts
```

The `example-*` files show every option. Copy one, rename it, edit it, and delete the examples when you're done.

## 4. Adding content

### A game

Create `src/content/games/my-game.md`. The file name becomes the URL: `/games/my-game/`.

```yaml
---
title: My Game
hook: One line that makes people want to click.
order: 1                       # lower numbers appear first
tags: [Unity, Game jam]
cover: ../../assets/games/my-game/cover.jpg
previewLoop: /media/my-game-loop.mp4     # optional: short muted loop on the card
video: /media/my-game.mp4                # optional: OR  youtube: VIDEO_ID
screenshots:
  - ../../assets/games/my-game/shot-1.jpg
links:
  - { label: Play on itch.io, url: "https://you.itch.io/my-game", kind: itch }
  - { label: Source on GitHub, url: "https://github.com/you/my-game", kind: github }
specs:
  engine: Unity 6
  platform: Web
features:
  - Something you're proud of
---

Text written here becomes the description on the game's page.
```

**Everything except `title` and `hook` is optional.** Leave a field out and that part of the page doesn't appear:
no video → no "Gameplay" badge or video tab; no screenshots → no gallery; a link with `url: ""` → no button.

### A collaboration

Add a `collab:` block to any game, security entry or project, and it moves into that section's collaborations list:

```yaml
collab:
  team: Studio or company name
  role: What you did
  period: "2026"                    # optional
  teamUrl: "https://example.com"    # optional
```

### A writeup or security tool

`src/content/security/my-writeup.md` with `type: writeup` (or `type: tool`), `title`, `summary`, and optionally
`date`, `category`, `platform`, `links`. If the file has body text it gets its own terminal-style page;
otherwise the row links to the first link, so you can point to writeups hosted elsewhere.

> Only publish writeups for **retired** Hack The Box / TryHackMe content and for CTFs that have ended.

### A blog post

`src/content/blog/my-post.md` with `title`, `date`, `excerpt` and `tag`. Set `draft: true` to keep it off the
live site; drafts still show while you run `npm run dev`. Posts are also published as an RSS feed at `/rss.xml`.

### Link kinds (icons)

`github`, `itch`, `steam`, `youtube`, `web`, `docs`, `download`, `play`

### Loadout icons

Edit `loadout` in `src/data/site.ts`. Brand icons come from [Simple Icons](https://simpleicons.org):
to add one, find its export name (e.g. `siRust`), import it in `src/components/Icon.astro` and add it to `BRAND`.
Generic icons available: `code`, `terminal`, `cube`, `gamepad`, `shield`, `bug`, `network`, `branch`.

## 5. Media tips

- **Screenshots and covers:** drop JPG/PNG files in `src/assets/games/<game>/`. They're resized and converted
  to WebP at build time, so you don't need to shrink them yourself.
- **Card preview loops:** a 3–6 second muted MP4, 640 px wide, usually 200–800 KB. Much lighter than a GIF.
- **Gameplay videos:** short clips can go in `public/media/`. GitHub rejects files over 100 MB, so put long
  recordings on YouTube and use `youtube: VIDEO_ID`.

Convert a recording to a small loop with [ffmpeg](https://ffmpeg.org):

```bash
ffmpeg -ss 00:00:05 -t 5 -i recording.mp4 -an -vf "scale=640:-2,fps=24" -c:v libx264 -crf 30 -movflags +faststart public/media/my-game-loop.mp4
```

## 6. Changing the look

Every color, font and spacing value is a CSS variable in `src/styles/theme.css`:

- `:root` is the main amber theme.
- `.zone-arcade` overrides it for the game-dev area and game pages.
- `.zone-terminal` overrides it for the cybersec area and writeup pages.

To recolor the site, change the values there. To try a completely different theme, copy the file
(e.g. `theme-pixel.css`), change it, and swap the import at the top of `src/layouts/Base.astro`.
Your content files never need to change.

Fonts are self-hosted via [Fontsource](https://fontsource.org); change them in `Base.astro` (imports) and
`theme.css` (`--font-*` variables).

## 7. Before you launch

- [ ] Replace everything in `src/data/site.ts`
- [ ] Replace `public/files/resume.pdf` and `cv.pdf` (no phone number or home address in public files)
- [ ] Replace or delete the `example-*` content and the placeholder images/videos
- [ ] Check collaborators are OK with being listed, and that nothing is under NDA
- [ ] Run `npm run build` once locally to catch content errors
