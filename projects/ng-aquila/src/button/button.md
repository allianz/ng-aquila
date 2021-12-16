---
title: Button
category: components
b2c: true
expert: true
stable: done
---

Buttons are used to make common actions immediately visible and easy to perform. This component allows users to trigger an action – either by clicking on or tapping the button, or by pressing certain keyboard keys (such as Enter or the space bar). Depending on the use case, buttons contain a label and/or an icon. There are multiple styles, sizes, and variations that can be used for different situations. We attach buttons through a directive so that we can rely on the native abilities of a real **`<button>`** tag.

We work with five different types of buttons. The primary's heavy appearance is intended to direct the user to take a suggested primary action; the secondary's lighter design best works to compliment a primary action or to reduce visual noise if there are several hierarchically equal actions on the same page. Emphasis, call-to-action and disabled should be self-explanatory.

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

### Danger

<!-- example(button-danger) -->

### Block

<!-- example(button-block) -->

### Negative

<!-- example(button-negative) -->

### Icons

A button with an icon is particularily useful whenever the interface space is limited. Users may even recognize them more quickly than a text if the icon represents the connected action adequately.

**Please add a margin** between icon and text. You can use the [utility classes](./documentation/margins/overview) `nx-margin-right-2xs` and `nx-margin-left-2xs`.

<!-- example(button-with-icon) -->

### Icon Button

Use the `nxIconButton` component if your button contains only an icon and no text. Please be aware that icons are not accessible, and you need to provide an additional description. This can be done using an `aria-label` or a tooltip.

<!-- example(button-icon) -->

#### Indicators

Inside the icon button there can be used a [`<nx-indicator>`](./documentation/indicator/overview):

<!-- example(button-icon-indicator) -->

### Plain Button

The `nxPlainButton` does not need a lot of space. If only icons are used, they need to be made accessible, e.g. by using an `aria-label` or a tooltip.

<!-- example(button-plain) -->

### Anchor Button

You can use an `<a>` instead of a `<button>` element, in case you want to have an anchor styled like a button.

<!-- example(anchor-button) -->
