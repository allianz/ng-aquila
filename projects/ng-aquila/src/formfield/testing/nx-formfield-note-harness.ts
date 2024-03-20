import { BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

export interface NxFormfieldNoteHarnessFilters extends BaseHarnessFilters {
    text?: string | RegExp;
}

export class NxFormfieldNoteHarness extends ContentContainerComponentHarness {
    static hostSelector = '[nxformfieldnote]';

    static with(options: NxFormfieldNoteHarnessFilters = {}): HarnessPredicate<NxFormfieldNoteHarness> {
        return new HarnessPredicate(NxFormfieldNoteHarness, options).addOption('text', options.text, (harness, label) =>
            HarnessPredicate.stringMatches(harness.getText(), label),
        );
    }

    async getText() {
        const host = await this.host();
        return (await host.text())?.trim();
    }
}
