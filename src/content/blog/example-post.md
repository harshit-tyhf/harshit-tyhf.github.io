---
title: Example post — how this blog works
date: 2026-11-01
excerpt: Every Markdown file in src/content/blog becomes a post, sorted by date.
tag: devlog
---

Write posts in Markdown. The body uses a readable sans-serif so long posts are
comfortable; headings and code keep the site's look.

## Code blocks

```csharp
void Update() {
    transform.Rotate(0, 90 * Time.deltaTime, 0);
}
```

## Images

Put images next to the post or in `src/assets/` and reference them with a relative path.

> Set `draft: true` in the frontmatter to hide a post from the live site.
