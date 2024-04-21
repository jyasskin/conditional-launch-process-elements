// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@web/storybook-framework-web-components';

export default {
  framework: '@web/storybook-framework-web-components',
  stories: ['../dist/stories/**/*.stories.{js,ts,md,mdx}'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
} satisfies StorybookConfig;
