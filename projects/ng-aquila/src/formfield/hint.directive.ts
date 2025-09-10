import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { Directive, inject, Input } from '@angular/core';

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
  selector: '[nxFormfieldHint]',
  host: {
    '[attr.id]': 'id',
    '[class.nx-formfield-hint]': 'true',
  },
  standalone: true,
})
export class NxFormfieldHintDirective {
  /** Sets the id of the formfield hint. */
  @Input() id = inject(IdGenerationService).nextId('nx-formfield-hint');
}
