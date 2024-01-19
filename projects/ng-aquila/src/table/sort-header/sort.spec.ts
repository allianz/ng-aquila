import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, Directive, Injectable, Type, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { dispatchKeyboardEvent } from '../../cdk-test-utils';
import { NxTableModule } from '../table.module';
import { SortDirection, SortEvent } from './sort.directive';
import { NxSortHeaderComponent } from './sort-header.component';
import { NxSortHeaderIntl } from './sort-header-intl';

interface DataStructure {
    name: string;
    count: number;
}

@Injectable()
class MyIntl extends NxSortHeaderIntl {
    sortAscendingAriaLabel = 'aufsteigend sortieren';
    sortDescendingAriaLabel = 'absteigend sortieren';
    sortedAscendingAriaLabel = 'aufsteigend sortiert';
    sortedDescendingAriaLabel = 'absteigend sortiert';
}

@Directive()
abstract class SortHeaderTest {
    @ViewChild('nameHeader') nameHeader!: NxSortHeaderComponent;
    @ViewChild('countHeader') countHeader!: NxSortHeaderComponent;

    active = 'name';
    direction: SortDirection = 'desc';
    data: DataStructure[] = [
        { name: 'rabbit', count: 5 },
        { name: 'bunny', count: 15 },
        { name: 'coney', count: 1000 },
    ];

    sortTable(sort: SortEvent) {
        this.data = this.data.sort((a, b) => {
            switch (sort.active) {
                case 'name':
                    return this.compare(a.name, b.name, sort.direction);
                case 'count':
                    return this.compare(a.count, b.count, sort.direction);
                default:
                    return 0;
            }
        });
    }

