---
title: Avatar
description: User avatar display
category: components
b2c: false
expert: true
stable: done
a1Densities: true
a1Full: true
group: Data Display
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

### Disabled

<!-- example(avatar-disabled) -->


### Size

The size of the avatar can be chosen with the `[size]` property.


<div class="docs-hide-a1">

<!-- example(avatar-size) -->

</div>

<div class="docs-a1">

<!-- example(avatar-size-a1) -->

</div>

### Using different colors

You can change the color of the avatar by overwriting the default background and text color as shown in the example below.

<div class="docs-private">

**Please make sure that your colors all belong to the same color group (e.g. rich/soft/vibrant).**

</div>

<!-- example(avatar-colors) -->

<div class="docs-hide-ndbx">

### Color variants

The avatar component now supports a range of new color variants for both attention and subtle states. You can choose from the following colors:

- `yellow`
- `orange`
- `red`
- `purple`
- `teal`
- `aqua`
- `blue`
- `green`
- `gray`

To use an accent color variant, apply the `[accentColor]` property; to control its emphasis, apply the `[prominence]` property (`subtle` by default, or `attention` for the emphasized variant).

<!-- example(avatar-accent-colors) -->

### Inverse

For use on dark backgrounds, add the `inverse` input to use inverse colors.

**Usage:** `<button nxAvatar inverse>MD</button>`

<!-- example(avatar-inverse) -->


</div>

<div class="docs-a1">

### Indicator

An [`nx-indicator`](/documentation/indicator/overview) can be projected into the avatar to show status, e.g. an
online state or unread count. Add the `nxAvatarIndicator` directive to it; it is always
positioned in the bottom right corner, regardless of the `position` and `overlap` input.

The avatar also set the indicator size: `s` avatars get an `800` indicator, `m` a `1200`, `l` a
`1600` and `xl` a `2000`. This wins over the indicator's own `size` input, so there is no
need to set it.

<div class="docs-deprecation-warning">

**Accessibility:** One indicator type used consistently is fine — the meaning comes from the indicator being present or absent. Mixing types (`positive`, `warning`, `critical`, `info`) or mixing indicator content (e.g. different icons, or icons next to counts) conveys meaning through color alone, which fails [WCAG 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html). An `aria-label` does not fix this, since it only reaches screen reader users — add a non-color cue such as accompanying text, a tooltip, or a popover instead. See the [indicator accessibility docs](/documentation/indicator/overview#accessibility) for more details.

</div>

<!-- example(avatar-indicator) -->

</div>

### Accessibility

When using `nxAvatar` on a native button, please set a suitable `aria-label` for it.

Depending on the context, a non-clickable avatar that contains an icon or an image should use an `aria-label` to also provide the visible information for screenreaders. If the information of the avatar is already contained somewhere else (e.g. a text label besides the avatar) it can also be hidden with `aria-hidden="true"`.
