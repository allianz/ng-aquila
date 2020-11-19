import { Component, ElementRef, Input } from '@angular/core';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxComparisonTableBase } from '../comparison-table-base';

/** @docs-private */
@Component({
  selector: 'nx-comparison-table-flex-row',
  templateUrl: './flex-row.component.html',
  styleUrls: ['./flex-row.component.scss'],
  host: {
    '[class.is-header-row]': 'row.type === "header"',
    '[class.is-footer-row]': 'row.type === "footer"',
    '[class.is-content-row]': 'row.type === "content"',
    '[class.has-intersection]': 'row.intersectionCell'
  }
})
export class NxComparisonTableFlexRow {

  @Input() row: NxComparisonTableRowDirective;

  constructor(public _table: NxComparisonTableBase, private _elementRef: ElementRef) {}

  get elementRef(): ElementRef {
    return this._elementRef;
  }
}
