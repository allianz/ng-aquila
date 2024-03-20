import { BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

export interface NxFormfieldErrorHarnessFilters extends BaseHarnessFilters {
    text?: string | RegExp;
}

export class NxFormfieldErrorHarness extends ContentContainerComponentHarness {
    static hostSelector = 'nx-error';

    static with(options: NxFormfieldErrorHarnessFilters = {}): HarnessPredicate<NxFormfieldErrorHarness> {
        return new HarnessPredicate(NxFormfieldErrorHarness, options).addOption('text', options.text, (harness, label) =>
            HarnessPredicate.stringMatches(harness.getText(), label),
        );
    }

    async getText() {
        const host = await this.host();
        return (await host.text())?.trim();
    }
}
