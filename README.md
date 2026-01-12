# PC Design Tokens

This project converts design tokens exported from Tokens Studio (Figma plugin) into SCSS and CSS variables using Style Dictionary with the sd-transforms package.

## 📦 What's Included

- **529 design tokens** converted to SCSS and CSS variables
- Core design system tokens:
  - **Semantic tokens** (use these in your code!)
  - Color primitives (internal use only - do not reference directly)
  - Semantic color tokens (text, buttons, borders, links, surface, background, icons)
  - Typography tokens (font families, font weights)
  - Scale and spacing tokens
  - Border radius tokens
  - Elevation/shadow tokens
  - Size tokens (heights, widths, icons)
  - Motion tokens (durations, delays, easing curves)

## 🛠 Token Organization

### ⚠️ Primitives (Hidden - Not for Developer Use)
- Primitive tokens (`$gold-500`, `$teal-700`, `$neutral-900`) are **intentionally hidden** and should never be used directly in your code
- While primitive files are generated during the build process, they are:
  - Not imported in `build/scss/index.scss`
  - Not imported in Storybook utilities
  - Not documented in Storybook stories
- **All semantic tokens now contain flat values** (no references to primitives) so they work independently

### ✅ Semantic Tokens (Use These!)
- Located in `build/scss/_tokens.scss` and `build/css/tokens.css`
- Context-aware tokens with **flat, resolved values** (e.g., `#2e3030` instead of `$neutral-900`)
- Provide meaning and intent (e.g., "text-default-primary" vs just "neutral-900")
- Can be updated without changing component code
- Examples: `$tokens-color-text-default-primary`, `$tokens-color-background-accent-solid`

**Always use semantic tokens in your components.** They provide better maintainability and prevent direct coupling to low-level color values.

## �🚀 Building Tokens

### Prerequisites

```bash
npm install
```

This installs:
- `style-dictionary` - Token transformation engine
- `@tokens-studio/sd-transforms` - Tokens Studio preprocessor and transforms

### Build Command

```bash
npm run build:tokens
```

This generates timestamped bundles for each top-level token group:
- `build/scss/_<group>.scss` - SCSS partials with flat, resolved values (no references)
- `build/scss/index.scss` - Convenience file that imports all semantic token partials (excludes primitives)
- `build/css/<group>.css` - CSS custom properties with flat, resolved values

## 🔄 Syncing Tokens from GitHub

### Manual Sync

```bash
npm run sync:tokens
```

Fetches the latest token files from `https://github.com/Frank16UX/pc-ds-tokens` and automatically rebuilds.

### Automatic Sync Watcher

```bash
npm run watch:tokens
```

Continuously monitors the GitHub repository (every 5 minutes) and auto-syncs when new commits are detected.

See [SYNC_GUIDE.md](SYNC_GUIDE.md) for detailed documentation on the sync workflow.

## 📖 Storybook

### Development Server

```bash
npm run storybook
```

Starts the Storybook development server at `http://localhost:6006` with live reloading.

### Build Storybook

```bash
npm run build-storybook
```

Builds a static version of Storybook to the `storybook-static` directory.

## 📁 Project Structure

```
pc-design-tokens/
├── export-from-figma/           # Token source data from Figma (Tokens Studio)
│   ├── tokens-from-ts.json      # Main token export (synced from GitHub)
│   └── animation.json           # Supplemental motion tokens
├── build/                       # Generated token outputs (do not edit)
│   ├── scss/
│   │   ├── _tokens.scss         # Semantic tokens (use these!)
│   │   ├── _primitives.scss     # Primitives (not imported in index)
│   │   ├── _motion.scss         # Motion tokens
│   │   ├── _fonts.scss          # Typography tokens
│   │   ├── _elevation.scss      # Shadow/elevation tokens
│   │   └── index.scss           # Aggregated SCSS entry point
│   └── css/
│       ├── tokens.css           # CSS custom properties version
│       └── ...                  # Other CSS token files
├── src/                         # React component source code
│   └── components/
│       └── actions/
│           ├── Button/
│           │   ├── Button.tsx       # Component implementation
│           │   ├── Button.module.scss  # Component styles
│           │   └── index.ts         # Re-export barrel file
│           └── IconButton/
│               ├── IconButton.tsx
│               ├── IconButton.module.scss
│               └── index.ts
├── stories/                     # Storybook documentation
│   ├── Tokens.stories.tsx       # Token showcase
│   └── components/
│       └── Button.stories.tsx   # Component documentation
├── assets/                      # Static resources (fonts, icons, images)
├── _instructions/               # Component design specs (reference docs)
│   └── component docu/          # Figma component specifications
├── build-tokens.js              # Token build script
└── package.json
```

## 🧩 Component Architecture

### Component Structure

Components follow a consistent folder pattern:

```
src/components/actions/ComponentName/
├── ComponentName.tsx          # React component (uses React Aria)
├── ComponentName.module.scss  # CSS Modules styling
└── index.ts                   # Re-export barrel file
```

**Why include `index.ts`?**

The barrel file provides several benefits:
- **Cleaner imports**: `import { Button } from '@/components/actions/Button'` vs `import { Button } from '@/components/actions/Button/Button'`
- **Encapsulation**: The folder acts as a public API - internals can be reorganized without breaking imports
- **Future extensibility**: Easy to add related exports (e.g., `ButtonGroup`, `ButtonIcon`) to the same import

