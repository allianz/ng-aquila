---
title: Grid
category: components
b2c: true
expert: true
stable: done
alias: container, column, layout
---

The application grid is based on 12 columns with tiers spread over the given set of breakpoints. That way, you can maintain different layouts corresponding to each group of devices.

**Note:** The borders here are only for visual support and not part of any grid definition.

This bar will show you the current tier of the grid. Change the size of your browser to see when the tiers change:

<div class="grid-component__current-grid-tier">
  <span class="current-grid__tier current-grid__tier-tiny">tiny</span>
  <span class="current-grid__tier current-grid__tier-small">small</span>
  <span class="current-grid__tier current-grid__tier-medium">medium</span>
  <span class="current-grid__tier current-grid__tier-large">large</span>
  <span class="current-grid__tier current-grid__tier-xlarge">xlarge</span>
  <span class="current-grid__tier current-grid__tier-2xlarge">2xlarge</span>
  <span class="current-grid__tier current-grid__tier-3xlarge">3xlarge</span>
</div>

#### Breakpoints

You can size columns and apply modifiers (like justify or offset properties) depending on a given set of breakpoints. You will find a set of 7 tiers called tiny, small, medium, large, xlarge, 2xlarge and 3xlarge. We are mobile first, so you will never use tiny as it's the default case.

When you specify a tier, it is always understood as from that tier up.

**Note:** Additional breakpoints are introduced for B2B(Expert) use cases. B2C users are advised to use the smaller breakpoints (tiny, small, medium, large).

<div style="display: flex">
  <div class="grid-tiers-example__container tier-tiny">
    <span class="grid-tiers-example__label">tiny</span>
    <code class="grid-tiers-example__pixel-value">|<br>0</code>
  </div>
  <div class="grid-tiers-example__container tier-small">
    <span class="grid-tiers-example__label">small</span>
    <code class="grid-tiers-example__pixel-value">|<br>320px</code>
  </div>
  <div class="grid-tiers-example__container tier-medium">
    <span class="grid-tiers-example__label">medium</span>
    <code class="grid-tiers-example__pixel-value">|<br>704px</code>
  </div>
  <div class="grid-tiers-example__container tier-large">
    <span class="grid-tiers-example__label">large</span>
    <code class="grid-tiers-example__pixel-value">|<br>992px</code>
  </div>
  <div class="grid-tiers-example__container tier-xlarge">
    <span class="grid-tiers-example__label">xlarge</span>
    <code class="grid-tiers-example__pixel-value">|<br>1280px</code>
  </div>
  <div class="grid-tiers-example__container tier-2xlarge">
    <span class="grid-tiers-example__label">2xlarge</span>
    <code class="grid-tiers-example__pixel-value">|<br>1472px</code>
  </div>
  <div class="grid-tiers-example__container tier-3xlarge">
    <span class="grid-tiers-example__label">3xlarge</span>
    <code class="grid-tiers-example__pixel-value">|<br>1760px</code>
  </div>
</div>

### Structure

A grid is based on the directives **grid**, **row** and **column**.

#### Grid

The root of a grid is always `nxLayout='grid'`. This establishes the necessary spacings so that the columns and rows can generate a balanced gutter. You can assign a max-width and remove the gutters through modifiers `nogutters` and `maxwidth`.

#### Row

This provides the flex container for the columns to be laid out as flex children. There are modifications available to change the flex behaviour like `justify-content-start` or `align-items-start`.

Never forget a row when using a column; otherwise you will have spacing problems due to the applied margins having a negative value.

#### Column

The grid is based on the common 12 column base. This means that a single column takes up 1/12 of the available width. You can configure a column to take up more space ranging from 1 to 12 columns by using the directive `nxCol`.

There are modifiers available like `align-self-start` and `offset`.

### CSS Media and Container Queries

