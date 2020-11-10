import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as axe from 'axe-core';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';
import { NxComparisonTableComponent } from './comparison-table.component';
import { NxComparisonTableModule } from './comparison-table.module';

declare var viewport: any;
const THROTTLE_TIME = 200;

export const BASIC_COMPARISON_TABLE_TEMPLATE = `
  <nx-comparison-table>
    <ng-container *ngFor="let element of data">
      <ng-container *ngIf="element['type'] === 'toggleSection'" nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header>{{ element['header'] }}</nx-comparison-table-toggle-section-header>
        <ng-container *ngFor="let row of element['content']" nxComparisonTableRow>
          <nx-comparison-table-description-cell *ngIf="row['description']">{{ row['description'] }}</nx-comparison-table-description-cell>>
          <nx-comparison-table-cell *ngFor="let cell of row['cells']">{{ cell }}</nx-comparison-table-cell>
          <nx-comparison-table-intersection-cell *ngIf="row['intersection']">{{ row['intersection'] }}</nx-comparison-table-intersection-cell>
        </ng-container>
      </ng-container>
      <ng-container *ngIf="element['type'] !== 'toggleSection'" nxComparisonTableRow [type]="element['type']">
        <nx-comparison-table-description-cell *ngIf="element['description']">{{ element['description'] }}</nx-comparison-table-description-cell>>
        <nx-comparison-table-cell *ngFor="let cell of element['cells']" [type]="element['type']">{{ cell }}</nx-comparison-table-cell>
        <nx-comparison-table-intersection-cell *ngIf="element['intersection']">{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
      </ng-container>
    </ng-container>
  </nx-comparison-table>
`;

@Directive()
abstract class TableTest {
  @ViewChild(NxComparisonTableComponent) tableInstance: NxComparisonTableComponent;
  @ViewChildren(NxComparisonTableCell) cellInstances: QueryList<NxComparisonTableCell>;
  @ViewChildren(NxComparisonTableRowDirective) rowInstances: QueryList<NxComparisonTableRowDirective>;

  selected = 0;
  data;
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
    tableInstance = (testInstance as TableTest).tableInstance;
    tableElement = fixture.debugElement.query(By.css('nx-comparison-table'));
    cellInstances = (testInstance as TableTest).cellInstances;
    cellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__cell'));
    rowInstances = (testInstance as TableTest).rowInstances;
    rowElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__row'));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NxComparisonTableModule, BrowserAnimationsModule],
      declarations: [
        BasicComponent,
        BasicOnPushComponent,
        DisabledColumnsComponent,
        SelectableIndexComponent,
        LongPageWithTableComponent
      ]
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

    it('should return correct number of header cells in _getHeaderCells', () => {
      createTestComponent(BasicComponent);
      const headerCells = tableInstance._getHeaderCells();
      expect(headerCells.length).toBe(2);
    });

