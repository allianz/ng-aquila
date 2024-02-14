import { parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';

import { NxCheckboxGroupHarness } from './checkbox-group-harness';

describe('NxCheckboxGroupHarness', () => {
    it('should get all checkboxes inside group', async () => {
        const { loader } = createComponent(
            `<nx-checkbox-group>
                <nx-checkbox value="FIRST">First</nx-checkbox>
                <nx-checkbox value="SECOND">Second</nx-checkbox>
            </nx-checkbox-group>

            <nx-checkbox>Outside</nx-checkbox>`,
        );

        const checkboxGroup = await loader.getHarness(NxCheckboxGroupHarness);
        const checkboxes = await checkboxGroup.getCheckboxes();
        expect(checkboxes.length).toEqual(2);
    });

    it('should get selected checkboxes inside group', async () => {
        const { loader } = createComponent(
            `<nx-checkbox-group>
                <nx-checkbox value="FIRST">First</nx-checkbox>
                <nx-checkbox checked value="SECOND">Second</nx-checkbox>
                <nx-checkbox checked value="THIRD">Third</nx-checkbox>
            </nx-checkbox-group>`,
        );

        const checkboxGroup = await loader.getHarness(NxCheckboxGroupHarness);
        const selectedCheckbox = await checkboxGroup.getSelectedCheckboxes();
        const checkedLabels = await parallel(() => selectedCheckbox.map(c => c.getLabel()));
        expect(checkedLabels).toEqual(['Second', 'Third']);
    });

    it('should not find checked boxes if none is checked', async () => {
        const { loader } = createComponent(`
            <nx-checkbox-group> <nx-checkbox value="FIRST">First</nx-checkbox> </nx-checkbox-group>
        `);

        const checkboxGroup = await loader.getHarness(NxCheckboxGroupHarness);
        const selected = await checkboxGroup.getSelectedCheckboxes();
        expect(selected).toEqual([]);
    });

    it('should get label from nx-label', async () => {
        const { loader } = createComponent(`
            <nx-checkbox-group>
                <nx-checkbox>Checkbox Label</nx-checkbox>
                <nx-label>Foo</nx-label>
            </nx-checkbox-group>`);
        const checkboxGroup = await loader.getHarness(NxCheckboxGroupHarness);
        expect(await checkboxGroup.getLabel()).toBe('Foo');
    });

    it('should get label from aria-label', async () => {
        const { loader } = createComponent(` <nx-checkbox-group aria-label="Some Name"></nx-checkbox-group> `);
        const checkboxGroup = await loader.getHarness(NxCheckboxGroupHarness);
        expect(await checkboxGroup.getLabel()).toBe('Some Name');
    });

    describe('filters', () => {
        it('should find checkbox group by label', async () => {
            const { loader } = createComponent(`
                <nx-checkbox-group><nx-label>First</nx-label></nx-checkbox-group>
                <nx-checkbox-group><nx-label>Second</nx-label></nx-checkbox-group>
            `);
            const checkboxGroupFirst = await loader.getHarness(NxCheckboxGroupHarness.with({ label: /fir/i }));
            const checkboxGroupSecond = await loader.getHarness(NxCheckboxGroupHarness.with({ label: 'Second' }));
            expect(await checkboxGroupFirst.getLabel()).toBe('First');
            expect(await checkboxGroupSecond.getLabel()).toBe('Second');
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
