---
title: Base Components
category: components
b2c: true
expert: true
stable: done
alias: label, error
a1Light: true
a1Densities: true
---

### Error

The `<nx-error>` is a base component to display error messages.

Import it with

<p class="docs-api-module-import">
  <code style="white-space: normal">
    <span class="docs-api-module-import__import-span">import</span>
    { NxErrorModule }
    <span class="docs-api-module-import__from-span">from</span>
    <span class="docs-api-module-import__path-span">'@allianz/ng-aquila/base'</span>;
  </code>
</p>

The module is auto-imported when you use the [formfield](./documentation/formfield), [checkbox](./documentation/checkbox) or [radio-button](./documentation/radio-button) module.

<!-- example(error) -->

If you want to use a custom HTML element for error messages and have it picked up by a component's content projection (e.g. number stepper), you can add `ngProjectAs="nx-error"` to your element. This allows the component to recognize and project your custom error element as if it were an `<nx-error>`.

### Label

The `<nx-label>` is a base component to display a styled label.

Import it with

<p class="docs-api-module-import">
  <code style="white-space: normal">
    <span class="docs-api-module-import__import-span">import</span>
    { NxLabelModule }
    <span class="docs-api-module-import__from-span">from</span>
    <span class="docs-api-module-import__path-span">'@allianz/ng-aquila/base'</span>;
  </code>
</p>

The module is auto-imported when you use the [formfield](./documentation/formfield), [checkbox](./documentation/checkbox) or [radio-button](./documentation/radio-button) module.

<!-- example(label) -->
