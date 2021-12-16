---
title: Layout
category: general
b2c: true
expert: true
stable: done
noApi: true
---

### Margins

The margins are intended to help you layout components shipped with this library. Setting such margins is needed since the components we ship are usually agnostic to any layout, putting you in control of laying out the components the way needed for your application's user experience.

They can be integrated through the angular JSON `angular[-cli].json` or by importing it in your styles `style.scss` file.

Use this path to import it via your angular-cli.json file:

```ts
"styles": [
  "node_modules/@aposin/ng-aquila/css/utilities.css"
]
```

If you don't use the Angular CLI or just prefer another place you can use this css import instead:

```css
@import '@aposin/ng-aquila/css/utilities.css';
```

#### Margin sizes

We provide you with following margin sizes:

<!-- example(margin-sizes, { "hideHeader": true }) -->

#### Usage

We also provide you with helper classes for all these sizes, which follow the pattern `.nx-margin-{direction}-{size}`.

The `direction` property is one of the following:

-   **left** - sets `margin-left`
-   **right** - sets `margin-right`
-   **top** - sets `margin-top`
-   **bottom** - sets `margin-bottom`
-   **x** - sets `margin-left` and `margin-right`
-   **y** - sets `margin-top` and `margin-bottom`
-   blank - sets a margin on all sides of the element

Thereby, `size` has to be matching one of the sizes defined in the table above.

An example of the margin helper classes usage can be found in the example below.

<!-- example(margin-usage) -->

### Breakpoints and Viewport

Our library provides a set of tools for reacting to different viewports. For simple hiding elements on certain breakpoints you can use our utility classes. For more sophisticated use cases there is a viewport service. It provides three methods: `min`, `max` and `between` for subscribing to particular viewport breakpoints.

#### Hide elements on specific breakpoints using CSS classes

We provide a set of utility classes that can be used to hide elements on certain viewport sizes.

Remember that you can combine CSS classes on the same element. So for example, if you wanted an element to show on small and large desktops, but be hidden on tablets and mobile, you could do something like the following.

```html
<p class="nx-hidden-xs nx-hidden-s nx-hidden-m">Hidden on tablet and smaller</p>
```

**Available classes:**

<!-- example(hidden-classes, { "hideHeader": true }) -->

#### Breakpoints

The following viewport breakpoints are available:

```ts
/** Available breakpoints to subscribe to. */
export enum NxBreakpoints {
    BREAKPOINT_XSMALL = 0,
    BREAKPOINT_SMALL = 320,
    BREAKPOINT_MEDIUM = 704,
    BREAKPOINT_LARGE = 992,
    BREAKPOINT_XLARGE = 1280,
    BREAKPOINT_2XLARGE = 1472,
    BREAKPOINT_3XLARGE = 1760,
}
```

You can react to changes in the viewport in your components the following way:

```ts
import { NxViewportService, NxBreakpoints } from '@aposin/ng-aquila/utils';
showComponentX: boolean;

constructor(private viewportService: NxViewportService) {
  this.viewportService.max(NxBreakpoints.BREAKPOINT_LARGE)
    .subscribe(isMaximumLarge => this.showComponentX = isMaximumLarge);
}
```

#### Basic Viewport Subscription

The example below shows a sidebar, which is expanded from 704px (BREAKPOINT_MEDIUM) on and otherwise closed.

<!-- example(viewport-change) -->

#### Advanced: custom throttleTime

Per default, the viewport service catches window resize events with an interval of 200ms. If this default throttle time does not serve your needs you can change it by passing it as a parameter to the methods `min`, `max` and `between`:

```ts
this.viewportService
    .between(NxBreakpoints.BREAKPOINT_XSMALL, NxBreakpoints.BREAKPOINT_MEDIUM, 500)
    .subscribe(isMaximumLarge => (this.showComponentX = isMaximumLarge));
```
