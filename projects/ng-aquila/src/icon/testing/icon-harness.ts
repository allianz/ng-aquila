import { BaseHarnessFilters, ComponentHarness, ComponentHarnessConstructor, HarnessPredicate } from '@angular/cdk/testing';

export interface NxIconHarnessFilters extends BaseHarnessFilters {
    name?: string | RegExp;
}

export class NxIconHarness extends ComponentHarness {
    static hostSelector = 'nx-icon';

    static with<T extends NxIconHarness>(this: ComponentHarnessConstructor<T>, options: NxIconHarnessFilters = {}) {
        return new HarnessPredicate<NxIconHarness>(this, options).addOption('type', options.name, async (harness, name) =>
            HarnessPredicate.stringMatches(await harness.getName(), name),
        );
    }

    async getName(): Promise<string | null> {
        const host = await this.host();
        return host.getAttribute('data-nx-icon-name');
    }
}
