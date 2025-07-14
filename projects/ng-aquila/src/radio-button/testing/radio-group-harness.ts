import {
  BaseHarnessFilters,
  ComponentHarness,
  ComponentHarnessConstructor,
  HarnessPredicate,
  parallel,
} from '@angular/cdk/testing';

import { NxRadioHarness, type NxRadioHarnessFilters } from './radio-harness';

export interface NxRadioGroupHarnessFilters extends BaseHarnessFilters {
  label?: string | RegExp;
  disabled?: boolean;
}

export class NxRadioGroupHarness extends ComponentHarness {
  static hostSelector = 'nx-radio-group';

  static with<T extends NxRadioGroupHarness>(
    this: ComponentHarnessConstructor<T>,
    options: NxRadioGroupHarnessFilters = {},
  ) {
    return new HarnessPredicate<NxRadioGroupHarness>(this, options)
      .addOption('text', options.label, (harness, label) =>
        HarnessPredicate.stringMatches(harness.getLabel(), label),
      )
      .addOption(
        'disabled',
        options.disabled,
        async (harness, disabled) => (await harness.isDisabled()) === disabled,
      );
  }

  private _selectedRadio = this.locatorForOptional(NxRadioHarness.with({ checked: true }));

  async getRadioButtons(filter?: NxRadioHarnessFilters): Promise<NxRadioHarness[]> {
    return this.locatorForAll(NxRadioHarness.with(filter))();
  }

  async getSelectedRadio(): Promise<NxRadioHarness | null> {
    return this._selectedRadio();
  }

  async getSelectedRadioLabel(): Promise<string | null> {
    return (await this._selectedRadio())?.getLabel() ?? null;
  }

  async getLabel(): Promise<string | null> {
    const host = await this.host();
    const labelledBy = await host.getAttribute('aria-labelledby');
    if (labelledBy) {
      const labelEl = await this.locatorFor(`label[id=${labelledBy}]`)();
      const labelText = await labelEl.text();
      return labelText.trim();
    }
    return host.getAttribute('aria-label');
  }

  async isDisabled(): Promise<boolean> {
    const host = await this.host();
    const disabled = await host.getAttribute('data-nx-disabled');
    return disabled === 'true';
  }

  /** Click the first radio option matching the filter */
  async clickOption(filter?: NxRadioHarnessFilters): Promise<void> {
    const items = await this.getRadioButtons(filter);

    if (items.length === 0) {
      const unfilteredItems = await this.getRadioButtons();
      const unfilteredItemTexts = (
        await parallel(() => unfilteredItems.map((o) => o.getLabel()))
      ).join(', ');
      throw Error(
        `RadioGroup does not have options matching the specified filter, available items: ${unfilteredItemTexts}.`,
      );
    }

    await items[0].click();
  }
}
