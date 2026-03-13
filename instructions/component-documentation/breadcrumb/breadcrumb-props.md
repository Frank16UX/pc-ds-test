# Breadcrumb Component

## Overview
A navigation bar displaying the user's location hierarchy with clickable ancestor links, a "Back" button, and chevron separators. Supports desktop and mobile layouts.

## Component Properties

### Props

| Property | Type | Default | Options | Description |
|----------|------|---------|---------|-------------|
| `items` | `BreadcrumbItem[]` | `[]` | - | Array of breadcrumb items with `label`, `href`, and optional `isCurrent`. |
| `showBack` | `boolean` | `true` | `true`, `false` | If true, displays a "Back" button with arrow-left icon before the breadcrumb trail. |
| `onBack` | `() => void` | - | - | Callback when Back button is clicked. Navigates to previous page. |
| `className` | string | - | - | Additional CSS classes to apply. |

### BreadcrumbItem Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | Yes | The text label for the breadcrumb link. |
| `href` | `string` | No | URL for the breadcrumb link. Omit for current page (non-clickable). |
| `isCurrent` | `boolean` | No | If true, marks this item as the current page (last item). |

### React Aria Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aria-label` | string | `"Breadcrumb"` | Accessible label for the breadcrumb navigation. |
| `aria-current` | string | `"page"` | Automatically applied to the current/last breadcrumb item. |

## Layout Variants

### Desktop
- **Container**: Full width, max-content `1600px`
- **Horizontal padding**: `$spacing-4xl` (64px)
- **Vertical padding**: `$spacing-md` (16px)
- **Background**: `$color-surface-interactive-default` (#ffffff)
- **Gap between Back and Links**: `$spacing-md` (16px)

### Mobile
- **Container height**: `$size-height-md` (40px)
- **Back section padding**: `$spacing-md` (16px) left, `$spacing-xs` (8px) vertical
- **Links section**: Horizontally scrollable, padding `$spacing-xs` (8px)
- **Overflow**: Horizontal scroll with hidden scrollbar

## Typography

### Back Button
- **Typography**: `$typography-utility-cta-sm` (Lexend Medium, 14px, weight 500, line height 1)
- **Color**: `$color-links-default` (#2b7a87)
- **Icon**: base/arrow-left.svg, 16x16px

### Breadcrumb Links (non-current)
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Color**: `$color-text-default-tertiary` (#6b6e70)
- **Padding**: `$spacing-2xs` (4px) horizontal

### Current Page (last item)
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Color**: `$color-text-default-primary` (#2e3030)
- **Non-clickable**: No link behavior

### Separator
- **Icon**: base/chevron-right.svg, 16x16px
- **Color**: `$color-icon-default-tertiary` (#6b6e70)
- **Gap between items**: 2px

### Divider (between Back and Links)
- **Style**: 1px vertical line
- **Color**: `$color-border-divider-strong` (#b2bdbd)
- **Height**: 16px

## Accessibility

### Focus State
- Back button and breadcrumb links receive visible focus ring on keyboard navigation.
- Focus ring: `outline: 4px solid $color-border-focus-accent` with offset.
- Target area: 44px minimum touch target on Back button.

### Keyboard Navigation
- **Tab**: Navigate between Back button and breadcrumb links.
- **Enter**: Activate the focused link.

### Screen Reader
- `<nav aria-label="Breadcrumb">` wrapping element.
- `<ol>` ordered list structure for breadcrumb items.
- `aria-current="page"` on the current/last item.

## Usage Guidelines

### When to Use
- Page navigation showing location within site hierarchy.
- E-commerce product pages, category pages, account sections.

### When Not to Use
- Single-page applications without hierarchical navigation.
- Bottom navigation or primary navigation bars.
