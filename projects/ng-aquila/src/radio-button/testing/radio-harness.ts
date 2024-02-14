import { type BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

export interface NxRadioHarnessFilters extends BaseHarnessFilters {
    label?: string | RegExp;
    enabled?: boolean;
    checked?: boolean;
}

export class NxRadioHarness extends ComponentHarness {
    static hostSelector = 'nx-radio';

    private _input = this.locatorFor('input');
    private _label = this.locatorFor('label');
    private _dot = this.locatorForOptional('label .nx-radio__dot');

    static with(options: NxRadioHarnessFilters = {}): HarnessPredicate<NxRadioHarness> {
        return new HarnessPredicate(NxRadioHarness, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabel(), label))
            .addOption('checked', options.checked, async (harness, checked) => (await harness.isChecked()) === checked)
            .addOption('enabled', options.enabled, async (harness, enabled) => (await harness.isDisabled()) !== enabled);
    }

    private async _getTextLabel(): Promise<string> {
        const label = await this._label();
        return (await label.text()).trim();
    }

    async getLabel(): Promise<string> {
        return this._getTextLabel();
    }

    async isChecked() {
        const dot = await this._dot();
        return !!dot;
    }

    async isDisabled(): Promise<boolean> {
        const input = await this._input();
        return input.getProperty('disabled');
    }

    async click() {
        const input = await this._input();
        return input.click();
    }
}
