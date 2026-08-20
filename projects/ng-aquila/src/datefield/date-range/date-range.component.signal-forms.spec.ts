import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputModule } from '@allianz/ng-aquila/input';
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

import { NxDateRangeComponent } from './date-range.component';

type Range = { start: Moment | null; end: Moment | null };

// The date-range CVA value is a `{ start, end }` object. We bind the whole
// object group to the control. Signal form models must never start as null,
// so the range object is always present and seeded with valid dates.
@Component({
  selector: 'test-date-range-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormField,
    NxDateRangeComponent,
    NxMomentDateModule,
    NxInputModule,
    NxFormfieldComponent,
  ],
  template: `
    <nx-formfield>
      <nx-date-range [formField]="myForm.range"></nx-date-range>
    </nx-formfield>
  `,
})
class DateRangeSignalFormHost {
  model = signal<{ range: Range }>({
    range: { start: moment([2020, 2, 5]), end: moment([2021, 2, 5]) },
  });
  myForm = form(this.model);
}

@Component({
  selector: 'test-date-range-required-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormField,
    NxDateRangeComponent,
    NxMomentDateModule,
    NxInputModule,
    NxFormfieldComponent,
  ],
  template: `
    <nx-formfield>
      <nx-date-range [formField]="myForm.range"></nx-date-range>
    </nx-formfield>
  `,
})
class DateRangeRequiredSignalFormHost {
  model = signal<{ range: Range }>({
    range: { start: moment([2020, 2, 5]), end: moment([2021, 2, 5]) },
  });
  myForm = form(this.model, (p) => {
    required(p.range.start);
    required(p.range.end);
  });
}

@Component({
  selector: 'test-date-range-disabled-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormField,
    NxDateRangeComponent,
    NxMomentDateModule,
    NxInputModule,
    NxFormfieldComponent,
  ],
  template: `
    <nx-formfield>
      <nx-date-range [formField]="myForm.range"></nx-date-range>
    </nx-formfield>
  `,
})
class DateRangeDisabledSignalFormHost {
  model = signal<{ range: Range }>({
    range: { start: moment([2020, 2, 5]), end: moment([2021, 2, 5]) },
  });
  myForm = form(this.model, (p) => {
    disabled(p.range);
  });
}

describe('NxDateRangeComponent signal forms', () => {
  function getInputs(fixture: ComponentFixture<unknown>): HTMLInputElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('input'));
  }

  describe('model <-> view', () => {
    let fixture: ComponentFixture<DateRangeSignalFormHost>;
    let host: DateRangeSignalFormHost;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DateRangeSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DateRangeSignalFormHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('reflects the initial model range into both inputs (model -> view)', async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      const inputs = getInputs(fixture);
      expect(inputs[0].value).toBe('03/05/2020');
      expect(inputs[1].value).toBe('03/05/2021');
    });

    it('reflects a model update into both inputs (model -> view)', fakeAsync(() => {
      host.model.update((m) => ({
        ...m,
        range: { start: moment([2019, 0, 1]), end: moment([2019, 11, 31]) },
      }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const inputs = getInputs(fixture);
      expect(inputs[0].value).toBe('01/01/2019');
      expect(inputs[1].value).toBe('12/31/2019');
    }));

    it('writes typed user input back into the form model (view -> model)', fakeAsync(() => {
      const inputs = getInputs(fixture);
      inputs[0].value = '11/11/2011';
      inputs[0].dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const start = host.myForm.range.start().value();
      expect(start).toBeTruthy();
      expect(moment(start).format('MM/DD/YYYY')).toBe('11/11/2011');
    }));

    it('marks the field as touched on blur', fakeAsync(() => {
      expect(host.myForm.range().touched()).toBe(false);

      const inputs = getInputs(fixture);
      inputs[0].focus();
      fixture.detectChanges();
      tick();
      inputs[0].blur();
      fixture.detectChanges();
      tick();
      flush();
      fixture.detectChanges();

      expect(host.myForm.range().touched()).toBe(true);
    }));
  });

  describe('required validator', () => {
    let fixture: ComponentFixture<DateRangeRequiredSignalFormHost>;
    let host: DateRangeRequiredSignalFormHost;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DateRangeRequiredSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DateRangeRequiredSignalFormHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('is valid while both start and end are provided', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      expect(host.myForm().valid()).toBe(true);
    }));

    it('becomes invalid with a required error once start is cleared', fakeAsync(() => {
      host.model.update((m) => ({ ...m, range: { start: null, end: m.range.end } }));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(host.myForm().invalid()).toBe(true);
      expect(
        host.myForm.range
          .start()
          .errors()
          .some((e) => e.kind === 'required'),
      ).toBe(true);
    }));
  });

  describe('disabled() rule', () => {
    let fixture: ComponentFixture<DateRangeDisabledSignalFormHost>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DateRangeDisabledSignalFormHost],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DateRangeDisabledSignalFormHost);
      fixture.detectChanges();
    });

    it('disables both date inputs in the DOM', async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      const inputs = getInputs(fixture);
      expect(inputs.length).toBe(2);
      inputs.forEach((input) => expect(input.disabled).toBe(true));
    });
  });
});
