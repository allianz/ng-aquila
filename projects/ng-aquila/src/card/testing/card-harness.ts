import { AsyncOptionPredicate, BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate, TestElement } from '@angular/cdk/testing';

export interface NxCardHarnessFilters extends BaseHarnessFilters {
    heading?: string | RegExp;
    /** boolean to check for presence, string or RegExp to the highlight's text */
    highlight?: boolean | string | RegExp;
}

export const headingPredicate: AsyncOptionPredicate<NxCardHarness, string | RegExp> = (harness, heading) =>
    HarnessPredicate.stringMatches(harness.getHeadingText(), heading);

export const highlightPredicate: AsyncOptionPredicate<NxCardHarness, boolean | string | RegExp> = async (harness, highlight) => {
    const highlightEl = await harness.getHighlight();
    if (typeof highlight === 'boolean') {
        return !!highlightEl === highlight;
    }
    return HarnessPredicate.stringMatches(highlightEl && highlightEl.text(), highlight);
};

export class NxCardHarness extends ContentContainerComponentHarness {
    static hostSelector = 'nx-card';

    static with(options: NxCardHarnessFilters = {}) {
        return new HarnessPredicate(NxCardHarness, options)
            .addOption('heading', options.heading, headingPredicate)
            .addOption('highlight', options.highlight, highlightPredicate);
    }

    protected _heading = this.locatorFor('h1, h2, h3, h4, h5, h6, [role="heading"]');
    protected _highlight = this.locatorForOptional('.nx-card-highlight');

    /**
     * Get the text of the first heading element within the Card
     *
     * Can be an HTML h* element or an element with role="heading"
     */
    async getHeadingText(): Promise<string> {
        const heading = await this._heading();
        return heading.text().then(t => t.trim());
    }

    /**
     * Find the highlight element within the card
     */
    async getHighlight(): Promise<TestElement | null> {
        return this._highlight();
    }
}
