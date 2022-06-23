import { Component, Directive, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxComparisonTableModule } from '../comparison-table.module';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxComparisonTablePopularCell } from './popular-cell.component';

declare let viewport: any;
const THROTTLE_TIME = 200;

@Directive()
abstract class PopularCellTest {
    @ViewChild(NxComparisonTablePopularCell) popularCellInstance!: NxComparisonTablePopularCell;
    @ViewChildren(NxComparisonTableRowDirective) rowInstances!: QueryList<NxComparisonTableRowDirective>;

    popularCellId = 'popular-cell';
}

describe('NxComparisonTablePopularCell', () => {
    let fixture: ComponentFixture<PopularCellTest>;
    let testInstance: PopularCellTest;
    let popularCellInstance: NxComparisonTablePopularCell;
    let popularCellElement: HTMLElement;

    function createTestComponent(component: Type<PopularCellTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        popularCellInstance = testInstance.popularCellInstance;
        popularCellElement = fixture.nativeElement.querySelector('.nx-comparison-table__popular-cell');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxComparisonTableModule],
            declarations: [PopularCellComponent],
        });
        TestBed.compileComponents();
    }));

    it('renders the content correctly', () => {
        createTestComponent(PopularCellComponent);
        expect(popularCellInstance).toBeDefined();
        expect(popularCellElement.textContent).toBe('Popular cell');
    });

    it('sets the id correctly', () => {
        createTestComponent(PopularCellComponent);
        expect(popularCellElement.id).toBe('popular-cell');
    });

    it('places the popular cell above the correct column', () => {
        createTestComponent(PopularCellComponent);

        const popularCellColumn = popularCellInstance.forColumn + 1; // +1 for the row header
        const popularCell = fixture.nativeElement.querySelector(`.nx-comparison-table__popular-cell:nth-child(${popularCellColumn})`);
        // make sure the placeholder cells are not the popular cell
        const placeholder1 = fixture.nativeElement.querySelector('.nx-comparison-table__popular-cell:nth-child(1)');
        const placeholder2 = fixture.nativeElement.querySelector('.nx-comparison-table__popular-cell:nth-child(2)');
        const placeholder4 = fixture.nativeElement.querySelector('.nx-comparison-table__popular-cell:nth-child(4)');

        expect(popularCell).toBeDefined();
        expect(placeholder1).toBeNull();
        expect(placeholder2).toBeNull();
        expect(placeholder4).toBeNull();
    });

    it('should have the correct number of placeholder cells in the popular cell row (desktop)', () => {
        createTestComponent(PopularCellComponent);
        const placeholderCells = fixture.nativeElement.querySelectorAll('.nx-comparison-table__placeholder-cell.is-popular-placeholder-cell');
        expect(placeholderCells).toHaveSize(3);
    });

    it('should have the correct number of placeholder cells in the popular cell row (tablet)', fakeAsync(() => {
        viewport.set('tablet');
        window.dispatchEvent(new Event('resize'));

        createTestComponent(PopularCellComponent);
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        const placeholderCells = fixture.nativeElement.querySelectorAll('.nx-comparison-table__placeholder-cell.is-popular-placeholder-cell');
        expect(placeholderCells).toHaveSize(2);
    }));

    it('should display cell on mobile', fakeAsync(() => {
        createTestComponent(PopularCellComponent);
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        const popularCell = fixture.debugElement.query(By.css('.nx-comparison-table__mobile-popular-cell'));
        expect(popularCell).toBeDefined();
        expect(popularCell.nativeElement.textContent).toBe('Popular cell');
    }));

    it('should have the correct number of placeholder cells in the popular cell row (mobile)', fakeAsync(() => {
        createTestComponent(PopularCellComponent);
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        const popularRow = fixture.debugElement.query(By.css('.nx-comparison-table__popular-row'));
        expect(popularRow).toBeDefined();

        const placeholderCells = popularRow.nativeElement.querySelectorAll('.nx-comparison-table__placeholder-cell');
        expect(placeholderCells).toHaveSize(1);
        const emptyCells = popularRow.nativeElement.querySelectorAll('.nx-comparison-table__placeholder-with-border-cell');
        expect(emptyCells).toHaveSize(1);
    }));

    afterEach(() => viewport.reset());
});

@Component({
    template: `
        <nx-comparison-table selectedIndex="1">
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-popular-cell [id]="popularCellId" forColumn="2">Popular cell</nx-comparison-table-popular-cell>
                <nx-comparison-table-cell type="header">
                    <p class="product-title">Product 1</p>
                    <p class="product-price">105,99 €</p>
                </nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">
                    <p class="product-title">Product 2</p>
                    <p class="product-price">110,99 €</p>
                </nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">
                    <p class="product-title">Product 3</p>
                    <p class="product-price">115,99 €</p>
                </nx-comparison-table-cell>
            </ng-container>

            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>Service headline</nx-comparison-table-description-cell>
                <nx-comparison-table-cell>100 Mio. Euro</nx-comparison-table-cell>
                <nx-comparison-table-cell>150 Mio. Euro</nx-comparison-table-cell>
                <nx-comparison-table-cell>200 Mio. Euro</nx-comparison-table-cell>
            </ng-container>

            <ng-container nxComparisonTableRow type="footer">
                <nx-comparison-table-cell>
                    <p class="product-underline">Some short information</p>
                </nx-comparison-table-cell>
                <nx-comparison-table-cell>
                    <p class="product-underline">Some short information</p>
                </nx-comparison-table-cell>
                <nx-comparison-table-cell>
                    <p class="product-underline">Some short information</p>
                </nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class PopularCellComponent extends PopularCellTest {}
