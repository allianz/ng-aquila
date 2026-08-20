import { ComponentHarness } from '@angular/cdk/testing';

/** @docs-private */
export class MultiSelectOptionHarness extends ComponentHarness {
  static hostSelector = 'nx-multi-select-option';

  getLabel = this.locatorFor('.nx-checkbox__label');

  getCheckbox = this.locatorFor('.nx-checkbox');

  getCheckIcon = this.locatorForOptional('nx-icon');

  async getLabelText() {
    const label = await this.getLabel();
    return label.text();
  }

  async isSelected() {
    const checkbox = await this.getCheckbox();
    return checkbox.hasClass('is-selected');
  }

  async isActive() {
    const checkbox = await this.getCheckbox();
    return checkbox.hasClass('is-active');
  }

  async isDisabled() {
    const checkbox = await this.getCheckbox();
    return checkbox.hasClass('is-disabled');
  }

  async isOutline() {
    const host = await this.host();
    return host.hasClass('is-outline');
  }

  async click() {
    const option = await this.host();
    await option.click();
  }

  async getId() {
    const host = await this.host();
    return host.getAttribute('id');
  }
}
