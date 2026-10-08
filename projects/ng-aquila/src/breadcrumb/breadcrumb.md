---
title: Breadcrumb
description: Navigation breadcrumb trail
category: components
b2c: true
expert: true
stable: done
alias: location
a1Light: true
a1Densities: true
group: Navigation
---

A breadcrumb component is used to show the current page location to the user and serves as a navigation hint. It consists of a list of links to the parent pages of the current page in hierarchical order. Our breadcrumb component does not contain any routing logic and just displays the breadcrumb items it gets as input. **The breadcrumb items should be updated on routing changes by the application in which the breadcrumb is used.**

The last element of the breadcrumbs should not be interactive. To achieve that you can either set `[routerLink]="null"` or `[attr.href]="null"` on the last breadcrumb item to make the link non-interactive.

### Basic usage

You can see the basic behaviour of the breadcrumb component in the example below.

<!-- example(breadcrumb) -->

### Link appearance

You can select the style of the breadcrumb via the `appearance` input.

<!-- example(breadcrumb-link) -->

<div class="docs-a1">

### Type

You can set the type of the breadcrumb via the `type` input, either `'secondary'` or `'primary'`. By default, the breadcrumb uses the `'secondary'` type.

<!-- example(breadcrumb-type) -->

</div>

### With Context Menu

This example uses the `nxBreadcrumbItem` on a `button` to open a context menu.

<!-- example(breadcrumb-context-menu) -->

### Responsive

The breadcrumb component itself does not collapse items. This example measures the available width with a `ResizeObserver` and collapses the items before the current page, starting with the closest one, into a "..." item once the trail no longer fits. Activating "..." opens a native `<select>` listing the hidden links, so the platform's own picker is used on mobile devices. Resize the container to try it.

<!-- example(breadcrumb-responsive) -->

### Inverse styling

Set the `inverse` input to use the breadcrumb on a dark background. It supersedes `negative`, which keeps working as an alias. `inverse` can be combined with the `'primary'` type.

<!-- example(breadcrumb-negative) -->

### Accessibility

Note that the breadcrumb component should be always applied on a `<ol>` tag and wrapped in a `<nav>` with `aria-label='Breadcrumb'`. The breadcrumb items should wrapped in `<li>`. The currently active item is automatically marked with `aria-current='page'`. These best practices for breadcrumbs are already applied in the basic example above. You can find further information on the breadcrumb a11y practices [here](https://www.w3.org/TR/wai-aria-practices/examples/breadcrumb/index.html).
