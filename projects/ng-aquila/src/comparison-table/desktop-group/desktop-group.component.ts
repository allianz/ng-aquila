import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowGroupDirective } from '../comparison-table-row-group.directive';
import { SPACE, ENTER } from '@angular/cdk/keycodes';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';

/** @docs-private */
@Component({
  selector: 'nx-comparison-table-desktop-group',
  templateUrl: './desktop-group.component.html',
  styleUrls: ['./desktop-group.component.scss']
})
export class NxComparisonTableDesktopGroup {

  _expanded: boolean = false;

  @Input() group: NxComparisonTableRowGroupDirective;

  @Input()
  set isExpanded(value: boolean) {
    this._expanded = coerceBooleanProperty(value);
  }

  get isExpanded() {
    return this._expanded;
  }

  @Output() isExpandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public _table: NxComparisonTableBase
  ) {}

  toggleGroup() {
    this.isExpanded = !this.isExpanded;
    this.isExpandedChange.emit(this.isExpanded);
  }

  _onKeydown(event: KeyboardEvent) {
    if (event.keyCode === ENTER) {
      this.toggleGroup();
    } else if (event.keyCode === SPACE) {
      this.toggleGroup();
      event.preventDefault();   // prevent from scrolling
    }
  }

  getOpenState() {
    return this._expanded ? 'open' : 'closed';
  }

  static ngAcceptInputType_isExpanded: BooleanInput;
}
