import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NxDateAdapter, NxNativeDateModule } from '@aposin/ng-aquila/datefield';

import { APR, AUG, DEC, dispatchFakeEvent, dispatchKeyboardEvent, FEB, JAN, JUN, MAR, MAY, NOV, SEP } from '../../cdk-test-utils';
import { NxNativeDateAdapter } from '../adapter/native-date-adapter';
import { NxCalendarBodyComponent, NxCalendarCell } from './calendar-body';
import { NxMonthViewComponent } from './month-view';

describe('NxMonthView', () => {
    let dir: { value: Direction };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxNativeDateModule],
            declarations: [
                NxCalendarBodyComponent,
                NxMonthViewComponent,

                // Test components.
                StandardMonthView,
                MonthViewWithDateFilter,
            ],
            providers: [{ provide: Directionality, useFactory: () => (dir = { value: 'ltr' }) }],
        });

        TestBed.compileComponents();
    }));

    function assertAdjacentCells(cells: NxCalendarCell[], assertValues: number[]) {
        expect(cells).toHaveSize(assertValues.length);

        for (let i = 0; i < cells.length; i++) {
            expect(cells[i].value).toBe(assertValues[i]);
            expect(cells[i].displayValue).toBe(String(assertValues[i]));
            expect(cells[i].ariaLabel).toBeDefined();
            expect(cells[i].enabled).toBeTrue();
        }
    }

    describe('standard month view', () => {
        let fixture: ComponentFixture<StandardMonthView>;
        let testComponent: StandardMonthView;
        let monthViewNativeElement: Element;
        let monthViewInstance: NxMonthViewComponent<Date>;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardMonthView);
            fixture.detectChanges();

            const monthViewDebugElement = fixture.debugElement.query(By.directive(NxMonthViewComponent));
            monthViewNativeElement = monthViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
            monthViewInstance = testComponent.monthView;
        });

        it('has 31 days', () => {
            const cellEls = monthViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            expect(cellEls).toHaveSize(31);
        });

        it('shows selected date if in same month', () => {
            const selectedEl = monthViewNativeElement.querySelector('.nx-calendar-body-selected');
            expect(selectedEl!.innerHTML.trim()).toBe('10');
        });

        it('does not show selected date if in different month', () => {
            testComponent.selected = new Date(2017, MAR, 10);
            fixture.detectChanges();

            const selectedEl = monthViewNativeElement.querySelector('.nx-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });

        it('fires selected change event on cell clicked', () => {
            const cellEls = monthViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const selectedEl = monthViewNativeElement.querySelector('.nx-calendar-body-selected');
            expect(selectedEl!.innerHTML.trim()).toBe('31');
        });

        it('fires previous selected change on previous cell clicked', () => {
            testComponent.activeDate = new Date(2019, MAY, 10);
            fixture.detectChanges();

            // adjacent cells:
            // previous: 28 29 30 (APR)
            // following: 1 2 3 4 5 6 7 8 (JUN)
            const adjacentCells = monthViewNativeElement.querySelectorAll('.nx-calendar-adjacent-cell');
            (adjacentCells[1] as HTMLElement).click(); // click 29 APR
            fixture.detectChanges();

            expect(testComponent.selected).toEqual(new Date(2019, APR, 29));
        });

        it('selects correct date when previous cell is in previous year', () => {
            testComponent.activeDate = new Date(2020, JAN, 10);
            fixture.detectChanges();

            // adjacent cells:
            // previous: 29 30 31 (DEC 2019)
            const adjacentCells = monthViewNativeElement.querySelectorAll('.nx-calendar-adjacent-cell');
            (adjacentCells[1] as HTMLElement).click(); // click 30 DEC
            fixture.detectChanges();

            expect(testComponent.selected).toEqual(new Date(2019, DEC, 30));
        });

        it('fires following selected change on following cell clicked', () => {
            testComponent.activeDate = new Date(2019, MAY, 10);
            fixture.detectChanges();

            // adjacent cells:
            // previous: 28 29 30 (APR)
            // following:
            //    1 (JUN) (first row)
            //    2 3 4 5 6 7 8 (JUN) (second row)

            let adjacentCells = monthViewNativeElement.querySelectorAll('.nx-calendar-adjacent-cell');
            (adjacentCells[adjacentCells.length - 8] as HTMLElement).click(); // click 1 JUN
            fixture.detectChanges();

            expect(testComponent.selected).toEqual(new Date(2019, JUN, 1));

            testComponent.activeDate = new Date(2019, MAY, 10);
            fixture.detectChanges();

            adjacentCells = monthViewNativeElement.querySelectorAll('.nx-calendar-adjacent-cell');
            (adjacentCells[adjacentCells.length - 1] as HTMLElement).click(); // click 8 JUN
            fixture.detectChanges();

            expect(testComponent.selected).toEqual(new Date(2019, JUN, 8));
        });

        it('selects correct date when following cell is in next year', () => {
            testComponent.activeDate = new Date(2020, DEC, 10);
            fixture.detectChanges();

            // adjacent cells:
            // previous: 29 30 (NOV)
            // following:
            //    1 2 (JAN) (first row)
            //    3 4 5 6 7 8 9 (JAN) (second row)

            let adjacentCells = monthViewNativeElement.querySelectorAll('.nx-calendar-adjacent-cell');
            (adjacentCells[adjacentCells.length - 8] as HTMLElement).click(); // click 2 JAN
            fixture.detectChanges();

            expect(testComponent.selected).toEqual(new Date(2021, JAN, 2));

            testComponent.activeDate = new Date(2020, DEC, 10);
            fixture.detectChanges();

            adjacentCells = monthViewNativeElement.querySelectorAll('.nx-calendar-adjacent-cell');
            (adjacentCells[adjacentCells.length - 1] as HTMLElement).click(); // click 9 JAN
            fixture.detectChanges();

            expect(testComponent.selected).toEqual(new Date(2021, JAN, 9));
        });

        it('should mark active date', () => {
            const cellEls = monthViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            expect((cellEls[4] as HTMLElement).innerText.trim()).toBe('5');
            expect(cellEls[4]).toHaveClass('nx-calendar-body-active');
        });

        it('should return the correct number of previous items', () => {
            testComponent.activeDate = new Date(2019, FEB, 10);
            fixture.detectChanges();
            expect(monthViewInstance._firstWeekOffset).toBe(5);
            let previousItems = monthViewInstance._getLastDaysOfPreviousMonth();
            assertAdjacentCells(previousItems, [27, 28, 29, 30, 31]);

            testComponent.activeDate = new Date(2019, SEP, 10);
            fixture.detectChanges();
            previousItems = monthViewInstance._getLastDaysOfPreviousMonth();
            expect(previousItems).toHaveSize(0);
        });

        it('should return the correct number of following items', () => {
            testComponent.activeDate = new Date(2019, MAR, 16);
            fixture.detectChanges();
            let followingItems = monthViewInstance._getFirstDaysOfFollowingMonth();
            expect(followingItems).toHaveSize(1);
            assertAdjacentCells(followingItems[0], [1, 2, 3, 4, 5, 6]);

            testComponent.activeDate = new Date(2019, MAY, 16);
            fixture.detectChanges();
            followingItems = monthViewInstance._getFirstDaysOfFollowingMonth();
            expect(followingItems).toHaveSize(2);
            assertAdjacentCells(followingItems[0], [1]);
            assertAdjacentCells(followingItems[1], [2, 3, 4, 5, 6, 7, 8]);

            testComponent.activeDate = new Date(2019, AUG, 16);
            fixture.detectChanges();
            followingItems = monthViewInstance._getFirstDaysOfFollowingMonth();
            expect(followingItems).toHaveSize(1);
            assertAdjacentCells(followingItems[0], [1, 2, 3, 4, 5, 6, 7]);

            testComponent.activeDate = new Date(2015, FEB, 16);
            fixture.detectChanges();
            followingItems = monthViewInstance._getFirstDaysOfFollowingMonth();
            expect(followingItems).toHaveSize(2);
            assertAdjacentCells(followingItems[0], [1, 2, 3, 4, 5, 6, 7]);
            assertAdjacentCells(followingItems[1], [8, 9, 10, 11, 12, 13, 14]);
        });

        it('should return a correct row of days', () => {
            let date = new Date(2019, FEB, 1);
            let row = monthViewInstance._getRowOfDays(date, 7);
            assertAdjacentCells(row, [1, 2, 3, 4, 5, 6, 7]);

            date = new Date(2019, JAN, 29);
            row = monthViewInstance._getRowOfDays(date, 5);
            assertAdjacentCells(row, [29, 30, 31, 1, 2]);
        });

        describe('a11y', () => {
            describe('calendar body', () => {
                let calendarBodyEl: HTMLElement;
                let calendarInstance: StandardMonthView;
                let adapter: NxDateAdapter<Date>;

                beforeEach(inject([NxDateAdapter], (dateAdapter: NxNativeDateAdapter) => {
                    adapter = dateAdapter;
                }));

                const activeDateEquals = (year: number, month: number, day: number, activeDate?: Date) => {
                    expect(adapter.sameDate(activeDate ? activeDate : calendarInstance.activeDate, new Date(year, month, day))).toBeTruthy();
                };

                beforeEach(() => {
                    calendarInstance = fixture.componentInstance;
                    calendarBodyEl = fixture.debugElement.nativeElement.querySelector('.nx-calendar-body') as HTMLElement;
                    dir.value = 'ltr';
                    fixture.componentInstance.activeDate = new Date(2017, JAN, 5);
                    dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });

                it('should decrement date on left arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 4);

                    calendarInstance.activeDate = new Date(2017, JAN, 1);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2016, DEC, 31);
                });

                it('should increment date on left arrow press in rtl', () => {
                    dir.value = 'rtl';

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 6);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 7);
                });

                it('should increment date on right arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 6);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 7);
                });

                it('should decrement date on right arrow press in rtl', () => {
                    dir.value = 'rtl';

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 4);

                    calendarInstance.activeDate = new Date(2017, JAN, 1);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2016, DEC, 31);
                });

                it('should go up a row on up arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2016, DEC, 29);

                    calendarInstance.activeDate = new Date(2017, JAN, 7);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2016, DEC, 31);
                });

                it('should go down a row on down arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 12);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 19);
                });

                it('should go to beginning of the month on home press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 1);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 1);
                });

                it('should go to end of the month on end press', () => {
                    calendarInstance.activeDate = new Date(2017, JAN, 10);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 31);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 31);
                });

                it('should go back one month on page up press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
                    fixture.detectChanges();
                    activeDateEquals(2016, DEC, 5);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
                    fixture.detectChanges();
                    activeDateEquals(2016, NOV, 5);
                });

                it('should go forward one month on page down press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
                    fixture.detectChanges();
                    activeDateEquals(2017, FEB, 5);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
                    fixture.detectChanges();
                    activeDateEquals(2017, MAR, 5);
                });

                it('should select active date on enter', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 10, testComponent.selected);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', ENTER);
                    fixture.detectChanges();
                    activeDateEquals(2017, JAN, 4, testComponent.selected);
                });
            });
        });
    });

    describe('month view with date filter', () => {
        let fixture: ComponentFixture<MonthViewWithDateFilter>;
        let monthViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(MonthViewWithDateFilter);
            fixture.detectChanges();

            const monthViewDebugElement = fixture.debugElement.query(By.directive(NxMonthViewComponent));
            monthViewNativeElement = monthViewDebugElement.nativeElement;
        });

        it('should disable filtered dates', () => {
            const cells = monthViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            expect(cells[0]).toHaveClass('nx-calendar-body-disabled');
            expect(cells[1]).not.toHaveClass('nx-calendar-body-disabled');
        });
    });
});

@Component({
    template: `<nx-month-view [(activeDate)]="activeDate" [(selected)]="selected"></nx-month-view>`,
})
class StandardMonthView {
    @ViewChild(NxMonthViewComponent) monthView!: NxMonthViewComponent<Date>;
    activeDate = new Date(2017, JAN, 5);
    selected = new Date(2017, JAN, 10);
}

@Component({
    template: `<nx-month-view [activeDate]="activeDate" [dateFilter]="dateFilter"></nx-month-view>`,
})
class MonthViewWithDateFilter {
    activeDate = new Date(2017, JAN, 1);
    dateFilter(date: Date) {
        return date.getDate() % 2 === 0;
    }
}
