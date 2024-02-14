import { BaseHarnessFilters, ComponentHarness, ComponentHarnessConstructor, HarnessPredicate } from '@angular/cdk/testing';

import { NxRadioHarness, type NxRadioHarnessFilters } from './radio-harness';

export interface NxRadioGroupHarnessFilters extends BaseHarnessFilters {
    label?: string | RegExp;
}

export class NxRadioGroupHarness extends ComponentHarness {
    static hostSelector = 'nx-radio-group';

    static with<T extends NxRadioGroupHarness>(this: ComponentHarnessConstructor<T>, options: NxRadioGroupHarnessFilters = {}) {
        return new HarnessPredicate<NxRadioGroupHarness>(this, options).addOption('text', options.label, (harness, label) =>
            HarnessPredicate.stringMatches(harness.getLabel(), label),
        );
    }

    private _selectedRadio = this.locatorForOptional(NxRadioHarness.with({ checked: true }));

    async getRadioButtons(filter?: NxRadioHarnessFilters): Promise<NxRadioHarness[]> {
        return this.locatorForAll(NxRadioHarness.with(filter))();
    }

    async getSelectedRadio(): Promise<NxRadioHarness | null> {
        return this._selectedRadio();
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
