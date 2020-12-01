---
title: Getting started
---

# Getting started
With ng-aquila we are providing an Angular powered user interface (UI) library.

### Prerequisite
You should have Node.js and the Angular CLI installed.

### Automatic setup with ng add

1. **Create your project with [Angular CLI version 10](https://cli.angular.io/):**

    ```console
    npm install -g @angular/cli@10
    ng new my-aposin-project
    ```

2. **Add ng-aquila:**

    ```console
    ng add @aposin/ng-aquila
    ```

    Add the background color of the default theme to your styles file:

    ```scss
    body {
      background: #0f2a3d;
    }
    ```

Congratulations you're done 💪 

Now you can include components and start building your application.

### Manual setup

You can also install ng-aquila manually.

1. **Create your project with [Angular CLI version 10](https://cli.angular.io/):**

    ```
    npm install -g @angular/cli@10
    ng new my-aposin-project
    ```

2. **Install ng-aquila and dependencies**

    ```
    cd my-aposin-project
    npm install @aposin/ng-aquila
    npm install @angular/cdk@10 what-input
    ```

    Depending on your needs, you may also install

    - [iban.js](https://github.com/arhs/iban.js/) if you want to use the [iban mask](./documentation/mask/overview#iban-mask) (`npm install iban`)

    - [moment.js](https://github.com/moment/moment) if you want to use it as the adapter for the [datefield](./documentation/datefield/overview) (`npm install moment`)

    You can check the supported versions of peer dependencies [here](https://github.com/aposin/ng-aquila/blob/main/projects/ng-aquila/src/package.json).

3. **Add what-input script**

    In order for the keyboard focus to work, the what-input script needs to be added to the `angular.json`:

    ```json
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-angular:browser",
        "options": {
          // ...
          "scripts": [{
            "input": "node_modules/what-input/dist/what-input.js"
          }]
        }
      }
    }
    ```

4. **Add base styles**

    Add the styles to the `angular.json`. You need the base styles ('normalize.css') and a theme file ('aposin.css' or 'expert.css'):

    ```json
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-angular:browser",
        "options": {
          // ...
          "styles": [
            // ...
            "node_modules/@aposin/ng-aquila/css/normalize.css",
            "node_modules/@aposin/ng-aquila/themes/aposin.css"
          ]
        }
      }
    }
    ```

    Add the background color of the default theme to your styles file:

    ```css
    body {
      background: #0f2a3d;
    }
    ```

5. **Add NxExpertModule (optional)**

    In an expert/b2b application you also need the `NxExpertModule` to your `app.module.ts`. More information can be found on the [documentation page about the expert module](./documentation/config/overview).

    ```ts
    // ...
    import { NxExpertModule } from '@aposin/ng-aquila/config';

    @NgModule({
      imports: [
        // ...
        NxExpertModule
      ],
      // ...
    })
    export class AppModule {}
    ```

6. **Support for IE11 (optional)**

    If you need to support IE11, a polyfill is needed:

    ```
    npm install css-vars-ponyfill
    ```

    To activate it, include these two lines in your `polyfills.ts`:

    ```ts
    import cssVars from 'css-vars-ponyfill';
    cssVars({ watch: true, onlyLegacy: true, shadowDOM: true});
    ```

    If you use the [image component](./documentation/image/overview), you also need the [object-fit-images](https://github.com/fregante/object-fit-images) polyfill (`npm install object-fit-images`).

    You can check the supported versions of these polyfills [here](https://github.com/aposin/ng-aquila/blob/main/projects/ng-aquila/src/package.json).


### Device and Browser Support
We fully support the following browsers:

* Latest versions of Firefox, Chrome, and Safari
* MS Edge
* High contrast mode in MS IE11 and Edge

We partly support IE11 and recommend to use modern browsers instead. Using IE11 can have a negative impact on UX and performance. 

### Contributing
We do not support external contributions yet, but hope we can in future. 
