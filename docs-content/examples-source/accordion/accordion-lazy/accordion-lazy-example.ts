import { Component } from '@angular/core';
import {
    NxAccordionDirective,
    NxExpansionPanelBodyDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';

/**
 * @title Lazy Loading Example
 */
@Component({
    selector: 'accordion-lazy-example',
    templateUrl: './accordion-lazy-example.html',
    styleUrls: ['./accordion-lazy-example.css'],
    standalone: true,
    imports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxExpansionPanelBodyDirective,
        NxCopytextComponent,
    ],
})
export class AccordionLazyExampleComponent {}
