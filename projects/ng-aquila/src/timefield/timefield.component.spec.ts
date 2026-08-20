import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Injectable,
  signal,
  Type,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import {
  InputModeType,
  NxTimefieldComponent,
  TIMEFIELD_DEFAULT_OPTIONS,
} from './timefield.component';
import { NxTimefieldModule } from './timefield.module';
import { NxTimefieldIntl } from './timefield-intl';

@Directive({ standalone: true })
abstract class TimefieldTest {
  @ViewChild(NxTimefieldComponent)
  timefieldInstance!: NxTimefieldComponent;

  label = '';
  negative = false;
  disabled = false;
  readonly = false;
  required = false;
  time = '';
  twelveHourFormat = false;
  withTimepicker = false;
  inputMode = '';
}

@Injectable()
class MyIntl extends NxTimefieldIntl {
  inputFieldHoursAriaLabel = 'stunden';
  inputFieldMinutesAriaLabel = 'minuten';
}

describe('NxTimefieldComponent', () => {
  let fixture: ComponentFixture<TimefieldTest>;
  let testInstance: TimefieldTest;
  let timefieldInstance: NxTimefieldComponent;
  let timefieldElement: HTMLElement;
  let inputElementHours: HTMLInputElement;
  let inputElementMinutes: HTMLInputElement;
  let overlayContainer: OverlayContainer;

  function createTestComponent(component: Type<TimefieldTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    timefieldInstance = testInstance.timefieldInstance;
    timefieldElement = fixture.nativeElement.querySelector('nx-timefield');
    inputElementHours = fixture.nativeElement.querySelector(
      '.nx-timefield-input__field__hours',
    ) as HTMLInputElement;
    inputElementMinutes = fixture.nativeElement.querySelector(
      '.nx-timefield-input__field__minutes',
    ) as HTMLInputElement;
  }

  const assertTime = (time?: string | null) => {
    fixture.detectChanges();

    switch (time) {
      case null:
        expect(timefieldInstance.time).toBeNull();
        break;
      case undefined:
        expect(timefieldInstance.time).toBeUndefined();
        break;
      default:
        expect(timefieldInstance.time).toBe(time);
    }
  };
  const flushAndAssertTime = (time?: string | null) => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    tick();
    assertTime(time);
  };

  function getPickerListElement() {
    return overlayContainer.getContainerElement().querySelector('.option-list');
  }

  function getPickerOptions() {
    return overlayContainer
      .getContainerElement()
      .querySelectorAll<HTMLLIElement>('.option-list li');
  }

  function getToggleButton() {
    return fixture.nativeElement.querySelector('.nx-timepicker-toggle-button') as HTMLButtonElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxTimefieldModule,
        FormsModule,
        ReactiveFormsModule,
        DefaultOptionsProvderTimefield,
        SimpleTimefield,
        ConfigurableTimefield,
        ReactiveTimefield,
        TemplateDrivenTimefield,
        TemplateDrivenOnPushTimefield,
        OverrideDefaultLabelsTimefield,
        CustomValidationTimefield,
        InlineTimefield,
        ProjectedContentTimefield,
      ],
    }).compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
    })();
  }));

  it('should create a simple timefield component', () => {
    createTestComponent(SimpleTimefield);
    expect(timefieldInstance).toBeTruthy();
  });

  describe('inline', () => {
    it('should forward inline to the inner formfield and keep an accessible name', () => {
      createTestComponent(InlineTimefield);
      const formfieldElement = timefieldElement.querySelector('nx-formfield')!;
      expect(formfieldElement).not.toHaveClass('nx-formfield--inline');

      (testInstance as InlineTimefield).inline = true;
      fixture.detectChanges();

      expect(formfieldElement).toHaveClass('nx-formfield--inline');
      expect(timefieldInstance.getLabelledBy()).toBeTruthy();
    });
  });

  describe('projected content forwarding', () => {
    it('forwards a projected nxFormfieldPrefix into the inner formfield', () => {
      createTestComponent(ProjectedContentTimefield);
      expect(timefieldElement.querySelector('.nx-formfield__prefix')!.textContent).toContain(
        'content-prefix',
      );
    });

    it('forwards a projected nxFormfieldSuffix into the inner formfield', () => {
      createTestComponent(ProjectedContentTimefield);
      expect(timefieldElement.querySelector('.nx-formfield__suffix')!.textContent).toContain(
        'content-suffix',
      );
    });

    it('forwards a projected nxFormfieldAppendix into the inner formfield', () => {
      createTestComponent(ProjectedContentTimefield);
      expect(timefieldElement.querySelector('.nx-formfield__appendix')!.textContent).toContain(
        'content-appendix',
      );
    });

    it('does not render an appendix container when no appendix or label-info content is projected', () => {
      createTestComponent(SimpleTimefield);
      expect(timefieldElement.querySelector('.nx-formfield__appendix')).toBeNull();
    });

    it('routes a projected nxLabelInfo icon into the appendix under NDBX (default)', () => {
      createTestComponent(ProjectedContentTimefield);
      expect(timefieldElement.querySelector('.nx-formfield__appendix nx-info-icon')).not.toBeNull();
      expect(timefieldElement.querySelector('.nx-formfield__label-holder nx-info-icon')).toBeNull();
    });

    it('renders the internal timepicker toggle button alongside a projected suffix, as distinct content', () => {
      createTestComponent(ProjectedContentTimefield);
      (testInstance as ProjectedContentTimefield).withTimepicker = true;
      fixture.detectChanges();

      const suffix = timefieldElement.querySelector('.nx-formfield__suffix')!;
      expect(suffix.querySelector('.nx-timepicker-toggle-button')).toBeTruthy();
      expect(suffix.textContent).toContain('content-suffix');
    });
  });

  it('should set minimum minutes to 0 by default', () => {
    createTestComponent(SimpleTimefield);
    expect(timefieldInstance.minMinutes).toBe(0);
  });

  it('should set minimum hours to 0 by default', () => {
    createTestComponent(SimpleTimefield);
    expect(timefieldInstance.minHours).toBe(0);
  });

  it('should set maximum minutes to 59 by default', () => {
    createTestComponent(SimpleTimefield);
    expect(timefieldInstance.maxMinutes).toBe(59);
  });

  it('should set maximum hours to 23 by default', () => {
    createTestComponent(SimpleTimefield);
    expect(timefieldInstance.maxHours).toBe(23);
  });

  it('should set 12h toggle to false by default', () => {
    createTestComponent(SimpleTimefield);
    expect(timefieldInstance._toggleAMPM).toBeFalsy();
  });

  it('should have default inputmode="decimal"', () => {
    createTestComponent(SimpleTimefield);
    expect(inputElementHours.getAttribute('inputmode')).toBe('decimal');
    expect(inputElementMinutes.getAttribute('inputmode')).toBe('decimal');
  });

  it('should be able to set inputmode', fakeAsync(() => {
    createTestComponent(InputModeTimefield);
    const templateInstance = testInstance as InputModeTimefield;
    fixture.detectChanges();
    flush();
    templateInstance.inputMode = 'numeric';
    fixture.detectChanges();
    flush();
    expect(inputElementHours.getAttribute('inputmode')).toBe('numeric');
    expect(inputElementMinutes.getAttribute('inputmode')).toBe('numeric');

    templateInstance.inputMode = 'text';
    fixture.detectChanges();
    flush();
    expect(inputElementHours.getAttribute('inputmode')).toBe('text');
    expect(inputElementMinutes.getAttribute('inputmode')).toBe('text');
  }));

  it('should prevent setting time if timeformat is not in ISO 24h format', fakeAsync(() => {
    createTestComponent(TemplateDrivenTimefield);
    const templateInstance = testInstance as TemplateDrivenTimefield;
    flushAndAssertTime('00:00');
    templateInstance.today = '00:00:00';
    flushAndAssertTime(null);
    templateInstance.today = '00-00';
    flushAndAssertTime(null);
    templateInstance.today = '00/00';
    flushAndAssertTime(null);
    templateInstance.today = '00.00';
    flushAndAssertTime(null);
  }));

  it('should set time correctly in 24h format in template driven form with onPush change detection', fakeAsync(() => {
    createTestComponent(TemplateDrivenOnPushTimefield);
    flushAndAssertTime('00:00');
  }));

  it('should not set hours field if it is not between 0 and 23 in a template driven form', fakeAsync(() => {
    createTestComponent(TemplateDrivenTimefield);
    const templateInstance = testInstance as TemplateDrivenTimefield;
    templateInstance.today = '24:00';
    flushAndAssertTime(null);
    fixture.detectChanges();
    tick();
    expect(timefieldInstance.hours).toBe('');
  }));

  it('should not set minutes field if it is not between 0 and 59 in a template driven form', fakeAsync(() => {
    createTestComponent(TemplateDrivenTimefield);
    const templateInstance = testInstance as TemplateDrivenTimefield;
    templateInstance.today = '22:62';
    flushAndAssertTime(null);
    fixture.detectChanges();
    tick();
    expect(timefieldInstance.minutes).toBe('');
  }));

  it('should show error when hours field is not between 0 and 23 in a reactive form', fakeAsync(() => {
    createTestComponent(ReactiveTimefield);
    const reactInstance = testInstance as ReactiveTimefield;
    reactInstance.twelveHourFormat = true;
    reactInstance.testForm.setValue({ today: '24:00' });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    tick();
    expect(inputElementHours.value).toBe('');
    inputElementMinutes.click();
    fixture.detectChanges();
    tick();
    expect(reactInstance.testForm.status).toBe('INVALID');
  }));

  it('should validate time fields when control is non required', fakeAsync(() => {
    createTestComponent(CustomValidationTimefield);
    const reactInstance = testInstance as CustomValidationTimefield;
    reactInstance.twelveHourFormat = true;
    inputElementHours.value = '25';
    inputElementHours.value = '60';

    inputElementHours.dispatchEvent(new Event('input'));
    inputElementHours.focus();
    inputElementHours.blur();

    fixture.detectChanges();
    tick();

    expect(reactInstance.testForm.status).toBe('INVALID');
  }));

  it('should validate time fields when input non-number character', fakeAsync(() => {
    createTestComponent(CustomValidationTimefield);
    const reactInstance = testInstance as CustomValidationTimefield;
    reactInstance.twelveHourFormat = true;
    inputElementHours.value = 'hh';

    inputElementHours.dispatchEvent(new Event('input'));
    inputElementHours.focus();
    inputElementHours.blur();

    fixture.detectChanges();
    tick();

    expect(reactInstance.testForm.status).toBe('INVALID');
  }));

  it('should show error when minutes field is not between 0 and 59 in a reactive form', fakeAsync(() => {
    createTestComponent(ReactiveTimefield);
    const reactInstance = testInstance as ReactiveTimefield;
    reactInstance.twelveHourFormat = true;
    reactInstance.testForm.setValue({ today: '11:60' });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    tick();
    expect(inputElementMinutes.value).toBe('');
    inputElementMinutes.click();
    fixture.detectChanges();
    tick();
    expect(reactInstance.testForm.status).toBe('INVALID');
  }));

  it('should show error message and link input aria-descridebby with error id', () => {
    createTestComponent(ReactiveTimefield);
    inputElementHours.value = 'd';
    inputElementHours.dispatchEvent(new Event('input'));
    inputElementHours.focus();
    inputElementHours.blur();
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.nx-error__content');
    expect(error).toBeTruthy();
    expect(inputElementMinutes.getAttribute('aria-describedby')).toBe(error?.id);
    expect(inputElementHours.getAttribute('aria-describedby')).toBe(error?.id);
  });

  it('should not set value for any non-numeric entries', fakeAsync(() => {
    createTestComponent(TemplateDrivenTimefield);
    const templateInstance = testInstance as TemplateDrivenTimefield;
    templateInstance.today = 'abcd';
    flushAndAssertTime(null);
    fixture.detectChanges();
    tick();
    expect(timefieldInstance.minutes).toBe('');
  }));

  it('should emit change event in 24h ISO format', fakeAsync(() => {
    createTestComponent(TemplateDrivenTimefield);
    const templateInstance = testInstance as TemplateDrivenTimefield;
    flushAndAssertTime('00:00');
    const spy = vi.spyOn(timefieldInstance.valueChange, 'emit');
    templateInstance.today = '12:00';
    flushAndAssertTime('12:00');
    expect(timefieldInstance.valueChange.emit).toHaveBeenCalledWith('12:00');
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should not show timepicker by default', () => {
    createTestComponent(SimpleTimefield);
    expect(getToggleButton()).toBeFalsy();
  });

  it('should show timepicker when withTimepicker is true', () => {
    createTestComponent(ConfigurableTimefield);
    fixture.componentInstance.withTimepicker = true;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(getToggleButton()).toBeTruthy();
  });

  it('should show timepicker when enabled via default options', () => {
    createTestComponent(DefaultOptionsProvderTimefield);
    expect(getToggleButton()).toBeTruthy();
  });

  describe('twelveHourFormat', () => {
    it('should set twelveHourFormat programmatically', () => {
      createTestComponent(ConfigurableTimefield);
      timefieldInstance.twelveHourFormat = true;
      fixture.detectChanges();
      expect(timefieldInstance._toggleAMPM).toBe('AM');
      timefieldInstance.twelveHourFormat = false;
      fixture.detectChanges();
      expect(timefieldInstance._toggleAMPM).toBeNull();
    });

    it('should set minumum minutes to 0 by default', () => {
      createTestComponent(ConfigurableTimefield);
      timefieldInstance.twelveHourFormat = true;
      fixture.detectChanges();
      expect(timefieldInstance.minMinutes).toBe(0);
    });

    it('should set minumum hours to 1 by default', () => {
      createTestComponent(ConfigurableTimefield);
      timefieldInstance.twelveHourFormat = true;
      fixture.detectChanges();
      expect(timefieldInstance.minHours).toBe(1);
    });

    it('should set maximum minutes to 59 by default', () => {
      createTestComponent(ConfigurableTimefield);
      timefieldInstance.twelveHourFormat = true;
      fixture.detectChanges();
      expect(timefieldInstance.maxMinutes).toBe(59);
    });

    it('should set maximum hours to 12 by default', () => {
      createTestComponent(ConfigurableTimefield);
      timefieldInstance.twelveHourFormat = true;
      fixture.detectChanges();
      expect(timefieldInstance.maxHours).toBe(12);
    });

    it('should always set the model value in 24h format', fakeAsync(() => {
      createTestComponent(TemplateDrivenTimefield);
      const templateInstance = testInstance as TemplateDrivenTimefield;
      flushAndAssertTime('00:00');
      templateInstance.twelveHourFormat = true;
      fixture.detectChanges();
      expect(timefieldInstance._toggleAMPM).toBe('AM');
      inputElementHours.value = '12';
      inputElementMinutes.value = '00';
      fixture.detectChanges();
      tick();
      flushAndAssertTime('00:00');
      fixture.detectChanges();
      tick();
      expect(timefieldInstance.minutes).toBe('00');
      expect(timefieldInstance.hours).toBe('00');
    }));

    it('should switch correctly between am/pm and set correct 24h time in model', () => {
      createTestComponent(ConfigurableTimefield);
      timefieldInstance.twelveHourFormat = true;
      fixture.detectChanges();
      expect(timefieldInstance._toggleAMPM).toBe('AM');
      expect(timefieldInstance.minHours).toBe(1);
      expect(timefieldInstance.maxHours).toBe(12);
      timefieldInstance.twelveHourFormat = false;
      fixture.detectChanges();
      expect(timefieldInstance._toggleAMPM).toBeNull();
      expect(timefieldInstance.minHours).toBe(0);
      expect(timefieldInstance.maxHours).toBe(23);
    });
  });

  describe('disabled', () => {
    it('should update view on disabled change', () => {
      createTestComponent(ConfigurableTimefield);
      timefieldInstance.disabled = true;
      fixture.detectChanges();
      expect(timefieldElement).toHaveClass('is-disabled');
    });
  });

  describe('readonly', () => {
    it('should mark hours and minutes inputs as readonly', () => {
      createTestComponent(ConfigurableTimefield);
      testInstance.readonly = true;
      fixture.detectChanges();
      expect(inputElementHours.readOnly).toBe(true);
      expect(inputElementMinutes.readOnly).toBe(true);
    });

    it('should not open the timepicker overlay when readonly', () => {
      createTestComponent(ConfigurableTimefield);
      testInstance.withTimepicker = true;
      testInstance.readonly = true;
      fixture.detectChanges();
      getToggleButton().click();
      fixture.detectChanges();
      expect(getPickerListElement()).toBeFalsy();
    });

    it('should set readonly programmatically with setReadonly', () => {
      createTestComponent(ConfigurableTimefield);
      timefieldInstance.setReadonly(true);
      fixture.detectChanges();
      expect(inputElementHours.readOnly).toBe(true);
      expect(inputElementMinutes.readOnly).toBe(true);

      timefieldInstance.setReadonly(false);
      fixture.detectChanges();
      expect(inputElementHours.readOnly).toBe(false);
      expect(inputElementMinutes.readOnly).toBe(false);
    });
  });

  describe('negative', () => {
    it('should update view on negative change', () => {
      createTestComponent(ConfigurableTimefield);
      timefieldInstance.negative = true;
      fixture.detectChanges();
      expect(timefieldElement).toHaveClass('is-negative');
    });
  });

  describe('blur', () => {
    it('should zero pad the hours field if the value is <10', () => {
      createTestComponent(SimpleTimefield);
      inputElementHours.value = '0';
      inputElementHours.dispatchEvent(new Event('input'));
      inputElementHours.focus();
      fixture.detectChanges();
      expect(_getFocusedElementPierceShadowDom()).toEqual(inputElementHours);
      expect(inputElementHours.value).toBe('0');
      inputElementHours.blur();
      fixture.detectChanges();
      expect(timefieldInstance.hours).toBe('00');
      expect(inputElementHours.value).toBe('00');
    });

    it('should zero pad the minutes field if the value is <10', () => {
      createTestComponent(SimpleTimefield);
      inputElementMinutes.value = '0';
      inputElementMinutes.dispatchEvent(new Event('input'));
      inputElementMinutes.focus();
      fixture.detectChanges();
      expect(_getFocusedElementPierceShadowDom()).toEqual(inputElementMinutes);
      expect(inputElementMinutes.value).toBe('0');
      inputElementMinutes.blur();
      fixture.detectChanges();
      expect(timefieldInstance.minutes).toBe('00');
      expect(inputElementMinutes.value).toBe('00');
    });

    it('should zero pad the hours field if the value is <10 when focus goes from hours to minutes field', () => {
      createTestComponent(SimpleTimefield);
      inputElementHours.value = '0';
      inputElementHours.dispatchEvent(new Event('input'));
      inputElementHours.focus();
      fixture.detectChanges();
      expect(_getFocusedElementPierceShadowDom()).toEqual(inputElementHours);
      expect(inputElementHours.value).toBe('0');

      inputElementMinutes.focus();
      fixture.detectChanges();
      expect(_getFocusedElementPierceShadowDom()).toEqual(inputElementMinutes);
      expect(timefieldInstance.hours).toBe('00');
      expect(inputElementHours.value).toBe('00');
    });
  });

  describe('overlay opening and closing', () => {
    it('should open overlay on toggle button click', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      getToggleButton().click();
      fixture.detectChanges();
      expect(getPickerListElement()).toBeTruthy();
    });

    it('should open overlay on toggle button keydown events', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      getToggleButton().click();
      fixture.detectChanges();
      expect(getPickerListElement()).toBeTruthy();
    });

    it('should open overlay on input field keydown events', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      inputElementHours.focus();
      inputElementHours.value = '1';
      dispatchKeyboardEvent(inputElementHours, 'keydown', 49);
      fixture.detectChanges();
      expect(getPickerListElement()).toBeTruthy();
    });

    it('should keep focus on input field when an option was clicked', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      inputElementHours.focus();
      inputElementHours.value = '1';
      dispatchKeyboardEvent(inputElementHours, 'keydown', 49);
      fixture.detectChanges();
      expect(getPickerListElement()).toBeTruthy();
      const options = getPickerOptions();
      options[0].click();
      fixture.detectChanges();
      expect(_getFocusedElementPierceShadowDom()).toEqual(inputElementHours);
    });

    it('should keep focus on toggle button when an option was clicked', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      const toggleButton = getToggleButton();
      toggleButton.click();
      toggleButton.focus();
      fixture.detectChanges();
      expect(_getFocusedElementPierceShadowDom()).toEqual(toggleButton);
      const options = getPickerOptions();
      options[0].click();
      fixture.detectChanges();
      expect(_getFocusedElementPierceShadowDom()).toEqual(toggleButton);
    });

    it('should close overlay when backdrop is clicked', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      const toggleButton = getToggleButton();
      toggleButton.click();
      toggleButton.focus();
      fixture.detectChanges();
      expect(getPickerListElement()).toBeTruthy();
      const backdrop = overlayContainer
        .getContainerElement()
        .querySelector('.cdk-overlay-backdrop') as HTMLDivElement;
      backdrop.click();
      fixture.detectChanges();
      expect(getPickerListElement()).toBeFalsy();
    });

    it('should close overlay when the component loses focus', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      const toggleButton = getToggleButton();
      toggleButton.click();
      toggleButton.focus();
      fixture.detectChanges();
      expect(_getFocusedElementPierceShadowDom()).toEqual(toggleButton);
      expect(getPickerListElement()).toBeTruthy();
      toggleButton.blur();
      fixture.detectChanges();
      expect(getPickerListElement()).toBeFalsy();
    });
  });

  describe('validation', () => {
    it('should not show the error initially', () => {
      createTestComponent(ReactiveTimefield);
      const reactInstance = testInstance as ReactiveTimefield;
      expect(reactInstance.testForm.touched).toBe(false);
      expect(reactInstance.testForm.status).toBe('INVALID');
      expect(timefieldElement).not.toHaveClass('has-error');
      expect(timefieldElement).toHaveClass('ng-untouched');
    });

    it('should reflect the error state', fakeAsync(() => {
      createTestComponent(ReactiveTimefield);
      const reactInstance = testInstance as ReactiveTimefield;
      assertTime(null);
      expect(reactInstance.testForm.status).toBe('INVALID');
      reactInstance.testForm.patchValue({ today: '00:00' });
      fixture.detectChanges();
      tick();
      assertTime('00:00');
      expect(reactInstance.testForm.status).toBe('VALID');
    }));

    it('should mark as touched on blur only', () => {
      createTestComponent(ReactiveTimefield);
      const form = (testInstance as ReactiveTimefield).testForm;
      expect(form.touched).toBe(false);
      // test input event to avoid a regression
      inputElementHours.value = '0';
      inputElementHours.dispatchEvent(new Event('input'));
      inputElementHours.focus();
      fixture.detectChanges();
      expect(form.touched).toBe(false);
      inputElementHours.blur();
      fixture.detectChanges();
      expect(form.touched).toBe(true);
    });

    it('should mark as touched when option is selected', () => {
      createTestComponent(ReactiveTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      const form = (testInstance as ReactiveTimefield).testForm;
      const toggleButton = getToggleButton();
      toggleButton.click();
      fixture.detectChanges();
      const options = getPickerOptions();
      options[0].click();
      fixture.detectChanges();

      expect(form.touched).toBe(true);
    });

    it('should mark as touched when the panel closes without selecting', () => {
      createTestComponent(ReactiveTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      const form = (testInstance as ReactiveTimefield).testForm;
      const toggleButton = getToggleButton();
      toggleButton.click();
      fixture.detectChanges();
      const backdrop = overlayContainer
        .getContainerElement()
        .querySelector('.cdk-overlay-backdrop') as HTMLDivElement;
      backdrop.click();
      fixture.detectChanges();
      expect(form.touched).toBe(true);
    });

    it('should show error only when all inputs have lost focus', () => {
      createTestComponent(ReactiveTimefield);

      inputElementHours.value = '25';
      inputElementHours.dispatchEvent(new Event('input'));
      inputElementHours.focus();
      fixture.detectChanges();
      expect(timefieldElement).not.toHaveClass('has-error');

      inputElementMinutes.dispatchEvent(new Event('input'));
      inputElementMinutes.focus();
      fixture.detectChanges();
      expect(timefieldElement).not.toHaveClass('has-error');

      inputElementMinutes.blur();
      fixture.detectChanges();
      expect(timefieldElement).toHaveClass('has-error');
    });

    it('should reflect error state when control validator changes', () => {
      createTestComponent(ReactiveTimefield);
      const reactInstance = testInstance as ReactiveTimefield;
      const formControl = reactInstance.testForm.get('today') as FormControl;

      inputElementHours.dispatchEvent(new Event('input'));
      inputElementHours.focus();
      inputElementHours.blur();
      fixture.detectChanges();
      expect(timefieldElement).toHaveClass('has-error');

      formControl.clearValidators();
      formControl.updateValueAndValidity();
      fixture.detectChanges();
      expect(timefieldElement).not.toHaveClass('has-error');

      formControl.setValidators(() => ({ customError: true }));
      formControl.updateValueAndValidity();
      fixture.detectChanges();
      expect(timefieldElement).toHaveClass('has-error');
    });
  });

  describe('selection in timepicker', () => {
    it('should be possible to select via click when input is focused', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      inputElementHours.focus();
      inputElementHours.value = '1';
      dispatchKeyboardEvent(inputElementHours, 'keydown', 49, '1');
      fixture.detectChanges();
      const options = getPickerOptions();
      options[0].click();
      fixture.detectChanges();
      expect(inputElementHours.value).toBe('00');
      expect(inputElementMinutes.value).toBe('00');
      expect(getPickerListElement()).toBeFalsy();
    });

    it('should be possible to select via keyboard when input is focused', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      inputElementHours.focus();
      inputElementHours.value = '1';
      dispatchKeyboardEvent(inputElementHours, 'keydown', 49, '1');
      fixture.detectChanges();
      inputElementHours.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      dispatchKeyboardEvent(inputElementHours, 'keydown', ENTER, 'Enter');
      fixture.detectChanges();
      // this should really be 01 because "1" was entered, but the whole logic has its flaws right now
      // should be improved later
      expect(inputElementHours.value).toBe('00');
      expect(getPickerListElement()).toBeFalsy();
      dispatchKeyboardEvent(inputElementHours, 'keydown', 49, '1');
      fixture.detectChanges();
      dispatchKeyboardEvent(inputElementHours, 'keydown', DOWN_ARROW, 'ArrowDown');
      fixture.detectChanges();
      dispatchKeyboardEvent(inputElementHours, 'keydown', ENTER, 'Enter');
      fixture.detectChanges();
      expect(inputElementHours.value).toBe('00');
      expect(inputElementMinutes.value).toBe('30');
      expect(getPickerListElement()).toBeFalsy();
    });

    it('should be possible to select via click when toggle button is focused', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      const toggleButton = getToggleButton();
      toggleButton.click();
      toggleButton.focus();
      fixture.detectChanges();
      const options = getPickerOptions();
      options[0].click();
      fixture.detectChanges();
      expect(inputElementHours.value).toBe('00');
      expect(inputElementMinutes.value).toBe('00');
      expect(getPickerListElement()).toBeFalsy();
    });

    it('should be possible to select via keyboard when toggle button is focused', fakeAsync(() => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      const toggleButton = getToggleButton();
      toggleButton.click();
      toggleButton.focus();
      fixture.detectChanges();
      flush();
      dispatchKeyboardEvent(inputElementHours, 'keydown', ENTER, 'Enter');
      fixture.detectChanges();
      flush();
      expect(inputElementHours.value).toBe('00');
      expect(inputElementMinutes.value).toBe('00');
      expect(getPickerListElement()).toBeFalsy();
      toggleButton.click();
      toggleButton.focus();
      fixture.detectChanges();
      flush();
      dispatchKeyboardEvent(inputElementHours, 'keydown', DOWN_ARROW, 'ArrowDown');
      fixture.detectChanges();
      flush();
      dispatchKeyboardEvent(inputElementHours, 'keydown', ENTER, 'Enter');
      fixture.detectChanges();
      flush();
      expect(inputElementHours.value).toBe('00');
      expect(inputElementMinutes.value).toBe('30');
      expect(getPickerListElement()).toBeFalsy();
    }));

    it('should update active option when typing', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      inputElementHours.focus();
      inputElementHours.value = '0';
      dispatchKeyboardEvent(inputElementHours, 'keydown', 48, '0');
      fixture.detectChanges();
      inputElementHours.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const targetOption = Array.from(getPickerOptions()).find(
        (option) => option.textContent === '00:00',
      );
      expect(targetOption).toBeTruthy();
      expect(inputElementHours.getAttribute('aria-activedescendant')).toBe(targetOption!.id);
    });

    it('should update active item on keydown events', () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      inputElementHours.focus();
      inputElementHours.value = '0';
      dispatchKeyboardEvent(inputElementHours, 'keydown', 48, '0');
      fixture.detectChanges();
      inputElementHours.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      dispatchKeyboardEvent(inputElementHours, 'keydown', DOWN_ARROW, 'ArrowDown');
      fixture.detectChanges();
      const firstOption = Array.from(getPickerOptions()).find(
        (option) => option.textContent === '00:00',
      );
      const secondOption = Array.from(getPickerOptions()).find(
        (option) => option.textContent === '00:30',
      );
      expect(firstOption).toBeTruthy();
      expect(secondOption).toBeTruthy();
      expect(inputElementHours.getAttribute('aria-activedescendant')).toBe(secondOption!.id);
      dispatchKeyboardEvent(inputElementHours, 'keydown', UP_ARROW, 'ArrowUp');
      fixture.detectChanges();
      expect(inputElementHours.getAttribute('aria-activedescendant')).toBe(firstOption!.id);
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(SimpleTimefield);
      await expect(fixture.nativeElement).toBeAccessible();
    });

    it('has no accessibility violations when overlay is opened', async () => {
      createTestComponent(ConfigurableTimefield);
      fixture.componentInstance.withTimepicker = true;
      fixture.detectChanges();
      const toggleButton = getToggleButton();
      toggleButton.click();
      fixture.detectChanges();

      await expect(fixture.nativeElement).toBeAccessible();
    });

    it('should overwrite the default aria labels', () => {
      createTestComponent(OverrideDefaultLabelsTimefield);
      expect(inputElementHours.getAttribute('aria-label')).toBe('stunden');
      expect(inputElementMinutes.getAttribute('aria-label')).toBe('minuten');
    });
  });
});

