import { type BaseHarnessFilters, HarnessPredicate } from '@angular/cdk/testing';
import { NxFormfieldControlHarness } from '@aposin/ng-aquila/formfield/testing/control';

export interface NxInputHarnessFilters extends BaseHarnessFilters {
    value?: string | RegExp;
    placeholder?: string | RegExp;
}

export class NxInputHarness extends NxFormfieldControlHarness {
    static hostSelector = '[nxInput]';

    static with(options: NxInputHarnessFilters = {}): HarnessPredicate<NxInputHarness> {
        return new HarnessPredicate(NxInputHarness, options)
            .addOption('value', options.value, (harness, value) => HarnessPredicate.stringMatches(harness.getValue(), value))
            .addOption('placeholder', options.placeholder, (harness, placeholder) => HarnessPredicate.stringMatches(harness.getPlaceholder(), placeholder));
    }

    async getId(): Promise<string> {
        // An id is automatically provided if none is set explicitly
        return (await this.host()).getProperty<string>('id');
    }

    /**
     * Return the type of input
     *
     * The string 'textarea' is returned for the HTML element textarea
     */
    async getType(): Promise<string> {
        const host = await this.host();
        if (await host.matchesSelector('textarea')) {
            return 'textarea';
        }
        return host.getProperty<string>('type');
    }

    async isDisabled(): Promise<boolean> {
        return (await this.host()).getProperty<boolean>('disabled');
    }

    async isFocused(): Promise<boolean> {
        return (await this.host()).isFocused();
    }

    async focus(): Promise<void> {
        return (await this.host()).focus();
    }

    async blur(): Promise<void> {
        return (await this.host()).blur();
    }

    async getPlaceholder(): Promise<string> {
        return (await this.host()).getProperty<string>('placeholder');
    }

    async getValue(): Promise<string> {
        return (await this.host()).getProperty<string>('value');
    }

    /**
     * Set the value of the input using keypress simulation.
     */
    async setValue(value: string) {
        const hostElement = await this.host();
        await hostElement.clear();

        if (value.length > 0) {
            await hostElement.sendKeys(value);
        }

        /**
         * Some input types don't respond to key presses, so also set the property after keyboard sequence
         */
        await hostElement.setInputValue(value);
    }
}
