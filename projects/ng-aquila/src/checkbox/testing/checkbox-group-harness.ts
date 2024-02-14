import { BaseHarnessFilters, ComponentHarness, ComponentHarnessConstructor, HarnessPredicate } from '@angular/cdk/testing';

import { NxCheckboxHarness, type NxCheckboxHarnessFilters } from './checkbox-harness';

export interface NxCheckboxGroupHarnessFilters extends BaseHarnessFilters {
    label?: string | RegExp;
}

export class NxCheckboxGroupHarness extends ComponentHarness {
    static hostSelector = 'nx-checkbox-group';

    static with<T extends NxCheckboxGroupHarness>(this: ComponentHarnessConstructor<T>, options: NxCheckboxGroupHarnessFilters = {}) {
        return new HarnessPredicate<NxCheckboxGroupHarness>(this, options).addOption('text', options.label, (harness, label) =>
            HarnessPredicate.stringMatches(harness.getLabel(), label),
        );
    }

    private _checked = this.locatorForAll(NxCheckboxHarness.with({ checked: true }));

    async getCheckboxes(filter?: NxCheckboxHarnessFilters): Promise<NxCheckboxHarness[]> {
        return this.locatorForAll(NxCheckboxHarness.with(filter))();
    }

    async getSelectedCheckboxes(): Promise<NxCheckboxHarness[]> {
        return this._checked();
    }

    async getLabel(): Promise<string | null> {
        const host = await this.host();
        const labelledBy = await host.getAttribute('aria-labelledby');
        if (labelledBy) {
            const labelEl = await this.locatorFor(`label[id=${labelledBy}]`)();
            const labelText = await labelEl.text();
            return labelText.trim();
        }
        return host.getAttribute('aria-label');
    }
}
