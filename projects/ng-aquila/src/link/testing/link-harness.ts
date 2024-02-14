import { type BaseHarnessFilters, ComponentHarness, HarnessPredicate, TestElement } from '@angular/cdk/testing';

export interface NxLinkHarnessFilters extends BaseHarnessFilters {
    text?: string | RegExp;
}

export class NxLinkHarness extends ComponentHarness {
    static hostSelector = 'nx-link';

    private _anchor = this.locatorFor('a');

    static with(options: NxLinkHarnessFilters = {}) {
        return new HarnessPredicate(NxLinkHarness, options).addOption('text', options.text, (harness, text) =>
            HarnessPredicate.stringMatches(harness.getText(), text),
        );
    }

    async getAnchor(): Promise<TestElement> {
        return this._anchor();
    }

    async getText(): Promise<string> {
        return (await this.host()).text();
    }

    async click(): Promise<void> {
        const anchor = await this._anchor();
        return anchor.click();
    }
}
