import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NxFormfieldHarness } from '@aposin/ng-aquila/formfield/testing';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { NxInputHarness } from './nx-input-harness';

describe('NxInputHarness', () => {
    it('should get id', async () => {
        const { loader } = createTestComponent(`<input id="my-id" nxInput />`);
        const input = await loader.getHarness(NxInputHarness);

        expect(await input.getId()).toBe('my-id');
    });

    it('should get type', async () => {
        const { loader } = createTestComponent(`<input type="color" nxInput />`);
        const input = await loader.getHarness(NxInputHarness);

        expect(await input.getType()).toBe('color');
    });

    it('should get type for textarea', async () => {
        const { loader } = createTestComponent(`<textarea type="color" nxInput></textarea>`);
        const input = await loader.getHarness(NxInputHarness);

        expect(await input.getType()).toBe('textarea');
    });

    it('should get placeholder', async () => {
        const { loader } = createTestComponent(`<input nxInput placeholder="my-placeholder" />`);
        const input = await loader.getHarness(NxInputHarness);

        expect(await input.getPlaceholder()).toBe('my-placeholder');
    });

    it('should get disabled state', async () => {
        const { loader } = createTestComponent('<input nxInput disabled /><input nxInput />');
        const [disabledInput, enabledInput] = await loader.getAllHarnesses(NxInputHarness);
        expect(await disabledInput.isDisabled()).toBe(true);
        expect(await enabledInput.isDisabled()).toBe(false);
    });

    it('should focus and blur', async () => {
        const { loader } = createTestComponent('<input nxInput />');
        const input = await loader.getHarness(NxInputHarness);

        expect(await input.isFocused()).toBe(false);
        await input.focus();
        expect(await input.isFocused()).toBe(true);
        await input.blur();
        expect(await input.isFocused()).toBe(false);
    });

    it('should be found by NxFormFieldHarness.getControl', async () => {
        const { loader } = createTestComponent('<nx-formfield><input nxInput /></nx-formfield>');
        const formfield = await loader.getHarness(NxFormfieldHarness);

        const inputWithType = await formfield.getControl(NxInputHarness);
        const inputWithoutType = await formfield.getControl();
        expect(inputWithType).toBeInstanceOf(NxInputHarness);
        expect(inputWithoutType).toBeInstanceOf(NxInputHarness);
    });

    describe('filters', () => {
        it('should find by placeholder', async () => {
            const harnesses = await createTestComponent(`
                <input nxInput placeholder="age" />
                <input nxInput placeholder="name" />
              `).loader.getAllHarnesses(NxInputHarness.with({ placeholder: 'age' }));

            expect(harnesses).toHaveSize(1);
            expect(await harnesses[0].getPlaceholder()).toBe('age');
        });

        it('should find by value', async () => {
            const harnesses = await createTestComponent(`
                <input nxInput value="foo" />
                <input nxInput value="bar" />
             `).loader.getAllHarnesses(NxInputHarness.with({ value: 'bar' }));

            expect(harnesses[0]).toHaveSize(1);
            expect(await harnesses[0].getValue()).toBe('bar');
        });
    });
});

export function createTestComponent(template: string) {
    @Component({ template, standalone: true, imports: [NxInputModule] })
    class Comp {}
    const fixture = TestBed.createComponent(Comp);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return { loader, fixture };
}
