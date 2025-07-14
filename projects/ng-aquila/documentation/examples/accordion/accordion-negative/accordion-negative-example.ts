import {
  NxAccordionDirective,
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { Component } from '@angular/core';

/**
 * @title Negative Styling Example
 */
@Component({
  selector: 'accordion-negative-example',
  templateUrl: './accordion-negative-example.html',
  styleUrls: ['./accordion-negative-example.css'],
  imports: [
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
    NxCopytextComponent,
  ],
})
export class AccordionNegativeExampleComponent {}