    it('should display the correct number of rows and toggle sections', fakeAsync(() => {
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);

      expect(rowElements.length).toBe(5);

      const toggleSectionElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__toggle-section'));
      expect(toggleSectionElements.length).toBe(1);

      const rowsInToggleSections = toggleSectionElements[0].queryAll(By.css('.nx-comparison-table__row'));
      expect(rowsInToggleSections.length).toBe(2);
    }));

  });

  describe('responsive', () => {
    it('should display the correct number of rows and toggle sections (tablet)', fakeAsync(() => {
      viewport.set('tablet');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicComponent);

      tick(THROTTLE_TIME);
      fixture.detectChanges();

      rowElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__row'));
      expect(rowElements.length).toBe(8);

      const toggleSectionElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__toggle-section'));
      expect(toggleSectionElements.length).toBe(1);

      const rowsInToggleSections = toggleSectionElements[0].queryAll(By.css('.nx-comparison-table__row'));
      expect(rowsInToggleSections.length).toBe(4);
    }));

    it('should display the correct number of rows and toggle sections (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tr'));
      expect(rows.length).toBe(4);

      expect(rows[0].queryAll(By.css('.nx-comparison-table__mobile-toggle-section-header')).length).toBe(1);
      expect(rows[1].queryAll(By.css('.nx-comparison-table__description-cell')).length).toBe(3);
    }));

    it('should display the placeholders correctly', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tr'));

      // toggle-section-header row: 5 placeholders + 1 content column
      expect(rows[0].queryAll(By.css('th')).length).toBe(5);
      expect(rows[0].queryAll(By.css('th.nx-comparison-table__placeholder-cell')).length).toBe(4);

      // description-header row: 3 placeholders + 3 content columns
      expect(rows[1].queryAll(By.css('th')).length).toBe(6);
      expect(rows[1].queryAll(By.css('th.nx-comparison-table__placeholder-cell')).length).toBe(3);

      // content rows: 2 placeholders + 1 mobile-header-column + 3 content cells
      expect(rows[2].queryAll(By.css('td')).length).toBe(6);
      expect(rows[2].queryAll(By.css('td.nx-comparison-table__placeholder-cell')).length).toBe(2);

      expect(rows[3].queryAll(By.css('td')).length).toBe(6);
      expect(rows[3].queryAll(By.css('td.nx-comparison-table__placeholder-cell')).length).toBe(2);
    }));

    it('should display all the rows when no footer (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);

      testInstance.data = [
        { type: 'header', cells: ['This is a header cell', 'This is a header cell', 'This is a header cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell', 'This is a cell'] }
      ];
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tr'));

      // toggle-section-header row: 2 placeholders + 1 content column
      expect(rows[0].queryAll(By.css('th')).length).toBe(3);
      expect(rows[0].queryAll(By.css('th.nx-comparison-table__placeholder-cell')).length).toBe(2);

      // content rows: 1 placeholder + 1 mobile-header-column + 1 content cell
      expect(rows[2].queryAll(By.css('td')).length).toBe(3);
      expect(rows[2].queryAll(By.css('td.nx-comparison-table__placeholder-cell')).length).toBe(1);

      expect(rows[3].queryAll(By.css('td')).length).toBe(3);
      expect(rows[3].queryAll(By.css('td.nx-comparison-table__placeholder-cell')).length).toBe(1);
    }));

    it('should update when parent is onPush', fakeAsync(() => {
      createTestComponent(BasicOnPushComponent);
      tick(THROTTLE_TIME);
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.nx-comparison-table__description-row')).toBeTruthy();
    }));

    afterEach(() => {
      viewport.reset();
    });
  });

  describe('selection', () => {
    it('should not be selected by default', () => {
      createTestComponent(BasicComponent);
      cellInstances.forEach(cell => {
        expect(cell._isSelected()).toBe(false);
      });
      cellElements.forEach(cell => {
        expect(cell.nativeElement.classList).not.toContain('is-selected');
      });
    });

    it('should update selected on input change', () => {
      createTestComponent(SelectableIndexComponent);

      expect(tableInstance.selectedIndex).toBe(0);
      rowInstances.forEach(row => {
        expect(row.cells.toArray()[0]._isSelected()).toBe(true);
        expect(row.cells.toArray()[1]._isSelected()).toBe(false);
        expect(row.cells.toArray()[2]._isSelected()).toBe(false);
      });
      rowElements.forEach(row => {
        const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
        expect(cells[0].nativeElement.classList).toContain('is-selected');
        expect(cells[1].nativeElement.classList).not.toContain('is-selected');
        expect(cells[2].nativeElement.classList).not.toContain('is-selected');
      });

      testInstance.selected = 2;
      fixture.detectChanges();

      expect(tableInstance.selectedIndex).toBe(2);
      rowInstances.forEach(row => {
        expect(row.cells.toArray()[0]._isSelected()).toBe(false);
        expect(row.cells.toArray()[1]._isSelected()).toBe(false);
        expect(row.cells.toArray()[2]._isSelected()).toBe(true);
      });
      rowElements.forEach(row => {
        const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
        expect(cells[0].nativeElement.classList).not.toContain('is-selected');
        expect(cells[1].nativeElement.classList).not.toContain('is-selected');
        expect(cells[2].nativeElement.classList).toContain('is-selected');
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
    }));
  });

  describe('column disabling', () => {
    it('should not be disabled by default', () => {
      createTestComponent(DisabledColumnsComponent);
      cellInstances.forEach(cell => {
        expect(cell._isCellDisabled).toBe(false);
      });
      cellElements.forEach(cell => {
        expect(cell.nativeElement.classList).not.toContain('is-disabled');
      });
    });

    it('should disable the buttons of disabled columns', () => {
      createTestComponent(DisabledColumnsComponent);

      (testInstance as DisabledColumnsComponent).disabledColumn1 = true;
      fixture.detectChanges();

      const selectButtons = fixture.debugElement.queryAll(By.css('.nx-comparison-table__select-button'));
      expect(selectButtons[1].nativeElement.attributes['disabled']).toBeTruthy();
      expect(selectButtons[0].nativeElement.attributes['disabled']).toBeFalsy();
    });

    it('should update on disabled input change', () => {
      createTestComponent(DisabledColumnsComponent);

      (testInstance as DisabledColumnsComponent).disabledColumn1 = true;
      fixture.detectChanges();

      rowInstances.forEach(row => {
        expect(row.cells.toArray()[0]._isCellDisabled).toBe(false);
        expect(row.cells.toArray()[1]._isCellDisabled).toBe(true);
        expect(row.cells.toArray()[2]._isCellDisabled).toBe(false);
      });

      rowElements.forEach(row => {
        const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
        expect(cells[0].nativeElement.classList).not.toContain('is-disabled');
        expect(cells[1].nativeElement.classList).toContain('is-disabled');
        expect(cells[2].nativeElement.classList).not.toContain('is-disabled');
      });

      (testInstance as DisabledColumnsComponent).disabledColumn1 = false;
      (testInstance as DisabledColumnsComponent).disabledColumn2 = true;
      fixture.detectChanges();

      rowInstances.forEach(row => {
        expect(row.cells.toArray()[0]._isCellDisabled).toBe(false);
        expect(row.cells.toArray()[1]._isCellDisabled).toBe(false);
        expect(row.cells.toArray()[2]._isCellDisabled).toBe(true);
      });

      rowElements.forEach(row => {
        const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
        expect(cells[0].nativeElement.classList).not.toContain('is-disabled');
        expect(cells[1].nativeElement.classList).not.toContain('is-disabled');
        expect(cells[2].nativeElement.classList).toContain('is-disabled');
      });
    });

    it('should not disable the column if put on a non-header cell', () => {
      createTestComponent(DisabledColumnsComponent);

      (testInstance as DisabledColumnsComponent).fakeDisabled = true;
      fixture.detectChanges();

      rowInstances.forEach(row => {
        expect(row.cells.toArray()[0]._isCellDisabled).toBe(false);
        expect(row.cells.toArray()[1]._isCellDisabled).toBe(false);
        expect(row.cells.toArray()[2]._isCellDisabled).toBe(false);
      });

      rowElements.forEach(row => {
        const cells = row.queryAll(By.css('.nx-comparison-table__cell'));
        expect(cells[0].nativeElement.classList).not.toContain('is-disabled');
        expect(cells[1].nativeElement.classList).not.toContain('is-disabled');
        expect(cells[2].nativeElement.classList).not.toContain('is-disabled');
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

      const mobileContentRows = fixture.debugElement.queryAll(By.css('tr:not(.nx-comparison-table__description-row)'));
      expect(mobileContentRows[0].nativeElement.classList).not.toContain('is-disabled');
      expect(mobileContentRows[1].nativeElement.classList).toContain('is-disabled');
      expect(mobileContentRows[2].nativeElement.classList).toContain('is-disabled');
      viewport.reset();
    }));
  });

  describe('responsive behaviour', () => {
    it('should have the correct view type on page load (desktop)', () => {
      createTestComponent(BasicComponent);
      expect(tableInstance.viewType).toBe('desktop');
    });

    it('should have the correct view type on page load (tablet)', fakeAsync(() => {
      viewport.set('tablet');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      expect(tableInstance.viewType).toBe('tablet');
    }));

    it('should have the correct view type on page load (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);

      expect(tableInstance.viewType).toBe('mobile');
    }));

    it('should update the viewType correctly', fakeAsync(() => {
      createTestComponent(SelectableIndexComponent);
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
    }));

    afterEach(() => {
      viewport.reset();
    });
  });

  describe('sticky behaviour', () => {
    it('should not mark a sticky placeholder cell on desktop by default', () => {
      createTestComponent(BasicComponent);

      expect(tableInstance._stickyPlaceholder).toBe(false);
      const stickyElements = rowElements[0].queryAll(By.css('.nx-placeholder--sticky'));
      expect(stickyElements.length).toBe(0);
    });

    it('should mark the sticky placeholder cell when scrolled (desktop)', fakeAsync(() => {
      createTestComponent(LongPageWithTableComponent);
      tick(THROTTLE_TIME);
      expect(tableInstance._stickyPlaceholder).toBe(false);

      const wrapperDiv = fixture.debugElement.query(By.css('div'));
      wrapperDiv.nativeElement.scrollTop = 50;
      dispatchFakeEvent(document, 'scroll');
      tick();
      fixture.detectChanges();

      expect(tableInstance._stickyPlaceholder).toBe(true);
      let stickyElements = rowElements[0].queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky'));
      expect(stickyElements.length).toBe(1);

      wrapperDiv.nativeElement.scrollTop = 0;
      dispatchFakeEvent(document, 'scroll');
      tick();
      fixture.detectChanges();

      expect(tableInstance._stickyPlaceholder).toBe(false);
      stickyElements = rowElements[0].queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky'));
      expect(stickyElements.length).toBe(0);
    }));

    it('should not mark a sticky placeholder by default on mobile', fakeAsync(() => {
      createTestComponent(BasicComponent);

      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const toggleSectionHeaderRow = tableElement.query(By.css('.nx-comparison-table__toggle-section-header-row'));
      expect(toggleSectionHeaderRow.queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky')).length).toBe(0);

      const descriptionRow = tableElement.query(By.css('.nx-comparison-table__description-row'));
      expect(descriptionRow.queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky')).length).toBe(0);
    }));

    it('should mark as a sticky placeholder on scroll (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(LongPageWithTableComponent);

      tick(THROTTLE_TIME);
      fixture.detectChanges();

      expect(tableInstance._stickyPlaceholder).toBe(false);

      tableElement.nativeElement.scrollTo(50, 0);
      dispatchFakeEvent(document, 'scroll');
      tick();
      fixture.detectChanges();

      let toggleSectionHeaderRow = tableElement.query(By.css('.nx-comparison-table__toggle-section-header-row'));
      expect(toggleSectionHeaderRow.queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky')).length).toBe(1);
      let descriptionRow = tableElement.query(By.css('.nx-comparison-table__description-row'));
      expect(descriptionRow.queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky')).length).toBe(1);

      tableElement.nativeElement.scrollTo(0, 0);
      dispatchFakeEvent(document, 'scroll');
      tick();
      fixture.detectChanges();

      toggleSectionHeaderRow = tableElement.query(By.css('.nx-comparison-table__toggle-section-header-row'));
      expect(toggleSectionHeaderRow.queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky')).length).toBe(0);
      descriptionRow = tableElement.query(By.css('.nx-comparison-table__description-row'));
      expect(descriptionRow.queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky')).length).toBe(0);
    }));

    it('should mark as sticky when parent is onPush', fakeAsync(() => {
      createTestComponent(BasicOnPushComponent);
      tick(THROTTLE_TIME);
      expect(tableInstance._stickyPlaceholder).toBe(false);

      const wrapperDiv = fixture.debugElement.query(By.css('div'));
      wrapperDiv.nativeElement.scrollTop = 50;
      dispatchFakeEvent(document, 'scroll');
      fixture.detectChanges();
      tick();

      expect(tableInstance._stickyPlaceholder).toBe(true);
      let stickyElements = rowElements[0].queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky'));
      expect(stickyElements.length).toBe(1);

      wrapperDiv.nativeElement.scrollTop = 0;
      dispatchFakeEvent(document, 'scroll');
      fixture.detectChanges();

      tick();

      expect(tableInstance._stickyPlaceholder).toBe(false);
      stickyElements = rowElements[0].queryAll(By.css('.nx-comparison-table__placeholder-cell.is-sticky'));
      expect(stickyElements.length).toBe(0);
    }));

    afterEach(() => {
      viewport.reset();
    });
  });

  describe('a11y', () => {
    it('should have set the roles correctly (desktop / tablet)', () => {
      createTestComponent(BasicComponent);

      expect(tableElement.query(By.css('div')).attributes['role']).toBe('table');
      expect(tableElement.query(By.css('table'))).toBeNull();

      const toggleSection = tableElement.query(By.css('.nx-comparison-table__toggle-section'));
      const toggleSectionHeader = toggleSection.query(By.css('.nx-comparison-table__toggle-section-header'));
      expect(toggleSectionHeader.attributes['role']).toBe('row');

      const toggleSectionBody = toggleSection.query(By.css('.nx-comparison-table__toggle-section-body'));
      expect(toggleSectionBody.attributes['role']).toBe('rowgroup');
    });

    it('has no accessibility violations', function (done) {
      createTestComponent(BasicComponent);

      axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        const violationMessages = results.violations.map(item => item.description);
        if (violationMessages.length) {
          console.error(violationMessages);
          expect(violationMessages).toBeFalsy();
        }
        done();
      });
    });

    afterEach(() => {
      viewport.reset();
    });
  });
});

