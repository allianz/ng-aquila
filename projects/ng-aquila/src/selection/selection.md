---
title: Selection Indicators
category: components
b2c: true
expert: true
stable: true
a1: true
---

# Selection Indicators

Selection indicators are visual elements used to represent selection states, such as checkboxes and radio buttons, in custom UI components. They are designed to be used in conjunction with other components like cards, tiles or in a dropdown flyout, where selection is a key interaction. These components do not have any interaction logic and are purely presentational.


## Examples

### Default Appearance

This example shows both the checkbox and radio indicators in their default appearance.

<!-- example(selection-indicator-default) -->

### On-selection Appearance

The on-selection appearance is used on other interactive elements like cards or tiles.
The following example shows both the checkbox and radio indicators with the on-selection appearance (all states).

<!-- example(selection-indicator-on-selection) -->


## Hover and Active Styles

Hover and active styles for selection indicators must be implemented by the component that uses the indicators. The indicators themselves are purely visual and do not provide these interaction styles out of the box.

## Usage

Import the components, use them in your templates and position them in your layout:

```html
<nx-checkbox-indicator />
<nx-radio-indicator />
```

These components are purely visual and should be combined with appropriate logic and accessibility features in your application.
