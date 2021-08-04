import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Optional, Output } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subscription } from 'rxjs';

export type NxScrollDirection = 'start' | 'end';

@Component({
  selector: 'nx-tab-scroll-indicator',
  templateUrl: 'scroll-indicator.html',
  styleUrls: ['./scroll-indicator.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.start-button]': 'scrollDirection === "start"',
    '[class.end-button]': 'scrollDirection === "end"',
    '[class.is-desktop-button]': '_view === "desktop"',
    '[class.is-mobile]': '_view === "mobile"',
    '[class.is-scrolled-to-start]': 'isScrolledToStart',
    '[class.is-scrolled-to-end]': 'isScrolledToEnd'
  }
})

export class NxTabScrollIndicator implements OnDestroy {

  _view = 'desktop';

  @Input() scrollDirection!: NxScrollDirection;

  @Input() isScrolledToStart!: boolean;

  @Input() isScrolledToEnd!: boolean;

  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  private _viewportServiceSubscription: Subscription = Subscription.EMPTY;
  private _dirChangeSubscription = Subscription.EMPTY;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _viewportService: NxViewportService,
    private _dir: Directionality
  ) {
    this._viewportServiceSubscription = this._viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM)
      .subscribe(isGreaterThanMedium => {
        if (isGreaterThanMedium) {
          this._view = 'desktop';
        } else if (!isGreaterThanMedium) {
          this._view = 'mobile';
        }
        this._changeDetectorRef.markForCheck();
      });

    this._dirChangeSubscription = this._dir.change.subscribe(() => this._changeDetectorRef.markForCheck());
  }

  ngOnDestroy() {
    this._viewportServiceSubscription.unsubscribe();
    this._dirChangeSubscription.unsubscribe();
  }

  get direction(): Direction {
    return this._dir?.value || 'ltr';
  }

  getChevronName(): string {
    if ((this.scrollDirection === 'start' && this.direction === 'ltr')
        || (this.scrollDirection === 'end' && this.direction === 'rtl')) {
      return 'chevron-left';
    }
    return 'chevron-right';
  }

  scroll() {
    this.buttonClicked.emit();
  }
}
