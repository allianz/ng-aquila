import { parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxFormfieldHarness } from '@aposin/ng-aquila/formfield/testing';

import { NxDropdownHarness } from './nx-dropdown-harness';

describe('NxDropdownHarness', () => {
    it('should get value text', async () => {
        const { loader } = createTestComponent(`<nx-dropdown value="foo">
            <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
            <nx-dropdown-item value="bar">Bar</nx-dropdown-item>
        </nx-dropdown>`);
        const dropdown = await loader.getHarness(NxDropdownHarness);

        expect(await dropdown.getValueText()).toBe('Foo');
    });

    it('should get empty state', async () => {
        const { loader } = createTestComponent(`<nx-dropdown><nx-dropdown-item value="foo">Foo</nx-dropdown-item></nx-dropdown>`);
        const dropdown = await loader.getHarness(NxDropdownHarness);

        expect(await dropdown.isEmpty()).toBe(true);
    });

    it('should get disabled state', async () => {
        const { loader } = createTestComponent('<nx-dropdown disabled /> <nx-dropdown />');
        const [disabled, enabled] = await loader.getAllHarnesses(NxDropdownHarness);
        expect(await disabled.isDisabled()).toBe(true);
        expect(await enabled.isDisabled()).toBe(false);
    });

    it('should get readonly state', async () => {
        const { loader } = createTestComponent('<nx-dropdown readonly /> <nx-dropdown />');
        const [readonly, notReadonly] = await loader.getAllHarnesses(NxDropdownHarness);
        expect(await readonly.isReadonly()).toBe(true);
        expect(await notReadonly.isReadonly()).toBe(false);
    });

    it('should focus and blur', async () => {
        const { loader } = createTestComponent('<nx-dropdown />');
        const dropdown = await loader.getHarness(NxDropdownHarness);

        expect(await dropdown.isFocused()).toBe(false);
        await dropdown.focus();
        expect(await dropdown.isFocused()).toBe(true);
        await dropdown.blur();
        expect(await dropdown.isFocused()).toBe(false);
    });

    it('should open and close', async () => {
        const { loader } = createTestComponent('<nx-dropdown><nx-dropdown-item value="foo">Foo</nx-dropdown-item></nx-dropdown>');
        const dropdown = await loader.getHarness(NxDropdownHarness);

        expect(await dropdown.isOpen()).toBe(false);
        await dropdown.open();
        expect(await dropdown.isOpen()).toBe(true);
        await dropdown.close();
        expect(await dropdown.isOpen()).toBe(false);
    });

    it('should get items', async () => {
        const { loader } = createTestComponent(`<nx-dropdown value="foo">
            <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
            <nx-dropdown-item value="bar">Bar</nx-dropdown-item>
        </nx-dropdown>`);
        const dropdown = await loader.getHarness(NxDropdownHarness);

        await dropdown.open();
        const [foo] = await dropdown.getItems({ isSelected: true });
        const [bar] = await dropdown.getItems({ text: 'Bar' });
        const itemTexts = await parallel(() => [foo.getText(), bar.getText()]);
        expect(itemTexts).toEqual(['Foo', 'Bar']);
    });

    it('should click item', async () => {
        const { loader } = createTestComponent(`<nx-dropdown value="foo">
            <nx-dropdown-item value="foo">Foo</nx-dropdown-item>
            <nx-dropdown-item value="bar">Bar</nx-dropdown-item>
        </nx-dropdown>`);
        const dropdown = await loader.getHarness(NxDropdownHarness);

        await dropdown.clickItem({ text: 'Bar' });
        expect(await dropdown.getValueText()).toBe('Bar');
    });

    it('should get groups', async () => {
        const { loader } = createTestComponent(`<nx-dropdown value="foo">
            <nx-dropdown-group label="Group A"><nx-dropdown-item value="foo">Foo</nx-dropdown-item></nx-dropdown-group>
            <nx-dropdown-group label="Group B"><nx-dropdown-item value="bar">Bar</nx-dropdown-item></nx-dropdown-group>
        </nx-dropdown>`);
        const dropdown = await loader.getHarness(NxDropdownHarness);

        await dropdown.open();
        const [groupA] = await dropdown.getGroups({ label: 'Group A' });
        const [groupB] = await dropdown.getGroups({ label: /group b/i });

        expect(await groupA.getLabel()).toBe('Group A');
        expect(await groupB.getLabel()).toBe('Group B');
        expect(await (await groupA.getItems())[0].getText()).toBe('Foo');
        expect(await (await groupB.getItems())[0].getText()).toBe('Bar');
    });

    it('should get if filter is active', async () => {
        const { loader } = createTestComponent('<nx-dropdown showFilter="true"><nx-dropdown-item value="foo">Foo</nx-dropdown-item></nx-dropdown>');
        const dropdown = await loader.getHarness(NxDropdownHarness);
        await dropdown.open();

        expect(await dropdown.hasFilter()).toBe(true);
    });

    it('should set and get the current filter value', async () => {
        const { loader } = createTestComponent('<nx-dropdown showFilter="true"><nx-dropdown-item value="foo">Foo</nx-dropdown-item></nx-dropdown>');
        const dropdown = await loader.getHarness(NxDropdownHarness);
        await dropdown.open();

        expect(await dropdown.getFilterValue()).toBe('');
        await dropdown.setFilterValue('some filter');
        expect(await dropdown.getFilterValue()).toBe('some filter');
    });

    it('should be found by NxFormFieldHarness.getControl', async () => {
        const { loader } = createTestComponent('<nx-formfield><nx-dropdown /></nx-formfield>');
        const formfield = await loader.getHarness(NxFormfieldHarness);

        const dropdownWithType = await formfield.getControl(NxDropdownHarness);
        const dropdownWithoutType = await formfield.getControl();
        expect(dropdownWithType).toBeInstanceOf(NxDropdownHarness);
        expect(dropdownWithoutType).toBeInstanceOf(NxDropdownHarness);
    });

    describe('filters', () => {
        it('should find by value text', async () => {
            const { loader } = createTestComponent(`
                <nx-dropdown value="foo"><nx-dropdown-item value="foo">Foo</nx-dropdown-item></nx-dropdown>
                <nx-dropdown value="bar"><nx-dropdown-item value="bar">Bar</nx-dropdown-item></nx-dropdown>
              `);

            const foo = await loader.getHarness(NxDropdownHarness.with({ valueText: 'Foo' }));
            const bar = await loader.getHarness(NxDropdownHarness.with({ valueText: /b/i }));

            expect(await foo.getValueText()).toBe('Foo');
            expect(await bar.getValueText()).toBe('Bar');
        });

        it('should find by disabled state', async () => {
            const { loader } = createTestComponent(`
                <nx-dropdown disabled></nx-dropdown>
                <nx-dropdown></nx-dropdown>
              `);

            const disabledTrue = await loader.getHarness(NxDropdownHarness.with({ disabled: true }));
            const disabledFalse = await loader.getHarness(NxDropdownHarness.with({ disabled: false }));

            expect(await disabledTrue.isDisabled()).toBe(true);
            expect(await disabledFalse.isDisabled()).toBe(false);
        });

        it('should find by readonly state', async () => {
            const { loader } = createTestComponent(`
                <nx-dropdown readonly></nx-dropdown>
                <nx-dropdown></nx-dropdown>
              `);

            const readonlyTrue = await loader.getHarness(NxDropdownHarness.with({ readonly: true }));
            const readonlyFalse = await loader.getHarness(NxDropdownHarness.with({ readonly: false }));

            expect(await readonlyTrue.isReadonly()).toBe(true);
            expect(await readonlyFalse.isReadonly()).toBe(false);
        });
    });
});

export function createTestComponent(template: string) {
    @Component({ template, standalone: true, imports: [NxFormfieldModule, NxDropdownModule] })
    class Comp {}
    const fixture = TestBed.createComponent(Comp);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return { loader, fixture };
}
