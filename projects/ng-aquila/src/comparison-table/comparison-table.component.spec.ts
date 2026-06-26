import { NxAllianzOneModule } from '@allianz/ng-aquila/config/allianz-one';
import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { BidiModule } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  QueryList,
  signal,
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
import axe from 'axe-core';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableComponent } from './comparison-table.component';
import {
  COMPARISON_TABLE_DEFAULT_OPTIONS,
  NxComparisonTableBreakpoint,
} from './comparison-table.models';
import { NxComparisonTableModule } from './comparison-table.module';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';

declare let viewport: any;
const THROTTLE_TIME = 400;

// Carousel/overflow mode is A1-only (`_isOverflowing` gates on `_isA1()`). Provide the token at
// COMPONENT scope (not via NxAllianzOneModule in `imports`) so it stays on this host's element
// injector — importing the module would hoist ALLIANZ_ONE into the shared TestBed and enable A1
// for every other host, flipping their mobile views to tablet (the A1 mobile→tablet promotion).
const A1_PROVIDERS = [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }];

export const BASIC_COMPARISON_TABLE_TEMPLATE = `
  <nx-comparison-table>
          @for (el of data; track $index) {
            @let element = $any(el);
            @if ($any(element)['type'] === 'toggleSection') {
              <ng-container nxComparisonTableToggleSection>
                <nx-comparison-table-toggle-section-header>{{ element['header'] }}</nx-comparison-table-toggle-section-header>
                @for (row of $any(element)['content']; track $index) {
                  <ng-container nxComparisonTableRow>
                    @if (row['description']) {
                      <nx-comparison-table-description-cell>{{ row['description'] }}</nx-comparison-table-description-cell
                        >
                        }>
                        @for (cell of row['cells']; track $index) {
                          <nx-comparison-table-cell>{{ cell }}</nx-comparison-table-cell>
                        }
                        @if (row['intersection']) {
                          <nx-comparison-table-intersection-cell>{{ row['intersection'] }}</nx-comparison-table-intersection-cell>
                        }
                      </ng-container>
                    }
                  </ng-container>
                }
                @if (element['type'] !== 'toggleSection') {
                  <ng-container nxComparisonTableRow [type]="element['type']">
                    @if (element['description']) {
                      <nx-comparison-table-description-cell>{{ element['description'] }}</nx-comparison-table-description-cell
                        >
                        }>
                        @for (cell of element['cells']; track $index) {
                          <nx-comparison-table-cell [type]="element['type']">{{ cell }}</nx-comparison-table-cell>
                        }
                        @if (element['intersection']) {
                          <nx-comparison-table-intersection-cell>{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                        }
                      </ng-container>
                    }
                  }
                </nx-comparison-table>
`;
export const HIDDEN_INDEXES_COMPARISON_TABLE_TEMPLATE = `
  <nx-comparison-table [(selectedIndex)]="selected" [hiddenIndexes]="hiddenIndexes">
          @for (el of data; track $index) {
            @let element = $any(el);
            @if (element['type'] === 'header') {
              <ng-container nxComparisonTableRow [type]="element['type']">
                @if (element['description']) {
                  <nx-comparison-table-description-cell>{{ element['description'] }}</nx-comparison-table-description-cell
                    >
                    }>
                    @for (cell of element['cells']; track $index) {
                      <nx-comparison-table-cell [type]="element['type']">
                        @if (popular) {
                          <nx-comparison-table-popular-cell [forColumn]="popular">popular cell</nx-comparison-table-popular-cell>
                        }
                        {{ cell }}
                      </nx-comparison-table-cell>
                    }
                    @if (element['intersection']) {
                      <nx-comparison-table-intersection-cell>{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                    }
                  </ng-container>
                }
                @if (element['type'] === 'toggleSection') {
                  <ng-container nxComparisonTableToggleSection>
                    <nx-comparison-table-toggle-section-header>{{ element['header'] }}</nx-comparison-table-toggle-section-header>
                    @for (row of element['content']; track $index) {
                      <ng-container nxComparisonTableRow>
                        @if (row['description']) {
                          <nx-comparison-table-description-cell>{{ row['description'] }}</nx-comparison-table-description-cell
                            >
                            }>
                            @for (cell of row['cells']; track $index) {
                              <nx-comparison-table-cell>{{ cell }}</nx-comparison-table-cell>
                            }
                            @if (row['intersection']) {
                              <nx-comparison-table-intersection-cell>{{ row['intersection'] }}</nx-comparison-table-intersection-cell>
                            }
                          </ng-container>
                        }
                      </ng-container>
                    }
                    @if (element['type'] === 'content') {
                      <ng-container nxComparisonTableRow [type]="element['type']">
                        @if (element['description']) {
                          <nx-comparison-table-description-cell>{{ element['description'] }}</nx-comparison-table-description-cell
                            >
                            }>
                            @for (cell of element['cells']; track $index) {
                              <nx-comparison-table-cell [type]="element['type']">
                                {{ cell }}
                              </nx-comparison-table-cell>
                            }
                            @if (element['intersection']) {
                              <nx-comparison-table-intersection-cell>{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                            }
                          </ng-container>
                        }
                        @if (element['type'] === 'footer') {
                          <ng-container nxComparisonTableRow [type]="element['type']">
                            @if (element['description']) {
                              <nx-comparison-table-description-cell>{{ element['description'] }}</nx-comparison-table-description-cell
                                >
                                }>
                                @for (cell of element['cells']; track $index) {
                                  <nx-comparison-table-cell [type]="element['type']">
                                    {{ cell }}
                                  </nx-comparison-table-cell>
                                }
                                @if (element['intersection']) {
                                  <nx-comparison-table-intersection-cell>{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                                }
                              </ng-container>
                            }
                          }
                        </nx-comparison-table>
`;
@Directive({ standalone: true })
abstract class TableTest {
  @ViewChild(NxComparisonTableComponent) tableInstance!: NxComparisonTableComponent;
  @ViewChildren(NxComparisonTableCell) cellInstances!: QueryList<NxComparisonTableCell>;
  @ViewChildren(NxComparisonTableRowDirective)
  rowInstances!: QueryList<NxComparisonTableRowDirective>;

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
      imports: [
        NxComparisonTableModule,
        BasicComponent,
        BasicOnPushComponent,
        DisabledColumnsComponent,
        SelectableIndexComponent,
        LongPageWithTableComponent,
        HiddenColumnsComponent,
        ToggleSectionOverlayComponent,
        OverflowComponent,
        RowGroupWithToggleSectionComponent,
        OverflowRowGroupComponent,
        IntersectionComponent,
        RtlComponent,
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

    it('should return correct number of header cells in _headerCells', () => {
      createTestComponent(BasicComponent);
      const headerCells = tableInstance._headerCells();
      expect(headerCells).toHaveSize(2);
    });
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
      flush();
    }));

    it('should display the correct number of rows and toggle sections (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tr'));
      expect(rows).toHaveSize(4);

      expect(
        rows[0].queryAll(By.css('.nx-comparison-table__mobile-toggle-section-header')),
      ).toHaveSize(1);
      expect(rows[1].queryAll(By.css('.nx-comparison-table__description-cell'))).toHaveSize(3);
      flush();
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
      flush();
    }));

    it('should display all the rows when no footer (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);

      testInstance.data = [
        {
          type: 'header',
          cells: ['This is a header cell', 'This is a header cell', 'This is a header cell'],
        },
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is a cell', 'This is a cell', 'This is a cell'],
        },
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
      flush();
    }));

    it('should update when parent is onPush', fakeAsync(() => {
      createTestComponent(BasicOnPushComponent);
      tick(THROTTLE_TIME);
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.nx-comparison-table__description-row'),
      ).toBeTruthy();
      flush();
    }));
  });

  describe('selection', () => {
    it('should not be selected by default', () => {
      createTestComponent(BasicComponent);
      cellInstances.forEach((cell) => {
        expect(cell._isSelected()).toBeFalse();
      });
      cellElements.forEach((cell) => {
        expect(cell.nativeElement).not.toHaveClass('is-selected');
      });
    });

    it('should update selected on input change', () => {
      createTestComponent(SelectableIndexComponent);

      expect(tableInstance.selectedIndex).toBe(0);
      rowInstances.forEach((row) => {
        expect(row.cells()[0]._isSelected()).toBeTrue();
        expect(row.cells()[1]._isSelected()).toBeFalse();
        expect(row.cells()[2]._isSelected()).toBeFalse();
      });
      rowElements.forEach((row) => {
        const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
        expect(cells[0].nativeElement).toHaveClass('is-selected');
        expect(cells[1].nativeElement).not.toHaveClass('is-selected');
        expect(cells[2].nativeElement).not.toHaveClass('is-selected');
      });

      testInstance.selected = 2;
      fixture.detectChanges();

      expect(tableInstance.selectedIndex).toBe(2);
      rowInstances.forEach((row) => {
        expect(row.cells()[0]._isSelected()).toBeFalse();
        expect(row.cells()[1]._isSelected()).toBeFalse();
        expect(row.cells()[2]._isSelected()).toBeTrue();
      });
      rowElements.forEach((row) => {
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
      flush();
    }));
  });

  describe('column disabling', () => {
    it('should not be disabled by default', () => {
      createTestComponent(DisabledColumnsComponent);
      cellInstances.forEach((cell) => {
        expect(cell._isCellDisabled()).toBeFalse();
      });
      cellElements.forEach((cell) => {
        expect(cell.nativeElement).not.toHaveClass('is-disabled');
      });
    });

    it('should disable the buttons of disabled columns', () => {
      createTestComponent(DisabledColumnsComponent);

      (testInstance as DisabledColumnsComponent).disabledColumn1 = true;
      fixture.detectChanges();

      const selectButtons = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__select-button'),
      );
      expect(selectButtons[1].nativeElement.attributes.getNamedItem('disabled')).toBeTruthy();
      expect(selectButtons[0].nativeElement.attributes.getNamedItem('disabled')).toBeFalsy();
    });

    it('should re-enable the buttons of a column when it is no longer disabled', () => {
      createTestComponent(DisabledColumnsComponent);

      (testInstance as DisabledColumnsComponent).disabledColumn1 = true;
      fixture.detectChanges();

      const selectButtons = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__select-button'),
      );
      expect(selectButtons[1].nativeElement.attributes.getNamedItem('disabled')).toBeTruthy();

      (testInstance as DisabledColumnsComponent).disabledColumn1 = false;
      fixture.detectChanges();

      expect(selectButtons[1].nativeElement.attributes.getNamedItem('disabled')).toBeFalsy();
    });

    it('should update on disabled input change', () => {
      createTestComponent(DisabledColumnsComponent);

      (testInstance as DisabledColumnsComponent).disabledColumn1 = true;
      fixture.detectChanges();

      rowInstances.forEach((row) => {
        expect(row.cells()[0]._isCellDisabled()).toBeFalse();
        expect(row.cells()[1]._isCellDisabled()).toBeTrue();
        expect(row.cells()[2]._isCellDisabled()).toBeFalse();
      });

      rowElements.forEach((row) => {
        const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
        expect(cells[0].nativeElement).not.toHaveClass('is-disabled');
        expect(cells[1].nativeElement).toHaveClass('is-disabled');
        expect(cells[2].nativeElement).not.toHaveClass('is-disabled');
      });

      (testInstance as DisabledColumnsComponent).disabledColumn1 = false;
      (testInstance as DisabledColumnsComponent).disabledColumn2 = true;
      fixture.detectChanges();

      rowInstances.forEach((row) => {
        expect(row.cells()[0]._isCellDisabled()).toBeFalse();
        expect(row.cells()[1]._isCellDisabled()).toBeFalse();
        expect(row.cells()[2]._isCellDisabled()).toBeTrue();
      });

      rowElements.forEach((row) => {
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

      rowInstances.forEach((row) => {
        expect(row.cells()[0]._isCellDisabled()).toBeFalse();
        expect(row.cells()[1]._isCellDisabled()).toBeFalse();
        expect(row.cells()[2]._isCellDisabled()).toBeFalse();
      });

      rowElements.forEach((row) => {
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

      const mobileContentRows = fixture.debugElement.queryAll(
        By.css('tr:not(.nx-comparison-table__description-row)'),
      );
      expect(mobileContentRows[0].nativeElement).not.toHaveClass('is-disabled');
      expect(mobileContentRows[1].nativeElement).toHaveClass('is-disabled');
      expect(mobileContentRows[2].nativeElement).toHaveClass('is-disabled');
      viewport.reset();
      flush();
    }));
  });

  describe('responsive behaviour', () => {
    it('should have the correct view type on page load (desktop)', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      expect(tableInstance.viewType).toBe('desktop');
      flush();
    }));

    it('should have the correct view type on page load (tablet)', fakeAsync(() => {
      viewport.set('tablet');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      expect(tableInstance.viewType).toBe('tablet');
      flush();
    }));

    it('should have the correct view type on page load (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);

      expect(tableInstance.viewType).toBe('mobile');
      flush();
    }));

    it('should update the viewType correctly', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(SelectableIndexComponent);
      tick(THROTTLE_TIME);
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
      flush();
    }));

    it('emits a viewType change', fakeAsync(() => {
      createTestComponent(BasicComponent);
      spyOn(tableInstance.viewTypeChange, 'emit');
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      expect(tableInstance.viewTypeChange.emit).toHaveBeenCalledWith('mobile');
      flush();
    }));
  });

  describe('sticky behaviour', () => {
    // The mobile sticky-column clip is CSS-driven (no per-frame JS): each clippable cell carries
    // a static inline-start offset (--ct-cell-start, set on layout) and the host carries the live
    // --ct-clip-istart (sticky-column width + scrollLeft, written per scroll event). The visible
    // clip on a cell is the SCSS clamp clamp(0, --ct-clip-istart − --ct-cell-start, 100%), so the
    // effective clip in px is max(0, istart − cellStart).
    const effectiveClip = (cell: DebugElement): number => {
      const istart = parseFloat(
        tableElement.nativeElement.style.getPropertyValue('--ct-clip-istart') || '0',
      );
      const cellStart = parseFloat(
        cell.nativeElement.style.getPropertyValue('--ct-cell-start') || '0',
      );
      return Math.max(0, istart - cellStart);
    };

    it('should not cut a left clipping-path by default on mobile', fakeAsync(() => {
      createTestComponent(BasicComponent);

      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const toggleSectionHeaderCell = tableElement
        .query(By.css('.nx-comparison-table__toggle-section-header-row'))
        .query(By.css('.nx-comparison-table__mobile-toggle-section-header'));
      const descriptionCell = tableElement
        .query(By.css('.nx-comparison-table__description-row'))
        .query(By.css('.nx-comparison-table__description-cell'));
      expect(effectiveClip(descriptionCell)).toBe(0);
      expect(effectiveClip(toggleSectionHeaderCell)).toBe(0);
      flush();
    }));

    it('should update left clipping-path when scrolled (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(LongPageWithTableComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const toggleSectionHeaderCell = tableElement
        .query(By.css('.nx-comparison-table__toggle-section-header-row'))
        .query(By.css('.nx-comparison-table__mobile-toggle-section-header'));
      const descriptionCell = tableElement
        .query(By.css('.nx-comparison-table__description-row'))
        .query(By.css('.nx-comparison-table__description-cell'));

      // First description cell sits right at the sticky column edge → clipped as soon as scrolled;
      // the toggle-section header sits further along → not yet under the sticky column at 50px.
      tableElement.nativeElement.scrollTo(50, 0);
      dispatchFakeEvent(document, 'scroll');
      tick();
      fixture.detectChanges();
      expect(effectiveClip(descriptionCell)).toBeGreaterThan(0);
      expect(effectiveClip(toggleSectionHeaderCell)).toBe(0);

      tableElement.nativeElement.scrollTo(200, 0);
      dispatchFakeEvent(document, 'scroll');
      tick();
      fixture.detectChanges();
      expect(effectiveClip(descriptionCell)).toBeGreaterThan(0);
      expect(effectiveClip(toggleSectionHeaderCell)).toBeGreaterThan(0);
      flush();
    }));

    // The horizontal clip (--ct-clip-istart) hides the product cells sliding under the sticky
    // first column. It is now driven by the carousel page (not native scroll): advancing a page
    // grows --ct-clip-istart by exactly one column step so the clip tracks the translate. Asserting
    // it right after the page change (no rAF) proves the settled effect updates it synchronously.
    it('should grow the horizontal clip by one column step per carousel page', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const native = fixture.debugElement.query(
        By.css('.nx-comparison-table__native'),
      ).nativeElement;

      const before = parseFloat(native.style.getPropertyValue('--ct-clip-istart') || '0');
      const beforeShift = parseFloat(native.style.getPropertyValue('--ct-page-shift') || '0');

      (tableInstance as any).scrollNext();
      fixture.detectChanges();

      const after = parseFloat(native.style.getPropertyValue('--ct-clip-istart') || '0');
      const afterShift = parseFloat(native.style.getPropertyValue('--ct-page-shift') || '0');

      // --ct-clip-istart = stickyW + pageIndex*step (grows toward the end); --ct-page-shift moves
      // the columns the opposite way (LTR: negative). So the clip grows by exactly |shift delta|.
      expect(after).toBeGreaterThanOrEqual(before);
      expect(after - before).toBeCloseTo(Math.abs(afterShift - beforeShift), 0);
      flush();
    }));

    it('should update the clip synchronously on page scroll (no rAF defer)', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const updateClipSpy = spyOn(tableInstance as any, '_updateClip');
      // The page-wide listener is registered on window with capture, so a document scroll reaches it.
      dispatchFakeEvent(document, 'scroll');
      // No tick(): proves the page-scroll handler (comparison-table.component.ts:548) is synchronous.
      expect(updateClipSpy).toHaveBeenCalled();
      flush();
    }));

    it('should skip the clip update while the table is off-screen', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const updateClipSpy = spyOn(tableInstance as any, '_updateClip');

      // The IntersectionObserver gate lets the page-wide scroll handler cost nothing while the
      // table is off-screen (comparison-table.component.ts:549). Drive the flag directly.
      (tableInstance as any)._isVisible = false;
      dispatchFakeEvent(document, 'scroll');
      expect(updateClipSpy).not.toHaveBeenCalled();

      (tableInstance as any)._isVisible = true;
      dispatchFakeEvent(document, 'scroll');
      expect(updateClipSpy).toHaveBeenCalled();
      flush();
    }));

    it('should produce a finite vertical clip-top on the desktop sticky header', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const native = fixture.debugElement.query(
        By.css('.nx-comparison-table__native'),
      ).nativeElement;
      dispatchFakeEvent(document, 'scroll');

      // --ct-clip-top hides body content behind the pinned header; its exact px depends on layout
      // geometry (environment-sensitive in headless), so assert its shape, not a value. At rest it
      // may be NEGATIVE: it extends the clip outward by the shadow reserve so the first row's top
      // border + shadow are preserved (matching the other three sides); it only becomes positive
      // once the header overlaps real content. (Headless uses the default theme, reserve = 0, so the
      // at-rest value here is 0 — the negative branch is exercised in A1 with a non-zero shadow.)
      const clipTop = parseFloat(native.style.getPropertyValue('--ct-clip-top') || '0');
      expect(Number.isFinite(clipTop)).toBeTrue();
      flush();
    }));
  });

  describe('toggle section header (full-width spanning row)', () => {
    it('should render the toggle section header row in desktop view', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionOverlayComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const headers = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__toggle-section-header'),
      );
      expect(headers).toHaveSize(1);
      flush();
    }));

    it('should render the toggle section header row in tablet view', fakeAsync(() => {
      viewport.set('tablet');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionOverlayComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const headers = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__toggle-section-header'),
      );
      expect(headers).toHaveSize(1);
      flush();
    }));

    it('should span all columns via colspan on desktop (products + row-header column)', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionOverlayComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const cell = fixture.debugElement.query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      );
      // 2 products + 1 row-header column on desktop
      expect(cell.nativeElement.getAttribute('colspan')).toBe('3');
      flush();
    }));

    it('should span all product columns via colspan on tablet (no row-header column)', fakeAsync(() => {
      viewport.set('tablet');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionOverlayComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const cell = fixture.debugElement.query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      );
      expect(cell.nativeElement.getAttribute('colspan')).toBe('2');
      flush();
    }));

    it('should wrap its content in a banner sized to the visible width', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionOverlayComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      // The spanning header cell is NOT translated by the carousel, so its banner just fills the
      // visible width (100cqi); it no longer needs position: sticky to stay pinned.
      const banner = fixture.debugElement.query(
        By.css(
          '.nx-comparison-table__toggle-section-header-cell .nx-comparison-table__sticky-banner',
        ),
      );
      expect(banner).not.toBeNull();
      const header = fixture.debugElement.query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      );
      // The spanning header cell carries no product-cell class → no carousel transform.
      expect(header.nativeElement).not.toHaveClass('nx-comparison-table__product-cell');
      flush();
    }));

    it('should render the toggle section header content text correctly', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionOverlayComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const cell = fixture.debugElement.query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      );
      expect(cell.nativeElement.textContent).toContain('Toggle');
      flush();
    }));

    it('should render multiple toggle section headers for multiple toggle sections', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionOverlayComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const instance = testInstance as ToggleSectionOverlayComponent;
      instance.data = [
        { type: 'header', cells: ['H1', 'H2'] },
        {
          type: 'toggleSection',
          header: 'Toggle 1',
          content: [{ type: 'content', description: 'Inner 1', cells: ['A', 'B'] }],
        },
        {
          type: 'toggleSection',
          header: 'Toggle 2',
          content: [{ type: 'content', description: 'Inner 2', cells: ['C', 'D'] }],
        },
        { type: 'footer', cells: ['F1', 'F2'] },
      ];
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const headers = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__toggle-section-header'),
      );
      expect(headers).toHaveSize(2);
      flush();
    }));

    it('should toggle aria-expanded when activated', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionOverlayComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const cell = fixture.debugElement.query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      );
      const initial = cell.nativeElement.getAttribute('aria-expanded');
      cell.nativeElement.click();
      fixture.detectChanges();
      expect(cell.nativeElement.getAttribute('aria-expanded')).not.toBe(initial);
      flush();
    }));
  });

  describe('overflow mode', () => {
    beforeEach(fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();
    }));

    it('should page-pin the thead', fakeAsync(() => {
      // Single table: the thead pins to the page via sticky-top (the .is-sticky variant).
      const thead = fixture.debugElement.query(By.css('thead'));
      expect(thead).not.toBeNull();
      expect(thead.nativeElement).toHaveClass('is-sticky');
      expect(getComputedStyle(thead.nativeElement).position).toBe('sticky');
      flush();
    }));

    it('should render the header cells inside the thead', fakeAsync(() => {
      const thead = fixture.debugElement.query(By.css('thead'));
      const headerCells = thead.queryAll(By.css('.nx-comparison-table__cell'));
      expect(headerCells.length).toBe(5);
      flush();
    }));

    it('should clip the viewport horizontally (no horizontal scroll container)', fakeAsync(() => {
      const viewport = fixture.debugElement.query(By.css('.nx-comparison-table__viewport'));
      expect(viewport).not.toBeNull();
      // overflow-x: clip hides off-screen columns WITHOUT becoming a scroll container, so the
      // page stays the vertical scroller and the thead can pin to the page from inside one table.
      expect(getComputedStyle(viewport.nativeElement).overflowX).toBe('clip');
      // It must not scroll horizontally even though content overflows.
      viewport.nativeElement.scrollLeft = 50;
      expect(viewport.nativeElement.scrollLeft).toBe(0);
      flush();
    }));

    it('should render the header row in the thead, not the body', fakeAsync(() => {
      const tbody = fixture.debugElement.query(By.css('tbody'));
      const headerRows = tbody.queryAll(By.css('.nx-comparison-table__grid-row.is-header-row'));
      expect(headerRows.length).toBe(0);
      expect(fixture.debugElement.queryAll(By.css('thead .is-header-row')).length).toBe(1);
      flush();
    }));

    it('should render the body rows in tbody and the footer in tfoot', fakeAsync(() => {
      const tbody = fixture.debugElement.query(By.css('tbody'));
      const tfoot = fixture.debugElement.query(By.css('tfoot'));
      expect(tbody.queryAll(By.css('.is-content-row')).length).toBeGreaterThan(0);
      expect(tfoot.queryAll(By.css('.is-footer-row')).length).toBe(1);
      flush();
    }));

    it('should advance the carousel page by one column when the next button is clicked', fakeAsync(() => {
      const instance = tableInstance as any;
      expect(instance._pageIndex()).toBe(0);

      fixture.debugElement
        .query(By.css('.nx-comparison-table__nav-button--next'))
        .nativeElement.click();
      fixture.detectChanges();

      expect(instance._pageIndex()).toBe(1);
      // The settled effect translates the product columns by a negative offset (LTR).
      const native = fixture.debugElement.query(
        By.css('.nx-comparison-table__native'),
      ).nativeElement;
      const shift = parseFloat(native.style.getPropertyValue('--ct-page-shift') || '0');
      expect(shift).toBeLessThanOrEqual(0);
      flush();
    }));

    it('should step the carousel page back when the prev button is clicked', fakeAsync(() => {
      const instance = tableInstance as any;
      instance.scrollNext();
      instance.scrollNext();
      fixture.detectChanges();
      expect(instance._pageIndex()).toBe(2);

      fixture.debugElement
        .query(By.css('.nx-comparison-table__nav-button--prev'))
        .nativeElement.click();
      fixture.detectChanges();
      expect(instance._pageIndex()).toBe(1);
      flush();
    }));

    it('should clamp the carousel page to the valid range', fakeAsync(() => {
      const instance = tableInstance as any;
      // Cannot go before the start.
      instance.scrollPrev();
      expect(instance._pageIndex()).toBe(0);
      // Cannot go past the last page (maxPageIndex = infoColumns - visibleColumns).
      for (let i = 0; i < 50; i++) {
        instance.scrollNext();
      }
      expect(instance._pageIndex()).toBe(instance._maxPageIndex());
      flush();
    }));

    it('should re-measure the desktop clip geometry after a desktop→tablet→desktop round trip', fakeAsync(() => {
      // Regression: the #viewport/#native viewChild is shared across tablet and desktop, so a
      // tablet↔desktop flip does not recreate it. Before the fix, nothing re-ran
      // _measureClipGeometry() once the view type settled back to desktop, leaving stale
      // --ct-cell-start / sticky width / column step that over-clipped the visible columns.
      const instance = tableInstance as any;

      // Jump to the last page while genuinely on desktop.
      for (let i = 0; i < 50; i++) {
        instance.scrollNext();
      }
      fixture.detectChanges();
      expect(instance._pageIndex()).toBe(instance._maxPageIndex());

      const measureSpy = spyOn(instance, '_measureClipGeometry').and.callThrough();

      // desktop → tablet → desktop.
      viewport.set('tablet');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      expect(tableInstance.viewType).toBe('tablet');

      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      expect(tableInstance.viewType).toBe('desktop');

      // The geometry must be re-measured for the new layout (fails before the fix) and the page
      // index must stay within the valid range.
      expect(measureSpy).toHaveBeenCalled();
      expect(instance._pageIndex()).toBeLessThanOrEqual(instance._maxPageIndex());

      // Every product cell carries a freshly stamped --ct-cell-start (not the 99999px fallback).
      const cells = fixture.debugElement.queryAll(By.css('.nx-comparison-table__cell'));
      expect(cells.length).toBeGreaterThan(0);
      cells.forEach((cell) => {
        expect(cell.nativeElement.style.getPropertyValue('--ct-cell-start')).toMatch(/^-?\d+px$/);
      });
      flush();
    }));

    it('should suppress the carousel transition while measuring resting positions', fakeAsync(() => {
      // The product cells animate `transform` (carousel glide). _measureClipGeometry zeroes
      // --ct-page-shift to read each cell's RESTING position; with the transition live, that zeroing
      // would ANIMATE rather than snap and the synchronous rect reads would still see the cell at its
      // paged offset → a wrong --ct-cell-start that over-clips the column. The `.is-measuring` class
      // disables the transition for the duration of the (synchronous) measurement; it must be added
      // during the measure and removed afterwards so subsequent user paging animates again.
      const instance = tableInstance as any;
      const host = tableElement.nativeElement as HTMLElement;

      // Park on a non-zero page so a re-measure happens while the cells are translated.
      instance.scrollNext();
      instance.scrollNext();
      fixture.detectChanges();
      expect(instance._pageIndex()).toBeGreaterThan(0);

      const addSpy = spyOn(host.classList, 'add').and.callThrough();
      const removeSpy = spyOn(host.classList, 'remove').and.callThrough();

      instance._measureClipGeometry();

      // The transition was suppressed during the measure and restored at the end (not left dangling).
      expect(addSpy).toHaveBeenCalledWith('is-measuring');
      expect(removeSpy).toHaveBeenCalledWith('is-measuring');
      expect(host.classList.contains('is-measuring')).toBe(false);
      flush();
    }));

    it('should give the product columns an intrinsic (max-content) width when overflowing', fakeAsync(() => {
      // The host carries .is-overflowing, which switches the table to width: max-content so
      // the columns can overflow the clipped viewport and be revealed by paging the carousel.
      expect(tableElement.nativeElement).toHaveClass('is-overflowing');
      flush();
    }));

    it('should keep the header in the thead when not overflowing', fakeAsync(() => {
      (testInstance as OverflowComponent).breakpoints = [{ minWidth: 0, columns: 5 }];
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      // Header row lives in the thead, not the tbody — regardless of overflow state.
      const theadHeaderRows = fixture.debugElement.queryAll(
        By.css('thead .nx-comparison-table__grid-row.is-header-row'),
      );
      expect(theadHeaderRows.length).toBe(1);

      const tbodyHeaderRows = fixture.debugElement.queryAll(
        By.css('tbody .nx-comparison-table__grid-row.is-header-row'),
      );
      expect(tbodyHeaderRows.length).toBe(0);

      // Everything fits → not overflowing → the carousel never pages.
      expect(tableElement.nativeElement).not.toHaveClass('is-overflowing');
      expect((tableInstance as any)._maxPageIndex()).toBe(0);
      flush();
    }));

    it('should cap spanning banners at the last fully-visible column (not the peek)', fakeAsync(() => {
      // --ct-visible-end = right edge of the last fully-visible column, in viewport coords. It must
      // be set, positive, and strictly inside the table's full width so the toggle/intersection/
      // group/description banners end flush with that column instead of bleeding into the peek.
      const native = fixture.debugElement.query(
        By.css('.nx-comparison-table__native'),
      ).nativeElement;
      const visibleEnd = native.style.getPropertyValue('--ct-visible-end');
      expect(visibleEnd).toMatch(/^\d+px$/);
      expect(parseFloat(visibleEnd)).toBeGreaterThan(0);
      // It is a fixed viewport position: it must not change when the carousel pages.
      const before = visibleEnd;
      (tableInstance as any).scrollNext();
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      expect(native.style.getPropertyValue('--ct-visible-end')).toBe(before);
      flush();
    }));

    it('should render navigation buttons when overflowing', fakeAsync(() => {
      const navWrapper = fixture.debugElement.query(By.css('.nx-comparison-table__nav-wrapper'));
      expect(navWrapper).not.toBeNull();

      const prevButton = fixture.debugElement.query(
        By.css('.nx-comparison-table__nav-button--prev'),
      );
      const nextButton = fixture.debugElement.query(
        By.css('.nx-comparison-table__nav-button--next'),
      );
      expect(prevButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      flush();
    }));

    it('should keep the nav buttons pinned to the page (sticky) so they follow the sticky header', fakeAsync(() => {
      // The nav overlay must pin to the page like the sticky thead — an absolutely-positioned
      // overlay scrolls away with the table body on a long table. It is also rendered as the FIRST
      // child of .__native so sticky pins it from the table top (not the bottom).
      const native = fixture.debugElement.query(
        By.css('.nx-comparison-table__native'),
      ).nativeElement;
      const navWrapper = native.querySelector('.nx-comparison-table__nav-wrapper');
      expect(navWrapper).not.toBeNull();
      expect(getComputedStyle(navWrapper).position).toBe('sticky');
      // First child → its natural flow position is the table top, where sticky pins from.
      expect(native.firstElementChild).toBe(navWrapper);
      flush();
    }));

    it('should stamp --ct-thead-h so the nav-wrapper releases in sync with the header', fakeAsync(() => {
      // The wrapper is given a real height == the sticky header band (--ct-thead-h) so its sticky
      // containment releases when the header leaves, not when the whole table does — otherwise the
      // buttons linger in empty space after the header has scrolled off. Headless layout doesn't
      // run real sticky release, so assert the contract that drives it.
      const native = fixture.debugElement.query(
        By.css('.nx-comparison-table__native'),
      ).nativeElement;
      const theadH = native.style.getPropertyValue('--ct-thead-h');
      expect(theadH).toMatch(/^\d+px$/);
      expect(parseFloat(theadH)).toBeGreaterThan(0);
      // The buttons hang at --ct-nav-center inside the wrapper; the wrapper's height must cover them
      // so they sit within the header band and never dangle below it (the cause of the lingering).
      expect(parseFloat(theadH)).toBeGreaterThanOrEqual(
        parseFloat(native.style.getPropertyValue('--ct-nav-center')),
      );
      flush();
    }));

    it('should render newly expanded row group rows inside the tbody', fakeAsync(() => {
      createTestComponent(OverflowRowGroupComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const tbody = fixture.debugElement.query(By.css('tbody'));

      // Before expanding: only 1 content row visible (visibleRows=1)
      const contentRowsBefore = tbody.nativeElement.querySelectorAll(
        '.nx-comparison-table__grid-row.is-content-row:not(.is-group-expansion-row)',
      );
      expect(contentRowsBefore.length).toBe(1);

      // Expand the row group
      const expandButton = fixture.debugElement.query(
        By.css('.nx-comparison-table__group-expansion-cell'),
      );
      expandButton.nativeElement.click();
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      // After expanding: 2 content rows visible
      const contentRowsAfter = tbody.nativeElement.querySelectorAll(
        '.nx-comparison-table__grid-row.is-content-row:not(.is-group-expansion-row)',
      );
      expect(contentRowsAfter.length).toBe(2);
      flush();
    }));
  });

  describe('touch-swipe paging', () => {
    // Build a minimal touch-like event. The component only reads touches[0].clientX/Y and calls
    // preventDefault(), so a plain Event with those properties patched on is enough under jsdom-less
    // ChromeHeadless (where `new TouchEvent` exists but `new Touch` may be picky).
    const touch = (type: string, x: number, y: number): Event => {
      const ev = new Event(type, { bubbles: true, cancelable: true });
      const list = type === 'touchend' ? [] : [{ clientX: x, clientY: y }];
      Object.defineProperty(ev, 'touches', { value: list });
      Object.defineProperty(ev, 'changedTouches', { value: [{ clientX: x, clientY: y }] });
      return ev;
    };

    let host: HTMLElement;
    beforeEach(fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      host = tableElement.nativeElement;
      // Give the carousel a known column step so the snap math is deterministic in headless layout.
      (tableInstance as any)._columnStepPx = 200;
    }));

    it('should page to the next column on a horizontal swipe', fakeAsync(() => {
      host.dispatchEvent(touch('touchstart', 500, 300));
      host.dispatchEvent(touch('touchmove', 380, 302)); // dx -120 (horizontal-dominant)
      host.dispatchEvent(touch('touchmove', 280, 304)); // dx -220 → past one step (200)
      host.dispatchEvent(touch('touchend', 280, 304));
      fixture.detectChanges();

      expect((tableInstance as any)._pageIndex()).toBe(1);
      flush();
    }));

    it('should NOT page on a vertical swipe (lets the page scroll)', fakeAsync(() => {
      host.dispatchEvent(touch('touchstart', 500, 300));
      host.dispatchEvent(touch('touchmove', 502, 180)); // dy -120 (vertical-dominant)
      host.dispatchEvent(touch('touchmove', 504, 80));
      host.dispatchEvent(touch('touchend', 504, 80));
      fixture.detectChanges();

      expect((tableInstance as any)._pageIndex()).toBe(0);
      flush();
    }));

    it('should add and remove the is-panning class around a horizontal pan', fakeAsync(() => {
      host.dispatchEvent(touch('touchstart', 500, 300));
      host.dispatchEvent(touch('touchmove', 380, 302));
      expect(host).toHaveClass('is-panning');

      host.dispatchEvent(touch('touchend', 380, 302));
      expect(host).not.toHaveClass('is-panning');
      flush();
    }));
  });

  describe('focus auto-pagination', () => {
    beforeEach(fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();
    }));

    it('should page to reveal a product cell that gains focus while off-screen', fakeAsync(() => {
      const instance = tableInstance as any;
      expect(instance._pageIndex()).toBe(0);

      // Focus a product cell beyond the visible window (last column). The handler should page so
      // that column becomes the last visible one: page = col - visibleColumns + 1.
      const lastCol = instance._infoColumnCount() - 1;
      const cell = tableElement.nativeElement.querySelector(
        `tbody [data-ct-col="${lastCol}"]`,
      ) as HTMLElement;
      expect(cell).withContext('a product cell with the last visible index exists').toBeTruthy();
      cell.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      fixture.detectChanges();

      expect(instance._pageIndex()).toBe(lastCol - instance._visibleColumnCount() + 1);
      flush();
    }));

    it('should page back when focus moves to a cell before the visible window', fakeAsync(() => {
      const instance = tableInstance as any;
      instance.scrollNext();
      instance.scrollNext();
      fixture.detectChanges();
      expect(instance._pageIndex()).toBeGreaterThan(0);

      // Focus the very first product column → page back to 0.
      const cell = tableElement.nativeElement.querySelector(
        'tbody [data-ct-col="0"]',
      ) as HTMLElement;
      cell.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      fixture.detectChanges();

      expect(instance._pageIndex()).toBe(0);
      flush();
    }));

    it('should NOT add aria-hidden or inert to off-screen product columns', fakeAsync(() => {
      // Off-screen columns stay in the a11y tree (focusable content must not be aria-hidden/inert).
      const productCells = tableElement.nativeElement.querySelectorAll(
        '.nx-comparison-table__product-cell',
      );
      expect(productCells.length).toBeGreaterThan(0);
      productCells.forEach((cell: HTMLElement) => {
        expect(cell.getAttribute('aria-hidden')).toBeNull();
        expect(cell.hasAttribute('inert')).toBeFalse();
      });
      flush();
    }));
  });

  describe('native sticky layout', () => {
    it('should make the desktop first column sticky to the inline start', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const descriptionCell = fixture.debugElement.query(
        By.css('tbody .nx-comparison-table__description-cell'),
      );
      const styles = getComputedStyle(descriptionCell.nativeElement);
      expect(styles.position).toBe('sticky');
      // Pinned via inset-inline-start (left in LTR), never a hard-coded `left`.
      expect(styles.left).toBe('0px');
      flush();
    }));

    it('should render the tablet description as a full-width spanning banner (not a sticky column)', fakeAsync(() => {
      viewport.set('tablet');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const descriptionCell = fixture.debugElement.query(
        By.css('.nx-comparison-table__description-cell.is-description-banner'),
      );
      expect(descriptionCell).not.toBeNull();
      // The cell is NOT a product cell → not translated by the carousel → stays put without
      // position: sticky. The banner inside fills the visible width.
      expect(descriptionCell.nativeElement).not.toHaveClass('nx-comparison-table__product-cell');
      const banner = descriptionCell.query(By.css('.nx-comparison-table__sticky-banner'));
      expect(banner).not.toBeNull();
      flush();
    }));

    it('should wrap intersection-cell content in a full-width banner', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(IntersectionComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const cell = fixture.debugElement.query(By.css('.nx-comparison-table__intersection-cell'));
      const banner = cell.query(By.css('.nx-comparison-table__sticky-banner'));
      expect(banner).not.toBeNull();
      // The spanning intersection cell is not a product cell → not translated by the carousel.
      expect(cell.nativeElement).not.toHaveClass('nx-comparison-table__product-cell');
      flush();
    }));

    it('should set padding:0 on spanning cells (the banner owns the padding)', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(IntersectionComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const cell = fixture.debugElement.query(By.css('.nx-comparison-table__intersection-cell'));
      expect(getComputedStyle(cell.nativeElement).padding).toBe('0px');
      flush();
    }));

    it('should pin the first column on the right in RTL', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(RtlComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const descriptionCell = fixture.debugElement.query(
        By.css('tbody .nx-comparison-table__description-cell'),
      );
      const styles = getComputedStyle(descriptionCell.nativeElement);
      expect(styles.position).toBe('sticky');
      // inset-inline-start resolves to `right: 0` in RTL.
      expect(styles.right).toBe('0px');
      flush();
    }));
  });

  describe('a11y', () => {
    it('should render a single native table with thead/tbody/tfoot', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const tables = tableElement.queryAll(By.css('table.nx-comparison-table__table'));
      // ONE real table — the a11y win: each <tr> owns its <th scope=row> + <td>s and the
      // headers= associations are valid (no invalid cross-table reference between two tables).
      expect(tables.length).toBe(1);
      expect(tables[0].query(By.css('thead'))).not.toBeNull();
      expect(tables[0].query(By.css('tbody'))).not.toBeNull();
      flush();
    }));

    it('should render every grid-row as a real <tr> (native row semantics)', () => {
      createTestComponent(BasicComponent);

      // Single real table → rows are genuine <tr> elements, so AT exposes them as table rows
      // without any explicit role override.
      const gridRows = tableElement.queryAll(By.css('.nx-comparison-table__grid-row'));
      expect(gridRows.length).toBeGreaterThan(0);
      gridRows.forEach((row) => {
        expect(row.nativeElement.tagName).toBe(
          'TR',
          `Expected a <tr> for ${row.nativeElement.className}`,
        );
      });
    });

    it('should have role="row" on toggle section header row', () => {
      createTestComponent(BasicComponent);

      const toggleSectionHeaderRow = tableElement.query(
        By.css('.nx-comparison-table__toggle-section-header'),
      );
      expect(toggleSectionHeaderRow.attributes.role).toBe('row');
    });

    it('has no accessibility violations', (done) => {
      createTestComponent(BasicComponent);

      axe.run(
        fixture.nativeElement,
        {
          rules: {
            'empty-table-header': { enabled: false },
          },
        },
        (error: Error, results: axe.AxeResults) => {
          expect(results.violations.length).toBe(0);
          const violationMessages = results.violations.map((item) => item.description);
          if (violationMessages.length) {
            console.error(violationMessages);
            expect(violationMessages).toBeFalsy();
          }
          done();
        },
      );
    });
  });

  describe('hidden column', () => {
    it('should not be hidden by default', () => {
      createTestComponent(HiddenColumnsComponent);
      cellInstances.forEach((cell) => {
        expect(cell._isCellHidden()).toBeFalse();
      });
      cellElements.forEach((cell) => {
        expect(cell.nativeElement).not.toHaveClass('is-hidden');
      });
    });

    it('should update on hiddenIndexes input change', () => {
      createTestComponent(HiddenColumnsComponent);

      (testInstance as HiddenColumnsComponent).hiddenIndexes = [2];
      fixture.detectChanges();

      rowInstances.forEach((row) => {
        expect(row.cells()[0]._isCellHidden()).toBeFalse();
        expect(row.cells()[1]._isCellHidden()).toBeFalse();
        expect(row.cells()[2]._isCellHidden()).toBeTrue();
      });

      rowElements.forEach((row) => {
        const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
        expect(cells[0].nativeElement).not.toHaveClass('is-hidden');
        expect(cells[1].nativeElement).not.toHaveClass('is-hidden');
        expect(cells[2].nativeElement).toHaveClass('is-hidden');
      });

      (testInstance as HiddenColumnsComponent).hiddenIndexes = [1];
      fixture.detectChanges();

      rowInstances.forEach((row) => {
        expect(row.cells()[0]._isCellHidden()).toBeFalse();
        expect(row.cells()[1]._isCellHidden()).toBeTrue();
        expect(row.cells()[2]._isCellHidden()).toBeFalse();
      });

      rowElements.forEach((row) => {
        const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
        expect(cells[0].nativeElement).not.toHaveClass('is-hidden');
        expect(cells[1].nativeElement).toHaveClass('is-hidden');
        expect(cells[2].nativeElement).not.toHaveClass('is-hidden');
      });
    });

    it('should drop popular row placeholder cells for hidden indexes', () => {
      createTestComponent(HiddenColumnsComponent);

      (testInstance as HiddenColumnsComponent).popular = 1;
      fixture.detectChanges();

      const placeholderSelector = 'thead .is-popular-row .nx-comparison-table__placeholder-cell';

      // 3 columns, popular above column 0 → 2 placeholders (for columns 1 and 2).
      const before = fixture.debugElement.queryAll(By.css(placeholderSelector));
      expect(before).toHaveSize(2);

      // Hiding a column removes it (and its placeholder) from the popular row entirely.
      (testInstance as HiddenColumnsComponent).hiddenIndexes = [2];
      fixture.detectChanges();

      const after = fixture.debugElement.queryAll(By.css(placeholderSelector));
      expect(after).toHaveSize(1);
    });
  });
});

