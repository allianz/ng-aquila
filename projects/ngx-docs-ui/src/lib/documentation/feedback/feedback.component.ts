import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, Input, OnDestroy, Optional, ViewChild } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subscription } from 'rxjs';
import { NXV_FEEDBACK_LINKS } from './../../core/tokens';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nxv-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: [ './feedback.component.scss' ],
  host: {
    '[class.is-mobile]': 'showMobileView',
    '[class.is-desktop]': '!showMobileView'
  }
})
export class NxvFeedbackComponent implements OnDestroy {

  @ViewChild('mobileButton') mobileButton: ElementRef;

  @Input() page: string;

  viewportServiceSubscription: Subscription;

  showMobileView: boolean = false;

  constructor(
    @Optional() @Inject(NXV_FEEDBACK_LINKS) private _feedbackLinks,
    private viewportService: NxViewportService,
    private focusMonitor: FocusMonitor
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

  ngOnDestroy() {
    this.viewportServiceSubscription.unsubscribe();
  }

  openPositiveLink() {
    window.open(this._feedbackLinks[this.page].positivePreset, '_blank');
  }

  openNegativeLink() {
    window.open(this._feedbackLinks[this.page].negativePreset, '_blank');
  }
}
