---
title: Popover
category: components
b2c: true
expert: true
stable: done
---

Popover requires Angular CDK (incl. CSS). Learn [how to enable Angular CDK styles](./documentation/overlay/overview#angular-cdk).

### Global settings

If you want to use default settings for all popovers, you can use the `POPOVER_DEFAULT_OPTIONS` injection token. Here global settings for `popoverWidth` and `popoverMaxWidth` can be defined.

If a certain popover should have another styling, you can overwrite the global default by explicitly defining the property in the template.

### UX guidelines

If you're building an Expert (internal B2B/B2E) application, you can use both the Popover and the [Tooltip component](./documentation/tooltip/overview#ux-guidelines). If you only need to display a short contextual hint (button hint, info icon, etc.) please consider if the simpler [Tooltip element is better for your use case](./documentation/tooltip/overview#ux-guidelines).

### Trigger types

It is possible to open the popover by hover, click event or manually. To adjust the trigger type accordingly, set the `nxPopoverTrigger` attribute to click/hover/manual.

-   The popover triggered by hover will close immediately after the mouse exits the trigger.
-   The popover triggered by click will stay open until the user explicitly closes the the popover.
-   If set to manual, you have to open and close it manually. Use the public interface (open/close) of the directive or rely on the `nxPopoverShow` attribute.
-   To learn more about the hover trigger please check the [Hover triggered popover](./documentation/popover/overview#hover-triggered-popover) section.
<!-- example(popover-trigger) -->

### Closing on document click

You can enable the popover to close when the user clicks outside of it by setting the property `closeOnClickOutside` as shown in the example below. Per default the triggers of type `click` and `manual` close on click outside of the popover. The property has no effect if you apply it on a trigger of type `hover`.

<!-- example(popover-click-outside) -->

### Positioning

It is possible to position the popover top/right/bottom/left to the trigger by setting the `nxPopoverDirection` attribute to top/right/bottom/left.

<!-- example(popover-positioning) -->

### Fallback strategy

The positioning of the popover follows a fallback strategy to make sure that the component is displayed correctly in the most common situations. Fallback means that the popover tries to find a fitting position within the window.

The following table explains the fallback strategy of the popover.

<!-- example(popover-table, { "hideHeader": true }) -->

### Custom content

The popover can carry custom content.

<!-- example(popover-custom) -->

### Extended popover

The popover can be extended with a header and a footer, consisting of a headline and buttons.

<!-- example(popover-extended) -->

The popover can be used for a guided tour

<!-- example(popover-guided-tour) -->

### Popover without arrow

The popover arrow can be hidden using the `nxPopoverHideArrow`.

<!-- example(popover-without-arrow) -->

### Popover width and maxWidth

The popover `width` and `max-width` can be set with the `popoverWidth` and `popoverMaxWidth` inputs. To set the `width` and `max-width` globally use the injection token `POPOVER_DEFAULT_OPTIONS`.

<!-- example(popover-width) -->

### Custom lazyloaded content

The popovers supports lazyloading when you provide a `ng-template` with the `nxPopoverContent` directive attached. The content of the template will only be instantiated once the popover gets opened. After closing the content will be destroyed again.

<!-- example(popover-lazyload) -->

### Modal popover

It is possible to configure the popover to be modal - just set `nxPopoverTrigger=click` and `nxPopoverModal=true`. Now the popover can be closed via the close icon as well as with the ESC-Key.

<!-- example(popover-modal) -->

### Scroll strategy

The popover implements the two strategies close and reposition to handle the behavior of the popover when the owning container scrolls. The strategy close will automatically close the popover while reposition scrolls the popover with its origin.

<!-- example(popover-scroll) -->

### cdkScrollable

To make the popovers behave correctly while scrolling, you have to place the directive cdkScrollable on the scrolling container.

```html
<div cdkScrollable></div>
```

The following examples illustrates the usage of `cdkScrollable`. Make sure to import the `CdkScrollableModule` from `@angular/cdk/scrolling`. The popovers are configured to close on scroll events. If there is no `cdkScrollable` on the container, scrolling leads to unexpected behaviour (left). By adding `cdkScrollable` to the right container, the popover closes as expected (right).

<!-- example(popover-scrollable) -->

### Hover triggered popover

The popover triggered by hover will close immediately after the mouse exits the trigger. `nxPopoverCloseable` can't be used with trigger type hover.

Please note that the popover with hover is only suitable for optional information. The information in the popover is not accessible for all use cases (e.g., touch devices) and is therefore to be used with care - if at all.

<!-- example(popover-hover) -->

### Global Settings

If you want to use a custom scroll strategy, you can use the `NX_POPOVER_SCROLL_STRATEGY` injection token with a factory provider. The `Overlay` service from `@angular/cdk/overlay` offers 4 different scroll strategy options:

-   **reposition:** allow background scroll, the overlay moves with the background (default).
-   **close:** allow background scroll, closes the overlay on scroll.
-   **block:** disallow background scroll, the overlay does not move.
-   **noop:** allow background scroll, the overlay does not move.

<!-- example(popover-scroll-strategy-provider) -->

Alternatively, the `NX_POPOVER_SCROLL_STRATEGY` injection token can be provided by importing `NxScrollStrategyModule.withConfig({ ... })` into your application or feature module, after your other aquila imports.

#### Internationalization

To set different translations of the countries and to change texts like the close icon aria label you can set these via the `NxPopoverIntl` class provider.

<!-- example(popover-i18n) -->

### Accessibility

The assigned trigger will always receive `aria-describedby` property to point screenreaders to the related content in the popover.
