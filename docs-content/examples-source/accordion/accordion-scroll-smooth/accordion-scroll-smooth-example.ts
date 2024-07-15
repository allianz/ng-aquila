import { Component } from '@angular/core';
import {
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';

/**
 * @title Smooth Scrolling Example
 */
@Component({
    selector: 'accordion-scroll-smooth-example',
    templateUrl: './accordion-scroll-smooth-example.html',
    styleUrls: ['./accordion-scroll-smooth-example.css'],
    standalone: true,
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
