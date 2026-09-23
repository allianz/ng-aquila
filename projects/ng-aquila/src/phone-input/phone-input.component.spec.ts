import { NxDropdownComponent } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent, NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Injectable,
  provideNgReflectAttributes,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import countries from 'i18n-iso-countries';
import de from 'i18n-iso-countries/langs/de.json';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxPhoneInputComponent } from './phone-input.component';
import { NxPhoneInputModule } from './phone-input.module';
import { NxPhoneInputIntl } from './phone-input-intl';

countries.registerLocale(de);

describe('PhoneInputComponent', () => {
  let phoneInputInstance: NxPhoneInputComponent;
  let fixture: ComponentFixture<PhoneInputTest>;
  let testInstance: PhoneInputTest;
  let dropdown: DebugElement;
  let overlayContainer: OverlayContainer;

  function createTestComponent(component: Type<PhoneInputTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    phoneInputInstance = testInstance.phoneInput;
    dropdown = getDropdown();
  }

  function getPanel(): HTMLElement {
    return overlayContainer
      .getContainerElement()
      .querySelector('.nx-dropdown__panel') as HTMLElement;
  }

  function getRenderedValue(): HTMLElement {
    return dropdown.nativeElement.querySelector('.nx-dropdown__rendered') as HTMLElement;
  }

  function getDropdown() {
    return fixture.debugElement.query(By.directive(NxDropdownComponent));
  }

  function getInput() {
    return fixture.debugElement.query(By.css('nx-phone-input')).query(By.css('input'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NxPhoneInputModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsPhoneInput,
        PhoneInputInFormComponent,
        I18nProviderTest,
        DefaultPhoneInput,
        ConfigurablePhoneInput,
        CustomFormatter,
        PhoneInputA11y,
      ],
      providers: [NxPhoneInputIntl, provideNgReflectAttributes()],
    }).compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
    })();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should register as formfield control', () => {
    createTestComponent(DefaultPhoneInput);
    const formfield = fixture.debugElement.query(
      By.directive(NxFormfieldComponent),
    ).componentInstance;
    expect(formfield._control).toBe(phoneInputInstance);
  });

  it('should not log an NG01354 warning for the internal input inside a form', () => {
    fixture = TestBed.createComponent(PhoneInputInFormComponent);
    const warnSpy = vi.spyOn(console, 'warn');

    fixture.detectChanges();

    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('NG01354'));
  });

  it('should have class on input', () => {
    createTestComponent(DefaultPhoneInput);
    const input = getInput().nativeElement;
    expect(input).toHaveClass('c-input');
  });

  // `<label for>` cannot reach the input, since the id sits on the nx-phone-input host.
  it('should focus the line number input when the formfield label is clicked', () => {
    createTestComponent(DefaultPhoneInput);

    fixture.nativeElement.querySelector('.nx-formfield__label').click();

    expect(document.activeElement).toBe(getInput().nativeElement);
  });

  it('should focus the readonly input when the formfield label is clicked', () => {
    createTestComponent(ConfigurablePhoneInput);
    testInstance.readonly = true;
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.nx-formfield__label').click();

    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('.readonly-input'));
  });

  it('should class on readonly input', () => {
    createTestComponent(ConfigurablePhoneInput);
    testInstance.readonly = true;
    fixture.detectChanges();
    const input = getInput().nativeElement;
    expect(input).toHaveClass('c-input');
  });

  it('should visually hide the dropdown when readonly', () => {
    createTestComponent(ConfigurablePhoneInput);
    expect(fixture.nativeElement.querySelector('.nx-phone-input___country')).not.toHaveClass(
      'hide',
    );
    testInstance.readonly = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.nx-phone-input___country')).toHaveClass('hide');
  });

  it('should show the unformatted value when readonly', fakeAsync(() => {
    createTestComponent(ConfigurablePhoneInput);
    // for whatever reason we need fakeAsync and flush here or the ngModel value
    // seems to be deferred and will only come in after the expect
    flush();
    testInstance.readonly = true;
    fixture.detectChanges();
    flush();
    expect(fixture.nativeElement.querySelector('.readonly-input').value).toBe('+49123456');
  }));

  it('should reflect readonly state when setReadonly changed', () => {
    createTestComponent(DefaultPhoneInput);

    const container = fixture.debugElement.query(By.css('nx-formfield'))!.nativeElement;

    phoneInputInstance.setReadonly(true);
    fixture.detectChanges();
    expect(container).toHaveClass('is-readonly');
    expect(container.querySelector('.readonly-input')).toBeTruthy();

    phoneInputInstance.setReadonly(false);
    fixture.detectChanges();
    expect(container).not.toHaveClass('is-readonly');
    expect(container.querySelector('.readonly-input')).toBeFalsy();
  });

  it('should disable from input', fakeAsync(() => {
    createTestComponent(ConfigurablePhoneInput);
    testInstance.disabled = true;
    fixture.detectChanges();
    flush();
    const input = getInput()?.nativeElement;
    expect(dropdown.componentInstance.disabled).toBe(true);
    expect(input.disabled).toBe(true);
    testInstance.disabled = false;
    fixture.detectChanges();
    flush();
    expect(dropdown.componentInstance.disabled).toBe(false);
    expect(input.disabled).toBe(false);
  }));

  it('should update template after patchValue', fakeAsync(() => {
    createTestComponent(ReactiveFormsPhoneInput);
    const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
    formControl.patchValue('+49666');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    expect(getInput().nativeElement.value).toBe('666');
    expect(dropdown.nativeElement.innerText).toContain('+49');

    formControl.patchValue('+1456');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    expect(getInput().nativeElement.value).toBe('456');
    expect(dropdown.nativeElement.innerText).toContain('+1');

    formControl.patchValue('');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    expect(getInput().nativeElement.value).toBe('');
    // should fall back to what previous country code was set, by default +49
    expect(dropdown.nativeElement.innerText).toBe('+1');
  }));

  describe('unparseable values', () => {
    it('should not throw when the value has no calling code', fakeAsync(() => {
      createTestComponent(ReactiveFormsPhoneInput);
      const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;

      expect(() => {
        formControl.setValue('234');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      }).not.toThrow();

      expect(getInput().nativeElement.value).toBe('234');
    }));

    it('should not throw when the calling code is unknown', fakeAsync(() => {
      createTestComponent(ReactiveFormsPhoneInput);
      const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;

      expect(() => {
        formControl.setValue('+999999');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      }).not.toThrow();
    }));

    it('should mark the control invalid', fakeAsync(() => {
      createTestComponent(ReactiveFormsPhoneInput);
      const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
      formControl.setValue('234');
      flush();

      expect(formControl.errors).toEqual({ nxPhoneInputParse: { text: '234' } });
    }));

    it('should clear the error once a parseable value is set', fakeAsync(() => {
      createTestComponent(ReactiveFormsPhoneInput);
      const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
      formControl.setValue('234');
      flush();
      expect(formControl.errors).toBeTruthy();

      formControl.setValue('+49123456');
      flush();
      expect(formControl.errors).toBeNull();
    }));

    it('should not clear the error by typing alone, without picking a country', fakeAsync(() => {
      createTestComponent(ReactiveFormsPhoneInput);
      const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
      formControl.setValue('234');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const input = getInput().nativeElement;
      input.value = '2349';
      dispatchFakeEvent(input, 'input');
      fixture.detectChanges();
      flush();

      // still no country selected, so there is no calling code to prefix the digits with
      expect(formControl.errors).toEqual({ nxPhoneInputParse: { text: '2349' } });
    }));

    it('should clear the error once a country is picked from the dropdown', fakeAsync(() => {
      createTestComponent(ReactiveFormsPhoneInput);
      const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
      formControl.setValue('234');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      dropdown.nativeElement.click();
      fixture.detectChanges();
      const selectOption = dropdown.query(By.css('[ng-reflect-value="DE"]'));
      selectOption.nativeElement.click();
      fixture.detectChanges();
      flush();

      expect(formControl.errors).toBeNull();
    }));

    it('should not report a parse error for an empty or whitespace formatted value', fakeAsync(() => {
      createTestComponent(ReactiveFormsPhoneInput);
      const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;

      formControl.setValue('+49 123 456');
      flush();
      expect(formControl.errors).toBeNull();

      formControl.setValue('');
      flush();
      // empty values are left to `Validators.required`
      expect(formControl.errors).toEqual({ required: true });
    }));

    it('should show the error only after the control was touched', fakeAsync(() => {
      createTestComponent(ReactiveFormsPhoneInput);
      const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
      formControl.setValue('234');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-error')).toBeFalsy();

      formControl.markAsTouched();
      // the formfield reacts to `stateChanges` on the asap scheduler, so the error state has
      // to be picked up by a change detection run before flushing that microtask
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-error')).toBeTruthy();
    }));

    describe('globe placeholder for an unresolved country', () => {
      it('shows the globe icon and clears countryCode', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;

        formControl.setValue('234');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        expect(testInstance.phoneInput.countryCode).toBe('');
        expect(dropdown.componentInstance.empty).toBe(true);
        expect(fixture.nativeElement.querySelector('.nx-phone-input___globe')).toBeTruthy();
      }));

      it('hides the globe icon again once a parseable value is set', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;

        formControl.setValue('234');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        formControl.setValue('+49123456');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.nx-phone-input___globe')).toBeFalsy();
      }));

      it('cannot be brought back by typing once a country was picked from the list', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;

        formControl.setValue('234');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        dropdown.nativeElement.click();
        fixture.detectChanges();
        const selectOption = dropdown.query(By.css('[ng-reflect-value="DE"]'));
        selectOption.nativeElement.click();
        fixture.detectChanges();
        flush();

        expect(fixture.nativeElement.querySelector('.nx-phone-input___globe')).toBeFalsy();

        const input = getInput().nativeElement;
        input.value = '999999999';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        flush();

        expect(fixture.nativeElement.querySelector('.nx-phone-input___globe')).toBeFalsy();
      }));

      it('is never listed as a selectable option', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        flush();

        expect(testInstance.phoneInput._sortedCountries.some((option) => option.value === '')).toBe(
          false,
        );
      }));
    });

    describe('leading zero', () => {
      it('is kept in the input and the model on blur', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;

        formControl.setValue('0891234567');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        const input = getInput().nativeElement;
        expect(input.value).toBe('0891234567');

        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        flush();

        // without a calling code the zero is not a trunk prefix, so it has to stay
        expect(input.value).toBe('0891234567');
        expect(formControl.value).toBe('0891234567');
      }));

      it('is kept in the readonly input', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;

        formControl.setValue('0891234567');
        fixture.detectChanges();
        flush();
        testInstance.readonly = true;
        fixture.detectChanges();
        flush();

        expect(fixture.nativeElement.querySelector('.readonly-input').value).toBe('0891234567');
      }));

      it('is kept in the model while typing', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;

        formControl.setValue('234');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        const input = getInput().nativeElement;
        input.value = '0234';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        flush();

        expect(formControl.value).toBe('0234');
        expect(formControl.errors).toEqual({ nxPhoneInputParse: { text: '0234' } });
      }));
    });
  });

  it('should reset country code after reset of form', fakeAsync(() => {
    createTestComponent(ReactiveFormsPhoneInput);
    flush();
    const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
    formControl.reset();
    fixture.detectChanges();
    expect(dropdown.nativeElement.innerText).toContain('+33');
  }));

  it('should disable from form control', fakeAsync(() => {
    createTestComponent(ReactiveFormsPhoneInput);
    (testInstance as ReactiveFormsPhoneInput).formControl.disable();
    fixture.detectChanges();
    flush();
    const input = getInput()?.nativeElement;
    expect(dropdown.componentInstance.disabled).toBe(true);
    expect(input.disabled).toBe(true);
    (testInstance as ReactiveFormsPhoneInput).formControl.enable();
    fixture.detectChanges();
    flush();
    expect(dropdown.componentInstance.disabled).toBe(false);
    expect(input.disabled).toBe(false);
  }));

  it('should remove leading zeros by default on blur', fakeAsync(() => {
    createTestComponent(DefaultPhoneInput);
    flush();
    const input = getInput().nativeElement;
    input.value = '01234';
    dispatchFakeEvent(input, 'input');
    fixture.detectChanges();
    flush();
    dispatchFakeEvent(input, 'blur');
    fixture.detectChanges();
    flush();
    expect(input.value).toBe('1234');
  }));

  it('should not remove leading zeros on blur if country is italy', fakeAsync(() => {
    createTestComponent(ReactiveFormsPhoneInput);
    flush();
    const input = getInput().nativeElement;

    const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
    formControl.setValue('+390123');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    dispatchFakeEvent(input, 'input');
    fixture.detectChanges();
    flush();
    dispatchFakeEvent(input, 'blur');
    fixture.detectChanges();
    flush();
    expect(getInput().nativeElement.value).toBe('0123');
    expect((testInstance as ReactiveFormsPhoneInput).formControl.value).toBe('+390123');
  }));

  it('should remove leading zero in model', fakeAsync(() => {
    createTestComponent(ReactiveFormsPhoneInput);
    flush();
    const input = getInput().nativeElement;
    input.value = '01234';
    dispatchFakeEvent(input, 'input');
    fixture.detectChanges();
    flush();
    dispatchFakeEvent(input, 'blur');
    fixture.detectChanges();
    flush();
    expect((testInstance as ReactiveFormsPhoneInput).formControl.value).toBe('+491234');
  }));

  it('should remove special characters from model', fakeAsync(() => {
    createTestComponent(ReactiveFormsPhoneInput);
    flush();
    const input = getInput().nativeElement;
    input.value = '0(12)3-4';
    dispatchFakeEvent(input, 'input');
    fixture.detectChanges();
    flush();
    dispatchFakeEvent(input, 'blur');
    fixture.detectChanges();
    flush();
    expect((testInstance as ReactiveFormsPhoneInput).formControl.value).toBe('+491234');
  }));

  it('should remove the leading zero that special characters hid', fakeAsync(() => {
    createTestComponent(ReactiveFormsPhoneInput);
    flush();
    const input = getInput().nativeElement;
    input.value = '(089)123';
    dispatchFakeEvent(input, 'input');
    fixture.detectChanges();
    flush();
    dispatchFakeEvent(input, 'blur');
    fixture.detectChanges();
    flush();

    expect(input.value).toBe('89123');
    expect((testInstance as ReactiveFormsPhoneInput).formControl.value).toBe('+4989123');
  }));

  it('should change the dropdown top label via input', () => {
    createTestComponent(ConfigurablePhoneInput);
    dispatchFakeEvent(dropdown.nativeElement, 'click');
    fixture.detectChanges();
    expect(getPanel().innerText).toContain('My area code');
  });

  it('should change the country translations via input', () => {
    createTestComponent(ConfigurablePhoneInput);
    dispatchFakeEvent(dropdown.nativeElement, 'click');
    fixture.detectChanges();
    expect(getPanel().innerText).toContain('Deutschland');
  });

  it('should change the dropdown top label via provider', () => {
    createTestComponent(I18nProviderTest);
    dispatchFakeEvent(dropdown.nativeElement, 'click');
    fixture.detectChanges();
    expect(getPanel().innerText).toContain('Custom area code label');
  });

  it('should change the country translations via provider', () => {
    createTestComponent(I18nProviderTest);
    dispatchFakeEvent(dropdown.nativeElement, 'click');
    fixture.detectChanges();
    expect(getPanel().innerText).toContain('Deutschland');
  });

  it('should use default error state matcher', fakeAsync(() => {
    createTestComponent(ReactiveFormsPhoneInput);
    flush();
    (testInstance as ReactiveFormsPhoneInput).formControl.setValue('');
    (testInstance as ReactiveFormsPhoneInput).formControl.markAsTouched();
    flush();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nx-error')).toBeTruthy();
  }));

  it('should set country dropdown from model value', fakeAsync(() => {
    createTestComponent(ReactiveFormsPhoneInput);
    flush();
    (testInstance as ReactiveFormsPhoneInput).formControl.setValue('+177777');
    fixture.detectChanges();
    flush();
    expect(fixture.nativeElement.querySelector('nx-phone-input').innerText).toContain('+1');
  }));

  it('should have countries', () => {
    createTestComponent(DefaultPhoneInput);
    expect(Object.keys(phoneInputInstance.countryNames)).not.toHaveLength(0);
    dispatchFakeEvent(dropdown.nativeElement, 'click');
    fixture.detectChanges();
    expect(getPanel().innerText).toContain('Germany');
  });

  it('should accept a custom formatter', fakeAsync(() => {
    createTestComponent(CustomFormatter);
    flush();
    // fixture.detectChanges();
    const input = getInput();
    expect(input.nativeElement.value).toBe('12 34 56');
    input.nativeElement.value = '4444';
    dispatchFakeEvent(input.nativeElement, 'input');
    dispatchFakeEvent(input.nativeElement, 'blur');
    fixture.detectChanges();
    flush();
    expect(input.nativeElement.value).toBe('44 44');
  }));

  it('should not reformat again on repeated blur with a custom formatter', fakeAsync(() => {
    createTestComponent(CustomFormatter);
    flush();
    const input = getInput();
    expect(input.nativeElement.value).toBe('12 34 56');

    dispatchFakeEvent(input.nativeElement, 'blur');
    fixture.detectChanges();
    flush();
    expect(input.nativeElement.value).toBe('12 34 56');

    dispatchFakeEvent(input.nativeElement, 'blur');
    fixture.detectChanges();
    flush();
    expect(input.nativeElement.value).toBe('12 34 56');
  }));

  it('should set input placeholder', fakeAsync(() => {
    createTestComponent(ConfigurablePhoneInput);
    const input = getInput().nativeElement;
    expect(input.getAttribute('placeholder')).toBe('89 7531');
  }));

  it('should set country code', fakeAsync(() => {
    createTestComponent(DefaultPhoneInput);
    flush();
    fixture.detectChanges();
    flush();
    expect(getRenderedValue().innerText).toBe('+33');
  }));

  it('should not override country code from model', fakeAsync(() => {
    createTestComponent(ConfigurablePhoneInput);
    flush();
    fixture.detectChanges();
    flush();
    expect(getRenderedValue().innerText).toBe('+49');
  }));

  it('should not override country code if input is filled', fakeAsync(() => {
    createTestComponent(ConfigurablePhoneInput);
    flush();
    testInstance.countryCode = 'AT';
    fixture.detectChanges();
    flush();
    expect(getRenderedValue().innerText).toBe('+49');
  }));

  it('should call inputFormatter and update countryCode when country change', fakeAsync(() => {
    createTestComponent(ConfigurablePhoneInput);
    flush();
    // `inputFormatter` is a getter/setter pair, and `vi.spyOn` mistakes the getter for Vite's
    // SSR wrapper and invokes it unbound. Assign the mock through the setter instead.
    const inputFormatter = vi.fn().mockName('inputFormatter').mockReturnValue('');
    testInstance.phoneInput.inputFormatter = inputFormatter;
    inputFormatter.mockClear();

    const select = dropdown.nativeElement;
    select.click();
    fixture.detectChanges();

    const selectOption = dropdown.query(By.css('[ng-reflect-value="UA"]'));
    selectOption.nativeElement.click();

    fixture.detectChanges();
    flush();

    expect(testInstance.phoneInput.countryCode).toBe('UA');
    expect(inputFormatter).toHaveBeenCalled();
  }));

  it('should set aria-label', () => {
    createTestComponent(PhoneInputA11y);
    fixture.detectChanges();

    const areaCodeElement = dropdown.nativeElement;
    const phoneInput = getInput().nativeElement;
    expect(areaCodeElement.getAttribute('aria-label')).toBe('custom area code');
    expect(areaCodeElement.getAttribute('aria-labelledby')).toBeNull();

    expect(phoneInput.getAttribute('aria-label')).toBe('custom line number');
    expect(phoneInput.getAttribute('aria-labelledby')).toBeNull();

    const formfield = fixture.debugElement.query(
      By.directive(NxFormfieldComponent),
    ).componentInstance;
    expect(phoneInputInstance.elementRef.nativeElement.getAttribute('aria-labelledby')).toBe(
      formfield.labelId,
    );
  });

  describe('required', () => {
    it('should set required on input and dropdown when required input is set', () => {
      createTestComponent(ConfigurablePhoneInput);
      testInstance.required = true;
      fixture.detectChanges();
      const input = getInput().nativeElement;
      expect(input.required).toBe(true);
      expect(dropdown.componentInstance.required).toBe(true);
    });

    it('should set required on input and dropdown when formControl has required validator', fakeAsync(() => {
      createTestComponent(ReactiveFormsPhoneInput);
      flush();
      fixture.detectChanges();
      const input = getInput().nativeElement;
      expect(input.required).toBe(true);
      expect(dropdown.componentInstance.required).toBe(true);
    }));

    it('should not be required by default', () => {
      createTestComponent(DefaultPhoneInput);
      const input = getInput().nativeElement;
      expect(input.required).toBe(false);
      expect(dropdown.componentInstance.required).toBe(false);
    });
  });

  it('should update focused state when focus', () => {
    createTestComponent(DefaultPhoneInput);
    expect(testInstance.phoneInput.focused).toBe(false);

    const container = fixture.debugElement.query(By.css('nx-formfield'))!.nativeElement;
    const input = getInput()?.nativeElement;
    input.focus();
    fixture.detectChanges();

    expect(testInstance.phoneInput.focused).toBe(true);
    expect(container).toHaveClass('is-focused');

    input.blur();
    fixture.detectChanges();
    expect(testInstance.phoneInput.focused).toBe(false);
    expect(container).not.toHaveClass('is-focused');

    dropdown.nativeElement.focus();
    fixture.detectChanges();
    expect(testInstance.phoneInput.focused).toBe(true);
    expect(container).toHaveClass('is-focused');
  });
});

