---
title: Modal
category: components
b2c: true
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Important: </strong>
  Please note that the <strong>nx-modal</strong> component is deprecated. For opening modals use the new <strong> NxDialogService</strong> instead.
</div>

The `NxDialogService` can be used to open modals from components or predefined templates.

**Important:** Please note that the module for this component depends on the Angular animations module, so in case you do not already have it, you need to explicitly import the `BrowserModule` and `BrowserAnimationsModule` in your app.module.

### Modal Opening

A modal can be opened by using the `open` method of the service and passing an optional configuration object as a second parameter as shown below. The return object of the open function is a reference to the opened modal, which can be used for closing the modal or subscribing to its closing events.

```ts
let myDialogRef = dialogService.open(MyModalComponent, {
    width: '600px',
});

myDialogRef.close();
```

The example below shows how the modal dialog can be opened **with a template** and **with a component**. If you use a specific component for your modal you have to include it in the list of `entryComponents` in your `NgModule`, as it gets instantiated at run-time and won't be found otherwise.

<!-- example(modal-opening) -->

### Modal Closing

You can close a dialog in three different ways:

-   by using the option `closeIconButton="true"` in the `NxModalConfig` to show a "X" close icon in the modal which can be used for closing
-   by using the `myDialog.close()` method on a `NxModalRef` to close the dialog programatically
-   by using the `nxModalClose` directive on an action button

When using the last two options you can also pass a result object/string on close. The three different closing variants are demonstrated in the example below:

<!-- example(modal-closing) -->

### Closing behaviour

By default, the modal will close if the user clicks on the backdrop or hits the ESC key. These options can be disabled by using the `disableClose` parameter of the `NxModalConfig` as shown in the example below:

<!-- example(modal-closing-behaviour) -->

### Modal Content Directives

You can separate the dialog body into dialog content and dialog actions by using the directives `nxModalContent` and `nxModalActions`. `nxModalActions` is container for action buttons placed at the bottom of the dialog. The example below shows how to apply them for a Dialog with a disclaimer look.

<!-- example(modal-content-actions) -->

### Fixed width

By default the width of the modal dialog is `736px`. You can change this behavior by setting the `width` property in the `NxModalConfig`.

<!-- example(modal-fixed-width) -->

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
    constructor(@Inject(NX_MODAL_DATA) public data: any) {}
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

### Directionality

By default all dialogs are rendered with `ltr` direction. If you need the dialog to use your application locale direction, for example when you need to support RTL scripts, you can use the `direction` configuration property.

To get your app direction we recommend using [Directionality](https://material.angular.io/cdk/bidi/overview) from Angular CDK.

<!-- example(modal-with-direction)> -->

### Accessibility

By default, each modal has `role="dialog"` on the root element. The role can be changed to `alertdialog` via the `NxModalConfig`.

The aria-label, aria-labelledby, and aria-describedby attributes of the modal as well as the aria-label of the optional close button can be set via the `NxModalConfig` as well. It is recommended to at least give a modal an aria-label or aria-labelledby attribute.

When a dialog opens, the first focusable element will be focused. The CdkOverlay used in the dialog traps the focus in itself in order to prevent users from interacting with elements in the background. Per default, the focus will be given back to the element which has been focused before the opening of the dialog.

Pressing the escape key will close the dialog per default. You can disable this behaviour by setting the `disabledClose` option to false in the `NxModalConfig`, but it is recommended to keep it on as it is the expected behaviour of a modal dialog.

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
