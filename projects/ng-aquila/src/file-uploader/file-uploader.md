---
title: File uploader
description: File upload with drag-and-drop
category: components
b2c: true
expert: true
stable: done
alias: file upload, attachment
a1Full: true
group: Forms & Inputs
---

Use this component when you want users to upload files. The files can be uploaded via file selection or dropped in the drop zone. The `nx-file-uploader` shows the selected files in the queue list. In each row of this list, the file name is displayed with the current status and the available actions. The component is a wrapper around the native `input[type=file]` element and ensures that the standard HTML attributes (e.g. multiple) work as expected.

Please note that if you allow multiple files upload, users will also be able to upload the same file multiple times. If this is an issue for your project, make sure to implement a backend check.

### Basic usage

The component has a built-in http POST uploading functionality. To use this, there has to be a `NxFileUploader` defined and assigned to the file uploader component. Success and error handling can be done with subscribing to the `response` stream of the file uploader.

Most of the examples are using the `[nxFileUploadTriggerFor]` directive for triggering the upload. Alternatively, `updateFiles()` of the File Uploader component can be used.

<div class="docs-a1">

<!-- example(file-uploader-basic) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-basic-ndbx) -->

</div>

### Reactive form

<div class="docs-a1">

<!-- example(file-uploader-reactive) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-reactive-ndbx) -->

</div>

### Template driven form

<div class="docs-a1">

<!-- example(file-uploader-template-driven) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-template-driven-ndbx) -->

</div>

### Multiple File Uploader

It's possible to combine multiple file uploader to use different uploader configs or accommodate file categories

<div class="docs-a1">

<!-- example(file-uploader-categories) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-categories-ndbx) -->

</div>

### Validation

The FileItem class provides a set of methods and properties in order to set the current state of the file.

#### Error list
For all kinds of events where a file is blocked from being added to the file list model (e.g. wrong file type, too large, too many files), the file uploader component provides an `errors` property with an array of errors.

<div class="docs-deprecation-warning">
    <strong>Please note: </strong><br>
    <p>Previously we registered all validations as form control validators. We identified some problems with this approach such as that only the last file for each error was added in the form control errors instead of all files that do not validate. Additionally it creates some UX challenges when a file was blocked from being added to the model. The form control is then not valid and the user cannot proceed but leaves the user with the challenge what they should do.</p>
    <p>To mitigate these problems we introduced the <code>noBlockingValidators</code> option which we do not enable by default yet because it would introduce a breaking change. For the new and improved behavior, please set it to <code>true</code>.
    For further details see the <a href="./documentation/file-uploader/overview#disable-blocking-validators">Disable blocking validators</a> section.</p>
</div>

The following example shows how you can use both the form control validators (e.g. required or custom validators) and the `errors` property to display a comprehensive list of all errors.

<div class="docs-a1">

<!-- example(file-uploader-error-list) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-error-list-ndbx) -->

</div>

#### Max file size

The max file size is set via the `[maxFileSize]` property. Please note that the file size is passed in bytes.

The returned error is `NxFileUploadMaxFileSize`.

The server's errors can be handled by setting the file state as shown in this example.

<div class="docs-a1">

<!-- example(file-uploader-validation) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-validation-ndbx) -->

</div>

#### Max file number

The max file number is set via the `[maxFileNumber]` property.

The return error is `NxFileUploadMaxFileNumber`.

<div class="docs-a1">

<!-- example(file-uploader-max-file-number) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-max-file-number-ndbx) -->

</div>

#### Accepted file types

The permitted file types can be set via `[accept]` and are passed down to the native input[type='file'] element. Allowed is a comma separated list of MIME types or file extensions.

- wildcard mime types: e.g. `image/*`
- specific mime types: e.g. `image/png`
- file extensions including the dot: e.g. `.png`

Additionally, there is a basic client side validation integrated in the component which returns the error `NxFileUploadFileTypeNotAccepted`. However, **files should be always verified on the server side**.

<div class="docs-deprecation-warning">
  <strong>Please note: </strong><br>
  <p>Depending on operating system settings files sometimes don't get an associated MIME type added to them.</p>
  <p>
  In the past we skipped validation when the file type was missing to mitigate some problems. This means that the file uploader will accept undesired files, e.g. a .log file.</p><p> To improve this behavior we added a new option <code>strictAcceptValidation</code> which we do not enable by default yet because it would introduce a breaking change. If you want to enable it, please set it to <code>true</code>.<br>
  See the <a href="./documentation/file-uploader/overview#strict-file-type-validation">Strict file type validation</a> section further below for more details.</p>
