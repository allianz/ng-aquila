import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  Inject,
  inject,
  Input,
  input,
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

/** Where the navigation controls of an advanced pagination sit relative to the page numbers. */
export type NxPaginationControlsPosition = 'around' | 'start' | 'end';

/** How an advanced pagination spreads across the width of its container. */
export type NxPaginationAlignment = 'start' | 'space-between';

/** How a pair of navigation controls of an advanced pagination is rendered. */
export type NxPaginationControlDisplay = 'icon' | 'label' | 'hidden';

@Component({
  selector: 'nx-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pagination.component.scss'],
  imports: [NxIconModule, NgClass, NgTemplateOutlet, NxButtonComponent],
  host: {
    '[class.nx-a1-pagination]': '_a1Enabled()',
  },
})
export class NxPaginationComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChildren('focusable') _focusableElements!: QueryList<ElementRef>;

  /** Preserves the current value of the _focusableElements ViewChildren in case _focusableElements changes. */
  protected _focusableElementsPrevious!: QueryList<ElementRef>;

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
   * Values: simple | advanced | slider, default: simple.
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

  /**
   * Where the navigation controls sit relative to the page numbers.
   * Only applies to `type="advanced"`.
   *
   * default: around.
   */
  readonly controlsPosition = input<NxPaginationControlsPosition>('around');

  /**
   * How the first and last page controls are rendered. `label` replaces the icon with the label
   * from `IPaginationTexts`.
   * Only applies to `type="advanced"`.
   *
   * default: icon.
   */
  readonly firstLastControls = input<NxPaginationControlDisplay>('icon');

  /**
   * How the previous and next page controls are rendered. `label` replaces the icon with the label
   * from `IPaginationTexts`.
   * Only applies to `type="advanced"`.
   *
   * default: icon.
   */
  readonly prevNextControls = input<NxPaginationControlDisplay>('icon');

  /**
   * How the pagination spreads across the width of its container.
   * Only applies to `type="advanced"`.
   *
   * default: start.
   */
  readonly alignment = input<NxPaginationAlignment>('start');

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

  private readonly _a1 = inject<AllianzOneOptions | null>(ALLIANZ_ONE, { optional: true });
  protected readonly _a1Enabled = computed(() => this._a1?.enabled?.() ?? false);

  protected readonly _showFirstLast = computed(() => this.firstLastControls() !== 'hidden');

  protected readonly _showPrevNext = computed(() => this.prevNextControls() !== 'hidden');

  protected readonly _firstLastLabels = computed(() => this.firstLastControls() === 'label');

  protected readonly _prevNextLabels = computed(() => this.prevNextControls() === 'label');

  private readonly _hasControls = computed(() => this._showFirstLast() || this._showPrevNext());

  protected readonly _isSpaceBetween = computed(
    () => this.alignment() === 'space-between' && this._hasControls(),
  );

  protected readonly _spaceBeforeLeadingControls = computed(
    () => this._isSpaceBetween() && this.controlsPosition() === 'end',
  );

  protected readonly _spaceBeforePages = computed(
    () => this._isSpaceBetween() && this.controlsPosition() !== 'end',
  );

  protected readonly _spaceBeforeTrailingControls = computed(
    () => this._isSpaceBetween() && this.controlsPosition() === 'around',
  );

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
    if (
      this.type === 'advanced' &&
      this._showFirstLast() &&
      (!this.paginationTexts.last || !this.paginationTexts.first)
    ) {
      console.warn('Please define aria labels for the last and first arrows.');
    }
  }

  ngAfterViewInit(): void {
    this._focusableElements.forEach((link) => this._focusMonitor.monitor(link));
    this._focusableElementsPrevious = this._focusableElements;
    this._focusableElements.changes.subscribe(() => {
      const current = new Set(this._focusableElements.toArray());
      this._focusableElementsPrevious
        .filter((link) => !current.has(link))
        .forEach((link) => this._focusMonitor.stopMonitoring(link));
      this._focusableElementsPrevious = this._focusableElements;
      this._focusableElements.forEach((link) => this._focusMonitor.monitor(link));
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this._focusableElements?.forEach((link) => this._focusMonitor.stopMonitoring(link));
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
