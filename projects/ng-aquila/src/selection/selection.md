---
title: Selection Indicators
description: Purely presentational selection indicators (checkbox and radio) for use in custom UI
category: components
b2c: true
expert: true
stable: true
a1Densities: true
group: Utilities
---

# Selection Indicators

Selection indicators are visual elements used to represent selection states, such as checkboxes and radio buttons, in custom UI components. They are designed to be used in conjunction with other components like cards, tiles or in a dropdown flyout, where selection is a key interaction. These components do not have any interaction logic and are purely presentational.


## Examples

### Default Appearance

This example shows both the checkbox and radio indicators in their default appearance.

<!-- example(selection-indicator-default) -->

### Inverse Appearance

Set `inverse` on the radio indicator when it sits on a dark surface. It is available for the
default and critical appearances; it is not combined with the on-selection appearance.

<!-- example(selection-indicator-inverse) -->

### On-selection Appearance

The on-selection appearance is used on other interactive elements like cards or tiles.
The following example shows both the checkbox and radio indicators with the on-selection appearance (all states).

<!-- example(selection-indicator-on-selection) -->

<div class="docs-a1">

### On-accent and On-brand Appearance

The radio indicator also supports the `on-accent-attention` and `on-brand-static` appearances,
for placement on an accent or brand coloured surface in Allianz One. If you select readonly with these two appearances the component will fall back to use the default color scheme.

<!-- example(selection-indicator-accent-brand) -->

</div>

## Hover, Active and Focus Styles

The indicators are presentational and never know that the element around them is hovered,
pressed or focused: the pointer sits on the surrounding component (like a card, tile or label), and focus sits on
the native input the indicator stands in for. The surrounding component therefore owns the
selector, and these mixins supply the declarations for both nx-radio-indicator and nx-checkbox-indicator:

```scss
@use '@allianz/ng-aquila/styles/selection-indicator-mixins' as *;

.my-card {
  &:hover nx-radio-indicator {
    @include nx-radio-indicator-hover;
  }
  &:active nx-radio-indicator {
    @include nx-radio-indicator-active;
  }
  &:has(input:focus-visible) nx-radio-indicator {
    @include nx-selection-indicator-focus;
  }
}
```

Keep the indicator's element selector on your side.

## Usage

Import the components, use them in your templates and position them in your layout:

```html
<nx-checkbox-indicator />
<nx-radio-indicator />
```

These components are purely visual and should be combined with appropriate logic and accessibility features in your application.
