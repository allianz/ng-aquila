---
title: Indicator
description: Status indicator dots
category: components
b2c: true
expert: true
stable: done
alias: badge
a1Light: true
a1Densities: true
group: Data Display
---

The indicator is a small badge that can be used to mark an element or page as unread for the user.

### Variants

The indicator renders as one of three variants, picked automatically from its
content — there is no input for it:

- **countless** — an empty indicator, rendered as a plain dot
- **count** — a number, rendered with text inside
- **icon** — a projected icon, rendered as a circle

Only text longer than one character gets horizontal padding and grows into a
pill. A projected `nx-icon` is sized by the indicator, so it scales with the
indicator size and needs no `size` of its own.

<!-- example(indicator) -->

<div class="docs-hide-ndbx">

### Sizes

Use the `size` input to pick one of the sizes. Default size is `m`.

Available sizes: `s | m | 800 | 1000 | 1200 | 1400 | 1600 | 1800 | 2000`

<!-- example(indicator-sizes) -->

### Color types

Use the `type` input to set the signal color. Default type is `critical`.

Available types: `critical | warning | positive | info`

<!-- example(indicator-types) -->

</div>

### Usage inside other components

The indicator can be placed inside other components. You are free to position the indicator as needed with css or use `position` input to turn on one of our positioning presets. Note, that since most of our presets rely on absolute positioning, you might need to add `position: relative` style to the container element of indicator for best results. Here are a few examples.

#### Action

<!-- example(action-indicator) -->

#### Context Menu

<!-- example(context-menu-indicator) -->

#### Icon Button

<!-- example(button-icon-indicator) -->

<div class="docs-expert-container">

#### Tabs

Please note that **this is an Expert styling option**. This means that the indicator position is currently only defined for internal applications and not for applications that are client facing.

<!-- example(tabs-with-indicator) -->

This is also possible with the navigation bar:

<!-- example(tabs-nav-bar-with-indicator) -->

</div>

</br>

<div class="docs-hide-ndbx">

### Accessibility

Per [WCAG 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html), color must not be the only way of distinguishing information. The indicator itself is accessible, but it can be used in a way that isn't:

- **Only one indicator type (with the same content) used across the UI** — this is accessible, since the information is communicated by the presence or absence of the indicator, not by its color.
- **Different types or different content used side by side** (e.g. different icons, or icons mixed with text) — this relies on color alone to distinguish meaning and creates an accessibility issue for people with color blindness or low
vision. `aria-label`/`aria-description` alone do not fix this, since they only help users of screen readers.

If you need to distinguish between multiple indicator states, add a non-color cue such as accompanying text, a tooltip, or a popover with additional information.

</div>
