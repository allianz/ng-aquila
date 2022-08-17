---
title: Accessibility
category: general
b2c: true
expert: true
stable: done
noApi: true
---

All components in our Component Library are compliant with the WCAG 2 Level AA accessibility standards. These Accessibility Guidelines (WCAG) are part of a series of web accessibility guidelines published by the Web Accessibility Initiative (WAI) of the World Wide Web Consortium (W3C). By being complaint with them we want to make our components accessible, primarily for people with disabilities, but also for all users on all devices (including highly limited devices, such as mobile phones).

**Using our accessibility compliant components does not make your application accessible by default.** Our components fulfil most of the accessibiility requirements, but there are still some things you have to pay attention to. In the [Guidelines](./documentation/accessibility/overview#guidelines) you can find hints to consider. You can also go through this great [tutorial](https://codelabs.developers.google.com/angular-a11y#0) from the Angular team.

### Our component library supports:

-   Color contrast
-   Keyboard navigation
-   High contrast support
-   Screen reader support

### We aim to support the following screen readers:

-   VoiceOver macOS 12 (evergreen)
-   JAWS 2019
-   NVDA (evergreen)

### Guidelines

#### Usage of aria-label

One important accessibility attribute is `aria-label`, which describes a certain element and is read by the screenreader when the user has focused its element. We provide our components with default placeholders. In most cases, you need to adjust the `aria-label` value according to your use case.

-   When using a variable as value for the `aria-label` you need to use attribute binding:

    ```html
    <nx-icon [attr.aria-label]="myAriaLabelVariable"></nx-icon>
    ```

-   In other cases you can simply assign the `aria-label` attribute:

    ```html
    <nx-icon aria-label="My icon description string"></nx-icon>`
    ```

-   If the aria labels are needed inside the component template we usually have specific inputs for that or make use of an injection token like in the datepicker: [datepicker localization example](./documentation/datefield/overview#localizing-labels-and-messages).

You can find more information on the `aria-label` attribute [here](https://www.w3.org/TR/wai-aria/#aria-label).

#### Setting high contrast colors for SVGs

All components of this UI component library implement the high contrast mode for MS Edge. However, if you use your own SVGs, you may need to add high contrast styling on your own.

This is the basic code snippet for setting the color of a svg in high contrast mode (also used in the example below):

```scss
@media screen and (-ms-high-contrast: active) {
    .g-inside-svg {
        /* proprietary Windows system color value; IE/Edge only */
        fill: windowText;
    }
}
```

For more information on which colors to use in the high contrast mode, please visit [this explanation](https://docs.microsoft.com/en-us/windows/uwp/design/accessibility/high-contrast-themes#high-contrast-colors).

<!-- example(accessibility-high-contrast-svg) -->

#### Standards and testing 

Our library enables accessibility with the AA (W3C) standard. To keep your application compatible with the standard please check with ([WAI-ARIA](http://w3c.github.io/aria-practices/)). In addition, we recommend to include automated tests checking a11y properties for every component using [Axe - automatic a11y compliance checker](https://www.deque.com/axe). 

The main a11y tasks are to ensure that:

-   the focus state is displayed properly
-   keyboard navigation within the component is working and documented
-   aria-label attributes are properly set and documented (use one of the [recommended online tools or browser plugins](https://www.w3.org/WAI/ER/tools/))
-   components are working in [high-contrast mode](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/master/Accessibility/HighContrast/explainer.md)
-   color contrast is sufficient (use [Color contrast checker](https://webaim.org/resources/contrastchecker/) or install a browser plugin)

You could easily include basic A11Y testing with [Axe](https://www.deque.com/axe) in your automated tests like so: 

```typescript
axe.run(actual, {}, (error: Error, results: axe.AxeResults) => {
    if (results.violations.length) {
        // report violations
    }
});
```

You can also refer to our [Jasmine custom Axe matcher](https://github.com/allianz/ng-aquila/blob/main/projects/ng-aquila/test.ts)

Please also check:
-   [Easy Checks – A First Review of Web Accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/)

### Helpful tools and links for ARIA guidelines and verification

-   [Color contrast checker](https://webaim.org/resources/contrastchecker/)
-   [High contrast mode explanation](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/master/Accessibility/HighContrast/explainer.md)
-   [High contrast themes](https://docs.microsoft.com/en-us/windows/uwp/design/accessibility/high-contrast-themes)
-   [Automatic a11y compliance checker](https://www.deque.com/axe)
-   [a11y training from the Angular team](https://codelabs.developers.google.com/angular-a11y#0)
