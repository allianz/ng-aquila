import { NxDatepickerComponent, NxDatepickerToggleComponent } from '@allianz/ng-aquila/datefield';
import { NxFormfieldComponent, NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxMomentDateModule } from '@allianz/ng-aquila/moment-date-adapter';
import { Component, Directive, Signal, ViewChild, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import moment, { Moment } from 'moment';

import { NxDatefieldModule } from '../datefield.module';
import { NxDatemaskComponent } from './datemask.component';

describe('DatemaskComponent', () => {
  let component: DateRangeTestBase;
  let fixture: ComponentFixture<DateRangeTestBase>;

  let nativeInputs: HTMLInputElement[];

  describe('basic', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NxDatemaskComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DatemaskTestBasic);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have a default format of DD.MM.YYYY', () => {
      expect(component.datemaskComponent().format()).toBe(`DD.MM.YYYY`);

      const untypedComponent: any = component.datemaskComponent();
      expect(untypedComponent._inputs().length).toBe(3);
      expect(untypedComponent._dayInput().elementRef.nativeElement).toBe(
        untypedComponent._inputs()[0].elementRef.nativeElement,
      );
      expect(untypedComponent._monthInput().elementRef.nativeElement).toBe(
        untypedComponent._inputs()[1].elementRef.nativeElement,
      );
      expect(untypedComponent._yearInput().elementRef.nativeElement).toBe(
        untypedComponent._inputs()[2].elementRef.nativeElement,
      );

      expect(component.datemaskComponent().separator()).toBe('.');
    });
  });

  describe(`formats`, () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DatemaskTestFormat],
      }).compileComponents();

      fixture = TestBed.createComponent(DatemaskTestFormat);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should adapt to format setting', () => {
      expect(component.datemaskComponent().format()).toBe(`YYYY-MM-DD`);

      const untypedComponent: any = component.datemaskComponent();
      expect(untypedComponent._inputs().length).toBe(3);

      expect(untypedComponent._yearInput().elementRef.nativeElement).toBe(
        untypedComponent._inputs()[0].elementRef.nativeElement,
      );
      expect(untypedComponent._monthInput().elementRef.nativeElement).toBe(
        untypedComponent._inputs()[1].elementRef.nativeElement,
      );
      expect(untypedComponent._dayInput().elementRef.nativeElement).toBe(
        untypedComponent._inputs()[2].elementRef.nativeElement,
      );

      expect(component.datemaskComponent().separator()).toBe('-');
    });

    it('should adapt to format setting during runtime', () => {
      expect(component.datemaskComponent().format()).toBe(`YYYY-MM-DD`);
      expect(component.datemaskComponent().separator()).toBe('-');

      const formatComponent = component as DatemaskTestFormat;
      formatComponent.format = 'DD.MM.YYYY';

      fixture.detectChanges();

      expect(component.datemaskComponent().format()).toBe(`DD.MM.YYYY`);
      const untypedComponent: any = component.datemaskComponent();
      expect(untypedComponent._inputs().length).toBe(3);
      expect(untypedComponent._dayInput().elementRef.nativeElement).toBe(
        untypedComponent._inputs()[0].elementRef.nativeElement,
      );
      expect(untypedComponent._monthInput().elementRef.nativeElement).toBe(
        untypedComponent._inputs()[1].elementRef.nativeElement,
      );
      expect(untypedComponent._yearInput().elementRef.nativeElement).toBe(
        untypedComponent._inputs()[2].elementRef.nativeElement,
      );

      expect(component.datemaskComponent().separator()).toBe('.');
    });

    it('should throw error on invalid date formats', () => {
      const formatComponent = component as DatemaskTestFormat;
      expect(() => {
        formatComponent.format = 'none';
        fixture.detectChanges();
      }).toThrowError(
        'Provided date format "none" not an accepted format. Make sure to provide a complete Date formate with numeric values only and 4 digit years. ',
      );
    });
  });

  describe(`forms`, () => {
    let datemaskFormComponent: DatemaskTestForm;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DatemaskTestForm],
      }).compileComponents();

      fixture = TestBed.createComponent(DatemaskTestForm);
      component = fixture.componentInstance;
      datemaskFormComponent = component as DatemaskTestForm;
      fixture.detectChanges();

      nativeInputs = fixture.nativeElement.querySelectorAll('input');
    });

    it(`should reflect value updates in the form object`, () => {
      expect(datemaskFormComponent.datemaskForm.controls.date.value).toBeNull();

      const dayInput = nativeInputs[0];
      dayInput.value = '30';
      dayInput.dispatchEvent(new Event('input'));

      const monthInput = nativeInputs[1];
      monthInput.value = '05';
      monthInput.dispatchEvent(new Event('input'));

      const yearInput = nativeInputs[2];
      yearInput.value = '1999';
      yearInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(datemaskFormComponent.datemaskForm.controls.date.value).not.toBeNull();

      const momentValue = datemaskFormComponent.datemaskForm.controls.date
        .value as unknown as Moment;
      expect(momentValue.isValid).toBeTruthy();
      expect(momentValue.year()).toBe(1999);
      expect(momentValue.month()).toBe(4); // Months are 0-indexed in Moment.js
      expect(momentValue.date()).toBe(30);
    });

    it(`should validate against min and max dates`, () => {
      expect(datemaskFormComponent.datemaskForm.controls.date.value).toBeNull();

      const dayInput = nativeInputs[0];
      dayInput.value = '30';
      dayInput.dispatchEvent(new Event('input'));

      const monthInput = nativeInputs[1];
      monthInput.value = '05';
      monthInput.dispatchEvent(new Event('input'));

      const yearInput = nativeInputs[2];
      yearInput.value = '1999';
      yearInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      //   'Sun May 30 1999 00:00:00 GMT+0000'
      expect(datemaskFormComponent.datemaskForm.controls.date.errors).not.toBeNull();
      expect(datemaskFormComponent.datemaskForm.controls.date.errors!.nxDatefieldMin).toBeDefined();

      yearInput.value = '2030';
      yearInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(datemaskFormComponent.datemaskForm.controls.date.errors).not.toBeNull();
      expect(datemaskFormComponent.datemaskForm.controls.date.errors?.nxDatefieldMax).toBeDefined();

      dayInput.value = '16';
      dayInput.dispatchEvent(new Event('input'));
      monthInput.value = '06';
      monthInput.dispatchEvent(new Event('input'));
      yearInput.value = '2022';
      yearInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(datemaskFormComponent.datemaskForm.controls.date.errors).not.toBeNull();
      expect(
        datemaskFormComponent.datemaskForm.controls.date.errors?.nxDatefieldFilter,
      ).toBeDefined();
    });

    it('should reset input values on empty or invalid model values', async () => {
      const testDate = moment('2025-12-15', moment.ISO_8601);
      const testDateExpectedInputs = ['15', '12', '2025'];
      const emptyExpectedInputs = ['', '', ''];
      async function setValueAndAssert(value: any, expectedInputs: string[]) {
        datemaskFormComponent.datemaskForm.controls.date.setValue(value);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(nativeInputs[0].value).toBe(expectedInputs[0]);
        expect(nativeInputs[1].value).toBe(expectedInputs[1]);
        expect(nativeInputs[2].value).toBe(expectedInputs[2]);
      }

      await setValueAndAssert(testDate, testDateExpectedInputs);
      await setValueAndAssert(null, emptyExpectedInputs);
      await setValueAndAssert(testDate, testDateExpectedInputs);
      await setValueAndAssert(undefined, emptyExpectedInputs);
      await setValueAndAssert(testDate, testDateExpectedInputs);
      await setValueAndAssert('invalid-date-string', emptyExpectedInputs);
      await setValueAndAssert(testDate, testDateExpectedInputs);
      await setValueAndAssert(false, emptyExpectedInputs);
    });
  });

  describe(`keyboard`, () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DatemaskTestBasic],
      }).compileComponents();

      fixture = TestBed.createComponent(DatemaskTestBasic);
      component = fixture.componentInstance;
      fixture.detectChanges();

      nativeInputs = fixture.nativeElement.querySelectorAll('input');
    });

    it('should navigate with arrow keys', () => {
      nativeInputs[0].focus();

      nativeInputs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(document.activeElement).toBe(nativeInputs[1]);

      nativeInputs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(document.activeElement).toBe(nativeInputs[2]);

      nativeInputs[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(document.activeElement).toBe(nativeInputs[1]);

      nativeInputs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(document.activeElement).toBe(nativeInputs[0]);
    });

    it('should navigate after input completed', () => {
      nativeInputs[0].focus();

      const dayInput = nativeInputs[0];
      dayInput.value = '30';
      dayInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(document.activeElement).toBe(nativeInputs[1]);

      const monthInput = nativeInputs[1];
      monthInput.value = '05';
      monthInput.dispatchEvent(new Event('input'));
      expect(document.activeElement).toBe(nativeInputs[2]);
    });

    it('should focus previous input after deletion', () => {
      const dayInput = nativeInputs[0];
      dayInput.value = '30';
      dayInput.dispatchEvent(new Event('input'));

      const monthInput = nativeInputs[1];
      monthInput.value = '05';
      monthInput.dispatchEvent(new Event('input'));

      const yearInput = nativeInputs[2];
      yearInput.value = '1999';
      yearInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      yearInput.focus();

      // Clear the year input and verify focus moves to month input
      yearInput.value = '';
      yearInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      yearInput.dispatchEvent(new Event('input'));
      expect(document.activeElement).toBe(nativeInputs[1]);

      // Clear the month input and verify focus moves to day input
      monthInput.value = '';
      monthInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      monthInput.dispatchEvent(new Event('input'));
      expect(document.activeElement).toBe(nativeInputs[0]);

      // Clear the day input - focus should remain on day input (first field)
      dayInput.value = '';
      dayInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      dayInput.dispatchEvent(new Event('input'));
      expect(document.activeElement).toBe(nativeInputs[0]);
    });
  });

  describe('parsing and incomplete dates', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DatemaskIncompleteTestForm],
      }).compileComponents();

      fixture = TestBed.createComponent(DatemaskIncompleteTestForm);
      component = fixture.componentInstance;
      fixture.detectChanges();
      nativeInputs = fixture.nativeElement.querySelectorAll('input');
    });

    it('should not show error for completely empty date mask', () => {
      const test = fixture.componentRef.instance as DatemaskIncompleteTestForm;
      expect(test.datemaskForm.controls.date.errors).toBeNull();
    });

    it('should return error on partially filled mask', () => {
      const test = fixture.componentRef.instance as DatemaskIncompleteTestForm;
      expect(test.datemaskForm.controls.date.errors).toBeNull();

      const dayInput = nativeInputs[0];
      dayInput.value = '30';
      dayInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(test.datemaskForm.controls.date.errors).not.toBeNull();
      expect(test.datemaskForm.controls.date.errors!.nxDatefieldParse).not.toBeNull();
      let parseError = test.datemaskForm.controls.date.errors!.nxDatefieldParse;

      expect(parseError.text).toBe('30..');
      expect(parseError.format).toBe('DD.MM.YYYY');
      expect(parseError.dayMissing).toBeUndefined();
      expect(parseError.monthMissing).toBeTruthy();
      expect(parseError.yearMissing).toBeTruthy();

      const yearInput = nativeInputs[2];
      yearInput.value = '2020';
      yearInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(test.datemaskForm.controls.date.errors).not.toBeNull();
      expect(test.datemaskForm.controls.date.errors!.nxDatefieldParse).not.toBeNull();
      parseError = test.datemaskForm.controls.date.errors!.nxDatefieldParse;

      expect(parseError.text).toBe('30..2020');
      expect(parseError.format).toBe('DD.MM.YYYY');
      expect(parseError.dayMissing).toBeUndefined();
      expect(parseError.monthMissing).toBeTruthy();
      expect(parseError.yearMissing).toBeUndefined();
    });

    it('should remove error after clearing all inputs', () => {
      const test = fixture.componentRef.instance as DatemaskIncompleteTestForm;
      expect(test.datemaskForm.controls.date.errors).toBeNull();

      const dayInput = nativeInputs[0];
      dayInput.value = '30';
      dayInput.dispatchEvent(new Event('input'));

      const yearInput = nativeInputs[2];
      yearInput.value = '2020';
      yearInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      let parseError = test.datemaskForm.controls.date.errors!.nxDatefieldParse;

      expect(test.datemaskForm.controls.date.errors).not.toBeNull();
      expect(test.datemaskForm.controls.date.errors!.nxDatefieldParse).not.toBeNull();
      parseError = test.datemaskForm.controls.date.errors!.nxDatefieldParse;

      expect(parseError.text).toBe('30..2020');
      expect(parseError.format).toBe('DD.MM.YYYY');
      expect(parseError.dayMissing).toBeUndefined();
      expect(parseError.monthMissing).toBeTruthy();
      expect(parseError.yearMissing).toBeUndefined();

      dayInput.value = '';
      dayInput.dispatchEvent(new Event('input'));

      yearInput.value = '';
      yearInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(test.datemaskForm.controls.date.errors).toBeNull();
    });
  });

  describe('DatemaskWithDatePicker', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DatemaskWithDatePicker],
      }).compileComponents();

      fixture = TestBed.createComponent(DatemaskWithDatePicker);
      component = fixture.componentInstance;
      fixture.detectChanges();
      nativeInputs = fixture.nativeElement.querySelectorAll('input');
    });

    it('should disable all input fields and datepicker toggle when disabled is true', fakeAsync(() => {
      const test = fixture.componentRef.instance as DatemaskWithDatePicker;

      test.disabled = true;
      fixture.detectChanges();
      tick();

      const updatedInputs = fixture.nativeElement.querySelectorAll('input');
      updatedInputs.forEach((input: HTMLInputElement) => {
        expect(input.disabled).toBeTrue();
      });
      expect(test.datepickerComponent.disabled()).toBeTrue();
      expect(test.datepickerToggleComponent.disabled()).toBeTrue();

      const toggle = fixture.nativeElement.querySelector('.nx-datepicker-toggle');
      expect(toggle).withContext('nx-datepicker-toggle').not.toBeNull();
      expect(toggle.classList.contains('nx-datepicker-toggle--disabled')).toBeTrue();
    }));
  });
});

