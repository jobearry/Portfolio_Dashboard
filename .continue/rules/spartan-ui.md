---
name: spartanui-patterns
description: Enforce best practices for Angular apps using Spartan UI components
globs:
  - "src/**/*.ts"
  - "src/**/*.html"
---

- Use Spartan UI components as the primary UI building blocks; avoid mixing with other UI libraries unless necessary

- Prefer composition over customization; wrap Spartan components instead of modifying their internal behavior

- Keep components presentational when using Spartan UI; move business logic to services or NgRx

- Use standalone, reusable UI components when wrapping Spartan primitives

- Follow consistent naming:
  - Prefix custom wrappers with "app-" (e.g., app-button, app-dialog)
  - Keep naming aligned with Spartan semantics

- Do not directly manipulate DOM; rely on Angular bindings and Spartan APIs

- Use Tailwind CSS utility classes for styling; avoid custom CSS unless necessary

- Keep templates declarative and minimal:
  - Avoid complex logic in HTML
  - Use pipes or computed properties instead

- Use proper accessibility practices:
  - Ensure labels, roles, and aria-* attributes are preserved
  - Do not remove accessibility features from Spartan components

- When using dialogs, dropdowns, or overlays:
  - Control state via Angular (signals or component state)
  - Avoid imperative DOM control

- Ensure consistent spacing, layout, and responsiveness using Tailwind utilities

- Avoid duplicating UI patterns; extract reusable components when patterns repeat

- Use typed inputs and outputs for all custom wrapper components

- Co-locate component logic, template, and styles following Angular best practices

- Prefer signals or observable patterns for state binding instead of manual subscriptions

- Avoid inline styles; use Tailwind classes or component-level styling

- Ensure theming consistency; do not override Spartan design tokens arbitrarily
