# Checkbox Component

## Overview
The Checkbox component is a form control for selecting one or multiple options. It supports two sizes, selected/unselected states, neutral state (indeterminate), error states, and both default and inverted surfaces. Each checkbox includes a label with optional supporting text.

## Component Properties

### Props

| Property | Type | Default | Options | Description |
|----------|------|---------|---------|-------------|
| `size` | string | `"md"` | `"lg"`, `"md"` | Controls the size of the checkbox. Large (lg) is 18px, Medium (md) is 16px. |
| `selected` | boolean | `false` | `true`, `false` | Whether the checkbox is currently checked. |
| `neutral` | boolean | `false` | `true`, `false` | Indeterminate state showing a dash (-) instead of a checkmark. |
| `state` | string | `"default"` | `"default"`, `"hover"`, `"focus"`, `"disabled"` | The interactive state of the checkbox. |
| `error` | boolean | `false` | `true`, `false` | If true, displays error styling and error message text in red. |
| `surface` | string | `"default"` | `"default"`, `"inverted"` | Surface variant for light/dark background compatibility. |
| `label` | string | `"Remember me"` | - | The label text displayed next to the checkbox. |
| `helperText` | string | `"Save my login details for next time."` | - | Additional text displayed below the label for context or instructions. |
| `errorText` | string | - | - | Error message text displayed below the helper text when error state is true. Appears in red. |
| `onChange` | function | - | - | Callback function triggered when checkbox state changes. |
| `disabled` | boolean | `false` | `true`, `false` | If true, disables the checkbox. |
| `id` | string | - | - | Unique identifier for form submission. |
| `name` | string | - | - | Form field name for submission. |
| `required` | boolean | `false` | `true`, `false` | If true, marks checkbox as required (shows "*" in label). |

### React Aria Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aria-label` | string | - | Accessible label for the checkbox. Use when no visible label is present. |
| `aria-labelledby` | string | - | ID of element that labels this checkbox. Typically the label element's ID. |
| `aria-describedby` | string | - | ID of element that describes this checkbox. Should reference helper text or error text elements. |
| `aria-checked` | boolean \| "mixed" | `false` | Indicates checkbox state. `true` = checked, `false` = unchecked, `"mixed"` = indeterminate. |
| `aria-required` | boolean | `false` | Indicates checkbox is required. Should match `required` prop. |
| `aria-invalid` | boolean | `false` | Indicates checkbox has validation error. Should be `true` when `error={true}`. |
| `aria-errormessage` | string | - | ID of element containing error message. Should reference error text element when `error={true}`. |
| `role` | string | `"checkbox"` | ARIA role. Usually implicit from input type. |

## Size Variants

### Large (`lg`)
- **Checkbox Size**: 18×18px
- **Border Radius**: `$spacing-2xs` (4px)
- **Typography**: `$typography-text-xl-regular` (Lexend Regular, 20px, weight 400, line height 1.5)
- **Supporting Text Typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Gap Between Checkbox and Text**: `$scale-4` (16px)
- **Vertical Alignment**: Top-aligned with checkbox

### Medium (`md`)
- **Checkbox Size**: 16×16px
- **Border Radius**: `$spacing-2xs` (4px)
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Supporting Text Typography**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5)
- **Gap Between Checkbox and Text**: `$scale-4` (16px)
- **Vertical Alignment**: Top-aligned with checkbox

## State Variants

### Default (Unselected)
The standard unchecked state of the checkbox.

