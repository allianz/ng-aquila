import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, max, min } from '@angular/forms/signals';

import { NxNumberStepperComponent } from './number-stepper.component';
import { NxNumberStepperModule } from './number-stepper.module';

/**
 * Signal Forms interop tests for the number stepper (Angular 22, `[formField]` /
 * ControlValueAccessor backwards-compat path). The model field is a NUMBER that
 * starts at 0 (never null).
 */

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxNumberStepperModule],
  // NOTE: `[min]`/`[max]` cannot be bound on a `[formField]` node (Angular NG8022),
  // so we rely on the stepper's own defaults (min 0, max 100) here.
  template: `
    <nx-number-stepper
      [leadingZero]="false"
      [step]="1"
      [formField]="myForm.count"
    ></nx-number-stepper>
  `,
})
class BasicSignalFormStepper {
  model = signal({ count: 0 });
  myForm = form(this.model);
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxNumberStepperModule],
  // `[max]` cannot be bound on a `[formField]` node (NG8022); the test sets the
  // component's `max` input imperatively via the ViewChild instead.
  template: `
    <nx-number-stepper
      [leadingZero]="false"
      [step]="1"
      [formField]="myForm.count"
    ></nx-number-stepper>
  `,
})
class ClampingSignalFormStepper {
  @ViewChild(NxNumberStepperComponent) stepper!: NxNumberStepperComponent;
  model = signal({ count: 0 });
  myForm = form(this.model);
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxNumberStepperModule],
  template: `
    <nx-number-stepper
      [leadingZero]="false"
      [step]="1"
      [formField]="myForm.count"
    ></nx-number-stepper>
  `,
})
class ValidatedSignalFormStepper {
  model = signal({ count: 0 });
  myForm = form(this.model, (p) => {
    min(p.count, 2);
    max(p.count, 6);
  });
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxNumberStepperModule],
  template: `
    <nx-number-stepper [leadingZero]="false" [formField]="myForm.count"></nx-number-stepper>
  `,
})
class DisabledSignalFormStepper {
  model = signal({ count: 0 });
  myForm = form(this.model, (p) => {
    disabled(p.count, { when: () => true });
  });
}

describe('NxNumberStepperComponent signal forms', () => {
  function setup<T>(component: new () => T): {
    fixture: ComponentFixture<T>;
    host: T;
    input: HTMLInputElement;
    upButton: HTMLButtonElement;
    downButton: HTMLButtonElement;
  } {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    const host = fixture.componentInstance;
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const upButton = fixture.nativeElement.querySelector(
      'button.nx-stepper__up',
    ) as HTMLButtonElement;
    const downButton = fixture.nativeElement.querySelector(
      'button.nx-stepper__down',
    ) as HTMLButtonElement;
    return { fixture, host, input, upButton, downButton };
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxNumberStepperModule,
        BasicSignalFormStepper,
        ClampingSignalFormStepper,
        ValidatedSignalFormStepper,
        DisabledSignalFormStepper,
      ],
    }).compileComponents();
  }));

  describe('model to view', () => {
    it('reflects a numeric model value into the input', fakeAsync(() => {
      const { fixture, host, input } = setup(BasicSignalFormStepper);

      expect(input.value).toBe('0');

      host.model.update((m) => ({ ...m, count: 5 }));
      fixture.detectChanges();
      tick();

      expect(input.value).toBe('5');
      expect(host.myForm.count().value()).toBe(5);
    }));
  });

  describe('view to model', () => {
    it('writes the incremented value back into the form model when clicking +', fakeAsync(() => {
      const { fixture, host, upButton } = setup(BasicSignalFormStepper);

      expect(host.myForm.count().value()).toBe(0);

      upButton.click();
      fixture.detectChanges();
      tick();

      expect(host.myForm.count().value()).toBe(1);
    }));

    it('writes the decremented value back into the form model when clicking -', fakeAsync(() => {
      const { fixture, host, upButton, downButton } = setup(BasicSignalFormStepper);

      // move away from the minimum first so the down button is enabled
      upButton.click();
      upButton.click();
      fixture.detectChanges();
      tick();
      expect(host.myForm.count().value()).toBe(2);

      downButton.click();
      fixture.detectChanges();
      tick();

      expect(host.myForm.count().value()).toBe(1);
    }));

    it('writes typed input back into the form model as a number', fakeAsync(() => {
      const { fixture, host, input } = setup(BasicSignalFormStepper);

      input.value = '7';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(host.myForm.count().value()).toBe(7);
      expect(typeof host.myForm.count().value()).toBe('number');
    }));
  });

  describe('touched on blur', () => {
    it('marks the field touched once the input is blurred', fakeAsync(() => {
      const { fixture, host, input } = setup(BasicSignalFormStepper);

      expect(host.myForm.count().touched()).toBe(false);

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      tick();

      expect(host.myForm.count().touched()).toBe(true);
    }));
  });

  describe('min/max clamping (component inputs)', () => {
    it('clamps the model value to the component max when clicking + repeatedly', fakeAsync(() => {
      const { fixture, host, upButton } = setup(ClampingSignalFormStepper);

      host.stepper.max = 3;
      fixture.detectChanges();
      tick();

      for (let i = 0; i < 6; i++) {
        upButton.click();
        fixture.detectChanges();
        tick();
      }

      expect(host.myForm.count().value()).toBe(3);
      expect(upButton.disabled).toBe(true);
    }));

    it('clamps the model value to the component min when clicking - repeatedly', fakeAsync(() => {
      const { fixture, host, upButton, downButton } = setup(ClampingSignalFormStepper);

      upButton.click();
      fixture.detectChanges();
      tick();

      for (let i = 0; i < 6; i++) {
        downButton.click();
        fixture.detectChanges();
        tick();
      }

      expect(host.myForm.count().value()).toBe(0);
      expect(downButton.disabled).toBe(true);
    }));
  });

  describe('validation wiring (schema min/max)', () => {
    it('is invalid below the schema min and becomes valid once satisfied', fakeAsync(() => {
      const { fixture, host, upButton } = setup(ValidatedSignalFormStepper);

      expect(host.myForm().invalid()).toBe(true);
      expect(host.myForm.count().errors().length).toBeGreaterThan(0);

      upButton.click();
      fixture.detectChanges();
      tick();

      expect(host.myForm().valid()).toBe(true);
      expect(host.myForm.count().errors().length).toBe(0);
    }));

    it('is invalid above the schema max when a too-large value is typed', fakeAsync(() => {
      const { fixture, host, input } = setup(ValidatedSignalFormStepper);

      input.value = '9';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(host.myForm.count().value()).toBe(9);
      expect(host.myForm().invalid()).toBe(true);
      expect(host.myForm.count().errors().length).toBeGreaterThan(0);
    }));
  });

  describe('disabled rule', () => {
    it('disables the input and both buttons when disabled() is applied', fakeAsync(() => {
      const { fixture, input, upButton, downButton } = setup(DisabledSignalFormStepper);

      tick();
      fixture.detectChanges();

      expect(input.disabled).toBe(true);
      expect(upButton.disabled).toBe(true);
      expect(downButton.disabled).toBe(true);
    }));
  });
});
