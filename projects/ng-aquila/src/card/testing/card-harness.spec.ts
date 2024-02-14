import { parallel } from '@angular/cdk/testing';

import { NxCardHarness } from './card-harness';
import { createTestComponent } from './create-test-component';

describe('NxCardHarness', () => {
    it('should find all cards', async () => {
        const { loader } = createTestComponent(`
            <nx-card />
            <nx-card />
            <nx-card />
        `);
        const cards = await loader.getAllHarnesses(NxCardHarness);
        expect(cards.length).toBe(3);
    });

    it('should get the heading text', async () => {
        const { loader } = createTestComponent(`
            <nx-card><h3>Foo</h3></nx-card>
            <nx-card><h6>Bar</h6></nx-card>
            <nx-card><div role="heading">Baz</div></nx-card>
        `);
        const cards = await loader.getAllHarnesses(NxCardHarness);
        const headings = await parallel(() => cards.map(c => c.getHeadingText()));
        expect(headings).toEqual(['Foo', 'Bar', 'Baz']);
    });

    describe('filters', () => {
        it('should find cards by heading', async () => {
            const { loader } = createTestComponent(`
                <nx-card><h2>Foo</h2></nx-card>
                <nx-card><h2>Bar</h2></nx-card>
            `);
            const fooCard = await loader.getHarness(NxCardHarness.with({ heading: 'Foo' }));
            const barCard = await loader.getHarness(NxCardHarness.with({ heading: /bar/i }));

            expect(await fooCard.getHeadingText()).toBe('Foo');
            expect(await barCard.getHeadingText()).toBe('Bar');
        });

        it('should find cards by highlight existing', async () => {
            const { loader } = createTestComponent(`
                <nx-card><h2>Foo</h2></nx-card>
                <nx-card highlight><h2>Bar</h2></nx-card>
            `);

            const fooCard = await loader.getHarness(NxCardHarness.with({ highlight: false }));
            const barCard = await loader.getHarness(NxCardHarness.with({ highlight: true }));

            expect(await fooCard.getHeadingText()).toBe('Foo');
            expect(await barCard.getHeadingText()).toBe('Bar');
        });

        it('should find cards by highlight text', async () => {
            const { loader } = createTestComponent(`
                <nx-card highlight>
                    <div nxHighlightHeader>Good</div>
                    <h2>Foo</h2>
                </nx-card>
                <nx-card highlight>
                    <div nxHighlightHeader>Better</div>
                    <h2>Bar</h2>
                </nx-card>
            `);

            const fooCard = await loader.getHarness(NxCardHarness.with({ highlight: 'Good' }));
            const barCard = await loader.getHarness(NxCardHarness.with({ highlight: /better/i }));

            expect(await fooCard.getHeadingText()).toBe('Foo');
            expect(await barCard.getHeadingText()).toBe('Bar');
        });
    });
});
