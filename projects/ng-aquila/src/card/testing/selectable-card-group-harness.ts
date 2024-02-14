import { ComponentHarness } from '@angular/cdk/testing';

import { NxSelectableCardHarness, NxSelectableCardHarnessFilters } from './selectable-card-harness';

export class NxSelectableCardGroupHarness extends ComponentHarness {
    static hostSelector = 'nx-selectable-card-group';

    private _error = this.locatorForOptional('nx-error');

    async getCards(filter?: NxSelectableCardHarnessFilters): Promise<NxSelectableCardHarness[]> {
        return this.locatorForAll(NxSelectableCardHarness.with(filter))();
    }

    async getErrorText(): Promise<string | null> {
        const error = await this._error();
        if (!error) {
            return null;
        }
        return (await error.text()).trim();
    }
}
