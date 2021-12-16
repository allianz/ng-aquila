import { Component } from '@angular/core';

/**
 * @title Notification banner example
 */
@Component({
    selector: 'message-banner-example',
    templateUrl: './message-banner-example.html',
    styleUrls: ['./message-banner-example.css'],
})
export class MessageBannerExampleComponent {
    infoBanner: boolean = true;
    warningBanner: boolean = true;
    errorBanner: boolean = true;

    showAllBanners() {
        this.infoBanner = true;
        this.warningBanner = true;
        this.errorBanner = true;
    }
}
