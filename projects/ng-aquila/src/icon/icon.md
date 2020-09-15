---
title: Icons
category: components
b2c: true
expert: true
stable: done
---

### General usage

<div class="docs-private">
  The icons are comprised of two general types: **functional** and **product icons**. **Functional icons** are used to indicate important actions and functions like search, close or links. In most cases, functional icons will have a size of 24x24px (**s**). **Product icons** are a visual expression of aspects of our products. They are, for instance, used to select product options or in claims use cases. To make both icons distinguishable, the name of all product icons starts with `product-*`. The outline and fill options should only be used in combination with **product** icons.
</div>

### Essential Icons
The library ships with a set of necessary icons that are used in the components themselves.
You can override them with a custom SVG or by specifying a certain class from an icon font.

Here you can see the list of the necessary icons:
<!-- example(icon-essential-icons) -->

#### Overriding essential icons
For the components to use your desired icons for the essential icons list you can override
them with the icon registry.
<!-- example(icon-essential-override) -->


### Sizes
**Functional** icons should mainly use the size **s**.
<!-- example(icon-sizes) -->

### Icons with outline
<div class="docs-private">
The outline option should only be used with **product** icons.
</div>
<!-- example(icon-outline) -->

### Filled icons
<div class="docs-private">
The filled option should only be used with **product** icons.
</div>
<!-- example(icon-filled) -->

<div class="docs-private">

### Functional icons

<!-- example(icon-list-functional) -->
</div>

<div class="docs-private">

### Product icons

<!-- example(icon-list-product) -->
</div>

### Register icons service

Custom icons can be registered via the `NxIconRegistry` injectable service. With the `NxIconRegistry` you can associate icon names with SVG, URL and HTML strings and define a CSS font class.

<!-- example(icon-registry) -->

