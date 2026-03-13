# Toast Component

Toasts communicate confirmation of an action or a low-priority message that auto-dismisses.

## Component Properties

### ToastProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique identifier for the toast |
| `status` | `'action' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'action'` | Status variant determining icon and color |
| `message` | `string` | required | Primary message text |
| `description` | `string` | — | Optional secondary description |
| `icon` | `React.ReactNode` | — | Custom leading icon (only for `action` status) |
| `action` | `{ label: string; onClick: () => void }` | — | Action button config |
| `onClose` | `(id: string) => void` | — | Close callback |
| `animationState` | `'entering' \| 'visible' \| 'exiting'` | `'visible'` | Animation transition state |
| `className` | `string` | — | Additional CSS class names |

### ToasterProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxVisible` | `number` | `3` | Maximum toasts visible at once |
| `defaultDuration` | `number` | `4000` | Auto-dismiss duration in ms |

### Imperative API: `toast()`

| Method | Signature | Description |
|--------|-----------|-------------|
| `toast()` | `(message: string, opts?: ToastOptions) => string` | Action feedback toast |
| `toast.success()` | `(message: string, opts?: ToastOptions) => string` | Success variant |
| `toast.error()` | `(message: string, opts?: ToastOptions) => string` | Error variant |
| `toast.warning()` | `(message: string, opts?: ToastOptions) => string` | Warning variant |
| `toast.info()` | `(message: string, opts?: ToastOptions) => string` | Informative variant |
| `toast.loading()` | `(message: string, opts?: ToastOptions) => string` | Loading variant (no auto-dismiss) |
| `toast.promise()` | `(promise, { loading, success, error }, opts?) => string` | Promise-based toast |
| `toast.dismiss()` | `(id: string) => void` | Dismiss by ID |
| `toast.dismissAll()` | `() => void` | Dismiss all toasts |

## Status Variants

| Status | Icon | Icon Color Token |
|--------|------|------------------|
| `action` | Circle (or custom) | `$color-icon-default-primary-inverted` |
| `info` | Info circle | `$color-icon-info-high-contrast-inverted` |
| `success` | Check circle | `$color-icon-success-high-contrast-inverted` |
| `warning` | Alert triangle | `$color-icon-warning-high-contrast-inverted` |
| `error` | Alert circle | `$color-icon-error-high-contrast-inverted` |
| `loading` | Animated loader | `$color-icon-default-primary-inverted` |

## Visual Characteristics

| Property | Token | Value |
|----------|-------|-------|
| Background | `$color-background-accent-strongest` | #0f3d42 |
| Text | `$color-text-default-primary-inverted` | white |
| Action text | `$color-links-default-inverted` | #e0edf0 |
| Border radius | `$radius-md` | 8px |
| Shadow | `$elevation-xl` | Multi-layer drop shadow |
| Padding | `$spacing-sm` / `$spacing-md` | 12px / 16px |
| Icon size | `$size-height-icon-md` | 24px |
| Max width | — | 360px |
| Message typography | `desktop-typography-text-md-regular` | Lexend 16px/1.5 Regular |
| Action typography | `desktop-typography-utility-cta-sm` | Lexend 14px/1 Medium |
| Progress bar | `$color-graphics-complementary-6` | #00adad |

## Positioning

- **Desktop** (>=768px): Fixed bottom-right, 32px offset
- **Mobile** (<768px): Fixed bottom-center, full width with 16px padding

## Accessibility

- **ARIA**: `role="status"`, `aria-live="polite"`, `aria-atomic="true"`
- **Loading**: `aria-busy="true"`, progress bar with `role="progressbar"`
- **Close button**: `aria-label="Close notification"`
- **Keyboard**: Close button is focusable and activatable via Enter/Space
- **Auto-dismiss**: Timers pause on hover for accessibility
- **Color contrast**: All text uses inverted tokens on dark background (WCAG AA compliant)

## Usage Guidelines

- Use toasts for brief, non-critical confirmations (e.g., "Item added to cart")
- Use `toast.error()` for failed actions, not for form validation errors
- Use `toast.loading()` + `toast.promise()` for async operations
- Keep messages concise (1-2 lines max at 360px width)
- Avoid stacking more than 3 toasts simultaneously
- For persistent/critical messages, use an inline alert component instead
