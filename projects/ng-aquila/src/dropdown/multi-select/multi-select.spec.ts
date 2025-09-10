import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  AppearanceType,
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldModule,
} from '@allianz/ng-aquila/formfield';
import {
  DOWN_ARROW,
  END,
  ESCAPE,
  HOME,
  LEFT_ARROW,
  RIGHT_ARROW,
  TAB,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ComponentHarness,
  HarnessLoader,
  LocatorFactory,
  parallel,
  TestElement,
} from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxDropdownIntl } from '../dropdown';
import { NxDropdownModule } from '../dropdown.module';
import { NxMultiSelectComponent } from './multi-select.component';
import { MultiSelectOptionHarness } from './multi-select-option.spec';

class CustomIntl extends NxDropdownIntl {
  selectAll = 'Test select all';
  clearAll = 'Test clear all';
}
class MultiSelectHarness extends ComponentHarness {
  static hostSelector = 'nx-multi-select';

  private readonly documentRootLocator: LocatorFactory = this.documentRootLocatorFactory();

  getValue = this.locatorFor('.value');

  getPanel = this.documentRootLocator.locatorForOptional('.panel');

  getOverlayPane = this.documentRootLocator.locatorForOptional('.cdk-overlay-pane');

  getBackdrop = this.documentRootLocator.locatorFor('.cdk-overlay-backdrop');

  getOptions = this.documentRootLocator.locatorForAll(MultiSelectOptionHarness);

  getSelectAllButton = this.documentRootLocator.locatorForOptional('nx-multi-select-all');

  getClearAllButton = this.documentRootLocator.locatorForOptional('.actions button');

  getFilter = this.documentRootLocator.locatorForOptional('.filter input');

  getPanelHeader = this.documentRootLocator.locatorForOptional('.panel-header');

  getClearFilterButton = this.documentRootLocator.locatorFor('.filter .clear');

  getDivider = this.documentRootLocator.locatorForOptional('.divider');

  getCheckmark = this.documentRootLocator.locatorForOptional('nx-multi-select-all .is-selected');

  getIndeterminate = this.documentRootLocator.locatorForOptional(
    'nx-multi-select-all .nx-checkbox__indeterminate-indicator',
  );

  async clickOptions(indexes: number[]) {
    const options = await this.getOptions();
    for (const i of indexes) {
      await options[i].click();
    }
  }

  async getValueText() {
    const label = await this.getValue();
    return label.text();
  }

  async setFilter(query: string) {
    const filter = await this.getFilter();
    if (!filter) {
      throw Error('Filter input not found');
    }
    await filter?.setInputValue(query);
    await filter?.dispatchEvent('input');
  }

  async clickClearFilter() {
    const button = await this.getClearFilterButton();
    await button.click();
  }

  async clickSelectAll() {
    const button = await this.getSelectAllButton();
    await button?.click();
  }

  async clickClearAll() {
    const button = await this.getClearAllButton();
    await button?.click();
  }

  async click() {
    const trigger = await this.getValue();
    await trigger.click();
  }

  async clickOption(index: number) {
    const options = await this.getOptions();
    await options[index].click();
  }

  async isOpen() {
    const panel = await this.getPanel();
    return panel !== null;
  }

  async clickBackdrop() {
    const backdrop = await this.getBackdrop();
    await backdrop?.click();
  }

  async closeWithEsc() {
    document.body.dispatchEvent(new KeyboardEvent('keydown', { keyCode: ESCAPE }));
    await this.forceStabilize();
  }

  async pressKey(key: string, keyCode?: number, altKey?: boolean) {
    const isOpen = await this.isOpen();
    if (isOpen) {
      const panel = await this.getPanel();
      panel?.dispatchEvent('keydown', { key, keyCode, altKey });
    } else {
      const value = await this.getValue();
      value.dispatchEvent('keydown', { key, keyCode, altKey });
    }
  }
}

