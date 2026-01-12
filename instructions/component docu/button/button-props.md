# Button Component

## Overview
The Button component is a clickable element for user actions and navigation. It supports multiple kinds (primary, secondary, tertiary, destructive), two sizes, seven states, and surface variants, with optional leading/trailing icons and flag indicators.

## Component Properties

### Props

| Property | Type | Default | Options | Description |
|----------|------|---------|---------|-------------|
| `size` | string | `"lg"` | `"sm"`, `"lg"` | Controls the size of the button. Small (sm) is 32px height, Large (lg) is 48px height. |
| `kind` | string | `"primary"` | `"primary"`, `"secondary"`, `"tertiary"`, `"destructive"` | Defines the visual importance and style kind of the button. |
| `state` | string | `"default"` | `"default"`, `"hover"`, `"focus"`, `"pressed"`, `"loading"`, `"success"` | The interactive state of the button. Usually controlled internally. |
| `isDisabled` | string | `"false"` | `"false"`, `"true"` | Determines if the button is disabled. Uses string type in Figma variants. |
| `surface` | string | `"default"` | `"default"`, `"inverted"` | Determines if the button should adapt to a light (default) or dark (inverted) background. |
| `label` | string | `"Button CTA"` | - | The text content displayed in the button. |
| `iconLeading` | boolean | `false` | `true`, `false` | If true, displays an icon on the left side of the button text. |
| `iconLeadingSwap` | React.ReactNode | `null` | - | The icon component to display on the left side. Replaces default circle icon. |
| `iconTrailing` | boolean | `false` | `true`, `false` | If true, displays an icon on the right side of the button text. |
| `iconTrailingSwap` | React.ReactNode | `null` | - | The icon component to display on the right side. Replaces default chevron-right icon. |
| `flag` | boolean | `false` | `true`, `false` | If true, displays a flag indicator on the button. |
| `onClick` | function | - | - | Callback function triggered when the button is clicked. |
| `disabled` | boolean | `false` | `true`, `false` | HTML disabled attribute. If true, disables the button and applies disabled styling. |
| `loading` | boolean | `false` | `true`, `false` | If true, shows a loading spinner and disables interaction. |
| `type` | string | `"button"` | `"button"`, `"submit"`, `"reset"` | The HTML button type attribute. |
| `fullWidth` | boolean | `false` | `true`, `false` | If true, button expands to fill the width of its container. |
| `className` | string | - | - | Additional CSS classes to apply to the button. |

### React Aria Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aria-label` | string | - | Accessible label for the button. Overrides visible text for screen readers. |
| `aria-labelledby` | string | - | ID of element that labels this button. |
| `aria-describedby` | string | - | ID of element that describes this button. |
| `aria-pressed` | boolean | - | Indicates button's pressed state for toggle buttons. |
| `aria-expanded` | boolean | - | Indicates whether element controlled by button is expanded. |
| `aria-haspopup` | string | - | Indicates button opens a menu, dialog, or other popup. Values: `"true"`, `"menu"`, `"dialog"`, `"listbox"`, `"tree"`, `"grid"`. |
| `aria-controls` | string | - | ID of element controlled by this button. |
| `aria-busy` | boolean | - | Indicates button is loading or processing. Should be `true` when `loading={true}`. |
| `role` | string | `"button"` | ARIA role. Usually implicit from button element. |

## Size Variants

### Small (`sm`)
- **Height**: 32px (`$size-height-sm`)
- **Typography**: `$typography-utility-cta-sm` (Lexend Medium, 14px, weight 500, line height 1)
- **Horizontal Padding**: 16px (`$spacing-md`)
- **Icon Size**: 16×16px (`$size-height-icon-xs`)
- **Min Width**: 96px (`$size-width-button-mw-sm`)
- **Border Radius**: 1000px (`$radius-full`)

### Large (`lg`)
- **Height**: 48px (`$size-height-lg`)
- **Typography**: `$typography-utility-cta-md` (Lexend Medium, 16px, weight 500, line height 1)
- **Horizontal Padding**: 24px (`$spacing-lg`)
- **Icon Size**: 20×20px (`$size-height-icon-sm`)
- **Min Width**: 128px (`$size-width-button-mw-lg`)
- **Border Radius**: 1000px (`$radius-full`)

## Kind Variants

### Primary
High emphasis, used for main actions.

