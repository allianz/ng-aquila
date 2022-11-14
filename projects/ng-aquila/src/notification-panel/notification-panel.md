---
title: Notification panel
category: components
b2c: false
expert: true
stable: done
alias: popover
---

The notification panel is supposed to be used in the header to give users quick access to recent messages and notifications. It consists of a trigger button that opens the notification flyout.

## Clickable items

In this variation each notification is completely clickable and will trigger a routing event. Try to avoid additional interactive elements inside each notification. For this use case see the next example [Notifications with actions](./documentation/notification-panel/overview#notifications-with-actions).

<!-- example(notification-panel-clickable) -->

## Mixing clickable with informational notifications

For the use case that you want to mix clickable and non-clickable notifications you can either omit the `href` attribute on the `anchor` tag or use `[routerLink]="null"` or use a div. An anchor without an href is considered as a normal text element by assistive technology. Please note there is an issue at Angular that `[routerLink]="null"` adds a href to the current route and is not removing it. See: https://github.com/angular/angular/issues/13980 but the router will not do anything if the route is the same.

<!-- example(notification-panel-mixed) -->

## Notifications with actions

If you need more actions inside a notification set the property `clickable` to false and add your interactive elements to the content. Examples for these actions are links, delete buttons or context menus. Instead of `div`s you could also use anchor elements without a href or use the element selector `nx-notification-panel-item`.

<!-- example(notification-panel-actions) -->

## Global Settings

If you want to use a custom scroll strategy, you can use the `NX_NOTIFICATION_PANEL_SCROLL_STRATEGY` injection token with a factory provider. The `Overlay` service from `@angular/cdk/overlay` offers 4 different scroll strategy options:

-   **reposition:** allow background scroll, the overlay moves with the background (default).
-   **close:** allow background scroll, closes the overlay on scroll.
-   **block:** disallow background scroll, the overlay does not move.
-   **noop:** allow background scroll, the overlay does not move.

<!-- example(notification-panel-scroll-strategy-provider) -->

Alternatively, the `NX_NOTIFICATION_PANEL_SCROLL_STRATEGY` injection token can be provided by importing `NxScrollStrategyModule.withConfig({ ... })` into your application or feature module, after your other aquila imports.

## Accessibility

Don't forget to add an title aria-label to the trigger button. Use an anchor tag if the whole notification is supposed to be clickable. A good way to help screen reader users is to add a wrapper around the triggering button defining an region, e.g. `region="Notifications"`. That helps screen reader users to quickly access the trigger button from anywhere in the page.

### Keyboard support

ENTER - opens the overlay panel

ESC - Closes the overlay panel

TAB - Tab through the notification items and its focusable children if there are any

UP ARROW / RIGHT ARROW - Move focus to the next notification item.

DOWN ARROW / LEFT ARROW - Move focus to the previous notification item.
