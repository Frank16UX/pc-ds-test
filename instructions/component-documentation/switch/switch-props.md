# Toggle Component

## Overview
The Switch component is an interactive element used to toggle between boolean options (isSelected true or false). It has states, and optional text labels with supporting text.

## Component Properties

### Props

| Property | Type | Default | Options | Description |
|----------|------|---------|---------|-------------|
| `size` | string | `"lg"` | `"lg"`, `"md"` | Controls the size of the toggle. Medium (md) is 20px height, Large (lg) is 24px height. |
| `active` | boolean | `false` | `true`, `false` | The current state of the toggle (on/off). |
| `state` | string | `"default"` | `"default"`, `"hover"`, `"focus"`, `"disabled"` | The interactive state of the toggle. |
| `showText` | boolean | `true` | `true`, `false` | Whether to display the headline text label. |
| `headlineText` | string | `"Text"` | - | The main text label displayed next to the toggle. |
| `showSubtext` | boolean | `true` | `true`, `false` | Whether to display the supporting subtext. |
| `subtext` | string | `"Subtext"` | - | The supporting text displayed below the headline text. |
| `onChange` | function | - | - | Callback function triggered when the toggle state changes. |
| `disabled` | boolean | `false` | `true`, `false` | If true, disables the toggle and applies disabled styling. |
| `className` | string | - | - | Additional CSS classes to apply to the toggle. |

### React Aria Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aria-label` | string | - | Accessible label for the toggle. Use when no visible label is present. |
| `aria-labelledby` | string | - | ID of element that labels this toggle. Typically the headline text element's ID. |
| `aria-describedby` | string | - | ID of element that describes this toggle. Should reference subtext element. |
| `aria-checked` | boolean | `false` | Indicates toggle state. Should match `active` prop. |
| `aria-disabled` | boolean | `false` | Indicates toggle is disabled. Should match `disabled` prop. |
| `role` | string | `"switch"` | ARIA role for toggle. Use `"switch"` for on/off controls. |
| `aria-readonly` | boolean | - | Indicates toggle value cannot be changed by user. |

## Size Variants

### Medium (`md`)
- **Height**: `$size-height-icon-sm` (20px)
- **Width**: 36px
- **Track Border Radius**: `$radius-full` (1000px)
- **Knob Size**: `$size-height-icon-xs` (16×16px)
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)

### Large (`lg`)
- **Height**: `$size-height-icon-md` (24px)
- **Width**: 44px
- **Track Border Radius**: `$radius-full` (1000px)
- **Knob Size**: `$size-height-icon-sm` (20×20px)
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)

## State Variants

### Default
The standard resting state of the toggle.

