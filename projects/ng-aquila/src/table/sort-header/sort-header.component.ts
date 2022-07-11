import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

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
    private _parentChangeSubscription!: Subscription;
    private _intlSubscription: Subscription;
    private _key!: string;

    @ViewChild('focusContainer') _focusContainer!: ElementRef;

    /** Sets the key of this sort header. */
    @Input('nxSortHeaderCell')
    set key(value: string) {
        if (this._key !== value) {
            this._key = value;
        }
    }
    get key(): string {
        return this._key;
    }

    readonly _sort: NxSortDirective;

    constructor(
        @Optional() _sort: NxSortDirective | null,
        public _intl: NxSortHeaderIntl,
        private _cdr: ChangeDetectorRef,
        private _focusMonitor: FocusMonitor,
    ) {
        if (!_sort) {
            throw new Error(`NxTable: Using the 'nxSortHeaderCell' component requires the 'nxSort' directive on containing table.`);
        }
        this._sort = _sort;

        this._intlSubscription = this._intl.changes.subscribe(() => this._cdr.markForCheck());
    }

    ngOnInit() {
        this._parentChangeSubscription = this._sort._stateChanges.subscribe(() => {
            this._cdr.markForCheck();
        });
    }

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._focusContainer);
    }

    ngOnDestroy() {
        if (this._parentChangeSubscription) {
            this._parentChangeSubscription.unsubscribe();
        }
        this._intlSubscription.unsubscribe();
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

    _getAriaLabel(): string {
        if (this._sort.active === this._key) {
            if (this._sort.direction === 'asc') {
                return `${this._intl.sortedAscendingAriaLabel}`;
            }
            return `${this._intl.sortedDescendingAriaLabel}`;
        }

        return '';
    }

    _getTitle(): string {
        if (this._sort.active === this._key && this._sort.direction === 'asc') {
            return `${this._intl.sortDescendingAriaLabel}`;
        }
        return `${this._intl.sortAscendingAriaLabel}`;
    }
}