describe('NxComparisonTableComponent Allianz One mode', () => {
  let fixture: ComponentFixture<TableTest>;
  let tableInstance: NxComparisonTableComponent;

  function createTestComponent(component: Type<TableTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    tableInstance = fixture.componentInstance.tableInstance;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxComparisonTableModule, AllianzOneComponent, NxAllianzOneModule],
    }).compileComponents();
  }));

  afterEach(() => {
    viewport.reset();
  });

  it('should use tablet view type when viewport is mobile and A1 is enabled', fakeAsync(() => {
    viewport.set('mobile');
    window.dispatchEvent(new Event('resize'));
    createTestComponent(AllianzOneComponent);
    tick(THROTTLE_TIME);
    fixture.detectChanges();
    expect(tableInstance.viewType).toBe('tablet');
    flush();
  }));

  it('should still use desktop view type when A1 is enabled', fakeAsync(() => {
    viewport.set('desktop');
    window.dispatchEvent(new Event('resize'));
    createTestComponent(AllianzOneComponent);
    tick(THROTTLE_TIME);
    fixture.detectChanges();
    expect(tableInstance.viewType).toBe('desktop');
    flush();
  }));

  it('should override explicit view="mobile" to tablet when A1 is enabled', fakeAsync(() => {
    viewport.set('desktop');
    window.dispatchEvent(new Event('resize'));
    createTestComponent(AllianzOneComponent);
    tick(THROTTLE_TIME);
    fixture.detectChanges();
    tableInstance.view = 'mobile';
    tick(THROTTLE_TIME);
    fixture.detectChanges();
    expect(tableInstance.viewType).toBe('tablet');
    flush();
  }));
});

