---
title: Data Display
category: components
b2c: true
expert: true
stable: done
---

The data display component resembles a HTML description list element. It consists of a label and a value which are both implemented as sub components `<nx-data-display-label>` and `<nx-data-display-value>`;

### Basic

<!-- example(data-display) --> 

### Column layout
The data display component does not include any layout. You can achive a simple column layout using the `nxLayout="grid"` as seen below:
<!-- example(data-display-cols) --> 


<div class="docs-expert-container">
### Expert: Horizontal direction
The orientation of the data display can be changed to horizontal using the `direction` input.
<!-- example(data-display-horizontal) --> 

### Expert: Variations and sizes

By default, expert data display size is set to medium. There is a more condensed size that can be set using `size="small"`.

<!-- example(data-display-expert) --> 
</div>
