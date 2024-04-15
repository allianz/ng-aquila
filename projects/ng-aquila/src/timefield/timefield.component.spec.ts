import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Directive, Injectable, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { dispatchFakeEvent } from 'projects/ng-aquila/src/cdk-test-utils';

import { NxTimefieldComponent } from './timefield.component';
import { NxTimefieldModule } from './timefield.module';
import { NxTimefieldIntl } from './timefield-intl';

@Directive()
abstract class TimefieldTest {
    @ViewChild(NxTimefieldComponent) timefieldInstance!: NxTimefieldComponent;

    label = '';
    negative = false;
    disabled = false;
    required = false;
    time = '';
    twelveHourFormat = false;
}

@Injectable()
class MyIntl extends NxTimefieldIntl {
    inputFieldHoursAriaLabel = 'stunden';
    inputFieldMinutesAriaLabel = 'minuten';
}

describe('NxTimefieldComponent', () => {
    let fixture: ComponentFixture<TimefieldTest>;
    let testInstance: TimefieldTest;
    let timefieldInstance: NxTimefieldComponent;
    let timefieldElement: HTMLElement;
    let inputElementHours: HTMLInputElement;
    let inputElementMinutes: HTMLInputElement;
    let spanElementSeperator: HTMLSpanElement;
    let divElementInputFields: HTMLDivElement;
    let divElementsWrapper: HTMLDivElement;
    let focusMonitor: FocusMonitor;

    function createTestComponent(component: Type<TimefieldTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        timefieldInstance = testInstance.timefieldInstance;
        timefieldElement = fixture.nativeElement.querySelector('nx-timefield');
        inputElementHours = fixture.nativeElement.querySelector('.nx-timefield-input__field__hours') as HTMLInputElement;
        inputElementMinutes = fixture.nativeElement.querySelector('.nx-timefield-input__field__minutes') as HTMLInputElement;
        spanElementSeperator = fixture.nativeElement.querySelector('.nx-timefield-hours-separator') as HTMLSpanElement;
        divElementInputFields = fixture.nativeElement.querySelector('.nx-timefield-input__fields') as HTMLDivElement;
        divElementsWrapper = fixture.nativeElement.querySelector('.nx-timefield__wrapper') as HTMLDivElement;
    }

    const assertTime = (time?: string | null) => {
        fixture.detectChanges();

        switch (time) {
            case null:
                expect(timefieldInstance.time).toBeNull();
                break;
            case undefined:
                expect(timefieldInstance.time).toBeUndefined();
                break;
            default:
                expect(timefieldInstance.time).toBe(time);
        }
    };
    const flushAndAssertTime = (time?: string | null) => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();
        assertTime(time);
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxTimefieldModule, FormsModule, ReactiveFormsModule],
            declarations: [
                SimpleTimefield,
                ConfigurableTimefield,
                ReactiveTimefield,
                TemplateDrivenTimefield,
                TemplateDrivenOnPushTimefield,
                OverrideDefaultLabelsTimefield,
            ],
        }).compileComponents();
    }));

    it('should create a simple timefield component', () => {
        createTestComponent(SimpleTimefield);
        expect(timefieldInstance).toBeTruthy();
    });

    it('should set minimum minutes to 0 by default', () => {
        createTestComponent(SimpleTimefield);
        expect(timefieldInstance.minMinutes).toBe(0);
    });

    it('should set minimum hours to 0 by default', () => {
        createTestComponent(SimpleTimefield);
        expect(timefieldInstance.minHours).toBe(0);
    });

    it('should set maximum minutes to 59 by default', () => {
        createTestComponent(SimpleTimefield);
        expect(timefieldInstance.maxMinutes).toBe(59);
    });

    it('should set maximum hours to 23 by default', () => {
        createTestComponent(SimpleTimefield);
        expect(timefieldInstance.maxHours).toBe(23);
    });

    it('should set 12h toggle to false by default', () => {
        createTestComponent(SimpleTimefield);
        expect(timefieldInstance._toggleAMPM).toBeFalsy();
    });

    it('should prevent setting time if timeformat is not in ISO 24h format', fakeAsync(() => {
        createTestComponent(TemplateDrivenTimefield);
        const templateInstance = testInstance as TemplateDrivenTimefield;
        flushAndAssertTime('00:00');
        templateInstance.today = '00:00:00';
        flushAndAssertTime(null);
        templateInstance.today = '00-00';
        flushAndAssertTime(null);
        templateInstance.today = '00/00';
        flushAndAssertTime(null);
        templateInstance.today = '00.00';
        flushAndAssertTime(null);
    }));

    it('should set time correctly in 24h format in template driven form with onPush change detection', fakeAsync(() => {
        createTestComponent(TemplateDrivenOnPushTimefield);
        flushAndAssertTime('00:00');
    }));

    it('should not set hours field if it is not between 0 and 23 in a template driven form', fakeAsync(() => {
        createTestComponent(TemplateDrivenTimefield);
        const templateInstance = testInstance as TemplateDrivenTimefield;
        templateInstance.today = '24:00';
        flushAndAssertTime(null);
        fixture.detectChanges();
        tick();
        expect(timefieldInstance.hours).toBe('');
    }));

    it('should not set minutes field if it is not between 0 and 59 in a template driven form', fakeAsync(() => {
        createTestComponent(TemplateDrivenTimefield);
        const templateInstance = testInstance as TemplateDrivenTimefield;
        templateInstance.today = '22:62';
        flushAndAssertTime(null);
        fixture.detectChanges();
        tick();
        expect(timefieldInstance.minutes).toBe('');
    }));

    it('should show error when hours field is not between 0 and 23 in a reactive form', fakeAsync(() => {
        createTestComponent(ReactiveTimefield);
        const reactInstance = testInstance as ReactiveTimefield;
        reactInstance.twelveHourFormat = true;
        reactInstance.testForm.setValue({ today: '24:00' });
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();
        expect(inputElementHours.value).toBe('');
        inputElementMinutes.click();
        fixture.detectChanges();
        tick();
        expect(reactInstance.testForm.status).toBe('INVALID');
    }));

    it('should show error when minutes field is not between 0 and 59 in a reactive form', fakeAsync(() => {
        createTestComponent(ReactiveTimefield);
        const reactInstance = testInstance as ReactiveTimefield;
        reactInstance.twelveHourFormat = true;
        reactInstance.testForm.setValue({ today: '11:60' });
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();
        expect(inputElementMinutes.value).toBe('');
        inputElementMinutes.click();
        fixture.detectChanges();
        tick();
        expect(reactInstance.testForm.status).toBe('INVALID');
    }));

    it('should not set value for any non-numeric entries', fakeAsync(() => {
        createTestComponent(TemplateDrivenTimefield);
        const templateInstance = testInstance as TemplateDrivenTimefield;
        templateInstance.today = 'abcd';
        flushAndAssertTime(null);
        fixture.detectChanges();
        tick();
        expect(timefieldInstance.minutes).toBe('');
    }));

    it('should emit change event in 24h ISO format', fakeAsync(() => {
        createTestComponent(TemplateDrivenTimefield);
        const templateInstance = testInstance as TemplateDrivenTimefield;
        flushAndAssertTime('00:00');
        const spy = spyOn(timefieldInstance.valueChange, 'emit').and.callThrough();
        templateInstance.today = '12:00';
        flushAndAssertTime('12:00');
        expect(timefieldInstance.valueChange.emit).toHaveBeenCalledWith('12:00');
        expect(spy).toHaveBeenCalledTimes(1);
    }));

    describe('twelveHourFormat', () => {
        it('should set twelveHourFormat programmatically', () => {
            createTestComponent(ConfigurableTimefield);
            timefieldInstance.twelveHourFormat = true;
            fixture.detectChanges();
            expect(timefieldInstance._toggleAMPM).toBe('AM');
            timefieldInstance.twelveHourFormat = false;
            fixture.detectChanges();
            expect(timefieldInstance._toggleAMPM).toBeNull();
        });

        it('should set minumum minutes to 0 by default', () => {
            createTestComponent(ConfigurableTimefield);
            timefieldInstance.twelveHourFormat = true;
            fixture.detectChanges();
            expect(timefieldInstance.minMinutes).toBe(0);
        });

        it('should set minumum hours to 1 by default', () => {
            createTestComponent(ConfigurableTimefield);
            timefieldInstance.twelveHourFormat = true;
            fixture.detectChanges();
            expect(timefieldInstance.minHours).toBe(1);
        });

        it('should set maximum minutes to 59 by default', () => {
            createTestComponent(ConfigurableTimefield);
            timefieldInstance.twelveHourFormat = true;
            fixture.detectChanges();
            expect(timefieldInstance.maxMinutes).toBe(59);
        });

        it('should set maximum hours to 12 by default', () => {
            createTestComponent(ConfigurableTimefield);
            timefieldInstance.twelveHourFormat = true;
            fixture.detectChanges();
            expect(timefieldInstance.maxHours).toBe(12);
        });

        it('should always set the model value in 24h format', fakeAsync(() => {
            createTestComponent(TemplateDrivenTimefield);
            const templateInstance = testInstance as TemplateDrivenTimefield;
            flushAndAssertTime('00:00');
            templateInstance.twelveHourFormat = true;
            fixture.detectChanges();
            expect(timefieldInstance._toggleAMPM).toBe('AM');
            inputElementHours.value = '12';
            inputElementMinutes.value = '00';
            fixture.detectChanges();
            tick();
            flushAndAssertTime('00:00');
            fixture.detectChanges();
            tick();
            expect(timefieldInstance.minutes).toBe('00');
            expect(timefieldInstance.hours).toBe('00');
        }));

        it('should switch correctly between am/pm and set correct 24h time in model', () => {
            createTestComponent(ConfigurableTimefield);
            timefieldInstance.twelveHourFormat = true;
            fixture.detectChanges();
            expect(timefieldInstance._toggleAMPM).toBe('AM');
            expect(timefieldInstance.minHours).toBe(1);
            expect(timefieldInstance.maxHours).toBe(12);
            timefieldInstance.twelveHourFormat = false;
            fixture.detectChanges();
            expect(timefieldInstance._toggleAMPM).toBeNull();
            expect(timefieldInstance.minHours).toBe(0);
            expect(timefieldInstance.maxHours).toBe(23);
        });
    });

    describe('disabled', () => {
        it('should update view on disabled change', () => {
            createTestComponent(ConfigurableTimefield);
            timefieldInstance.disabled = true;
            fixture.detectChanges();
            expect(timefieldElement).toHaveClass('is-disabled');
        });
    });

    describe('negative', () => {
        it('should update view on negative change', () => {
            createTestComponent(ConfigurableTimefield);
            timefieldInstance.negative = true;
            fixture.detectChanges();
            expect(timefieldElement).toHaveClass('is-negative');
        });
    });

    describe('focus', () => {
        it('should add has-focus class when any of the two inputs gets focus', fakeAsync(() => {
            createTestComponent(SimpleTimefield);
            inputElementHours.focus();
            fixture.detectChanges();
            tick();
            expect(spanElementSeperator).toHaveClass('has-focus');
            expect(divElementInputFields).toHaveClass('has-focus');
            expect(inputElementMinutes).toHaveClass('has-focus');
            inputElementHours.blur();
            inputElementMinutes.focus();
            fixture.detectChanges();
            tick();
            expect(spanElementSeperator).toHaveClass('has-focus');
            expect(divElementInputFields).toHaveClass('has-focus');
            expect(inputElementHours).toHaveClass('has-focus');
        }));
    });

    describe('blur', () => {
        it('should zero pad the hours field if the value is <10', fakeAsync(() => {
            createTestComponent(SimpleTimefield);
            inputElementHours.value = '0';
            inputElementHours.dispatchEvent(new Event('input'));
            inputElementHours.focus();
            fixture.detectChanges();
            tick();
            expect(document.activeElement).toEqual(inputElementHours);
            expect(inputElementHours.value).toBe('0');
            inputElementHours.blur();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            tick();
            expect(timefieldInstance.hours).toBe('00');
            expect(inputElementHours.value).toBe('00');
        }));

        it('should zero pad the minutes field if the value is <10', fakeAsync(() => {
            createTestComponent(SimpleTimefield);
            inputElementMinutes.value = '0';
            inputElementMinutes.dispatchEvent(new Event('input'));
            inputElementMinutes.focus();
            fixture.detectChanges();
            tick();
            expect(document.activeElement).toEqual(inputElementMinutes);
            expect(inputElementMinutes.value).toBe('0');
            inputElementMinutes.blur();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            tick();
            expect(timefieldInstance.minutes).toBe('00');
            expect(inputElementMinutes.value).toBe('00');
        }));

        it('should zero pad the hours field if the value is <10 when focus goes from hours to minutes field', fakeAsync(() => {
            createTestComponent(SimpleTimefield);
            inputElementHours.value = '0';
            inputElementHours.dispatchEvent(new Event('input'));
            inputElementHours.focus();
            fixture.detectChanges();
            tick();
            expect(document.activeElement).toEqual(inputElementHours);
            expect(inputElementHours.value).toBe('0');

            inputElementMinutes.focus();
            fixture.detectChanges();
            tick();
            expect(document.activeElement).toEqual(inputElementMinutes);
            expect(timefieldInstance.hours).toBe('00');
            expect(inputElementHours.value).toBe('00');
        }));
    });

    describe('validation', () => {
        it('should not show the error initially', () => {
            createTestComponent(ReactiveTimefield);
            const reactInstance = testInstance as ReactiveTimefield;
            expect(reactInstance.testForm.touched).toBeFalse();
            expect(reactInstance.testForm.status).toBe('INVALID');
            expect(timefieldElement).not.toHaveClass('has-error');
            expect(timefieldElement).toHaveClass('ng-untouched');
        });

        it('should reflect the error state', fakeAsync(() => {
            createTestComponent(ReactiveTimefield);
            const reactInstance = testInstance as ReactiveTimefield;
            assertTime(null);
            expect(reactInstance.testForm.status).toBe('INVALID');
            reactInstance.testForm.patchValue({ today: '00:00' });
            fixture.detectChanges();
            tick();
            assertTime('00:00');
            expect(reactInstance.testForm.status).toBe('VALID');
        }));

        it('should mark as touched on blur only', () => {
            createTestComponent(ReactiveTimefield);
            const form = (testInstance as ReactiveTimefield).testForm;
            expect(form.touched).toBeFalse();
            // test input event to avoid a regression
            inputElementHours.value = '0';
            inputElementHours.dispatchEvent(new Event('input'));
            inputElementHours.focus();
            fixture.detectChanges();
            expect(form.touched).toBeFalse();
            dispatchFakeEvent(inputElementHours, 'focusout');
            fixture.detectChanges();
            expect(form.touched).toBeTrue();
        });

        it('should show error only when all inputs have lost focus', () => {
            createTestComponent(ReactiveTimefield);
            const form = (testInstance as ReactiveTimefield).testForm;

            inputElementHours.value = '25';
            inputElementHours.dispatchEvent(new Event('input'));
            inputElementHours.focus();
            fixture.detectChanges();
            expect(timefieldElement).not.toHaveClass('has-error');

            inputElementMinutes.dispatchEvent(new Event('input'));
            inputElementMinutes.focus();
            fixture.detectChanges();
            expect(timefieldElement).not.toHaveClass('has-error');

            dispatchFakeEvent(inputElementMinutes, 'focusout');
            fixture.detectChanges();
            expect(timefieldElement).toHaveClass('has-error');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(SimpleTimefield);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('should overwrite the default aria labels', () => {
            createTestComponent(OverrideDefaultLabelsTimefield);
            expect(inputElementHours.getAttribute('aria-label')).toBe('stunden');
            expect(inputElementMinutes.getAttribute('aria-label')).toBe('minuten');
        });
    });
});
@Component({
    template: `<nx-timefield label="Time"></nx-timefield>`,
})
class SimpleTimefield extends TimefieldTest {}

