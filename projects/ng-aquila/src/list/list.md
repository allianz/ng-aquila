---
title: List
category: components
b2c: true
expert: true
stable: done
---

The component library supports three types of lists: unordered lists, ordered lists and lists with icons.

### Different list types

#### Default (unordered) list

<!-- example(list-unordered) -->

#### Simple ordered list

<!-- example(list-ordered) -->

#### Ordered list with circles

<!-- example(list-circles) -->

#### Lists with Icons

Custom icons are supported by means of the nxListIcon directive, which can be configured to display individual icons for each item of the list.

<!-- example(list-icons) -->

### List with different copytext sizes

The size can be one of these values: `xsmall`, `small`, `normal`. The default value is `normal`.

<!-- example(list-copytext) -->

### Condensed list

By using attribute `condensed`, you can activate the condensed mode of the list. Use the style tokens to set the spacing. The normal list remains the same in `condensed` mode.

<!-- example(list-condensed) -->

### Negative styling

<!-- example(list-negative) -->

### Custom color of list items

You can change the color of the list item circles by overwriting the default color as shown in the example below.

**Please make sure that your color scheme is in line with branding.**

<!-- example(list-custom-color) -->

#### List Nesting

You can also nest different type of lists in each other, as shown in the example below.

<!-- example(list-nesting) -->
