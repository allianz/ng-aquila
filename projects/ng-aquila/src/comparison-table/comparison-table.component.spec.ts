import { ChangeDetectionStrategy, Component, DebugElement, Directive, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import axe from 'axe-core';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableComponent } from './comparison-table.component';
import { NxComparisonTableModule } from './comparison-table.module';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';

declare let viewport: any;
const THROTTLE_TIME = 200;

export const BASIC_COMPARISON_TABLE_TEMPLATE = `
  <nx-comparison-table>
    <ng-container *ngFor="let element of data">
      <ng-container *ngIf="element['type'] === 'toggleSection'" nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header>{{ element['header'] }}</nx-comparison-table-toggle-section-header>
        <ng-container *ngFor="let row of element['content']" nxComparisonTableRow>
          <nx-comparison-table-description-cell *ngIf="row['description']">{{ row['description'] }}</nx-comparison-table-description-cell>>
          <nx-comparison-table-cell *ngFor="let cell of row['cells']">{{ cell }}</nx-comparison-table-cell>
          <nx-comparison-table-intersection-cell *ngIf="row['intersection']">{{ row['intersection'] }}</nx-comparison-table-intersection-cell>
        </ng-container>
      </ng-container>
      <ng-container *ngIf="element['type'] !== 'toggleSection'" nxComparisonTableRow [type]="element['type']">
        <nx-comparison-table-description-cell *ngIf="element['description']">{{ element['description'] }}</nx-comparison-table-description-cell>>
        <nx-comparison-table-cell *ngFor="let cell of element['cells']" [type]="element['type']">{{ cell }}</nx-comparison-table-cell>
        <nx-comparison-table-intersection-cell *ngIf="element['intersection']">{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
      </ng-container>
    </ng-container>
  </nx-comparison-table>
`;
export const HIDDEN_INDEXES_COMPARISON_TABLE_TEMPLATE = `
  <nx-comparison-table [(selectedIndex)]="selected" [hiddenIndexes]="hiddenIndexes">

  <ng-container *ngFor="let element of data">
    <ng-container *ngIf="element['type'] === 'header'" nxComparisonTableRow [type]="element['type']">
      <nx-comparison-table-description-cell *ngIf="element['description']">{{ element['description'] }}</nx-comparison-table-description-cell>>
      <nx-comparison-table-cell *ngFor="let cell of element['cells']" [type]="element['type']">
      <nx-comparison-table-popular-cell *ngIf="popular" [forColumn]="popular">popular cell</nx-comparison-table-popular-cell>
      {{ cell }}
      </nx-comparison-table-cell>
      <nx-comparison-table-intersection-cell *ngIf="element['intersection']">{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
    </ng-container>

    <ng-container *ngIf="element['type'] === 'toggleSection'" nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header>{{ element['header'] }}</nx-comparison-table-toggle-section-header>
        <ng-container *ngFor="let row of element['content']" nxComparisonTableRow>
          <nx-comparison-table-description-cell *ngIf="row['description']">{{ row['description'] }}</nx-comparison-table-description-cell>>
          <nx-comparison-table-cell *ngFor="let cell of row['cells']">{{ cell }}</nx-comparison-table-cell>
          <nx-comparison-table-intersection-cell *ngIf="row['intersection']">{{ row['intersection'] }}</nx-comparison-table-intersection-cell>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="element['type'] === 'content'" nxComparisonTableRow [type]="element['type']">
        <nx-comparison-table-description-cell *ngIf="element['description']">{{ element['description'] }}</nx-comparison-table-description-cell>>
        <nx-comparison-table-cell *ngFor="let cell of element['cells']" [type]="element['type']">
        {{ cell }}
        </nx-comparison-table-cell>
        <nx-comparison-table-intersection-cell *ngIf="element['intersection']">{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
      </ng-container>

      <ng-container *ngIf="element['type'] === 'footer'" nxComparisonTableRow [type]="element['type']">
      <nx-comparison-table-description-cell *ngIf="element['description']">{{ element['description'] }}</nx-comparison-table-description-cell>>
      <nx-comparison-table-cell *ngFor="let cell of element['cells']" [type]="element['type']">
      {{ cell }}
      </nx-comparison-table-cell>
      <nx-comparison-table-intersection-cell *ngIf="element['intersection']">{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
    </ng-container>

    </ng-container>
  </nx-comparison-table>
`;
@Directive()
abstract class TableTest {
    @ViewChild(NxComparisonTableComponent) tableInstance!: NxComparisonTableComponent;
    @ViewChildren(NxComparisonTableCell) cellInstances!: QueryList<NxComparisonTableCell>;
    @ViewChildren(NxComparisonTableRowDirective) rowInstances!: QueryList<NxComparisonTableRowDirective>;

