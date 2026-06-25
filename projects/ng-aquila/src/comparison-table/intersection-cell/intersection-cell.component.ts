import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, Optional, TemplateRef, ViewChild } from '@angular/core';

import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowBase } from '../comparison-table-row-base';
import { NxToggleSectionBase } from '../toggle-section/toggle-section-base';

@Component({
  selector: 'nx-comparison-table-intersection-cell',
  templateUrl: './intersection-cell.component.html',
  styleUrls: ['./intersection-cell.component.scss'],
  imports: [NgTemplateOutlet],
})
export class NxComparisonTableIntersectionCell {
  @ViewChild('content', { static: true }) _content!: TemplateRef<any>;

  readonly _headerIds = computed(() => {
    let headers = '';

    if (this._toggleSection) {
      headers += this._toggleSection.toggleSectionHeader().id;
    }

    if (this._row.descriptionCell()) {
      headers += ' ' + this._row.descriptionCell()!.id;
    }

    return headers;
  });

  /** Rows the intersection cell spans in the transposed mobile table; +1 for the popular row. */
  readonly _mobileRowspan = computed(() =>
    this._table._popularCell()
      ? this._table._infoColumnCount() + 1
      : this._table._infoColumnCount(),
  );

  /** Number of (product) columns the intersection cell spans in the desktop/tablet table. */
  readonly _intersectionColspan = computed(() => this._table._infoColumnCount());

  constructor(
    readonly _table: NxComparisonTableBase,
    readonly _row: NxComparisonTableRowBase,
    @Optional() readonly _toggleSection: NxToggleSectionBase | null,
  ) {}
}
