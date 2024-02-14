import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NxDataDisplayModule } from '@aposin/ng-aquila/data-display';

import { NxDataDisplayHarness } from './data-display-harness';

it('should get label', async () => {
    const loader = createComponent(`<nx-data-display label="FooBar">Value</nx-data-display>`);
    const display = await loader.getHarness(NxDataDisplayHarness);

    expect(await display.getLabel()).toEqual('FooBar');
});

it('should get value', async () => {
    const loader = createComponent(`<nx-data-display label="FooBar">Value</nx-data-display>`);
    const display = await loader.getHarness(NxDataDisplayHarness);

    expect(await display.getValue()).toEqual('Value');
});

describe('filters', () => {
    it('should find by label', async () => {
        const loader = createComponent(`
            <nx-data-display> <nx-data-display-label>Foo</nx-data-display-label> Value One </nx-data-display>
            <nx-data-display label="Bar"> Value Two </nx-data-display>
         `);
        const display = await loader.getHarness(NxDataDisplayHarness.with({ label: /Foo/ }));

        expect(await display.getLabel()).toEqual('Foo');
    });

    it('should find by value', async () => {
        const loader = createComponent(`
            <nx-data-display label="Foo"> Value One </nx-data-display>
            <nx-data-display label="Bar"> Value Two </nx-data-display>
         `);
        const display = await loader.getHarness(NxDataDisplayHarness.with({ label: /Foo/ }));

        expect(await display.getLabel()).toEqual('Foo');
    });
});

function createComponent(template: string) {
    @Component({ template, standalone: true, imports: [NxDataDisplayModule] })
    class Comp {}
    const fixture = TestBed.createComponent(Comp);
    fixture.detectChanges();
    return TestbedHarnessEnvironment.loader(fixture);
}
