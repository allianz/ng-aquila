import { Component } from '@angular/core';
import {
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';

/**
 * @title Negative Styling Example
 */
@Component({
    selector: 'accordion-negative-example',
    templateUrl: './accordion-negative-example.html',
    styleUrls: ['./accordion-negative-example.css'],
    standalone: true,
    imports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxCopytextComponent,
    ],
})
export class AccordionNegativeExampleComponent {}
