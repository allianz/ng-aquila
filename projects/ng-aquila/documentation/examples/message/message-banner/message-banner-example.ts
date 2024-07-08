import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxMessageBannerComponent } from '@aposin/ng-aquila/message';

/**
 * @title Notification banner example
 */
@Component({
    selector: 'message-banner-example',
    templateUrl: './message-banner-example.html',
    styleUrls: ['./message-banner-example.css'],
    standalone: true,
    imports: [NgIf, NxMessageBannerComponent, NxButtonComponent],
})
export class MessageBannerExampleComponent {
    infoBanner = true;
    warningBanner = true;
    errorBanner = true;

    showAllBanners() {
        this.infoBanner = true;
        this.warningBanner = true;
        this.errorBanner = true;
    }
}