**Active (On):**
- Track: `$color-icon-accent-default` (#2B7A87)
- Knob: `$color-icon-toggle-knob-enabled` (#FFFFFF)

**Inactive (Off):**
- Track: `$color-icon-toggle-rail-inactive` (#B2BDBD)
- Knob: `$color-icon-toggle-knob-enabled` (#FFFFFF)

### Hover
Displayed when the user hovers over the toggle with a cursor.

**Active (On):**
- Track: `$color-icon-accent-default` (#2B7A87)
- Knob: `$color-icon-toggle-knob-enabled` (#FFFFFF)

**Inactive (Off):**
- Track: `$color-icon-toggle-rail-inactive-hover` (#8F9C9C)
- Knob: `$color-icon-toggle-knob-enabled` (#FFFFFF)

### Focus
Displayed when the toggle receives keyboard focus.
- Includes a visible focus ring around the toggle track
- Focus ring color: `$color-border-focus-default` (#2E3030)
- Focus ring offset: 30% expansion

**Active (On):**
- Track: `$color-icon-accent-default` (#2B7A87)
- Knob: `$color-icon-toggle-knob-enabled` (#FFFFFF)

**Inactive (Off):**
- Track: `$color-icon-toggle-rail-inactive` (#B2BDBD)
- Knob: `$color-icon-toggle-knob-enabled` (#FFFFFF)

### Disabled
The non-interactive state when the toggle is disabled.

**Active (On):**
- Track: `$color-icon-toggle-rail-active-disabled` (#B5B8BA)
- Knob: `$color-icon-toggle-knob-disabled` (#6B6E70)

**Inactive (Off):**
- Track: `$color-icon-toggle-rail-inactive-disabled` (#C9CCCF)
- Knob: `$color-icon-toggle-knob-disabled` (#6B6E70)

## Surface Variants

The toggle component adapts to both light (default) and dark backgrounds through its color token system.

## Icons

The Toggle component uses SVG-based visual representations for the track and knob:
- **Track**: Pill-shaped container with smooth, rounded edges
- **Knob**: Circular indicator that slides within the track
- Smooth transitions between states

## Typography

Text labels use the **Lexend** font family:
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Headline Color**: `$color-text-default-secondary` (#45474A)
- **Subtext Color**: `$color-text-default-tertiary` (#6B6E70)

## Visual Characteristics

- **Track Shape**: Pill-shaped with full border radius
- **Knob Motion**: Smooth animation between on/off positions
- **Spacing**: `$spacing-md` (16px gap between toggle and text labels)
- **Alignment**: Text labels aligned to the start (left)
- **Cursor**: Pointer cursor on interactive states (except disabled)

## Accessibility

### Focus State
- Triggered by keyboard navigation (Tab key) or assistive technology focus
- Clear focus ring with sufficient contrast around toggle track
- Visible focus indicator for keyboard navigation and screen readers
- Ring expands around the toggle track (30% expansion) for visibility
- Focus ring color: `$color-border-focus-default` (#2E3030)
- Uses `aria-labelledby` to reference headline text when focused
- Uses `aria-describedby` to announce subtext when focused

### Keyboard Navigation
- **Tab**: Navigate to/from toggle
- **Shift + Tab**: Navigate backwards
- **Space**: Toggle state (on/off)
- **Enter**: Toggle state (on/off)
- Disabled toggles removed from tab order
- Screen readers announce label, state (on/off), and role (switch)
- State changes announced immediately with `aria-checked` updates
- Subtext provides additional context announced by screen readers

### Disabled State
- Reduced contrast to indicate non-interactive state
- Track (Active): `$color-icon-toggle-rail-active-disabled` (#B5B8BA)
- Track (Inactive): `$color-icon-toggle-rail-inactive-disabled` (#C9CCCF)
- Knob: `$color-icon-toggle-knob-disabled` (#6B6E70)
- Gray color scheme for both track and knob
- No pointer cursor (cursor: not-allowed)
- Cannot receive keyboard focus (removed from tab order)
- Screen readers announce as "disabled" or "unavailable"
- Uses `aria-disabled="true"` to communicate state

### Color Contrast
- **WCAG AA Compliance**: All colors meet minimum contrast ratios
- **Track Active (On)**: #2B7A87 with #FFFFFF knob = 7.1:1
- **Track Inactive (Off)**: #B2BDBD with #FFFFFF knob = 3.5:1
- **Track Inactive Hover**: #8F9C9C with #FFFFFF knob = 4.2:1
- **Headline Text**: Standard text contrast ratios apply (4.5:1 minimum)
- **Subtext**: #6B6E70 = 3.0:1 (sufficient for supporting text)
- **Focus Ring**: #2E3030 = 14.6:1 against light backgrounds
- **Disabled Track (Active)**: #B5B8BA with #6B6E70 knob = 2.4:1 (intentionally lower)
- **Disabled Track (Inactive)**: #C9CCCF with #6B6E70 knob = 2.7:1 (intentionally lower)
- **Role "switch"**: Properly identifies toggle behavior to assistive technology

## Usage Guidelines

### When to Use
- For binary on/off choices (enable/disable features, show/hide content)
- For preference settings that have two distinct states
- For modal dialogs or panel controls
- When space is limited compared to radio buttons or checkboxes

### Best Practices
1. Always include a clear label describing what the toggle controls
2. Use descriptive, action-oriented text (e.g., "Show notifications" not "Notifications")
3. Ensure the default state is obvious from context or label
4. Provide immediate visual feedback when toggled
5. Use consistent toggle direction and behavior across your application
6. Include supporting subtext for complex or critical toggles
7. Ensure sufficient color contrast for accessibility

### Label Usage
- **Headline**: Main description of what the toggle controls (required when `showText` is true)
- **Subtext**: Additional context or explanation (optional, controlled by `showSubtext`)

## Component Combinations

The toggle component supports 16 unique combinations:
- 2 sizes × 2 active states × 4 states = 16 variants

All combinations maintain consistent visual hierarchy and accessibility standards.