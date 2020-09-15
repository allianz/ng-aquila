---
title: Side Navigation
category: components
b2c: false
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

The `<nx-sidebar>` provides a collapsible container for side content (often navigation, though it can be any content) alongside some primary content.

Please note that all the following examples use the [NxActionComponent](./documentation/action) for the side navigation items.
The `NxActionModule` **is not automatically imported** when you import the `NxSidebarModule`. Therefore you have to import the `NxActionModule` yourself, if you want the same sidebar look:

```ts
import { NxActionModule } from '@aposin/ng-aquila/action';
```


### Static Sidebar with Actions
One possible content for the sidebar is a list of navigation links, in this case a list of `nxAction` items.
The default width of `280px` can be overwritten by your own css like in the following example.
<!-- example(sidebar) -->

### Resizeable Side navigation with Tree

A `<nx-sidebar>` can be resized by dragging the right edge when the option `resizeable` is set.
<!-- example(sidebar-resizeable) -->

A `<nx-sidebar>` can be expanded or closed using the expand(), close() and toggle() methods.

<!-- example(sidebar-methods) -->

### Footer area

For placing some view shortcuts on the bottom of the sidebar, a `<nx-sidebar-footer>` area can be added. Additionally with `nxSidebarToggle` you can add a button to toggle the sidebar like shown in the following example.

<!-- example(sidebar-footer) -->

### Output events
You can use the `widthChange` output event in order to subscribe to changes of the sidebar width.
<!-- example(sidebar-outputs) -->


