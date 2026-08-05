---
title: Rating
description: Star rating input
category: components
b2c: true
expert: true
stable: done
a1Light: true
a1Densities: true
group: 
- Forms & Inputs
- Actions
---

### Examples

#### Basic Example

<!-- example(rating-basic) -->

<div class="docs-hide-ndbx">

#### Non Interactive Rating

When `interactive` is set to `false`, the rating cannot be changed by click, hover, or keyboard, and a fractional `value` is rounded to the nearest half star for display (e.g. `3.2` renders as 3 full stars, `3.6` renders as 3 full stars and a half star). Half-star rendering is display-only — it is not selectable and only applies when not interactive; an interactive rating always shows and accepts whole stars.

<!-- example(rating-non-interactive) -->

</div>

#### Disabled Rating

<!-- example(rating-disabled) -->

#### Inverse Styling

You can change the styling of the rating to inverse via the `inverse` property. The legacy negative property is still supported as a deprecated alias.

<!-- example(rating-negative) -->

#### Simple Binding

<!-- example(rating-simple) -->

#### Template-driven with ngModel

<!-- example(rating-template) -->

#### Reactive

<!-- example(rating-reactive) -->

#### Sizes

<!-- example(rating-sizes) -->

### Accessibility

The component can be accessed via keyboard. To do that, use the TAB-key to focus on one of the stars and hit the ENTER-key to select it. Alternatively, increase or decrease the selected value by hitting the LEFT-ARROW- or RIGHT-ARROW-key. Moreover, it is possible to provide custom descriptions for each star. Please refer to `ariaLabel` in the API section for more information.

<!-- example(rating-accessibility) -->
