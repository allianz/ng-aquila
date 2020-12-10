import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NX_DATE_LOCALE } from './adapter/date-token';
import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, fakeAsync, async, TestBed, tick, flush } from '@angular/core/testing';
import * as axe from 'axe-core';

import * as moment from 'moment';
import { Moment } from 'moment';

import { NxDatefieldDirective } from './datefield.directive';
import { NxDatefieldModule } from './datefield.module';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NxIsoDateModule } from '../iso-date-adapter';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class DatefieldTest {
  public disabled: boolean = false;
  public strict: boolean = true;
  public displayFormat: string;
  public parseFormat: string|string[];
  public value: Moment;

  public min: Moment;
  public max: Moment;

  public form: FormGroup;

  @ViewChild(NxDatefieldDirective) textInstance: NxDatefieldDirective<Date>;
}

describe('NxDatefieldDirective with Moment', () => {

  let fixture: ComponentFixture<DatefieldTest>;
  let testInstance: DatefieldTest;
  let datefieldInstance: NxDatefieldDirective<Date>;
  let nativeElement: HTMLInputElement;

  function createTestComponent(component: Type<DatefieldTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    datefieldInstance = testInstance.textInstance;
    nativeElement = fixture.nativeElement.querySelector('input');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicDatefield,
        AdvancedDatefield,
        MinMaxDatefield,
        ReactiveDatefield
      ],
      imports: [
        NxDatefieldModule,
        NxMomentDateModule,
        NxInputModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: NX_DATE_LOCALE, useValue: 'ja'}
      ]
    }).compileComponents();
  }));

  it('should create the directive', async(() => {
    createTestComponent(BasicDatefield);
    expect(datefieldInstance).toBeTruthy();
  }));

  it('should disable the input', fakeAsync(() => {
    createTestComponent(BasicDatefield);
    testInstance.disabled = true;

    fixture.detectChanges();
    tick();
    expect(nativeElement.attributes['disabled']).toBeTruthy();
  }));

  it('should accept a custom parseFormat', fakeAsync(() => {
    createTestComponent(AdvancedDatefield);
    testInstance.parseFormat = 'MM--DD--YYYY';

    fixture.detectChanges();
    tick();

    nativeElement.value = '03--05--2008';
    nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(testInstance.value.isSame(moment([2008,  2,  5]))).toBeTruthy();

  }));

  it('should accept a custom displayFormat', fakeAsync(() => {
    createTestComponent(AdvancedDatefield);
    testInstance.displayFormat = 'MM--DD--YYYY';
    testInstance.value = moment([2008,  2,  5]);

    fixture.detectChanges();
    tick();
    expect(nativeElement.value).toBe('03--05--2008');
  }));

  it('should apply displayFormat on blur', () => {
    createTestComponent(AdvancedDatefield);

    testInstance.displayFormat = 'MM--DD--YYYY';
    testInstance.parseFormat = ['MM/DD/YYYY', 'MM--DD--YYYY'];
    fixture.detectChanges();

    nativeElement.value = '03/05/2008';
    nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(nativeElement.value).toBe('03--05--2008');
  });

  it('should parse strictly', fakeAsync(() => {
    createTestComponent(AdvancedDatefield);
    testInstance.parseFormat = 'MM/DD/YYYY';
    testInstance.strict = true;
    fixture.detectChanges();
    tick();

    nativeElement.value = '03/05/2008';
    nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();
    expect(testInstance.value.isSame((moment([2008,  2,  5])))).toBeTruthy();

    nativeElement.value = '03/05/08';
    nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(testInstance.value).toBeNull();
  }));

  it('should parse non-strictly', fakeAsync(() => {
    createTestComponent(AdvancedDatefield);
    testInstance.parseFormat = 'MM/DD/YYYY';
    testInstance.strict = false;

    fixture.detectChanges();
    tick();

    nativeElement.value = '03/05/2008';
    nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();
    expect(testInstance.value.isSame((moment([2008,  2,  5])))).toBeTruthy();

    nativeElement.value = '03/05/08';
    nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(testInstance.value.isSame((moment([2008,  2,  5])))).toBeTruthy();
  }));

  it('should not be marked dirty when nxStrict and nxParseFormat is used', fakeAsync(() => {
    createTestComponent(ReactiveDatefield);
    fixture.detectChanges();
    tick();
    expect(testInstance.form.get('datefield').dirty).toBeFalse();
  }));

  it('should not remove the value of the input on blur', () => {
    createTestComponent(AdvancedDatefield);
    testInstance.parseFormat = 'MM/DD/YYYY';
    testInstance.strict = true;

    nativeElement.value = 'xyz';
    nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(nativeElement.value).toBe('xyz');
  });

  it('should mark invalid when value is after max', fakeAsync(() => {
    createTestComponent(MinMaxDatefield);

    testInstance.min = moment([2007,  1,  1]);
    testInstance.max = moment([2009,  1,  1]);
    testInstance.value = moment([2010,  1,  1]);

    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    expect(nativeElement.classList).toContain('ng-invalid');
  }));

  it('should mark invalid when value is before min', fakeAsync(() => {
    createTestComponent(MinMaxDatefield);

    testInstance.min = moment([2007,  1,  1]);
    testInstance.max = moment([2009,  1,  1]);
    testInstance.value = moment([2010,  1,  1]);

    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    expect(nativeElement.classList).toContain('ng-invalid');
  }));

  describe('a11y', () => {
    it('has no basic accessibility violations', function(done) {
      createTestComponent(BasicDatefield);

      axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        const violationMessages = results.violations.map(item => item.description);
        done();
      });
    });
  });

  describe('reactive', () => {
    it('should assign initially value formatted', fakeAsync(() => {
      createTestComponent(ReactiveDatefield);
      fixture.detectChanges();
      tick();
      expect(nativeElement.value).toBe('2018/01/01');
    }));

    it('should have no error on custom date format', () => {
      createTestComponent(ReactiveDatefield);
      testInstance.displayFormat = 'MM--DD--YYYY';
      testInstance.parseFormat = ['MM/DD/YYYY', 'MM--DD--YYYY'];
      fixture.detectChanges();

      nativeElement.value = '10--31--2019';
      nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(nativeElement.value).toBe('10--31--2019');
      expect(testInstance.form.get('datefield').valid).toBe(true);
    });

    it('should reflect the value in the native input element', () => {
      createTestComponent(ReactiveDatefield);
      fixture.detectChanges();
      expect(nativeElement.value).toEqual('2018/01/01');
      expect(moment(datefieldInstance.value)).toEqual(moment([2018,  0,  1]));
      testInstance.form.reset();
      expect(nativeElement.value).toEqual('');
      expect(datefieldInstance.value).toEqual(null);
    });
  });
});

