import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  COMPARISON_TABLE_DEFAULT_OPTIONS,
  ComparisonTableDefaultOptions,
} from './comparison-table.models';
import { NxComparisonTableModule } from './comparison-table.module';
import { NxComparisonTableRowGroupDirective } from './comparison-table-row-group.directive';

declare let viewport: any;
const THROTTLE_TIME = 200;

const comparisonTableDefaultOptions: ComparisonTableDefaultOptions = {
  useFullRowForExpandableArea: true,
};

@Directive({ standalone: true })
abstract class RowGroupTest {
  visibleRows = 2;
  labelCollapsed = 'To be opened';
  labelExpanded = 'To be closed';
  isExpanded = false;
  useFullRowForExpandableArea = false;
  @ViewChild(NxComparisonTableRowGroupDirective)
  rowGroupDirective!: NxComparisonTableRowGroupDirective;
}

describe('NxComparisonTableRowGroupDirective', () => {
  let fixture: ComponentFixture<RowGroupTest>;
  let testInstance: RowGroupTest;

  function createTestComponent(component: Type<RowGroupTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
  }

  function getContentRows() {
    return fixture.debugElement.queryAll(By.css('.nx-comparison-table__grid-row.is-content-row'));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxComparisonTableModule,
        BasicComponent,
        ConfigurableComponent,
        ToggleSectionComponent,
      ],
    });
    TestBed.compileComponents();
  }));

  describe('basic', () => {
    it('should render all rows when expanded (desktop)', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      testInstance.rowGroupDirective._handleIsExpandedChange(true);
      fixture.detectChanges();

      // All 10 group rows are rendered as content rows (the expansion button is a separate
      // .is-group-expansion-row, not a content row).
      expect(getContentRows()).toHaveLength(10);
      flush();
    }));

    it('should use default visibleRows value of 5', () => {
      createTestComponent(BasicComponent);
      expect(testInstance.rowGroupDirective.visibleRows).toBe(5);
    });

    it('should use default labelCollapsed', () => {
      createTestComponent(BasicComponent);
      expect(testInstance.rowGroupDirective.labelCollapsed).toBe('More services');
    });

    it('should use default labelExpanded', () => {
      createTestComponent(BasicComponent);
      expect(testInstance.rowGroupDirective.labelExpanded).toBe('Less services');
    });

    it('correctly changes visibleRows', () => {
      createTestComponent(ConfigurableComponent);
      expect(testInstance.rowGroupDirective.visibleRows).toBe(2);

      testInstance.visibleRows = 4;
      fixture.detectChanges();
      expect(testInstance.rowGroupDirective.visibleRows).toBe(4);
    });

    it('changes the labels on input change', () => {
      createTestComponent(ConfigurableComponent);
      expect(testInstance.rowGroupDirective.labelCollapsed).toBe('To be opened');
      expect(testInstance.rowGroupDirective.labelExpanded).toBe('To be closed');

      testInstance.labelCollapsed = 'Open me!';
      testInstance.labelExpanded = 'Close me!';
      fixture.detectChanges();
      expect(testInstance.rowGroupDirective.labelCollapsed).toBe('Open me!');
      expect(testInstance.rowGroupDirective.labelExpanded).toBe('Close me!');
    });

    it('should render rows inside a toggle section', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      // The toggle section header row is rendered, and the (collapsible) group rows are
      // rendered inline in the body.
      const toggleHeader = fixture.debugElement.query(
        By.css('.nx-comparison-table__toggle-section-header'),
      );
      expect(toggleHeader).toBeTruthy();
      expect(getContentRows().length).toBeGreaterThan(0);
      flush();
    }));

    it('sets useFullRowForExpandableArea to false by default', () => {
      createTestComponent(BasicComponent);
      expect(testInstance.rowGroupDirective.useFullRowForExpandableArea).toBe(false);
    });

    describe('with binding to isExpanded property', () => {
      it('isExpanded defaults to false', () => {
        createTestComponent(ConfigurableComponent);
        expect(testInstance.rowGroupDirective.isExpanded).toBe(false);
      });

      it('isExpanded can be set to true via input', () => {
        createTestComponent(ConfigurableComponent);
        testInstance.isExpanded = true;
        fixture.detectChanges();
        expect(testInstance.rowGroupDirective.isExpanded).toBe(true);
      });

      it('isExpanded can be toggled to false', () => {
        createTestComponent(ConfigurableComponent);
        testInstance.isExpanded = true;
        fixture.detectChanges();

        testInstance.isExpanded = false;
        fixture.detectChanges();
        expect(testInstance.rowGroupDirective.isExpanded).toBe(false);
      });
    });

    describe('signal reactivity', () => {
      it('should render more content rows when group is expanded', fakeAsync(() => {
        viewport.set('desktop');
        window.dispatchEvent(new Event('resize'));
        createTestComponent(ConfigurableComponent);
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        const countBefore = getContentRows().length;

        testInstance.rowGroupDirective._handleIsExpandedChange(true);
        fixture.detectChanges();

        expect(getContentRows().length).toBeGreaterThan(countBefore);
        flush();
      }));

      it('should render fewer content rows when group is collapsed', fakeAsync(() => {
        viewport.set('desktop');
        window.dispatchEvent(new Event('resize'));
        createTestComponent(ConfigurableComponent);
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        testInstance.rowGroupDirective._handleIsExpandedChange(true);
        fixture.detectChanges();
        const countExpanded = getContentRows().length;

        testInstance.rowGroupDirective._handleIsExpandedChange(false);
        fixture.detectChanges();

        expect(getContentRows().length).toBeLessThan(countExpanded);
        flush();
      }));

      it('should render additional content rows when group is expanded', fakeAsync(() => {
        viewport.set('desktop');
        window.dispatchEvent(new Event('resize'));
        createTestComponent(ConfigurableComponent);
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        const rowsBefore = getContentRows().length;

        testInstance.rowGroupDirective._handleIsExpandedChange(true);
        fixture.detectChanges();

        // visibleRows=2 → expanding shows all 10 rows (+8)
        expect(getContentRows().length).toBe(rowsBefore + 8);
        flush();
      }));

      it('should reduce content rows when group is collapsed', fakeAsync(() => {
        viewport.set('desktop');
        window.dispatchEvent(new Event('resize'));
        createTestComponent(ConfigurableComponent);
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        testInstance.rowGroupDirective._handleIsExpandedChange(true);
        fixture.detectChanges();

        testInstance.rowGroupDirective._handleIsExpandedChange(false);
        fixture.detectChanges();

        // Back to visibleRows=2 group rows + 1 standalone content row (the expansion button
        // is a separate .is-group-expansion-row, not counted here).
        expect(getContentRows().length).toBe(3);
        flush();
      }));
    });

    describe('responsive', () => {
      it('should display the table correctly on mobile', fakeAsync(() => {
        viewport.set('mobile');
        window.dispatchEvent(new Event('resize'));
        createTestComponent(BasicComponent);
        tick(THROTTLE_TIME);
        fixture.detectChanges();

        const rowElements = fixture.debugElement.queryAll(By.css('tr'));
        expect(rowElements).toHaveLength(3);

        // 11 mobile columns + 1 placeholder
        expect(rowElements[0].queryAll(By.css('th'))).toHaveLength(12);
        expect(rowElements[1].queryAll(By.css('td'))).toHaveLength(12);
        expect(rowElements[2].queryAll(By.css('td'))).toHaveLength(12);
        flush();
      }));
    });
  });
});

