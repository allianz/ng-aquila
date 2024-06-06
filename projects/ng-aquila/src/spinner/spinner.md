---
title: Spinner
category: components
b2c: true
expert: true
stable: done
alias: progress spinner
---

### Sizes

The spinner is available in three sizes: small, medium, large.

<!-- example(spinner-sizes) -->

### Negative styling

You can apply a negative styling by using the `[negative]` property.

<!-- example(spinner-negative) -->

### Accessibility

The spinner component is a purely visual component and therefore should be accompanied by explanatory text.

Loading content should be announced to users with assistive tools, so they know they have to wait.
There are different ways of achieving that like

- `aria-live` containers or
- spinner live announcements.

*Note: As every application has different requirements, this example can only be an inspiration.*

<!-- example(spinner-aria-announcement) -->

#### Limitations

`aria-label` announcement for elements with `role="status"`
is [not implemented on all screen readers](https://a11ysupport.io/tech/aria/status_role#support-table-4). Consider
accompanying text instead of an `aria-label` on the `nx-spinner`
