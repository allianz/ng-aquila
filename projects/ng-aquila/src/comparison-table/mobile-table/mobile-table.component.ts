import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';

import { NxComparisonTableBase } from '../comparison-table-base';
import { setStyleVarIfChanged } from '../comparison-table-dom';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxToggleSectionDirective } from '../toggle-section/toggle-section.directive';

/**
 * Consecutive content rows that become columns of the transposed table: one top-level row, or all
 * rows of a toggle section (row groups included; mobile has no row-group collapse).
 */
export interface NxComparisonTableMobileColumnGroup {
  readonly key: NxComparisonTableRowDirective | NxToggleSectionDirective;
  readonly section: NxToggleSectionDirective | null;
  /** Whether a spacer column precedes the rows. */
  readonly spacer: boolean;
  readonly rows: readonly NxComparisonTableRowDirective[];
}

/** Legacy mobile cells that scroll under the sticky first column. */
const CLIP_SELECTOR =
  '.nx-comparison-table__description-cell, .nx-comparison-table__mobile-toggle-section-header, .needs-clipping';

/** The rows holding those cells; a scroll writes only on them. */
const CLIP_ROW_SELECTOR =
  '.nx-comparison-table__toggle-section-header-row, .nx-comparison-table__description-row';

/**
 * The legacy mobile view: the table transposed, products as rows. Its scroller is the
 * `nx-comparison-table` host, which decides when to measure.
 * @docs-private
 */
@Component({
  selector: 'table[nxComparisonTableMobile]',
  templateUrl: './mobile-table.component.html',
  styleUrls: ['./mobile-table.component.scss'],
  // The template reads plain `@Input` state of the table's parts, e.g. the popular cell's `forColumn`.
  changeDetection: ChangeDetectionStrategy.Eager,
  host: { class: 'nx-comparison-table__mobile-view' },
  imports: [NgTemplateOutlet],
})
export class NxComparisonTableMobileComponent {
  readonly columns = input.required<readonly NxComparisonTableMobileColumnGroup[]>();

  protected readonly _table = inject(NxComparisonTableBase);
  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _stickyCell = viewChild.required<ElementRef<HTMLElement>>('stickyCell');

  protected readonly _hasToggleSection = computed(() =>
    this.columns().some((column) => column.section),
  );

  // Columns are content-sized, so each clipped cell's start is measured on layout, not per scroll.
  private _stickyWidth = 0;
  private _clipRows: HTMLElement[] = [];

  /** All layout reads come before the writes. */
  _measure(scroller: HTMLElement, rtl: boolean): void {
    const table = this._element.nativeElement;
    const scrollerRect = scroller.getBoundingClientRect();
    const stickyRect = this._stickyCell().nativeElement.getBoundingClientRect();
    const scrollLeft = Math.abs(scroller.scrollLeft);
    this._stickyWidth = rtl
      ? scrollerRect.right - stickyRect.left
      : stickyRect.right - scrollerRect.left;

    const cellStarts: [HTMLElement, number][] = [];
    for (const cell of table.querySelectorAll<HTMLElement>(CLIP_SELECTOR)) {
      const cellRect = cell.getBoundingClientRect();
      const start = rtl
        ? scrollerRect.right - cellRect.right + scrollLeft
        : cellRect.left - scrollerRect.left + scrollLeft;
      cellStarts.push([cell, start]);
    }

    for (const [cell, start] of cellStarts) {
      setStyleVarIfChanged(cell, '--ct-cell-start', `${Math.round(start)}px`);
    }
    this._clipRows = Array.from(table.querySelectorAll<HTMLElement>(CLIP_ROW_SELECTOR));
    this._updateClip(scroller, scrollLeft);
  }

  _updateClip(scroller: HTMLElement, scrollLeft = Math.abs(scroller.scrollLeft)): void {
    const value = `${this._stickyWidth + scrollLeft}px`;
    for (const row of this._clipRows) {
      setStyleVarIfChanged(row, '--ct-clip-istart', value);
    }
  }
}
