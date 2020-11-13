import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NxViewportService, NxBreakpoints } from '@aposin/ng-aquila/utils';
import { NxSidebarComponent } from '@aposin/ng-aquila/sidebar';
import { Subscription } from 'rxjs';

/**
* @title Viewport Subscription example
*/
@Component({
  templateUrl: './viewport-change-example.html',
  styleUrls: ['./viewport-change-example.css']
})
export class ViewportChangeExampleComponent implements OnDestroy {
  @ViewChild('sidebar') sidebar: NxSidebarComponent;
  actions = [
    {
      icon: 'file-text',
      label: 'All Files',
      query: { a: 1 }
    },
    {
      icon: 'calendar',
      label: 'Calendar',
      query: { a: 2 }
    },
    {
      icon: 'mail-o',
      label: 'Email',
      query: { a: 3 }
    },
    {
      icon: 'user-o',
      label: 'My Profile',
      query: { a: 4 }
    },
    {
      icon: 'file',
      label: 'Recent Downloads',
      query: { a: 5 }
    }
  ];

  viewportServiceSubscription: Subscription;

  constructor(private viewportService: NxViewportService) {

    this.viewportServiceSubscription = this.viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM)
      .subscribe(isGreaterThanMedium => {
        if (isGreaterThanMedium && !this.sidebar.open) {
          this.sidebar.expand();
        } else if (!isGreaterThanMedium) {
          // don't trigger unneeded close() and expand()
          if (this.sidebar.open) {
            this.sidebar.close();
          }
        }
      });
  }

  ngOnDestroy() {
    this.viewportServiceSubscription.unsubscribe();
  }
}
