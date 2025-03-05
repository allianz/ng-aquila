---
title: Tag
category: components
b2c: true
expert: true
stable: done
alias: chip
---

<div class="docs-deprecation-warning">
<b>nxTaglist</b> is deprecated and will be removed in a future version. Please use <b>nx-tag</b> and <b>nx-tag-group</b> instead.
From now on the supported patterns are for multi selection filter tags and deletable tags only. Please see the new examples. For non-interactive tags please use the badge component.
</div>

Tags are an interactive element that are used for selection e.g. for filters of data or show a list of removable tags. Tags are not meant to be used as purely informational, non-interactive element. For this use case, please use the badge component.

### Filter / selectable tags
Multi select pattern

<!-- example(tag-group) -->

#### Forms integration
How to use with ngModel or reactive forms.

<!-- example(tag-group-forms) -->

### Deletable tags

<!-- example(deletable-tags) -->

### Disabled
Please note that for reactive forms you should not use the `disabled` property in the template but disable the control via the forms API.

<!-- example(tags-disabled) -->

### Readonly

<!-- example(tags-readonly) -->

### Customizing the label content
By default the tag will show the value input as the text. Instead of the value you can provide your own template by providing it as content.

<!-- example(tag-label-rendering) -->


### Accessibility
#### Add a group label
A label should be connected to the tag group describing its purpose. It can be added either via `aria-labelledby` or `aria-label`.


#### Selectable tags
Selectable tags function as a group of checkboxes. They are focusable and can be selected or unselected by pressing the space key.

#### Removable tags
In removable tags only the delete button is focusable and clickable. The tag itself is not focusable and does not trigger any action on click. For accessibility a proper label that reflects the action should be provided. See [internationalization](./documentation/taglist/overview#internationalization) for more information.

### Internationalization
The provider `NxTagIntl` contains various strings to provide labels for display and screen readers. You have to provide a proper translation for each of your locales.

<!-- example(tag-intl) -->


### Deprecated Taglist

By default, the tag component allows individual values to be deleted on click. This behavior can be disabled by setting the `nxAllowTagDeletion` flag to false.

<!-- example(taglist) -->

#### Tag Keywords

The tags can optionally be styled as keywords by setting the respective option `isKeywordList`.

<!-- example(taglist-keyword) -->

#### Tag Formatter

The textual representation of tags can be customized through a formatter function, which can be useful for translation and other cases where the tag value depends on the application state. In this example, the formatter adds the prefix "my" to the tag value.

<!-- example(taglist-formatter) -->

#### Delete Tags

If the option `allowTagDeletion` is not set to false, tags can be deleted from the list on click.

Note that tags can be added and the list can be cleared by calling the respective methods `addTag` and `clearTags` on the component. The respective buttons and input in this example are independent of the component and only included in this example to show that they can be placed anywhere on the page and that any custom business logic and validation can be used. Any content of the element will be used as empty state and is displayed in case the tags array is empty.

<!-- example(taglist-delete) -->

<!-- example(taglist-basic) -->

#### Objects as Input

In order to give you as much flexibility as possible and support a wide variety of use cases, the tag list not only works with strings but accepts any object as input which has a `nxTaglistLabel` property. Note that while this is the default name, the label property can be configured via the input. `labelProperty`.

<!-- example(taglist-objects) -->

#### Template-driven with ngModel

The tag list component can be used within template-driven forms.

<!-- example(taglist-templatedriven) -->

#### Reactive

The tag list component can be used within reactive forms.

<!-- example(taglist-reactive) -->

#### Output

The tag emits an output on click, which contains the selected tag.

You should also set `tabindex="0"` for the taglist, so the tags are reachable via keyboard navigation.

<!-- example(taglist-output) -->

#### Accessibility

The default value of the `tabindex` of the tag items is `-1`. If the tags are removable then the default value is `0` so that they are focusable. In all other cases please take care of setting an appropriate tab-index via the input `tabindex` on the taglist (please check the [output example](./documentation/taglist/overview#output)).

In oder to improve accessibility, please consider **linking a label** to the tag list component, for example like this:

<!-- example(taglist-a11y) -->

#### Internationalization
The provider `NxTagIntl` contains various strings to provide labels for display and screen readers. You have to provide a proper translation for each of your locales.
 <!-- example(taglist-intl) -->

#### Keybord navigation

If `allowTagDeletion` is set to `true`, you can remove selected tags using BACKSPACE. If your tags trigger actions on click, these actions will be also triggered on ENTER click.
