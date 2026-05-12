export const SITE = {
  url: 'https://jordikroon.nl',
  base: '/',
  title: 'Jordi Kroon',
  tagline: 'DevOps & backend engineer · PHP documentation maintainer',
  description:
    'Personal site of Jordi Kroon. DevOps and backend engineer based in the Netherlands, official maintainer of the PHP documentation, open source advocate.',
  author: 'Jordi Kroon',
  emailUser: 'jordi',
  emailDomain: 'jordikroon.nl',
  locale: 'en',
  postsPerPage: 20,
} as const;

export const NAV = [
  { href: '/', label: 'home' },
  { href: '/work', label: 'work' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'writing' },
  { href: '/now', label: 'now' },
  { href: '/pgp', label: 'pgp' },
] as const;

export const BUILD = {
  sha: (import.meta.env.PUBLIC_BUILD_SHA ?? 'dev').slice(0, 7),
  ref: import.meta.env.PUBLIC_BUILD_REF ?? 'local',
  builtAt: import.meta.env.PUBLIC_BUILD_TIME ?? new Date().toISOString(),
} as const;

export const SOCIAL = {
  github: 'https://github.com/jordikroon',
  linkedin: 'https://www.linkedin.com/in/kroonjordi/',
  onyourmarks: 'https://www.onyourmarks.agency/over/',
  phpDocs: 'https://github.com/php/doc-en',
  rss: '/rss.xml',
} as const;