describe('NxMultiSelectComponent', () => {
  let fixture: ComponentFixture<DropdownTest>;
  let testInstance: DropdownTest;
  let multiSelectInstance: NxMultiSelectComponent<any, any>;
  let loader: HarnessLoader;
  let multiSelectHarness: MultiSelectHarness;

  async function configureTestingModule() {
    return TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OverlayModule,
        NxDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldModule,
        BasicMultiSelectComponent,
        ComplexMultiSelectComponent,
        ReactiveMultiSelectComponent,
        IntlOverrideMultiSelect,
        ErrorMultiSelectComponent,
        MultiSelectWithFilterComponent,
      ],
    }).compileComponents();
  }

  async function createTestComponent(component: Type<DropdownTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    multiSelectInstance = testInstance.multiSelect;
    loader = TestbedHarnessEnvironment.loader(fixture);
    multiSelectHarness = await loader.getHarness(MultiSelectHarness);
  }

  beforeEach(async () => {
    await configureTestingModule();
  });

  describe('basic', () => {
    beforeEach(async () => {
      await createTestComponent(BasicMultiSelectComponent);
    });

    it('has an empty label', async () => {
      const label = await multiSelectHarness.getValue();
      expect(await label.text()).toBe('');
    });

    it('is closed', async () => {
      expect(await multiSelectHarness.isOpen()).toBeFalse();
    });

    it('has the aria attributes', async () => {
      const value = await multiSelectHarness.getValue();

      const [role, id, ariaControls, ariaHaspopup, ariaExpanded, ariaLabelledBy] = await parallel(
        () => [
          value.getAttribute('role'),
          value.getAttribute('id'),
          value.getAttribute('aria-controls'),
          value.getAttribute('aria-haspopup'),
          value.getAttribute('aria-expanded'),
          value.getAttribute('aria-labelledby'),
        ],
      );

      expect(id).toMatch(/nx-multi-select-\d+$/);
      expect(ariaControls).toBe(`${multiSelectInstance.id}-combobox`);
      expect(ariaHaspopup).toBe('listbox');
    });

    it('should set the tabindex of the select to -1 if disabled', fakeAsync(() => {
      createTestComponent(TabIndexMultiSelectComponent);
      const multiSelectElement = fixture.nativeElement.querySelector('nx-multi-select .value');
      expect(multiSelectElement.getAttribute('tabindex')).toBe('0');

      (fixture.componentInstance as TabIndexMultiSelectComponent).disabled = true;
      fixture.detectChanges();
      expect(multiSelectElement.getAttribute('tabindex')).toBe('-1');
    }));

    describe('when clicking the multi select', () => {
      beforeEach(async () => {
        await multiSelectHarness.click();
      });

      it('opens the panel', async () => {
        expect(await multiSelectHarness.isOpen()).toBeTrue();
      });

      describe('and clicking the backdrop', () => {
        beforeEach(async () => {
          spyOn(multiSelectInstance.openedChange, 'emit');
          await multiSelectHarness.clickBackdrop();
        });

        it('closes the panel', async () => {
          expect(await multiSelectHarness.isOpen()).toBeFalse();
          expect(multiSelectInstance.openedChange.emit).toHaveBeenCalledOnceWith(false);
        });
      });
    });

    describe('providers', () => {
      it('should overwrite intl class for i18n', async () => {
        await createTestComponent(IntlOverrideMultiSelect);
        await multiSelectHarness.click();

        expect(await (await multiSelectHarness.getSelectAllButton())?.text()).toBe(
          'Test select all',
        );
      });

      it('should be possible to override Intl class from parent injector', async () => {
        TestBed.resetTestingModule()
          .configureTestingModule({
            imports: [BasicMultiSelectComponent],
            providers: [{ provide: NxDropdownIntl, useClass: CustomIntl }],
          })
          .compileComponents();
        await createTestComponent(BasicMultiSelectComponent);
        await multiSelectHarness.click();

        expect(await (await multiSelectHarness.getSelectAllButton())?.text()).toBe(
          'Test select all',
        );
      });
    });

    describe('when open', () => {
      beforeEach(async () => {
        await multiSelectHarness.click();
      });

      it('should not add ng-touched class when dropdown is opened', async () => {
        const hasNgTouchedClass =
          multiSelectInstance.elementRef.nativeElement.classList.contains('ng-touched');
        expect(hasNgTouchedClass).toBe(false);
      });

      it('focuses the filter', fakeAsync(async () => {
        flush();
        const filter = await multiSelectHarness.getFilter();
        expect(await filter?.isFocused()).toBeTrue();
      }));

      describe('when focusing another element in the panel', () => {
        beforeEach(async () => {
          const panel = await multiSelectHarness.getPanel();
          await panel?.focus();
        });

        it('focuses the filter', async () => {
          const filter = await multiSelectHarness.getFilter();
          expect(await filter?.isFocused()).toBeTrue();
        });
      });

      it('shows all options', async () => {
        const options = await multiSelectHarness.getOptions();
        expect(options).toHaveSize(5);

        for (const [i, option] of testInstance.options.entries()) {
          expect(await options[i].getLabelText()).toBe(option);
        }
      });

      it('has no selected option', async () => {
        const options = await multiSelectHarness.getOptions();
        for (const option of options) {
          expect(await option.isSelected()).toBeFalse();
        }
      });

      it('has no disabled option', async () => {
        const options = await multiSelectHarness.getOptions();
        for (const option of options) {
          expect(await option.isDisabled()).toBeFalse();
        }
      });

      it('has the aria attributes on the input filter', async () => {
        const filter = (await multiSelectHarness.getFilter()) as TestElement;
        const [role, ariaExpanded, ariaLabelledBy] = await parallel(() => [
          filter.getAttribute('role'),
          filter.getAttribute('aria-expanded'),
          filter.getAttribute('aria-labelledby'),
        ]);
        expect(ariaExpanded).toBe('true');
        expect(role).toBe('combobox');
        expect(ariaLabelledBy).toBe(`${multiSelectInstance.id} ${testInstance.formField.labelId}`);
      });

      it('has the aria attributes on the panel', async () => {
        const panel = (await multiSelectHarness.getPanel()) as TestElement;
        const [role, ariaOwns, ariaExpanded, ariaLabelledBy] = await parallel(() => [
          panel.getAttribute('role'),
          panel.getAttribute('aria-owns'),
          panel.getAttribute('aria-expanded'),
          panel.getAttribute('aria-labelledby'),
        ]);

        expect(ariaOwns).toBe(`${multiSelectInstance.id}-combobox`);
        expect(ariaLabelledBy).toBe(`${multiSelectInstance.id} ${testInstance.formField.labelId}`);
      });

      it('has no select all & clear all buttons', async () => {
        multiSelectInstance.disableSelectAll = true;
        fixture.detectChanges();

        expect(await multiSelectHarness.getSelectAllButton()).toBeNull();
      });
    });

    describe('when selecting options', () => {
      beforeEach(async () => {
        await multiSelectHarness.click();

        await multiSelectHarness.clickOptions([3, 0]);
      });

      it('has checked the options', async () => {
        const options = await multiSelectHarness.getOptions();
        expect(await options[0].isSelected()).toBeTrue();
        expect(await options[3].isSelected()).toBeTrue();
      });

      it('shows the value in the label', async () => {
        expect(await multiSelectHarness.getValueText()).toBe('BMW, Mini(2)');
      });

      it('updates the model', () => {
        expect(testInstance.model).toEqual(['BMW', 'Mini']);
      });

      it('should show divider line when close and reopen', async () => {
        await multiSelectHarness.closeWithEsc();
        await multiSelectHarness.click();
        const divider = await multiSelectHarness.getDivider();

        expect(divider).not.toBeNull();
      });

      it('should have ng-touched class when closed panel and blur', async () => {
        await multiSelectHarness.closeWithEsc();
        const value = await multiSelectHarness.getValue();
        await value.blur();
        const hasNgTouchedClass =
          multiSelectInstance.elementRef.nativeElement.classList.contains('ng-touched');

        expect(hasNgTouchedClass).toBe(true);
      });

      it('should sort correctly when filter', async () => {
        await multiSelectHarness.closeWithEsc();
        await multiSelectHarness.click();
        await multiSelectHarness.setFilter('m');
        expect(multiSelectInstance.listItems).toEqual(['BMW', 'Mini', 'Mercedes']);
        expect(multiSelectInstance._divider).toEqual(1);
      });

      it('should go into error state when error state matcher is true', fakeAsync(() => {
        createTestComponent(BasicMultiSelectComponent);
        fixture.detectChanges();
        const spy = jasmine.createSpy();
        const stateChangesSubscription = multiSelectInstance.stateChanges.subscribe(spy);
        // quick hack to replace the default matcher without any large
        // TestBed magic

        (multiSelectInstance['_errorStateMatcher'] as any) = { isErrorState: () => true }; // workaround: accessing private class member
        fixture.detectChanges();
        flush();
        expect(multiSelectInstance.errorState).toBeTrue();
        expect(spy).toHaveBeenCalled();

        stateChangesSubscription.unsubscribe();
      }));

      it('should add aria-describedby and aria-invalid', async () => {
        createTestComponent(ErrorMultiSelectComponent);
        const input = await multiSelectHarness.getValue();
        const ariaInvalid = await input.getAttribute('aria-invalid');
        const ariaDescribedBy = await input.getAttribute('aria-describedby');
        expect(ariaInvalid).toBe('false');
        expect(ariaDescribedBy).toBe(null);

        await multiSelectHarness.click();
        await multiSelectHarness.closeWithEsc();
        const input2 = await multiSelectHarness.getValue();
        const error = (testInstance as ErrorMultiSelectComponent).error;

        await input2.blur();
        fixture.detectChanges();
        const ariaDescribedBy2 = await input2.getAttribute('aria-describedby');
        const ariaInvalid2 = await input2.getAttribute('aria-invalid');

        expect(ariaDescribedBy2).toBe(error.id);
        expect(ariaInvalid2).toBe('true');
      });

      describe('and using "clear" button', () => {
        beforeEach(async () => {
          await multiSelectInstance._clear();
        });

        it('has no selected options', async () => {
          const options = await multiSelectHarness.getOptions();
          expect(await options[0].isSelected()).toBeFalse();
          expect(await options[3].isSelected()).toBeFalse();
        });

        it('has an empty label', async () => {
          expect(await multiSelectHarness.getValueText()).toBe('');
        });

        it('has no selected options', async () => {
          expect(testInstance.model).toEqual([]);
        });
      });

      describe('when using "select all"', () => {
        beforeEach(async () => {
          await multiSelectHarness.clickSelectAll();
        });

        it('has selected all options', async () => {
          const options = await multiSelectHarness.getOptions();
          for (const option of options) {
            expect(await option.isSelected()).toBeTrue();
          }
        });

        it('selected only visible option when filter', async () => {
          await multiSelectHarness.clickSelectAll(); // to clear
          await multiSelectHarness.setFilter('i');
          await multiSelectHarness.clickSelectAll();

          expect(testInstance.model).toEqual(['Audi', 'Mini']);
        });

        it('unselect only visible option when filter', async () => {
          await multiSelectHarness.setFilter('Audi');
          await multiSelectHarness.clickSelectAll(); // to remove audi

          expect(testInstance.model).toEqual(['BMW', 'Volvo', 'Mini', 'Mercedes']);
        });

        it('show indeterminate when not all options selected', async () => {
          await multiSelectHarness.setFilter('Audi');
          await multiSelectHarness.clickSelectAll(); // to remove audi

          const indeterminate = await multiSelectHarness.getIndeterminate();

          expect(indeterminate).toBeTruthy();
        });

        it('show checkmark when all options selected', async () => {
          const checkmark = await multiSelectHarness.getCheckmark();
          expect(checkmark).toBeTruthy();
        });

        it('shows the value in the trigger', async () => {
          expect(await multiSelectHarness.getValueText()).toBe(
            'BMW, Audi, Volvo, Mini, Mercedes(5)',
          );
        });

        it('updates the model', async () => {
          expect(testInstance.model).toEqual(['BMW', 'Audi', 'Volvo', 'Mini', 'Mercedes']);
        });

        describe('and deselecting all', () => {
          beforeEach(async () => {
            await multiSelectHarness.clickSelectAll();
          });

          it('has no selected options', async () => {
            const options = await multiSelectHarness.getOptions();
            for (const option of options) {
              expect(await option.isSelected()).toBeFalse();
            }
          });

          it('shows the value in the trigger', async () => {
            expect(await multiSelectHarness.getValueText()).toBe('');
          });

          it('updates the model', async () => {
            expect(testInstance.model).toEqual([]);
          });
        });
      });
    });

    describe('when opening using the keyboard', () => {
      describe('and opening using SPACE', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('Enter');
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });
      });

      describe('and opening using ARROW DOWN', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW, true);
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });
      });

      describe('and opening using ARROW UP', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('ArrowUp', UP_ARROW, true);
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });
      });

      describe('and opening using HOME key', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('Home', HOME, true);
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });
      });

      describe('and opening using END key', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('End', END, true);
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });

        it('hilight last option', async () => {
          const options = await multiSelectHarness.getOptions();
          expect(await options[options.length - 1].isActive()).toBeTrue();
        });
      });

      describe('and opening using ALT and ARROW DOWN', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW, true);
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });
      });

      describe('and opening using ALT and ARROW UP', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('ArrowUp', UP_ARROW, true);
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });
      });

      describe('and opening using ALT and ARROW LEFT', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('ArrowLeft', LEFT_ARROW, true);
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });
      });

      describe('and opening using ALT and ARROW RIGHT', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('ArrowRight', RIGHT_ARROW, true);
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });
      });

      describe('and opening using ENTER', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey(' ');
        });

        it('is open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeTrue();
        });

        describe('and closing using ESC', () => {
          beforeEach(async () => {
            spyOn(multiSelectInstance.openedChange, 'emit');
            await multiSelectHarness.closeWithEsc();
          });

          it('is closed', async () => {
            expect(await multiSelectHarness.isOpen()).toBeFalse();
            expect(multiSelectInstance.openedChange.emit).toHaveBeenCalledOnceWith(false);
          });
        });

        describe('and tabing out', () => {
          beforeEach(async () => {
            spyOn(multiSelectInstance.openedChange, 'emit');
            await multiSelectHarness.pressKey('Tab', TAB);
          });

          it('is closed', async () => {
            expect(await multiSelectHarness.isOpen()).toBeFalse();
            expect(multiSelectInstance.openedChange.emit).toHaveBeenCalledOnceWith(false);
          });
        });
      });

      describe('and opening using keyboard shortcut', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('c', undefined, true);
        });

        it('should not open', async () => {
          expect(await multiSelectHarness.isOpen()).toBeFalse();
        });
      });
    });

    describe('when navigating using keyboard', () => {
      beforeEach(async () => {
        await multiSelectHarness.click();
      });

      describe('and navigate to next option', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
          await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
        });

        it('sets the first option active', async () => {
          const options = await multiSelectHarness.getOptions();
          expect(await options[1].isActive()).toBeTrue();
        });

        it('sets the aria activedecenant', async () => {
          const panel = (await multiSelectHarness.getPanel()) as TestElement;
          const options = await multiSelectHarness.getOptions();
          const ariaActivedescendant = await panel.getAttribute('aria-activedescendant');
          const expectedId = await options[1].getId();

          expect(ariaActivedescendant).toBe(expectedId);
        });

        describe('and navigate to the next option', () => {
          beforeEach(async () => {
            await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
          });

          it('sets the third option active', async () => {
            const options = await multiSelectHarness.getOptions();
            expect(await options[2].isActive()).toBeTrue();
          });

          it('sets the aria activedecenant', async () => {
            const panel = (await multiSelectHarness.getPanel()) as TestElement;
            const options = await multiSelectHarness.getOptions();
            const ariaActivedescendant = await panel.getAttribute('aria-activedescendant');
            const expectedId = await options[2].getId();

            expect(ariaActivedescendant).toBe(expectedId);
          });

          describe('navigate to previous option', () => {
            beforeEach(async () => {
              await multiSelectHarness.pressKey('ArrowUp', UP_ARROW);
            });

            it('sets the second option active', async () => {
              const options = await multiSelectHarness.getOptions();
              expect(await options[1].isActive()).toBeTrue();
            });
          });
        });
      });

      describe('selecting using keyboard', () => {
        beforeEach(async () => {
          await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
          await multiSelectHarness.pressKey(' ');
        });

        it('selects the first option', async () => {
          const options = await multiSelectHarness.getOptions();
          expect(await options[0].isSelected()).toBeTrue();
        });

        describe('and deselecting', () => {
          beforeEach(async () => {
            await multiSelectHarness.pressKey('Enter');
          });

          it('deselects the first option', async () => {
            const options = await multiSelectHarness.getOptions();
            expect(await options[0].isSelected()).toBeFalse();
          });
        });
      });

      describe('filtering the options', () => {
        beforeEach(async () => {
          await multiSelectHarness.setFilter('i');
        });

        it('shows only matching options', async () => {
          const options = await multiSelectHarness.getOptions();
          expect(options).toHaveSize(2);
          expect(await options[0].getLabelText()).toBe('Audi');
          expect(await options[1].getLabelText()).toBe('Mini');
        });

        describe('and filtering the active option', () => {
          beforeEach(async () => {
            await multiSelectHarness.setFilter('');
            // set second option active
            await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
            await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
            await multiSelectHarness.pressKey('ArrowDown', DOWN_ARROW);
            // filter it
            await multiSelectHarness.setFilter('BMW');
          });

          it('sets the first option active', async () => {
            const options = await multiSelectHarness.getOptions();
            expect(await options[0].isActive()).toBeTrue();
          });
        });

        describe('and clearing the filter', () => {
          beforeEach(async () => {
            await multiSelectHarness.clickClearFilter();
          });

          it('shows all options', async () => {
            const options = await multiSelectHarness.getOptions();
            expect(options).toHaveSize(5);
          });
        });

        it('shows options with no filter', async () => {
          await multiSelectHarness.setFilter('');
          expect(await multiSelectHarness.getOptions()).toHaveSize(5);
          await multiSelectHarness.setFilter(null!);
          expect(await multiSelectHarness.getOptions()).toHaveSize(5);
          await multiSelectHarness.setFilter(undefined!);
          expect(await multiSelectHarness.getOptions()).toHaveSize(0); // TODO why not 4?
        });

        it('shows options with custom filterFn', async () => {
          multiSelectInstance.filterFn = (query, label) => query === label;

          await multiSelectHarness.setFilter('');
          expect(await multiSelectHarness.getOptions()).toHaveSize(5);
          expect(
            await (await (await multiSelectHarness.getOptions()).at(1)?.getLabel())?.text(),
          ).toBe('Audi');

          await multiSelectHarness.setFilter('Aud');
          expect(await multiSelectHarness.getOptions()).toHaveSize(0);
          await multiSelectHarness.setFilter('Audi');
          expect(await multiSelectHarness.getOptions()).toHaveSize(1);
          expect(
            await (await (await multiSelectHarness.getOptions()).at(0)?.getLabel())?.text(),
          ).toBe('Audi');

          await multiSelectHarness.setFilter('BM');
          expect(await multiSelectHarness.getOptions()).toHaveSize(0);
          await multiSelectHarness.setFilter('BMW');
          expect(await multiSelectHarness.getOptions()).toHaveSize(1);
          expect(
            await (await (await multiSelectHarness.getOptions()).at(0)?.getLabel())?.text(),
          ).toBe('BMW');
        });

        it('shows original options when filter/select then unfilter/unselect', async () => {
          await multiSelectHarness.setFilter('');

          testInstance.model = ['Volvo'];
          await multiSelectHarness.setFilter('Volvo');
          expect(await multiSelectHarness.getOptions()).toHaveSize(1);

          testInstance.model = [];
          await multiSelectHarness.setFilter('');
          expect(await multiSelectHarness.getOptions()).toHaveSize(5);

          const options = await multiSelectHarness.getOptions();

          await Promise.all(
            ['BMW', 'Audi', 'Volvo', 'Mini', 'Mercedes'].map(async (label, i) =>
              expect(await options[i].getLabelText()).toBe(label),
            ),
          );
        });
      });

      describe('without filter', () => {
        beforeEach(() => {
          testInstance.filter = false;
          fixture.detectChanges();
        });

        it('has no filter', async () => {
          expect(await multiSelectHarness.getFilter()).toBeNull();
        });
      });

      describe('with appearance auto', () => {
        beforeEach(async () => {
          testInstance.appearance = 'auto';
          fixture.detectChanges();
          // we need to click again to simulate some form of user interaction to trigger CD
          // in the multiselect itself. there is currently no connection between the formfield and the control
          // that the control should run CD when the formfield changes, only from control to formfield.
          // in reality this is kind of an edge case, it's very unlikely that the formfield appearance gets changed
          // while the overlay is open
          await multiSelectHarness.click();
        });

        it('has no action buttons', async () => {
          expect(await multiSelectHarness.getSelectAllButton()).toBeNull();
        });

        it('has a header in the panel', async () => {
          const panelHeader = await multiSelectHarness.getPanelHeader();

          expect(panelHeader).not.toBeNull();
          expect(await panelHeader?.text()).toBe('Car brand');
        });
      });
    });
  });

  describe('with complex options', () => {
    beforeEach(async () => {
      await createTestComponent(ComplexMultiSelectComponent);
      await multiSelectHarness.click();
    });

    it('shows all options with the selected label', async () => {
      const options = await multiSelectHarness.getOptions();
      expect(options).toHaveSize(3);

      await Promise.all(
        ['Apple', 'Orange', 'Cherry'].map(async (label, i) =>
          expect(await options[i].getLabelText()).toBe(label),
        ),
      );
    });

    describe('and selecting options', () => {
      beforeEach(async () => {
        const options = await multiSelectHarness.getOptions();
        await options[2].click();
        await options[0].click();
      });

      it('shows the value in the label', async () => {
        expect(await multiSelectHarness.getValueText()).toBe('Apple, Cherry(2)');
      });

      it('updates the model', () => {
        expect(testInstance.model).toEqual([
          { label: 'Apple', id: 1, otherLabel: 'A' },
          { label: 'Cherry', id: 3, otherLabel: 'C' },
        ]);
      });

      it('should displayed value in the label, If the selected value still exists after the options have been changed', async () => {
        multiSelectInstance.selectValue = 'label';
        testInstance.model = ['Potato'];
        testInstance.options = [
          {
            label: 'Apple',
            otherLabel: 'A',
            id: 1,
          },
          {
            label: 'Potato',
            otherLabel: 'O',
            id: 2,
          },
        ];
        fixture.detectChanges();

        expect(await multiSelectHarness.getValueText()).toBe('Potato(1)');
        expect(testInstance.model).toEqual(['Potato']);
      });
    });

    describe('and using selectValue with a string', () => {
      beforeEach(async () => {
        (testInstance as ComplexMultiSelectComponent).selectValue = 'id';
        await multiSelectHarness.clickOptions([2, 0]);
      });

      it('updates the model', () => {
        expect(testInstance.model).toEqual([1, 3]);
      });

      it('retains selection when options object references change and using selectValue with a string', () => {
        const optionsBefore = testInstance.options;
        const selectionBefore = [optionsBefore[0].id, optionsBefore[2].id];
        expect(testInstance.model).toEqual(selectionBefore);

        testInstance.options = [
          { label: 'Apple', id: 1, otherLabel: 'A' },
          { label: 'Orange', id: 2, otherLabel: 'B' },
          { label: 'Cherry', id: 3, otherLabel: 'C' },
        ];
        fixture.detectChanges();

        // proof object references have changed...
        expect(optionsBefore[0]).not.toBe(testInstance.options[0]);
        // ...but selection remains the same
        expect(testInstance.model).toEqual(selectionBefore);
        expect(multiSelectInstance.value).toEqual(selectionBefore);
      });
    });

    describe('and using selectValue with a function', () => {
      beforeEach(async () => {
        (testInstance as ComplexMultiSelectComponent).selectValue = (option: any) => option.id;
        await multiSelectHarness.clickOptions([2, 0]);
      });

      it('updates the model', () => {
        expect(testInstance.model).toEqual([1, 3]);
      });

      it('retains selection when options object references change and using selectValue with a function', () => {
        const optionsBefore = testInstance.options;
        const selectionBefore = [optionsBefore[0].id, optionsBefore[2].id];
        expect(testInstance.model).toEqual(selectionBefore);

        testInstance.options = [
          { label: 'Apple', id: 1, otherLabel: 'A' },
          { label: 'Orange', id: 2, otherLabel: 'B' },
          { label: 'Cherry', id: 3, otherLabel: 'C' },
        ];
        fixture.detectChanges();

        // proof object references have changed...
        expect(optionsBefore[0]).not.toBe(testInstance.options[0]);
        // ...but selection remains the same
        expect(testInstance.model).toEqual(selectionBefore);
        expect(multiSelectInstance.value).toEqual(selectionBefore);
      });
    });

    describe('and using selectLabel with a function', () => {
      beforeEach(async () => {
        (testInstance as ComplexMultiSelectComponent).selectLabel = (option: any) =>
          option.otherLabel;
        await multiSelectHarness.clickOptions([2, 0]);
      });

      it('shows the value in the label', async () => {
        expect(await multiSelectHarness.getValueText()).toBe('A, C(2)');
      });

      it('shows all options with the selected label', async () => {
        const options = await multiSelectHarness.getOptions();
        expect(options).toHaveSize(3);

        await Promise.all(
          ['A', 'O', 'C'].map(async (label, i) =>
            expect(await options[i].getLabelText()).toBe(label),
          ),
        );
      });
    });
  });

  describe('accessibility', () => {
    beforeEach(async () => {
      await createTestComponent(BasicMultiSelectComponent);
    });

    it('has no accessibility violations', async () => {
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });

    it('panel has no accessibility violation', async () => {
      await multiSelectHarness.click();
      fixture.detectChanges();
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });

  describe('binding', () => {
    beforeEach(async () => {
      await createTestComponent(ReactiveMultiSelectComponent);
    });

    it('should has class disable when form is programatically disabled', async () => {
      (testInstance as ReactiveMultiSelectComponent).testForm.disable();
      fixture.detectChanges();

      const nxFormField = fixture.elementRef.nativeElement.querySelector('nx-formfield');
      expect(nxFormField).toHaveClass('is-disabled');
    });

    it('should emit openedChange when opened or closed', async () => {
      spyOn(multiSelectInstance.openedChange, 'emit');
      await multiSelectHarness.click();
      expect(multiSelectInstance.openedChange.emit).toHaveBeenCalled();
      multiSelectInstance._close();
      expect(multiSelectInstance.openedChange.emit).toHaveBeenCalled();
    });
  });

  describe('overlay width with long option label and panelGrow', () => {
    beforeEach(async () => {
      await createTestComponent(LongOptionLabelComponent);
    });

    it('should have the width of the trigger if panelGrow is set to false', async () => {
      const multiselectElement = fixture.debugElement.query(By.css('nx-formfield'));
      multiselectElement.nativeElement.style.width = '400px';
      testInstance.panelGrow = false;
      fixture.detectChanges();
      await multiSelectHarness.click();
      const panel = (await multiSelectHarness.getOverlayPane()) as TestElement;

      expect((await panel.getDimensions()).width).toBe(398);
    });

    it('should not have a min width if panelgrow is set to false', async () => {
      const multiselectElement = fixture.debugElement.query(By.css('nx-formfield'));
      multiselectElement.nativeElement.style.width = '400px';
      testInstance.panelGrow = false;
      fixture.detectChanges();
      await multiSelectHarness.click();
      fixture.detectChanges();
      const overlayPane = (await multiSelectHarness.getOverlayPane()) as TestElement;
      expect(await overlayPane.getAttribute('style')).not.toContain('min-width');
    });

    it('should have a width if panelgrow is set to false', async () => {
      const multiselectElement = fixture.debugElement.query(By.css('nx-formfield'));
      multiselectElement.nativeElement.style.width = '400px';
      testInstance.panelGrow = false;
      fixture.detectChanges();
      await multiSelectHarness.click();
      fixture.detectChanges();

      const overlayPane = (await multiSelectHarness.getOverlayPane()) as TestElement;
      expect(await overlayPane.getAttribute('style')).toContain('width');
    });

    it('should have a min width if panelgrow is set to true', async () => {
      const multiselectElement = fixture.debugElement.query(By.css('nx-formfield'));
      multiselectElement.nativeElement.style.width = '400px';
      testInstance.panelGrow = true;
      fixture.detectChanges();
      await multiSelectHarness.click();
      fixture.detectChanges();
      const overlayPane = (await multiSelectHarness.getOverlayPane()) as TestElement;
      expect(await overlayPane.getAttribute('style')).toContain('min-width');
    });

    it('should have a width if panelgrow is set to true', async () => {
      const multiselectElement = fixture.debugElement.query(By.css('nx-formfield'));
      multiselectElement.nativeElement.style.width = '400px';
      testInstance.panelGrow = true;
      fixture.detectChanges();
      await multiSelectHarness.click();
      fixture.detectChanges();
      const overlayPane = (await multiSelectHarness.getOverlayPane()) as TestElement;
      expect(await overlayPane.getAttribute('style')).toContain('width');
    });

    it('should be larger than the trigger if panelGrow is set to true', async () => {
      const multiselectElement = fixture.debugElement.query(By.css('nx-formfield'));
      multiselectElement.nativeElement.style.width = '400px';
      testInstance.panelGrow = true;
      fixture.detectChanges();
      await multiSelectHarness.click();
      fixture.detectChanges();
      const overlayPane = (await multiSelectHarness.getOverlayPane()) as TestElement;
      expect(await overlayPane.getProperty('clientWidth')).toBeGreaterThan(400);
    });

    it('should be larger than the trigger if panelGrow is set to true', async () => {
      const multiselectElement = fixture.debugElement.query(By.css('nx-formfield'));
      multiselectElement.nativeElement.style.width = '300px';
      testInstance.panelGrow = true;
      testInstance.panelMaxWidth = '400px';
      fixture.detectChanges();
      await multiSelectHarness.click();
      fixture.detectChanges();
      const overlayPane = (await multiSelectHarness.getOverlayPane()) as TestElement;
      expect(await overlayPane.getProperty('clientWidth')).toBe(400);
    });
  });

  describe('when type in filter input', () => {
    it('should emit filter value on filter changes', async () => {
      await createTestComponent(MultiSelectWithFilterComponent);
      await multiSelectHarness.click();
      await multiSelectHarness.setFilter('Audi');
      fixture.detectChanges();
      expect((testInstance as MultiSelectWithFilterComponent).filterInput).toBe('Audi');

      await multiSelectHarness.clickClearFilter();
      fixture.detectChanges();
      expect((testInstance as MultiSelectWithFilterComponent).filterInput).toBe('');
    });
  });

  describe('a11y', () => {
    it('should open and focus option when type character', async () => {
      await createTestComponent(BasicMultiSelectComponent);
      await multiSelectHarness.pressKey('A');

      const options = await multiSelectHarness.getOptions();
      expect(await options[0].isActive()).toBeTrue();
      expect(await options[0].getLabelText()).toBe('Audi');
    });
  });
});

