import { Component } from '@angular/core';
import {
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';

/**
 * @title Light Styling Example
 */
@Component({
    selector: 'accordion-light-example',
    templateUrl: './accordion-light-example.html',
    styleUrls: ['./accordion-light-example.css'],
    imports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxCopytextComponent,
    ],
})
export class AccordionLightExampleComponent {}
