import { Component } from '@angular/core';
import {
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';

/**
 * @title Multi Accordion Example
 */
@Component({
    selector: 'accordion-multi-example',
    templateUrl: './accordion-multi-example.html',
    styleUrls: ['./accordion-multi-example.css'],
    standalone: true,
    imports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxCopytextComponent,
        NxButtonComponent,
    ],
})
export class AccordionMultiExampleComponent {
    multi = true;

    toggleMulti() {
        this.multi = !this.multi;
    }
}
