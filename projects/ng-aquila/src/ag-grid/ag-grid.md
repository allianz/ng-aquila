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

For complex data tables (data grids) we suggest using the [ag-grid](https://www.ag-grid.com/) library. We are providing an `ag-theme-aquila` theme for the ag-grid-angular component which is based on the ag-theme-alpine theme and is a drop-in replacement for the default ag-grid themes. You can also choose from additional modifier themes on top of the base theme:
- `ag-theme-aquila-dense` for more compact rows
- `ag-theme-aquila-zebra` for zebra striped rows

## Compatibility
The theme was built with ag-grid-angular version `^30.0.0`. It might work with other versions as well, but we did not test it.

## How to use
The ag-grid theme assumes that one of the library themes is already imported to use css variables from there.

- Import the provided file from `@aposin/ng-aquila/css/themes/ag-theme-aquila.css` and add it to your application. You can choose any of the typical ways in an angular application, e.g. in the angular.json file or in your main styles.(s)css file.
- Add the class `ag-theme-aquila` to the ag-grid-angular element.
- **Optional:** add one of the modifier classes `ag-theme-aquila-dense` or `ag-theme-aquila-zebra` to the ag-grid-angular element as well. You can also combine them and add or remove them dynamically.
- **Allianz internal projects**: add the class `ag-allianz-icons` to the ag-grid-angular element to overwrite the default ag-grid alpine icons with the Allianz icons.

## Example

<div class="docs-public">
<!-- example(ag-grid-opensource) -->
</div>

<div class="docs-private">
<!-- example(ag-grid) -->
</div>