@Directive({ standalone: true })
abstract class PhoneInputTest {
  @ViewChild(NxPhoneInputComponent)
  phoneInput!: NxPhoneInputComponent;
  disabled = false;
  readonly = false;
  required = false;
  areaCodeLabel = 'My area code';
  countries = countries.getNames('de', { select: 'official' });
  placeholder = '89 7531';
  countryCode = 'FR';
}

@Component({
  selector: 'test-default-phone-input',
  template: `<nx-formfield label="Telephone number">
    <nx-phone-input [countryCode]="countryCode"></nx-phone-input>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPhoneInputModule, ReactiveFormsModule, FormsModule],
})
class DefaultPhoneInput extends PhoneInputTest {}

@Component({
  selector: 'test-configurable-phone-input',
  template: `<nx-formfield label="Telephone number">
    <nx-phone-input
      [(ngModel)]="value"
      [disabled]="disabled"
      [readonly]="readonly"
      [required]="required"
      [areaCodeLabel]="areaCodeLabel"
      [countryNames]="countries"
      [placeholder]="placeholder"
      [countryCode]="countryCode"
    ></nx-phone-input>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPhoneInputModule, ReactiveFormsModule, FormsModule],
})
class ConfigurablePhoneInput extends PhoneInputTest {
  value = '+49123456';
}