</div>

<div class="docs-a1">

<!-- example(file-uploader-type-validation) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-type-validation-ndbx) -->

</div>

#### Strict file type validation

The File objects that are created by the browsers sometimes do not provide a file mime type. This usually happens if the operating system does not have a file type associated, e.g. for a .log file or for .xslx if microsoft office or excel is not installed.

Because this created some challenges by default the file type validation is skipped in this case. This means that undesired files can be accepted.

You can harden against these cases with the `strictAcceptValidation` option. When enabled you might have to add file extensions in addition to mime types for some file types. E.g. for excel files this has been a problem in the past to only rely on the mime type. A good approach in this case could be  `accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls,.xlsx"`.

Try to drag and drop a .log file (at least these files worked best for us in testing across windows and mac) in the example below. It should throw an error, then disable the `strictAcceptValidation` option with the button and try again to see the difference.

<div class="docs-a1">

<!-- example(file-uploader-strict-type-validation) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-strict-type-validation-ndbx) -->

</div>

#### Disable blocking validators

Previously we registered all validations as form control validators. We identified some problems with this approach such as that only the last file for each error was added in the form control errors instead of all files that do not validate. Additionally it creates some UX challenges when a file was blocked from being added to the model. The form control is then not valid and the user cannot proceed but leaves the user with the challenge what they should do.<br>

To mitigate these problems we introduced the <code>noBlockingValidators</code> option which we do not enable by default yet because it would introduce a breaking change. By enabling this option all validators that block files from being added to the list, like max file size, max file number or file type validation, are not added to the form control anymore. Instead you can access these types of errors via the <code>errors</code> property of the component. See the <a href="./documentation/file-uploader/overview#error-list">error list</a> section.

In the following example you can see how enabling and disabling `noBlockingValidators` and then trying to add an invalid file to the list will influence the form control errors object.

<div class="docs-a1">

<!-- example(file-uploader-disable-common-validators) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-disable-common-validators-ndbx) -->

</div>

### Upload

All previous examples are implemented with the built-in uploading functionality of the file uploader.

#### Auto upload

<div class="docs-a1">

<!-- example(file-uploader-auto) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-auto-ndbx) -->

</div>

#### Separate upload requests for each file

By default, all files are sent within one single upload request. You can also send separate requests by adding `uploadSeparately: true` to the configuration of the NxFileUploader.

<div class="docs-a1">

<!-- example(file-uploader-separate-requests) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-separate-requests-ndbx) -->

</div>

#### Custom uploading implementation

Besides the build-in uploading functionality you can also send an http request by yourself if you want to do more complex requests. Then you have to set the uploading status of the files manually:

<div class="docs-a1">

<!-- example(file-uploader-with-request) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-with-request-ndbx) -->

</div>

<div class="docs-hide-a1">
<div class="docs-expert-container">

### Expert

Expert uses a `small-medium` button and provides an additional drop zone component.

<!-- example(file-uploader-expert-ndbx) -->

### Drop zone

<!-- example(file-uploader-drop-zone-ndbx) -->

</div>
</div>

### Internationalization

`NxFileUploaderIntl` provides the text strings used inside the file uploader component (e.g. the uploading label). It can be customized by creating a class with the translated string values.

<div class="docs-a1">

<!-- example(file-uploader-intl) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-intl-ndbx) -->

</div>

### File Icon

The `nx-file-icon` component displays a file type icon with a colored extension label badge. 

The badge color is determined by the file extension. Unrecognized extensions fall back to a default color. Files without an extension show the icon without a badge. 

<i>Accessibility: As the extension text size does not meet accessibility requirements, file icons should only be used as decorative elements</i>

<!-- example(file-icon) -->

### Custom Item Template

You can customize the template that is used to render each entry within the list of files to upload.

<div class="docs-a1">

<!-- example(file-uploader-custom-item) -->

</div>

<div class="docs-hide-a1">

<!-- example(file-uploader-custom-item-ndbx) -->

</div>
