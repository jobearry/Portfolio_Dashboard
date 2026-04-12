---
name: angular-signals-patterns
globs:
  - "src/**/*.ts"
---

- Use signal() for local reactive state instead of class properties

- Use computed() for derived state; do not recompute values in templates

- Use effect() only for side effects (logging, API calls, sync tasks)

- Avoid mixing signals and manual subscriptions unnecessarily

- Convert observables to signals using toSignal() when binding to UI

- Keep signal state minimal and normalized

- Do not mutate signal state directly; use set() or update()
