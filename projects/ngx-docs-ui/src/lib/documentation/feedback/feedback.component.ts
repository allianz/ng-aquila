import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

    showMobileView = false;

    feedbackLinkPositive!: string;
    feedbackLinkNegative!: string;

    private readonly _destroyed = new Subject<void>();

    constructor(
        @Optional() @Inject(NXV_FEEDBACK_LINKS) private readonly _feedbackLinks: any | null,
        private readonly viewportService: NxViewportService,
        private readonly focusMonitor: FocusMonitor,
    ) {
        this.viewportService
            .min(NxBreakpoints.BREAKPOINT_LARGE)
            .pipe(takeUntil(this._destroyed))
            .subscribe(isGreaterThanMedium => {
                if (isGreaterThanMedium && this.showMobileView) {
                    this.showMobileView = false;
                    this.focusMonitor.stopMonitoring(this.mobileButton);
                } else if (!isGreaterThanMedium && !this.showMobileView) {
                    this.showMobileView = true;
                    setTimeout(() => this.focusMonitor.monitor(this.mobileButton));
                }
            });
    }

    ngOnInit(): void {
        this.feedbackLinkPositive = this._feedbackLinks[this.page].positivePreset;
        this.feedbackLinkNegative = this._feedbackLinks[this.page].negativePreset;
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
