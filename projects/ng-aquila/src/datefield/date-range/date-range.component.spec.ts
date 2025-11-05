import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxMomentDateModule } from '@allianz/ng-aquila/moment-date-adapter';

import { Component, contentChildren, Directive, Signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import moment, { Moment } from 'moment';

import { NxDatepickerComponent } from '../datepicker/datepicker.component';
import { NxDatepickerToggleComponent } from '../datepicker/datepicker-toggle';
import { DateRange, NxDateRangeComponent } from './date-range.component';

describe('DateRangeComponent', () => {
  let fixture: ComponentFixture<DateRangeTestBase>;

  let nativeInputs: HTMLInputElement[];

  describe('basic', () => {
    let component: BasicDateRangeField;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicDateRangeField],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicDateRangeField);
      component = fixture.componentInstance as BasicDateRangeField;

      nativeInputs = fixture.nativeElement.querySelectorAll('input');

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should reflect model in view', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const startDateInput = nativeInputs[0];
      const endDateInput = nativeInputs[1];
      expect(startDateInput.value).toEqual('03/05/2020');
      expect(endDateInput.value).toEqual('03/05/2021');
    });

    it('should reflect user input in the model', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const startDateInput = nativeInputs[0];

      startDateInput.value = '11/11/2011';
      startDateInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dateRangeModel.start.format('MM/DD/YYYY')).toEqual('11/11/2011');
    });

    it('should result in null value on invalid input', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const startDateInput = nativeInputs[0];

      startDateInput.value = '11/112011';
      startDateInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dateRangeModel.start).toBeNull();
    });

    it('should accept null as initial value', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const startDateInput = nativeInputs[0];

      startDateInput.value = '11/112011';
      startDateInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dateRangeModel.start).toBeNull();
    });
  });

  describe('with null initial value', () => {
    let component: DateRangeWithNull;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DateRangeWithNull],
      }).compileComponents();

      fixture = TestBed.createComponent(DateRangeWithNull);
      component = fixture.componentInstance as DateRangeWithNull;

      nativeInputs = fixture.nativeElement.querySelectorAll('input');

      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeTruthy();
      expect(component.dateRangeModel).toBeUndefined();
      expect(nativeInputs[0].value).toEqual('');
      expect(nativeInputs[1].value).toEqual('');
      expect(component.dateRangeComponent().value!.start).toBeNull();
      expect(component.dateRangeComponent().value!.end).toBeNull();
    });

    it('should update model on user input', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const startDateInput = nativeInputs[0];

      startDateInput.value = '11/11/2011';
      startDateInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dateRangeComponent().value).not.toBeNull();
      expect(component.dateRangeComponent().value!.start).not.toBeNull();
      expect(component.dateRangeComponent().value!.start!.format('MM/DD/YYYY')).toEqual(
        '11/11/2011',
      );
      expect(component.dateRangeComponent().value!.end).toBeNull();
    });
  });

  describe('describe with reactive forms', async () => {
    let component: DateRangeReactiveForm;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DateRangeReactiveForm],
      }).compileComponents();

      fixture = TestBed.createComponent(DateRangeReactiveForm);
      component = fixture.componentInstance as DateRangeReactiveForm;

      nativeInputs = fixture.nativeElement.querySelectorAll('input');

      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeTruthy();
      expect(component).not.toBeUndefined();
      expect(component.dateRangeComponent().value!.start).not.toBeNull();
      expect(component.dateRangeComponent().value!.end).not.toBeNull();
      expect(nativeInputs[0].value).toEqual('03/05/2020');
      expect(nativeInputs[1].value).toEqual('03/05/2021');
    });

    it('should update model on user input', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const startDateInput = nativeInputs[0];

      startDateInput.value = '11/11/2011';
      startDateInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dateRangeComponent().value).not.toBeNull();
      expect(component.dateRangeComponent().value!.start).not.toBeNull();
      expect(component.dateRangeComponent().value!.start!.format('MM/DD/YYYY')).toEqual(
        '11/11/2011',
      );
    });

    it('should show validation errors', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const startDateInput = nativeInputs[0];
      const endDateInput = nativeInputs[1];

      startDateInput.focus();
      startDateInput.value = '';
      startDateInput.dispatchEvent(new Event('input'));
      startDateInput.dispatchEvent(new Event('blur'));
      endDateInput.focus();
      endDateInput.value = '';
      endDateInput.dispatchEvent(new Event('input'));
      endDateInput.dispatchEvent(new Event('blur'));

      fixture.detectChanges();
      await fixture.whenStable();

      let errorMessages = fixture.nativeElement.querySelectorAll('nx-error');
      expect(component.dateRangeForm.get('range')!.errors).not.toBeNull();
      expect(component.dateRangeForm.get('range')!.errors!.required).toBeTruthy();

      expect(errorMessages.length).toBeGreaterThan(0);
      expect(errorMessages[0].textContent).toContain('Required: Please enter a date range.');

      startDateInput.focus();
      startDateInput.value = '11/11/2011';
      startDateInput.dispatchEvent(new Event('input'));
      startDateInput.dispatchEvent(new Event('blur'));

      errorMessages = fixture.nativeElement.querySelectorAll('nx-error');
      expect(component.dateRangeForm.get('range')!.errors).not.toBeNull();
      expect(component.dateRangeForm.get('range')!.errors!.nxDateRangeIncomplete).toBeTruthy();
    });

    it('should remove validation errors on valid input', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const startDateInput = nativeInputs[0];
      const endDateInput = nativeInputs[1];

      startDateInput.focus();
      startDateInput.value = '';
      startDateInput.dispatchEvent(new Event('input'));
      startDateInput.dispatchEvent(new Event('blur'));
      endDateInput.focus();
      endDateInput.value = '';
      endDateInput.dispatchEvent(new Event('input'));
      endDateInput.dispatchEvent(new Event('blur'));

      fixture.detectChanges();
      await fixture.whenStable();

      let errorMessages = fixture.nativeElement.querySelectorAll('nx-error');
      expect(component.dateRangeForm.get('range')!.errors).not.toBeNull();
      expect(component.dateRangeForm.get('range')!.errors!.required).toBeTruthy();

      expect(errorMessages.length).toBeGreaterThan(0);
      expect(errorMessages[0].textContent).toContain('Required: Please enter a date range.');

      // valid input
      startDateInput.focus();
      startDateInput.value = '11/11/2011';
      startDateInput.dispatchEvent(new Event('input'));
      startDateInput.dispatchEvent(new Event('blur'));
      endDateInput.focus();
      endDateInput.value = '12/12/2012';
      endDateInput.dispatchEvent(new Event('input'));
      endDateInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      await fixture.whenStable();
      errorMessages = fixture.nativeElement.querySelectorAll('nx-error');
      expect(component.dateRangeForm.get('range')!.errors).toBeNull();
      expect(component.dateRangeForm.get('range')!.valid).toBeTruthy();
      expect(errorMessages.length).toBe(0);
    });

    it('should connect hints and error message with aria-describedby', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const startDateInput = nativeInputs[0];
      const endDateInput = nativeInputs[1];

      startDateInput.focus();
      startDateInput.value = '';
      startDateInput.dispatchEvent(new Event('input'));
      startDateInput.dispatchEvent(new Event('blur'));
      endDateInput.focus();
      endDateInput.value = '';
      endDateInput.dispatchEvent(new Event('input'));
      endDateInput.dispatchEvent(new Event('blur'));

      fixture.detectChanges();
      await fixture.whenStable();

      const errorMessages = fixture.nativeElement.querySelectorAll('nx-error');
      const hint = fixture.nativeElement.querySelector('[nxformfieldhint]');
      expect(startDateInput.getAttribute('aria-describedby')).toContain(hint.id);
      expect(startDateInput.getAttribute('aria-describedby')).toContain(errorMessages[0].id);
      expect(endDateInput.getAttribute('aria-describedby')).toContain(hint.id);
      expect(endDateInput.getAttribute('aria-describedby')).toContain(errorMessages[0].id);
    });
  });

  describe('disabled', () => {
    let component: DateRangeDisabledTestComponent;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DateRangeDisabledTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DateRangeDisabledTestComponent);
      component = fixture.componentInstance as DateRangeDisabledTestComponent;

      nativeInputs = fixture.nativeElement.querySelectorAll('input');

      fixture.detectChanges();
    });

    it('should create', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component).toBeTruthy();
      expect(component).not.toBeUndefined();
      expect(component.dateRangeComponent().disabled).toBeFalsy();
      expect(nativeInputs[0].disabled).toBeFalsy();
      expect(nativeInputs[1].disabled).toBeFalsy();
    });

    it('should make inputs disabled', async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      component.disabledAttribute = true;

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component).toBeTruthy();
      expect(component).not.toBeUndefined();
      expect(component.dateRangeComponent().disabled).toBeTrue();
      expect(nativeInputs[0].disabled).toBeTrue();
      expect(nativeInputs[1].disabled).toBeTrue();
    });

    it('should make the datepicker toggle disabled', async () => {
      component.disabledAttribute = true;

      fixture.detectChanges();
      await fixture.whenStable();

      const datepickerToggleButton = component.datePickerToggle()._toggleButton
        .nativeElement as any as HTMLButtonElement;
      expect(datepickerToggleButton.disabled).toBeTrue();
    });
  });

  describe('readonly', () => {
    let component: DateRangeReadonlyTestComponent;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DateRangeReadonlyTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DateRangeReadonlyTestComponent);
      component = fixture.componentInstance as DateRangeReadonlyTestComponent;

      nativeInputs = fixture.nativeElement.querySelectorAll('input');

      fixture.detectChanges();
    });

    it('should create', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component).toBeTruthy();
      expect(component).not.toBeUndefined();
      expect(component.dateRangeComponent().disabled).toBeFalsy();
      expect(nativeInputs[0].disabled).toBeFalsy();
      expect(nativeInputs[1].disabled).toBeFalsy();
    });

    it('should make inputs disabled', async () => {
      component.readonlyAttribute = true;

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component).toBeTruthy();
      expect(component).not.toBeUndefined();
      expect(component.dateRangeComponent().readonly).toBeTrue();
      expect(nativeInputs[0].readOnly).toBeTrue();
      expect(nativeInputs[1].readOnly).toBeTrue();
    });

    it('should make the datepicker toggle disabled', async () => {
      component.readonlyAttribute = true;

      fixture.detectChanges();
      await fixture.whenStable();

      const datepickerToggleButton = component.datePickerToggle()._toggleButton
        .nativeElement as any as HTMLButtonElement;
      expect(datepickerToggleButton.disabled).toBeTrue();
    });
  });
});

