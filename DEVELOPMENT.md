# Development

Build, content authoring and deployment notes for [jordikroon.nl](https://jordikroon.nl).

## Stack

| Layer         | Choice                                          |
| ------------- | ----------------------------------------------- |
| Runtime       | Node.js 24                                      |
| Package mgr   | pnpm 10                                         |
| Framework     | [Astro](https://astro.build)                    |
| Styling       | [Tailwind CSS](https://tailwindcss.com) v4      |
| Authoring     | MDX + Astro Content Collections (Zod schemas)   |
| Code blocks   | [Shiki](https://shiki.style) (dual theme)       |
| Search/feeds  | Sitemap + RSS                                   |
| Fonts         | Inter Variable + JetBrains Mono Variable (OFL)  |
| Deploy        | GitHub Actions → GitHub Pages                   |

Zero JS shipped on most pages. Just a tiny theme toggle.

## Local development

```sh
# install (Node 24 required; use nvm/fnm/volta)
pnpm install

# run dev server
pnpm dev

# type-check
pnpm check

# production build
pnpm build

# preview the build
pnpm preview
```

## Authoring content

### Blog posts

Drop an `.mdx` (or `.md`) file in `src/content/blog/`:

```mdx
---
title: 'A new post'
description: 'One-line summary used in lists, RSS and social previews.'
pubDate: 2026-05-12
updatedDate: 2026-05-20
tags: ['php', 'caching']
draft: false
---

Write your post here. Standard markdown plus JSX.
```

Schema lives at `src/content.config.ts` — `pnpm check` will catch frontmatter errors.

### Projects

Add a `.md` file in `src/content/projects/`:

```md
---
name: 'project-name'
description: 'One-line description shown in lists.'
url: 'https://example.com'
repo: 'https://github.com/jordikroon/project-name'
role: 'Maintainer'
tags: ['php', 'open-source']
featured: true
order: 1
---
```

`featured: true` projects show on the home page. `order` controls position
(lower = higher).

## Site configuration

Top-level values (URL, title, nav, socials) live in `src/site.config.ts`. Update
them there rather than scattering literals across templates.

## PGP

Replace `public/pgp.asc` with your actual ASCII-armored public key:

```sh
gpg --armor --export YOUR_KEY_ID > public/pgp.asc
```

Then update the `fingerprint` and `keyId` in `src/pages/pgp.astro`.

## Deployment

1. Push to GitHub (`jordikroon/jordikroon` for the canonical user site at
   `https://jordikroon.github.io`).
2. In repository **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys.

### Custom domain

1. Add a `CNAME` file in `public/` containing the domain (e.g. `jordikroon.nl`).
2. Update `SITE.url` in `src/site.config.ts`.
3. Configure DNS per [GitHub's docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

### Project page (sub-path) deployment

If hosting as a project page (`username.github.io/jordikroon`), uncomment / set
`base: '/jordikroon'` in `src/site.config.ts`. The workflow already wires
`base_path` via `actions/configure-pages` when run from a project repo.

## License

Source code: MIT.
Content (posts and copy in `src/content/`): CC BY 4.0.