@Directive({ standalone: true })
abstract class DateRangeTestBase {
  abstract readonly datemaskComponent: Signal<NxDatemaskComponent<Moment>>;

  @ViewChild(NxDatepickerComponent)
  datepickerComponent!: NxDatepickerComponent<any>;
  @ViewChild(NxDatepickerToggleComponent)
  datepickerToggleComponent!: NxDatepickerToggleComponent<any>;
}

@Component({
  template: `
    <nx-formfield>
      <nx-datemask [(ngModel)]="datemaskModel"></nx-datemask>
    </nx-formfield>
  `,
  imports: [
    NxFormfieldComponent,
    NxMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    NxDatemaskComponent,
  ],
})
export class DatemaskTestBasic extends DateRangeTestBase {
  datemaskComponent = viewChild.required(NxDatemaskComponent<Moment>);
  datemaskModel = moment([2022, 5, 20]);
}
@Component({
  template: `
    <form [formGroup]="datemaskForm">
      <nx-formfield>
        <nx-datemask
          formControlName="date"
          [min]="minDate"
          [max]="maxDate"
          [dateFilter]="dateFilter"
        ></nx-datemask>
      </nx-formfield>
    </form>
  `,
  imports: [
    NxFormfieldComponent,
    NxMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    NxDatemaskComponent,
  ],
})
export class DatemaskTestForm extends DateRangeTestBase {
  datemaskComponent = viewChild.required(NxDatemaskComponent<Moment>);
  datemaskModel = moment([2022, 5, 20]);
  minDate = moment([2022, 5, 5]);
  maxDate = moment([2022, 5, 25]);
  dateFilter(date: moment.Moment | null): boolean {
    if (date === null) {
      return false;
    }

    // exclude weekends
    if (date.date() % 2) {
      return true;
    }

    return false;
  }

