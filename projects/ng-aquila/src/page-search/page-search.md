---
title: Page Search
category: components
b2c: true
expert: true
stable: done
alias: search field
---

The page search component implements a simple container with a button on the right side and custom content on the left. It is optimized for the usage of [NxInput](./documentation/input/overview) or [NxAutocomplete](./documentation/autocomplete/overview) as content.

The layout of the component uses a single row for both content and button. As default, the page search uses **nxCol="12,12,12,2"** for the button and **nxCol="12,12,12,10"** for the content; it is, however, possible to implement custom column constraints. In the following examples the values "12,12,12,4" for `buttonLayout` and "12,12,12,8" for `contentLayout` are used.

If you use more than one page-search or elements with `role="search"` per page, each one should have a unique aria-label.

### Autocomplete

The following example displays two autocomplete component:

<!-- example(page-search-autocomplete) -->

### Simple input

The following example displays a single input as content:

<!-- example(page-search-input) -->

### Button click

You can listen to the button click as displayed in the following example:

<!-- example(page-search-click) -->

### Hidden search button

You can hide the search button:

<!-- example(page-search-hidden) -->
