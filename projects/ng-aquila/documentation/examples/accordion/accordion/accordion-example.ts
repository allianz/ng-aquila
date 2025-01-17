import { Component } from '@angular/core';
import {
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';

/**
 * @title Basic Accordion Example
 */
@Component({
    selector: 'accordion-example',
    templateUrl: './accordion-example.html',
    styleUrls: ['./accordion-example.css'],
    imports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxHeadlineComponent,
        NxCopytextComponent,
    ],
})
export class AccordionExampleComponent {}
