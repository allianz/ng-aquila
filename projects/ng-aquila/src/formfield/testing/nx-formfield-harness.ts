import {
    type BaseHarnessFilters,
    type ComponentHarnessConstructor,
    ContentContainerComponentHarness,
    HarnessPredicate,
    type HarnessQuery,
    parallel,
    type TestElement,
} from '@angular/cdk/testing';
import { NxDropdownHarness } from '@aposin/ng-aquila/dropdown/testing';
import { type NxFormfieldControlHarness } from '@aposin/ng-aquila/formfield/testing/control';
import { NxInputHarness } from '@aposin/ng-aquila/input/testing';

import { NxFormfieldErrorHarness, NxFormfieldErrorHarnessFilters } from './nx-formfield-error-harness';
import { NxFormfieldNoteHarness, NxFormfieldNoteHarnessFilters } from './nx-formfield-note-harness';

export interface NxFormfieldFilters extends BaseHarnessFilters {
    label?: string | RegExp;
    hasErrors?: boolean;
}

export type FormfieldControlHarness = NxInputHarness | NxDropdownHarness;

export class NxFormfieldHarness extends ContentContainerComponentHarness {
    static hostSelector = 'nx-formfield';

    static with(options: NxFormfieldFilters = {}): HarnessPredicate<NxFormfieldHarness> {
        return new HarnessPredicate<NxFormfieldHarness>(NxFormfieldHarness, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabel(), label))
            .addOption('hasErrors', options.hasErrors, async (harness, hasErrors) => (await harness.hasErrors()) === hasErrors);
    }

    private _label = this.locatorFor('label.nx-formfield__label');
    private _prefix = this.locatorForOptional('.nx-formfield__prefix');
    private _suffix = this.locatorForOptional('.nx-formfield__suffix');
    private _appendix = this.locatorForOptional('.nx-formfield__appendix');
    private _hint = this.locatorForOptional('.nx-formfield__hints');
    private _inputControl = this.locatorForOptional(NxInputHarness);
    private _dropdownControl = this.locatorForOptional(NxDropdownHarness);

    /**
     * Gets the control inside the form-field, matching the query
     */
    async getControl<T extends NxFormfieldControlHarness>(type: HarnessQuery<T>): Promise<T>;

    /**
     * Gets the control inside the form-field, matching the provided control harness
     */
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    async getControl<T extends NxFormfieldControlHarness>(type: ComponentHarnessConstructor<T>): Promise<T>;

    /**
     * Gets the control inside the form field, only supporting default controls (input, dropdown, etc.)
     */
    async getControl(): Promise<FormfieldControlHarness | null>;
    async getControl<T extends NxFormfieldControlHarness>(type?: HarnessQuery<T>) {
        if (type) {
            return this.locatorFor(type)();
        }
        const [input, dropdown] = await parallel(() => [this._inputControl(), this._dropdownControl()]);

        return input || dropdown;
    }

    async getLabel(): Promise<string> {
        return (await this._label()).text();
    }

    async getPrefix(): Promise<TestElement | null> {
        return this._prefix();
    }

    async getSuffix(): Promise<TestElement | null> {
        return this._suffix();
    }

    async getAppendix(): Promise<TestElement | null> {
        return this._appendix();
    }

    async getHint(): Promise<TestElement | null> {
        return this._hint();
    }

    async getHintText(): Promise<string> {
        return (await this.getHint())?.text() ?? '';
    }

    async getErrors(filter: NxFormfieldErrorHarnessFilters = {}): Promise<NxFormfieldErrorHarness[]> {
        return this.locatorForAll(NxFormfieldErrorHarness.with(filter))();
    }

    async getErrorTexts(filter: NxFormfieldErrorHarnessFilters = {}): Promise<string[]> {
        const errors = await this.getErrors(filter);
        return parallel(() => errors.map(error => error.getText()));
    }

    async hasErrors(filter: NxFormfieldErrorHarnessFilters = {}): Promise<boolean> {
        return (await this.getErrors(filter)).length > 0;
    }

    async getNotes(filter: NxFormfieldNoteHarnessFilters = {}): Promise<NxFormfieldNoteHarness[]> {
        return this.locatorForAll(NxFormfieldNoteHarness.with(filter))();
    }

    async getNoteTexts(filter: NxFormfieldNoteHarnessFilters = {}): Promise<string[]> {
        const notes = await this.getNotes(filter);
        return parallel(() => notes.map(hint => hint.getText()));
    }

    async hasNotes(filter: NxFormfieldNoteHarnessFilters = {}): Promise<boolean> {
        return (await this.getNotes(filter)).length > 0;
    }

    async isValid(): Promise<boolean> {
        const host = await this.host();
        return host.hasClass('has-error').then(result => !result);
    }
}
