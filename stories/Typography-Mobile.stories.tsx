import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { getTypographyToken } from './utils/typography';

type TokenDefinition = {
  name: string;
  scssVar: string;
  sample: string;
};

const typographyTokens: Record<string, TokenDefinition[]> = {
  display: [
    { name: 'Display XL', scssVar: '$mobile-typography-display-xl', sample: 'The quick brown fox jumps over the lazy dog 1234' },
    { name: 'Display LG', scssVar: '$mobile-typography-display-lg', sample: 'The quick brown fox jumps over the lazy dog 1234' },
    { name: 'Display MD', scssVar: '$mobile-typography-display-md', sample: 'The quick brown fox jumps over the lazy dog 1234' },
    { name: 'Display SM', scssVar: '$mobile-typography-display-sm', sample: 'The quick brown fox jumps over the lazy dog 1234' },
    { name: 'Display XS', scssVar: '$mobile-typography-display-xs', sample: 'The quick brown fox jumps over the lazy dog 1234' },
  ],
  headline: [
    { name: 'Headline XL', scssVar: '$mobile-typography-headline-xl', sample: 'The quick brown fox jumps over the lazy dog 1234567890' },
    { name: 'Headline LG', scssVar: '$mobile-typography-headline-lg', sample: 'The quick brown fox jumps over the lazy dog 1234567890' },
    { name: 'Headline MD', scssVar: '$mobile-typography-headline-md', sample: 'The quick brown fox jumps over the lazy dog 1234567890' },
    { name: 'Headline SM', scssVar: '$mobile-typography-headline-sm', sample: 'The quick brown fox jumps over the lazy dog 1234567890' },
  ],
  text: [
    { name: 'Text XL Regular', scssVar: '$mobile-typography-text-xl-regular', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text XL Bold', scssVar: '$mobile-typography-text-xl-bold', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text XL Underline', scssVar: '$mobile-typography-text-xl-underline', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text LG Regular', scssVar: '$mobile-typography-text-lg-regular', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text LG Bold', scssVar: '$mobile-typography-text-lg-bold', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text LG Underline', scssVar: '$mobile-typography-text-lg-underline', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text MD Regular', scssVar: '$mobile-typography-text-md-regular', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text MD Bold', scssVar: '$mobile-typography-text-md-bold', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text MD Underline', scssVar: '$mobile-typography-text-md-underline', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text SM Regular', scssVar: '$mobile-typography-text-sm-regular', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text SM Bold', scssVar: '$mobile-typography-text-sm-bold', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
    { name: 'Text SM Underline', scssVar: '$mobile-typography-text-sm-underline', sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
  ],
  price: [
    { name: 'Price LG', scssVar: '$mobile-typography-price-lg', sample: '$299.99' },
    { name: 'Price LG Strikethrough', scssVar: '$mobile-typography-price-lg-strikethrough', sample: '$299.99' },
    { name: 'Price MD', scssVar: '$mobile-typography-price-md', sample: '$199.99' },
    { name: 'Price MD Strikethrough', scssVar: '$mobile-typography-price-md-strikethrough', sample: '$199.99' },
    { name: 'Price SM', scssVar: '$mobile-typography-price-sm', sample: '$99.99' },
    { name: 'Price SM Strikethrough', scssVar: '$mobile-typography-price-sm-strikethrough', sample: '$99.99' },
  ],
  other: [
    { name: 'CTA MD', scssVar: '$mobile-typography-cta-md', sample: 'Tap Here' },
    { name: 'CTA SM', scssVar: '$mobile-typography-cta-sm', sample: 'Tap Here' },
    { name: 'Eyebrow', scssVar: '$mobile-typography-eyebrow', sample: 'NEW ARRIVAL' },
  ],
};

const formatValue = (value?: string | number): string => {
  if (value === undefined || value === null || value === '') {
    return '—';
  }
  return String(value);
};

const inferFontStyle = (raw: Record<string, string>, resolved: React.CSSProperties): string => {
  if (resolved.fontStyle) {
    return formatValue(resolved.fontStyle);
  }

  const rawWeight = raw.fontWeight?.toLowerCase();
  if (rawWeight && rawWeight.includes('italic')) {
    return 'italic';
  }

  return 'normal';
};

const describeFontWeight = (raw: Record<string, string>, resolved: React.CSSProperties): string => {
  const rawWeight = raw.fontWeight;
  const resolvedWeight = resolved.fontWeight ? String(resolved.fontWeight) : undefined;

  if (rawWeight && resolvedWeight && rawWeight !== resolvedWeight) {
    return `${rawWeight} · ${resolvedWeight}`;
  }

  return formatValue(rawWeight ?? resolvedWeight);
};

const TypographySample = ({ name, scssVar, sample }: TokenDefinition) => {
  const token = getTypographyToken(scssVar);

  const specs = useMemo(() => {
    const resolved = token.css;
    const raw = token.raw;

    return [
      ['font-family', resolved.fontFamily ?? raw.fontFamily],
  ['font-weight', describeFontWeight(raw, resolved)],
      ['font-style', inferFontStyle(raw, resolved)],
      ['font-size', resolved.fontSize ?? raw.fontSize],
      ['line-height', resolved.lineHeight ?? raw.lineHeight],
      ['letter-spacing', resolved.letterSpacing ?? raw.letterSpacing],
      ['text-decoration', resolved.textDecoration ?? raw.textDecoration ?? 'none'],
      ['text-transform', resolved.textTransform ?? raw.textCase ?? 'none'],
      ['paragraph-spacing', raw.paragraphSpacing],
    ].map(([label, value]) => ({ label, value: formatValue(value) }));
  }, [token, scssVar]);

  return (
    <div className="token-sample-row">
      <div className="token-sample-meta">
        <span className="token-sample-label">{name}</span>
        <span className="token-sample-preview" style={token.css}>
          {sample}
        </span>
  <code className="token-sample-code">{scssVar}</code>
      </div>
      <dl className="token-spec-grid">
        {specs.map((spec) => (
          <React.Fragment key={spec.label}>
            <dt>{spec.label}</dt>
            <dd>{spec.value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

const TypographyGroup = ({ title, tokens }: { title: string; tokens: TokenDefinition[] }) => (
  <section style={{ marginBottom: '48px' }}>
    <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 600, borderBottom: '2px solid #2b7a87', paddingBottom: '8px' }}>
      {title}
    </h2>
    <div>
      {tokens.map((token) => (
        <TypographySample key={token.scssVar} name={token.name} scssVar={token.scssVar} sample={token.sample} />
      ))}
    </div>
  </section>
);

const TypographyMobileComponent = () => (
  <div style={{ padding: '32px', maxWidth: '840px', margin: '0 auto' }}>
    <h1 style={{ marginBottom: '16px', fontSize: '28px', fontWeight: 700 }}>Typography · Mobile</h1>
    <p style={{ marginBottom: '48px', color: '#5b6164' }}>
      Mobile viewport typography tokens scaled for accessibility at smaller breakpoints. Samples render with the live token values so you can
      validate hierarchy and rhythm quickly.
    </p>

    <TypographyGroup title="Display" tokens={typographyTokens.display} />
    <TypographyGroup title="Headlines" tokens={typographyTokens.headline} />
    <TypographyGroup title="Body Text" tokens={typographyTokens.text} />
    <TypographyGroup title="Price" tokens={typographyTokens.price} />
    <TypographyGroup title="Utility" tokens={typographyTokens.other} />
  </div>
);

const meta = {
  title: 'Foundations/Responsive/Mobile/Typography',
  component: TypographyMobileComponent,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component: 'Typography tokens for mobile breakpoints (below 992px).',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TypographyMobileComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MobileTypography: Story = {};
