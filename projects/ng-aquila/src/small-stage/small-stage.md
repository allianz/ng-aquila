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

Small stage is designed to be used at the top of your page or section to serve as a heading with illustrations.

Although, small stage does not restrict the content that can be placed within the content section of the stage, it is recommended to use a heading and topline or subline when needed.
The images of small stage fluidly grow or shrink, adapting to the viewport size and available space.
On smaller screens only one image is displayed below the content section.

Since small stage is designed to take 100% width of a page or a container, it's recommended to open the examples in a new window to get a better feeling of how it is intended to look and behave.

Examples here feature both short and long headlines side by side in order to better outline the small stage behavior.

### Default

The default small stage features a 1/2/1 ratio for image containers and content container.

Small stage provides 5 directives to be used for composition: 

- `nx-small-stage-header`
- `nx-small-stage-start-image`
- `nx-small-stage-content`
- `nx-small-stage-end-image`
- `nx-small-stage-narrow-screen-image`

<!-- example(small-stage-default)-->

Various sizes of headlines and sublines can be used to achieve the desired effect.

<!-- example(small-stage-content-variation)-->

It is not necessary to use all the directives, for example the expert version of small stage can be constructed with just 2 of them:

- `nx-small-stage-content`
- `nx-small-stage-end-image`

Let's take a closer look at various parts of small stage:

#### Images
- `nx-small-stage-start-image`
- `nx-small-stage-end-image`
- `nx-small-stage-narrow-screen-image`


All 3 image directives accept an `src` input, where you should pass a url address of the image to be loaded.
Notice that start and end images an used around the content on bigger screens, but when viewport gets narrower than 704px only the narrow-screen image is displayed.
It can be used, for example, to display the combination of two bigger screen images, like we do in the example, but it is optional.
If narrow-screen image is not provided, the source of and end image is used for narrow screens.

Narrow screen image has a `position` input that accepts either `start`, `end` or `center` to horizontally position it on the screen. The default value is `end`.

End image accepts `offsetEnd` input, which is only intended for expert usage and is discussed in the specific section below.

#### Content
- `nx-small-stage-content`

Content directive is used as a way to project its internals to a central part of the small stage.
It accepts a `narrow` boolean input, which is intended for expert use only and is discussed in the specific section below.

#### Header
- `nx-small-stage-header`

In some cases you might need to add some data to the small stage that should not be in the content section, for example, breadcrumbs.
For this the header directive is provided and it positions it's contents above the usual contents of the small stage.

<!-- example(small-stage-w-header)-->

<div class="docs-private">

#### Backgrounds

If you need to add some background images to the small stage, you can do it through css on the main small stage container:

<!-- example(small-stage-w-bg)-->

</div>

<div class="docs-expert-container">

### Expert specifics

The small stage component has some specifics related to expert usage that we will discuss in this section. For best results, you need to switch the theme to 'expert'.

Expert small stage is designed to use only one image after the content.

<!-- example(small-stage-expert-default)-->

#### Narrow content

In some cases you might need to use a narrow content container, e.g. when the headline is short and you want a better positioning of the image.

Setting a `narrow` input on `nx-small-stage-content` switches the ratio between content and image containers to 50/50.

<!-- example(small-stage-expert-content-narrow)-->

#### Image offset

If you want to add extra spacing after the image, this is possible through setting `offsetEnd` input on the end image directive. It is also combinable with `contentNarrow`, when needed.

<!-- example(small-stage-expert-image-offset)-->

For best results across different viewport sizes, we suggest using the [viewport service](./documentation/layout/overview#basic-viewport-subscription) to dynamically adjust styles of small stage to your needs.

</div>

## Accessibility

In order to achieve responsive behavior and fluid scaling of the small stage, we're leveraging the css background image functionality under the hood to display the image.
Since background images are intended solely for decorative purposes, they are ignored by assistive technologies and there's no way to provide alternative description as with html `<img>` tag.

Please, refrain from presenting meaningful content or convey information through the image in the small stage component. Image section should be used for decoration and the content of the page should not depend on the image being loaded or accessible.
