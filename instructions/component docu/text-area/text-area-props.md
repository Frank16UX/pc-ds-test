# Text Area Component

## Overview
A multi-line text input field with label, character counter, and error messaging. Designed for longer form content that exceeds single-line input capacity.

## Component Properties

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'lg' \| 'md'` | `'lg'` | Controls the minimum height of the text area and typography scale |
| `label` | `string` | - | Required text label displayed above the text area |
| `isRequired` | `boolean` | `false` | Shows asterisk (*) next to label when true |
| `placeholder` | `string` | - | Placeholder text shown when text area is empty |
| `value` | `string` | `''` | Current value of the text area field |
| `maxLength` | `number` | `200` | Maximum character count, displayed in counter |
| `helperText` | `string` | - | Character counter or helper text displayed below the field |
| `errorMessage` | `string` | - | Error message displayed when validation fails |
| `isInvalid` | `boolean` | `false` | Triggers error state styling and displays error message |
| `isDisabled` | `boolean` | `false` | Disables user interaction with the text area |
| `isReadOnly` | `boolean` | `false` | Makes text area viewable but not editable |
| `surface` | `'default' \| 'inverted'` | `'default'` | Color scheme for light or dark backgrounds |

### React Aria Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Accessible label for screen readers |
| `description` | `string` | Maps to helper text/character counter for additional context |
| `errorMessage` | `string` | Validation error message announced to assistive technology |
| `isRequired` | `boolean` | Indicates required field to screen readers |
| `isDisabled` | `boolean` | Disables input and communicates state to assistive technology |
| `isReadOnly` | `boolean` | Prevents editing while maintaining accessibility |
| `isInvalid` | `boolean` | Triggers error state and ARIA error announcements |
| `validationBehavior` | `'aria' \| 'native'` | Controls validation feedback method |
| `maxLength` | `number` | Enforces character limit and announces remaining count |

## Size Variants

### Large (`lg`)
- **Minimum text area height**: 80px
- **Total height (no error)**: ~171px (label + text area + helper)
- **Total height (with error)**: ~171px (same, error replaces helper)
- **Border radius**: `$radius-md` (8px)
- **Padding**: `$scale-4` (16px)
- **Gap**: `$spacing-xs` (8px)
- **Typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Label typography**: `$typography-text-xl-regular` (Lexend Regular, 20px, weight 400, line height 1.5)
- **Helper typography**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5)

### Medium (`md`)
- **Minimum text area height**: 72px
- **Total height (no error)**: ~144px (label + text area + helper)
- **Total height (with error)**: ~144px (same, error replaces helper)
- **Border radius**: `$radius-md` (8px)
- **Padding**: `$spacing-sm` (12px)
- **Gap**: `$spacing-xs` (8px)
- **Typography**: `$typography-text-md-regular` (Lexend Regular, 16px, weight 400, line height 1.5)
- **Label typography**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Helper typography**: `$typography-text-sm-regular` (Lexend Regular, 14px, weight 400, line height 1.5)

## Hierarchy Variants

This component does not have hierarchy variants. The text area functions as a standard multi-line text input for paragraph-length content.

## State Variants

### Default State
Resting state with standard border and text colors. Border uses `$color-border-input-default` (#b5b8ba), background uses `$color-surface-interactive-default` (#ffffff).

### Hover State
Activated when mouse cursor is over the text area. Border color intensifies to `$color-border-input-hover` (#697073) to provide visual feedback.

### Focus/Typing State
Applied when text area receives keyboard focus or user begins typing. Shows enhanced border with `$color-border-focus-default` (#2e3030) for clear active state indication.

**Visual characteristics:**
- Enhanced border emphasis
- Text cursor visible at insertion point
- Character counter updates dynamically as user types

### Disabled State
Non-interactive state indicated by reduced opacity and cursor change. User cannot interact with the text area field.

**Visual characteristics:**
- Border: `$color-border-input-disabled` (#d6dbdb)
- Background: `$color-surface-secondary` (#f5f5f5)
- Text: Reduced opacity
- No hover or focus effects
- Cursor changes to not-allowed

### Read-Only State
Viewable but not editable state. Content is displayed but user cannot modify the value. Useful for displaying pre-filled text that should not be changed.

**Visual characteristics:**
- Content visible and legible
- No text cursor on interaction
- Maintains standard appearance without edit affordances
- Character counter displays current count

### Filled State
When text area contains user-entered content, the placeholder disappears and actual text is displayed. Text color changes from tertiary (placeholder) to default (filled content).

**Features:**
- Character counter shows "current/max" format (e.g., "118/200")
- Text wraps automatically to multiple lines
- Vertical scrolling enabled if content exceeds minimum height

### Error State
Activated when validation fails (`isInvalid={true}`). Border changes to error color, helper text is replaced with error message, and error icon appears.

**Visual changes:**
- Border: `$color-border-input-error` (#cc1700) or `$color-border-input-error-inverted` (#ff9487)
- Helper icon: Warning/error icon in `$color-icon-error-default` (#cc1700)
- Error message text: `$color-text-error-default` (#cc1700) or `$color-text-error-high-contrast-inverted` (#ff9487)
- Character counter replaced with error message
- Focus state uses `$color-border-focus-error` (#7a0f00) or `$color-border-focus-error-inverted` (#cc1700)

## Surface Variants

### Default Surface
Optimized for light backgrounds. Uses standard color tokens for borders, text, and icons.

**Colors:**
- Border default: `$color-border-input-default` (#b5b8ba)
- Border hover: `$color-border-input-hover` (#697073)
- Border active: `$color-border-input-active` (#2e3030)
- Border focus: `$color-border-focus-default` (#2e3030)
- Background: `$color-surface-interactive-default` (#ffffff)
- Label text: `$color-text-default-secondary` (#45474a)
- Helper text: `$color-text-default-tertiary` (#6b6e70)
- Helper icon: `$color-icon-default-tertiary` (#6b6e70)

### Inverted Surface
Optimized for dark backgrounds. Adjusts border, background, and text colors to maintain contrast and readability on inverted surfaces.

**Colors:**
- Border default: `$color-border-input-default-inverted` (#c9cccf)
- Border hover: `$color-border-input-hover-inverted` (#8f9c9c)
- Border active: `$color-border-input-active-inverted` (#2b7a87)
- Border focus: `$color-border-focus-accent` (#2b7a87)
- Background: Dark surface color
- Label text: `$color-text-default-primary-inverted` (#ffffff)
- Helper text: Inverted tertiary color
- Helper icon: `$color-icon-default-primary-inverted` (#ffffff)

## Icons

### Helper Icon
Small icon displayed next to character counter or error message below the text area field.

**Specifications:**
- **Size**: 16px (both variants)
- **Position**: Left of helper/error text
- **Spacing**: `$spacing-xs` (8px) gap to text
- **Top padding**: `$spacing-2xs` (4px) / 2 = 2.5px alignment adjustment

**Icon types:**
- **Default**: Information/help icon in `$color-icon-default-tertiary` (#6b6e70)
- **Error**: Warning/alert icon in `$color-icon-error-default` (#cc1700) or `$color-icon-error-high-contrast-inverted` (#ff9487)

## Typography

### Label Text

**Large variant:**
- **Token**: `$typography-text-xl-regular`
- **Specification**: Lexend Regular, 20px, weight 400, line height 1.5
- **Color**: `$color-text-default-secondary` (#45474a) or `$color-text-default-primary-inverted` (#ffffff)
- **Usage**: Main label text with optional asterisk for required fields

**Medium variant:**
- **Token**: `$typography-text-lg-regular`
- **Specification**: Lexend Regular, 18px, weight 400, line height 1.5
- **Color**: `$color-text-default-secondary` (#45474a) or `$color-text-default-primary-inverted` (#ffffff)
- **Usage**: Main label text with optional asterisk for required fields

### Text Area Content (Filled)

**Large variant:**
- **Token**: `$typography-text-lg-regular`
- **Specification**: Lexend Regular, 18px, weight 400, line height 1.5
- **Color**: Default text color (dark for default surface, white for inverted)
- **Usage**: User-entered multi-line text content

**Medium variant:**
- **Token**: `$typography-text-md-regular`
- **Specification**: Lexend Regular, 16px, weight 400, line height 1.5
- **Color**: Default text color (dark for default surface, white for inverted)
- **Usage**: User-entered multi-line text content

### Placeholder Text

**Large variant:**
- **Token**: `$typography-text-lg-regular`
- **Specification**: Lexend Regular, 18px, weight 400, line height 1.5
- **Color**: `$color-text-default-tertiary` (#6b6e70)
- **Usage**: Hint text shown when text area is empty
- **Example**: "Placeholder"

**Medium variant:**
- **Token**: `$typography-text-md-regular`
- **Specification**: Lexend Regular, 16px, weight 400, line height 1.5
- **Color**: `$color-text-default-tertiary` (#6b6e70)
- **Usage**: Hint text shown when text area is empty
- **Example**: "Placeholder"

### Character Counter / Helper Text

**Both variants:**
- **Token**: `$typography-text-sm-regular`
- **Specification**: Lexend Regular, 14px, weight 400, line height 1.5
- **Color**: `$color-text-default-tertiary` (#6b6e70)
- **Usage**: Character counter showing "current/max" format
- **Examples**: "0/200", "118/200"

### Error Message Text

**Both variants:**
- **Token**: `$typography-text-sm-regular`
- **Specification**: Lexend Regular, 14px, weight 400, line height 1.5
- **Color**: `$color-text-error-default` (#cc1700) or `$color-text-error-high-contrast-inverted` (#ff9487)
- **Usage**: Validation error message replacing character counter
- **Example**: "This field is required."

## Visual Characteristics

### Layout Structure
1. **Label**: Top section with required indicator (asterisk)
2. **Text area field**: Main multi-line interaction area
3. **Helper/Error text**: Bottom section with icon and character counter or error message

### Spacing
- **Label to text area**: Standard vertical spacing between components
- **Text area to helper**: Standard vertical spacing between components
- **Icon gap**: `$spacing-xs` (8px) between helper icon and text
- **Horizontal padding (lg)**: `$scale-4` (16px)
- **Horizontal padding (md)**: `$spacing-sm` (12px)
- **Helper icon padding**: `$spacing-2xs` (4px) / 2 = 2.5px top adjustment for visual alignment

### Borders
- **Radius**: `$radius-md` (8px) on all corners
- **Width**: 1px solid border
- **Default color**: `$color-border-input-default` (#b5b8ba)
- **Hover color**: `$color-border-input-hover` (#697073)
- **Active color**: `$color-border-input-active` (#2e3030)
- **Focus color**: `$color-border-focus-default` (#2e3030)
- **Error color**: `$color-border-input-error` (#cc1700)
- **Error focus**: `$color-border-focus-error` (#7a0f00)

### Height Management
The text area has a minimum height that expands vertically as content grows:
- **Large**: 80px minimum height for text content area
- **Medium**: 72px minimum height for text content area
- Text wraps to new lines automatically
- Vertical scrolling enabled when content exceeds available space
- Total component height includes label and helper/error text sections

### Text Wrapping and Overflow
- **Line wrapping**: Text automatically wraps to new lines within text area width
- **Line height**: 1.5 ensures comfortable reading spacing
- **Vertical growth**: Field expands vertically to accommodate content
- **Scrolling**: Vertical scrollbar appears when content exceeds maximum height (if implemented)

## Accessibility

### Focus State
- Clear visual focus indicator with enhanced border using `$color-border-focus-default` (#2e3030)
- Focus state maintains high contrast for keyboard navigation visibility
- Text cursor shows active text insertion point
- Focus ring meets WCAG 2.1 AA contrast requirements
- Error state focus uses `$color-border-focus-error` for additional emphasis

### Keyboard Navigation
- **Tab**: Moves focus to text area field
- **Shift + Tab**: Moves focus away from text area
- **Enter**: Inserts new line within text area (does not submit)
- **Arrow keys**: Navigate cursor within text content
- **Ctrl/Cmd + A**: Selects all text
- **Ctrl/Cmd + C/V/X**: Standard copy/paste/cut operations
- All interactive elements are keyboard accessible
- Tab order follows logical reading sequence (label → text area → next field)

### Disabled State
- `isDisabled` attribute prevents all interactions
- Visually communicated through:
  - Border: `$color-border-input-disabled` (#d6dbdb)
  - Background: `$color-surface-secondary` (#f5f5f5)
  - Reduced text opacity using `color-text-default-disabled` (#a3a6a8)
- Screen readers announce disabled state
- Excluded from keyboard tab order
- Cursor changes to not-allowed on hover

### Read-Only State
- `isReadOnly` attribute prevents text editing
- Content remains visible and readable
- Screen readers announce read-only state
- Included in tab order for keyboard navigation
- Users can still select and copy text
- Character counter displays current count

### Color Contrast

**Default Surface:**
- Label text: `#45474a` on white = 7.9:1 (WCAG AAA)
- Helper text: `#6b6e70` on white = 4.8:1 (WCAG AA)
- Error text: `#cc1700` on white = 4.7:1 (WCAG AA)
- Border default: `#b5b8ba` on white = 3.1:1 (WCAG AA for UI components)
- All text sizes 14px+ meet WCAG Level AA requirements

