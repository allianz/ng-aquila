import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxHeaderActionsDirective,
  NxHeaderAppTitleDirective,
  NxHeaderBrandDirective,
  NxHeaderComponent,
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
import { RouterLink } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

type ViewType = 'mobile' | 'tablet' | 'desktop';

interface MenuItem {
  label: string;
  menuLink: string;
}

/**
 * @title Header with functional icons example
 */
@Component({
  selector: 'header-icons-responsive-example',
  templateUrl: './header-icons-responsive-example.html',
  styleUrls: ['./header-icons-responsive-example.css'],
  imports: [
    NxHeaderComponent,
    NxHeaderBrandDirective,
    NxLinkComponent,
    NxHeaderAppTitleDirective,
    NxHeaderActionsDirective,
    NxPlainButtonComponent,
    NxIconComponent,
    RouterLink,
    NxMenuButtonComponent,
    NxMenuComponent,
    NxMenuItemDirective,
  ],
})
export class HeaderIconsResponsiveExampleComponent
  implements OnInit, OnDestroy
{
  @ViewChild(NxMenuComponent) menu!: NxMenuComponent;

  protected readonly _destroyed = new Subject<void>();

  viewType: ViewType = 'desktop';

  constructor(
    private readonly viewportService: NxViewportService,
    protected readonly _cdr: ChangeDetectorRef,
  ) {}

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

  menuData: MenuItem[] = [
    {
      label: 'Search',
      menuLink: './',
    },
    {
      label: 'Settings',
      menuLink: './',
    },
    {
      label: 'More information',
      menuLink: './',
    },
    {
      label: 'Notifications',
      menuLink: './',
    },
  ];

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
