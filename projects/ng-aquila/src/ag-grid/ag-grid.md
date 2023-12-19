---
title: Ag-grid
category: Third-party
b2c: false
expert: true
stable: progress
noApi: true
---

<div class="docs-deprecation-warning">
    <strong>Beta/Experimental version: </strong> please note that this is a first version for teams to jump  in early and provide feedback.
    There might be features of ag-grid that do not work well with the theme yet. We are happy to hear your feedback.
</div>

For complex data tables (data grids) we suggest using the [ag-grid](https://www.ag-grid.com/) library. We are providing an `ag-theme-aquila` theme for the ag-grid-angular component which is based on the Alpine theme from ag-grid. You can also choose from additional modifiers on top of the base theme:
- `ag-theme-aquila-dense` for more compact rows
- `ag-theme-aquila-zebra` for zebra striped rows

### Compatibility
The theme was initially built with ag-grid-angular version `30.0.0`. In general it should continue to work in later minor versions, but ag-grid does not give any guarantee that things do not change between minor versions. They try to keep their CSS classes as stable as possible, but we cannot test every update of ag-grid. So please let us know if you encounter any issues.

Please also note that for some design features the theme makes use of the `:has` css selector which is currently still in development in Firefox, as such we are not supporting Firefox at the moment. Firefox 121 will ship the `:has` selector and the theme will look the same as on other browsers then.

### How to use
The ag-grid theme assumes that one of the library themes is already imported to use css variables from there.

#### Necessary CSS Imports
- Import the base ag-grid styles and the Alpine theme
- Import the provided file from `@aposin/ng-aquila/themes/ag-theme-aquila.css`

You can choose any of the typical ways in an angular application, e.g. in the angular.json file or in your main styles.(s)css file.
Angular.json example:
```json
"styles": [
  "node_modules/ag-grid-community/styles/ag-grid.css",
  "node_modules/ag-grid-community/styles/ag-theme-alpine.css",
  "node_modules/@aposin/ng-aquila/themes/ag-theme-aquila.css",
  "src/styles.scss"
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


### Example

<div class="docs-public">
<!-- example(ag-grid-opensource) -->
</div>

<div class="docs-private">
<!-- example(ag-grid) -->
</div>
