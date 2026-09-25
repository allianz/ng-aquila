---
title: Notifications
description: Inline message banners (info, success, warning, error)
category: components
b2c: true
expert: true
stable: done
alias: message banner, toast, snackbar, alert, info, error, warning, success, notification, message
a1Light: true
a1Densities: true
group: Data Display
---


### Message

Use this component to present a contextual message with different color coding. You can pass in any content you consider appropriate.

By default, the message is rendered inside a filled, bordered surface. Set the `contained` input to `false` to render it as plain icon and text instead, without a background or border.

#### Contexts

Available contexts: `info | positive | warning | critical`. The context drives the colors and the
icon, and is shared by the toast and the banner below.

<div class="docs-deprecation-warning">
<code>error</code> and <code>success</code> are deprecated aliases of <code>critical</code> and <code>positive</code>. They still work, but use the new names for new code.
</div>

<!-- example(message-plain) -->

### Contained message

Per default (or by explicitly setting `contained` to `true`), the message is rendered inside a filled, bordered surface, colored according to its context.

<div class="docs-hide-a1">

Besides the message component you can also use `<nx-error>` for error messages. The NxErrorComponent has a different look in expert applications (for a global configuration please have a look at the [expert module](./documentation/config/overview)). We recommend using _nx-error_, especially for use cases where you need to support both styles.

<!-- example(message-contained) -->

</div>

<div class="docs-hide-ndbx">

#### Contexts

The contained message supports the same contexts as the plain message.

<!-- example(message-contexts) -->

</div>

#### Context icon

Every context renders an icon in front of the content by default (`showContextIcon` defaults to `true`).
Set `showContextIcon` to `false` to leave it out.

<!-- example(message-show-context-icon) -->

#### Closable

You can add a close icon to the message component by using the `closable` input. A `(close)` event is emitted when the user clicks on the close icon.

The close button is only rendered on a contained message. Combining `closable` with `contained="false"` leaves the message plain and without a close button.

When using a closable message please set an `aria-label` on the close button via the `closeButtonLabel` property. If you don't set the `aria-label` explicitly it will have **'Close dialog'** as default value. As the default is in English, in almost all cases you should explicitly set the label.

