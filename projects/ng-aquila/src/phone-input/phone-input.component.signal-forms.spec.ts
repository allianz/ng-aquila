import { Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';
import countries from 'i18n-iso-countries';
import de from 'i18n-iso-countries/langs/de.json';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxPhoneInputModule } from './phone-input.module';
import { NxPhoneInputIntl } from './phone-input-intl';

countries.registerLocale(de);

// The phone input is a `ControlValueAccessor`. Angular 22 signal forms bind to it
// through the `[formField]` backwards-compat path. The model value is the combined
// string ('+' + calling code + line number), so the model field is a `string`.

@Component({
  selector: 'test-phone-input.component.signal-forms-basic-signal-form-host',
  standalone: true,
  imports: [FormField, NxPhoneInputModule],
  template: `<nx-formfield label="Telephone number">
    <nx-phone-input [formField]="phoneForm.value"></nx-phone-input>
  </nx-formfield>`,
})
class BasicSignalFormHost {
  model = signal({ value: '' });
  phoneForm = form(this.model);
}

@Component({
  selector: 'test-phone-input.component.signal-forms-required-signal-form-host',
  standalone: true,
  imports: [FormField, NxPhoneInputModule],
  template: `<nx-formfield label="Telephone number">
    <nx-phone-input [formField]="phoneForm.value"></nx-phone-input>
  </nx-formfield>`,
})
class RequiredSignalFormHost {
  model = signal({ value: '' });
  phoneForm = form(this.model, (schema) => {
    required(schema.value);
  });
}

@Component({
  selector: 'test-phone-input.component.signal-forms-disabled-signal-form-host',
  standalone: true,
  imports: [FormField, NxPhoneInputModule],
  template: `<nx-formfield label="Telephone number">
    <nx-phone-input [formField]="phoneForm.value"></nx-phone-input>
  </nx-formfield>`,
})
class DisabledSignalFormHost {
  model = signal({ value: '' });
  phoneForm = form(this.model, (schema) => {
    disabled(schema.value);
  });
}

describe('NxPhoneInputComponent signal forms', () => {
  function getInput(fixture: ComponentFixture<unknown>): HTMLInputElement {
    return fixture.debugElement.query(By.css('nx-phone-input')).query(By.css('input'))
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicSignalFormHost, RequiredSignalFormHost, DisabledSignalFormHost],
      providers: [NxPhoneInputIntl],
    }).compileComponents();
  });

  describe('model -> view', () => {
    it('reflects a programmatic model value into the input and country dropdown', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      flush();

      host.model.update((m) => ({ ...m, value: '+49666' }));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(getInput(fixture).value).toBe('666');
      expect(fixture.nativeElement.querySelector('nx-phone-input').innerText).toContain('+49');
    }));
  });

  describe('view -> model', () => {
    // The phone input reformats on blur (e.g. strips a leading zero), but plain digit
    // entry should propagate the combined value to the signal-forms model, exactly as it
    // does under reactive forms. Asserted honestly: if masking swallowed the update this
    // would (correctly) fail.
    it('writes typed digits back into the form model', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      flush();

      const input = getInput(fixture);
      input.value = '123';
      dispatchFakeEvent(input, 'input');
      fixture.detectChanges();
      tick();
      flush();

      // Default country is DE (+49), so the combined model value is +49123.
      expect(host.phoneForm.value().value()).toBe('+49123');
      expect(input.value).toBe('123');
    }));
  });

  describe('touched on blur', () => {
    it('marks the field as touched when the input is blurred', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      flush();

      expect(host.phoneForm.value().touched()).toBe(false);

      const input = getInput(fixture);
      dispatchFakeEvent(input, 'blur');
      fixture.detectChanges();
      flush();

      expect(host.phoneForm.value().touched()).toBe(true);
    }));
  });

  describe('required validator', () => {
    it('is invalid while empty and valid once a number is provided', fakeAsync(() => {
      const fixture = TestBed.createComponent(RequiredSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      flush();

      expect(host.phoneForm().invalid()).toBe(true);
      expect(
        host.phoneForm
          .value()
          .errors()
          .some((e) => e.kind === 'required'),
      ).toBe(true);

      host.model.update((m) => ({ ...m, value: '+49123' }));
      fixture.detectChanges();
      flush();

      expect(host.phoneForm().valid()).toBe(true);
    }));
  });

  describe('disabled() rule', () => {
    it('disables the underlying input', fakeAsync(() => {
      const fixture = TestBed.createComponent(DisabledSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      flush();

      expect(host.phoneForm.value().disabled()).toBe(true);
      expect(getInput(fixture).disabled).toBe(true);
    }));
  });
});
