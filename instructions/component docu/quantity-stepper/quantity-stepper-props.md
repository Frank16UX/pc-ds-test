# Quantity Stepper Component

## Overview
The Quantity Stepper is an input control for adjusting numeric values through increment (+) and decrement (-) buttons, commonly used for quantity selection in shopping carts, forms, and product pages.

## Component Properties

### Props

| Property | Type | Default | Options | Description |
|----------|------|---------|---------|-------------|
| `size` | string | `"lg"` | `"lg"`, `"md"` | Controls the size of the quantity stepper. Medium (md) is 40px height, Large (lg) is 48px height. |
| `value` | number | `1` | - | The current numeric value displayed in the input field. |
| `min` | number | `0` | - | The minimum allowed value. Decrement button disabled when value equals min. |
| `max` | number | - | - | The maximum allowed value. Increment button disabled when value equals max. |
| `step` | number | `1` | - | The amount to increment or decrement by when buttons are clicked. |
| `onChange` | function | - | - | Callback function triggered when the value changes. Receives new value as parameter. |
| `onIncrement` | function | - | - | Callback function triggered when increment (+) button is clicked. |
| `onDecrement` | function | - | - | Callback function triggered when decrement (-) button is clicked. |
| `disabled` | boolean | `false` | `true`, `false` | If true, disables the entire stepper and applies disabled styling. |
| `readOnly` | boolean | `false` | `true`, `false` | If true, prevents direct text input but allows button interactions. |
| `className` | string | - | - | Additional CSS classes to apply to the stepper container. |

### React Aria Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aria-label` | string | - | Accessible label for the quantity stepper. Use when no visible label is present. |
| `aria-labelledby` | string | - | ID of element that labels this stepper. |
| `aria-describedby` | string | - | ID of element that describes this stepper or provides additional context. |
| `aria-valuemin` | number | - | Minimum value for accessibility. Should match `min` prop. |
| `aria-valuemax` | number | - | Maximum value for accessibility. Should match `max` prop. |
| `aria-valuenow` | number | - | Current value for accessibility. Should match `value` prop. |
| `aria-valuetext` | string | - | Human-readable text representation of the current value. |
| `aria-disabled` | boolean | `false` | Indicates stepper is disabled. Should match `disabled` prop. |
| `role` | string | `"spinbutton"` | ARIA role for numeric steppers. Use `"spinbutton"` for increment/decrement controls. |

## Size Variants

### Medium (`md`)
- **Height**: `$size-height-md` (40px)
- **Input Width**: `$spacing-3xl` (48px)
- **Button Size**: `$size-height-md` × `$size-height-md` (40×40px)
- **Icon Size**: `$size-height-icon-md` (24×24px)
- **Border Radius**: `$radius-full` (1000px)
- **Typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Border Width**: 1px (default), 2px (focus)

### Large (`lg`)
- **Height**: `$size-height-lg` (48px)
- **Input Width**: `$spacing-4xl` (56px)
- **Button Size**: `$size-height-lg` × `$size-height-lg` (48×48px)
- **Icon Size**: `$size-height-icon-md` (24×24px)
- **Border Radius**: `$radius-full` (1000px)
- **Typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Border Width**: 1px (default), 2px (focus)

## State Variants

### Default
The standard resting state of the quantity stepper.

