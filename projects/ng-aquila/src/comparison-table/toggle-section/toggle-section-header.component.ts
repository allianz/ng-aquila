import { Component, ViewChild, TemplateRef, Input, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { NxComparisonTableBase } from '../comparison-table-base';
import { NxToggleSectionBase } from './toggle-section-base';
import { NxToggleSectionAnimations } from './toggle-section-animations';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { FocusMonitor } from '@angular/cdk/a11y';

let nextId = 0;

@Component({
  selector: 'nx-comparison-table-toggle-section-header',
  templateUrl: './toggle-section-header.component.html',
  styleUrls: ['./toggle-section-header.component.scss'],
  animations: [ NxToggleSectionAnimations.indicatorRotate ]
})
export class NxToggleSectionHeaderComponent implements AfterViewInit, OnDestroy {

  @ViewChild('content', { static: true }) _content: TemplateRef<any>;
  @ViewChild('mobileCell') _mobileCell: ElementRef;

  @ViewChild('wrapper') _wrapperElement: ElementRef;

  /** Preserves the current value of the _wrapperElement ViewChild in case it changes. */
  private _wrapperElementPrevious: ElementRef;

  private _id = `nx-comparison-table-toggle-section-header-${nextId++}`;

  /** Sets the id of the toggle section header. */
  @Input()
  set id(value: string) {
    if (this._id !== value) {
      this._id = value;
    }
  }
  get id(): string {
    return this._id;
  }

  constructor(
    public _table: NxComparisonTableBase,
    public _toggleSection: NxToggleSectionBase,
    private _focusMonitor: FocusMonitor
  ) {
    this._table.viewTypeChange.subscribe(viewType => {
      // timeout is needed here so that the focus monitor is updated after the view was updated
      setTimeout(() => {
        this._updateFocusMonitoring();
      });
    });
  }

  ngAfterViewInit() {
    // timeout is needed here so that the focus monitor is updated after the view was updated
    setTimeout(() => this._updateFocusMonitoring());
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._wrapperElement);
  }

  private _updateFocusMonitoring() {
    if (this._wrapperElementPrevious && !this._wrapperElement) {
      this._focusMonitor.stopMonitoring(this._wrapperElementPrevious);
      this._wrapperElementPrevious = this._wrapperElement;
    }
    if (!this._wrapperElementPrevious && this._wrapperElement) {
      this._focusMonitor.monitor(this._wrapperElement);
      this._wrapperElementPrevious = this._wrapperElement;
    }
  }

  /** Toggles the toggle section. */
  toggle() {
    if (this._table.viewType !== 'mobile') {
      this._toggleSection.toggleExpanded();
    }
  }

  _onKeydown($event) {
    if ($event && ($event.keyCode === ENTER || $event.keyCode === SPACE)) {
      this.toggle();

      // prevent page from scrolling down
      if ($event.keyCode === SPACE) {
        $event.preventDefault();
      }
    }
  }

  _getMobileClipPathInset(): string {
    if (this._mobileCell) {
      const cellRect = this._mobileCell.nativeElement.getBoundingClientRect();
      return this._table._getMobileClipPathInset(cellRect);
    }
    return '0';
  }
}
