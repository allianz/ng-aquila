import {
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { Component } from '@angular/core';

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
