import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxHeadlineSize } from '@allianz/ng-aquila/headline';
import { NxPriceSize } from '@allianz/ng-aquila/price';
import {
  NxRadioIndicatorColorScheme,
  NxRadioIndicatorComponent,
} from '@allianz/ng-aquila/selection';
import {
  NX_SURFACE,
  NxResolvedSurface,
  NxSurfaceContext,
  NxSurfaceType,
} from '@allianz/ng-aquila/surface';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Optional,
  Output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { NxComparisonTableRowType } from '../comparison-table.models';
import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowBase } from '../comparison-table-row-base';
import { NxComparisonTableSelectButton } from '../select-button/select-button.component';
import { NxToggleSectionBase } from '../toggle-section/toggle-section-base';

const STUCK_HEADLINE_SIZE = { xl: 'l', l: 'm' } as const;

@Component({
  selector: 'nx-comparison-table-cell',
  styleUrls: ['./cell.component.scss'],
  templateUrl: './cell.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: NX_SURFACE, useExisting: NxComparisonTableCell }],
  imports: [NgTemplateOutlet, NxRadioIndicatorComponent],
})
export class NxComparisonTableCell implements NxSurfaceContext {
  @ViewChild('content', { static: true }) _content!: TemplateRef<any>;

  private readonly _allianzOneOptions = inject<AllianzOneOptions>(ALLIANZ_ONE, { optional: true });
  protected readonly _isA1 = computed(() => this._allianzOneOptions?.enabled?.() ?? false);
  protected readonly _selectButton = contentChild(forwardRef(() => NxComparisonTableSelectButton));
  protected readonly _showRadioIndicator = computed(
    () => this._type() === 'header' && this._isA1() && !!this._selectButton(),
  );

  /** @docs-private */
  @Input() set index(newValue: number) {
    if (this._indexReactive() !== newValue) {
      this._indexReactive.set(newValue);
      this.indexChange.emit(newValue);
    }
  }
  get index(): number {
    return this._indexReactive();
  }
  private readonly _indexReactive = signal(-1);

  /**
   * Sets all cells below a header cell to be disabled (disabled column).
   *
   * **Important**: this property can be set only on header cells.
   */
  @Input() set disabledColumn(value: BooleanInput) {
    this._disabledColumnInput.set(coerceBooleanProperty(value));
  }
  get disabledColumn(): boolean {
    return this._disabledColumn();
  }
  private readonly _disabledColumnInput = signal(false);
  private readonly _disabledColumn = computed(
    () => this._type() === 'header' && this._disabledColumnInput(),
  );

  /** @docs-private */
  @Output() readonly indexChange = new EventEmitter<number>();

  /** Sets the Id of the cell. */
  @Input() set id(value: string) {
    this._idSignal.set(value);
  }
  get id(): string {
    return this._idSignal();
  }
  private readonly _idSignal = signal(
    inject(IdGenerationService).nextId('nx-comparison-table-cell'),
  );

  /** Sets the type of the cell. Default: 'content'. */
  @Input() set type(value: NxComparisonTableRowType) {
    this._type.set(value);
  }
  get type(): NxComparisonTableRowType {
    return this._type();
  }
  private readonly _type = signal<NxComparisonTableRowType>('content');

  /**
   * The surface this cell's content sits on. Header and footer cells share the
   * table's color scheme; content cells never do.
   * @docs-private
   */
  readonly surface = computed<NxSurfaceType>(() => {
    const type = this._type();
    return type === 'header' || type === 'footer' ? this._table._surface() : 'default';
  });

  /** @docs-private */
  readonly accentColor = computed(() =>
    this.surface() === 'accent-attention' ? this._table.accentColor() : undefined,
  );

  /**
   * The radio indicator's scheme for the cell's surface. `emphasis` is a light tint the
   * default scheme still reads on; the other two are dark fills with their own scheme.
   */
  protected readonly _radioIndicatorColorScheme = computed<NxRadioIndicatorColorScheme>(() => {
    switch (this.surface()) {
      case 'attention':
        return 'on-brand-static';
      case 'accent-attention':
        return 'on-accent-attention';
      default:
        return 'default';
    }
  });

  /** What the cell publishes to its projected content via `NX_SURFACE`. @docs-private */
  readonly resolved = computed<NxResolvedSurface>(() => {
    const surface = this.surface();
    return surface === 'accent-attention'
      ? { surface, accentColor: this._table.accentColor() }
      : { surface };
  });

  /**
   * The price and headline sizes design fixes for header cells; while the header is pinned the
   * price drops from `2xl` to `l` and the headline one size. `undefined` for other cell types. The
   * header slot directives provide them as context, so they do not reach content outside the slots.
   */
  readonly priceSize = computed<NxPriceSize | undefined>(() =>
    this._type() !== 'header' ? undefined : this._table._isHeaderStuck() ? 'l' : '2xl',
  );

  readonly headlineSize = computed<NxHeadlineSize | undefined>(() => {
    if (this._type() !== 'header') {
      return undefined;
    }
    const size = this._table.headlineSize();
    return this._table._isHeaderStuck() ? STUCK_HEADLINE_SIZE[size] : size;
  });

  readonly _isCellDisabled = computed(() =>
    this._table._disabledIndexes().has(this._indexReactive()),
  );

  /** Exposed as `data-ct-col` (focus paging) and `--ct-col` (carousel clip). */
  readonly _visiblePosition = computed(() =>
    this._table._visibleColumnIndex(this._indexReactive()),
  );

  readonly _isCellHidden = computed(() => this._table._hiddenIndexSet().has(this._indexReactive()));

  readonly _isFirst = computed(() => !this._isCellHidden() && this._visiblePosition() === 0);

  readonly _isLast = computed(
    () => !this._isCellHidden() && this._visiblePosition() === this._table._infoColumnCount() - 1,
  );

  /** Peeking or paged off; content and footer cells fade, header cells keep the peek sliver. */
  readonly _isOutsidePage = computed(() => {
    if (!this._table._isOverflowing()) {
      return false;
    }
    const pos = this._visiblePosition();
    const page = this._table._pageIndex();
    return pos < page || pos > page + this._table._visibleColumnCount() - 1;
  });

  readonly _hasPopularAbove = computed(() => {
    const popularCell = this._table._popularCell();
    return (
      this._type() === 'header' &&
      popularCell != null &&
      popularCell.forColumn - 1 === this._indexReactive()
    );
  });

  readonly _headerIds = computed(() => {
    const headerCell = this._table
      ._headerCells()
      .find((cell: NxComparisonTableCell) => cell.index === this._indexReactive());
    let headers = headerCell ? `${headerCell.id}` : '';

    if (this._row.descriptionCell()) {
      headers += ` ${this._row.descriptionCell()!.id}`;
    }

    if (this._toggleSection) {
      headers += ` ${this._toggleSection.toggleSectionHeader().id}`;
    }

    return headers;
  });

  constructor(
    readonly _table: NxComparisonTableBase,
    private readonly _row: NxComparisonTableRowBase,
    @Optional() private readonly _toggleSection: NxToggleSectionBase | null,
  ) {}

  _isSelected(): boolean {
    return this.index !== undefined && this.index === this._table.selectedIndex;
  }

  _selectCell() {
    this._table.selectedIndex = this.index;
  }
}
