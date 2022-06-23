import { Component, Directive, QueryList, Type, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxComparisonTableCell } from './cell/cell.component';
import { BASIC_COMPARISON_TABLE_TEMPLATE } from './comparison-table.component.spec';
import { NxComparisonTableModule } from './comparison-table.module';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';

@Directive()
abstract class RowTest {
    @ViewChildren(NxComparisonTableRowDirective) rowInstances!: QueryList<NxComparisonTableRowDirective>;
    @ViewChildren(NxComparisonTableCell) cellInstances!: QueryList<NxComparisonTableCell>;

    typeForFooter = 'footer';
}

describe('NxComparisonTableRowDirective', () => {
    let fixture: ComponentFixture<RowTest>;
    let testInstance: RowTest;
    let rowInstances: QueryList<NxComparisonTableRowDirective>;
    let cellInstances: QueryList<NxComparisonTableCell>;

    function createTestComponent(component: Type<RowTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        rowInstances = testInstance.rowInstances;
        cellInstances = testInstance.cellInstances;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxComparisonTableModule],
            declarations: [BasicComponent, DynamicTypeComponent, NonStickyHeaderComponent],
        });
        TestBed.compileComponents();
    }));

    describe('basic', () => {
        it('should have type "content" by default', () => {
            createTestComponent(DynamicTypeComponent);

            expect(rowInstances.toArray()[1].type).toBe('content');
        });

        it('should set type correctly on input change', () => {
            createTestComponent(DynamicTypeComponent);
            expect(rowInstances.toArray()[3].type).toBe('footer');

            testInstance.typeForFooter = 'content';
            fixture.detectChanges();
            expect(rowInstances.toArray()[3].type).toBe('content');
        });

        it('should set index for all contained cells correctly', () => {
            createTestComponent(BasicComponent);
            const cells = cellInstances.toArray();
            expect(cells[0].index).toBe(0);
            expect(cells[1].index).toBe(1);
            expect(cells[2].index).toBe(0);
            expect(cells[3].index).toBe(1);
            expect(cells[4].index).toBe(0);
            expect(cells[5].index).toBe(1);
        });
    });

    describe('sticky rows', () => {
        it('should not be allowed to be sticky for non-header rows', () => {
            createTestComponent(DynamicTypeComponent);

            expect(rowInstances.toArray()[1].mayStick).toBeFalse();
            expect(rowInstances.toArray()[3].mayStick).toBeFalse();
        });

        it('should be sticky for header rows by default', () => {
            createTestComponent(DynamicTypeComponent);

            expect(rowInstances.toArray()[0].mayStick).toBeTrue();
        });

        it('should allow to prevent header from being sticky', () => {
            createTestComponent(NonStickyHeaderComponent);

            expect(rowInstances.toArray()[0].mayStick).toBeFalse();
        });

        it('should request a cell clipping update on changes to mayStick', () => {
            createTestComponent(NonStickyHeaderComponent);
            let emitCount = 0;
            rowInstances.toArray()[0]._requestCellClippingUpdate$.subscribe(() => emitCount++);

            (testInstance as NonStickyHeaderComponent).mayStick = true;
            fixture.detectChanges();
            expect(emitCount).toBe(1);

            (testInstance as NonStickyHeaderComponent).mayStick = false;
            fixture.detectChanges();
            expect(emitCount).toBe(2);
        });
    });
});

@Component({
    template: BASIC_COMPARISON_TABLE_TEMPLATE,
})
class BasicComponent extends RowTest {
    data = [
        { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
        { type: 'content', description: 'This is a description cell', intersection: 'This is a cell' },
        { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
    ];
}

@Component({
    template: `
        <nx-comparison-table>
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                <nx-comparison-table-intersection-cell>This is a cell</nx-comparison-table-intersection-cell>
            </ng-container>
            <ng-container nxComparisonTableRow [type]="typeForFooter">
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class DynamicTypeComponent extends RowTest {}

@Component({
    template: `
        <nx-comparison-table>
            <ng-container nxComparisonTableRow type="header" [mayStick]="mayStick">
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                <nx-comparison-table-intersection-cell>This is a cell</nx-comparison-table-intersection-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class NonStickyHeaderComponent extends RowTest {
    mayStick = false;
}
