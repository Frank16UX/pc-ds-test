# Typography Composite Tokens — Rationale & Proposal

## Current Behavior

The token pipeline (`build-tokens.js`) uses Style Dictionary + `@tokens-studio/sd-transforms` to process the Figma export. When it encounters a **composite token** (like a typography token that bundles multiple properties), it serializes the entire object as a JSON string:

```scss
$desktop-typography-text-md-regular: '{"fontFamily":"Lexend","fontWeight":"400","fontSize":"16px","lineHeight":"150%"}';
$desktop-typography-text-xl-regular: '{"fontFamily":"Lexend","fontWeight":"400","fontSize":"20px","lineHeight":"150%"}';
```

SCSS has no mechanism to parse a JSON string and extract its values into CSS declarations. This means these tokens **cannot be used directly** in stylesheets.

## Current Workaround

Components must manually compose typography using individual sub-tokens:

```scss
font-family: f.$font-family-secondary;
font-weight: f.$font-weight-regular;
font-size: dt.$desktop-typescale-font-size-md; // 16px
line-height: 1.5;
```

This works but has drawbacks:

- Requires 3–4 property declarations per element instead of a single reference.
- Doesn't reference the composite token name, making it harder to trace back to the Figma typography style (e.g., `Desktop/text/md/regular`).
- Risk of drift if individual properties are updated inconsistently.

## Proposal: Generate SCSS Mixins for Typography Tokens

Update `build-tokens.js` to detect composite typography tokens and expand them into SCSS mixins alongside the existing JSON string output.

### Expected Output

A new file `build/scss/_typography-mixins.scss`:

```scss
@use 'fonts' as f;
@use 'responsive-desktop' as dt;

@mixin desktop-typography-text-md-regular {
  font-family: f.$font-family-secondary;
  font-weight: f.$font-weight-regular;
  font-size: dt.$desktop-typescale-font-size-md;
  line-height: 1.5;
}

@mixin desktop-typography-text-xl-regular {
  font-family: f.$font-family-secondary;
  font-weight: f.$font-weight-regular;
  font-size: dt.$desktop-typescale-font-size-xl;
  line-height: 1.5;
}

// ... generated for all typography composite tokens
```

### Usage in Components

```scss
@use '../../../../build/scss/typography-mixins' as typo;

.chip {
  &.size-md {
    @include typo.desktop-typography-text-md-regular;
  }

  &.size-xl {
    @include typo.desktop-typography-text-xl-regular;
  }
}
```

### Implementation Steps

1. In `build-tokens.js`, identify tokens of type `typography` from the Tokens Studio export.
2. For each typography token, map its properties to the corresponding individual SCSS token variables (font-family, font-weight, font-size, line-height, etc.).
3. Generate a `_typography-mixins.scss` file with one `@mixin` per typography token.
4. Export the new file in `build/scss/index.scss`.
5. Migrate existing components (Chip, Button, etc.) to use the mixins instead of manual property declarations.

### Considerations

- The JSON string output should be preserved for backward compatibility and for consumers who may parse it programmatically.
- Mixins should reference the existing individual token variables (not hardcoded values) so changes propagate correctly.
- Both Desktop and Mobile responsive variants should generate their own mixins.
