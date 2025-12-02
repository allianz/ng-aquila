import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NxCardModule } from '../card.module';
import { NxSelectableCardHarness } from './selectable-card-harness';

describe('NxSelectableCardHarness', () => {
  it('should find all selectable cards', async () => {
    const fixture = TestBed.createComponent(BasicTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const cards = await loader.getAllHarnesses(NxSelectableCardHarness);
    expect(cards.length).toBe(3);
  });

  it('should get the heading text', async () => {
    const fixture = TestBed.createComponent(HeadingElementsTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const cards = await loader.getAllHarnesses(NxSelectableCardHarness);
    const headings = await parallel(() => cards.map((c) => c.getHeadingText()));
    expect(headings).toEqual(['Foo', 'Bar', 'Baz']);
  });

  it('should get checked state', async () => {
    const fixture = TestBed.createComponent(CheckedStateTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const cards = await loader.getAllHarnesses(NxSelectableCardHarness);
    const checkeds = await parallel(() => cards.map((c) => c.isChecked()));

    expect(checkeds).toEqual([false, true]);
  });

  it('should click card', async () => {
    const fixture = TestBed.createComponent(ClickTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

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
    let loader: HarnessLoader;

    beforeEach(() => {
      const fixture = TestBed.createComponent(FilterTest);
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should find cards by heading', async () => {
      const fooCard = await loader.getHarness(NxSelectableCardHarness.with({ heading: 'Foo' }));
      const barCard = await loader.getHarness(NxSelectableCardHarness.with({ heading: /bar/i }));

      expect(await fooCard.getHeadingText()).toBe('Foo');
      expect(await barCard.getHeadingText()).toBe('Bar');
    });

    it('should find cards by highlight existing', async () => {
      const fooCard = await loader.getHarness(NxSelectableCardHarness.with({ highlight: false }));
      const barCard = await loader.getHarness(NxSelectableCardHarness.with({ highlight: true }));

      expect(await fooCard.getHeadingText()).toBe('Foo');
      expect(await barCard.getHeadingText()).toBe('HasHighlight');
    });

    it('should find cards by highlight text', async () => {
      const fooCard = await loader.getHarness(NxSelectableCardHarness.with({ highlight: 'Good' }));
      const barCard = await loader.getHarness(
        NxSelectableCardHarness.with({ highlight: /better/i }),
      );

      expect(await fooCard.getHeadingText()).toBe('GoodFoo');
      expect(await barCard.getHeadingText()).toBe('BetterBar');
    });

    it('should find cards by checked state', async () => {
      const fooCard = await loader.getHarness(NxSelectableCardHarness.with({ checked: false }));
      const barCard = await loader.getHarness(NxSelectableCardHarness.with({ checked: true }));

      expect(await fooCard.getHeadingText()).toBe('Foo');
      expect(await barCard.getHeadingText()).toBe('CheckedBar');
    });
  });
});

@Component({
  template: `
    <nx-selectable-card />
    <nx-selectable-card />
    <nx-selectable-card />
  `,
  imports: [NxCardModule],
})
class BasicTest {}

@Component({
  template: `
    <nx-selectable-card><h3>Foo</h3></nx-selectable-card>
    <nx-selectable-card><h6>Bar</h6></nx-selectable-card>
    <nx-selectable-card><div role="heading">Baz</div></nx-selectable-card>
  `,
  imports: [NxCardModule],
})
class HeadingElementsTest {}

@Component({
  template: `
    <nx-selectable-card><h2>Foo</h2></nx-selectable-card>
    <nx-selectable-card checked><h2>Bar</h2></nx-selectable-card>
  `,
  imports: [NxCardModule],
})
class CheckedStateTest {}

@Component({
  template: `<nx-selectable-card>123</nx-selectable-card>`,
  imports: [NxCardModule],
})
class ClickTest {}

@Component({
  template: `
    <nx-selectable-card><h2>Foo</h2></nx-selectable-card>
    <nx-selectable-card><h2>Bar</h2></nx-selectable-card>
    <nx-selectable-card><h2>NoHighlight</h2></nx-selectable-card>
    <nx-selectable-card highlight><h2>HasHighlight</h2></nx-selectable-card>
    <nx-selectable-card highlight>
      <div nxHighlightHeader>Good</div>
      <h2>GoodFoo</h2>
    </nx-selectable-card>
    <nx-selectable-card highlight>
      <div nxHighlightHeader>Better</div>
      <h2>BetterBar</h2>
    </nx-selectable-card>
    <nx-selectable-card><h2>UncheckedFoo</h2></nx-selectable-card>
    <nx-selectable-card checked><h2>CheckedBar</h2></nx-selectable-card>
  `,
  imports: [NxCardModule],
})
class FilterTest {}

@Component({
  template: `<nx-selectable-card [formControl]="control"></nx-selectable-card>`,
  imports: [NxCardModule, FormsModule, ReactiveFormsModule],
})
class ErrorTest {
  control = new FormControl();
}
