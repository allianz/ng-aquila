import { Component, ChangeDetectorRef } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subscription } from 'rxjs';

/**
* @title Floating sidepanel example
*/
@Component({
  selector: 'sidepanel-floating-example',
  templateUrl: './sidepanel-floating-example.html',
  styleUrls: ['sidepanel-floating-example.css']
})
export class SidepanelFloatingExampleComponent {
  opened: boolean = true;
  isGreaterThanSmall: boolean = true;

  viewportServiceSubscription: Subscription;

  constructor(public viewportService: NxViewportService, private _cdRef: ChangeDetectorRef) {
    this.viewportServiceSubscription = this.viewportService.min(NxBreakpoints.BREAKPOINT_SMALL)
      .subscribe(isGreaterThanSmall => {
        // only do something if the width has changed between small and bigger
        if (isGreaterThanSmall !== this.isGreaterThanSmall) {
          this.isGreaterThanSmall = isGreaterThanSmall;
          if (isGreaterThanSmall && !this.opened) {
            this.opened = true;
          } else if (!isGreaterThanSmall && this.opened) {
            this.opened = false;
          }
          this._cdRef.detectChanges();
        }
      });
  }
}