@Component({
  template: `
    <nx-formfield nxLabel='Given Label'>
      <input nxInput nxDatefield [disabled]="disabled" />
    </nx-formfield>
  `
})
class BasicDatefield extends DatefieldTest {
}

@Component({
  template: `
    <input nxInput nxDatefield
      [(ngModel)]="value"
      [nxParseFormat]="parseFormat"
      [nxDisplayFormat]="displayFormat"
      [nxStrict]="strict" />
  `
})
class AdvancedDatefield extends DatefieldTest {
}@Component({
  template: `
    <input nxInput nxDatefield
      [(ngModel)]="value"
      [nxMin]="min"
      [nxMax]="max"/>
  `
})
class MinMaxDatefield extends DatefieldTest {
}

@Component({
  template: `
    <form [formGroup]="form">
      <nx-formfield nxLabel='Given Label'>
        <input nxInput nxDatefield
          [nxStrict]="strict"
          [nxParseFormat]="parseFormat"
          [nxDisplayFormat]="displayFormat"
          formControlName="datefield" />
      </nx-formfield>
    </form>
  `
})
class ReactiveDatefield extends DatefieldTest {
  public fb;

  constructor() {
    super();

    this.fb = new FormBuilder();

    this.form = this.fb.group({
        datefield: {disabled: false, value: moment([2018, 0, 1])}
    });
  }
}


@Directive()
abstract class DatefieldIsoTest {
  public form: FormGroup;
  @ViewChild(NxDatefieldDirective) datefieldInstance: NxDatefieldDirective<Date>;
}

describe('NxDatefieldDirective with IsoAdapter', () => {
  let fixture: ComponentFixture<DatefieldIsoTest>;
  let testInstance: DatefieldIsoTest;
  let datefieldInstance: NxDatefieldDirective<Date>;
  let nativeElement: HTMLInputElement;

  function createTestComponent(component: Type<DatefieldIsoTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    datefieldInstance = testInstance.datefieldInstance;
    nativeElement = fixture.nativeElement.querySelector('input');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReactiveIsoDatefield
      ],
      imports: [
        NxDatefieldModule,
        NxIsoDateModule,
        NxInputModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  it('has no error for a correct date', () => {
    createTestComponent(ReactiveIsoDatefield);
    expect(testInstance.form.get('datefield').valid).toBeTrue();
  });

  it('has an parsing error for an incorrect date', () => {
    createTestComponent(ReactiveIsoDatefield);
    const datefield = testInstance.form.get('datefield');
    datefield.patchValue('this is no date');
    fixture.detectChanges();
    expect(datefield.valid).toBeFalse();
    expect(datefield.errors['nxDatefieldParse']).toBeDefined();
  });

});


@Component({
  template: `
    <form [formGroup]="form">
      <nx-formfield nxLabel='Given Label'>
        <input nxInput nxDatefield formControlName="datefield"/>
      </nx-formfield>
    </form>
  `
})
class ReactiveIsoDatefield extends DatefieldIsoTest {
  public fb;

  constructor() {
    super();
    this.fb = new FormBuilder();
    this.form = this.fb.group({
      datefield: '01.01.2021'
    });
  }
}