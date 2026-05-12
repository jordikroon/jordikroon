import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@/site.config';

const STATIC_ROUTES = ['/', '/work', '/projects', '/blog', '/blog/tags', '/now', '/pgp'];

interface Url {
  loc: string;
  lastmod?: string;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET(context: APIContext) {
  const origin = (context.site?.toString() ?? SITE.url).replace(/\/$/, '');

  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const postUrls: Url[] = posts.map((p) => ({
    loc: `/blog/${p.id}`,
    lastmod: (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10),
  }));

  const tags = [...new Set(posts.flatMap((p) => p.data.tags))];
  const tagUrls: Url[] = tags.map((t) => ({ loc: `/blog/tags/${t}` }));

  const today = new Date().toISOString().slice(0, 10);
  const staticUrls: Url[] = STATIC_ROUTES.map((loc) => ({ loc, lastmod: today }));

  const urls = [...staticUrls, ...postUrls, ...tagUrls];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${esc(origin + u.loc)}</loc>${
        u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''
      }\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
