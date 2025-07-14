import { NxDataDisplayComponent } from '@allianz/ng-aquila/data-display';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { Component } from '@angular/core';

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