**Inverted Surface:**
- Label text: `#ffffff` on dark = High contrast (WCAG AAA)
- Error text: `#ff9487` on dark = High contrast (WCAG AA)
- Border colors adjusted to maintain equivalent contrast ratios
- All inverted colors meet WCAG AA standards for their context

**Error State:**
- Error state uses both color and icon for accessibility (not color-dependent)
- Error icon provides visual indicator beyond color alone
- Error messages are announced immediately to screen readers

### Screen Reader Support
- Label properly associated with text area via `label` prop
- Required indicator (*) announced as "required field"
- Character counter linked via `aria-describedby`
- Character count updates announced as user types (may be debounced)
- Error messages announced immediately via `aria-invalid` and `aria-errormessage`
- Placeholder text announced when text area is empty
- State changes (disabled, read-only, error) announced to assistive technology
- Multi-line nature communicated via proper semantic HTML (textarea element)

## Usage Guidelines

### When to Use
- Collecting multi-line text input from users
- Comments, descriptions, or feedback forms
- Bio or profile information fields
- Any text entry requiring more than one line (paragraphs)
- Content that benefits from visible character limits

### When Not to Use
- Single-line text input (use Text Input component)
- Selecting from predefined options (use Dropdown or Select)
- Rich text editing with formatting (use Rich Text Editor)
- Code input requiring syntax highlighting (use Code Editor)
- Binary choices (use Checkbox or Toggle)

### Best Practices

1. **Label clarity**: Always provide clear, concise labels describing expected content
2. **Required fields**: Use asterisk and `isRequired` for mandatory fields
3. **Character limits**: Set reasonable `maxLength` based on content needs
4. **Character counter**: Display remaining/used characters to guide users
5. **Error messages**: Write specific, actionable error messages
6. **Placeholder text**: Use brief hints about expected format or example content
7. **Minimum height**: Ensure sufficient initial height for typical content length
8. **Read-only vs disabled**: Use read-only for viewable data, disabled for unavailable actions
9. **Validation timing**: Validate on blur or submit, not during active typing
10. **Error state**: Show errors only after user interaction or form submission
11. **Surface variant**: Match surface to background for proper contrast
12. **Resize behavior**: Consider whether users can manually resize (browser default) or lock dimensions

### Content Guidelines

- **Label length**: Keep labels concise (1-3 words when possible)
- **Character limits**: Common limits: 200 for short descriptions, 500-1000 for longer content
- **Placeholder examples**: Show format or sample content without full instructions
- **Error messages**: Be specific ("Message must be at least 10 characters" vs "Invalid input")
- **Helper text**: Clarify character limits or format requirements upfront
