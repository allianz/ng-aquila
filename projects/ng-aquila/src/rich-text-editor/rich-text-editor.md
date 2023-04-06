---
title: Rich text editor
category: third party
b2c: true
expert: true
stable: progress
noApi: true
---

In case your application needs a Richt Text Editor, we recommend using TinyMCE Angular with our branded icons set. Please refer to this page on how to use it.

TinyMCE Angular is a powerful and easy-to-use WYSIWYG editor for Angular applications. It provides a customizable interface for creating and editing rich text content, including formatting, styles, links, images, and more. see example below.

### Packages
- tinymce
- @tinymce/tinymce-angular

### Setup
To use TinyMCE Angular in your Angular project, follow these steps:
1. install tinymce `npm install --save tinymce @tinymce/tinymce-angular`
2. import TinyMCE angular module into your angular module.
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
3. include TinyMCE, open angular.json and add to asset property
```
"assets": [
  { "glob": "**/*", "input": "node_modules/tinymce", "output": "/tinymce/" }
]
```
4. load tinymce
 - To load TinyMCE when the editor is initialized (also known as lazy loading), add a dependency provider to the module using the `TINYMCE_SCRIPT_SRC` token.
```
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
/* ... */
@NgModule({
  /* ... */
  imports: [
    EditorModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
```
- To load TinyMCE when the page or application is loaded:

 a. open `angular.json` and add TinyMCE to the global scripts tag.
```
"scripts": [
  "node_modules/tinymce/tinymce.min.js"
]
```
 b. Update the editor configuration to include the base_url and suffix options.
 ```
 <editor [init]="{
  base_url: '/tinymce', // Root for resources
  suffix: '.min'        // Suffix to use when loading resources
}"></editor>
```
### Live example
<!-- example(rich-text-editor) -->

### Custom Toolbar
To ensure consistency with our design, we recommend using icons to customize the toolbar of the rich text editor. One way to achieve this is by using inline SVG or SVG images, which can be modified using the following instructions.
#### Inline svg icon
```
<editor [init]="init"></editor>

init = {
    setup: (editor: Editor) => {
        editor.ui.registry.addIcon(
            'bold', '<svg version="1.1" id="bold...',
        );
    },
};
```

#### Image ico

```
<editor [init]="init"></editor>
init = {
    setup: (editor: Editor) => {
        editor.ui.registry.addIcon(
            'bold', '<image src="assets/icons/toolbar/bold.svg"/>',
        );
    },
};
```
