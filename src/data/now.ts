export interface NowItem {
  label: string;
  text: string;
  href?: string;
  muted?: boolean;
}

export const NOW: {
  updated: string;
  items: NowItem[];
} = {
  updated: '2026-05-12',
  items: [
    { label: 'location', text: 'Eindhoven, NL' },
    {
      label: 'shipping',
      text: 'On Your Marks platform on OVHcloud + ArgoCD',
      href: 'https://www.onyourmarks.agency/over/',
    },
    {
      label: 'contrib',
      text: 'php/doc-en',
      href: 'https://github.com/php/doc-en',
    },
    {
      label: 'working',
      text: 'DocBook tooling (docbook-cs)',
      href: 'https://github.com/jordikroon/docbook-cs',
    },
    {
      label: 'stack',
      text: 'PHPStorm · VSCode · PHP 8.5 · macOS · OrbStack',
    },
  ],
};
