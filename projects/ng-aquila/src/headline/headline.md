---
title: Headline
category: components
b2c: true
expert: true
stable: done
alias: heading, title
---

Headlines are decoupled from the actual markup. So you can pick whatever tag from h1 - h6 to fulfill the expected semantics and adjust the appearance with the following attributes.

### Sizes

<!-- example(headline-sizes) -->

### Font weights

You can change the font-weight of any headline by using the font-weight utility classes `nx-font-weight-{weight}` as shown in the example below. Our library provides four font-weight options: **light** (300), **regular** (400), **semibold** (600) and **bold** (700).

**Important:** In order to use these utility classes you first have to import the utility css file in your project as explained [here](./documentation/typography/overview).

<!-- example(headline-font-weights) -->

### Links

[`<nx-link>`](./documentation/link/overview) and `<a>` elements automatically adapt if they are placed inside a `nxHeadline` element.

<!-- example(headline-links) -->

### Negative

<!-- example(headline-negative) -->
