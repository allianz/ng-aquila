import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxFormfieldHarness } from '@allianz/ng-aquila/formfield/testing';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NxDropdownHarness } from './nx-dropdown-harness';

describe('NxDropdownHarness', () => {
  let loader: HarnessLoader;

  beforeEach(() => {
    const fixture = TestBed.createComponent(DropdownHarnessTest);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should get value text', async () => {
    const dropdowns = await loader.getAllHarnesses(NxDropdownHarness);
    const dropdown = dropdowns[0]; // First dropdown with value="foo"

    expect(await dropdown.getValueText()).toBe('Foo');
  });

  it('should get empty state', async () => {
    const dropdowns = await loader.getAllHarnesses(NxDropdownHarness);
    const dropdown = dropdowns[1]; // Second dropdown - no value set

    expect(await dropdown.isEmpty()).toBe(true);
  });

  it('should get disabled state', async () => {
    const disabled = await loader.getHarness(NxDropdownHarness.with({ disabled: true }));
    const enabled = await loader.getHarness(NxDropdownHarness.with({ disabled: false }));
    expect(await disabled.isDisabled()).toBe(true);
    expect(await enabled.isDisabled()).toBe(false);
  });

  it('should get readonly state', async () => {
    const readonly = await loader.getHarness(NxDropdownHarness.with({ readonly: true }));
    const notReadonly = await loader.getHarness(NxDropdownHarness.with({ readonly: false }));
    expect(await readonly.isReadonly()).toBe(true);
    expect(await notReadonly.isReadonly()).toBe(false);
  });

  it('should focus and blur', async () => {
    const dropdowns = await loader.getAllHarnesses(NxDropdownHarness);
    const dropdown = dropdowns[5]; // Focus test dropdown

    expect(await dropdown.isFocused()).toBe(false);
    await dropdown.focus();
    expect(await dropdown.isFocused()).toBe(true);
    await dropdown.blur();
    expect(await dropdown.isFocused()).toBe(false);
  });

  it('should open and close', async () => {
    const dropdowns = await loader.getAllHarnesses(NxDropdownHarness);
    const dropdown = dropdowns[6]; // Open/close test dropdown

    expect(await dropdown.isOpen()).toBe(false);
    await dropdown.open();
    expect(await dropdown.isOpen()).toBe(true);
    await dropdown.close();
    expect(await dropdown.isOpen()).toBe(false);
  });

  it('should get items', async () => {
    const dropdowns = await loader.getAllHarnesses(NxDropdownHarness);
    const dropdown = dropdowns[0]; // First dropdown with value="foo" and two items

    await dropdown.open();
    const [foo] = await dropdown.getItems({ isSelected: true });
    const [bar] = await dropdown.getItems({ text: 'Bar' });
    const itemTexts = await parallel(() => [foo.getText(), bar.getText()]);
    expect(itemTexts).toEqual(['Foo', 'Bar']);
  });

  it('should click item', async () => {
    const dropdowns = await loader.getAllHarnesses(NxDropdownHarness);
    const dropdown = dropdowns[7]; // Click test dropdown

    await dropdown.clickItem({ text: 'Bar' });
    expect(await dropdown.getValueText()).toBe('Bar');
  });

  it('should get groups', async () => {
    const dropdowns = await loader.getAllHarnesses(NxDropdownHarness);
    const dropdown = dropdowns[8]; // Groups test dropdown

    await dropdown.open();
    const [groupA] = await dropdown.getGroups({ label: 'Group A' });
    const [groupB] = await dropdown.getGroups({ label: /group b/i });

    expect(await groupA.getLabel()).toBe('Group A');
    expect(await groupB.getLabel()).toBe('Group B');
    expect(await (await groupA.getItems())[0].getText()).toBe('Foo');
    expect(await (await groupB.getItems())[0].getText()).toBe('Bar');
  });

  it('should get if filter is active', async () => {
    const dropdowns = await loader.getAllHarnesses(NxDropdownHarness);
    const dropdown = dropdowns[9]; // Filter test dropdown
    await dropdown.open();

    expect(await dropdown.hasFilter()).toBe(true);
  });

  it('should set and get the current filter value', async () => {
    const dropdowns = await loader.getAllHarnesses(NxDropdownHarness);
    const dropdown = dropdowns[10]; // Filter value test dropdown
    await dropdown.open();

    expect(await dropdown.getFilterValue()).toBe('');
    await dropdown.setFilterValue('some filter');
    expect(await dropdown.getFilterValue()).toBe('some filter');
  });

  it('should be found by NxFormFieldHarness.getControl', async () => {
    const formfield = await loader.getHarness(NxFormfieldHarness);

    const dropdownWithType = await formfield.getControl(NxDropdownHarness);
    const dropdownWithoutType = await formfield.getControl();
    expect(dropdownWithType).toBeInstanceOf(NxDropdownHarness);
    expect(dropdownWithoutType).toBeInstanceOf(NxDropdownHarness);
  });

  describe('filters', () => {
    it('should find by value text', async () => {
      const foo = await loader.getHarness(NxDropdownHarness.with({ valueText: 'Foo' }));
      const bar = await loader.getHarness(NxDropdownHarness.with({ valueText: /b/i }));

      expect(await foo.getValueText()).toBe('Foo');
      expect(await bar.getValueText()).toBe('Bar');
    });

    it('should find by disabled state', async () => {
      const disabledTrue = await loader.getHarness(NxDropdownHarness.with({ disabled: true }));
      const disabledFalse = await loader.getHarness(NxDropdownHarness.with({ disabled: false }));

      expect(await disabledTrue.isDisabled()).toBe(true);
      expect(await disabledFalse.isDisabled()).toBe(false);
    });

    it('should find by readonly state', async () => {
      const readonlyTrue = await loader.getHarness(NxDropdownHarness.with({ readonly: true }));
      const readonlyFalse = await loader.getHarness(NxDropdownHarness.with({ readonly: false }));

      expect(await readonlyTrue.isReadonly()).toBe(true);
      expect(await readonlyFalse.isReadonly()).toBe(false);
    });
  });
});