@Component({
  template: BASIC_COMPARISON_TABLE_TEMPLATE
})
class BasicComponent extends TableTest {
  data = [
    { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
    { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
    {
      type: 'toggleSection', header: 'This can be opened',
      content: [
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
      ]
    },
    { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
  ];
}

@Component({
  template: `
  <div style="height: 200px; width: 200px; overflow: scroll;">
    ${BASIC_COMPARISON_TABLE_TEMPLATE}
  </div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class BasicOnPushComponent extends TableTest {
  data = [
    { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
    { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
    {
      type: 'toggleSection', header: 'This can be opened',
      content: [
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
      ]
    },
    { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
  ];
}

@Component({
  template: `
    <nx-comparison-table [(selectedIndex)]="selected">
      <ng-container *ngFor="let element of data">
        <ng-container *ngIf="element['type'] === 'toggleSection'" nxComparisonTableToggleSection>
          <nx-comparison-table-toggle-section-header>{{ element['header'] }}</nx-comparison-table-toggle-section-header>
          <ng-container *ngFor="let row of element['content']" nxComparisonTableRow>
            <nx-comparison-table-description-cell *ngIf="row['description']">{{ row['description'] }}</nx-comparison-table-description-cell>>
            <nx-comparison-table-cell *ngFor="let cell of row['cells']">{{ cell }}</nx-comparison-table-cell>
            <nx-comparison-table-intersection-cell *ngIf="row['intersection']">{{ row['intersection'] }}</nx-comparison-table-intersection-cell>
          </ng-container>
        </ng-container>
        <ng-container *ngIf="element['type'] !== 'toggleSection'" nxComparisonTableRow [type]="element['type']">
          <nx-comparison-table-description-cell *ngIf="element['description']">{{ element['description'] }}</nx-comparison-table-description-cell>>
          <nx-comparison-table-cell *ngFor="let cell of element['cells']" [type]="element['type']">{{ cell }}</nx-comparison-table-cell>
          <nx-comparison-table-intersection-cell *ngIf="element['intersection']">{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
        </ng-container>
      </ng-container>
    </nx-comparison-table>
  `
})
class SelectableIndexComponent extends TableTest {
  data = [
    { type: 'header', cells: ['This is a header cell', 'This is a header cell', 'This is a header cell'] },
    { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell', 'This is a cell'] },
    { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell', 'This is a footer cell'] },
  ];
}

@Component({
  template: `
   <nx-comparison-table>
    <ng-container nxComparisonTableRow type="header">
      <nx-comparison-table-cell type="header">
        <button nxComparisonTableSelectButton unselectedLabel="Select" selectedLabel="Selected" type="button"></button>
        Product 1
      </nx-comparison-table-cell>
      <nx-comparison-table-cell type="header" [disabledColumn]="disabledColumn1">
        <button nxComparisonTableSelectButton unselectedLabel="Select" selectedLabel="Selected" type="button"></button>
        Product 2 with a very long name</nx-comparison-table-cell>
      <nx-comparison-table-cell type="header" [disabledColumn]="disabledColumn2">
      <button nxComparisonTableSelectButton unselectedLabel="Select" selectedLabel="Selected" type="button"></button>
      Product 3</nx-comparison-table-cell>
    </ng-container>

    <ng-container nxComparisonTableRow>
      <nx-comparison-table-description-cell>Service headline</nx-comparison-table-description-cell>
      <nx-comparison-table-cell [disabledColumn]="fakeDisabled">100 Mio. Euro</nx-comparison-table-cell>
      <nx-comparison-table-cell>150 Mio. Euro</nx-comparison-table-cell>
      <nx-comparison-table-cell>200 Mio. Euro</nx-comparison-table-cell>
    </ng-container>

    <ng-container nxComparisonTableRow>
      <nx-comparison-table-description-cell>Service headline</nx-comparison-table-description-cell>
      <nx-comparison-table-cell>cell</nx-comparison-table-cell>
      <nx-comparison-table-cell>cell</nx-comparison-table-cell>
      <nx-comparison-table-cell>cell</nx-comparison-table-cell>
    </ng-container>

    <ng-container nxComparisonTableRow>
      <nx-comparison-table-description-cell>Service headline</nx-comparison-table-description-cell>
      <nx-comparison-table-cell>cell</nx-comparison-table-cell>
      <nx-comparison-table-cell>cell</nx-comparison-table-cell>
      <nx-comparison-table-cell>cell</nx-comparison-table-cell>
    </ng-container>
  </nx-comparison-table>
  `
})
class DisabledColumnsComponent extends TableTest {
  disabledColumn1 = false;
  disabledColumn2 = false;
  fakeDisabled = false;
}

@Component({
  template: `
    <div style="height: 200px; width: 200px; overflow: scroll;">
      ${BASIC_COMPARISON_TABLE_TEMPLATE}
    </div>
  `
})
class LongPageWithTableComponent extends TableTest {
  data = [
    { type: 'header', cells: ['This is a header cell', 'This is a header cell'] },
    { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
    {
      type: 'toggleSection', header: 'This can be opened',
      content: [
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a cell'] },
      ]
    },
    { type: 'footer', cells: ['This is a footer cell', 'This is a footer cell'] },
  ];
}
