---
title: Ag-grid
category: Third-party
b2c: false
expert: true
stable: progress
noApi: true
---

<div class="docs-deprecation-warning">
  <strong>Important:</strong>
  Please note that the <strong>legacy CSS-based themes</strong> will be deprecated soon.
  We recommend migrating to the <strong>Theming API</strong> introduced in AG Grid v33+.
</div>

For complex data tables (data grids) we suggest using the [ag-grid](https://www.ag-grid.com/) library. 

With the major update in `ag-grid-angular` v33, AG Grid introduced the **Theming API**, where themes are imported as JavaScript objects and passed via the `[theme]` input.  
We provide `themeAquila` (for open-source) and `themeAllianz` (for internal Allianz projects), both built on top of AG Grid’s Alpine theme. These support our custom styling via the `theming-api-aquila` class and optional param sets:
- `themeAquilaDenseParams` for more compact rows
- `themeAquilaZebraParams` for zebra striped rows

### How to use Theming API in v33+

If you're new to AG Grid or already using version 33+, you can skip to the **Necessary CSS Imports** section and follow the steps to apply our custom themes.

If you're upgrading from a version older than v33, see the next section: **Migrate from Pre-v33** for important migration details.


#### Migrate from Pre-v33
You can refer to the official migration guide here: [Migrating to the Theming API](https://www.ag-grid.com/archive/33.1.1/angular-data-grid/theming-migration/) 

To avoid styling conflicts between legacy CSS themes and the Theming API, make sure to remove globally imported legacy style.

Remove this:
```json
"styles": [
    "node_modules/ag-grid-community/styles/ag-grid.css"
]
```

#### Necessary CSS Imports
Import the provided file from `@allianz/ng-aquila/themes/theming-api-aquila.css`.
You can choose any of the typical ways in an angular application, e.g. in the angular.json file or in your main styles file.

Angular.json example:
```json
"styles": [
    "node_modules/@allianz/ng-aquila/themes/theming-api-aquila.css",
]
```

#### Import and apply our theme
- Use the `themeAquila` by importing and applying it to `[theme]` input, along with our custom class `theming-api-aquila`. 

In .ts file:
```ts 
import { themeAquila } from '@allianz/ng-aquila/ag-grid';
```
In .html file
```html
<ag-grid-angular
    class="theming-api-aquila"
    [theme]="themeAquila"
></ag-grid-angular>
```

- **Allianz internal projects**: use `themeAllianz`, which builds on Alpine and applies the Allianz icon set via the Theming API.

In .ts file:
```ts
import { themeAllianz } from '@allianz/ng-aquila/ag-grid';
```
In .html file
```html
<ag-grid-angular
    class="theming-api-aquila"
    [theme]="themeAllianz"
></ag-grid-angular>
```

#### Optional: add modifiers
Add one or multiple of the modifier params `themeAquilaDense` or `themeAquilaZebra` to the ag-grid-angular element as well. You can combine them and add or remove them dynamically with ag-grid function `withParams`.

Apply a single modifier:
```ts
this.theme = themeAquila.withParams(themeAquilaDenseParams);
this.theme = themeAquila.withParams(themeAquilaZebraParams);
```
Apply both:
```ts
this.theme = themeAquila.withParams({
    ...themeAquilaDenseParams,
    ...themeAquilaZebraParams,
});
```


#### Theming API Example

<div class="docs-public">
<!-- example(ag-grid-opensource-theming-api) -->
</div>

<div class="docs-private">
<!-- example(ag-grid-theming-api) -->
</div>

### Legacy Compatibility in v33+
If you're upgrading to AG Grid v33+ but want to continue using the legacy CSS-based themes, you can do so by setting `[theme]="'legacy'"`. Then follow the steps outlined in the **Deprecated** section below.
```html
<ag-grid-angular
    class="ag-theme-alpine ag-theme-aquila"
    [theme]="'legacy'"
></ag-grid-angular>
```
You can find code examples for the legacy version here:
- [Open-source example](https://github.com/allianz/ng-aquila/tree/main/projects/ng-aquila/documentation/examples/ag-grid/ag-grid-opensource) 
- [Allianz internal projects example](https://github.com/allianz/ng-aquila/tree/main/projects/ng-aquila/documentation/examples/ag-grid/ag-grid) 


### Deprecated: Legacy Theme Setup (Pre-v33)

If you're using ag-grid-angular prior to v33, or have not yet migrated to the Theming API, we continue to provide an `ag-theme-aquila` theme for the ag-grid-angular component which is based on the Alpine theme from ag-grid. You can still use it by following this legacy setup.

<div class="docs-deprecation-warning">
  <strong>Deprecation Warning:</strong>
  Legacy themes (ag-grid.css, SCSS, and theme classnames) are deprecated and will be removed in a future AG Grid major release. We recommend migrating to the Theming API by switching to the [theme] input and removing legacy CSS imports.
</div>

#### Compatibility
The theme was initially built with ag-grid-angular version `30.0.0`. In general it should continue to work in later minor versions, but ag-grid does not give any guarantee that things do not change between minor versions. They try to keep their CSS classes as stable as possible, but we cannot test every update of ag-grid. So please let us know if you encounter any issues.

Please also note that for some design features the theme makes use of the `:has` css selector which is currently still in development in Firefox, as such we are not supporting Firefox at the moment. Firefox 121 will ship the `:has` selector and the theme will look the same as on other browsers then.

#### How to use legacy theme
The ag-grid theme assumes that one of the library themes is already imported to use css variables from there.

#### Necessary CSS Imports
- Import the base ag-grid styles and the Alpine theme
- Import the provided file from `@allianz/ng-aquila/themes/ag-theme-aquila.css`

You can choose any of the typical ways in an angular application, e.g. in the angular.json file or in your main styles.(s)css file.
Angular.json example:
```json
"styles": [
    "node_modules/ag-grid-community/styles/ag-grid.css",
    "node_modules/ag-grid-community/styles/ag-theme-alpine.css",
    "node_modules/@allianz/ng-aquila/themes/ag-theme-aquila.css",
]
```

#### Add theme to the ag-grid element
- Add the classes `ag-theme-alpine` and `ag-theme-aquila` to the ag-grid-angular element.
```html
<ag-grid-angular class="ag-theme-alpine ag-theme-aquila"></ag-grid-angular>
```

- **Allianz internal projects**: add the class `ag-theme-allianz-icons` to the ag-grid-angular element to overwrite the default ag-grid alpine icons with the Allianz icons.
```html
<ag-grid-angular class="ag-theme-alpine ag-theme-aquila ag-theme-allianz-icons"></ag-grid-angular>
```

#### Optional: add modifiers
Add one or multiple of the modifier classes `ag-theme-aquila-dense` or `ag-theme-aquila-zebra` to the ag-grid-angular element as well. You can combine them and add or remove them dynamically.
```html
<ag-grid-angular class="ag-theme-aquila ag-theme-aquila ag-theme-aquila-dense"></ag-grid-angular>
```