# Text Link Component

## Overview
The Text Link component is an underlined, clickable text element used for navigation and inline actions. It supports various sizes, states, and surface variants, with optional leading and trailing icons.

## Component Properties

### Props

| Property | Type | Default | Options | Description |
|----------|------|---------|---------|-------------|
| `label` | string | `"Button CTA"` | - | The text content displayed in the link |
| `iconLeadingSwap` | React.ReactNode \| null | `null` | - | Custom icon to display before the label |
| `iconTrailingSwap` | React.ReactNode \| null | `null` | - | Custom icon to display after the label |
| `iconLeading` | boolean | `false` | `true`, `false` | Whether to show a leading icon |
| `iconTrailing` | boolean | `false` | `true`, `false` | Whether to show a trailing icon |
| `size` | string | `"md"` | `"md"`, `"lg"`, `"xl"` | The size variant of the text link |
| `state` | string | `"default"` | `"default"`, `"hover"`, `"focus"`, `"pressed"`, `"disabled"` | The interactive state of the link |
| `surface` | string | `"default"` | `"default"`, `"inverted"` | The surface variant (light or dark background) |

### React Aria Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aria-label` | string | - | Accessible label for the link. Use when link text doesn't fully describe destination. |
| `aria-labelledby` | string | - | ID of element that labels this link. |
| `aria-describedby` | string | - | ID of element that provides additional description for the link. |
| `aria-current` | string | - | Indicates current page/location. Values: `"page"`, `"step"`, `"location"`, `"date"`, `"time"`, `"true"`. |
| `aria-disabled` | boolean | `false` | Indicates link is disabled. Should match `disabled` state. |
| `role` | string | `"link"` | ARIA role. Usually implicit from anchor element. |
| `href` | string | - | Required for semantic links. Destination URL. |
| `target` | string | - | Where to open the link. Values: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`. |
| `rel` | string | - | Relationship between current and linked document. Use `"noopener noreferrer"` with `target="_blank"`. |

## Size Variants

### Medium (`md`)
- **Typography**: `$typography-text-md-underline` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Icon Size**: `$size-height-icon-sm` (20x20px)

### Large (`lg`)
- **Typography**: `$typography-text-lg-underline` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Icon Size**: `$size-height-icon-sm` (20x20px)

### Extra Large (`xl`)
- **Typography**: `$typography-text-xl-underline` (Lexend Regular, 20px, weight 400, line height 1.5)
- **Icon Size**: `$size-height-icon-sm` (20x20px)

## State Variants

### Default
The standard resting state of the text link.

**Default Surface Colors:**
- Text & Icons: `$color-links-default` (#2B7A87)

**Inverted Surface Colors:**
- Text & Icons: `$color-links-default-inverted` (#E0EDF0)

### Hover
Displayed when the user hovers over the text link with a cursor.

**Default Surface Colors:**
- Text & Icons: `$color-links-hovered` (#1A5961)

**Inverted Surface Colors:**
- Text & Icons: `$color-links-hovered-inverted` (#D9E8ED)

### Focus
Displayed when the text link receives keyboard focus.
- Includes a visible focus ring around the entire link area
- Focus ring: 4px padding with 44px border radius
- Maintains the same colors as default state

**Default Surface Colors:**
- Text & Icons: `$color-links-default` (#2B7A87)

**Inverted Surface Colors:**
- Text & Icons: `$color-links-default-inverted` (#E0EDF0)

### Pressed
The active state when the user clicks or taps the text link.

**Default Surface Colors:**
- Text & Icons: `$color-links-pressed` (#0F3D42)

**Inverted Surface Colors:**
- Text & Icons: `$color-links-pressed-inverted` (#BFE3E8)

### Disabled
The non-interactive state when the link is disabled.

**Default Surface Colors:**
- Text & Icons: `$color-text-default-disabled` (#A3A6A8)

**Inverted Surface Colors:**
- Text & Icons: `$color-text-default-disabled-on-surface` (#6B6E70)

## Surface Variants

### Default Surface
Designed for use on light backgrounds.
- Uses darker colors for contrast
- Standard color palette with teal/cyan tones

### Inverted Surface
Designed for use on dark backgrounds.
- Uses lighter colors for contrast
- Inverted color palette maintaining the same visual hierarchy

## Icons

### Leading Icon
- Positioned before the text label
- Default icon: Circle (base/circle)
- Size: 20×20px
- Can be swapped with custom icons using `iconLeadingSwap` prop

### Trailing Icon
- Positioned after the text label
- Default icon: Chevron Right (base/chevron-right)
- Size: 20×20px
- Can be swapped with custom icons using `iconTrailingSwap` prop

## Typography

All text link variants use the **Lexend** font family with the following specifications:
- Font Style: Regular
- Font Weight: 400
- Text Decoration: Underline
- Text Decoration Position: From font
- Text Decoration Skip Ink: None

## Visual Characteristics

- **Underline**: All states include an underline decoration
- **Alignment**: Content aligned with icon and text positioned inline
- **Spacing**: Icons and text have appropriate spacing for readability
- **Cursor**: Hover and pressed states include a pointer cursor (except disabled)

## Accessibility

### Focus State
- Triggered by keyboard navigation (Tab key) or assistive technology focus
- Clear focus ring with sufficient contrast around link area
- 4px padding around the link with 44px border radius
- Visible focus indicator for keyboard navigation and screen readers
- Focus maintains same color as default state for consistency
- Uses `aria-describedby` to announce additional context when focused
- Uses `aria-current` to indicate current page/location in navigation

### Keyboard Navigation
- **Tab**: Navigate to/from link
- **Shift + Tab**: Navigate backwards
- **Enter**: Activate link and navigate to destination
- Disabled links removed from tab order
- Screen readers announce link text, destination (href), and current state
- External links announced with target attribute context
- Navigation state indicated with `aria-current` attribute

### Disabled State
- Reduced contrast to indicate non-interactive state
- Default Surface: `$color-text-default-disabled` (#A3A6A8)
- Inverted Surface: `$color-text-default-disabled-on-surface` (#6B6E70)
- Lower opacity colors for both text and icons
- No pointer cursor (cursor: not-allowed)
- No underline decoration in disabled state
- Cannot receive keyboard focus (removed from tab order)
- Screen readers announce as "disabled" or "unavailable"
- Uses `aria-disabled="true"` to communicate state

### Color Contrast
- **WCAG AA Compliance**: All text and icon colors meet 4.5:1 minimum contrast ratio
- **Default Link (Default Surface)**: #2B7A87 on #FFFFFF = 4.7:1
- **Default Link (Inverted Surface)**: #E0EDF0 on dark background = 4.5:1+
- **Hover (Default Surface)**: #1A5961 on #FFFFFF = 5.8:1
- **Hover (Inverted Surface)**: #D9E8ED on dark background = 4.8:1+
- **Pressed (Default Surface)**: #0F3D42 on #FFFFFF = 10.2:1
- **Pressed (Inverted Surface)**: #BFE3E8 on dark background = 4.2:1+
- **Focus Ring**: High contrast outline exceeds 3:1 against all backgrounds
- **Disabled (Default)**: #A3A6A8 = 2.9:1 (intentionally lower to indicate non-interactive)
- **Disabled (Inverted)**: #6B6E70 = 3.0:1 (intentionally lower)
- **Underline**: Always present in interactive states for link identification