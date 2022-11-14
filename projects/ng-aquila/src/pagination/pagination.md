---
title: Pagination
category: components
b2c: true
expert: true
stable: done
alias: pager, paginator
---

If you have a web site with lots of pages, you may wish to add some sort of pagination to each page. Pagination is a mechanism which provides users with additional navigation options for browsing through single parts of a given article, table or something. User can choise between two options:

-   Advanced pagination where parts are referred to by numbers and arrows.
-   Simple pagination where parts are referred with “previous” and “next” buttons.

### Advanced Pagination

**Important:** If you use the advanced pagination, please translate the labels that are used by screen readers as shown in the [localization example](./documentation/pagination/overview#localization).

<!-- example(pagination-advanced) -->

### Simple Pagination

<!-- example(pagination-simple) -->

### Localization

In order to localize the component you have to implement the interface `IPaginationTexts` and provide your implementation with the `NX_PAGINATION_TEXTS` injection token.

Pay attention that `IPaginationTexts` has two optional attributes: `first` and `last` used for the first and last arrows of the advanced pagination.

<!-- example(pagination-localize) -->

<!-- example(pagination-localize-advanced) -->
