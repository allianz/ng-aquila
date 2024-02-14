import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxLinkModule } from '@aposin/ng-aquila/link';

import { NxLinkHarness } from './link-harness';

describe('NxLinkHarness', () => {
    let fixture: ComponentFixture<LinkHarnessTest>;
    let loader: HarnessLoader;

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkHarnessTest);
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should find all links', async () => {
        const links = await loader.getAllHarnesses(NxLinkHarness);
        expect(links.length).toBe(2);
    });

    it('should get text', async () => {
        const links = await loader.getAllHarnesses(NxLinkHarness);
        const texts = await parallel(() => links.map(l => l.getText()));
        expect(texts).toEqual(['Foo', 'Bar']);
    });

    it('should click element', async () => {
        const link = await loader.getHarness(NxLinkHarness.with({ text: 'Foo' }));
        await link.click();

        expect(fixture.componentInstance.clicked()).toBe(true);
    });

    it('should get anchor element', async () => {
        const link = await loader.getHarness(NxLinkHarness.with({ text: 'Foo' }));
        const anchor = await link.getAnchor();
        expect(await anchor.text()).toBe('Foo');
    });

    describe('filters', () => {
        it('should find links by text', async () => {
            const link = await loader.getHarness(NxLinkHarness.with({ text: 'Bar' }));
            expect(await link.getText()).toBe('Bar');
        });
    });
});

@Component({
    template: `
        <nx-link><a (click)="onClick()" href="https://localhost">Foo</a></nx-link>
        <nx-link><a href="https://localhost/path">Bar</a></nx-link>
    `,
    imports: [NxLinkModule],
    standalone: true,
})
class LinkHarnessTest {
    onClick() {
        this.clicked.set(true);
        return false; // prevent default behavior
    }
    clicked = signal(false);
}
