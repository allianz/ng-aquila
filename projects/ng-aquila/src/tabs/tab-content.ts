import { Directive, TemplateRef } from '@angular/core';

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({
  selector: '[nxTabContent]',
  standalone: true,
})
export class NxTabContentDirective {
  constructor(/** @docs-private */ readonly template: TemplateRef<any>) {}
}
