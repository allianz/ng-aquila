---
title: Context Menu
category: components
b2c: false
expert: true
stable: done
alias: menu
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

The `<nx-context-menu>` is a floating panel containing a list of options.

<!-- example(context-menu-basic) -->

By itself, the `<nx-context-menu>` element does not render anything. The menu is attached to and opened via application of the `nxContextTriggerFor` directive:

### Toggling the menu programmatically

The context menu exposes an API to open/close programmatically. Please note that in this case, an `nxContextMenuTriggerFor` directive is still necessary to attach the context menu to a trigger element in the DOM.

<!-- example(context-menu-programmatic) -->

### Icons

Context menus support displaying `<nx-icon>` elements before the menu item text.

<!-- example(context-menu-icons) -->

### Indicators

Using the [`<nx-indicator>`](./documentation/indicator/overview), certain entries of the context menu can be marked.

<!-- example(context-menu-indicator) -->

### Nested context menu

The context menu has the ability to open a sub-menu. To do so, you have to define your root menu and sub-menus, in addition to setting the `nxContextMenuTriggerFor` on the `nxContextMenuItem` that should trigger the sub-menu:

<!-- example(context-menu-nested) -->

### Disabling menu items

Menu items can be disabled by adding a `disabled` attribute to the `nxContextMenuItem`.

<!-- example(context-menu-disabled) -->

### Lazy rendering

By default, the context menu content will be initialized even when the panel is closed. To defer initialization until the context menu is open, the content can be provided as an ng-template with the `nxContextMenuContent` attribute:

<!-- example(context-menu-lazy) -->

### Passing in data to a menu

When using lazy rendering, additional context data can be passed to the context menu panel via the `nxContextMenuTriggerData` input. This allows for a single context menu instance to be rendered with a different set of data, depending on the trigger that opened it:

<!-- example(context-menu-data) -->

### Scroll strategy

By default scroll strategy of the context `reposition`, which lets the menu stay open and reposition itself when scrolling. To close the context menu on scroll, the scroll strategy can be set to `close`.

To use a custom scroll container instead of the body element, [add cdkScrollable to the container element](./documentation/popover/overview#cdkscrollable)

<!-- example(context-menu-scroll-strategy) -->

### Right click

You can set the mode of the context menu to `cursor` to be able to open it via right click. Be aware that this can cause usability issues and it is only recommended to use this in combination with a visible button.

<!-- example(context-menu-cursor-mode) -->

### Global Settings

If you want to use a custom scroll strategy, you can use the `NX_CONTEXT_MENU_SCROLL_STRATEGY` injection token with a factory provider. The `Overlay` service from `@angular/cdk/overlay` offers 4 different scroll strategy options:

-   **reposition:** allow background scroll, the overlay moves with the background (default).
-   **close:** allow background scroll, closes the overlay on scroll.
-   **block:** disallow background scroll, the overlay does not move.
-   **noop:** allow background scroll, the overlay does not move.

<!-- example(context-menu-scroll-strategy-provider) -->

Alternatively, the `NX_CONTEXT_MENU_SCROLL_STRATEGY` injection token can be provided by importing `NxScrollStrategyModule.withConfig({ ... })` into your application or feature module, after your other aquila imports.

### Keyboard interaction

-   DOWN_ARROW: Focuses the next menu item
-   UP_ARROW: Focuses previous menu item
-   RIGHT_ARROW: Opens the menu item's sub-menu
-   LEFT_ARROW: Closes the current menu, if it is a sub-menu
-   ENTER: Activates the focused menu item
-   ESCAPE: Closes the menu

### Selection Menu

Selection menu stores its state. It can easily be built on top of Context Menu, simply copy the source code of the examples below and modify as needed.

#### Single selection

<!-- example(context-menu-selection) -->

#### Multiple selection

<!-- example(context-menu-select-multiple) -->
