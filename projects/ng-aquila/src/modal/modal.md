---
title: Modal
category: components
b2c: true
expert: true
stable: done
alias: dialog
---

The `NxDialogService` can be used to open modals from components or predefined templates.

The class `nx-modal-margin-bottom` can be used to get the correct vertical spacing for the elements withing the modal.

**Important:** Please note that the module for this component depends on the Angular animations module, so in case you do not already have it, you need to explicitly import the `BrowserModule` and `BrowserAnimationsModule` in your app.module.

The visual representation of modal overlay depends on Angular CDK styles. Make sure you [enable Angular CDK styles](./documentation/overlay/overview#angular-cdk) in your application.

### Modal Opening

A modal can be opened by using the `open` method of the service and passing an optional configuration object as a second parameter as shown below. The return object of the open function is a reference to the opened modal, which can be used for closing the modal or subscribing to its closing events.

```ts
const myDialogData: MyDialogData = { /* some data */ };

const myDialogRef: NxModalRef<MyDialogComponent, MyDialogResult> = this.dialogService.open(MyDialogComponent, {
    width: '600px',
    data: myDialogData,
});

// always support undefined result type for easily closable dialogs
myDialogRef.beforeClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
});

// result parameter is optional, defaults to undefined
myDialogRef.close('some dialog result');
```

The example below shows how the modal dialog can be opened **with a template** and **with a component**.

<!-- example(modal-opening) -->

### Modal Closing

You can close a dialog in three different ways:

-   set `NxModalConfig.closeIconButton` to `true` to show a standard close button, returning `undefined` as result.
-   call `NxModalRef.close()` programatically, optionally with a result parameter. Returns `undefined` by default.
-   use `nxModalClose` directive on an action button, optionally with a result input. Returns `undefined` by default.

The dialog result can be observed by subscribing to `NxModalRef.beforeClosed()` and `NxModalRef.afterClosed()` observables.

The three different closing variants are demonstrated in the example below:

<!-- example(modal-closing) -->

### Closing behaviour

By default, the modal will close if the user clicks on the backdrop or hits the ESC key. These options can be disabled by using the `disableClose` parameter of the `NxModalConfig` as shown in the example below:

<!-- example(modal-closing-behaviour) -->

### Modal Content Directives

You can separate the dialog body into dialog content and dialog actions by using the directives `nxModalContent` and `nxModalActions`. `nxModalActions` is container for action buttons placed at the bottom of the dialog. `nxModalTitle` can be used to put the title above or inside the `nxModalContent`. Placed inside `nxModalContent` the headline will scroll with the content, placed on top it will stay fixed. The example below shows how to apply them for a Dialog with a disclaimer look.

<!-- example(modal-content-actions) -->

### Fixed width

By default the width of the modal dialog is `736px`. You can change this behavior by setting the `width` property in the `NxModalConfig`.

<!-- example(modal-fixed-width) -->

 ### Modal with status
 Below is an example of how to create a modal with status by using the `nxModalTitle`
 <!-- example(modal-status) -->

### Fullscreen

Set `fullscreen` to `true` to show the modal in fullscreen. When using `fullscreen` the `width`, `height`, `maxWidth` and `maxHeight` are overwritten.

<!-- example(modal-fullscreen) -->

### Configuration

Every dialog is opened with a default configuration. By passing a second parameter (`NxModalConfig` object) when opening a modal you can overwrite this configuration. Configurable are settings such as the dialog width and height, closing on backdrop click, adding additional classses to the dialog container etc. For more details on all configurable properties check out the `NxModalConfig` documentation [here](./documentation/modal/api#NxModalConfig).

You can also share data with your dialog via the configuration object:

```ts
let dialogRef = dialog.open(YourDialog, {
    data: { name: 'Max Mustermann' },
});
```

In your dialog you can access this data by injecting the `NX_MODAL_DATA` token:

```ts
import { Component, Inject } from '@angular/core';
import { NX_MODAL_DATA } from '@aposin/ng-aquila/modal';

@Component({
    selector: 'your-dialog',
    template: 'passed in {{ data.name }}',
})
export class YourDialog {
    constructor(@Inject(NX_MODAL_DATA) readonly data: any) {}
}
```

If you are using a template for the content of your dialog the data object will be available implicitly in your template as shown in the example below:

<!-- example(modal-data-injection) -->

### Global Settings

You can also overwrite the default dialog configuration by using the NX_MODAL_DEFAULT_CONFIG injection token as shown in the code snippet below:

```ts
@NgModule({
  providers: [
    {
        provide: NX_MODAL_DEFAULT_OPTIONS,
        useValue: { width: 700px, showCloseIcon: true}
    }
  ]
```

If you want to use a custom scroll strategy, you can use the `NX_MODAL_SCROLL_STRATEGY` injection token with a factory provider. The `Overlay` service from `@angular/cdk/overlay` offers 4 different scroll strategy options:

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
    provide: NX_MODAL_SCROLL_STRATEGY,
    useFactory: scrollStrategyFactory,
    deps: [Overlay],
  }],
}
export class AppModule {}
```

Alternatively, the `NX_MODAL_SCROLL_STRATEGY` injection token can be provided by importing `NxScrollStrategyModule.withConfig({ ... })` into your application or feature module, after your other aquila imports.

### Directionality

By default all dialogs are rendered with `ltr` direction. If you need the dialog to use your application locale direction, for example when you need to support RTL scripts, you can use the `direction` configuration property.

To get your app direction we recommend using [Directionality](https://material.angular.io/cdk/bidi/overview) from Angular CDK.

<!-- example(modal-with-direction)> -->

### Accessibility

By default, each modal has `role="dialog"` on the root element. The role can be changed to `alertdialog` via the `NxModalConfig`.

The aria-label, aria-labelledby, and aria-describedby attributes of the modal as well as the aria-label of the optional close button can be set via the `NxModalConfig` as well. It is recommended to at least give a modal an aria-label or aria-labelledby attribute.

When a dialog opens, the first focusable element will be focused. The CdkOverlay used in the dialog traps the focus in itself in order to prevent users from interacting with elements in the background. Per default, the focus will be given back to the element which has been focused before the opening of the dialog.

Pressing the escape key will close the dialog per default. You can disable this behaviour by setting the `disabledClose` option to false in the `NxModalConfig`, but it is recommended to keep it on as it is the expected behaviour of a modal dialog.

 ### Block modal closing
The following example demonstrates the usage of the `shouldClose` and `closeDenied` APIs to create a modal that displays a popover notification when attempting to close the modal with unsaved data.
 <!-- example(modal-unsaved) -->

### Deprecated Modal Component

The example below shows the previous implementation of the modal dialog, which is already deprecated and should not be used.

For using it you have to import the `NxModalModule` as follows:

```ts
import { NxModalModule } from '@aposin/ng-aquila/modal';

@NgModule({
  imports: [
    NxModalModule.forRoot()
  ]
})
```

<!-- example(modal-basic) -->
