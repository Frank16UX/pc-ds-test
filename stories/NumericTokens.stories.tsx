import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { getRawTokenValue, getTokenValueOr, resolveTokenValue } from './utils/scssTokens';

interface NumericToken {
  name: string;
  scssVar: string;
  description?: string;
}

const spacingTokens: NumericToken[] = [
  { name: 'None', scssVar: '$spacing-none', description: '(0px). Use when elements should have no gap or padding between them (e.g both consecutive sections have white bg, so the next section will have a 0px top padding to avoid an excessive spacing).' },
  { name: '2XS', scssVar: '$spacing-2xs', description: '(4px). Use for very tight spacing like icon-to-text gaps or subtle padding.' },
  { name: 'XS', scssVar: '$spacing-xs', description: '(8px). Use for compact component internal spacing or small gaps between related elements.' },
  { name: 'SM', scssVar: '$spacing-sm', description: '(12px). Use for moderate padding within components or gaps between closely related items.' },
  { name: 'MD', scssVar: '$spacing-md', description: '(16px). Default spacing for most component padding and gaps. Our baseline spacing unit.' },
  { name: 'LG', scssVar: '$spacing-lg', description: '(24px). Use for generous component padding or gaps between distinct sections.' },
  { name: 'XL', scssVar: '$spacing-xl', description: '(32px). Use for significant separation between components or section padding.' },
  { name: '2XL', scssVar: '$spacing-2xl', description: '(40px). Use for separation between content blocks within a section.' },
  { name: '3XL', scssVar: '$spacing-3xl', description: '(48px). Use for vertical separation between sections.' },
  { name: '4XL', scssVar: '$spacing-4xl', description: '(64px). Use for maximum spacing between distinct page areas or special layout needs.' },
];

const radiusTokens: NumericToken[] = [
  { name: 'Square', scssVar: '$radius-square', description: 'Sharp corners with no rounding (0px). Use for rectangular elements requiring hard edges.' },
  { name: 'SM', scssVar: '$radius-sm', description: 'Small corner radius (6px). Use for subtle rounding on cards and other UI elements.' },
  { name: 'MD', scssVar: '$radius-md', description: 'Medium corner radius (8px). Standard rounding for most components like inputs.' },
  { name: 'XL', scssVar: '$radius-xl', description: 'Use it only for Search Typeahead menus and pill shaped items (e.g Quantity Stepper).' },
  { name: '2XL', scssVar: '$radius-2xl', description: 'Use it for pill-shaped elements like buttons and chips.' },
  { name: 'Full', scssVar: '$radius-full', description: 'Fully rounded borders (pill-shaped buttons). Equals 1000px radius on Figma.' },
];

const sizeHeightTokens: NumericToken[] = [
  { name: 'Height XS', scssVar: '$size-height-xs', description: '(24px). Use as the base icon height and smaller elements.' },
  { name: 'Height SM', scssVar: '$size-height-sm', description: '(32px). Use it as the fixed height for Small Buttons and sm variants.' },
  { name: 'Height MD', scssVar: '$size-height-md', description: '(40px). Fixed height for default Chips (md).' },
  { name: 'Height LG', scssVar: '$size-height-lg', description: '(48px). Fixed height for Large Buttons and other large component variants (lg).' },
  { name: 'Height XL', scssVar: '$size-height-xl', description: '(72px). Height for xl icon buttons and chips.' },
  { name: 'Icon Height XS', scssVar: '$size-height-icon-xs', description: '(16px). Height for the smallest icon size (Small Button).' },
  { name: 'Icon Height SM', scssVar: '$size-height-icon-sm', description: '(20px). Height for the icon in a Large Button.' },
  { name: 'Icon Height MD', scssVar: '$size-height-icon-md', description: '(24px). Default size for most standalone icons and instances in icon buttons.' },
  { name: 'Icon Height LG', scssVar: '$size-height-icon-lg', description: '(32px). Default size for most standalone icons and instances in icon buttons.' },
  { name: 'Icon Height 2XL', scssVar: '$size-height-icon-2xl', description: '(64px). Default size for most standalone icons and instances in icon buttons.' },
  { name: 'Icon Height 4XL', scssVar: '$size-height-icon-4xl', description: '(80px). Max height of a highlighted icon (e.g. a more detailed icon of a feature of benefit on a landing page).' },
];

const sizeWidthTokens: NumericToken[] = [
  { name: 'Button Min-Width LG', scssVar: '$size-width-button-mw-lg', description: '(128px). Ensures large buttons have substantial clickable area and prominent visual hierarchy.' },
  { name: 'Button Min-Width SM', scssVar: '$size-width-button-mw-sm', description: '(96px). Ensures small buttons have adequate clickable area and visual presence.' },
];

