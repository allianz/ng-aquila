---
title: Small stage
category: components
b2c: true
expert: true
stable: progress
---

<div class="docs-deprecation-warning">
<strong>Work in progress / Experimental</strong>
The small stage component is provided as a beta preview. Breaking changes may still be introduced outside of major versions until the service is
considered stable.
</div>

### Overview

Small stage is designed to be used at the top of your page or section to serve as a heading with an illustration.

Although, small stage does not restrict the content that can be placed within the content section of the stage, it is recommended to use a heading and topline or subline when needed.
The image of small stage fluidly grows or shrinks, adapting to the viewport size and available space.
On smaller screens the image section is always displayed below the content section.

Since small stage is designed to take 100% width of a page or a container, it's recommended to open the examples in a new window to get a better feeling of how it is intended to look and behave.

Examples here feature both short and long headlines side by side in order to better outline the small stage behavior.

### Default

The default small stage features a 70/30 ratio for content container and image container.

Image is positioned in the center of image container.

Image url is passed to the small stage through `imageUrl` input.

<!-- example(small-stage-default)-->

Various sizes of headlines and sublines can be used to achieve the desired effect.

<!-- example(small-stage-content-variation)-->

### Narrow content

In some cases you might need to use a narrow content container, e.g. when the headline is short and you want a better positioning of the image.

Setting a `contentNarrow` input on small stage component switches the ratio between content and image containers to 50/50.

<!-- example(small-stage-text-narrow)-->

### Image offset

If you want to add extra spacing after the image, this is possible through setting `offsetEnd` input on the component. It is also combinable with `contentNarrow`, when needed.

<!-- example(small-stage-image-offset)-->

For best results across different viewport sizes, we suggest using the [viewport service](./documentation/layout/overview#basic-viewport-subscription) to dynamically adjust styles of small stage to your needs.

### Accessibility

In order to achieve responsive behavior and fluid scaling of the small stage, we're leveraging the css background image functionality under the hood to display the image.
Since background images are intended solely for decorative purposes, they are ignored by assistive technologies and there's no way to provide alternative description as with html `<img>` tag.

Please, refrain from presenting meaningful content or convey information through the image in the small stage component. Image section should be used for decoration and the content of the page should not depend on the image being loaded or accessible.
