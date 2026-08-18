import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxIbanMaskDirective } from './iban-mask.directive';
import { NxMaskDirective } from './mask.directive';
import { NxMaskModule } from './mask.module';

// Host that drives an nxIbanMask input through an Angular 22 signal form.
// The mask directive supplies NG_VALUE_ACCESSOR, so `[formField]` binds through the CVA path.
@Component({
  template: `<input nxMask nxIbanMask [formField]="ibanForm.iban" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxMaskModule],
  standalone: true,
})
class IbanSignalFormHostComponent {
  @ViewChild(NxMaskDirective) maskInstance!: NxMaskDirective;
  @ViewChild(NxIbanMaskDirective) ibanInstance!: NxIbanMaskDirective;

  readonly model = signal({ iban: '' });
  readonly ibanForm = form(this.model);
}

// Host with a `required` validator in the schema.
@Component({
  template: `<input nxMask nxIbanMask [formField]="ibanForm.iban" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxMaskModule],
  standalone: true,
})
class RequiredIbanSignalFormHostComponent {
  @ViewChild(NxMaskDirective) maskInstance!: NxMaskDirective;
  @ViewChild(NxIbanMaskDirective) ibanInstance!: NxIbanMaskDirective;

  readonly model = signal({ iban: '' });
  readonly ibanForm = form(this.model, (schemaPath) => {
    required(schemaPath.iban);
  });
}

// Host with a `disabled` rule in the schema.
@Component({
  template: `<input nxMask nxIbanMask [formField]="ibanForm.iban" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxMaskModule],
  standalone: true,
})
class DisabledIbanSignalFormHostComponent {
  @ViewChild(NxMaskDirective) maskInstance!: NxMaskDirective;
  @ViewChild(NxIbanMaskDirective) ibanInstance!: NxIbanMaskDirective;

  readonly model = signal({ iban: '' });
  readonly ibanForm = form(this.model, (schemaPath) => {
    disabled(schemaPath.iban);
  });
}

describe('NxIbanMaskDirective signal forms', () => {
  let nativeElement: HTMLInputElement;

  function createHost<T extends object>(component: {
    new (...args: any[]): T;
  }): ComponentFixture<T> {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    return fixture;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxMaskModule,
        IbanSignalFormHostComponent,
        RequiredIbanSignalFormHostComponent,
        DisabledIbanSignalFormHostComponent,
      ],
    }).compileComponents();
  }));

  describe('basic', () => {
    it('creates the input and starts with the SS mask', () => {
      const fixture = createHost(IbanSignalFormHostComponent);
      expect(fixture.componentInstance.ibanInstance).toBeTruthy();
      expect(fixture.componentInstance.maskInstance.mask).toBe('SS');
    });
  });

  describe('model -> view', () => {
    it('reformats an IBAN written from the form model into the input', fakeAsync(() => {
      const fixture = createHost(IbanSignalFormHostComponent);
      const host = fixture.componentInstance;

      host.model.update((m) => ({ ...m, iban: 'NL91ABNA0417164300' }));
      fixture.detectChanges();
      tick();
      flush();

      expect(nativeElement.value).toBe('NL91 ABNA 0417 1643 00');
    }));
  });

  describe('view -> model', () => {
    // Types `value` one character at a time using REAL async scheduling (no fakeAsync). After each
    // keystroke we `await fixture.whenStable()`, so the real zone.js change-detection scheduling
    // runs between characters - the same ordering a real browser produces. This is deliberately
    // NOT `fakeAsync`: fakeAsync collapses the event loop into a deterministic order we control,
    // which hides any timing-dependent interaction between the mask's native `input` handler and
    // the signal-forms `[formField]` write-back.
    async function typeCharByChar(
      fixture: ComponentFixture<unknown>,
      input: HTMLInputElement,
      value: string,
    ) {
      input.value = '';
      for (const char of value) {
        const position = input.value.length;
        input.selectionStart = position;
        input.selectionEnd = position;

        // Realistic keystroke sequence: keydown -> value mutation + input -> keyup.
        dispatchFakeEvent(input, 'keydown');
        input.value += char;
        input.dispatchEvent(new Event('input'));
        dispatchFakeEvent(input, 'keyup');

        fixture.detectChanges();
        await fixture.whenStable();
      }
    }

    // KNOWN BUG: typing into an IBAN mask input bound with signal forms does NOT update the
    // input value (and therefore does not update the form field). Under reactive forms the same
    // interaction reformats the input to 'DE89 3704 0044 0532 0130 01' and pushes that value into
    // the control (see iban-mask.directive.spec.ts -> testIban / 'should set nxIbanParseError').
    // This variant drives the interaction with REAL async scheduling to test whether the bug is a
    // zone.js/change-detection ordering issue. It asserts the CORRECT behaviour and is EXPECTED TO
    // FAIL until the bug is fixed. Do NOT weaken it to make it pass, and do NOT switch it to the
    // shared `assertInputValue` helper (which skips CD entirely and hides the bug).
    it('reformats a typed IBAN and updates the form field value', async () => {
      const fixture = createHost(IbanSignalFormHostComponent);
      const host = fixture.componentInstance;

      await typeCharByChar(fixture, nativeElement, 'DE89370400440532013001');
      await fixture.whenStable();

      // BOTH of these should hold for a correct implementation:
      expect(nativeElement.value).toBe('DE89 3704 0044 0532 0130 01');
      expect(host.ibanForm.iban().value()).toBe('DE89 3704 0044 0532 0130 01');
    });
  });

  describe('touched on blur', () => {
    it('marks the field as touched when the input is blurred', fakeAsync(() => {
      const fixture = createHost(IbanSignalFormHostComponent);
      const host = fixture.componentInstance;

      expect(host.ibanForm.iban().touched()).toBe(false);

      dispatchFakeEvent(nativeElement, 'blur');
      fixture.detectChanges();
      tick();

      expect(host.ibanForm.iban().touched()).toBe(true);
    }));
  });

  describe('required validator', () => {
    it('is invalid while empty and valid once the model has an IBAN', fakeAsync(() => {
      const fixture = createHost(RequiredIbanSignalFormHostComponent);
      const host = fixture.componentInstance;

      expect(host.ibanForm().invalid()).toBe(true);
      expect(host.ibanForm.iban().errors().length).toBeGreaterThan(0);

      host.model.update((m) => ({ ...m, iban: 'NL91ABNA0417164300' }));
      fixture.detectChanges();
      tick();
      flush();

      expect(host.ibanForm().valid()).toBe(true);
      expect(host.ibanForm.iban().errors().length).toBe(0);
    }));
  });

  describe('disabled rule', () => {
    it('disables the native input when the disabled rule applies', fakeAsync(() => {
      const fixture = createHost(DisabledIbanSignalFormHostComponent);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(host.ibanForm.iban().disabled()).toBe(true);
      expect(nativeElement.disabled).toBe(true);
    }));
  });
});