describe('NxTimefieldComponent projected content under Allianz One', () => {
  let fixture: ComponentFixture<ProjectedContentTimefield>;
  let timefieldElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule, ProjectedContentTimefield],
      providers: [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }],
    }).compileComponents();
  }));

  it('routes a projected nxLabelInfo icon next to the label under Allianz One', () => {
    fixture = TestBed.createComponent(ProjectedContentTimefield);
    fixture.detectChanges();
    timefieldElement = fixture.nativeElement.querySelector('nx-timefield');

    expect(
      timefieldElement.querySelector('.nx-formfield__label-holder nx-info-icon'),
    ).not.toBeNull();
  });
});

@Component({
  selector: 'test-simple-timefield',
  template: `<nx-timefield label="Time"></nx-timefield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule],
})
class SimpleTimefield extends TimefieldTest {}

@Component({
  selector: 'test-inline-timefield',
  template: `<nx-timefield label="Time" [inline]="inline"></nx-timefield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule],
})
class InlineTimefield extends TimefieldTest {
  inline = false;
}

@Component({
  selector: 'test-projected-content-timefield',
  template: `
    <nx-timefield [label]="label" [withTimepicker]="withTimepicker" [inline]="inline">
      <span nxFormfieldPrefix>content-prefix</span>
      <span nxFormfieldSuffix>content-suffix</span>
      <span nxFormfieldAppendix>content-appendix</span>
      <nx-info-icon nxLabelInfo>Field help</nx-info-icon>
    </nx-timefield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule, NxInfoIconComponent],
})
class ProjectedContentTimefield extends TimefieldTest {
  inline = false;
}

@Component({
  selector: 'test-configurable-timefield',
  template: `
    <nx-timefield
      [label]="label"
      [twelveHourFormat]="twelveHourFormat"
      [withTimepicker]="withTimepicker"
      [negative]="negative"
      [disabled]="disabled"
      [readonly]="readonly"
      [required]="required"
    ></nx-timefield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule],
})
class ConfigurableTimefield extends TimefieldTest {}

