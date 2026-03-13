# Chips Component — Changelog

Comparison between `chip-props-v2.md` (spec), the current `Chip.tsx` + `Chip.module.scss` implementation, and the Figma design (node `2:28728`, read via Figma MCP on 2026-02-26).

---

## Summary

The implementation diverges from the v2 spec in several meaningful ways. Some divergences intentionally correct spec inaccuracies (confirmed by design intent), while others represent unresolved gaps. The table below cross-references all three sources.

> **Icon size rule (confirmed):** All icons within a chip — leading, trailing check, and dismiss X — follow a single scale: `$size-height-icon-xs` (16px) for `md`, and `$size-height-icon-md` (24px) for `xl`.

| # | Area | v2 Spec | Implementation | Figma (MCP) | Verdict |
|---|------|---------|---------------|-------------|---------|
| 1 | `isRemovable` prop | ✅ Exists (`boolean`, default `false`) | ❌ Removed — implicit | ➖ Design property, not a boolean | **Impl deviates from spec** |
| 2 | `leading` default | `'none'` | `'icon'` | `icon` shown as most common | **Spec incorrect; impl is correct** |
| 3 | Leading icon size `md` | 24px (`$size-height-icon-md`) | 16px (`$size-height-icon-xs`) | 24px (`size-[24px]`) | **Spec incorrect; impl is correct (16px)** |
| 4 | Leading icon size `xl` | 32px (`$size-height-icon-lg`) | 24px (`$size-height-icon-md`) | 24px (`size-[24px]`) | **Spec incorrect; impl is correct (24px)** |
| 5 | Trailing check size `md` | 24px (`$size-height-icon-md`) | 16px (`$size-height-icon-xs`) | Not directly sampled | **Spec incorrect; impl is correct (16px)** |
| 6 | Trailing check size `xl` | 32px (`$size-height-icon-lg`) | 24px (`$size-height-icon-md`) | 24px | **Spec incorrect; impl is correct (24px)** |
| 7 | Remove (dismiss) icon size `md` | Not specified | 16px (`$size-height-icon-xs`) | Not directly sampled | **Spec gap; impl is correct (16px)** |
| 8 | Remove (dismiss) icon size `xl` | Not specified | 32px (`$size-height-icon-lg`) | 32px container, 24px icon inside | **Bug: impl should be 24px (`$size-height-icon-md`)** |
| 9 | Border radius token | `$radius-full` | `$radius-2xl` (48px) | `var(--$radius-2xl, 48px)` | **Spec uses wrong token; impl matches Figma** |
| 10 | Focus ring | 4px, `$color-border-focus-default` | 2px offset + 6px shadow (= 4px visible) | Not specified in Figma tokens | **Impl functionally correct; spec imprecise** |
| 11 | `xl` padding (unselected) | `$spacing-lg` / `$spacing-xl` + `$spacing-2xs` | `$spacing-2xs` (v) + `$spacing-lg` (h) | `px-lg, py-2xs` | **Spec ambiguous; impl matches Figma** |
| 12 | `xl` right padding (selected) | Not specified | `$spacing-md` (16px) | `pr-[var(--$spacing-md,16px)]` | **Impl matches Figma; spec gap** |
| 13 | `filled` selected text color | Not specified | `$color-text-default-secondary` | `$color-text-default-secondary` | **Impl matches Figma; spec gap** |
| 14 | `outline` selected text color | Not specified | `$color-text-accent-on-surface` | Not sampled directly | **Impl consistent with token naming** |
| 15 | Figma prop name: selection | N/A | `isSelected` (React Aria) | `selected: boolean` | Design ↔ code prop name mismatch (expected) |
| 16 | Figma prop: `state` | No `state` prop | CSS pseudo-classes | `state: default \| hover \| focus` | **Correct — design vs. code distinction** |

---

## Detailed Changes

### 1. `isRemovable` Prop — Removed

**v2 Spec:**
```
| `isRemovable` | `boolean` | `false` | When `true`, renders a trailing remove ("dismiss") affordance (recommended for `kind="filled"`). |
```

**Implementation (`Chip.tsx`):**
The `isRemovable` prop no longer exists. The dismiss button is rendered automatically whenever `kind="filled" && isSelected && !isDisabled`, with no opt-in required.

**Figma:**
The filled + selected chip always shows a trailing Icon Button (32px container, 24px `x` icon) — confirming the automatic/implicit behavior.

**Action needed:** Update the spec to remove `isRemovable` and document the implicit dismiss behavior for `kind="filled"`.

---

### 2. `leading` Default — Changed from `'none'` to `'icon'`

**v2 Spec:** `leading` defaults to `'none'`

**Implementation:** `leading` defaults to `'icon'` — a shopping-bag icon renders as the default leading visual if no `leadingIcon` is provided.

**Figma:** All sampled nodes with `leading=icon` use the shopping-bag icon. The design does not present a "none" default variant as primary.

