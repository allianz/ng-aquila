---
title: Link
category: components
b2c: true
expert: true
stable: done
a1: true
---

The nxLink provides a styled link without interfering with the functionality of the Angular router. Embed a link to lead the user towards more information or an action he/she wants to execute.

Note that

-   the `nx-link` component wraps an `<a></a>` element in combination with e.g. an href-attribute or a routerLink directive.
-   disabled links should have the attribute `aria-disabled="true"` and will be styled accordingly.
-   disabled links should either omit the href attribute or add `tabindex="-1"`. If you use `routerLink` you can pass `null` and the href attribute will not be rendered.

Depending on the context, pick one of the following types - or a reasonable combination thereof.

### Default

<!-- example(link-default) -->

### Sizes

With the `[size]` property you can apply different sizes.

<!-- example(link-size) -->

<div class="docs-a1">

### Types

For One Allianz, you can select the color type via the `[type]` property.

<!-- example(link-type) -->

### Prominence

You can set the prominence of the link by selecting the `[prominence]` property.

<!-- example(link-prominence) -->

</div>

### With Icons

<!-- example(link-icons) -->

### Black

<!-- example(link-black) -->

### Negative styling

<!-- example(link-negative) -->

### Multiple Modifiers

As mentioned earlier, multiple modifiers can be combined.

Here's an example of a negative link with icon on the right side:

<!-- example(link-multiple) -->

### Link within text

A link with `nxStyle="text"` inherits the size and the line height of its text parent.

<!-- example(link-within-text) -->
