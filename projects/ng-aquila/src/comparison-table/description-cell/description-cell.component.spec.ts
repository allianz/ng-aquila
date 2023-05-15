import { Component, DebugElement, Directive, QueryList, Type, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import axe from 'axe-core';

import { BASIC_COMPARISON_TABLE_TEMPLATE } from '../comparison-table.component.spec';
import { NxComparisonTableModule } from '../comparison-table.module';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxComparisonTableDescriptionCell } from './description-cell.component';

declare let viewport: any;
const THROTTLE_TIME = 200;

@Directive()
abstract class DescriptionCellTest {
    @ViewChildren(NxComparisonTableDescriptionCell) descriptionCellInstances!: QueryList<NxComparisonTableDescriptionCell>;
    @ViewChildren(NxComparisonTableRowDirective) rowInstances!: QueryList<NxComparisonTableRowDirective>;

    descriptionId = 'description-cell';
}

describe('NxComparisonTableDescriptionCell', () => {
    let fixture: ComponentFixture<DescriptionCellTest>;
    let testInstance: DescriptionCellTest;
    let descriptionCellInstances: QueryList<NxComparisonTableDescriptionCell>;
    let descriptionCellElements: DebugElement[];
    let rowInstances: QueryList<NxComparisonTableRowDirective>;

    function createTestComponent(component: Type<DescriptionCellTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        descriptionCellInstances = testInstance.descriptionCellInstances;
        descriptionCellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__description-cell'));
        rowInstances = testInstance.rowInstances;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxComparisonTableModule],
            declarations: [DescriptionCellComponent, ConfigurableDescriptionCellComponent],
        });
        TestBed.compileComponents();
    }));

    describe('basic', () => {
        it('renders the content', () => {
            createTestComponent(DescriptionCellComponent);
            expect(descriptionCellElements).toHaveSize(2);
            expect(descriptionCellElements[0].nativeElement.textContent).toBe('This is a description cell');
            expect(descriptionCellElements[1].nativeElement.textContent).toBe('This is a second description cell');
        });

        it('should set ids correctly', () => {
            createTestComponent(DescriptionCellComponent);
            descriptionCellInstances.forEach(cell => {
                expect(cell.id).toMatch(/^nx-comparison-table-description-cell-\d+$/);
            });
            descriptionCellElements.forEach(cell => {
                expect(cell.nativeElement.id).toMatch(/^nx-comparison-table-description-cell-\d+$/);
            });
        });

        it('should set id on input change', () => {
            createTestComponent(ConfigurableDescriptionCellComponent);
            expect(descriptionCellInstances.toArray()[0].id).toBe('description-cell');
            expect(descriptionCellElements[0].nativeElement.id).toBe('description-cell');

            testInstance.descriptionId = 'description-test-cell';
            fixture.detectChanges();
            expect(descriptionCellInstances.toArray()[0].id).toBe('description-test-cell');
            expect(descriptionCellElements[0].nativeElement.id).toBe('description-test-cell');
        });

        it('should have set the correct class if intersectionRow', () => {
            createTestComponent(DescriptionCellComponent);
            expect(descriptionCellInstances).toHaveSize(2);
            expect(rowInstances.toArray()[1]._isIntersectionRow()).toBeFalse();
            expect(rowInstances.toArray()[2]._isIntersectionRow()).toBeTrue();

            // should not contain the is-intersection-column class on desktop
            expect(descriptionCellElements[0].nativeElement).not.toHaveClass('is-intersection-column');
            expect(descriptionCellElements[1].nativeElement).not.toHaveClass('is-intersection-column');
        });
    });

    describe('responsive behaviour', () => {
        it('renders the content on mobile', fakeAsync(() => {
            viewport.set('mobile');
            createTestComponent(DescriptionCellComponent);
            tick(THROTTLE_TIME);

            expect(descriptionCellElements[0].nativeElement.textContent).toBe('This is a description cell');
            expect(descriptionCellElements[1].nativeElement.textContent).toBe('This is a second description cell');
        }));

        it('should set the correct css class for intersectionRows (mobile)', fakeAsync(() => {
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(DescriptionCellComponent);
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            descriptionCellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__description-cell'));
            expect(descriptionCellElements[0].nativeElement).not.toHaveClass('is-intersection-column');
            expect(descriptionCellElements[1].nativeElement).toHaveClass('is-intersection-column');
        }));

        it('should set id correctly (mobile)', fakeAsync(() => {
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(DescriptionCellComponent);
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            expect(descriptionCellElements[0].nativeElement.id).toMatch(/^nx-comparison-table-description-cell-\d+$/);
        }));

        afterEach(() => {
            viewport.reset();
        });
    });

    describe('a11y', () => {
        it('should have set the roles correctly (desktop)', () => {
            createTestComponent(DescriptionCellComponent);
            expect(descriptionCellElements[0].attributes.role).toBe('rowheader');
        });

        it('should have set the roles correctly (tablet)', fakeAsync(() => {
            viewport.set('tablet');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(DescriptionCellComponent);
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            descriptionCellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__description-cell'));
            expect(descriptionCellElements[0].attributes.role).toBe('columnheader');
        }));

        it('should have set the roles correctly (mobile)', fakeAsync(() => {
            viewport.set('mobile');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(DescriptionCellComponent);

            tick(THROTTLE_TIME);
            fixture.detectChanges();

            descriptionCellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__description-cell'));
            expect(descriptionCellElements[0].attributes.role).toBeUndefined();
            expect(descriptionCellElements[0].attributes.scope).toBe('col');
        }));

        it('should not have set an aria-colspan (desktop)', () => {
            createTestComponent(DescriptionCellComponent);
            expect(descriptionCellElements[0].attributes['aria-colspan']).toBe('1');
        });

        it('should have set the correct aria-colspan (tablet)', fakeAsync(() => {
            createTestComponent(DescriptionCellComponent);
            viewport.set('tablet');
            window.dispatchEvent(new Event('resize'));

            tick(THROTTLE_TIME);
            fixture.detectChanges();

            descriptionCellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__description-cell'));
            expect(descriptionCellElements[0].attributes['aria-colspan']).toBe('2');
        }));

        it('has no accessibility violations', done => {
            createTestComponent(DescriptionCellComponent);

            axe.run(
                fixture.nativeElement,
                {
                    rules: {
                        'empty-table-header': { enabled: false },
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
});

@Component({
    template: BASIC_COMPARISON_TABLE_TEMPLATE,
})
class DescriptionCellComponent extends DescriptionCellTest {
    data = [
        { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
        { type: 'content', description: 'This is a second description cell', intersection: 'This is a cell' },
        { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
    ];
}

@Component({
    template: `
        <nx-comparison-table>
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell [id]="descriptionId">This is a description cell</nx-comparison-table-description-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow type="footer">
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class ConfigurableDescriptionCellComponent extends DescriptionCellTest {}
