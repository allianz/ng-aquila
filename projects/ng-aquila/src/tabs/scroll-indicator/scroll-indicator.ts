import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Optional, Output } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
        '[class.is-scrolled-to-end]': 'isScrolledToEnd',
        '[attr.aria-hidden]': 'true',
    },
})
export class NxTabScrollIndicator implements OnDestroy {
    _view = 'desktop';

    @Input() scrollDirection!: NxScrollDirection;

    @Input() isScrolledToStart!: boolean;

    @Input() isScrolledToEnd!: boolean;

    @Output() readonly buttonClicked = new EventEmitter<void>();

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _viewportService: NxViewportService,
        @Optional() private readonly _dir: Directionality | null,
    ) {
        this._viewportService
            .min(NxBreakpoints.BREAKPOINT_MEDIUM)
            .pipe(takeUntil(this._destroyed))
            .subscribe(isGreaterThanMedium => {
                if (isGreaterThanMedium) {
                    this._view = 'desktop';
                } else if (!isGreaterThanMedium) {
                    this._view = 'mobile';
                }
                this._cdr.markForCheck();
            });
        this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(() => this._cdr.markForCheck());
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    get direction(): Direction {
        return this._dir?.value || 'ltr';
    }

    getChevronName(): string {
        if ((this.scrollDirection === 'start' && this.direction === 'ltr') || (this.scrollDirection === 'end' && this.direction === 'rtl')) {
            return 'chevron-left';
        }
        return 'chevron-right';
    }

    scroll() {
        this.buttonClicked.emit();
    }
}
