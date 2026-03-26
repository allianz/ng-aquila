# Project Notes

## Overview
ng-aquila is an Angular component library supporting the Allianz design system.

## Project Structure
- `projects/ng-aquila/src/` - Main library source code
- Components are organized in folders by feature (e.g., `dropdown/`, `virtual-scroll/`)
- Each component typically has:
  - `*.ts` - Component logic
  - `*.html` - Template
  - `*.scss` - Styles
  - `*.spec.ts` - Tests
  - `*.md` - Documentation
- example components for the documentation are in `projects/ng-aquila/documentation/examples
  - they are organized per component (entry-point) as the main folder and then each example in a subfolder
  - they can be used by name with a placeholder in the markdown file, e.g. `<!-- example(virtual-scroll-basic) -->`

## Running Tests

### Run tests for a specific component
```bash
npx ng test ng-aquila --include="**/virtual-scroll/**/*.spec.ts" --browsers=ChromeHeadless --watch=false
npx ng test ng-aquila --include="**/dropdown/**/*.spec.ts" --browsers=ChromeHeadless --watch=false
```

### Run all library tests
```bash
npx ng test ng-aquila --browsers=ChromeHeadless --watch=false
```

## Building

### Build the library
```bash
npx ng build ng-aquila
```

## Component Patterns
- Uses Angular signals for reactive state
- Components use `ChangeDetectionStrategy.OnPush`
- Input properties use the `input()` function (signal-based inputs)
- Output events use the `output()` function
- View queries use `viewChild()` / `viewChildren()`

## Naming Conventions
- Protected variables must be prefixed with an underscore (e.g., `protected _myVariable`)