@Component({
    template: `
        <nx-timefield [label]="label" [twelveHourFormat]="twelveHourFormat" [negative]="negative" [disabled]="disabled" [required]="required"></nx-timefield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfigurableTimefield extends TimefieldTest {}

@Component({
    template: `
        <form [formGroup]="testForm" (ngSubmit)="onSubmit()">
            <nx-timefield formControlName="today" [twelveHourFormat]="twelveHourFormat"></nx-timefield>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveTimefield extends TimefieldTest {
    testForm!: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        super();
        this.createForm();
    }

    createForm() {
        this.testForm = this.fb.group({
            today: ['', Validators.required],
        });
    }
}
@Component({
    template: `<nx-timefield [twelveHourFormat]="twelveHourFormat" [(ngModel)]="today"></nx-timefield>`,
})
class TemplateDrivenTimefield extends TimefieldTest {
    today = '00:00';
}

@Component({
    template: `<nx-timefield [twelveHourFormat]="twelveHourFormat" [(ngModel)]="today"></nx-timefield>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplateDrivenOnPushTimefield extends TimefieldTest {
    today = '00:00';
}

@Component({
    template: `<nx-timefield twelveHourFormat></nx-timefield>`,
    providers: [{ provide: NxTimefieldIntl, useClass: MyIntl }],
})
class OverrideDefaultLabelsTimefield extends TimefieldTest {}
