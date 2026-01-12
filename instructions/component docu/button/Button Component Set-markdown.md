# Button Component Set

A comprehensive button component with multiple hierarchies (primary, secondary, tertiary, destructive), two sizes (sm, lg), seven interactive states, and support for leading/trailing icons, flags, and loading indicators. Includes variants for both default and inverted surfaces.

## Usage

General purpose component for design systems

## Properties

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Size | `variant` | `undefined` | No | Controls the button size |
| Hierarchy | `variant` | `undefined` | No | Defines the visual importance and style of the button |
| State | `variant` | `undefined` | No | Interactive state of the button |
| Surface | `variant` | `undefined` | No | Background context for the button (affects color contrast) |
| ⬅️ Icon leading | `boolean` | `undefined` | No | Shows/hides icon on the left side of the button text |
| ➡️ Icon trailing | `boolean` | `undefined` | No | Shows/hides icon on the right side of the button text |
| Flag | `boolean` | `undefined` | No | Shows/hides flag indicator on the button |
| ✏️ Label | `text` | `undefined` | No | Main button text label |
| ✏️ Destructive Label | `text` | `undefined` | No | Text label for destructive actions |
| 🔀 Icon leading swap | `instance-swap` | `undefined` | No | Allows swapping the leading icon component |
| 🔀 Icon trailing swap | `instance-swap` | `undefined` | No | Allows swapping the trailing icon component |

## States

- `default`
- `hover`
- `focus`
- `pressed`
- `loading`
- `success`
- `disabled`

## MCP Server Readiness

**Score:** 95/100

**Recommendations:**
- Add component properties for customization and reuse
- Replace remaining hard-coded colors and spacing with design tokens

