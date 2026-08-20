import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { NxTimefieldModule } from './timefield.module';

// The timefield CVA value is a 24h ISO time string ("HH:mm"). Signal form
// models must never start as null, so we seed a valid string (or '' where we
// explicitly test the required validator).
@Component({
  selector: 'test-timefield-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxTimefieldModule],
  template: `<nx-timefield label="Time" [formField]="myForm.time"></nx-timefield>`,
})
class TimefieldSignalFormHost {
  model = signal<{ time: string }>({ time: '10:30' });
  myForm = form(this.model);
}

@Component({
  selector: 'test-timefield-required-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxTimefieldModule],
  template: `<nx-timefield label="Time" [formField]="myForm.time"></nx-timefield>`,
})
class TimefieldRequiredSignalFormHost {
  model = signal<{ time: string }>({ time: '10:30' });
  myForm = form(this.model, (p) => {
    required(p.time);
  });
}

@Component({
  selector: 'test-timefield-disabled-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxTimefieldModule],
  template: `<nx-timefield label="Time" [formField]="myForm.time"></nx-timefield>`,
})
class TimefieldDisabledSignalFormHost {
  model = signal<{ time: string }>({ time: '10:30' });
  myForm = form(this.model, (p) => {
    disabled(p.time);
  });
}

describe('NxTimefieldComponent signal forms', () => {
  function getHours(fixture: ComponentFixture<unknown>): HTMLInputElement {
    return fixture.nativeElement.querySelector('.nx-timefield-input__field__hours');
  }
  function getMinutes(fixture: ComponentFixture<unknown>): HTMLInputElement {
    return fixture.nativeElement.querySelector('.nx-timefield-input__field__minutes');
  }

  describe('model <-> view', () => {
    let fixture: ComponentFixture<TimefieldSignalFormHost>;
    let host: TimefieldSignalFormHost;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TimefieldSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimefieldSignalFormHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('reflects the initial model value into the hours/minutes inputs (model -> view)', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      expect(getHours(fixture).value).toBe('10');
      expect(getMinutes(fixture).value).toBe('30');
    }));

    it('reflects a model update into the inputs (model -> view)', fakeAsync(() => {
      host.model.update((m) => ({ ...m, time: '08:15' }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(getHours(fixture).value).toBe('08');
      expect(getMinutes(fixture).value).toBe('15');
    }));

    it('writes typed user input back into the form model (view -> model)', fakeAsync(() => {
      const hours = getHours(fixture);
      const minutes = getMinutes(fixture);

      hours.value = '14';
      hours.dispatchEvent(new Event('input'));
      minutes.value = '45';
      minutes.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      tick();
      flush();
      fixture.detectChanges();

      expect(host.myForm.time().value()).toBe('14:45');
    }));

    it('marks the field as touched on blur', fakeAsync(() => {
      expect(host.myForm.time().touched()).toBe(false);

      const timefieldElement: HTMLElement = fixture.nativeElement.querySelector('nx-timefield');
      // focusout leaving the timefield (relatedTarget outside the component)
      timefieldElement.dispatchEvent(
        new FocusEvent('focusout', { relatedTarget: null, bubbles: true }),
      );
      fixture.detectChanges();
      tick();
      flush();
      fixture.detectChanges();

      expect(host.myForm.time().touched()).toBe(true);
    }));
  });

  describe('required validator', () => {
    let fixture: ComponentFixture<TimefieldRequiredSignalFormHost>;
    let host: TimefieldRequiredSignalFormHost;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TimefieldRequiredSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimefieldRequiredSignalFormHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('is valid while a time is provided', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      expect(host.myForm().valid()).toBe(true);
      expect(host.myForm.time().errors().length).toBe(0);
    }));

    it('becomes invalid with a required error once the value is cleared', fakeAsync(() => {
      host.model.update((m) => ({ ...m, time: '' }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(host.myForm().invalid()).toBe(true);
      expect(
        host.myForm
          .time()
          .errors()
          .some((e) => e.kind === 'required'),
      ).toBe(true);
    }));
  });

  describe('disabled() rule', () => {
    let fixture: ComponentFixture<TimefieldDisabledSignalFormHost>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TimefieldDisabledSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimefieldDisabledSignalFormHost);
      fixture.detectChanges();
    });

    it('disables the hours and minutes inputs in the DOM', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      expect(getHours(fixture).disabled).toBe(true);
      expect(getMinutes(fixture).disabled).toBe(true);
    }));
  });
});