const surfaceTinted1 = getTokenValueOr('$color-surface-tinted-1', '#f5f5f5');
const surfaceTinted2 = getTokenValueOr('$color-surface-tinted-2', '#f0f0f0');
const backgroundDefault = getTokenValueOr('$color-background-default-solid', '#ffffff');
const backgroundAlt = getTokenValueOr('$color-background-alt-solid', '#f7f2e8');
const borderDividerStrong = getTokenValueOr('$color-border-divider-strong', '#d1d5db');
const textSecondary = getTokenValueOr('$color-text-default-secondary', '#5b6164');

type PreviewRenderer = (value: string | undefined, token: NumericToken) => React.ReactNode;

const TokenRow = ({ token, renderPreview }: { token: NumericToken; renderPreview: PreviewRenderer }) => {
  const resolvedValue = useMemo(() => resolveTokenValue(token.scssVar), [token.scssVar]);
  const preview = useMemo(() => renderPreview(resolvedValue, token), [renderPreview, resolvedValue, token]);

  const specs: Array<[string, string]> = [
    ['Value', resolvedValue ?? '—'],
  ];

  if (token.description) {
    specs.push(['Usage', token.description]);
  }

  return (
    <div className="token-sample-row">
      <div className="token-sample-meta" style={{ maxWidth: '320px' }}>
        <span className="token-sample-label">{token.name}</span>
        <div className="token-sample-preview" style={{ width: '100%' }}>
          {preview}
        </div>
        <code className="token-sample-code">{token.scssVar}</code>
      </div>
      <dl className="token-spec-grid">
        {specs.map(([label, specValue]) => (
          <React.Fragment key={`${token.scssVar}-${label}`}>
            <dt>{label}</dt>
            <dd>{specValue}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

const renderSpacingPreview: PreviewRenderer = (value) => {
  const gap = value || '0px';

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: surfaceTinted1,
        display: 'flex',
        flexDirection: 'column',
        gap,
      }}
    >
      <div style={{ height: '20px', borderRadius: '10px', backgroundColor: backgroundDefault }} />
      <div style={{ height: '20px', borderRadius: '10px', backgroundColor: backgroundAlt }} />
    </div>
  );
};

const renderRadiusPreview: PreviewRenderer = (value) => {
  const radiusValue = value || '0px';

  return (
  <div
    style={{
      padding: '16px',
      borderRadius: '16px',
      backgroundColor: surfaceTinted2,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        width: '120px',
        height: '120px',
        borderRadius: radiusValue,
        backgroundColor: backgroundDefault,
        border: `1px solid ${borderDividerStrong}`,
      }}
    />
  </div>
  );
};

const renderHeightPreview: PreviewRenderer = (value) => {
  const heightValue = value || '0px';

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: surfaceTinted1,
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '48px',
          height: heightValue,
          minHeight: '4px',
          borderRadius: '12px',
          backgroundColor: backgroundDefault,
          border: `1px solid ${borderDividerStrong}`,
        }}
      />
      <span style={{ fontSize: '12px', color: textSecondary }}>{heightValue}</span>
    </div>
  );
};

const renderWidthPreview: PreviewRenderer = (value) => {
  const widthValue = value || '0px';

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: surfaceTinted1,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: widthValue,
          maxWidth: '100%',
          minWidth: '8px',
          height: '44px',
          borderRadius: '12px',
          backgroundColor: backgroundDefault,
          border: `1px solid ${borderDividerStrong}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: textSecondary,
        }}
      >
        {widthValue}
      </div>
    </div>
  );
};

const NumericTokensComponent = () => (
  <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
    <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: 700 }}>Numeric Tokens</h1>
    <p style={{ marginBottom: '48px', color: textSecondary, maxWidth: '820px' }}>
      Numeric tokens capture the system spacing scale, radii, and control sizing. Each section below renders live previews so you can
      understand the scale relationships in context.
    </p>

    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 600 }}>Spacing</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {spacingTokens.map((token) => (
          <TokenRow key={token.scssVar} token={token} renderPreview={renderSpacingPreview} />
        ))}
      </div>
    </section>

    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 600 }}>Radius</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {radiusTokens.map((token) => (
          <TokenRow key={token.scssVar} token={token} renderPreview={renderRadiusPreview} />
        ))}
      </div>
    </section>

    <section>
      <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 600 }}>Size</h2>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Height</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
        {sizeHeightTokens.map((token) => (
          <TokenRow key={token.scssVar} token={token} renderPreview={renderHeightPreview} />
        ))}
      </div>

      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Width</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {sizeWidthTokens.map((token) => (
          <TokenRow key={token.scssVar} token={token} renderPreview={renderWidthPreview} />
        ))}
      </div>
    </section>
  </div>
);

const meta = {
  title: 'Foundations/Numeric Tokens',
  component: NumericTokensComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Explore the numeric primitives that drive spacing, radius, and control sizing across the UI.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumericTokensComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumericTokens: Story = {};
