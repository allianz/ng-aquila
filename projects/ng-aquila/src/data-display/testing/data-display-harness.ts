import { type BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

export interface NxDataDisplayHarnessFilters extends BaseHarnessFilters {
    label?: string | RegExp;
    value?: string | RegExp;
}

export class NxDataDisplayHarness extends ContentContainerComponentHarness {
    static hostSelector = 'nx-data-display';

    private _getLabel = this.locatorFor('nx-data-display-label');
    private _getValue = this.locatorFor('.nx-data-display__value');

    static with(options: NxDataDisplayHarnessFilters = {}) {
        return new HarnessPredicate(NxDataDisplayHarness, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabel(), label))
            .addOption('value', options.value, (harness, value) => HarnessPredicate.stringMatches(harness.getValue(), value));
    }

    async getLabel(): Promise<string> {
        return (await this._getLabel()).text();
    }

    async getValue(): Promise<string> {
        return (await this._getValue()).text();
    }
}
