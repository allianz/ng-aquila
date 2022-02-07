---
title: Avatar
category: components
b2c: false
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

Depending on the use case the avatar can be used as a non-clickable element or as a button.

### Non-clickable avatar

<!-- example(avatar) -->

### Usage as a button

<!-- example(avatar-button) -->

### Size

The size of the avatar can be chosen with the `[size]` property.

<!-- example(avatar-size) -->

### Using different colors

You can change the color of the avatar by overwriting the default background and text color as shown in the example below.

<div class="docs-private">

**Please make sure that your colors all belong to the same color group (e.g. rich/soft/vibrant).**

</div>

<!-- example(avatar-colors) -->

### Accessibility

When using `nxAvatar` on a native button, please set a suitable `aria-label` for it.

Depending on the context, a non-clickable avatar that contains an icon or an image should use an `aria-label` to also provide the visible information for screenreaders. If the information of the avatar is already contained somewhere else (e.g. a text label besides the avatar) it can also be hidden with `aria-hidden="true"`.
