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

import { NxComparisonTableModule } from '../comparison-table.module';
import { BASIC_COMPARISON_TABLE_TEMPLATE } from '../comparison-table.test-utils';
import { NxComparisonTableDescriptionCell } from '../description-cell/description-cell.component';
import { NxToggleSectionDirective } from '../toggle-section/toggle-section.directive';
import { NxComparisonTableCell } from './cell.component';

declare let viewport: any;
const THROTTLE_TIME = 200;

@Directive({ standalone: true })
abstract class CellTest {
  @ViewChildren(NxComparisonTableCell)
  cellInstances!: QueryList<NxComparisonTableCell>;
  @ViewChild(NxComparisonTableDescriptionCell)
  descriptionCellInstance!: NxComparisonTableDescriptionCell;
  @ViewChild(NxToggleSectionDirective)
  toggleSectionInstance!: NxToggleSectionDirective;

  selected = 0;
  headerTestId = 'header-cell-0';
  isError = false;
}

describe('NxComparisonTableCell', () => {
  let fixture: ComponentFixture<CellTest>;
  let testInstance: CellTest;
  let cellInstances: QueryList<NxComparisonTableCell>;
  let cellElements: DebugElement[];
  let descriptionCellInstance: NxComparisonTableDescriptionCell;
  let toggleSectionInstance: NxToggleSectionDirective;

  function createTestComponent(component: Type<CellTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    cellInstances = testInstance.cellInstances;
    descriptionCellInstance = testInstance.descriptionCellInstance;
    toggleSectionInstance = testInstance.toggleSectionInstance;
    cellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__cell'));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxComparisonTableModule,
        BasicCellComponent,
        ConfigurableCellComponent,
        ToggleSectionCellComponent,
        MultiColumnCellComponent,
        HeaderSlotsCellComponent,
        MisplacedHeaderSlotCellComponent,
      ],
    });
    TestBed.compileComponents();
  }));

  describe('basic', () => {
    it('renders the content', () => {
      createTestComponent(BasicCellComponent);
      expect(cellElements).toHaveLength(3);
      expect(cellElements[0].nativeElement.textContent).toBe('This is a header cell');
      expect(cellElements[1].nativeElement.textContent).toBe('This is a cell');
      expect(cellElements[2].nativeElement.textContent).toBe('This is a footer cell');
    });

    it('should set ids correctly', () => {
      createTestComponent(BasicCellComponent);
      cellInstances.forEach((cell) => {
        expect(cell.id).toMatch(/nx-comparison-table-cell-\d+$/);
      });
      cellElements.forEach((cell) => {
        expect(cell.nativeElement.id).toMatch(/nx-comparison-table-cell-\d+$/);
      });
    });

    it('should set id on input change', () => {
      createTestComponent(ConfigurableCellComponent);
      expect(cellInstances.toArray()[0].id).toBe('header-cell-0');
      expect(cellElements[0].nativeElement.id).toBe('header-cell-0');

      testInstance.headerTestId = 'header-test-cell';
      fixture.detectChanges();
      expect(cellInstances.toArray()[0].id).toBe('header-test-cell');
      expect(cellElements[0].nativeElement.id).toBe('header-test-cell');
    });

    it('should set the type correctly and has default type "content"', () => {
      createTestComponent(ConfigurableCellComponent);
      expect(cellInstances.toArray()[0].type).toBe('header');
      expect(cellInstances.toArray()[1].type).toBe('content');
      expect(cellInstances.toArray()[2].type).toBe('footer');
    });

    it('should set is-error class when table is error', () => {
      createTestComponent(ConfigurableCellComponent);
      const contentCell = cellElements[0].nativeElement;

      testInstance.isError = true;
      fixture.detectChanges();

      expect(contentCell.classList.contains('is-error')).toBeTruthy();
    });
  });

  describe('responsive behaviour', () => {
    it('renders the content (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicCellComponent);

      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const mobileHeaderCell = fixture.debugElement.query(
        By.css('.nx-comparison-table__mobile-header-cell'),
      );
      expect(mobileHeaderCell.nativeElement.textContent).toBe('This is a header cell');

      cellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__cell'));
      expect(cellElements[0].nativeElement.textContent).toBe('This is a cell');

      // there should not be a footer cell on mobile
      expect(cellElements).toHaveLength(1);
    }));

    it('should set id correctly (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(ConfigurableCellComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const mobileHeaderCell = fixture.debugElement.query(
        By.css('.nx-comparison-table__mobile-header-cell'),
      );
      expect(mobileHeaderCell.nativeElement.id).toBe('header-cell-0');
      cellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__cell'));
      expect(cellElements[0].nativeElement.id).toMatch(/nx-comparison-table-cell-\d+$/);
    }));
  });

  describe('a11y', () => {
    it('should use native header/data cell elements (desktop / tablet)', fakeAsync(() => {
      createTestComponent(BasicCellComponent);

      // Header cell is a <th scope="col">; content/footer cells are <td>. Native semantics
      // provide the columnheader/cell roles, so no explicit role attributes are set.
      expect(cellElements[0].nativeElement.tagName).toBe('TH');
      expect(cellElements[0].nativeElement.getAttribute('scope')).toBe('col');
      expect(cellElements[1].nativeElement.tagName).toBe('TD');
      expect(cellElements[2].nativeElement.tagName).toBe('TD');

      viewport.set('tablet');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicCellComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      expect(cellElements[0].nativeElement.tagName).toBe('TH');
      expect(cellElements[0].nativeElement.getAttribute('scope')).toBe('col');
      expect(cellElements[1].nativeElement.tagName).toBe('TD');
      expect(cellElements[2].nativeElement.tagName).toBe('TD');
      flush();
    }));

    it('should have set the scope correctly (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicCellComponent);

      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const mobileHeaderCell = fixture.debugElement.query(
        By.css('.nx-comparison-table__mobile-header-cell'),
      );
      expect(mobileHeaderCell.attributes.scope).toBe('row');

      cellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__cell'));
      expect(cellElements[0].attributes.scope).toBe('');
    }));

    it('should have set the correct headers', fakeAsync(() => {
      createTestComponent(ConfigurableCellComponent);
      tick(THROTTLE_TIME);

      let headers = cellInstances.toArray()[1]._headerIds();
      expect(headers.split(' ')).toHaveLength(2);
      expect(headers).toContain('header-cell-0');
      expect(headers).toContain(descriptionCellInstance.id);

      testInstance.headerTestId = 'header-test-cell';
      fixture.detectChanges();
      headers = cellInstances.toArray()[1]._headerIds();
      expect(headers).toContain('header-test-cell');
      expect(headers).toContain(descriptionCellInstance.id);
    }));

    it('should have set the correct headers (with a toggle section) (desktop)', () => {
      createTestComponent(ToggleSectionCellComponent);

      const headers = cellElements[1].attributes.headers;
      expect(headers?.split(' ')).toHaveLength(3);
      expect(headers).toContain(cellInstances.toArray()[0].id);
      expect(headers).toContain(descriptionCellInstance.id);
      expect(headers).toContain(toggleSectionInstance.toggleSectionHeader().id);
    });

    it('should have set the correct headers (with a toggle section) (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(ToggleSectionCellComponent);

      tick(THROTTLE_TIME);
      fixture.detectChanges();

      cellElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__cell'));
      const headers = cellElements[0].attributes.headers;
      expect(headers?.split(' ')).toHaveLength(3);
      expect(headers).toContain(cellInstances.toArray()[0].id);
      expect(headers).toContain(descriptionCellInstance.id);
      expect(headers).toContain(toggleSectionInstance.toggleSectionHeader().id);
    }));

    it('has no accessibility violations', async () => {
      createTestComponent(BasicCellComponent);

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

  describe('computed signals', () => {
    it('should apply first and last classes correctly', () => {
      createTestComponent(MultiColumnCellComponent);
      const headerCells = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__header-cell'),
      );
      expect(headerCells[0].nativeElement).toHaveClass('first');
      expect(headerCells[0].nativeElement).not.toHaveClass('last');
      expect(headerCells[1].nativeElement).not.toHaveClass('first');
      expect(headerCells[1].nativeElement).not.toHaveClass('last');
      expect(headerCells[2].nativeElement).not.toHaveClass('first');
      expect(headerCells[2].nativeElement).toHaveClass('last');
    });

    it('should apply has-popular-above class on correct header cell', () => {
      createTestComponent(MultiColumnCellComponent);
      const headerCells = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__header-cell'),
      );
      expect(headerCells[0].nativeElement).toHaveClass('has-popular-above');
      expect(headerCells[1].nativeElement).not.toHaveClass('has-popular-above');
      expect(headerCells[2].nativeElement).not.toHaveClass('has-popular-above');
    });
  });

  describe('header cell slots', () => {
    it('renders the default-variant slots in a fixed order, regardless of source order', () => {
      createTestComponent(HeaderSlotsCellComponent);
      const headerCell = cellElements[0].nativeElement as HTMLElement;
      const texts = Array.from(headerCell.querySelectorAll('[data-slot]')).map((el) =>
        (el as HTMLElement).textContent?.trim(),
      );
      expect(texts).toEqual(['Top', 'Eyebrow', 'Title', 'Price', 'Select']);
    });

    it('still renders unstructured content via the catch-all', () => {
      createTestComponent(HeaderSlotsCellComponent);
      const headerCell = cellElements[0].nativeElement as HTMLElement;
      expect(headerCell.textContent).toContain('Unstructured extra');
    });

    // The slots are directives, so they inherit no display of their own — left inline they would
    // run the title into the price instead of stacking, and the cell's own spacing would not apply.
    it('lays the slots out as blocks and aligns the price to the end of the cell', () => {
      createTestComponent(HeaderSlotsCellComponent);
      const headerCell = cellElements[0].nativeElement as HTMLElement;
      const displayOf = (selector: string) =>
        getComputedStyle(headerCell.querySelector(selector)!).display;

      expect(displayOf('nx-comparison-table-header-top')).toBe('block');
      expect(displayOf('nx-comparison-table-header-eyebrow')).toBe('grid');
      expect(displayOf('nx-comparison-table-header-title')).toBe('block');

      const price = getComputedStyle(headerCell.querySelector('nx-comparison-table-header-price')!);
      expect(price.display).toBe('block');
      expect(price.alignSelf).toBe('flex-end');
    });

    it('renders a select button in a footer cell', () => {
      createTestComponent(FooterSelectButtonCellComponent);
      const footerCell = cellElements[1].nativeElement as HTMLElement;
      expect(footerCell.querySelector('button[nxComparisonTableSelectButton]')).toBeTruthy();
      expect(footerCell.textContent).toContain('Footer note');
    });

    it('renders header-slot content on a non-header cell instead of dropping it', () => {
      // Projection is resolved statically: gating these slots on `type === "header"` made a
      // misplaced slot swallow its content silently rather than fall through to the catch-all.
      createTestComponent(MisplacedHeaderSlotCellComponent);
      const contentCell = fixture.debugElement.query(
        By.css('.nx-comparison-table__cell:not(.nx-comparison-table__header-cell)'),
      ).nativeElement as HTMLElement;
      expect(contentCell.textContent).toContain('Misplaced title');
    });
  });
});