@Component({
  template: `
    <!-- Index 0: value="foo" with Foo/Bar items -->
    <nx-dropdown value="foo">
      <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
      <nx-dropdown-item value="bar">Bar</nx-dropdown-item>
    </nx-dropdown>

    <!-- Index 1: Empty dropdown -->
    <nx-dropdown>
      <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
    </nx-dropdown>

    <!-- Index 2: Disabled dropdown -->
    <nx-dropdown disabled />

    <!-- Index 3: Readonly dropdown -->
    <nx-dropdown readonly />

    <!-- Index 4: Regular enabled/not readonly dropdown -->
    <nx-dropdown />

    <!-- Index 5: Focus/blur dropdown -->
    <nx-dropdown />

    <!-- Index 6: Open/close dropdown -->
    <nx-dropdown>
      <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
    </nx-dropdown>

    <!-- Index 7: Click item test dropdown -->
    <nx-dropdown value="foo">
      <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
      <nx-dropdown-item value="bar">Bar</nx-dropdown-item>
    </nx-dropdown>

    <!-- Index 8: Groups dropdown -->
    <nx-dropdown value="foo">
      <nx-dropdown-group label="Group A">
        <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
      </nx-dropdown-group>
      <nx-dropdown-group label="Group B">
        <nx-dropdown-item value="bar">Bar</nx-dropdown-item>
      </nx-dropdown-group>
    </nx-dropdown>

    <!-- Index 9: Filter active test -->
    <nx-dropdown [showFilter]="true">
      <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
    </nx-dropdown>

    <!-- Index 10: Filter value test -->
    <nx-dropdown [showFilter]="true">
      <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
    </nx-dropdown>

    <!-- Index 11: Formfield test -->
    <nx-formfield>
      <nx-dropdown />
    </nx-formfield>

    <!-- Index 12: Filter test - value="bar" -->
    <nx-dropdown value="bar">
      <nx-dropdown-item value="bar">Bar</nx-dropdown-item>
    </nx-dropdown>
  `,
  imports: [NxFormfieldModule, NxDropdownModule],
})
class DropdownHarnessTest {}
