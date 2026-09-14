---
title: Progress Indicator
description: Multi-step wizard/progress indicator
category: components
b2c: true
expert: true
stable: done
alias: stepper, wizard, multi step, progress indicator, 🧙‍♂️ 
a1Densities: true
group: Data Display
---

An indicator is a wizard-like workflow that divides content into logical steps. You provide the content and distribute it in different steps. The indicator will ensure to show only the current content and inform the user about the overall progress.

## Multi Progress Indicator

`nx-multi-progress-indicator` renders an ordered list of steps. Your app controls which step is active and handles navigation.

<!-- example(multi-progress-indicator-basic) -->

Set `[numbered]="false"` for dot-only bullets with a checkmark on completion.

<!-- example(multi-progress-indicator-unnumbered) -->

#### Color Scheme

Use `colorScheme="positive"` to switch the active color to the positive/success scheme.

<!-- example(multi-progress-indicator-positive) -->

#### Step Actions

__Links__

Set `[currentStep]` (1-based). Steps before it are automatically marked completed, and the step at that index becomes current.

__Accessibility:__ An incomplete step's anchor should not have an `href`, so it isn't a link at all (see [Accessibility](#accessibility) below).

<!-- example(multi-progress-indicator-current-step) -->

__Buttons__

Showing the active step's content and stepping through it is up to your app - drive it off the same `[currentStep]`.

<!-- example(multi-progress-indicator-with-content) -->

`nxProgressIndicatorStepAction` on a projected `<a>`/`<button>` makes it focusable and clickable only once its step is completed. Content without it (e.g. a plain `<span>`) is left as-is.

#### Layout

__Horizontal labels below__

`layout="horizontal-labels-below"` bars every step and moves labels below the bullet, instead of a bar for just the current step with labels beside it.

<!-- example(multi-progress-indicator-horizontal-labels-below) -->

__Vertical__

`layout="vertical"` stacks steps top to bottom with a bar between each.

<!-- example(multi-progress-indicator-vertical) -->

__Vertical no labels__

`layout="vertical-no-labels"` is `"vertical"` without a visible label (still read by assistive tech). Keep it decorative, not clickable - with no visible label, there's no visible target to click.

<!-- example(multi-progress-indicator-vertical-no-labels) -->

__Vertical no bars__

`layout="vertical-no-bars"` is `"vertical"` without a connecting bar.

<!-- example(multi-progress-indicator-vertical-no-bars) -->

A compact horizontal layout isn't implemented yet.

#### Step states

A step is `completed`, `current`, and/or `critical` - `completed`/`current` are usually derived from `[currentStep]` on the parent (see [Step Actions](#step-actions)) rather than set by hand.

- **Upcoming** (default): disabled color.
- **Current**: `[current]="true"`, or at `[currentStep]`'s index. Active color.
- **Completed**: `[completed]="true"`, or before `[currentStep]`. Filled bullet with a checkmark (or number, if `[numbered]`).
- **Critical**: `[critical]="true"`, independent of the others. Critical color, "!" bullet.

<!-- example(multi-progress-indicator-step-states) -->

`critical` only recolors the bullet - needs to be communicated to the user with something like `nxTooltip` to explain why, especially when the critical step isn't the current one.

#### Localization

The visually-hidden "Completed: "/"Current: " prefixes announced before a step's label (see [Accessibility](#accessibility) below) default to English. To translate them, subclass `NxMultiProgressIndicatorIntl` and provide it in your (root) module.


<!-- example(multi-progress-indicator-localize) -->

### Accessibility

Name the indicator with `aria-label` or `aria-labelledby` (forwarded to the inner `<ol>`). Add `aria-describedby` for more detail.

Steps render as `role="listitem"` and aren't interactive themselves - project an `<a>`/`<button>` to make one clickable, or a `<span>` to keep it inert. The component adds a visually-hidden "Completed: "/"Current: " prefix ([translatable](#localization)) and `aria-current="step"` automatically.

A projected `nxProgressIndicatorStepAction` link/button is focusable and clickable only once its step is completed. Prefer `<button>` (native `disabled`) over `<a>` (`aria-disabled` + `tabindex="-1"`, less reliably announced); drop the `<a>`'s `href` too once disabled, to remove its link semantics entirely.

When something outside the list drives `[currentStep]` (e.g. "Previous"/"Next" buttons, as in the [Buttons](#step-actions) example), moving to a new step doesn't move focus - a screen reader user gets no feedback that anything changed. Announce it yourself with `LiveAnnouncer` from `@angular/cdk/a11y`.


## Legacy

The following documents the older, Angular CDK Stepper based implementation (`nx-multi-stepper`, `nx-step` and related directives/components). It is kept for backward compatibility — for new usage prefer the Multi Progress Indicator above where its horizontal-only scope fits your use case.

These legacy implementations offer three variants: "Single Indicator", "Multi Indicator" and "Progress Indicator". Those indicators can show different details of the overall progress.

<details>
<summary>Legacy progress indicator components</summary>

Ensure that you import the required modules. This implementation relies on the [Angular CDK stepper](https://material.angular.io/cdk/stepper/overview) implementation so you have to fulfill the peer dependency on the CDK to use it.

#### Single Indicator

This type of indicator shows a progress bar, a caption for the current step and if available there is a hint shown for the following step.

You control the indicator through your own buttons decorated with directives `nxStepperPrevious` and `nxStepperNext` to connect them to the current indicator.

<!-- example(progress-stepper) -->

#### Labels

#### Custom Step Labels

You can change the step labels in the single indicator prefixed for the current step (left hand) and also the following step (right hand).

Note: The `currentStepLabel` will be used in all indicators for the mobile view.

<!-- example(progress-stepper-custom) -->

#### Stepper Label

The `<nx-label>` will be shown above the single indicator for all steps.

<!-- example(progress-stepper-title) -->

##### Multi Indicator

That's the Multi Indicator. In difference to the Single Indicator you have the overall progress bar divided by the step names.

**Warning**: If a Multi Indicator step does not have a `[stepControl]` assigned, then a step is per default marked as completed after being passed.

<!-- example(progress-stepper-multi) -->

##### Multi Indicator - manual step completion

Per default, valid steps except for the last step are completed when you set `[linear]="true"`. You can complete the last step manually via its `[complete]` Input, as shown in the example below.

<!-- example(progress-stepper-form) -->

If you are not using the `[linear]` Input, you could also control the completion of the steps manually.

<!-- example(progress-stepper-nonlinear) -->

<div class="docs-expert-container">

#### Expert: Multi Indicator Vertical

Please note that **this is an Expert option**. This means that the vertical direction and group feature is only intended for internal applications and not for applications that are client facing.

The progress indicator can be switched to a vertical layout, by setting the `direction` input to `vertical`.

<!-- example(progress-stepper-multi-vertical) -->

#### Expert: Multi Indicator Groups

Steps can be grouped by wrapping them in `nx-stepper-group` tags. Each group needs a label and at least one step inside of it. Groups are currently limited to the vertical multi stepper.

<!-- example(progress-stepper-multi-groups) -->

</div>

#### Progress Indicator (Legacy variant)

With this variant the user will see all steps listed horizontally, but there is only one progress bar visible for the current step.

That progress bar can be controlled to inform the user about the progress of the current step. This update can't be done automatically by the indicator you have to provide the progress value.

<!-- example(progress-stepper-step) -->

#### Reactive Forms

You can use reactive forms the way you are used to it with normal forms. In addition each `nx-step` can be provided with a `stepControl` attribute which points to the top level `AbstractControl (FormControl, FormGroup or FormArray)` for the step. The `stepControl` is used to check the validity of the step which is mainly used for the "linear" option.

There are two possible approaches. One is using a single form for the indicator, and the other is using a different form for each step

<!-- example(progress-stepper-reactivesingle) -->

#### Reactive Form example with separate form per step

<!-- example(progress-stepper-reactivemulti) -->

#### Linear Progress

You can force the user to complete a form before continuing. To make a indicator aware of it you have to enable linear progress with the property `linear` on any indicator and you have to assign the involved form group to the step through the `[stepControl]` Input.

<!-- example(progress-stepper-progress) -->

#### Accessibility (Legacy)

In case of the Single Indicator also make sure to set the appropriate `progressbarAriaLabel` or `progressbarAriaLabeledBy` for your use case.
This will set the associated aria attributes on the nested <a href="./documentation/progressbar/overview">NxProgressbarComponent</a>

</details>