@Component({
  template: BASIC_COMPARISON_TABLE_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class BasicComponent extends TableTest {
  data = [
    { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
    {
      type: 'content',
      description: 'This is a description cell',
      cells: ['This is a cell', 'This is a cell'],
    },
    {
      type: 'toggleSection',
      header: 'This can be opened',
      content: [
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is a cell', 'This is a cell'],
        },
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is a cell', 'This is a cell'],
        },
      ],
    },
    { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
  ];
}

@Component({
  template:
    '<div style="height: 200px; width: 200px; overflow: scroll;">' +
    BASIC_COMPARISON_TABLE_TEMPLATE +
    '</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxComparisonTableModule],
})
class BasicOnPushComponent extends TableTest {
  data = [
    { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
    {
      type: 'content',
      description: 'This is a description cell',
      cells: ['This is a cell', 'This is a cell'],
    },
    {
      type: 'toggleSection',
      header: 'This can be opened',
      content: [
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is a cell', 'This is a cell'],
        },
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is a cell', 'This is a cell'],
        },
      ],
    },
    { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
  ];
}

@Component({
  template: `
    <nx-comparison-table [(selectedIndex)]="selected">
      @for (el of data; track $index) {
        @let element = $any(el);
        @if (element['type'] === 'toggleSection') {
          <ng-container nxComparisonTableToggleSection>
            <nx-comparison-table-toggle-section-header>{{
              element['header']
            }}</nx-comparison-table-toggle-section-header>
            @for (row of element['content']; track $index) {
              <ng-container nxComparisonTableRow>
                @if (row['description']) {
                  <nx-comparison-table-description-cell>{{
                    row['description']
                  }}</nx-comparison-table-description-cell>
                }
                >
                @for (cell of row['cells']; track $index) {
                  <nx-comparison-table-cell>{{ cell }}</nx-comparison-table-cell>
                }
                @if (row['intersection']) {
                  <nx-comparison-table-intersection-cell>{{
                    row['intersection']
                  }}</nx-comparison-table-intersection-cell>
                }
              </ng-container>
            }
          </ng-container>
        }
        @if (element['type'] !== 'toggleSection') {
          <ng-container nxComparisonTableRow [type]="element['type']">
            @if (element['description']) {
              <nx-comparison-table-description-cell>{{
                element['description']
              }}</nx-comparison-table-description-cell>
            }
            >
            @for (cell of element['cells']; track $index) {
              <nx-comparison-table-cell [type]="element['type']">{{
                cell
              }}</nx-comparison-table-cell>
            }
            @if (element['intersection']) {
              <nx-comparison-table-intersection-cell>{{
                element['intersection']
              }}</nx-comparison-table-intersection-cell>
            }
          </ng-container>
        }
      }
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class SelectableIndexComponent extends TableTest {
  data = [
    {
      type: 'header',
      cells: ['This is a header cell', 'This is a header cell', 'This is a header cell'],
    },
    {
      type: 'content',
      description: 'This is a description cell',
      cells: ['This is a cell', 'This is a cell', 'This is a cell'],
    },
    {
      type: 'footer',
      cells: ['This is a footer cell', 'This is a footer cell', 'This is a footer cell'],
    },
  ];
}

@Component({
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">
          <button
            nxComparisonTableSelectButton
            unselectedLabel="Select"
            selectedLabel="Selected"
            type="button"
          >
            Click
          </button>
          Product 1
        </nx-comparison-table-cell>
        <nx-comparison-table-cell type="header" [disabledColumn]="disabledColumn1">
          <button
            nxComparisonTableSelectButton
            unselectedLabel="Select"
            selectedLabel="Selected"
            type="button"
          >
            Click
          </button>
          Product 2 with a very long name</nx-comparison-table-cell
        >
        <nx-comparison-table-cell type="header" [disabledColumn]="disabledColumn2">
          <button
            nxComparisonTableSelectButton
            unselectedLabel="Select"
            selectedLabel="Selected"
            type="button"
          >
            Click
          </button>
          Product 3</nx-comparison-table-cell
        >
      </ng-container>

      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell
          >Service headline</nx-comparison-table-description-cell
        >
        <nx-comparison-table-cell [disabledColumn]="fakeDisabled"
          >100 Mio. Euro</nx-comparison-table-cell
        >
        <nx-comparison-table-cell>150 Mio. Euro</nx-comparison-table-cell>
        <nx-comparison-table-cell>200 Mio. Euro</nx-comparison-table-cell>
      </ng-container>

      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell
          >Service headline</nx-comparison-table-description-cell
        >
        <nx-comparison-table-cell>cell</nx-comparison-table-cell>
        <nx-comparison-table-cell>cell</nx-comparison-table-cell>
        <nx-comparison-table-cell>cell</nx-comparison-table-cell>
      </ng-container>

      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell
          >Service headline</nx-comparison-table-description-cell
        >
        <nx-comparison-table-cell>cell</nx-comparison-table-cell>
        <nx-comparison-table-cell>cell</nx-comparison-table-cell>
        <nx-comparison-table-cell>cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class DisabledColumnsComponent extends TableTest {
  disabledColumn1 = false;
  disabledColumn2 = false;
  fakeDisabled = false;
}

@Component({
  template:
    '<div style="height: 200px; width: 200px; overflow: scroll;">' +
    BASIC_COMPARISON_TABLE_TEMPLATE +
    '</div>',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class LongPageWithTableComponent extends TableTest {
  data = [
    { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
    {
      type: 'content',
      description: 'This is a description cell',
      cells: ['This is a cell', 'This is a cell'],
    },
    {
      type: 'toggleSection',
      header: 'This can be opened',
      content: [
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is a cell', 'This is a cell'],
        },
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is a cell', 'This is a cell'],
        },
      ],
    },
    { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
  ];
}

@Component({
  template: HIDDEN_INDEXES_COMPARISON_TABLE_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class HiddenColumnsComponent extends TableTest {
  data = [
    {
      type: 'header',
      popular: 2,
      cells: ['This is a header cell', 'This is a header cell', 'This is a hidden header cell'],
    },
    {
      type: 'content',
      description: 'This is a description cell',
      cells: ['This is a cell', 'This is a cell', 'This is a hidden cell'],
    },
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
    {
      type: 'footer',
      cells: ['This is a footer cell', 'This is a footer cell', 'This is a hidden footer cell'],
    },
  ];
}

@Component({
  template: BASIC_COMPARISON_TABLE_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ToggleSectionOverlayComponent extends TableTest {
  data: any[] = [
    { type: 'header', cells: ['H1', 'H2'] },
    { type: 'content', description: 'Row 1', cells: ['A', 'B'] },
    {
      type: 'toggleSection',
      header: 'Toggle',
      content: [
        { type: 'content', description: 'Inner 1', cells: ['X', 'Y'] },
        { type: 'content', description: 'Inner 2', cells: ['X2', 'Y2'] },
      ],
    },
    { type: 'footer', cells: ['F1', 'F2'] },
  ];
}

@Component({
  template: `
    <nx-comparison-table [responsiveBreakpoints]="breakpoints" style="width: 600px;">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">Product 1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">Product 2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">Product 3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">Product 4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">Product 5</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Feature 1</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
        <nx-comparison-table-cell>C</nx-comparison-table-cell>
        <nx-comparison-table-cell>D</nx-comparison-table-cell>
        <nx-comparison-table-cell>E</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Feature 2</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>F</nx-comparison-table-cell>
        <nx-comparison-table-cell>G</nx-comparison-table-cell>
        <nx-comparison-table-cell>H</nx-comparison-table-cell>
        <nx-comparison-table-cell>I</nx-comparison-table-cell>
        <nx-comparison-table-cell>J</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F5</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
  providers: A1_PROVIDERS,
})
class OverflowComponent extends TableTest {
  breakpoints: NxComparisonTableBreakpoint[] = [{ minWidth: 0, columns: 3 }];
}

@Component({
  template: BASIC_COMPARISON_TABLE_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class AllianzOneComponent extends TableTest {
  data = [
    { type: 'header', cells: ['Header 1', 'Header 2'] },
    {
      type: 'content',
      description: 'Description',
      cells: ['Cell 1', 'Cell 2'],
    },
    { type: 'footer', cells: ['Footer 1', 'Footer 2'] },
  ];
}

@Component({
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">H1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">H2</nx-comparison-table-cell>
      </ng-container>
      <ng-container
        nxComparisonTableRowGroup
        [visibleRows]="1"
        labelCollapsed="Show more"
        labelExpanded="Show less"
      >
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Desc 1</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>A</nx-comparison-table-cell>
          <nx-comparison-table-cell>B</nx-comparison-table-cell>
        </ng-container>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Desc 2</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>C</nx-comparison-table-cell>
          <nx-comparison-table-cell>D</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header
          >Toggle</nx-comparison-table-toggle-section-header
        >
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Inner</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>X</nx-comparison-table-cell>
          <nx-comparison-table-cell>Y</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class RowGroupWithToggleSectionComponent extends TableTest {}

@Component({
  template: `
    <nx-comparison-table [responsiveBreakpoints]="breakpoints" style="width: 400px;">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P4</nx-comparison-table-cell>
      </ng-container>
      <ng-container
        nxComparisonTableRowGroup
        [visibleRows]="1"
        labelCollapsed="More"
        labelExpanded="Less"
      >
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Row 1</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>A</nx-comparison-table-cell>
          <nx-comparison-table-cell>B</nx-comparison-table-cell>
          <nx-comparison-table-cell>C</nx-comparison-table-cell>
          <nx-comparison-table-cell>D</nx-comparison-table-cell>
        </ng-container>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Row 2</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>E</nx-comparison-table-cell>
          <nx-comparison-table-cell>F</nx-comparison-table-cell>
          <nx-comparison-table-cell>G</nx-comparison-table-cell>
          <nx-comparison-table-cell>H</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F4</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
  providers: A1_PROVIDERS,
})
class OverflowRowGroupComponent extends TableTest {
  breakpoints: NxComparisonTableBreakpoint[] = [{ minWidth: 0, columns: 2 }];
}

@Component({
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Benefits</nx-comparison-table-description-cell>
        <nx-comparison-table-intersection-cell
          >Spans all products</nx-comparison-table-intersection-cell
        >
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Coverage</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class IntersectionComponent extends TableTest {}

@Component({
  template: `
    <div dir="rtl">
      <nx-comparison-table>
        <ng-container nxComparisonTableRow type="header">
          <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
          <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
        </ng-container>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Coverage</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>A</nx-comparison-table-cell>
          <nx-comparison-table-cell>B</nx-comparison-table-cell>
        </ng-container>
      </nx-comparison-table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule, BidiModule],
})
class RtlComponent extends TableTest {}

describe('NxComparisonTable responsive breakpoints', () => {
  let fixture: ComponentFixture<ResponsiveTableTest>;
  let tableInstance: NxComparisonTableComponent;
  let resizeCallback: ResizeObserverCallback;
  let disconnectSpy: jasmine.Spy;

  function simulateResize(width: number) {
    resizeCallback(
      [{ contentRect: { width } } as unknown as ResizeObserverEntry],
      null as unknown as ResizeObserver,
    );
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
    disconnectSpy = jasmine.createSpy('disconnect');
    (window as any).ResizeObserver = class {
      constructor(cb: ResizeObserverCallback) {
        resizeCallback = cb;
      }
      observe() {}
      unobserve() {}
      disconnect = disconnectSpy;
    };

    TestBed.configureTestingModule({
      imports: [
        NxComparisonTableModule,
        ResponsiveDefaultComponent,
        ResponsiveCustomBreakpointsComponent,
        ResponsiveContainerModeComponent,
        ResponsiveWithViewOverrideComponent,
      ],
    });
    TestBed.compileComponents();
  }));

  function createComponent<T extends ResponsiveTableTest>(component: Type<T>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    tableInstance = fixture.componentInstance.tableInstance;
  }

  describe('default breakpoints', () => {
    // Default breakpoints: {0: mobile/1, 320: mobile/2, 704: tablet/3, 992: desktop/3}.
    it('should resolve mobile/2 columns between 320 and 704px', () => {
      createComponent(ResponsiveContainerModeComponent);
      simulateResize(600);
      expect(tableInstance.viewType).toBe('mobile');
      expect(tableInstance['visibleColumns']()).toBe(2);
    });

    it('should resolve tablet/3 columns between 704 and 992', () => {
      createComponent(ResponsiveContainerModeComponent);
      simulateResize(800);
      expect(tableInstance.viewType).toBe('tablet');
      expect(tableInstance['visibleColumns']()).toBe(3);
    });

    it('should resolve desktop/3 columns at 992 and above', () => {
      createComponent(ResponsiveContainerModeComponent);
      simulateResize(1100);
      expect(tableInstance.viewType).toBe('desktop');
      expect(tableInstance['visibleColumns']()).toBe(3);
    });

    it('should resolve mobile/1 column below 320px', () => {
      createComponent(ResponsiveContainerModeComponent);
      simulateResize(200);
      expect(tableInstance.viewType).toBe('mobile');
      expect(tableInstance['visibleColumns']()).toBe(1);
    });
  });

  describe('custom responsiveBreakpoints', () => {
    it('should use custom breakpoints', () => {
      createComponent(ResponsiveCustomBreakpointsComponent);
      simulateResize(400);
      expect(tableInstance['visibleColumns']()).toBe(2);
    });

    it('should inherit fields from previous entries', () => {
      createComponent(ResponsiveCustomBreakpointsComponent);
      // breakpoints: 0:{mobile,2}, 500:{columns:3}, 700:{tablet}
      simulateResize(550);
      expect(tableInstance.viewType).toBe('mobile'); // inherited from 0
      expect(tableInstance['visibleColumns']()).toBe(3); // from 500
    });

    it('should inherit columns from earlier entry when only viewType changes', () => {
      createComponent(ResponsiveCustomBreakpointsComponent);
      // At 750: viewType='tablet' from 700, columns=3 inherited from 500
      simulateResize(750);
      expect(tableInstance.viewType).toBe('tablet');
      expect(tableInstance['visibleColumns']()).toBe(3);
    });
  });

  describe('responsiveMode', () => {
    it('should use viewport for viewType when mode is viewport', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createComponent(ResponsiveDefaultComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      // Container is narrow but viewport is desktop
      simulateResize(400);
      expect(tableInstance.viewType).toBe('desktop');
      // columns still use container width (400px → 2 columns from the 320 breakpoint)
      expect(tableInstance['visibleColumns']()).toBe(2);
      flush();
    }));

    it('should use container width for viewType when mode is container', () => {
      createComponent(ResponsiveContainerModeComponent);
      simulateResize(400);
      expect(tableInstance.viewType).toBe('mobile');
    });
  });

  describe('hard overrides', () => {
    it('[view] should override container-based viewType', () => {
      createComponent(ResponsiveWithViewOverrideComponent);
      simulateResize(400);
      expect(tableInstance.viewType).toBe('desktop');
    });
  });

  describe('columns capped by total info columns', () => {
    it('should not exceed total product columns', () => {
      createComponent(ResponsiveContainerModeComponent);
      // Component has 5 products, breakpoint at 992 sets columns=3
      // At very large width the max from breakpoints is 3, which is < 5
      simulateResize(1200);
      expect(tableInstance['visibleColumns']()).toBe(3);
    });
  });

  describe('A1 mobile to tablet override', () => {
    it('should promote mobile to tablet when A1 is enabled', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [NxComparisonTableModule, NxAllianzOneModule, ResponsiveA1Component],
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(ResponsiveA1Component);
      fixture.detectChanges();
      tableInstance = fixture.componentInstance.tableInstance;
      simulateResize(400);
      expect(tableInstance.viewType).toBe('tablet');
    });
  });

  describe('global defaults via injection token', () => {
    it('should use responsiveMode from default options', fakeAsync(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [NxComparisonTableModule, ResponsiveDefaultComponent],
        providers: [
          { provide: COMPARISON_TABLE_DEFAULT_OPTIONS, useValue: { responsiveMode: 'container' } },
        ],
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(ResponsiveDefaultComponent);
      fixture.detectChanges();
      tableInstance = fixture.componentInstance.tableInstance;
      simulateResize(400);
      expect(tableInstance.viewType).toBe('mobile');
      flush();
    }));

    it('should use responsiveBreakpoints from default options', fakeAsync(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [NxComparisonTableModule, ResponsiveDefaultComponent],
        providers: [
          {
            provide: COMPARISON_TABLE_DEFAULT_OPTIONS,
            useValue: {
              responsiveMode: 'container',
              responsiveBreakpoints: [
                { minWidth: 0, viewType: 'mobile', columns: 1 },
                { minWidth: 600, viewType: 'desktop', columns: 4 },
              ],
            },
          },
        ],
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(ResponsiveDefaultComponent);
      fixture.detectChanges();
      tableInstance = fixture.componentInstance.tableInstance;
      simulateResize(700);
      expect(tableInstance.viewType).toBe('desktop');
      expect(tableInstance['visibleColumns']()).toBe(4);
      flush();
    }));
  });

  describe('lifecycle', () => {
    it('should disconnect ResizeObserver on destroy', () => {
      createComponent(ResponsiveContainerModeComponent);
      fixture.destroy();
      expect(disconnectSpy).toHaveBeenCalled();
    });
  });
});

