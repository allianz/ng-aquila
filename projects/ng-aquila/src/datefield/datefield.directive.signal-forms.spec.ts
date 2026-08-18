import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxMomentDateModule } from '@allianz/ng-aquila/moment-date-adapter';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';
import moment, { Moment } from 'moment';

import { NxDatefieldModule } from './datefield.module';

// The datefield CVA value is a `Moment` (type D of the chosen date adapter).
// Signal forms models must never start as null, so we seed a valid Moment.
//
// RISK / CAVEAT: the model binds a `Moment` (a class instance, a non-null object)
// directly as the `[formField]` leaf value. Signal Forms may navigate a non-null
// object as a GROUP (walking its properties as subfields) rather than treating it as
// an opaque leaf field. We rely on the Moment being treated as an opaque leaf here:
// these tests only ever read the whole value via `myForm.date().value()` and never a
// subfield. If a first test run shows signal-forms navigating the Moment as a group,
// this setup must be revisited (e.g. wrap the date in a plain object or store an ISO
// string). Do NOT restructure the model without re-verifying this assumption.
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxDatefieldModule, NxMomentDateModule, NxInputModule, NxFormfieldModule],
  template: `
    <nx-formfield label="Date">
      <input nxInput nxDatefield [formField]="myForm.date" />
    </nx-formfield>
  `,
})
class DatefieldSignalFormHost {
  model = signal<{ date: Moment }>({ date: moment([2020, 0, 15]) });
  myForm = form(this.model);
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxDatefieldModule, NxMomentDateModule, NxInputModule, NxFormfieldModule],
  template: `
    <nx-formfield label="Date">
      <input nxInput nxDatefield [formField]="myForm.date" />
    </nx-formfield>
  `,
})
class DatefieldRequiredSignalFormHost {
  model = signal<{ date: Moment | null }>({ date: moment([2020, 0, 15]) });
  myForm = form(this.model, (p) => {
    required(p.date);
  });
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxDatefieldModule, NxMomentDateModule, NxInputModule, NxFormfieldModule],
  template: `
    <nx-formfield label="Date">
      <input nxInput nxDatefield [formField]="myForm.date" />
    </nx-formfield>
  `,
})
class DatefieldDisabledSignalFormHost {
  model = signal<{ date: Moment }>({ date: moment([2020, 0, 15]) });
  myForm = form(this.model, (p) => {
    disabled(p.date);
  });
}

describe('NxDatefieldDirective signal forms', () => {
  function getInput(fixture: ComponentFixture<unknown>): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  describe('model <-> view', () => {
    let fixture: ComponentFixture<DatefieldSignalFormHost>;
    let host: DatefieldSignalFormHost;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DatefieldSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DatefieldSignalFormHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('reflects the initial model value into the input (model -> view)', () => {
      expect(getInput(fixture).value).toBe('01/15/2020');
    });

    it('reflects a model update into the input (model -> view)', () => {
      host.model.update((m) => ({ ...m, date: moment([2021, 11, 25]) }));
      fixture.detectChanges();
      expect(getInput(fixture).value).toBe('12/25/2021');
    });

    it('writes typed user input back into the form model (view -> model)', () => {
      const input = getInput(fixture);
      input.value = '03/05/2008';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const value = host.myForm.date().value();
      expect(value).toBeTruthy();
      expect(moment(value).format('MM/DD/YYYY')).toBe('03/05/2008');
    });

    it('marks the field as touched on blur', () => {
      expect(host.myForm.date().touched()).toBeFalse();
      getInput(fixture).dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(host.myForm.date().touched()).toBeTrue();
    });
  });

  describe('required validator', () => {
    let fixture: ComponentFixture<DatefieldRequiredSignalFormHost>;
    let host: DatefieldRequiredSignalFormHost;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DatefieldRequiredSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DatefieldRequiredSignalFormHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('is valid while a date is provided', () => {
      expect(host.myForm().valid()).toBeTrue();
      expect(host.myForm.date().errors().length).toBe(0);
    });

    it('becomes invalid with a required error once the value is cleared', () => {
      host.model.update((m) => ({ ...m, date: null }));
      fixture.detectChanges();

      expect(host.myForm().invalid()).toBeTrue();
      expect(
        host.myForm
          .date()
          .errors()
          .some((e) => e.kind === 'required'),
      ).toBeTrue();
    });
  });

  describe('disabled() rule', () => {
    let fixture: ComponentFixture<DatefieldDisabledSignalFormHost>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DatefieldDisabledSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DatefieldDisabledSignalFormHost);
      fixture.detectChanges();
    });

    it('disables the input in the DOM', () => {
      expect(getInput(fixture).disabled).toBeTrue();
    });
  });
});
