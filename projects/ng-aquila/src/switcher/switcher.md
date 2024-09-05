---
title: Switcher
category: components
b2c: true
expert: true
stable: done
alias: slide toggle, checkbox
---

The switcher component represents a boolean value, just like the native input of a checkbox.

### Default

The default representation of the switcher does not include an icon.

<!-- example(switcher-default) -->

### Large

This alternative representation of the switcher component is not only larger, but also includes an icon.

<!-- example(switcher-large) -->

### Label size

The font size of the label can be set to two different sizes with the `[labelSize]` property

<!-- example(switcher-label-small) -->

### Negative

This is a negative version of the switcher, which can be used on dark background.

<!-- example(switcher-negative) -->

### Label on the left

In case the label of the switcher should be positioned on the left the property `[labelPosition]` can be used. If the property is set to "left" the switcher is aligned on the right and the label on the left side.

<!-- example(switcher-label-left) -->

### Template-driven form

The switcher component can be used in model driven forms.

<!-- example(switcher-template-driven) -->

### Reactive form

The switcher component can be used in reactive forms.

<!-- example(switcher-reactive-form) -->

### Disabled

<!-- example(switcher-disabled) -->

### Expert: Readonly
<div class="docs-deprecation-warning">
  <strong>Expert only: </strong>
  Please note that the readonly option is only for expert/internal applications because of accessibility restrictions. There is currently no solution for readonly states that is accepted for retail applications.
</div>
<!-- example(switcher-readonly) -->

### Accessibility
If your switcher button doesn't have any accompanying label text,
it's recommended to use `ariaLabel` or `ariaLabelledBy`
inputs to provide helpful information for users relying on screen readers or other assistive technologies."
