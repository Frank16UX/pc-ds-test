import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { resolveTokenValue } from './utils/scssTokens';

const meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Import all icons from all directories using Vite's glob import
const baseIcons = import.meta.glob('/assets/icons/base/*.svg', { eager: true, as: 'url' });
const graphicIcons = import.meta.glob('/assets/icons/graphic/*.svg', { eager: true, as: 'url' });
const flagIcons = import.meta.glob('/assets/icons/Flags/*.svg', { eager: true, as: 'url' });
const consumableIcons = import.meta.glob('/assets/icons/consumables/*.svg', { eager: true, as: 'url' });
const filledIcons = import.meta.glob('/assets/icons/filled/*.svg', { eager: true, as: 'url' });
const customIcons = import.meta.glob('/assets/icons/custom/*.svg', { eager: true, as: 'url' });
const socialIcons = import.meta.glob('/assets/icons/social/*.svg', { eager: true, as: 'url' });
// Import Lottie animations (exclude JSON fallbacks)
const animatedIcons = import.meta.glob('/assets/icons/animated-icons/*.lottie', { eager: true, as: 'url' });

type IconCategory = {
  name: string;
  icons: Record<string, unknown>;
  type: 'svg' | 'lottie';
};

const iconCategories: IconCategory[] = [
  { name: 'Base', icons: baseIcons, type: 'svg' },
  { name: 'Graphic', icons: graphicIcons, type: 'svg' },
  { name: 'Flags', icons: flagIcons, type: 'svg' },
  { name: 'Consumables', icons: consumableIcons, type: 'svg' },
  { name: 'Filled', icons: filledIcons, type: 'svg' },
  { name: 'Custom', icons: customIcons, type: 'svg' },
  { name: 'Social', icons: socialIcons, type: 'svg' },
  { name: 'Animated', icons: animatedIcons, type: 'lottie' },
];

type IconItem = {
  name: string;
  path: string;
  category: string;
  type: 'svg' | 'lottie';
};

const IconGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const allIcons = useMemo(() => {
    const iconList: IconItem[] = [];

    iconCategories.forEach((category) => {
      Object.keys(category.icons).forEach((path) => {
        const fileName = path.split('/').pop() || '';
        const extension = category.type === 'lottie' ? '.lottie' : '.svg';
        const iconName = fileName.replace(extension, '');
        const iconPath = category.icons[path] as string;

        iconList.push({
          name: iconName,
          path: iconPath,
          category: category.name,
          type: category.type,
        });
      });
    });

    return iconList.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allIcons.length };
    iconCategories.forEach((cat) => {
      counts[cat.name] = Object.keys(cat.icons).length;
    });
    return counts;
  }, [allIcons]);

  const filteredIcons = useMemo(() => {
    let filtered = allIcons;

    if (selectedCategory) {
      filtered = filtered.filter((icon) => icon.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((icon) =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [allIcons, selectedCategory, searchTerm]);

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
          A comprehensive collection of icons used throughout the design system. Click on any icon to copy its name.
          Includes base icons, graphics, flags, animated loaders, and more.
        </p>

        {/* Search */}
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
            marginBottom: '1rem',
          }}
        />

        {/* Category Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedCategory === null ? '#2b7a87' : '#e3ebed',
              color: selectedCategory === null ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            All ({categoryCounts.All})
          </button>
          {iconCategories.map((cat) => (
            <button
              type="button"
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selectedCategory === cat.name ? '#2b7a87' : '#e3ebed',
                color: selectedCategory === cat.name ? '#fff' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              {cat.name} ({categoryCounts[cat.name]})
            </button>
          ))}
        </div>

        <p style={{ color: '#666', fontSize: '0.875rem' }}>
          Showing {filteredIcons.length} of {allIcons.length} icons
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
            key={`${icon.category}-${icon.name}`}
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
              e.currentTarget.style.borderColor = '#2b7a87';
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
              {icon.type === 'lottie' ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: icon.name.includes('white')
                      ? resolveTokenValue('$color-background-default-subtle') ?? '#f5f5f5'
                      : 'transparent',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DotLottieReact
                    src={icon.path}
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              ) : (
                <img
                  src={icon.path}
                  alt={icon.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              )}
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
            <span
              style={{
                fontSize: '0.625rem',
                color: '#999',
                marginTop: '0.25rem',
              }}
            >
              {icon.category}
            </span>
            {copiedIcon === icon.name && (
              <span
                style={{
                  fontSize: '0.625rem',
                  color: '#2b7a87',
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
