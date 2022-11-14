---
title: Sidepanel
category: components
b2c: false
expert: true
stable: done
alias: sidebar, drawer
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

Please note that the sidepanel is currently **not recommended for mobile usage**.

The `nx-sidepanel` is a container that is fixed to the right edge of the viewport to provide content that supports the main content area. The `nx-sidepanel` needs to be wrapped into `nx-sidepanel-outer-container`, which also holds the main content besides the sidepanel:

```html
<nx-sidepanel-outer-container>
    <!-- Main content of the page -->

    <nx-sidepanel>
        <!-- Content besides the main area of the page -->
    </nx-sidepanel>
</nx-sidepanel-outer-container>
```

`<nx-sidepanel-header>` provides a place that will stay fixed on top, when the bottom part of `<nx-sidepanel-content>` is scrolled down.

### Color variations

There are two different color variations available.

<div class="docs-public">

#### Dark version

The dark version is the default one:

</div>

<div class="docs-private">

#### Grey sidepanel

The default color of the sidepanel is grey:

</div>

<!-- example(sidepanel-dark) -->

<div class="docs-public">

#### Light version

With `appearance="light"` you get a light version of the sidepanel.

</div>

<div class="docs-private">

#### White sidepanel

With `appearance="light"` you get a white version of the sidepanel.

</div>

<!-- example(sidepanel-light) -->

### Positioning

#### Floating sidepanel

A floating sidepanel does not affect the actual layout. It places itself at the outer right edge of the screen.

<!-- example(sidepanel-floating) -->

#### Static sidepanel

With `[static]="true"` the sidepanel can be used as a static element on the page. To integrate this correctly, you can use the surrounding example container shown in the example.

<!-- example(sidepanel-static) -->

### Including tabs with a fixed tabs-header

The sidepanel can contain a lot of different content. This is an example how tabs with a fixed tab-header can be used:

<!-- example(sidepanel-with-tabs) -->

### Focus on open sidepanel
<!-- example(sidepanel-focus) -->
