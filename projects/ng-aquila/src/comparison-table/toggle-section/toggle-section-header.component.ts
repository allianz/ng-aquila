import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, NgZone, OnDestroy, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxComparisonTableBase } from '../comparison-table-base';
import { NxToggleSectionAnimations } from './toggle-section-animations';
import { NxToggleSectionBase } from './toggle-section-base';

let nextId = 0;

@Component({
    selector: 'nx-comparison-table-toggle-section-header',
    templateUrl: './toggle-section-header.component.html',
    styleUrls: ['./toggle-section-header.component.scss'],
    animations: [NxToggleSectionAnimations.indicatorRotate],
})
export class NxToggleSectionHeaderComponent implements AfterViewInit, OnDestroy {
    @ViewChild('content', { static: true }) _content!: TemplateRef<any>;
    @ViewChild('mobileCell') _mobileCell!: ElementRef;

    @ViewChild('wrapper') _wrapperElement!: ElementRef;

    /** Preserves the current value of the _wrapperElement ViewChild in case it changes. */
    private _wrapperElementPrevious!: ElementRef;

    /** Sets the id of the toggle section header. */
    @Input() set id(value: string) {
        if (this._id !== value) {
            this._id = value;
        }
    }
    get id(): string {
        return this._id;
    }
    private _id = `nx-comparison-table-toggle-section-header-${nextId++}`;

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly _table: NxComparisonTableBase,
        readonly _toggleSection: NxToggleSectionBase,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _ngZone: NgZone,
        @Inject(PLATFORM_ID) platformId: string,
    ) {
        if (isPlatformBrowser(platformId)) {
            this._table.viewTypeChange.pipe(takeUntil(this._destroyed)).subscribe(() => {
                this._updateFocusMonitoringTimeout();
            });
        }
    }

    ngAfterViewInit(): void {
        this._updateFocusMonitoringTimeout();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._focusMonitor.stopMonitoring(this._wrapperElement);
    }

    private _updateFocusMonitoringTimeout(): void {
        this._ngZone.runOutsideAngular(() =>
            // timeout is needed here so that the focus monitor is updated after the view was updated
            setTimeout(() => this._updateFocusMonitoring()),
        );
    }

    private _updateFocusMonitoring() {
        if (this._wrapperElementPrevious && !this._wrapperElement) {
            this._focusMonitor.stopMonitoring(this._wrapperElementPrevious);
            this._wrapperElementPrevious = this._wrapperElement;
        }
        if (!this._wrapperElementPrevious && this._wrapperElement) {
            this._focusMonitor
                .monitor(this._wrapperElement)
                .pipe(takeUntil(this._destroyed))
                .subscribe(origin => {
                    if (origin === 'keyboard') {
                        this._table._scrollElementIntoView(this._wrapperElement, 8);
                    }
                });
            this._wrapperElementPrevious = this._wrapperElement;
        }
    }

    /** Toggles the toggle section. */
    toggle() {
        if (this._table.viewType !== 'mobile') {
            this._toggleSection.toggleExpanded();
        }
    }

    _onKeydown($event: KeyboardEvent) {
        if ($event && ($event.keyCode === ENTER || $event.keyCode === SPACE)) {
            this.toggle();

            // prevent page from scrolling down
            if ($event.keyCode === SPACE) {
                $event.preventDefault();
            }
        }
    }

    _getMobileClipPathInset(): string {
        if (this._mobileCell) {
            const cellRect = this._mobileCell.nativeElement.getBoundingClientRect();
            return this._table._getMobileClipPathInset(cellRect);
        }
        return '0';
    }
}
