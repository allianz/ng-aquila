---
title: Tooltip
category: components
b2c: false
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

Tooltip requires Angular CDK (incl. CSS).


The Tooltip provides a text label that is displayed when the user hovers over or focuses an element.
It allows to display additional information for supporting the customer,
and should **only be used for optional information**.

<!-- example(tooltip-basic) -->

### Positioning

By default the tooltip will be displayed below the element, but this can be configured
using the `nxTooltipPosition` input. The tooltip can be displayed above,
below, left or right of the element.

| Position | Description                         |
| -------- | ----------------------------------- |
| top      | Display above the element           |
| bottom   | Display beneath the element         |
| left     | Display to the left of the element  |
| right    | Display to the right of the element |

<!-- example(tooltip-positions) -->

### Fallback strategy

The positioning of the tooltip follows a fallback strategy to make sure that the component is displayed correctly in the most common situations. Fallback means that the tooltip tries to find a fitting position within the window.
The following table explains the fallback strategy of the tooltip.

<!-- example(tooltip-fallbacks-table) -->

Note that the table contains a few positions that are not available to be set by the user. `top-left`, `top-right`, `bottom-left` and `bottom-right` are special positions that are used as a fallback option only.

### Showing and hiding

By default, the tooltip will be shown when the user's mouse hovers over
the tooltip's trigger element and hides when the user's mouse leaves.

### Show and hide delays

To change the delay before showing or hiding the tooltip, you can use
the inputs `nxTooltipShowDelay` and `nxTooltipHideDelay` to provide a delay time in milliseconds.

The following example has a tooltip that waits one second to display after
the user hovers over the button, and waits another second to hide after the user moves the mouse away.

<!-- example(tooltip-delay) -->

### Disabling the tooltip from showing

To completely disable a tooltip, set `nxTooltipDisabled`. While disabled, a tooltip will never be shown.

<!-- example(tooltip-disabled) -->

### Manually calling show() and hide()

To manually cause the tooltip to show or hide, you can call the show and hide directive methods,
which both accept a number in milliseconds to delay before applying the display change.

<!-- example(tooltip-programmatic) -->

### Changing the default delay behavior

You can configure your app's tooltip default show/hide delays and default
position by configuring and providing your options using the `NX_TOOLTIP_DEFAULT_OPTIONS`
injection token.

<!-- example(tooltip-settings) -->

### Accessibility

Elements with the `nxTooltip` will add an `aria-describedby` label that
provides a reference to a visually hidden element containing the tooltip's message.
This provides screenreaders the information needed to read out the tooltip's
contents when the end-user focuses on the element triggering the tooltip.
The element referenced via `aria-describedby` is not the tooltip itself,
but instead an invisible copy of the tooltip content that is always present in the DOM.
