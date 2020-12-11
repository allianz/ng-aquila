import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowGroupDirective } from '../comparison-table-row-group.directive';
import { SPACE, ENTER } from '@angular/cdk/keycodes';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

/** @docs-private */
@Component({
  selector: 'nx-comparison-table-desktop-group',
  templateUrl: './desktop-group.component.html',
  styleUrls: ['./desktop-group.component.scss']
})
export class NxComparisonTableDesktopGroup implements AfterViewInit, OnDestroy {

  _expanded: boolean = false;

  @Input() group: NxComparisonTableRowGroupDirective;

  @ViewChild('expansionCell') _expansionCell: ElementRef;

  /** Preserves the current value of the _expansionCell ViewChild in case it changes. */
  private _expansionCellPrevious: ElementRef;

  @Input()
  set isExpanded(value: boolean) {
    this._expanded = coerceBooleanProperty(value);
  }

  get isExpanded() {
    return this._expanded;
  }

  @Output() isExpandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public _table: NxComparisonTableBase,
    private _focusMonitor: FocusMonitor
  ) {}

  ngAfterViewInit() {
    this._updateFocusMonitoring();
    this.group?.rows.changes.subscribe(rows =>
      // timeout is needed here so that the focus monitor is updated after the view was updated
      setTimeout(() => this._updateFocusMonitoring()
    ));
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._expansionCell);
  }

  toggleGroup() {
    this.isExpanded = !this.isExpanded;
    this.isExpandedChange.emit(this.isExpanded);
  }

  _updateFocusMonitoring() {
    if (this._expansionCellPrevious && !this._expansionCell) {
      this._focusMonitor.stopMonitoring(this._expansionCellPrevious);
      this._expansionCellPrevious = this._expansionCell;
    }
    if (!this._expansionCellPrevious && this._expansionCell) {
      this._focusMonitor.monitor(this._expansionCell);
      this._expansionCellPrevious = this._expansionCell;
    }
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
