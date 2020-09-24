---
title: Sidepanel
category: components
b2c: false
expert: true
stable: progress
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

Please note that the sidepanel is currently **not recommended for mobile usage**.

The `nx-sidepanel` is a container that is fixed to the right edge of the viewport to provide content that supports the main content area.

`<nx-sidepanel-header>` provides a place that will stay fixed on top, when the bottom part of `<nx-sidepanel-content>` is scrolled down.

### Floating sidepanel

A floating sidepanel does not affect the actual layout. It places itself at the outer right edge of the screen.

<!-- example(sidepanel-floating) -->

### Static sidepanel

With `[static]="true"` the sidepanel can be used as a static element on the page. To integrate this correctly, you can use the surrounding example container shown in the example.

<!-- example(sidepanel-static) -->

### Background of the sidepanel

You can customize the background of the sidepanel with the `sidepanel-background-color` theming token or applying a background color to your content.
