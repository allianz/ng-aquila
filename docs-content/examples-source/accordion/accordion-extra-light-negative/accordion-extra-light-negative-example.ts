import {
  NxAccordionDirective,
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { Component } from '@angular/core';

/**
 * @title Extra Light Negative Styling Example
 */
@Component({
  selector: 'accordion-extra-light-negative-example',
  templateUrl: './accordion-extra-light-negative-example.html',
  styleUrls: ['./accordion-extra-light-negative-example.css'],
  imports: [
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
    NxCopytextComponent,
  ],
})
export class AccordionExtraLightNegativeExampleComponent {}
