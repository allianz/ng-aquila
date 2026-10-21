import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxPriceModule } from '@allianz/ng-aquila/price';
import { BidiModule, Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  EventEmitter,
  inject,
  Input,
  PLATFORM_ID,
  QueryList,
  signal,
  Type,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
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
import type { Mock } from 'vitest';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableComponent } from './comparison-table.component';
import {
  COMPARISON_TABLE_DEFAULT_OPTIONS,
  NxComparisonTableBreakpoint,
  NxComparisonTableColorScheme,
} from './comparison-table.models';
import { NxComparisonTableModule } from './comparison-table.module';
import {
  BASIC_COMPARISON_TABLE_TEMPLATE,
  HIDDEN_INDEXES_COMPARISON_TABLE_TEMPLATE,
} from './comparison-table.test-utils';
import { NxComparisonTableIntl } from './comparison-table-intl';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';

declare let viewport: any;
const THROTTLE_TIME = 400;

/** Jumps every running CSS transition (the carousel glide among them) to its end. */
function finishTransitions(): void {
  document.getAnimations().forEach((animation) => animation.finish());
}

/** The running `transform` transitions on carousel cells. */
function carouselGlides(): Animation[] {
  return document.getAnimations().filter((animation) => {
    const target = (animation.effect as KeyframeEffect | null)?.target;
    return (
      (animation as CSSTransition).transitionProperty === 'transform' &&
      !!target?.classList.contains('nx-comparison-table__product-cell')
    );
  });
}

/** The px of the inline-start inset of a desktop product cell's clip (the middle `clamp()` term). */
function inlineStartClip(cell: Element): number {
  const clipPath = getComputedStyle(cell).clipPath;
  const match = /clamp\([^,]+, (-?[\d.]+)px/.exec(clipPath);
  expect(match, `a clamped inline-start inset in ${clipPath}`).toBeTruthy();
  return parseFloat(match![1]);
}

// Carousel/overflow mode is A1-only (`_isOverflowing` gates on `_isA1()`). Provide the token at
// COMPONENT scope so it stays on this host's element
// injector — importing the module would hoist ALLIANZ_ONE into the shared TestBed and enable A1
// for every other host, flipping their mobile views to tablet (the A1 mobile→tablet promotion).
const A1_PROVIDERS = [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }];

@Directive({ standalone: true })
abstract class TableTest {
  @ViewChild(NxComparisonTableComponent)
  tableInstance!: NxComparisonTableComponent;
  @ViewChildren(NxComparisonTableCell)
  cellInstances!: QueryList<NxComparisonTableCell>;
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
        HeaderEyebrowStuckComponent,
        HeaderPriceComponent,
        HeaderHeadlineComponent,
        StickyRealScrollComponent,
        OverflowStuckComponent,
        MultiToggleSectionComponent,
        CardBordersComponent,
        A1CardBordersComponent,
        ConsumerOverrideComponent,
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
      expect(headerCells).toHaveLength(2);
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
      expect(rows).toHaveLength(4);

      expect(
        rows[0].queryAll(By.css('.nx-comparison-table__mobile-toggle-section-header')),
      ).toHaveLength(1);
      expect(rows[1].queryAll(By.css('.nx-comparison-table__description-cell'))).toHaveLength(3);
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
      expect(rows[0].queryAll(By.css('th'))).toHaveLength(5);
      expect(rows[0].queryAll(By.css('th.nx-comparison-table__placeholder-cell'))).toHaveLength(4);

      // description-header row: 3 placeholders + 3 content columns
      expect(rows[1].queryAll(By.css('th'))).toHaveLength(6);
      expect(rows[1].queryAll(By.css('th.nx-comparison-table__placeholder-cell'))).toHaveLength(3);

      // content rows: 2 placeholders + 1 mobile-header-column + 3 content cells
      expect(rows[2].queryAll(By.css('td'))).toHaveLength(6);
      expect(rows[2].queryAll(By.css('td.nx-comparison-table__placeholder-cell'))).toHaveLength(2);

      expect(rows[3].queryAll(By.css('td'))).toHaveLength(6);
      expect(rows[3].queryAll(By.css('td.nx-comparison-table__placeholder-cell'))).toHaveLength(2);
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
      expect(rows[0].queryAll(By.css('th'))).toHaveLength(3);
      expect(rows[0].queryAll(By.css('th.nx-comparison-table__placeholder-cell'))).toHaveLength(2);

      // content rows: 1 placeholder + 1 mobile-header-column + 1 content cell
      expect(rows[2].queryAll(By.css('td'))).toHaveLength(3);
      expect(rows[2].queryAll(By.css('td.nx-comparison-table__placeholder-cell'))).toHaveLength(1);