**Colors:**
- Border: `$color-border-default` (#B2BDBD)
- Background: `$color-surface-primary` (#FFFFFF)
- Text: `$color-text-default-primary` (#2E3030)
- Icon: `$color-icon-default-primary` (#2E3030)

### Hover
Displayed when the user hovers over any button with a cursor.

**Colors:**
- Button Background: `$color-surface-interactive-hovered` (#F0F7F7)
- Border: `$color-border-default` (#B2BDBD)
- Icon: `$color-icon-default-primary` (#2E3030)

### Focus
Displayed when the input field receives keyboard focus.

**Colors:**
- Border: `$color-border-focus-default` (#2E3030)
- Border Width: 2px
- Background: `$color-surface-primary` (#FFFFFF)
- Text: `$color-text-default-primary` (#2E3030)
- Cursor: Visible blinking text cursor

### Pressed
The active state when a button is clicked or tapped.

**Colors:**
- Button Background: `$color-surface-interactive-selected` (#E0EDF0)
- Border: `$color-border-default` (#B2BDBD)
- Icon: `$color-icon-default-primary` (#2E3030)

### Disabled
The non-interactive state when the stepper or individual button is disabled.

**Entire Stepper Disabled:**
- Border: `$color-border-disabled` (#C9CCCF)
- Background: `$color-surface-disabled` (#F0F0F2)
- Text: `$color-text-default-disabled` (#A3A6A8)
- Icons: `$color-icon-default-disabled` (#A3A6A8)
- Cursor: not-allowed

**Individual Button Disabled (Min/Max Reached):**
- Icon: `$color-icon-default-tertiary` (#6B6E70)
- Background: Remains white
- Cannot be clicked

### Active Input
When the user is actively typing in the input field.

**Colors:**
- Border: `$color-border-focus-default` (#2E3030)
- Border Width: 2px
- Background: `$color-surface-primary` (#FFFFFF)
- Text Cursor: Visible and blinking

## Icons

### Decrement Button (Minus)
- Icon: **base/minus**
- Size: `$size-height-icon-md` (24×24px)
- Position: Left side of stepper
- Color (Enabled): `$color-icon-default-primary` (#2E3030)
- Color (Disabled): `$color-icon-default-tertiary` (#6B6E70)

### Increment Button (Plus)
- Icon: **base/plus**
- Size: `$size-height-icon-md` (24×24px)
- Position: Right side of stepper
- Color (Enabled): `$color-icon-default-primary` (#2E3030)
- Color (Disabled): `$color-icon-default-tertiary` (#6B6E70)

## Typography

The input value uses the **Lexend** font family:
- **Typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Text Alignment**: Center
- **Color**: `$color-text-default-primary` (#2E3030)
- **Color (Disabled)**: `$color-text-default-disabled` (#A3A6A8)

## Visual Characteristics

- **Border Radius**: Fully rounded pill shape using `$radius-full` (1000px)
- **Button Borders**: Individual buttons have borders on outer edges and between segments
- **Alignment**: All elements (buttons and input) aligned in a single row
- **Spacing**: No gaps between buttons and input (seamless appearance)
- **Input**: Centered numeric value with fixed width based on size variant
- **Cursor**: Pointer cursor on buttons, text cursor on input field
- **Transitions**: Smooth color transitions on hover and press states (0.2s ease)

## Accessibility

### Focus State
- Triggered when Tab key focuses the input field or Space/Enter activates buttons
- Clear focus ring with 2px border around entire stepper or input
- Focus ring color: `$color-border-focus-default` (#2E3030)
- Focus visible indicator meets WCAG requirements
- Keyboard focus moves to input field for direct value entry
- Screen readers announce current value, min/max limits, and available actions
- Uses `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for value context

### Keyboard Navigation
- **Tab**: Move focus to the stepper input field
- **Shift + Tab**: Navigate backwards
- **Up Arrow**: Increment value by step amount (when input focused)
- **Down Arrow**: Decrement value by step amount (when input focused)
- **Space/Enter**: Activate button when button has focus
- **Number Keys**: Direct numeric input when input field is focused
- **Escape**: Reset focus or cancel input changes
- Disabled buttons cannot receive focus or be activated
- Screen readers announce value changes immediately
- Respects min/max boundaries and announces when limit is reached

### Disabled State
- Reduced contrast to indicate non-interactive state
- Entire stepper: Gray background and border with dimmed text and icons
- Individual button: Dimmed icon only, button cannot be activated
- No pointer cursor (cursor: not-allowed for disabled stepper)
- Cannot receive keyboard focus when fully disabled
- Partially disabled (min/max reached): Other button remains interactive
- Screen readers announce "disabled" or "unavailable"
- Uses `aria-disabled="true"` to communicate state
- Announces min/max limits when reached (e.g., "minimum value reached")

### Color Contrast
- **WCAG AA Compliance**: All interactive elements meet 4.5:1 minimum contrast ratio
- **Text (Default)**: #2E3030 on #FFFFFF = 14.6:1
- **Text (Disabled)**: #A3A6A8 on #F0F0F2 = 2.5:1 (intentionally lower for disabled state)
- **Icons (Enabled)**: #2E3030 on #FFFFFF = 14.6:1
- **Icons (Disabled)**: #6B6E70 on #FFFFFF = 6.0:1
- **Icons (Fully Disabled)**: #A3A6A8 on #F0F0F2 = 2.5:1
- **Focus Border**: #2E3030 = 14.6:1 against light backgrounds
- **Border (Default)**: #B2BDBD provides sufficient contrast for boundaries
- **Hover Background**: #F0F7F7 maintains contrast with icons
- **Pressed Background**: #E0EDF0 maintains contrast with icons
- **Role "spinbutton"**: Properly identifies numeric stepper behavior to assistive technology

## Usage Guidelines

### When to Use
- Product quantity selection in e-commerce shopping carts
- Adjusting numeric settings or preferences
- Selecting number of items, guests, rooms, tickets, etc.
- Portions, servings, or measurements that require precise control
- When users need fine-grained control over numeric values

### Best Practices
1. Always set appropriate `min` and `max` values to prevent invalid inputs
2. Use descriptive labels to clarify what quantity is being adjusted
3. Disable buttons appropriately when min/max limits are reached
4. Provide immediate visual feedback when values change
5. Use consistent step increments that make sense for the context
6. Allow direct numeric input for large value changes
7. Consider adding a label or unit indicator (e.g., "items", "kg", "$")
8. Validate input to ensure only numeric values are accepted
9. Announce value changes to screen readers for accessibility
10. Consider mobile touch targets (minimum 44×44px for buttons)

### Common Use Cases
- **Shopping Cart**: Adjusting product quantities before checkout
- **Booking Forms**: Selecting number of guests, rooms, or tickets
- **Recipe Calculators**: Adjusting serving sizes or portions
- **Settings**: Configuring numeric preferences (timeout duration, retry count, etc.)
- **Filters**: Selecting price ranges, quantities, or numeric filters

### Don't Use When
- The numeric range is very large (>100 values) - consider a slider or text input instead
- Precise values are not required - consider a dropdown or slider
- The values are not sequential or have irregular intervals
- The action requires immediate, continuous feedback (use a slider)

## Component Combinations

The quantity stepper component supports 48 unique combinations:
- 2 sizes × 2 focus states (active/inactive) × 3 value states (default/min reached/max reached) × 4 button states (default/hover/focus/pressed) = 48 variants

All combinations maintain consistent visual hierarchy, accessibility standards, and proper boundary validation.
