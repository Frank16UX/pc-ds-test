import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { getRawTokenValue, getTokenValueOr, resolveTokenValue } from './utils/scssTokens';

interface NumericToken {
  name: string;
  scssVar: string;
  description?: string;
}

const spacingTokens: NumericToken[] = [
  { name: 'None', scssVar: '$numeric-tokens-spacing-none', description: 'No spacing between elements.' },
  { name: '2XS', scssVar: '$numeric-tokens-spacing-2xs', description: 'Micro adjustments such as icon padding or dividers.' },
  { name: 'XS', scssVar: '$numeric-tokens-spacing-xs', description: 'Tight spacing between related text or iconography.' },
  { name: 'SM', scssVar: '$numeric-tokens-spacing-sm', description: 'Compact gaps for stacked labels and inputs.' },
  { name: 'MD', scssVar: '$numeric-tokens-spacing-md', description: 'Default spacing for text blocks and form controls.' },
  { name: 'LG', scssVar: '$numeric-tokens-spacing-lg', description: 'Breathing room for cards or vertically grouped content.' },
  { name: 'XL', scssVar: '$numeric-tokens-spacing-xl', description: 'Large gutters around sections and hero content.' },
  { name: '2XL', scssVar: '$numeric-tokens-spacing-2xl', description: 'Used sparingly for page level padding.' },
  { name: '3XL', scssVar: '$numeric-tokens-spacing-3xl', description: 'Generous spacing for full-bleed layouts or modals.' },
  { name: '4XL', scssVar: '$numeric-tokens-spacing-4xl', description: 'Max spacing for immersive hero layouts.' },
];

const radiusTokens: NumericToken[] = [
  { name: 'Square', scssVar: '$numeric-tokens-radius-square', description: 'Squared corners for tables and hard-edged surfaces.' },
  { name: 'SM', scssVar: '$numeric-tokens-radius-sm', description: 'Subtle rounding for inputs and chips.' },
  { name: 'MD', scssVar: '$numeric-tokens-radius-md', description: 'System default for cards, modals, and panels.' },
  { name: 'Full', scssVar: '$numeric-tokens-radius-full', description: 'Capsules and fully rounded controls.' },
];

const sizeHeightTokens: NumericToken[] = [
  { name: 'Height LG', scssVar: '$numeric-tokens-size-height-lg', description: 'Large control height for desktop buttons or inputs.' },
  { name: 'Height MD', scssVar: '$numeric-tokens-size-height-md', description: 'Default control height used across most UI.' },
  { name: 'Height SM', scssVar: '$numeric-tokens-size-height-sm', description: 'Compact control height for dense surfaces.' },
  { name: 'Height XS', scssVar: '$numeric-tokens-size-height-xs', description: 'Use for micro controls or compact toolbars.' },
  { name: 'Icon Height XS', scssVar: '$numeric-tokens-size-height-icon-xs', description: 'Icon-only control height for subtle actions.' },
  { name: 'Icon Height SM', scssVar: '$numeric-tokens-size-height-icon-sm', description: 'Primary icon button height.' },
  { name: 'Icon Height MD', scssVar: '$numeric-tokens-size-height-icon-md', description: 'Medium icon control height.' },
  { name: 'Icon Height LG', scssVar: '$numeric-tokens-size-height-icon-lg', description: 'Large icon control height.' },
  { name: 'Icon Height 2XL', scssVar: '$numeric-tokens-size-height-icon-2xl', description: 'Hero icon height for badges or spot illustrations.' },
  { name: 'Icon Height 4XL', scssVar: '$numeric-tokens-size-height-icon-4xl', description: 'Presentation icon height for marketing surfaces.' },
];

const sizeWidthTokens: NumericToken[] = [
  { name: 'Button Min-Width LG', scssVar: '$numeric-tokens-size-width-button-mw-lg', description: 'Minimum width for large CTAs and layout anchors.' },
  { name: 'Button Min-Width SM', scssVar: '$numeric-tokens-size-width-button-mw-sm', description: 'Minimum width for small buttons and responsive stacks.' },
];

const surfaceTinted1 = getTokenValueOr('$tokens-color-surface-tinted-1', '#f5f5f5');
const surfaceTinted2 = getTokenValueOr('$tokens-color-surface-tinted-2', '#f0f0f0');
const backgroundDefault = getTokenValueOr('$tokens-color-background-default-solid', '#ffffff');
const backgroundAlt = getTokenValueOr('$tokens-color-background-alt-solid', '#f7f2e8');
const borderDividerStrong = getTokenValueOr('$tokens-color-border-divider-strong', '#d1d5db');
const textSecondary = getTokenValueOr('$tokens-color-text-default-secondary', '#5b6164');

type PreviewRenderer = (value: string | undefined, token: NumericToken) => React.ReactNode;

const TokenRow = ({ token, renderPreview }: { token: NumericToken; renderPreview: PreviewRenderer }) => {
  const resolvedValue = useMemo(() => resolveTokenValue(token.scssVar), [token.scssVar]);
  const rawValue = useMemo(() => getRawTokenValue(token.scssVar), [token.scssVar]);

  const specs: Array<[string, string]> = [
    ['Resolved value', resolvedValue ?? '—'],
    ['Raw value', rawValue ?? '—'],
  ];

  if (token.description) {
    specs.push(['Usage', token.description]);
  }

  return (
    <div className="token-sample-row">
      <div className="token-sample-meta" style={{ maxWidth: '320px' }}>
        <span className="token-sample-label">{token.name}</span>
        <div className="token-sample-preview" style={{ width: '100%' }}>
          {renderPreview(resolvedValue, token)}
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
