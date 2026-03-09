import { HarnessPredicate } from '@angular/cdk/testing';

import {
  headingPredicate,
  highlightPredicate,
  NxCardHarness,
  NxCardHarnessFilters,
} from './card-harness';

export interface NxSelectableCardHarnessFilters extends NxCardHarnessFilters {
  checked?: boolean;
}

export class NxSelectableCardHarness extends NxCardHarness {
  static hostSelector = 'nx-selectable-card';

  private readonly _input = this.locatorFor('input');
  private readonly _label = this.locatorFor('label');

  static with(options: NxSelectableCardHarnessFilters = {}) {
    return new HarnessPredicate(NxSelectableCardHarness, options)
      .addOption('heading', options.heading, headingPredicate)
      .addOption('highlight', options.highlight, highlightPredicate)
      .addOption(
        'checked',
        options.checked,
        async (harness, checked) => (await harness.isChecked()) === checked,
      );
  }

  async isChecked() {
    return (await this._input()).getProperty<boolean>('checked');
  }

  async hasError() {
    const host = await this.host();
    return host.hasClass('has-error');
  }

  /**
   * Clicks the button at the given position relative to its top-left.
   * @param relativeX The relative x position of the click.
   * @param relativeY The relative y position of the click.
   */
  click(relativeX: number, relativeY: number): Promise<void>;
  /** Clicks the button at its center. */
  click(location?: 'center'): Promise<void>;
  async click(...args: [center?: 'center'] | [number, number]): Promise<void> {
    return (await this._label()).click(...(args as []));
  }
}
