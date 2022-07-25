import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[nxExpansionPanelBody]' })
export class NxExpansionPanelBodyDirective {
    constructor(readonly _template: TemplateRef<any>) {}
}
