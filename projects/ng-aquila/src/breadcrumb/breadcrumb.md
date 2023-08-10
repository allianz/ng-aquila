---
title: Breadcrumb
category: components
b2c: true
expert: true
stable: done
alias: location
---

A breadcrumb component is used to show the current page location to the user and serves as a navigation hint. It consists of a list of links to the parent pages of the current page in hierarchical order. Our breadcrumb component does not contain any routing logic and just displays the breadcrumb items it gets as input. **The breadcrumb items should be updated on routing changes by the application in which the breadcrumb is used.**

The last element of the breadcrumbs should not be interactive. To achieve that you can either set `[routerLink]="null"` or `[attr.href]="null"` on the last breadcrumb item to make the link non-interactive.

### Basic usage

You can see the basic behaviour of the breadcrumb component in the example below.

<!-- example(breadcrumb) -->

### Link appearance

You can select the style of the breadcrump via the `appearance` input.

<!-- example(breadcrumb-link) -->

### Negative styling

<!-- example(breadcrumb-negative) -->

### Accessibility

Note that the breadcrumb component should be always applied on a `<ol>` tag and wrapped in a `<nav>` with `aria-label='Breadcrumb'`. The breadcrumb items should be on a `<a>` tag and wrapped in `<li>`. The currently active item is automatically marked with `aria-current='page'`. These best practices for breadcrumbs are already applied in the basic example above. You can find further information on the breadcrumb a11y practices [here](https://www.w3.org/TR/wai-aria-practices/examples/breadcrumb/index.html).