**Action needed:** Update the spec default to `'icon'`. Also document the built-in fallback behaviors:
- `leading="icon"` with no `leadingIcon` → renders a shopping-bag (`/icons/base/shopping-bag.svg`)
- `leading="image"` with no `leadingImageSrc` → renders `/imgs/img-placeholder-square.jpg`

---

### 3. Leading Icon Size (`md`) — Spec says 24px; correct value is 16px

**v2 Spec:** `$size-height-icon-md` = 24×24px ❌

**Implementation (`Chip.module.scss`):**
```scss
&.size-md .leading-icon-wrapper {
  width: nt.$size-height-icon-xs; // 16px
  height: nt.$size-height-icon-xs;
}
```

**Figma (node `5613:24703`, md + icon):** The Figma MCP output shows `size-[24px]`, but this reflects the raw design value before the icon scale rule was confirmed. Per the established icon scale, `md` chips use `$size-height-icon-xs` (16px) for all icons.

**Verdict:** The **spec is incorrect**. The correct value for leading icons in `md` chips is `$size-height-icon-xs` (16px). The implementation is right. Update the spec.

---

### 4. Leading Icon Size (`xl`) — Spec says 32px, implementation and Figma use 24px

**v2 Spec:** `$size-height-icon-lg` = 32×32px

**Implementation:**
```scss
&.size-xl .leading-icon-wrapper {
  width: nt.$size-height-icon-md; // 24px
  height: nt.$size-height-icon-md;
}
```

**Figma (node `5561:199251`, xl + icon):**
```
size-[24px]  // leading icon 24px
```

**Verdict:** The spec is incorrect. Both the implementation and Figma agree on 24px. **Update the spec** to `$size-height-icon-md` (24px) for `xl` leading icons.

---

### 5. Trailing Check Icon Size (`md`) — Spec says 24px; correct value is 16px

**v2 Spec:** `Trailing Indicator Size: $size-height-icon-md` (24×24px) for `md` ❌

**Implementation:**
```scss
&.size-md .trailing-check {
  width: nt.$size-height-icon-xs; // 16px
  height: nt.$size-height-icon-xs;
}
```

**Verdict:** The **spec is incorrect**. Per the icon scale rule, all icons in `md` chips — including the trailing check — use `$size-height-icon-xs` (16px). The implementation is correct. Update the spec.

---

### 6. Trailing Check Size (`xl`) — Spec says 32px; correct value is 24px

**v2 Spec:** `Trailing Indicator Size: $size-height-icon-lg` (32×32px) for `xl` ❌

**Implementation:**
```scss
&.size-xl .trailing-check {
  width: nt.$size-height-icon-md; // 24px
  height: nt.$size-height-icon-md;
}
```

**Verdict:** The **spec is incorrect**. Per the icon scale rule, the trailing check in `xl` chips uses `$size-height-icon-md` (24px). The implementation is correct. Update the spec.

---

### 7. Remove (Dismiss) Icon Size (`xl`) — Bug: Implementation uses 32px, should be 24px

**v2 Spec:** Not specified.

**Implementation:**
```scss
&.size-xl .remove-button {
  width: nt.$size-height-icon-lg; // 32px  ← incorrect
  height: nt.$size-height-icon-lg;
}
```

**Figma (node `6419:131583`, xl + filled + selected):** The Figma design shows a 32px Icon Button container wrapping a 24px `x` icon, consistent with the icon scale rule (24px icon for `xl`).

**Verdict:** The `.remove-button` in `xl` uses `$size-height-icon-lg` (32px), but per the icon scale rule all icons in `xl` chips should be `$size-height-icon-md` (24px). The dismiss icon size should be corrected to 24px. The Figma 32px value represents the touch-target container of an Icon Button component, not the icon itself.

**Action needed:** Change `.size-xl .remove-button` to `nt.$size-height-icon-md` (24px).

---

### 9. Border Radius Token — Spec uses `$radius-full`, impl and Figma use `$radius-2xl`

**v2 Spec:** `$radius-full` (pill)

**Implementation:**
```scss
border-radius: nt.$radius-2xl; // 48px pill
```

**Figma:** `var(--$radius-2xl, 48px)` — confirmed on all sampled nodes.

**Verdict:** The spec uses the wrong token name. `$radius-full` resolves to `1000px` (infinite radius), while `$radius-2xl` resolves to `48px`. Both produce a pill shape for the chip's height range, but the **correct token per Figma is `$radius-2xl`**. Update the spec.

---

### 8. Focus Ring — Spec is imprecise about the box-shadow approach

**v2 Spec:** `4px border using $color-border-focus-default`

**Implementation:**
```scss
&:focus-visible {
  outline: none;
  box-shadow:
    0px 0px 0px 2px $color-background-default-solid,
    0px 0px 0px 6px $color-border-focus-default;
}
```