@Directive({ standalone: true })
abstract class ResponsiveTableTest {
  @ViewChild(NxComparisonTableComponent) tableInstance!: NxComparisonTableComponent;
}

@Component({
  template: `
    <nx-comparison-table style="width: 1000px;">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P5</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Desc</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
        <nx-comparison-table-cell>C</nx-comparison-table-cell>
        <nx-comparison-table-cell>D</nx-comparison-table-cell>
        <nx-comparison-table-cell>E</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F5</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ResponsiveDefaultComponent extends ResponsiveTableTest {}

@Component({
  template: `
    <nx-comparison-table
      [responsiveMode]="'container'"
      [responsiveBreakpoints]="breakpoints"
      style="width: 1000px;"
    >
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P5</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Desc</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
        <nx-comparison-table-cell>C</nx-comparison-table-cell>
        <nx-comparison-table-cell>D</nx-comparison-table-cell>
        <nx-comparison-table-cell>E</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F5</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ResponsiveCustomBreakpointsComponent extends ResponsiveTableTest {
  breakpoints: NxComparisonTableBreakpoint[] = [
    { minWidth: 0, viewType: 'mobile', columns: 2 },
    { minWidth: 500, columns: 3 },
    { minWidth: 700, viewType: 'tablet' },
    { minWidth: 1000, viewType: 'desktop', columns: 4 },
  ];
}

@Component({
  template: `
    <nx-comparison-table [responsiveMode]="'container'" style="width: 1000px;">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P5</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Desc</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
        <nx-comparison-table-cell>C</nx-comparison-table-cell>
        <nx-comparison-table-cell>D</nx-comparison-table-cell>
        <nx-comparison-table-cell>E</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F5</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ResponsiveContainerModeComponent extends ResponsiveTableTest {}

@Component({
  template: `
    <nx-comparison-table [responsiveMode]="'container'" [view]="'desktop'" style="width: 1000px;">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P5</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Desc</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
        <nx-comparison-table-cell>C</nx-comparison-table-cell>
        <nx-comparison-table-cell>D</nx-comparison-table-cell>
        <nx-comparison-table-cell>E</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F5</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ResponsiveWithViewOverrideComponent extends ResponsiveTableTest {}

@Component({
  template: `
    <nx-comparison-table [responsiveMode]="'container'" style="width: 1000px;">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P5</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Desc</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
        <nx-comparison-table-cell>C</nx-comparison-table-cell>
        <nx-comparison-table-cell>D</nx-comparison-table-cell>
        <nx-comparison-table-cell>E</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F5</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule, NxAllianzOneModule],
})
class ResponsiveA1Component extends ResponsiveTableTest {}
