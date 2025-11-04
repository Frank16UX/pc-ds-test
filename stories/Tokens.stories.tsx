import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo } from 'react';
import { resolveTokenValue } from './utils/scssTokens';

const semanticTokens = {
  text: {
    default: [
      { name: 'text-default-primary', scssVar: '$tokens-color-text-default-primary', description: 'Primary text color' },
      { name: 'text-default-primary-inverted', scssVar: '$tokens-color-text-default-primary-inverted', description: 'Inverted primary text' },
      { name: 'text-default-secondary', scssVar: '$tokens-color-text-default-secondary', description: 'Secondary text color' },
      { name: 'text-default-tertiary', scssVar: '$tokens-color-text-default-tertiary', description: 'Tertiary text color' },
      { name: 'text-default-disabled', scssVar: '$tokens-color-text-default-disabled', description: 'Disabled text' },
      { name: 'text-default-disabled-on-surface', scssVar: '$tokens-color-text-default-disabled-on-surface', description: 'Disabled text on surface' },
    ],
    accent: [
      { name: 'text-accent-default', scssVar: '$tokens-color-text-accent-default', description: 'Accent text' },
      { name: 'text-accent-on-surface', scssVar: '$tokens-color-text-accent-on-surface', description: 'Accent text on surface' },
      { name: 'text-accent-high-contrast', scssVar: '$tokens-color-text-accent-high-contrast', description: 'High contrast accent' },
    ],
    semantic: [
      { name: 'text-error-default', scssVar: '$tokens-color-text-error-default', description: 'Error text' },
      { name: 'text-error-high-contrast', scssVar: '$tokens-color-text-error-high-contrast', description: 'High contrast error' },
      { name: 'text-error-high-contrast-inverted', scssVar: '$tokens-color-text-error-high-contrast-inverted', description: 'Inverted error (high contrast)' },
      { name: 'text-info-default', scssVar: '$tokens-color-text-info-default', description: 'Info text' },
      { name: 'text-info-high-contrast', scssVar: '$tokens-color-text-info-high-contrast', description: 'High contrast info' },
      { name: 'text-success-default', scssVar: '$tokens-color-text-success-default', description: 'Success text' },
      { name: 'text-success-high-contrast', scssVar: '$tokens-color-text-success-high-contrast', description: 'High contrast success' },
      { name: 'text-warning-default', scssVar: '$tokens-color-text-warning-default', description: 'Warning text' },
      { name: 'text-warning-high-contrast', scssVar: '$tokens-color-text-warning-high-contrast', description: 'High contrast warning' },
      { name: 'text-emphasis-default', scssVar: '$tokens-color-text-emphasis-default', description: 'Emphasis text' },
      { name: 'text-emphasis-high-contrast', scssVar: '$tokens-color-text-emphasis-high-contrast', description: 'High contrast emphasis' },
    ],
  },
  buttons: [
    { name: 'buttons-primary-default', scssVar: '$tokens-color-buttons-primary-default', description: 'Primary button default' },
    { name: 'buttons-primary-hovered', scssVar: '$tokens-color-buttons-primary-hovered', description: 'Primary button hover' },
    { name: 'buttons-primary-pressed', scssVar: '$tokens-color-buttons-primary-pressed', description: 'Primary button pressed' },
    { name: 'buttons-primary-disabled', scssVar: '$tokens-color-buttons-primary-disabled', description: 'Primary button disabled' },
    { name: 'buttons-secondary-default', scssVar: '$tokens-color-buttons-secondary-default', description: 'Secondary button default' },
    { name: 'buttons-secondary-hovered', scssVar: '$tokens-color-buttons-secondary-hovered', description: 'Secondary button hover' },
    { name: 'buttons-secondary-pressed', scssVar: '$tokens-color-buttons-secondary-pressed', description: 'Secondary button pressed' },
    { name: 'buttons-secondary-disabled', scssVar: '$tokens-color-buttons-secondary-disabled', description: 'Secondary button disabled' },
    { name: 'buttons-destructive-default', scssVar: '$tokens-color-buttons-destructive-default', description: 'Destructive button default' },
    { name: 'buttons-destructive-hovered', scssVar: '$tokens-color-buttons-destructive-hovered', description: 'Destructive button hover' },
    { name: 'buttons-destructive-pressed', scssVar: '$tokens-color-buttons-destructive-pressed', description: 'Destructive button pressed' },
  ],
  border: {
    button: [
      { name: 'border-button-default', scssVar: '$tokens-color-border-button-default', description: 'Button border default' },
      { name: 'border-button-disabled', scssVar: '$tokens-color-border-button-disabled', description: 'Button border disabled' },
      { name: 'border-button-hovered', scssVar: '$tokens-color-border-button-hovered', description: 'Button border hover' },
    ],
    focus: [
      { name: 'border-focus-default', scssVar: '$tokens-color-border-focus-default', description: 'Focus border default' },
      { name: 'border-focus-error', scssVar: '$tokens-color-border-focus-error', description: 'Focus border error' },
      { name: 'border-focus-accent', scssVar: '$tokens-color-border-focus-accent', description: 'Focus border accent' },
      { name: 'border-focus-error-inverted', scssVar: '$tokens-color-border-focus-error-inverted', description: 'Focus border error inverted' },
    ],
    scroll: [
      { name: 'border-scroll-active', scssVar: '$tokens-color-border-scroll-active', description: 'Scroll border active' },
      { name: 'border-scroll-inactive', scssVar: '$tokens-color-border-scroll-inactive', description: 'Scroll border inactive' },
    ],
    input: [
      { name: 'border-input-default', scssVar: '$tokens-color-border-input-default', description: 'Input border default' },
      { name: 'border-input-disabled', scssVar: '$tokens-color-border-input-disabled', description: 'Input border disabled' },
      { name: 'border-input-active', scssVar: '$tokens-color-border-input-active', description: 'Input border active' },
      { name: 'border-input-error', scssVar: '$tokens-color-border-input-error', description: 'Input border error' },
    ],
    iconButton: [
      { name: 'border-icon-button-default', scssVar: '$tokens-color-border-icon-button-default', description: 'Icon button border default' },
      { name: 'border-icon-button-hovered', scssVar: '$tokens-color-border-icon-button-hovered', description: 'Icon button border hover' },
      { name: 'border-icon-button-active', scssVar: '$tokens-color-border-icon-button-active', description: 'Icon button border active' },
    ],
    divider: [
      { name: 'border-divider-subtle', scssVar: '$tokens-color-border-divider-subtle', description: 'Divider subtle' },
      { name: 'border-divider-strong', scssVar: '$tokens-color-border-divider-strong', description: 'Divider strong' },
      { name: 'border-divider-inverted', scssVar: '$tokens-color-border-divider-inverted', description: 'Divider inverted' },
    ],
    accent: [
      { name: 'border-accent-default', scssVar: '$tokens-color-border-accent-default', description: 'Accent border default' },
      { name: 'border-accent-strong', scssVar: '$tokens-color-border-accent-strong', description: 'Accent border strong' },
    ],
  },
  links: [
    { name: 'links-default', scssVar: '$tokens-color-links-default', description: 'Link default' },
    { name: 'links-hovered', scssVar: '$tokens-color-links-hovered', description: 'Link hover' },
    { name: 'links-disabled', scssVar: '$tokens-color-links-disabled', description: 'Link disabled' },
    { name: 'links-pressed', scssVar: '$tokens-color-links-pressed', description: 'Link pressed' },
  ],
  surface: [
    { name: 'surface-primary', scssVar: '$tokens-color-surface-primary', description: 'Primary surface' },
    { name: 'surface-secondary', scssVar: '$tokens-color-surface-secondary', description: 'Secondary surface' },
    { name: 'surface-interactive-default', scssVar: '$tokens-color-surface-interactive-default', description: 'Interactive surface default' },
    { name: 'surface-interactive-disabled', scssVar: '$tokens-color-surface-interactive-disabled', description: 'Interactive surface disabled' },
    { name: 'surface-interactive-hovered', scssVar: '$tokens-color-surface-interactive-hovered', description: 'Interactive surface hover' },
    { name: 'surface-interactive-selected', scssVar: '$tokens-color-surface-interactive-selected', description: 'Interactive surface selected' },
    { name: 'surface-interactive-selected-hover', scssVar: '$tokens-color-surface-interactive-selected-hover', description: 'Interactive surface selected hover' },
    { name: 'surface-tinted-1', scssVar: '$tokens-color-surface-tinted-1', description: 'Tinted surface 1' },
    { name: 'surface-tinted-2', scssVar: '$tokens-color-surface-tinted-2', description: 'Tinted surface 2' },
    { name: 'surface-overlay', scssVar: '$tokens-color-surface-overlay', description: 'Overlay surface' },
  ],
  background: {
    accent: [
      { name: 'background-accent-solid', scssVar: '$tokens-color-background-accent-solid', description: 'Accent background solid' },
      { name: 'background-accent-subtle', scssVar: '$tokens-color-background-accent-subtle', description: 'Accent background subtle' },
    ],
    default: [
      { name: 'background-default-static-black', scssVar: '$tokens-color-background-default-static-black', description: 'Static black background' },
      { name: 'background-default-static-white', scssVar: '$tokens-color-background-default-static-white', description: 'Static white background' },
      { name: 'background-default-solid', scssVar: '$tokens-color-background-default-solid', description: 'Default solid background' },
      { name: 'background-default-subtle', scssVar: '$tokens-color-background-default-subtle', description: 'Default subtle background' },
    ],
    alt: [
      { name: 'background-alt-subtle', scssVar: '$tokens-color-background-alt-subtle', description: 'Alternative subtle background' },
      { name: 'background-alt-solid', scssVar: '$tokens-color-background-alt-solid', description: 'Alternative solid background' },
    ],
  },
  icon: {
    default: [
      { name: 'icon-default-primary', scssVar: '$tokens-color-icon-default-primary', description: 'Primary icon' },
      { name: 'icon-default-primary-inverted', scssVar: '$tokens-color-icon-default-primary-inverted', description: 'Primary icon inverted' },
      { name: 'icon-default-secondary', scssVar: '$tokens-color-icon-default-secondary', description: 'Secondary icon' },
      { name: 'icon-default-tertiary', scssVar: '$tokens-color-icon-default-tertiary', description: 'Tertiary icon' },
      { name: 'icon-default-disabled', scssVar: '$tokens-color-icon-default-disabled', description: 'Disabled icon' },
      { name: 'icon-default-disabled-on-surface', scssVar: '$tokens-color-icon-default-disabled-on-surface', description: 'Disabled icon on surface' },
    ],
    accent: [
      { name: 'icon-accent-default', scssVar: '$tokens-color-icon-accent-default', description: 'Accent icon' },
      { name: 'icon-accent-on-surface', scssVar: '$tokens-color-icon-accent-on-surface', description: 'Accent icon on surface' },
      { name: 'icon-accent-high-contrast', scssVar: '$tokens-color-icon-accent-high-contrast', description: 'High contrast accent icon' },
    ],
    semantic: [
      { name: 'icon-error-default', scssVar: '$tokens-color-icon-error-default', description: 'Error icon' },
      { name: 'icon-error-high-contrast', scssVar: '$tokens-color-icon-error-high-contrast', description: 'High contrast error icon' },
      { name: 'icon-info-default', scssVar: '$tokens-color-icon-info-default', description: 'Info icon' },
      { name: 'icon-info-high-contrast', scssVar: '$tokens-color-icon-info-high-contrast', description: 'High contrast info icon' },
      { name: 'icon-warning-default', scssVar: '$tokens-color-icon-warning-default', description: 'Warning icon' },
      { name: 'icon-warning-high-contrast', scssVar: '$tokens-color-icon-warning-high-contrast', description: 'High contrast warning icon' },
      { name: 'icon-success-default', scssVar: '$tokens-color-icon-success-default', description: 'Success icon' },
      { name: 'icon-success-high-contrast', scssVar: '$tokens-color-icon-success-high-contrast', description: 'High contrast success icon' },
      { name: 'icon-emphasis-default', scssVar: '$tokens-color-icon-emphasis-default', description: 'Emphasis icon' },
      { name: 'icon-emphasis-high-contrast', scssVar: '$tokens-color-icon-emphasis-high-contrast', description: 'High contrast emphasis icon' },
    ],
  },
  graphics: {
    complementary: [
      { name: 'graphics-complementary-1', scssVar: '$tokens-color-graphics-complementary-1', description: 'Complementary color 1' },
      { name: 'graphics-complementary-2', scssVar: '$tokens-color-graphics-complementary-2', description: 'Complementary color 2' },
      { name: 'graphics-complementary-3', scssVar: '$tokens-color-graphics-complementary-3', description: 'Complementary color 3' },
      { name: 'graphics-complementary-4', scssVar: '$tokens-color-graphics-complementary-4', description: 'Complementary color 4' },
      { name: 'graphics-complementary-5', scssVar: '$tokens-color-graphics-complementary-5', description: 'Complementary color 5' },
      { name: 'graphics-complementary-6', scssVar: '$tokens-color-graphics-complementary-6', description: 'Complementary color 6' },
      { name: 'graphics-complementary-7', scssVar: '$tokens-color-graphics-complementary-7', description: 'Complementary color 7' },
      { name: 'graphics-complementary-8', scssVar: '$tokens-color-graphics-complementary-8', description: 'Complementary color 8' },
      { name: 'graphics-complementary-9', scssVar: '$tokens-color-graphics-complementary-9', description: 'Complementary color 9' },
      { name: 'graphics-complementary-10', scssVar: '$tokens-color-graphics-complementary-10', description: 'Complementary color 10' },
      { name: 'graphics-complementary-11', scssVar: '$tokens-color-graphics-complementary-11', description: 'Complementary color 11' },
      { name: 'graphics-complementary-12', scssVar: '$tokens-color-graphics-complementary-12', description: 'Complementary color 12' },
      { name: 'graphics-complementary-13', scssVar: '$tokens-color-graphics-complementary-13', description: 'Complementary color 13' },
      { name: 'graphics-complementary-14', scssVar: '$tokens-color-graphics-complementary-14', description: 'Complementary color 14' },
      { name: 'graphics-complementary-15', scssVar: '$tokens-color-graphics-complementary-15', description: 'Complementary color 15' },
      { name: 'graphics-complementary-16', scssVar: '$tokens-color-graphics-complementary-16', description: 'Complementary color 16' },
    ],
    consultant: [
      { name: 'consultant-advanced-director', scssVar: '$tokens-color-graphics-consultant-advanced-director', description: 'Advanced Director' },
      { name: 'consultant-consultant', scssVar: '$tokens-color-graphics-consultant-consultant', description: 'Consultant' },
      { name: 'consultant-director', scssVar: '$tokens-color-graphics-consultant-director', description: 'Director' },
      { name: 'consultant-executive-director', scssVar: '$tokens-color-graphics-consultant-executive-director', description: 'Executive Director' },
      { name: 'consultant-national-executive-director', scssVar: '$tokens-color-graphics-consultant-national-executive-director', description: 'National Executive Director' },
      { name: 'consultant-senior-consultant', scssVar: '$tokens-color-graphics-consultant-senior-consultant', description: 'Senior Consultant' },
      { name: 'consultant-senior-director', scssVar: '$tokens-color-graphics-consultant-senior-director', description: 'Senior Director' },
      { name: 'consultant-senior-executive-director', scssVar: '$tokens-color-graphics-consultant-senior-executive-director', description: 'Senior Executive Director' },
      { name: 'consultant-team-leader', scssVar: '$tokens-color-graphics-consultant-team-leader', description: 'Team Leader' },
    ],
    partyStatus: [
      { name: 'party-status-coming-up', scssVar: '$tokens-color-graphics-party-status-coming-up', description: 'Coming Up' },
      { name: 'party-status-needs-attention', scssVar: '$tokens-color-graphics-party-status-needs-attention', description: 'Needs Attention' },
      { name: 'party-status-open', scssVar: '$tokens-color-graphics-party-status-open', description: 'Open' },
      { name: 'party-status-submitted', scssVar: '$tokens-color-graphics-party-status-submitted', description: 'Submitted' },
      { name: 'party-status-unsubmitted', scssVar: '$tokens-color-graphics-party-status-unsubmitted', description: 'Unsubmitted' },
    ],
    themes: {
      fallWinter: [
        { name: 'themes-fall-winter-graphic', scssVar: '$tokens-color-graphics-themes-fall-winter-graphic', description: 'Fall/Winter graphic' },
        { name: 'themes-fall-winter-line', scssVar: '$tokens-color-graphics-themes-fall-winter-line', description: 'Fall/Winter line' },
        { name: 'themes-fall-winter-primary-background', scssVar: '$tokens-color-graphics-themes-fall-winter-primary-background', description: 'Fall/Winter primary background' },
        { name: 'themes-fall-winter-secondary-background', scssVar: '$tokens-color-graphics-themes-fall-winter-secondary-background', description: 'Fall/Winter secondary background' },
        { name: 'themes-fall-winter-shape', scssVar: '$tokens-color-graphics-themes-fall-winter-shape', description: 'Fall/Winter shape' },
        { name: 'themes-fall-winter-surface', scssVar: '$tokens-color-graphics-themes-fall-winter-surface', description: 'Fall/Winter surface' },
      ],
      springSummer: [
        { name: 'themes-spring-summer-graphic', scssVar: '$tokens-color-graphics-themes-spring-summer-graphic', description: 'Spring/Summer graphic' },
        { name: 'themes-spring-summer-line', scssVar: '$tokens-color-graphics-themes-spring-summer-line', description: 'Spring/Summer line' },
        { name: 'themes-spring-summer-primary-background', scssVar: '$tokens-color-graphics-themes-spring-summer-primary-background', description: 'Spring/Summer primary background' },
        { name: 'themes-spring-summer-secondary-background', scssVar: '$tokens-color-graphics-themes-spring-summer-secondary-background', description: 'Spring/Summer secondary background' },
        { name: 'themes-spring-summer-shape', scssVar: '$tokens-color-graphics-themes-spring-summer-shape', description: 'Spring/Summer shape' },
        { name: 'themes-spring-summer-surface', scssVar: '$tokens-color-graphics-themes-spring-summer-surface', description: 'Spring/Summer surface' },
      ],
      standard: [
        { name: 'themes-standard-graphic', scssVar: '$tokens-color-graphics-themes-standard-graphic', description: 'Standard graphic' },
        { name: 'themes-standard-line', scssVar: '$tokens-color-graphics-themes-standard-line', description: 'Standard line' },
        { name: 'themes-standard-primary-background', scssVar: '$tokens-color-graphics-themes-standard-primary-background', description: 'Standard primary background' },
        { name: 'themes-standard-secondary-background', scssVar: '$tokens-color-graphics-themes-standard-secondary-background', description: 'Standard secondary background' },
        { name: 'themes-standard-shape', scssVar: '$tokens-color-graphics-themes-standard-shape', description: 'Standard shape' },
        { name: 'themes-standard-surface', scssVar: '$tokens-color-graphics-themes-standard-surface', description: 'Standard surface' },
      ],
      summerFall: [
        { name: 'themes-summer-fall-graphic', scssVar: '$tokens-color-graphics-themes-summer-fall-graphic', description: 'Summer/Fall graphic' },
        { name: 'themes-summer-fall-line', scssVar: '$tokens-color-graphics-themes-summer-fall-line', description: 'Summer/Fall line' },
        { name: 'themes-summer-fall-primary-background', scssVar: '$tokens-color-graphics-themes-summer-fall-primary-background', description: 'Summer/Fall primary background' },
        { name: 'themes-summer-fall-secondary-background', scssVar: '$tokens-color-graphics-themes-summer-fall-secondary-background', description: 'Summer/Fall secondary background' },
        { name: 'themes-summer-fall-shape', scssVar: '$tokens-color-graphics-themes-summer-fall-shape', description: 'Summer/Fall shape' },
        { name: 'themes-summer-fall-surface', scssVar: '$tokens-color-graphics-themes-summer-fall-surface', description: 'Summer/Fall surface' },
      ],
    },
  },
};

