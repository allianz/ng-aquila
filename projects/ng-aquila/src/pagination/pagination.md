---
title: Pagination
description: Page navigation for paged content
category: components
b2c: true
expert: true
stable: done
alias: pager, paginator
a1Densities: true
group: Navigation
---

Pagination is used for splitting up content or data into several pages, with controls for navigating to the next or previous page. You can choose between two options:

-   Advanced pagination where parts are referred to by numbers and arrows.
-   Simple pagination where parts are referred with “previous” and “next” buttons.

### Advanced Pagination

**Important:** If you use the advanced pagination, please translate the labels that are used by screen readers as shown in the [localization example](./documentation/pagination/overview#localization).

<!-- example(pagination-advanced) -->

#### Configuring the navigation controls

The first, previous, next and last controls are configurable:

-   `firstLastControls`, `prevNextControls` — how each control pair is rendered: `icon` (default), `label`, which shows the `IPaginationTexts` label instead of the icon, or `hidden`.
-   `controlsPosition` — `around` (default), or `start` / `end` to group all controls on one side.
-   `alignment` — `start` (default), or `space-between` to stretch the pagination across the container width and pin the controls to its edges.

<!-- example(pagination-advanced-controls) -->

### Simple Pagination

<!-- example(pagination-simple) -->

<div class="docs-hide-a1">

### Slider Pagination
The pagination can be used for a slider using `type="slider"`. **Important:** Maximum 6 slides are supported.

<!-- example(pagination-slider) -->

</div>

### Localization

In order to localize the component you have to implement the interface `IPaginationTexts` and provide your implementation with the `NX_PAGINATION_TEXTS` injection token.

Pay attention that `IPaginationTexts` has two optional attributes: `first` and `last` used for the first and last arrows of the advanced pagination.

<!-- example(pagination-localize) -->

<!-- example(pagination-localize-advanced) -->

### Accessibility

If you have multiple paginations on the same page you have to consider the `Landmarks should have a unique role or role/label/title combination` rule. You can achieve this by adding a unique `ariaLabel` to the `nx-pagination` component. You can either use the `ariaLabel` input directly or wrap the pagination in a component and provide the `NX_PAGINATION_TEXTS` token.

<!-- example(pagination-a11y) -->
