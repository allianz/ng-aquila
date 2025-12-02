import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { Directive, inject, input } from '@angular/core';

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
  selector: '[nxFormfieldNote]',
  host: {
    '[attr.id]': 'id()',
  },
  standalone: true,
})
export class NxFormfieldNoteDirective {
  /** Sets the id of the formfield note. */
  readonly id = input(inject(IdGenerationService).nextId('nx-formfield-note'));
}
