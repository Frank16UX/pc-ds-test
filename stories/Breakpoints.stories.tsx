import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo } from 'react';
import { resolveTokenValue } from './utils/scssTokens';

const breakpointTokens = [
  { name: 'XS', scssVar: '$breakpoints-breakpoints-xs', description: 'Extra small devices (small phones)' },
  { name: 'SM', scssVar: '$breakpoints-breakpoints-sm', description: 'Small devices (phones)' },
  { name: 'MD', scssVar: '$breakpoints-breakpoints-md', description: 'Medium devices (tablets)' },
  { name: 'LG', scssVar: '$breakpoints-breakpoints-lg', description: 'Large devices (desktops)' },
  { name: 'XL', scssVar: '$breakpoints-breakpoints-xl', description: 'Extra large devices (large desktops)' },
  { name: 'XXL', scssVar: '$breakpoints-breakpoints-xxl', description: 'Extra extra large devices (larger desktops)' },
];

const BreakpointCard = ({ name, scssVar, description }: { name: string; scssVar: string; description: string }) => {
  const value = useMemo(() => resolveTokenValue(scssVar) ?? '0px', [scssVar]);
  
  return (
    <div 
      style={{ 
        padding: '24px', 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        border: '2px solid #2b7a87',
        marginBottom: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#2b7a87' }}>{name}</div>
        <div style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'monospace', color: '#2b7a87' }}>{value}</div>
      </div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{description}</div>
      <div style={{ fontSize: '12px', color: '#999', fontFamily: 'monospace' }}>{scssVar}</div>
      <div 
        style={{ 
          marginTop: '16px', 
          height: '8px', 
          backgroundColor: '#2b7a87', 
          borderRadius: '4px',
          width: `min(100%, ${value})`,
        }}
      />
    </div>
  );
};

const BreakpointsComponent = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: '700' }}>Breakpoints</h1>
      <p style={{ marginBottom: '48px', color: '#666', maxWidth: '800px' }}>
        Breakpoint tokens define viewport widths where layouts adapt to different screen sizes. Use these values to create responsive designs that work across all devices.
      </p>

      <div style={{ marginBottom: '48px' }}>
        {breakpointTokens.map((bp) => (
          <BreakpointCard key={bp.name} {...bp} />
        ))}
      </div>

      <div style={{ padding: '24px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>Usage in Media Queries</h2>
        <div style={{ fontFamily: 'monospace', fontSize: '13px', backgroundColor: '#2e3030', color: '#ffffff', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
          <div>@media (min-width: 768px) &#123;</div>
          <div style={{ paddingLeft: '20px' }}>/* Styles for MD and up */</div>
          <div>&#125;</div>
        </div>
        <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '24px' }}>
          <li><strong>XS (360px):</strong> Base styles, mobile-first approach</li>
          <li><strong>SM (576px):</strong> Larger phones in landscape</li>
          <li><strong>MD (768px):</strong> Tablets and small laptops</li>
          <li><strong>LG (992px):</strong> Desktop layouts begin</li>
          <li><strong>XL (1200px):</strong> Large desktop layouts</li>
          <li><strong>XXL (1728px):</strong> Extra wide displays</li>
        </ul>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Breakpoints',
  component: BreakpointsComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Breakpoint tokens for creating responsive layouts across different viewport sizes.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BreakpointsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResponsiveBreakpoints: Story = {};
