import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BaseHarnessFilters, ComponentHarnessConstructor, ContentContainerComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { NxButtonType } from '@aposin/ng-aquila/button';

type Type = 'basic' | 'icon' | 'plain';

interface NxButtonHarnessFilters extends BaseHarnessFilters {
    type?: Type;
    variant?: NxButtonType;
    critical?: boolean;
    text?: string | RegExp;
}

export class NxButtonHarness extends ContentContainerComponentHarness {
    static hostSelector = `.nx-button, .nx-icon-button, .nx-plain-button`;

    static with<T extends NxButtonHarness>(this: ComponentHarnessConstructor<T>, options: NxButtonHarnessFilters = {}) {
        return new HarnessPredicate<NxButtonHarness>(this, options)
            .addOption('type', options.type, async (harness, type) => HarnessPredicate.stringMatches(await harness.getType(), type))
            .addOption('variant', options.variant, async (harness, variant) => HarnessPredicate.stringMatches(await harness.getVariant(), variant))
            .addOption('critical', options.critical, async (harness, critical) => (await harness.isCritical()) === critical)
            .addOption('text', options.text, async (harness, text) => HarnessPredicate.stringMatches(await harness.getText(), text));
    }

    private _basicButtonContent = this.locatorFor('span.nx-button__content');
    private _plainButtonContent = this.locatorFor('span.nx-plain-button__content');

    /**
     * Clicks the button at the given position relative to its top-left.
     * @param relativeX The relative x position of the click.
     * @param relativeY The relative y position of the click.
     */
    click(relativeX: number, relativeY: number): Promise<void>;
    /** Clicks the button at its center. */
    click(location?: 'center'): Promise<void>;
    async click(...args: [center?: 'center'] | [number, number]): Promise<void> {
        return (await this.host()).click(...(args as []));
    }

    async getHref(): Promise<string | null> {
        const host = await this.host();
        return host.getAttribute('href');
    }

    async getText(): Promise<string> {
        const type = await this.getType();
        switch (type) {
            case 'basic':
                return (await (await this._basicButtonContent()).text()).trim();
            case 'plain':
                return (await (await this._plainButtonContent()).text()).trim();
            case 'icon':
                return '';
        }
    }

    private _criticalClasses = ['nx-plain-button--danger', 'nx-button--danger'] as const;
    async isCritical(): Promise<boolean> {
        const host = await this.host();
        return (await parallel(() => this._criticalClasses.map(clazz => host.hasClass(clazz)))).some(v => v);
    }

    async getType(): Promise<Type> {
        const host = await this.host();
        // eslint-disable-next-line eqeqeq
        if (await host.hasClass('nx-button')) {
            return 'basic';
            // eslint-disable-next-line eqeqeq
        } else if (await host.hasClass('nx-icon-button')) {
            return 'icon';
            // eslint-disable-next-line eqeqeq
        } else if (await host.hasClass('nx-plain-button')) {
            return 'plain';
        }

        return 'basic';
    }

    async getVariant(): Promise<NxButtonType> {
        const host = await this.host();
        if (await host.hasClass('nx-button--primary')) {
            return 'primary';
        }
        if (await host.hasClass('nx-button--secondary')) {
            return 'secondary';
        }
        if (await host.hasClass('nx-button--tertiary')) {
            return 'tertiary';
        }
        if (await host.hasClass('nx-button--cta')) {
            return 'cta';
        }
        if (await host.hasClass('nx-button--emphasis')) {
            return 'emphasis';
        }
        return 'primary';
    }

    async isDisabled() {
        const host = await this.host();
        const disabled = await host.getAttribute('disabled');
        const ariaDisabled = await host.getAttribute('aria-disabled');

        return coerceBooleanProperty(disabled) || coerceBooleanProperty(ariaDisabled);
    }
}