    compare(a: string | number, b: string | number, direction: SortDirection) {
        return (a < b ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    }
}

describe('NxSort', () => {
    let fixture: ComponentFixture<SortHeaderTest>;
    let testInstance: SortHeaderTest;
    let nameHeader: NxSortHeaderComponent;
    let countHeader: NxSortHeaderComponent;

    function createTestComponent(component: Type<SortHeaderTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        nameHeader = testInstance.nameHeader;
        countHeader = testInstance.countHeader;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicSortTableComponent, ConfigurableSortTableComponent],
            imports: [NxTableModule],
            providers: [{ provide: NxSortHeaderIntl, useClass: MyIntl }],
        }).compileComponents();
    }));

    describe('basic', () => {
        it('creates the component', () => {
            createTestComponent(BasicSortTableComponent);
            expect(nameHeader).toBeTruthy();
            expect(countHeader).toBeTruthy();
        });

        it('renders table without sorting', () => {
            createTestComponent(BasicSortTableComponent);
            expect(testInstance.data).toEqual([
                { name: 'rabbit', count: 5 },
                { name: 'bunny', count: 15 },
                { name: 'coney', count: 1000 },
            ]);
        });

        it('sorts ascending on click', () => {
            createTestComponent(BasicSortTableComponent);

            const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
            nameHeaderElement.click();
            fixture.detectChanges();

            expect(testInstance.data).toEqual([
                { name: 'bunny', count: 15 },
                { name: 'coney', count: 1000 },
                { name: 'rabbit', count: 5 },
            ]);
        });

        it('sorts descending on second click', () => {
            createTestComponent(BasicSortTableComponent);

            const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
            nameHeaderElement.click();
            nameHeaderElement.click();
            fixture.detectChanges();

            expect(testInstance.data).toEqual([
                { name: 'rabbit', count: 5 },
                { name: 'coney', count: 1000 },
                { name: 'bunny', count: 15 },
            ]);
        });
    });

    describe('icons', () => {
        it('shows both icons for a unsorted column', () => {
            createTestComponent(BasicSortTableComponent);
            const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
            const chevrons = nameHeaderElement.querySelectorAll('.nx-sort-header__unsorted');

            expect(chevrons.length).toEqual(2);

            const countHeaderElement = fixture.nativeElement.querySelector('#countHeader');
            countHeaderElement.click();
            fixture.detectChanges();
            expect(chevrons.length).toEqual(2);
        });

        it('show ascending icon', () => {
            createTestComponent(BasicSortTableComponent);
            const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');

            // sort ascending
            nameHeaderElement.click();
            fixture.detectChanges();
            const arrowUp = nameHeaderElement.querySelector('.nx-sort-header__ascend') as HTMLElement;
            const arrowDown = nameHeaderElement.querySelector('.nx-sort-header__descend') as HTMLElement;
            const chevrons = nameHeaderElement.querySelectorAll('.nx-sort-header__unsorted');

            expect(arrowUp).not.toBeNull();
            expect(arrowDown).toBeNull();
            expect(chevrons.length).toEqual(0);
        });

        it('show descending icon', () => {
            createTestComponent(BasicSortTableComponent);
            const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');

            // sort descending
            nameHeaderElement.click();
            nameHeaderElement.click();
            fixture.detectChanges();
            const arrowUp = nameHeaderElement.querySelector('.nx-sort-header__ascend') as HTMLElement;
            const arrowDown = nameHeaderElement.querySelector('.nx-sort-header__descend') as HTMLElement;
            const chevrons = nameHeaderElement.querySelectorAll('.nx-sort-header__unsorted');

            expect(arrowDown).not.toBeNull();
            expect(arrowUp).toBeNull();
            expect(chevrons.length).toEqual(0);
        });
    });

    describe('configurable tests', () => {
        it('creates table with initial sorting', () => {
            createTestComponent(ConfigurableSortTableComponent);
            expect(testInstance.data).toEqual([
                { name: 'rabbit', count: 5 },
                { name: 'coney', count: 1000 },
                { name: 'bunny', count: 15 },
            ]);
        });

        it('sorts after active change', () => {
            createTestComponent(ConfigurableSortTableComponent);
            testInstance.active = 'count';
            fixture.detectChanges();
            expect(testInstance.data).toEqual([
                { name: 'coney', count: 1000 },
                { name: 'bunny', count: 15 },
                { name: 'rabbit', count: 5 },
            ]);
        });

        it('sorts after direction change', () => {
            createTestComponent(ConfigurableSortTableComponent);
            testInstance.direction = 'asc';
            fixture.detectChanges();
            expect(testInstance.data).toEqual([
                { name: 'bunny', count: 15 },
                { name: 'coney', count: 1000 },
                { name: 'rabbit', count: 5 },
            ]);
        });

        it('still sorts on click when inputs are set in code', () => {
            createTestComponent(ConfigurableSortTableComponent);
            const countHeaderElement = fixture.nativeElement.querySelector('#countHeader');
            countHeaderElement.click();
            fixture.detectChanges();

            expect(testInstance.data).toEqual([
                { name: 'rabbit', count: 5 },
                { name: 'bunny', count: 15 },
                { name: 'coney', count: 1000 },
            ]);
            expect(testInstance.active).toBe('count');
            expect(testInstance.direction).toBe('asc');
        });
    });

    describe('a11y', () => {
        it('has the correct aria label for an unsorted column', () => {
            createTestComponent(BasicSortTableComponent);
            const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader .nx-sort-header__icons-container');
            expect(nameHeaderElement.getAttribute('aria-label')).toBeNull();
        });

        it('has the correct aria label for a sorted column', () => {
            createTestComponent(BasicSortTableComponent);
            const nameHeaderButtonElement = fixture.nativeElement.querySelector('#nameHeader .nx-sort-header__focus-container');
            const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader .nx-sort-header__icons-container');
            nameHeaderElement.click();
            fixture.detectChanges();
            expect(nameHeaderElement.getAttribute('aria-label')).toBe('aufsteigend sortiert');
            expect(nameHeaderButtonElement.getAttribute('title')).toBe('absteigend sortieren');

            nameHeaderElement.click();
            fixture.detectChanges();
            expect(nameHeaderElement.getAttribute('aria-label')).toBe('absteigend sortiert');
            expect(nameHeaderButtonElement.getAttribute('title')).toBe('aufsteigend sortieren');
        });

        it('should rerender when aria labels change', inject([NxSortHeaderIntl], (intl: NxSortHeaderIntl) => {
            createTestComponent(BasicSortTableComponent);
            const nameHeaderButtonElement = fixture.nativeElement.querySelector('#nameHeader .nx-sort-header__focus-container');
            intl.sortAscendingAriaLabel = 'aufsteigend sortieren nach';
            intl.changes.next();
            fixture.detectChanges();
            expect(nameHeaderButtonElement.getAttribute('title')).toBe('aufsteigend sortieren nach');
        }));

        it('should sort on ENTER press', () => {
            createTestComponent(BasicSortTableComponent);

            const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
            const iconButtonElement = nameHeaderElement.querySelector('.nx-sort-header__icons-container') as HTMLDivElement;
            dispatchKeyboardEvent(iconButtonElement, 'keydown', ENTER);
            fixture.detectChanges();

            expect(testInstance.data).toEqual([
                { name: 'bunny', count: 15 },
                { name: 'coney', count: 1000 },
                { name: 'rabbit', count: 5 },
            ]);
        });

        it('should sort on SPACE press', () => {
            createTestComponent(BasicSortTableComponent);

            const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
            const iconButtonElement = nameHeaderElement.querySelector('.nx-sort-header__icons-container') as HTMLDivElement;
            dispatchKeyboardEvent(iconButtonElement, 'keydown', SPACE);
            fixture.detectChanges();

            expect(testInstance.data).toEqual([
                { name: 'bunny', count: 15 },
                { name: 'coney', count: 1000 },
                { name: 'rabbit', count: 5 },
            ]);
        });
    });
});

@Component({
    template: `
        <table nxTable nxSort (sortChange)="sortTable($event)">
            <thead>
                <tr nxTableRow>
                    <th nxHeaderCell nxSortHeaderCell="name" #nameHeader id="nameHeader">Name</th>
                    <th nxHeaderCell nxSortHeaderCell="count" #countHeader id="countHeader">Count</th>
                </tr>
            </thead>
        </table>
    `,
})
class BasicSortTableComponent extends SortHeaderTest {}

@Component({
    template: `
        <table nxTable nxSort (sortChange)="sortTable($event)" [(active)]="active" [(direction)]="direction">
            <thead>
                <tr nxTableRow>
                    <th nxHeaderCell nxSortHeaderCell="name" #nameHeader id="nameHeader">Name</th>
                    <th nxHeaderCell nxSortHeaderCell="count" #countHeader id="countHeader">Count</th>
                </tr>
            </thead>
        </table>
    `,
})
class ConfigurableSortTableComponent extends SortHeaderTest {}