  datemaskForm = new FormGroup({
    date: new FormControl<moment.Moment | string | null>(null, Validators.required),
  });
}
@Component({
  template: `
    <form [formGroup]="datemaskForm">
      <nx-formfield>
        <nx-datemask formControlName="date"></nx-datemask>
      </nx-formfield>
    </form>
  `,
  imports: [
    NxFormfieldComponent,
    NxMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    NxDatemaskComponent,
  ],
})
export class DatemaskIncompleteTestForm extends DateRangeTestBase {
  datemaskComponent = viewChild.required(NxDatemaskComponent<Moment>);

  datemaskForm = new FormGroup({
    date: new FormControl<moment.Moment | string | null>(null),
  });
}
@Component({
  template: `
    <nx-formfield>
      <nx-datemask [(ngModel)]="datemaskModel" [format]="format"></nx-datemask>
    </nx-formfield>
  `,
  imports: [
    NxFormfieldComponent,
    NxMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    NxDatemaskComponent,
  ],
})
export class DatemaskTestFormat extends DateRangeTestBase {
  datemaskComponent = viewChild.required(NxDatemaskComponent<Moment>);
  datemaskModel = moment([2022, 5, 20]);
  format = 'YYYY-MM-DD';
}

@Component({
  template: `
    <nx-formfield>
      <nx-datemask
        [(ngModel)]="datemaskModel"
        [datepicker]="myDatepicker"
        [format]="format"
        [disabled]="disabled"
      ></nx-datemask>
      <nx-datepicker-toggle [for]="myDatepicker" nxFormfieldSuffix></nx-datepicker-toggle>
      <nx-datepicker #myDatepicker></nx-datepicker>
    </nx-formfield>
  `,
  imports: [
    NxFormfieldComponent,
    NxMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    NxDatemaskComponent,
    NxDatepickerToggleComponent,
    NxDatepickerComponent,
    NxFormfieldModule,
    NxDatefieldModule,
  ],
})
export class DatemaskWithDatePicker extends DateRangeTestBase {
  datemaskComponent = viewChild.required(NxDatemaskComponent<Moment>);
  datemaskModel = moment([2022, 5, 20]);
  format = 'YYYY-MM-DD';
  disabled = false;
}
