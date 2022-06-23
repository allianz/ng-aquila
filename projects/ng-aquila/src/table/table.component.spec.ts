import { ChangeDetectionStrategy, Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NxExpandableTableDirective } from './expandable/expandable-table.directive';
import { NxHeaderCellDirective } from './header-cell.directive';
import { NxTableComponent } from './table.component';
import { NxTableModule } from './table.module';
import { NxTableCellComponent } from './table-cell.component';
import { NxTableRowComponent } from './table-row.component';

@Directive()
abstract class TableTest {
    @ViewChild(NxTableComponent) tableInstance!: NxTableComponent;
}

describe(NxTableComponent.name, () => {
    const ZEBRA_CSS_CLASS = 'nx-table--zebra';
    const CONDENSED_CSS_CLASS = 'nx-table--condensed';
    const STICKY_FIRST_CSS_CLASS = 'nx-table--sticky-first';
    const STICKY_LAST_CSS_CLASS = 'nx-table--sticky-last';

    let fixture: ComponentFixture<TableTest>;
    let testInstance: TableTest;
    let tableInstance: NxTableComponent;
    let tableElement: DebugElement;

    function createTestComponent(component: Type<TableTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        tableInstance = testInstance.tableInstance;
        tableElement = fixture.debugElement.query(By.css('table'));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleTableComponent, ZebraTableComponent, CondensedTableComponent, NxExpandableTableDirective],
            imports: [NxTableModule, NoopAnimationsModule],
        }).compileComponents();
    }));

    describe('basic', () => {
        it('has created the component', () => {
            createTestComponent(SimpleTableComponent);
            expect(tableInstance).toBeTruthy();
        });

        it('every header cell has the bem class', () => {
            createTestComponent(SimpleTableComponent);
            tableElement.queryAll(By.directive(NxHeaderCellDirective)).forEach(element => {
                expect(element.nativeElement).toHaveClass('nx-header-cell');
            });
        });

        it('has zebra styling', () => {
            createTestComponent(ZebraTableComponent);
            expect(tableElement.nativeElement).toHaveClass(ZEBRA_CSS_CLASS);
        });

        it('should ignore zebra styling in expandable mode', () => {
            createTestComponent(ExpandableNonZebraTableComponent);
            expect(tableElement.nativeElement).not.toHaveClass(ZEBRA_CSS_CLASS);
        });

        it('has condensed styling', () => {
            createTestComponent(CondensedTableComponent);
            expect(tableElement.nativeElement).toHaveClass(CONDENSED_CSS_CLASS);
        });

        it('every table cell contains the bem class', () => {
            createTestComponent(SimpleTableComponent);
            tableElement.queryAll(By.directive(NxTableCellComponent)).forEach(element => {
                expect(element.nativeElement).toHaveClass('nx-table-cell');
            });
        });

        it('every table row contains the bem class', () => {
            createTestComponent(SimpleTableComponent);
            tableElement.queryAll(By.directive(NxTableRowComponent)).forEach(element => {
                expect(element.nativeElement).toHaveClass('nx-table-row');
            });
        });
    });

    describe('programatic', () => {
        it('zebra change to false should deactivate the zebra mode', () => {
            createTestComponent(ZebraTableComponent);
            tableInstance.zebra = false;
            fixture.detectChanges();
            expect(tableElement.nativeElement).not.toHaveClass(ZEBRA_CSS_CLASS);
        });

        it('zebra change to true should activate the zebra mode', () => {
            createTestComponent(SimpleTableComponent);
            tableInstance.zebra = true;
            fixture.detectChanges();
            expect(tableElement.nativeElement).toHaveClass(ZEBRA_CSS_CLASS);
        });

        it('condensed change to false should deactivate the condensed mode', () => {
            createTestComponent(CondensedTableComponent);
            tableInstance.condensed = false;
            fixture.detectChanges();
            expect(tableElement.nativeElement).not.toHaveClass(CONDENSED_CSS_CLASS);
        });

        it('condensed change to true should activate the condensed mode', () => {
            createTestComponent(SimpleTableComponent);
            tableInstance.condensed = true;
            fixture.detectChanges();
            expect(tableElement.nativeElement).toHaveClass(CONDENSED_CSS_CLASS);
        });

        it('sticky set to first should add a corresponding class', () => {
            createTestComponent(SimpleTableComponent);
            tableInstance.sticky = 'first';
            fixture.detectChanges();
            expect(tableElement.nativeElement).toHaveClass(STICKY_FIRST_CSS_CLASS);
            tableInstance.sticky = 'last';
            fixture.detectChanges();
            expect(tableElement.nativeElement).toHaveClass(STICKY_LAST_CSS_CLASS);
            tableInstance.sticky = 'both';
            fixture.detectChanges();
            expect(tableElement.nativeElement).toHaveClass(STICKY_FIRST_CSS_CLASS);
            expect(tableElement.nativeElement).toHaveClass(STICKY_LAST_CSS_CLASS);
        });
    });
});

@Component({
    template: `<table nxTable>
        <thead>
            <tr nxTableRow>
                <th nxHeaderCell></th>
            </tr>
        </thead>
        <tbody>
            <tr nxTableRow>
                <td nxCell></td>
            </tr>
        </tbody>
    </table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class SimpleTableComponent extends TableTest {}

@Component({
    template: `<table nxTable zebra>
        <thead>
            <tr nxTableRow>
                <th nxHeaderCell></th>
            </tr>
        </thead>
        <tbody>
            <tr nxTableRow>
                <td nxTableCell></td>
            </tr>
        </tbody>
    </table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class ZebraTableComponent extends TableTest {}

@Component({
    template: `<table nxTable nxExpandableTable zebra>
        <thead>
            <tr nxTableRow>
                <th nxHeaderCell></th>
            </tr>
        </thead>
        <tbody>
            <tr nxTableRow>
                <td nxTableCell></td>
            </tr>
        </tbody>
    </table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class ExpandableNonZebraTableComponent extends TableTest {}

@Component({
    template: `<table nxTable condensed>
        <thead>
            <tr nxTableRow>
                <th nxHeaderCell></th>
            </tr>
        </thead>
        <tbody>
            <tr nxTableRow>
                <td nxTableCell></td>
            </tr>
        </tbody>
    </table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class CondensedTableComponent extends TableTest {}