      expect(rows[3].queryAll(By.css('td'))).toHaveLength(3);
      expect(rows[3].queryAll(By.css('td.nx-comparison-table__placeholder-cell'))).toHaveLength(1);
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
        expect(cell._isSelected()).toBe(false);
      });
      cellElements.forEach((cell) => {
        expect(cell.nativeElement).not.toHaveClass('is-selected');
      });
    });

    it('should update selected on input change', () => {
      createTestComponent(SelectableIndexComponent);

      expect(tableInstance.selectedIndex).toBe(0);
      rowInstances.forEach((row) => {
        expect(row.cells()[0]._isSelected()).toBe(true);
        expect(row.cells()[1]._isSelected()).toBe(false);
        expect(row.cells()[2]._isSelected()).toBe(false);
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
        expect(row.cells()[0]._isSelected()).toBe(false);
        expect(row.cells()[1]._isSelected()).toBe(false);
        expect(row.cells()[2]._isSelected()).toBe(true);
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
      const spy = vi.spyOn(tableInstance.selectedIndexChange, 'emit');

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
        expect(cell._isCellDisabled()).toBe(false);
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
        expect(row.cells()[0]._isCellDisabled()).toBe(false);
        expect(row.cells()[1]._isCellDisabled()).toBe(true);
        expect(row.cells()[2]._isCellDisabled()).toBe(false);
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
        expect(row.cells()[0]._isCellDisabled()).toBe(false);
        expect(row.cells()[1]._isCellDisabled()).toBe(false);
        expect(row.cells()[2]._isCellDisabled()).toBe(true);
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
        expect(row.cells()[0]._isCellDisabled()).toBe(false);
        expect(row.cells()[1]._isCellDisabled()).toBe(false);
        expect(row.cells()[2]._isCellDisabled()).toBe(false);
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
      vi.spyOn(tableInstance.viewTypeChange, 'emit').mockReturnValue(undefined);
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      expect(tableInstance.viewTypeChange.emit).toHaveBeenCalledWith('mobile');
      flush();
    }));
  });

  describe('sticky behaviour', () => {
    // The mobile sticky-column clip: each clippable cell carries a static inline-start offset
    // (--ct-cell-start, set on layout) and inherits the live --ct-clip-istart (sticky-column width +
    // scrollLeft) from its row, so the effective clip in px is max(0, istart − cellStart).
    const effectiveClip = (cell: DebugElement): number => {
      const istart = parseFloat(
        getComputedStyle(cell.nativeElement).getPropertyValue('--ct-clip-istart') || '0',
      );
      const cellStart = parseFloat(
        cell.nativeElement.style.getPropertyValue('--ct-cell-start') || '0',
      );
      return Math.max(0, istart - cellStart);
    };

    // Drives the real stuck detection via window scroll. Callers wrap the table in a
    // 1200px spacer on each side.
    const scrollHeaderTo = (stuck: boolean): void => {
      window.scrollTo(0, stuck ? 1300 : 0);
      dispatchFakeEvent(window, 'scroll');
      tick(THROTTLE_TIME);
      fixture.detectChanges();
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

    // The column paged out slides under the sticky first column; its clip must grow by one column
    // step in the same change detection that moves the page, or it would paint over the column.
    it('should clip the column paged under the sticky first column', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const host = tableElement.nativeElement as HTMLElement;
      const bodyCell = (col: number) => host.querySelector(`tbody [data-ct-col="${col}"]`)!;
      const header = (col: number) =>
        host.querySelector(`.is-header-row [data-ct-col="${col}"]`)!.getBoundingClientRect();
      const step = header(1).left - header(0).left;
      expect(inlineStartClip(bodyCell(0))).toBeLessThanOrEqual(0);

      (tableInstance as any).scrollNext();
      fixture.detectChanges();

      // Base tokens: no gap, so the whole step (= the cell width) is hidden.
      expect(inlineStartClip(bodyCell(0))).toBeCloseTo(step, 0);
      expect(inlineStartClip(bodyCell(0))).toBeGreaterThanOrEqual(
        bodyCell(0).getBoundingClientRect().width - 1,
      );
      expect(inlineStartClip(bodyCell(1))).toBeLessThanOrEqual(0);
      flush();
    }));

    it('should update the clip synchronously on page scroll (no rAF defer)', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const updateClipSpy = vi
        .spyOn(tableInstance as any, '_updateClip')
        .mockReturnValue(undefined);
      // The page-wide listener is registered on window with capture, so a document scroll reaches it.
      dispatchFakeEvent(document, 'scroll');
      // No tick(): proves the page-scroll handler is synchronous.
      expect(updateClipSpy).toHaveBeenCalled();
      flush();
    }));

    it('should write the live mobile clip offset on the clipped rows, not the host', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(LongPageWithTableComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const host = tableElement.nativeElement as HTMLElement;
      host.scrollTo(50, 0);
      dispatchFakeEvent(document, 'scroll');
      tick();
      fixture.detectChanges();

      expect(host.style.getPropertyValue('--ct-clip-istart')).toBe('');
      for (const row of host.querySelectorAll<HTMLElement>(
        '.nx-comparison-table__description-row, .nx-comparison-table__toggle-section-header-row',
      )) {
        expect(parseFloat(row.style.getPropertyValue('--ct-clip-istart'))).toBeGreaterThan(50);
      }
      flush();
    }));

    it('should clip a mobile toggle section added after the first render', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      fixture = TestBed.createComponent(ToggleSectionOverlayComponent);
      const data = fixture.componentInstance.data;
      fixture.componentInstance.data = data.filter(
        (element: any) => element.type !== 'toggleSection',
      );
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement.querySelector('nx-comparison-table');
      expect(host.querySelector('.nx-comparison-table__toggle-section-header-row')).toBeNull();

      fixture.componentInstance.data = data;
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      dispatchFakeEvent(document, 'scroll');

      const row = host.querySelector<HTMLElement>(
        '.nx-comparison-table__toggle-section-header-row',
      )!;
      expect(parseFloat(row.style.getPropertyValue('--ct-clip-istart'))).toBeGreaterThan(0);
      flush();
    }));

    it('should skip the vertical clip on scroll while the header cannot stick', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      fixture = TestBed.createComponent(StickyRealScrollComponent);
      (fixture.componentInstance as StickyRealScrollComponent).mayStick = false;
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      tableInstance = fixture.componentInstance.tableInstance;

      const updateClipSpy = vi.spyOn(tableInstance as any, '_updateClip');
      dispatchFakeEvent(document, 'scroll');
      expect(updateClipSpy).not.toHaveBeenCalled();
      flush();
    }));

    it('should skip the clip update while the table is off-screen', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const updateClipSpy = vi
        .spyOn(tableInstance as any, '_updateClip')
        .mockReturnValue(undefined);

      // The IntersectionObserver gate lets the page-wide scroll handler cost nothing while the
      // table is off-screen. Drive the flag directly.
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
      // geometry (environment-sensitive in headless), so assert its shape, not a value. It lives on
      // the tbody, not on the wrapper the whole table inherits from.
      const tbody = fixture.debugElement.query(By.css('tbody')).nativeElement;
      expect(tbody.style.getPropertyValue('--ct-clip-top')).toMatch(/^-?\d+px$/);
      expect(native.style.getPropertyValue('--ct-clip-top')).toBe('');
      flush();
    }));

    // Proves the real stuck detection (getBoundingClientRect-based, driven by the
    // window scroll listener) rather than poking the signal.
    it('should set _isHeaderStuck to true only once the page is scrolled past the header, real DOM/scroll driven', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(StickyRealScrollComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      expect(tableInstance._isHeaderStuck()).toBe(false);

      scrollHeaderTo(true);
      expect(tableInstance._isHeaderStuck()).toBe(true);

      scrollHeaderTo(false);
      expect(tableInstance._isHeaderStuck()).toBe(false);
      flush();
    }));

    it('should keep a [mayStick]="false" header unstuck, and pick the current scroll position up when it is toggled back on', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(StickyRealScrollComponent);
      const testComponent = testInstance as StickyRealScrollComponent;
      testComponent.mayStick = false;
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      scrollHeaderTo(true);
      expect(tableInstance._isHeaderStuck()).toBe(false);

      // No further scroll event: re-evaluating on toggle is what the signal-backed `mayStick` buys.
      testComponent.mayStick = true;
      fixture.detectChanges();
      flush();
      expect(tableInstance._isHeaderStuck()).toBe(true);

      testComponent.mayStick = false;
      fixture.detectChanges();
      flush();
      expect(tableInstance._isHeaderStuck()).toBe(false);
    }));

    it('should reflect _isHeaderStuck on the header cell as is-stuck', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(StickyRealScrollComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const headerCell = fixture.debugElement.query(
        By.css('.nx-comparison-table__header-cell'),
      ).nativeElement;
      expect(headerCell).not.toHaveClass('is-stuck');

      scrollHeaderTo(true);
      expect(headerCell).toHaveClass('is-stuck');

      scrollHeaderTo(false);
      expect(headerCell).not.toHaveClass('is-stuck');
      flush();
    }));

    it('should hide the eyebrow slot only once the header is stuck', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(HeaderEyebrowStuckComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const eyebrow = fixture.debugElement.query(By.css('.eyebrow')).nativeElement;
      expect(getComputedStyle(eyebrow).display).not.toBe('none');

      // Jump the CSS transition to completion instead of asserting mid-flight.
      scrollHeaderTo(true);
      eyebrow.getAnimations().forEach((animation: Animation) => animation.finish());
      expect(getComputedStyle(eyebrow).display).toBe('none');

      scrollHeaderTo(false);
      eyebrow.getAnimations().forEach((animation: Animation) => animation.finish());
      expect(getComputedStyle(eyebrow).display).not.toBe('none');
      flush();
    }));

    it('should step the projected price size down while the header is stuck', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(HeaderPriceComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const price = fixture.debugElement.query(By.css('nx-price')).nativeElement;
      // The consumer asked for 's'; the header cell imposes '2xl'.
      expect(price).toHaveClass('nx-price--2xl');

      scrollHeaderTo(true);
      expect(price).toHaveClass('nx-price--l');

      scrollHeaderTo(false);
      expect(price).toHaveClass('nx-price--2xl');
      flush();
    }));

    it('should drop the pinned state when the table switches to mobile', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(HeaderPriceComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      scrollHeaderTo(true);
      expect(tableInstance._isHeaderStuck()).toBe(true);

      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(tableInstance.viewType).toBe('mobile');
      expect(tableInstance._isHeaderStuck()).toBe(false);
      const price = fixture.debugElement.query(
        By.css('.nx-comparison-table__mobile-view nx-comparison-table-header-price nx-price'),
      ).nativeElement;
      expect(price).toHaveClass('nx-price--2xl');
      viewport.reset();
      flush();
    }));

    it('should leave prices outside header cells alone', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(HeaderPriceComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const contentPrice = fixture.debugElement.query(By.css('.content-price')).nativeElement;
      expect(contentPrice).toHaveClass('nx-price--s');
      flush();
    }));

    it('should leave a price outside the price slot of a header cell alone', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(HeaderPriceComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const unslotted = fixture.debugElement.query(By.css('.unslotted-price')).nativeElement;
      expect(unslotted).toHaveClass('nx-price--s');

      scrollHeaderTo(true);
      expect(unslotted).toHaveClass('nx-price--s');
      flush();
    }));

    it('should default the projected headline size to xl and step it down to l while the header is stuck', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(HeaderHeadlineComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.title')).nativeElement;
      // The consumer asked for 's'; the header cell imposes the table's default, 'xl'.
      expect(title).toHaveClass('nx-heading--xl');

      scrollHeaderTo(true);
      expect(title).toHaveClass('nx-heading--l');

      scrollHeaderTo(false);
      expect(title).toHaveClass('nx-heading--xl');
      flush();
    }));

    it("should use the table's headlineSize while not stuck, but still step down to m while stuck", fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(HeaderHeadlineComponent);
      (testInstance as HeaderHeadlineComponent).headlineSize = 'l';
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.title')).nativeElement;
      expect(title).toHaveClass('nx-heading--l');

      scrollHeaderTo(true);
      expect(title).toHaveClass('nx-heading--m');

      scrollHeaderTo(false);
      expect(title).toHaveClass('nx-heading--l');
      flush();
    }));

    it('should leave a headline outside the title slot of a header cell alone', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(HeaderHeadlineComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const unslotted = fixture.debugElement.query(By.css('.unslotted-title')).nativeElement;
      expect(unslotted).toHaveClass('nx-heading--s');

      scrollHeaderTo(true);
      expect(unslotted).toHaveClass('nx-heading--s');
      flush();
    }));

    // Paging mid-carousel, then docking the header, must not re-slide the carousel.
    it('should not shift the carousel while paged mid-carousel when the header sticks', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowStuckComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      (tableInstance as any).scrollNext();
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      finishTransitions();
      const headerLefts = () =>
        Array.from(
          fixture.nativeElement.querySelectorAll(
            '.is-header-row .nx-comparison-table__product-cell',
          ),
          (cell: Element) => cell.getBoundingClientRect().left,
        );
      const leftsBefore = headerLefts();
      const pageIndexBefore = (tableInstance as any)._pageIndex();
      const theadBefore = fixture.debugElement.query(By.css('thead')).nativeElement;
      const theadHeightBefore = theadBefore.getBoundingClientRect().height;

      window.scrollTo(0, 1300);
      dispatchFakeEvent(window, 'scroll');
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      // The header shrinks while it docks; no carousel glide may start meanwhile.
      expect(carouselGlides()).toEqual([]);
      // fakeAsync doesn't drive real CSS transitions; force them to their end state.
      finishTransitions();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(carouselGlides()).toEqual([]);
      finishTransitions();
      fixture.detectChanges();

      const theadAfter = fixture.debugElement.query(By.css('thead')).nativeElement;
      // The header row genuinely shrinks — the carousel must stay indifferent to that.
      expect(theadAfter.getBoundingClientRect().height).toBeLessThan(theadHeightBefore);
      expect((tableInstance as any)._isHeaderStuck()).toBe(true);
      expect((tableInstance as any)._pageIndex()).toBe(pageIndexBefore);
      expect(headerLefts()).toEqual(leftsBefore);

      window.scrollTo(0, 0);
      dispatchFakeEvent(window, 'scroll');
      tick(THROTTLE_TIME);
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
      expect(headers).toHaveLength(1);
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
      expect(headers).toHaveLength(1);
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
      // visible width (100cqi).
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
      expect(headers).toHaveLength(2);
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

  describe('block edges across toggle sections', () => {
    function rowByDescription(text: string): HTMLElement {
      const cell = fixture.debugElement
        .queryAll(By.css('.nx-comparison-table__description-cell'))
        .find((c) => c.nativeElement.textContent.trim() === text)!;
      return cell.nativeElement.closest('tr');
    }

    function headerCell(text: string): HTMLElement {
      return fixture.debugElement
        .queryAll(By.css('.nx-comparison-table__toggle-section-header-cell'))
        .find((c) => c.nativeElement.textContent.trim() === text)!.nativeElement;
    }

    beforeEach(fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(MultiToggleSectionComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      flush();
    }));

    afterEach(() => {
      viewport.reset();
    });

    function rowsWith(className: string): HTMLElement[] {
      return fixture.debugElement.queryAll(By.css(`tr.${className}`)).map((r) => r.nativeElement);
    }

    function sectionHeaderRow(text: string): HTMLElement {
      return headerCell(text).closest('tr')!;
    }

    /** The corner radii of a row's first product cell, clockwise from the top-left. */
    function radii(text: string): string[] {
      const cs = getComputedStyle(
        rowByDescription(text).querySelector('.nx-comparison-table__cell')!,
      );
      return [
        cs.borderTopLeftRadius,
        cs.borderTopRightRadius,
        cs.borderBottomRightRadius,
        cs.borderBottomLeftRadius,
      ];
    }

    function toggle(text: string): void {
      headerCell(text).click();
      fixture.detectChanges();
    }

    it('should mark the table-wide first content row and the block edges', () => {
      expect(rowsWith('is-first-content-row')).toEqual([rowByDescription('A1')]);
      expect(rowsWith('is-block-start')).toEqual(['A1', 'B1', 'C1'].map(rowByDescription));
      expect(rowsWith('is-block-end')).toEqual(['Mid', 'B2', 'C2'].map(rowByDescription));
    });

    it('should end the block of a row before a toggle section and space the section from it', () => {
      tableElement.nativeElement.style.setProperty('--comparison-table-cell-border-radius', '8px');

      expect(radii('Mid')).toEqual(['0px', '0px', '8px', '8px']);
      expect(sectionHeaderRow('S2')).toHaveClass('has-gap-above');
      expect(getComputedStyle(headerCell('S2')).paddingTop).toBe('16px');
      expect(sectionHeaderRow('S1')).not.toHaveClass('has-gap-above');
      expect(getComputedStyle(headerCell('S1')).paddingTop).toBe('0px');
    });

    it('should start a block on the first visible row after a collapsed section', () => {
      tableElement.nativeElement.style.setProperty('--comparison-table-cell-border-radius', '8px');
      toggle('S1');

      expect(rowByDescription('A1')).toHaveClass('is-collapsed');
      expect(rowByDescription('Mid')).toHaveClass('is-block-start');
      expect(radii('Mid')).toEqual(['8px', '8px', '8px', '8px']);
      expect(sectionHeaderRow('S1')).toHaveClass('has-gap-below');
      expect(getComputedStyle(headerCell('S1')).paddingBottom).toBe('16px');

      toggle('S1');
      expect(rowByDescription('Mid')).not.toHaveClass('is-block-start');
      expect(radii('Mid')).toEqual(['0px', '0px', '8px', '8px']);
    });

    it('should leave no gap below a collapsed last section', () => {
      tableElement.nativeElement.style.setProperty(
        '--comparison-table-toggle-section-content-padding-top',
        '4px',
      );
      expect(getComputedStyle(headerCell('S3')).paddingBottom).toBe('4px');

      toggle('S3');
      expect(sectionHeaderRow('S3')).not.toHaveClass('has-gap-below');
      expect(sectionHeaderRow('S3')).not.toHaveClass('has-content-gap-below');
      expect(getComputedStyle(headerCell('S3')).paddingBottom).toBe('0px');
      expect(rowByDescription('B2')).toHaveClass('is-block-end');
    });

    it('should not double the gap between a collapsed section and the next section', () => {
      (fixture.componentInstance as MultiToggleSectionComponent).expandSecond = false;
      fixture.detectChanges();

      expect(getComputedStyle(headerCell('S2')).paddingBottom).toBe('16px');
      expect(getComputedStyle(headerCell('S3')).paddingTop).toBe('0px');
    });
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
      const header = (col: number) =>
        tableElement.nativeElement
          .querySelector(`.is-header-row [data-ct-col="${col}"]`)
          .getBoundingClientRect();
      const firstColumnLeft = header(0).left;

      fixture.debugElement
        .query(By.css('.nx-comparison-table__nav-button--next'))
        .nativeElement.click();
      fixture.detectChanges();
      finishTransitions();

      expect(instance._pageIndex()).toBe(1);
      // The second column now rests where the first one did.
      expect(header(1).left).toBeCloseTo(firstColumnLeft, 0);
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

    it('should clip only the paged-out columns after a desktop→tablet→desktop round trip', fakeAsync(() => {
      // Regression: the #viewport/#native viewChild is shared across tablet and desktop, so a
      // tablet↔desktop flip does not recreate it; geometry left over from tablet over-clipped the
      // visible desktop columns.
      const instance = tableInstance as any;
      const host = tableElement.nativeElement as HTMLElement;

      for (let i = 0; i < 50; i++) {
        instance.scrollNext();
      }
      fixture.detectChanges();
      expect(instance._pageIndex()).toBe(instance._maxPageIndex());

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

      const page = instance._pageIndex();
      expect(page).toBeLessThanOrEqual(instance._maxPageIndex());
      const headers = host.querySelectorAll('.is-header-row .nx-comparison-table__cell');
      expect(headers.length).toBe(5);
      headers.forEach((cell, col) => {
        if (col >= page) {
          expect(inlineStartClip(cell)).toBeLessThanOrEqual(0);
        } else {
          expect(inlineStartClip(cell)).toBeGreaterThan(0);
        }
      });
      flush();
    }));

    it('should move every column by the current page, re-created cells too', fakeAsync(() => {
      // A `hiddenIndexes` round-trip re-creates cells without moving any measurement trigger.
      const instance = tableInstance as any;
      expect(instance._infoColumnCount()).toBe(5);

      instance.hiddenIndexes = [3, 4];
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      instance.hiddenIndexes = [];
      fixture.detectChanges();
      tick(THROTTLE_TIME);

      instance.scrollNext();
      fixture.detectChanges();
      tick(THROTTLE_TIME);
      finishTransitions();
      expect(instance._pageIndex()).toBe(1);

      const native = fixture.debugElement.query(
        By.css('.nx-comparison-table__native'),
      ).nativeElement;
      expect(native.style.getPropertyValue('--ct-page')).toBe('1');

      const productCells: HTMLElement[] = Array.from(
        tableElement.nativeElement.querySelectorAll('.nx-comparison-table__product-cell'),
      );
      expect(productCells.length).toBeGreaterThan(5);
      const shifts = productCells.map((cell) => {
        expect(getComputedStyle(cell).getPropertyValue('--ct-page')).toBe('1');
        return new DOMMatrixReadOnly(getComputedStyle(cell).transform).m41;
      });
      expect(shifts[0]).toBeLessThan(0);
      expect(new Set(shifts).size).toBe(1);
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
      expect(navWrapper.previousElementSibling).toBeNull();
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

  describe('swipe paging', () => {
    const pointer = (type: string, x: number, y: number, init: PointerEventInit = {}) =>
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        pointerId: 1,
        isPrimary: true,
        pointerType: 'touch',
        clientX: x,
        clientY: y,
        ...init,
      });

    let host: HTMLElement;
    let native: HTMLElement;
    let target: HTMLElement;
    let step: number;
    const pan = () => native.style.getPropertyValue('--ct-pan');

    function swipe(dx: number, dy = 2, init: PointerEventInit = {}, end = 'pointerup'): void {
      target.dispatchEvent(pointer('pointerdown', 500, 300, init));
      target.dispatchEvent(pointer('pointermove', 500 + dx / 2, 300 + dy / 2, init));
      target.dispatchEvent(pointer('pointermove', 500 + dx, 300 + dy, init));
      target.dispatchEvent(pointer(end, 500 + dx, 300 + dy, init));
    }

    beforeEach(fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      host = tableElement.nativeElement;
      native = host.querySelector<HTMLElement>('.nx-comparison-table__native')!;
      target = host.querySelector<HTMLElement>('tbody [data-ct-col="1"]')!;
      const header = (col: number) =>
        host.querySelector(`.is-header-row [data-ct-col="${col}"]`)!.getBoundingClientRect();
      step = header(1).left - header(0).left;
    }));

    it('should page to the next column on a horizontal swipe', fakeAsync(() => {
      swipe(-(step + 20));
      fixture.detectChanges();

      expect((tableInstance as any)._pageIndex()).toBe(1);
      expect(pan()).toBe('');
      flush();
    }));

    it('should NOT page on a vertical swipe (lets the page scroll)', fakeAsync(() => {
      swipe(4, -220);
      fixture.detectChanges();

      expect((tableInstance as any)._pageIndex()).toBe(0);
      expect(host).not.toHaveClass('is-panning');
      flush();
    }));

    it('should add and remove the is-panning class around a horizontal pan', fakeAsync(() => {
      target.dispatchEvent(pointer('pointerdown', 500, 300));
      target.dispatchEvent(pointer('pointermove', 380, 302));
      expect(host).toHaveClass('is-panning');

      target.dispatchEvent(pointer('pointerup', 380, 302));
      expect(host).not.toHaveClass('is-panning');
      flush();
    }));

    it('should restore the resting offset when a short swipe snaps back', fakeAsync(() => {
      (tableInstance as any).scrollNext();
      fixture.detectChanges();
      finishTransitions();
      const cell = host.querySelector('.is-header-row [data-ct-col="1"]')!;
      const restingLeft = cell.getBoundingClientRect().left;

      target.dispatchEvent(pointer('pointerdown', 500, 300));
      target.dispatchEvent(pointer('pointermove', 450, 301));
      expect(pan()).toBe('50px');
      expect(cell.getBoundingClientRect().left).toBeCloseTo(restingLeft - 50, 0);
      target.dispatchEvent(pointer('pointerup', 450, 301));
      fixture.detectChanges();
      finishTransitions();

      expect((tableInstance as any)._pageIndex()).toBe(1);
      expect(pan()).toBe('');
      expect(cell.getBoundingClientRect().left).toBeCloseTo(restingLeft, 0);
      flush();
    }));

    it('should not pan past either end', fakeAsync(() => {
      target.dispatchEvent(pointer('pointerdown', 500, 300));
      target.dispatchEvent(pointer('pointermove', 600, 301));
      expect(pan()).toBe('0px');
      target.dispatchEvent(pointer('pointermove', -5000, 301));
      expect(pan()).toBe(`${Math.round((tableInstance as any)._maxPageIndex() * step)}px`);
      target.dispatchEvent(pointer('pointerup', -5000, 301));
      fixture.detectChanges();
      expect((tableInstance as any)._pageIndex()).toBe((tableInstance as any)._maxPageIndex());
      flush();
    }));

    it('should snap back when the browser cancels a pan', fakeAsync(() => {
      swipe(-(step / 2 + 20), 2, {}, 'pointercancel');
      fixture.detectChanges();

      expect(host).not.toHaveClass('is-panning');
      expect(pan()).toBe('');
      expect((tableInstance as any)._pageIndex()).toBe(0);
      flush();
    }));

    it('should page with a pen but not with a mouse', fakeAsync(() => {
      swipe(-(step + 20), 2, { pointerType: 'mouse' });
      fixture.detectChanges();
      expect((tableInstance as any)._pageIndex()).toBe(0);

      swipe(-(step + 20), 2, { pointerType: 'pen' });
      fixture.detectChanges();
      expect((tableInstance as any)._pageIndex()).toBe(1);
      flush();
    }));

    it('should ignore movement below the pan threshold', fakeAsync(() => {
      target.dispatchEvent(pointer('pointerdown', 500, 300));
      target.dispatchEvent(pointer('pointermove', 494, 301));
      target.dispatchEvent(pointer('pointerup', 494, 301));

      expect(host).not.toHaveClass('is-panning');
      expect(pan()).toBe('');
      flush();
    }));

    it('should swallow the click that ends a pan on a button, but not a tap', fakeAsync(() => {
      const next = host.querySelector<HTMLElement>('.nx-comparison-table__nav-button--next')!;
      const scrollNext = vi.spyOn(tableInstance, 'scrollNext');
      target = next;

      swipe(-50);
      next.click();
      fixture.detectChanges();
      expect(scrollNext).not.toHaveBeenCalled();

      target.dispatchEvent(pointer('pointerdown', 500, 300));
      target.dispatchEvent(pointer('pointerup', 500, 300));
      next.click();
      fixture.detectChanges();
      expect(scrollNext).toHaveBeenCalledTimes(1);
      flush();
    }));

    it('should hand vertical pans and pinch-zoom to the browser while overflowing', fakeAsync(() => {
      expect(getComputedStyle(native).touchAction).toBe('pan-y pinch-zoom');
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
      expect(cell, 'a product cell with the last visible index exists').toBeTruthy();
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
        expect(cell.hasAttribute('inert')).toBe(false);
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
        expect(
          row.nativeElement.tagName,
          `Expected a <tr> for ${row.nativeElement.className}`,
        ).toBe('TR');
      });
    });

    it('should have role="row" on toggle section header row', () => {
      createTestComponent(BasicComponent);

      const toggleSectionHeaderRow = tableElement.query(
        By.css('.nx-comparison-table__toggle-section-header'),
      );
      expect(toggleSectionHeaderRow.attributes.role).toBe('row');
    });

    it('has no accessibility violations', async () => {
      createTestComponent(BasicComponent);

      const results = await axe.run(fixture.nativeElement, {
        rules: {
          'empty-table-header': { enabled: false },
        },
      });
      expect(results.violations.length).toBe(0);
      const violationMessages = results.violations.map((item) => item.description);
      if (violationMessages.length) {
        console.error(violationMessages);
        expect(violationMessages).toBeFalsy();
      }
    });
  });

  describe('card borders', () => {
    const BORDER = 'rgb(0, 0, 255)';
    const ERROR = 'rgb(255, 0, 0)';
    const SELECTED = 'rgb(0, 128, 0)';
    const TRANSPARENT = 'rgba(0, 0, 0, 0)';

    afterEach(() => {
      viewport.reset();
    });

    async function createCardTable(component: Type<TableTest>) {
      viewport.set('desktop');
      createTestComponent(component);
      await fixture.whenStable();
      const host = tableElement.nativeElement as HTMLElement;
      host.style.setProperty('--comparison-table-border-color', BORDER);
      host.style.setProperty('--danger', ERROR);
      host.style.setProperty('--comparison-table-header-border-color', BORDER);
      host.style.setProperty('--comparison-table-selected-border-color', SELECTED);
      host.style.setProperty('--comparison-table-selected-border-width', '2px');
      return host;
    }

    /** Top, right, bottom, left border colours. */
    function borderColors(el: Element): string[] {
      const cs = getComputedStyle(el);
      return [cs.borderTopColor, cs.borderRightColor, cs.borderBottomColor, cs.borderLeftColor];
    }

    function cards(host: HTMLElement, row: string): Element[] {
      return [...host.querySelectorAll(`${row} .nx-comparison-table__cell-inner`)];
    }

    it('should draw one error perimeter around the header block and one around the footer block', async () => {
      const host = await createCardTable(CardBordersComponent);

      for (const row of ['.is-header-row', '.is-footer-row']) {
        const [first, last] = cards(host, row);
        expect(borderColors(first)).toEqual([ERROR, BORDER, ERROR, ERROR]);
        expect(borderColors(last)).toEqual([ERROR, ERROR, ERROR, BORDER]);
      }
    });

    it('should outline the selected column and every erroneous card in A1', async () => {
      const host = await createCardTable(A1CardBordersComponent);
      const [firstRow, lastRow] = [...host.querySelectorAll('tbody .is-content-row')].map((row) => [
        ...row.querySelectorAll('.nx-comparison-table__cell'),
      ]);

      expect(borderColors(firstRow[0])).toEqual([TRANSPARENT, TRANSPARENT, BORDER, TRANSPARENT]);
      expect(borderColors(lastRow[0])).toEqual(Array(4).fill(TRANSPARENT));
      expect(borderColors(firstRow[1])).toEqual([SELECTED, SELECTED, BORDER, SELECTED]);
      expect(borderColors(lastRow[1])).toEqual([TRANSPARENT, SELECTED, SELECTED, SELECTED]);
      const selectedHeader = getComputedStyle(cards(host, '.is-header-row')[1]);
      expect([selectedHeader.outlineColor, selectedHeader.outlineWidth]).toEqual([SELECTED, '2px']);
      expect(getComputedStyle(cards(host, '.is-header-row')[0]).outlineColor).toBe(TRANSPARENT);

      (testInstance as A1CardBordersComponent).isError = true;
      fixture.detectChanges();
      for (const row of ['.is-header-row', '.is-footer-row']) {
        for (const card of cards(host, row)) {
          expect(borderColors(card)).toEqual(Array(4).fill(ERROR));
        }
      }
    });
  });

  describe('colour schemes', () => {
    const SCHEME = 'rgb(1, 2, 3)';
    const SELECTED_BG = 'rgb(4, 5, 6)';
    const TEAL = 'rgb(7, 8, 9)';
    const GREEN = 'rgb(10, 11, 12)';

    afterEach(() => {
      viewport.reset();
    });

    async function createSchemeTable() {
      viewport.set('desktop');
      createTestComponent(A1ColorSchemeComponent);
      await fixture.whenStable();
      const host = tableElement.nativeElement as HTMLElement;
      host.style.setProperty('--comparison-table-header-border-color', 'rgb(0, 0, 255)');
      host.style.setProperty('--danger', 'rgb(255, 0, 0)');
      host.style.setProperty('--comparison-table-selected-border-color', 'rgb(0, 128, 0)');
      host.style.setProperty('--comparison-table-selected-column-background-color', SELECTED_BG);
      host.style.setProperty('--comparison-table-header-attention-background-color', SCHEME);
      host.style.setProperty('--semantic-color-accent-attention-teal-resting', TEAL);
      host.style.setProperty('--semantic-color-accent-attention-green-resting', GREEN);
      return host;
    }

    function cardStyles(host: HTMLElement): CSSStyleDeclaration[] {
      return [...host.querySelectorAll('.is-header-row, .is-footer-row')].flatMap((row) =>
        [...row.querySelectorAll('.nx-comparison-table__cell-inner')].map((card) =>
          getComputedStyle(card),
        ),
      );
    }

    it('should keep the scheme background on selected cards and never draw the error border', async () => {
      const host = await createSchemeTable();

      const styles = cardStyles(host);
      expect(styles.length).toBe(4);
      for (const cs of styles) {
        expect(cs.backgroundColor).toBe(SCHEME);
        expect(cs.borderTopColor).toBe('rgb(0, 0, 255)');
      }
      expect(styles[1].outlineColor).toBe('rgb(0, 128, 0)');

      (testInstance as A1ColorSchemeComponent).colorScheme = 'default';
      fixture.detectChanges();
      const [header, selectedHeader] = cardStyles(host);
      expect(selectedHeader.backgroundColor).toBe(SELECTED_BG);
      expect(header.borderTopColor).toBe('rgb(255, 0, 0)');
    });

    it('should colour accent-attention cards and the popular cell with their own hues', async () => {
      const host = await createSchemeTable();
      (testInstance as A1ColorSchemeComponent).colorScheme = 'accent-attention';
      fixture.detectChanges();

      for (const cs of cardStyles(host)) {
        expect(cs.backgroundColor).toBe(GREEN);
      }
      const popular = host.querySelector('.nx-comparison-table__popular-cell')!;
      expect(getComputedStyle(popular).backgroundColor).toBe(TEAL);
    });
  });

  describe('consumer overrides', () => {
    afterEach(() => {
      viewport.reset();
    });

    it('should let consumer styles on the cell classes override the content cell surface', async () => {
      viewport.set('desktop');
      createTestComponent(ConsumerOverrideComponent);
      await fixture.whenStable();
      const [plain, selected] = fixture.nativeElement.querySelectorAll(
        'tbody .is-content-row .nx-comparison-table__cell',
      );

      expect(getComputedStyle(plain).backgroundColor).toBe('rgb(1, 2, 3)');
      expect(getComputedStyle(selected).backgroundColor).toBe('rgb(4, 5, 6)');
    });

    it('should follow a border colour overridden on an ancestor in the intersection cell', async () => {
      viewport.set('desktop');
      createTestComponent(IntersectionComponent);
      await fixture.whenStable();
      (fixture.nativeElement as HTMLElement).style.setProperty(
        '--comparison-table-border-color',
        'rgb(1, 2, 3)',
      );
      const cell = fixture.nativeElement.querySelector('.nx-comparison-table__intersection-cell');
      const banner = cell.querySelector('.nx-comparison-table__sticky-banner');

      expect(getComputedStyle(cell).borderBottomColor).toBe('rgb(1, 2, 3)');
      expect(getComputedStyle(banner).borderRightColor).toBe('rgb(1, 2, 3)');
    });
  });

  describe('hidden column', () => {
    it('should not be hidden by default', () => {
      createTestComponent(HiddenColumnsComponent);
      cellInstances.forEach((cell) => {
        expect(cell._isCellHidden()).toBe(false);
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
        expect(row.cells()[0]._isCellHidden()).toBe(false);
        expect(row.cells()[1]._isCellHidden()).toBe(false);
        expect(row.cells()[2]._isCellHidden()).toBe(true);
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
        expect(row.cells()[0]._isCellHidden()).toBe(false);
        expect(row.cells()[1]._isCellHidden()).toBe(true);
        expect(row.cells()[2]._isCellHidden()).toBe(false);
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
      expect(before).toHaveLength(2);

      // Hiding a column removes it (and its placeholder) from the popular row entirely.
      (testInstance as HiddenColumnsComponent).hiddenIndexes = [2];
      fixture.detectChanges();

      const after = fixture.debugElement.queryAll(By.css(placeholderSelector));
      expect(after).toHaveLength(1);
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
      imports: [NxComparisonTableModule, AllianzOneComponent],
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
  selector: 'test-comparison-table-basic-component',
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
  selector: 'test-basic-on-push-component',
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
  selector: 'test-selectable-index-component',
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
  selector: 'test-disabled-columns-component',
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
  selector: 'test-long-page-with-table-component',
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
  selector: 'test-hidden-columns-component',
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
  selector: 'test-toggle-section-overlay-component',
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
  selector: 'test-overflow-component',
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
  selector: 'test-overflow-stuck',
  template: `
    <div style="height: 1200px"></div>
    <nx-comparison-table [responsiveBreakpoints]="breakpoints" style="width: 600px;">
      <ng-container nxComparisonTableRow type="header">
        @for (n of [1, 2, 3, 4, 5]; track n) {
          <nx-comparison-table-cell type="header">
            <nx-comparison-table-header-eyebrow class="eyebrow">
              Eyebrow {{ n }}
            </nx-comparison-table-header-eyebrow>
            <nx-comparison-table-header-title>
              <span nxHeadline size="s">Product {{ n }}</span>
            </nx-comparison-table-header-title>
            <nx-comparison-table-header-price>
              <nx-price [value]="99" size="s" />
            </nx-comparison-table-header-price>
          </nx-comparison-table-cell>
        }
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Feature 1</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
        <nx-comparison-table-cell>C</nx-comparison-table-cell>
        <nx-comparison-table-cell>D</nx-comparison-table-cell>
        <nx-comparison-table-cell>E</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
    <div style="height: 1200px"></div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule, NxHeadlineModule, NxPriceModule],
  providers: A1_PROVIDERS,
})
class OverflowStuckComponent extends TableTest {
  breakpoints: NxComparisonTableBreakpoint[] = [{ minWidth: 0, columns: 3 }];
}

@Component({
  selector: 'test-header-eyebrow-stuck',
  template: `
    <div style="height: 1200px"></div>
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">
          <nx-comparison-table-header-eyebrow class="eyebrow">
            Eyebrow
          </nx-comparison-table-header-eyebrow>
          Product 1
        </nx-comparison-table-cell>
      </ng-container>
      <!-- Extra height: a header-only table is too short to stay sticky once scrolled past. -->
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Description</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>Cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
    <div style="height: 1200px"></div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class HeaderEyebrowStuckComponent extends TableTest {}

@Component({
  selector: 'test-sticky-real-scroll',
  template: `
    <div style="height: 1200px"></div>
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header" [mayStick]="mayStick">
        <nx-comparison-table-cell type="header">Header</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Description</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>Cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
    <div style="height: 1200px"></div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class StickyRealScrollComponent extends TableTest {
  mayStick = true;
}

@Component({
  selector: 'test-header-price',
  template: `
    <div style="height: 1200px"></div>
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">
          <nx-comparison-table-header-price>
            <nx-price [value]="99" size="s" />
          </nx-comparison-table-header-price>
          <nx-price class="unslotted-price" [value]="99" size="s" />
        </nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Description</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>
          <nx-price class="content-price" [value]="99" size="s" />
        </nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
    <div style="height: 1200px"></div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule, NxPriceModule],
})
class HeaderPriceComponent extends TableTest {}

@Component({
  selector: 'test-header-headline',
  template: `
    <div style="height: 1200px"></div>
    <nx-comparison-table [headlineSize]="headlineSize">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">
          <nx-comparison-table-header-title>
            <span class="title" nxHeadline size="s">Product 1</span>
          </nx-comparison-table-header-title>
          <span class="unslotted-title" nxHeadline size="s">Own template</span>
        </nx-comparison-table-cell>
      </ng-container>
      <!-- See HeaderEyebrowStuckComponent. -->
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Description</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>Cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
    <div style="height: 1200px"></div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule, NxHeadlineModule],
})
class HeaderHeadlineComponent extends TableTest {
  headlineSize: 'l' | 'xl' = 'xl';
}

@Component({
  selector: 'test-allianz-one-component',
  template: BASIC_COMPARISON_TABLE_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
  providers: A1_PROVIDERS,
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
  selector: 'test-multi-toggle-section-component',
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">H1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">H2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header>S1</nx-comparison-table-toggle-section-header>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>A1</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>X</nx-comparison-table-cell>
          <nx-comparison-table-cell>Y</nx-comparison-table-cell>
        </ng-container>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>A2</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>X</nx-comparison-table-cell>
          <nx-comparison-table-cell>Y</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Mid</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>X</nx-comparison-table-cell>
        <nx-comparison-table-cell>Y</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableToggleSection [isExpanded]="expandSecond">
        <nx-comparison-table-toggle-section-header>S2</nx-comparison-table-toggle-section-header>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>B1</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>X</nx-comparison-table-cell>
          <nx-comparison-table-cell>Y</nx-comparison-table-cell>
        </ng-container>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>B2</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>X</nx-comparison-table-cell>
          <nx-comparison-table-cell>Y</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header>S3</nx-comparison-table-toggle-section-header>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>C1</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>X</nx-comparison-table-cell>
          <nx-comparison-table-cell>Y</nx-comparison-table-cell>
        </ng-container>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>C2</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>X</nx-comparison-table-cell>
          <nx-comparison-table-cell>Y</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class MultiToggleSectionComponent extends TableTest {
  expandSecond = true;
}

@Component({
  selector: 'test-row-group-with-toggle-section-component',
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
  selector: 'test-overflow-row-group-component',
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
  selector: 'test-intersection-component',
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

const CARD_BORDERS_TEMPLATE = `
  <nx-comparison-table [isError]="isError" [selectedIndex]="1">
    <ng-container nxComparisonTableRow type="header">
      <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
      <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
    </ng-container>
    @for (row of ['A', 'B']; track row) {
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>{{ row }}</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>{{ row }}1</nx-comparison-table-cell>
        <nx-comparison-table-cell>{{ row }}2</nx-comparison-table-cell>
      </ng-container>
    }
    <ng-container nxComparisonTableRow type="footer">
      <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
      <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
    </ng-container>
  </nx-comparison-table>
`;

@Component({
  selector: 'test-card-borders-component',
  template: CARD_BORDERS_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class CardBordersComponent extends TableTest {
  isError = true;
}

@Component({
  selector: 'test-a1-card-borders-component',
  template: CARD_BORDERS_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
  providers: A1_PROVIDERS,
})
class A1CardBordersComponent extends TableTest {
  isError = false;
}

@Component({
  selector: 'test-a1-color-scheme-component',
  template: `
    <nx-comparison-table
      [isError]="true"
      [selectedIndex]="1"
      [colorScheme]="colorScheme"
      accentColor="green"
    >
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-popular-cell [forColumn]="1" accentColor="teal"
          >Popular</nx-comparison-table-popular-cell
        >
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>A</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A1</nx-comparison-table-cell>
        <nx-comparison-table-cell>A2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
  providers: A1_PROVIDERS,
})
class A1ColorSchemeComponent extends TableTest {
  colorScheme: NxComparisonTableColorScheme = 'attention';
}

const CONSUMER_OVERRIDE_TEMPLATE = `<div class="consumer-table">${CARD_BORDERS_TEMPLATE}</div>`;

@Component({
  selector: 'test-consumer-override-component',
  template: CONSUMER_OVERRIDE_TEMPLATE,
  styles: `
    .consumer-table tbody .nx-comparison-table__cell {
      background-color: rgb(1, 2, 3);
    }
    .consumer-table tbody .nx-comparison-table__cell.is-selected {
      background-color: rgb(4, 5, 6);
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ConsumerOverrideComponent extends TableTest {
  isError = false;
}

@Component({
  selector: 'test-rtl-component',
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
  let disconnectSpy: Mock;
  let realResizeObserver: typeof ResizeObserver;

  function simulateResize(width: number) {
    resizeCallback(
      [{ contentRect: { width } } as unknown as ResizeObserverEntry],
      null as unknown as ResizeObserver,
    );
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
    disconnectSpy = vi.fn().mockName('disconnect');
    realResizeObserver = window.ResizeObserver;
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

  // Spec files share one browser realm, so leaving the stub in place would hand it to every
  // later spec file as well — and `virtual-scroll` and the table itself need the real one.
  afterEach(() => {
    window.ResizeObserver = realResizeObserver;
  });

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
      expect(tableInstance['_breakpointColumns']()).toBe(2);
    });

    it('should resolve tablet/3 columns between 704 and 992', () => {
      createComponent(ResponsiveContainerModeComponent);
      simulateResize(800);
      expect(tableInstance.viewType).toBe('tablet');
      expect(tableInstance['_breakpointColumns']()).toBe(3);
    });

    it('should resolve desktop/3 columns at 992 and above', () => {
      createComponent(ResponsiveContainerModeComponent);
      simulateResize(1100);
      expect(tableInstance.viewType).toBe('desktop');
      expect(tableInstance['_breakpointColumns']()).toBe(3);
    });

    it('should resolve mobile/1 column below 320px', () => {
      createComponent(ResponsiveContainerModeComponent);
      simulateResize(200);
      expect(tableInstance.viewType).toBe('mobile');
      expect(tableInstance['_breakpointColumns']()).toBe(1);
    });
  });

  describe('custom responsiveBreakpoints', () => {
    it('should use custom breakpoints', () => {
      createComponent(ResponsiveCustomBreakpointsComponent);
      simulateResize(400);
      expect(tableInstance['_breakpointColumns']()).toBe(2);
    });

    it('should inherit fields from previous entries', () => {
      createComponent(ResponsiveCustomBreakpointsComponent);
      // breakpoints: 0:{mobile,2}, 500:{columns:3}, 700:{tablet}
      simulateResize(550);
      expect(tableInstance.viewType).toBe('mobile'); // inherited from 0
      expect(tableInstance['_breakpointColumns']()).toBe(3); // from 500
    });

    it('should inherit columns from earlier entry when only viewType changes', () => {
      createComponent(ResponsiveCustomBreakpointsComponent);
      // At 750: viewType='tablet' from 700, columns=3 inherited from 500
      simulateResize(750);
      expect(tableInstance.viewType).toBe('tablet');
      expect(tableInstance['_breakpointColumns']()).toBe(3);
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
      expect(tableInstance['_breakpointColumns']()).toBe(2);
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
      expect(tableInstance['_breakpointColumns']()).toBe(3);
    });
  });

  describe('A1 mobile to tablet override', () => {
    it('should promote mobile to tablet when A1 is enabled', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [NxComparisonTableModule, ResponsiveA1Component],
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
      expect(tableInstance['_breakpointColumns']()).toBe(4);
      flush();
    }));
  });

  describe('lifecycle', () => {
    it('should disconnect ResizeObserver on destroy', () => {
      createComponent(ResponsiveContainerModeComponent);
      fixture.destroy();
      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should not touch window outside a browser', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
      });
      const addListener = vi.spyOn(window, 'addEventListener');
      const removeListener = vi.spyOn(window, 'removeEventListener');

      createComponent(ResponsiveContainerModeComponent);
      fixture.destroy();

      expect(addListener).not.toHaveBeenCalledWith('scroll', expect.anything(), {
        capture: true,
        passive: true,
      });
      expect(removeListener).not.toHaveBeenCalledWith('scroll', expect.anything(), {
        capture: true,
      });
    });
  });
});

@Directive({ standalone: true })
abstract class ResponsiveTableTest {
  @ViewChild(NxComparisonTableComponent)
  tableInstance!: NxComparisonTableComponent;
}

@Component({
  selector: 'test-responsive-default-component',
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
  selector: 'test-responsive-custom-breakpoints-component',
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
  selector: 'test-responsive-container-mode-component',
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
  selector: 'test-responsive-with-view-override-component',
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
  selector: 'test-responsive-a1-component',
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
  providers: A1_PROVIDERS,
})
class ResponsiveA1Component extends ResponsiveTableTest {}

@Component({
  selector: 'test-column-state-component',
  template: `
    <nx-comparison-table view="desktop" [hiddenIndexes]="hiddenIndexes">
      <ng-container nxComparisonTableRow type="header">
        @for (product of products; track product.name) {
          <nx-comparison-table-cell type="header" [disabledColumn]="product.disabled">
            {{ product.name }}
          </nx-comparison-table-cell>
        }
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Feature</nx-comparison-table-description-cell>
        @for (product of products; track product.name) {
          <nx-comparison-table-cell>{{ product.name }}</nx-comparison-table-cell>
        }
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ColumnStateComponent {
  @ViewChild(NxComparisonTableComponent) table!: NxComparisonTableComponent;
  @ViewChildren(NxComparisonTableRowDirective) rows!: QueryList<NxComparisonTableRowDirective>;
  hiddenIndexes: number[] = [];
  products = ['P1', 'P2', 'P3', 'P4', 'P5'].map((name) => ({ name, disabled: false }));
}

@Component({
  selector: 'test-static-disabled-column-component',
  template: `
    <nx-comparison-table view="desktop">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell disabledColumn type="header">P2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Feature</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class StaticDisabledColumnComponent {
  @ViewChild(NxComparisonTableComponent) table!: NxComparisonTableComponent;
}

@Component({
  selector: 'test-intl-component',
  template: `
    <nx-comparison-table
      view="desktop"
      [responsiveBreakpoints]="breakpoints"
      (viewTypeChange)="viewTypes.push($event)"
    >
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P3</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Feature</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
        <nx-comparison-table-cell>C</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxComparisonTableModule],
  providers: A1_PROVIDERS,
})
class IntlComponent {
  breakpoints: NxComparisonTableBreakpoint[] = [{ minWidth: 0, columns: 1 }];
  viewTypes: string[] = [];
}

describe('NxComparisonTableComponent column state', () => {
  async function create<T>(component: Type<T>): Promise<ComponentFixture<T>> {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  function headerCells(fixture: ComponentFixture<ColumnStateComponent>) {
    return fixture.componentInstance.rows.first.cells();
  }

  function renderedHeaderCells(fixture: ComponentFixture<unknown>): HTMLElement[] {
    return fixture.debugElement
      .queryAll(By.css('th.nx-comparison-table__header-cell'))
      .map((cell) => cell.nativeElement);
  }

  async function hide(fixture: ComponentFixture<ColumnStateComponent>, indexes: number[]) {
    fixture.componentInstance.hiddenIndexes = indexes;
    fixture.detectChanges();
    await fixture.whenStable();
  }

  describe('first/last of the visible columns', () => {
    it('marks the last visible column when a middle column is hidden', async () => {
      const fixture = await create(ColumnStateComponent);
      await hide(fixture, [1]);

      const cells = headerCells(fixture);
      expect(cells.map((cell) => cell._isFirst())).toEqual([true, false, false, false, false]);
      expect(cells.map((cell) => cell._isLast())).toEqual([false, false, false, false, true]);

      const rendered = renderedHeaderCells(fixture);
      expect(rendered).toHaveLength(4);
      expect(rendered[0]).toHaveClass('first');
      expect(rendered[2]).not.toHaveClass('last');
      expect(rendered[3]).toHaveClass('last');
    });

    it('marks the first visible column when the first column is hidden', async () => {
      const fixture = await create(ColumnStateComponent);
      await hide(fixture, [0]);

      const cells = headerCells(fixture);
      expect(cells.map((cell) => cell._isFirst())).toEqual([false, true, false, false, false]);
      expect(cells.map((cell) => cell._isLast())).toEqual([false, false, false, false, true]);
      expect(renderedHeaderCells(fixture)[0]).toHaveClass('first');
    });

    it('never marks a hidden column as first or last', async () => {
      const fixture = await create(ColumnStateComponent);
      await hide(fixture, [0, 4]);

      const cells = headerCells(fixture);
      expect(cells.map((cell) => cell._isFirst())).toEqual([false, true, false, false, false]);
      expect(cells.map((cell) => cell._isLast())).toEqual([false, false, false, true, false]);
    });
  });

  describe('invalid hidden indexes', () => {
    it('counts a duplicated hidden index once', async () => {
      const fixture = await create(ColumnStateComponent);
      await hide(fixture, [1, 1]);

      expect(fixture.componentInstance.table._infoColumnCount()).toBe(4);
      expect(
        fixture.debugElement.queryAll(By.css('col.nx-comparison-table__col-product')),
      ).toHaveLength(4);
      const cells = headerCells(fixture);
      expect(cells.map((cell) => cell._visiblePosition())).toEqual([0, 1, 1, 2, 3]);
      expect(cells[4]._isLast()).toBe(true);
    });

    it('ignores hidden indexes that match no column', async () => {
      const fixture = await create(ColumnStateComponent);
      await hide(fixture, [-1, 1, 5, 7]);

      expect(fixture.componentInstance.table._infoColumnCount()).toBe(4);
      expect(renderedHeaderCells(fixture)).toHaveLength(4);
      expect(headerCells(fixture)[4]._isLast()).toBe(true);
      // the public getter still reflects what was set
      expect(fixture.componentInstance.table.hiddenIndexes).toEqual([-1, 1, 5, 7]);
    });
  });

  describe('disabled columns', () => {
    it('disables a column whose disabledColumn attribute precedes type="header"', async () => {
      const fixture = await create(StaticDisabledColumnComponent);
      const table = fixture.componentInstance.table;

      expect([...table._disabledIndexes()]).toEqual([1]);
      expect(table._headerCells()[1].disabledColumn).toBe(true);
      const contentCells = fixture.debugElement
        .queryAll(By.css('tbody td.nx-comparison-table__cell'))
        .map((cell) => cell.nativeElement);
      expect(contentCells[0]).not.toHaveClass('is-disabled');
      expect(contentCells[1]).toHaveClass('is-disabled');
    });

    it('keeps the disabled state on its column when columns are reordered', async () => {
      const fixture = await create(ColumnStateComponent);
      const host = fixture.componentInstance;
      host.products[1].disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();
      expect([...host.table._disabledIndexes()]).toEqual([1]);

      host.products = [{ name: 'P0', disabled: false }, ...host.products];
      fixture.detectChanges();
      await fixture.whenStable();
      expect([...host.table._disabledIndexes()]).toEqual([2]);
      expect(renderedHeaderCells(fixture)[2]).toHaveClass('is-disabled');
      expect(renderedHeaderCells(fixture)[1]).not.toHaveClass('is-disabled');
    });
  });

  describe('intl and outputs', () => {
    it('re-renders the nav button labels when the intl emits changes', async () => {
      const fixture = await create(IntlComponent);
      const nextButton = () =>
        fixture.debugElement.query(By.css('.nx-comparison-table__nav-button--next')).nativeElement;
      expect(nextButton().getAttribute('aria-label')).toBe('Next products');

      // let the post-render measurements settle so the table is no longer dirty on its own
      await new Promise((resolve) => requestAnimationFrame(resolve));
      fixture.detectChanges();
      await fixture.whenStable();
      const intl = TestBed.inject(NxComparisonTableIntl);
      intl.nextAriaLabel = 'Nächste Produkte';
      fixture.detectChanges();
      expect(nextButton().getAttribute('aria-label')).toBe('Next products');
      intl.changes.next();
      fixture.detectChanges();

      expect(nextButton().getAttribute('aria-label')).toBe('Nächste Produkte');
    });

    it('exposes viewTypeChange as a template output', async () => {
      const fixture = await create(IntlComponent);
      const table = fixture.debugElement.query(By.directive(NxComparisonTableComponent))
        .componentInstance as NxComparisonTableComponent;

      table.view = 'tablet';
      fixture.componentRef.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.viewTypes).toEqual(['tablet']);
    });
  });
});

@Component({
  selector: 'test-direction-table',
  template: `
    <nx-comparison-table [view]="view" [responsiveBreakpoints]="breakpoints" style="width: 600px;">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-popular-cell forColumn="2">Popular</nx-comparison-table-popular-cell>
        @for (n of columns; track n) {
          <nx-comparison-table-cell type="header">Product {{ n }}</nx-comparison-table-cell>
        }
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Feature</nx-comparison-table-description-cell>
        @for (n of columns; track n) {
          <nx-comparison-table-cell>{{ n }}</nx-comparison-table-cell>
        }
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header
          >Section</nx-comparison-table-toggle-section-header
        >
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Nested</nx-comparison-table-description-cell>
          @for (n of columns; track n) {
            <nx-comparison-table-cell>{{ n }}</nx-comparison-table-cell>
          }
        </ng-container>
      </ng-container>
    </nx-comparison-table>
  `,
  // Non-zero A1-like geometry tokens, so every clip term (shadow, peek, gap) is observable.
  styles: `
    :host {
      display: block;
      --comparison-table-column-shadow-space: 8px;
      --comparison-table-overflow-peek: 24px;
      --comparison-table-row-gap: 16px;
      --comparison-table-toggle-section-header-padding: 1px 2px 3px 4px;
      --comparison-table-toggle-section-header-padding-rtl: 1px 4px 3px 2px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class DirectionTableComponent {
  @ViewChild(NxComparisonTableComponent) table!: NxComparisonTableComponent;
  @Input() view: 'desktop' | 'mobile' = 'desktop';
  @Input() breakpoints: NxComparisonTableBreakpoint[] = [];
  columns = [1, 2, 3, 4, 5];
}

@Directive({ standalone: true })
abstract class DirectionTableTest {
  @ViewChild(DirectionTableComponent) inner!: DirectionTableComponent;
  get table(): NxComparisonTableComponent {
    return this.inner.table;
  }
  dir: 'ltr' | 'rtl' = 'ltr';
  view: 'desktop' | 'mobile' = 'desktop';
  breakpoints: NxComparisonTableBreakpoint[] = [{ minWidth: 0, columns: 2 }];
}

@Component({
  selector: 'test-bidi-dir-a1',
  template: `<div [dir]="dir">
    <test-direction-table [view]="view" [breakpoints]="breakpoints" />
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DirectionTableComponent, BidiModule],
  providers: A1_PROVIDERS,
})
class BidiDirA1Component extends DirectionTableTest {}

@Component({
  selector: 'test-plain-dir-a1',
  template: `<div [attr.dir]="dir">
    <test-direction-table [view]="view" [breakpoints]="breakpoints" />
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DirectionTableComponent],
  providers: A1_PROVIDERS,
})
class PlainDirA1Component extends DirectionTableTest {}

@Component({
  selector: 'test-bidi-dir',
  template: `<div [dir]="dir">
    <test-direction-table [view]="view" [breakpoints]="breakpoints" />
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DirectionTableComponent, BidiModule],
})
class BidiDirComponent extends DirectionTableTest {}

@Component({
  selector: 'test-plain-dir',
  template: `<div [attr.dir]="dir">
    <test-direction-table [view]="view" [breakpoints]="breakpoints" />
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DirectionTableComponent],
})
class PlainDirComponent extends DirectionTableTest {}

class FakeDirectionality {
  readonly valueSignal = signal<Direction>('ltr');
  get value(): Direction {
    return this.valueSignal();
  }
  readonly change = new EventEmitter<Direction>();
}

/** The direction comes only from DI; nothing in the DOM sets `dir`. */
@Component({
  selector: 'test-di-dir-a1',
  template: `<test-direction-table [view]="view" [breakpoints]="breakpoints" />`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DirectionTableComponent],
  providers: [...A1_PROVIDERS, { provide: Directionality, useClass: FakeDirectionality }],
})
class DiDirA1Component extends DirectionTableTest {
  readonly directionality = inject(Directionality) as unknown as FakeDirectionality;
}

describe('NxComparisonTableComponent direction', () => {
  async function settle(fixture: ComponentFixture<unknown>): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    fixture.detectChanges();
    await fixture.whenStable();
  }

  async function create<T extends DirectionTableTest>(
    component: Type<T>,
    dir: 'ltr' | 'rtl',
    view: 'desktop' | 'mobile' = 'desktop',
  ): Promise<ComponentFixture<T>> {
    const fixture = TestBed.createComponent(component);
    fixture.componentInstance.dir = dir;
    fixture.componentInstance.view = view;
    await settle(fixture);
    return fixture;
  }

  function host(fixture: ComponentFixture<DirectionTableTest>): HTMLElement {
    return fixture.debugElement.query(By.css('nx-comparison-table')).nativeElement;
  }

  /** Splits an `inset()` into its four physical sides [top, right, bottom, left]. */
  function insetSides(clipPath: string): string[] {
    const body = /^inset\((.*)\)$/.exec(clipPath)?.[1];
    expect(body).toBeTruthy();
    const parts: string[] = [];
    let depth = 0;
    let current = '';
    for (const ch of body!) {
      depth += ch === '(' ? 1 : ch === ')' ? -1 : 0;
      if (ch === ' ' && depth === 0) {
        if (current) parts.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    parts.push(current);
    const [top, right = top, bottom = top, left = right] = parts;
    return [top, right, bottom, left];
  }

  /** Computed clip-paths of one representative of every clipped cell kind. */
  function clipPaths(fixture: ComponentFixture<DirectionTableTest>): { [kind: string]: string } {
    const el = host(fixture);
    const clip = (selector: string) => getComputedStyle(el.querySelector(selector)!).clipPath;
    if (fixture.componentInstance.view === 'mobile') {
      return {
        description: clip('.nx-comparison-table__description-cell'),
        toggleHeader: clip('.nx-comparison-table__mobile-toggle-section-header'),
      };
    }
    return {
      headerInPeekZone: clip('.is-header-row [data-ct-col="0"]'),
      headerVisible: clip('.is-header-row [data-ct-col="2"]'),
      body: clip('tbody [data-ct-col="0"]'),
      popular: clip('.nx-comparison-table__popular-cell'),
    };
  }

  /** The carousel's resting translation of the product columns. */
  function shiftPx(fixture: ComponentFixture<DirectionTableTest>): number {
    finishTransitions();
    const cell = host(fixture).querySelector('.is-header-row .nx-comparison-table__product-cell')!;
    return new DOMMatrixReadOnly(getComputedStyle(cell).transform).m41;
  }

  /** `[top, right, bottom, left]` of every clip, with the inline sides swapped in RTL. */
  function logicalClips(fixture: ComponentFixture<DirectionTableTest>) {
    const rtl = fixture.componentInstance.dir === 'rtl';
    return Object.fromEntries(
      Object.entries(clipPaths(fixture)).map(([kind, clipPath]) => {
        const [top, right, bottom, left] = insetSides(clipPath);
        return [kind, rtl ? [top, left, bottom, right] : [top, right, bottom, left]];
      }),
    );
  }

  async function desktopAtPage1(component: Type<DirectionTableTest>, dir: 'ltr' | 'rtl') {
    const fixture = await create(component, dir);
    fixture.componentInstance.table.scrollNext();
    await settle(fixture);
    return fixture;
  }

  it('lays out RTL from a plain dir attribute on an ancestor (no BidiModule)', async () => {
    const fixture = await desktopAtPage1(PlainDirA1Component, 'rtl');
    const el = host(fixture);

    expect(el.hasAttribute('dir')).toBe(false);
    expect(getComputedStyle(el).direction).toBe('rtl');
    expect(shiftPx(fixture)).toBeGreaterThan(0);
    const content = el.querySelector<HTMLElement>(
      '.nx-comparison-table-toggle-section__header-content',
    )!;
    expect(getComputedStyle(content).padding).toBe('1px 4px 3px 2px');
  });

  it('shifts the carousel toward the inline start in LTR', async () => {
    const fixture = await desktopAtPage1(PlainDirA1Component, 'ltr');
    expect(shiftPx(fixture)).toBeLessThan(0);
  });

  for (const [name, component] of [
    ['BidiModule', BidiDirA1Component],
    ['plain dir attribute', PlainDirA1Component],
  ] as const) {
    it(`mirrors the desktop cell clips in RTL (${name})`, async () => {
      const ltr = logicalClips(await desktopAtPage1(component, 'ltr'));
      const rtl = logicalClips(await desktopAtPage1(component, 'rtl'));

      expect(rtl).toEqual(ltr);
      // Representative values: the column under the sticky column is clipped on its inline start
      // (less the header peek), visible columns are not, and the popular cell keeps no bottom bleed.
      expect(parseFloat(ltr['body'][3].split(', ')[1])).toBeGreaterThan(0);
      expect(parseFloat(ltr['headerVisible'][3].split(', ')[1])).toBeLessThan(0);
      expect(ltr['popular'][2]).toBe('0px');
      expect(ltr['body'][2]).toBe('-8px');
    });
  }

  it('applies the header peek to the header band only', async () => {
    const fixture = await desktopAtPage1(PlainDirA1Component, 'ltr');
    const clips = logicalClips(fixture);
    const inlineStart = (kind: string) => parseFloat(clips[kind][3].split(', ')[1]);

    expect(inlineStart('body') - inlineStart('headerInPeekZone')).toBe(24);
  });

  it('mirrors the nav button positions in RTL', async () => {
    /** Distance of each nav button's centre from the host's inline start. */
    const navCentres = async (dir: 'ltr' | 'rtl') => {
      const el = host(await desktopAtPage1(PlainDirA1Component, dir));
      const hostRect = el.getBoundingClientRect();
      return ['prev', 'next'].map((kind) => {
        const r = el
          .querySelector(`.nx-comparison-table__nav-button--${kind}`)!
          .getBoundingClientRect();
        const centre = r.left + r.width / 2;
        return dir === 'rtl' ? hostRect.right - centre : centre - hostRect.left;
      });
    };
    const ltr = await navCentres('ltr');
    const rtl = await navCentres('rtl');

    expect(rtl[0]).toBeCloseTo(ltr[0], 0);
    expect(rtl[1]).toBeCloseTo(ltr[1], 0);
  });

  describe('swipe paging in RTL', () => {
    const pointer = (type: string, x: number) =>
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        pointerId: 1,
        isPrimary: true,
        pointerType: 'touch',
        clientX: x,
        clientY: 300,
      });

    async function swipe(fixture: ComponentFixture<DirectionTableTest>, dx: number) {
      const target = host(fixture).querySelector<HTMLElement>('tbody [data-ct-col="1"]')!;
      target.dispatchEvent(pointer('pointerdown', 500));
      target.dispatchEvent(pointer('pointermove', 500 + dx / 2));
      target.dispatchEvent(pointer('pointermove', 500 + dx));
      target.dispatchEvent(pointer('pointerup', 500 + dx));
      await settle(fixture);
    }

    function columnStep(fixture: ComponentFixture<DirectionTableTest>): number {
      const header = (col: number) =>
        host(fixture)
          .querySelector(`.is-header-row [data-ct-col="${col}"]`)!
          .getBoundingClientRect();
      return Math.abs(header(1).left - header(0).left);
    }

    it('pages forward on a swipe toward the inline end', async () => {
      const fixture = await create(PlainDirA1Component, 'rtl');

      await swipe(fixture, columnStep(fixture) + 20);

      expect((fixture.componentInstance.table as any)._pageIndex()).toBe(1);
    });

    it('stays on the first page on a swipe toward the inline start', async () => {
      const fixture = await create(PlainDirA1Component, 'rtl');

      await swipe(fixture, -(columnStep(fixture) + 20));

      expect((fixture.componentInstance.table as any)._pageIndex()).toBe(0);
    });
  });

  for (const [name, component] of [
    ['BidiModule', BidiDirComponent],
    ['plain dir attribute', PlainDirComponent],
  ] as const) {
    it(`mirrors the mobile sticky-column clip in RTL (${name})`, async () => {
      const clipsAt = async (dir: 'ltr' | 'rtl') => {
        const fixture = await create(component, dir, 'mobile');
        const el = host(fixture);
        el.style.width = '300px';
        el.style.overflowX = 'scroll';
        await settle(fixture);
        el.scrollLeft = dir === 'rtl' ? -60 : 60;
        window.dispatchEvent(new Event('scroll'));
        await settle(fixture);
        return logicalClips(fixture);
      };
      const ltr = await clipsAt('ltr');

      expect(await clipsAt('rtl')).toEqual(ltr);
      expect(ltr['description'].slice(0, 3)).toEqual(['0px', '0px', '0px']);
      expect(parseFloat(ltr['description'][3].split(', ')[1])).toBeGreaterThan(0);
    });
  }

  describe('Directionality from DI only', () => {
    async function diAtPage1(dir: Direction): Promise<ComponentFixture<DiDirA1Component>> {
      const fixture = TestBed.createComponent(DiDirA1Component);
      fixture.componentInstance.directionality.valueSignal.set(dir);
      fixture.componentInstance.dir = dir;
      await settle(fixture);
      fixture.componentInstance.table.scrollNext();
      await settle(fixture);
      return fixture;
    }

    it('lays the table out RTL', async () => {
      const fixture = await diAtPage1('rtl');
      const el = host(fixture);

      expect(el.getAttribute('dir')).toBe('rtl');
      expect(getComputedStyle(el).direction).toBe('rtl');
      expect(shiftPx(fixture)).toBeGreaterThan(0);
    });

    it('sets no dir attribute for LTR', async () => {
      const fixture = await diAtPage1('ltr');

      expect(host(fixture).hasAttribute('dir')).toBe(false);
      expect(shiftPx(fixture)).toBeLessThan(0);
    });

    it('follows a change', async () => {
      const fixture = await diAtPage1('ltr');
      const directionality = fixture.componentInstance.directionality;

      directionality.valueSignal.set('rtl');
      directionality.change.emit('rtl');
      await settle(fixture);

      expect(host(fixture).getAttribute('dir')).toBe('rtl');
      expect(shiftPx(fixture)).toBeGreaterThan(0);
    });
  });

  it('follows a CDK direction change', async () => {
    const fixture = await desktopAtPage1(BidiDirA1Component, 'ltr');
    expect(shiftPx(fixture)).toBeLessThan(0);

    fixture.componentInstance.dir = 'rtl';
    await settle(fixture);

    expect(shiftPx(fixture)).toBeGreaterThan(0);
  });

  describe('pan listeners', () => {
    const PAN_EVENTS = ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'];

    function panListenerCalls(spy: Mock, fixture: ComponentFixture<DirectionTableTest>) {
      const el = host(fixture);
      return spy.mock.calls
        .filter((call, i) => {
          const target = spy.mock.contexts[i];
          return target instanceof Node && el.contains(target) && PAN_EVENTS.includes(call[0]);
        })
        .map((call) => [call[0], call[2]]);
    }

    function overflowing(fixture: ComponentFixture<DirectionTableTest>, value: boolean) {
      fixture.componentInstance.breakpoints = [{ minWidth: 0, columns: value ? 2 : 5 }];
    }

    it('attaches passive pointer listeners only while the carousel overflows', async () => {
      const add = vi.spyOn(EventTarget.prototype, 'addEventListener');
      const remove = vi.spyOn(EventTarget.prototype, 'removeEventListener');
      const fixture = TestBed.createComponent(PlainDirA1Component);
      overflowing(fixture, false);
      await settle(fixture);
      expect(fixture.componentInstance.table._isOverflowing()).toBe(false);
      expect(panListenerCalls(add, fixture)).toEqual([]);
      const native = host(fixture).querySelector<HTMLElement>('.nx-comparison-table__native')!;
      expect(getComputedStyle(native).touchAction).toBe('auto');

      overflowing(fixture, true);
      await settle(fixture);
      expect(panListenerCalls(add, fixture)).toEqual(
        PAN_EVENTS.map((type) => [type, { passive: true }]),
      );

      overflowing(fixture, false);
      await settle(fixture);
      expect(panListenerCalls(remove, fixture).map(([type]) => type)).toEqual(PAN_EVENTS);
    });

    it('removes the pointer listeners on destroy', async () => {
      const remove = vi.spyOn(EventTarget.prototype, 'removeEventListener');
      const fixture = await create(PlainDirA1Component, 'ltr');
      expect(fixture.componentInstance.table._isOverflowing()).toBe(true);
      const native = host(fixture).querySelector<HTMLElement>('.nx-comparison-table__native')!;

      fixture.destroy();

      const removed = remove.mock.calls
        .filter((_, i) => remove.mock.contexts[i] === native)
        .map(([type]) => type);
      expect(removed).toEqual(expect.arrayContaining(PAN_EVENTS));
    });
  });
});

@Component({
  selector: 'test-carousel-geometry',
  template: `
    <nx-comparison-table
      responsiveMode="container"
      [responsiveBreakpoints]="breakpoints"
      [hiddenIndexes]="hidden"
      [style.width.px]="width"
      [class.a1-geometry]="a1Geometry"
    >
      <ng-container nxComparisonTableRow type="header">
        @for (n of columns; track n) {
          <nx-comparison-table-cell type="header">Product {{ n }}</nx-comparison-table-cell>
        }
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Feature</nx-comparison-table-description-cell>
        @for (n of columns; track n) {
          <nx-comparison-table-cell
            ><button type="button">{{ n }}</button></nx-comparison-table-cell
          >
        }
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header
          >Section</nx-comparison-table-toggle-section-header
        >
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Nested</nx-comparison-table-description-cell>
          @for (n of columns; track n) {
            <nx-comparison-table-cell>{{ n }}</nx-comparison-table-cell>
          }
        </ng-container>
      </ng-container>
    </nx-comparison-table>
  `,
  // A1-like geometry tokens, so the gap, peek and shadow terms are observable.
  styles: `
    .a1-geometry {
      --comparison-table-column-shadow-space: 16px;
      --comparison-table-overflow-peek: 24px;
      --comparison-table-row-gap: 24px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
  providers: A1_PROVIDERS,
})
class CarouselGeometryComponent {
  @ViewChild(NxComparisonTableComponent) table!: NxComparisonTableComponent;
  width = 600;
  breakpoints: NxComparisonTableBreakpoint[] = [{ minWidth: 0, viewType: 'desktop', columns: 2 }];
  a1Geometry = true;
  columns = [1, 2, 3, 4, 5];
  hidden: number[] = [];
}

describe('NxComparisonTableComponent carousel geometry', () => {
  async function settle(fixture: ComponentFixture<unknown>): Promise<void> {
    for (let i = 0; i < 2; i++) {
      fixture.detectChanges();
      await fixture.whenStable();
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    fixture.detectChanges();
    await fixture.whenStable();
  }

  async function create(
    init: Partial<CarouselGeometryComponent> = {},
  ): Promise<ComponentFixture<CarouselGeometryComponent>> {
    const fixture = TestBed.createComponent(CarouselGeometryComponent);
    Object.assign(fixture.componentInstance, init);
    await settle(fixture);
    return fixture;
  }

  function host(fixture: ComponentFixture<CarouselGeometryComponent>): HTMLElement {
    return fixture.nativeElement.querySelector('nx-comparison-table');
  }

  function rect(fixture: ComponentFixture<CarouselGeometryComponent>, selector: string): DOMRect {
    return host(fixture).querySelector(selector)!.getBoundingClientRect();
  }

  const header = (col: number) => `.is-header-row [data-ct-col="${col}"]`;

  async function pageToEnd(fixture: ComponentFixture<CarouselGeometryComponent>): Promise<void> {
    for (let i = 0; i < 10; i++) {
      fixture.componentInstance.table.scrollNext();
    }
    await settle(fixture);
    finishTransitions();
  }

  for (const a1Geometry of [false, true]) {
    it(`pages every column fully into view when the minimum column width limits the fit (${a1Geometry ? 'A1' : 'base'} tokens)`, async () => {
      const fixture = await create({
        width: 400,
        breakpoints: [{ minWidth: 0, viewType: 'tablet', columns: 3 }],
        a1Geometry,
      });
      const table = fixture.componentInstance.table as any;
      expect(table.viewType).toBe('tablet');
      // Three columns of at least 160px do not fit 400px; two do.
      expect(table._visibleColumnCount()).toBe(2);
      expect(table._maxPageIndex()).toBe(3);
      const native = host(fixture).querySelector<HTMLElement>('.nx-comparison-table__native')!;
      expect(native.style.getPropertyValue('--ct-cols-shown')).toBe('2');

      await pageToEnd(fixture);

      expect(table._pageIndex()).toBe(3);
      const hostRect = host(fixture).getBoundingClientRect();
      expect(rect(fixture, header(3)).left).toBeGreaterThanOrEqual(hostRect.left - 0.5);
      expect(rect(fixture, header(4)).right).toBeLessThanOrEqual(hostRect.right + 0.5);
    });
  }

  for (const a1Geometry of [false, true]) {
    it(`reserves a slot for the description column when the minimum column width limits the desktop fit (${a1Geometry ? 'A1' : 'base'} tokens)`, async () => {
      const fixture = await create({
        width: 600,
        breakpoints: [{ minWidth: 0, viewType: 'desktop', columns: 3 }],
        a1Geometry,
      });
      const table = fixture.componentInstance.table as any;
      expect(table.viewType).toBe('desktop');
      // Four slots of at least 160px fit 600px; one of them is the description column.
      expect(table._visibleColumnCount()).toBe(2);
      expect(table._maxPageIndex()).toBe(3);
      const native = host(fixture).querySelector<HTMLElement>('.nx-comparison-table__native')!;
      expect(native.style.getPropertyValue('--ct-cols-shown')).toBe('3');
      expect(rect(fixture, header(0)).width).toBeGreaterThanOrEqual(160 - 0.5);

      await pageToEnd(fixture);

      expect(table._pageIndex()).toBe(3);
      const description = rect(fixture, 'tbody .nx-comparison-table__description-cell');
      expect(rect(fixture, header(3)).left).toBeGreaterThanOrEqual(description.right - 0.5);
      expect(rect(fixture, header(4)).right).toBeLessThanOrEqual(
        host(fixture).getBoundingClientRect().right + 0.5,
      );
    });
  }

  it('fades and focus-pages by the columns that fit', async () => {
    const fixture = await create({
      width: 400,
      breakpoints: [{ minWidth: 0, viewType: 'tablet', columns: 3 }],
    });
    const table = fixture.componentInstance.table as any;
    const bodyCell = (col: number) => host(fixture).querySelector(`tbody [data-ct-col="${col}"]`)!;
    expect(bodyCell(1)).not.toHaveClass('is-faded');
    expect(bodyCell(2)).toHaveClass('is-faded');

    bodyCell(4)
      .querySelector('button')!
      .dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await settle(fixture);

    expect(table._pageIndex()).toBe(3);
  });

  it('keeps the breakpoint column count while the columns fit', async () => {
    const fixture = await create({
      width: 600,
      breakpoints: [{ minWidth: 0, viewType: 'tablet', columns: 3 }],
      a1Geometry: false,
    });
    expect((fixture.componentInstance.table as any)._visibleColumnCount()).toBe(3);
  });

  it('does not replay the carousel slide on a resize', async () => {
    const fixture = await create();
    fixture.componentInstance.table.scrollNext();
    await settle(fixture);
    finishTransitions();
    const firstVisible = () => rect(fixture, header(1)).left;
    const before = firstVisible();

    host(fixture).style.height = '2000px';
    await settle(fixture);
    expect(carouselGlides()).toEqual([]);
    expect(firstVisible()).toBe(before);

    fixture.componentInstance.width = 700;
    await settle(fixture);
    expect(carouselGlides()).toEqual([]);
    const descriptionEnd = rect(fixture, 'tbody .nx-comparison-table__description-cell').right;
    expect(firstVisible()).toBeCloseTo(descriptionEnd + 24, 0);
  });

  it('lands a glide that a resize interrupts on the resting position for the new width', async () => {
    const fixture = await create();
    fixture.componentInstance.table.scrollNext();
    fixture.detectChanges();
    fixture.componentInstance.width = 700;
    await settle(fixture);
    finishTransitions();

    const descriptionEnd = rect(fixture, 'tbody .nx-comparison-table__description-cell').right;
    expect(rect(fixture, header(1)).left).toBeCloseTo(descriptionEnd + 24, 0);
  });

  describe('a page clamped by a layout or column change', () => {
    const lastHeader = '.is-header-row .nx-comparison-table__product-cell:last-child';

    async function atLastPage(breakpoints: NxComparisonTableBreakpoint[]) {
      const fixture = await create({ breakpoints });
      await pageToEnd(fixture);
      expect(fixture.componentInstance.table._pageIndex()).toBe(3);
      return fixture;
    }

    it('snaps when a wider host fits more columns', async () => {
      const fixture = await atLastPage([
        { minWidth: 0, viewType: 'desktop', columns: 2 },
        { minWidth: 800, columns: 3 },
      ]);
      fixture.componentInstance.width = 900;
      await settle(fixture);

      expect(fixture.componentInstance.table._pageIndex()).toBe(2);
      expect(carouselGlides()).toEqual([]);
      expect(rect(fixture, lastHeader).right).toBeCloseTo(
        host(fixture).getBoundingClientRect().right,
        0,
      );
    });

    it('snaps when the overflow ends', async () => {
      const fixture = await atLastPage([
        { minWidth: 0, viewType: 'desktop', columns: 2 },
        { minWidth: 800, columns: 5 },
      ]);
      fixture.componentInstance.width = 900;
      await settle(fixture);

      expect(fixture.componentInstance.table._pageIndex()).toBe(0);
      expect(carouselGlides()).toEqual([]);
      expect(rect(fixture, lastHeader).right).toBeCloseTo(
        host(fixture).getBoundingClientRect().right,
        0,
      );
    });

    it('snaps when a column is hidden', async () => {
      const fixture = await atLastPage([{ minWidth: 0, viewType: 'desktop', columns: 2 }]);
      fixture.componentInstance.hidden = [0];
      await settle(fixture);

      expect(fixture.componentInstance.table._pageIndex()).toBe(2);
      expect(carouselGlides()).toEqual([]);
      expect(rect(fixture, lastHeader).right).toBeCloseTo(
        host(fixture).getBoundingClientRect().right,
        0,
      );
    });

    it('still glides when the user pages', async () => {
      const fixture = await create();
      fixture.componentInstance.table.scrollNext();
      await settle(fixture);
      expect(carouselGlides().length).toBeGreaterThan(0);
      finishTransitions();
    });
  });

  it('ends the spanning banners flush with the last fully visible column', async () => {
    const fixture = await create();
    const banner = () =>
      rect(
        fixture,
        '.nx-comparison-table__toggle-section-header-cell .nx-comparison-table__sticky-banner',
      );
    const end = banner().right;
    expect(end).toBeCloseTo(rect(fixture, header(1)).right, 0);
    expect(end).toBeCloseTo(host(fixture).getBoundingClientRect().right, 0);

    fixture.componentInstance.table.scrollNext();
    await settle(fixture);
    finishTransitions();

    expect(banner().right).toBe(end);
    expect(rect(fixture, header(2)).right).toBeCloseTo(end, 0);
  });

  it('writes the vertical clip on the tbody without letting it inherit', async () => {
    const fixture = await create();
    const tbody = host(fixture).querySelector<HTMLElement>('tbody')!;
    const native = host(fixture).querySelector<HTMLElement>('.nx-comparison-table__native')!;

    // At rest the clip leaves the shadow room above the first row.
    expect(tbody.style.getPropertyValue('--ct-clip-top')).toBe('-16px');
    expect(native.style.getPropertyValue('--ct-clip-top')).toBe('');
    const cell = tbody.querySelector('.nx-comparison-table__cell')!;
    expect(getComputedStyle(cell).getPropertyValue('--ct-clip-top')).toBe('0px');
  });

  it('hands the cells the column geometry in px, not as container units', async () => {
    const fixture = await create();
    const cell = host(fixture).querySelector(header(0))!;
    const colWidth = getComputedStyle(cell).getPropertyValue('--ct-col-w');
    const step = getComputedStyle(cell).getPropertyValue('--ct-step');

    expect(colWidth).toMatch(/^\d+(\.\d+)?px$/);
    expect(parseFloat(step)).toBeCloseTo(parseFloat(colWidth) + 24, 3);
    expect(parseFloat(colWidth)).toBeCloseTo(cell.getBoundingClientRect().width, 0);
  });

  it('keeps the page on the product cells, out of their content', async () => {
    const fixture = await create();
    fixture.componentInstance.table.scrollNext();
    await settle(fixture);
    finishTransitions();
    const cell = host(fixture).querySelector('tbody .nx-comparison-table__product-cell')!;
    const pageOf = (el: Element) => getComputedStyle(el).getPropertyValue('--ct-page');

    expect(pageOf(cell)).toBe('1');
    expect(pageOf(cell.querySelector('.nx-comparison-table__cell-inner')!)).toBe('0');
    expect(
      pageOf(host(fixture).querySelector('tbody .nx-comparison-table__description-cell')!),
    ).toBe('0');
  });

  it('lets only the rows near the viewport glide', async () => {
    const fixture = await create();
    const glidingSections = () =>
      new Set(
        carouselGlides().map(
          (glide) =>
            ((glide.effect as KeyframeEffect).target as Element).closest('thead, tbody')!.tagName,
        ),
      );
    host(fixture).style.marginTop = `${3 * window.innerHeight}px`;

    fixture.componentInstance.table.scrollNext();
    await settle(fixture);
    expect(glidingSections()).toEqual(new Set(['THEAD']));
    expect(host(fixture).querySelector('tbody tr')).toHaveClass('is-out-of-view');
    finishTransitions();

    host(fixture).style.marginTop = '';
    fixture.componentInstance.table.scrollNext();
    await settle(fixture);
    expect(glidingSections()).toEqual(new Set(['THEAD', 'TBODY']));
    expect(host(fixture).querySelector('tbody tr')).not.toHaveClass('is-out-of-view');
    finishTransitions();
  });

  it('measures once on init', async () => {
    const measure = vi.spyOn(NxComparisonTableComponent.prototype as any, '_measure');
    const fixture = await create();
    await settle(fixture);

    expect(measure).toHaveBeenCalledTimes(1);
  });
});

@Component({
  selector: 'test-tablet-intersection-component',
  template: `
    <nx-comparison-table view="tablet">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">P1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">P2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Benefits</nx-comparison-table-description-cell>
        <nx-comparison-table-intersection-cell>All products</nx-comparison-table-intersection-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Coverage</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Notes</nx-comparison-table-description-cell>
        <nx-comparison-table-intersection-cell
          >Before a section</nx-comparison-table-intersection-cell
        >
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header>S</nx-comparison-table-toggle-section-header>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Inner</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>X</nx-comparison-table-cell>
          <nx-comparison-table-cell>Y</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class TabletIntersectionComponent {}

@Component({
  selector: 'test-mobile-row-group-in-section-component',
  template: `
    <nx-comparison-table view="mobile">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">H1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">H2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Top</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>t1</nx-comparison-table-cell>
        <nx-comparison-table-cell>t2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header>Sec</nx-comparison-table-toggle-section-header>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Direct</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>d1</nx-comparison-table-cell>
          <nx-comparison-table-cell>d2</nx-comparison-table-cell>
        </ng-container>
        <ng-container nxComparisonTableRowGroup [visibleRows]="1">
          <ng-container nxComparisonTableRow>
            <nx-comparison-table-description-cell>G1</nx-comparison-table-description-cell>
            <nx-comparison-table-cell>g1</nx-comparison-table-cell>
            <nx-comparison-table-cell>g2</nx-comparison-table-cell>
          </ng-container>
          <ng-container nxComparisonTableRow>
            <nx-comparison-table-description-cell>G2</nx-comparison-table-description-cell>
            <nx-comparison-table-cell>h1</nx-comparison-table-cell>
            <nx-comparison-table-cell>h2</nx-comparison-table-cell>
          </ng-container>
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
class MobileRowGroupInSectionComponent {}

@Component({
  selector: 'test-mobile-row-order-component',
  template: `
    <nx-comparison-table view="mobile">
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Before</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>b1</nx-comparison-table-cell>
        <nx-comparison-table-cell>b2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">H1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">H2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Middle</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>m1</nx-comparison-table-cell>
        <nx-comparison-table-cell>m2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>After</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>a1</nx-comparison-table-cell>
        <nx-comparison-table-cell>a2</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class MobileRowOrderComponent {}

@Component({
  selector: 'test-mobile-element-row-group-component',
  template: `
    <nx-comparison-table view="mobile">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">H1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header" disabledColumn>H2</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header>Sec</nx-comparison-table-toggle-section-header>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Direct</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>d1</nx-comparison-table-cell>
          <nx-comparison-table-cell>d2</nx-comparison-table-cell>
        </ng-container>
        <div nxComparisonTableRowGroup [visibleRows]="1">
          <ng-container nxComparisonTableRow>
            <nx-comparison-table-description-cell>G1</nx-comparison-table-description-cell>
            <nx-comparison-table-cell>g1</nx-comparison-table-cell>
            <nx-comparison-table-cell>g2</nx-comparison-table-cell>
          </ng-container>
          <ng-container nxComparisonTableRow>
            <nx-comparison-table-description-cell>G2</nx-comparison-table-description-cell>
            <nx-comparison-table-cell>h1</nx-comparison-table-cell>
            <nx-comparison-table-cell>h2</nx-comparison-table-cell>
          </ng-container>
        </div>
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header>Next</nx-comparison-table-toggle-section-header>
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>N</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>n1</nx-comparison-table-cell>
          <nx-comparison-table-cell>n2</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
      <ng-container nxComparisonTableRowGroup [visibleRows]="1">
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>After</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>a1</nx-comparison-table-cell>
          <nx-comparison-table-cell>a2</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class MobileElementRowGroupComponent {}

describe('NxComparisonTableComponent body structure', () => {
  async function create<T>(component: Type<T>): Promise<ComponentFixture<T>> {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  function texts(elements: Iterable<Element>): string[] {
    return Array.from(elements, (el) => el.textContent!.trim());
  }

  function rowOf(fixture: ComponentFixture<unknown>, description: string): HTMLElement {
    return Array.from<HTMLElement>(
      fixture.nativeElement.querySelectorAll('.nx-comparison-table__description-cell'),
    )
      .find((cell) => cell.textContent!.trim() === description)!
      .closest('tr')!;
  }

  it('should space an intersection row from a following description row on tablet', async () => {
    const fixture = await create(TabletIntersectionComponent);
    const host: HTMLElement = fixture.nativeElement.querySelector('nx-comparison-table');
    host.style.setProperty('--comparison-table-intersection-row-margin-bottom', '6px');
    const intersectionRows = Array.from<HTMLElement>(host.querySelectorAll('tr.has-intersection'));
    const padding = (row: HTMLElement) =>
      getComputedStyle(row.querySelector('.nx-comparison-table__intersection-cell')!).paddingBottom;

    expect(intersectionRows).toHaveLength(2);
    expect(intersectionRows[0].nextElementSibling).toHaveClass('is-description-row');
    expect(intersectionRows[0]).toHaveClass('has-gap-below');
    expect(padding(intersectionRows[0])).toBe('6px');
    expect(intersectionRows[1].nextElementSibling).toHaveClass(
      'nx-comparison-table__toggle-section-header',
    );
    expect(intersectionRows[1]).not.toHaveClass('has-gap-below');
    expect(padding(intersectionRows[1])).toBe('0px');
  });

  it('should space a row-group expander from the row above it', async () => {
    const fixture = await create(RowGroupWithToggleSectionComponent);
    const host: HTMLElement = fixture.nativeElement.querySelector('nx-comparison-table');
    host.style.setProperty('--comparison-table-row-group-spacing', '12px');
    const expander = host.querySelector<HTMLElement>('tr.is-group-expansion-row')!;
    const sectionHeader = host.querySelector('tr.nx-comparison-table__toggle-section-header');

    expect(rowOf(fixture, 'Desc 1')).toHaveClass('is-block-start');
    expect(rowOf(fixture, 'Desc 1')).toHaveClass('is-block-end');
    expect(expander).toHaveClass('has-gap-above');
    expect(
      getComputedStyle(expander.querySelector('.nx-comparison-table__group-expansion-cell')!)
        .paddingTop,
    ).toBe('12px');
    expect(sectionHeader).not.toHaveClass('has-gap-above');
  });

  it('should keep the rendered rows when a toggle section collapses', async () => {
    const fixture = await create(RowGroupWithToggleSectionComponent);
    const inner = rowOf(fixture, 'Inner');
    fixture.nativeElement
      .querySelector('th.nx-comparison-table__toggle-section-header-cell')
      .click();
    fixture.detectChanges();

    expect(rowOf(fixture, 'Inner')).toBe(inner);
    expect(inner).toHaveClass('is-collapsed');
  });

  describe('mobile', () => {
    it('should re-measure the clip offsets when webfonts finish loading', async () => {
      const fixture = await create(MobileRowOrderComponent);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const table: HTMLElement = fixture.nativeElement.querySelector(
        'table.nx-comparison-table__mobile-view',
      );
      const description = table.querySelector<HTMLElement>(
        '.nx-comparison-table__description-row .nx-comparison-table__description-cell',
      )!;
      const cellStart = () => parseFloat(description.style.getPropertyValue('--ct-cell-start'));
      const before = cellStart();

      // Widens the first column like a late webfont would; the host keeps its size.
      table.querySelector<HTMLElement>('th.nx-comparison-table__placeholder-cell')!.style.minWidth =
        '300px';
      await new Promise((resolve) => requestAnimationFrame(resolve));
      expect(cellStart()).toBe(before);

      document.fonts.dispatchEvent(new Event('loadingdone'));
      fixture.detectChanges();
      await fixture.whenStable();
      expect(cellStart()).toBeGreaterThan(before);
    });

    function mobileTable(fixture: ComponentFixture<unknown>): HTMLElement {
      return fixture.nativeElement.querySelector('table.nx-comparison-table__mobile-view');
    }

    it('should span a section header over the rows of an element-hosted row group', async () => {
      const fixture = await create(MobileElementRowGroupComponent);
      const table = mobileTable(fixture);
      const headers = table.querySelectorAll('.nx-comparison-table__mobile-toggle-section-header');
      const descriptions = table.querySelectorAll(
        '.nx-comparison-table__description-row .nx-comparison-table__description-cell',
      );

      expect(texts(descriptions)).toEqual(['Direct', 'G1', 'G2', 'N', 'After']);
      expect(Array.from(headers, (th) => th.getAttribute('colspan'))).toEqual(['3', '1']);
    });

    it('should separate a row group following a toggle section by a spacer column', async () => {
      const fixture = await create(MobileElementRowGroupComponent);
      const after = Array.from(
        mobileTable(fixture).querySelectorAll('.nx-comparison-table__description-cell'),
      ).find((cell) => cell.textContent!.trim() === 'After')!;

      expect(after.previousElementSibling).toHaveClass('nx-comparison-table__placeholder-cell');
    });

    it('should mark the product row of a disabled column', async () => {
      const fixture = await create(MobileElementRowGroupComponent);
      const productRows = mobileTable(fixture).querySelectorAll(
        'tr:not(.nx-comparison-table__toggle-section-header-row, .nx-comparison-table__description-row)',
      );

      expect(productRows).toHaveLength(2);
      expect(productRows[0]).not.toHaveClass('is-disabled');
      expect(productRows[1]).toHaveClass('is-disabled');
    });

    it('should render the rows of a row group inside a toggle section', async () => {
      const fixture = await create(MobileRowGroupInSectionComponent);
      const table: HTMLElement = fixture.nativeElement.querySelector(
        'table.nx-comparison-table__mobile-view',
      );
      const sectionHeader = table.querySelector(
        '.nx-comparison-table__mobile-toggle-section-header',
      );
      const productRows = table.querySelectorAll<HTMLElement>(
        'tr:not(.nx-comparison-table__toggle-section-header-row, .nx-comparison-table__description-row)',
      );

      expect(
        texts(
          table.querySelectorAll(
            '.nx-comparison-table__description-row .nx-comparison-table__description-cell',
          ),
        ),
      ).toEqual(['Top', 'Direct', 'G1', 'G2']);
      expect(sectionHeader!.getAttribute('colspan')).toBe('3');
      expect(texts(productRows[0].querySelectorAll('td.nx-comparison-table__cell'))).toEqual([
        't1',
        'd1',
        'g1',
        'h1',
      ]);
      expect(texts(productRows[1].querySelectorAll('td.nx-comparison-table__cell'))).toEqual([
        't2',
        'd2',
        'g2',
        'h2',
      ]);
    });

    it('should find the header and footer rows wherever they are declared', async () => {
      const fixture = await create(MobileRowOrderComponent);
      const table: HTMLElement = fixture.nativeElement.querySelector(
        'table.nx-comparison-table__mobile-view',
      );
      const productRows = table.querySelectorAll<HTMLElement>(
        'tr:not(.nx-comparison-table__description-row)',
      );

      expect(
        texts(
          table.querySelectorAll(
            '.nx-comparison-table__description-row .nx-comparison-table__description-cell',
          ),
        ),
      ).toEqual(['Before', 'Middle', 'After']);
      expect(productRows).toHaveLength(2);
      expect(
        texts(productRows[0].querySelectorAll('.nx-comparison-table__mobile-header-cell')),
      ).toEqual(['H1']);
      expect(texts(productRows[0].querySelectorAll('td.nx-comparison-table__cell'))).toEqual([
        'b1',
        'm1',
        'a1',
      ]);
      expect(table.textContent).not.toContain('F1');
    });
  });
});
