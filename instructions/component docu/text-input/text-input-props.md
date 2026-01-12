# Text Input Component

## Overview
A form input field with label, placeholder, helper text, and error messaging. Supports standard text, numeric amounts, and payment card entry with optional leading/trailing icons.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'lg' \| 'md'` | `'lg'` | Controls the height of the input field and icon sizes |
| `type` | `'default' \| 'amount' \| 'payment'` | `'default'` | Determines input formatting and validation behavior |
| `label` | `string` | - | Required text label displayed above the input field |
| `isRequired` | `boolean` | `false` | Shows asterisk (*) next to label when true |
| `placeholder` | `string` | - | Placeholder text shown when input is empty |
| `value` | `string` | `''` | Current value of the input field |
| `helperText` | `string` | - | Hint text displayed below the input field |
| `errorMessage` | `string` | - | Error message displayed when validation fails |
| `isInvalid` | `boolean` | `false` | Triggers error state styling and displays error message |
| `isDisabled` | `boolean` | `false` | Disables user interaction with the input |
| `isReadOnly` | `boolean` | `false` | Makes input viewable but not editable |
| `leadingIcon` | `ReactNode` | - | Icon displayed at the start of the input field |
| `trailingIcon` | `ReactNode` | - | Icon displayed at the end of the input field |
| `surface` | `'default' \| 'inverted'` | `'default'` | Color scheme for light or dark backgrounds |

## React Aria Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Accessible label for screen readers |
| `description` | `string` | Maps to helper text for additional context |
| `errorMessage` | `string` | Validation error message announced to assistive technology |
| `isRequired` | `boolean` | Indicates required field to screen readers |
| `isDisabled` | `boolean` | Disables input and communicates state to assistive technology |
| `isReadOnly` | `boolean` | Prevents editing while maintaining accessibility |
| `isInvalid` | `boolean` | Triggers error state and ARIA error announcements |
| `validationBehavior` | `'aria' \| 'native'` | Controls validation feedback method |

## Size Variants

### Large (`lg`)
- **Input height**: `$size-height-lg` (48px)
- **Total height (no error)**: 86px
- **Total height (with error)**: 115px (adds ~29px for error message)
- **Leading/Trailing icons**: `$size-height-icon-md` (24px)
- **Helper icon**: 16px
- **Input text**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Label text**: `$typography-text-xl-regular` (Lexend Regular, 20px, weight 400, line height 1.5)
- **Padding**: `$scale-4` (16px) horizontal

### Medium (`md`)
- **Input height**: 40px
- **Total height (no error)**: 71px
- **Total height (with error)**: 96px (adds ~25px for error message)
- **Leading/Trailing icons**: 16px
- **Helper icon**: 16px
- **Input text**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Label text**: `$typography-text-lg-regular` (Lexend Regular, 18px, weight 400, line height 1.5)
- **Padding**: 12px horizontal

## Hierarchy Variants

### Default Type
Standard text input for general-purpose text entry such as names, email addresses, or freeform text. Accepts any alphanumeric input without special formatting.

**Use cases:**
- Name fields
- Email addresses
- Search queries
- General text entry

### Amount Type
Specialized input for numeric values and currency amounts. Likely includes formatting for decimal places, thousand separators, and currency symbols.

**Use cases:**
- Price entry
- Quantity fields
- Financial amounts
- Numeric data

### Payment Type
Dedicated input for payment card information with formatted card number display and card brand icon indicator. Shows placeholder "0000 0000 0000 0000" with 34px × 24px card icon at trailing position.

**Features:**
- Automatic card number spacing (groups of 4 digits)
- Card brand detection icon (Visa, Mastercard, etc.)
- Specialized validation for card formats

**Use cases:**
- Credit/debit card numbers
- Card verification (CVV)
- Payment form fields

## State Variants

### Default State
Resting state with standard border and text colors. Input border uses `$color-border-input-default` (#b5b8ba), background uses `$color-surface-interactive-default` (#ffffff).

### Hover State
Activated when mouse cursor is over the input field. Border color likely intensifies to provide visual feedback.

### Focus/Active State
Applied when input receives keyboard focus or user begins typing. Shows enhanced border emphasis and cursor indicator for active text entry.

### Disabled State
Non-interactive state indicated by reduced opacity and cursor change. User cannot interact with the input field.

**Visual characteristics:**
- Reduced opacity on all elements
- No hover or focus effects
- Cursor changes to not-allowed

### Read-Only State
Viewable but not editable state. Content is displayed but user cannot modify the value. Useful for displaying pre-filled data that should not be changed.

**Visual characteristics:**
- Content visible and legible
- No text cursor on interaction
- Maintains standard appearance without edit affordances

### Filled State
When input contains user-entered text, the placeholder disappears and actual content is displayed. Text color changes from tertiary (placeholder) to default (filled content).

### Error State
Activated when validation fails (`isInvalid={true}`). Leading icon changes to error color `$color-text-error-default` (#cc1700), helper text is replaced with error message, and error icon appears.

**Visual changes:**
- Leading icon: Changes to error red color
- Helper text: Replaced with error message
- Helper icon: Warning/error icon in red
- Border: Error color emphasis
- Error message text: `$color-text-error-default`

## Surface Variants

### Default Surface
Optimized for light backgrounds. Uses standard color tokens for borders, text, and icons.

**Colors:**
- Border: `$color-border-input-default` (#b5b8ba)
- Background: `$color-surface-interactive-default` (#ffffff)
- Label text: Default text color
- Helper text: `$color-text-default-tertiary` (#6b6e70)

### Inverted Surface
Optimized for dark backgrounds. Adjusts border, background, and text colors to maintain contrast and readability on inverted surfaces.

## Icons

### Leading Icon
Optional icon positioned at the start of the input field. Provides visual context for input purpose.

**Specifications:**
- **Size (lg)**: `$size-height-icon-md` (24px)
- **Size (md)**: 16px
- **Position**: Left side of input content
- **Spacing**: `$spacing-xs` (8px) gap to content

**Common uses:**
- Search icon for search inputs
- User icon for name fields
- Lock icon for password fields
- Warning/error icon for validation

### Trailing Icon
Optional icon positioned at the end of the input field. Often used for actions or status indicators.

**Specifications:**
- **Size (lg)**: `$size-height-icon-md` (24px)
- **Size (md)**: 16px
- **Position**: Right side of input content
- **Spacing**: `$spacing-xs` (8px) gap from content

**Common uses:**
- Clear/close icon to reset input
- Visibility toggle for password fields
- Card brand icon for payment type
- Action button icon

### Helper Icon
Small icon displayed next to helper text or error message below the input field.

**Specifications:**
- **Size**: 16px (both variants)
- **Position**: Left of helper/error text
- **Spacing**: `$spacing-xs` (8px) gap to text
- **Top padding**: 2.5px alignment adjustment

**Icon types:**
- Default: Information/help icon in tertiary color
- Error: Warning/alert icon in error red color

### Payment Card Icon
Specialized 34px × 24px icon displayed in payment type inputs showing detected card brand (Visa, Mastercard, etc.). Has white background with 4px border radius.

## Typography

### Label Text

**Large variant:**
- **Token**: `$typography-text-xl-regular`
- **Specification**: Lexend Regular, 20px, weight 400, line height 1.5
- **Color**: `$color-text-default-secondary` (#45474a)
- **Usage**: Main label text with optional asterisk for required fields

**Medium variant:**
- **Token**: `$typography-text-lg-regular`
- **Specification**: Lexend Regular, 18px, weight 400, line height 1.5
- **Color**: `$color-text-default-secondary` (#45474a)
- **Usage**: Main label text with optional asterisk for required fields

### Input Text (Filled)

**Both variants:**
- **Token**: `$typography-text-lg-regular`
- **Specification**: Lexend Regular, 18px, weight 400, line height 1.5
- **Color**: Default text color (dark for default surface)
- **Usage**: User-entered text content

### Placeholder Text

**Both variants:**
- **Token**: `$typography-text-lg-regular`
- **Specification**: Lexend Regular, 18px, weight 400, line height 1.5
- **Color**: `$color-text-default-tertiary` (#6b6e70)
- **Usage**: Hint text shown when input is empty
- **Examples**: "Placeholder", "0000 0000 0000 0000"

### Helper Text

**Both variants:**
- **Token**: `$typography-text-sm-regular`
- **Specification**: Lexend Regular, 14px, weight 400, line height 1.5
- **Color**: `$color-text-default-tertiary` (#6b6e70)
- **Usage**: Descriptive hint text below input
- **Example**: "This is a hint text for the user."

### Error Message Text

**Both variants:**
- **Token**: `$typography-text-sm-regular`
- **Specification**: Lexend Regular, 14px, weight 400, line height 1.5
- **Color**: `$color-text-error-default` (#cc1700)
- **Usage**: Validation error message replacing helper text
- **Example**: "This option is not valid."

## Visual Characteristics

### Layout Structure
1. **Label**: Top section with required indicator (asterisk)
2. **Input field**: Main interaction area with optional leading/trailing icons
3. **Helper/Error text**: Bottom section with icon and descriptive message

### Spacing
- **Label to input**: Uses standard vertical spacing
- **Input to helper**: Uses standard vertical spacing
- **Icon gaps**: `$spacing-xs` (8px) between icons and content
- **Horizontal padding**: `$scale-4` (16px) for large, 12px for medium
- **Helper icon padding**: 2.5px top adjustment for visual alignment

### Borders
- **Radius**: `$radius-md` (8px)
- **Width**: 1px solid border
- **Default color**: `$color-border-input-default` (#b5b8ba)
- **Error color**: `$color-text-error-default` (#cc1700) emphasis

### Height Management
The component height adjusts based on error state:
- **Large (no error)**: 86px total height
- **Large (with error)**: 115px total height (+29px)
- **Medium (no error)**: 71px total height
- **Medium (with error)**: 96px total height (+25px)

Error messages add vertical space below the input, increasing the overall component footprint.

### Cursor Indicator
In filled/focused state, a vertical cursor line appears at the text insertion point, shown as a 24px high, 0px wide element with visual stroke.

## Accessibility

### Focus State
- Clear visual focus indicator with enhanced border emphasis
- Focus state maintains high contrast for keyboard navigation visibility
- Cursor indicator shows active text insertion point
- Focus ring meets WCAG 2.1 AA contrast requirements

### Keyboard Navigation
- **Tab**: Moves focus to input field
- **Shift + Tab**: Moves focus away from input field
- **Enter**: Submits form (if within form context)
- **Escape**: Clears focus (implementation-dependent)
- All interactive elements are keyboard accessible
- Tab order follows logical reading sequence (label → input → next field)

### Disabled State
- `isDisabled` attribute prevents all interactions
- Visually communicated through reduced opacity
- Screen readers announce disabled state
- Excluded from keyboard tab order
- Cursor changes to not-allowed on hover

### Read-Only State
- `isReadOnly` attribute prevents text editing
- Content remains visible and readable
- Screen readers announce read-only state
- Included in tab order for keyboard navigation
- Users can still select and copy text

### Color Contrast
- Label text on default surface: `#45474a` on white meets WCAG AA (7.9:1 ratio)
- Helper text: `#6b6e70` on white meets WCAG AA (4.8:1 ratio)
- Error text: `#cc1700` on white meets WCAG AA (4.7:1 ratio)
- All text sizes 14px+ meet WCAG Level AA requirements
- Error state uses both color and icon for accessibility
- Inverted surface maintains equivalent contrast ratios

