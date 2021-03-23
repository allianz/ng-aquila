---
title: Icons
category: components
b2c: true
expert: true
stable: done
---


<div class="docs-private">

  ### General usage of NDBX icons

  The icons are comprised of two general types: **functional** and **product icons**. **Functional icons** are used to indicate important actions and functions like search, close or links. In most cases, functional icons will have a size of 24x24px (**s**). **Product icons** are a visual expression of aspects of our products. They are, for instance, used to select product options or in claims use cases. To make both icons distinguishable, the name of all product icons starts with `product-*`. The outline and fill options should only be used in combination with **product** icons.

  The general functionality of the icons is provided with the `NxIconModule` of `ng-aquila`. The Allianz Icons are provided with the additional `NdbxIconModule` of `@allianz/ngx-ndbx`. To use it, import it in the `app.module.ts` or in any other module:

  ```ts
  import { NxIconModule } from '@aposin/ng-aquila/icon';
  import { NdbxIconModule } from '@allianz/ngx-ndbx/icon';

  @NgModule({
    declarations: [
      // ...
    ],
    imports: [
      // ...
      NxIconModule,
      NdbxIconModule
    ],
    // ...
  })
  export class AppModule { }
  ```

</div>

<div class="docs-public">

### Open source icons / icons not working?

For all open source users: internally the projects use an icon font we unfortunately couldn't open source.
We are using a special module for the documentation that maps internal icon names to icons from
font awesome that the code examples still work.

So if you copy any code example that is including an icon and want to see how it looks you can use that same module, for that please install font awesome `npm i @fortawesome/fontawesome-free` use this import:

```ts
import { NxDocumentationIconModule } from '@aposin/ng-aquila/documentation-icons';
```

add it to your AppModule and include the `node_modules/@fortawesome/fontawesome-free/css/all.css` to your project.
Alternatively you can of course use any other icon fonts or svgs and register them with the icon registry.
</div>

### Essential Icons
The library ships with a set of necessary icons that are used in the components themselves.
You can override them with a custom SVG or by specifying a certain class from an icon font.

Here you can see the list of the necessary icons:
<!-- example(icon-essential-icons) -->

#### Overriding essential icons
For the components to use your desired icons for the essential icons list you can override
them with the icon registry.
<!-- example(icon-essential-override) -->


### Sizes
**Functional** icons should mainly use the size **s**.
<!-- example(icon-sizes) -->

### Icons with outline
<div class="docs-private">

The outline option should only be used with **product** icons.

</div>
<!-- example(icon-outline) -->

### Filled icons
<div class="docs-private">

The filled option should only be used with **product** icons.

</div>
<!-- example(icon-filled) -->

<div class="docs-private">

### Functional icons

To use the icons shown here, please make sure to import the `NdbxIconModule` (see [General usage of NDBX icons](./documentation/icon/overview#general-usage-of-ndbx-icons)).

<!-- example(icon-list-functional) -->
</div>

<div class="docs-private">

### Product icons

To use the icons shown here, please make sure to import the `NdbxIconModule` (see [General usage of NDBX icons](./documentation/icon/overview#general-usage-of-ndbx-icons)).

<!-- example(icon-list-product) -->
</div>

### Register icons service

Custom icons can be registered via the `NxIconRegistry` injectable service. With the `NxIconRegistry` you can associate icon names with SVG, URL and HTML strings and define a CSS font class. When you are registering an icon by URL please make sure to import the `HttpClientModule` from `@angular/common/http`.

<!-- example(icon-registry) -->

