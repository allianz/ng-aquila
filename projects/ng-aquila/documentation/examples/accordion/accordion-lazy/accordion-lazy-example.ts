import {
  NxAccordionDirective,
  NxExpansionPanelBodyDirective,
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { Component } from '@angular/core';

/**
 * @title Lazy Loading Example
 */
@Component({
  selector: 'accordion-lazy-example',
  templateUrl: './accordion-lazy-example.html',
  styleUrls: ['./accordion-lazy-example.css'],
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
