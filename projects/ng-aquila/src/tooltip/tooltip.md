---
title: Tooltip
category: components
b2c: true
expert: true
stable: done
---

The Tooltip component requires additional CSS files from the Angular CDK to work. Please add the following files to your global styles or into the styles option in the angular.json if not already present (learn [how to enable Angular CDK styles](./documentation/overlay/overview#angular-cdk)):

```
  node_modules/@angular/cdk/overlay-prebuilt.css
  node_modules/@angular/cdk/a11y-prebuilt.css
```

### UX guidelines

The Tooltip provides a text label that is displayed when the user hovers over or focuses an element. It allows to display additional information for supporting the customer, and should **only be used for optional information**.

Please note that according to our UX guidelines the Tooltip is only supposed to contain **short (1-2 sentences) plain text descriptions**. The Tooltip is not supposed to contain any formatting or control elements and thus does not support this. If you need to display a longer text (like manual instructions, explanations and so on) that needs to be formatted, or you need to insert control elements (buttons, links, etc.), then you have to [use the Popover component instead of the Tooltip](./documentation/popover/overview#ux-guidelines).

### Basic tooltip

<!-- example(tooltip-basic) -->

### Positioning

By default the tooltip will be displayed below the element, but this can be configured using the `nxTooltipPosition` input. The tooltip can be displayed above, below, left or right of the element.

| Position | Description                         |
| -------- | ----------------------------------- |
| top      | Display above the element           |
| bottom   | Display beneath the element         |
| left     | Display to the left of the element  |
| right    | Display to the right of the element |

<!-- example(tooltip-positions) -->

### Fallback strategy

The positioning of the tooltip follows a fallback strategy to make sure that the component is displayed correctly in the most common situations. Fallback means that the tooltip tries to find a fitting position within the window. The following table explains the fallback strategy of the tooltip.

<!-- example(tooltip-fallbacks-table, { "hideHeader": true }) -->

Note that the table contains a few positions that are not available to be set by the user. `top-left`, `top-right`, `bottom-left` and `bottom-right` are special positions that are used as a fallback option only.

### Showing and hiding

By default, the tooltip will be shown when the user's mouse hovers over the tooltip's trigger element and hides when the user's mouse leaves.

### Show and hide delays

To change the delay before showing or hiding the tooltip, you can use the inputs `nxTooltipShowDelay` and `nxTooltipHideDelay` to provide a delay time in milliseconds.

The following example has a tooltip that waits one second to display after the user hovers over the button, and waits another second to hide after the user moves the mouse away.

<!-- example(tooltip-delay) -->

### Disabling the tooltip from showing

To completely disable a tooltip, set `nxTooltipDisabled`. While disabled, a tooltip will never be shown.

<!-- example(tooltip-disabled) -->

### Manually calling show() and hide()

To manually cause the tooltip to show or hide, you can call the show and hide directive methods, which both accept a number in milliseconds to delay before applying the display change.

<!-- example(tooltip-programmatic) -->

### Global Settings

You can configure your app's tooltip default show/hide delays and default position by configuring and providing your options using the `NX_TOOLTIP_DEFAULT_OPTIONS` injection token.

<!-- example(tooltip-settings) -->

If you want to use a custom scroll strategy, you can use the `NX_TOOLTIP_SCROLL_STRATEGY` injection token with a factory provider. The `Overlay` service from `@angular/cdk/overlay` offers 4 different scroll strategy options:

-   **reposition:** allow background scroll, the overlay moves with the background (default).
-   **close:** allow background scroll, closes the overlay on scroll.
-   **block:** disallow background scroll, the overlay does not move.
-   **noop:** allow background scroll, the overlay does not move.

<!-- example(tooltip-scroll-strategy-provider) -->

Alternatively, the `NX_TOOLTIP_SCROLL_STRATEGY` injection token can be provided by importing `NxScrollStrategyModule.withConfig({ ... })` into your application or feature module, after your other aquila imports.

### Accessibility

Elements with the `nxTooltip` will add an `aria-describedby` label that provides a reference to a visually hidden element containing the tooltip's message. This provides screenreaders the information needed to read out the tooltip's contents when the end-user focuses on the element triggering the tooltip. The element referenced via `aria-describedby` is not the tooltip itself, but instead an invisible copy of the tooltip content that is always present in the DOM.

 ### Truncating text
Truncating text with CSS and displaying the full text in a tooltip on hover.
 <!-- example(tooltip-trim-text) -->
