import { contentChild, contentChildren, Directive, Input, signal } from '@angular/core';

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
    this._isExpanded.set(value);
  }
  get isExpanded(): boolean {
    return this._isExpanded();
  }
  private readonly _isExpanded = signal(true);
}
