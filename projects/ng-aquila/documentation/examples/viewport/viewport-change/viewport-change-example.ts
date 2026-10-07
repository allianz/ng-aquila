import {
  NxActionComponent,
  NxActionIconDirective,
} from '@allianz/ng-aquila/action';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxSidebarComponent,
  NxSidebarComponent as NxSidebarComponent_1,
} from '@allianz/ng-aquila/sidebar';
import { NxBreakpoints, NxViewportService } from '@allianz/ng-aquila/utils';
import { Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @title Viewport Change example
 */
@Component({
  selector: 'viewport-change-example',
  templateUrl: './viewport-change-example.html',
  styleUrls: ['./viewport-change-example.css'],
  imports: [
    NxSidebarComponent_1,
    NxActionComponent,
    RouterLink,
    RouterLinkActive,
    NxIconComponent,
    NxActionIconDirective,
  ],
})
export class ViewportChangeExampleComponent implements OnInit, OnDestroy {
  readonly sidebar = viewChild.required<NxSidebarComponent>('sidebar');

  readonly actions = [
    {
      icon: 'file-text',
      label: 'All Files',
      query: { a: 1 },
    },
    {
      icon: 'calendar',
      label: 'Calendar',
      query: { a: 2 },
    },
    {
      icon: 'mail-o',
      label: 'Email',
      query: { a: 3 },
    },
    {
      icon: 'user-o',
      label: 'My Profile',
      query: { a: 4 },
    },
    {
      icon: 'file',
      label: 'Recent Downloads',
      query: { a: 5 },
    },
  ];

  private readonly _destroyed = new Subject<void>();

  constructor(private readonly viewportService: NxViewportService) {}

  ngOnInit(): void {
    this.viewportService
      .min(NxBreakpoints.BREAKPOINT_MEDIUM)
      .pipe(takeUntil(this._destroyed))
      .subscribe((isGreaterThanMedium) => {
        const sidebar = this.sidebar();
        if (isGreaterThanMedium && !sidebar.open) {
          sidebar.expand();
        } else if (!isGreaterThanMedium) {
          // don't trigger unneeded close() and expand()
          if (sidebar.open) {
            sidebar.close();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
