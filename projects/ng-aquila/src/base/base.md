---
title: Base Components
description: Base label and error message components
category: components
b2c: true
expert: true
stable: done
alias: label, error
a1Full: true
group: Layout
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

<div class="docs-a1">

The current Design System enforces `appearance="text"`

</div>

<!-- example(error) -->

#### Inverse

The inverse version of the error can be used on a dark background. Set it via the `inverse` property. When
you leave it unset, the error follows the surface it is placed on (see `nxSurface`), so an error inside a
dark surface inverts on its own.

<!-- example(error-inverse) -->

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

The inverse version of the label can be used on a dark background. Set it via the `inverse` property. When
you leave it unset, the label and its hint follow the surface they are placed on (see `nxSurface`), the same
way the error does.

<div class="docs-deprecation-warning">
  <strong>Deprecated: </strong>
  The <code>negative</code> property is deprecated. Use <code>inverse</code> instead; setting either one still applies the inverse styles, so existing usages keep working.
</div>

Set `optionalLabel` to indicate that the associated form control is not mandatory. The text is always rendered wrapped in parentheses.

Set `hint` to show a supplementary line of text below the label. It automatically adjusts to the `inverse` and `disabled` states.

The label describes a control it does not own, so it cannot wire the hint up itself. It exposes the rendered hint's id as the `hintId` signal (`null` when there is no hint), which the control merges into its own `aria-describedby`. `nx-checkbox-group`, `nx-radio-group`, `nx-tile-group`, `nx-toggle-button-group` and `nx-file-uploader` already do this; when you place a label next to a control yourself, read `hintId` and set `aria-describedby` on that control.

<!-- example(label) -->

#### Info icon

A label can show an info icon next to its text. Project an info-icon component into the label and mark it with the `nxLabelInfo` directive. Use the standard `nx-info-icon` (from `@allianz/ng-aquila/info-icon`) for the common case, or project your own implementation — the projected component keeps full control over its own API (popover direction, width, modal behaviour, etc.). The icon is rendered as a sibling of the `<label>` element (never nested inside it) so it stays accessible.

<!-- example(label-info-icon) -->
