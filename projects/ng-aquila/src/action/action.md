---
title: Action
category: components
b2c: true
expert: true
stable: done
alias: menu
---

An `[nxAction]` enhances `<a>` or `<button>` elements with styling to be used as a list inside a [sidebar](./documentation/sidebar/overview) or in a [nx-tree](./documentation/tree/overview).

<!-- example(action) -->

### Usage with Router

The action is fully compatible with the angular router. When using the `routerLink` and you can add the `routerLinkActive="is-selected"` directive to highlight the current active route.

<!-- example(action-with-router) -->

### Indicators

Inside the `nxAction` item there can be used a [`<nx-indicator>`](./documentation/indicator/overview):

<!-- example(action-indicator) -->
