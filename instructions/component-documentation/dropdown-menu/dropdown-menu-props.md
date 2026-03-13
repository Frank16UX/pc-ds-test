# Dropdown Menu Component

## Overview
The Dropdown Menu component is a container that displays a scrollable list of selectable options. It appears as an overlay when triggered by a button or other control, allowing users to choose from a list of actions or options. The component supports both single-select and multi-select modes, features an integrated scrollbar for overflow content, and automatically adjusts its height based on content (overflow or hug mode).

## Component Properties

### Props
| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `version` | `"overflow" \| "hug"` | `"overflow"` | Controls height behavior: "overflow" has fixed max height with scrolling, "hug" adjusts to content |
| `multiselect` | `boolean` | `false` | Whether multiple items can be selected (shows checkboxes when true) |
| `items` | `DropdownItem[]` | `[]` | Array of menu item configurations (text, value, disabled, etc.) |
| `maxHeight` | `number` | - | Maximum height in pixels for overflow version (typically 300-400px) |
| `width` | `number \| "auto"` | `320` | Width of the dropdown menu in pixels or auto |
| `selectedItems` | `string[]` | `[]` | Array of selected item values (for controlled component) |
| `onSelect` | `(value: string) => void` | - | Callback fired when an item is selected (single-select) |
| `onSelectionChange` | `(values: string[]) => void` | - | Callback fired when selection changes (multi-select) |
| `position` | `"bottom-start" \| "bottom-end" \| "top-start" \| "top-end"` | `"bottom-start"` | Position relative to trigger element |
| `isOpen` | `boolean` | `false` | Controls whether the dropdown is visible |

### React Aria Properties
| Property | Type | Description |
|----------|------|-------------|
| `role` | `"menu" \| "listbox"` | ARIA role (use "menu" for action menus, "listbox" for selection lists) |
| `aria-label` | `string` | Accessible label for the dropdown menu |
| `aria-labelledby` | `string` | References ID of element that labels the menu (typically the trigger button) |
| `aria-orientation` | `"vertical"` | Indicates menu orientation (always vertical for dropdowns) |
| `aria-activedescendant` | `string` | ID of the currently focused item (for virtual focus management) |
| `aria-multiselectable` | `boolean` | Indicates whether multiple items can be selected |
| `tabIndex` | `number` | Controls keyboard navigation (typically -1 for managed focus) |

## Size Variants

### Large (`lg`)
- **List Item Height**: `$size-height-lg` (48px minimum)
- **Item Typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Checkbox Size**: 18x18px (when multiselect=true)
- **Vertical Padding**: `$spacing-md` (16px) top, `$spacing-sm` (12px) bottom
- **Overflow Max Height**: ~332px (displays approximately 6-7 items)
- **Hug Height**: Adjusts to content (typically displays 10-12 items fully visible)

### Medium (`md`)
- **List Item Height**: 40px minimum
- **Item Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Checkbox Size**: 16x16px (when multiselect=true)
- **Vertical Padding**: `$spacing-md` (16px) top, `$spacing-sm` (12px) bottom
- **Overflow Max Height**: ~280px (displays approximately 6-7 items)
- **Hug Height**: Adjusts to content (typically displays 10-12 items fully visible)

## Hierarchy Variants

### Overflow Version
- **Height Behavior**: Fixed maximum height with vertical scrolling
- **Scrollbar**: Always visible when content exceeds max height
- **Use Case**: Large lists (10+ items) where screen space is limited
- **Content Clipping**: Items are clipped and require scrolling to view all
- **Height Calculation**: 
  - Large: 16px (top spacer) + 300px (content area) + 12px (bottom spacer) = 328px total
  - Medium: 16px (top spacer) + 252px (content area) + 12px (bottom spacer) = 280px total

### Hug Version
- **Height Behavior**: Expands to fit all content without scrolling
- **Scrollbar**: Not displayed (all items visible)
- **Use Case**: Short to medium lists (2-12 items) where full visibility is preferred
- **Content Display**: All items are immediately visible without interaction
- **Height Calculation**: Dynamic based on number of items (item height × count + padding)

## State Variants

