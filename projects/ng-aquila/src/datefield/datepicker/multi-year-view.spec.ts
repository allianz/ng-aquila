import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchKeyboardEvent, JAN } from '../../cdk-test-utils';
import { NxNativeDateModule } from '../adapter';
import { NxCalendarBodyComponent } from './calendar-body';
import { NxMultiYearViewComponent, yearsPerPage, yearsPerRow } from './multi-year-view';

describe('NxMultiYearView', () => {
    let dir: { value: Direction };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxNativeDateModule],
            declarations: [
                NxCalendarBodyComponent,
                NxMultiYearViewComponent,

                // Test components.
                StandardMultiYearView,
                MultiYearViewWithDateFilter,
            ],
            providers: [{ provide: Directionality, useFactory: () => (dir = { value: 'ltr' }) }],
        });

        TestBed.compileComponents();
    }));

    describe('standard multi-year view', () => {
        let fixture: ComponentFixture<StandardMultiYearView>;
        let testComponent: StandardMultiYearView;
        let multiYearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardMultiYearView);
            fixture.detectChanges();

            const multiYearViewDebugElement = fixture.debugElement.query(By.directive(NxMultiYearViewComponent));
            multiYearViewNativeElement = multiYearViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });

        it('has correct number of years', () => {
            const cellEls = multiYearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            expect(cellEls).toHaveSize(yearsPerPage);
        });

        it('does not show selected year if in different range', () => {
            testComponent.selected = new Date(2040, JAN, 10);
            fixture.detectChanges();

            const selectedEl = multiYearViewNativeElement.querySelector('.nx-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });

        it('fires selected change event on cell clicked', () => {
            const cellEls = multiYearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const selectedEl = multiYearViewNativeElement.querySelector('.nx-calendar-body-selected');
            expect(selectedEl!.innerHTML.trim()).toBe('2019');
        });

        it('should emit the selected year on cell clicked', () => {
            const cellEls = multiYearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');

            (cellEls[1] as HTMLElement).click();
            fixture.detectChanges();

            const normalizedYear: Date = fixture.componentInstance.selectedYear;
            expect(normalizedYear.getFullYear()).toBe(2001);
        });

        it('should mark active date', () => {
            const cellEls = multiYearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');

            expect((cellEls[cellEls.length - 3] as HTMLElement).innerText.trim()).toBe('2017');
            expect(cellEls[cellEls.length - 3]).toHaveClass('nx-calendar-body-active');
        });

        describe('a11y', () => {
            describe('calendar body', () => {
                let calendarBodyEl: HTMLElement;
                let calendarInstance: StandardMultiYearView;

                beforeEach(() => {
                    calendarInstance = fixture.componentInstance;
                    calendarBodyEl = fixture.debugElement.nativeElement.querySelector('.nx-calendar-body') as HTMLElement;
                    dir.value = 'ltr';
                    fixture.componentInstance.date = new Date(2017, JAN, 1);
                    dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });

                const activeDateEquals = (year: any, month: any, day: any) => {
                    expect(calendarInstance.date).toEqual(new Date(year, month, day));
                };

                it('should decrement year on left arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2016, JAN, 1);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2015, JAN, 1);
                });

                it('should increment year on right arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2018, JAN, 1);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2019, JAN, 1);
                });

                it('should go up a row on up arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017 - yearsPerRow, JAN, 1);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017 - yearsPerRow * 2, JAN, 1);
                });

                it('should go down a row on down arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017 + yearsPerRow, JAN, 1);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();

                    activeDateEquals(2017 + yearsPerRow * 2, JAN, 1);
                });

                it('should go to first year in current range on home press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
                    fixture.detectChanges();

                    activeDateEquals(2000, JAN, 1);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
                    fixture.detectChanges();

                    activeDateEquals(2000, JAN, 1);
                });

                it('should go to last year in current range on end press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
                    fixture.detectChanges();

                    activeDateEquals(2019, JAN, 1);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
                    fixture.detectChanges();

                    activeDateEquals(2019, JAN, 1);
                });

                it('should go to same index in previous year range page up press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
                    fixture.detectChanges();

                    activeDateEquals(2017 - yearsPerPage, JAN, 1);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
                    fixture.detectChanges();

                    activeDateEquals(2017 - yearsPerPage * 2, JAN, 1);
                });

                it('should go to same index in next year range on page down press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
                    fixture.detectChanges();

                    activeDateEquals(2017 + yearsPerPage, JAN, 1);

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
                    fixture.detectChanges();

                    activeDateEquals(2017 + yearsPerPage * 2, JAN, 1);
                });
            });
        });
    });

    describe('multi year view with date filter', () => {
        let fixture: ComponentFixture<MultiYearViewWithDateFilter>;
        let multiYearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(MultiYearViewWithDateFilter);
            fixture.detectChanges();

            const multiYearViewDebugElement = fixture.debugElement.query(By.directive(NxMultiYearViewComponent));
            multiYearViewNativeElement = multiYearViewDebugElement.nativeElement;
        });

        it('should disable years with no enabled days', () => {
            const cells = multiYearViewNativeElement.querySelectorAll('.nx-calendar-body-cell');
            expect(cells[0]).not.toHaveClass('nx-calendar-body-disabled');
            expect(cells[1]).toHaveClass('nx-calendar-body-disabled');
        });
    });
});

@Component({
    template: `<nx-multi-year-view [(activeDate)]="date" [(selected)]="selected" (yearSelected)="selectedYear = $event"></nx-multi-year-view>`,
})
class StandardMultiYearView {
    date = new Date(2017, JAN, 1);
    selected = new Date(2020, JAN, 1);
    selectedYear!: Date;

    @ViewChild(NxMultiYearViewComponent) multiYearView!: NxMultiYearViewComponent<Date>;
}

@Component({
    template: `<nx-multi-year-view [(activeDate)]="activeDate" [dateFilter]="dateFilter"></nx-multi-year-view>`,
})
class MultiYearViewWithDateFilter {
    activeDate = new Date(2001, JAN, 1);
    dateFilter(date: Date) {
        return date.getFullYear() !== 2001;
    }
}
