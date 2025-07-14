import {
  NxAccordionDirective,
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { Component } from '@angular/core';

/**
 * @title Light Styling Example
 */
@Component({
  selector: 'accordion-light-example',
  templateUrl: './accordion-light-example.html',
  styleUrls: ['./accordion-light-example.css'],
  imports: [
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
    NxCopytextComponent,
  ],
})
export class AccordionLightExampleComponent {}
