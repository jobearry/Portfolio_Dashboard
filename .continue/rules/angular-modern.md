---
name: angular-modern-patterns
description: Enforce modern Angular (v17+) best practices using standalone APIs, signals, and clean architecture
globs:
  - "src/**/*.ts"
  - "src/**/*.html"
---

- Use standalone components, directives, and pipes; do not use NgModules unless absolutely required

- Prefer Angular signals for local state management:
  - Use signal(), computed(), and effect()
  - Avoid unnecessary RxJS for simple state

- Use RxJS only for:
  - HTTP calls
  - async streams
  - complex event coordination

- Do not manually subscribe to observables in components:
  - Use async pipe in templates
  - Or convert to signals using toSignal()

- Keep components thin:
  - Move business logic to services or state management (e.g., NgRx)

- Use inject() instead of constructor injection where appropriate

- Use strongly typed inputs and outputs:
  - Prefer input() and output() signal-based APIs when available

- Prefer control flow syntax in templates:
  - Use @if, @for, @switch instead of *ngIf, *ngFor

- Avoid complex logic in templates:
  - Move computations to computed() or component properties

- Use OnPush change detection by default (or signal-driven reactivity)

- Use trackBy (or track in @for) for lists to optimize rendering

- Keep folder structure feature-based, not type-based

- Use strict typing:
  - No `any`
  - Define interfaces/models for all data structures

- Use Angular routing with lazy loading:
  - Prefer loadComponent or loadChildren for standalone APIs

- Avoid global state unless necessary:
  - Use signals for local state
  - Use NgRx only for complex shared state

- Use environment-based configuration properly; avoid hardcoding values

- Follow consistent naming conventions:
  - Components: *.component.ts
  - Services: *.service.ts
  - Signals/store: *.store.ts

- Avoid direct DOM manipulation; use Angular bindings and directives

- Keep styles scoped:
  - Prefer component-level styles or utility-first CSS (e.g., Tailwind)

- Ensure accessibility:
  - Use semantic HTML
  - Preserve aria-* attributes
