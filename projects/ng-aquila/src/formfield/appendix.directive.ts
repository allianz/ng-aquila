import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { Directive, inject, Input } from '@angular/core';

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
  selector: '[nxFormfieldAppendix]',
  host: {
    '[attr.id]': 'id',
  },
  standalone: true,
})
export class NxFormfieldAppendixDirective {
  /** Sets the id of the formfield appendix. */
  @Input() id = inject(IdGenerationService).nextId('nx-formfield-appendix');
}
