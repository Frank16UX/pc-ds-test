import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { resolveTokenValue } from './utils/scssTokens';
import { getTokenDescription } from './utils/tokenDescriptions';

type PaddingToken = {
  name: string;
  scssVar: string;
  description: string;
};

const paddingTokens: Record<string, PaddingToken[]> = {
  vertical: [
    { name: 'XL', scssVar: '$mobile-section-padding-vertical-xl', description: getTokenDescription('$responsive-mobile-section-padding-vertical-xl') ?? 'Extra large vertical padding' },
    { name: 'LG', scssVar: '$mobile-section-padding-vertical-lg', description: getTokenDescription('$responsive-mobile-section-padding-vertical-lg') ?? 'Large vertical padding' },
    { name: 'MD', scssVar: '$mobile-section-padding-vertical-md', description: getTokenDescription('$responsive-mobile-section-padding-vertical-md') ?? 'Medium vertical padding' },
    { name: 'SM', scssVar: '$mobile-section-padding-vertical-sm', description: getTokenDescription('$responsive-mobile-section-padding-vertical-sm') ?? 'Small vertical padding' },
    { name: 'XS', scssVar: '$mobile-section-padding-vertical-xs', description: getTokenDescription('$responsive-mobile-section-padding-vertical-xs') ?? 'Extra small vertical padding' },
  ],
  horizontal: [
    { name: 'LG', scssVar: '$mobile-section-padding-horizontal-lg', description: getTokenDescription('$responsive-mobile-section-padding-horizontal-lg') ?? 'Large horizontal padding' },
    { name: 'MD', scssVar: '$mobile-section-padding-horizontal-md', description: getTokenDescription('$responsive-mobile-section-padding-horizontal-md') ?? 'Medium horizontal padding' },
    { name: 'SM', scssVar: '$mobile-section-padding-horizontal-sm', description: getTokenDescription('$responsive-mobile-section-padding-horizontal-sm') ?? 'Small horizontal padding' },
    { name: 'XS', scssVar: '$mobile-section-padding-horizontal-xs', description: getTokenDescription('$responsive-mobile-section-padding-horizontal-xs') ?? 'Extra small horizontal padding' },
  ],
};

const PaddingVisualizer = ({ token }: { token: PaddingToken }) => {
  const value = resolveTokenValue(token.scssVar);
  
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{token.name}</div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>{token.description}</div>
        <div style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace' }}>{token.scssVar}</div>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#2b7a87', marginTop: '4px' }}>{value}</div>
      </div>
      <div style={{ 
        backgroundColor: '#f3f4f6', 
        border: '1px solid #e5e7eb',
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          backgroundColor: '#2b7a87',
          height: token.scssVar.includes('vertical') ? value : '40px',
          width: token.scssVar.includes('horizontal') ? value : '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {value}
        </div>
      </div>
    </div>
  );
};

const SectionPaddingComponent = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: '700' }}>Section Padding · Mobile</h1>
      <p style={{ marginBottom: '32px', color: '#666', maxWidth: '800px' }}>
        Section padding tokens for mobile viewports. These define consistent spacing between major layout sections on smaller screens.
      </p>

      <h2 style={{ marginTop: '32px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Vertical Padding</h2>
      <p style={{ marginBottom: '24px', color: '#666', fontSize: '14px' }}>
        Use for top/bottom padding of sections. Height visualization shows the actual padding value.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {paddingTokens.vertical.map((token) => (
          <PaddingVisualizer key={token.scssVar} token={token} />
        ))}
      </div>

      <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Horizontal Padding</h2>
      <p style={{ marginBottom: '24px', color: '#666', fontSize: '14px' }}>
        Use for left/right padding of sections. Width visualization shows the actual padding value.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {paddingTokens.horizontal.map((token) => (
          <PaddingVisualizer key={token.scssVar} token={token} />
        ))}
      </div>

      <div style={{ 
        marginTop: '48px', 
        padding: '24px', 
        backgroundColor: '#f9fafb', 
        border: '1px solid #e5e7eb',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Usage Example</h3>
        <pre style={{ 
          fontSize: '13px', 
          fontFamily: 'monospace', 
          backgroundColor: '#1e1e1e', 
          color: '#d4d4d4',
          padding: '16px',
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`.section {
  padding-top: $mobile-section-padding-vertical-lg;
  padding-bottom: $mobile-section-padding-vertical-lg;
  padding-left: $mobile-section-padding-horizontal-md;
  padding-right: $mobile-section-padding-horizontal-md;
  
  @media (min-width: 768px) {
    padding-top: $desktop-section-padding-vertical-lg;
    padding-bottom: $desktop-section-padding-vertical-lg;
    padding-left: $desktop-section-padding-horizontal-md;
    padding-right: $desktop-section-padding-horizontal-md;
  }
}`}
        </pre>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Responsive/Mobile/Section Padding',
  component: SectionPaddingComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Section padding tokens for mobile viewports to maintain consistent spacing in layouts.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionPaddingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {};
