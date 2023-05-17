import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';
import { Subject } from 'rxjs';

import { NxDatefieldModule } from '../datefield.module';
import { DATEPICKER_DEFAULT_OPTIONS, DatepickerDefaultOptions, NxDatepickerComponent } from './datepicker.component';
import { NxDatepickerToggleComponent } from './datepicker-toggle';

const datepickerOptions: DatepickerDefaultOptions = {
    changes: new Subject<void>(),
    toggleIconTabindex: -1,
};

@Directive()
abstract class DatepickerToggleTest {
    tabindex!: number;

    @ViewChild(NxDatepickerComponent) datepickerInstance!: NxDatepickerComponent<Date>;
    @ViewChild(NxDatepickerToggleComponent) toggleInstance!: NxDatepickerToggleComponent<Date>;
}

describe('NxDatepickerToggleComponent', () => {
    let fixture: ComponentFixture<DatepickerToggleTest>;
    let testInstance: DatepickerToggleTest;
    let datepickerInstance: NxDatepickerComponent<Date>;
    let toggleInstance: NxDatepickerToggleComponent<Date>;
    let inputNativeElement: HTMLInputElement;

    function createTestComponent(component: Type<DatepickerToggleTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        datepickerInstance = testInstance.datepickerInstance;
        toggleInstance = testInstance.toggleInstance;
        inputNativeElement = fixture.nativeElement.querySelector('input');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicToggleDateComponent, ConfigurableToggleDateComponent, DoubleToggleErrorComponent, ReadonlyDatefield],
            imports: [NxDatefieldModule, NxMomentDateModule, NxInputModule],
        }).compileComponents();
    }));

    it('should set tabindex on default', () => {
        createTestComponent(BasicToggleDateComponent);
        expect(toggleInstance.tabindex).toBe(0);
    });

    it('should return an error when two toggles are associated', () => {
        expect(() => {
            createTestComponent(DoubleToggleErrorComponent);
        }).toThrow(new Error('A NxDatepicker can only be associated with a single toggle button.'));
    });

    it('focuses toggle after closing datepicker (toggle focusable)', fakeAsync(() => {
        createTestComponent(BasicToggleDateComponent);
        spyOn(inputNativeElement, 'focus');
        expect(datepickerInstance.opened).toBeFalse();

        datepickerInstance.open();
        fixture.detectChanges();
        expect(datepickerInstance.opened).toBeTrue();
        flush();
        expect(inputNativeElement.focus).not.toHaveBeenCalled();

        datepickerInstance.close();
        fixture.detectChanges();
        flush();
        expect(datepickerInstance.opened).toBeFalse();
        expect(inputNativeElement.focus).not.toHaveBeenCalled();
    }));

    it('should update tabindex on change', () => {
        createTestComponent(ConfigurableToggleDateComponent);
        testInstance.tabindex = 0;
        expect(toggleInstance.tabindex).toBe(0);
    });

    it('should disable the datepicker in a readonly datefield', () => {
        createTestComponent(ReadonlyDatefield);
        expect(toggleInstance.disabled).toBeTrue();
    });

    it('focuses input after closing datepicker (toggle non-focusable)', fakeAsync(() => {
        createTestComponent(ConfigurableToggleDateComponent);
        testInstance.tabindex = -1;
        const spy = spyOn(inputNativeElement, 'focus');
        expect(datepickerInstance.opened).toBeFalse();

        datepickerInstance.open();
        fixture.detectChanges();
        expect(datepickerInstance.opened).toBeTrue();
        flush();
        expect(spy).not.toHaveBeenCalled();

        datepickerInstance.close();
        fixture.detectChanges();
        flush();
        expect(datepickerInstance.opened).toBeFalse();
        expect(spy).toHaveBeenCalledTimes(1);
    }));
});

describe('NxDatepickerToggleComponent using injection token', () => {
    let fixture: ComponentFixture<DatepickerToggleTest>;
    let testInstance: DatepickerToggleTest;
    let toggleInstance: NxDatepickerToggleComponent<Date>;

    function createTestComponent(component: Type<DatepickerToggleTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        toggleInstance = testInstance.toggleInstance;
    }

    beforeEach(waitForAsync(() => {
        datepickerOptions.toggleIconTabindex = -1;
        TestBed.configureTestingModule({
            declarations: [BasicToggleDateComponent, ConfigurableToggleDateComponent],
            imports: [NxDatefieldModule, NxMomentDateModule, NxInputModule],
            providers: [{ provide: DATEPICKER_DEFAULT_OPTIONS, useValue: datepickerOptions }],
        }).compileComponents();
    }));

    it('changes the tabindex on injection token change', inject([DATEPICKER_DEFAULT_OPTIONS], (defaultOptions: DatepickerDefaultOptions) => {
        createTestComponent(BasicToggleDateComponent);
        const toggleElement = fixture.nativeElement.querySelector('.nx-datepicker-toggle-button');
        expect(toggleInstance.tabindex).toBe(-1);
        expect(toggleElement.getAttribute('tabindex')).toBe('-1');

        defaultOptions.toggleIconTabindex = 2;
        defaultOptions.changes!.next();
        fixture.detectChanges();
        expect(toggleInstance.tabindex).toBe(2);
        expect(toggleElement.getAttribute('tabindex')).toBe('2');
    }));

    it('tabindex can be overwritten when injection token is used', () => {
        createTestComponent(ConfigurableToggleDateComponent);
        testInstance.tabindex = 1;
        fixture.detectChanges();
        expect(toggleInstance.tabindex).toBe(1);
        const toggleElement = fixture.nativeElement.querySelector('.nx-datepicker-toggle-button');
        expect(toggleElement.getAttribute('tabindex')).toBe('1');
    });
});

@Component({
    template: `
        <input nxDatefield nxInput [datepicker]="myDatepicker1" />
        <nx-datepicker-toggle [for]="myDatepicker1" nxFormfieldSuffix></nx-datepicker-toggle>
        <nx-datepicker #myDatepicker1></nx-datepicker>
    `,
})
class BasicToggleDateComponent extends DatepickerToggleTest {}

@Component({
    template: `
        <input nxDatefield nxInput [datepicker]="myDatepicker1" />
        <nx-datepicker-toggle [for]="myDatepicker1" [tabindex]="tabindex" nxFormfieldSuffix></nx-datepicker-toggle>
        <nx-datepicker #myDatepicker1></nx-datepicker>
    `,
})
class ConfigurableToggleDateComponent extends DatepickerToggleTest {}

@Component({
    template: `
        <input nxDatefield nxInput [datepicker]="myDatepicker1" />
        <nx-datepicker-toggle [for]="myDatepicker1" nxFormfieldSuffix></nx-datepicker-toggle>
        <nx-datepicker-toggle [for]="myDatepicker1" nxFormfieldSuffix></nx-datepicker-toggle>
        <nx-datepicker #myDatepicker1></nx-datepicker>
    `,
})
class DoubleToggleErrorComponent extends DatepickerToggleTest {}

@Component({
    template: `
        <input nxDatefield nxInput readonly [datepicker]="myDatepicker1" />
        <nx-datepicker-toggle [for]="myDatepicker1" nxFormfieldSuffix></nx-datepicker-toggle>
        <nx-datepicker #myDatepicker1></nx-datepicker>
    `,
})
class ReadonlyDatefield extends DatepickerToggleTest {}
