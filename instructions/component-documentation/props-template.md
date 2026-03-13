<!-- 
IMPORTANT:First, create a folder with the component name. Then create a MD document with the following convention: "component-name-props.md" Then continue with the next instructions.

Please create the documentation for this component using Figma MCP: [component-figma-link]

Follow the instructions in #file:props-template.md
-->



## Overview
<!-- 
IMPORTANT: Make it no longer than 200ch.
-->
## Component Properties

<!-- 
IMPORTANT: All components should use React Aria for accessibility.
Include both component-specific props AND React Aria attributes in separate tables:
1. Props table: Component-specific properties (that matches the React Canonical API model)
2. React Aria Properties table: Accessibility attributes (aria-*, role, etc.)
-->
### Props
### React Aria Properties

## Size Variants
<!-- 
IMPORTANT: Use typography token names from Figma text style descriptions instead of individual properties.
Format: - **Typography**: `$typography-token-name` (description with font family, size, weight, line height)
Example: - **Typography**: `$typography-other-cta-md` (Lexend Medium, 16px, weight 500, line height 1)
DO NOT list font properties separately (font, font size, font weight, line height).
-->
<!-- 
IMPORTANT: DO NOT use raw unit values for sizing/spacing for Icon Size properties. Use the Web Code Syntax of the variable applied to the component. E.g. Instead of saying:
Icon Size: 20x20px, you should use `$size-height-icon-sm` (20x20px)
-->

## Kind Variants

## State Variants

## Surface Variants

## Boolean Properties
<!-- These are not fixed for all components and are dynamic depending on the selected component. Here are some props that could repeat accross components (but don't necessarily apply for all): isDisabled, withError, labeled, tooltip, leadingIcon, placeholder, trailingIcon, showHelper. If they don't exist in the figma component do not include it.-->

## Icons

## Typography

## Visual Characteristics

## Accessibility
<!-- 
Include these subsections and reference the React Aria Properties:
- ### Focus State: Describe focus ring appearance and how keyboard navigation or assistive technology triggers focus
- ### Keyboard Navigation: List keyboard interactions (Tab, Enter, Space, Arrow keys, Escape, etc.)
- ### Disabled State: Explain disabled appearance and screen reader announcements
- ### Color Contrast: Document WCAG compliance and contrast ratios for all states
-->
### Focus State
### Keyboard Navigation
### Disabled State
### Color Contrast

## Usage Guidelines