    hiddenIndexes: any[] = [];
    selected = 0;
    data: any;
    popular: any;
}

describe('NxComparisonTableComponent', () => {
    let fixture: ComponentFixture<TableTest>;
    let testInstance: TableTest;
    let tableInstance: NxComparisonTableComponent;
    let tableElement: DebugElement;
    let cellInstances: QueryList<NxComparisonTableCell>;
    let cellElements: DebugElement[];
    let rowInstances: QueryList<NxComparisonTableRowDirective>;
    let rowElements: DebugElement[];

    function createTestComponent(component: Type<TableTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        tableInstance = testInstance.tableInstance;
        tableElement = fixture.debugElement.query(By.css('nx-comparison-table'));
        cellInstances = testInstance.cellInstances;
        cellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__cell'));
        rowInstances = testInstance.rowInstances;
        rowElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__row'));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxComparisonTableModule, BrowserAnimationsModule],
            declarations: [
                BasicComponent,
                BasicOnPushComponent,
                DisabledColumnsComponent,
                SelectableIndexComponent,
                LongPageWithTableComponent,
                HiddenColumnsComponent,
            ],
        });
        TestBed.compileComponents();
    }));

    describe('basic', () => {
        it('creates the component', () => {
            createTestComponent(BasicComponent);
            expect(BasicComponent).toBeTruthy();
        });

        it('should set infoColumnCount correctly', () => {
            createTestComponent(BasicComponent);
            expect(tableInstance._infoColumnCount()).toBe(2);
        });

        it('should return correct number of header cells in _getHeaderCells', () => {
            createTestComponent(BasicComponent);
            const headerCells = tableInstance._getHeaderCells();
            expect(headerCells).toHaveSize(2);
        });

        it('should display the correct number of rows and toggle sections', fakeAsync(() => {
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);

            expect(rowElements).toHaveSize(5);

            const toggleSectionElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__toggle-section'));
            expect(toggleSectionElements).toHaveSize(1);

            const rowsInToggleSections = toggleSectionElements[0].queryAll(By.css('.nx-comparison-table__row'));
            expect(rowsInToggleSections).toHaveSize(2);
        }));
    });

    describe('responsive', () => {
        it('should set viewType by "view" input', fakeAsync(() => {
            viewport.set('tablet');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(BasicComponent);

            tick(THROTTLE_TIME);
            fixture.detectChanges();
            expect(tableInstance.viewType).toBe('tablet');

            tableInstance.view = 'mobile';
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            expect(tableInstance.viewType).toBe('mobile');

            tableInstance.view = 'desktop';
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            expect(tableInstance.viewType).toBe('desktop');

            tableInstance.view = null; // reset to responsive default
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            expect(tableInstance.viewType).toBe('tablet');
        }));

        it('should display the correct number of rows and toggle sections (tablet)', fakeAsync(() => {
            viewport.set('tablet');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(BasicComponent);

            tick(THROTTLE_TIME);
            fixture.detectChanges();

            rowElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__row'));
            expect(rowElements).toHaveSize(8);

            const toggleSectionElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__toggle-section'));
            expect(toggleSectionElements).toHaveSize(1);

            const rowsInToggleSections = toggleSectionElements[0].queryAll(By.css('.nx-comparison-table__row'));
            expect(rowsInToggleSections).toHaveSize(4);
        }));

        it('should display the correct number of rows and toggle sections (mobile)', fakeAsync(() => {
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            const rows = fixture.debugElement.queryAll(By.css('tr'));
            expect(rows).toHaveSize(4);

            expect(rows[0].queryAll(By.css('.nx-comparison-table__mobile-toggle-section-header'))).toHaveSize(1);
            expect(rows[1].queryAll(By.css('.nx-comparison-table__description-cell'))).toHaveSize(3);
        }));

        it('should display the placeholders correctly', fakeAsync(() => {
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            const rows = fixture.debugElement.queryAll(By.css('tr'));

            // toggle-section-header row: 5 placeholders + 1 content column
            expect(rows[0].queryAll(By.css('th'))).toHaveSize(5);
            expect(rows[0].queryAll(By.css('th.nx-comparison-table__placeholder-cell'))).toHaveSize(4);

            // description-header row: 3 placeholders + 3 content columns
            expect(rows[1].queryAll(By.css('th'))).toHaveSize(6);
            expect(rows[1].queryAll(By.css('th.nx-comparison-table__placeholder-cell'))).toHaveSize(3);

            // content rows: 2 placeholders + 1 mobile-header-column + 3 content cells
            expect(rows[2].queryAll(By.css('td'))).toHaveSize(6);
            expect(rows[2].queryAll(By.css('td.nx-comparison-table__placeholder-cell'))).toHaveSize(2);

            expect(rows[3].queryAll(By.css('td'))).toHaveSize(6);
            expect(rows[3].queryAll(By.css('td.nx-comparison-table__placeholder-cell'))).toHaveSize(2);
        }));

        it('should display all the rows when no footer (mobile)', fakeAsync(() => {
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);

            testInstance.data = [
                { type: 'header', cells: ['This is a header cell', 'This is a header cell', 'This is a header cell'] },
                { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell', 'This is a cell'] },
            ];
            fixture.detectChanges();

            const rows = fixture.debugElement.queryAll(By.css('tr'));

            // toggle-section-header row: 2 placeholders + 1 content column
            expect(rows[0].queryAll(By.css('th'))).toHaveSize(3);
            expect(rows[0].queryAll(By.css('th.nx-comparison-table__placeholder-cell'))).toHaveSize(2);

            // content rows: 1 placeholder + 1 mobile-header-column + 1 content cell
            expect(rows[2].queryAll(By.css('td'))).toHaveSize(3);
            expect(rows[2].queryAll(By.css('td.nx-comparison-table__placeholder-cell'))).toHaveSize(1);

            expect(rows[3].queryAll(By.css('td'))).toHaveSize(3);
            expect(rows[3].queryAll(By.css('td.nx-comparison-table__placeholder-cell'))).toHaveSize(1);
        }));

        it('should update when parent is onPush', fakeAsync(() => {
            createTestComponent(BasicOnPushComponent);
            tick(THROTTLE_TIME);
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.nx-comparison-table__description-row')).toBeTruthy();
        }));

        afterEach(() => {
            viewport.reset();
        });
    });

    describe('selection', () => {
        it('should not be selected by default', () => {
            createTestComponent(BasicComponent);
            cellInstances.forEach(cell => {
                expect(cell._isSelected()).toBeFalse();
            });
            cellElements.forEach(cell => {
                expect(cell.nativeElement).not.toHaveClass('is-selected');
            });
        });

        it('should update selected on input change', () => {
            createTestComponent(SelectableIndexComponent);

            expect(tableInstance.selectedIndex).toBe(0);
            rowInstances.forEach(row => {
                expect(row.cells.toArray()[0]._isSelected()).toBeTrue();
                expect(row.cells.toArray()[1]._isSelected()).toBeFalse();
                expect(row.cells.toArray()[2]._isSelected()).toBeFalse();
            });
            rowElements.forEach(row => {
                const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
                expect(cells[0].nativeElement).toHaveClass('is-selected');
                expect(cells[1].nativeElement).not.toHaveClass('is-selected');
                expect(cells[2].nativeElement).not.toHaveClass('is-selected');
            });

            testInstance.selected = 2;
            fixture.detectChanges();

            expect(tableInstance.selectedIndex).toBe(2);
            rowInstances.forEach(row => {
                expect(row.cells.toArray()[0]._isSelected()).toBeFalse();
                expect(row.cells.toArray()[1]._isSelected()).toBeFalse();
                expect(row.cells.toArray()[2]._isSelected()).toBeTrue();
            });
            rowElements.forEach(row => {
                const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
                expect(cells[0].nativeElement).not.toHaveClass('is-selected');
                expect(cells[1].nativeElement).not.toHaveClass('is-selected');
                expect(cells[2].nativeElement).toHaveClass('is-selected');
            });
        });

        it('should update selectedIndexChange on a selectedIndex change', fakeAsync(() => {
            createTestComponent(SelectableIndexComponent);
            tick(THROTTLE_TIME);
            expect(tableInstance.selectedIndex).toBe(0);
            const spy = spyOn(tableInstance.selectedIndexChange, 'emit').and.callThrough();

            testInstance.selected = 1;
            fixture.detectChanges();

            expect(tableInstance.selectedIndex).toBe(1);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(testInstance.selected).toBe(1);
        }));
    });

    describe('column disabling', () => {
        it('should not be disabled by default', () => {
            createTestComponent(DisabledColumnsComponent);
            cellInstances.forEach(cell => {
                expect(cell._isCellDisabled).toBeFalse();
            });
            cellElements.forEach(cell => {
                expect(cell.nativeElement).not.toHaveClass('is-disabled');
            });
        });

        it('should disable the buttons of disabled columns', () => {
            createTestComponent(DisabledColumnsComponent);

            (testInstance as DisabledColumnsComponent).disabledColumn1 = true;
            fixture.detectChanges();

            const selectButtons = fixture.debugElement.queryAll(By.css('.nx-comparison-table__select-button'));
            expect(selectButtons[1].nativeElement.attributes.getNamedItem('disabled')).toBeTruthy();
            expect(selectButtons[0].nativeElement.attributes.getNamedItem('disabled')).toBeFalsy();
        });

        it('should update on disabled input change', () => {
            createTestComponent(DisabledColumnsComponent);

            (testInstance as DisabledColumnsComponent).disabledColumn1 = true;
            fixture.detectChanges();

            rowInstances.forEach(row => {
                expect(row.cells.toArray()[0]._isCellDisabled).toBeFalse();
                expect(row.cells.toArray()[1]._isCellDisabled).toBeTrue();
                expect(row.cells.toArray()[2]._isCellDisabled).toBeFalse();
            });

            rowElements.forEach(row => {
                const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
                expect(cells[0].nativeElement).not.toHaveClass('is-disabled');
                expect(cells[1].nativeElement).toHaveClass('is-disabled');
                expect(cells[2].nativeElement).not.toHaveClass('is-disabled');
            });

            (testInstance as DisabledColumnsComponent).disabledColumn1 = false;
            (testInstance as DisabledColumnsComponent).disabledColumn2 = true;
            fixture.detectChanges();

            rowInstances.forEach(row => {
                expect(row.cells.toArray()[0]._isCellDisabled).toBeFalse();
                expect(row.cells.toArray()[1]._isCellDisabled).toBeFalse();
                expect(row.cells.toArray()[2]._isCellDisabled).toBeTrue();
            });

            rowElements.forEach(row => {
                const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
                expect(cells[0].nativeElement).not.toHaveClass('is-disabled');
                expect(cells[1].nativeElement).not.toHaveClass('is-disabled');
                expect(cells[2].nativeElement).toHaveClass('is-disabled');
            });
        });

        it('should not disable the column if put on a non-header cell', () => {
            createTestComponent(DisabledColumnsComponent);

            (testInstance as DisabledColumnsComponent).fakeDisabled = true;
            fixture.detectChanges();

            rowInstances.forEach(row => {
                expect(row.cells.toArray()[0]._isCellDisabled).toBeFalse();
                expect(row.cells.toArray()[1]._isCellDisabled).toBeFalse();
                expect(row.cells.toArray()[2]._isCellDisabled).toBeFalse();
            });

            rowElements.forEach(row => {
                const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
                expect(cells[0].nativeElement).not.toHaveClass('is-disabled');
                expect(cells[1].nativeElement).not.toHaveClass('is-disabled');
                expect(cells[2].nativeElement).not.toHaveClass('is-disabled');
            });
        });

        it('should correctly set disabled classes on rows on mobile', fakeAsync(() => {
            createTestComponent(DisabledColumnsComponent);
            (testInstance as DisabledColumnsComponent).disabledColumn1 = true;
            (testInstance as DisabledColumnsComponent).disabledColumn2 = true;
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));

            tick(THROTTLE_TIME);
            fixture.detectChanges();

            const mobileContentRows = fixture.debugElement.queryAll(By.css('tr:not(.nx-comparison-table__description-row)'));
            expect(mobileContentRows[0].nativeElement).not.toHaveClass('is-disabled');
            expect(mobileContentRows[1].nativeElement).toHaveClass('is-disabled');
            expect(mobileContentRows[2].nativeElement).toHaveClass('is-disabled');
            viewport.reset();
        }));
    });

    describe('responsive behaviour', () => {
        it('should have the correct view type on page load (desktop)', () => {
            createTestComponent(BasicComponent);
            expect(tableInstance.viewType).toBe('desktop');
        });

        it('should have the correct view type on page load (tablet)', fakeAsync(() => {
            viewport.set('tablet');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);
            expect(tableInstance.viewType).toBe('tablet');
        }));

        it('should have the correct view type on page load (mobile)', fakeAsync(() => {
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);

            expect(tableInstance.viewType).toBe('mobile');
        }));

        it('should update the viewType correctly', fakeAsync(() => {
            createTestComponent(SelectableIndexComponent);
            expect(tableInstance.viewType).toBe('desktop');

            viewport.set('tablet');
            window.dispatchEvent(new Event('resize'));
            tick(THROTTLE_TIME);
            expect(tableInstance.viewType).toBe('tablet');

            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));
            tick(THROTTLE_TIME);
            expect(tableInstance.viewType).toBe('mobile');

            viewport.set('desktop');
            window.dispatchEvent(new Event('resize'));
            tick(THROTTLE_TIME);
            expect(tableInstance.viewType).toBe('desktop');
        }));

        it('emits a viewType change', fakeAsync(() => {
            createTestComponent(BasicComponent);
            spyOn(tableInstance.viewTypeChange, 'emit');
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));
            tick(THROTTLE_TIME);
            expect(tableInstance.viewTypeChange.emit).toHaveBeenCalledWith('mobile');
        }));

        afterEach(() => {
            viewport.reset();
        });
    });

    describe('sticky behaviour', () => {
        it('should not cut a top clipping-path on desktop by default', fakeAsync(() => {
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);
            flush();
            fixture.detectChanges();
            const tableBody = fixture.debugElement.query(By.css('.nx-comparison-table__table-body'));
            const regex = /^inset\((.*)px -12px -1px\)$/;
            expect(parseInt(regex.exec(tableBody.styles['clip-path'] as string)![1], 10)).toBeLessThanOrEqual(0);
        }));

        it('should update top clipping-path when scrolled (desktop)', fakeAsync(() => {
            createTestComponent(LongPageWithTableComponent);
            tick(THROTTLE_TIME);

            const wrapperDiv = fixture.debugElement.query(By.css('div'));
            wrapperDiv.nativeElement.scrollTop = 50;
            dispatchFakeEvent(document, 'scroll');
            tick();
            fixture.detectChanges();
            const tableBody = fixture.debugElement.query(By.css('.nx-comparison-table__table-body'));
            const regex = /^inset\((.*)px -12px -1px\)$/;
            expect(parseInt(regex.exec(tableBody.styles['clip-path'] as string)![1], 10)).toBeGreaterThan(0);

            wrapperDiv.nativeElement.scrollTop = 0;
            dispatchFakeEvent(document, 'scroll');
            tick();
            fixture.detectChanges();
            expect(parseInt(regex.exec(tableBody.styles['clip-path'] as string)![1], 10)).toBeLessThanOrEqual(0);
        }));

        it('should not cut a left clipping-path by default on mobile', fakeAsync(() => {
            createTestComponent(BasicComponent);

            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            const toggleSectionHeaderCell = tableElement
                .query(By.css('.nx-comparison-table__toggle-section-header-row'))
                .query(By.css('.nx-comparison-table__mobile-toggle-section-header'));
            const descriptionCell = tableElement.query(By.css('.nx-comparison-table__description-row')).query(By.css('.nx-comparison-table__description-cell'));
            expect(descriptionCell.styles['clip-path']).toMatch(/^inset\((0|0px)\)$/);
            expect(toggleSectionHeaderCell.styles['clip-path']).toMatch(/^inset\((0|0px)\)$/);
        }));

        it('should update top clipping-path when scrolled (mobile)', fakeAsync(() => {
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(LongPageWithTableComponent);
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            const regex = /^inset\(0p?x? 0p?x? 0p?x? (.*)px\)$/;
            const toggleSectionHeaderCell = tableElement
                .query(By.css('.nx-comparison-table__toggle-section-header-row'))
                .query(By.css('.nx-comparison-table__mobile-toggle-section-header'));
            const descriptionCell = tableElement.query(By.css('.nx-comparison-table__description-row')).query(By.css('.nx-comparison-table__description-cell'));

            tableElement.nativeElement.scrollTo(50, 0);
            dispatchFakeEvent(document, 'scroll');
            tick();
            fixture.detectChanges();
            expect(parseInt(regex.exec(descriptionCell.styles['clip-path'] as string)![1], 10)).toBeGreaterThan(0);
            expect(toggleSectionHeaderCell.styles['clip-path']).toMatch(/^inset\((0|0px)\)$/);

            tableElement.nativeElement.scrollTo(200, 0);
            dispatchFakeEvent(document, 'scroll');
            tick();
            fixture.detectChanges();
            expect(parseInt(regex.exec(descriptionCell.styles['clip-path'] as string)![1], 10)).toBeGreaterThan(0);
            expect(parseInt(regex.exec(toggleSectionHeaderCell.styles['clip-path'] as string)![1], 10)).toBeGreaterThan(0);
        }));

        it('should mark as sticky when parent is onPush', fakeAsync(() => {
            createTestComponent(BasicOnPushComponent);
            tick(THROTTLE_TIME);

            const wrapperDiv = fixture.debugElement.query(By.css('div'));
            wrapperDiv.nativeElement.scrollTop = 50;
            dispatchFakeEvent(document, 'scroll');
            fixture.detectChanges();
            tick();
            const tableBody = fixture.debugElement.query(By.css('.nx-comparison-table__table-body'));
            const regex = /^inset\((.*)px -12px -1px\)$/;
            expect(parseInt(regex.exec(tableBody.styles['clip-path'] as string)![1], 10)).toBeGreaterThan(0);

            wrapperDiv.nativeElement.scrollTop = 0;
            dispatchFakeEvent(document, 'scroll');
            fixture.detectChanges();
            tick();
            expect(parseInt(regex.exec(tableBody.styles['clip-path'] as string)![1], 10)).toBeLessThanOrEqual(0);
        }));

        it('should update clipping-path when header row requests it', fakeAsync(() => {
            createTestComponent(LongPageWithTableComponent);
            tick(THROTTLE_TIME);

            const wrapperDiv = fixture.debugElement.query(By.css('div'));
            wrapperDiv.nativeElement.scrollTop = 50;
            tableInstance._getHeaderRow()._requestCellClippingUpdate$.next(undefined);
            tick();
            fixture.detectChanges();
            const tableBody = fixture.debugElement.query(By.css('.nx-comparison-table__table-body'));
            const regex = /^inset\((.*)px -12px -1px\)$/;
            expect(parseInt(regex.exec(tableBody.styles['clip-path'] as string)![1], 10)).toBeGreaterThan(0);

            wrapperDiv.nativeElement.scrollTop = 0;
            tableInstance._getHeaderRow()._requestCellClippingUpdate$.next(undefined);
            tick();
            fixture.detectChanges();
            expect(parseInt(regex.exec(tableBody.styles['clip-path'] as string)![1], 10)).toBeLessThanOrEqual(0);
        }));

        afterEach(() => {
            viewport.reset();
        });
    });

    describe('a11y', () => {
        it('should have set the roles correctly (desktop / tablet)', () => {
            createTestComponent(BasicComponent);

            expect(tableElement.query(By.css('div')).attributes.role).toBe('table');
            expect(tableElement.query(By.css('table'))).toBeNull();

            const toggleSection = tableElement.query(By.css('.nx-comparison-table__toggle-section'));
            const toggleSectionHeader = toggleSection.query(By.css('.nx-comparison-table__toggle-section-header'));
            expect(toggleSectionHeader.attributes.role).toBe('row');

            const toggleSectionBody = toggleSection.query(By.css('.nx-comparison-table__toggle-section-body'));
            expect(toggleSectionBody.attributes.role).toBe('rowgroup');
        });

        it('has no accessibility violations', done => {
            createTestComponent(BasicComponent);

            axe.run(
                fixture.nativeElement,
                {
                    rules: {
                        'empty-table-header': { enabled: false },
                        'aria-required-children': { enabled: false },
                    },
                },
                (error: Error, results: axe.AxeResults) => {
                    expect(results.violations.length).toBe(0);
                    const violationMessages = results.violations.map(item => item.description);
                    if (violationMessages.length) {
                        console.error(violationMessages);
                        expect(violationMessages).toBeFalsy();
                    }
                    done();
                },
            );
        });

        afterEach(() => {
            viewport.reset();
        });
    });

    describe('hidden column', () => {
        it('should not be hidden by default', () => {
            createTestComponent(HiddenColumnsComponent);
            cellInstances.forEach(cell => {
                expect(cell._isCellHidden()).toBeFalse();
            });
            cellElements.forEach(cell => {
                expect(cell.nativeElement).not.toHaveClass('is-hidden');
            });
        });

        it('should update on hiddenIndexes input change', () => {
            createTestComponent(HiddenColumnsComponent);

            (testInstance as HiddenColumnsComponent).hiddenIndexes = [2];
            fixture.detectChanges();

            rowInstances.forEach(row => {
                expect(row.cells.toArray()[0]._isCellHidden()).toBeFalse();
                expect(row.cells.toArray()[1]._isCellHidden()).toBeFalse();
                expect(row.cells.toArray()[2]._isCellHidden()).toBeTrue();
            });

            rowElements.forEach(row => {
                const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
                expect(cells[0].nativeElement).not.toHaveClass('is-hidden');
                expect(cells[1].nativeElement).not.toHaveClass('is-hidden');
                expect(cells[2].nativeElement).toHaveClass('is-hidden');
            });

            (testInstance as HiddenColumnsComponent).hiddenIndexes = [1];
            fixture.detectChanges();

            rowInstances.forEach(row => {
                expect(row.cells.toArray()[0]._isCellHidden()).toBeFalse();
                expect(row.cells.toArray()[1]._isCellHidden()).toBeTrue();
                expect(row.cells.toArray()[2]._isCellHidden()).toBeFalse();
            });

            rowElements.forEach(row => {
                const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
                expect(cells[0].nativeElement).not.toHaveClass('is-hidden');
                expect(cells[1].nativeElement).toHaveClass('is-hidden');
                expect(cells[2].nativeElement).not.toHaveClass('is-hidden');
            });
        });

        it('should hide headline cells with popular columns', () => {
            createTestComponent(HiddenColumnsComponent);

            const querySelector = By.css('nx-comparison-table > div > nx-comparison-table-flex-row .nx-comparison-table__placeholder-cell');

            // By default no popular columns
            const first = fixture.debugElement.queryAll(querySelector);
            first.forEach(val => expect(val.nativeNode).not.toHaveClass('is-hidden'));
            expect(first).toHaveSize(1);

            (testInstance as HiddenColumnsComponent).popular = 1;
            fixture.detectChanges();

            // After usage of popular attribute, the columns are visible but by default no hidden column
            const second = fixture.debugElement.queryAll(querySelector);
            second.forEach(val => expect(val.nativeNode).not.toHaveClass('is-hidden'));
            expect(second).toHaveSize(4);

            (testInstance as HiddenColumnsComponent).hiddenIndexes = [2];
            fixture.detectChanges();

            // After usage of popular attribute, the columns are visible and the column before the popular one is hidden
            const third = fixture.debugElement.queryAll(querySelector);
            third.forEach((val, i) => {
                switch (i) {
                    case 2:
                        expect(val.nativeNode).toHaveClass('is-hidden');
                        break;
                    default:
                        expect(val.nativeNode).not.toHaveClass('is-hidden');
                }
            });
            expect(third).toHaveSize(4);
        });
    });
});

