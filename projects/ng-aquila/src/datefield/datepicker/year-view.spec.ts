import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NxDateAdapter, NxNativeDateAdapter, NxNativeDateModule } from '@aposin/ng-aquila/datefield';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../../cdk-test-utils';
import { NxCalendarBodyComponent } from './calendar-body';
import { NxYearViewComponent } from './year-view';

const JAN = 0;
const FEB = 1;
const MAR = 2;
const APR = 3;
const MAY = 4;
const JUN = 5;
const JUL = 6;
const AUG = 7;
const SEP = 8;
const OCT = 9;
const NOV = 10;
const DEC = 11;

describe('NxYearView', () => {
    let dir: { value: Direction };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxNativeDateModule],
            declarations: [
                NxCalendarBodyComponent,
                NxYearViewComponent,

                // Test components.
                StandardYearView,
                YearViewWithDateFilter,
            ],
            providers: [{ provide: Directionality, useFactory: () => (dir = { value: 'ltr' }) }],
        });

        TestBed.compileComponents();
    }));

    describe('standard year view', () => {
        let fixture: ComponentFixture<StandardYearView>;
        let testComponent: StandardYearView;
        let yearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardYearView);
            fixture.detectChanges();

            const yearViewDebugElement = fixture.debugElement.query(By.directive(NxYearViewComponent));
            yearViewNativeElement = yearViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });

        it('has 12 months', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            expect(cellEls).toHaveSize(12);
        });

        it('shows selected month if in same year', () => {
            const selectedEl = yearViewNativeElement.querySelector('.nx-calendar-body-selected');
            expect(selectedEl!.innerHTML.trim()).toBe('Mar');
        });

        it('does not show selected month if in different year', () => {
            testComponent.selected = new Date(2016, MAR, 10);
            fixture.detectChanges();

            const selectedEl = yearViewNativeElement.querySelector('.nx-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });

        it('fires selected change event on cell clicked', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const selectedEl = yearViewNativeElement.querySelector('.nx-calendar-body-selected');
            expect(selectedEl!.innerHTML.trim()).toBe('Dec');
        });

        it('should emit the selected month on cell clicked', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');

            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const normalizedMonth: Date = fixture.componentInstance.selectedMonth;

            expect(normalizedMonth.getMonth()).toBe(11);
        });

        it('should mark active date', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            expect((cellEls[0] as HTMLElement).innerText.trim()).toBe('Jan');
            expect(cellEls[0]).toHaveClass('nx-calendar-body-active');
        });

        it('should allow selection of month with less days than current active date', inject([NxDateAdapter], (adapter: NxNativeDateAdapter) => {
            testComponent.date = new Date(2017, JUL, 31);
            fixture.detectChanges();

            testComponent.yearView._monthSelected(JUN);
            fixture.detectChanges();

            expect(adapter.sameDate(testComponent.selected, new Date(2017, JUN, 30))).toBeTruthy();
            // expect(testComponent.selected).toEqual(new Date(2017, JUN, 30));
        }));

        describe('a11y', () => {
            describe('calendar body', () => {
                let calendarBodyEl: HTMLElement;
                let calendarInstance: StandardYearView;
                let adapter: NxDateAdapter<Date>;

                beforeEach(inject([NxDateAdapter], (dateAdapter: NxNativeDateAdapter) => {
                    adapter = dateAdapter;
                }));

                const activeDateEquals = (year: any, month: any, day: any) => {
                    expect(adapter.sameDate(calendarInstance.date, new Date(year, month, day))).toBeTruthy();
                };

                beforeEach(() => {
                    calendarInstance = fixture.componentInstance;
                    calendarBodyEl = fixture.debugElement.nativeElement.querySelector('.nx-calendar-body') as HTMLElement;
                    dir.value = 'ltr';
                    fixture.componentInstance.date = new Date(2017, JAN, 5);
                    dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });

                it('should decrement month on left arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2016, DEC, 5);
                    expect(adapter.sameDate(calendarInstance.date, new Date(2016, DEC, 5))).toBeTruthy();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    expect(adapter.sameDate(calendarInstance.date, new Date(2016, NOV, 5))).toBeTruthy();
                });

                it('should increment month on left arrow press in rtl', () => {
                    dir.value = 'rtl';

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017, FEB, 5);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017, MAR, 5);
                });

                it('should increment month on right arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017, FEB, 5);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017, MAR, 5);
                });

                it('should decrement month on right arrow press in rtl', () => {
                    dir.value = 'rtl';

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2016, DEC, 5);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2016, NOV, 5);
                });

                it('should go up a row on up arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2016, OCT, 5);

                    calendarInstance.date = new Date(2017, AUG, 1);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017, MAY, 1);

                    calendarInstance.date = new Date(2017, DEC, 10);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017, SEP, 10);
                });

                it('should go down a row on down arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017, APR, 5);

                    calendarInstance.date = new Date(2017, MAY, 1);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017, AUG, 1);

                    calendarInstance.date = new Date(2017, OCT, 30);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2018, JAN, 30);
                });

                it('should go to first month of the year on home press', () => {
                    calendarInstance.date = new Date(2017, SEP, 30);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
                    fixture.detectChanges();

                    activeDateEquals(2017, JAN, 30);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
                    fixture.detectChanges();

                    activeDateEquals(2017, JAN, 30);
                });

                it('should go to last month of the year on end press', () => {
                    calendarInstance.date = new Date(2017, OCT, 31);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
                    fixture.detectChanges();

                    activeDateEquals(2017, DEC, 31);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
                    fixture.detectChanges();

                    activeDateEquals(2017, DEC, 31);
                });

                it('should go back one year on page up press', () => {
                    calendarInstance.date = new Date(2016, FEB, 29);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
                    fixture.detectChanges();

                    activeDateEquals(2015, FEB, 28);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
                    fixture.detectChanges();

                    activeDateEquals(2014, FEB, 28);
                });

                it('should go forward one year on page down press', () => {
                    calendarInstance.date = new Date(2016, FEB, 29);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
                    fixture.detectChanges();

                    activeDateEquals(2017, FEB, 28);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
                    fixture.detectChanges();

                    activeDateEquals(2018, FEB, 28);
                });
            });
        });
    });

    describe('year view with date filter', () => {
        let fixture: ComponentFixture<YearViewWithDateFilter>;
        let yearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(YearViewWithDateFilter);
            fixture.detectChanges();

            const yearViewDebugElement = fixture.debugElement.query(By.directive(NxYearViewComponent));
            yearViewNativeElement = yearViewDebugElement.nativeElement;
        });

        it('should disable months with no enabled days', () => {
            const cells = yearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            expect(cells[0]).not.toHaveClass('nx-calendar-body-disabled');
            expect(cells[1]).toHaveClass('nx-calendar-body-disabled');
        });
    });
});

@Component({
    template: `<nx-year-view [(activeDate)]="date" [(selected)]="selected" (monthSelected)="selectedMonth = $event"></nx-year-view>`,
})
class StandardYearView {
    date = new Date(2017, JAN, 5);
    selected = new Date(2017, MAR, 10);
    selectedMonth!: Date;

    @ViewChild(NxYearViewComponent) yearView!: NxYearViewComponent<Date>;
}

@Component({
    template: `<nx-year-view [(activeDate)]="activeDate" [dateFilter]="dateFilter"></nx-year-view>`,
})
class YearViewWithDateFilter {
    activeDate = new Date(2017, JAN, 1);
    dateFilter(date: Date) {
        if (date.getMonth() === JAN) {
            return date.getDate() === 10;
        }
        if (date.getMonth() === FEB) {
            return false;
        }
        return true;
    }
}
