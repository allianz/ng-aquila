---
title: Comparison Table
category: components
b2c: true
expert: true
stable: progress
---

### Notes about the usage of the component

It is recommended to use the comparison table with a **maximum of 5 products**.

The footer cells are not displayed on mobile. Therefore please **do not put any important content in the footer**.

### Examples

#### Basic Comparison Table

A basic comparison table consists of rows (`nxComparisonTableRow`) containing table cells: normal (`nx-comparison-table-cell`) and description ones (`nx-comparison-table-description-cell`) as shown in the example below.

Products/columns can be selected by using a `NxComparisonTableSelectButton` button. Pay attention that you have to specify the text of the button via the inputs `selectedLabel` and `unselectedLabel`.

You can also set the initially selected product by using the `[selectedIndex]` input of the comparison table.

<!-- example(comparison-table) -->

#### Intersection cells

You can further use intersection cells (`nx-comparison-table-intersection-cell`) which are a merge of multiple cells.

For the mobile view, in this example the content of the intersection cell is displayed inside an extra-light accordion above the table.

<!-- example(comparison-table-with-intersection) -->

#### Row Groups

If your table has a lot of rows you can group them inside a `nxComparisonTableRowGroup`. Then, only a certain number of rows is visible at the beginning. The rest can be expanded by the user. By default, the first 5 rows are shown when loading a page. You can change this number via the input `[visibleRows]`.

The text of the expandable button area can be customized by setting `[labelCollapsed]` and `[labelExpanded]` on the row group.

You can also control the initial expanded state and react to its changes through setting or binding to the `isExpanded` property.

<!-- example(comparison-table-row-group) -->

#### Toggle Sections

Multiple table rows can be grouped in a toggle section (`nxComparisonTableToggleSection`) with a toggle section header (`nx-comparison-table-toggle-section-header`) as shown in the example below.

<!-- example(comparison-table-with-toggle-sections) -->

#### Disabled table columns

You can disable certain columns of the comparison table via the input `disabledColumn` on a header `nx-comparison-table-cell` as shown in the example below. Keep in mind that the `disabledColumn` attribute can be set only on header cells.

<!-- example(comparison-table-disabled-columns) -->

<div class="docs-private">

#### Theming variations

By setting some theming tokens, you can modify the look of the comparison table. For the basic theming setup check the [theming page](./documentation/theming). 

Depending on the colors you choose, it may be necessary to modify the default button styling in the comparison table, e.g. use the negative button for an unselected button for the color combinations shown here. For this, you can set `unselectedClassNames="secondary small negative"` for `nxComparisonTableSelectButton`.

For demonstrating different color combinations, we use a DemoThemingService for all examples. This is **not** needed for your implementation.

<!-- example(comparison-table-modify-theming, { "hideHeader": true }) -->

</div>

#### Dynamically filled table

<!-- example(comparison-table-dynamic) -->

<div class="docs-expert-container">

#### Expert: Form controls in a comparison table

You can easily place other components like a dropdown in the comparison table:

Please note that **this is an option for Expert**. This means that form controls inside the comparison table are currently only intended for internal and not for client-facing applications.

<!-- example(comparison-table-form-elements) -->

</div>

### Accessibility
When using an icon-only cell it is important that the `nx-icon` has an `aria-label`. To learn more about the usage of an aria-label [click here](./documentation/accessibility/overview#usage-of-aria-label).
