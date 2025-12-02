import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxFormfieldHarness } from '@allianz/ng-aquila/formfield/testing';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NxInputHarness } from './nx-input-harness';

describe('NxInputHarness', () => {
  it('should get id', async () => {
    const fixture = TestBed.createComponent(IdTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const input = await loader.getHarness(NxInputHarness);

    expect(await input.getId()).toBe('my-id');
  });

  it('should get type', async () => {
    const fixture = TestBed.createComponent(TypeTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const input = await loader.getHarness(NxInputHarness);

    expect(await input.getType()).toBe('color');
  });

  it('should get type for textarea', async () => {
    const fixture = TestBed.createComponent(TextareaTypeTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const input = await loader.getHarness(NxInputHarness);

    expect(await input.getType()).toBe('textarea');
  });

  it('should get placeholder', async () => {
    const fixture = TestBed.createComponent(PlaceholderTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const input = await loader.getHarness(NxInputHarness);

    expect(await input.getPlaceholder()).toBe('my-placeholder');
  });

  it('should get disabled state', async () => {
    const fixture = TestBed.createComponent(DisabledTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const [disabledInput, enabledInput] = await loader.getAllHarnesses(NxInputHarness);
    expect(await disabledInput.isDisabled()).toBe(true);
    expect(await enabledInput.isDisabled()).toBe(false);
  });

  it('should focus and blur', async () => {
    const fixture = TestBed.createComponent(FocusTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const input = await loader.getHarness(NxInputHarness);

    expect(await input.isFocused()).toBe(false);
    await input.focus();
    expect(await input.isFocused()).toBe(true);
    await input.blur();
    expect(await input.isFocused()).toBe(false);
  });

  it('should be found by NxFormFieldHarness.getControl', async () => {
    const fixture = TestBed.createComponent(FormfieldTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const formfield = await loader.getHarness(NxFormfieldHarness);

    const inputWithType = await formfield.getControl(NxInputHarness);
    const inputWithoutType = await formfield.getControl();
    expect(inputWithType).toBeInstanceOf(NxInputHarness);
    expect(inputWithoutType).toBeInstanceOf(NxInputHarness);
  });

  describe('filters', () => {
    it('should find by placeholder', async () => {
      const fixture = TestBed.createComponent(FilterPlaceholderTest);
      fixture.detectChanges();
      const loader = TestbedHarnessEnvironment.loader(fixture);

      const harnesses = await loader.getAllHarnesses(NxInputHarness.with({ placeholder: 'age' }));

      expect(harnesses).toHaveSize(1);
      expect(await harnesses[0].getPlaceholder()).toBe('age');
    });

    it('should find by value', async () => {
      const fixture = TestBed.createComponent(FilterValueTest);
      fixture.detectChanges();
      const loader = TestbedHarnessEnvironment.loader(fixture);

      const harnesses = await loader.getAllHarnesses(NxInputHarness.with({ value: 'bar' }));

      expect(harnesses).toHaveSize(1);
      expect(await harnesses[0].getValue()).toBe('bar');
    });
  });
});

@Component({
  template: `<input id="my-id" nxInput />`,
  imports: [NxInputModule],
})
class IdTest {}

@Component({
  template: `<input type="color" nxInput />`,
  imports: [NxInputModule],
})
class TypeTest {}

@Component({
  template: `<textarea type="color" nxInput></textarea>`,
  imports: [NxInputModule],
})
class TextareaTypeTest {}

@Component({
  template: `<input nxInput placeholder="my-placeholder" />`,
  imports: [NxInputModule],
})
class PlaceholderTest {}

@Component({
  template: `<input nxInput disabled /><input nxInput />`,
  imports: [NxInputModule],
})
class DisabledTest {}

@Component({
  template: `<input nxInput />`,
  imports: [NxInputModule],
})
class FocusTest {}

@Component({
  template: `<nx-formfield><input nxInput /></nx-formfield>`,
  imports: [NxFormfieldModule, NxInputModule],
})
class FormfieldTest {}

@Component({
  template: `
    <input nxInput placeholder="age" />
    <input nxInput placeholder="name" />
  `,
  imports: [NxInputModule],
})
class FilterPlaceholderTest {}

@Component({
  template: `
    <input nxInput value="foo" />
    <input nxInput value="bar" />
  `,
  imports: [NxInputModule],
})
class FilterValueTest {}
