---
title: Badge
category: components
b2c: true
expert: true
stable: done
alias: chip
a1Full: true
---

<div class="docs-hide-ndbx">

### Color schemes

You can customize the badge appearance using different color schemes. Available color schemes are: 

`yellow | orange | red | purple | aqua | blue | teal | green | gray` which will show the default as `yellow` colorScheme.

**Usage:** `<nx-badge colorScheme="blue">Badge</nx-badge>`  

<!-- example(badge-color-scheme) -->

### Brand color scheme

The `brand` color scheme is unlike other color schemes, it is not affected by the `prominence` input.

**Usage:** `<nx-badge colorScheme="brand">Brand</nx-badge>`

<!-- example(badge-brand) -->

### Prominence

The `prominence` input allows you to control the visual emphasis of the badge. Available options are: 

`subtle | attention` which default value is `subtle`

**Usage:** `<nx-badge colorScheme="blue" prominence="subtle">Badge</nx-badge>`  

Note: The `prominence` input does not apply to the `brand` color scheme.

<!-- example(badge-prominence) -->

### Character badge
If the text contains only one character, the badge will be displayed as a circle.

<!-- example(badge-character) -->

### Disabled state

Badges can be disabled using the `disabled` input.

**Usage:** `<nx-badge disabled>Badge</nx-badge>`  

<!-- example(badge-disabled) -->

### Inverse

For use on dark backgrounds, add `inverse` input to use inverse color schemes.

**Usage:** `<nx-badge inverse>Badge</nx-badge>`  

<!-- example(badge-inverse) -->

</div>

<div class="docs-hide-a1">

### NDBX approach

<div class="docs-deprecation-warning">
  The <code>type</code> and <code>vibrant</code> inputs are the NDBX theme approach and should be used together if needed. They cannot be mixed with the new inputs (<code>colorScheme</code>, <code>prominence</code>, <code>disabled</code>, <code>inverse</code>).
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