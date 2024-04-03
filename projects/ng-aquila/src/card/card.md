---
title: Cards
category: components
b2c: true
expert: true
stable: done
alias: card, selectable card
---

Use this component to present a card with different options.

### Default

<!-- example(card) -->

### Highlight card

With `highlight` you can allow a highlight header to be shown on the card.

<!-- example(highlight-card) -->

### Selectable Card

#### Checkbox behavior

<!-- example(selectable-card-basic) -->

#### Radio button behavior

in case you want selectable cards with radio selection,
you can use `nx-selectable-card-group` to group the cards, and they will automatically function as radio buttons.

<!-- example(selectable-card-radio) -->

#### Product Card

<!-- example(selectable-card-product) -->

#### Selectable Card States

<!-- example(selectable-card-states) -->

#### Highlight selectable card

With `highlight` you can allow a highlight header to be shown on the card.

<!-- example(highlight-selectable-card) -->

#### Reactive Forms

<!-- example(selectable-card-reactive) -->

#### Dynamically adding and removing cards

<!-- example(selectable-card-dynamic) -->

### Clickable Card

 With `clickable="true"` and `nxCardMainLink` you can make the whole card clickable.
 Use `nxCardMainLink` on an `<a>` element as the main clickable action of the card.
 Use `nxCardSecondaryInfo` to add other selectable elements like optional links or raise text.

 The usage of a headline around the link is optional depending on your project's needs.

 <!-- example(clickable-card) -->

#### Disabling clickable card

Use `disabled` on the `nx-card` component to provide a visual representation of a disabled card. In addition, the `nxCardMainLink` item will add `aria-disabled="true"` automatically. Please make sure that you that you do not set the `href` attribute on the `nxCardMainLink` element.
See the example how to do that with and without the Angular router.

<!-- example(clickable-card-disabled) -->


#### Raising content

To make the whole card area clickable the so called "pseudo content trick" is used, which spans the pseudo element of the main link over the whole card element.
This means that even text inside the card is behind that pseudo element and is not selectable.

You can raise content like texts but also other interactive elements via the `nxCardSecondaryInfo`. Please note that this content will be create a gap in the clickable area of the card.

<!-- example(clickable-card-raised-content)-->

<div class="docs-expert-container">

### Expert: Appearance

With `appearance` you can change the styling of the card to expert. Using the `NxExpertModule` will automatically set that option and you don't have to set it in the template manually.
Works for both checkbox and radio style cards.

<!-- example(selectable-card-expert) -->
</div>



