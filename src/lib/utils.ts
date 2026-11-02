/** Prefix site-relative paths with the base path (needed for GitHub project pages). */
export function withBase(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function isExternal(url: string): boolean {
  return /^https?:/.test(url);
}

export function formatDate(date?: Date): string {
  if (!date) return '';
  return date.toISOString().slice(0, 10);
}

/** Hide drafts from the live site but keep them visible while running `npm run dev`. */
export function published<T extends { data: { draft?: boolean } }>(entry: T): boolean {
  return import.meta.env.DEV || !entry.data.draft;
}
