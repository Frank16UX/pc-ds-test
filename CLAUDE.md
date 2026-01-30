# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Pampered Chef Design Tokens System** - a design token library that converts Figma tokens (via Tokens Studio plugin) into SCSS and CSS variables. It also includes React components built with React Aria for accessibility.

## Commands

```bash
# Build design tokens from Figma exports
npm run build:tokens

# Sync tokens from GitHub repository (Frank16UX/pc-ds-tokens)
npm run sync:tokens

# Watch GitHub repository for token updates (polls every 5 minutes)
npm run watch:tokens

# Development server for Storybook
npm run storybook

# Build static Storybook
npm run build-storybook
```

### Storybook Troubleshooting

**Overlapping Pages Glitch**: If you see the Docs page and Canvas overlapping in Storybook:

1. Kill the Storybook process: `pkill -f "npm run storybook"`
2. Restart Storybook: `npm run storybook`
3. Hard refresh the browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows/Linux)

This is a known Storybook hot-reload issue that occurs when making significant changes to story files.

### Token Sync (Manual)

To update design tokens from the source repository:

```bash
npm run sync:tokens
```

This command:
1. Fetches the latest tokens from `https://github.com/Frank16UX/pc-ds-tokens`
2. Copies files from the repo's `export-from-figma` folder to local `export-from-figma/`
3. Automatically runs `npm run build:tokens` to regenerate SCSS/CSS outputs

## Architecture

### Token Pipeline

```
export-from-figma/tokens-from-ts.json  →  build-tokens.js  →  build/scss/ & build/css/
         (Figma source)                    (Style Dictionary)    (Generated output)
```

The `build-tokens.js` script uses `@tokens-studio/sd-transforms` to preprocess Tokens Studio exports, then generates flattened SCSS and CSS outputs organized by token group.

### Token Organization

**Semantic tokens** (use these): `build/scss/_tokens.scss`, `build/css/tokens.css`
- Examples: `$tokens-color-text-default-primary`, `var(--tokens-color-buttons-primary-default)`

**Primitive tokens** are generated but intentionally NOT exported in `build/scss/index.scss` - never reference primitives directly.

Token groups: Tokens, Numeric Tokens, Fonts, Elevation, Responsive/Desktop, Responsive/Mobile, Motion, Breakpoints, Ratios, Focus.

**Important**: The build script auto-detects token groups from `export-from-figma/tokens-from-ts.json` using the `$metadata.tokenSetOrder` field (respects Figma's ordering) or falls back to detecting top-level keys.

### Component Structure

```
src/components/
  actions/
    Button/
      Button.tsx          # React Aria component
      Button.module.scss  # CSS Modules styling
      index.ts
    IconButton/
      IconButton.tsx
      IconButton.module.scss
      index.ts
```

Components use React Aria primitives for accessibility and CSS Modules with SCSS tokens for styling.

## Key Technologies

- **React 19.2.1** with **React Aria Components** for accessible UI primitives
- **Style Dictionary** + **@tokens-studio/sd-transforms** for token generation
- **Storybook 10** for documentation and component development
- **Vite** + **TypeScript** (strict mode)
- **Vitest** + **Playwright** for testing

## Component Development Guidelines

Reference the `instructions/component docu/` directory for component specifications and prop definitions:
- `button/` - Button component specs and guidelines
- `icon-button/` - IconButton specs
- `checkbox/`, `radio-button/`, `switch/` - Form control specs
- `text-input/`, `text-area/` - Input field specs
- `dropdown-menu/`, `dropdown-list-item/` - Dropdown specs
- `chip/`, `quantity-stepper/`, `text-link/` - Additional component specs
- `props-template.md` - Template for documenting component props

### Patterns

1. Extend React Aria components for accessibility
2. Use CSS Modules (`.module.scss`) with semantic token variables
3. Import tokens via `@import '~build/scss/index'`
4. Never reference primitive tokens directly

### Testing

Run Storybook tests with Vitest + Playwright:
```bash
npx vitest
```

Tests run against stories defined in `.storybook/` using browser testing with Chromium.

## Token Build Notes

- All output values are **flattened** (no variable references) - set via `outputReferences: false`
- Responsive tokens have Desktop and Mobile variants with normalized references
- Focus FX tokens emit as JSON strings (layer arrays) representing box-shadow layers
- Shadow tokens are automatically converted to CSS `box-shadow` format from Tokens Studio's layer objects
- Motion tokens (durations, delays, easings) are processed separately from `animation.json`
- Tokens sync from external repo via `sync-tokens.sh`
- The build script fixes known reference issues (e.g., missing `Tokens.` prefix in focus-fx error colors)

## Folder Structure Rationale

The project structure follows design system best practices (Style Dictionary, Tokens Studio patterns):

| Directory | Purpose | Why at Root Level |
|-----------|---------|-------------------|
| `build/` | Generated token outputs | Generated artifacts ≠ source code. Industry standard for Style Dictionary. |
| `assets/` | Static resources (fonts, icons, imgs) | Served by Storybook via `staticDirs`. Root level is conventional. |
| `export-from-figma/` | Token source data | External input from Figma Tokens Studio, not application code. |
| `src/` | React components | Application source code only. |
| `stories/` | Storybook documentation | Separate from component source (Storybook convention). |
| `instructions/` | Component design specs | Reference documentation, not runtime code. |

**Key principle**: Keep generated files (`build/`) and external data (`export-from-figma/`) separate from source code (`src/`). This maintains clear separation of concerns and aligns with industry standards.
