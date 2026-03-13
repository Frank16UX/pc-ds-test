# Badge Component

## Overview
A compact label that highlights key information or product features. Badges draw attention to metadata, counts, categories, or states without disrupting content flow or requiring user interaction.

## Component Properties

### Props

| Property | Type | Default | Options | Description |
|----------|------|---------|---------|-------------|
| `size` | string | `"md"` | `"sm"`, `"md"` | Controls height, padding, typography, and icon sizing. |
| `surface` | string | `"default"` | `"default"`, `"inverted"` | Determines color scheme for light or dark backgrounds. |
| `iconOnly` | boolean | `false` | `true`, `false` | If true, displays only the icon without label text. |
| `label` | string | `"Badge Label"` | - | The text content displayed in the badge. |
| `leadingIcon` | boolean | `true` | `true`, `false` | If true, displays an icon before the label text. |
| `swapLeadingIcon` | React.ReactNode | `null` | - | Custom icon to replace the default guarantee icon. |
| `className` | string | - | - | Additional CSS classes to apply. |

### React Aria Properties

Badge is a non-interactive, presentational component. No React Aria primitives are required.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `role` | string | `"status"` | Optional ARIA role if badge conveys live status information. |
| `aria-label` | string | - | Accessible label when icon-only mode is used. Required when `iconOnly={true}`. |

## Size Variants

### Medium (`md`)
- **Height**: Auto (content-driven), padding `$spacing-xs` (8px) vertical / `$spacing-md` (16px) horizontal
- **Icon-only padding**: `$spacing-xs` (8px) all around
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Icon Size**: `$size-height-icon-md` (24x24px)
- **Gap**: `$spacing-xs` (8px) between icon and label
- **Border Radius**: `$radius-sm` (6px)

### Small (`sm`)
- **Height**: `$size-height-sm` (32px)
- **Typography**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5)
- **Icon Size**: `$size-height-icon-xs` (16x16px)
- **Horizontal Padding**: `$spacing-xs` (8px)
- **Gap**: `$spacing-2xs` (4px) between icon and label
- **Border Radius**: `$radius-sm` (6px)

## Surface Variants

### Default Surface
- **Background**: `$color-surface-primary` (#ffffff)
- **Border**: 1px solid `$color-border-divider-strong` (#b2bdbd)
- **Text**: `$color-text-default-secondary` (#45474a)
- **Icon**: `$color-icon-accent-default` (#2b7a87)

### Inverted Surface
- **Background**: `$color-graphics-complementary-14` (#031738) at 70% opacity
- **Backdrop**: blur(22.5px)
- **Border**: 1px solid `$color-border-button-default-inverted` (#e0edf0)
- **Text**: `$color-text-default-primary-inverted` (#ffffff)
- **Icon**: White / inverted icon color

## Icons

### Leading Icon
- **Default icon**: custom/guarantee.svg from `~assets/icons/custom/`
- **Size (md)**: `$size-height-icon-md` (24x24px)
- **Size (sm)**: `$size-height-icon-xs` (16x16px)
- **Swap**: Can be replaced via `swapLeadingIcon` prop

## Typography

- **Medium**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Small**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5)
- **Text overflow**: Single line, truncated with ellipsis

## Visual Characteristics

- **Border Radius**: `$radius-sm` (6px)
- **Border**: 1px solid
- **Overflow**: Hidden (clips content at rounded corners)
- **Display**: Inline-flex, centered alignment
- **Non-interactive**: No hover, focus, or pressed states

## Accessibility

### Focus State
Badge is non-interactive and does not receive focus.

### Keyboard Navigation
Not applicable — Badge is a presentational element.

### Disabled State
Not applicable — Badge has no disabled state.

### Color Contrast
- **Default**: #45474a text on #ffffff background = 9.9:1 (WCAG AAA)
- **Inverted**: #ffffff text on dark background = High contrast (WCAG AAA)

## Usage Guidelines

### When to Use
- Displaying product categories, tags, or labels
- Highlighting metadata like counts or statuses
- Showing feature badges on product cards
- Conveying non-interactive status information

### When Not to Use
- Interactive selections (use Chip component)
- Dismissible notifications (use Toast)
- Status indicators that change frequently (use live region)
