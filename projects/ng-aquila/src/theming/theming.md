---
title: Theming
category: general
b2c: true
expert: true
stable: done
noApi: true
a1: true
---

## Scoping themes

By default the selector for the themes is `:root, :host`. In case you want to scope the theme a different selector you can use the `nx-build-theme` mixin with an additional argument for the selector.

```scss
@include nx-build-theme(ndbx, '.my-custom-scope');
```

<div class="docs-deprecation-warning">
<p><strong>Important about Overlays:</strong> When a theme gets scoped to a class on the Angular application root element, any other element inside the body of the document or you are using web components with ShadowDOM, the theme will not be applied to any Angular CDK Overlay components (like Dialogs, Tooltips, etc.) because these overlays are appended to the end of the body element by default.</p>
<p>
Please make sure that your custom selector either targets the overlays as well by adding <code>.cdk-overlay-container</code> to the selector or in case you are using ShadowDOM that you provide a custom <code>OverlayContainer</code> that moves the overlays inside the ShadowDOM.</p>
</div>

<div class="docs-private">

### Important for A1 themes

Our themes for A1 are a mapping from the A1 tokens to the library specific tokens. In the prebuilt versions we are including the A1 tokens automatically. But if you are extending our A1 themes or built your own and you need the A1 tokens you have to import them manually before building the theme. The A1 tokens package provides a mixin where you can set the dimensions (color scheme, animations, density) and the scope selector. The `@allianz/a1-design-tokens` package is a dependency of the `@allianz/ngx-brand-kit` package.

```scss
@use '@allianz/a1-design-tokens/dist/allianz/a1/web/tokens-theme-mixins-index' as a1-tokens;
@import '@allianz/ng-aquila/styles/theming';
@import "@allianz/ng-aquila/styles/themes/allianz-one";


@include a1-tokens.apply-design-tokens('light', 'lively', 'spacious', '.my-custom-scope');
@include nx-build-theme(allianz-one, '.my-custom-scope');
```

</div>

## Custom theming

All components in this library are styled by using the style tokens listed [here](./documentation/theming/overview#general-theming-tokens). You can create your own custom theme by overwriting the values of these style tokens.

The library provides an interface for extending and overwriting properties of our base theme to enable the creation of custom application themes. This is accomplished by using SCSS maps for merging your newly defined style tokens and our base theme tokens and then injecting those into the components by CSS variables.

### Customizing the base theme

In order to define your custom theme first create a file `<your-theme>.scss`.

To register your theme import the theming utilities:

```scss
@import '@allianz/ng-aquila/styles/theming';
```

Then, you should define your new theme as a `scss-map` which overwrites all default theming tokens you want to change:

```scss
$my-theme: (
    interactive-primary: green,
    link-color: interactive-primary,
    heading-01-font-size: 3.625rem,
    heading-01-line-height: 4rem,
    heading-01-font-weight: 500,
    heading-01-letter-spacing: 0.0125rem,
);

$nx-themes: nx-register-theme($my-theme, themeName);
```

By calling the `nx-register-theme(themeName)` mixin you are merging our base theme with your own theme (overwritten tokens + new tokens).

Per default, the base theme for the new theme is aquila. You can also pass another theme as a base (third argument), but you first have to import or define it:

```scss
@import "@allianz/ng-aquila/styles/theming";
@import "@allianz/ng-aquila/styles/themes/your-base-theme";
...
$nx-themes: nx-register-theme($my-theme, themeName, baseThemeName);
```

<div class="docs-private">
Currently the following internal themes are available as a base theme: **aquila** (implicitly), **ndbx**, **ndbx-expert** and **direct**, which have to be explicitly imported as shown in the example above.
</div>

### Enabling (building) a new theme

In order to inject the newly defined custom theme tokens into the components you have to build your new theme by using the `nx-buid-theme` mixin.

```scss
@include nx-build-theme(themeName);
```

**Important:** Keep in mind the theme building should happen after you have registered your custom theme and preferably only once in the whole application. We recommend the following import in your global scss file:

```scss
@import '@allianz/ng-aquila/styles/theming';
@import '<path-to-theme-file>/<your-theme>.scss';

@include nx-build-theme(themeName);
```

### Using your new theme

In order to have access to the newly defined tokens you have to import `<your-theme>.scss` into every SCSS file where you want to use your tokens. You can also import it to a global SCSS stylesheet and import this one wherever needed.

We provide you with two utility helpers:

-   **nx-theme(token)** for getting a css variable value
-   **type-style(token)** for getting the defined typography properties of an element. here you have to prefix these tokens in the same way and define font-size, font-weight, letter-spacing and line-height as shown in the snippet with _headline-01_ above.

```scss
@import '<path-to-theme-file>/<your-theme>.scss';

.test-class {
    @include type-style(heading-01);
    background: nx-theme(interactive-primary);
}
```

### Advanced

You can also add new tokens when creating your custom theme as well as use exisiting token values for your new tokens:

```scss
$my-theme: (
    my-new-token: pink,
    my-new-token-2: primary-action,
);

$nx-themes: nx-register-theme($my-theme, themeName);
```

And then use them as stated before:

```scss
@import '<path-to-theme-file>/<your-theme>.scss';

.test-class {
    background: nx-theme(my-new-token);
}
```

### General Theming Tokens

Our components are themed by the following general tokens. You can overwrite their values in your custom theme. A full list of the current style tokens can be found [here](https://www.github.com/allianz/ng-aquila/blob/main/projects/ng-aquila/src/shared-styles/theming/tokens.scss).

```scss
  ui-background: #0f2A3D,
  ui-01: #0F2A3D,
  ui-02: #143851,
  ui-03: #194666,
  ui-04: #2D7FB8,
  ui-05: #E9F7FB,
  ui-06: #FFFFFF,

  interactive-text: #27ABD6,
  interactive-primary: #27ABD6,
  hover-primary: #3BB4DB,
  hover-secondary: #194666,

  active-primary: #66C4E3,
  hover-link: #51BCDF,

  focus-box-shadow: (
    0 0 0 2px #0F2A3D,
    0 0 0 6px #27ABD6
  ),

  focus-inset-box-shadow: (
    inset 0 0 0 4px #27ABD6,
    inset 0 0 0 6px #0F2A3D
  ),

  // typically used on dark backgrounds
  text-01: #FFFFFF,
  // typically used on light backgrounds
  text-02: #0F2A3D, // text, icon color of buttons, checkbox etc

  info: #7C97D0,
  warning: #EFBE25,
  danger: #ED6F7C,
  success: #26AE31,

  accent-01: #00B17F, // emphasis
  accent-02: #6B8CFF, // cta
  accent-03: #C7A7EC, // attention

  disabled-01: #969696,
  disabled-02: #DBDBDB,
  disabled-03: #EDEDED,
  disabled-04: rgba(39, 171, 214, 0.35),

  negative: #0F2A3D,
  negative-accent: #E5E7E6,
  negative-01: #23628F,
  negative-02: #2D7FB8,
  negative-background: #E5E7E6,

  negative-dimmed: rgba(15, 42, 61, 0.4),
  negative-01-dimmed: #23628F,
  negative-02-dimmed: #2D7FB8,
  negative-background-dimmed: rgba(229, 231, 230, 0.4),

  grid-max-width: 1184px,

  readonly-01: rgba(150, 150, 150, 0.35),
  readonly-02: #969696,
  readonly-03: #FFFFFF,
```
