import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { Directive, inject, input } from '@angular/core';

@Directive({
  selector: '[nxFormfieldError], [nxError]',
  host: {
    '[attr.id]': 'id()',
    'aria-live': 'assertive',
    'aria-atomic': 'true',
  },
  standalone: true,
})
export class NxFormfieldErrorDirective {
  // create a unique id to be used by aria-described-by
  /** Sets the id of the formfield error. */
  readonly id = input(inject(IdGenerationService).nextId('nx-formfield-error'));
}
