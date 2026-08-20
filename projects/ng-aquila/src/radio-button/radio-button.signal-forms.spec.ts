import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxRadioModule } from './radio-button.module';

/**
 * Signal forms tests for the radio group (the `nx-radio-group` is the CVA host).
 *
 * The group registers itself as the value accessor via `ngControl.valueAccessor = this`,
 * so `[formField]` binds to it through the Angular 22 backwards-compat interop path.
 */

@Component({
  selector: 'test-basic-radio-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxRadioModule],
  template: `
    <nx-radio-group [formField]="myForm.choice" name="signal-radio">
      <nx-radio value="0">Zero</nx-radio>
      <nx-radio value="1">One</nx-radio>
      <nx-radio value="2">Two</nx-radio>
    </nx-radio-group>
  `,
})
class BasicRadioSignalFormHost {
  model = signal({ choice: '' });
  myForm = form(this.model);
}

@Component({
  selector: 'test-required-radio-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxRadioModule],
  template: `
    <nx-radio-group [formField]="myForm.choice" name="signal-radio-required">
      <nx-radio value="0">Zero</nx-radio>
      <nx-radio value="1">One</nx-radio>
    </nx-radio-group>
  `,
})
class RequiredRadioSignalFormHost {
  model = signal({ choice: '' });
  myForm = form(this.model, (p) => {
    required(p.choice);
  });
}

@Component({
  selector: 'test-disabled-radio-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxRadioModule],
  template: `
    <nx-radio-group [formField]="myForm.choice" name="signal-radio-disabled">
      <nx-radio value="0">Zero</nx-radio>
      <nx-radio value="1">One</nx-radio>
    </nx-radio-group>
  `,
})
class DisabledRadioSignalFormHost {
  model = signal({ choice: '' });
  myForm = form(this.model, (p) => {
    disabled(p.choice);
  });
}

describe('NxRadioGroupComponent signal forms', () => {
  function inputs(fixture: ComponentFixture<unknown>): NodeListOf<HTMLInputElement> {
    return fixture.nativeElement.querySelectorAll('input');
  }

  function labels(fixture: ComponentFixture<unknown>): NodeListOf<HTMLLabelElement> {
    return fixture.nativeElement.querySelectorAll('label');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BasicRadioSignalFormHost, RequiredRadioSignalFormHost, DisabledRadioSignalFormHost],
    }).compileComponents();
  }));

  describe('model -> view', () => {
    it('selects the option matching the model value', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicRadioSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(inputs(fixture).item(1).checked).toBe(false);

      host.model.update((m) => ({ ...m, choice: '1' }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(inputs(fixture).item(0).checked).toBe(false);
      expect(inputs(fixture).item(1).checked).toBe(true);
      expect(inputs(fixture).item(2).checked).toBe(false);
    }));

    it('moves the selection when the model changes to a different option', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicRadioSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      host.model.update((m) => ({ ...m, choice: '0' }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputs(fixture).item(0).checked).toBe(true);

      host.model.update((m) => ({ ...m, choice: '2' }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputs(fixture).item(0).checked).toBe(false);
      expect(inputs(fixture).item(2).checked).toBe(true);
    }));
  });

  describe('view -> model', () => {
    it('updates the form field value when an option is clicked', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicRadioSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      labels(fixture).item(2).click();
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().value()).toBe('2');
      expect(host.model().choice).toBe('2');

      labels(fixture).item(0).click();
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().value()).toBe('0');
    }));
  });

  describe('touched on blur', () => {
    it('marks the field touched when a radio is blurred', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicRadioSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().touched()).toBe(false);

      dispatchFakeEvent(inputs(fixture).item(0), 'blur');
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().touched()).toBe(true);
    }));
  });

  describe('required validator', () => {
    it('is invalid until an option is chosen', fakeAsync(() => {
      const fixture = TestBed.createComponent(RequiredRadioSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(host.myForm().invalid()).toBe(true);
      expect(
        host.myForm
          .choice()
          .errors()
          .some((e) => e.kind === 'required'),
      ).toBe(true);

      labels(fixture).item(0).click();
      fixture.detectChanges();
      tick();

      expect(host.myForm().valid()).toBe(true);
      expect(host.myForm.choice().errors()).toEqual([]);
    }));

    it('propagates the required flag to the radio inputs', fakeAsync(() => {
      const fixture = TestBed.createComponent(RequiredRadioSignalFormHost);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      inputs(fixture).forEach((input) => {
        expect(input.getAttribute('required')).toBe('true');
      });
    }));
  });

  describe('disabled rule', () => {
    it('disables every radio input in the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(DisabledRadioSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(host.myForm.choice().disabled()).toBe(true);
      inputs(fixture).forEach((input) => {
        expect(input.disabled).toBe(true);
      });
    }));

    it('does not update the model when a disabled radio is clicked', fakeAsync(() => {
      const fixture = TestBed.createComponent(DisabledRadioSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      labels(fixture).item(1).click();
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().value()).toBe('');
    }));
  });
});
