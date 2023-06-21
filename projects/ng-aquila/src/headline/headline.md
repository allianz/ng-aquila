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
<!-- example(headline-sizes-deprecated) -->

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
  <strong><code>nxHeadline="negative"</code></strong> is deprecated. Use the boolean <code>negative</code> input instead.
</div>

<!-- example(headline-negative) -->

### New explicit size input
<div class="docs-deprecation-warning">
  <strong>Please note:</strong> In preparation for future design system updates for One Allianz the headline component gets new size names and a dedicated new <code>size</code> input with a proper typing.
  For existing NDBX projects you do not have to update to this API now, you can keep using the old one and we will keep it in the library for quite some time, even though it is marked as deprecated.
  Please also note that the t-shirt sizes are matching the One Allianz design and not the NDBX design. So if you want to use it already please double check if the font-size matches the design, as it will not necessarily match sizings in Figma for NDBX.

  Example for the new API:

  ```html
  <!-- old usage -->
  <h3 nxHeadline="section">
  <!-- new usage -->
  <h3 nxHeadline size="2xl">
  ```
  You can also find a mapping table from old to new values below for One Allianz.
</div>

#### Size input
<!-- example(headline-sizes-a1) -->

#### Mappings
This table shows you how the old names will translate to in the new design.

<!-- example(headline-sizes-mapping, { "hideHeader": true }) -->