While optional (modern bundlers handle direct imports fine), this pattern provides consistency and better developer experience across the design system.

### Component Development Patterns

1. **Extend React Aria Components** - Use React Aria primitives for built-in accessibility
2. **CSS Modules with SCSS** - Scoped styles using `.module.scss` files
3. **Use Semantic Tokens** - Import via `@import '~build/scss/index'`, reference semantic tokens only
4. **Never use Primitive Tokens** - Always use context-aware semantic tokens (e.g., `$tokens-color-buttons-primary-default`)

**Example:**

```tsx
// Button.tsx
import { Button as AriaButton } from 'react-aria-components';
import styles from './Button.module.scss';

export function Button({ children, ...props }) {
  return <AriaButton {...props} className={styles.button}>{children}</AriaButton>;
}
```

```scss
// Button.module.scss
@import '~build/scss/index';

.button {
  background-color: $tokens-color-buttons-primary-default;
  color: $tokens-color-text-default-primary-inverted;
  border-radius: $numeric-tokens-radius-md;
}
```

See `_instructions/spec_driven_component.md` and `_instructions/component docu/` for detailed component specifications.

## 🎨 Using the Tokens

### In SCSS

```scss
@import 'path/to/build/scss/index';

.button-primary {
  background-color: $tokens-color-buttons-primary-default;
  color: $tokens-color-text-default-primary-inverted;
  border-radius: $numeric-tokens-radius-md;
  padding: $numeric-tokens-spacing-md $numeric-tokens-spacing-lg;
}
```

### In CSS

```css
@import 'path/to/build/css/tokens.css';

.button-primary {
  background-color: var(--tokens-color-buttons-primary-default);
  color: var(--tokens-color-text-default-primary-inverted);
  border-radius: var(--numeric-tokens-radius-md);
  padding: var(--numeric-tokens-spacing-md) var(--numeric-tokens-spacing-lg);
}
```

## 🔧 How It Works

The build process uses the **sd-transforms preprocessor** which:

1. **Prepares Tokens Studio tokens** for Style Dictionary
2. **Resolves references** like `{Tokens.color.text.default.primary}` → primitive values
3. **Transforms values**:
   - Math expressions (`4*1.5px` → `6px`)
   - Opacity (`50%` → `0.5`)
   - Font weights (`Bold` → `700`)
   - Color modifiers (lighten/darken)
   - Dimensions (adds `px` units)
4. **Normalizes responsive references** so typography typescales resolve per breakpoint
5. **Generates flat outputs** for each token group:
  - **SCSS partials with resolved values** (`outputReferences: false`)
  - **CSS files with resolved values** (`outputReferences: false`)
  - Both SCSS and CSS now use flat values to prevent coupling to primitive tokens
6. **Writes an aggregated index** (`build/scss/index.scss`) that imports all semantic token files (excludes primitives)
7. **Transforms external motion tokens** (durations, delays, easings) into matching SCSS/CSS outputs with the same headers

### Output Format (SCSS & CSS)

All tokens now output with **flat, resolved values** instead of references:

#### SCSS (build/scss/_tokens.scss)
```scss
// All values are resolved - no references to primitives
$tokens-color-text-default-primary: #2e3030;
$tokens-color-text-default-primary-inverted: #ffffff;
$tokens-color-buttons-primary-default: #fac761;
$tokens-color-buttons-primary-hovered: #f5b83d;
```

#### CSS (build/css/tokens.css)
```css
:root {
  --tokens-color-text-default-primary: #2e3030;
  --tokens-color-text-default-primary-inverted: #ffffff;
  --tokens-color-buttons-primary-default: #fac761;
  --tokens-color-buttons-primary-hovered: #f5b83d;
}
```

**Benefits:**
- **Independent**: No dependency on primitive token files
- **Simple**: Direct values, no reference resolution needed
- **Consistent**: SCSS and CSS work the same way
- **Maintainable**: Semantic tokens are the single source of truth
- **Protected**: Developers can't accidentally use primitive tokens

### Token Structure Flattening

The build script flattens the token hierarchy to resolve references:

- `Primitives.neutral.900` → `neutral.900`
- `Typography.font-weight.bold` → `font-weight.bold`
- `Scale.scale.4` → `scale.4`

This allows semantic tokens in the `Tokens` group to reference primitive values correctly.

## 📝 Notes

- **Responsive tokens included**: The build normalizes references inside the `Responsive/Desktop` and `Responsive/Mobile` groups so their typography tokens resolve correctly.

## 🔗 Resources

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Style Dictionary Documentation](https://styledictionary.com/)
- [sd-transforms Package](https://www.npmjs.com/package/@tokens-studio/sd-transforms)
- [sd-transforms Documentation](https://docs.tokens.studio/transform-tokens/style-dictionary)

## 📊 Token Examples

### Semantic Colors (Use These!)
```scss
$tokens-color-text-default-primary: #2e3030;
$tokens-color-text-default-primary-inverted: #ffffff;
$tokens-color-buttons-primary-default: #fac761;
$tokens-color-buttons-primary-hovered: #f5b83d;
$tokens-color-surface-primary: #ffffff;
$tokens-color-background-accent-solid: #1a5961;
```

### Spacing
```scss
$spacing-none: 0px;
$spacing-xs: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
```

### Typography
```scss
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-bold: 700;
```
