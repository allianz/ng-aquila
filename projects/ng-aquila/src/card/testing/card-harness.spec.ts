import { NxCardModule } from '@allianz/ng-aquila/card';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCardHarness } from './card-harness';

describe('NxCardHarness', () => {
  let fixture: ComponentFixture<CardHarnessTest>;
  let loader: HarnessLoader;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHarnessTest);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should find all cards', async () => {
    const cards = await loader.getAllHarnesses(NxCardHarness);
    expect(cards.length).toBe(3);
  });

  it('should get the heading text', async () => {
    const cards = await loader.getAllHarnesses(NxCardHarness);
    const headings = await parallel(() => cards.map((c) => c.getHeadingText()));
    expect(headings).toEqual(['Foo', 'Bar', 'Baz']);
  });

  describe('filters', () => {
    it('should find cards by heading', async () => {
      const fooCard = await loader.getHarness(NxCardHarness.with({ heading: 'Foo' }));
      const barCard = await loader.getHarness(NxCardHarness.with({ heading: /bar/i }));

      expect(await fooCard.getHeadingText()).toBe('Foo');
      expect(await barCard.getHeadingText()).toBe('Bar');
    });

    it('should find cards by highlight existing', async () => {
      const notHighlighted = await loader.getHarness(NxCardHarness.with({ highlight: false }));
      const highlighted = await loader.getHarness(NxCardHarness.with({ highlight: true }));

      expect(await notHighlighted.getHeadingText()).toBe('Baz');
      expect(await highlighted.getHeadingText()).toBe('Foo');
    });

    it('should find cards by highlight text', async () => {
      const fooCard = await loader.getHarness(NxCardHarness.with({ highlight: 'Good' }));
      const barCard = await loader.getHarness(NxCardHarness.with({ highlight: /better/i }));

      expect(await fooCard.getHeadingText()).toBe('Foo');
      expect(await barCard.getHeadingText()).toBe('Bar');
    });
  });
});

@Component({
  selector: 'test-card-harness-component',
  template: `
    <nx-card highlight>
      <div nxHighlightHeader>Good</div>
      <h2>Foo</h2>
    </nx-card>
    <nx-card highlight>
      <div nxHighlightHeader>Better</div>
      <h3>Bar</h3>
    </nx-card>
    <nx-card>
      <div role="heading">Baz</div>
    </nx-card>
  `,
  imports: [NxCardModule],
})
class CardHarnessTest {}
