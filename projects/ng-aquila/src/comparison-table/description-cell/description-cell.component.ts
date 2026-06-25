import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';

import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowBase } from '../comparison-table-row-base';

@Component({
  selector: 'nx-comparison-table-description-cell',
  templateUrl: './description-cell.component.html',
  styleUrls: ['./description-cell.component.scss'],
  imports: [NgTemplateOutlet],
})
export class NxComparisonTableDescriptionCell {
  @ViewChild('content', { static: true }) _content!: TemplateRef<any>;

  /** Sets the Id of the description cell. */
  @Input() set id(value: string) {
    if (this._id !== value) {
      this._id = value;
    }
  }
  get id(): string {
    return this._id;
  }
  private _id = inject(IdGenerationService).nextId('nx-comparison-table-description-cell');

  constructor(
    readonly _table: NxComparisonTableBase,
    readonly _row: NxComparisonTableRowBase,
  ) {
    if (this._row.type === 'header' || this._row.type === 'footer') {
      console.warn(
        '`nxComparisonTableRow` should not contain a `nx-comparison-table-description-cell` for type === "header" or type === "footer".',
      );
    }
  }
}
