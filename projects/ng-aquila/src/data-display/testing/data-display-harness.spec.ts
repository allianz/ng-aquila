import { NxDataDisplayModule } from '@allianz/ng-aquila/data-display';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NxDataDisplayHarness } from './data-display-harness';

describe('NxDataDisplayHarness', () => {
  let loader: HarnessLoader;

  beforeEach(() => {
    const fixture = TestBed.createComponent(DataDisplayHarnessTest);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should get label', async () => {
    const display = await loader.getHarness(NxDataDisplayHarness.with({ label: 'FooBar' }));

    expect(await display.getLabel()).toEqual('FooBar');
  });

  it('should get value', async () => {
    const display = await loader.getHarness(NxDataDisplayHarness.with({ label: 'FooBar' }));

    expect(await display.getValue()).toEqual('Value');
  });

  describe('filters', () => {
    it('should find by label', async () => {
      const display = await loader.getHarness(NxDataDisplayHarness.with({ label: /^Foo$/ }));

      expect(await display.getLabel()).toEqual('Foo');
    });

    it('should find by value', async () => {
      const display = await loader.getHarness(NxDataDisplayHarness.with({ label: /^Foo$/ }));

      expect(await display.getLabel()).toEqual('Foo');
    });
  });
});

@Component({
  template: `
    <nx-data-display label="FooBar">Value</nx-data-display>
    <nx-data-display>
      <nx-data-display-label>Foo</nx-data-display-label>
      Value One
    </nx-data-display>
    <nx-data-display label="Bar">Value Two</nx-data-display>
  `,
  imports: [NxDataDisplayModule],
})
class DataDisplayHarnessTest {}