@Directive({ standalone: true })
abstract class DateRangeTestBase {
  abstract readonly dateRangeComponent: Signal<NxDateRangeComponent<Moment>>;
}

@Component({
  template: `
    <nx-formfield>
      <nx-date-range
        [(ngModel)]="dateRangeModel"
        [datepicker]="formRangeDatePicker"
      ></nx-date-range>
      <nx-datepicker-toggle [for]="formRangeDatePicker" nxFormfieldSuffix></nx-datepicker-toggle>
      <nx-datepicker #formRangeDatePicker [rangeMode]="true"></nx-datepicker>
    </nx-formfield>
  `,
  imports: [
    NxFormfieldComponent,
    NxDateRangeComponent,
    NxMomentDateModule,
    NxInputModule,
    FormsModule,
    ReactiveFormsModule,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
  ],
})
class BasicDateRangeField implements DateRangeTestBase {
  dateRangeComponent = viewChild.required(NxDateRangeComponent<Moment>);
  dateRangeModel = {
    start: moment([2020, 2, 5]),
    end: moment([2021, 2, 5]),
  };
}
@Component({
  template: `
    <nx-formfield>
      <nx-date-range [(ngModel)]="dateRangeModel"></nx-date-range>
    </nx-formfield>
  `,
  imports: [
    NxFormfieldComponent,
    NxDateRangeComponent,
    NxMomentDateModule,
    NxInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
class DateRangeWithNull implements DateRangeTestBase {
  dateRangeComponent = viewChild.required(NxDateRangeComponent<Moment>);
  dateRangeModel?: DateRange<Moment>;
}

@Component({
  template: `
    <form [formGroup]="dateRangeForm">
      <nx-formfield label="Date Range Component">
        <nx-date-range placeholder="mm/dd/yyyy" formControlName="range"></nx-date-range>

        <nx-error nxFormfieldError>
          @if (dateRangeForm.controls.range.errors?.required) {
            Required: Please enter a date range.
          }
        </nx-error>
        <span aria-label="Please provide date in the US format" nxFormfieldHint>
          MM/DD/YYYY - MM/DD/YYYY
        </span>
      </nx-formfield>
      <button #focusTarget>FocusTarget</button>
    </form>
  `,
  imports: [
    NxFormfieldComponent,
    NxFormfieldHintDirective,
    NxDateRangeComponent,
    NxMomentDateModule,
    NxInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
class DateRangeReactiveForm implements DateRangeTestBase {
  dateRangeComponent = viewChild.required(NxDateRangeComponent<Moment>);
  errorMessages = contentChildren(NxFormfieldErrorDirective);
  dateRangeForm = new FormBuilder().group({
    range: [
      {
        start: moment([2020, 2, 5]),
        end: moment([2021, 2, 5]),
      },
      Validators.required,
    ],
  });
}

@Component({
  template: `
    <nx-formfield>
      <nx-date-range
        [disabled]="disabledAttribute"
        [(ngModel)]="dateRangeModel"
        [datepicker]="myDatePicker"
      ></nx-date-range>
      <nx-datepicker-toggle
        [disabled]="disabledAttribute"
        #datePickerToggle
        [for]="myDatePicker"
        nxFormfieldSuffix
      ></nx-datepicker-toggle>
      <nx-datepicker #myDatePicker [rangeMode]="true"></nx-datepicker>
    </nx-formfield>
  `,
  imports: [
    NxFormfieldComponent,
    NxDateRangeComponent,
    NxMomentDateModule,
    NxInputModule,
    FormsModule,
    ReactiveFormsModule,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
  ],
})
class DateRangeDisabledTestComponent implements DateRangeTestBase {
  dateRangeComponent = viewChild.required(NxDateRangeComponent<Moment>);
  disabledAttribute = false;
  datePickerToggle = viewChild.required(NxDatepickerToggleComponent);
  dateRangeModel = {
    start: moment([2020, 2, 5]),
    end: moment([2021, 2, 5]),
  };
}

@Component({
  template: `
    <nx-formfield>
      <nx-date-range
        [readonly]="readonlyAttribute"
        [(ngModel)]="dateRangeModel"
        [datepicker]="myDatePicker"
      ></nx-date-range>
      <nx-datepicker-toggle
        [disabled]="readonlyAttribute"
        #datePickerToggle
        [for]="myDatePicker"
        nxFormfieldSuffix
      ></nx-datepicker-toggle>

      <nx-datepicker #myDatePicker [rangeMode]="true"></nx-datepicker>
    </nx-formfield>
  `,
  imports: [
    NxFormfieldComponent,
    NxDateRangeComponent,
    NxMomentDateModule,
    NxInputModule,
    FormsModule,
    ReactiveFormsModule,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
  ],
})
class DateRangeReadonlyTestComponent implements DateRangeTestBase {
  dateRangeComponent = viewChild.required(NxDateRangeComponent<Moment>);
  readonlyAttribute = false;
  datePickerToggle = viewChild.required(NxDatepickerToggleComponent);
  dateRangeModel = {
    start: moment([2020, 2, 5]),
    end: moment([2021, 2, 5]),
  };
}
