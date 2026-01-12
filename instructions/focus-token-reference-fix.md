# Focus Token Reference Fix

## Problem

The **Focus** token group contains boxShadow tokens that reference color tokens **without the `Tokens.` prefix**. The references look like:
- `{color.border.focus.default}` ❌
- `{color.background.default.solid}` ❌

But they should be:
- `{Tokens.color.border.focus.default}` ✅
- `{Tokens.color.background.default.solid}` ✅

The [build-tokens.js](../build-tokens.js#L112-L133) file already has a fix for the `error` variant, but it's incomplete - it only fixes `{color.border.focus.error}` and doesn't fix all the other missing prefixes.

## Option 1: Reference Primitives Directly (Simpler)

Since `build-tokens.js` flattens everything to raw values anyway, you could:
- Change `{color.border.focus.default}` → `{colors.neutral.900}` directly in the Focus boxShadow tokens
- Remove the intermediate semantic tokens at `Tokens.color.border.focus.*`

**Pros:**
- Eliminates the reference errors immediately
- Simpler token structure in Figma
- Fewer layers of indirection

**Cons:**
- Loses semantic meaning (you won't know these are "focus border colors" in Figma)
- If you later want to change all focus borders globally, you'd need to update multiple Focus tokens
- Doesn't follow design token best practices (semantic layer on top of primitives)

## Option 2: Keep Semantic Tokens + Fix References (Better long-term)

Keep `Tokens.color.border.focus.*` as semantic tokens, but fix the references to include the `Tokens.` prefix:
- Change `{color.border.focus.default}` → `{Tokens.color.border.focus.default}`
- Change `{color.background.default.solid}` → `{Tokens.color.background.default.solid}`

**Pros:**
- Maintains semantic layer (better for design system scalability)
- Clear intent: "this is a focus border color"
- If you change the focus border color scheme, you update one place
- Follows design token best practices

**Cons:**
- Need to fix references in Figma (or expand the build script fix)

## Recommendation

**Keep the semantic tokens** and either:

**A) Fix in Figma Tokens Studio** (if you have access):
- Update the Focus token references to include `Tokens.` prefix
- This is the cleanest solution

**B) Expand the build script fix** (if Figma is managed by someone else):
- Create a comprehensive fix in `build-tokens.js` that automatically adds the missing `Tokens.` prefix to all Focus token references
- This handles the issue at build time without requiring Figma changes

## Current State

Reference errors found when running `npm run sync:tokens`:

```
tries to reference {color.background.default.solid}, which is not defined.
tries to reference {color.background.default.default}, which is not defined.
tries to reference {color.background.default.static-black}, which is not defined.
tries to reference {color.border.focus.accent-inverted}, which is not defined.
tries to reference {color.border.focus.accent}, which is not defined.
tries to reference {color.border.focus.error}, which is not defined.
tries to reference {color.border.focus.error-inverted}, which is not defined.
```

These references are in the `Focus.focus.*` boxShadow tokens within the layer color properties.