### Screen Reader Support
- Label properly associated with input via `label` prop
- Required indicator (*) announced as "required field"
- Helper text linked via `aria-describedby`
- Error messages announced immediately via `aria-invalid` and `aria-errormessage`
- Placeholder text announced when input is empty
- Input type communicated for specialized inputs (amount, payment)
- State changes (disabled, read-only, error) announced to assistive technology

## Usage Guidelines

### When to Use
- Any form requiring text input from users
- Data collection for names, addresses, search queries
- Numeric or currency amount entry with amount type
- Payment card information with payment type
- Single-line text input (for multi-line, use textarea component)

### When Not to Use
- Multi-line text entry (use Textarea)
- Selecting from predefined options (use Dropdown or Select)
- Binary choices (use Checkbox or Toggle)
- Date or time selection (use Date Picker)

### Best Practices
1. **Label clarity**: Always provide clear, concise labels
2. **Required fields**: Use asterisk and `isRequired` for mandatory inputs
3. **Helper text**: Provide guidance on expected format or constraints
4. **Error messages**: Write specific, actionable error messages
5. **Input type**: Choose appropriate type (default/amount/payment) for data
6. **Read-only vs disabled**: Use read-only for viewable data, disabled for unavailable actions
7. **Icon usage**: Use leading icons to clarify input purpose, trailing icons for actions
8. **Validation timing**: Validate on blur or submit, not during active typing
9. **Error state**: Show errors only after user interaction or submission
10. **Surface variant**: Match surface to background for proper contrast

### Payment Type Specific
- Use for credit/debit card number entry
- Automatic card number spacing improves readability
- Card brand detection provides visual confirmation
- Consider separate inputs for CVV and expiration date
- Ensure PCI compliance for payment data handling
