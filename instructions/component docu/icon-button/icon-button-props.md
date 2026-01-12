# Icon Button Component

## Overview
The Icon Button component is a compact, interactive button that displays only an icon without text. It supports multiple sizes, states, and an optional item counter indicator for displaying notifications or item counts.

## Component Properties

### Props

| Property | Type | Default | Options | Description |
|----------|------|---------|---------|-------------|
| `sizes` | string | `"xl"` | `"xl"`, `"lg"`, `"md"`, `"sm"` | Controls the size of the icon button. Ranges from 24px (sm) to 72px (xl). |
| `state` | string | `"default"` | `"default"`, `"hover"`, `"pressed-active"`, `"focus"`, `"disabled"` | The interactive state of the button. |
| `itemCounter` | boolean | `false` | `true`, `false` | Whether to show the item counter variant with text label. |
| `itemsAdded` | boolean | `false` | `true`, `false` | Whether items have been added (shows dot indicator when true). |
| `iconSwap` | React.ReactNode | `null` | - | Custom icon to replace the default icon. |
| `onClick` | function | - | - | Callback function triggered when the button is clicked. |
| `disabled` | boolean | `false` | `true`, `false` | If true, disables the button and applies disabled styling. |
| `className` | string | - | - | Additional CSS classes to apply to the button. |

### React Aria Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aria-label` | string | - | Accessible label for the button. Highly recommended for icon-only buttons to describe the action. |
| `aria-labelledby` | string | - | ID of element that labels this button. Alternative to `aria-label`. |
| `aria-describedby` | string | - | ID of element that describes this button or provides additional context. |
| `aria-pressed` | boolean | - | Indicates button's pressed state for toggle icon buttons. |
| `aria-expanded` | boolean | - | Indicates whether element controlled by button is expanded. Use for menu/dropdown triggers. |
| `aria-haspopup` | string | - | Indicates button opens a popup. Values: `"true"`, `"menu"`, `"dialog"`, `"listbox"`. |
| `aria-controls` | string | - | ID of element controlled by this button. |
| `aria-live` | string | - | For item counter updates. Values: `"polite"`, `"assertive"`. Announces count changes to screen readers. |
| `role` | string | `"button"` | ARIA role. Usually implicit from button element. |

## Size Variants

### Extra Large (`xl`)
- **Height/Width**: 72px
- **Icon Size**: 32×32px
- **Padding**: 24px horizontal, 16px vertical
- **Item Counter**: Not available

### Large (`lg`)
- **Height/Width**: 48px
- **Icon Size**: 24×24px
- **Padding**: 8px all sides
- **Item Counter**: Not available

### Medium (`md`)
- **Height/Width**: 40px
- **Icon Size**: 24×24px
- **Padding**: 8px all sides
- **Item Counter**: Available (expandable to 64px width with counter text)

### Small (`sm`)
- **Height/Width**: 24px
- **Icon Size**: 24×24px
- **Padding**: 0px (icon fills entire button)
- **Item Counter**: Not available

## State Variants

### Default
The standard resting state of the icon button.

