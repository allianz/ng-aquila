import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxIconHarness } from './icon-harness';

describe('NxIconHarness', () => {
    let fixture: ComponentFixture<IconHarnessTest>;
    let loader: HarnessLoader;

    beforeEach(() => {
        fixture = TestBed.createComponent(IconHarnessTest);
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should find all icons', async () => {
        const icons = await loader.getAllHarnesses(NxIconHarness);
        expect(icons.length).toBe(2);
    });

    it('should get name', async () => {
        const icons = await loader.getAllHarnesses(NxIconHarness);
        const iconNames = await parallel(() => icons.map(i => i.getName()));

        expect(iconNames).toEqual(['info', 'warning']);
    });

    describe('filters', () => {
        it('should find by name', async () => {
            const infoIcon = await loader.getHarness(NxIconHarness.with({ name: 'info' }));
            const warningIcon = await loader.getHarness(NxIconHarness.with({ name: /warn/ }));

            expect(await infoIcon.getName()).toBe('info');
            expect(await warningIcon.getName()).toBe('warning');
        });
    });
});

@Component({
    template: `
        <nx-icon name="info"></nx-icon>
        <nx-icon [name]="'warning'"></nx-icon>
    `,
    standalone: true,
    imports: [NxIconModule],
})
class IconHarnessTest {}
