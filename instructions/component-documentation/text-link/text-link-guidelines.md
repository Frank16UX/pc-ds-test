## Usage Guidelines

### When to Use
- For inline navigation within text content
- For secondary actions that don't require button prominence
- For links that navigate to external resources
- For download links or document references

### Best Practices
1. Use descriptive label text that clearly indicates the link destination
2. Keep link text concise and actionable
3. Choose the appropriate size based on context and hierarchy
4. Use inverted surface variant when placing on dark backgrounds
5. Include icons only when they add meaningful context
6. Ensure sufficient color contrast for accessibility

### Icon Usage
- **Leading Icons**: Use for categorization or type indication (e.g., file types, external links)
- **Trailing Icons**: Use for directional cues (e.g., navigation, downloads)
- Keep icon meanings consistent across the application

## State Combinations

The component supports 30 unique combinations:
- 3 sizes × 5 states × 2 surfaces = 30 variants

All combinations maintain consistent visual hierarchy and accessibility standards.

## Color Reference

### Default Surface
| State | Variable Name | Hex Value |
|-------|---------------|-----------|
| Default | `$color-links-default` | #2B7A87 |
| Hover | `$color-links-hovered` | #1A5961 |
| Focus | `$color-links-default` | #2B7A87 |
| Pressed | `$color-links-pressed` | #0F3D42 |
| Disabled | `$color-text-default-disabled` | #A3A6A8 |

### Inverted Surface
| State | Variable Name | Hex Value |
|-------|---------------|-----------|
| Default | `$color-links-default-inverted` | #E0EDF0 |
| Hover | `$color-links-hovered-inverted` | #D9E8ED |
| Focus | `$color-links-default-inverted` | #E0EDF0 |
| Pressed | `$color-links-pressed-inverted` | #BFE3E8 |
| Disabled | `$color-text-default-disabled-on-surface` | #6B6E70 |
