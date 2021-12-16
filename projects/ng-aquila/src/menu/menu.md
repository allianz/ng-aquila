---
title: Menu
category: components
b2c: false
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

This is a collapsible menu. It is designed to be a replacement for the top level navigation in the header and the sidebar on small screens (mobile and tablet if necessary). The menu consists of a wrapper `<nx-menu>` component that handles the collapsing and positioning of the menu content. A common `<nx-menu>` contains a set of `[nxMenuItem]`,`[nxMenuButton]` and `[nxMenuLink]`. The content of the menu is not restricted to those elements.

## Menu Button

The `[nxMenuButton]` component is meant to be ether a top level link or a expandable item that reveals the next navigation level. A `[nxMenuButton]` can also contain a icon that is placed in front of the label. The icon needs to be marked with the `[nxMenuButtonIcon]` directive. When marked as 'expandable' the button will display a chevron icon to indicate its `expanded` state.

<!-- example(menu-button) -->

## Menu Link

Every menu has a number of links. Those are usually displayed below an expanded `[nxMenuButton]` button. The `[nxMenuLink]` directive can be applied to a `<a>` tag to get the correct styling.

<!-- example(menu-link) -->

## Menu Item

The `[nxMenuItem]` is used to structure sections within the menu. It can contain a series of `[nxMenuLink]` aswell as any other content. The item supports two different indentation levels, e.g. menues with icons in the buttons can use the large indentation while others can use the default.

<!-- example(menu-item) -->

Here is an example using the large indentation with buttons including icons:

<!-- example(menu-item-with-icons) -->

## Menu Container

The `<nx-menu>` component provides a collapsible container that covers the whole viewport below the header. It can contain any content, but usually combinations of at least `[nxMenuLink]`, `[nxMenuItem]` and `[nxMenuButton]`. The component can be toggled via the `toggle()` function. Here is a full example using a burger button to open the menu and the `<nx-tree>` to render the nested items.

<!-- example(menu) -->
