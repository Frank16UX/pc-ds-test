# Design Tokens Build Comparison

## ✅ SCSS Partials (build/scss/*.scss)

### Features:
- **Preserved References**: Semantic tokens reference primitives
- **Per-Group Partials**: One `_*.scss` file per token group plus `index.scss`
- **Best for**: Development and theming

### Example
```css
/* build/css/tokens.css */
:root {
  --tokens-color-text-default-primary: #2e3030;
  --tokens-color-buttons-primary-default: #fac761;
}

/* build/css/primitives.css */
:root {
  --gold-500: #fac761;
}
```
$gold-500: #fac761;
```

### Benefits:
1. **Maintainability**: Change one primitive and every semantic alias updates automatically.
2. **Theming**: Swap primitives or replace an entire group partial for alternative themes.
3. **Readability**: Clear hierarchy between semantic tokens and their foundational values.

---

## ✅ CSS Tokens (build/css/*.css)

### Features
- **Flat Values**: All tokens have computed hex/numeric values.
- **Per-Group Bundles**: One CSS file per token group for selective consumption.
- **Best for**: Production CSS and runtime usage.

### Example:
\`\`\`css
:root {
  --tokens-color-text-default-primary: #2e3030;
  --tokens-color-buttons-primary-default: #fac761;
}
\`\`\`

### Benefits:
1. **Runtime Performance**: No alias resolution required in the browser.
2. **Compatibility**: Works everywhere CSS variables work.
3. **Simplicity**: Direct values scoped by group make tree-shaking straightforward.

---

## 📊 Comparison Table

| Feature | SCSS | CSS |
|---------|------|-----|
| References | ✅ Preserved ($neutral-900) | ❌ Flattened (#2e3030) |
| Output Structure | ✅ One partial per group + index | ✅ One CSS file per group |
| Theming Support | ✅ Override primitives/partials | ⚠️ Manual overrides |
| Runtime Performance | N/A (compile-time) | ✅ Fast |
| Recommended Use | Development, theming | Production, runtime |

---

## 🎯 Recommendation

**Use both!**

- **SCSS** for component development and theme overrides (import `build/scss/index.scss`).
- **CSS** for distributing tokens to consumers or runtime usage (include the group bundles you need).

