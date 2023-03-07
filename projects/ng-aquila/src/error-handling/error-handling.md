---
title: Error handling
category: general
b2c: true
expert: true
stable: done
noApi: true
---

### Error component

The `<nx-error>` is a base component to display error messages.

Import it with

<p class="docs-api-module-import">
  <code style="white-space: normal">
    <span class="docs-api-module-import__import-span">import</span>
    { NxErrorModule }
    <span class="docs-api-module-import__from-span">from</span>
    <span class="docs-api-module-import__path-span">'@aposin/ng-aquila/base'</span>;
  </code>
</p>

The module is auto-imported when you use the [formfield](./documentation/formfield), [checkbox](./documentation/checkbox) or [radio-button](./documentation/radio-button) module.

<!-- example(error) -->

### Custom error state

Our form control components use `ErrorStateMatcher` for determining when error messages should be shown. Using the `ErrorStateMatcher`, `nx-errors` are automatically managed by the component, you don't need to handle showing and hiding them manually in the markup anymore (except for when you have multiple errors on one input).

The `ErrorStateMatcher` is used in the following components:

-   Checkbox Group
-   Code Input
-   Dropdown
-   File Uploader
-   Input Directive
-   Progress Stepper
-   Radio Button Group
-   Selectable Card
-   Switcher
-   Toggle Button
-   Timefield

Per default a state is erroneous, if a control is **invalid and touched** or **invalid and its parent form submitted**. To change the default error state matching you can implement the `ErrorStateMatcher` interface in your component and use it instead of the default one:

```ts
@Component({
  ...
  providers: [
    {
      provide: ErrorStateMatcher,
      useExisting: CustomErrorStateMatcher
    }
  ]
  ...
})
```

An `ErrorStateMatcher` must implement the method `isErrorState` which takes the FormControl of the input field as well as the parent form and returns a boolean indicating whether errors should be shown.

You can import the `ErrorStateMatcher` with:

<p class="docs-api-module-import">
  <code style="white-space: normal">
    <span class="docs-api-module-import__import-span">import</span>
    { ErrorStateMatcher }
    <span class="docs-api-module-import__from-span">from</span>
    <span class="docs-api-module-import__path-span">'@aposin/ng-aquila/utils'</span>;
  </code>
</p>

The example below shows an **error while the user is typing (dirty)** and not until he blurrs the input field as in the default case.

<!-- example(error-custom-matcher-formfield) -->

### Global custom ErrorStateMatcher

You can also set a custom error matching behaviour globally by defining your custom error state matcher:

```ts
@Injectable()
export class ShowOnDirtyErrorStateMatcher implements ErrorStateMatcher {
    /** Custom error state matcher that checks for validity of the formfield. */
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    }
}
```

and then providing it globaly, for example in your `app.module.ts`:

```ts
@NgModule({
    providers: [{ provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher }],
})
export class ApplicationModule {}
```

### Reset error state
To reset the validation state of an Angular form, use `resetForm` from the formGroup directive instead of the formGroup instance. This method checks for the form submitted state which available via the directive.

```
<form [formGroup]="myForm" (ngSubmit)="submitForm(ngForm)" #ngForm="ngForm">
```

```
submitForm(ngForm: FormGroupDirective): void {

  // won't work!
  // this.myForm.reset();

  // resets the form to the initial values and also resets the `submitted` status.
  ngForm.resetForm();
}
```
<!-- example(error-reset) -->
