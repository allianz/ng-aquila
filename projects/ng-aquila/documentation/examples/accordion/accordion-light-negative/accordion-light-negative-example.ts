import { Component } from '@angular/core';
import {
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';

/**
 * @title Light Negative Styling Example
 */
@Component({
    selector: 'accordion-light-negative-example',
    templateUrl: './accordion-light-negative-example.html',
    styleUrls: ['./accordion-light-negative-example.css'],
    imports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxCopytextComponent,
    ],
})
export class AccordionLightNegativeExampleComponent {}
