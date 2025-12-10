import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useMemo } from 'react';

const meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Import all icons from the base directory using Vite's glob import
const iconModules = import.meta.glob('/assets/icons/base/*.svg', { eager: true, as: 'url' });

const IconGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const icons = useMemo(() => {
    const iconList = Object.keys(iconModules).map((path) => {
      const iconName = path.split('/').pop()?.replace('.svg', '') || '';
      const iconPath = iconModules[path] as string;
      return { name: iconName, path: iconPath };
    });
    return iconList.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredIcons = useMemo(() => {
    if (!searchTerm) return icons;
    return icons.filter((icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [icons, searchTerm]);

  const handleCopyName = (iconName: string) => {
    navigator.clipboard.writeText(iconName);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 600 }}>Icons</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem', maxWidth: '800px' }}>
          A comprehensive collection of base icons used throughout the design system. Click on any icon to copy its name.
        </p>
        <input
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            outline: 'none',
          }}
        />
        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.875rem' }}>
          Showing {filteredIcons.length} of {icons.length} icons
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem',
        }}
      >
        {filteredIcons.map((icon) => (
          <div
            key={icon.name}
            onClick={() => handleCopyName(icon.name)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.5rem 1rem',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: copiedIcon === icon.name ? '#f0f9ff' : 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00a0a0';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              if (copiedIcon !== icon.name) {
                e.currentTarget.style.borderColor = '#e0e0e0';
              }
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={icon.path}
                alt={icon.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                textAlign: 'center',
                color: '#333',
                wordBreak: 'break-word',
                lineHeight: '1.3',
              }}
              title={icon.name}
            >
              {icon.name}
            </span>
            {copiedIcon === icon.name && (
              <span
                style={{
                  fontSize: '0.625rem',
                  color: '#00a0a0',
                  marginTop: '0.25rem',
                  fontWeight: 600,
                }}
              >
                Copied!
              </span>
            )}
          </div>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#999',
          }}
        >
          No icons found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export const AllIcons: Story = {
  render: () => <IconGallery />,
};
