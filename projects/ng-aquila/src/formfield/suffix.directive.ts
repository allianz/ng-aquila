import { Directive } from '@angular/core';

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
  selector: '[nxFormfieldSuffix]',
  standalone: true,
})
export class NxFormfieldSuffixDirective {}
