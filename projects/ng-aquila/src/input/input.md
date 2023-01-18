---
title: Input Field
category: components
b2c: true
expert: true
stable: done
---

### Module

**Important:** You will almost never use the `nxInput` directive without a [formfield](./documentation/formfield/overview) as you won't get any chrome or labels.

Therefore, the Input Module gives you access to the NxInputDirective which is required to use the [formfield component](./documentation/formfield/overview).

As `nxInput` is only a directive, you will get the full angular support for input elements like ngModel and reactive forms. You can also pass all attributes native to the input element.

If convenient for your use case, feel free to use this directive in combination with a textarea.

There is, however, one caveat: We currently block unsupported input types like file, select, button and the like. For more details, see further down.

#### Without formfields

As mentioned in the introduction, you won't get any chrome or labels when using inputs without formfields. Hence it will look like this (dashed border so you can see them):

<!-- example(input-without-formfield) -->

### Examples

Most of the native input field types are supported. You are not allowed to use non-text inputs like checkbox, file or hidden - those will throw an error.

<!-- example(input) -->

### Expert: Appearance

With `appearance="expert"` you can change the styling of the card to expert.

Please note that this is an **Expert option**. This means that it is only intended for internal applications and not for applications that are client facing.

<!-- example(formfield-appearance) -->

### Input Mode

Make sure to use the native `inputmode` HTML attribute to take advantage of the users' devices virtual keyboards with the right configuration.

<!-- example(input-mode) -->

#### Textarea Autoresize

You can resize `<textarea>` elements by using the `cdkTextareaAutosize` directive from the CDK `@angular/cdk/text-field` module. More information on this directive can be found [here](https://material.angular.io/cdk/text-field/overview#automatically-resizing-a-code-lt-textarea-gt-code-).

<!-- example(input-autoresize) -->

#### Forbidden Types

Here comes the full list of input field types that you are not allowed to use with this directive:

-   button
-   checkbox
-   file
-   hidden
-   image
-   radio
-   range
-   reset
-   submit

#### NgModel & Reactive

As you are using the native input field, you will get the full support for ngModel, reactive form and template driven forms.

#### Standalone

<!-- example(input-standalone) -->

#### NgModel

<!-- example(input-template-driven) -->

#### Reactive

<!-- example(input-reactive) -->

### Password visibility toggle

In order to hide/show characters on inputs of type password you can use the `nx-password-toggle` component in combination with a `nxFormFieldSuffix` as shown in the example below. The input field has to be passed as a `control` to the `nx-password-toggle` component.

**Important:** When using a formfield with a visibility toggle please pass an `aria-label` to the password toggle via the `ariaLabel` input. If you don't set it explicitly it will have 'Show password' as default value. As the default is in English, in almost all cases you should explicitly set the label.

<!-- example(formfield-password-visibility) -->
