---
title: Notifications
category: components
b2c: true
expert: true
stable: done
alias: message banner, toast, snackbar, alert, info, error, warning, success
---


### Inline Notification

Use this component to present a contextual message with different color coding. You can pass in any content you consider appropriate.

#### Info

<!-- example(message-info) -->

#### Error

Besides the message component you can also use `<nx-error>`. The NxErrorComponent has a different look in expert applications (for a global configuration please have a look at the [expert module](./documentation/config/overview)). We recommend using _nx-error_, especially for use cases where you need to support both styles.

<!-- example(message-error) -->

#### Success

<!-- example(message-success) -->

#### Warning

<!-- example(message-warning) -->

#### Closable

You can add a close icon to the message component by using the `closable` input. A `(close)` event is emitted when the user clicks on the close icon.

When using a closable message please set an `aria-label` on the close button via the `closeButtonLabel` property. If you don't set the `aria-label` explicitly it will have **'Close dialog'** as default value. As the default is in English, in almost all cases you should explicitly set the label.

When displaying notifications we recommend that you use `aria-live` combined with the [LiveAnnouncer](https://material.angular.io/cdk/a11y/api) in order to be accessibility compliant.

<!-- example(message-closable) -->

### Message Banner

The notification banner is a static element that shifts the content of the page down in order to communicate information, a warning or an error to the user. Respectively it can have an **info, success or warning context**. Per default, message banners have a close icon button in the top right, which can be disabled by the `closable` input.

Analogously to the Inline Notification, a message banner emits a `close` event when being closed by the close icon button. The example below shows how the `close` event can be used for hiding a message banner.

<!-- example(message-banner) -->

### Message Toast

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
import { NX_MESSAGE_TOAST_COMPONENT_DATA } from '@aposin/ng-aquila/message-toast';

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
    context: 'success',
    announcementMessage: 'Yay, you see a success message toast',
};

let toastRef = messageToastService.open('My message toast text.', myCustomOptions);
```

<!-- example(message-toast-custom-settings) -->

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
