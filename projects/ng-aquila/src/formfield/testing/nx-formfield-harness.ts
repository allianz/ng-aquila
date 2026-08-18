import { NxDropdownHarness } from '@allianz/ng-aquila/dropdown/testing';
import { type NxFormfieldStatus } from '@allianz/ng-aquila/formfield';
import { type NxFormfieldControlHarness } from '@allianz/ng-aquila/formfield/testing/control';
import { NxInputHarness } from '@allianz/ng-aquila/input/testing';
import {
  type BaseHarnessFilters,
  type ComponentHarnessConstructor,
  ContentContainerComponentHarness,
  HarnessPredicate,
  type HarnessQuery,
  parallel,
  type TestElement,
} from '@angular/cdk/testing';

import {
  NxFormfieldErrorHarness,
  NxFormfieldErrorHarnessFilters,
} from './nx-formfield-error-harness';
import { NxFormfieldNoteHarness, NxFormfieldNoteHarnessFilters } from './nx-formfield-note-harness';

export interface NxFormfieldFilters extends BaseHarnessFilters {
  label?: string | RegExp;
  hasErrors?: boolean;
  readonly?: boolean;
  inline?: boolean;
  status?: NxFormfieldStatus | null;
}

const STATUSES: NxFormfieldStatus[] = ['positive', 'warning', 'info'];

export type FormfieldControlHarness = NxInputHarness | NxDropdownHarness;

export class NxFormfieldHarness extends ContentContainerComponentHarness {
  static hostSelector = 'nx-formfield';

  static with(options: NxFormfieldFilters = {}): HarnessPredicate<NxFormfieldHarness> {
    return new HarnessPredicate<NxFormfieldHarness>(NxFormfieldHarness, options)
      .addOption('label', options.label, (harness, label) =>
        HarnessPredicate.stringMatches(harness.getLabel(), label),
      )
      .addOption(
        'hasErrors',
        options.hasErrors,
        async (harness, hasErrors) => (await harness.hasErrors()) === hasErrors,
      )
      .addOption(
        'readonly',
        options.readonly,
        async (harness, readonly) => (await harness.isReadonly()) === readonly,
      )
      .addOption(
        'inline',
        options.inline,
        async (harness, inline) => (await harness.isInline()) === inline,
      )
      .addOption(
        'status',
        options.status,
        async (harness, status) => (await harness.getStatus()) === status,
      );
  }

  private readonly _label = this.locatorFor('label.nx-formfield__label');
  private readonly _prefix = this.locatorForOptional('.nx-formfield__prefix');
  private readonly _suffix = this.locatorForOptional('.nx-formfield__suffix');
  private readonly _appendix = this.locatorForOptional('.nx-formfield__appendix');
  private readonly _hint = this.locatorForOptional('.nx-formfield__hints');
  private readonly _statusMessage = this.locatorForOptional('.nx-formfield__status-message');
  private readonly _inputControl = this.locatorForOptional(NxInputHarness);
  private readonly _dropdownControl = this.locatorForOptional(NxDropdownHarness);

  /**
   * Gets the control inside the form-field, matching the query
   */

  async getControl<T extends NxFormfieldControlHarness>(type: HarnessQuery<T>): Promise<T>;

  /**
   * Gets the control inside the form-field, matching the provided control harness
   */
  async getControl<T extends NxFormfieldControlHarness>(
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    type: ComponentHarnessConstructor<T>,
  ): Promise<T>;

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
    return parallel(() => errors.map((error) => error.getText()));
  }

  async hasErrors(filter: NxFormfieldErrorHarnessFilters = {}): Promise<boolean> {
    return (await this.getErrors(filter)).length > 0;
  }

  async getNotes(filter: NxFormfieldNoteHarnessFilters = {}): Promise<NxFormfieldNoteHarness[]> {
    return this.locatorForAll(NxFormfieldNoteHarness.with(filter))();
  }

  async getNoteTexts(filter: NxFormfieldNoteHarnessFilters = {}): Promise<string[]> {
    const notes = await this.getNotes(filter);
    return parallel(() => notes.map((hint) => hint.getText()));
  }

  async hasNotes(filter: NxFormfieldNoteHarnessFilters = {}): Promise<boolean> {
    return (await this.getNotes(filter)).length > 0;
  }

  /** Gets the signal status of the form field, or null if none is applied. */
  async getStatus(): Promise<NxFormfieldStatus | null> {
    const host = await this.host();
    const matches = await parallel(() =>
      STATUSES.map((status) => host.hasClass(`nx-formfield--status-${status}`)),
    );

    return STATUSES[matches.indexOf(true)] ?? null;
  }

  /** Gets the status message of the form field, or null if none is shown. */
  async getStatusMessage(): Promise<TestElement | null> {
    return this._statusMessage();
  }

  async getStatusMessageText(): Promise<string | null> {
    return (await this.getStatusMessage())?.text() ?? null;
  }

  async isValid(): Promise<boolean> {
    const host = await this.host();
    return host.hasClass('has-error').then((result) => !result);
  }

  async isReadonly(): Promise<boolean> {
    return (await this.host()).hasClass('is-readonly');
  }

  async isInline(): Promise<boolean> {
    return (await this.host()).hasClass('nx-formfield--inline');
  }
}
