# Project Guidelines

## Project structure
- This is an Angular portfolio app. Keep page-specific code in `src/app/pages/` and reusable UI or feature code in the corresponding `components/`, `features/`, and `shared/` folders.
- Follow the existing standalone component and NgRx patterns; avoid introducing new state-management or UI dependencies without a clear need.

## Angular CLI
- Use the Angular CLI to generate new Angular files whenever a matching schematic exists. Do not hand-create components, services, directives, pipes, guards, interceptors, resolvers, modules, or other CLI-supported artifacts.
- Use the project's local CLI from the workspace root, for example `npm run ng -- generate component pages/example`. Check the project's package manager and CLI help for the right command and options.
- Inspect the target path and use `--dry-run` when useful before generating. Review generated files and adapt them to nearby project patterns; do not overwrite existing files without checking their contents.
- Load and follow the `angular-cli` skill for Angular file generation when it is available. If the CLI is unavailable or no matching schematic exists, report the blocker and only hand-create files when no schematic applies or the user explicitly requests it.

## Code style
- Use strict TypeScript and the existing two-space indentation and single-quoted TypeScript strings.
- Keep templates and styles with their components when that matches neighboring files.
- Prefer small, focused changes and preserve existing behavior outside the requested scope.

## Build and test
- `npm run lint` checks TypeScript and Angular templates with ESLint.
- `npm run build` generates the environment files and runs the development build.
- `npm run build:prod` runs the production build.
- `npm test -- --watch=false` runs the Angular unit tests once.
- Add or update focused tests for behavior changes, and report any validation that cannot be run.

## Safety
- Do not read, print, or commit `.env` values or generated environment files.
- Preserve unrelated working-tree changes.