@Directive({ standalone: true })
abstract class DropdownTest {
  @ViewChild(NxMultiSelectComponent) multiSelect!: NxMultiSelectComponent<any, any>;
  @ViewChild(NxFormfieldComponent) formField!: NxFormfieldComponent;

  abstract options: any[];
  filter = true;
  model: any[] = [];
  appearance = 'outline' as AppearanceType;
  panelGrow = false;
  panelMaxWidth = '';
}

@Component({
  template: `<nx-formfield label="Car brand" [appearance]="appearance">
    <nx-multi-select [(ngModel)]="model" [filter]="filter" [options]="options"></nx-multi-select>
  </nx-formfield>`,
  imports: [OverlayModule, NxDropdownModule, FormsModule, ReactiveFormsModule, NxFormfieldModule],
})
class BasicMultiSelectComponent extends DropdownTest {
  options = ['BMW', 'Audi', 'Volvo', 'Mini', 'Mercedes'];
}

@Component({
  template: `<nx-formfield label="Car brand" [appearance]="appearance">
    <nx-multi-select [(ngModel)]="model" [filter]="filter" [options]="options"></nx-multi-select>
  </nx-formfield>`,
  imports: [OverlayModule, NxDropdownModule, FormsModule, ReactiveFormsModule, NxFormfieldModule],
  providers: [{ provide: NxDropdownIntl, useClass: CustomIntl }],
})
class IntlOverrideMultiSelect extends DropdownTest {
  options = ['BMW', 'Audi', 'Volvo', 'Mini', 'Mercedes'];

