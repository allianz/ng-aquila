import {
  NxButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
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
import {
  NxMenuButtonComponent,
  NxMenuComponent,
  NxMenuItemDirective,
} from '@allianz/ng-aquila/menu';
import { NxBreakpoints, NxViewportService } from '@allianz/ng-aquila/utils';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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

/**
 * @title Header Two Rows Responsive Example
 */
@Component({
  selector: 'header-two-rows-responsive-example',
  templateUrl: './header-two-rows-responsive-example.html',
  styleUrls: ['./header-two-rows-responsive-example.css'],
  imports: [
    NxHeaderComponent,
    NxHeaderRowDirective,
    NxHeaderBrandDirective,
    NxLinkComponent,
    NxHeaderActionsDirective,
    NxButtonComponent,
    NxHeaderNavigationComponent,
    NxHeaderNavigationItemDirective,
    NxHeaderLinkComponent,
    RouterLink,
    RouterLinkActive,
    NxIconComponent,
    NxMenuButtonComponent,
    NxMenuComponent,
    NxMenuItemDirective,
    NxPlainButtonComponent,
  ],
})
export class HeaderTwoRowsResponsiveExampleComponent
  implements OnInit, OnDestroy
{
  @ViewChild(NxMenuComponent) menu!: NxMenuComponent;

  protected readonly _destroyed = new Subject<void>();

  viewType: ViewType = 'desktop';

  constructor(
    private readonly viewportService: NxViewportService,
    protected readonly _cdr: ChangeDetectorRef,
  ) {}

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
    {
      label: 'Option 4',
      query: { s: 4 },
    },
    {
      label: 'Option 5',
      query: { s: 5 },
    },
    {
      label: 'Option 6',
      query: { s: 6 },
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
        if (
          (viewType === 'tablet' || viewType === 'desktop') &&
          this.menu.open
        ) {
          this.menu.toggle();
        }
        this.viewType = viewType;
        this._cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
