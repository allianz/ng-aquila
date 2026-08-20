import { AppearanceType } from '@allianz/ng-aquila/formfield';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxDropdownModule } from '../dropdown.module';
import { NxMultiSelectOptionComponent } from './multi-select-option.component';
import { MultiSelectOptionHarness } from './multi-select-option.test-utils';

describe('NxMultiSelectOptionComponent', () => {
  let fixture: ComponentFixture<MultiSelectOptionTest>;
  let testInstance: MultiSelectOptionTest;
  let multiSelectOptionInstance: NxMultiSelectOptionComponent<any>;
  let loader: HarnessLoader;
  let multiSelectOptionHarness: MultiSelectOptionHarness;

  async function configureTestingModule() {
    return TestBed.configureTestingModule({
      imports: [NxDropdownModule, BasicMultiSelectOptionComponent],
    }).compileComponents();
  }

  function createTestComponent(component: Type<MultiSelectOptionTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    multiSelectOptionInstance = testInstance.multiSelectOption;

    loader = TestbedHarnessEnvironment.loader(fixture);
  }

  beforeEach(async () => {
    await configureTestingModule();
    createTestComponent(BasicMultiSelectOptionComponent);
    multiSelectOptionHarness = await loader.getHarness(MultiSelectOptionHarness);
  });

  describe('basic multi select option', () => {
    it('has the label', async () => {
      const label = await multiSelectOptionHarness.getLabelText();
      expect(label).toBe('example label');
    });

    it('is not active', async () => {
      expect(await multiSelectOptionHarness.isActive()).toBe(false);
    });

    it('shows no check icon', async () => {
      const icon = await multiSelectOptionHarness.getCheckIcon();
      expect(icon).toBeNull();
    });

    it('is not selected', async () => {
      expect(await multiSelectOptionHarness.isSelected()).toBe(false);
    });

    it('is not disabled', async () => {
      expect(await multiSelectOptionHarness.isDisabled()).toBe(false);
    });

    it('has the aria attributes', async () => {
      const option = await multiSelectOptionHarness.host();

      const [role, id, ariaSelected, ariaDisabled] = await parallel(() => [
        option.getAttribute('role'),
        option.getAttribute('id'),
        option.getAttribute('aria-selected'),
        option.getAttribute('aria-disabled'),
      ]);

      expect(role).toBe('option');
      expect(id).toMatch(/nx-multi-select-option-\d+$/);
      expect(ariaSelected).toBeNull();
      expect(ariaDisabled).toBeNull();
    });

    describe('when selected by click', () => {
      beforeEach(async () => {
        await multiSelectOptionHarness.click();
      });

      it('is selected', async () => {
        expect(await multiSelectOptionHarness.isSelected()).toBe(true);
      });

      it('shows check icon', async () => {
        const icon = await multiSelectOptionHarness.getCheckIcon();
        expect(icon).not.toBeNull();
      });

      it('has the aria attributes', async () => {
        const option = await multiSelectOptionHarness.host();
        const ariaSelected = await option.getAttribute('aria-selected');

        expect(ariaSelected).toBe('true');
      });

      it('triggers the selectedChange event', () => {
        expect(testInstance.onSelect).toHaveBeenCalled();
      });
    });

    describe('when disabled', () => {
      beforeEach(() => {
        testInstance.disabled = true;
        fixture.detectChanges();
      });

      it('is disabled', async () => {
        expect(await multiSelectOptionHarness.isDisabled()).toBe(true);
      });

      it('has the aria attributes', async () => {
        const option = await multiSelectOptionHarness.host();
        const ariaDisabled = await option.getAttribute('aria-disabled');

        expect(ariaDisabled).toBe('true');
      });

      it('can not be selected', async () => {
        await multiSelectOptionHarness.click();
        expect(await multiSelectOptionHarness.isSelected()).toBe(false);
        expect(testInstance.onSelect).not.toHaveBeenCalled();
      });
    });

    describe('when set active', () => {
      beforeEach(() => {
        multiSelectOptionInstance.setActiveStyles();
        fixture.detectChanges();
      });

      it('is active', async () => {
        expect(await multiSelectOptionHarness.isActive()).toBe(true);
      });

      describe('and set inactive', () => {
        beforeEach(() => {
          multiSelectOptionInstance.setInactiveStyles();
          fixture.detectChanges();
        });

        it('is active', async () => {
          expect(await multiSelectOptionHarness.isActive()).toBe(false);
        });
      });
    });

    describe('when setting the appearance', () => {
      beforeEach(() => {
        testInstance.appearance = 'outline';
        fixture.detectChanges();
      });

      it('has appearance outline', async () => {
        expect(await multiSelectOptionHarness.isOutline()).toBe(true);
      });
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicMultiSelectOptionComponent);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Directive({ standalone: true })
abstract class MultiSelectOptionTest {
  @ViewChild(NxMultiSelectOptionComponent)
  multiSelectOption!: NxMultiSelectOptionComponent<any>;

  selected = false;
  disabled = false;
  label = 'example label';
  value = 'example value';
  onSelect = vi.fn().mockName('onSelect');
  appearance: AppearanceType = 'auto';
}

@Component({
  selector: 'test-basic-multi-select-option-component',
  template: `
    <div role="listbox" aria-label="exampleLabel">
      <nx-multi-select-option
        [appearance]="appearance"
        [selected]="selected"
        [disabled]="disabled"
        [label]="label"
        [value]="value"
        (selectedChange)="onSelect()"
      >
      </nx-multi-select-option>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMultiSelectOptionComponent],
})
class BasicMultiSelectOptionComponent extends MultiSelectOptionTest {}
