---
name: aquila
description: Use when working with Aquila / Angular Brand Kit (NDBX) components from @allianz/ng-aquila. Covers imports, usage patterns, form handling, grid layout, and component API.
---

# Aquila – Angular Brand Kit Component Library

Aquila (open source) / Angular Brand Kit (formerly NDBX) is the Allianz Design System
component library for Angular. Use modern Angular (v19+) patterns:
standalone components, signals, new control flow (`@if`, `@for`), `inject()`, etc.

## Import Rules
Aquila components are standalone. Import the component directly:

```ts
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';

@Component({
  imports: [NxButtonComponent, NxFormfieldComponent, NxInputDirective],
})
```

Import path pattern: `@allianz/ng-aquila/{component-name}`

## Aquila-Specific Rules
- Never use `NxInputDirective` without wrapping `<input nxInput>` in `<nx-formfield>`
- Use `<nx-error nxFormfieldError>` for validation messages inside formfields
- Always set `type="button"` on `<button nxButton>` to prevent accidental form submission
- Prefer Reactive Forms with Aquila form components
- Do not use inline CSS styles; rely on Aquila's built-in styling

## Formfield with Validation (Reactive Forms)
```html
<form [formGroup]="form">
  <nx-formfield label="Email">
    <input nxInput formControlName="email" type="email" />
    @if (form.controls.email.errors) {
      <nx-error nxFormfieldError>Please enter a valid email</nx-error>
    }
  </nx-formfield>
</form>
```

## Dropdown
```html
<nx-formfield label="Country">
  <nx-dropdown formControlName="country">
    <nx-dropdown-item value="DE">Germany</nx-dropdown-item>
    <nx-dropdown-item value="CH">Switzerland</nx-dropdown-item>
    <nx-dropdown-item value="AT">Austria</nx-dropdown-item>
  </nx-dropdown>
</nx-formfield>
```

## Modal Dialog
```ts
import { NxModalService } from '@allianz/ng-aquila/modal';

const modalRef = inject(NxModalService).open(MyDialogComponent);
modalRef.afterClosed().subscribe(result => { /* handle result */ });
```

## Grid System
12-column responsive grid. `nxCol` accepts comma-separated breakpoint values
in order: tiny, small, medium, large, xlarge, 2xlarge, 3xlarge.

```html
<div nxLayout="grid">
  <div nxRow>
    <div nxCol="12,12,6">Left</div>
    <div nxCol="12,12,6">Right</div>
  </div>
</div>
```

## Most Used Components
| Component | Selector |
|-----------|----------|
| formfield | `nx-formfield` |
| input | `input[nxInput]` |
| button | `button[nxButton]` |
| icon | `nx-icon` |
| dropdown | `nx-dropdown` |
| checkbox | `nx-checkbox` |
| grid | `[nxLayout]` |
| headline | `[nxHeadline]` |
| copytext | `[nxCopytext]` |
| link | `nx-link` |
| accordion | `nx-accordion` |
| popover | `[nxPopoverTriggerFor]` |
| badge | `nx-badge` |
| datefield | `input[nxDatefield]` |
| modal | `nx-modal` |
| message | `nx-message` |
| data-display | `nx-data-display` |
| table | `[nxHeaderCell]` |
| tabs | `nx-tab` |
| list | `ul[nxList]` |
| radio-toggle | `nx-radio-toggle` |
| tooltip | `[nxTooltip]` |
| switcher | `nx-switcher` |
| spinner | `nx-spinner` |
| pagination | `nx-pagination` |

## Find Components by Use Case
- **form**: autocomplete, checkbox, circle-toggle, code-input, datefield, dropdown, file-uploader, formfield, input, natural-language-form, phone-input, radio-toggle, rating, slider, switcher, timefield
- **navigation**: breadcrumb, header, menu, tabs, pagination
- **table**: comparison-table, dynamic-table, table
- **feedback**: badge, indicator, message, modal, notification-panel, progress-stepper, progressbar, spinner, tooltip
- **layout**: accordion, card, footer, grid, sidepanel, small-stage, toolbar
- **overlay**: modal, overlay, popover
- **media**: avatar, icon, image, video
- **interaction**: action, button, link, page-search, signal-button
- **selection**: checkbox, circle-toggle, dropdown, radio-toggle, taglist

## Detailed API
For full component API (inputs, outputs, methods) and code examples,
use the `search-ndbx-components` MCP tool, or read the component doc at:
`node_modules/@allianz/ng-aquila/mcp/generated/components/{component-name}.md`
