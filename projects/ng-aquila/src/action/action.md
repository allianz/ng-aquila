---
title: Action
category: components
b2c: false
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

An `[nxAction]` enhances `<a>` or `<button>` elements with styling to be used as a list inside a [sidebar](./documentation/sidebar/overview) or in a [nx-tree](./documentation/tree/overview).

<!-- example(action) -->

### Usage with Router

The action is fully compatible with the angular router. When using the `routerLink` and you can add the `routerLinkActive="is-selected"` directive to highlight the current active route.

<!-- example(action-with-router) -->
