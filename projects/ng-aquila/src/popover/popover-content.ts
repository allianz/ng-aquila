import { Directive, TemplateRef } from '@angular/core';

/**
 * Popover content that will be rendered lazily
 * after the popover is opened for the first time.
 */
@Directive({
  selector: 'ng-template[nxPopoverContent]',
  standalone: true,
})
export class NxPopoverContentDirective {
  constructor(readonly _template: TemplateRef<any>) {}
}
