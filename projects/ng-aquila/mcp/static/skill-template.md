# Aquila – Angular Brand Kit Component Library

Aquila (open source) / Angular Brand Kit (formerly NDBX) is the Allianz Design System
component library for Angular.

## Modern Angular
We recommend using modern Angular (v19+) patterns:
standalone components, signals, new control flow (`@if`, `@for`), `inject()`, etc.
For Angular-specific coding conventions, see https://angular.dev/ai/develop-with-ai

## Import Rules
To import any Aquila component, construct the path as follows:
1. Domain: `@allianz`
2. Library: `/ng-aquila`
3. Component: `/{component-name}`

Example: `import { NxButtonModule } from '@allianz/ng-aquila/button';`

## Aquila-Specific Rules
- Never use `NxInput` directive without wrapping it in `nx-formfield`
- Always import `NxInputModule` when using `NxInputDirective`
- Use `nx-error` with `nxFormfieldError` for validation messages inside formfields
- Always set `type="button"` on `<button nxButton>` to prevent accidental form submission
- Prefer Reactive Forms over Template-driven forms with Aquila form components
- Import individual component modules to optimize bundle size
- Do not use inline CSS styles; rely on Aquila's built-in styling and utility classes

## Grid System
Aquila uses a 12-column responsive grid with `nxLayout`, `nxRow`, and `nxCol`.
The `nxCol` attribute accepts comma-separated values for responsive breakpoints
in order: tiny, small, medium, large, xlarge, 2xlarge, 3xlarge.
If fewer values are provided, the last one repeats for remaining breakpoints.

### Two-column layout (full width on mobile, half on desktop)
```html
<div nxLayout="grid">
  <div nxRow>
    <div nxCol="12,12,6">Left content</div>
    <div nxCol="12,12,6">Right content</div>
  </div>
</div>
```

### Three-column form layout
```html
<div nxLayout="grid">
  <div nxRow>
    <div nxCol="12,4">
      <nx-formfield label="First name">
        <input nxInput type="text" />
      </nx-formfield>
    </div>
    <div nxCol="12,4">
      <nx-formfield label="Last name">
        <input nxInput type="text" />
      </nx-formfield>
    </div>
    <div nxCol="12,4">
      <nx-formfield label="Email">
        <input nxInput type="email" />
      </nx-formfield>
    </div>
  </div>
</div>
```

## Component Catalog
{{CATALOG}}

## Find Components by Use Case
{{TAGS}}

## Detailed API
For full component API (inputs, outputs, methods) and code examples,
use the `search-ndbx-components` MCP tool, or read the component doc at:
`node_modules/@allianz/ng-aquila/mcp/generated/components/{component-name}.md`
