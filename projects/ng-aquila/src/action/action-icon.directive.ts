import { Directive } from '@angular/core';

@Directive({
  selector: '[nxActionIcon]',
  host: {
    class: 'nx-action__icon',
  },
  standalone: true,
})
export class NxActionIconDirective {}
