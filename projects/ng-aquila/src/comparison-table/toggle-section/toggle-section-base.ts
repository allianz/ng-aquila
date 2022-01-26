import { Directive } from '@angular/core';

import { NxToggleSectionHeaderComponent } from './toggle-section-header.component';

/** @docs-private */
@Directive()
export abstract class NxToggleSectionBase {
    /** Whether the toggle section is expanded. */
    abstract isExpanded: boolean;

    toggleSectionHeader!: NxToggleSectionHeaderComponent;
    /** @docs-private */
    abstract _numberOfRows(): number;

    /** Toggles the toggle section. */
    toggleExpanded() {
        this.isExpanded = !this.isExpanded;
    }

    /** @docs-private */
    getOpenState() {
        return this.isExpanded ? 'open' : 'closed';
    }
}
