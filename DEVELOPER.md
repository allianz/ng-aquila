# Developer Guide 🛠

This guide will tell you how to develop components for the library and how to run builds, tests and the documentation application on your local machine. If you want to contribute, please read the **[Contribution Guidelines](CONTRIBUTING.md)**.

---

## Table of contents

-   [Component architecture](#component-architecture)
-   [Creating a component](#creating-a-component)
-   [Component documentation](#component-documentation)
-   [Start the documentation application](#start-the-documentation-application)
-   [Builds](#builds)
-   [Testing](#testing)
-   [Theming](#theming)
-   [High contrast support](#high-contrast-support)

## Component architecture

### Favor composition over configuration

A helpful way to make reusable components is to think in interaction patterns. Many components are a composition of different patterns:

-   Menu = Trigger button + overlay
-   Datepicker = Inputfield + icon button + calendar overlay
-   Typeahead/Search = Inputfield + autocomplete overlay

The overall goal is to create reusable parts for these capabilities.

Example of a dropdown (what not to do):

```html
<!-- 🚫 BAD EXAMPLE: don't do this -->
<nx-dropdown [items]="[{label: 'Apple', value: 'apple'}, {label: 'Banana', value: 'banana'}]"></nx-dropdown>
```

This approach will work pretty well initially. But now what if you want to add a click event to a specific item? What if you want to add icons or other elements into the content of the items? Or add a css class to a specific item?

The API is not ready for these new requirements so it would need development efforts of the library team and thus blocks the project teams. Additionally doing this over configuration the API gets bloated up more and more and makes it harder to use the component intuitively.

The preferred approach is:

```html
<!-- ✅ GOOD EXAMPLE: -->
<nx-dropdown>
    <nx-dropdown-item value="apple" class="my-class">Apple</nx-dropdown-item>
    <nx-dropdown-item value="banana" (click)="bananaWasClicked()">
        <nx-icon size="small" name="banana"></nx-icon>
        Banana
    </nx-dropdown-item>
</nx-dropdown>
```

The `dropdown-item` element takes the spot to provide content to the dropdown. It will be projected by Angular's content projection feature into the dropdown overlay that opens when you click the dropdown element. Now the users are able to add css classes, DOM event handlers and provide more content to the items by reusing library components or even using custom components from their project.

#### Hidden APIs

Another important point is to not hide elements behind the component's implementation and having to reimplement the hidden APIs. As an example let's look at a menu. A menu typically consists of a button and the menu that gets opened as some kind of overlay.

What not to do as the component API:

```html
<!-- 🚫 BAD EXAMPLE: don't do this -->
<nx-menu buttonSize="small" menuButtonType="primary" buttonText="Menu" (buttonClick)="buttonClicked()" tooltipText="Opens the menu" tooltipDelay="50">
    <nx-menu-item>Settings</nx-menu-item>
    <nx-menu-item>Remove</nx-menu-item>
</nx-menu>
```

When the menu components template could look like this:

```html
<!-- 🚫 BAD EXAMPLE: don't do this -->
<button
    class="menu-trigger"
    [nxButton]="buttonSize + ' ' + menuButtonType"
    (click)="toggleMenuAndEmitButtonClickEvent()"
    [nxTooltip]="tooltipText"
    [nxTooltipDelay]="tooltipDelay"
>
    {{buttonText}}
</button>

<div class="menu-items">
    <ng-content></ng-content>
</div>
```

What you see is that you have to reexpose the APIs of the tooltip and the button. This also means if one of them provides a new feature which should also be configurable in the menu we need to implement the option in the menu component again. This approach does not scale if we have to reexpose component APIs in all other components where it is hidden.

Instead use composition of existing patterns of the library and give the developers access to the underlying elements:

```html
<!-- ✅ GOOD EXAMPLE: -->
<button nxButton="primary small" nxTooltip="Opens the menu" nxTooltipDelay="50" (click)="buttonClicked()" [nxMenuTriggerFor]="menu"> Menu </button>

<nx-menu #menu>
    <nx-menu-item>Settings</nx-menu-item>
    <nx-menu-item>Remove</nx-menu-item>
</nx-menu>
```

What we abstracted here is the `nxMenuTriggerFor` directive which connects any element to a context menu and provides the behavior that the user can open the menu by mouse or keyboard interaction on the element with the `nxMenuTriggerFor` on it.

### Use native elements where possible

Try to use native elements like inputs and buttons as much as possible. Especially for accessibility these elements come with the needed semantic meaning and the interaction is already implemented in browsers.

### Inputs

Try not to use inputs for css properties in the component template. Instead use semantic options, e.g. for the size of the icon: 🚫Don't: `<nx-icon width="32" height="32" color="#123456"></nx-icon>`

✅Do: `<nx-icon size="small" class="my-color"></nx-icon>`

The component specification should provide reasonable options for the size here.

## Creating a component

1. Add a folder for the component to `projects/ng-aquila/src`
2. All components are a secondary entry point. For this create a `package.json` file in your component folder containing:

    ```
    {
      "ngPackage": {
        "lib": {
          "entryFile": "public-api.ts"
        }
      }
    }
    ```

    With `entryFile` pointing to the file where you collect all exports of the entry point.

3. Develop your component
4. Add exports of all symbols that should be used by the consumer to the entry file
5. Create a new examples module for the component as described in [Adding code examples](#adding-code-examples).

## Component documentation

The documentation of a component is done via markdown. We implemented a CLI tool `ngx-docs-cli` that transforms these files to HTML, adds any referenced example files and automatically parses the typescript code to generate the API tables. The generated files are consumed by the `documentation` app so there is no development effort in the application itself.

The business logic of the documentation app is done in the `ngx-docs-ui` package. You will only ever have to go there if you plan to update the way the application works or add new features. For your documentation efforts for components you do not have to change anything in the `ngx-docs-ui` package.

### Component markdown file

Every component implementation should provide a markdown file in its folder.

For a new component:

1. Create a `<component-name>.md` file in your component folder. The name has to match the component folder name.
2. Add metadata to the markdown file at the top and change it accordingly.

| Attribute | Possible values | Description |
| --- | --- | --- |
| title | `string` | The name of the component that is displayed. |
| category | `components \| Expert (Alpha)` | The category in which the component is listed. |
| b2c | `true \| **false**` | Whether the component is allowed to be used in client facing applications (B2C). |
| expert | `true \| **false**` | Whether the component is an expert option and can be used for internal applications (Expert). |
| stable | `done \| progress \| **na**` | Describes the stable status of the component. |
| noApi | `true \| **false**` | If the API tab should be hidden. Useful for more general pages that don't belong to a specific component, e.g. 'Accessibility', 'Theming', ... |

Button example:

```
---
title: Button
category: components
b2c: true
expert: true
stable: done
---
```

The metadata is used to create the overview table and to place the component in the correct category in the sidebar navigation.

3. Write your documentation. Think about common use cases and examples that will help the developers. See [Adding code examples](#adding-code-examples) on how you can add live examples in between the text.

#### Headings

When editing the documentation of a component, please make sure that only headings with three or more `#` are used, level 1 (`#`) or 2 (`##`) headings are not reflected in the table of contents.

#### Expert-only

If there are parts that are only defined for expert usage, please use the `docs-expert-container` class to wrap the content:

```
<div class="docs-expert-container">

#### Expert: <Expert-only option>

Please note that this is an **Expert option**. This means that it is only intended for internal applications and not for applications that are client facing.

...

<!-- example(component-expert-example) -->

</div>
```

#### Adding public-only or private-only parts

If there is a certain part that should be only visible in one of the two documentations (`ng-aquila`/public documentation and `ngx-ndbx`/private documentation), this can be marked with the `docs-public` and `docs-private` classes in the `.md` files:

```
<div class="docs-public">
  Content that is only visible in the `ng-aquila` documentation.
</div>

<div class="docs-private">
  Content that is only visible in the `ngx-ndbx` documentation.
</div>
```

If there is an example which contains sensitive information, this should not be placed in the default example folder in `ng-aquila`, but as a private example in `ngx-ndbx`. See [Private examples](#private-examples).

### Adding code examples

The examples for the documentation are organized in modules, usually one module per component. The example modules are placed in `ng-aquila/projects/ng-aquila/documentation/examples/<component>`.

Examples can be inserted to the documentation by using the placeholder

```html
<!-- example(component-basic) -->
```

in the markdown file. This is only a placeholder, the CLI tool will replace this part with a HTML element that will later be used by the documentation app to create and inject the example component automatically. Additionally add your new example to the dedicated example module at two places, in the `EXAMPLES` array and the return value of `components()`:

```ts
const EXAMPLES = [
    // ...
    ComponentBasicExample,
];

// ...
export class ButtonExamplesModule {
    static components() {
        return {
            // ...
            'component-basic': ComponentBasicExample,
        };
    }
}
```

For some basic imports you can also add the `ExamplesSharedModule` (`ng-aquila/projects/ng-aquila/documentation/examples/examples-shared.module.ts`) as an import to your Examples Module. This already contains some basic module imports (`CommonModule`, `FormsModule`, `ReactiveFormsModule` and the module imports for `NxButton`, `NxHeadline`, `NxCopytext` and `NxGrid`).

Create the actual example component in the folder `<component-basic>` in `ng-aquila/projects/ng-aquila/documentation/examples/<component>/`. Please use the name `<component-basic>-example.[html|ts|css]` for the example files and of course replace `component-basic` with your example name. In case you don't need any css code for your example, please create an empty css file anyway (It is needed for the generation process of the documentation). Please also add a `'selector'` for your example component, this is needed if the example is opened in StackBlitz.

Please also add a title to the example component like

```ts
/** @title Component basic example */
@Component({
	...
```

The title is used in the generation process and later shown in the example container.

Please use as little code as possible. The examples should contain the minimal code to achieve the use case it tries to describe.

#### Private examples

Examples which contain sensitive information (e.g. HEX-values of NDBX colors) should not be published with `ng-aquila`. These examples can be placed in `projects/ngx-ndbx/documentation/examples` as private examples. This means that they are placed in the `ngx-ndbx` repository and therefor not published publicly with `ng-aquila`.

This path is specified in the generation of the documentation with the `--private-examples` flag:

```
npm run cli -- generate ng-aquila/projects/ng-aquila ... --private-examples <private-example-path>"
```

Private examples can be added with a similar structure to the examples contained in `ng-aquila` (see [Adding code examples](#adding-code-examples)). The private example modules and examples need to have a unique name and must be different from the ones placed in `ng-aquila` since they are merged together during the generation of the documentation.

When adding a new private example to the documentation, it has to be marked with as `"privateExample": true`, so that the example marker will be ignored in the `ng-aquila` documentation. The stackblitz button should be also hidden:

```html
<!-- example(component-basic-private, { "privateExample": true, "hideStackblitzButton": true }) -->
```

### API Descriptions

The API descriptions are generated directly from DocStrings in the code. By default private properties are not listed. If you want to hide some property you can use a `/** @docs-private */`-description.

Example of a good doc string:

```ts
/** Whether the checkbox is disabled. */
@Input()
set disabled(value: boolean) {
```

## Start the documentation application

To access the documentation, clone this project and run the following commands:

```shell

# Install all dependencies
npm ci

# Run the app with
npm start

```

This will run our own CLI tool and several scripts to generate everything that is needed for the application. When everything is finished the app can be accessed on `http://localhost:4200`.

If you have changed a markdown file, or if you have added or removed any example file in `projects/ng-aquila/documentation/examples` you have to run `npm start` or `npm run library:generate:docs` again to see the changes in the application.

## Builds

Run the following script to build all packages of the monorepo:

```shell
$ npm run build
```

This will build the library, the ngx-docs-ui package and the documentation application in AOT mode and production mode.

You can build only the library with:

```shell
$ npm run build:lib
```

All build artifacts are placed into the `dist` folder. The library is built with [ng-packagr](https://github.com/dherges/ng-packagr) which generates the necessary bundles to be consumed by most build systems.

## Testing

The unit tests are run with

`npm run test:lib`

## Theming

The library supports different use cases with different style philosophies that's why all components must be themable in a very flexible way. Because we use the default view encapsulation we decided to go for CSS custom properties (a.k.a CSS variables) to pierce through the encapsulation.

### Tokens

We call our variable definitions `tokens` and generally split them up in `global` and `component` tokens.

Global tokens are semanticly named variables that should propose their generic usage. E.g. `interactive-primary` is similar to what often is called the `brand` color but in our case mainly used for interactive elements. Component tokens are the themable parts of components which typically reuse global tokens. We provide base themes with specific mappings, e.g. the primary button uses the `interactive-primary` token for the background:

```css
--button-primary-background-color: interactive-primary;
```

These component specific tokens are necessary to make the design language of the library changeable by the consumers. If we would use `interactive-primary` directly in the code of the button here, you would have to use other ways (css + ng-deep) to change the primary button to a different color than `interactive-primary`. This makes the theming feature a lot more complex but typically you only have to change a few tokens for a theme.

## High contrast support

We strive to support the Windows high contrast mode and the newer forced colors mode in all components by using CSS system colors.

System colors are defined variables in the CSS spec that are set by the operating system and in terms of Windows can be changed by the user to fit his needs.

A short example:

```css
@media screen and (-ms-high-contrast: active) {
    .css-class {
        color: windowText;
    }
}
```
