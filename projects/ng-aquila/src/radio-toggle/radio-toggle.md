---
title: Segmented Toggle Button
description: Toggle-style radio button group
category: components
b2c: true
expert: true
stable: done
alias: radio toggle, segmented control, button group, toggle group, Toggle Button
a1Full: true
group: Forms & Inputs
---

## Examples

### Basic

<!-- example(radio-toggle) -->

### Inverse

<div class="docs-deprecation-warning">
  <strong><code>variant="negative"</code></strong> is deprecated. Use the <code>inverse</code> input instead.
</div>

For dark backgrounds, use the `inverse` input to apply inverse styling.

<!-- example(radio-toggle-negative) -->

### Custom

Important: If you use only icons or anything else that is not descriptive enough for screen readers, make sure to set a
descriptive `ariaLabel`.

<!-- example(radio-toggle-custom) -->

### Template-driven form with ngModel

<!-- example(radio-toggle-form) -->

### Reactive form

When using reactive forms you have to disable the control with the form control and not the `disabled` property!

<!-- example(radio-toggle-reactive) -->

### Validation

Below you can find an example with a custom validator, which accepts only `B` as a correct option.

<!-- example(radio-toggle-validation) -->

### Size

<div class="docs-deprecation-warning">
  <strong><code>variant="small"</code></strong> is deprecated. Use the <code>size</code> input instead.
</div>

Use the `size` input to choose between the two available sizes. `m` is the default. `s` is a more compact variant with reduced padding, a smaller type style and a lower minimum height.

<!-- example(radio-toggle-size) -->


### Expert: Readonly

<div class="docs-deprecation-warning">
<strong>Expert only: </strong>
  Please note that the readonly option is only for expert/internal applications because of accessibility restrictions. There is currently no solution for readonly states that is accepted for retail applications.
</div>

 <!-- example(radio-toggle-readonly) -->

### Accessibility

If you use only icons or anything else that is not descriptive enough for screen readers, make sure to set a descriptive
`ariaLabel` <a href="documentation/radio-toggle/overview#custom">as shown in the _Custom_ Toggle Buttons example</a>.
