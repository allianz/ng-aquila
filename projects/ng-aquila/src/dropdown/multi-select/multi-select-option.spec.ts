
import {ComponentHarness, HarnessLoader, parallel} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {Component, Directive, Type, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NxDropdownModule} from '../dropdown.module';
import {NxMultiSelectOptionComponent} from './multi-select-option.component';

// tslint:disable:component-class-suffix

/**
 * @docs-private
 */
export class MultiSelectOptionHarness extends ComponentHarness {
  static hostSelector = 'nx-multi-select-option';

  getLabel = this.locatorFor('.nx-checkbox__label');

  getCheckbox = this.locatorFor('.nx-checkbox');

  getCheckIcon = this.locatorForOptional('nx-icon');

  async getLabelText() {
    const label = await this.getLabel();
    return label.text();
  }

  async isSelected() {
    const checkbox = await this.getCheckbox();
    return checkbox.hasClass('is-selected');
  }

  async isActive() {
    const checkbox = await this.getCheckbox();
    return checkbox.hasClass('is-active');
  }

  async isDisabled() {
    const checkbox = await this.getCheckbox();
    return checkbox.hasClass('is-disabled');
  }

  async isOutline() {
    const host = await this.host();
    return host.hasClass('is-outline');
  }

  async click() {
    const option = await this.host();
    await option.click();
  }

  async getId() {
    const host = await this.host();
    return await host.getAttribute('id');
  }
}

describe('NxMultiSelectOptionComponent', () => {
  let fixture: ComponentFixture<MultiSelectOptionTest>;
  let testInstance: MultiSelectOptionTest;
  let multiSelectOptionInstance: NxMultiSelectOptionComponent<any>;
  let loader: HarnessLoader;
  let multiSelectOptionHarness: MultiSelectOptionHarness;

  function configureTestingModule(declarations: any[]) {
    return TestBed.configureTestingModule({
      imports: [
        NxDropdownModule
      ],
      declarations
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
    await configureTestingModule([BasicMultiSelectOptionComponent, NxMultiSelectOptionComponent]);
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
        option.getAttribute('aria-disabled')
      ]);

      expect(role).toBe('option');
      expect(id).toMatch(/^nx-multi-select-option-\d+$/);
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
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Directive()
abstract class MultiSelectOptionTest {
  @ViewChild(NxMultiSelectOptionComponent) multiSelectOption!: NxMultiSelectOptionComponent<any>;

  selected = false;
  disabled = false;
  label = 'example label';
  value = 'example value';
  onSelect = jasmine.createSpy('onSelect');
  appearance = 'auto';
}

@Component({
  template: `
    <div role="listbox" aria-label="exampleLabel">
      <nx-multi-select-option
        [appearance]="appearance"
        [selected]="selected"
        [disabled]="disabled"
        [label]="label"
        [value]="value"
        (selectedChange)="onSelect()">
      </nx-multi-select-option>
    </div>
   `
})
class BasicMultiSelectOptionComponent extends MultiSelectOptionTest {}
