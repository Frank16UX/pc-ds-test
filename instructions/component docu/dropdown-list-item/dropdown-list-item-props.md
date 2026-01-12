# Dropdown List Item Component

## Overview
The Dropdown List Item component is a versatile list element designed for use within dropdown menus, select components, and filterable lists. It supports multiple leading element types (icons, avatars, checkboxes, product thumbnails), optional trailing chevron indicators, and displays primary text with optional supporting text. The component provides clear visual feedback across different interaction states and supports both single-select and multi-select modes.

## Component Properties

### Props
| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `"lg" \| "md"` | `"lg"` | Controls the overall height and typography size of the list item |
| `selected` | `boolean` | `false` | Whether the item is currently selected |
| `state` | `"default" \| "hover" \| "focused" \| "disabled"` | `"default"` | The current interaction state of the component |
| `leading` | `"icon" \| "checkbox" \| "avatar" \| "product-thumbnail"` | `"icon"` | The type of leading element to display |
| `multiselect` | `boolean` | `false` | Whether the item is part of a multi-select list (shows checkbox when true) |
| `showSupportingText` | `boolean` | `true` | Whether to display the supporting text below the primary label |
| `showChevron` | `boolean` | Conditional | Whether to show the trailing chevron (shown for icon/avatar/thumbnail leading types when multiselect=false) |
| `primaryText` | `string` | `"Dropdown Item"` | The main label text for the list item |
| `supportingText` | `string` | `"Short supporting text"` | Secondary descriptive text displayed below the primary label |
| `iconSrc` | `string` | - | Source URL for the leading icon |
| `avatarSrc` | `string` | - | Source URL for the avatar image |
| `thumbnailSrc` | `string` | - | Source URL for the product/recipe thumbnail image |

### React Aria Properties
| Property | Type | Description |
|----------|------|-------------|
| `role` | `"option" \| "menuitem" \| "menuitemcheckbox"` | ARIA role (use "option" for select lists, "menuitem" for menus, "menuitemcheckbox" for multi-select) |
| `aria-selected` | `boolean` | Indicates whether the item is selected (for role="option") |
| `aria-checked` | `boolean \| "mixed"` | Indicates checked state (for role="menuitemcheckbox") |
| `aria-disabled` | `boolean` | Indicates whether the item is disabled |
| `aria-label` | `string` | Accessible label when text alone is insufficient |
| `aria-describedby` | `string` | References ID of element that describes the item (e.g., supporting text) |
| `tabIndex` | `number` | Controls keyboard navigation (0 for focusable, -1 for not) |
| `id` | `string` | Unique identifier for the list item |

## Size Variants

### Large (`lg`)
- **Height**: `$size-height-lg` (48px) for icon/checkbox variants, 64px for avatar/thumbnail variants
- **Primary Text Typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Supporting Text Typography**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5)
- **Icon Size**: `$size-height-icon-md` (24x24px)
- **Avatar Size**: 48x48px (circular, `$radius-full`)
- **Thumbnail Size**: 48x48px (square)
- **Checkbox Size**: 18x18px
- **Horizontal Padding**: `$spacing-xs` (8px) between elements

### Medium (`md`)
- **Height**: 40px for icon/checkbox variants, 52px for avatar variants, 56px for thumbnail variants
- **Primary Text Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Supporting Text Typography**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5)
- **Icon Size**: `$size-height-icon-sm` (20x20px)
- **Avatar Size**: 40x40px (circular, `$radius-full`)
- **Thumbnail Size**: 40x40px (square)
- **Checkbox Size**: 16x16px
- **Horizontal Padding**: `$spacing-xs` (8px) between elements

## Hierarchy Variants

### Leading Element Types