describe('NxComparisonTableRowGroupDirective using injection token', () => {
  let fixture: ComponentFixture<RowGroupTest>;
  let testInstance: RowGroupTest;

  function createTestComponent(component: Type<RowGroupTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
  }

  beforeEach(waitForAsync(() => {
    comparisonTableDefaultOptions.useFullRowForExpandableArea = true;
    TestBed.configureTestingModule({
      imports: [NxComparisonTableModule, BasicComponent, ConfigurableComponent],
      providers: [
        { provide: COMPARISON_TABLE_DEFAULT_OPTIONS, useValue: comparisonTableDefaultOptions },
      ],
    });
    TestBed.compileComponents();
  }));

  it('reads useFullRowForExpandableArea from injection token', inject(
    [COMPARISON_TABLE_DEFAULT_OPTIONS],
    (defaultOptions: ComparisonTableDefaultOptions) => {
      createTestComponent(BasicComponent);
      expect(testInstance.rowGroupDirective.useFullRowForExpandableArea).toBe(true);

      defaultOptions.useFullRowForExpandableArea = false;
      fixture.detectChanges();
      expect(testInstance.rowGroupDirective.useFullRowForExpandableArea).toBe(false);
    },
  ));

  it('useFullRowForExpandableArea can be overwritten when injection token is used', () => {
    createTestComponent(ConfigurableComponent);
    testInstance.useFullRowForExpandableArea = true;
    fixture.detectChanges();
    expect(testInstance.rowGroupDirective.useFullRowForExpandableArea).toBe(true);
  });
});

function flush() {
  // flush placeholder for fakeAsync consistency
}

@Component({
  selector: 'test-comparison-table-row-group-basic-component',
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRowGroup>
        @for (i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; track i) {
          <ng-container nxComparisonTableRow>
            <nx-comparison-table-description-cell
              >This is a description cell</nx-comparison-table-description-cell
            >
            <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
            <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
          </ng-container>
        }
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class BasicComponent extends RowGroupTest {}

@Component({
  selector: 'test-comparison-table-row-group-configurable-component',
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
        @for (i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; track i) {
          <ng-container nxComparisonTableRow>
            <nx-comparison-table-description-cell
              >This is a description cell</nx-comparison-table-description-cell
            >
            <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
            <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
          </ng-container>
        }
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell
          >This is a description cell</nx-comparison-table-description-cell
        >
        <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
        <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ConfigurableComponent extends RowGroupTest {}

@Component({
  selector: 'test-comparison-table-row-group-toggle-section-component',
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header
          >Toggle section header</nx-comparison-table-toggle-section-header
        >
        <ng-container nxComparisonTableRowGroup>
          @for (i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; track i) {
            <ng-container nxComparisonTableRow>
              <nx-comparison-table-description-cell
                >This is a description cell</nx-comparison-table-description-cell
              >
              <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
              <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
            </ng-container>
          }
        </ng-container>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ToggleSectionComponent extends RowGroupTest {}
