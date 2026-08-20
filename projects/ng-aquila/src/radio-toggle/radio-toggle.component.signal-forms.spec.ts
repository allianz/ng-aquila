import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxRadioToggleModule } from './radio-toggle.module';

/**
 * Signal forms tests for the radio-toggle group (`nx-radio-toggle` is the CVA host).
 *
 * It registers the value accessor through `ngControl.valueAccessor = this`, so `[formField]`
 * binds to it via the Angular 22 backwards-compat interop path.
 */

@Component({
  selector: 'test-basic-toggle-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxRadioToggleModule],
  template: `
    <nx-radio-toggle [formField]="myForm.choice">
      <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
      <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
      <nx-radio-toggle-button value="C">C</nx-radio-toggle-button>
    </nx-radio-toggle>
  `,
})
class BasicToggleSignalFormHost {
  model = signal({ choice: '' });
  myForm = form(this.model);
}

@Component({
  selector: 'test-required-toggle-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxRadioToggleModule],
  template: `
    <nx-radio-toggle [formField]="myForm.choice">
      <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
      <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
    </nx-radio-toggle>
  `,
})
class RequiredToggleSignalFormHost {
  model = signal({ choice: '' });
  myForm = form(this.model, (p) => {
    required(p.choice);
  });
}

@Component({
  selector: 'test-disabled-toggle-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxRadioToggleModule],
  template: `
    <nx-radio-toggle [formField]="myForm.choice">
      <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
      <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
    </nx-radio-toggle>
  `,
})
class DisabledToggleSignalFormHost {
  model = signal({ choice: '' });
  myForm = form(this.model, (p) => {
    disabled(p.choice);
  });
}

describe('NxRadioToggleComponent signal forms', () => {
  function inputs(fixture: ComponentFixture<unknown>): NodeListOf<HTMLInputElement> {
    return fixture.nativeElement.querySelectorAll('input');
  }

  function checked(fixture: ComponentFixture<unknown>): boolean[] {
    return Array.from(inputs(fixture)).map((input) => input.checked);
  }

  function group(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('nx-radio-toggle') as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BasicToggleSignalFormHost,
        RequiredToggleSignalFormHost,
        DisabledToggleSignalFormHost,
      ],
    }).compileComponents();
  }));

  describe('model -> view', () => {
    it('selects the toggle button matching the model value', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicToggleSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(checked(fixture)).toEqual([false, false, false]);

      host.model.update((m) => ({ ...m, choice: 'B' }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(checked(fixture)).toEqual([false, true, false]);
    }));

    it('moves the selection when the model value changes', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicToggleSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      host.model.update((m) => ({ ...m, choice: 'A' }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(checked(fixture)).toEqual([true, false, false]);

      host.model.update((m) => ({ ...m, choice: 'C' }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(checked(fixture)).toEqual([false, false, true]);
    }));
  });

  describe('view -> model', () => {
    it('updates the form field value when a toggle button is clicked', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicToggleSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      inputs(fixture).item(1).click();
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().value()).toBe('B');
      expect(host.model().choice).toBe('B');

      inputs(fixture).item(2).click();
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().value()).toBe('C');
    }));
  });

  describe('touched', () => {
    it('marks the field touched when the focus leaves the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicToggleSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().touched()).toBe(false);

      dispatchFakeEvent(group(fixture), 'focusout');
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().touched()).toBe(true);
    }));

    it('does not mark the field touched when a selection is made without leaving the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicToggleSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      inputs(fixture).item(0).click();
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().value()).toBe('A');
      expect(host.myForm.choice().touched()).toBe(false);
    }));

    it('does not mark the field touched while the focus stays inside the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicToggleSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      group(fixture).dispatchEvent(
        new FocusEvent('focusout', { bubbles: true, relatedTarget: inputs(fixture).item(1) }),
      );
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().touched()).toBe(false);
    }));
  });

  describe('required validator', () => {
    it('is invalid until an option is chosen', fakeAsync(() => {
      const fixture = TestBed.createComponent(RequiredToggleSignalFormHost);
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

      inputs(fixture).item(0).click();
      fixture.detectChanges();
      tick();

      expect(host.myForm().valid()).toBe(true);
      expect(host.myForm.choice().errors()).toEqual([]);
    }));
  });

  describe('disabled rule', () => {
    it('disables every toggle input in the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(DisabledToggleSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(host.myForm.choice().disabled()).toBe(true);
      inputs(fixture).forEach((input) => {
        expect(input.disabled).toBe(true);
      });
    }));

    it('does not update the model when a disabled toggle is clicked', fakeAsync(() => {
      const fixture = TestBed.createComponent(DisabledToggleSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      inputs(fixture).item(1).click();
      fixture.detectChanges();
      tick();

      expect(host.myForm.choice().value()).toBe('');
    }));
  });
});
