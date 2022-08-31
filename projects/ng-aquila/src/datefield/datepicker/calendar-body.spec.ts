import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxCalendarBodyComponent, NxCalendarCell } from './calendar-body';

describe('NxCalendarBodyComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                NxCalendarBodyComponent,

                // Test components.
                StandardCalendarBody,
                CalendarBodyWithDisabledCells,
                CalendarBodyWithPreviousAndFollowingCells,
            ],
        });

        TestBed.compileComponents();
    }));

    describe('standard calendar body', () => {
        let fixture: ComponentFixture<StandardCalendarBody>;
        let testComponent: StandardCalendarBody;
        let calendarBodyNativeElement: Element;
        let rowEls: NodeListOf<Element>;
        let cellEls: NodeListOf<Element>;

        const refreshElementLists = () => {
            rowEls = calendarBodyNativeElement.querySelectorAll('tr');
            cellEls = calendarBodyNativeElement.querySelectorAll('.nx-calendar-body-cell');
        };

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardCalendarBody);
            fixture.detectChanges();

            const calendarBodyDebugElement = fixture.debugElement.query(By.directive(NxCalendarBodyComponent));
            calendarBodyNativeElement = calendarBodyDebugElement.nativeElement;
            testComponent = fixture.componentInstance;

            refreshElementLists();
        });

        it('creates body', () => {
            expect(rowEls).toHaveSize(2);
            expect(cellEls).toHaveSize(14);
        });

        it('highlights today', () => {
            const todayCell = calendarBodyNativeElement.querySelector('.nx-calendar-body-today');
            expect(todayCell).not.toBeNull();
            expect(todayCell!.innerHTML.trim()).toBe('3');
        });

        it('highlights selected', () => {
            const selectedCell = calendarBodyNativeElement.querySelector('.nx-calendar-body-selected');
            expect(selectedCell).not.toBeNull();
            expect(selectedCell!.innerHTML.trim()).toBe('4');
        });

        it('cell should be selected on click', () => {
            const todayElement = calendarBodyNativeElement.querySelector('.nx-calendar-body-today') as HTMLElement;
            todayElement.click();
            fixture.detectChanges();

            expect(todayElement).withContext('today should be selected').toHaveClass('nx-calendar-body-selected');
        });

        it('should mark active date', () => {
            expect((cellEls[10] as HTMLElement).innerText.trim()).toBe('11');
            expect(cellEls[10]).toHaveClass('nx-calendar-body-active');
        });
    });

    describe('calendar body with disabled cells', () => {
        let fixture: ComponentFixture<CalendarBodyWithDisabledCells>;
        let testComponent: CalendarBodyWithDisabledCells;
        let calendarBodyNativeElement: Element;
        let cellEls: NodeListOf<Element>;

        beforeEach(() => {
            fixture = TestBed.createComponent(CalendarBodyWithDisabledCells);
            fixture.detectChanges();

            const calendarBodyDebugElement = fixture.debugElement.query(By.directive(NxCalendarBodyComponent));
            calendarBodyNativeElement = calendarBodyDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
            cellEls = calendarBodyNativeElement.querySelectorAll('.nx-calendar-body-cell');
        });

        it('should only allow selection of disabled cells when allowDisabledSelection is true', () => {
            (cellEls[0] as HTMLElement).click();
            fixture.detectChanges();

            expect(testComponent.selected).toBeFalsy();

            testComponent.allowDisabledSelection = true;
            fixture.detectChanges();

            (cellEls[0] as HTMLElement).click();
            fixture.detectChanges();

            expect(testComponent.selected).toBe(1);
        });
    });

    describe('calendar body with previous and following items', () => {
        let fixture: ComponentFixture<CalendarBodyWithPreviousAndFollowingCells>;
        let testComponent: CalendarBodyWithPreviousAndFollowingCells;
        let calendarBodyNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(CalendarBodyWithPreviousAndFollowingCells);
            fixture.detectChanges();

            const calendarBodyDebugElement = fixture.debugElement.query(By.directive(NxCalendarBodyComponent));
            calendarBodyNativeElement = calendarBodyDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });

        it('should have correct number of total rows', () => {
            let rows = calendarBodyNativeElement.querySelectorAll('tr');
            expect(rows).toHaveSize(6);

            testComponent.previousItems = [];
            testComponent.rows = [
                [1, 2, 3, 4, 5, 6, 7],
                [8, 9, 10, 11, 12, 13, 14],
            ].map(r => r.map(v => createCell(v)));
            testComponent.followingItems = [[1, 2, 3, 4, 5, 6, 7]];
            fixture.detectChanges();

            rows = calendarBodyNativeElement.querySelectorAll('tr');
            expect(rows).toHaveSize(3);
        });

        it('should have the correct number of adjacent items', () => {
            const followingItemsCount = testComponent.previousItems.length + testComponent.followingItems.reduce((prev, next) => prev.concat(next)).length;
            let adjacentCells = calendarBodyNativeElement.querySelectorAll('.nx-calendar-adjacent-cell');
            expect(adjacentCells).toHaveSize(followingItemsCount);

            // only followingitems filled
            testComponent.previousItems = [];
            testComponent.rows = [
                [1, 2, 3, 4, 5, 6, 7],
                [8, 9, 10, 11, 12, 13, 14],
            ].map(r => r.map(v => createCell(v)));
            testComponent.followingItems = [[1, 2, 3, 4, 5, 6, 7]];
            fixture.detectChanges();

            adjacentCells = calendarBodyNativeElement.querySelectorAll('.nx-calendar-adjacent-cell');
            expect(adjacentCells).toHaveSize(7);

            // only previous items filled
            testComponent.previousItems = [28, 29, 30];
            testComponent.rows = [
                [1, 2, 3, 4],
                [5, 6, 7, 8, 9, 10, 11],
                [12, 13, 14, 15, 16, 17, 18],
            ].map(r => r.map(v => createCell(v)));
            testComponent.followingItems = [];
            fixture.detectChanges();

            adjacentCells = calendarBodyNativeElement.querySelectorAll('.nx-calendar-adjacent-cell');
            expect(adjacentCells).toHaveSize(3);
        });
    });
});

@Component({
    template: `<table
        nx-calendar-body
        [label]="label"
        [rows]="rows"
        [todayValue]="todayValue"
        [selectedValue]="selectedValue"
        [numCols]="numCols"
        [activeCell]="10"
        (selectedValueChange)="onSelect($event)"
    ></table>`,
})
class StandardCalendarBody {
    label = 'Jan 2017';
    rows = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
    ].map(r => r.map(v => createCell(v)));
    todayValue = 3;
    selectedValue = 4;
    numCols = 7;

    onSelect(value: number) {
        this.selectedValue = value;
    }
}

@Component({
    template: `<table nx-calendar-body [rows]="rows" [allowDisabledSelection]="allowDisabledSelection" (selectedValueChange)="selected = $event"></table>`,
})
class CalendarBodyWithDisabledCells {
    rows = [[1, 2, 3, 4]].map(r => r.map(d => createCell(d, d % 2 === 0)));
    allowDisabledSelection = false;
    selected!: number;
}

@Component({
    template: `<table nx-calendar-body [rows]="rows" [previousItems]="previousItems" [followingItems]="followingItems"></table>`,
})
class CalendarBodyWithPreviousAndFollowingCells {
    previousItems = [28, 29, 30];
    rows = [
        [1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20],
    ].map(r => r.map(v => createCell(v)));
    followingItems = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
    ];
}

function createCell(value: number, enabled = true) {
    return new NxCalendarCell(value, `${value}`, `${value}-label`, enabled);
}