**Visual:**
- Border: 1px or 2px solid `$color-border-icon-button-default` (#B5B8BA)
- Background: `$color-surface-primary` (#FFFFFF)
- Icon Color: `$color-icon-default-secondary` (#45474A)
- Cursor: Auto (disabled-like appearance)

**With Items Added:**
- Dot Indicator displayed in top-right corner
- Indicator size: 12px (xl/lg/md), 8px (sm)
- Indicator border: 2px solid white

### Hover
Displayed when the user hovers over the button with a cursor.

**Visual:**
- Border: 1px or 2px solid `$color-border-icon-button-hovered` (#2B7A87)
- Background: `$color-surface-interactive-hovered` (#F0F7F7)
- Icon Color: `$color-icon-accent-on-surface` (#1A5961)
- Cursor: Pointer

**With Items Added:**
- Dot Indicator maintained

### Pressed/Active
The state when the button is actively pressed or selected.

**Visual:**
- Border: 1px or 2px solid (maintained)
- Background: Slightly darker shade
- Icon Color: `$color-icon-accent-high-contrast` (#0F3D42)
- Cursor: Pointer

**With Items Added:**
- Dot Indicator maintained

### Focus
Displayed when the button receives keyboard focus.

**Visual:**
- Focus ring visible around the button
- Icon Color: `$color-icon-accent-on-surface` (#1A5961)
- Border: Visible focus outline
- Background: `$color-surface-primary` (#FFFFFF) or interactive hovered color

**With Items Added:**
- Dot Indicator maintained
- Focus ring includes the dot indicator area

### Disabled
The non-interactive state when the button is disabled.

**Visual:**
- Border: Removed or very subtle
- Background: `$color-surface-primary` (#FFFFFF) with reduced opacity
- Icon Color: `$color-icon-default-disabled` (#A3A6A8)
- Cursor: Not-allowed
- Opacity: 40-50% of normal

**With Items Added:**
- Dot Indicator displayed but grayed out
- Indicator uses: #E8E8EB background

## Item Counter Variant

### Counter Display
- **Available on**: Medium size only
- **Width**: Expandable from 40px to 64px
- **Components**: Icon + numeric text label
- **Typography**: `$typography-other-cta-md` (Lexend Medium, 16px, weight 500, line height 1)
- **Gap**: 2px between icon and counter text
- **Text Alignment**: Center
- **Text Color**: Inherits from state (default: `$color-text-default-secondary` (#45474A))

### Counter States
When `itemCounter={true}`:
- Default value: "0"
- Expands to accommodate number width
- Counter text color matches icon state

When `itemsAdded={true}` with counter:
- Dot indicator still visible
- Counter text may be empty or show count
- Width automatically adjusts

## Icons

### Icon Display
- Rendered as SVG with dynamic colors based on state
- Uses circular background container (base/circle)
- Color changes reflect interactive state
- Support for custom icon swap via `iconSwap` prop

### Icon Colors by State
- **Default**: `$color-icon-default-secondary` (#45474A)
- **Hover**: `$color-icon-accent-on-surface` (#1A5961)
- **Pressed**: `$color-icon-accent-high-contrast` (#0F3D42)
- **Focus**: `$color-icon-accent-on-surface` (#1A5961)
- **Disabled**: `$color-icon-default-disabled` (#A3A6A8)

### Item Indicator (Dot)
- Position: Top-right corner
- Shape: Circular badge
- Size: 12px (xl/lg/md), 8px (sm)
- Border: 2px solid white
- Background: `$color-border-focus-default` (#2E3030) or theme-specific color
- Visible when `itemsAdded={true}`

## Typography

The Icon Button uses primarily icons, with optional counter text:

**Counter Text** (when `itemCounter={true}`):
- Font Family: **Lexend**
- Font Size: 16px (`typography/font-size/md`)
- Font Weight: Medium (500, `typography/font-weight/medium`)
- Line Height: 1.0 (leading-none)
- Color: Inherits from state
- Text Align: Center

## Visual Characteristics

- **Border Radius**: Fully rounded (1000px) for circular appearance
- **Border Width**: 1px (md, lg, sm), 2px (xl)
- **Focus Ring**: Visible 1px border ring around button on focus state
- **Target Area**: Expanded hit area (invisible but functional):
  - xl: 72px
  - lg/md: 48px
  - sm: 44px
- **Aspect Ratio**: Square (1:1)
- **Transition**: Smooth color transitions on state changes
- **Cursor States**:
  - Default/Disabled: Auto/Not-allowed
  - Hover: Pointer
  - Focus: Pointer

## Accessibility

### Focus State
- Triggered by keyboard navigation (Tab key) or assistive technology focus
- Clear focus ring visible with sufficient contrast around button perimeter
- Visible focus indicator for keyboard navigation and screen readers
- Focus ring color: `$color-border-focus-default` (#2E3030)
- Focus ring width: 1-2px depending on size
- Expanded focus target area maintains 44px minimum touch target (WCAG 2.5.5)
- Uses `aria-label` to announce button purpose when focused

### Keyboard Navigation
- **Tab**: Navigate to/from icon button
- **Shift + Tab**: Navigate backwards
- **Enter**: Activate button action
- **Space**: Activate button action
- Disabled buttons removed from tab order
- Screen readers announce `aria-label`, pressed state, and counter value
- Item counter updates announced with `aria-live="polite"` or `"assertive"`
- Expanded hit target area (44-72px) ensures accessible touch/click targets

### Disabled State
- Reduced opacity and color contrast to indicate non-interactive state
- Background: `$color-surface-primary` (#FFFFFF) with reduced opacity
- Icon: `$color-icon-default-disabled` (#A3A6A8)
- Border removed or very subtle
- No pointer cursor (cursor: not-allowed)
- Opacity: 40-50% of normal state
- Cannot receive focus or keyboard interaction (removed from tab order)
- Screen readers announce as "disabled" or "unavailable"
- Uses `aria-disabled="true"` to communicate state
- Item counter indicator grayed out (#E8E8EB background)

### Color Contrast
- **WCAG AA Compliance**: All icon colors meet 4.5:1 minimum contrast ratio
- **Icon (Default)**: #45474A on #FFFFFF = 8.9:1
- **Icon (Hover)**: #1A5961 on #F0F7F7 = 5.4:1
- **Icon (Pressed)**: #0F3D42 on background = 10.2:1
- **Icon (Focus)**: #1A5961 on #FFFFFF = 5.8:1
- **Counter Text**: #45474A with 8.9:1 contrast
- **Border (Default)**: #B5B8BA = 3.2:1
- **Border (Hover)**: #2B7A87 = 4.7:1
- **Focus Ring**: #2E3030 = 14.6:1 against white background
- **Item Indicator Dot**: High contrast with 2px white border
- **Disabled Icon**: #A3A6A8 = 2.9:1 (intentionally lower to indicate non-interactive)

## Variant Combinations

The icon button supports these main combinations:

**Without Counter:**
- 4 sizes × 5 states × 2 itemsAdded = 40 variants

**With Counter (md only):**
- 1 size × 5 states × 2 itemsAdded = 10 variants

**Total: 50 unique component variants**

### Most Common Combinations
1. xl/default - Primary large icon button
2. lg/default - Large secondary icon button
3. md/default - Medium icon button with optional counter
4. sm/default - Small compact icon button
5. Any size with hover/focus for interactive feedback
6. md with counter for notification displays

## Usage Guidelines

### When to Use
- For compact icon-only buttons in toolbars or navigation
- For application menu triggers or toggles
- For action buttons where space is limited
- For displaying notifications with item counters
- As part of header or footer action areas

### Best Practices
1. Always provide an `aria-label` describing the button's action
2. Use consistent icon styles across all icon buttons
3. Provide clear hover and focus states for discoverability
4. Use item counter for notification counts (0, 1, 2+, etc.)
5. Ensure sufficient spacing between icon buttons (minimum 8px)
6. Use disabled state clearly to indicate unavailable actions
7. Maintain at least 44×44px touch target area on mobile

### Size Selection
- **xl (72px)**: Primary actions in headers, main navigation
- **lg (48px)**: Secondary actions, sidebar navigation
- **md (40px)**: Form actions, list item controls, counter variant
- **sm (24px)**: Inline actions within dense layouts, compact menus

### State Feedback
- Always pair icon buttons with loading states or status updates
- Use pressed-active state to indicate toggle state
- Combine with tooltips for additional context
- Use focus ring as primary keyboard navigation feedback

### Item Counter Best Practices
- Use only for actionable items (cart, inbox, notifications)
- Reset counter when items are cleared
- Limit counter display to reasonable numbers (0-99+)
- Consider visual alternatives for large counts
- Pair with toast notifications for updates

## Design Tokens Used

### Colors
- `$color-border-icon-button-default`: #B5B8BA
- `$color-border-icon-button-hovered`: #2B7A87
- `$color-border-icon-button-active`: #1A5961
- `$color-border-focus-default`: #2E3030
- `$color-icon-default-secondary`: #45474A
- `$color-icon-accent-on-surface`: #1A5961
- `$color-icon-accent-high-contrast`: #0F3D42
- `$color-icon-default-disabled`: #A3A6A8
- `$color-surface-primary`: #FFFFFF
- `$color-surface-interactive-hovered`: #F0F7F7
- `$color-text-default-secondary`: #45474A
- `$color-buttons-secondary-disabled`: #E8E8EB

### Sizing
- `$size-height-icon-lg`: 32px
- `$size-height-icon-md`: 24px

### Typography
- `$typography-other-cta-md`: Lexend Medium, 16px, weight 500, line height 1

### Spacing
- `$spacing-lg`: 24px