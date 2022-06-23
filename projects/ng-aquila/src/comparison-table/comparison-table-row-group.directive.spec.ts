import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { COMPARISON_TABLE_DEFAULT_OPTIONS, ComparisonTableDefaultOptions } from './comparison-table.models';
import { NxComparisonTableModule } from './comparison-table.module';
import { NxComparisonTableRowGroupDirective } from './comparison-table-row-group.directive';

declare let viewport: any;
const THROTTLE_TIME = 200;

const comparisonTableDefaultOptions: ComparisonTableDefaultOptions = {
    useFullRowForExpandableArea: true,
};

@Directive()
abstract class RowGroupTest {
    visibleRows = 2;
    labelCollapsed = 'To be opened';
    labelExpanded = 'To be closed';
    isExpanded = false;
    useFullRowForExpandableArea = false;
    @ViewChild(NxComparisonTableRowGroupDirective) rowGroupDirective!: NxComparisonTableRowGroupDirective;
}

describe('NxComparisonTableRowGroupDirective', () => {
    let fixture: ComponentFixture<RowGroupTest>;
    let testInstance: RowGroupTest;
    let rowGroupElement: DebugElement;
    let flexRowElements: DebugElement[] | null;

    function createTestComponent(component: Type<RowGroupTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        rowGroupElement = fixture.debugElement.query(By.css('nx-comparison-table-desktop-group'));
        flexRowElements = rowGroupElement ? rowGroupElement.queryAll(By.css('nx-comparison-table-flex-row')) : null;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxComparisonTableModule, BrowserAnimationsModule],
            declarations: [BasicComponent, ConfigurableComponent, ToggleSectionComponent],
        });
        TestBed.compileComponents();
    }));

    describe('basic', () => {
        it('should show expandable button area correctly', () => {
            createTestComponent(BasicComponent);
            const expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement.nativeElement.textContent.trim()).toBe('More services');
        });

        it('should show 5 rows by default', () => {
            createTestComponent(BasicComponent);
            expect(flexRowElements).toHaveSize(5);
        });

        it('should not show expandable button area if the number of rows is less than visibleRows', () => {
            createTestComponent(ConfigurableComponent);
            testInstance.visibleRows = 15;
            fixture.detectChanges();

            const expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement).toBeNull();
        });

        it('correctly changes visibleRows', () => {
            createTestComponent(ConfigurableComponent);
            expect(flexRowElements).toHaveSize(2);

            testInstance.visibleRows = 4;
            fixture.detectChanges();
            flexRowElements = rowGroupElement.queryAll(By.css('nx-comparison-table-flex-row'));
            expect(flexRowElements).toHaveSize(4);
        });

        it('changes the labels on input change', () => {
            createTestComponent(ConfigurableComponent);
            let expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement.nativeElement.textContent.trim()).toBe('To be opened');

            testInstance.labelCollapsed = 'Open me!';
            fixture.detectChanges();
            expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement.nativeElement.textContent.trim()).toBe('Open me!');

            // Expand row group
            expandableButtonElement.nativeElement.click();
            fixture.detectChanges();
            expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement.nativeElement.textContent.trim()).toBe('To be closed');

            testInstance.labelExpanded = 'Close me!';
            fixture.detectChanges();
            expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement.nativeElement.textContent.trim()).toBe('Close me!');
        });

        it('should expand on click and display all rows', () => {
            createTestComponent(BasicComponent);

            let expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expandableButtonElement.nativeElement.click();
            fixture.detectChanges();
            flexRowElements = rowGroupElement.queryAll(By.css('nx-comparison-table-flex-row'));
            expect(flexRowElements).toHaveSize(10);

            expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement.nativeElement.textContent.trim()).toBe('Less services');
        });

        it('renders correctly inside a toggle section', () => {
            createTestComponent(ToggleSectionComponent);

            const expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement.nativeElement.textContent.trim()).toBe('More services');
            expect(flexRowElements).toHaveSize(5);
        });

        it('sets useFullRowForExpandableArea to false by default', () => {
            createTestComponent(BasicComponent);
            expect(testInstance.rowGroupDirective.useFullRowForExpandableArea).toBeFalse();
            const expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement.nativeElement).not.toHaveClass('full-width');
        });

        describe('with binding to isExpanded property', () => {
            it('should show expanded rows if set to true', () => {
                createTestComponent(ConfigurableComponent);
                testInstance.isExpanded = true;

                fixture.detectChanges();
                flexRowElements = rowGroupElement.queryAll(By.css('nx-comparison-table-flex-row'));
                expect(flexRowElements).toHaveSize(10);
            });

            it('should hide expanded rows if set to false', () => {
                createTestComponent(ConfigurableComponent);
                testInstance.isExpanded = true;
                fixture.detectChanges();

                testInstance.isExpanded = false;
                fixture.detectChanges();

                flexRowElements = rowGroupElement.queryAll(By.css('nx-comparison-table-flex-row'));
                expect(flexRowElements).toHaveSize(2);
            });

            it('should update parent property when user changes expanded state', () => {
                createTestComponent(ConfigurableComponent);
                expect(testInstance.isExpanded).toBeFalse();

                const expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
                expandableButtonElement.nativeElement.click();
                fixture.detectChanges();
                expect(testInstance.isExpanded).toBeTrue();
            });
        });

        describe('responsive', () => {
            it('should display the table correctly on mobile', fakeAsync(() => {
                viewport.set('mobile');
                window.dispatchEvent(new Event('resize'));
                createTestComponent(BasicComponent);
                tick(THROTTLE_TIME);
                fixture.detectChanges();

                const rowElements = fixture.debugElement.queryAll(By.css('tr'));
                expect(rowElements).toHaveSize(3);

                // 11 mobile columns + 1 placeholder
                expect(rowElements[0].queryAll(By.css('th'))).toHaveSize(12);
                expect(rowElements[1].queryAll(By.css('td'))).toHaveSize(12);
                expect(rowElements[2].queryAll(By.css('td'))).toHaveSize(12);
            }));

            afterEach(() => {
                viewport.reset();
            });
        });

        describe('a11y', () => {
            it('toggles on ENTER', () => {
                createTestComponent(BasicComponent);
                const expandableButtonElement = rowGroupElement.nativeElement.querySelector('.nx-comparison-table__group-expansion-cell');

                // expand
                dispatchKeyboardEvent(expandableButtonElement, 'keydown', ENTER);
                fixture.detectChanges();
                flexRowElements = rowGroupElement.queryAll(By.css('nx-comparison-table-flex-row'));
                expect(flexRowElements).toHaveSize(10);

                // collapse
                dispatchKeyboardEvent(expandableButtonElement, 'keydown', ENTER);
                fixture.detectChanges();
                flexRowElements = rowGroupElement.queryAll(By.css('nx-comparison-table-flex-row'));
                expect(flexRowElements).toHaveSize(5);
            });

            it('toggles on SPACE', () => {
                createTestComponent(BasicComponent);
                const expandableButtonElement = rowGroupElement.nativeElement.querySelector('.nx-comparison-table__group-expansion-cell');

                // expand
                dispatchKeyboardEvent(expandableButtonElement, 'keydown', SPACE);
                fixture.detectChanges();
                flexRowElements = rowGroupElement.queryAll(By.css('nx-comparison-table-flex-row'));
                expect(flexRowElements).toHaveSize(10);

                // collapse
                dispatchKeyboardEvent(expandableButtonElement, 'keydown', SPACE);
                fixture.detectChanges();
                flexRowElements = rowGroupElement.queryAll(By.css('nx-comparison-table-flex-row'));
                expect(flexRowElements).toHaveSize(5);
            });
        });
    });
});

