import {
  NxAccordionDirective,
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { Component } from '@angular/core';

/**
 * @title Multi Accordion Example
 */
@Component({
  selector: 'accordion-multi-example',
  templateUrl: './accordion-multi-example.html',
  styleUrls: ['./accordion-multi-example.css'],
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
