---
title: Overlay
category: components
b2c: true
expert: true
stable: done
---


### Purpose

The overlay service provides reusable functionality to open any kind of content in an overlay panel that is attached to another element. Components that open these overlay panels in the library are e.g. the dropdown, context menu or the autocomplete. While these serve specific purposes this service can be used to create custom menus or autocomplete style components.

### Features

Here are some features and advantages you get by using the service

-   Style consistency of the overlay
-   Access to the defined positioning logic of overlays including the fallback logic
-   Focus trap into the overlay for better accessibility
-   Configurable backdrops and closing behavior

### Angular CDK

Under the hood the service is using the [CDK overlay](https://material.angular.io/cdk/overlay/overview). You can learn more about position and scroll strategies in the CDK documentation.

The CDK is required by a number of modules such as message toast, popover or dropdown as they use the overlay component. If you intend to use those, please make sure you have imported the cdk-a11y and cdk-overlay stylesheets, so that everything gets displayed correctly:

```scss
@import '@angular/cdk/overlay-prebuilt.css';
@import '@angular/cdk/a11y-prebuilt.css';
```

If you create a new project, the best way to add the necessary styles would be by running `ng add @allianz/ngx-ndbx`.

If you migrate an existing project, make sure to add these to your global styles or into the styles option in the angular.json.

### Accessibility

It is important to notice that the content that gets put into the overlay has to implement the specific accessibility patterns it needs. The service only takes care of accessibility features around the content, like closing or focus trapping. As an example a dropdown or autocomplete has to implement the role listbox, the context menu in contrast implements role menu. The role can be either set on the overlay wrapper directly via the configuration or can come from the content component.

#### Focus trap and keyboard navigation

By default the focus gets trapped into the overlay that keyboard and screen reader users can navigate inside the content. Pressing escape closes the overlay. The focus trap can be turned off via the configuration for tooltip style patterns that only serve optional content that is presented differently to the user via a live region or with aria-describedby.

### Positioning

You can use the predefined directions `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left` or `right` which all have fallback positions if the overlay doesn't fit into the direction.

<!-- example(overlay-positioning) -->

### Limiting Fallbacks

Depending on the requirements of your overlay you can limit the fallbacks the overlay can choose by setting the `fallbackOrientation` option in the configuration. By default the overlay will choose fallbacks clockwise from the starting direction.

<!-- example(overlay-limiting-fallbacks) -->

### Global Settings

If you want to use a custom scroll strategy, you can use the `NX_OVERLAY_SCROLL_STRATEGY` injection token with a factory provider. The `Overlay` service from `@angular/cdk/overlay` offers 4 different scroll strategy options:

-   **reposition:** allow background scroll, the overlay moves with the background (default).
-   **close:** allow background scroll, closes the overlay on scroll.
-   **block:** disallow background scroll, the overlay does not move.
-   **noop:** allow background scroll, the overlay does not move.

```ts
function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close({ threshold: 100 });
}

@NgModule({
  /* ... */
  providers: [{
    provide: NX_OVERLAY_SCROLL_STRATEGY,
    useFactory: scrollStrategyFactory,
    deps: [Overlay],
  }],
}
export class AppModule {}
```

Alternatively, the `NX_OVERLAY_SCROLL_STRATEGY` injection token can be provided by importing `NxScrollStrategyModule.withConfig({ ... })` into your application or feature module, after your other aquila imports.
