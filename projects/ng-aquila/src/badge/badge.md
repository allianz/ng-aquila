---
title: Badge
description: Status badges and labels
category: components
b2c: true
expert: true
stable: done
alias: chip
a1Full: true
group: Data Display
---

<div class="docs-hide-ndbx">

### Accent colors

You can customize the badge appearance using different accent colors. Available accent colors are:

`yellow | orange | red | purple | aqua | blue | teal | green | gray` which will show the default as `yellow` accentColor.

**Usage:** `<nx-badge accentColor="blue">Badge</nx-badge>`

<!-- example(badge-accent-color) -->

### Brand accent color

The `brand` accent color is unlike other options, as it is not affected by the `prominence` input.

**Usage:** `<nx-badge accentColor="brand">Brand</nx-badge>`

<!-- example(badge-brand) -->

### Prominence

The `prominence` input allows you to control the visual emphasis of the badge. Available options are:

`subtle | attention` which default value is `subtle`

**Usage:** `<nx-badge accentColor="blue" prominence="subtle">Badge</nx-badge>`

Note: The `prominence` input does not apply to the `brand` accent color.

<!-- example(badge-prominence) -->

### Character badge
If the text contains only one character, the badge will be displayed as a circle.

<!-- example(badge-character) -->

### Disabled state

Badges can be disabled using the `disabled` input.

**Usage:** `<nx-badge disabled>Badge</nx-badge>`

<!-- example(badge-disabled) -->

### Inverse

For use on dark backgrounds, add `inverse` input to use inverse colors.

**Usage:** `<nx-badge inverse>Badge</nx-badge>`

<!-- example(badge-inverse) -->

</div>

<div class="docs-hide-a1">

### NDBX approach

<div class="docs-deprecation-warning">
  The <code>type</code> and <code>vibrant</code> inputs are the NDBX theme approach and should be used together if needed. They cannot be mixed with the new inputs (<code>accentColor</code>, <code>prominence</code>, <code>disabled</code>, <code>inverse</code>).
</div>

#### Type

You can change the color of the badge by setting the `type` to either `active`, `positive`, `critical` or `negative`.

<!-- example(badge) -->

#### Vibrant

In order to use the vibrant styling of the badge, you can simply apply the `vibrant` input to the badge.

<!-- example(badge-vibrant) -->

#### Character badge
If the text contains only one character, the badge will be displayed as a circle.

<!-- example(badge-character-ndbx) -->

</div>
