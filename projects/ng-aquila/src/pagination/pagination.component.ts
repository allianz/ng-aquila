import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DefaultPaginationTexts, IPaginationTexts, NX_PAGINATION_TEXTS } from './pagination-texts';
import { NxPaginationUtils } from './pagination-utils';

/** @docs-private */
export interface Page {
    label: string;
    value: any;
    class: string;
}

@Component({
    selector: 'nx-pagination',
    templateUrl: './pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./pagination.component.scss'],
})
export class NxPaginationComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    @ViewChildren('link') _linkElements!: QueryList<ElementRef>;

    /** Preserves the current value of the _linkElements ViewChildren in case _linkElements changes. */
    _linkElementsPrevious!: QueryList<ElementRef>;

    /** @docs-private */
    paginationTexts: IPaginationTexts;

    /** @docs-private */
    totalNumberPages = 0;

    private _ariaLabel = '';

    /** Sets the aria label on the nav element of the pagination. Use this to override the global aria-label from PaginationTexts. */
    @Input() set ariaLabel(value: string) {
        this._ariaLabel = value;
    }
    get ariaLabel(): string {
        return this._ariaLabel || this.paginationTexts.ariaLabel;
    }

    /** Sets the current page. */
    @Input() set page(value: number) {
        this._page = value;
        this._cdr.markForCheck();
    }
    get page(): number {
        return this._page;
    }
    private _page!: number;

    /** Number of total items over all pages. */
    @Input() set count(value: number) {
        this._count = value;
        this.totalNumberPages = this.calculateTotalPages();
        this._cdr.markForCheck();
    }
    get count(): number {
        return this._count;
    }
    private _count!: number;

    /** Sets the number of items you want to show per page. */
    @Input() set perPage(value: number) {
        this._perPage = value;
        this.totalNumberPages = this.calculateTotalPages();
        this._cdr.markForCheck();
    }
    get perPage(): number {
        return this._perPage;
    }
    private _perPage!: number;

    /**
     * Determines the type of pagination.
     *
     * Values: simple | advanced, default: simple.
     */
    @Input() set type(value: string) {
        // type advanced or simple
        this._type = value;
        this._cdr.markForCheck();
    }
    get type(): string {
        return this._type;
    }
    private _type = 'simple';

    /** An event emitted when the previous page button is clicked. */
    @Output() readonly goPrev = new EventEmitter<void>();

    /** An event emitted when the next page button is clicked */
    @Output() readonly goNext = new EventEmitter<void>();

    /**
     * An event emitted when a page number is clicked.
     * Provides the number of the page as parameter.
     */
    @Output() readonly goPage = new EventEmitter<number>();

    private readonly _destroyed = new Subject<void>();

    constructor(
        @Optional() @Inject(NX_PAGINATION_TEXTS) paginationTexts: IPaginationTexts | null,
        @Optional() private readonly _dir: Directionality | null,
        private readonly paginationUtilsService: NxPaginationUtils,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this.paginationTexts = paginationTexts || DefaultPaginationTexts;

        this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._cdr.detectChanges();
        });
    }

    ngOnInit(): void {
        this.totalNumberPages = this.calculateTotalPages();
    }

    ngAfterContentInit(): void {
        if (this.type === 'advanced' && (!this.paginationTexts.last || !this.paginationTexts.first)) {
            console.warn('Please define aria labels for the last and first arrows.');
        }
    }

    ngAfterViewInit(): void {
        this._linkElements.forEach(link => this._focusMonitor.monitor(link));
        this._linkElementsPrevious = this._linkElements;
        this._linkElements.changes.subscribe(_linkElements => {
            this._linkElementsPrevious.forEach(link => this._focusMonitor.stopMonitoring(link));
            this._linkElementsPrevious = this._linkElements;
            this._linkElements.forEach(link => this._focusMonitor.monitor(link));
        });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._linkElements?.forEach(link => this._focusMonitor.stopMonitoring(link));
    }

    /** Returns the number of the first page. */
    getMin(): number {
        return this.totalNumberPages > 0 ? 1 : 0;
    }

    /** Returns the number of the last page. */
    getMax(): number {
        let max = this._perPage * this._page;
        if (max > this._count) {
            max = this._count;
        }
        return max;
    }

    /** Returns the total number of pages */
    calculateTotalPages(): number {
        return Math.ceil(this._count / this._perPage) || 0;
    }

    /** Directs to the page with number n. */
    onPage(n: number): void {
        this.goPage.emit(n);
    }

    /** Directs to the previous page. */
    onPrev(): void {
        if (!this._isPaginationPreviousDisabled()) {
            this.goPrev.emit();
        }
    }

    /** Directs to the next page. */
    onNext(): void {
        if (!this._isPaginationNextDisabled()) {
            this.goNext.emit();
        }
    }

    /** Directs to the first page. */
    onFirst() {
        if (!this._isPaginationPreviousDisabled()) {
            this.onPage(1);
        }
    }

    /** Directs to the last page. */
    onLast() {
        if (!this._isPaginationNextDisabled()) {
            this.onPage(this.totalNumberPages);
        }
    }

    /** Returns if the current page is the last page. */
    lastPage(): boolean {
        return this._perPage * this._page >= this._count;
    }

    /** @docs-private */
    getSlides(): Page[] {
        return this.paginationUtilsService.getSlides(this._count);
    }

    /** @docs-private */
    getPages(): Page[] {
        return this.paginationUtilsService.getPages(this._page, this.totalNumberPages);
    }

    /** @docs-private */
    getMobilePages(): Page[] {
        return this.paginationUtilsService.getMobilePages(this._page, this.totalNumberPages);
    }

    /** @docs-private */
    getPaginationItemClasses(page: Page): object {
        const classes = {
            'is-ellipsis': page.label === '...',
            'nx-pagination__item--expanded-view': page.class === 'expanded-view',
        };
        return classes;
    }

    /** @docs-private */
    getPaginationNumberClasses(page: Page): object {
        const classes = {
            'is-active': page.value === this.page,
            'nx-pagination__ellipsis': page.label === '...',
            'nx-pagination__link': page.label !== '...',
        };
        return classes;
    }

    /** Returns true, if `nxCount` is greater than 0, else false. */
    isPaginationVisible(): boolean {
        return this.count > 0;
    }

    /** Returns true, if `nxCount` is greater than 0 and the type of pagination is 'simple', else false. */
    isPaginationCompactVisible(): boolean {
        return this.type.includes('simple') && this.count > 0;
    }

    /** Returns true, if `nxCount` is greater than 0 and the type of pagination is 'slider', else false. */
    isPaginationSliderVisible(): boolean {
        return this.type.includes('slider') && this.count > 0;
    }

    /** @docs-private */
    isPaginationContainerVisible(): boolean {
        return this.type.includes('advanced');
    }

    _isPaginationPreviousDisabled(): boolean {
        return this.page === this.getMin();
    }

    _isPaginationNextDisabled(): boolean {
        return this.page === this.totalNumberPages;
    }

    _isPaginationSliderPreviousDisabled(): boolean {
        return this.page === 1;
    }

    _isPaginationSliderNextDisabled(): boolean {
        return this.page === this.count;
    }

    get _isRTL(): boolean {
        return this._dir?.value === 'rtl';
    }
}
