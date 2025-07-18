import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NxCheckboxHarness } from './checkbox-harness';

describe('NxCheckboxHarness', () => {
  it('should return the inner text', async () => {
    const { loader } = createComponent(`<nx-checkbox>Inner Text</nx-checkbox>`);
    const checkbox = await loader.getHarness(NxCheckboxHarness);
    expect(await checkbox.getLabel()).toBe('Inner Text');
  });

  it('should update from unchecked to checked', async () => {
    const { loader } = createComponent(`<nx-checkbox>Foo</nx-checkbox>`);
    const checkbox = await loader.getHarness(NxCheckboxHarness);
    await checkbox.click();
    expect(await checkbox.isChecked()).toBeTrue();
  });

  it('should update from checked to unchecked', async () => {
    const { loader } = createComponent(`<nx-checkbox checked>Foo</nx-checkbox>`);
    const checkbox = await loader.getHarness(NxCheckboxHarness);

    expect(await checkbox.isChecked()).toBeTrue();
    await checkbox.click();
    expect(await checkbox.isChecked()).toBeFalse();
  });

  it('should be disabled', async () => {
    const { loader } = createComponent(`<nx-checkbox disabled>Foo</nx-checkbox>`);
    const checkbox = await loader.getHarness(NxCheckboxHarness);
    expect(await checkbox.isDisabled()).toBeTrue();
  });

  it('should find checkbox by enabled state', async () => {
    const { loader } = createComponent(
      `<nx-checkbox disabled>Foo</nx-checkbox> <nx-checkbox>Bar</nx-checkbox>`,
    );

    const checkboxFoo = await loader.getHarness(NxCheckboxHarness.with({ enabled: false }));
    const checkboxBar = await loader.getHarness(NxCheckboxHarness.with({ enabled: true }));

    expect(await checkboxFoo.getLabel()).toBe('Foo');
    expect(await checkboxFoo.isDisabled()).toBeTrue();
    expect(await checkboxBar.getLabel()).toBe('Bar');
    expect(await checkboxBar.isDisabled()).toBeFalse();
  });

  describe('filters', () => {
    it('should find by text', async () => {
      const { loader } = createComponent(`
                <nx-checkbox>Foo</nx-checkbox>
                <nx-checkbox>Bar</nx-checkbox>
            `);
      const checkbox = await loader.getHarness(NxCheckboxHarness.with({ label: 'Foo' }));

      expect(await checkbox.getLabel()).toBe('Foo');
    });

    it('should find by checked state', async () => {
      const { loader } = createComponent(`
                <nx-checkbox>Foo</nx-checkbox>
                <nx-checkbox checked>Bar</nx-checkbox>
            `);
      const unchecked = await loader.getHarness(NxCheckboxHarness.with({ checked: false }));
      const checked = await loader.getHarness(NxCheckboxHarness.with({ checked: true }));

      expect(await unchecked.getLabel()).toBe('Foo');
      expect(await checked.getLabel()).toBe('Bar');
    });
  });
});

function createComponent(template: string) {
  @Component({ template, standalone: true, imports: [NxCheckboxModule] })
  class Comp {}
  const fixture = TestBed.createComponent(Comp);
  fixture.detectChanges();
  const loader = TestbedHarnessEnvironment.loader(fixture);
  return { loader, fixture };
}
