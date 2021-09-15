import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  AfterContentInit,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { DefaultPaginationTexts, IPaginationTexts, NX_PAGINATION_TEXTS } from './pagination-texts';
import { NxPaginationUtils } from './pagination-utils';
import { Directionality } from '@angular/cdk/bidi';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';

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
  styleUrls: [ './pagination.component.scss' ],
})

export class NxPaginationComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  @ViewChildren('link') _linkElements!: QueryList<ElementRef>;

  /** Preserves the current value of the _linkElements ViewChildren in case _linkElements changes. */
  _linkElementsPrevious!: QueryList<ElementRef>;

  private _page!: number;
  private _count!: number;
  private _perPage!: number;
  private _type: string = 'simple';
  private _dirChangeSubscription: Subscription;

  /** @docs-private */
  paginationTexts: IPaginationTexts;

  /** @docs-private */
  totalNumberPages: number = 0;

  get page(): number { return this._page; }

  /** Sets the current page. */
  @Input('nxPage') // the current page
  set page(value: number) {
    this._page = value;
    this._changeDetectorRef.markForCheck();
  }
  get count(): number { return this._count; }

  /** Number of total items over all pages. */
  @Input('nxCount') // how many total items there are in all pages
  set count(value: number) {
    this._count = value;
    this.totalNumberPages =  this.calculateTotalPages();
    this._changeDetectorRef.markForCheck();
  }
  get perPage(): number { return this._perPage; }

  /** Sets the number of items you want to show per page. */
  @Input('nxPerPage') // how many items we want to show per page
  set perPage(value: number) {
    this._perPage = value;
    this.totalNumberPages =  this.calculateTotalPages();
    this._changeDetectorRef.markForCheck();
  }
  get type(): string { return this._type; }

  /**
   * Determines the type of pagination.
   *
   * Values: simple | advanced, default: simple.
   */
  @Input('nxType')
  set type(value: string) { // type advanced or simple
    this._type = value;
    this._changeDetectorRef.markForCheck();
  }

  /** An event emitted when the previous page button is clicked. */
  @Output() nxGoPrev = new EventEmitter<void>();

  /** An event emitted when the next page button is clicked */
  @Output() nxGoNext = new EventEmitter<void>();

  /**
   * An event emitted when a page number is clicked.
   * Provides the number of the page as parameter.
   */
  @Output() nxGoPage = new EventEmitter<number>();

  constructor(
      @Optional() @Inject(NX_PAGINATION_TEXTS) paginationTexts: IPaginationTexts,
      @Optional() private _dir: Directionality,
      private paginationUtilsService: NxPaginationUtils,
      private _changeDetectorRef: ChangeDetectorRef,
      private _focusMonitor: FocusMonitor) {
    this.paginationTexts = paginationTexts || DefaultPaginationTexts;
    this._dirChangeSubscription = this._dir.change.subscribe(() => {
      this._changeDetectorRef.detectChanges();
    });
   }

  ngOnInit() {
    this.totalNumberPages =  this.calculateTotalPages();
  }

  ngAfterContentInit() {
    if (this.type === 'advanced' && (!this.paginationTexts.last || !this.paginationTexts.first)) {
      console.warn('Please define aria labels for the last and first arrows.');
    }
  }

  ngAfterViewInit() {
    this._linkElements.forEach(link => this._focusMonitor.monitor(link));
    this._linkElementsPrevious = this._linkElements;
    this._linkElements.changes.subscribe(_linkElements => {
      this._linkElementsPrevious.forEach(link => this._focusMonitor.stopMonitoring(link));
      this._linkElementsPrevious = this._linkElements;
      this._linkElements.forEach(link => this._focusMonitor.monitor(link));
    });
  }

  ngOnDestroy() {
    this._linkElements?.forEach(link => this._focusMonitor.stopMonitoring(link));
    this._dirChangeSubscription.unsubscribe();
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
    this.nxGoPage.emit(n);
  }

  /** Directs to the previous page. */
  onPrev(): void {
    if (!this._isPaginationPreviousDisabled()) {
      this.nxGoPrev.emit();
    }
  }

  /** Directs to the next page. */
  onNext(): void {
    if (!this._isPaginationNextDisabled()) {
      this.nxGoNext.emit();
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
  getPages(): Page[] {
    return this.paginationUtilsService.getPages(this._page, this.totalNumberPages);
  }

  /** @docs-private */
  getMobilePages(): Page[] {
    return this.paginationUtilsService.getMobilePages(this._page, this.totalNumberPages);
  }

  /** @docs-private */
  getPaginationItemClasses(page: Page): Object {
    const classes = {
      'is-ellipsis': page.label === '...',
      'nx-pagination__item--expanded-view': page.class === 'expanded-view'
    };
    return classes;
  }

  /** @docs-private */
  getPaginationNumberClasses(page: Page): Object {
    const classes = {
      'is-active': page.value === this.page,
      'nx-pagination__ellipsis': page.label === '...',
      'nx-pagination__link': page.label !== '...'
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

  get _isRTL(): boolean {
    return this._dir.value === 'rtl';
  }
}
