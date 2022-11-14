---
title: Circle Toggle
category: components
b2c: true
expert: true
stable: done
alias: button, radio, toggle, checkbox
---

The toggle circle can be used as standalone toggle circle (checkbox role) or multiple toggle circles can be grouped with the circle toggle group wrapper and fullfill a radio group role.

Use this component to illustrate what information your checkbox communicates by integrating an icon or custom SVG. In order to edit your SVGs correctly, it should be 80x80px in size. You can use the viewBox attribute to do so. Since the circle has a diameter of 80, it will fit neatly at the edges and cut off the images' corners.<br> This is how the feature is currently implemented in the desktop version.<br> To avoid cutting off the corners you may, however, decide to place a smaller version of the SVG wholly inside the circle. The icon or SVG you use should not have a border as it is a part of the component itself and in case the icon is not shown the user will still see a good looking empty button with a label.

### Standalone Circle Toggle (checkbox role)

The component can be used as a standalone component with a checkbox role where you can select multiple checkboxes at the same time as shown below.

<!-- example(circle-toggle-standalone) -->

### Circle Toggle Group (radio group role)

The Circle Toggle component can also be wrapped in a circle toggle group, which gives the buttons in the group the behaviour of a radio group, where only one button can be selected at a time.

<!-- example(circle-toggle-group) -->

### Styling

#### Different responsive behaviors

The default responsive behavior of the Circle Toggle is to become toggle buttons as can be seen above.

To disable that behavior and have the Circle Toggle stay in the same design as on desktop, you can use the `[responsive]` property and set it to false on the `nx-circle-toggle-group` element itself:

<!-- example(circle-toggle-responsive) -->

#### Use textual content instead of icons

Instead of icons it is also possible to display text with `[circleText]`. This option is not meant for displaying long texts, so the text size will not adapt.

Please note that if no label is provided, on mobile the circleText will be displayed instead inside the toggle button.

<!-- example(circle-toggle-text) -->

#### Negative styles

<!-- example(circle-toggle-negative) -->

<div class="docs-expert-container">

#### Expert: Appearance

With `appearance="expert"` you can change the styling of the card to expert.

Please note that this is an **Expert option**. This means that it is only intended for internal applications and not for applications that are client facing.

<!-- example(circle-toggle-group-expert)-->

</div>

### Simple binding

<!-- example(circle-toggle-simple-binding) -->

### Template driven form with ngModel

<!-- example(circle-toggle-template-driven) -->

### Reactive form

<!-- example(circle-toggle-reactive) -->

### Reactive form disabled

<!-- example(circle-toggle-reactive-disabled) -->

### Validation
<!-- example(circle-toggle-validation)-->

### Accessibility

The component can be accessed via keyboard. To do that, use the TAB-key to focus the component. The standalone circle toggle component has the type checkbox and can be checked and unchecked through clicking SPACE after being focused. If there is a wrapper circle toggle group (radio group) around the toggle items than you can change the chosen item by using the arrow keys.
