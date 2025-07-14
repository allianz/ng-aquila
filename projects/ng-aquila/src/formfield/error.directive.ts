import { Directive, Input } from '@angular/core';

let uniqueId = 0;

@Directive({
  selector: '[nxFormfieldError], [nxError]',
  host: {
    '[attr.id]': 'id',
    'aria-live': 'assertive',
    'aria-atomic': 'true',
  },
  standalone: true,
})
export class NxFormfieldErrorDirective {
  // create a unique id to be used by aria-described-by
  /** Sets the id of the formfield error. */
  @Input() id = `nx-formfield-error-${uniqueId++}`;
}
