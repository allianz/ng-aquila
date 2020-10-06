import { Component, Input } from '@angular/core';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxComparisonTableBase } from '../comparison-table-base';
import { Platform } from '@angular/cdk/platform';

/** @docs-private */
@Component({
  selector: 'nx-comparison-table-flex-row',
  templateUrl: './flex-row.component.html',
  styleUrls: ['./flex-row.component.scss'],
  host: {
    '[class.is-header-row]': 'row.type === "header"',
    '[class.is-footer-row]': 'row.type === "footer"',
    '[class.is-content-row]': 'row.type === "content"',
    '[class.has-intersection]': 'row.intersectionCell',
    '[class.is-sticky]': '_isSticky()'
  }
})
export class NxComparisonTableFlexRow {

  @Input() row: NxComparisonTableRowDirective;

  constructor(
    public _table: NxComparisonTableBase,
    private _platform: Platform
  ) {}

  _isSticky(): boolean {
    // showing the background color on the placeholder cell is buggy on safari,
    // therefore this is disabled for Safari.
    return !this._platform.SAFARI;
  }
}
