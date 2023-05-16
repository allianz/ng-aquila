---
title: Tag
category: components
b2c: true
expert: true
stable: done
alias: chip, badge
---

## Examples

By default, the tag component allows individual values to be deleted on click. This behavior can be disabled by setting the `nxAllowTagDeletion` flag to false.

<!-- example(taglist) -->

### Tag Keywords

The tags can optionally be styled as keywords by setting the respective option `isKeywordList`.

<!-- example(taglist-keyword) -->

### Tag Formatter

The textual representation of tags can be customized through a formatter function, which can be useful for translation and other cases where the tag value depends on the application state. In this example, the formatter adds the prefix "my" to the tag value.

<!-- example(taglist-formatter) -->

### Delete Tags

If the option `allowTagDeletion` is not set to false, tags can be deleted from the list on click.

Note that tags can be added and the list can be cleared by calling the respective methods `addTag` and `clearTags` on the component. The respective buttons and input in this example are independent of the component and only included in this example to show that they can be placed anywhere on the page and that any custom business logic and validation can be used. Any content of the element will be used as empty state and is displayed in case the tags array is empty.

<!-- example(taglist-delete) -->

<!-- example(taglist-basic) -->

### Objects as Input

In order to give you as much flexibility as possible and support a wide variety of use cases, the tag list not only works with strings but accepts any object as input which has a `nxTaglistLabel` property. Note that while this is the default name, the label property can be configured via the input. `labelProperty`.

<!-- example(taglist-objects) -->

### Template-driven with ngModel

The tag list component can be used within template-driven forms.

<!-- example(taglist-templatedriven) -->

### Reactive

The tag list component can be used within reactive forms.

<!-- example(taglist-reactive) -->

### Output

The tag emits an output on click, which contains the selected tag.

You should also set `tabindex="0"` for the taglist, so the tags are reachable via keyboard navigation.

<!-- example(taglist-output) -->

### Accessibility

The default value of the `tabindex` of the tag items is `-1`. If the tags are removable then the default value is `0` so that they are focusable. In all other cases please take care of setting an appropriate tab-index via the input `tabindex` on the taglist (please check the [output example](./documentation/taglist/overview#output)).

In oder to improve accessibility, please consider **linking a label** to the tag list component, for example like this:

<!-- example(taglist-a11y) -->

#### Keybord navigation

If `allowTagDeletion` is set to `true`, you can remove selected tags using BACKSPACE. If your tags trigger actions on click, these actions will be also triggered on ENTER click.
