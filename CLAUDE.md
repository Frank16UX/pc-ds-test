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

# Development server for Storybook
npm run storybook

# Build static Storybook
npm run build-storybook
```

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

Token groups: Tokens, Numeric Tokens, Fonts, Elevation, Responsive/Desktop, Responsive/Mobile, Motion, Breakpoints, Ratios.

### Component Structure

```
src/components/
  Button/
    Button.tsx          # React Aria component
    Button.module.scss  # CSS Modules styling
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

Reference the `_instructions/` directory for component specifications:
- `spec_driven_component.md` - Template for building components with Figma MCP
- `component docu/` - Specs for Button, Checkbox, Dropdown, TextInput, etc.

### Patterns

1. Extend React Aria components for accessibility
2. Use CSS Modules (`.module.scss`) with semantic token variables
3. Import tokens via `@import '~build/scss/index'`
4. Never reference primitive tokens directly

## Token Build Notes

- All output values are **flattened** (no variable references)
- Responsive tokens have Desktop and Mobile variants
- Focus FX tokens emit as JSON strings (layer arrays)
- Tokens sync from external repo via `sync-tokens.sh`