  constructor(public intl: NxDropdownIntl) {
    super();
  }
}

@Component({
  template: `<nx-formfield label="Car brand" [appearance]="appearance">
    <nx-multi-select
      [(ngModel)]="model"
      [filter]="filter"
      [options]="options"
      [panelGrow]="panelGrow"
      [panelMaxWidth]="panelMaxWidth"
    ></nx-multi-select>
  </nx-formfield>`,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class LongOptionLabelComponent extends DropdownTest {
  options = [
    'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua, sed eiusmod tempor incidunt ut',
    'Audi',
    'Volvo',
    'Mini',
    'Mercedes',
  ];
}
interface ComplexOption {
  label: string;
  otherLabel: string;
  id: number;
}

@Component({
  template: `<nx-formfield label="Car brand" [appearance]="appearance">
    <nx-multi-select
      [selectLabel]="selectLabel"
      [selectValue]="selectValue"
      [(ngModel)]="model"
      [filter]="filter"
      [options]="options"
    ></nx-multi-select>
  </nx-formfield>`,
  imports: [OverlayModule, NxDropdownModule, FormsModule, ReactiveFormsModule, NxFormfieldModule],
})
class ComplexMultiSelectComponent extends DropdownTest {
  options: ComplexOption[] = [
    {
      label: 'Apple',
      otherLabel: 'A',
      id: 1,
    },
    {
      label: 'Orange',
      otherLabel: 'O',
      id: 2,
    },
    {
      label: 'Cherry',
      otherLabel: 'C',
      id: 3,
    },
  ];

  selectLabel: string | ((option: ComplexOption) => string) = 'label';
  selectValue: string | ((option: ComplexOption) => any) = '';
}

@Component({
  template: `<form [formGroup]="testForm">
    <nx-formfield>
      <nx-multi-select formControlName="testControl" [options]="options"></nx-multi-select>
    </nx-formfield>
  </form>`,
  imports: [OverlayModule, NxDropdownModule, FormsModule, ReactiveFormsModule, NxFormfieldModule],
})
class ReactiveMultiSelectComponent extends DropdownTest {
  options = ['BMW', 'Audi', 'Volvo', 'Mini'];

  testForm = new FormBuilder().group({
    testControl: ['BMW'],
  });
}

@Component({
  template: `<form [formGroup]="testForm">
    <nx-formfield>
      <nx-multi-select formControlName="testControl" [options]="options"></nx-multi-select>
      <nx-error nxFormfieldError> this is error </nx-error>
    </nx-formfield>
  </form>`,
  imports: [
    OverlayModule,
    NxDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NxFormfieldModule,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
class ErrorMultiSelectComponent extends DropdownTest {
  options = ['BMW', 'Audi', 'Volvo', 'Mini'];

  testForm = new FormBuilder().group({
    testControl: ['', Validators.required],
  });

  @ViewChild(NxFormfieldErrorDirective) error!: NxFormfieldErrorDirective;
}

@Component({
  template: `<nx-formfield>
    <nx-multi-select [options]="options" filter (filterInput)="test($event)"></nx-multi-select>
  </nx-formfield>`,
  imports: [OverlayModule, NxDropdownModule, FormsModule, ReactiveFormsModule, NxFormfieldModule],
})
class MultiSelectWithFilterComponent extends DropdownTest {
  options = ['BMW', 'Audi', 'Volvo', 'Mini'];
  filterInput = '';

  test(query: string) {
    this.filterInput = query;
  }
}

@Component({
  template: `<nx-formfield>
    <nx-multi-select
      [options]="options"
      [tabIndex]="tabIndex"
      [disabled]="disabled"
    ></nx-multi-select>
  </nx-formfield>`,
  imports: [OverlayModule, NxDropdownModule, FormsModule, ReactiveFormsModule, NxFormfieldModule],
})
class TabIndexMultiSelectComponent extends DropdownTest {
  options = ['BMW', 'Audi', 'Volvo', 'Mini'];
  tabIndex = 0;
  disabled = false;
}
