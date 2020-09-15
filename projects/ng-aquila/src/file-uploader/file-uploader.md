---
title: File uploader
category: components
b2c: false
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

Use this component when you want users to upload files. The files can be uploaded via file selection or dropped in the drop zone. 
The `nx-file-uploader` shows the selected files in the queue list. In each row of this list, the file name is displayed with the current status and the available actions.
The component is a wrapper around the native `input[type=file]` element and ensures that the standard HTML attributes (e.g. multiple) work as expected.

### Basic usage

The component has a built-in http POST uploading functionality. To use this, there has to be a `NxFileUploader` defined and assigned to the file uploader component.
Success and error handling can be done with subscribing to the `response` stream of the file uploader.

Most of the examples are using the `[nxFileUploadTriggerFor]` directive for triggering the upload. Alternatively, `updateFiles()` of the File Uploader component can be used.

<!-- example(file-uploader-basic) -->

### Reactive form
<!-- example(file-uploader-reactive) -->

### Template driven form
<!-- example(file-uploader-template-driven) -->

## Drop zone
<!-- example(file-uploader-drop-zone) -->

### Validation
The FileItem class provides a set of methods and properties in order to set the current state of the file.

#### Max file size
The max file size is set via the `[maxFileSize]` property. Please note that the file size is passed in bytes. 

The returned error is  `NxFileUploadMaxFileSize`.

The server's errors can be handled by setting the file state as shown in this example.

<!-- example(file-uploader-validation) -->

#### Accepted file types
The permitted file types are set on the native input[type='file'] element.
The returned error is  `NxFileUploadFileTypeNotAccepted`.

<!-- example(file-uploader-type-validation) -->

### Upload

All previous examples are implemented with the built-in uploading functionality of the file uploader.

#### Auto upload

<!-- example(file-uploader-auto) -->

#### Separate upload requests for each file

By default, all files are sent within one single upload request. You can also send separate requests by adding `uploadSeparately: true` to the configuration of the NxFileUploader.

<!-- example(file-uploader-separate-requests) -->

#### Custom uploading implementation

Besides the build-in uploading functionality you can also send an http request by yourself if you want to do more complex requests. Then you have to set the uploading status of the files manually:

<!-- example(file-uploader-with-request) -->

### Internationalization

`NxFileUploaderIntl` provides the text strings used inside the file uploader component (e.g. the uploading label). It can be customized by creating a class with the translated string values.

<!-- example(file-uploader-intl) -->
