import { Component } from '@angular/core';
import { NxDataDisplayComponent } from '@aposin/ng-aquila/data-display';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';

/**
 * @title Announce loading via aria-live area and spinner build in announcement
 */
@Component({
    selector: 'spinner-aria-announcement-example',
    templateUrl: './spinner-aria-announcement-example.html',
    styleUrls: ['./spinner-aria-announcement-example.css'],
    imports: [NxSpinnerComponent, NxDataDisplayComponent, NxHeadlineComponent],
})
export class SpinnerAriaAnnouncementExampleComponent {
    calculationInProgress = false;
    buildInProgress = false;
}
