import { NxRadioModule } from '@allianz/ng-aquila/radio-button';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NxRadioHarness } from './radio-harness';

describe('NxRadioHarness', () => {
  let loader: HarnessLoader;

  beforeEach(() => {
    const fixture = TestBed.createComponent(RadioHarnessTest);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should return label', async () => {
    const radio = await loader.getHarness(NxRadioHarness.with({ label: 'Label Test' }));
    expect(await radio.getLabel()).toBe('Label Test');
  });

  it('should find radio by label', async () => {
    const radio = await loader.getHarness(NxRadioHarness.with({ label: 'My Bar' }));
    expect(await radio.getLabel()).toBe('My Bar');
  });

  it('should determine whether radio is checked', async () => {
    const radioFoo = await loader.getHarness(NxRadioHarness.with({ label: 'Checked Radio' }));
    const radioBar = await loader.getHarness(NxRadioHarness.with({ label: 'Unchecked Radio' }));

    expect(await radioFoo.isChecked()).toBe(true);
    expect(await radioBar.isChecked()).toBe(false);
  });

  it('should mark radio as checked after click', async () => {
    const radio = await loader.getHarness(NxRadioHarness.with({ label: 'Clickable Radio' }));
    await radio.click();

    expect(await radio.isChecked()).toBe(true);
  });

  it('should find radio by checked state', async () => {
    const checkedRadio = await loader.getHarness(
      NxRadioHarness.with({ checked: true, label: 'State Checked' }),
    );
    const uncheckedRadio = await loader.getHarness(
      NxRadioHarness.with({ checked: false, label: 'State Unchecked' }),
    );

    expect(await checkedRadio.getLabel()).toBe('State Checked');
    expect(await uncheckedRadio.getLabel()).toBe('State Unchecked');
  });

  it('should determine whether radio is disabled', async () => {
    const radio = await loader.getHarness(NxRadioHarness.with({ label: 'Disabled Radio' }));
    expect(await radio.isDisabled()).toBe(true);
  });

  it('should find radio by enabled state', async () => {
    const radioFoo = await loader.getHarness(NxRadioHarness.with({ enabled: false }));
    const radioBar = await loader.getHarness(NxRadioHarness.with({ enabled: true }));

    expect(await radioFoo.getLabel()).toBe('Disabled Radio');
    expect(await radioFoo.isDisabled()).toBe(true);
    expect(await radioBar.getLabel()).toBe('Label Test');
    expect(await radioBar.isDisabled()).toBe(false);
  });
});

@Component({
  template: `
    <nx-radio> Label Test </nx-radio>
    <nx-radio>My Foo</nx-radio>
    <nx-radio>My Bar</nx-radio>
    <nx-radio [checked]="true">Checked Radio</nx-radio>
    <nx-radio>Unchecked Radio</nx-radio>
    <nx-radio>Clickable Radio</nx-radio>
    <nx-radio [checked]="true">State Checked</nx-radio>
    <nx-radio [checked]="false">State Unchecked</nx-radio>
    <nx-radio disabled>Disabled Radio</nx-radio>
    <nx-radio>Enabled Radio</nx-radio>
  `,
  imports: [NxRadioModule],
})
class RadioHarnessTest {}
