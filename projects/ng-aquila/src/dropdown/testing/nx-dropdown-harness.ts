import { type BaseHarnessFilters, HarnessPredicate, parallel, TestKey } from '@angular/cdk/testing';
import { NxFormfieldControlHarness } from '@aposin/ng-aquila/formfield/testing/control';

import { NxDropdownGroupHarness, NxDropdownGroupHarnessFilters } from './nx-dropdown-group-harness';
import { NxDropdownItemFilters, NxDropdownItemHarness } from './nx-dropdown-item-harness';

export interface NxDropdownFilters extends BaseHarnessFilters {
    /** Text is either the placeholder, or the currently selected value */
    valueText?: string | RegExp;
    readonly?: boolean;
    disabled?: boolean;
}

export class NxDropdownHarness extends NxFormfieldControlHarness {
    static hostSelector = 'nx-dropdown';

    static with(options: NxDropdownFilters = {}) {
        return new HarnessPredicate(NxDropdownHarness, options)
            .addOption('valueText', options.valueText, (harness, text) => HarnessPredicate.stringMatches(harness.getValueText(), text))
            .addOption('readonly', options.readonly, async (harness, readonly) => (await harness.isReadonly()) === readonly)
            .addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled);
    }

    private documentRootLocator = this.documentRootLocatorFactory();
    private _panelBodyQuery = `.nx-dropdown__panel-body`;
    private _valueText = this.locatorFor('.nx-dropdown__rendered');
    private _trigger = this.locatorFor('.nx-dropdown__container');
    private _filter = this.documentRootLocator.locatorFor(`.nx-dropdown__filter-input`);

    /** Get the current value text when dropdown is not empty */
    async getValueText(): Promise<string> {
        return (await this._valueText()).text();
    }

    async isDisabled(): Promise<boolean> {
        return (await this.host()).hasClass('nx-dropdown--disabled');
    }

    async isReadonly(): Promise<boolean> {
        return (await this.host()).hasClass('is-readonly');
    }

    async focus(): Promise<void> {
        return (await this.host()).focus();
    }

    async blur(): Promise<void> {
        return (await this.host()).blur();
    }

    async isFocused(): Promise<boolean> {
        return (await this.host()).isFocused();
    }

    async isEmpty(): Promise<boolean> {
        return (await (await this.host()).hasClass('is-filled')) === false;
    }

    async isOpen(): Promise<boolean> {
        return !!(await this.documentRootLocator.locatorForOptional(this._panelBodyQuery)());
    }

    async open(): Promise<void> {
        if (!(await this.isOpen())) {
            (await this._trigger()).click();
            await this.waitForTasksOutsideAngular();
        }
    }

    /** Close the dropdown if it is opened */
    async close(): Promise<void> {
        if (await this.isOpen()) {
            return (await this.host()).sendKeys(TestKey.ESCAPE);
        }
    }

    /** Get items inside the dropdown panel. Only returns items when the panel body is opened */
    async getItems(filter?: Omit<NxDropdownItemFilters, 'ancestor'>): Promise<NxDropdownItemHarness[]> {
        return this.documentRootLocator.locatorForAll(
            // There is currently no way to specifically get this dropdown's panel body, so multiple instances of the dropdown harness could
            NxDropdownItemHarness.with({ ...(filter ?? {}), ancestor: '.nx-dropdown__panel-body' }),
        )();
    }

    async getGroups(filter?: Omit<NxDropdownGroupHarnessFilters, 'ancestor'>): Promise<NxDropdownGroupHarness[]> {
        return this.documentRootLocator.locatorForAll(
            // There is currently no way to specifically get this dropdown's panel body, so multiple instances of the dropdown harness could
            NxDropdownGroupHarness.with({ ...(filter ?? {}), ancestor: '.nx-dropdown__panel-body' }),
        )();
    }

    /** Open the dropdown and click the first item matching the filter */
    async clickItem(filter?: NxDropdownItemFilters): Promise<void> {
        await this.open();
        const items = await this.documentRootLocator.locatorForAll(
            // There is currently no way to specifically get this dropdown's panel body, but per implementation there should only be one in total
            NxDropdownItemHarness.with({ ...(filter ?? {}), ancestor: '.nx-dropdown__panel-body' }),
        )();

        if (items.length === 0) {
            const unfilteredItems = await this.getItems();
            const unfilteredItemTexts = (await parallel(() => unfilteredItems.map(o => o.getText()))).join(', ');
            throw Error(`Select does not have options matching the specified filter, available items: ${unfilteredItemTexts}.`);
        }

        await items[0].click();
        // Wait for focus to be restored to dropdown host after select
        // This is necessary as long as setTimeout is used in the implementation
        await this.waitForTasksOutsideAngular();
        await this.forceStabilize();
    }

    /** Get whether the dropdown has a filter input. The dropdown panel must be open */
    async hasFilter(): Promise<boolean> {
        return !!(await this._filter());
    }

    /** Get the current filter value. The dropdown panel must be open */
    async getFilterValue(): Promise<string> {
        const filter = await this._filter();
        return (await filter.getProperty('value')) ?? '';
    }

    /** Set the filter value. The dropdown panel must be open */
    async setFilterValue(value: string): Promise<void> {
        const filter = await this._filter();
        await filter.clear();

        if (value.length > 0) {
            await filter.sendKeys(value);
        }
    }
}
