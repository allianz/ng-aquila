import { NxIconModule } from '@allianz/ng-aquila/icon';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';

import { NxComparisonTableBase } from '../comparison-table-base';
import { NxToggleSectionBase } from './toggle-section-base';

@Component({
  selector: 'nx-comparison-table-toggle-section-header',
  templateUrl: './toggle-section-header.component.html',
  styleUrls: ['./toggle-section-header.component.scss'],
  imports: [NgTemplateOutlet, NxIconModule, NgClass],
})
export class NxToggleSectionHeaderComponent {
  @ViewChild('content', { static: true }) _content!: TemplateRef<any>;

  /** Sets the id of the toggle section header. */
  @Input() set id(value: string) {
    if (this._id !== value) {
      this._id = value;
    }
  }
  get id(): string {
    return this._id;
  }
  private _id = inject(IdGenerationService).nextId('nx-comparison-table-toggle-section-header');

  protected _chevronClass(): string {
    return this._toggleSection.isExpanded ? 'open' : '';
  }

  constructor(
    readonly _table: NxComparisonTableBase,
    readonly _toggleSection: NxToggleSectionBase,
  ) {}

  /** Toggles the toggle section. */
  toggle() {
    if (this._table.viewType !== 'mobile') {
      this._toggleSection.toggleExpanded();
    }
  }

  _onKeydown($event: KeyboardEvent) {
    if ($event && ($event.key === 'Enter' || $event.key === ' ')) {
      this.toggle();

      // prevent page from scrolling down
      if ($event.key === ' ') {
        $event.preventDefault();
      }
    }
  }
}
