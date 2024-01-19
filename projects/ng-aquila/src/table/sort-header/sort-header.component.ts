import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxSortDirective } from './sort.directive';
import { NxSortHeaderIntl } from './sort-header-intl';

@Component({
    selector: 'th[nxSortHeaderCell]',
    exportAs: 'nxSortHeaderComponent',
    templateUrl: 'sort-header.component.html',
    styleUrls: ['sort-header.component.scss'],
    host: {
        '(click)': '_handleClick()',
        '(keydown)': '_onKeydown($event)',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSortHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
    /** Sets the key of this sort header. */
    @Input('nxSortHeaderCell') set key(value: string) {
        if (this._key !== value) {
            this._key = value;
        }
    }
    get key(): string {
        return this._key;
    }
    private _key!: string;

    @ViewChild('focusContainer') _focusContainer!: ElementRef;

    readonly _sort: NxSortDirective;

    private readonly _destroyed = new Subject<void>();

    constructor(
        @Optional() _sort: NxSortDirective | null,
        readonly _intl: NxSortHeaderIntl,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        if (!_sort) {
            throw new Error(`NxTable: Using the 'nxSortHeaderCell' component requires the 'nxSort' directive on containing table.`);
        }
        this._sort = _sort;

        this._intl.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._cdr.markForCheck());
    }

    ngOnInit(): void {
        this._sort._stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._cdr.markForCheck();
        });
    }

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this._focusContainer);
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._focusMonitor.stopMonitoring(this._focusContainer);
    }

    _handleClick() {
        this._sort.sort(this._key);
    }

    _onKeydown($event: KeyboardEvent) {
        if ($event && ($event.keyCode === ENTER || $event.keyCode === SPACE)) {
            this._sort.sort(this._key);

            // prevent page from scrolling down
            if ($event.keyCode === SPACE) {
                $event.preventDefault();
            }
        }
    }

    _isSortedAscending() {
        return this._sort.active === this._key && this._sort.direction === 'asc';
    }

    _isSortedDescending() {
        return this._sort.active === this._key && this._sort.direction === 'desc';
    }

    _isSorted() {
        return this._sort.active === this._key;
    }

    _getAriaLabel(): string | null {
        if (this._sort.active === this._key) {
            if (this._sort.direction === 'asc') {
                return `${this._intl.sortedAscendingAriaLabel}`;
            }
            return `${this._intl.sortedDescendingAriaLabel}`;
        }

        return null;
    }

    _getTitle(): string {
        if (this._sort.active === this._key && this._sort.direction === 'asc') {
            return `${this._intl.sortDescendingAriaLabel}`;
        }
        return `${this._intl.sortAscendingAriaLabel}`;
    }
}
