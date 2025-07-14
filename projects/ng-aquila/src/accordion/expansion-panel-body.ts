import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nxExpansionPanelBody]',
  standalone: true,
})
export class NxExpansionPanelBodyDirective {
  constructor(readonly _template: TemplateRef<any>) {}
}
