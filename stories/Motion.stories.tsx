import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo } from 'react';
import { resolveTokenValue } from './utils/scssTokens';

const motionTokens = {
  durations: {
    productive: [
      { name: 'Productive XS', scssVar: '$motion-durations-productive-xs' },
      { name: 'Productive SM', scssVar: '$motion-durations-productive-sm' },
      { name: 'Productive MD', scssVar: '$motion-durations-productive-md' },
      { name: 'Productive LG', scssVar: '$motion-durations-productive-lg' },
      { name: 'Productive XL', scssVar: '$motion-durations-productive-xl' },
      { name: 'Productive XXL', scssVar: '$motion-durations-productive-xxl' },
    ],
    expressive: [
      { name: 'Expressive XS', scssVar: '$motion-durations-expressive-xs' },
      { name: 'Expressive SM', scssVar: '$motion-durations-expressive-sm' },
      { name: 'Expressive MD', scssVar: '$motion-durations-expressive-md' },
      { name: 'Expressive LG', scssVar: '$motion-durations-expressive-lg' },
      { name: 'Expressive XL', scssVar: '$motion-durations-expressive-xl' },
      { name: 'Expressive XXL', scssVar: '$motion-durations-expressive-xxl' },
    ],
  },
  easings: [
    { name: 'Direct', scssVar: '$motion-easings-direct-direct-curve', description: 'Fast, immediate transitions' },
    { name: 'Enter', scssVar: '$motion-easings-indirect-enter-curve', description: 'Elements entering the view' },
    { name: 'Exit', scssVar: '$motion-easings-indirect-exit-curve', description: 'Elements leaving the view' },
    { name: 'Standard', scssVar: '$motion-easings-indirect-standard-curve', description: 'Standard transitions' },
    { name: 'Linear', scssVar: '$motion-easings-indirect-linear-curve', description: 'Constant speed' },
  ],
  delays: {
    productive: [
      { name: 'Productive XS', scssVar: '$motion-delays-productive-xs' },
      { name: 'Productive SM', scssVar: '$motion-delays-productive-sm' },
      { name: 'Productive MD', scssVar: '$motion-delays-productive-md' },
      { name: 'Productive LG', scssVar: '$motion-delays-productive-lg' },
      { name: 'Productive XL', scssVar: '$motion-delays-productive-xl' },
      { name: 'Productive XXL', scssVar: '$motion-delays-productive-xxl' },
    ],
    expressive: [
      { name: 'Expressive XS', scssVar: '$motion-delays-expressive-xs' },
      { name: 'Expressive SM', scssVar: '$motion-delays-expressive-sm' },
      { name: 'Expressive MD', scssVar: '$motion-delays-expressive-md' },
      { name: 'Expressive LG', scssVar: '$motion-delays-expressive-lg' },
      { name: 'Expressive XL', scssVar: '$motion-delays-expressive-xl' },
      { name: 'Expressive XXL', scssVar: '$motion-delays-expressive-xxl' },
    ],
  },
};

const EasingDemo = ({ name, scssVar, description }: { name: string; scssVar: string; description: string }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const value = useMemo(() => resolveTokenValue(scssVar) ?? 'cubic-bezier(0, 0, 1, 1)', [scssVar]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{name}</div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{description}</div>
        <div style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace', marginBottom: '2px' }}>{scssVar}</div>
        <div style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace' }}>{value}</div>
      </div>
      <div style={{ height: '40px', backgroundColor: '#ffffff', borderRadius: '4px', padding: '8px', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            width: '32px',
            height: '24px',
            backgroundColor: '#2b7a87',
            borderRadius: '4px',
            position: 'absolute',
            left: isAnimating ? 'calc(100% - 40px)' : '8px',
            transition: `left 1s ${value}`,
          }}
        />
      </div>
    </div>
  );
};

const TokenRow = ({ name, scssVar }: { name: string; scssVar: string }) => {
  const value = useMemo(() => resolveTokenValue(scssVar) ?? '—', [scssVar]);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #e0e0e0' }}>
      <div>
        <div style={{ fontSize: '14px', fontWeight: '500' }}>{name}</div>
        <div style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace', marginTop: '2px' }}>{scssVar}</div>
      </div>
      <div style={{ fontSize: '14px', fontFamily: 'monospace', color: '#666' }}>{value}</div>
    </div>
  );
};

const TokenTable = ({ title, tokens }: { title: string; tokens: Array<{ name: string; scssVar: string }> }) => (
  <div style={{ marginBottom: '32px' }}>
    <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600' }}>{title}</h3>
    <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      {tokens.map((token) => (
        <TokenRow key={token.name} name={token.name} scssVar={token.scssVar} />
      ))}
    </div>
  </div>
);

const MotionComponent = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: '700' }}>Motion</h1>
      <p style={{ marginBottom: '48px', color: '#666', maxWidth: '800px' }}>
        Motion tokens define animation durations, easing curves, and delays to create consistent, purposeful animations throughout the design system.
      </p>

      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Easing Curves</h2>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        Easing curves control the acceleration of animations, creating natural-feeling motion.
      </p>
      <div style={{ marginBottom: '48px' }}>
        {motionTokens.easings.map((easing) => (
          <EasingDemo key={easing.name} {...easing} />
        ))}
      </div>

      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Durations</h2>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        Animation durations are split into productive (faster, task-oriented) and expressive (slower, more noticeable) categories.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <TokenTable title="Productive Durations" tokens={motionTokens.durations.productive} />
        <TokenTable title="Expressive Durations" tokens={motionTokens.durations.expressive} />
      </div>

      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Delays</h2>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        Delays create staggered animations and choreographed sequences.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <TokenTable title="Productive Delays" tokens={motionTokens.delays.productive} />
        <TokenTable title="Expressive Delays" tokens={motionTokens.delays.expressive} />
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Motion',
  component: MotionComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Motion tokens provide consistent timing and easing for animations and transitions.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MotionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnimationTokens: Story = {};
