import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { resolveTokenValue } from './utils/scssTokens';

type ElevationToken = {
  name: string;
  scssVar: string;
  description: string;
};

const elevationTokens: ElevationToken[] = [
  {
    name: 'Primary Button',
    scssVar: '$elevation-elevation-primary-button',
    description: 'Purpose-built for primary actions to add separation from the surface while staying compact.',
  },
  {
    name: 'Sharp SM',
    scssVar: '$elevation-elevation-sharp-sm',
    description: 'Subtle elevation for compact surfaces such as cards, badges, and contextual popovers.',
  },
  {
    name: 'Sharp MD',
    scssVar: '$elevation-elevation-sharp-md',
    description: 'Medium intensity shadow for menus, dropdowns, and floating utility panels.',
  },
  {
    name: 'Sharp LG',
    scssVar: '$elevation-elevation-sharp-lg',
    description: 'High-elevation layer that keeps larger panels like navigation drawers off the canvas.',
  },
  {
    name: 'Sharp XL',
    scssVar: '$elevation-elevation-sharp-xl',
    description: 'Maximum depth used for modals and overlays that must feel detached from the background.',
  },
  {
    name: 'Focus Default',
    scssVar: '$elevation-focus-default',
    description: 'Default focus ring with white inner border and dark outer ring for standard interactive elements.',
  },
  {
    name: 'Focus Default Inverted',
    scssVar: '$elevation-focus-default-inverted',
    description: 'Inverted focus ring with dark inner border and accent outer ring for light-on-dark contexts.',
  },
  {
    name: 'Focus Accent',
    scssVar: '$elevation-focus-accent',
    description: 'Accent focus ring with white inner border and teal outer ring to highlight primary actions.',
  },
  {
    name: 'Focus Accent Inverted',
    scssVar: '$elevation-focus-accent-inverted',
    description: 'Inverted accent focus ring with dark inner border and teal outer ring for contrast scenarios.',
  },
  {
    name: 'Focus Error',
    scssVar: '$elevation-focus-error',
    description: 'Error focus ring with white inner border and red outer ring to signal validation issues.',
  },
];

const ElevationSwatch = ({ token }: { token: ElevationToken }) => {
  const shadowValue = useMemo(() => resolveTokenValue(token.scssVar), [token.scssVar]);
  const formattedShadow = useMemo(() => formatBoxShadow(shadowValue), [shadowValue]);
  
  const surfaceTintedColor = useMemo(() => resolveTokenValue('$color-surface-tinted-1'), []);
  const backgroundSolidColor = useMemo(() => resolveTokenValue('$color-background-default-solid'), []);
  const textSecondaryColor = useMemo(() => resolveTokenValue('$color-text-default-secondary'), []);

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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              color: textSecondaryColor,
            }}
          >
            {token.name}
          </div>
        </div>
        <code className="token-sample-code">{token.scssVar}</code>
      </div>
      <dl className="token-spec-grid">
        <dt>Description</dt>
        <dd>{token.description}</dd>
        <dt>Box Shadow</dt>
        <dd>{formattedShadow ?? shadowValue ?? '—'}</dd>
      </dl>
    </div>
  );
};

const ElevationComponent = () => (
  <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
    <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: 700 }}>Elevation</h1>
    <p style={{ marginBottom: '48px', color: '#5b6164', maxWidth: '820px' }}>
      Elevation tokens define the shadow recipes used to layer content. Each token is applied to a white surface using
      <code style={{ marginLeft: '4px' }}>var(--color-background-default-solid)</code> so you can evaluate depth and softness.
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {elevationTokens.map((token) => (
        <ElevationSwatch key={token.name} token={token} />
      ))}
    </div>

    <section style={{ marginTop: '48px', padding: '24px', backgroundColor: 'var(--color-surface-secondary)', borderRadius: '16px' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 600 }}>Usage Guidelines</h2>
      <ul style={{ color: '#5b6164', lineHeight: 1.6, paddingLeft: '24px' }}>
        <li><strong>Primary Button:</strong> Applies only to the flagship CTA to keep it distinguished without overpowering content.</li>
        <li><strong>Sharp SM:</strong> Ideal for compact surfaces such as cards, popovers, and tooltips that need delicate separation.</li>
        <li><strong>Sharp MD:</strong> Adds clarity to mid-sized floating elements including dropdowns and anchored menus.</li>
        <li><strong>Sharp LG:</strong> Reserves extra depth for navigation drawers, mega menus, or sticky summaries.</li>
        <li><strong>Sharp XL:</strong> Use only for modals and blocking overlays where full attention is required.</li>
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

  let parsed: Array<Record<string, string>> | undefined;
  try {
    parsed = JSON.parse(rawValue);
  } catch (error) {
    return undefined;
  }

  if (!Array.isArray(parsed)) {
    return undefined;
  }

  const layers = parsed
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
