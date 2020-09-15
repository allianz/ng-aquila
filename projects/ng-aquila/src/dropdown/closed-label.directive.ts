import { Directive, TemplateRef } from '@angular/core';

// This Directive solely purpose is to mark given ng-template and project it into the required destination.
@Directive({
  selector: '[nxClosedLabel]'
})
export class NxDropdownClosedLabelDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
