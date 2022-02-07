---
title: Right-to-left support
category: general
b2c: true
expert: true
stable: done
noApi: true
---

All components in our Component Library have built-in support for right-to-left (RTL) locales.

There are 2 requirements for the component to display and behave properly in RTL environment:

1. Your app should import `BidiModule` from [Angular CDK](https://material.angular.io/cdk/bidi/overview) in the `app.module.ts`:

    ```ts
    // ...
    import { BidiModule } from '@angular/cdk/bidi';

    @NgModule({
        imports: [
            // ...
            BidiModule,
        ],
        // ...
    })
    export class AppModule {}
    ```

1. Any of the parent containers of the component needs to have `dir` HTML attribute set to `rtl`. For most cases a good place to add `dir` attribute is on the `app.component.ts/.html` level.
    <!-- HINT: for some reason there's no space between end of the list and an example, so have to go with linebreak -->
    <br>

<!-- example(rtl-basic) -->

### Component examples in RTL

To view components in an RTL setting in the documentation, add `?dir=rtl` to the end of the component url, e.g. `documentation/accordion/overview?dir=rtl`. Note that direction will be applied only to the content of examples and not to the whole documentation page. The RTL query is persisted between navigations.

### Dynamic change

There might be situations, when you want to change the directionality of your application dynamically. For example, when you have to support both RTL and LTR scripts within the same app and allow the user to switch through a dropdown or any other way of user input.

Since we are using [Angular CDK Bidirectionality module](https://material.angular.io/cdk/bidi/overview) under the hood to provide RTL support, you should pay attention to some constraints:

1. In order for the components to properly pick up the change, it has to be happening within the angular app. This means, if you try to update the `dir` attribute through DOM API, like `document.querySelector('.app-container').dir = 'rtl'`, this change will not be properly picked up, which will result in degraded styles and in some cases render components unusable. One way of making the app properly pick up the `dir` change is to use [property binding](https://angular.io/guide/property-binding) on the container element.

1. Direction change detection will not fire for `<html>` and `<body>` tags, since they are assumed to be static.

<!-- example(rtl-dynamic) -->

### Modals

Almost all components of our library do not require any extra effort from the developer to work properly in an RTL environment, except setting the direction on the app or container components. The only exception is the `NxDialogService`, which require you to pass direction as a config parameter when opening a dialog. You will find more details on the [Modal documentation page](./documentation/modal/overview#directionality).
