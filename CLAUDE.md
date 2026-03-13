# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Pampered Chef Design Tokens System** - a design token library that converts Figma tokens (via Tokens Studio plugin) into SCSS and CSS variables. It also includes React components built with React Aria for accessibility.

## Prompt Instructions

Always follow these rules everytime I enter a new prompt that requires/uses the Plan Mode.

1. **Save plans in structured folders**: Every time you use "Plan mode", save plans in `.claude/plans/` using this convention:
   - Folder name: `{id}-{plan-name}` (e.g., `001-navigation-prototypes`) The id should be consecutive to any existing plans/todo.
   - Inside each folder, create 2 markdown files:
     - `{id}-plan.md` - The full plan content
     - `{id}-todo.md` - The todo checklist with tasks and subtasks

2. **Track progress systematically**:
   - Mark tasks as completed in the todo file immediately after finishing them
   - Use task hierarchy: tasks and subtasks with dependency relationships
   - Each task/subtask has 4 statuses:
     - **Pending** - Not started yet
     - **In Progress** - Currently working on this
     - **Failed** - Attempted but encountered blocking issues
     - **Completed** - Successfully finished
   - Update status as you work through tasks

3. **Resume workflow after limits**:
   - When continuing a session after reaching limits:
     - Read the plan file (if multiple plans exist, ask which one to continue)
     - Check the todo list to find the last status
     - Continue with the next uncompleted task (prioritize "In Progress" or "Failed" tasks)
     - Never start from scratch - always pick up where you left off

After you finish building anything. Preview the result by opening the URL of the local server in the browser, and use the Claude on Desktop extension (/chrome) to review that everything is working as needed. Test the functionalities, appereance and identify any bugs or errors that might show up and automatically fix them.

## Commands

```bash
# Build design tokens from Figma exports
npm run build:tokens

# Build library (components) for npm publishing
npm run build:lib

# Build both tokens and library
npm run build

# Sync tokens from GitHub repository (Frank16UX/pc-ds-tokens)
npm run sync:tokens

# Development server for Storybook
npm run storybook

# Build static Storybook
npm run build-storybook

# Publish to npm (handled by GitHub Actions on version tags)
npm publish
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

Token groups: Tokens, Numeric Tokens, Fonts, Elevation, Responsive/Desktop, Responsive/Mobile, Motion, Breakpoints, Ratios.

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

## Folder Structure Rationale

The project structure follows design system best practices (Style Dictionary, Tokens Studio patterns):

| Directory            | Purpose                               | Why at Root Level                                                          |
| -------------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| `build/`             | Generated token outputs               | Generated artifacts ≠ source code. Industry standard for Style Dictionary. |
| `assets/`            | Static resources (fonts, icons, imgs) | Served by Storybook via `staticDirs`. Root level is conventional.          |
| `export-from-figma/` | Token source data                     | External input from Figma Tokens Studio, not application code.             |
| `src/`               | React components                      | Application source code only.                                              |
| `stories/`           | Storybook documentation               | Separate from component source (Storybook convention).                     |
| `_instructions/`     | Component design specs                | Reference documentation, not runtime code.                                 |

**Key principle**: Keep generated files (`build/`) and external data (`export-from-figma/`) separate from source code (`src/`). This maintains clear separation of concerns and aligns with industry standards.

## Package Publishing

The design system is published as a private npm package on GitHub Packages: **`@frank16ux/pc-design-system`**

### Publishing Infrastructure

- **Entry point**: `src/index.ts` (barrel export of all components)
- **Build outputs**:
  - `dist/index.js` (ESM)
  - `dist/index.cjs` (CommonJS)
  - `dist/index.d.ts` (TypeScript declarations)
  - `dist/index.css` (component styles)
- **Build configs**:
  - `vite.config.lib.ts` — Vite library bundling
  - `tsconfig.build.json` — TypeScript declarations
- **Registry**: GitHub Packages (https://npm.pkg.github.com)
- **CI/CD**: `.github/workflows/publish.yml` — Automatic publishing on version tags (`v*.*.*`)

### Publishing a New Version

1. Make changes, commit to a feature branch, create PR and merge to `main`
2. Update version: `npm version patch` (or `minor`/`major`)
3. Push tag: `git push origin vX.X.X`
4. GitHub Actions automatically builds and publishes
5. Verify on https://github.com/Frank16UX/pc-ds-test/packages

### Using the Package in Consumer Projects

See `PACKAGE_GUIDE.md` for complete setup and usage instructions. Quick start:

1. Create GitHub PAT with `read:packages` scope
2. Create `.npmrc` with registry config
3. `npm install @frank16ux/pc-design-system`
4. Import components: `import { Button } from '@frank16ux/pc-design-system'`
5. Import styles: `import '@frank16ux/pc-design-system/dist/index.css'`

Full guide: See `PACKAGE_GUIDE.md` for detailed setup, publishing, and update workflows.