describe('NxComparisonTableRowGroupDirective using injection token', () => {
    let fixture: ComponentFixture<RowGroupTest>;
    let testInstance: RowGroupTest;
    let rowGroupElement: DebugElement;

    function createTestComponent(component: Type<RowGroupTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        rowGroupElement = fixture.debugElement.query(By.css('nx-comparison-table-desktop-group'));
    }

    beforeEach(waitForAsync(() => {
        comparisonTableDefaultOptions.useFullRowForExpandableArea = true;
        TestBed.configureTestingModule({
            imports: [NxComparisonTableModule, BrowserAnimationsModule],
            declarations: [BasicComponent, ConfigurableComponent],
            providers: [{ provide: COMPARISON_TABLE_DEFAULT_OPTIONS, useValue: comparisonTableDefaultOptions }],
        });
        TestBed.compileComponents();
    }));

    it('changes useFullRowForExpandableArea on injection token change', inject(
        [COMPARISON_TABLE_DEFAULT_OPTIONS],
        (defaultOptions: ComparisonTableDefaultOptions) => {
            createTestComponent(BasicComponent);
            expect(testInstance.rowGroupDirective.useFullRowForExpandableArea).toBeTrue();
            const expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
            expect(expandableButtonElement.nativeElement).toHaveClass('full-width');

            defaultOptions.useFullRowForExpandableArea = false;
            fixture.detectChanges();
            expect(testInstance.rowGroupDirective.useFullRowForExpandableArea).toBeFalse();
            expect(expandableButtonElement.nativeElement).not.toHaveClass('full-width');
        },
    ));

    it('useFullRowForExpandableArea can be overwritten when injection token is used', () => {
        createTestComponent(ConfigurableComponent);
        testInstance.useFullRowForExpandableArea = true;
        fixture.detectChanges();
        expect(testInstance.rowGroupDirective.useFullRowForExpandableArea).toBeTrue();
        const expandableButtonElement = rowGroupElement.query(By.css('.nx-comparison-table__group-expansion-cell'));
        expect(expandableButtonElement.nativeElement).toHaveClass('full-width');
    });
});

@Component({
    template: `
        <nx-comparison-table>
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRowGroup>
                <ng-container nxComparisonTableRow *ngFor="let i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
                    <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                </ng-container>
            </ng-container>
            <ng-container nxComparisonTableRow type="footer">
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class BasicComponent extends RowGroupTest {}

@Component({
    template: `
        <nx-comparison-table>
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container
                nxComparisonTableRowGroup
                [labelCollapsed]="labelCollapsed"
                [labelExpanded]="labelExpanded"
                [visibleRows]="visibleRows"
                [(isExpanded)]="isExpanded"
                [useFullRowForExpandableArea]="useFullRowForExpandableArea"
            >
                <ng-container nxComparisonTableRow *ngFor="let i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
                    <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                </ng-container>
            </ng-container>
            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow type="footer">
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class ConfigurableComponent extends RowGroupTest {}

@Component({
    template: `
        <nx-comparison-table>
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableToggleSection>
                <nx-comparison-table-toggle-section-header>Toggle section header</nx-comparison-table-toggle-section-header>
                <ng-container nxComparisonTableRowGroup>
                    <ng-container nxComparisonTableRow *ngFor="let i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
                        <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                        <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                        <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    </ng-container>
                </ng-container>
            </ng-container>
            <ng-container nxComparisonTableRow type="footer">
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class ToggleSectionComponent extends RowGroupTest {}