@Component({
  selector: 'test-reactive-forms-phone-input',
  template: `<nx-formfield label="Telephone number">
    <nx-phone-input
      [formControl]="formControl"
      [readonly]="readonly"
      [countryCode]="countryCode"
    ></nx-phone-input>
    <nx-error nxFormfieldError>Error message</nx-error>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPhoneInputModule, ReactiveFormsModule, FormsModule],
})
class ReactiveFormsPhoneInput extends PhoneInputTest {
  formControl = new FormControl('+49123456', Validators.required);
}

@Component({
  selector: 'test-phone-input-in-form',
  template: `<form [formGroup]="testForm">
    <nx-formfield label="Telephone number">
      <nx-phone-input formControlName="phone"></nx-phone-input>
    </nx-formfield>
  </form>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPhoneInputModule, ReactiveFormsModule, FormsModule],
})
class PhoneInputInFormComponent extends PhoneInputTest {
  testForm = new FormGroup({
    phone: new FormControl('+49123456'),
  });
}

@Injectable()
class MyIntl extends NxPhoneInputIntl {
  areaCodeLabel = 'Custom area code label';
  countryNames = countries.getNames('de', { select: 'official' });
}

@Component({
  selector: 'test-i18n-provider-test',
  template: `<nx-formfield label="Telephone number">
    <nx-phone-input></nx-phone-input>
  </nx-formfield>`,
  providers: [{ provide: NxPhoneInputIntl, useClass: MyIntl }],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPhoneInputModule, ReactiveFormsModule, FormsModule],
})
class I18nProviderTest extends PhoneInputTest {}

@Component({
  selector: 'test-custom-formatter',
  template: `<nx-formfield label="Telephone number">
    <nx-phone-input [inputFormatter]="formatter" [formControl]="formControl"></nx-phone-input>
    <nx-error nxFormfieldError>Error message</nx-error>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPhoneInputModule, ReactiveFormsModule, FormsModule],
})
class CustomFormatter extends PhoneInputTest {
  formControl = new FormControl('+49123456', Validators.required);
  formatter(value: string, countryCode: string) {
    return value.match(/.{1,2}/g)?.join(' ') || '';
  }
}

@Component({
  selector: 'test-phone-input-a11y',
  template: `<nx-formfield label="Telephone number">
    <nx-phone-input
      [countryCode]="countryCode"
      lineNumberLabel="custom line number"
      areaCodeLabel="custom area code"
    ></nx-phone-input>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxPhoneInputModule],
})
class PhoneInputA11y extends PhoneInputTest {}
