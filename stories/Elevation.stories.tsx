import type { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';
import { resolveTokenValue } from './utils/scssTokens';
import { getTokenDescription } from './utils/tokenDescriptions';

type ElevationToken = {
  name: string;
  scssVar: string;
  description: string;
};

const elevationTokens: ElevationToken[] = [
  {
    name: 'Component: Primary Button',
    scssVar: '$elevation-component-primary-button',
    description: getTokenDescription('$elevation-component-primary-button') ?? 'Component-specific elevation token',
  },
  {
    name: 'Component: Header',
    scssVar: '$elevation-component-header',
    description: getTokenDescription('$elevation-component-header') ?? 'Component-specific elevation token',
  },
  {
    name: 'Component: Bottom Fixed',
    scssVar: '$elevation-component-bottom-fixed',
    description: getTokenDescription('$elevation-component-bottom-fixed') ?? 'Component-specific elevation token',
  },
  {
    name: 'Component: Bottom Sticky Bar',
    scssVar: '$elevation-component-bottom-sticky-bar',
    description: getTokenDescription('$elevation-component-bottom-sticky-bar') ?? 'Component-specific elevation token',
  },
  {
    name: 'Elevation SM',
    scssVar: '$elevation-sm',
    description: getTokenDescription('$elevation-sm') ?? 'Small elevation shadow',
  },
  {
    name: 'Elevation MD',
    scssVar: '$elevation-md',
    description: getTokenDescription('$elevation-md') ?? 'Medium elevation shadow',
  },
  {
    name: 'Elevation LG',
    scssVar: '$elevation-lg',
    description: getTokenDescription('$elevation-lg') ?? 'Large elevation shadow',
  },
  {
    name: 'Elevation XL',
    scssVar: '$elevation-xl',
    description: getTokenDescription('$elevation-xl') ?? 'Extra large elevation shadow',
  },
];

const ElevationSwatch = ({ token }: { token: ElevationToken }) => {
  const shadowValue = useMemo(() => resolveTokenValue(token.scssVar), [token.scssVar]);
  const formattedShadow = useMemo(() => formatBoxShadow(shadowValue), [shadowValue]);

  const surfaceTintedColor = useMemo(() => resolveTokenValue('$color-surface-tinted-1'), []);
  const backgroundSolidColor = useMemo(() => resolveTokenValue('$color-background-default-solid'), []);

  return (
    <div className="token-sample-row">
      <div className="token-sample-meta" style={{ maxWidth: '360px' }}>
        <span className="token-sample-label">{token.name}</span>
        <div
          style={{
            width: '100%',
            borderRadius: '20px',
            padding: '24px',
            backgroundColor: surfaceTintedColor,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '200px',
              height: '140px',
              borderRadius: '16px',
              backgroundColor: backgroundSolidColor,
              boxShadow: formattedShadow ?? shadowValue,
            }}
          />
        </div>
        <code className="token-sample-code">{token.scssVar}</code>
      </div>
      <dl className="token-spec-grid">
        <dt>Description</dt>
        <dd>{token.description}</dd>
        <dt>Box Shadow</dt>
        <dd style={{ wordBreak: 'break-all', overflowWrap: 'break-word', maxWidth: '100%' }}>
          {formattedShadow ?? shadowValue ?? '—'}
        </dd>
      </dl>
    </div>
  );
};

const ElevationComponent = () => (
  <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {elevationTokens.map((token) => (
        <ElevationSwatch key={token.name} token={token} />
      ))}
    </div>

    <section style={{ marginTop: '48px', padding: '24px', backgroundColor: 'var(--color-surface-secondary)', borderRadius: '16px' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 600 }}>Usage Guidelines</h2>
      <ul style={{ color: '#5b6164', lineHeight: 1.6, paddingLeft: '24px' }}>
        <li><strong>Component tokens:</strong> Purpose-built shadows for specific UI elements (buttons, headers, bottom sheets).</li>
        <li><strong>Elevation SM:</strong> Ideal for compact surfaces such as cards, popovers, and tooltips that need delicate separation.</li>
        <li><strong>Elevation MD:</strong> Adds clarity to mid-sized floating elements including dropdowns and anchored menus.</li>
        <li><strong>Elevation LG:</strong> Reserves extra depth for navigation drawers, mega menus, or sticky summaries.</li>
        <li><strong>Elevation XL:</strong> Use only for modals and blocking overlays where full attention is required.</li>
      </ul>
    </section>
  </div>
);

const meta = {
  title: 'Foundations/Elevation',
  component: ElevationComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Elevation tokens apply design system shadows to neutral surfaces so you can evaluate depth in context.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ElevationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Shadows: Story = {};

function formatBoxShadow(rawValue: string | undefined): string | undefined {
  if (!rawValue) {
    return undefined;
  }

  let parsed: Array<Record<string, string>> | Record<string, string> | undefined;
  try {
    parsed = JSON.parse(rawValue);
  } catch (error) {
    return undefined;
  }

  // Convert single object to array for consistent processing
  const shadowArray = Array.isArray(parsed) ? parsed : [parsed];

  const layers = shadowArray
    .map((layer) => {
      if (!layer || typeof layer !== 'object') {
        return undefined;
      }

      const color = layer.color ?? layer.Color ?? layer.hex;
      if (!color) {
        return undefined;
      }

      const x = toPx(layer.x ?? layer.X);
      const y = toPx(layer.y ?? layer.Y);
      const blur = toPx(layer.blur ?? layer.Blur);
      const spread = toPx(layer.spread ?? layer.Spread);

      return `${x} ${y} ${blur} ${spread} ${color}`.trim();
    })
    .filter(Boolean) as string[];

  if (layers.length === 0) {
    return undefined;
  }

  return layers.join(', ');
}

function toPx(value: unknown): string {
  if (value === undefined || value === null || value === '') {
    return '0px';
  }

  if (typeof value === 'number') {
    return `${value}px`;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return '0px';
    }

    if (/px$/i.test(trimmed)) {
      return trimmed;
    }

    const numeric = Number(trimmed);
    if (!Number.isNaN(numeric)) {
      return `${numeric}px`;
    }

    return trimmed;
  }

  return '0px';
}
