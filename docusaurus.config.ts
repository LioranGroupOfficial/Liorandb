import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'LioranDB Docs',
  tagline:
    'LioranDB v2 pre-alpha docs for solo installs, CLI, driver, and managed deployment',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://docs.liorandb.com',
  baseUrl: '/',
  organizationName: 'liorandb',
  projectName: 'ldb-docs-site',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/liorandb-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'LioranDB',
      logo: {
        alt: 'LioranDB Logo',
        src: 'img/liorandb.png',
      },
      items: [
        {to: '/docs/getting-started/solo', label: 'Docs', position: 'left'},
        {
          href: 'https://github.com/LioranGroupOfficial/LioranDB',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      logo: {
        alt: 'LioranDB Logo',
        src: 'img/liorandb.png',
        href: '/',
        width: 72,
        height: 72,
      },
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/solo',
            },
            {
              label: 'Driver',
              to: '/docs/driver/overview?code=ts',
            },
            {
              label: 'CLI',
              to: '/docs/cli/overview',
            },
            {
              label: 'Deployment',
              to: '/docs/deployment/managed',
            },
          ],
        },
        {
          title: 'Packages',
          items: [
            {
              label: '@liorandb/driver@2.0.3',
              href: 'https://www.npmjs.com/package/@liorandb/driver',
            },
            {
              label: '@liorandb/cli@1.0.3',
              href: 'https://www.npmjs.com/package/@liorandb/cli',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Solo install guide',
              to: '/docs/getting-started/solo',
            },
            {
              label: 'Managed deployment',
              to: '/docs/deployment/managed',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LioranDB. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