@Component({
    template: BASIC_COMPARISON_TABLE_TEMPLATE,
})
class BasicComponent extends TableTest {
    data = [
        { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
        {
            type: 'toggleSection',
            header: 'This can be opened',
            content: [
                { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
                { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
            ],
        },
        { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
    ];
}

@Component({
    template: `<div style="height: 200px; width: 200px; overflow: scroll;">${BASIC_COMPARISON_TABLE_TEMPLATE}</div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicOnPushComponent extends TableTest {
    data = [
        { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
        {
            type: 'toggleSection',
            header: 'This can be opened',
            content: [
                { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
                { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
            ],
        },
        { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
    ];
}

@Component({
    template: `
        <nx-comparison-table [(selectedIndex)]="selected">
            <ng-container *ngFor="let element of data">
                <ng-container *ngIf="element['type'] === 'toggleSection'" nxComparisonTableToggleSection>
                    <nx-comparison-table-toggle-section-header>{{ element['header'] }}</nx-comparison-table-toggle-section-header>
                    <ng-container *ngFor="let row of element['content']" nxComparisonTableRow>
                        <nx-comparison-table-description-cell *ngIf="row['description']">{{ row['description'] }}</nx-comparison-table-description-cell
                        >>
                        <nx-comparison-table-cell *ngFor="let cell of row['cells']">{{ cell }}</nx-comparison-table-cell>
                        <nx-comparison-table-intersection-cell *ngIf="row['intersection']">{{ row['intersection'] }}</nx-comparison-table-intersection-cell>
                    </ng-container>
                </ng-container>
                <ng-container *ngIf="element['type'] !== 'toggleSection'" nxComparisonTableRow [type]="element['type']">
                    <nx-comparison-table-description-cell *ngIf="element['description']">{{ element['description'] }}</nx-comparison-table-description-cell
                    >>
                    <nx-comparison-table-cell *ngFor="let cell of element['cells']" [type]="element['type']">{{ cell }}</nx-comparison-table-cell>
                    <nx-comparison-table-intersection-cell *ngIf="element['intersection']">{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                </ng-container>
            </ng-container>
        </nx-comparison-table>
    `,
})
class SelectableIndexComponent extends TableTest {
    data = [
        { type: 'header', cells: ['This is a header cell', 'This is a header cell', 'This is a header cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell', 'This is a cell'] },
        { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell', 'This is a footer cell'] },
    ];
}

@Component({
    template: `
        <nx-comparison-table>
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">
                    <button nxComparisonTableSelectButton unselectedLabel="Select" selectedLabel="Selected" type="button">Click</button>
                    Product 1
                </nx-comparison-table-cell>
                <nx-comparison-table-cell type="header" [disabledColumn]="disabledColumn1">
                    <button nxComparisonTableSelectButton unselectedLabel="Select" selectedLabel="Selected" type="button">Click</button>
                    Product 2 with a very long name</nx-comparison-table-cell
                >
                <nx-comparison-table-cell type="header" [disabledColumn]="disabledColumn2">
                    <button nxComparisonTableSelectButton unselectedLabel="Select" selectedLabel="Selected" type="button">Click</button>
                    Product 3</nx-comparison-table-cell
                >
            </ng-container>

            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>Service headline</nx-comparison-table-description-cell>
                <nx-comparison-table-cell [disabledColumn]="fakeDisabled">100 Mio. Euro</nx-comparison-table-cell>
                <nx-comparison-table-cell>150 Mio. Euro</nx-comparison-table-cell>
                <nx-comparison-table-cell>200 Mio. Euro</nx-comparison-table-cell>
            </ng-container>

            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>Service headline</nx-comparison-table-description-cell>
                <nx-comparison-table-cell>cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>cell</nx-comparison-table-cell>
            </ng-container>

            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>Service headline</nx-comparison-table-description-cell>
                <nx-comparison-table-cell>cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class DisabledColumnsComponent extends TableTest {
    disabledColumn1 = false;
    disabledColumn2 = false;
    fakeDisabled = false;
}

@Component({
    template: `<div style="height: 200px; width: 200px; overflow: scroll;">${BASIC_COMPARISON_TABLE_TEMPLATE}</div>`,
})
class LongPageWithTableComponent extends TableTest {
    data = [
        { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
        {
            type: 'toggleSection',
            header: 'This can be opened',
            content: [
                { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
                { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
            ],
        },
        { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
    ];
}

@Component({
    template: HIDDEN_INDEXES_COMPARISON_TABLE_TEMPLATE,
})
class HiddenColumnsComponent extends TableTest {
    data = [
        { type: 'header', popular: 2, cells: ['This is a header cell', 'This is a header cell', 'This is a hidden header cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell', 'This is a hidden cell'] },
        {
            type: 'toggleSection',
            header: 'This can be opened',
            content: [
                {
                    type: 'content',
                    description: 'This is a description cell',
                    cells: ['This is a cell', 'This is a cell', 'This is a hidden cell'],
                },
                {
                    type: 'content',
                    description: 'This is a description cell',
                    cells: ['This is a cell', 'This is a cell', 'This is a hidden cell'],
                },
            ],
        },
        { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell', 'This is a hidden footer cell'] },
    ];
}
