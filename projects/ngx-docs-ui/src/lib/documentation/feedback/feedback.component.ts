import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subscription } from 'rxjs';

import { NXV_FEEDBACK_LINKS } from './../../core/tokens';

@Component({
    selector: 'nxv-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    host: {
        '[class.is-mobile]': 'showMobileView',
        '[class.is-desktop]': '!showMobileView',
    },
})
export class NxvFeedbackComponent implements OnInit, OnDestroy {
    @ViewChild('mobileButton') mobileButton!: ElementRef;

    @Input() page!: string;

    viewportServiceSubscription: Subscription;

    showMobileView = false;

    feedbackLinkPositive!: string;
    feedbackLinkNegative!: string;

    constructor(
        @Optional() @Inject(NXV_FEEDBACK_LINKS) private _feedbackLinks: any | null,
        private viewportService: NxViewportService,
        private focusMonitor: FocusMonitor,
    ) {
        this.viewportServiceSubscription = this.viewportService.min(NxBreakpoints.BREAKPOINT_LARGE).subscribe(isGreaterThanMedium => {
            if (isGreaterThanMedium && this.showMobileView) {
                this.showMobileView = false;
                this.focusMonitor.stopMonitoring(this.mobileButton);
            } else if (!isGreaterThanMedium && !this.showMobileView) {
                this.showMobileView = true;
                setTimeout(() => this.focusMonitor.monitor(this.mobileButton));
            }
        });
    }

    ngOnInit() {
        this.feedbackLinkPositive = this._feedbackLinks[this.page].positivePreset;
        this.feedbackLinkNegative = this._feedbackLinks[this.page].negativePreset;
    }

    ngOnDestroy() {
        this.viewportServiceSubscription.unsubscribe();
    }
}
