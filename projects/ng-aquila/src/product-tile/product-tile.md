---
title: Product Tile
description: Product offering with a headline, price, feature list and a call to action
category: components
b2c: true
expert: false
stable: experimental
a1Full: true
alias: product tile, offer tile, plan tile, pricing tile
components:
#{{component(NxProductTileComponent)}}
#{{component(NxProductTileGroupComponent)}}
group:
  - Data Display
---

<div class="docs-hide-a1">

<div class="docs-deprecation-warning">
  The product tile is an A1 component. Some color variants have contrast issues in the NDBX theme.
</div>

</div>

A product tile presents one product or plan. Content comes from slots rather than inputs - project an `nx-price`, an `nx-list`, and whichever button fits.

## Carousel

A group puts one, two or three tiles side by side depending on the room it has, so a tile never gets too narrow for its title. Add more than fit and the track scrolls: a tile peeks in from either end, the tiles outside fade, and a progress bar appears. It stays a scroll container with snap points, so touch, trackpad and keyboard scrolling keep working - the arrows only shortcut that scroll and show on hover or focus.

Tiles on a track share their rows, so headers, prices and actions line up across the group. A promotion bar is one of those rows, so tiles without one show an empty strip.

The track opens on the tile selected before the first render, centred where there is room.

<!-- example(product-tile-carousel) -->

### Tab bar

Give **every** tile a `carouselLabel` and a tab bar appears above the track, one tab per tile. Tabs highlight whichever tiles are in view, and clicking one brings its tile in. Miss a label on any tile and the bar stays away.

## Slots

`NX_PRODUCT_TILE_IMPORTS` brings the group, the tile, every slot directive and the select button in one go - spread it into a standalone component's `imports`.

| Directive                      | What goes in it                                       |
| ------------------------------ | ----------------------------------------------------- |
| `nxProductTileHeaderContent`   | A whole custom header, replacing the four slots below |
| `nxProductTileEyebrow`         | Small uppercased line above the title                 |
| `nxProductTileTitle`           | The product name                                      |
| `nxProductTileSubline`         | One supporting line below the title                   |
| `nxProductTilePrice`           | An `nx-price`; sized `2xl` by the slot                |
| `nxProductTileSelectButton`    | The ready-made select button as the action            |
| `nxProductTileSecondaryAction` | A low-emphasis action below it                        |

<!-- example(product-tile-basic) -->

### Custom Header

`nxProductTileHeaderContent` replaces the eyebrow, title, subline and price slots - those are ignored while it is present. Tiles in one group can mix the two.

It also stands in for the missing title as the accessible name of the selection control, so keep it to what names the product.

Only components that read the surface adapt to a painted header, so reach for `nx-headline`, `nx-eyebrow` or `nx-body-text` instead of plain text. Size an `nx-price` here yourself - the slot's `2xl` does not reach it.

<!-- example(product-tile-header-content) -->

### Custom Body

Anything projected without one of the directives above lands in the body, unwrapped and unstyled. Markup order does not matter: the tile places its own slots.

<!-- example(product-tile-body-content) -->

## Color Schemes

`colorScheme` picks the surface the header is painted with, and its content adapts on its own. `plain` keeps the tile's own background and adds a divider instead. `accentColor` only takes effect with `accent-attention`.

<!-- example(product-tile-color-schemes) -->

## Select Button

`nxProductTileSelectButton` is the action as a button that already knows what it does: `Select`, then `Selected` behind a check mark once picked, secondary while unpicked and primary once picked.

`position="top"` moves it into the header, next to the price.

Labels come from `selectedLabel` and `unselectedLabel`, or from `NxProductTileSelectButtonIntl` for every tile beneath its provider. A label on the button wins.

<!-- example(product-tile-select-button) -->

## Promotion

`[promotion]` adds a text bar above the header.

<!-- example(product-tile-promotion) -->

## Price Size

The `nxProductTilePrice` slot imposes `2xl` through `NX_PRICE_CONTEXT` so prices match across a group. An `nx-price` anywhere else is sized by its own `size` input.

Name a `priceSize` to impose your own, or `undefined` to hand the decision back to the price. A nearer provider wins, but it has to sit on a **separate** element - two directives on one element provide into the same injector, where directive order decides.

<!-- example(product-tile-price-size) -->

## Selection

Tiles are always selectable, and always need a `nx-product-tile-group` - even a single one; a tile without a group throws. The group holds the selected value, works with `[(value)]`, `ngModel` and reactive forms, and accepts a projected `nx-error`. Single-select only.

<!-- example(product-tile-selection) -->

## Accessibility

The group is a `radiogroup` of real radio inputs, each labelled by its tile's title and price. A `nxProductTileSelectButton` is described by the same, so `Select` reads out which product it picks.

Name the group with an `aria-label`, or an `aria-labelledby` pointing at a headline above the tiles.

<!-- example(product-tile-labelled-by) -->

A body that only lists included features needs nothing extra - a list of what the product covers reads fine with a check icon or none. As soon as any tile shows another status, such as a feature that is excluded or only partly covered, the difference has to be spelled out, for screen reader users too. An icon alone is not enough: add the status as text, visible or visually hidden, next to each affected item.

Here a legend explains the icons to everyone who sees them, and a visually hidden `Included:` or `Not included:` gives each item its status for screen readers.

<!-- example(product-tile-feature-status) -->

The tab bar's semantics are not settled yet: its tabs are plain buttons without a `role` of their own.

Carousel arrows - and the tab bar's edge buttons - are labelled through `NxProductTileCarouselIntl`:

```ts
providers: [
  {
    provide: NxProductTileCarouselIntl,
    useFactory: () => {
      const intl = new NxProductTileCarouselIntl();
      intl.previousLabel.set('Vorherige Produkte');
      intl.nextLabel.set('Nächste Produkte');
      return intl;
    },
  },
];
```
