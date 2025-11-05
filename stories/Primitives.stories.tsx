import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

const PrimitivesComponent = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: '700', color: '#ef4444' }}>
        ⚠️ Primitives (Internal Use Only)
      </h1>
      <div style={{ 
        padding: '24px', 
        backgroundColor: '#fef2f2', 
        border: '2px solid #ef4444',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#991b1b' }}>
          Do Not Use These Tokens Directly
        </p>
        <p style={{ fontSize: '14px', color: '#7f1d1d', lineHeight: '1.6' }}>
          Primitive tokens are low-level values used internally by the design system. 
          They should not be referenced directly in your code.
        </p>
      </div>
      
      <div style={{ 
        padding: '24px', 
        backgroundColor: '#f0f9ff', 
        border: '2px solid #0ea5e9',
        borderRadius: '8px'
      }}>
        <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#0c4a6e' }}>
          ✅ Use Semantic Tokens Instead
        </p>
        <p style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: '1.6', marginBottom: '12px' }}>
          Semantic tokens provide context and meaning. They're located in:
        </p>
        <ul style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: '1.8', paddingLeft: '24px' }}>
          <li><code style={{ backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '3px' }}>build/scss/_tokens.scss</code></li>
          <li><code style={{ backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '3px' }}>build/css/tokens.css</code></li>
        </ul>
        <p style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: '1.6', marginTop: '12px' }}>
          Examples: <code style={{ backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '3px' }}>$color-text-default-primary</code>, 
          <code style={{ backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '3px', marginLeft: '4px' }}>$color-background-accent-solid</code>
        </p>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Primitives',
  component: PrimitivesComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      disable: true,
    },
  },
  tags: [],
} satisfies Meta<typeof PrimitivesComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
