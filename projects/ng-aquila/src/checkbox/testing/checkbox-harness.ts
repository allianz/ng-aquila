import { type BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

export interface NxCheckboxHarnessFilters extends BaseHarnessFilters {
    label?: string | RegExp;
    checked?: boolean;
}

export class NxCheckboxHarness extends ComponentHarness {
    static hostSelector = 'nx-checkbox';

    private _input = this.locatorFor('input');
    private _getCheckmark = this.locatorForOptional('label nx-icon[name=check]');

    static with(options: NxCheckboxHarnessFilters = {}) {
        return new HarnessPredicate(NxCheckboxHarness, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabel(), label))
            .addOption('checked', options.checked, async (harness, checked) => (await harness.isChecked()) === checked);
    }

    async getLabel(): Promise<string> {
        return (await this.host()).text();
    }

    async click(): Promise<void> {
        const input = await this._input();
        return input.click();
    }

    async isChecked(): Promise<boolean> {
        const checkmark = await this._getCheckmark();
        return !!checkmark;
    }
}