@Component({
  selector: 'test-reactive-timefield',
  template: `
    <form [formGroup]="testForm">
      <nx-timefield
        formControlName="today"
        [twelveHourFormat]="twelveHourFormat"
        [withTimepicker]="withTimepicker"
      >
        <nx-error> This is error </nx-error>
      </nx-timefield>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule, NxErrorComponent],
})
class ReactiveTimefield extends TimefieldTest {
  testForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      today: ['', Validators.required],
    });
  }
}
@Component({
  selector: 'test-template-driven-timefield',
  template: `<nx-timefield
    [twelveHourFormat]="twelveHourFormat"
    [(ngModel)]="today"
  ></nx-timefield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule],
})
class TemplateDrivenTimefield extends TimefieldTest {
  today = '00:00';
}

@Component({
  selector: 'test-template-driven-on-push-timefield',
  template: `<nx-timefield
    [twelveHourFormat]="twelveHourFormat"
    [(ngModel)]="today"
  ></nx-timefield>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule],
})
class TemplateDrivenOnPushTimefield extends TimefieldTest {
  today = '00:00';
}

@Component({
  selector: 'test-override-default-labels-timefield',
  template: `<nx-timefield twelveHourFormat></nx-timefield>`,
  providers: [{ provide: NxTimefieldIntl, useClass: MyIntl }],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule],
})
class OverrideDefaultLabelsTimefield extends TimefieldTest {}

@Component({
  selector: 'test-default-options-provder-timefield',
  template: `<nx-timefield twelveHourFormat></nx-timefield>`,
  providers: [{ provide: TIMEFIELD_DEFAULT_OPTIONS, useValue: { withTimepicker: true } }],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule],
})
class DefaultOptionsProvderTimefield extends TimefieldTest {}

@Component({
  selector: 'test-custom-validation-timefield',
  template: `
    <form [formGroup]="testForm">
      <nx-timefield
        formControlName="today"
        [twelveHourFormat]="twelveHourFormat"
        enableTimeValidation
      >
        <nx-error> This is error </nx-error>
      </nx-timefield>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule, NxErrorComponent],
})
class CustomValidationTimefield extends TimefieldTest {
  testForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      today: [''],
    });
  }
}
@Component({
  selector: 'test-input-mode-timefield',
  template: `<nx-timefield label="Time" [inputMode]="inputMode"></nx-timefield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule],
})
class InputModeTimefield extends TimefieldTest {
  inputMode: InputModeType = 'decimal';
}
