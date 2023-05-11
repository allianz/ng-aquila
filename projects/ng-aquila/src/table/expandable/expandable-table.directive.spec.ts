import { ChangeDetectionStrategy, Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NxTableComponent } from '../table.component';
import { NxTableModule } from '../table.module';
import { NxExpandableTableDirective } from './expandable-table.directive';

@Directive()
abstract class TableTest {
    @ViewChild(NxExpandableTableDirective) expandableTableInstance!: NxExpandableTableDirective;
}

describe(NxTableComponent.name, () => {
    let fixture: ComponentFixture<TableTest>;
    let testInstance: TableTest;
    let tableInstance: NxExpandableTableDirective;
    let tableElement: DebugElement;

    function createTestComponent(component: Type<TableTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        tableInstance = testInstance.expandableTableInstance;
        tableElement = fixture.debugElement.query(By.directive(NxTableComponent));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ExpandableTableComponent],
            imports: [NxTableModule, NoopAnimationsModule],
        }).compileComponents();
    }));

    it('has created the component', () => {
        createTestComponent(ExpandableTableComponent);
        expect(tableInstance).toBeTruthy();
    });

    describe('expandable table rows', () => {
        beforeEach(fakeAsync(() => {
            createTestComponent(ExpandableTableComponent);
            tick();
        }));

        it('has all expandable rows closed', () => {
            tableElement.queryAll(By.css('.nx-expandable-table-cell__content')).forEach(cell => {
                expect(cell.nativeElement.style.height).toBe('0px');
            });
        });

        it('finds its nested row children', () => {
            expect(tableInstance.rows).not.toHaveSize(0);
        });

        describe('when clicking on the toggle all button', () => {
            let toggleButton: DebugElement;
            let expandableRow: DebugElement;

            beforeEach(fakeAsync(() => {
                expandableRow = fixture.debugElement.query(By.css('[nxExpandableTableRow]'));
                toggleButton = fixture.debugElement.query(By.css('[nxHeaderCell] nx-toggle-button > button'));
                toggleButton.triggerEventHandler('click', {});
                fixture.detectChanges();
                flush();
            }));

            it('has expanded all rows', () => {
                tableElement.queryAll(By.css('.nx-expandable-table-cell__content')).forEach(cell => {
                    expect(cell.nativeElement.style.height).toBe('');
                });
            });

            describe('and clicking on the toggle button again', () => {
                beforeEach(fakeAsync(() => {
                    toggleButton.triggerEventHandler('click', {});
                    fixture.detectChanges();
                    flush();
                }));

                it('has collapsed all rows', () => {
                    tableElement.queryAll(By.css('.nx-expandable-table-cell__content')).forEach(cell => {
                        expect(cell.nativeElement.style.height).toBe('0px');
                    });
                });
            });
        });
    });

    describe('programatic', () => {
        beforeEach(fakeAsync(() => {
            createTestComponent(ExpandableTableComponent);
            tick();
        }));

        describe('when expanding the table', () => {
            beforeEach(() => {
                tableInstance.expand();
                fixture.detectChanges();
            });

            it('has all rows expanded', () => {
                tableElement.queryAll(By.css('.nx-expandable-table-cell__content')).forEach(cell => {
                    expect(cell.nativeElement.style.height).toBe('');
                });
            });

            describe('and closing the table', () => {
                beforeEach(fakeAsync(() => {
                    tableInstance.close();
                    fixture.detectChanges();
                    tick();
                }));

                it('has no rows expanded', () => {
                    tableElement.queryAll(By.css('.nx-expandable-table-cell__content')).forEach(cell => {
                        expect(cell.nativeElement.style.height).toBe('0px');
                    });
                });
            });
        });

        describe('when toggling the table', () => {
            beforeEach(() => {
                tableInstance.toggle();
                fixture.detectChanges();
            });

            it('has all rows expanded', () => {
                tableElement.queryAll(By.css('.nx-expandable-table-cell__content')).forEach(cell => {
                    expect(cell.nativeElement.style.height).toBe('');
                });
            });
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(ExpandableTableComponent);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<table nxTable nxExpandableTable #expandableTable="nxExpandableTable">
        <thead>
            <tr nxTableRow>
                <td nxHeaderCell>
                    <nx-toggle-button [target]="expandableTable" ariaLabel="toggle all rows"></nx-toggle-button>
                </td>
                <th nxHeaderCell>toggle all rows</th>
            </tr>
        </thead>
        <tbody>
            <tr nxTableRow>
                <td nxTableCell></td>
            </tr>
            <tr nxExpandableTableRow #row1>
                <td nxExpandableTableCell></td>
            </tr>
            <tr nxTableRow>
                <td nxTableCell></td>
            </tr>
            <tr nxExpandableTableRow #row2>
                <td nxExpandableTableCell></td>
            </tr>
        </tbody>
    </table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class ExpandableTableComponent extends TableTest {}
