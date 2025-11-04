import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo } from 'react';
import { resolveTokenValue } from './utils/scssTokens';

const ratioTokens = {
  vertical: [
    { name: 'Vertical 2:3', scssVar: '$ratios-vertical-2-3', ratio: 2/3, description: 'Portrait, slightly taller' },
    { name: 'Vertical 9:16', scssVar: '$ratios-vertical-9-16', ratio: 9/16, description: 'Mobile video, stories' },
    { name: 'Vertical 3:4', scssVar: '$ratios-vertical-3-4', ratio: 3/4, description: 'Traditional portrait' },
    { name: 'Vertical 1:1', scssVar: '$ratios-vertical-1-1', ratio: 1, description: 'Perfect square' },
  ],
  horizontal: [
    { name: 'Horizontal 3:2', scssVar: '$ratios-horizontal-3-2', ratio: 3/2, description: 'Classic photo ratio' },
    { name: 'Horizontal 16:9', scssVar: '$ratios-horizontal-16-9', ratio: 16/9, description: 'Widescreen video' },
    { name: 'Horizontal 4:3', scssVar: '$ratios-horizontal-4-3', ratio: 4/3, description: 'Traditional screen' },
    { name: 'Horizontal 1:1', scssVar: '$ratios-horizontal-1-1', ratio: 1, description: 'Perfect square' },
  ],
};

const RatioDemo = ({ name, scssVar, ratio, description }: { 
  name: string; 
  scssVar: string; 
  ratio: number;
  description: string;
}) => {
  const value = useMemo(() => resolveTokenValue(scssVar) ?? '1 / 1', [scssVar]);
  const containerWidth = 200;
  const height = containerWidth / ratio;
  
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '250px', marginBottom: '12px' }}>
        <div
          style={{
            width: `${containerWidth}px`,
            height: `${height}px`,
            backgroundColor: '#2b7a87',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>{value}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>aspect-ratio</div>
          </div>
        </div>
      </div>
      
      <div>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{name}</div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{description}</div>
        <div style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace' }}>{scssVar}</div>
      </div>
    </div>
  );
};

const RatiosComponent = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: '700' }}>Aspect Ratios</h1>
      <p style={{ marginBottom: '48px', color: '#666', maxWidth: '800px' }}>
        Aspect ratio tokens define proportional relationships between width and height. Use these values to maintain consistent image and container dimensions across your application.
      </p>

      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Vertical Ratios</h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        Vertical (portrait) aspect ratios are taller than they are wide, ideal for mobile content and portraits.
      </p>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '32px',
          marginBottom: '48px',
        }}
      >
        {ratioTokens.vertical.map((token) => (
          <RatioDemo key={token.name} {...token} />
        ))}
      </div>

      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Horizontal Ratios</h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        Horizontal (landscape) aspect ratios are wider than they are tall, commonly used for videos and photos.
      </p>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '32px',
          marginBottom: '48px',
        }}
      >
        {ratioTokens.horizontal.map((token) => (
          <RatioDemo key={token.name} {...token} />
        ))}
      </div>

      <div style={{ padding: '24px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>Usage with CSS</h2>
        <div style={{ fontFamily: 'monospace', fontSize: '13px', backgroundColor: '#2e3030', color: '#ffffff', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
          <div>.image-container &#123;</div>
          <div style={{ paddingLeft: '20px' }}>aspect-ratio: var(--ratios-horizontal-16-9);</div>
          <div style={{ paddingLeft: '20px' }}>width: 100%;</div>
          <div style={{ paddingLeft: '20px' }}>overflow: hidden;</div>
          <div>&#125;</div>
        </div>
        <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '24px' }}>
          <li><strong>16:9</strong> - Standard for video content and hero images</li>
          <li><strong>4:3</strong> - Traditional photography and presentations</li>
          <li><strong>3:2</strong> - Classic 35mm film photography ratio</li>
          <li><strong>1:1</strong> - Square format, popular for social media</li>
          <li><strong>9:16</strong> - Vertical video for mobile and stories</li>
        </ul>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Ratios',
  component: RatiosComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Aspect ratio tokens for maintaining consistent proportions in images, videos, and containers.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RatiosComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AspectRatios: Story = {};
