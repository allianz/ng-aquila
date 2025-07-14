import {
  NxAccordionDirective,
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { Component } from '@angular/core';

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
