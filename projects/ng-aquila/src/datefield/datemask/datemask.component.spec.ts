import { NxDatepickerComponent, NxDatepickerToggleComponent } from '@allianz/ng-aquila/datefield';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxMomentDateModule } from '@allianz/ng-aquila/moment-date-adapter';

import { Component, Directive, Signal, ViewChild, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import moment, { Moment } from 'moment';

import { NxFormfieldModule } from '../../formfield';
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

  datemaskForm = new FormBuilder().group({
    date: [null, Validators.required],
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
