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
 * @title Smooth Scrolling Example
 */
@Component({
  selector: 'accordion-scroll-smooth-example',
  templateUrl: './accordion-scroll-smooth-example.html',
  styleUrls: ['./accordion-scroll-smooth-example.css'],
  imports: [
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
    NxHeadlineComponent,
    NxCopytextComponent,
  ],
})
export class AccordionScrollSmoothExampleComponent {
  scrollIntoViewActive = true;

  scrollIntoViewOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
  };
}
