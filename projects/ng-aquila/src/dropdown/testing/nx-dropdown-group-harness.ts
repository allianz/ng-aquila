import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

import { NxDropdownItemFilters, NxDropdownItemHarness } from './nx-dropdown-item-harness';

export interface NxDropdownGroupHarnessFilters extends BaseHarnessFilters {
    label?: string | RegExp;
}

export class NxDropdownGroupHarness extends ComponentHarness {
    static hostSelector = 'nx-dropdown-group';

    static with(options: NxDropdownGroupHarnessFilters = {}) {
        return new HarnessPredicate(NxDropdownGroupHarness, options).addOption('label', options.label, (harness, label) =>
            HarnessPredicate.stringMatches(harness.getLabel(), label),
        );
    }

    private _label = this.locatorFor('.nx-dropdown-results__group-label');

    async getLabel(): Promise<string> {
        return (await this._label()).text();
    }

    async getItems(filter?: NxDropdownItemFilters): Promise<NxDropdownItemHarness[]> {
        return this.locatorForAll(NxDropdownItemHarness.with(filter))();
    }
}
