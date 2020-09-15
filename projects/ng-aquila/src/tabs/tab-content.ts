import { Directive, TemplateRef } from '@angular/core';

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({ selector: '[nxTabContent]' })
export class NxTabContentDirective {
  constructor(/** @docs-private */public template: TemplateRef<any>) { }
}