CSS Media Queries allow for the styling of web content based on the characteristics of the device or browser that it is being viewed on, while CSS Container Queries enable responsive design by allowing elements to adapt their styling based on the size of their container rather than the viewport.
You can choose the query type for each grid based on your needs.

#### Media Queries

Media queries are based on the browser where the web page is viewed on.
We use CSS Media Queries as the default. All components and examples are based on Media Queries if not stated otherwise.

#### Container Queries

Container queries are a way to create layouts that are based on the size of each individual container, rather than the viewport.
Checkout the [mozilla container queries documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries) for more information.

To enable container querying use `[containerQuery]="true"` on the grid.

This example illustrates the difference between media and container queries. Both sub grids use the same definitions for __rows__ and __columns__. The only difference is the query type.
Watch the container grid adjust to changes of the container size in contrast to the media query grid.

<!-- example(grid-query-comparison) -->


### Examples

#### nxLayout

Use the nxLayout directive on a `div` element to specify if it's a container:

```html
<div nxLayout="grid"> [...] </div>
```

#### nxRow

Use the `nxRow` directive on a div element to specify if it's a row:

```html
<div nxLayout="grid">
    <div nxRow> [...] </div>
</div>
```

#### nxCol: Auto-sized (one input)

Two rows with two columns in the first and four columns in the second row. We enter only one value in the directive.

They are shared among all tiers.

<!-- example(grid-one-input) -->

#### nxCol: Multiple inputs

If you assign only one value it will be used for all tiers. If you assign two values the first one will be used for the tiny size and the second one for the remaining ones.

Order of the used inputs: <code>nxCol="<span class="docs-grid-text-tiny">&lt;tiny&gt;</span>, <span class="docs-grid-text-small">&lt;small&gt;</span>, <span class="docs-grid-text-medium">&lt;medium&gt;</span>, <span class="docs-grid-text-large">&lt;large&gt;</span>, <span class="docs-grid-text-xlarge">&lt;xlarge&gt;</span>, <span class="docs-grid-text-2xlarge">&lt;2xlarge&gt;</span>, <span class="docs-grid-text-3xlarge">&lt;3xlarge&gt;</span>"</code>.

<!-- example(grid-multi-inputs-1) -->

For example:

<!-- example(grid-multi-inputs-2) -->

#### nxCol: Offset columns

If you want to offset a column you can use the `colOffset` property similar to the `nxCol` logic.

<!-- example(grid-offset) -->

#### NoGutters and NoPadding

Use `nogutters` to remove the spacing from rows and (direct) columns. Use `nopadding` to remove the spacing around the grid, but keep the column gutters. This is useful when you need to place the grid inside of another component that already has spacing (including the grid in grid case).

<!-- example(grid-nogutter) -->

#### Grid in grid
You can nest grids inside of other grids to get subdivided columns and achieve more granular positioning. Make sure to use `nogutters` and `nopadding` for [grid in grid scenario](./documentation/grid/overview#nogutters-and-nopadding).
<!-- example(grid-in-grid) -->

#### MaxWidth

In order to constrain the grid, define an overall maximum width (width: 1184px and max-width: 100%).

<!-- example(grid-maxwidth) -->

#### rowJustify

The `rowJustify` directive aligns the flexible container's items when the items do not use all available space on the main axis (horizontally).

<!-- example(grid-justify) -->

#### rowAlignContent

To modify the behavior of the flex-wrap property, use the `rowAlignContent` directive. It is similar to `rowAlignItems`, but instead of aligning flex items, it aligns flex lines.

<!-- example(grid-align-content) -->

#### rowAlignItems

The `rowAlignItems` directive defines the default vertical alignment for items inside the flexible container.

<!-- example(grid-align-items) -->

#### alignSelf

The `alignSelf` property specifies the alignment for a selected item inside the flexible container.

<!-- example(grid-align-self) -->

#### colOrder

To specify the order within the row, apply the `colOrder` property.

<!-- example(grid-col-order) -->

