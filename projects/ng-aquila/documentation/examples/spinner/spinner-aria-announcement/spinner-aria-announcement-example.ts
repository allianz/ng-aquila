import { Component } from '@angular/core';

/**
 * @title Announce loading via aria-live area and spinner build in announcement
 */
@Component({
    selector: 'spinner-aria-announcement-example',
    templateUrl: './spinner-aria-announcement-example.html',
    styleUrls: ['./spinner-aria-announcement-example.css'],
})
export class SpinnerAriaAnnouncementExampleComponent {
    calculationInProgress = false;
    buildInProgress = false;
}
