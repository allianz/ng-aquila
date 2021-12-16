## Coding guidelines

## Table of contents

-   [Commit message guidelines](#commit-message-guidelines)
-   [Angular and Typescript](#angular-and-typescript)
-   [Tests](#tests)
-   [CSS](#css)

### Commit Message Guidelines

Commit messages headers must have the format `<type>(<scope>): <subject>`, for example:

```
feat(accordion): Add basic accordion component

fix(release): Downgrade rxjs to prevent an error with the current Angular version
```

-   Provide a body with additional information about the what and why the change was made
-   Breaking changes are marked with a `BREAKING CHANGE:` section in the commit body explaining the breaking change

```
fix(card): remove NxSelectableCardModule

BREAKING CHANGE:
`NxSelectableCardModule` was removed. `NxSelectableCardComponent` was moved to `NxCardModule`.
```

#### Type and scope

The type should be one of the items below and the scope should either be the name of the affected component or the functional scope.

-   build: Changes that affect the build system or external dependencies (example scopes: npm or package.json)
-   chore: Routine housekeeping fixes
-   docs: Documentation changes
-   feat: New feature
-   fix: Bug, a11y or style fixes
-   refactor: Code change with no feature nor bug
-   test: Adding or correcting tests

All commits of type feat and fix will be shown in the CHANGELOG.

### Angular and Typescript

We mostly follow the [Angular coding style guide](https://angular.io/guide/styleguide).

We generate the API documentation out of the source code so you must follow these rules especially:

-   All `public` properties and methods must have a docstring describing their purpose to the public.
-   Omit the `public` keyword
-   Prefix all library-internal properties and methods that have to be public for the usage in templates with an underscore without the `private` keyword. Additionally you can use the `@docs-private` JsDoc annotation to hide any symbol from the public API docs.
-   All `private` properties are prefixed with an underscore.
-   We will exclusively go for the prefix nx. You will need to prefix classes, component & directive selectors with this prefix.

#### Inputs

-   prefix directive inputs, e.g. `nxTooltip`
-   do **not** prefix component inputs

### Tests

We are testing components and services. We do not have E2E tests yet.

Try to work in a TDD cycle. Do so by running Karma and let it run your Jasmine Tests during development. Your tests will keep running whenever your test files are changed.

Run your tests with

```bash
npm run test:lib
```

### CSS

Every component ships its own SCSS, which should - whenever applicable - rely on the shared styles which provide the definitions of colors, font styles and more. To ensure a proper view encapsulation, please make yourself comfortable with the special selectors used for scoping (e.g. `:host` or `:host-context`), see the Angular Component Styles [(documentation)](https://angular.io/guide/component-styles). We are currently using `ViewEncapsulation.Emulated`, since this is the Angular default you don't have to explicitly set this property. We follow the `BEM` approach (http://getbem.com/naming/) to name our CSS classes.
