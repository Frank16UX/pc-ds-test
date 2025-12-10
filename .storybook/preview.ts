import type { Preview } from '@storybook/react';

// Inline critical base styles including fonts
if (typeof document !== 'undefined') {
  // Load dotlottie-player script
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
  script.type = 'module';
  document.head.appendChild(script);

  const style = document.createElement('style');
  style.textContent = `
    /* Font faces */
    @font-face {
      font-family: 'Questa';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('/assets/fonts/Questa_Regular.otf') format('opentype');
    }
    
    @font-face {
      font-family: 'Questa';
      font-style: italic;
      font-weight: 400;
      font-display: swap;
      src: url('/assets/fonts/Questa_Regular_Italic.otf') format('opentype');
    }
    
    @font-face {
      font-family: 'Questa';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url('/assets/fonts/Questa_Medium.otf') format('opentype');
    }
    
    @font-face {
      font-family: 'Questa';
      font-style: italic;
      font-weight: 500;
      font-display: swap;
      src: url('/assets/fonts/Questa_Medium_Italic.otf') format('opentype');
    }
    
    @font-face {
      font-family: 'Lexend';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('/assets/fonts/Lexend-Regular.ttf') format('truetype');
    }
    
    @font-face {
      font-family: 'Lexend';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url('/assets/fonts/Lexend-Medium.ttf') format('truetype');
    }
    
    @font-face {
      font-family: 'Lexend';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url('/assets/fonts/Lexend-Bold.ttf') format('truetype');
    }
    
    :root {
      color-scheme: light;
    }
    
    body {
      font-family: 'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      margin: 0;
      color: #1e1e1e;
      background-color: #ffffff;
    }
    
    .sbdocs,
    .sbdocs-wrapper,
    .sbdocs-story {
      font-family: inherit;
      color: inherit;
    }
    
    .token-sample-row {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
      gap: 32px;
      padding-bottom: 24px;
      margin-bottom: 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .token-sample-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .token-sample-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #6b7280;
    }
    
    .token-sample-preview {
      display: block;
      color: inherit;
    }
    
    .token-sample-code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 12px;
      color: #6b7280;
    }
    
    .token-spec-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px 16px;
      font-size: 13px;
    }
    
    .token-spec-grid dt {
      margin: 0;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      color: #6b7280;
    }
    
    .token-spec-grid dd {
      margin: 0;
      color: #1e1e1e;
    }
    
    @media (max-width: 768px) {
      .token-sample-row {
        grid-template-columns: 1fr;
      }
      
      .token-spec-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
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