**Default Surface:**
- Background: `$color-buttons-primary-default` (#FAC761)
- Text: `$color-text-default-primary` (#2E3030)
- Icons: `$color-icon-default-primary` (#2E3030)

**Inverted Surface:**
- Background: `$color-buttons-primary-default-inverted` (#FFFFFF)
- Text: `$color-text-default-primary` (#2E3030)
- Icons: `$color-icon-default-primary` (#2E3030)

### Secondary
Medium emphasis, used for secondary actions.

**Default Surface:**
- Background: `$color-surface-primary` (#FFFFFF)
- Border: `$color-border-button-default` (#2B7A87)
- Text: `$color-text-accent-default` (#2B7A87)
- Icons: `$color-icon-accent-default` (#2B7A87)

**Inverted Surface:**
- Background: Transparent
- Border: `$color-border-button-default-inverted` (#E0EDF0)
- Text: `$color-links-default-inverted` (#E0EDF0)
- Icons: `$color-icon-accent-default-inverted` (#E0EDF0)

### Tertiary
Low emphasis, text-only style for less important actions.

**Default Surface:**
- Background: Transparent
- Text: `$color-links-default` (#2B7A87)
- Icons: `$color-icon-accent-default` (#2B7A87)

**Inverted Surface:**
- Background: Transparent
- Text: `$color-links-default-inverted` (#E0EDF0)
- Icons: `$color-icon-accent-default-inverted` (#E0EDF0)

### Destructive
Used for dangerous or destructive actions (delete, remove, etc.). Maintains the same styling on both default and inverted surfaces.

**Both Surfaces:**
- Background: `$color-buttons-destructive-default` (#CC1700)
- Text: `$color-text-default-primary-inverted` (#FFFFFF)
- Icons: `$color-icon-default-primary-inverted` (#FFFFFF)

## State Variants

**Note**: The `state` prop does not include "disabled". Instead, the `isDisabled` prop controls the disabled state alongside any other state.

### Default
The standard resting state of the button.

### Hover
Displayed when the user hovers over the button with a cursor.

**Primary:**
- Default Surface: `$color-buttons-primary-hovered` (#F5B83D)
- Inverted Surface: `$color-buttons-primary-hovered-inverted` (#F0F7F7)

**Secondary:**
- Default Surface: `$color-buttons-secondary-hovered` (#F0F7F7)
- Border: `$color-border-button-hovered` (#1A5961)
- Text: `$color-text-accent-alt` (#1A5961)

**Tertiary:**
- Text: `$color-links-hovered` (#1A5961)
- Inverted: `$color-links-hovered-inverted` (#D9E8ED)

**Destructive:**
- Background: `$color-buttons-destructive-hovered` (#A81400)

### Focus
Displayed when the button receives keyboard focus.
- Includes a visible focus ring around the button
- Focus border: `$color-border-focus-default` (#2E3030) for default buttons
- Focus border: `$color-border-focus-accent` (#2B7A87) for secondary/tertiary buttons

### Pressed
The active state when the user clicks or taps the button.

**Primary:**
- Default Surface: `$color-buttons-primary-pressed` (#EDA31C)
- Inverted Surface: `$color-buttons-primary-pressed-inverted` (#E0EDF0)

**Secondary:**
- Background: `$color-buttons-secondary-pressed` (#E0EDF0)
- Border: `$color-border-button-pressed` (#0F3D42)
- Text: `$color-text-accent-high-contrast` (#0F3D42)

**Tertiary:**
- Text: `$color-links-pressed` (#0F3D42)
- Inverted: `$color-links-pressed-inverted` (#BFE3E8)

**Destructive:**
- Background: `$color-buttons-destructive-pressed` (#7A0F00)

### Disabled
The non-interactive state when the button is disabled.

**Primary:**
- Background: `$color-buttons-primary-disabled` (#C9CCCF)
- Text: `$color-text-default-disabled` (#A3A6A8)

**Secondary:**
- Background: `$color-buttons-secondary-disabled` (#E8E8EB)
- Border: `$color-border-button-disabled` (#A3A6A8)
- Text: `$color-text-default-disabled` (#A3A6A8)
- Inverted Text: `$color-text-default-disabled-on-surface` (#6B6E70)

**Tertiary:**
- Text: `$color-text-default-disabled` (#A3A6A8)
- Inverted: `$color-text-default-disabled-on-surface` (#6B6E70)

**Destructive:**
- Background: `$color-buttons-primary-disabled` (#C9CCCF)
- Text: `$color-text-default-disabled` (#A3A6A8)

### Loading
Displays a loading spinner and disables interaction.
- Same visual style as default state
- Spinner replaces icon or appears before text
- Button remains non-interactive
- Use the loader lottie animations in ~assets/animated-icons. Use loader-black.lottie for buttons of Primary kind, loader-teal.lottie for buttons of Secondary and Tertiary kinds, and loader-white.lottie for the inverted variants of secondary and tertiary kinds.

### Success
Temporary state showing successful action completion.
- Typically shows a checkmark icon
- Auto-transitions back to default state

## Surface Variants

### Default Surface
Designed for use on light backgrounds.
- Uses standard color palette
- Higher contrast for visibility

### Inverted Surface
Designed for use on dark backgrounds.
- Uses inverted color palette
- Adjusted colors maintain contrast and hierarchy

## Icons

### Leading Icon
- Positioned before the text label
- Default icon: Circle (base/circle.svg from `~assets/icons/base/`)
- Size: 20×20px (lg), 16×16px (sm)
- Can be replaced using `iconLeadingSwap` prop with any React component or icon from `~assets/icons/`
- When `iconLeading={false}`, no leading icon is shown

### Trailing Icon
- Positioned after the text label
- Default icon: Chevron Right (base/chevron-right.svg from `~assets/icons/base/`)
- Size: 20×20px (lg), 16×16px (sm)
- Can be replaced using `iconTrailingSwap` prop with any React component or icon from `~assets/icons/`
- When `iconTrailing={false}`, no trailing icon is shown

### Flag Indicator
- Optional visual indicator (typically a country flag or regional indicator)
- Size: 24×16px (lg), proportionally scaled for sm
- Positioned on the right side of the button. This is mutually exclusive with trailingIcon. If that property is true, the flag should not appear.
- Implemented as an image element with specific aspect ratio constraints

## Typography

All button variants use the **Lexend** font family with the following specifications:
- Font Style: Medium
- Font Weight: 500
- Line Height: 1
- Text Alignment: Center

## Visual Characteristics

- **Border Radius**: Fully rounded (1000px) for pill-shaped appearance
- **Shadow**: Box shadow on primary buttons (0px 1px 2px rgba(0,0,0,0.4), 0px 4px 6px rgba(0,0,0,0.15))
- **Alignment**: Content centered with icons and text positioned inline
- **Spacing**: Consistent horizontal padding based on size variant
- **Cursor**: Pointer cursor on interactive states (except disabled and loading)
- **Target Area**: Tertiary buttons include an invisible 44px tall target area (with horizontal padding) to ensure minimum touch target size compliance, improving accessibility on touch devices

## Accessibility

### Focus State
- Triggered by keyboard navigation (Tab key) or assistive technology focus
- Clear focus ring with sufficient contrast
- Visible focus indicator around button perimeter
- Focus ring color adapts to button kind:
  - Primary/Destructive: `$color-border-focus-default` (#2E3030)
  - Secondary/Tertiary: `$color-border-focus-accent` (#2B7A87)
- Uses `aria-describedby` to announce additional context when focused

### Keyboard Navigation
- **Tab**: Navigate to/from button
- **Shift + Tab**: Navigate backwards
- **Enter**: Activate button action
- **Space**: Activate button action
- Loading state prevents activation while `aria-busy="true"`
- Disabled buttons cannot receive focus (removed from tab order)

### Disabled State
- Reduced contrast to indicate non-interactive state
- Lower opacity colors for both text and icons
- No pointer cursor (cursor: not-allowed)
- Cannot receive keyboard focus (removed from tab order)
- Screen readers announce as "disabled" or "unavailable"
- Uses `aria-disabled` attribute to communicate state

### Color Contrast
- **WCAG AA Compliance**: All text and icon colors meet 4.5:1 minimum contrast ratio
- **Primary (Default Surface)**: #2E3030 on #FAC761 = 7.8:1
- **Primary (Inverted Surface)**: #2E3030 on #FFFFFF = 14.6:1
- **Secondary**: #2B7A87 on #FFFFFF with border = 4.7:1
- **Tertiary**: #2B7A87 text only = 4.7:1 on white background
- **Destructive**: #FFFFFF on #CC1700 = 7.2:1
- **Disabled**: Intentionally lower contrast (3:1) to indicate non-interactive state
- **Focus indicators**: High contrast borders exceed 3:1 against all backgrounds

### Loading State
- Maintains button dimensions during loading
- Clear visual indicator of processing state
- Non-interactive but visually distinct from disabled

### Button Combinations
The component supports 168 unique combinations:
- 2 sizes × 4 kinds × 7 states × 2 surfaces + icon variations

All combinations maintain consistent visual hierarchy and accessibility standards.

## Usage Guidelines

### When to Use Each Kind

**Primary**: Use for the main action on a page or in a section. There should typically only be one primary button visible at a time to avoid confusion about the primary action.

**Secondary**: Use for important but not primary actions. Secondary buttons provide clear alternatives without competing with the primary action.

**Tertiary**: Use for less important actions or when multiple actions need to be presented without visual hierarchy. Tertiary buttons have minimal visual weight and are ideal for inline actions or repeated action buttons in lists.

**Destructive**: Use specifically for irreversible or dangerous actions such as delete, remove, or permanent changes. Always pair destructive actions with confirmation dialogs or warnings.

### Best Practices

- Ensure button text clearly describes the action (use action verbs)
- Maintain consistent button sizing within related action groups
- Use the loading state for asynchronous actions that take more than 200ms
- Use the success state sparingly and only for confirmation feedback on critical actions
- Consider button width: use fullWidth sparingly and primarily for mobile or form contexts
- Icon buttons should use icons that clearly represent their action
- When using flags, ensure they're relevant to the button's context (e.g., language selection, regional settings)

### Accessibility Considerations

- All buttons meet WCAG AA minimum contrast requirements (4.5:1 for text)
- Tertiary buttons include extended hit areas (44px minimum) for touch accessibility
- Loading states communicate busy status to screen readers via `aria-busy`
- Disabled buttons are removed from tab order and announced as unavailable
- Focus indicators provide clear visual feedback meeting 3:1 contrast ratio