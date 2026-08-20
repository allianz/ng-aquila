import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxFormfieldHarness } from '@allianz/ng-aquila/formfield/testing';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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

      expect(harnesses).toHaveLength(1);
      expect(await harnesses[0].getPlaceholder()).toBe('age');
    });

    it('should find by value', async () => {
      const fixture = TestBed.createComponent(FilterValueTest);
      fixture.detectChanges();
      const loader = TestbedHarnessEnvironment.loader(fixture);

      const harnesses = await loader.getAllHarnesses(NxInputHarness.with({ value: 'bar' }));

      expect(harnesses).toHaveLength(1);
      expect(await harnesses[0].getValue()).toBe('bar');
    });
  });
});

@Component({
  selector: 'test-id-test',
  template: `<input id="my-id" nxInput />`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxInputModule],
})
class IdTest {}

@Component({
  selector: 'test-type-test',
  template: `<input type="color" nxInput />`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxInputModule],
})
class TypeTest {}

@Component({
  selector: 'test-textarea-type-test',
  template: `<textarea type="color" nxInput></textarea>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxInputModule],
})
class TextareaTypeTest {}

@Component({
  selector: 'test-placeholder-test',
  template: `<input nxInput placeholder="my-placeholder" />`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxInputModule],
})
class PlaceholderTest {}

@Component({
  selector: 'test-nx-input-harness-disabled-test',
  template: `<input nxInput disabled /><input nxInput />`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxInputModule],
})
class DisabledTest {}

@Component({
  selector: 'test-focus-test',
  template: `<input nxInput />`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxInputModule],
})
class FocusTest {}

@Component({
  selector: 'test-formfield-test',
  template: `<nx-formfield><input nxInput /></nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxInputModule],
})
class FormfieldTest {}

@Component({
  selector: 'test-filter-placeholder-test',
  template: `
    <input nxInput placeholder="age" />
    <input nxInput placeholder="name" />
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxInputModule],
})
class FilterPlaceholderTest {}

@Component({
  selector: 'test-filter-value-test',
  template: `
    <input nxInput value="foo" />
    <input nxInput value="bar" />
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxInputModule],
})
class FilterValueTest {}
