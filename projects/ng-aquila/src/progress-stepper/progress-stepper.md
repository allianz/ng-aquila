---
title: Progress Indicator
category: components
b2c: true
expert: true
stable: done
alias: stepper
---

An indicator is a wizard-like workflow that divides content into logical steps. You provide the content and distribute it in different steps. The indicator will ensure to show only the current content and inform the user about the overall progress.

You can choose between "Single Indicator", "Multi Indicator" and "Progress Indicator". Those indicators can show different details of the overall progress.

Ensure that you import the required modules. The progress indicator relies on the [Angular CDK stepper ](https://material.angular.io/cdk/stepper/overview) implementation so you have to fulfill the peer dependency on the CDK to use the indicator.

### Single Indicator

This type of indicator shows a progress bar, a caption for the current step and if available there is a hint shown for the following step.

You control the indicator through your own buttons decorated with directives `nxStepperPrevious` and `nxStepperNext` to connect them to the current indicator.

<!-- example(progress-stepper) -->

### Labels

#### Custom Step Labels

You can change the step labels in the single indicator prefixed for the current step (left hand) and also the following step (right hand).

Note: The `currentStepLabel` will be used in all indicators for the mobile view.

<!-- example(progress-stepper-custom) -->

#### Stepper Label

The `<nx-label>` will be shown above the single indicator for all steps.

<!-- example(progress-stepper-title) -->

### Multi Indicator

That's the Multi Indicator. In difference to the Single Indicator you have the overall progress bar divided by the step names.

**Warning**: If a Multi Indicator step does not have a `[stepControl]` assigned, then a step is per default marked as completed after being passed.

<!-- example(progress-stepper-multi) -->

### Multi Indicator - manual step completion

Per default, valid steps except for the last step are completed when you set `[linear]="true"`. You can complete the last step manually via its `[complete]` Input, as shown in the example below.

<!-- example(progress-stepper-form) -->

If you are not using the `[linear]` Input, you could also control the completion of the steps manually.

<!-- example(progress-stepper-nonlinear) -->

<div class="docs-expert-container">

### Expert: Multi Indicator Vertical

Please note that **this is an Expert option**. This means that the vertical direction and group feature is only intended for internal applications and not for applications that are client facing.

The progress indicator can be switched to a vertical layout, by setting the `direction` input to `vertical`.

<!-- example(progress-stepper-multi-vertical) -->

### Expert: Multi Indicator Groups

Steps can be grouped by wrapping them in `nx-stepper-group` tags. Each group needs a label and at least one step inside of it. Groups are currently limited to the vertical multi stepper.

<!-- example(progress-stepper-multi-groups) -->

</div>

### Progress Indicator

With the Progress Indicator the user will see all steps listed horizontally, but there is only one progress bar visible for the current step.

That progress bar can be controlled to inform the user about the progress of the current step. This update can't be done automatically by the indicator you have to provide the progress value.

<!-- example(progress-stepper-step) -->

### Reactive Forms

You can use reactive forms the way you are used to it with normal forms. In addition each `nx-step` can be provided with a `stepControl` attribute which points to the top level `AbstractControl (FormControl, FormGroup or FormArray)` for the step. The `stepControl` is used to check the validity of the step which is mainly used for the "linear" option.

There are two possible approaches. One is using a single form for the indicator, and the other is using a different form for each step

<!-- example(progress-stepper-reactivesingle) -->

### Reactive Form example with separate form per step

<!-- example(progress-stepper-reactivemulti) -->

### Linear Progress

You can force the user to complete a form before continuing. To make a indicator aware of it you have to enable linear progress with the property `linear` on any indicator and you have to assign the involved form group to the step through the `[stepControl]` Input.

<!-- example(progress-stepper-progress) -->
