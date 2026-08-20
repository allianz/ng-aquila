import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NxCheckboxHarness } from './checkbox-harness';

describe('NxCheckboxHarness', () => {
  let loader: HarnessLoader;

  beforeEach(() => {
    const fixture = TestBed.createComponent(CheckboxHarnessTest);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should return the inner text', async () => {
    const checkbox = await loader.getHarness(NxCheckboxHarness.with({ label: 'Inner Text' }));
    expect(await checkbox.getLabel()).toBe('Inner Text');
  });

  it('should update from unchecked to checked', async () => {
    const checkboxes = await loader.getAllHarnesses(NxCheckboxHarness);
    const checkbox = checkboxes[1]; // "Clickable"
    await checkbox.click();
    expect(await checkbox.isChecked()).toBe(true);
  });

  it('should update from checked to unchecked', async () => {
    const checkboxes = await loader.getAllHarnesses(NxCheckboxHarness);
    const checkbox = checkboxes[2]; // "ClickableChecked"

    expect(await checkbox.isChecked()).toBe(true);
    await checkbox.click();
    expect(await checkbox.isChecked()).toBe(false);
  });

  it('should be disabled', async () => {
    const checkboxes = await loader.getAllHarnesses(NxCheckboxHarness);
    const checkbox = checkboxes[3]; // "Disabled"
    expect(await checkbox.isDisabled()).toBe(true);
  });

  it('should find checkbox by enabled state', async () => {
    const checkboxFoo = await loader.getHarness(NxCheckboxHarness.with({ enabled: false }));
    const checkboxBar = await loader.getHarness(NxCheckboxHarness.with({ enabled: true }));

    expect(await checkboxFoo.getLabel()).toBe('Disabled');
    expect(await checkboxFoo.isDisabled()).toBe(true);
    expect(await checkboxBar.getLabel()).toBe('Inner Text');
    expect(await checkboxBar.isDisabled()).toBe(false);
  });

  describe('filters', () => {
    it('should find by text', async () => {
      const checkbox = await loader.getHarness(NxCheckboxHarness.with({ label: 'Foo' }));

      expect(await checkbox.getLabel()).toBe('Foo');
    });

    it('should find by checked state', async () => {
      const unchecked = await loader.getHarness(
        NxCheckboxHarness.with({ checked: false, label: 'StateFoo' }),
      );
      const checked = await loader.getHarness(
        NxCheckboxHarness.with({ checked: true, label: 'StateBar' }),
      );

      expect(await unchecked.getLabel()).toBe('StateFoo');
      expect(await checked.getLabel()).toBe('StateBar');
    });
  });
});

@Component({
  selector: 'test-checkbox-harness-test',
  template: `
    <nx-checkbox>Inner Text</nx-checkbox>
    <nx-checkbox>Clickable</nx-checkbox>
    <nx-checkbox checked>ClickableChecked</nx-checkbox>
    <nx-checkbox disabled>Disabled</nx-checkbox>
    <nx-checkbox disabled>Foo</nx-checkbox>
    <nx-checkbox>Bar</nx-checkbox>
    <nx-checkbox>StateFoo</nx-checkbox>
    <nx-checkbox checked>StateBar</nx-checkbox>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCheckboxModule],
})
class CheckboxHarnessTest {}