**Visual:**
- Border: 1px solid `$color-border-input-default` (#B5B8BA)
- Background: `$color-surface-primary` (#FFFFFF)
- Checkbox Color: None (empty box)
- Text Color: `$color-text-default-secondary` (#45474A)
- Cursor: Pointer

### Hover (Unselected)
Displayed when the user hovers over an unchecked checkbox.

**Visual:**
- Border: 1px solid `$color-border-button-hovered` (#1A5961)
- Background: `$color-surface-primary` (#FFFFFF)
- Checkbox Color: None (empty box)
- Text Color: `$color-text-default-secondary` (#45474A)
- Cursor: Pointer

### Focus (Unselected)
Displayed when the checkbox receives keyboard focus.

**Visual:**
- Border: 1px solid `$color-border-focus-accent` (#2B7A87)
- Focus Ring: Visible focus outline
- Background: `$color-surface-primary` (#FFFFFF)
- Text Color: `$color-text-default-secondary` (#45474A)

### Disabled (Unselected)
The non-interactive state when the checkbox is disabled.

**Visual:**
- Border: 1px solid `$color-border-button-disabled` (#A3A6A8)
- Background: `$color-buttons-secondary-disabled` (#E8E8EB)
- Text Color: `$color-icon-default-disabled-on-surface` (#6B6E70)
- Cursor: Not-allowed
- Opacity: Reduced

### Default (Selected)
The checked state of the checkbox.

**Visual:**
- Border: 1px solid `$color-border-button-default` (#2B7A87)
- Background: `$color-border-button-default` (#2B7A87)
- Checkmark: White (`#FFFFFF`) check icon
- Text Color: `$color-text-default-secondary` (#45474A)
- Cursor: Pointer

### Hover (Selected)
Displayed when the user hovers over a checked checkbox.

**Visual:**
- Border: 1px solid `$color-border-button-hovered` (#1A5961)
- Background: `$color-border-button-hovered` (#1A5961)
- Checkmark: White check icon
- Text Color: `$color-text-default-secondary` (#45474A)
- Cursor: Pointer

### Focus (Selected)
Displayed when a checked checkbox receives keyboard focus.

**Visual:**
- Border: 1px solid `$color-border-focus-accent` (#2B7A87)
- Background: `$color-border-button-default` (#2B7A87)
- Checkmark: White check icon
- Focus Ring: Visible focus outline
- Text Color: `$color-text-default-secondary` (#45474A)

### Disabled (Selected)
The non-interactive checked state.

**Visual:**
- Border: 1px solid `$color-border-button-disabled` (#A3A6A8)
- Background: `$color-buttons-primary-disabled` (#C9CCCF)
- Checkmark: White check icon (muted)
- Text Color: `$color-icon-default-disabled-on-surface` (#6B6E70)
- Cursor: Not-allowed
- Opacity: Reduced

## Neutral (Indeterminate) State

### Default (Neutral)
Shows a dash (-) instead of a checkmark, indicating a mixed or indeterminate selection.

**Visual:**
- Border: 1px solid `$color-border-input-default` (#B5B8BA)
- Background: `$color-surface-primary` (#FFFFFF)
- Symbol: Horizontal dash line (50% opacity)
- Text Color: `$color-text-default-secondary` (#45474A)

### Hover (Neutral)
**Visual:**
- Border: 1px solid `$color-border-button-hovered` (#1A5961)
- Background: `$color-surface-primary` (#FFFFFF)
- Symbol: Horizontal dash line

### Focus (Neutral)
**Visual:**
- Border: 1px solid `$color-border-focus-accent` (#2B7A87)
- Background: `$color-surface-primary` (#FFFFFF)
- Symbol: Horizontal dash line
- Focus Ring: Visible

### Disabled (Neutral)
**Visual:**
- Border: 1px solid `$color-border-button-disabled` (#A3A6A8)
- Background: `$color-buttons-secondary-disabled` (#E8E8EB)
- Symbol: Dash line (disabled appearance)
- Text Color: `$color-icon-default-disabled-on-surface` (#6B6E70)

## Error State

### Error (Unselected)
Displayed when there's a validation error.

**Visual:**
- Border: 1px solid `$color-border-input-error` (#CC1700)
- Background: `$color-surface-primary` (#FFFFFF)
- Checkbox Color: None (empty box)
- Error Message: `$color-text-error-default` (#CC1700)
- Error Icon/Text: Red styling
- Text Color: `$color-text-default-secondary` (#45474A)

### Error (Selected)
**Visual:**
- Border: 1px solid `$color-border-input-error` (#CC1700)
- Background: `$color-border-input-error` (#CC1700)
- Checkmark: White check icon
- Error Message: `$color-text-error-default` (#CC1700)
- Text Color: `$color-text-default-secondary` (#45474A)

### Error (Disabled)
**Visual:**
- Border: 1px solid `$color-border-button-disabled` (#A3A6A8)
- Background: `$color-buttons-secondary-disabled` (#E8E8EB)
- Checkbox Color: None (empty)
- Error Message: Grayed out (`$color-icon-default-disabled-on-surface` #6B6E70)
- Opacity: Reduced

## Surface Variants

### Default Surface
Optimized for light backgrounds.
- Checkbox Border: `$color-border-input-default` (#B5B8BA)
- Background: `$color-surface-primary` (#FFFFFF)
- Text: `$color-text-default-secondary` (#45474A)
- Focus Ring: `$color-border-focus-default` (#2E3030)

### Inverted Surface
Optimized for dark backgrounds.
- Checkbox Border: 1px solid (light on dark)
- Text: `$color-text-default-primary-inverted` (#FFFFFF)
- Icon: `$color-icon-default-primary-inverted` (#FFFFFF)
- Error Color: `$color-text-error-high-contrast-inverted` (#FF9487)
- Error Border: `$color-border-input-error-inverted` (#FF9487)

## Text and Supporting Text

### Label
- **Typography**: `$typography-text-xl-regular` (Lexend Regular, 20px, weight 400, line height 1.5) for lg size
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5) for md size
- **Color**: `$color-text-default-secondary` (#45474A) or inverted variant
- **Required Indicator**: "*" suffix appears when `required={true}`
- Always displayed

### Helper Text
- **Typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5) for lg size
- **Typography**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5) for md size
- **Color**: `$color-text-default-tertiary` (#6B6E70)
- Displayed below label
- Provides context or instructions
- Always visible (via `helperText` prop)

### Error Text
- **Typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5) for lg size
- **Typography**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5) for md size
- **Color**: `$color-text-error-default` (#CC1700) or `$color-text-error-high-contrast-inverted` (#FF9487) on inverted surface
- Displayed below helper text when `error={true}`
- Only visible when error state is active
- Provided via `errorText` prop
- Provides remediation guidance

## Visual Characteristics

- **Border Radius**: `$spacing-2xs` (4px) - square with slight rounding
- **Border Width**: 1px
- **Checkmark Style**: Vector SVG check icon
- **Checkmark Position**: Centered in checkbox
- **Gap Between Elements**: `$scale-4` (16px between checkbox and text content)
- **Alignment**: Checkbox top-aligned with text baseline
- **Text Wrapping**: Labels, helper text, and error text wrap to container width
- **Text Layout**: 
  - Label and required indicator (*) on first line
  - Helper text on second line
  - Error text on third line (when error={true})
- **Focus Ring**: Visible outline around entire control area

## Accessibility

### Focus State
- Triggered by keyboard navigation (Tab key) or assistive technology focus
- Clear focus ring with sufficient contrast
- Visible focus indicator around checkbox perimeter
- Focus ring color: `$color-border-focus-accent` (#2B7A87)
- Focus accessible via Tab key and screen reader navigation
- Uses `aria-describedby` to announce helper text and error messages when focused

### Keyboard Navigation
- **Tab**: Navigate to/from checkbox
- **Shift + Tab**: Navigate backwards
- **Space**: Toggle checkbox state (checked/unchecked/indeterminate)
- Disabled checkboxes removed from tab order
- Arrow keys not used (standard form control behavior)
- Screen readers announce label, state, and helper text when focused
- Error state announced immediately with `aria-invalid` and `aria-errormessage`

### Disabled State
- Reduced opacity and color contrast to indicate non-interactive state
- Background: `$color-buttons-secondary-disabled` (#E8E8EB)
- Text color: `$color-icon-default-disabled-on-surface` (#6B6E70)
- No pointer cursor (cursor: not-allowed)
- Cannot receive keyboard focus (removed from tab order)
- Screen readers announce as "disabled" or "unavailable"
- Uses `aria-disabled="true"` to communicate state
- Checkmark/dash indicator visible but muted

### Color Contrast
- **WCAG AA Compliance**: All text colors meet 4.5:1 minimum contrast ratio
- **Label Text**: #45474A on #FFFFFF = 8.9:1
- **Helper Text**: #45474A on #FFFFFF = 8.9:1
- **Error Text**: #CC1700 on #FFFFFF = 7.2:1
- **Checkbox Border (Default)**: #B5B8BA on #FFFFFF = 3.2:1
- **Checkbox Border (Hover)**: #1A5961 on #FFFFFF = 5.8:1
- **Checkbox Fill (Selected)**: #2B7A87 background with #FFFFFF checkmark = 7.1:1
- **Disabled Text**: #6B6E70 = 3:1 (intentionally lower to indicate non-interactive)
- **Focus Ring**: #2B7A87 = 4.7:1 minimum against background
- **Indeterminate Dash**: High contrast line visible in all states

## Variant Combinations

The checkbox component supports these combinations:

**Unselected State:**
- 2 sizes × 4 interactive states × 2 surfaces × 2 error states = 32 variants

**Selected State:**
- 2 sizes × 4 interactive states × 2 surfaces × 2 error states = 32 variants

**Neutral State:**
- 2 sizes × 4 interactive states × 2 surfaces = 16 variants

**Total: 80 unique component variants**

### Most Common Combinations
1. md/default/unselected - Basic form checkbox
2. md/default/selected - Checked form option
3. lg/default/unselected - Large form checkbox
4. md/error=true/unselected - Invalid unchecked field with `errorText` prop
5. md/error=true/selected - Invalid checked field with `errorText` prop
6. Any size with state=hover/focus for interactive feedback
7. Inverted surface for dark mode compatibility

### Text Content Combinations
- **Label only**: Use `label` prop (required)
- **Label + helper text**: Use `label` and `helperText` props
- **Label + helper text + error**: Use `label`, `helperText`, `errorText` props with `error={true}`
- **Required label**: Set `required={true}` to append "*" to label

## Usage Guidelines

### When to Use
- For binary choice selections (yes/no, agree/disagree)
- For multiple independent selections from a list
- For toggling features on/off
- For confirming agreements (terms & conditions, etc.)
- For form validation and error handling

### Best Practices
1. Always provide clear, descriptive labels via the `label` prop
2. Use `helperText` to provide context or instructions
3. Display validation errors via the `errorText` prop when `error={true}`
4. Group related checkboxes together
5. Provide immediate validation feedback for required fields
6. Ensure sufficient spacing between checkboxes (minimum 8px)
7. Use consistent sizing within a form or section
8. Provide visual focus indicators for keyboard users
9. Use neutral state sparingly for parent/child relationships
10. Avoid using checkboxes for single selections (use radio buttons instead)

### Label Placement
- Labels are placed next to the checkbox via the `label` prop
- Helper text appears below the main label via `helperText` prop
- Error messages appear below helper text via `errorText` prop
- Required indicator ("*") automatically appended to label when `required={true}`

### Size Selection
- **lg (18px)**: Primary forms, emphasis needed, accessibility needs
- **md (16px)**: Standard forms, compact layouts, most common use

### Error Handling
- Set `error={true}` to display error styling
- Provide error message via `errorText` prop
- Error text appears in red below the helper text
- Maintain checkbox state (checked/unchecked) during error display
- Clear errors by setting `error={false}` when user corrects the field

### Using Helper and Error Text
- `helperText` is always visible and provides supporting context
- `errorText` only displays when `error={true}`
- Both appear below the label with error text in red below helper text
- Error text and helper text use the same font size

## Design Tokens Used

### Colors
- `$color-border-input-default`: #B5B8BA
- `$color-border-input-error`: #CC1700
- `$color-border-button-default`: #2B7A87
- `$color-border-button-hovered`: #1A5961
- `$color-border-button-disabled`: #A3A6A8
- `$color-border-focus-default`: #2E3030
- `$color-border-focus-accent`: #2B7A87
- `$color-text-default-secondary`: #45474A
- `$color-text-default-tertiary`: #6B6E70
- `$color-text-error-default`: #CC1700
- `$color-text-default-primary-inverted`: #FFFFFF
- `$color-text-error-high-contrast-inverted`: #FF9487
- `$color-surface-primary`: #FFFFFF
- `$color-buttons-secondary-disabled`: #E8E8EB
- `$color-buttons-primary-disabled`: #C9CCCF
- `$color-icon-default-disabled-on-surface`: #6B6E70
- `$color-icon-default-primary-inverted`: #FFFFFF

### Typography
- `$typography-text-xl-regular`: Lexend Regular, 20px, weight 400, line height 1.5
- `$typography-text-lg-regular`: Lexend Regular, 18px, weight 400, line height 1.5
- `$typography-text-md-regular`: Lexend Regular, 16px, weight 400, line height 1.5
- `$typography-text-sm-regular`: Lexend Regular, 14px, weight 400, line height 1.5

### Spacing
- `$spacing-none`: 0px
- `$spacing-2xs`: 4px
- `$spacing-xs`: 8px
- `$scale-4`: 16px (gap between checkbox and text)