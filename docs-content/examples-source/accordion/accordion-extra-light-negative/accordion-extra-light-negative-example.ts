import { Component } from '@angular/core';
import {
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';

/**
 * @title Extra Light Negative Styling Example
 */
@Component({
    selector: 'accordion-extra-light-negative-example',
    templateUrl: './accordion-extra-light-negative-example.html',
    styleUrls: ['./accordion-extra-light-negative-example.css'],
    standalone: true,
    imports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxCopytextComponent,
    ],
})
export class AccordionExtraLightNegativeExampleComponent {}
