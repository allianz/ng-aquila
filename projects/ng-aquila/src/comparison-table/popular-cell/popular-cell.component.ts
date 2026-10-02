import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import {
  NX_SURFACE,
  NxResolvedSurface,
  NxSurfaceAccentColor,
  NxSurfaceContext,
  NxSurfaceType,
} from '@allianz/ng-aquila/surface';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  input,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowBase } from '../comparison-table-row-base';

@Component({
  selector: 'nx-comparison-table-popular-cell',
  styleUrls: ['./popular-cell.component.scss'],
  templateUrl: './popular-cell.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: NX_SURFACE, useExisting: NxComparisonTablePopularCell }],
  imports: [NgTemplateOutlet],
})
export class NxComparisonTablePopularCell implements NxSurfaceContext {
  @ViewChild('content', { static: true }) _content!: TemplateRef<any>;

  /** Sets the Id of the popular cell. */
  @Input() set id(value: string) {
    if (this._id !== value) {
      this._id = value;
    }
  }
  get id(): string {
    return this._id;
  }
  private _id = inject(IdGenerationService).nextId('nx-comparison-table-popular-cell');
  /**
   * Sets the id of the column above which the popular cell should be displayed.
   *
   * Note: counting starts from 1. If set to 1 the popular cell will appear above the first header column of the table.
   */
  @Input() set forColumn(value: NumberInput) {
    const newValue = coerceNumberProperty(value);
    if (this._forColumn !== newValue) {
      this._forColumn = newValue;
    }
  }
  get forColumn(): number {
    return this._forColumn!;
  }
  private _forColumn?: number;

  /**
   * Accent hue of the popular cell. Independent of the table's `accentColor` - the
   * popular cell is always an accent surface and can use a different hue than the
   * header it sits above. Only takes effect in the Allianz One design.
   */
  readonly accentColor = input<NxSurfaceAccentColor>('purple');

  private readonly _allianzOneOptions = inject<AllianzOneOptions>(ALLIANZ_ONE, { optional: true });

  /**
   * The popular cell is always an accent surface - it has no plain, attention or
   * emphasis variant, only a hue.
   * @docs-private
   */
  readonly surface = computed<NxSurfaceType>(() =>
    this._allianzOneOptions?.enabled?.() ? 'accent-attention' : 'default',
  );

  /** What the popular cell publishes to its projected label via `NX_SURFACE`. @docs-private */
  readonly resolved = computed<NxResolvedSurface>(() => {
    const surface = this.surface();
    return surface === 'accent-attention'
      ? { surface, accentColor: this.accentColor() }
      : { surface };
  });

  constructor(
    readonly _table: NxComparisonTableBase,
    readonly _row: NxComparisonTableRowBase,
  ) {
    if (this._row.type !== 'header') {
      console.warn('A popular cell should be only in a header row.');
    }
  }
}
