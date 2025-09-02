# ndbx-mcp Best Practices

These guidelines help you build maintainable, performant, and accessible Angular applications using Allianz's NDBX design system components.

## TypeScript

- Enable strict type checking.
- Prefer type inference when the type is obvious.
- Avoid the `any` type; use `unknown` if the type is uncertain.

## Components

- Keep components small and focused on a single responsibility.
- Use `input()` and `output()` functions instead of decorators.
- Use `computed()` for derived state.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in the `@Component` decorator.
- Prefer inline templates for small components.
- Prefer Reactive Forms over Template-driven forms.
- Use `class` bindings instead of `ngClass`.
- Use `style` bindings instead of `ngStyle`.

## State Management

- Use signals for local component state.
- Use `computed()` for derived state.
- Keep state transformations pure and predictable.

## Templates

- Keep templates simple and avoid complex logic.
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
- Use the async pipe to handle observables.

## Services

- Design services around a single responsibility.
- Use `providedIn: 'root'` for singleton services.
- Use the `inject()` function instead of constructor injection.

## Angular Best Practices

- Use standalone components over NgModules.
- Do not use explicit `standalone: true` (it is implied by default).
- Use signals for state management.
- Implement lazy loading for feature routes.
- Use `NgOptimizedImage` for all static images.
- Use `class` and `style` bindings instead of `ngClass` or `ngStyle`.

## Installation and Setup

- Install with: `ng add @allianz/ngx-ndbx`
- Import individual component modules only when needed to optimize bundle size.

## Autocomplete

- Requires Angular CDK
- Add a `nx-autocomplete` element containing `nx-autocomplete-option` elements. Set the `[value]` of each `nx-autocomplete-option` to the value you want to populate in the input. Export the autocomplete component to a template variable. On your input, use the `nxAutocompleteTrigger` directive (`[nxAutocomplete]`) and bind it to the template variable to connect the input with the autocomplete.
- To use a custom scroll strategy, provide the `NX_AUTOCOMPLETE_SCROLL_STRATEGY` injection token with a factory provider.

## Input Field and Formfield

- Never use `NxInput` directive without a formfield.
- Implement `nx-error` components for validation messages.
- Import `NxInputModule` whenever `NxInputDirective` is used.

**Example:**

```html
<div nxLayout="grid">
    <div nxRow>
        <div nxCol="6">
            <nx-formfield label="Text">
                <input nxInput type="text" />
            </nx-formfield>
        </div>
        <div nxCol="6">
            <nx-formfield label="Password">
                <input nxInput type="password" />
            </nx-formfield>
        </div>
        <div nxCol="6">
            <nx-formfield label="E-Mail">
                <input nxInput type="email" ngModel email />
                <nx-error nxFormfieldError> <strong>Error: </strong>Please type in a valid email address </nx-error>
            </nx-formfield>
        </div>
    </div>
</div>
```

## Accordion

- Use `NxAccordionComponent`, `NxExpansionPanelHeaderComponent`, and `NxExpansionPanelTitleDirective` for structure.
- Use the `multi` option to allow expanding multiple items simultaneously.

**Example:**

```html
<nx-accordion [multi]="multi">
    <nx-expansion-panel>
        <nx-expansion-panel-header>
            <nx-expansion-panel-title>About us</nx-expansion-panel-title>
        </nx-expansion-panel-header>
        <p nxCopytext="normal">Lorem ipsum</p>
    </nx-expansion-panel>
    <nx-expansion-panel>
        <nx-expansion-panel-header>
            <nx-expansion-panel-title>Contact us</nx-expansion-panel-title>
        </nx-expansion-panel-header>
        <p nxCopytext="normal">Lorem ipsum</p>
    </nx-expansion-panel>
</nx-accordion>
```

## Action

- Use `nxAction` to enhance `<a>` or `<button>` elements for styled lists.
- For router integration, add `routerLinkActive="is-selected"` to highlight the active route.
- Use `nx-indicator` to show indicators in `nxAction`.

**Example:**

```html
<nav aria-label="menu">
    @for (action of actions; track action) {
    <button
        nxAction
        (click)="onSelect(action)"
        [selected]="action === selectedAction"
        [attr.aria-label]="getAriaLabel(action.label, $any(action.notificationCount), action.notification)"
    >
        <nx-icon nxActionIcon [name]="action.icon" aria-hidden="true"></nx-icon>
        <span class="label-content">
            {{action.label}} @if (action.notification) {
            <nx-indicator position="after-text"> {{ getIndicatorText($any(action.notificationCount)) }} </nx-indicator>
            }
        </span>
    </button>
    }
</nav>
```

## Button

- Import `NxButtonModule` whenever a button is used.
- Use `nxButton` to set button styles and size.

**Example:**

```html
<button nxButton="primary large" type="button">Primary</button>
```

## Checkbox Group

- Import `NxCheckboxModule ` when using this component.
- Group checkboxes under `nx-checkbox-group` for collective validation. It is used when want to add a label or include an error message

**Example:**

```html
<form [formGroup]="myFormGroup">
    <nx-checkbox-group [(ngModel)]="checkboxes">
        <nx-label>This is a nx-checkbox-group</nx-label>
        <nx-checkbox value="checkbox 1" class="nx-margin-bottom-s">Checkbox 1</nx-checkbox>
        <nx-checkbox value="checkbox 2" class="nx-margin-bottom-s">Checkbox 2</nx-checkbox>
        <nx-checkbox value="checkbox 3">Checkbox 3</nx-checkbox>
    </nx-checkbox-group>
</form>
```

## Circle Toggle

- Use `NxCircleToggleComponent` for selecting one option from a small set (binary or mutually exclusive choices).
- Import `NxCircleToggleModule` when using this component.
- Always provide accessible labels for each toggle option.

**Example:**

```html
<nx-circle-toggle-group>
    @for (item of sampleValues; track item) {
    <nx-circle-toggle [value]="item.value" [icon]="item.icon" [hint]="item.hint" [label]="item.label"></nx-circle-toggle>
    }
</nx-circle-toggle-group>
```

## Date Field

- Use `NxDatefieldComponent` for date input, supporting manual entry and datepicker overlay.
- Import `NxDatefieldModule` when using this component.
- Use a custom `DateAdapter` to support different date formats, locales, or custom parsing/serialization logic. Provide your adapter in the component or app module as needed.

**Example:**

```html
<nx-formfield label="Date">
    <nx-datefield [(ngModel)]="selectedDate" placeholder="dd.mm.yyyy"></nx-datefield>
</nx-formfield>
```

## Layout and Grid System

- Import `NxGridModule` when using grid components.
- Use `nxLayout` for page structure.
- Use `nxRow` inside `nxLayout`
- Prefer the grid system over custom CSS for responsive layouts.
