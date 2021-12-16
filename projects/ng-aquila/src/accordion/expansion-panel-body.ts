import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[nxExpansionPanelBody]' })
export class NxExpansionPanelBodyDirective {
    constructor(public _template: TemplateRef<any>) {}
}
