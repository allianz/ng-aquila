---
title: Small stage
category: components
b2c: true
expert: true
stable: done
alias: page banner
---


### Overview

Small stage is designed to be used at the top of your page or section to serve as a heading with illustrations.

Although, small stage does not restrict the content that can be placed within the content section of the stage, it is recommended to use a heading and topline or subline when needed. The images of small stage fluidly grow or shrink, adapting to the viewport size and available space. On smaller screens only one image is displayed below the content section.

Since small stage is designed to take 100% width of a page or a container, it's recommended to open the examples in a new window to get a better feeling of how it is intended to look and behave.

Examples here feature both short and long headlines side by side in order to better outline the small stage behavior.

### Basic Layout

The layout of the small stage is structured in five slots that can be populated using the following marker directives:

-   Main area, contains text or other content
-   `[nxSmallStageHeader]`: Header section
-   `[nxSmallStageImageStart]`: Left image of the small stage, visible on desktop
-   `[nxSmallStageImageEnd]`: Right image of the small stage, visible on desktop
-   `[nxSmallStageImageBottom]`: Image below the content area, visible on tablet and smaller

<!-- example(small-stage-default)-->

Various sizes of headlines and sublines can be used to achieve the desired effect.

<!-- example(small-stage-content-variation)-->

Let's take a closer look at various parts of small stage:

#### Images

-   `[nxSmallStageImageStart]`
-   `[nxSmallStageImageEnd]`
-   `[nxSmallStageImageBottom]`

Images can be placed in all three slots using the `nx-small-stage-image` tag. It accepts an `src` input, where you should pass a url address of the image to be loaded. Notice that start and end images an used around the content on bigger screens, but when viewport gets narrower than 704px only the bottom image is displayed.


#### Header

-   `[nxSmallStageHeader]`

In some cases you might need to add some data to the small stage that should not be in the content section, for example, breadcrumbs or links. The header should contain only one line of text so it will not change the height of the stage.

<div class="docs-private">

#### Backgrounds

If you need to add some background images to the small stage, you can do it through css on the main small stage container:

<!-- example(small-stage-w-bg)-->

</div>

<div class="docs-expert-container">

### Expert specifics

The small stage component has some specifics related to expert usage that we will discuss in this section. The small stage can be switched to expert by setting `appearance="expert"`.

Expert small stage is designed to use only one image after the content.

<!-- example(small-stage-expert-default)-->

#### Narrow content

In some cases you might need to use a narrow content container, e.g. when the headline is short and you want a better positioning of the image.

Setting the `narrow` input switches the ratio between content and image containers to 50/50.

<!-- example(small-stage-expert-content-narrow)-->

</div>

## Accessibility

In order to achieve responsive behavior and fluid scaling of the small stage, we're leveraging the css background image functionality under the hood to display the image. Since background images are intended solely for decorative purposes, they are ignored by assistive technologies and there's no way to provide alternative description as with html `<img>` tag.

Please, refrain from presenting meaningful content or convey information through the image in the small stage component. Image section should be used for decoration and the content of the page should not depend on the image being loaded or accessible.
