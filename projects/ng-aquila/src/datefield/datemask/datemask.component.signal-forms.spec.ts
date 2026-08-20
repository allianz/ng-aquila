import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxMomentDateModule } from '@allianz/ng-aquila/moment-date-adapter';
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
import moment, { Moment } from 'moment';

import { NxDatemaskComponent } from './datemask.component';

// The datemask CVA value is a `Moment` produced from the three day/month/year
// mask inputs. Signal form models must never start as null, so we seed a valid
// Moment (or `null` only where we explicitly test the required validator).
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
  selector: 'test-datemask-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxDatemaskComponent, NxMomentDateModule, NxFormfieldComponent],
  template: `
    <nx-formfield>
      <nx-datemask [formField]="myForm.date"></nx-datemask>
    </nx-formfield>
  `,
})
class DatemaskSignalFormHost {
  model = signal<{ date: Moment }>({ date: moment([2022, 5, 20]) });
  myForm = form(this.model);
}

@Component({
  selector: 'test-datemask-required-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxDatemaskComponent, NxMomentDateModule, NxFormfieldComponent],
  template: `
    <nx-formfield>
      <nx-datemask [formField]="myForm.date"></nx-datemask>
    </nx-formfield>
  `,
})
class DatemaskRequiredSignalFormHost {
  model = signal<{ date: Moment | null }>({ date: moment([2022, 5, 20]) });
  myForm = form(this.model, (p) => {
    required(p.date);
  });
}

@Component({
  selector: 'test-datemask-disabled-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxDatemaskComponent, NxMomentDateModule, NxFormfieldComponent],
  template: `
    <nx-formfield>
      <nx-datemask [formField]="myForm.date"></nx-datemask>
    </nx-formfield>
  `,
})
class DatemaskDisabledSignalFormHost {
  model = signal<{ date: Moment }>({ date: moment([2022, 5, 20]) });
  myForm = form(this.model, (p) => {
    disabled(p.date);
  });
}

describe('NxDatemaskComponent signal forms', () => {
  function getInputs(fixture: ComponentFixture<unknown>): HTMLInputElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('input'));
  }

  describe('model <-> view', () => {
    let fixture: ComponentFixture<DatemaskSignalFormHost>;
    let host: DatemaskSignalFormHost;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DatemaskSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DatemaskSignalFormHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('splits the initial model value across the mask inputs (model -> view)', async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      const inputs = getInputs(fixture);
      // default format DD.MM.YYYY
      expect(inputs[0].value).toBe('20');
      expect(inputs[1].value).toBe('06');
      expect(inputs[2].value).toBe('2022');
    });

    it('reflects a model update across the mask inputs (model -> view)', fakeAsync(() => {
      host.model.update((m) => ({ ...m, date: moment([1999, 4, 30]) }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const inputs = getInputs(fixture);
      expect(inputs[0].value).toBe('30');
      expect(inputs[1].value).toBe('05');
      expect(inputs[2].value).toBe('1999');
    }));

    // View -> model: typing valid day/month/year reparses and pushes a new Moment
    // into the form model. The value propagates correctly through the CVA interop;
    // assert on the formatted date string rather than moment.isSame(), which compares
    // by millisecond and also mismatches on UTC vs local moment mode.
    it('writes typed user input back into the form model (view -> model)', async () => {
      const inputs = getInputs(fixture);

      inputs[0].value = '30';
      inputs[0].dispatchEvent(new Event('input'));
      inputs[1].value = '05';
      inputs[1].dispatchEvent(new Event('input'));
      inputs[2].value = '1999';
      inputs[2].dispatchEvent(new Event('input'));

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const value = host.myForm.date().value();
      expect(value).toBeTruthy();
      expect(moment(value).format('YYYY-MM-DD')).toBe('1999-05-30');
    });

    it('marks the field as touched on blur', fakeAsync(() => {
      expect(host.myForm.date().touched()).toBe(false);

      const inputs = getInputs(fixture);
      inputs[0].focus();
      fixture.detectChanges();
      tick();
      // moving focus out of the datemask (the FocusMonitor reports null origin)
      inputs[0].blur();
      fixture.detectChanges();
      tick();
      flush();
      fixture.detectChanges();

      expect(host.myForm.date().touched()).toBe(true);
    }));
  });

  describe('required validator', () => {
    let fixture: ComponentFixture<DatemaskRequiredSignalFormHost>;
    let host: DatemaskRequiredSignalFormHost;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DatemaskRequiredSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DatemaskRequiredSignalFormHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('is valid while a date is provided', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      expect(host.myForm().valid()).toBe(true);
      expect(host.myForm.date().errors().length).toBe(0);
    }));

    it('becomes invalid with a required error once the value is cleared', fakeAsync(() => {
      host.model.update((m) => ({ ...m, date: null }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(host.myForm().invalid()).toBe(true);
      expect(
        host.myForm
          .date()
          .errors()
          .some((e) => e.kind === 'required'),
      ).toBe(true);
    }));
  });

  describe('disabled() rule', () => {
    let fixture: ComponentFixture<DatemaskDisabledSignalFormHost>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DatemaskDisabledSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DatemaskDisabledSignalFormHost);
      fixture.detectChanges();
    });

    it('disables all mask inputs in the DOM', async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      const inputs = getInputs(fixture);
      expect(inputs.length).toBeGreaterThan(0);
      inputs.forEach((input) => expect(input.disabled).toBe(true));
    });
  });
});
