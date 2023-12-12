---
title: Pagination
category: components
b2c: true
expert: true
stable: done
alias: pager, paginator
---

Pagination is used for splitting up content or data into several pages, with controls for navigating to the next or previous page. You can choose between two options:

-   Advanced pagination where parts are referred to by numbers and arrows.
-   Simple pagination where parts are referred with “previous” and “next” buttons.

### Advanced Pagination

**Important:** If you use the advanced pagination, please translate the labels that are used by screen readers as shown in the [localization example](./documentation/pagination/overview#localization).

<!-- example(pagination-advanced) -->

### Simple Pagination

<!-- example(pagination-simple) -->

### Slider Pagination
The pagination can be used for a slider using `type="slider"`. **Important:** Maximum 6 slides are supported. 

<!-- example(pagination-slider) -->

### Localization

In order to localize the component you have to implement the interface `IPaginationTexts` and provide your implementation with the `NX_PAGINATION_TEXTS` injection token.

Pay attention that `IPaginationTexts` has two optional attributes: `first` and `last` used for the first and last arrows of the advanced pagination.

<!-- example(pagination-localize) -->

<!-- example(pagination-localize-advanced) -->

### Accessibility

If you have multiple paginations on the same page you have to consider the `Landmarks should have a unique role or role/label/title combination` rule. You can achieve this by adding a unique `ariaLabel` to the `nx-pagination` component. You can either use the `ariaLabel` input directly or wrap the pagination in a component and provide the `NX_PAGINATION_TEXTS` token.

<!-- example(pagination-a11y) -->
