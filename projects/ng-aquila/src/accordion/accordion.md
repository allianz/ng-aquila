---
title: Accordion
category: components
b2c: true
expert: true
stable: done
alias: expansion panel, collapse
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

The appearance of an accordion can be changed by setting according properties `variant` and `negative` on `nx-accordion` or by giving each of the expansion panels their own configuration. Panels will always prefer their own configuration if given.

#### Negative

<!-- example(accordion-negative) -->

#### Light

<!-- example(accordion-light) -->

#### Light negative

<!-- example(accordion-light-negative) -->

#### Extra light

<!-- example(accordion-extra-light) -->

#### Extra light negative

<!-- example(accordion-extra-light-negative) -->

### Lazy loading

By default the content of the accordion items will be loaded eagerly even when the item is closed. You can choose to provide the content as an `ng-template` instead to defer the initialization until the accordion item is loaded.

<!-- example(accordion-lazy) -->

### Accordion with Error State

Example error behaviour with accessible error messages using dynamic `aria-invalid` and `aria-describedby`:

<!-- example(accordion-error) -->

### Global settings

To enable and configure scroll behavior you can use the EXPANSION_PANEL_DEFAULT_OPTIONS injection token as shown in the code snippet below:

```ts
@NgModule({
    providers: [
        {
            provide: EXPANSION_PANEL_DEFAULT_OPTIONS,
            useValue: {
                scrollIntoViewActive: true,
                scrollIntoViewOptions: {
                    behavior: 'smooth'
                }
            }
        }
    ]
```

or configure the scrollIntoViewActive- and scrollIntoViewOptions-Input-decorators as shown in this example:

<!-- example(accordion-scroll-smooth) -->