This renders as a 2px transparent gap + 4px colored ring = 4px visible focus ring with a 2px offset from the chip edge — consistent with the Figma style.

**Verdict:** Functionally correct, but the spec should document the double box-shadow pattern to match the implementation.

---

### 10. Padding `xl` — Spec is ambiguous

**v2 Spec:** `$spacing-lg` / `$spacing-xl` + `$spacing-2xs` (ambiguous slash notation)

**Implementation:**
```scss
&.size-xl {
  padding: nt.$spacing-2xs nt.$spacing-lg; // 4px 24px
}
```

**Figma:** `px-[var(--$spacing-lg,24px)] py-[var(--$spacing-2xs,4px)]` — confirmed as `4px` vertical, `24px` horizontal.

**Verdict:** The spec's `$spacing-xl` mention is incorrect or leftover. The correct token for horizontal padding in `xl` is `$spacing-lg` (24px). Update the spec and remove the ambiguous slash notation.

---

### 11. Selected Right Padding (`xl`) — Missing from spec

**v2 Spec:** Not documented.

**Implementation:**
```scss
&.size-xl.has-trailing {
  padding-right: nt.$spacing-md; // 16px
}
```

**Figma (xl + selected):** `pr-[var(--$spacing-md,16px)]` — confirmed 16px right padding when trailing indicator is present.

**Action needed:** Add to spec: when a chip has a trailing indicator (selected state), the right padding reduces to `$spacing-md` (16px) for `xl` and stays `$spacing-sm` (12px) for `md`.

---

### 12. `filled` Selected Text Color — Missing from spec

**v2 Spec:** Surface variants and outline selected colors are documented, but `filled` selected text color is omitted.

**Implementation:** `color: t.$color-text-default-secondary` (unchanged from default in filled).

**Figma (xl + filled + selected):** `text-[color:var(--$color-text-default-secondary,#45474a)]` — confirmed secondary text color stays on filled chips even when selected.

**Action needed:** Add to spec: `filled` selected state keeps `$color-text-default-secondary` for label text (no accent color shift like `outline`).

---

### 13. Props Not in Figma Design (but in v2 Spec)

The following props exist in the v2 spec and the implementation but are not exposed as Figma design properties (as expected — they are code-only behaviors):

| Prop | Status |
|------|--------|
| `onPress` | Code only — correct |
| `onRemove` | Code only — correct |
| `className` | Code only — correct |
| All `aria-*` props | Code only — correct |
| `role` | Code only — correct |
| `tabIndex` | Code only — correct |

---

### 14. `state` Property — Design vs. Code Distinction

**Figma** exposes `state: "default" | "hover" | "focus"` as a Figma component property for design documentation purposes.

**Implementation:** States are not a prop — they are managed entirely via CSS pseudo-classes (`:hover`, `:focus-visible`) and React Aria data attributes (`[data-selected]`, `[data-disabled]`).

**Verdict:** This is the correct separation of concerns. No action needed, but the spec should explicitly note that `state` is a Figma-only property and is not part of the component API.

---

## Summary of Actions

| Priority | Action |
|----------|--------|
| 🔴 Bug | Fix dismiss icon size in `xl` — should be 24px (`$size-height-icon-md`), currently 32px (`$size-height-icon-lg`) in `.remove-button` |
| 🟡 Spec update | Remove `isRemovable` prop; document implicit dismiss behavior for `filled` |
| 🟡 Spec update | Change `leading` default from `'none'` to `'icon'`; document fallback defaults |
| 🟡 Spec update | Fix leading icon size for `md` — correct value is 16px (`$size-height-icon-xs`), not 24px |
| 🟡 Spec update | Fix leading icon size for `xl` — correct value is 24px (`$size-height-icon-md`), not 32px |
| 🟡 Spec update | Fix trailing check size for `md` — correct value is 16px (`$size-height-icon-xs`), not 24px |
| 🟡 Spec update | Fix trailing check size for `xl` — correct value is 24px (`$size-height-icon-md`), not 32px |
| 🟡 Spec update | Add dismiss icon sizes: `md` → 16px, `xl` → 24px |
| 🟡 Spec update | Change border radius token from `$radius-full` to `$radius-2xl` |
| 🟡 Spec update | Clarify focus ring as double box-shadow pattern |
| 🟡 Spec update | Fix `xl` padding — remove `$spacing-xl`; confirm `$spacing-lg` (24px) horizontal |
| 🟢 Spec addition | Document selected right-padding adjustment (`$spacing-md` for `xl`, `$spacing-sm` for `md`) |
| 🟢 Spec addition | Document `filled` selected text color stays `$color-text-default-secondary` |
| 🟢 Spec addition | Note that `state` is a Figma-only property, not part of the component API |

---

*Generated by Figma MCP comparison on 2026-02-26. Figma file: `5MDMfaYaGqPGRJcgiVMqiu`, frame node: `2:28728`.*
