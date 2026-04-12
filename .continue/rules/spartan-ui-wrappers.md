---
name: spartanui-wrapper-components
globs:
  - "libs/ui/**/*"
---

- Wrap Spartan UI primitives into reusable app-level components

- Expose only necessary inputs/outputs; do not leak internal implementation

- Provide sensible defaults for styling and behavior

- Keep wrappers dumb and reusable across modules

- Avoid coupling wrappers to specific business logic

- Document inputs and expected usage via comments or typings
