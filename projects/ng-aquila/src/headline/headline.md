---
title: Headline
category: components
b2c: true
expert: true
stable: done
alias: heading, title
---

Headlines are decoupled from the actual markup. You can pick any tag from h1 - h6 to fulfill the expected semantics and adjust the appearance with the following attributes.

### Sizes
<div class="docs-deprecation-warning">
  <strong><code>nxHeadline</code> with string inputs is deprecated. Use the explicit <code>size</code> input. </strong>
  In preparation for the future design system updates the headline component gets new size names and a dedicated new <code>size</code> input with a proper typing. See the table below for the mapping from old size names to the new names.
  Example:

  ```html
  <!-- old usage -->
  <h3 nxHeadline="section">
  <!-- new usage -->
  <h3 nxHeadline size="2xl">
  ```
  You can still use the old API for quite a while until your project gets updated to the new One Allianz designs where you can then switch to the new size input according to the designs you will get.
</div>

#### Size input
<!-- example(headline-sizes-a1) -->

#### Deprecated sizes
<!-- example(headline-sizes-deprecated) -->

#### Mappings
This table shows you how the old names will translate to in the new design.

<!-- example(headline-sizes-mapping, { "hideHeader": true }) -->

### Font weights

<div class="docs-a1">
For the One Allianz design the font-weights of the headlines are already set as they should be. You should not need to change them anymore.
</div>

<div class="docs-hide-a1">

You can change the font-weight of any headline by using the font-weight utility classes `nx-font-weight-{weight}` as shown in the example below. Our library provides four font-weight options: **light** (300), **regular** (400), **semibold** (600) and **bold** (700).

**Important:** In order to use these utility classes you first have to import the utility css file in your project as explained [here](./documentation/typography/overview).

<!-- example(headline-font-weights) -->

</div>

### Links

[`<nx-link>`](./documentation/link/overview) and `<a>` elements automatically adapt if they are placed inside a `nxHeadline` element.

<!-- example(headline-links) -->

### Negative
<div class="docs-deprecation-warning">
  <strong><code>nxHeadline="negative"</code> is deprecated. Use the boolean <code>negative</code> input instead.
</div>

<!-- example(headline-negative) -->