#### Icon
- **Display**: Icon positioned at the start of the item
- **Color**: `$color-icon-default-tertiary` (#6b6e70) in default state
- **Size**: 24x24px (lg), 20x20px (md)
- **Spacing**: `$spacing-xs` (8px) gap to text content
- **Chevron**: Displayed on the trailing edge when `multiselect=false`

#### Checkbox (Multiselect Mode)
- **Display**: Checkbox positioned at the start of the item
- **Size**: 18x18px (lg), 16x16px (md)
- **Border Radius**: `$spacing-2xs` (4px)
- **Spacing**: `$spacing-xs` (8px) gap to text content
- **Chevron**: Not displayed (checkbox replaces chevron functionality)
- **States**: Follows checkbox component states (unchecked, checked, indeterminate)

#### Avatar
- **Display**: Circular avatar image at the start of the item
- **Size**: 48x48px (lg), 40x40px (md)
- **Border Radius**: `$radius-full` (200px)
- **Spacing**: `$spacing-xs` (8px) gap to text content
- **Chevron**: Displayed on the trailing edge when `multiselect=false`
- **Item Height**: 64px (lg), 52px (md) to accommodate larger avatar

#### Product Thumbnail
- **Display**: Square product/recipe thumbnail at the start of the item
- **Size**: 48x48px (lg), 40x40px (md)
- **Border Radius**: None (square)
- **Spacing**: `$spacing-xs` (8px) gap to text content
- **Chevron**: Displayed on the trailing edge when `multiselect=false`
- **Item Height**: 64px (lg), 56px (md) to accommodate thumbnail

### Trailing Element

#### Chevron Indicator
- **Display Condition**: Shown when `multiselect=false` and `leading` is icon, avatar, or thumbnail
- **Icon**: Right-pointing chevron
- **Size**: 27x27px container with 18px visible width
- **Color**: `$color-icon-default-tertiary` (#6b6e70)
- **Purpose**: Indicates the item opens a submenu or navigates to details

## State Variants

### Default
- **Background**: `$color-surface-primary` (#ffffff) / Transparent
- **Primary Text**: `$color-text-default-secondary` (#45474a)
- **Supporting Text**: `$color-text-default-tertiary` (#6b6e70)
- **Icon/Chevron**: `$color-icon-default-tertiary` (#6b6e70)
- **Border**: None
- **Cursor**: pointer

### Hover
- **Background**: `$color-buttons-secondary-hovered` (#f0f7f7)
- **Primary Text**: `$color-text-default-secondary` (#45474a)
- **Supporting Text**: `$color-text-default-tertiary` (#6b6e70)
- **Icon/Chevron**: `$color-icon-default-tertiary` (#6b6e70)
- **Cursor**: pointer
- **Transition**: Background color fades in on hover

### Focused
- **Background**: `$color-surface-primary` (#ffffff) / Transparent
- **Primary Text**: `$color-text-default-secondary` (#45474a)
- **Supporting Text**: `$color-text-default-tertiary` (#6b6e70)
- **Focus Ring**: `$color-border-focus-accent` (#2b7a87), 2px solid
- **Focus Ring Offset**: 2px inset from edges
- **Border Radius**: `$spacing-2xs` (4px) for focus ring
- **Cursor**: pointer

### Disabled
- **Background**: `$color-surface-primary` (#ffffff) / Transparent
- **Primary Text**: `$color-text-default-disabled` (#a3a6a8)
- **Supporting Text**: `$color-text-default-disabled` (#a3a6a8)
- **Icon/Chevron**: `$color-icon-default-disabled` (#a3a6a8)
- **Checkbox**: Disabled state styling
- **Avatar/Thumbnail**: 50% opacity
- **Cursor**: not-allowed
- **Interaction**: Not selectable or clickable

### Selected (Single-Select with Icon/Avatar/Thumbnail)
- **Background**: `$color-buttons-secondary-selected` (#d6ecec) or similar selected state color
- **Primary Text**: `$color-text-default-secondary` (#45474a)
- **Supporting Text**: `$color-text-default-tertiary` (#6b6e70)
- **Checkmark Indicator**: May display checkmark icon on trailing edge
- **Visual Weight**: Slightly more prominent to indicate selection

### Selected (Multi-Select with Checkbox)
- **Checkbox State**: Checked
- **Background**: `$color-surface-primary` (#ffffff) / Transparent (no background change)
- **Primary Text**: `$color-text-default-secondary` (#45474a)
- **Supporting Text**: `$color-text-default-tertiary` (#6b6e70)

## Typography

### Primary Text
- **Large Size**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
  - Color: `$color-text-default-secondary` (#45474a)
  - Height: 28px (lg)
- **Medium Size**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
  - Color: `$color-text-default-secondary` (#45474a)
  - Height: 24px (md)
- **Overflow**: Text wraps to maintain readability
- **Alignment**: Vertically centered within text container

### Supporting Text
- **All Sizes**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5)
  - Color: `$color-text-default-tertiary` (#6b6e70)
- **Overflow**: Ellipsis truncation with `-webkit-box` clipping
- **Display**: Optional, can be hidden via `showSupportingText` prop
- **Alignment**: Left-aligned below primary text

## Visual Characteristics

### Layout Structure
- **Container**: Flexbox horizontal layout with `$spacing-xs` (8px) gap
- **Content Area**: Grows to fill available width between leading and trailing elements
- **Text Container**: Flexbox vertical stack, centered vertically
- **Alignment**: All elements vertically centered within the list item height

### Spacing
- **Gap Between Elements**: `$spacing-xs` (8px)
  - Between leading element and text
  - Between text and trailing element (when present)
- **Text Vertical Spacing**: Natural line-height (1.5) creates spacing between primary and supporting text
- **Outer Padding**: Typically controlled by parent dropdown container

### Borders and Shadows
- **Default**: No border or shadow
- **Focus**: 2px solid focus ring with `$color-border-focus-accent` (#2b7a87)
- **Dividers**: Managed by parent container (typically between items)

### Interactive Feedback
- **Hover**: Background color transition to `$color-buttons-secondary-hovered`
- **Focus**: Visible focus ring appears
- **Active/Press**: May show slight scale or opacity change (platform-dependent)
- **Disabled**: Reduced opacity on images, grayed-out text and icons

## Accessibility

### Focus State
The dropdown list item displays a clear focus indicator when receiving keyboard focus:
- **Focus Ring**: 2px solid border in `$color-border-focus-accent` (#2b7a87)
- **Focus Ring Style**: Inset 2px from item edges with 4px border radius
- **Trigger**: Activated by keyboard navigation (Arrow keys, Tab) or assistive technology focus
- **Visibility**: Focus ring appears over the item background without shifting content
- **Screen Reader Announcement**: "[Primary text], [supporting text if present], option [X of Y], [selected if applicable]"

### Keyboard Navigation
- **Down Arrow**: Moves focus to next item in the list
- **Up Arrow**: Moves focus to previous item in the list
- **Home**: Moves focus to first item in the list
- **End**: Moves focus to last item in the list
- **Enter/Space**: Selects the focused item (single-select) or toggles selection (multi-select)
- **Escape**: Closes the dropdown/menu and returns focus to trigger
- **Tab**: Moves focus out of the dropdown to next focusable element (typically closes dropdown)
- **Type-ahead**: Typing characters moves focus to next item starting with those characters

**Multi-Select Specific:**
- **Space**: Toggles checkbox selection without closing the dropdown
- **Shift + Down/Up Arrow**: May extend selection range (implementation-dependent)

### Disabled State
- **Visual Treatment**: 
  - Text and icons use `$color-text-default-disabled` and `$color-icon-default-disabled` (#a3a6a8)
  - Images (avatars, thumbnails) display at 50% opacity
  - Checkbox appears in disabled state
- **Cursor**: Changes to `not-allowed`
- **Focus**: Cannot receive keyboard focus (`tabIndex={-1}` or removed from DOM)
- **Screen Reader**: Announces as "Dropdown Item, dimmed" or "unavailable"
- **Interaction**: Cannot be selected, hovered, or clicked

### Color Contrast
All text and interactive elements meet WCAG 2.1 Level AA contrast requirements:
- **Primary Text**: 
  - Default: #45474a on #ffffff (contrast ratio 9.87:1) ✓ Exceeds AAA
  - Disabled: #a3a6a8 on #ffffff (contrast ratio 2.92:1) ⚠️ Does not meet AA (acceptable for disabled state)
- **Supporting Text**: 
  - Default: #6b6e70 on #ffffff (contrast ratio 5.42:1) ✓ Meets AA
- **Hover Background**: 
  - Primary text: #45474a on #f0f7f7 (contrast ratio ~9.5:1) ✓ Exceeds AAA
- **Focus Ring**: 
  - #2b7a87 on #ffffff (contrast ratio 4.33:1) ✓ Meets UI component requirement (3:1)
- **Icons**: 
  - Default: #6b6e70 on #ffffff (contrast ratio 5.42:1) ✓ Meets AA for graphics

## Usage Guidelines

### When to Use
- Use in dropdown menus to present a list of selectable options
- Use in select components for choosing one or multiple items from a list
- Use in filterable lists where users search and select from many options
- Use when options need supporting text for additional context
- Use with avatars when selecting people or user accounts
- Use with thumbnails when selecting products, recipes, or visual content
- Use with checkboxes for multi-select scenarios

### When Not to Use
- **Primary Navigation**: Use navigation menu items instead
- **Complex Forms**: Use dedicated form controls for structured data entry
- **Small Option Count**: Consider radio buttons or segmented controls for 2-4 options
- **Tree Views**: Use tree component for hierarchical data
- **Tables**: Use table rows with selection for tabular data

### Best Practices
- **Keep Primary Text Concise**: Use 1-5 words when possible, utilize supporting text for details
- **Use Consistent Leading Elements**: Within a single list, use the same leading element type (all icons, all avatars, etc.)
- **Provide Supporting Text**: Add supporting text when options need clarification or context
- **Indicate Selection Clearly**: Ensure selected state is visually distinct in single-select mode
- **Chevron Usage**: Show chevrons only when items lead to submenus or detail views
- **Avatar Fallbacks**: Provide initials or placeholder when avatar images fail to load
- **Keyboard Support**: Ensure full keyboard navigation and selection works reliably
- **Max Height**: Limit dropdown height and enable scrolling for long lists (typically 5-10 visible items)

### Content Guidelines
- **Primary Text**: Use sentence case, be direct and scannable
- **Supporting Text**: Provide helpful context, use sentence case with proper punctuation
- **Icon Selection**: Choose icons that clearly represent the option
- **Avatar Images**: Use high-quality, recognizable profile images
- **Thumbnail Images**: Ensure thumbnails are clear and representative of the product/item

### Interaction Patterns
- **Single-Select**: Clicking an item selects it and closes the dropdown
- **Multi-Select**: Clicking checkbox toggles selection, clicking item text also toggles, dropdown remains open
- **Submenu Navigation**: Clicking item with chevron opens submenu or navigates to detail view
- **Hover Preview**: Consider showing tooltips or previews on hover for truncated content

## Design Tokens Used

### Typography
- `$typography-text-lg-regular`: Lexend Regular, 18px, weight 400, line height 1.5
- `$typography-text-md-regular`: Lexend Regular, 16px, weight 400, line height 1.5
- `$typography-text-sm-regular`: Lexend Regular, 14px, weight 400, line height 1.5
- `$font-family-secondary`: Lexend
- `$font-weight-regular`: 400

### Colors - Text
- `$color-text-default-secondary`: #45474a
- `$color-text-default-tertiary`: #6b6e70
- `$color-text-default-disabled`: #a3a6a8

### Colors - Icons
- `$color-icon-default-tertiary`: #6b6e70
- `$color-icon-default-disabled`: #a3a6a8

### Colors - Backgrounds
- `$color-surface-primary`: #ffffff
- `$color-buttons-secondary-hovered`: #f0f7f7

### Colors - Borders
- `$color-border-focus-accent`: #2b7a87

### Spacing
- `$spacing-none`: 0px
- `$spacing-2xs`: 4px
- `$spacing-xs`: 8px
- `$spacing-md`: 16px
- `$scale-4`: 16px

### Sizing
- `$size-height-lg`: 48px
- `$size-height-icon-sm`: 20px
- `$size-height-icon-md`: 24px
- `$typescale-font-size-sm`: 14px
- `$typescale-font-size-md`: 16px
- `$typescale-font-size-lg`: 18px

### Border Radius
- `$radius-full`: 200px (for circular avatars)
