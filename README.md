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

## � Token Organization

### ⚠️ Primitives (Internal Use Only)
- Located in `build/scss/_primitives.scss` and `build/css/primitives.css`
- **Do not use these directly in your code**
- These are base values (colors, raw numbers) that semantic tokens reference
- Examples: `$gold-500`, `$teal-700`, `$neutral-900`

### ✅ Semantic Tokens (Use These!)
- Located in `build/scss/_tokens.scss` and `build/css/tokens.css`
- Context-aware tokens that reference primitives
- Provide meaning and intent (e.g., "text-default-primary" vs just "neutral-900")
- Can be themed and updated without changing component code
- Examples: `$tokens-color-text-default-primary`, `$tokens-color-background-accent-solid`

**Always use semantic tokens in your components.** They provide better maintainability and allow for future theming capabilities.

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
- `build/scss/_<group>.scss` - SCSS partials that preserve references
- `build/scss/index.scss` - Convenience file that imports every partial
- `build/css/<group>.css` - CSS custom properties with flattened values

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

## 📁 Project Structure

```
pc-design-tokens/
├── export-from-figma/
│   ├── tokens-dtcg.json        # Raw tokens from Tokens Studio (DTCG export)
│   └── animation.json          # Supplemental motion tokens
├── build-tokens.js              # Build script with sd-transforms
├── build/
│   ├── scss/
│   │   ├── _tokens.scss         # Generated SCSS partials per group
│   │   ├── _primitives.scss
│   │   ├── _motion.scss
│   │   └── index.scss           # Aggregated SCSS entry point
│   └── css/
│       ├── tokens.css           # Generated CSS files per group
│       ├── motion.css
│       └── primitives.css
└── package.json
```

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
5. **Generates paired outputs** for each token group:
  - **SCSS partials with preserved references** (`outputReferences: true`)
  - **CSS files with flat values** (`outputReferences: false`)
  6. **Writes an aggregated index** that mirrors the SCSS folder structure
  7. **Transforms external motion tokens** (durations, delays, easings) into matching SCSS/CSS outputs with the same headers

### Output Differences

#### SCSS (build/scss/_tokens.scss)
```scss
// ============================================
// Tokens
// ============================================

$tokens-color-text-default-primary: $neutral-900;  // ← References primitive
$tokens-color-buttons-primary-default: $gold-500;

// ============================================
// gold
// ============================================

$gold-500: #fac761;  // ← Primitive definition in build/scss/_primitives.scss
```

**Benefits:**
- **Maintainable**: Change one primitive, update all semantics
- **Theme-friendly**: Override primitives for different themes
- **Readable**: Clear token relationships

#### CSS (build/css/tokens.css)
```css
:root {
  --tokens-color-text-default-primary: #2e3030;  /* ← Flat hex value */
  --tokens-color-buttons-primary-default: #fac761;
  --gold-500: #fac761;
}
```

**Benefits:**
- **Fast**: No reference resolution at runtime
- **Compatible**: Works everywhere CSS variables work
- **Simple**: Direct values, no dependencies

### Token Structure Flattening

The build script flattens the token hierarchy to resolve references:

- `Primitives.neutral.900` → `neutral.900`
- `Typography.font-weight.bold` → `font-weight.bold`
- `Scale.scale.4` → `scale.4`

This allows semantic tokens in the `Tokens` group to reference primitive values correctly.

## 📝 Notes

- **Responsive tokens included**: The build normalizes references inside the `Responsive/Desktop` and `Responsive/Mobile` groups so their typography tokens resolve correctly.
- **Focus FX tokens**: Layer arrays are emitted as JSON strings in SCSS (and raw JSON in CSS) to keep shadow settings intact.

## 🔗 Resources

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Style Dictionary Documentation](https://styledictionary.com/)
- [sd-transforms Package](https://www.npmjs.com/package/@tokens-studio/sd-transforms)
- [sd-transforms Documentation](https://docs.tokens.studio/transform-tokens/style-dictionary)

## 📊 Token Examples

### Colors
```scss
$gold-500: #fac761;
$teal-700: #2b7a87;
$neutral-900: #2e3030;
```

### Semantic Colors
```scss
$tokens-color-text-default-primary: #2e3030;
$tokens-color-buttons-primary-default: #fac761;
$tokens-color-surface-primary: #ffffff;
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
