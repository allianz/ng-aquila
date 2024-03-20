import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

export interface NxDropdownItemFilters extends BaseHarnessFilters {
    text?: string | RegExp;
    isSelected?: boolean;
}

export class NxDropdownItemHarness extends ComponentHarness {
    static hostSelector = 'nx-dropdown-item';

    static with(options: NxDropdownItemFilters = {}) {
        return new HarnessPredicate(NxDropdownItemHarness, options)
            .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
            .addOption('isSelected', options.isSelected, async (harness, isSelected) => (await harness.isSelected()) === isSelected);
    }

    /** Click the option */
    async click(): Promise<void> {
        return (await this.host()).click();
    }

    /** Get the option's label text */
    async getText(): Promise<string> {
        return (await this.host()).text();
    }

    /** Get whether the option is disabled */
    async isDisabled(): Promise<boolean> {
        return (await this.host()).hasClass('nx-dropdown-item--disabled');
    }

    /** Get whether the option is selected */
    async isSelected(): Promise<boolean> {
        return (await this.host()).hasClass('nx-selected');
    }

    /** Get whether the option is active */
    async isActive(): Promise<boolean> {
        return (await this.host()).hasClass('nx-dropdown-item--active');
    }

    /** Get whether the option is in multiselect mode */
    async isMultiple(): Promise<boolean> {
        return (await this.host()).hasClass('nx-multiselect');
    }
}
