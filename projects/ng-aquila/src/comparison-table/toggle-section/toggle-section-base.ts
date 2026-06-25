import { Directive, Signal } from '@angular/core';

import { NxToggleSectionHeaderComponent } from './toggle-section-header.component';

/** @docs-private */
@Directive({ standalone: true })
export abstract class NxToggleSectionBase {
  /** Whether the toggle section is expanded. */
  abstract isExpanded: boolean;

  abstract readonly toggleSectionHeader: Signal<NxToggleSectionHeaderComponent>;
  /** @docs-private */
  abstract readonly _numberOfRows: Signal<number>;

  /** Toggles the toggle section. */
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  /** @docs-private */
  getOpenState() {
    return this.isExpanded ? 'open' : 'closed';
  }
}
