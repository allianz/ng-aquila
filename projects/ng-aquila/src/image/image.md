---
title: Images
category: components
b2c: true
expert: true
stable: done
---

### NgOptimizedImage

You have the possibility to use optimized images with the [new Angular Image Directive capabilities](https://developer.chrome.com/blog/angular-image-directive/). In order to take advantage of `NgOptimizedImage`, make sure to [import it into your module](https://angular.io/api/common/NgOptimizedImage#description).

```ts
import { NgOptimizedImage } from '@angular/common';
```


### Default images

In general, the `<img>` element will always be contained in a `<figure>` element with a `nxFigure` attribute. Modifiers, which affect the visual appearance and behaviour of the image, are applied as input to the `nxFigure` attribute. These include modifiers for the aspect ratio as well as the general shape of the image, as detailed below.

<!-- example(image-default) -->

### Fixed Ratios

These are cropped versions of the image with a given aspect ratio. The following ratios are supported:

<!-- example(image-fixed-ratios) -->

### Attributes

Since you use the native `<img>` element, you have access to the wide variety of attributes of it. For instance, you can use the `srcset` attribute to provide a list of sources with pixel density descriptors as in the following example, so that the client browser can select the most suitable source in any given situation.

<!-- example(image-attribute) -->

### Rounded Images

Images can be cropped to a round shape.

<!-- example(image-rounded) -->
