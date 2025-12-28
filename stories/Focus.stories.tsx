import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { resolveTokenValue } from './utils/scssTokens';

type FocusToken = {
  name: string;
  scssVar: string;
  description: string;
};

const focusTokens: FocusToken[] = [
  {
    name: 'Focus: Default',
    scssVar: '$focus-default',
    description: 'Default focus ring for interactive elements on light backgrounds.',
  },
  {
    name: 'Focus: Default Inverted',
    scssVar: '$focus-default-inverted',
    description: 'Default focus ring for interactive elements on dark backgrounds.',
  },
  {
    name: 'Focus: Accent',
    scssVar: '$focus-accent',
    description: 'Accent/highlight focus ring to draw attention to primary interactive elements.',
  },
  {
    name: 'Focus: Error',
    scssVar: '$focus-error',
    description: 'Focus ring for error state on interactive elements.',
  },
  {
    name: 'Focus: Error Inverted',
    scssVar: '$focus-error-inverted',
    description: 'Focus ring for error state on interactive elements with dark backgrounds.',
  },
];

const FocusSwatch = ({ token }: { token: FocusToken }) => {
  const shadowValue = useMemo(() => resolveTokenValue(token.scssVar), [token.scssVar]);
  const formattedShadow = useMemo(() => formatBoxShadow(shadowValue), [shadowValue]);

  const surfaceTintedColor = useMemo(() => resolveTokenValue('$color-surface-tinted-1'), []);
  const backgroundSolidColor = useMemo(() => resolveTokenValue('$color-background-default-solid'), []);
  const textSecondaryColor = useMemo(() => resolveTokenValue('$color-text-default-secondary'), []);
  const textPrimaryColor = useMemo(() => resolveTokenValue('$color-text-default-primary'), []);

  // Determine if this is an inverted variant for background color
  const isInverted = token.name.toLowerCase().includes('inverted');
  const buttonBgColor = isInverted ? '#2e3030' : backgroundSolidColor;
  const buttonTextColor = isInverted ? '#ffffff' : textPrimaryColor;

  return (
    <div className="token-sample-row">
      <div className="token-sample-meta" style={{ maxWidth: '360px' }}>
        <span className="token-sample-label">{token.name}</span>
        <div
          style={{
            width: '100%',
            borderRadius: '20px',
            padding: '32px',
            backgroundColor: surfaceTintedColor,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: buttonBgColor,
              color: buttonTextColor,
              border: 'none',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: formattedShadow ?? shadowValue,
              outline: 'none',
            }}
          >
            Interactive Element
          </button>
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

const FocusComponent = () => (
  <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {focusTokens.map((token) => (
        <FocusSwatch key={token.name} token={token} />
      ))}
    </div>

    <section style={{ marginTop: '48px', padding: '24px', backgroundColor: 'var(--color-surface-secondary)', borderRadius: '16px' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 600 }}>Usage Guidelines</h2>
      <ul style={{ color: '#5b6164', lineHeight: 1.6, paddingLeft: '24px' }}>
        <li><strong>Focus: Default</strong> - Use for standard interactive elements (buttons, links, inputs) on light backgrounds to meet WCAG accessibility requirements.</li>
        <li><strong>Focus: Default Inverted</strong> - Apply to interactive elements on dark or solid color backgrounds to ensure focus visibility.</li>
        <li><strong>Focus: Accent</strong> - Reserve for primary CTAs and high-priority interactive elements to draw attention during keyboard navigation.</li>
        <li><strong>Focus: Error</strong> - Use exclusively for form fields and interactive elements in an error or invalid state.</li>
        <li><strong>Focus: Error Inverted</strong> - Apply to error state elements on dark backgrounds for consistent error communication.</li>
      </ul>
      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#fff3cd', borderRadius: '8px', color: '#856404' }}>
        <strong>Accessibility Note:</strong> Focus indicators are critical for keyboard navigation and must always be visible.
        Never remove focus styles with <code>outline: none</code> unless providing an equally visible alternative.
      </div>
    </section>
  </div>
);

const meta = {
  title: 'Foundations/Focus',
  component: FocusComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Focus tokens provide accessible keyboard focus indicators for all interactive elements in the design system.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FocusComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FocusRings: Story = {};

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