### Open
- **Visibility**: Menu is displayed
- **Background**: `$color-surface-primary` (#ffffff)
- **Border**: 1px solid `$color-border-divider-subtle` (#e3ebed)
- **Border Radius**: `$radius-md` (8px)
- **Shadow**: Elevation shadow (typically 4-8px blur)
- **Z-Index**: Higher than surrounding content (typically 1000+)

### Closed
- **Visibility**: Menu is hidden (display: none or opacity: 0)
- **Animation**: Fade out with scale down (150-200ms ease-out)

### Single-Select Mode (`multiselect=false`)
- **Item Display**: Standard dropdown list items
- **Selection Indicator**: Background color change on selected item
- **Behavior**: Clicking an item selects it and closes the menu
- **Keyboard**: Enter/Space selects and closes menu

### Multi-Select Mode (`multiselect=true`)
- **Item Display**: Dropdown list items with leading checkboxes
- **Selection Indicator**: Checked checkboxes for selected items
- **Behavior**: Clicking an item toggles its selection, menu stays open
- **Keyboard**: Space toggles selection, menu remains open

## Visual Characteristics

### Container Structure
- **Layout**: Vertical flexbox column
- **Border**: 1px solid `$color-border-divider-subtle` (#e3ebed)
- **Border Radius**: `$radius-md` (8px)
- **Background**: `$color-surface-primary` (#ffffff)
- **Overflow**: Clip content at rounded corners

### Spacing
- **Top Spacer**: `$spacing-md` (16px)
- **Bottom Spacer**: `$spacing-sm` (12px)
- **Item Gap**: `$spacing-xs` (8px) between elements within items
- **No Gap Between Items**: List items are vertically stacked with no spacing

### Scrollbar
- **Width**: 16px total container
- **Padding**: `$spacing-2xs` (4px) around scrollbar
- **Bar Width**: 8px visible bar
- **Bar Color**: `$color-border-scroll-active` (#2b7a87)
- **Bar Radius**: `$radius-md` (8px)
- **Position**: Sticky to top, aligned to right edge
- **Thumb Size**: Proportional to content ratio (visible/total height)

### Shadow and Elevation
- **Box Shadow**: 0px 4px 16px rgba(0, 0, 0, 0.12) (typical dropdown elevation)
- **Z-Index**: 1000 or higher (above most content)
- **Backdrop**: Optional semi-transparent overlay (0.2 opacity) for modal behavior

### Animation
- **Open Animation**: Fade in (0ms → 1 opacity) + Scale up (0.95 → 1) over 150ms
- **Close Animation**: Fade out + Scale down (1 → 0.95) over 150ms
- **Origin**: Transform origin at trigger element position

## Accessibility

### Focus State
The dropdown menu manages focus for keyboard navigation:
- **Initial Focus**: First item receives focus when menu opens
- **Focus Ring**: Individual items display focus ring (`$color-border-focus-accent` #2b7a87, 2px solid)
- **Trigger**: Keyboard navigation (Arrow keys) or Tab into menu
- **Visibility**: Clear focus indicator on currently focused item
- **Focus Management**: Focus is trapped within the menu while open
- **Screen Reader**: Announces "Menu, [label if provided], [X] items"

### Keyboard Navigation
- **Down Arrow**: Moves focus to next item in the list, wraps to first from last
- **Up Arrow**: Moves focus to previous item in the list, wraps to last from first
- **Home**: Moves focus to first item in the list
- **End**: Moves focus to last item in the list
- **Enter**: Selects focused item (single-select: closes menu; multi-select: toggles selection)
- **Space**: Selects focused item (single-select: closes menu; multi-select: toggles selection)
- **Escape**: Closes the dropdown menu and returns focus to trigger
- **Tab**: Closes menu and moves focus to next focusable element
- **Shift + Tab**: Closes menu and moves focus to previous focusable element
- **Type-ahead**: Typing characters moves focus to next item starting with those characters

**Multi-Select Specific:**
- **Space**: Toggles checkbox without closing menu
- **Ctrl/Cmd + A**: Selects all items (optional enhancement)

### Disabled State
Items within the dropdown can be disabled:
- **Visual Treatment**: Grayed out text (`$color-text-default-disabled`)
- **Cursor**: Changes to `not-allowed`
- **Focus**: Cannot receive focus (skipped in keyboard navigation)
- **Screen Reader**: Announces as "dimmed" or "unavailable"
- **Interaction**: Cannot be selected or clicked

### Color Contrast
All text and interactive elements meet WCAG 2.1 Level AA contrast requirements:
- **Menu Item Text**: 
  - Default: #45474a on #ffffff (contrast ratio 9.87:1) ✓ Exceeds AAA
- **Border**: 
  - #e3ebed on #ffffff (contrast ratio 1.2:1) - Subtle border, meets design intent
- **Focus Ring**: 
  - #2b7a87 on #ffffff (contrast ratio 4.33:1) ✓ Meets UI component requirement (3:1)
- **Scrollbar**: 
  - #2b7a87 on #ffffff (contrast ratio 4.33:1) ✓ Meets requirement
- **Shadow**: Provides sufficient depth perception for elevation

## Usage Guidelines

### When to Use
- Use for displaying a list of actions or options triggered by a button or control
- Use when you need to conserve screen space by hiding options until needed
- Use for navigation menus, action menus, or selection lists
- Use multi-select mode when users need to select multiple options before confirming
- Use overflow version for long lists to maintain consistent dropdown size
- Use hug version for short lists where seeing all options immediately is beneficial

### When Not to Use
- **Inline Forms**: Use native select elements for basic form dropdowns
- **Few Options (2-3)**: Consider radio buttons or toggle buttons instead
- **Always Visible Navigation**: Use persistent navigation menus
- **Complex Filtering**: Use a dedicated filter panel or search interface
- **Mobile Contexts**: Consider using native action sheets or bottom sheets

### Best Practices
- **Limit Overflow Height**: Keep max height to display 5-8 items for optimal scanning
- **Clear Trigger**: Ensure the trigger button clearly indicates what the menu contains
- **Logical Ordering**: Order items logically (alphabetically, by frequency, or by category)
- **Visual Grouping**: Use dividers or group headers for related items (if supported)
- **Destructive Actions**: Place destructive actions (delete, remove) at the bottom with visual distinction
- **Close on Selection**: In single-select mode, always close menu after selection
- **Keep Open for Multi-Select**: In multi-select mode, keep menu open until explicit close action
- **Responsive Width**: Set width appropriate to longest item label (typically 200-400px)
- **Prevent Overflow**: Ensure dropdown doesn't extend beyond viewport edges

### Content Guidelines
- **Item Labels**: Use clear, concise labels (1-4 words)
- **Verbs for Actions**: Start action menu items with verbs (Edit, Delete, Share)
- **Sentence Case**: Use sentence case for all menu items
- **No Punctuation**: Don't add periods or other punctuation to menu items
- **Consistent Terminology**: Use consistent language across similar menus

### Interaction Patterns

#### Single-Select Pattern
1. User clicks trigger button
2. Menu opens with first item focused
3. User navigates with arrow keys or hovers with mouse
4. User selects item with Enter/Space/Click
5. Menu closes and selection is applied
6. Trigger button shows selected value (if applicable)

#### Multi-Select Pattern
1. User clicks trigger button
2. Menu opens with first item focused (checkboxes visible)
3. User toggles selections with Space/Click
4. Menu remains open after each selection
5. User closes menu with Escape or clicking outside
6. All checked items are applied
7. Trigger button shows count or summary (e.g., "3 selected")

#### With Scrolling
1. Menu opens showing initial items
2. Scrollbar indicates more content below
3. User scrolls with mouse wheel, touch, or keyboard (Page Down/Up)
4. Items smoothly scroll within the container
5. Scrollbar thumb position updates to reflect scroll position

## Design Tokens Used

### Typography
- `$typography-text-lg-regular`: Lexend Regular, 18px, weight 400, line height 1.5
- `$typography-text-md-regular`: Lexend Regular, 16px, weight 400, line height 1.5
- `$font-family-secondary`: Lexend
- `$font-weight-regular`: 400

### Colors - Text
- `$color-text-default-secondary`: #45474a

### Colors - Backgrounds
- `$color-surface-primary`: #ffffff

### Colors - Borders
- `$color-border-divider-subtle`: #e3ebed
- `$color-border-scroll-active`: #2b7a87
- `$color-border-focus-accent`: #2b7a87

### Spacing
- `$spacing-none`: 0px
- `$spacing-2xs`: 4px
- `$spacing-xs`: 8px
- `$spacing-sm`: 12px
- `$spacing-md`: 16px
- `$scale-4`: 16px

### Sizing
- `$size-height-lg`: 48px
- `$typescale-font-size-md`: 16px
- `$typescale-font-size-lg`: 18px

### Border Radius
- `$radius-md`: 8px
