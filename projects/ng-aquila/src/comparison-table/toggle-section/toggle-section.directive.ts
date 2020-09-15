import { Directive, ContentChildren, QueryList, ContentChild, AfterContentInit, Input } from '@angular/core';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxToggleSectionHeaderComponent } from './toggle-section-header.component';
import { NxTableContentElement } from '../table-content-element.directive';
import { NxToggleSectionBase } from './toggle-section-base';

@Directive({
  selector: '[nxComparisonTableToggleSection]',
  providers: [
    { provide: NxTableContentElement, useExisting: NxToggleSectionDirective },
    { provide: NxToggleSectionBase, useExisting: NxToggleSectionDirective }
  ],
})
export class NxToggleSectionDirective extends NxToggleSectionBase implements NxTableContentElement {

  /** @docs-private */
  @ContentChild(NxToggleSectionHeaderComponent, { static: false }) toggleSectionHeader: NxToggleSectionHeaderComponent;

  /** @docs-private */
  @ContentChildren(NxTableContentElement) rows: QueryList<NxTableContentElement>;

  private _isExpanded: boolean = true;

  /** Whether the toggle section is expanded. Default: true. */
  @Input()
  set isExpanded(value: boolean) {
    if (this._isExpanded !== value) {
      this._isExpanded = value;
    }
  }
  get isExpanded(): boolean {
    return this._isExpanded;
  }

  _numberOfRows(): number {
    return this.rows.filter(row => row instanceof NxComparisonTableRowDirective).length;
  }
}
