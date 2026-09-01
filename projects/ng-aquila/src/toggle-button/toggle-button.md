---
title: Toggle Button (A1)
description: Radio-style group of buttons for a single choice out of many options
category: components
b2c: true
expert: true
stable: done
a1Full: true
alias: toggle button group, choice button
components:
#{{component(NxToggleButtonGroupComponent)}}
#{{component(NxToggleButtonComponent)}}
group: Forms & Inputs
---

The toggle button is a component of the One Allianz Design System. A `nx-toggle-button-group` holds
any number of `nx-toggle-button`s and behaves like a group of radio buttons: exactly one option can
be selected at a time and the arrow keys move the selection.

**Not to be confused with the [Toggle Button](/documentation/radio-toggle/overview) built from
`nx-radio-toggle`.** That component is the segmented control of the One Allianz Design System: a
small, fixed set of options that are joined into a single bar. Use the toggle button group when the
options are content of their own, when there are many of them, or when they should wrap over
several lines.

## Examples

### Basic

The label is projected as a `nx-label`, so all label features such as the info icon are available.

<!-- example(toggle-button-basic) -->

### Layout

The group arranges the buttons in as many columns as fit into the available width and wraps the rest
into the next line. No media or container queries are needed for the group itself.

- `columnSizing` (default `content`) makes every button as wide as its content. With `equal` all
  buttons share the same width.
- `maxColumns` caps the number of columns and only applies to `columnSizing="equal"`. It is a maximum,
  not a fixed number: if the available space is too small for that many buttons, fewer columns are
  used. With `content` sizing the number of columns follows from the width of the buttons, so there is
  nothing to cap and the input has no effect.
- `autoGrid` set to `false` emits no layout at all, which leaves the buttons to your own CSS on the
  `.nx-toggle-button-group__buttons` element. `columnSizing` and `maxColumns` then have no effect.

<!-- example(toggle-button-layout) -->

### Readonly and disabled

Both states can be set on the whole group or on single buttons.
**Readonly** should only be used in internal applications because of accessibility restrictions.

<!-- example(toggle-button-readonly-disabled) -->

### Negative

`negative` styles the whole group for a dark surface. It is set on the group, not on single buttons,
because a group always sits on one surface. The projected `nx-label` and any `nx-error` are not
covered by it, so set `negative` on the label as well.

<!-- example(toggle-button-negative) -->

## Forms

The group is the form control, the single buttons are not. It is a pure signal forms control: it
implements Angular's `FormValueControl` contract and does not register a `ControlValueAccessor`.
Signal forms is the recommended API, but `ngModel` and `formControlName` keep working, because
Angular drives a `FormValueControl` from template-driven and reactive forms as well.

### Signal forms

Bind a field to the group with `[formField]`. The value and the disabled and readonly state are kept
in sync with the field. The field is marked as touched once the focus leaves the group, not when the
focus moves from one button to another.

<!-- example(toggle-button-signal-forms) -->

### Template-driven forms

<!-- example(toggle-button-template-driven) -->

### Reactive forms

Angular binds the value and the disabled and required state of the `AbstractControl` to the group.
The `readonly` state is not part of reactive forms, so it stays with the `readonly` input.

<!-- example(toggle-button-reactive-forms) -->

### Validation and error state

The error state needs a form: the [`ErrorStateMatcher`](./documentation/error-handling) decides when
it is shown, in signal forms as well as in reactive and template-driven forms. A custom matcher
provided app wide therefore also applies to the group. In the error state the unselected buttons get
a critical border, the selected one a critical fill.

<!-- example(toggle-button-error-state) -->

A projected `nx-error` is shown as soon as the error state is matched. Signal forms marks all fields
of a form as touched when it is submitted with `submit()`, so the error also shows up for a group the
user never focused. Reactive forms does not touch its controls on submit, but the default matcher
matches once the parent form was submitted, which gets to the same result.

<!-- example(toggle-button-validation-error-state) -->

## Accessibility

The group renders as a `radiogroup` that is labelled by the projected `nx-label` and described by
the projected `nx-error`. Every button renders a native radio input, so the selection can be moved
with the arrow keys and the whole group is a single tab stop.
