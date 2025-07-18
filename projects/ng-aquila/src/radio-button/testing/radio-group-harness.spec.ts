import { NxRadioModule } from '@allianz/ng-aquila/radio-button';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NxRadioGroupHarness } from './radio-group-harness';

describe('NxRadioGroupHarness', () => {
  it('should get all radio buttons inside group', async () => {
    const { loader } = createComponent(
      `<nx-radio-group>
                <nx-radio value="FIRST">First</nx-radio>
                <nx-radio value="SECOND">Second</nx-radio>
            </nx-radio-group>

            <nx-radio>Outside</nx-radio>`,
    );

    const radioGroup = await loader.getHarness(NxRadioGroupHarness);
    const radioButtons = await radioGroup.getRadioButtons();
    expect(radioButtons.length).toEqual(2);
  });

  it('should get selected radio button inside group', async () => {
    const { loader } = createComponent(
      `<nx-radio-group value="SECOND">
                <nx-radio value="FIRST">First</nx-radio>
                <nx-radio value="SECOND">Second</nx-radio>
            </nx-radio-group>`,
    );

    const radioGroup = await loader.getHarness(NxRadioGroupHarness);
    const selectedRadio = await radioGroup.getSelectedRadio();
    expect(await selectedRadio?.getLabel()).toBe('Second');
    expect(await radioGroup.getSelectedRadioLabel()).toBe('Second');
  });

  it('should not find selected radio if none is selected', async () => {
    const { loader } = createComponent(`
            <nx-radio-group> <nx-radio value="FIRST">First</nx-radio> </nx-radio-group>
        `);

    const radioGroup = await loader.getHarness(NxRadioGroupHarness);
    const selectedRadio = await radioGroup.getSelectedRadio();
    expect(selectedRadio).toBe(null);
  });

  it('should get label from nx-label', async () => {
    const { loader } = createComponent(`
            <nx-radio-group>
                <nx-radio>Radio Label</nx-radio>
                <nx-label>Foo</nx-label>
            </nx-radio-group>`);
    const radioGroup = await loader.getHarness(NxRadioGroupHarness);
    expect(await radioGroup.getLabel()).toBe('Foo');
  });

  it('should get label from aria-label', async () => {
    const { loader } = createComponent(
      ` <nx-radio-group aria-label="Some Name"></nx-radio-group> `,
    );
    const radioGroup = await loader.getHarness(NxRadioGroupHarness);
    expect(await radioGroup.getLabel()).toBe('Some Name');
  });

  it('should get disabled state', async () => {
    const { loader } = createComponent(
      ` <nx-radio-group aria-label="Some Name" [disabled]="true"></nx-radio-group> `,
    );
    const radioGroup = await loader.getHarness(NxRadioGroupHarness);
    expect(await radioGroup.isDisabled()).toBe(true);
  });

  it('should click item', async () => {
    const { loader } = createComponent(
      `<nx-radio-group value="SECOND">
                <nx-radio value="FIRST">First</nx-radio>
                <nx-radio value="SECOND">Second</nx-radio>
            </nx-radio-group>`,
    );

    const radioGroup = await loader.getHarness(NxRadioGroupHarness);
    await radioGroup.clickOption({ label: 'First' });
    expect(await radioGroup.getSelectedRadioLabel()).toBe('First');
  });

  describe('filters', () => {
    it('should find radio group by label', async () => {
      const { loader } = createComponent(`
                <nx-radio-group><nx-label>First</nx-label></nx-radio-group>
                <nx-radio-group><nx-label>Second</nx-label></nx-radio-group>
            `);
      const radioGroupFirst = await loader.getHarness(NxRadioGroupHarness.with({ label: /fir/i }));
      const radioGroupSecond = await loader.getHarness(
        NxRadioGroupHarness.with({ label: 'Second' }),
      );
      expect(await radioGroupFirst.getLabel()).toBe('First');
      expect(await radioGroupSecond.getLabel()).toBe('Second');
    });

    it('should find radio group by disabled state', async () => {
      const { loader } = createComponent(`
                <nx-radio-group [disabled]="false"><nx-label>First</nx-label></nx-radio-group>
                <nx-radio-group [disabled]="true"><nx-label>Second</nx-label></nx-radio-group>
            `);
      const radioGroupFirst = await loader.getHarness(
        NxRadioGroupHarness.with({ disabled: false }),
      );
      const radioGroupSecond = await loader.getHarness(
        NxRadioGroupHarness.with({ disabled: true }),
      );
      expect(await radioGroupFirst.getLabel()).toBe('First');
      expect(await radioGroupSecond.getLabel()).toBe('Second');
    });
  });
});

function createComponent(template: string) {
  @Component({ template, standalone: true, imports: [NxRadioModule] })
  class Comp {}
  const fixture = TestBed.createComponent(Comp);
  fixture.detectChanges();
  const loader = TestbedHarnessEnvironment.loader(fixture);
  return { loader, fixture };
}
