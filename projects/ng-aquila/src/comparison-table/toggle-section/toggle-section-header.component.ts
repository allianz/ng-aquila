import { Component, ViewChild, TemplateRef, Input } from '@angular/core';
import { NxComparisonTableBase } from '../comparison-table-base';
import { NxToggleSectionBase } from './toggle-section-base';
import { NxToggleSectionAnimations } from './toggle-section-animations';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

let nextId = 0;

@Component({
  selector: 'nx-comparison-table-toggle-section-header',
  templateUrl: './toggle-section-header.component.html',
  styleUrls: ['./toggle-section-header.component.scss'],
  animations: [ NxToggleSectionAnimations.indicatorRotate ]
})
export class NxToggleSectionHeaderComponent {

  @ViewChild('content', { static: true }) _content: TemplateRef<any>;

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
    public _toggleSection: NxToggleSectionBase
  ) { }

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

  _getColspan() {
    return this._toggleSection._numberOfRows();
  }

}
