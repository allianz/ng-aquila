import { Direction, Directionality } from '@angular/cdk/bidi';
import { ENTER, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { DEC, dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, FEB, JAN, NOV } from '../../cdk-test-utils';
import { NxNativeDateModule } from '../adapter/index';
import { NxCalendarComponent } from './calendar';
import { NxCalendarBodyComponent } from './calendar-body';
import { NxDatepickerIntl } from './datepicker-intl';
import { NxMonthViewComponent } from './month-view';
import { NxMultiYearViewComponent, yearsPerPage } from './multi-year-view';
import { NxYearViewComponent } from './year-view';

describe('NxCalendarComponent', () => {
    let dir: { value: Direction };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxButtonModule, NxNativeDateModule, NxIconModule],
            declarations: [
                NxCalendarBodyComponent,
                NxCalendarComponent,
                NxMonthViewComponent,
                NxYearViewComponent,
                NxMultiYearViewComponent,

                // Test components.
                StandardCalendar,
                CalendarWithMinMax,
                CalendarWithDateFilter,
            ],
            providers: [NxDatepickerIntl, { provide: Directionality, useFactory: () => (dir = { value: 'ltr' }) }],
        });

        TestBed.compileComponents();
    }));

    describe('standard calendar', () => {
        let fixture: ComponentFixture<StandardCalendar>;
        let testComponent: StandardCalendar;
        let calendarElement: HTMLElement;
        let periodButton: HTMLElement;
        let prevButton: HTMLElement;
        let nextButton: HTMLElement;
        let calendarInstance: NxCalendarComponent<Date>;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardCalendar);
            fixture.detectChanges();

            const calendarDebugElement = fixture.debugElement.query(By.directive(NxCalendarComponent));
            calendarElement = calendarDebugElement.nativeElement;
            periodButton = calendarElement.querySelector('.nx-calendar-change-view-button') as HTMLElement;
            prevButton = calendarElement.querySelector('.nx-calendar-previous-button') as HTMLElement;
            nextButton = calendarElement.querySelector('.nx-calendar-next-button') as HTMLElement;

            calendarInstance = calendarDebugElement.componentInstance;
            testComponent = fixture.componentInstance;
        });

        it('should be in month view with specified month active', () => {
            expect(calendarInstance._currentView).toBe('month');
            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));
        });

        it('should toggle view when period clicked', () => {
            expect(calendarInstance._currentView).toBe('month');

            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('multi-year');

            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('month');
        });

        it('should go to next and previous month', () => {
            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));

            nextButton.click();
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2017, FEB, 28));

            prevButton.click();
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 28));
        });

        it('should go to previous and next year', () => {
            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('multi-year');
            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));

            (calendarElement.querySelector('.nx-calendar-body-active') as HTMLElement).click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('year');

            nextButton.click();
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2018, JAN, 31));

            prevButton.click();
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));
        });

        it('should go to previous and next multi-year range', () => {
            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('multi-year');
            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));

            nextButton.click();
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2017 + yearsPerPage, JAN, 31));

            prevButton.click();
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));
        });

        it('should go back to month view after selecting year and month', () => {
            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('multi-year');
            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));

            const yearCells = calendarElement.querySelectorAll('.nx-calendar-body-cell');
            (yearCells[0] as HTMLElement).click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('year');
            expect(calendarInstance._activeDate).toEqual(new Date(2000, JAN, 31));

            const monthCells = calendarElement.querySelectorAll('.nx-calendar-body-cell');
            (monthCells[monthCells.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('month');
            expect(calendarInstance._activeDate).toEqual(new Date(2000, DEC, 31));
            expect(testComponent.selected).withContext('no date should be selected yet').toBeFalsy();
        });

        it('should select date in month view', () => {
            const monthCells = calendarElement.querySelectorAll('.nx-calendar-body-cell');
            (monthCells[monthCells.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('month');
            expect(testComponent.selected).toEqual(new Date(2017, JAN, 31));
        });

        it('should emit the selected month on cell clicked in year view', () => {
            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('multi-year');
            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));

            (calendarElement.querySelector('.nx-calendar-body-active') as HTMLElement).click();

            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('year');

            (calendarElement.querySelector('.nx-calendar-body-active') as HTMLElement).click();

            const normalizedMonth: Date = fixture.componentInstance.selectedMonth;
            expect(normalizedMonth.getMonth()).toBe(0);
        });

        it('should emit the selected year on cell clicked in multiyear view', () => {
            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance._currentView).toBe('multi-year');
            expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));

            (calendarElement.querySelector('.nx-calendar-body-active') as HTMLElement).click();

            fixture.detectChanges();

            const normalizedYear: Date = fixture.componentInstance.selectedYear;
            expect(normalizedYear.getFullYear()).toBe(2017);
        });

        it('should re-render when the i18n labels have changed', inject([NxDatepickerIntl], (intl: NxDatepickerIntl) => {
            const button = fixture.debugElement.nativeElement.querySelector('.nx-calendar-change-view-button');

            intl.switchToMultiYearViewLabel = 'Go to multi-year view?';
            intl.changes.next();
            fixture.detectChanges();

            expect(button.getAttribute('aria-label')).toBe('Go to multi-year view?');
        }));

        describe('a11y', () => {
            describe('calendar body', () => {
                let calendarBodyEl: HTMLElement;

                beforeEach(() => {
                    calendarBodyEl = calendarElement.querySelector('.nx-calendar-content') as HTMLElement;
                    dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });

                it('should initially set start date active', () => {
                    expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 31));
                });

                it('should make the calendar body focusable', () => {
                    expect(calendarBodyEl.getAttribute('tabindex')).toBe('-1');
                });

                describe('year view', () => {
                    beforeEach(() => {
                        dispatchMouseEvent(periodButton, 'click');
                        fixture.detectChanges();

                        (calendarBodyEl.querySelector('.nx-calendar-body-active') as HTMLElement).click();
                        fixture.detectChanges();
                    });

                    it('should set current view to year', () => {
                        expect(calendarInstance._currentView).toBe('year');
                    });

                    it('should return to month view on enter', () => {
                        const tableBodyEl = calendarBodyEl.querySelector('.nx-calendar-body') as HTMLElement;

                        dispatchKeyboardEvent(tableBodyEl, 'keydown', RIGHT_ARROW);
                        fixture.detectChanges();

                        dispatchKeyboardEvent(tableBodyEl, 'keydown', ENTER);
                        fixture.detectChanges();

                        expect(calendarInstance._currentView).toBe('month');
                        expect(calendarInstance._activeDate).toEqual(new Date(2017, FEB, 28));
                        expect(testComponent.selected).toBeUndefined();
                    });
                });

                describe('multi-year view', () => {
                    beforeEach(() => {
                        dispatchMouseEvent(periodButton, 'click');
                        fixture.detectChanges();
                    });

                    it('should set current view to multi-year', () => {
                        expect(calendarInstance._currentView).toBe('multi-year');
                    });

                    it('should go to year view on enter', () => {
                        const tableBodyEl = calendarBodyEl.querySelector('.nx-calendar-body') as HTMLElement;

                        dispatchKeyboardEvent(tableBodyEl, 'keydown', RIGHT_ARROW);
                        fixture.detectChanges();

                        dispatchKeyboardEvent(tableBodyEl, 'keydown', ENTER);
                        fixture.detectChanges();

                        expect(calendarInstance._currentView).toBe('year');
                        expect(calendarInstance._activeDate).toEqual(new Date(2018, JAN, 31));
                        expect(testComponent.selected).toBeUndefined();
                    });
                });
            });
        });
    });

    describe('calendar with min and max date', () => {
        let fixture: ComponentFixture<CalendarWithMinMax>;
        let testComponent: CalendarWithMinMax;
        let calendarElement: HTMLElement;
        let calendarInstance: NxCalendarComponent<Date>;

        beforeEach(() => {
            fixture = TestBed.createComponent(CalendarWithMinMax);

            const calendarDebugElement = fixture.debugElement.query(By.directive(NxCalendarComponent));
            calendarElement = calendarDebugElement.nativeElement;
            calendarInstance = calendarDebugElement.componentInstance;
            testComponent = fixture.componentInstance;
        });

        it('should clamp startAt value below min date', () => {
            testComponent.startAt = new Date(2000, JAN, 1);
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2016, JAN, 1));
        });

        it('should clamp startAt value above max date', () => {
            testComponent.startAt = new Date(2020, JAN, 1);
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2018, JAN, 1));
        });

        it('should not go back past min date', () => {
            testComponent.startAt = new Date(2016, FEB, 1);
            fixture.detectChanges();

            const prevButton = calendarElement.querySelector('.nx-calendar-previous-button') as HTMLButtonElement;

            expect(prevButton.disabled).withContext('previous button should not be disabled').toBeFalse();
            expect(calendarInstance._activeDate).toEqual(new Date(2016, FEB, 1));

            prevButton.click();
            fixture.detectChanges();

            expect(prevButton.disabled).withContext('previous button should be disabled').toBeTrue();
            expect(calendarInstance._activeDate).toEqual(new Date(2016, JAN, 1));

            prevButton.click();
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2016, JAN, 1));
        });

        it('should not go forward past max date', () => {
            testComponent.startAt = new Date(2017, DEC, 1);
            fixture.detectChanges();

            const nextButton = calendarElement.querySelector('.nx-calendar-next-button') as HTMLButtonElement;

            expect(nextButton.disabled).withContext('next button should not be disabled').toBeFalse();
            expect(calendarInstance._activeDate).toEqual(new Date(2017, DEC, 1));

            nextButton.click();
            fixture.detectChanges();

            expect(nextButton.disabled).withContext('next button should be disabled').toBeTrue();
            expect(calendarInstance._activeDate).toEqual(new Date(2018, JAN, 1));

            nextButton.click();
            fixture.detectChanges();

            expect(calendarInstance._activeDate).toEqual(new Date(2018, JAN, 1));
        });

        it('should re-render the month view when the minDate changes', () => {
            fixture.detectChanges();
            spyOn(calendarInstance.monthView, '_init').and.callThrough();

            testComponent.minDate = new Date(2017, NOV, 1);
            fixture.detectChanges();

            expect(calendarInstance.monthView._init).toHaveBeenCalled();
        });

        it('should re-render the month view when the maxDate changes', () => {
            fixture.detectChanges();
            spyOn(calendarInstance.monthView, '_init').and.callThrough();

            testComponent.maxDate = new Date(2017, DEC, 1);
            fixture.detectChanges();

            expect(calendarInstance.monthView._init).toHaveBeenCalled();
        });

        it('should re-render the year view when the minDate changes', () => {
            fixture.detectChanges();
            const periodButton = calendarElement.querySelector('.nx-calendar-change-view-button') as HTMLElement;
            periodButton.click();
            fixture.detectChanges();

            (calendarElement.querySelector('.nx-calendar-body-active') as HTMLElement).click();
            fixture.detectChanges();

            spyOn(calendarInstance.yearView, '_init').and.callThrough();

            testComponent.minDate = new Date(2017, NOV, 1);
            fixture.detectChanges();

            expect(calendarInstance.yearView._init).toHaveBeenCalled();
        });

        it('should re-render the year view when the maxDate changes', () => {
            fixture.detectChanges();
            const periodButton = calendarElement.querySelector('.nx-calendar-change-view-button') as HTMLElement;
            periodButton.click();
            fixture.detectChanges();

            (calendarElement.querySelector('.nx-calendar-body-active') as HTMLElement).click();
            fixture.detectChanges();

            spyOn(calendarInstance.yearView, '_init').and.callThrough();

            testComponent.maxDate = new Date(2017, DEC, 1);
            fixture.detectChanges();

            expect(calendarInstance.yearView._init).toHaveBeenCalled();
        });

        it('should re-render the multi-year view when the minDate changes', () => {
            fixture.detectChanges();
            const periodButton = calendarElement.querySelector('.nx-calendar-change-view-button') as HTMLElement;
            periodButton.click();
            fixture.detectChanges();

            spyOn(calendarInstance.multiYearView, '_init').and.callThrough();

            testComponent.minDate = new Date(2017, NOV, 1);
            fixture.detectChanges();

            expect(calendarInstance.multiYearView._init).toHaveBeenCalled();
        });

        it('should re-render the multi-year view when the maxDate changes', () => {
            fixture.detectChanges();
            const periodButton = calendarElement.querySelector('.nx-calendar-change-view-button') as HTMLElement;
            periodButton.click();
            fixture.detectChanges();

            spyOn(calendarInstance.multiYearView, '_init').and.callThrough();

            testComponent.maxDate = new Date(2017, DEC, 1);
            fixture.detectChanges();

            expect(calendarInstance.multiYearView._init).toHaveBeenCalled();
        });
    });

    describe('calendar with date filter', () => {
        let fixture: ComponentFixture<CalendarWithDateFilter>;
        let testComponent: CalendarWithDateFilter;
        let calendarElement: HTMLElement;
        let calendarInstance: NxCalendarComponent<Date>;

        beforeEach(() => {
            fixture = TestBed.createComponent(CalendarWithDateFilter);
            fixture.detectChanges();

            const calendarDebugElement = fixture.debugElement.query(By.directive(NxCalendarComponent));
            calendarElement = calendarDebugElement.nativeElement;
            calendarInstance = calendarDebugElement.componentInstance;
            testComponent = fixture.componentInstance;
        });

        it('should disable and prevent selection of filtered dates', () => {
            const cells = calendarElement.querySelectorAll('.nx-calendar-body-cell');
            (cells[0] as HTMLElement).click();
            fixture.detectChanges();

            expect(testComponent.selected).toBeFalsy();

            (cells[1] as HTMLElement).click();
            fixture.detectChanges();

            expect(testComponent.selected).toEqual(new Date(2017, JAN, 2));
        });

        describe('a11y', () => {
            let tableBodyEl: HTMLElement;

            beforeEach(() => {
                tableBodyEl = calendarElement.querySelector('.nx-calendar-body') as HTMLElement;

                dispatchFakeEvent(tableBodyEl, 'focus');
                fixture.detectChanges();
            });

            it('should not allow selection of disabled date in month view', () => {
                expect(calendarInstance._currentView).toBe('month');
                expect(calendarInstance._activeDate).toEqual(new Date(2017, JAN, 1));

                dispatchKeyboardEvent(tableBodyEl, 'keydown', ENTER);
                fixture.detectChanges();

                expect(testComponent.selected).toBeUndefined();
            });

            it('should allow entering month view at disabled month', () => {
                const periodButton = calendarElement.querySelector('.nx-calendar-change-view-button') as HTMLElement;
                dispatchMouseEvent(periodButton, 'click');
                fixture.detectChanges();

                (calendarElement.querySelector('.nx-calendar-body-active') as HTMLElement).click();
                fixture.detectChanges();

                calendarInstance._activeDate = new Date(2017, NOV, 1);
                fixture.detectChanges();

                expect(calendarInstance._currentView).toBe('year');

                tableBodyEl = calendarElement.querySelector('.nx-calendar-body') as HTMLElement;
                dispatchKeyboardEvent(tableBodyEl, 'keydown', ENTER);
                fixture.detectChanges();

                expect(calendarInstance._currentView).toBe('month');
                expect(testComponent.selected).toBeUndefined();
            });
        });
    });
});

@Component({
    template: `<nx-calendar [startAt]="startDate" [(selected)]="selected" (yearSelected)="selectedYear = $event" (monthSelected)="selectedMonth = $event">
    </nx-calendar>`,
})
class StandardCalendar {
    selected!: Date;
    selectedYear!: Date;
    selectedMonth!: Date;
    startDate = new Date(2017, JAN, 31);
}

@Component({
    template: `<nx-calendar [startAt]="startAt" [minDate]="minDate" [maxDate]="maxDate"></nx-calendar>`,
})
class CalendarWithMinMax {
    startAt!: Date;
    minDate = new Date(2016, JAN, 1);
    maxDate = new Date(2018, JAN, 1);
}

@Component({
    template: `<nx-calendar [startAt]="startDate" [(selected)]="selected" [dateFilter]="dateFilter"> </nx-calendar>`,
})
class CalendarWithDateFilter {
    selected!: Date;
    startDate = new Date(2017, JAN, 1);

    dateFilter(date: Date) {
        return !(date.getDate() % 2) && date.getMonth() !== NOV;
    }
}
