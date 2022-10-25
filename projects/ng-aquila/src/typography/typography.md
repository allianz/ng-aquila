---
title: Typography
category: general
b2c: true
expert: true
stable: done
noApi: true
---

### Font-weights

Our library provides four font-weight options:

-   light (300)
-   regular (400)
-   semibold (600)
-   bold (700)

### Font-weight classes

You can change the font-weight of any headline/copytext by using the font-weight utility classes `nx-font-weight-{weight}` as shown in the example with headlines below.

**Important:** In order to use these utility classes you first have to import the utility css file in your project. Use this path to import it via your angular-cli.json file:

```ts
"styles": [
  "node_modules/@aposin/ng-aquila/css/utilities.css"
]
```

If you don't use the Angular CLI or just prefer another place you can use this css import instead:

```css
@import '@aposin/ng-aquila/css/utilities.css';
```

<!-- example(headline-font-weights) -->
