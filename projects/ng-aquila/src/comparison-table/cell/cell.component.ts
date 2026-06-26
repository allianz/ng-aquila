import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxRadioIndicatorComponent } from '@allianz/ng-aquila/selection';
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

@Component({
  selector: 'nx-comparison-table-cell',
  styleUrls: ['./cell.component.scss'],
  templateUrl: './cell.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgTemplateOutlet, NxRadioIndicatorComponent],
})
export class NxComparisonTableCell {
  @ViewChild('content', { static: true }) _content!: TemplateRef<any>;

  private readonly _allianzOneOptions = inject<AllianzOneOptions>(ALLIANZ_ONE, { optional: true });
  protected readonly _isA1 = computed(() => this._allianzOneOptions?.enabled?.() ?? false);
  protected readonly _selectButton = contentChild(forwardRef(() => NxComparisonTableSelectButton));
  protected readonly _showRadioIndicator = computed(
    () => this._type === 'header' && this._isA1() && !!this._selectButton(),
  );

  /** @docs-private */
  @Input() set index(newValue: number) {
    const oldIndex = this.index;
    if (oldIndex !== newValue) {
      if (this._disabledColumn) {
        this._table._removeDisabledColumn(oldIndex);
        this._table._addDisabledColumn(newValue);
      }

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
    const newValue = coerceBooleanProperty(value);
    if (this._type === 'header' && newValue !== this.disabledColumn) {
      this._disabledColumn = newValue;
      if (this._disabledColumn) {
        this._table._addDisabledColumn(this.index);
      } else {
        this._table._removeDisabledColumn(this.index);
      }
    }
  }
  get disabledColumn(): boolean {
    return this._disabledColumn;
  }
  private _disabledColumn = false;

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
    if (this._type !== value) {
      this._type = value;
    }
  }
  get type(): NxComparisonTableRowType {
    return this._type;
  }
  private _type: NxComparisonTableRowType = 'content';

  readonly _isCellDisabled = computed(() =>
    this._table._disabledIndexes().has(this._indexReactive()),
  );

  /**
   * The cell's position among the VISIBLE product columns (raw index minus the hidden columns
   * before it). The carousel pages in visible-column space, so the focus auto-pagination keys off
   * this rather than the raw index. Exposed on the cell as `data-ct-col`.
   */
  readonly _visiblePosition = computed(() => {
    const index = this._indexReactive();
    const hiddenBefore = this._table._hiddenIndexes().filter((h: number) => h < index).length;
    return index - hiddenBefore;
  });

  readonly _isFirst = computed(() => this._indexReactive() === 0);

  readonly _isLast = computed(() => this._indexReactive() + 1 === this._table._infoColumnCount());

  readonly _isCellHidden = computed(() =>
    this._table._hiddenIndexes().includes(this._indexReactive()),
  );

  /**
   * Whether this cell's column is OUTSIDE the carousel's current page window — i.e. only partially
   * shown in a peek sliver or fully scrolled off. Mirrors the in-view test the focus
   * auto-pagination uses (`pos` within `[pageIndex, pageIndex + visibleColumnCount - 1]`), keyed off
   * `_visiblePosition()` because the carousel pages in visible-column space. Content/footer cells
   * use this to fade out (header cells keep their peek sliver as the "more columns" affordance), so
   * only fully-visible columns' body content is shown. Always `false` when not overflowing.
   */
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
      this._type === 'header' &&
      popularCell != null &&
      popularCell.forColumn - 1 === this._indexReactive()
    );
  });

  /**
   * Space-separated id list for the cell's `headers=` attribute (header + description +
   * toggle-section ids), associating this cell with its header cells for assistive tech.
   */
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
