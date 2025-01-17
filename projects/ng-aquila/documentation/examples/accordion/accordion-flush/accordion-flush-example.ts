import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxSwitcherComponent } from '@aposin/ng-aquila/switcher';

/**
 * @title Light Styling Example
 */
@Component({
    selector: 'accordion-flush-example',
    templateUrl: './accordion-flush-example.html',
    styleUrls: ['./accordion-flush-example.css'],
    imports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxCopytextComponent,
        NxGridModule,
        NxSwitcherComponent,
        FormsModule,
    ],
})
export class AccordionFlushExampleComponent {
    flushAligned = true;
}
