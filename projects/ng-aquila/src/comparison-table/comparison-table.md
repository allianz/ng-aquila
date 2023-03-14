---
title: Comparison Table
category: components
b2c: true
expert: true
stable: done
---

### Notes about the usage of the component

It is recommended to use the comparison table with a **maximum of 5 products**.

The footer cells are not displayed on mobile. Therefore please **do not put any important content in the footer**.

For better mobile side-to-side scrolling user experience the table should be placed in a horizontal scroll indicator `<nx-swipebar>` component.

### Accessibility

When using an icon-only cell it is important that the `nx-icon` has an `aria-label`. To learn more about the usage of an aria-label [click here](./documentation/accessibility/overview#usage-of-aria-label).

### Avoiding CLS issues with dynamic content

With the new [Core Web Vitals set of Google page metrics](https://web.dev/vitals/), pages can get penalized for hight [Cumulative Layout Shift](https://web.dev/cls/) measurements, which commonly occures with the content that is added to the page dynamically. To ensure good user experience (and avoid sanctions from search engines), make sure to [use placeholders or fixed-height containers](https://web.dev/optimize-cls/#dynamic-content) for content that is loaded dynamically. You can refer to our examples.

### Examples

#### Basic Comparison Table

A basic comparison table consists of rows (`nxComparisonTableRow`) containing table cells: normal (`nx-comparison-table-cell`) and description ones (`nx-comparison-table-description-cell`) as shown in the example below.

Products/columns can be selected by using a `NxComparisonTableSelectButton` button. Pay attention that you have to specify the text of the button via the inputs `selectedLabel` and `unselectedLabel`.

You can also set the initially selected product by using the `[selectedIndex]` input of the comparison table.

<!-- example(comparison-table) -->

#### Static Layout

If a specific layout is needed, the `view` input can be used to override the layout auto-set by the viewport width.

<!-- example(comparison-table-static) -->

#### Intersection cells

You can further use intersection cells (`nx-comparison-table-intersection-cell`) which are a merge of multiple cells.

For the mobile view, in this example the content of the intersection cell is displayed inside an extra-light accordion above the table.

<!-- example(comparison-table-with-intersection) -->

#### Row Groups

If your table has a lot of rows you can group them inside a `nxComparisonTableRowGroup`. Then, only a certain number of rows is visible at the beginning. The rest can be expanded by the user. By default, the first 5 rows are shown when loading a page. You can change this number via the input `[visibleRows]`.

The text of the expandable button area can be customized by setting `[labelCollapsed]` and `[labelExpanded]` on the row group.

You can also control the initial expanded state and react to its changes through setting or binding to the `isExpanded` property.

<!-- example(comparison-table-row-group) -->

<div class="docs-expert-container">

#### Expert: Expand the expandable area over the full row width

By setting `useFullRowForExpandableArea="true"` on the `nxComparisonTableRowGroup` element the expandable area uses the full width of the table.

If the `NxExpertModule` is used, this is set by default.

Please **switch the theme to "EXPERT" at the top of the page** to see the correct expert comparison table.

<!-- example(comparison-table-expandable-area) -->

</div>

#### Toggle Sections

Multiple table rows can be grouped in a toggle section (`nxComparisonTableToggleSection`) with a toggle section header (`nx-comparison-table-toggle-section-header`) as shown in the example below.

<!-- example(comparison-table-with-toggle-sections) -->

#### Disabled table columns

You can disable certain columns of the comparison table via the input `disabledColumn` on a header `nx-comparison-table-cell` as shown in the example below. Keep in mind that the `disabledColumn` attribute can be set only on header cells. Note that disabling a column in the comparison table using the `disabledColumn` attribute on a header cell won't automatically disable other input fields like dropdowns, text fields, and checkboxes. You'll have to manually disable those fields using the disabled attribute.

<!-- example(comparison-table-disabled-columns) -->

#### Hidden table columns

You can hide certain columns of the comparison table via the input `hiddenIndexes` on table `nx-comparison-table` as shown in the example below. Keep in mind that `hiddenIndexes` will also hide selected columns - to avoid submitting selections of not visible columns please make sure that you do not provide the possibility to hide columns that are selected at the same time.

Please note that **this example is using the `nx-context-menu` component which is an Expert component**. This means that this combination is currently only intended for internal and not for client-facing applications.

<!-- example(comparison-table-hidden-columns) -->

<div class="docs-private">

#### Theming variations

By setting some theming tokens, you can modify the look of the comparison table. For the basic theming setup check the [theming page](./documentation/theming).

Depending on the colors you choose, it may be necessary to modify the default button styling in the comparison table, e.g. use the negative button for an unselected button for the color combinations shown here. For this, you can set `unselectedClassNames="secondary small negative"` for `nxComparisonTableSelectButton`.

<!-- example(comparison-table-private-modify-theming, { "privateExample": true, "hideStackblitzButton": true }) -->

</div>

#### Dynamically filled table

<!-- example(comparison-table-dynamic) -->

#### Non-sticky header on Desktop

You can opt-out of the sticky header row on Desktop by adding the attribute `[mayStick]="false"` to your header row.

<!-- example(comparison-table-non-sticky-header) -->

<div class="docs-expert-container">

#### Expert: Form controls in a comparison table

You can easily place other components like a dropdown in the comparison table:

Please note that **this is an option for Expert**. This means that form controls inside the comparison table are currently only intended for internal and not for client-facing applications.

Switch the theme to "EXPERT" at the top of the page to see the correct expert comparison table.

<!-- example(comparison-table-form-elements) -->

</div>

#### Premium breakdown table

Display data as premium breakdown table.

<!-- example(breakdown-table) -->

#### Recommendation table

Display the summary of a single offer as recommendation table.

<!-- example(recommendation-table) -->

<div class="docs-expert-container">

#### Expert: Premium breakdown table

A simplified variant is available for expert applications.

<!-- example(breakdown-table-expert) -->

#### Expert: Recommendation table

A more neutral variant is available for expert applications.

<!-- example(recommendation-table-expert) -->

</div>

 #### Error state
You can display an error state for the header and footer of the table using the `isError` attribute as shown in the example below.
 <!-- example(comparison-table-error) -->
