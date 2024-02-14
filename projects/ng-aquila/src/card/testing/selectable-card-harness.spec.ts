import { parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NxCardModule } from '../card.module';
import { createTestComponent } from './create-test-component';
import { NxSelectableCardHarness } from './selectable-card-harness';

describe('NxSelectableCardHarness', () => {
    it('should find all selectable cards', async () => {
        const { loader } = createTestComponent(`
            <nx-selectable-card />
            <nx-selectable-card />
            <nx-selectable-card />
        `);
        const cards = await loader.getAllHarnesses(NxSelectableCardHarness);
        expect(cards.length).toBe(3);
    });

    it('should get the heading text', async () => {
        const { loader } = createTestComponent(`
            <nx-selectable-card><h3>Foo</h3></nx-selectable-card>
            <nx-selectable-card><h6>Bar</h6></nx-selectable-card>
            <nx-selectable-card><div role="heading">Baz</div></nx-selectable-card>
        `);
        const cards = await loader.getAllHarnesses(NxSelectableCardHarness);
        const headings = await parallel(() => cards.map(c => c.getHeadingText()));
        expect(headings).toEqual(['Foo', 'Bar', 'Baz']);
    });

    it('should get checked state', async () => {
        const { loader } = createTestComponent(`
            <nx-selectable-card><h2>Foo</h2></nx-selectable-card>
            <nx-selectable-card checked><h2>Bar</h2></nx-selectable-card>
        `);
        const cards = await loader.getAllHarnesses(NxSelectableCardHarness);
        const checkeds = await parallel(() => cards.map(c => c.isChecked()));

        expect(checkeds).toEqual([false, true]);
    });

    it('should click card', async () => {
        const { loader } = createTestComponent(`<nx-selectable-card>123</nx-selectable-card>`);
        const card = await loader.getHarness(NxSelectableCardHarness);
        await card.click();
        expect(await card.isChecked()).toBeTrue();
    });

    it('should get error state', async () => {
        const fixture = TestBed.createComponent(ErrorTest);
        fixture.detectChanges();
        const loader = TestbedHarnessEnvironment.loader(fixture);
        const group = await loader.getHarness(NxSelectableCardHarness);

        expect(await group.hasError()).toBeFalse();

        fixture.componentInstance.control.setErrors({ invalid: true });
        fixture.componentInstance.control.markAllAsTouched();
        fixture.detectChanges();

        expect(await group.hasError()).toBeTrue();
    });

    describe('filters', () => {
        it('should find cards by heading', async () => {
            const { loader } = createTestComponent(`
                <nx-selectable-card><h2>Foo</h2></nx-selectable-card>
                <nx-selectable-card><h2>Bar</h2></nx-selectable-card>
            `);
            const fooCard = await loader.getHarness(NxSelectableCardHarness.with({ heading: 'Foo' }));
            const barCard = await loader.getHarness(NxSelectableCardHarness.with({ heading: /bar/i }));

            expect(await fooCard.getHeadingText()).toBe('Foo');
            expect(await barCard.getHeadingText()).toBe('Bar');
        });

        it('should find cards by highlight existing', async () => {
            const { loader } = createTestComponent(`
                <nx-selectable-card><h2>Foo</h2></nx-selectable-card>
                <nx-selectable-card highlight><h2>Bar</h2></nx-selectable-card>
            `);

            const fooCard = await loader.getHarness(NxSelectableCardHarness.with({ highlight: false }));
            const barCard = await loader.getHarness(NxSelectableCardHarness.with({ highlight: true }));

            expect(await fooCard.getHeadingText()).toBe('Foo');
            expect(await barCard.getHeadingText()).toBe('Bar');
        });

        it('should find cards by highlight text', async () => {
            const { loader } = createTestComponent(`
                <nx-selectable-card highlight>
                    <div nxHighlightHeader>Good</div>
                    <h2>Foo</h2>
                </nx-selectable-card>
                <nx-selectable-card highlight>
                    <div nxHighlightHeader>Better</div>
                    <h2>Bar</h2>
                </nx-selectable-card>
            `);

            const fooCard = await loader.getHarness(NxSelectableCardHarness.with({ highlight: 'Good' }));
            const barCard = await loader.getHarness(NxSelectableCardHarness.with({ highlight: /better/i }));

            expect(await fooCard.getHeadingText()).toBe('Foo');
            expect(await barCard.getHeadingText()).toBe('Bar');
        });

        it('should find cards by checked state', async () => {
            const { loader } = createTestComponent(`
                <nx-selectable-card><h2>Foo</h2></nx-selectable-card>
                <nx-selectable-card checked><h2>Bar</h2></nx-selectable-card>
            `);

            const fooCard = await loader.getHarness(NxSelectableCardHarness.with({ checked: false }));
            const barCard = await loader.getHarness(NxSelectableCardHarness.with({ checked: true }));

            expect(await fooCard.getHeadingText()).toBe('Foo');
            expect(await barCard.getHeadingText()).toBe('Bar');
        });
    });
});

@Component({
    template: `<nx-selectable-card [formControl]="control"></nx-selectable-card>`,
    standalone: true,
    imports: [NxCardModule, FormsModule, ReactiveFormsModule],
})
class ErrorTest {
    control = new FormControl();
}
