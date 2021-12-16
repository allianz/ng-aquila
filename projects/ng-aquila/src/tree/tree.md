---
title: Tree
category: components
b2c: false
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

The nx-tree provides a tree that can be used to display hierarchy data. This component is designed to work in conjunction with the [sidebar](./documentation/sidebar/overview). It is heavily inspired my the Angular Material Flat Tree. For an in depth documentation see [material.angular.io](https://material.angular.io/components/tree/overview).

A `<nx-tree>` is a flat tree consisting of `<nx-tree-node>` nodes.

<!-- example(tree) -->

### Adding expand/collapse

The `nxTreeNodeToggle` directive can be used to add expand/collapse feature to the tree node. It can be added to any place on the tree node. For better accessibility this directive should be added on a `button` element.

### Accessibility

To provide an accessible tree, the expandable nodes need to contain a `button` element. Similar to this the leaf nodes need to contain a valid `a` or `button` element. The tree can then be traversed by keyboard. You can `TAB` into the tree and go through the individual nodes with `UP` and `DOWN` buttons. You can close/expand them by pressing `LEFT` and `RIGHT` buttons respectively or toggle with `ENTER` or `SPACE`.

To enable better keyboard support any actionable element (`a`, `button`, etc.) within a node needs to have `nxTreeNodeActionItem` directive set on it. This way when navigating through the tree, the focus state is correctly passed to the actionable item.

This approach has some limitations, since we are using native DOM `focus` method to pass the focus state to the element. More complex components, like `nx-checkbox` for example, will not pick it up as expected, since the actual input is nested deep within the component and you can not attach the `nxTreeNodeActionItem` to it.
