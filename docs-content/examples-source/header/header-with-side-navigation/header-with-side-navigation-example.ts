import {
  NxActionComponent,
  NxActionIconDirective,
} from '@allianz/ng-aquila/action';
import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxHeaderActionsDirective,
  NxHeaderBrandDirective,
  NxHeaderComponent,
  NxHeaderLinkComponent,
  NxHeaderNavigationComponent,
  NxHeaderNavigationItemDirective,
  NxHeaderRowDirective,
} from '@allianz/ng-aquila/header';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { NxSidebarComponent } from '@allianz/ng-aquila/sidebar';
import { NxBreakpoints, NxViewportService } from '@allianz/ng-aquila/utils';
import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

type ViewType = 'mobile' | 'tablet' | 'desktop';

interface MenuItem {
  label: string;
  query: {
    s: number;
  };
}

interface ActionItem {
  icon: string;
  label: string;
  query: object;
}

/**
 * @title Header with side navigation example
 */
@Component({
  selector: 'header-with-side-navigation-example',
  templateUrl: './header-with-side-navigation-example.html',
  styleUrls: ['./header-with-side-navigation-example.css'],
  imports: [
    NxHeaderComponent,
    NxHeaderBrandDirective,
    NxHeaderRowDirective,
    NxLinkComponent,
    NxHeaderNavigationComponent,
    NxHeaderNavigationItemDirective,
    NxHeaderLinkComponent,
    RouterLink,
    RouterLinkActive,
    NxHeaderActionsDirective,
    NxSidebarComponent,
    NxPlainButtonComponent,
    NxActionComponent,
    NxIconComponent,
    NxActionIconDirective,
    NgClass,
  ],
})
export class HeaderWithSideNavigationExampleComponent
  implements OnInit, OnDestroy
{
  protected readonly _destroyed = new Subject<void>();
  viewType: ViewType = 'desktop';

  constructor(
    private readonly viewportService: NxViewportService,
    protected readonly _cdr: ChangeDetectorRef,
  ) {}

  showSidebar: boolean = false;

  menuData: MenuItem[] = [
    {
      label: 'Option 1',
      query: { s: 1 },
    },
    {
      label: 'Option 2',
      query: { s: 2 },
    },
    {
      label: 'Option 3',
      query: { s: 3 },
    },
  ];

  actionData: ActionItem[] = [
    {
      icon: 'file-text',
      label: 'Action 1',
      query: { a: 1 },
    },
    {
      icon: 'calendar',
      label: 'Action 2',
      query: { a: 2 },
    },
    {
      icon: 'mail-o',
      label: 'Action 3',
      query: { a: 3 },
    },
    {
      icon: 'user-o',
      label: 'Action 4',
      query: { a: 4 },
    },
    {
      icon: 'file',
      label: 'Action 5',
      query: { a: 5 },
    },
  ];

  ngOnInit(): void {
    this.detectScreenSize();
  }

  detectScreenSize(): void {
    const mobile$ = this.viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM);
    const tablet$ = this.viewportService.between(
      NxBreakpoints.BREAKPOINT_MEDIUM,
      NxBreakpoints.BREAKPOINT_LARGE,
    );
    const desktop$ = this.viewportService.min(NxBreakpoints.BREAKPOINT_LARGE);

    merge(
      mobile$.pipe(
        filter((value) => value),
        map(() => 'mobile' as ViewType),
      ),
      tablet$.pipe(
        filter((value) => value),
        map(() => 'tablet' as ViewType),
      ),
      desktop$.pipe(
        filter((value) => value),
        map(() => 'desktop' as ViewType),
      ),
    )
      .pipe(distinctUntilChanged(), takeUntil(this._destroyed))
      .subscribe((viewType) => {
        this.viewType = viewType;
        this.showSidebar = viewType !== 'mobile';
        this._cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
