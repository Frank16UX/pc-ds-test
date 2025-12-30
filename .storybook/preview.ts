import type { Preview } from '@storybook/react';

// Load dotlottie-player script for Lottie animations
if (typeof document !== 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
  script.type = 'module';
  document.head.appendChild(script);
}

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          [
            'Tokens',
            'Numeric Tokens',
            'Elevation',
            'Responsive',
            ['Desktop', ['Typography', 'Section Padding'], 'Mobile', ['Typography', 'Section Padding']],
            'Motion',
            'Breakpoints',
            'Ratios',
          ],
          'Atomic Components',
        ],
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;