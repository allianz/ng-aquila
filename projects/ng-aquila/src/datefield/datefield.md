---
title: Date Field
category: components
b2c: true
expert: true
stable: done
---
### Module
Ensure that you provide a date implementation in addition to the required module:

```ts
import { NxDatefieldModule } from '@aposin/ng-aquila/datefield';
import { NxNativeDateModule } from '@aposin/ng-aquila/datefield';
```

The date field requires Angular CDK (incl. CSS).

### Choose your DateAdapter
You can choose between using the native date, [Moment.js](https://momentjs.com/) or implement your own. This documentation is using the moment implementation.

|Module              |Date type|Supported locales                                                      |Dependencies                      |Import from                       |
|--------------------|---------|-----------------------------------------------------------------------|----------------------------------|----------------------------------|
|`NxNativeDateModule`|`Date`   |en-US                                                                  |None                              |`@aposin/ng-aquila/datefield`     |
|`NxMomentDateModule`|`Moment` |[See project](https://github.com/moment/moment/tree/develop/src/locale)|[Moment.js](https://momentjs.com/)|`@aposin/ng-aquila/moment-date-adapter`|

#### Native Date

```ts
import { NxNativeDateModule } from '@aposin/ng-aquila/datefield';
```

That's an implementation on top of the native Date object in the browser. You have no dependencies but you won't be able to change the parse format. To repeat this: You won't be able to change the parsing, that's why we use the Moment.js adapter in this demonstration.

#### Moment.js

```ts
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';
```

If you choose to use the moment implementation you have to fulfill the Moment.js peerDependency and import the NxMomentDateModule instead of the NativeDateAdapter.

#### Custom
You can implement your own DateAdapter to use other libraries like [date-fns](https://date-fns.org/) or [fecha](https://github.com/taylorhakes/fecha).

#### Setting the selected date

The type of values that the datepicker expects depends on the type of DateAdapter provided in your application. The `NativeDateAdapter`, for example, works directly with **plain JavaScript Date objects**. When using the `MomentDateAdapter`, however, the **values will all be Moment.js instances**.

Depending on the DateAdapter being used, the datepicker may automatically deserialize certain date formats for you as well. For example, both the `NativeDateAdapter` and `MomentDateAdapter` allow [ISO 8601](https://tools.ietf.org/html/rfc3339) strings to be passed to the datepicker and automatically converted to the proper object type. This can be convenient when binding data directly from your backend to the datepicker. However, the datepicker will not accept date strings formatted in user format such as "1/2/2017" as this is ambiguous and will mean different things depending on the locale of the browser running the code. You can test which strings are accepted:

<!-- example(datefield-iso) -->

### Examples
This is a full example showing the capabilities of this component. It integrates into `nx-formfield` so you have access to floating labels, hints and error messages. Optionally you can provide a Datepicker.

You need to add the Directives `nxInput` to make the input accessible to the `nx-formfield` and `nxDatefield` to gain access to the actual date handling. The datepicker is provided by creating the `nx-datepicker` component together with a `nx-datepicker-toggle`. You have to tell the date field about the datepicker by connecting it with the `[nxDatepicker]` Input.

<!-- example(datefield-basic) -->

#### Disabled
You can disable the input as usually. The datepicker toggle will be disabled too.

<!-- example(datefield-disabled) -->

#### Min & Max
You can define a range of valid dates with min and max. The given limits are reflected in the datepicker too. If the user manage to input invalid dates you will get the errors `nxDatefieldMax`, `nxDatefieldMin` and `nxDatefieldParse` in your form model.

<!-- example(datefield-min-max) -->

#### Date Filter
Instead of using min/max you can use `nxDatefieldFilter` to create your own set of valid dates. This example only allows the 6th day of each month. The datepicker disables all invalid dates. Validation will give you an error in the field `nxDatefieldFilter`.

<!-- example(datefield-filter) -->

#### Date Range

To create a date range, you can open the datepicker for the end date automatically when a start date is selected.

<!-- example(datefield-range) -->

#### Reactive form

<!-- example(datefield-reactive) -->

### Parsing & Formatting
Both parsing and formatting depend on the capabilities of the chosen DateAdapter. Every date adapter brings it's own defaults so you don't have to set anything by default. To do so anyway you inject the necessary patterns through the injection token `NX_DATE_FORMATS`:

<!-- example(datefield-format-injection) -->

#### Parsing
Parsing converts a string into a valid date model which is either a native Date object or a moment object with the current set of available NxDateAdapters.

**Parsing capabilities of date adapters:** The native date object has only minimal parsing capabilities. There is no parsing format supported so it's simply ignored if any is given. The moment class has a pretty good support for parsing in different formats.

The default parsing pattern for the moment adapter is `L` standing for local aware and translates to `MM/DD/YYYY` for `en-US`. See the [documentation](https://momentjs.com/docs/#/parsing/) for details.

Pass a pattern of your choice to be used for the internal date heuristics. There are multiple valid formats. If you don't pass one, the current locale format will be the base for the pattern's heuristics.

In order to prevent any ambiguity with the date given by the user, **parsing is set to strict by default**. You can disable the strict mode with `[nxStrict]='false'`, but be aware that this may lead to situations where the date is not recognized as intended by the user.

The following example shows two datefields with both strict and non-strict formatting. The `[parseFormat]` is set to MM-DD-YYYY. In your implementation you can also use a list of strings for `[parseFormat]`.

<!-- example(datefield-parsing) -->

#### Formatting
The formatting of the date is not initiated through user input. Therefore, the field will only trigger the formatting step if you enter a new value through the model. The default for the moment adapter is `L` given through display.dateInput. You can override that value by injecting your own `NxDateFormats` object or locally per datepicker with the property `nxDisplayFormat`.
Here is an example: Provide a valid input like 01/01/2018, then click somewhere outside of the input field. The recognized date will be written into the model, now forcing a formatting step on `blur`.

You will see a change in format. If this format is not covered by your set of parsing functions, the value won't validate when the user tries to change it. That's why we have two parse formats in place: `['MM/DD/YYYY', 'MM--DD-->YYYY']`

<!-- example(datefield-formatting) -->

### Start View
You can start the datepicker with different views. Use the property `startView` to do so. There are three views: Months (to pick a day, default), Year (to pick a month), MultiYear (to pick a year).

<!-- example(datefield-startview) -->

### Manual Control
You can manually open or close the date picker by accessing its template reference and calling either `open` or `close`.

<!-- example(datefield-manual) -->

### Localization

#### Date Localization
The ability to localize the datepicker **depends on the chosen date implementation**. The native date adapter supports only en-US and you can't change the values. The moment adapter supports a variety of locales. See Moment.js for a full list of locales.

The Datepicker falls back on the Application token `LOCALE_ID` and can be overwritten through the `NX_DATE_LOCALE` if necessary:

```ts
@NgModule({
  providers: [
    {provide: NX_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class MyApp { }
```

If you want to **change the locale during runtime** you can use the `setLocale()` method of the used DateAdapter implementation. This is shown in the following example.

**Please note** that the locale setting does not change all labels and texts in the datepicker, only the date related parts are translated. You need to provide your own translation for texts like the header. You can find an example in the next chapter [Localizing labels and messages](./documentation/datefield/overview#localizing-labels-and-messages).

<!-- example(datefield-localize-date) -->

#### Localizing labels and messages
The different texts and strings in the datepicker (like the button "Choose a date") can be translated by implementing a subclass of `NxDatepickerIntl` and provide it in your (root) module. Here is an example where we changed the default "Choose month and year" text to "Choose button".

**Important**: If you use your own label texts, please make sure that you also provide all the properties that are needed for screen reader users. These are also shown in the following example.

<!-- example(datefield-localize-texts) -->

### Accessibility
The provider `NxDatepickerIntl` contains various strings to provide labels for screen readers. You have to provide a proper translation for each of your locales. See the example in the [Localizing labels and messages](./documentation/datefield/overview#localizing-labels-and-messages) chapter above.

The provider includes a `changes` subject that you can use to notify dependent components about changes of the strings during runtime.

Regarding Keyboard navigation see the following chapter.

### Keyboard Navigation
Each view of the calendar (month, year, multiYear) supports a wide range of key shortcuts. Here is an overview.

#### Keyboard shortcuts
The date field supports the following keyboard shortcuts:

| Shortcut             | Action                                                                  |
|----------------------|-------------------------------------------------------------------------|
| `ALT` + `DOWN_ARROW` | Open the calendar pop-up (if date field is focused)                     |
| `ENTER`              | Open the calendar pop-up (if date icon is focused)                      |
| `ESCAPE`             | Close the calendar pop-up                                               |

In month view:

| Shortcut             | Action                                    |
|----------------------|-------------------------------------------|
| `LEFT_ARROW`         | Go to previous day                        |
| `RIGHT_ARROW`        | Go to next day                            |
| `UP_ARROW`           | Go to same day in the previous week       |
| `DOWN_ARROW`         | Go to same day in the next week           |
| `HOME`               | Go to the first day of the month          |
| `END`                | Go to the last day of the month           |
| `PAGE_UP`            | Go to the same day in the previous month  |
| `ALT` + `PAGE_UP`    | Go to the same day in the previous year   |
| `PAGE_DOWN`          | Go to the same day in the next month      |
| `ALT` + `PAGE_DOWN`  | Go to the same day in the next year       |
| `ENTER`              | Select current date                       |


In year view:

| Shortcut             | Action                                    |
|----------------------|-------------------------------------------|
| `LEFT_ARROW`         | Go to previous month                      |
| `RIGHT_ARROW`        | Go to next month                          |
| `UP_ARROW`           | Go up a row (back 4 months)               |
| `DOWN_ARROW`         | Go down a row (forward 4 months)          |
| `HOME`               | Go to the first month of the year         |
| `END`                | Go to the last month of the year          |
| `PAGE_UP`            | Go to the same month in the previous year |
| `ALT` + `PAGE_UP`    | Go to the same month 10 years back        |
| `PAGE_DOWN`          | Go to the same month in the next year     |
| `ALT` + `PAGE_DOWN`  | Go to the same month 10 years forward     |
| `ENTER`              | Select current month                      |

In multiYear view:

| Shortcut             | Action                                    |
|----------------------|-------------------------------------------|
| `LEFT_ARROW`         | Go to previous year                       |
| `RIGHT_ARROW`        | Go to next year                           |
| `UP_ARROW`           | Go up a row (back 4 years)                |
| `DOWN_ARROW`         | Go down a row (forward 4 years)           |
| `HOME`               | Go to the first year in the current range |
| `END`                | Go to the last year in the current range  |
| `PAGE_UP`            | Go back 20 years                          |
| `ALT` + `PAGE_UP`    | Go back 200 years                         |
| `PAGE_DOWN`          | Go forward 20 years                       |
| `ALT` + `PAGE_DOWN`  | Go forward 200 years                      |
| `ENTER`              | Select current year                       |

<div class="docs-expert-container">

#### Expert: Remove focus from datepicker toggle
The datepicker toggle can be focused via keyboard navigation (by pressing `TAB`). For expert this can be switched off with setting `[tabindex]="-1"` on `<nx-datepicker-toggle/>`, so that only the input field is focusable. The calendar can still be opened by clicking on the calendar icon or by pressing `ALT` + `DOWN_ARROW`.

<!-- example(datefield-toggle-focus) -->

</div>

### Global settings

You can use the `DATEPICKER_DEFAULT_OPTIONS` injection token if you want to set `[tabindex]` property on `<nx-datepicker-toggle>` component globally. Using `DATEPICKER_DEFAULT_OPTIONS` you can set `toggleIconTabindex` property that modifies `tabindex`.

<!-- example(datefield-injection-token) -->
