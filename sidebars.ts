import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        title: 'Getting Started',
        description:
          'Run a solo LioranDB node locally and connect with the CLI and driver.',
      },
      items: ['getting-started/solo'],
    },
    {
      type: 'category',
      label: 'Driver',
      link: {
        type: 'generated-index',
        title: 'Driver',
        description: 'JavaScript and TypeScript docs for @liorandb/driver@2.0.3.',
      },
      items: [
        'driver/overview',
        'driver/connection-and-client',
        'driver/database-and-collections',
        'driver/auth-and-admin',
        'driver/exports-reference',
      ],
    },
    {
      type: 'category',
      label: 'CLI',
      link: {
        type: 'generated-index',
        title: 'CLI',
        description: 'Stable CLI documentation for @liorandb/cli@1.0.3.',
      },
      items: [
        'cli/overview',
        'cli/config-and-profiles',
        'cli/auth-and-sessions',
        'cli/data-and-crud',
        'cli/admin-ops-and-shell',
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      link: {
        type: 'generated-index',
        title: 'Deployment',
        description:
          'Local single-node and managed hosting patterns for LioranDB.',
      },
      items: ['deployment/managed'],
    },
  ],
};

export default sidebars;
