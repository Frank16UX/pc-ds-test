import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { getTokensByPrefix, type TokenEntry } from './utils/scssTokens';

// Define token category configuration
type CategoryConfig = {
  prefix: string;
  label: string;
  subcategories?: Record<string, string>;
};

const tokenCategories: CategoryConfig[] = [
  {
    prefix: 'color-text',
    label: 'Text Colors',
    subcategories: {
      'default': 'Default',
      'accent': 'Accent',
      'error': 'Error',
      'info': 'Info',
      'success': 'Success',
      'warning': 'Warning',
      'emphasis': 'Emphasis',
    },
  },
  {
    prefix: 'color-buttons',
    label: 'Button Colors',
    subcategories: {
      'primary': 'Primary',
      'secondary': 'Secondary',
      'destructive': 'Destructive',
    },
  },
  {
    prefix: 'color-border',
    label: 'Border Colors',
    subcategories: {
      'button': 'Button',
      'focus': 'Focus',
      'scroll': 'Scroll',
      'input': 'Input',
      'icon-button': 'Icon Button',
      'divider': 'Divider',
      'accent': 'Accent',
    },
  },
  { prefix: 'color-links', label: 'Link Colors' },
  { prefix: 'color-surface', label: 'Surface Colors' },
  {
    prefix: 'color-background',
    label: 'Background Colors',
    subcategories: {
      'accent': 'Accent',
      'default': 'Default',
      'alt': 'Alternative',
    },
  },
  {
    prefix: 'color-icon',
    label: 'Icon Colors',
    subcategories: {
      'default': 'Default',
      'accent': 'Accent',
      'error': 'Error',
      'info': 'Info',
      'warning': 'Warning',
      'success': 'Success',
      'emphasis': 'Emphasis',
      'subtle': 'Subtle',
    },
  },
  {
    prefix: 'color-graphics',
    label: 'Graphics Colors',
    subcategories: {
      'complementary': 'Complementary',
      'consultant': 'Consultant Levels',
      'party-status': 'Party Status',
      'themes': 'Themes',
    },
  },
];

const TokenSwatch = ({ token }: { token: TokenEntry }) => {
  const displayName = token.name.replace('$color-', '');

  return (
    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: '80px',
          height: '48px',
          backgroundColor: token.value,
          borderRadius: '4px',
          border: '1px solid #e0e0e0',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px', wordBreak: 'break-word' }}>
          {displayName}
        </div>
        <code style={{ fontSize: '10px', color: '#999', fontFamily: 'monospace' }}>{token.name}</code>
      </div>
    </div>
  );
};

const TokenGroup = ({ title, tokens }: { title: string; tokens: TokenEntry[] }) => {
  if (tokens.length === 0) return null;

  return (
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{
        marginBottom: '16px',
        fontSize: '18px',
        fontWeight: '600',
        borderBottom: '2px solid #2b7a87',
        paddingBottom: '8px'
      }}>
        {title} ({tokens.length})
      </h3>
      <div>
        {tokens.map((token) => (
          <TokenSwatch key={token.name} token={token} />
        ))}
      </div>
    </div>
  );
};

const TokensComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Load all tokens dynamically
  const allTokenGroups = useMemo(() => {
    return tokenCategories.map(category => {
      const tokens = getTokensByPrefix(category.prefix);

      // Group by subcategory if defined
      const grouped: Record<string, TokenEntry[]> = {};
      if (category.subcategories) {
        // Initialize groups
        Object.keys(category.subcategories).forEach(key => {
          grouped[key] = [];
        });
        grouped['other'] = [];

        // Sort tokens into groups
        tokens.forEach(token => {
          const nameWithoutPrefix = token.name.replace(`$${category.prefix}-`, '');
          let assigned = false;

          for (const subKey of Object.keys(category.subcategories!)) {
            if (nameWithoutPrefix.startsWith(subKey)) {
              grouped[subKey].push(token);
              assigned = true;
              break;
            }
          }

          if (!assigned) {
            grouped['other'].push(token);
          }
        });

        // Remove empty groups
        Object.keys(grouped).forEach(key => {
          if (grouped[key].length === 0) {
            delete grouped[key];
          }
        });
      } else {
        grouped['all'] = tokens;
      }

      return {
        ...category,
        tokens,
        grouped,
      };
    });
  }, []);

  const filteredGroups = selectedCategory
    ? allTokenGroups.filter(g => g.prefix === selectedCategory)
    : allTokenGroups;

  const totalTokenCount = allTokenGroups.reduce((sum, g) => sum + g.tokens.length, 0);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: '700' }}>Semantic Tokens</h1>
      <p style={{ marginBottom: '24px', color: '#666', maxWidth: '800px' }}>
        Semantic tokens provide meaning and context to design elements. They reference primitive tokens and are used throughout the design system.
        <strong style={{ display: 'block', marginTop: '8px' }}>Total tokens: {totalTokenCount}</strong>
      </p>

      {/* Category Filter */}
      <div style={{ marginBottom: '32px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
          All
        </button>
        {tokenCategories.map(cat => (
          <button
            type="button"
            key={cat.prefix}
            onClick={() => setSelectedCategory(cat.prefix)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedCategory === cat.prefix ? '#2b7a87' : '#e3ebed',
              color: selectedCategory === cat.prefix ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Token Groups */}
      {filteredGroups.map(group => (
        <div key={group.prefix} style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
            {group.label}
          </h2>

          {group.subcategories ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
              {Object.entries(group.grouped).map(([subKey, tokens]) => {
                const subLabel = group.subcategories?.[subKey] || 'Other';
                return (
                  <TokenGroup
                    key={subKey}
                    title={subLabel}
                    tokens={tokens}
                  />
                );
              })}
            </div>
          ) : (
            <TokenGroup title={group.label} tokens={group.tokens} />
          )}
        </div>
      ))}
    </div>
  );
};

const meta = {
  title: 'Foundations/Tokens',
  component: TokensComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Semantic tokens that provide context-specific color values for UI elements. Tokens are loaded dynamically from SCSS source files.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TokensComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticColors: Story = {};
