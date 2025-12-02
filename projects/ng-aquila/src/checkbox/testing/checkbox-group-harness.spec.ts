import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCheckboxGroupHarness } from './checkbox-group-harness';

describe('NxCheckboxGroupHarness', () => {
  let fixture: ComponentFixture<CheckboxHarnessGroupTest>;
  let loader: HarnessLoader;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxHarnessGroupTest);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should get all checkboxes inside group', async () => {
    const checkboxGroups = await loader.getAllHarnesses(NxCheckboxGroupHarness);
    const checkboxes = await checkboxGroups[0].getCheckboxes();
    expect(checkboxes.length).toEqual(3);
  });

  it('should get selected checkboxes inside group', async () => {
    const checkboxGroups = await loader.getAllHarnesses(NxCheckboxGroupHarness);
    const selectedCheckbox = await checkboxGroups[0].getSelectedCheckboxes();
    const checkedLabels = await parallel(() => selectedCheckbox.map((c) => c.getLabel()));
    expect(checkedLabels).toEqual(['Second', 'Third']);
  });

  it('should not find checked boxes if none is checked', async () => {
    fixture.componentInstance.checked.set(false);
    fixture.detectChanges();

    const checkboxGroups = await loader.getAllHarnesses(NxCheckboxGroupHarness);
    const selected = await checkboxGroups[0].getSelectedCheckboxes();
    expect(selected).toEqual([]);
  });

  it('should get label from nx-label', async () => {
    const checkboxGroups = await loader.getAllHarnesses(NxCheckboxGroupHarness);
    expect(await checkboxGroups[0].getLabel()).toBe('First');
  });

  it('should get label from aria-label', async () => {
    fixture.componentInstance.showLabel.set(false);
    fixture.detectChanges();
    const checkboxGroups = await loader.getAllHarnesses(NxCheckboxGroupHarness);
    expect(await checkboxGroups[0].getLabel()).toBe('Some Name');
  });

  describe('filters', () => {
    it('should find checkbox group by label', async () => {
      const checkboxGroupFirst = await loader.getHarness(
        NxCheckboxGroupHarness.with({ label: /fir/i }),
      );
      const checkboxGroupSecond = await loader.getHarness(
        NxCheckboxGroupHarness.with({ label: 'Second' }),
      );
      expect(await checkboxGroupFirst.getLabel()).toBe('First');
      expect(await checkboxGroupSecond.getLabel()).toBe('Second');
    });
  });
});

@Component({
  selector: 'test-checkbox-harness-group',
  template: `
    <nx-checkbox-group aria-label="Some Name">
      @if (showLabel()) {
        <nx-label>First</nx-label>
      }
      <nx-checkbox value="FIRST">First</nx-checkbox>
      <nx-checkbox [checked]="checked()" value="SECOND">Second</nx-checkbox>
      <nx-checkbox [checked]="checked()" value="THIRD">Third</nx-checkbox>
    </nx-checkbox-group>
    <nx-checkbox-group><nx-label>Second</nx-label></nx-checkbox-group>
  `,
  imports: [NxCheckboxModule, NxLabelComponent],
})
class CheckboxHarnessGroupTest {
  checked = signal(true);
  showLabel = signal(true);
}
