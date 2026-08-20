import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxComparisonTableModule } from '../comparison-table.module';
import { NxComparisonTableRowDirective } from '../comparison-table-row.directive';
import { NxComparisonTablePopularCell } from './popular-cell.component';

declare let viewport: any;
const THROTTLE_TIME = 200;

@Directive({ standalone: true })
abstract class PopularCellTest {
  @ViewChild(NxComparisonTablePopularCell)
  popularCellInstance!: NxComparisonTablePopularCell;
  @ViewChildren(NxComparisonTableRowDirective)
  rowInstances!: QueryList<NxComparisonTableRowDirective>;

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
      imports: [NxComparisonTableModule, PopularCellComponent],
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

    // popular row lives inside thead .is-popular-row
    const popularRow = fixture.nativeElement.querySelector('thead .is-popular-row');
    expect(popularRow).toBeTruthy();

    // Among the product-column cells (placeholders + popular cell, excluding the
    // desktop-only leading corner cell), the popular cell sits at index forColumn - 1.
    const productCells = Array.from(popularRow.children as HTMLCollectionOf<HTMLElement>).filter(
      (el) => !el.classList.contains('nx-comparison-table__corner-cell'),
    );

    const popularIndex = productCells.findIndex((el) =>
      el.classList.contains('nx-comparison-table__popular-cell'),
    );
    expect(popularIndex).toBe(popularCellInstance.forColumn - 1);
  });

  it('should have the correct number of placeholder cells in the popular cell row (desktop)', fakeAsync(() => {
    viewport.set('desktop');
    window.dispatchEvent(new Event('resize'));
    createTestComponent(PopularCellComponent);
    tick(THROTTLE_TIME);
    fixture.detectChanges();

    // forColumn=2, headerCells=3 → 1 before + 1 after = 2 placeholders in the popular row
    const popularRow = fixture.nativeElement.querySelector('thead .is-popular-row');
    const placeholderCells = popularRow.querySelectorAll('.nx-comparison-table__placeholder-cell');
    expect(placeholderCells).toHaveLength(2);
    flush();
  }));

  it('should have the correct number of placeholder cells in the popular cell row (tablet)', fakeAsync(() => {
    viewport.set('tablet');
    window.dispatchEvent(new Event('resize'));

    createTestComponent(PopularCellComponent);
    tick(THROTTLE_TIME);
    fixture.detectChanges();

    // tablet: same header-track structure, same 2 placeholders
    const popularRow = fixture.nativeElement.querySelector('thead .is-popular-row');
    const placeholderCells = popularRow.querySelectorAll('.nx-comparison-table__placeholder-cell');
    expect(placeholderCells).toHaveLength(2);
    flush();
  }));

  it('should display cell on mobile', fakeAsync(() => {
    createTestComponent(PopularCellComponent);
    viewport.set('mobile');
    window.dispatchEvent(new Event('resize'));
    tick(THROTTLE_TIME);
    fixture.detectChanges();

    const popularCell = fixture.debugElement.query(
      By.css('.nx-comparison-table__mobile-popular-cell'),
    );
    expect(popularCell).toBeDefined();
    expect(popularCell.nativeElement.textContent).toBe('Popular cell');
    flush();
  }));

  it('should have the correct number of placeholder cells in the popular cell row (mobile)', fakeAsync(() => {
    createTestComponent(PopularCellComponent);
    viewport.set('mobile');
    window.dispatchEvent(new Event('resize'));
    tick(THROTTLE_TIME);
    fixture.detectChanges();

    const popularRow = fixture.debugElement.query(By.css('.nx-comparison-table__popular-row'));
    expect(popularRow).toBeDefined();

    const placeholderCells = popularRow.nativeElement.querySelectorAll(
      '.nx-comparison-table__placeholder-cell',
    );
    expect(placeholderCells).toHaveLength(1);
    const emptyCells = popularRow.nativeElement.querySelectorAll(
      '.nx-comparison-table__placeholder-with-border-cell',
    );
    expect(emptyCells).toHaveLength(1);
  }));
});

@Component({
  selector: 'test-popular-cell-component',
  template: `
    <nx-comparison-table selectedIndex="1">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-popular-cell [id]="popularCellId" forColumn="2"
          >Popular cell</nx-comparison-table-popular-cell
        >
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
        <nx-comparison-table-description-cell
          >Service headline</nx-comparison-table-description-cell
        >
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
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class PopularCellComponent extends PopularCellTest {}