When displaying notifications we recommend that you use `aria-live` combined with the [LiveAnnouncer](https://material.angular.io/cdk/a11y/api) in order to be accessibility compliant.

<!-- example(message-closable) -->

### Toast message

Message Toast is a small popup **which should only contain success or informative messages**. It has a title, that should be short and descriptive. A Message Toast appears center-aligned from the bottom of the application. Per default it disappears after 3 seconds, but please keep in mind that the show duration should be set dependent on the length of the message.

The `NxMessageToastModule` provides a service for displaying these Message Toasts: `NxMessageToastService`.

**Please make sure you have imported the cdk-a11y and cdk-overlay stylesheets** as shown below, so that the message toasts get displayed correctly:

```scss
@import '@angular/cdk/overlay-prebuilt.css';
@import '@angular/cdk/a11y-prebuilt.css';
```

#### Showing a message toast

The `NxMessageToastService` offers multiple options for showing a message toast: by passing a text string, a template or a component.

```ts
// Simple message toast with a custom text
let toastRef: NxMessageToastRef = messageToastService.open('My message toast text');

// Message toast with a custom template
let toastRef: NxMessageToastRef = messageToastService.openFromTemplate(myTemplateRef);

// Message toast from a custom component
let toastRef: NxMessageToastRef = messageToastService.openFromComponent(myComponent);
```

In all cases a `NxMessageToastRef` is returned. It can be used for closing the message toast or subscribing to its closing. This behaviour is shown in the following examples.

If using `openFromComponent` you can access data from the component by injecting the `NX_MESSAGE_TOAST_COMPONENT_DATA` token:

```ts
import { Component, Inject } from '@angular/core';
import { NX_MESSAGE_TOAST_COMPONENT_DATA } from '@allianz/ng-aquila/message-toast';

@Component({
    selector: 'your-message-toast',
    template: 'passed in {{ data.name }}',
})
export class YourMessageToast {
    constructor(@Inject(NX_MESSAGE_TOAST_COMPONENT_DATA) readonly data: any) {}
}
```
<!-- example(message-toast-opening) -->

#### Configuration

Every message toast is opened with a default `NxMessageToastConfig` value. You can pass your own configuration as a second optional argument when opening a message toast. By passing your custom configuration you can change the context of the message toast and set a duration. For more information on the configurable parameters check out the [notifcation API](./documentation/notifications/api).

In the following example the toast message does not close automatically, but in a programmatic way. By pasing a `duration: 0` via the toast message config the toast won't close automatically,

```ts
export const myCustomOptions: NxMessageToastConfig = {
    duration: 0,
    context: 'positive',
    announcementMessage: 'Yay, you see a positive message toast',
};

let toastRef = messageToastService.open('My message toast text.', myCustomOptions);
```

<!-- example(message-toast-custom-settings) -->

#### Contexts

Toasts support `info | positive | warning | critical` (the deprecated `success` alias also works). Unlike `nx-message`, toasts do not support `regular` or the deprecated `error`.

The context icon is shown by default (`showContextIcon: true`). Set `showContextIcon` to `false` in the config to
leave it out.

**Accessibility:** Any warning or critical message toast needs a permanent representation on the
page, and it must be connected to the error-causing element via `aria-describedby` where applicable.
A message toast is a temporary element, so having important information in a toast alone is an
accessibility issue.

<div class="docs-hide-ndbx">

<!-- example(message-toast-contexts) -->

</div>

#### Global Configuration

You can also overwrite the default message toast options by using the `NX_MESSAGE_TOAST_DEFAULT_CONFIG` injection token as shown in the code snippet below:

```ts
@NgModule({
  providers: [
    {
      provide: NX_MESSAGE_TOAST_DEFAULT_CONFIG,
      useValue: { duration: 7000, context: 'info' }
    }
  ]
})
```

#### Accessibility

##### Wrapper id

All message toasts of an app are rendered inside one `aria-live` wrapper element, which carries the id `nx-toast-message-region` by default. Every independently bootstrapped Angular app creates its own wrapper, so when several apps run on the same page (e.g. in a micro frontend setup) that id ends up on more than one element, which breaks `aria-labelledby` / `aria-describedby` relationships for screen readers.

In that case give each app its own id via the `wrapperId` of the global configuration:

```ts
{
  provide: NX_MESSAGE_TOAST_DEFAULT_CONFIG,
  useValue: { wrapperId: 'my-app-toast-message-region' }
}
```

##### Aria-live and politeness

Message toasts are announced via an `aria-live` region. By default, their politeness level is set to `polite`. This can be changed by overwriting the `politeness` in the message toast configuration. The `polite` value is recommended, as then the toast messages are not presented while the user is active on the page (e.g. while the user is listening to the text of another element), but at the next opportunity (e.g. when the user pauses typing).

##### Announcement messages

If there is no `announcementMessage` specified the screen reader will read the content of the message toast. **Please pay attention that some screen readers don't read the text out loud when a message toast is opened from a template**. In these cases you **must** define an `announcementMessage` in order to guarantee compatibility with all screen readers.

##### A11y styles

**Please make sure you have imported the cdk-a11y styles**, so that `aria-live` messages don't get displayed on the webpage. The message toasts use the Cdk LiveAnnouncer, which needs these styles to work properly. It is best to import them in your global application stylesheets as follows:

```scss
@import '@angular/cdk/a11y-prebuilt.css';
```

You can find more information on aria-live regions and the available politeness values [here](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties#aria-live).

### Banner message

The notification banner is a static element that shifts the content of the page down in order to communicate information to the user. Per default, message banners have a close icon button in the top right, which can be disabled by the `closable` input.

Analogously to the Inline Notification, a message banner emits a `close` event when being closed by the close icon button. The example below shows how the `close` event can be used for hiding a message banner.

#### Contexts

Banners support the same [contexts](#contexts) as `nx-message`, including the deprecated `error` and
`success` aliases, except for `regular`.

<!-- example(message-banner) -->

#### Context icon

Banners follow the theme when `showContextIcon` is not set: no icon under A1, an icon under the other
themes. Set `showContextIcon` explicitly to override that in either direction.

#### Closable

Banners are closable by default. Set `closable` to `false` for a banner the user cannot dismiss —
the close button is left out and the reserved inline-end padding goes with it.

<div class="docs-hide-ndbx">

#### Actions

Project action buttons into a banner with the `nxMessageBannerActions` directive. The
`actionLayout` input decides where they go: 
- `horizontal` (default) places them on the same line as
the content, next to the close button
- `vertical` puts them on their own line below the content.

<!-- example(message-banner-configuration) -->

</div>
