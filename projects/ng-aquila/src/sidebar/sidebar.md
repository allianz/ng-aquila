---
title: Side Navigation
category: components
b2c: true
expert: true
stable: done
alias: sidenav, side navigation
---

The `<nx-sidebar>` provides a collapsible container for side content (often navigation, though it can be any content) alongside some primary content.

Please note that all the following examples use the [NxActionComponent](./documentation/action) for the side navigation items. The `NxActionModule` **is not automatically imported** when you import the `NxSidebarModule`. Therefore you have to import the `NxActionModule` yourself, if you want the same sidebar look:

```ts
import { NxActionModule } from '@aposin/ng-aquila/action';
```

### Static Sidebar with Actions

One possible content for the sidebar is a list of navigation links, in this case a list of `nxAction` items. The default width of `280px` can be overwritten by your own css like in the following example.

<!-- example(sidebar) -->

### Resizeable Side navigation with Tree

[nxTree](./documentation/tree/overview) is designed to work in conjunction with the Sidebar. It is heavily inspired my the Angular Material Flat Tree. For an in depth documentation see [material.angular.io](https://material.angular.io/components/tree/overview).

A `<nx-sidebar>` can be resized by dragging the right edge when the option `resizeable` is set.

<!-- example(sidebar-resizeable) -->

A `<nx-sidebar>` can be expanded or closed using the `expand()`, `close()` and `toggle()` methods.

If you have to reinit the default width in an expanded state, you can call `expand(width)` with the new width as parameter or directly set the `width` of the sidebar.

<!-- example(sidebar-methods) -->

### Footer area

For placing some view shortcuts on the bottom of the sidebar, a `<nx-sidebar-footer>` area can be added. Additionally with `nxSidebarToggle` you can add a button to toggle the sidebar like shown in the following example.

<!-- example(sidebar-footer) -->

### Output events

You can use the `widthChange` output event in order to subscribe to changes of the sidebar width.

<!-- example(sidebar-outputs) -->
