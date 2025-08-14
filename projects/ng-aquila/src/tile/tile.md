---
title: Tile
category: components
b2c: true
expert: true
stable: done
a1: true
---

The Tile component is a new component from the One Allianz Design System with a backwards compatible theme for NDBX projects. It is an alternative to the circle toggle component. We suggest not to mix both of them on the same page.
The Tile component is a versatile UI element that can display an icon, label, and hint text. It supports selectable, readonly, and disabled states, and can be used in both single-select and multi-select groups.


### Layouts
#### Auto grid

The Tile group automatically arranges the tiles in a grid layout depending on the available space. The maximum number of columns can be adjusted with the `maxColumns` input. The grid layout is responsive and adapts to the size of the outer container. No media queries or container queries are needed for the grid itself. But you can use media or container queries to adjust the size that is available for the tile group.
**Important:** The `maxColumns` is the maximum columns the grid can have. The actual number of columns is determined by the available space and the size of the tiles. If there is not enough space for the maximum number of columns, fewer columns will be displayed. The tiles also have a minimum width that they won't become too small.

<!-- example(tile-group-auto-grid) -->

#### Custom grid or other layouts
You can also use the tile group with a custom grid layout or any other layout like a flexbox. You can set the `autoGrid` input to `false` to disable the automatic grid layout and use your own layout by either changing the CSS grid settings of the `.nx-tile-group__tiles` class or by using a container around the tiles and then style it to your needs.

In this example it shows how you can use CSS to set the CSS grid properties and also use media queries.

<!-- example(tile-group-custom-grid) -->

#### Tile layout variants

The individual Tile component support two different layout variants: vertical and horizontal. The layout can be set with the `layout` input. The default is vertical.

<!-- example(tile-layouts) -->


### Single Select

<!-- example(tile-group-single-select) -->

### Multi Select

<!-- example(tile-group-multi-select) -->

### Readonly and Disabled States

Tiles can be set to readonly or disabled states.
**Readonly** tiles should only be used in internal applications because of accessibility restrictions.

<!-- example(tile-readonly-disabled) -->


### Forms
The tile component supports both the FormsModule and ReactiveFormsModule of Angular.

#### Template-driven Forms

<!-- example(tile-template-driven) -->

#### Reactive Forms

<!-- example(tile-reactive-forms) -->


#### Validation / Error State

The tile group is compatible with Angular's form validation. The error state will be shown when the form control is invalid and touched.

<!-- example(tile-validation-error-state) -->
