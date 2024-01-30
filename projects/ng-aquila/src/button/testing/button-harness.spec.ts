import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxIconHarness } from '@aposin/ng-aquila/icon/testing';

import { NxButtonHarness } from './button-harness';

describe('NxButtonHarness', () => {
    let fixture: ComponentFixture<ButtonHarnessTest>;
    let loader: HarnessLoader;

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonHarnessTest);
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should load all buttons', async () => {
        const buttons = await loader.getAllHarnesses(NxButtonHarness);
        expect(buttons.length).toBe(30);
    });

    it('should get button text', async () => {
        const basicButton = await loader.getHarness(NxButtonHarness.with({ selector: '#text-button' }));
        const plainButton = await loader.getHarness(NxButtonHarness.with({ selector: '#text-plain-button' }));

        expect(await basicButton.getText()).toBe('Basic Button Text');
        expect(await plainButton.getText()).toBe('Plain Button Text');
    });

    it('should click button', async () => {
        const button = await loader.getHarness(NxButtonHarness.with({ selector: '#clickable' }));
        await button.click();
        expect(fixture.componentInstance.clicked).toBe(true);
    });

    it('should get href', async () => {
        const button = await loader.getHarness(NxButtonHarness.with({ selector: 'a[href]' }));
        expect(await button.getHref()).toBe('/some-path');
    });

    it('should get button type', async () => {
        const buttons = await loader.getAllHarnesses(NxButtonHarness.with({ ancestor: '#types' }));
        const types = await parallel(() => buttons.map(button => button.getType()));

        expect(types).toEqual(['basic', 'plain', 'icon']);
    });

    it('should get button variants', async () => {
        const buttons = await loader.getAllHarnesses(NxButtonHarness.with({ ancestor: '#variants' }));
        const types = await parallel(() => buttons.map(button => button.getVariant()));

        expect(types).toEqual(['primary', 'secondary', 'tertiary', 'cta', 'emphasis']);
    });

    it('should get whether button is disabled', async () => {
        const buttons = await loader.getAllHarnesses(NxButtonHarness.with({ ancestor: '#disabled' }));
        const disabled = await parallel(() => buttons.map(button => button.isDisabled()));
        expect(disabled).toEqual([true, true, true, false, false, false, false, false, false]);
    });

    it('should get whether button is critical', async () => {
        const buttons = await loader.getAllHarnesses(NxButtonHarness.with({ ancestor: '#critical' }));
        const danger = await parallel(() => buttons.map(button => button.isCritical()));
        expect(danger).toEqual([true, false, true, false, true, false]);
    });

    it('should get nested content', async () => {
        const button = await loader.getHarness(NxButtonHarness.with({ selector: '#icon-button' }));
        const icon = await button.getHarness(NxIconHarness);

        expect(await icon.getName()).toBe('info');
    });

    describe('filters', () => {
        it('should find by type', async () => {
            const buttons = await loader.getAllHarnesses(NxButtonHarness.with({ type: 'basic' }));
            expect(buttons.length).toBe(14);
        });

        it('should find by text', async () => {
            const buttons = await loader.getAllHarnesses(NxButtonHarness.with({ text: /Button Text/ }));
            expect(buttons.length).toBe(2);
        });

        it('should find by variant', async () => {
            const buttons = await loader.getAllHarnesses(NxButtonHarness.with({ variant: 'cta' }));
            expect(buttons.length).toBe(1);
        });

        it('should find by critical', async () => {
            const buttons = await loader.getAllHarnesses(NxButtonHarness.with({ critical: true }));
            expect(buttons.length).toBe(3);
        });
    });
});

@Component({
    selector: 'none',
    template: `
        <button id="text-button" nxButton>Basic Button Text</button>
        <button id="text-plain-button" nxPlainButton>Plain Button Text</button>
        <button id="icon-button" nxIconButton><nx-icon name="info" /></button>

        <button id="clickable" nxButton (click)="clicked = true">Clickable</button>

        <div id="disabled">
            <button nxButton disabled></button>
            <button nxPlainButton disabled></button>
            <button nxIconButton disabled></button>
            <a nxButton [disabled]="false"></a>
            <a nxPlainButton [disabled]="false"></a>
            <a nxIconButton [disabled]="false"></a>
            <!-- there should be no difference between omitting, and explicitly setting to false -->
            <a nxButton></a>
            <a nxPlainButton></a>
            <a nxIconButton></a>
        </div>

        <div id="types">
            <button nxButton></button>
            <button nxPlainButton></button>
            <button nxIconButton></button>
        </div>

        <div id="variants">
            <button nxButton="primary">Primary</button>
            <button nxButton="secondary">Secondary</button>
            <button nxButton="tertiary">Tertiary</button>
            <button nxButton="cta">CTA</button>
            <button nxButton="emphasis">Emphasis</button>
        </div>

        <div id="critical">
            <button nxButton="danger"></button>
            <button nxButton></button>
            <button nxPlainButton critical></button>
            <button nxPlainButton [critical]="false"></button>
            <button nxIconButton="danger"></button>
            <button nxIconButton></button>
        </div>

        <a nxButton href="/some-path">Basic anchor</a>
        <a nxPlainButton>Plain anchor</a>
        <a nxIconButton></a>
    `,
    standalone: true,
    imports: [NxButtonModule, NxIconModule],
})
class ButtonHarnessTest {
    @Input() clicked = false;
}