const TokenSwatch = ({ name, scssVar, description }: { name: string; scssVar: string; description: string }) => {
  const color = useMemo(() => resolveTokenValue(scssVar), [scssVar]);

  return (
    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: '80px',
          height: '48px',
          backgroundColor: color ?? '#cccccc',
          borderRadius: '4px',
          border: '1px solid #e0e0e0',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{name}</div>
        <div style={{ fontSize: '11px', color: '#666' }}>{description}</div>
        <div style={{ fontSize: '10px', color: '#999', fontFamily: 'monospace', marginTop: '2px' }}>{scssVar}</div>
      </div>
    </div>
  );
};

const TokenGroup = ({ title, tokens }: { title: string; tokens: Array<{ name: string; scssVar: string; description: string }> }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', borderBottom: '2px solid #2b7a87', paddingBottom: '8px' }}>
      {title}
    </h3>
    <div>
      {tokens.map((token) => (
        <TokenSwatch key={token.name} name={token.name} scssVar={token.scssVar} description={token.description} />
      ))}
    </div>
  </div>
);

const TokensComponent = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '32px', fontWeight: '700' }}>Semantic Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#666', maxWidth: '800px' }}>
        Semantic tokens provide meaning and context to design elements. They reference primitive tokens and are used throughout the design system.
      </p>

      <h2 style={{ marginTop: '32px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Text Tokens</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        <TokenGroup title="Default Text" tokens={semanticTokens.text.default} />
        <TokenGroup title="Accent Text" tokens={semanticTokens.text.accent} />
        <TokenGroup title="Semantic Text" tokens={semanticTokens.text.semantic} />
      </div>

      <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Button Tokens</h2>
      <TokenGroup title="Button Colors" tokens={semanticTokens.buttons} />

      <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Border Tokens</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        <TokenGroup title="Button Borders" tokens={semanticTokens.border.button} />
        <TokenGroup title="Focus Borders" tokens={semanticTokens.border.focus} />
        <TokenGroup title="Scroll Borders" tokens={semanticTokens.border.scroll} />
        <TokenGroup title="Input Borders" tokens={semanticTokens.border.input} />
        <TokenGroup title="Icon Button Borders" tokens={semanticTokens.border.iconButton} />
        <TokenGroup title="Divider Borders" tokens={semanticTokens.border.divider} />
        <TokenGroup title="Accent Borders" tokens={semanticTokens.border.accent} />
      </div>

      <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Link Tokens</h2>
      <TokenGroup title="Link Colors" tokens={semanticTokens.links} />

      <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Surface Tokens</h2>
      <TokenGroup title="Surface Colors" tokens={semanticTokens.surface} />

      <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Background Tokens</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        <TokenGroup title="Accent Backgrounds" tokens={semanticTokens.background.accent} />
        <TokenGroup title="Default Backgrounds" tokens={semanticTokens.background.default} />
        <TokenGroup title="Alternative Backgrounds" tokens={semanticTokens.background.alt} />
      </div>

      <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Icon Tokens</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        <TokenGroup title="Default Icons" tokens={semanticTokens.icon.default} />
        <TokenGroup title="Accent Icons" tokens={semanticTokens.icon.accent} />
        <TokenGroup title="Semantic Icons" tokens={semanticTokens.icon.semantic} />
      </div>

      <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Graphics Tokens</h2>
      <TokenGroup title="Complementary Colors" tokens={semanticTokens.graphics.complementary} />
      
      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>Consultant Colors</h3>
      <TokenGroup title="Consultant Levels" tokens={semanticTokens.graphics.consultant} />
      
      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>Party Status Colors</h3>
      <TokenGroup title="Party Status" tokens={semanticTokens.graphics.partyStatus} />
      
      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>Theme Colors</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        <TokenGroup title="Fall/Winter Theme" tokens={semanticTokens.graphics.themes.fallWinter} />
        <TokenGroup title="Spring/Summer Theme" tokens={semanticTokens.graphics.themes.springSummer} />
        <TokenGroup title="Standard Theme" tokens={semanticTokens.graphics.themes.standard} />
        <TokenGroup title="Summer/Fall Theme" tokens={semanticTokens.graphics.themes.summerFall} />
      </div>
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
        component: 'Semantic tokens that provide context-specific color values for UI elements.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TokensComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticColors: Story = {};
