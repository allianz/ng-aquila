import { Component } from '@angular/core';
import {
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';

/**
 * @title Standalone Expansion Panel Example
 */
@Component({
    selector: 'accordion-standalone-example',
    templateUrl: './accordion-standalone-example.html',
    styleUrls: ['./accordion-standalone-example.css'],
    imports: [
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxHeadlineComponent,
        NxCopytextComponent,
    ],
})
export class AccordionStandaloneExampleComponent {}
