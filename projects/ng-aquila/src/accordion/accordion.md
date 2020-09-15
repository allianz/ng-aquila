---
title: Accordion
category: components
b2c: true
expert: true
stable: done
---
### Standalone Expansion Panel
You can use a single expansion panel as a standalone item in different states as shown in the following examples.

<!-- example(accordion-standalone) -->

### Accordion
By default only one item can be expanded.

<!-- example(accordion) -->

### Multi Accordion
If you want the user to be able to expand multiple items simultaneously you can use `multi`.

<!-- example(accordion-multi) -->

### Styling options
The appearance of an accordion can be changed by setting according properties `nxStyle` and `negative` on `nx-accordion` or by giving each of the expansion panels their own configuration. Panels will always prefer their own configuration if given.

#### Light

<!-- example(accordion-light) -->

#### Negative

<!-- example(accordion-negative) -->

#### Light negative

<!-- example(accordion-light-negative) -->

### Lazy loading
By default the content of the accordion items will be loaded eagerly even when the item is closed. You can choose to provide the content as an `ng-template` instead to defer the initialization until the accordion item is loaded.

<!-- example(accordion-lazy) -->

### Accordion with Error State

<!-- example(accordion-error) -->