@Component({
  selector: 'test-basic-cell-component',
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">Header</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">
          <button nxComparisonTableSelectButton unselectedLabel="Select"></button>
          <span>Footer note</span>
        </nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  imports: [NxComparisonTableModule],
})
class FooterSelectButtonCellComponent extends CellTest {}

@Component({
  selector: 'test-basic-cell',
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell
          >This is a description cell</nx-comparison-table-description-cell
        >
        <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class BasicCellComponent extends CellTest {}

@Component({
  selector: 'test-configurable-cell-component',
  template: `
    <nx-comparison-table [selectedIndex]="selected" [isError]="isError">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header" [id]="headerTestId"
          >This is a header cell</nx-comparison-table-cell
        >
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell
          >This is a description cell</nx-comparison-table-description-cell
        >
        <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ConfigurableCellComponent extends CellTest {}

@Component({
  selector: 'test-toggle-section-cell-component',
  template: BASIC_COMPARISON_TABLE_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class ToggleSectionCellComponent extends CellTest {
  data = [
    { type: 'header', cells: ['This is a header cell'] },
    {
      type: 'toggleSection',
      header: 'Toggle section header',
      content: [
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is an intersection cell'],
        },
      ],
    },
    { type: 'footer', cells: ['This is a footer cell'] },
  ];
}

@Component({
  selector: 'test-multi-column-cell-component',
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">
          <nx-comparison-table-popular-cell [forColumn]="1"
            >Popular</nx-comparison-table-popular-cell
          >
          H1
        </nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">H2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">H3</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Desc</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>A</nx-comparison-table-cell>
        <nx-comparison-table-cell>B</nx-comparison-table-cell>
        <nx-comparison-table-cell>C</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">F1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="footer">F3</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  imports: [NxComparisonTableModule],
})
class MultiColumnCellComponent extends CellTest {}

@Component({
  selector: 'test-header-slots-cell',
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">
          <nx-comparison-table-header-price data-slot>Price</nx-comparison-table-header-price>
          <nx-comparison-table-header-title data-slot>Title</nx-comparison-table-header-title>
          <span>Unstructured extra</span>
          <button data-slot nxComparisonTableSelectButton unselectedLabel="Select"></button>
          <nx-comparison-table-header-top data-slot>Top</nx-comparison-table-header-top>
          <nx-comparison-table-header-eyebrow data-slot>Eyebrow</nx-comparison-table-header-eyebrow>
        </nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  imports: [NxComparisonTableModule],
})
class HeaderSlotsCellComponent extends CellTest {}

@Component({
  selector: 'test-misplaced-header-slot-cell',
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">Header</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableRow>
        <nx-comparison-table-description-cell>Desc</nx-comparison-table-description-cell>
        <nx-comparison-table-cell>
          <nx-comparison-table-header-title>Misplaced title</nx-comparison-table-header-title>
        </nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  imports: [NxComparisonTableModule],
})
class MisplacedHeaderSlotCellComponent extends CellTest {}
