import { CdkTableModule } from '@angular/cdk/table';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxDynamicTableComponent } from './dynamic-table.component';
import { NxDynamicTableColumnDefinition } from './dynamic-table.models';
import { NxDynamicTableModule } from './dynamic-table.module';

@Directive()
abstract class DynamicTableTest {
    @ViewChild(NxDynamicTableComponent) dynamicTableInstance!: NxDynamicTableComponent;
    data: any[] = [
        { name: 'Mateo', email: 'mateo@email.com', phone: '678543129' },
        { name: 'Samuel', email: 'samuel@email.com', phone: '123456789' },
        { name: 'Adrian', email: 'adrian@email.com', phone: '987654321' },
    ];
    displayedColumns: NxDynamicTableColumnDefinition[] = [
        { title: 'User Name', key: 'name', type: 'string' },
        {
            title: 'Phone Number',
            key: 'phone',
            type: 'string',
            headerCellClass: 'column-header-class',
            headerCellStyle: { 'width.px': 100 },
            cellClass: 'column-class',
        },
    ];
    handleRowClick = jasmine.createSpy('handleRowClickSpy');
    style = '';
}

describe('NxDynamicTableComponent', () => {
    let fixture: ComponentFixture<DynamicTableTest>;
    let testInstance: DynamicTableTest;
    let rowDebugElement: HTMLElement;
    let table: HTMLElement;
    let ngContent: HTMLElement;
    let rowElements: HTMLElement[];
    let headerCellElements: HTMLElement[];

    function createTestComponent(component: Type<DynamicTableTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;

        ngContent = fixture.nativeElement.querySelector('.nx-table__appendix');
        rowDebugElement = fixture.nativeElement.querySelector('cdk-row');
        table = fixture.nativeElement.querySelector('cdk-table');
        rowElements = fixture.nativeElement.querySelectorAll('cdk-row');
        headerCellElements = fixture.nativeElement.querySelectorAll('cdk-header-cell');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxDynamicTableModule, CdkTableModule],
            declarations: [BasicDynamicTable, TableEmptyRows, TableWrongRows, DynamicTableEvent, EmptyDynamicTable, ProgrammaticTable],
        }).compileComponents();
    }));

    function getRows() {
        return fixture.nativeElement.querySelectorAll('cdk-row');
    }

    function getHeaderRow() {
        return fixture.nativeElement.querySelector('cdk-header-row');
    }

    describe('basic', () => {
        it('displays a table', () => {
            createTestComponent(BasicDynamicTable);
            expect(headerCellElements && rowElements).not.toBeNull();
        });

        it('should render two columns', () => {
            createTestComponent(BasicDynamicTable);
            fixture.detectChanges();
            expect(headerCellElements).toHaveSize(2);
        });

        it('should render three rows', () => {
            createTestComponent(BasicDynamicTable);
            fixture.detectChanges();
            expect(rowElements).toHaveSize(3);
        });

        it('should render 2 rows empty', () => {
            createTestComponent(TableEmptyRows);
            fixture.detectChanges();
            expect(rowElements).toHaveSize(2);
        });

        it('should render 0 rows due to rows are null or undefined', () => {
            createTestComponent(TableWrongRows);
            fixture.detectChanges();
            expect(rowElements).toHaveSize(0);
        });

        it('sets column styles', () => {
            createTestComponent(BasicDynamicTable);
            expect(headerCellElements[1].classList.contains('column-header-class')).toBeTrue();
            expect(headerCellElements[1].style.width).toBe('100px');
            expect(fixture.nativeElement.querySelector('.column-class')).toBeTruthy();
        });
    });

    describe('with events', () => {
        it('should emit new event', () => {
            createTestComponent(DynamicTableEvent);
            fixture.detectChanges();
            rowDebugElement.dispatchEvent(new MouseEvent('dblclick'));
            fixture.detectChanges();
            expect(testInstance.handleRowClick).toHaveBeenCalled();
        });
    });

    describe('empty table', () => {
        it('displays a empty table with info: no data to display', () => {
            createTestComponent(EmptyDynamicTable);
            expect(headerCellElements && rowElements).not.toBeNull();
            expect(ngContent.textContent).toContain('Information: No data to display');
        });

        it('should hide empty message when data changes', () => {
            createTestComponent(EmptyDynamicTable);
            fixture.componentInstance.data = [
                { name: 'Samuel', email: 'samuel@email.com', phone: '123456789' },
                { name: 'Adrian', email: 'adrian@email.com', phone: '987654321' },
            ];
            fixture.detectChanges();
            rowElements = getRows();
            ngContent = fixture.nativeElement.querySelector('.nx-table__appendix');
            expect(ngContent).toBeFalsy();
            expect(rowElements).toHaveSize(2);
        });
    });

    describe('programmatic change', () => {
        it('should update on data property change', () => {
            createTestComponent(ProgrammaticTable);
            // because the data setter also sets displayColumns if they are not set we test with some completely different
            // data
            testInstance.dynamicTableInstance.data = [{ car: 'Tesla', year: 2018, price: '1 €' }];
            fixture.detectChanges();
            const rows = getRows();
            const headerRow = getHeaderRow();
            expect(rows).toHaveSize(1);
            expect(headerRow.querySelectorAll('cdk-header-cell')[0].textContent.trim()).toBe('car');
            expect(rows[0].querySelectorAll('cdk-cell')[0].textContent).toBe('Tesla');
        });

        it('should update on displayedColumns property change', () => {
            createTestComponent(ProgrammaticTable);
            testInstance.dynamicTableInstance.data = testInstance.data;
            testInstance.dynamicTableInstance.displayedColumns = [{ title: 'Email', key: 'email', type: 'string' }];
            fixture.detectChanges();
            const rows = getRows();
            const headerRow = getHeaderRow();
            expect(headerRow.querySelectorAll('cdk-header-cell')[0].textContent.trim()).toBe('Email');
            expect(rows[0].querySelectorAll('cdk-cell')[0].textContent).toBe('mateo@email.com');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicDynamicTable);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-dynamic-table [data]="data"> </nx-dynamic-table>`,
})
class TableEmptyRows extends DynamicTableTest {
    data = [{}, {}];
}

@Component({
    template: `<nx-dynamic-table [data]="data"> </nx-dynamic-table>`,
})
class TableWrongRows extends DynamicTableTest {
    data = [null, undefined];
}

@Component({
    template: `<nx-dynamic-table [data]="data" [displayedColumns]="displayedColumns"></nx-dynamic-table>`,
})
class BasicDynamicTable extends DynamicTableTest {
    style = 'border';
}

@Component({
    template: `<nx-dynamic-table [data]="data" [displayedColumns]="displayedColumns" (rowClick)="handleRowClick($event)"></nx-dynamic-table>`,
})
class DynamicTableEvent extends DynamicTableTest {}

@Component({
    template: `<nx-dynamic-table [data]="data">Information: No data to display</nx-dynamic-table>`,
})
class EmptyDynamicTable extends DynamicTableTest {
    data = [];
}

@Component({
    template: `<nx-dynamic-table></nx-dynamic-table>`,
})
class ProgrammaticTable extends DynamicTableTest {}
