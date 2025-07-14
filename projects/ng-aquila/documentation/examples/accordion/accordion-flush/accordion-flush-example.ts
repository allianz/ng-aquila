import {
  NxAccordionDirective,
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
