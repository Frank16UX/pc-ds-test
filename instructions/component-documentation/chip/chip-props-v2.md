# Chips

## Overview
Selectable, pill-shaped control for filtering or categorizing content, with optional leading visuals and selection/removal affordances.

## Component Properties

### Props
| Property | Type | Default | Options | Description |
|---|---|---:|---|---|
| `kind` | `'outline' \| 'filled'` | `'outline'` | `outline`, `filled` | Visual style of the chip. `outline` uses a border and shows a check indicator when selected; `filled` uses a filled surface and can show a removable affordance when selected. |
| `size` | `'md' \| 'xl'` | `'md'` | `md`, `xl` | Controls height, padding, typography, and icon sizing. |
| `leading` | `'none' \| 'icon' \| 'image'` | `'none'` | `none`, `icon`, `image` | Sets the leading visual treatment. |
| `label` | `string` | — | — | Visible label text. Keep concise (ideally 1–2 words). |
| `isSelected` | `boolean` | `false` | `true`, `false` | Selection state. Use for filter chips and multi/single-select patterns. |
| `isDisabled` | `boolean` | `false` | `true`, `false` | Disables interaction and communicates disabled semantics via React Aria. |
| `leadingIcon` | `ReactNode` | — | — | Custom icon when `leading="icon"`. |
| `leadingImageSrc` | `string` | — | — | Image URL when `leading="image"`. |
| `leadingImageAlt` | `string` | `''` | — | Alt text for the leading image. Use empty string for decorative images. |
| `isRemovable` | `boolean` | `false` | `true`, `false` | When `true`, renders a trailing remove (“dismiss”) affordance (recommended for `kind="filled"`). |
| `onPress` | `(event) => void` | — | — | Called when the chip is activated (pressed/clicked). |
| `onRemove` | `(event) => void` | — | — | Called when the remove affordance is activated. Only used when `isRemovable=true`. |
| `className` | `string` | — | — | Optional styling hook for layout overrides. |

### React Aria Properties
| Property | Type | Default | Description |
|---|---|---:|---|
| `id` | `string` | — | Stable id for labeling/description relationships. |
| `aria-label` | `string` | — | Accessible name when the visible `label` is not sufficient. |
| `aria-labelledby` | `string` | — | References an element that labels the chip. Prefer when the label is external. |
| `aria-describedby` | `string` | — | References supporting descriptive content (e.g., “3 results”). |
| `aria-disabled` | `boolean` | `false` | Communicates disabled state. Should mirror `isDisabled`. |
| `aria-pressed` | `boolean` | `false` | Use when the chip behaves like a toggle button. Should mirror `isSelected`. |
| `role` | `'button' \| 'checkbox'` | `'button'` | Use `checkbox` for multi-select filter groups when you want checked semantics. |
| `aria-checked` | `boolean` | — | Use with `role="checkbox"` to represent selection state. Mirrors `isSelected`. |
| `tabIndex` | `number` | `0` | Keyboard focus order. Disabled chips should not be focusable. |

## Size Variants

### Medium (`md`)
- **Height**: `$size-height-md` (40px)
- **Padding**: `$spacing-sm` + `$spacing-2xs` (from applied variables in design)
- **Leading Icon Size**: `$size-height-icon-md` (24×24px)
- **Leading Image Size**: `$size-height-avatar-sm` (32×32px) *(matches design’s 32px image treatment)*
- **Trailing Indicator Size**: `$size-height-icon-md` (24×24px)
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, line height 1.5)

### Extra Large (`xl`)
- **Height**: `$size-height-xl` (72px)
- **Padding**: `$spacing-lg` / `$spacing-xl` + `$spacing-2xs` (from applied variables in design)
- **Leading Icon Size**: `$size-height-icon-lg` (32×32px)
- **Leading Image Size**: `$size-height-avatar-lg` (64×64px) *(matches design’s 64px image treatment)*
- **Trailing Indicator Size**: `$size-height-icon-lg` (32×32px)
- **Typography**: `$typography-text-xl-regular` (Lexend Regular, 20px, line height 1.5)

## Hierarchy Variants
Chips do not express hierarchy levels. Emphasis is communicated through `kind` and `isSelected` styling, not priority tiers.

## State Variants
> Canonical API does **not** expose a `state` prop. Visual states are derived from user interaction.

- **Default**: resting appearance
- **Hover**: pointer hover (desktop)
- **Focus**: keyboard focus ring (focus-visible)
- **Disabled**: when `isDisabled=true`

## Surface Variants
- **Primary surface**: `$color-surface-primary`
- **Secondary surface (filled)**: `$color-surface-secondary`
- **Interactive hovered**: `$color-surface-interactive-hovered`
- **Selected (outline)**: `$color-surface-interactive-selected`
- **Selected hover (outline)**: `$color-surface-interactive-selected-hover`

## Icons

### Leading
- `leading="icon"`: render `leadingIcon` (or a default icon if provided by the product)
- `leading="image"`: render image clipped to a circle; reduce opacity when `isDisabled=true`

### Trailing
- **Selected indicator (outline)**: check icon shown when `kind="outline"` and `isSelected=true`
- **Removal affordance (filled, recommended)**: dismiss icon button shown when `isRemovable=true` (commonly paired with `kind="filled"`)

## Typography
- **md**: `$typography-text-md-regular`
- **xl**: `$typography-text-xl-regular`

## Visual Characteristics
- **Radius**: `$radius-full` (pill)
- **Border** (`outline`): `$color-border-divider-strong` in default; `$color-border-button-default` when selected; `$color-border-button-hovered` on hover
- **Focus ring**: `4px` border using `$color-border-focus-default` (focus-visible)
- **Spacing**: uses `$spacing-*` variables (2xs / xs / sm / md / lg / xl) depending on size and leading type

## Accessibility

### Focus State
- Use React Aria focus management (focus-visible) to show the focus ring only for keyboard interaction.
- Focus indicator: `4px` ring using `$color-border-focus-default`, surrounding the entire chip.

### Keyboard Navigation
- **Tab / Shift+Tab**: move focus between chips
- **Enter / Space**: toggle selection / activate (depending on pattern)
- If used as a multi-select filter group, prefer `role="checkbox"` and `aria-checked` semantics (or a React Aria CheckboxGroup pattern).

### Disabled State
- When `isDisabled=true`:
  - Not focusable (removed from tab order)
  - Announced as disabled via `aria-disabled="true"`
  - Reduced contrast and reduced image opacity (design shows ~50% opacity on images)

### Color Contrast
- Ensure text, icon, and focus indicators meet WCAG 2.1 AA:
  - Text contrast ≥ 4.5:1 for normal text
  - Focus indicator contrast ≥ 3:1 against adjacent colors
  - Disabled contrast may be lower by design, but must remain legible

## Usage Guidelines
- Use chips for short, scannable filter labels; avoid long sentences.
- Keep consistent leading treatment within a group (all icon chips, or all image chips).
- Use `outline` for filter chips where selection is the primary affordance.
- Use `filled` + `isRemovable` for “applied filter” chips that users can remove.
