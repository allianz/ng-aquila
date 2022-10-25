# Contributing to ng-aquila

Thanks for your help and for reading this 🙏

In order to work together on this project, we need some basic rules which are outlined in the following sections.

---

## Table of contents

-   [Before you start](#before-you-start)
-   [Ways of contribution](#ways-of-contributing)
-   [Checklists](#checklists)
-   [Pull Request](#pull-request)
-   [Documentation](#documentation)
-   [Accessibility](#accessibility)
-   [Breaking changes and deprecations](#breaking-changes-and-deprecations)
-   [Other Notes](#other-notes)

## Before you start

There are different levels of contributing with increasing levels of complexity, time needed to develop and communication needed with the maintainers and the design teams to successfully get your contribution accepted.

-   **light**: small bugfixes, style updates or documentation updates
    can usually be done without aligning with the project maintainers, just give us a ping so that we do not start to work on it as well
-   **medium**: larger bugfixes, behavior changes, new features
    increased communication efforts - medium changes might already need alignment with the UX and design teams
-   **heavy**: new component
    most communication between all parties needed, development time usually is significantly larger

Please let us know in advance, especially for medium and heavy tasks, what you plan to do in our [issue tracker][issue tracker] so that we can provide feedback. This is important because:

-   features might need to be aligned with the internal design teams first
-   we can make sure that while you are working on a bugfix or feature not one of the maintainers is also starting to work on it in parallel

## Ways of contributing

A good way to start contributing is to update or improve the documentation. You can find information on how the documentation app works and which files you would need to change [here](DEVELOPER.md#documentation).

### Reporting bugs (_light_)

You can report bugs by opening a new issue in our [issue tracker][create new issue]. If you do so we kindly ask you to fill out the issue template and provide an isolated code example of the problem.

### Suggesting enhancements (_light_)

Yes, we are open to ideas or enhancements for the library! 💌 Feel free to open a [feature request][create new issue].

### Providing a bugfix (_light_ to _medium_)

Bug fixes can be very simple, but sometimes also rather complex. If you are not sure if you are on the right track with your fix, open an issue first so we can discuss the changes.

### New component (_heavy_)

Implementing a new component adds a lot of complexity both in communication and implementation efforts:

-   the component must be approved and aligned the design teams
-   the implementation must follow our [component architecture](DEVELOPER.md#component-architecture) philosophy
-   the implementation must fulfill our [requirements checklist](#checklists)
-   reviewing a new component takes significant effort on the reviewer side

A large component can also get too large to do in one single iteration. Close communication with the project maintainers is key that we properly define the scope of work and get things done.

### Introducing breaking changes or deprecations (_heavy_)

Breaking changes or deprecations always have to be aligned with the project maintainers first. We follow the Angular releases and only do breaking changes and new major versions when we update to the next Angular major version. So introducing breaking changes can take some time. We strive to migrate breaking changes as much as possible by using Angular schematics to greatly reduce updating efforts for the project teams.

## Checklists

### General checklist for changes

A change must fulfill certain key requirements to be accepted:

-   change is covered by tests
-   accessibility is ensured (WCAG 2 Level AA & high contrast)
-   change is documented with examples
-   change is following the contribution guidelines, architecture and style guide
-   theming is implemented (if applicable): [theming documentation](DEVELOPER.md#theming)
-   works in windows high contrast mode: [high contrast documentation](DEVELOPER.md#high-contrast-support)
-   CI checks must be green - you can see the result and which stage failed at the end of the pull request in github

### Checklist for components

-   use default `ViewEncapsulation`
-   use `onPush` change detection where applicable
-   make sure the component ships without external margins. For projects it is much easier to add margins themselves, than removing existing margins.

## Pull Request

### Before you submit the pull request

-   Make sure that all tests are green, run `npm run test`
-   Make sure that formatting is passed with `npm run format`
-   Make sure that linting is passed with `npm run lint`
-   Make sure the build is working by running `npm run build`
-   In the compare view of your commit check if it contains any unintended changes

### Workflow

-   fork the repository
-   create a branch from the main branch
-   apply your changes
-   once finished open a pull request against the main branch
    -   fill in the required template
    -   Provide a precise description of what the change is doing and why the change is needed
-   the CI will automatically be triggered when you open a pull request and push changes to the branch
-   at least one maintainer has to approve the pull request
-   the pull request gets merged once approved

## Documentation

No component is complete without well crafted documentation. Therefore, every component must be accompanied with a markdown documentation file that is placed in the component's source folder. The name of the markdown file has to be the same as the parent folder.

You can find more specific detail about the documentation application and how it works here: [Documentation guidelines](DEVELOPER.md#documentation)

## Accessibility

Our ambition is to create a library that enables accessibility with the AA (W3C) standard. To ensure this we ask for any contributor to ensure AA accessibility of their component (following [WAI-ARIA](http://w3c.github.io/aria-practices/)). In addition, we recommend to include automated tests checking a11y properties for every component. The main a11y tasks are to ensure that:

-   the focus state is displayed properly
-   keyboard navigation within the component is working and documented
-   aria-label attributes are properly set and documented
-   components are working in high-contrast mode

## Breaking changes and deprecations

We only release breaking changes when we are moving to a new major Angular version. This way we limit their frequency and are in sync with Angular's major version. In most cases you are introducing a breaking change if you:

-   Remove or alter existing API capabilities or remove a component
-   Change the layout or size of a component - simply if your change affects the layout of applications

This is what you need to do if you run into such a case:

-   Write a transition guide for users
-   If possible automate the transition with `ng update` schematics
-   If possible deprecate the existing capability for backwards compatibility, while:

1. Adding a console warning (`console.warn`) in case deprecated functions are still in use

```TypeScript
/**
 * @deprecated Use `nx-circle-toggle` instead
 * @deletion-target 8.0.0
 */
constructor() {
  console.warn('`nx-checkbox-circle` is deprecated. Use `nx-circle-toggle` instead.');
}
```

2. Adding a banner to the respective component notifying about what's deprecated and when it will be removed

![deprecation warning](projects/docs/assets/deprecation-warning.png) 3. Marking the breaking change or deprecation in the overview table

## Other Notes

Some useful notes about this project:

-   This is a mono repository containing the library itself and the documentation together with the tools needed to create the documentation assets.
-   We use [ng-packagr](https://github.com/dherges/ng-packagr) to build the library.
-   Every component is a module. There are no exceptions.
-   Every component needs to support i18n in an agnostic way. Best case is that the user has full access to content via content projection or inputs. If there are texts that need to be translated and are not directly accessible over the template for the developer provide an injectable, e.g. [DatepickerIntl](https://github.com/allianz/ng-aquila/blob/main/projects/ng-aquila/src/datefield/datepicker/datepicker-intl.ts)
-   Don't forget the prefixes. Every component, directive and module is prefixed., e.g. `nx-button` and `NxButtonModule`.
-   Prefixing inside the documentation app is more relaxed. Try to use the prefix `nxv-` for all selectors. You can skip it for modules.

[angular commit guidelines]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines
[angular style guide]: https://angular.io/guide/styleguide
[material style guide]: https://github.com/angular/components/blob/master/CODING_STANDARDS.md
[issue tracker]: https://github.com/allianz/ng-aquila/issues
[create new issue]: https://github.com/allianz/ng-aquila/issues/new/choose
