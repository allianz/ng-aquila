import { NxErrorComponent, NxErrorModule, NxLabelModule } from '@allianz/ng-aquila/base';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NxRadioComponent, NxRadioGroupComponent } from './radio-button';
import { NxRadioModule } from './radio-button.module';

@Directive({ standalone: true })
abstract class RadioTest {
  @ViewChildren(NxRadioComponent)
  radioInstances!: QueryList<NxRadioComponent>;
  @ViewChild(NxRadioGroupComponent)
  radioGroup!: NxRadioGroupComponent;

  templateModel = '1';
  testForm: any;
  disabled = false;
  negative: any;

  groupNegative: any;
  radioNegative: any;
}

describe('NxRadioComponent', () => {
  let fixture: ComponentFixture<RadioTest>;
  let testInstance: RadioTest;
  let radioInstances: QueryList<NxRadioComponent>;
  let radioElements: NodeListOf<HTMLInputElement>;
  let labelElements: NodeListOf<HTMLLabelElement>;

  function createTestComponent(component: Type<RadioTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    radioInstances = testInstance.radioInstances;
    radioElements = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    labelElements = fixture.nativeElement.querySelectorAll('label') as NodeListOf<HTMLLabelElement>;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxRadioModule,
        FormsModule,
        ReactiveFormsModule,
        NxLabelModule,
        NxErrorModule,
        BasicRadio,
        LabellessRadio,
        ConfigurableRadio,
        BasicRadioGroup,
        MultipleRadio,
        DynamicRadio,
        MultipleRadioDisabled,
        GroupWithNgModel,
        ReactiveRadio,
        BasicRadioOnPush,
        MultipleRadioOnPush,
        RadioGroupTest,
        RadioGroupValidation,
        RadioGroupValidationTouched,
        RadioA11y,
        RadioGroupWithHint,
        RadioGroupWithBoundDescribedBy,
      ],
    }).compileComponents();
  }));

  function getRadioLabelElement(radioElement: HTMLElement): HTMLLabelElement {
    return radioElement.querySelector('label')!;
  }

  function getRadioInputElement(radioElement: HTMLElement): HTMLInputElement {
    return radioElement.querySelector('input')!;
  }

  function assertChecked(index: number, checked: boolean) {
    fixture.detectChanges();
    expect(radioInstances.toArray()[index].checked).toBe(checked);
    expect(radioElements.item(index).checked).toBe(checked);
  }

  describe('standalone radio', () => {
    it('displays a radio with a label', () => {
      createTestComponent(BasicRadio);
      expect(radioElements.item(0)).not.toBeNull();
      expect(labelElements.item(0)).not.toBeNull();
      expect(labelElements.item(0).htmlFor).toBe(radioElements.item(0).id);
    });

    it('displays a radio without a label', () => {
      createTestComponent(LabellessRadio);
      expect(labelElements.item(0).textContent!.trim()).toBe('');

      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(labelElements.item(0)).not.toHaveClass('has-label');
    });

    it('sets the given label', () => {
      createTestComponent(BasicRadio);
      expect(labelElements.item(0).textContent?.trim()).toBe('Label');

      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(labelElements.item(0)).toHaveClass('has-label');
    });

    it('a click on the label changes the checked attribute', () => {
      createTestComponent(BasicRadio);
      assertChecked(0, false);
      labelElements.item(0).click();
      assertChecked(0, true);
    });

    it('marks the indicator as checked when checked', () => {
      createTestComponent(BasicRadio);
      expect(fixture.nativeElement.querySelectorAll('nx-radio-indicator.checked')).toHaveLength(0);
      testInstance.radioInstances.toArray()[0].checked = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('nx-radio-indicator.checked')).toHaveLength(1);
    });

    it('radio component emits change event', () => {
      createTestComponent(BasicRadio);
      const instance = radioInstances.toArray()[0];
      const changeHandler = vi.fn().mockName('changeHandler');

      const subscription = instance.valueChange.subscribe(changeHandler);
      labelElements.item(0).click();

      const returnValue = changeHandler.mock.lastCall![0];

      expect(changeHandler).toHaveBeenCalledWith(returnValue);
      expect(returnValue.source).toEqual(instance);

      subscription.unsubscribe();
    });

    it('renders a non-negative radio button on default', () => {
      createTestComponent(BasicRadio);
      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(radioInstances.toArray()[0].negative).toBe(false);
      expect(radioElement).not.toHaveClass('nx-radio--negative');
    });

    it('updates negative styling on change', () => {
      createTestComponent(ConfigurableRadio);
      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(radioElement).toHaveClass('nx-radio--negative');
      expect(radioInstances.toArray()[0].negative).toBe(true);

      testInstance.negative = false;
      fixture.detectChanges();
      expect(radioElement).not.toHaveClass('nx-radio--negative');
      expect(radioInstances.toArray()[0].negative).toBe(false);
    });

    it('only one radio button with the same name can be selected at a time', () => {
      createTestComponent(BasicRadioWithSameName);

      labelElements.item(0).click();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('nx-radio-indicator.checked')).toHaveLength(1);

      labelElements.item(1).click();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('nx-radio-indicator.checked')).toHaveLength(1);
    });
  });

  describe('inside radio group', () => {
    it('should set initial value via nxValue', () => {
      createTestComponent(MultipleRadio);
      expect(testInstance.radioGroup.value).toBe('1');
      assertChecked(1, true);
    });

    it('should not throw when items are created with ngFor loop', () => {
      expect(() => createTestComponent(DynamicRadio)).not.toThrow();
    });

    it('radio group assigns the same name to all child radios', () => {
      createTestComponent(MultipleRadio);

      Array.from(radioElements).map((radio) => {
        expect(radio.name).toBe('groupTest');
      });
    });

    it('should update the items name if the group name changes', () => {
      createTestComponent(DynamicRadio);
      (testInstance as DynamicRadio).name = 'newName';
      fixture.detectChanges();
      expect(radioInstances.toArray()[0].name).toBe('newName');
    });

    it('changing a child radio causes the parent group to emit a change event', () => {
      createTestComponent(MultipleRadio);
      const instance = radioInstances.toArray()[0];
      const changeHandler = vi.fn().mockName('changeHandler');

      const subscription = testInstance.radioGroup.groupValueChange.subscribe(changeHandler);
      labelElements.item(0).click();

      expect(changeHandler).toHaveBeenCalled();

      const returnValue = changeHandler.mock.lastCall![0];

      expect(returnValue.source).toEqual(instance);
      expect(returnValue.value).toBe('0');

      subscription.unsubscribe();
    });

    it('radios in the same group can be alternately selected', () => {
      createTestComponent(MultipleRadio);

      assertChecked(0, false);
      assertChecked(1, true);

      labelElements.item(0).click();
      assertChecked(0, true);
      assertChecked(1, false);

      labelElements.item(1).click();
      assertChecked(0, false);
      assertChecked(1, true);
    });

    it('child radio components inherit disabled state from radio group', () => {
      createTestComponent(MultipleRadioDisabled);
      expect(radioElements.item(0).disabled).toBe(true);
      expect(radioElements.item(1).disabled).toBe(true);
    });

    it('should toggle disabled state', () => {
      createTestComponent(MultipleRadioDisabled);
      testInstance.disabled = false;
      fixture.detectChanges();
      expect(radioElements.item(0).disabled).toBe(false);
      expect(radioElements.item(1).disabled).toBe(false);
      testInstance.disabled = true;
      fixture.detectChanges();
      expect(radioElements.item(0).disabled).toBe(true);
      expect(radioElements.item(1).disabled).toBe(true);
    });

    it('should create a basic radio-group with non-negative styling', () => {
      createTestComponent(BasicRadioGroup);
      const radioElementsNative = fixture.nativeElement.querySelectorAll('nx-radio');
      const radioGroupNative = fixture.nativeElement.querySelector('nx-radio-group');
      expect(radioGroupNative).not.toHaveClass('nx-radio-group--negative');
      radioElementsNative.forEach((radio: any) => {
        expect(radio).not.toHaveClass('nx-radio--negative');
      });
      expect(testInstance.radioGroup.negative).toBe(false);
      testInstance.radioInstances.toArray().forEach((radio) => {
        expect(radio.negative).toBe(false);
      });
    });

    it('should update on group negative change', () => {
      createTestComponent(MultipleRadio);
      const radioElementsNative = fixture.nativeElement.querySelectorAll('nx-radio');
      const radioGroupNative = fixture.nativeElement.querySelector('nx-radio-group');
      expect(radioGroupNative).toHaveClass('nx-radio-group--negative');
      radioElementsNative.forEach((radio: any) => {
        expect(radio).toHaveClass('nx-radio--negative');
      });
      expect(testInstance.radioGroup.negative).toBe(true);
      testInstance.radioInstances.toArray().forEach((radio) => {
        expect(radio.negative).toBe(true);
      });

      testInstance.groupNegative = false;
      fixture.detectChanges();

      expect(radioGroupNative).not.toHaveClass('nx-radio-group--negative');
      radioElementsNative.forEach((radio: any) => {
        expect(radio).not.toHaveClass('nx-radio--negative');
      });
      expect(testInstance.radioGroup.negative).toBe(false);
      testInstance.radioInstances.toArray().forEach((radio) => {
        expect(radio.negative).toBe(false);
      });
    });

    it('should not update a single radio on negative change in group', () => {
      createTestComponent(MultipleRadio);
      testInstance.groupNegative = false;
      testInstance.radioNegative = true;
      fixture.detectChanges();

      const radioElementsNative = fixture.nativeElement.querySelectorAll('nx-radio');
      const radioGroupNative = fixture.nativeElement.querySelector('nx-radio-group');
      expect(radioGroupNative).not.toHaveClass('nx-radio-group--negative');
      radioElementsNative.forEach((radio: any) => {
        expect(radio).not.toHaveClass('nx-radio--negative');
      });
      expect(testInstance.radioGroup.negative).toBe(false);
      testInstance.radioInstances.toArray().forEach((radio) => {
        expect(radio.negative).toBe(false);
      });
    });

    it('focuses the radio when calling focus()', () => {
      createTestComponent(BasicRadio);
      radioInstances.toArray()[0].focus();
      expect(fixture.nativeElement.querySelector('.nx-radio__input')).toEqual(
        _getFocusedElementPierceShadowDom(),
      );
    });

    it('should not trigger touch when moving focus within radio group', () => {
      createTestComponent(ReactiveRadio);
      const radioGroup = testInstance.radioGroup;
      const firstRadio = radioInstances.toArray()[0];
      const secondRadio = radioInstances.toArray()[1];

      firstRadio.focus();
      fixture.detectChanges();
      expect(testInstance.testForm.touched).toBe(false);

      secondRadio.focus();
      fixture.detectChanges();
      expect(testInstance.testForm.touched).toBe(false);

      secondRadio._nativeInput.nativeElement.blur();
      fixture.detectChanges();
      expect(testInstance.testForm.touched).toBe(true);
    });
  });

  describe('in radio group with ngModel', () => {
    it('should set initial value from ngModel', fakeAsync(() => {
      createTestComponent(GroupWithNgModel);
      flush();
      expect(testInstance.radioGroup.value).toBe('1');
      assertChecked(1, true);
    }));

    it('should update the ngModel value on selection change', () => {
      createTestComponent(GroupWithNgModel);
      labelElements.item(0).click();
      expect(testInstance.radioGroup.value).toBe('0');
      expect(testInstance.templateModel).toBe('0');
      assertChecked(0, true);
    });
  });

  describe('in radio group with reactive forms', () => {
    it('updates initial group value in reactive form', () => {
      createTestComponent(ReactiveRadio);

      expect(testInstance.radioGroup.value).toBe('1');
      assertChecked(1, true);
    });

    it('should toggle the disabled state', () => {
      createTestComponent(ReactiveRadio);
      testInstance.testForm.controls.radioTestReactive.disable();
      fixture.detectChanges();
      Array.from(radioElements).map((radio) => {
        expect(radio.disabled).toBe(true);
      });

      testInstance.testForm.controls.radioTestReactive.enable();
      fixture.detectChanges();
      Array.from(radioElements).map((radio) => {
        expect(radio.disabled).toBe(false);
      });
    });
  });

  describe('programmatic change in radio button', () => {
    let radioInstance: NxRadioComponent;
    beforeEach(() => {
      createTestComponent(BasicRadio);
      radioInstance = radioInstances.toArray()[0];
    });

    it('should update on id change', () => {
      radioInstance.id = 'custom-radio-id';
      fixture.detectChanges();
      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(getRadioInputElement(radioElement).getAttribute('id')).toBe('custom-radio-id-input');
      expect(getRadioLabelElement(radioElement).getAttribute('id')).toBe('custom-radio-id-label');
    });

    it('should update on label size change', () => {
      fixture.destroy();
      createTestComponent(BasicRadioOnPush);
      radioInstance = radioInstances.toArray()[0];
      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(radioElement).not.toHaveClass('nx-radio-button--small-label');
      expect(radioElement).toHaveClass('nx-radio-button--big-label');

      radioInstance.labelSize = 'small';
      fixture.detectChanges();
      expect(radioElement).toHaveClass('nx-radio-button--small-label');
      expect(radioElement).not.toHaveClass('nx-radio-button--big-label');
    });

    it('should update view on negative input change (nx-radio)', () => {
      fixture.destroy();
      createTestComponent(BasicRadioOnPush);
      radioInstance = radioInstances.toArray()[0];
      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(radioElement).not.toHaveClass('nx-radio--negative');
      radioInstance.negative = true;
      fixture.detectChanges();
      expect(radioElement).toHaveClass('nx-radio--negative');
    });

    it('should update on disabled change', () => {
      radioInstance.disabled = true;
      fixture.detectChanges();
      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(getRadioInputElement(radioElement).disabled).toBe(true);
    });

    it('should update on name change', () => {
      radioInstance.name = 'custom-name';
      fixture.detectChanges();
      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(getRadioInputElement(radioElement).name).toBe('custom-name');
    });

    it('should update on checked change', () => {
      radioInstance.checked = true;
      fixture.detectChanges();
      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(getRadioInputElement(radioElement).checked).toBe(true);
    });

    it('should update on required change', () => {
      fixture.destroy();
      createTestComponent(BasicRadioOnPush);
      radioInstance = radioInstances.toArray()[0];
      radioInstance.required = true;
      fixture.detectChanges();
      const radioElement = fixture.nativeElement.querySelector('nx-radio');
      expect(radioElement.getAttribute('required')).toBe('true');
    });
  });

  describe('programmatic change in radio group', () => {
    it('should update on id change', () => {
      createTestComponent(MultipleRadioOnPush);
      testInstance.radioGroup.id = 'custom-id';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-radio-group').getAttribute('id')).toBe(
        'custom-id',
      );
    });

    it('should update on disabled change', () => {
      createTestComponent(MultipleRadioOnPush);
      testInstance.radioGroup.disabled = true;
      fixture.detectChanges();
      Array.from(radioElements).map((radio) => {
        expect(radio.disabled).toBe(true);
      });
    });

    it('should update on negative input change', () => {
      createTestComponent(MultipleRadioOnPush);
      const radioGroupNative = fixture.nativeElement.querySelector('nx-radio-group');
      const radioButtonsNative = fixture.nativeElement.querySelectorAll('nx-radio');
      expect(radioGroupNative).not.toHaveClass('nx-radio-group--negative');
      radioButtonsNative.forEach((radio: any) => {
        expect(radio).not.toHaveClass('nx-radio--negative');
      });
      testInstance.radioGroup.negative = true;
      fixture.detectChanges();
      expect(radioGroupNative).toHaveClass('nx-radio-group--negative');
      radioButtonsNative.forEach((radio: any) => {
        expect(radio).toHaveClass('nx-radio--negative');
      });
    });

    it('should set required on individual radios and update on change', () => {
      createTestComponent(MultipleRadioOnPush);
      testInstance.radioGroup.required = true;
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('nx-radio-group').getAttribute('required'),
      ).toBeNull();
      const radioInputs = fixture.nativeElement.querySelectorAll('input[type="radio"]');
      expect(radioInputs).toHaveLength(2);
      radioInputs.forEach((input: any) => {
        expect(input.getAttribute('required')).toBe('true');
      });

      // test update to required property on radioGroup
      testInstance.radioGroup.required = false;
      fixture.detectChanges();
      radioInputs.forEach((input: any) => {
        expect(input.getAttribute('required')).toBe('false');
      });
    });

    it('should update on name change', () => {
      createTestComponent(MultipleRadioOnPush);
      testInstance.radioGroup.name = 'custom-name';
      fixture.detectChanges();
      Array.from(radioElements).map((radio) => {
        expect(radio.name).toBe('custom-name');
      });
    });

    it('should update on value change', () => {
      createTestComponent(MultipleRadio);
      testInstance.radioGroup.value = '0';
      fixture.detectChanges();
      assertChecked(0, true);
      assertChecked(1, false);
    });
  });

  describe('Validation', () => {
    it('Should be invalid on submitting the form', () => {
      createTestComponent(RadioGroupValidation);
      fixture.nativeElement.querySelector('button').click();
      fixture.detectChanges();
      const radios = fixture.nativeElement.querySelectorAll('nx-radio');
      expect(radios[0]).toHaveClass('has-error');
    });

    it('Should be invalid when touched', () => {
      createTestComponent(RadioGroupValidationTouched);
      fixture.detectChanges();
      const radios = fixture.nativeElement.querySelectorAll('nx-radio');
      expect(radios[0]).toHaveClass('has-error');
    });

    it('Should be valid', () => {
      createTestComponent(RadioGroupValidationTouched);
      fixture.nativeElement.querySelector('button').click();
      radioElements[0].click();
      fixture.detectChanges();
      const radios = fixture.nativeElement.querySelectorAll('nx-radio');
      expect(radios[0]).not.toHaveClass('has-error');
    });

    it('Should display nx-errors when invalid', () => {
      createTestComponent(RadioGroupValidation);
      let errors = fixture.nativeElement.querySelectorAll('nx-error');
      expect(errors).toHaveLength(0);

      fixture.nativeElement.querySelector('button').click();
      fixture.detectChanges();
      errors = fixture.nativeElement.querySelectorAll('nx-error');
      expect(errors).toHaveLength(1);
    });

    it('should be invalid when error state matcher is true', () => {
      createTestComponent(RadioGroupValidation);
      const radios = fixture.nativeElement.querySelectorAll('nx-radio');
      expect(radios[0]).not.toHaveClass('has-error');

      (testInstance.radioGroup['_errorStateMatcher'] as any) = { isErrorState: () => true }; // workaround: accessing private class member
      fixture.detectChanges();
      expect(radios[0]).toHaveClass('has-error');
    });

    it('should assign nx-error id to describedby input radio', () => {
      createTestComponent(RadioGroupValidation);
      fixture.nativeElement.querySelector('button').click();
      fixture.detectChanges();

      const errorId = fixture.nativeElement.querySelector('.nx-error__content').getAttribute('id');

      expect(radioElements.item(0).getAttribute('aria-describedby')).toBe(errorId);
      expect(radioElements.item(1).getAttribute('aria-describedby')).toBe(errorId);
    });
  });

  describe('readonly', () => {
    it('should set aria-disabled to each input', () => {
      createTestComponent(RadioGroupTest);
      (testInstance as RadioGroupTest).readonly = true;
      fixture.detectChanges();

      expect(radioElements.item(0).getAttribute('aria-disabled')).toBeTruthy();
      expect(radioElements.item(1).getAttribute('aria-disabled')).toBeTruthy();
    });

    it('should set class is-readonly to nx-radio', () => {
      createTestComponent(RadioGroupTest);
      (testInstance as RadioGroupTest).readonly = true;
      fixture.detectChanges();

      const radios = fixture.nativeElement.querySelectorAll('nx-radio');
      radios.forEach((radio: any) => {
        expect(radio).toHaveClass('is-readonly');
      });
    });

    it('should not clickable', () => {
      createTestComponent(RadioGroupTest);
      (testInstance as RadioGroupTest).readonly = true;
      fixture.detectChanges();

      radioElements[0].click();
      fixture.detectChanges();
      assertChecked(0, false);

      labelElements.item(1).click();
      fixture.detectChanges();
      assertChecked(1, false);
    });

    it('should set readonly programmatically with NxAbstractControl', () => {
      createTestComponent(MultipleRadioOnPush);

      (testInstance as MultipleRadioOnPush).group.setReadonly(true);
      fixture.detectChanges();
      const radios = fixture.nativeElement.querySelectorAll('nx-radio');
      radios.forEach((radio: any) => {
        expect(radio).toHaveClass('is-readonly');
      });
    });
  });

  describe('indicator bindings', () => {
    function getIndicators(): HTMLElement[] {
      return Array.from(fixture.nativeElement.querySelectorAll('nx-radio-indicator'));
    }

    function expectIndicators(className: string, present: boolean) {
      const indicators = getIndicators();
      expect(indicators.length).toBeGreaterThan(0);
      indicators.forEach((indicator) => {
        if (present) {
          expect(indicator).toHaveClass(className);
        } else {
          expect(indicator).not.toHaveClass(className);
        }
      });
    }

    it('marks the indicator as disabled', () => {
      createTestComponent(BasicRadio);
      expectIndicators('disabled', false);
      radioInstances.toArray()[0].disabled = true;
      fixture.detectChanges();
      expectIndicators('disabled', true);
    });

    it('marks the indicator as readonly', () => {
      createTestComponent(BasicRadio);
      expectIndicators('readonly', false);
      radioInstances.toArray()[0].setReadonly(true);
      fixture.detectChanges();
      expectIndicators('readonly', true);
    });

    it('marks the indicator as inverse when negative', () => {
      createTestComponent(ConfigurableRadio);
      expectIndicators('inverse', true);
      testInstance.negative = false;
      fixture.detectChanges();
      expectIndicators('inverse', false);
    });

    it('marks the indicators as disabled via the group', () => {
      createTestComponent(MultipleRadioDisabled);
      expectIndicators('disabled', true);
      testInstance.disabled = false;
      fixture.detectChanges();
      expectIndicators('disabled', false);
    });

    it('marks the indicators as readonly via the group', () => {
      createTestComponent(RadioGroupTest);
      expectIndicators('readonly', false);
      (testInstance as RadioGroupTest).readonly = true;
      fixture.detectChanges();
      expectIndicators('readonly', true);
    });

    it('marks the indicators as inverse via the group', () => {
      createTestComponent(MultipleRadio);
      expectIndicators('inverse', true);
      testInstance.groupNegative = false;
      fixture.detectChanges();
      expectIndicators('inverse', false);
    });

    it('marks the indicators as disabled on a programmatic group disabled change', () => {
      createTestComponent(MultipleRadioOnPush);
      expectIndicators('disabled', false);
      testInstance.radioGroup.disabled = true;
      fixture.detectChanges();
      expectIndicators('disabled', true);
    });

    it('marks the indicators as readonly on a programmatic group readonly change', () => {
      createTestComponent(MultipleRadioOnPush);
      expectIndicators('readonly', false);
      (testInstance as MultipleRadioOnPush).group.setReadonly(true);
      fixture.detectChanges();
      expectIndicators('readonly', true);
    });

    it('marks the indicators as inverse on a programmatic group negative change', () => {
      createTestComponent(MultipleRadioOnPush);
      expectIndicators('inverse', false);
      testInstance.radioGroup.negative = true;
      fixture.detectChanges();
      expectIndicators('inverse', true);
    });

    it('marks the indicators as critical when touched and invalid', () => {
      createTestComponent(RadioGroupValidationTouched);
      expectIndicators('critical', true);
    });

    it('marks the indicators as critical on submitting the form', () => {
      createTestComponent(RadioGroupValidation);
      expectIndicators('critical', false);
      fixture.nativeElement.querySelector('button').click();
      fixture.detectChanges();
      expectIndicators('critical', true);
    });

    it('marks the indicators as critical when the error state matcher is true', () => {
      createTestComponent(RadioGroupValidation);
      expectIndicators('critical', false);
      (testInstance.radioGroup['_errorStateMatcher'] as any) = { isErrorState: () => true };
      fixture.detectChanges();
      expectIndicators('critical', true);
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicRadio);
      await expect(fixture.nativeElement).toBeAccessible();
    });

    it('has no accessibility violations in a radio group', async () => {
      createTestComponent(RadioGroupTest);
      await expect(fixture.nativeElement).toBeAccessible();
    });

    it('should set aria-label, aria-labelledBy', async () => {
      createTestComponent(RadioA11y);
      expect(radioElements.item(0).getAttribute('aria-label')).toBe('label');
      expect(radioElements.item(0).getAttribute('aria-labelledby')).toBe('labelBy');
      expect(radioElements.item(1).getAttribute('aria-label')).toBeFalsy();
      expect(radioElements.item(1).getAttribute('aria-labelledby')).toBeFalsy();
    });

    it('does not describe the group when the label has no hint', () => {
      createTestComponent(RadioGroupTest);
      const groupEl = fixture.nativeElement.querySelector('nx-radio-group') as HTMLElement;

      expect(groupEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('describes the group with the label hint', () => {
      createTestComponent(RadioGroupWithHint);
      const groupEl = fixture.nativeElement.querySelector('nx-radio-group') as HTMLElement;
      const hintId = fixture.nativeElement.querySelector('.nx-label__hint')?.id;

      expect(hintId).toBe('prefs-label-hint');
      expect(groupEl.getAttribute('aria-describedby')).toBe(hintId);
    });

    it('leaves the bound ariaDescribedBy on the radio inputs untouched by the group hint', () => {
      createTestComponent(RadioGroupWithBoundDescribedBy);
      const groupEl = fixture.nativeElement.querySelector('nx-radio-group') as HTMLElement;

      expect(groupEl.getAttribute('aria-describedby')).toBe('prefs-label-hint');
      expect(radioElements.item(0).getAttribute('aria-describedby')).toBe('bound-desc');
    });

    it('drops the hint reference again when the hint is removed', () => {
      createTestComponent(RadioGroupWithBoundDescribedBy);
      const instance = fixture.componentInstance as RadioGroupWithBoundDescribedBy;
      const groupEl = fixture.nativeElement.querySelector('nx-radio-group') as HTMLElement;

      instance.hint = undefined;
      fixture.detectChanges();

      expect(groupEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('picks up a label that is only projected later', () => {
      createTestComponent(RadioGroupWithLateLabel);
      const instance = fixture.componentInstance as RadioGroupWithLateLabel;
      const groupEl = fixture.nativeElement.querySelector('nx-radio-group') as HTMLElement;
      expect(groupEl.hasAttribute('aria-describedby')).toBe(false);

      instance.showLabel = true;
      fixture.detectChanges();

      expect(groupEl.getAttribute('aria-describedby')).toBe('prefs-label-hint');
      expect(groupEl.getAttribute('aria-labelledby')).toBe('prefs-label');
    });
  });
});

@Component({
  selector: 'test-basic-radio',
  template: `<nx-radio>Label</nx-radio>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class BasicRadio extends RadioTest {}

@Component({
  selector: 'test-basic-radio-on-push',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<nx-radio>Label</nx-radio>`,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class BasicRadioOnPush extends RadioTest {}

@Component({
  selector: 'test-configurable-radio',
  template: `<nx-radio [negative]="negative">Label</nx-radio>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class ConfigurableRadio extends RadioTest {
  negative = true;
}

@Component({
  selector: 'test-labelless-radio',
  template: `<nx-radio></nx-radio>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class LabellessRadio extends RadioTest {}

@Component({
  selector: 'test-basic-radio-with-same-name',
  template: `
    <nx-radio name="standaloneTest">1</nx-radio>
    <nx-radio name="standaloneTest">2</nx-radio>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class BasicRadioWithSameName extends RadioTest {}

@Component({
  selector: 'test-dynamic-radio',
  template: `
    <nx-radio-group [name]="name" [(ngModel)]="templateModel">
      @for (fruit of data; track fruit) {
        <nx-radio [value]="fruit">{{ fruit }}</nx-radio>
      }
      <nx-radio value="1">1</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class DynamicRadio extends RadioTest {
  data = ['Lemons', 'Apples', 'Oranges'];
  name = 'dynamicTest';
}

@Component({
  selector: 'test-basic-radio-group',
  template: `
    <nx-radio-group name="groupTest">
      <nx-radio value="0">0</nx-radio>
      <nx-radio value="1">1</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class BasicRadioGroup extends RadioTest {}

@Component({
  selector: 'test-multiple-radio',
  template: `
    <nx-radio-group name="groupTest" [value]="templateModel" [negative]="groupNegative">
      <nx-radio value="0" [negative]="radioNegative">0</nx-radio>
      <nx-radio value="1">1</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class MultipleRadio extends RadioTest {
  groupNegative = true;
  radioNegative = false;
}

@Component({
  selector: 'test-multiple-radio-on-push',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nx-radio-group name="groupTest" #radioGroup>
      <nx-radio value="0">0</nx-radio>
      <nx-radio value="1">1</nx-radio>
    </nx-radio-group>
  `,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class MultipleRadioOnPush extends RadioTest {
  @ViewChild('radioGroup', { read: NxAbstractControl })
  group!: NxAbstractControl;
}

@Component({
  selector: 'test-multiple-radio-disabled',
  template: `
    <nx-radio-group name="groupTest" [disabled]="disabled">
      <nx-radio value="0">0</nx-radio>
      <nx-radio value="1">1</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class MultipleRadioDisabled extends RadioTest {
  disabled = true;
}

@Component({
  selector: 'test-reactive-radio',
  template: `
    <form [formGroup]="testForm">
      <nx-radio-group name="reactiveTest" formControlName="radioTestReactive">
        <nx-radio value="0">0</nx-radio>
        <nx-radio value="1">1</nx-radio>
      </nx-radio-group>
      <p>Form value: {{ testForm.value | json }}</p>
      <p>Form status: {{ testForm.status | json }}</p>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NxRadioModule,
    FormsModule,
    ReactiveFormsModule,
    NxLabelModule,
    NxErrorModule,
    JsonPipe,
  ],
})
class ReactiveRadio extends RadioTest {
  fb;

  constructor() {
    super();

    this.fb = new FormBuilder();

    this.testForm = this.fb.group({
      radioTestReactive: new FormControl('1'),
    });
  }
}
@Component({
  selector: 'test-group-with-ng-model',
  template: `
    <nx-radio-group name="groupTest" [(ngModel)]="templateModel">
      <nx-radio value="0">0</nx-radio>
      <nx-radio value="1">1</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class GroupWithNgModel extends RadioTest {}

@Component({
  selector: 'test-radio-group-validation',
  template: `
    <form [formGroup]="testForm" (ngSubmit)="onSubmit()">
      <nx-radio-group name="reactiveTest" formControlName="radioTestReactive" [required]="true">
        <nx-label [size]="'small'">What do you prefer?</nx-label>
        <nx-error appearance="text"> Please make a choice. </nx-error>
        <nx-radio value="coffee" [labelSize]="'small'" class="radio-item">Coffee</nx-radio>
        <nx-radio value="tea" [labelSize]="'small'" class="radio-item">Tea</nx-radio>
        <nx-radio value="water" [labelSize]="'small'" class="radio-item">Water</nx-radio>
      </nx-radio-group>
      <br />
      <button type="submit" nxButton="primary">Submit</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class RadioGroupValidation extends RadioTest {
  testForm!: FormGroup;
  submitted = false;
  @ViewChild(NxErrorComponent)
  radioGroupError!: NxErrorComponent;

  constructor(private readonly formBuilder: FormBuilder) {
    super();

    this.createForm();
  }

  createForm() {
    this.testForm = this.formBuilder.group({
      radioTestReactive: [null, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
  }
}

@Component({
  selector: 'test-radio-group-validation-touched',
  template: `
    <form [formGroup]="testForm" (ngSubmit)="onSubmit()">
      <nx-radio-group name="reactiveTest" formControlName="radioTestReactive" [required]="true">
        <nx-label [size]="'small'">What do you prefer?</nx-label>
        <nx-error appearance="text"> Please make a choice. </nx-error>
        <nx-radio value="coffee" [labelSize]="'small'" class="radio-item">Coffee</nx-radio>
        <nx-radio value="tea" [labelSize]="'small'" class="radio-item">Tea</nx-radio>
        <nx-radio value="water" [labelSize]="'small'" class="radio-item">Water</nx-radio>
      </nx-radio-group>
      <br />
      <button type="submit" nxButton="primary">Submit</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class RadioGroupValidationTouched extends RadioTest {
  testForm!: FormGroup;
  submitted = false;

  constructor(private readonly formBuilder: FormBuilder) {
    super();

    this.createForm();

    Object.values(this.testForm.controls).forEach((control) => {
      control!.markAsTouched({ onlySelf: true });
    });
  }

  createForm() {
    this.testForm = this.formBuilder.group({
      radioTestReactive: [null, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
  }
}

@Component({
  selector: 'test-radio-group-test',
  template: `
    <nx-radio-group name="radioGroupTest" [readonly]="readonly">
      <nx-label>What do you prefer?</nx-label>
      <nx-radio value="0">0</nx-radio>
      <nx-radio value="1">1</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class RadioGroupTest extends RadioTest {
  readonly = false;
}

@Component({
  selector: 'test-radio-group-with-hint',
  template: `
    <nx-radio-group name="radioGroupWithHint">
      <nx-label [id]="'prefs-label'" hint="Choose the one you use most">
        What do you prefer?
      </nx-label>
      <nx-radio value="0">0</nx-radio>
      <nx-radio value="1">1</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class RadioGroupWithHint extends RadioTest {}

@Component({
  selector: 'test-radio-group-with-bound-described-by',
  template: `
    <nx-radio-group name="radioGroupWithBoundDescribedBy" [ariaDescribedBy]="describedBy">
      <nx-label [id]="'prefs-label'" [hint]="hint">What do you prefer?</nx-label>
      <nx-radio value="0">0</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class RadioGroupWithBoundDescribedBy extends RadioTest {
  describedBy = 'bound-desc';
  hint: string | undefined = 'Choose the one you use most';
}

@Component({
  selector: 'test-radio-group-with-late-label',
  template: `
    <nx-radio-group name="radioGroupWithLateLabel">
      @if (showLabel) {
        <nx-label [id]="'prefs-label'" hint="Choose the one you use most">
          What do you prefer?
        </nx-label>
      }
      <nx-radio value="0">0</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class RadioGroupWithLateLabel extends RadioTest {
  showLabel = false;
}

@Component({
  selector: 'test-radio-a11y',
  template: `
    <nx-radio-group name="radioGroupTest">
      <nx-label>What do you prefer?</nx-label>
      <nx-radio value="0" [ariaLabel]="ariaLabel" [ariaLabelledBy]="ariaLabelledBy">0</nx-radio>
      <nx-radio value="1">1</nx-radio>
    </nx-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
})
class RadioA11y extends RadioTest {
  ariaLabel: string | null = 'label';
  ariaLabelledBy: string | null = 'labelBy';
}
