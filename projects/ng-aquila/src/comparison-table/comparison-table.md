---
title: Comparison Table
description: Product/feature comparison tables
category: components
b2c: true
expert: true
stable: done
a1Light: true
group: Data Display
---

### Usage guidelines

- Use a **maximum of 5 products**. Beyond that the columns get too narrow to compare.
- Footer cells are **not displayed on mobile** — do not put any important content there.
- On mobile, place the table in a horizontally scrollable container, or let A1's [container based responsive layout](#responsive-layout-and-overflow) turn it into a carousel.
- Icon-only cells need an `aria-label` on the `nx-icon`. See [usage of aria-label](./documentation/accessibility/overview#usage-of-aria-label).
- Content that arrives after the first render (prices, availability) should sit in a fixed-height container so it does not shift the layout. See [dynamically filled content](#dynamically-filled-content).

### Examples

#### Header slots

A comparison table has a header row of product cells (`nx-comparison-table-cell[type="header"]`) and content rows (`nxComparisonTableRow`) of cells (`nx-comparison-table-cell`) and description cells (`nx-comparison-table-description-cell`).

Wrap your markup inside a header cell in these slot elements to get consistent order, spacing and sizing:

- `nx-comparison-table-header-top` — freeform, e.g. a country-specific badge
- `nx-comparison-table-header-eyebrow` — hidden while a sticky header is pinned (see [sticky header](./documentation/comparison-table#sticky-header))
- `nx-comparison-table-header-title` — wrap an `[nxHeadline]` (no `size`); size is set via the table's `headlineSize` input (`'l' | 'xl'`, default `'xl'`)
- `nx-comparison-table-header-price` — wrap an `nx-price`; size is imposed by the table (`2xl`, `l` while stuck)

Each slot is a directive of the same name in PascalCase — import the ones you use, or `NxComparisonTableModule`.

The named slots render in the order above regardless of markup order, then `nxComparisonTableSelectButton`, then any unslotted content.

The imposed sizes are provided by the title and price slots, so they stop at the slot boundary. If you skip the slots and write your own header markup, the table leaves your headlines and prices alone — you own their sizes, and you no longer pick up our design updates to them automatically.

Select a product with `nxComparisonTableSelectButton` (`selectedLabel` / `unselectedLabel`); the initial selection comes from the table's `[selectedIndex]`. Highlight a column with `nx-comparison-table-popular-cell forColumn="…"` in the header row.

<!-- example(comparison-table) -->

#### Responsive layout and overflow

With `responsiveMode="container"` (the default for A1, not supported in NDBX) the table measures its container instead of the viewport: it switches between the tablet and desktop view as the container resizes, and turns into a carousel when there is not enough space for all products.

Which view applies at which width is controlled by breakpoints. A `NxComparisonTableBreakpoint` is `{ minWidth, columns?, viewType? }`: `minWidth` is the container width in pixels from which it applies, `columns` the number of visible product columns and `viewType` the look (`tablet` or `desktop`; `mobile` exists for legacy tables and is not meant to be combined with `responsiveBreakpoints`). `columns` and `viewType` are optional and carry over from the previous matching breakpoint.

Set them per table via the `responsiveBreakpoints` input, or globally through the `COMPARISON_TABLE_DEFAULT_OPTIONS` provider token. The defaults are exported as `DEFAULT_BREAKPOINTS`.

The example below keeps the defaults below `BREAKPOINT_LARGE` and replaces the largest one with a `tablet` view showing 3 columns, so the table stays in the tablet look on wide containers instead of switching to desktop.

<!-- example(comparison-table-overflow) -->

`columns` and `viewType` are independent: 3 columns in the `tablet` look is not the same as 3 columns in the `desktop` look. The playground below wires both fields of a single breakpoint at `minWidth: 0` — which always matches — to dropdowns, so the layout is driven purely by the two values and not by the container size.

<!-- example(comparison-table-breakpoint-playground) -->

#### Sticky header

On desktop the header row sticks to the top of the page while the user scrolls the table. When it is pinned, the header cells shrink their content to keep the docked header compact: an `nx-comparison-table-header-eyebrow` collapses away, `nx-price` steps down from `2xl` to `l`, and the cell padding plus the slot spacing tighten (via the `…-sticky` theming tokens). These changes ease in via the `comparison-table-header-stuck-transition-duration`/`-easing` tokens (skipped under `prefers-reduced-motion: reduce`).

Opt out by adding `[mayStick]="false"` to your header row. The eyebrows and price sizes in this example stay put, because its header never docks.

<!-- example(comparison-table-non-sticky-header) -->

#### Structuring rows

The example below combines the three ways to structure the rows of a table. They are independent — leave out the blocks you do not need.

`nx-comparison-table-intersection-cell` replaces all product cells of a row with one cell spanning the full width, for content that applies to every product. On mobile the table is transposed to a single column, so put long intersection content in an accordion above the table instead.

`nxComparisonTableToggleSection` with a `nx-comparison-table-toggle-section-header` groups rows under a collapsible category heading.

`nxComparisonTableRowGroup` shows only the first `[visibleRows]` rows (5 by default) and hides the rest behind a toggle. Customize its labels with `[labelCollapsed]` and `[labelExpanded]`, and read or bind the open state through `isExpanded`.

<!-- example(comparison-table-rows) -->

<div class="docs-expert-container">

Setting `useFullRowForExpandableArea="true"` on the row group makes the expandable area span the full table width. The `NxExpertModule` does this by default. Please **switch the theme to "EXPERT" at the top of the page** to see the correct expert comparison table.

<!-- example(comparison-table-expandable-area) -->

</div>

#### Disabled and hidden columns

`disabledColumn` on a header `nx-comparison-table-cell` greys out that product's whole column. It can only be set on header cells, and it does **not** reach form controls inside the column — disable dropdowns, inputs and checkboxes yourself.

`hiddenIndexes` on `nx-comparison-table` removes columns from the table entirely. It hides selected columns too, so make sure the currently selected column cannot be hidden — otherwise you submit a selection the user can no longer see.

Please note that **this example is using the `nx-context-menu` component which is an Expert component**. This means that this combination is currently only intended for internal and not for client-facing applications.

<!-- example(comparison-table-columns) -->

#### Error state

The `isError` attribute displays an error state for the header and footer of the table.

To enhance accessibility, please ensure that an explanation of any error messages is included above the table, if applicable.

<!-- example(comparison-table-error) -->

#### Dynamically filled content

The table can be built from data instead of static markup. When values arrive after the first render, reserve their space with a fixed-height container — otherwise the late content shifts the page and hurts your [Cumulative Layout Shift](https://web.dev/cls/) score. The example below keeps the price slot at a fixed height and shows a spinner while loading; see [optimize CLS](https://web.dev/optimize-cls/#dynamic-content) for the general technique.

<!-- example(comparison-table-dynamic) -->

<div class="docs-expert-container">

#### Expert: Form controls in a comparison table

You can place other components like a dropdown in the comparison table.

Please note that **this is an option for Expert**. This means that form controls inside the comparison table are currently only intended for internal and not for client-facing applications. Switch the theme to "EXPERT" at the top of the page to see the correct expert comparison table.

<!-- example(comparison-table-form-elements) -->

</div>

#### Premium breakdown and recommendation tables

Two further layouts build on the comparison table: a premium breakdown table for displaying how a price is composed, and a recommendation table for summarizing a single offer.

<!-- example(breakdown-table) -->

<!-- example(recommendation-table) -->

<div class="docs-expert-container">

Simplified, more neutral variants of both are available for expert applications.

<!-- example(breakdown-table-expert) -->

<!-- example(recommendation-table-expert) -->

</div>

<div class="docs-private">

#### Theming variations

By setting some theming tokens, you can modify the look of the comparison table. For the basic theming setup check the [theming page](./documentation/theming).

Depending on the colors you choose, it may be necessary to modify the default button styling in the comparison table, e.g. use the negative button for an unselected button for the color combinations shown here. For this, you can set `unselectedClassNames="secondary small negative"` for `nxComparisonTableSelectButton`.

<!-- example(comparison-table-private-modify-theming, { "privateExample": true, "hideStackblitzButton": true }) -->

</div>

#### Legacy

The following two examples are kept for existing NDBX applications. Do not start from them.

Before the header slots existed, header cells were composed of freeform markup with application-owned CSS for order, spacing and typography. This still works — unslotted content renders after the slots — but every application ended up looking slightly different, which is what the slots fix.

<!-- example(comparison-table-header-legacy) -->

The `view` input forces a fixed layout instead of deriving it from the available width. Prefer `responsiveBreakpoints` (see [responsive layout](#responsive-layout-and-overflow)), which covers the same ground and is the supported path for A1.

<!-- example(comparison-table-static) -->
