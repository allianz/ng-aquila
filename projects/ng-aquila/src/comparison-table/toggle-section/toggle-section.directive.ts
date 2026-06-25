import { computed, contentChild, contentChildren, Directive, Input } from '@angular/core';

import { NxTableContentElement } from '../table-content-element.directive';
import { NxToggleSectionBase } from './toggle-section-base';
import { NxToggleSectionHeaderComponent } from './toggle-section-header.component';

@Directive({
  selector: '[nxComparisonTableToggleSection]',
  providers: [
    { provide: NxTableContentElement, useExisting: NxToggleSectionDirective },
    { provide: NxToggleSectionBase, useExisting: NxToggleSectionDirective },
  ],
  standalone: true,
})
export class NxToggleSectionDirective extends NxToggleSectionBase implements NxTableContentElement {
  readonly kind = 'toggleSection';

  /** @docs-private */
  readonly toggleSectionHeader = contentChild.required(NxToggleSectionHeaderComponent);

  /** @docs-private */
  readonly rows = contentChildren(NxTableContentElement);

  /** Whether the toggle section is expanded. Default: true. */
  @Input() set isExpanded(value: boolean) {
    if (this._isExpanded !== value) {
      this._isExpanded = value;
    }
  }
  get isExpanded(): boolean {
    return this._isExpanded;
  }
  private _isExpanded = true;

  readonly _numberOfRows = computed(() => this.rows().filter((row) => row.kind === 'row').length);
}
