---
title: Button
category: components
b2c: true
expert: true
stable: done
a1Densities: true
---

Buttons are used to make common actions immediately visible and easy to perform. This component allows users to trigger an action – either by clicking on or tapping the button, or by pressing certain keyboard keys (such as Enter or the space bar). Depending on the use case, buttons contain a label and/or an icon. There are multiple styles, sizes, and variations that can be used for different situations. We attach buttons through a directive so that we can rely on the native abilities of a real **`<button>`** tag.

We work with five different types of buttons. The primary's heavy appearance is intended to direct the user to take a suggested primary action; the secondary's lighter design best works to compliment a primary action or to reduce visual noise if there are several hierarchically equal actions on the same page. Emphasis, call-to-action and disabled should be self-explanatory.

### Basic button

<!-- example(button) -->

### Sizes

#### Small

<!-- example(button-small) -->

#### Small Medium

<!-- example(button-small-medium) -->

#### Medium

<!-- example(button-medium) -->

#### Large

<!-- example(button-large) -->

### Critical

<!-- example(button-critical) -->

### Block

<!-- example(button-block) -->

### Negative

<!-- example(button-negative) -->

### With icons

Use the `nxIconPositionStart` or `nxIconPositionEnd` attributes to position the icons. Please also don't set any size on the icon, the button component will handle the correct size for you.

<!-- example(button-with-icon) -->

### Icon Button

Use the `nxIconButton` component if your button contains only an icon and no text. Please be aware that icons are not accessible, and you need to provide an additional description. This can be done using an `aria-label` or a tooltip.

<!-- example(button-icon) -->

#### Indicators

Inside the icon button you can add the [`<nx-indicator>`](./documentation/indicator/overview) component:

<!-- example(button-icon-indicator) -->

### Plain Button

The `nxPlainButton` does not need a lot of space. If only icons are used, they need to be made accessible, e.g. by using an `aria-label` or a tooltip.

<!-- example(button-plain) -->

<div class="docs-a1">
For One Allianz the plain button supports new API options `size` and `variant`.

<!-- example(button-plain-a1) -->
</div>

### Anchor Button

You can use an `<a>` instead of a `<button>` element, in case you want to have an anchor styled like a button.

<!-- example(anchor-button) -->

### Loading Button

You can use the input `loading` to show a loading spinner inside the button.
The spinner will be shown instead of the button label, and the button will not trigger click events while `loading` is `true`.

To reduce layout shifts, the label is visibly hidden but still present in the DOM.
For accessibility, adding an aria-label describing the loading state is recommended.

<!-- example(button-loading) -->
