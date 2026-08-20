import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  QueryList,
  signal,
  Type,
  ViewChildren,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../../cdk-test-utils';
import { NxComparisonTableBreakpoint } from '../comparison-table.models';
import { NxComparisonTableModule } from '../comparison-table.module';
import { NxToggleSectionHeaderComponent } from './toggle-section-header.component';

declare let viewport: any;
const THROTTLE_TIME = 200;

@Directive({ standalone: true })
abstract class ToggleSectionTest {
  @ViewChildren(NxToggleSectionHeaderComponent)
  headerInstances!: QueryList<NxToggleSectionHeaderComponent>;

  headerId = 'toggle-header';
}

describe('ToggleSectionHeaderComponent', () => {
  let fixture: ComponentFixture<ToggleSectionTest>;
  let testInstance: ToggleSectionTest;
  let headerInstances: QueryList<NxToggleSectionHeaderComponent>;
  let headerElements: DebugElement[];
  let mobileHeaderElements: DebugElement[];

  function createTestComponent(component: Type<ToggleSectionTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    headerInstances = testInstance.headerInstances;
    headerElements = fixture.debugElement.queryAll(
      By.css('.nx-comparison-table__toggle-section-header'),
    );
    mobileHeaderElements = fixture.debugElement.queryAll(
      By.css('.nx-comparison-table__mobile-toggle-section-header'),
    );
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxComparisonTableModule,
        BasicComponent,
        IdTestingComponent,
        OverflowToggleComponent,
      ],
    });
    TestBed.compileComponents();
  }));

  describe('basic', () => {
    it('renders the content', () => {
      createTestComponent(BasicComponent);
      expect(headerElements[0].nativeElement.textContent.trim()).toBe('Toggle section header');
      expect(headerElements[1].nativeElement.textContent.trim()).toBe(
        'Second toggle section header',
      );
    });

    it('should set ids correctly', () => {
      createTestComponent(BasicComponent);
      expect(headerInstances.toArray()[0].id).toMatch(
        /nx-comparison-table-toggle-section-header-\d+$/,
      );
      // The id lives on the real <th> (so the content cells' headers= can reference a <th>).
      const cell = headerElements[0].nativeElement.querySelector(
        '.nx-comparison-table__toggle-section-header-cell',
      );
      expect(cell.id).toMatch(/nx-comparison-table-toggle-section-header-\d+$/);
    });

    it('should set id on input change', () => {
      createTestComponent(IdTestingComponent);
      expect(headerInstances.toArray()[1].id).toBe('toggle-header');
      let cell = headerElements[1].nativeElement.querySelector(
        '.nx-comparison-table__toggle-section-header-cell',
      );
      expect(cell.id).toBe('toggle-header');

      testInstance.headerId = 'test-toggle-header';
      fixture.detectChanges();
      expect(headerInstances.toArray()[1].id).toBe('test-toggle-header');
      cell = headerElements[1].nativeElement.querySelector(
        '.nx-comparison-table__toggle-section-header-cell',
      );
      expect(cell.id).toBe('test-toggle-header');
    });

    it('should toggle the section when the header cell is clicked (desktop)', fakeAsync(() => {
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBe(true);

      // The interactive element is the host <th> in the table template.
      const headerCell = headerElements[0].query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      );
      headerCell.nativeElement.click();
      tick();
      fixture.detectChanges();
      tick();

      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBe(false);
    }));
  });

  describe('responsive', () => {
    it('renders the content (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      mobileHeaderElements = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__mobile-toggle-section-header'),
      );
      expect(mobileHeaderElements[0].nativeElement.textContent).toBe('Toggle section header');
      expect(mobileHeaderElements[1].nativeElement.textContent).toBe(
        'Second toggle section header',
      );
    }));

    it('should set ids correctly (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(IdTestingComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();
      mobileHeaderElements = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__mobile-toggle-section-header'),
      );
      expect(mobileHeaderElements[0].nativeElement.id).toMatch(
        /nx-comparison-table-toggle-section-header-\d+$/,
      );
    }));

    it('should not call toggle() on mobile', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicComponent);

      tick(THROTTLE_TIME);
      fixture.detectChanges();

      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBe(true);
      const spy = vi.spyOn(headerInstances.toArray()[0], 'toggle');
      mobileHeaderElements = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__mobile-toggle-section-header'),
      );
      mobileHeaderElements[0].nativeElement.click();
      tick();
      fixture.detectChanges();
      tick();

      expect(spy).not.toHaveBeenCalled();
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBe(true);
    }));
  });

  describe('a11y', () => {
    it('should have set the correct roles / scopes (desktop)', fakeAsync(() => {
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      // The row carries role="row"; the interactive header cell carries scope="colgroup".
      expect(headerElements[0].attributes.role).toBe('row');
      const cell = headerElements[0].query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      );
      expect(cell.nativeElement.getAttribute('scope')).toBe('colgroup');
    }));

    it('should have set the correct roles / scopes (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      mobileHeaderElements = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__mobile-toggle-section-header'),
      );
      expect(mobileHeaderElements[0].attributes.role).toBeUndefined();
      expect(mobileHeaderElements[0].attributes.scope).toBe('col');
      expect(mobileHeaderElements[0].attributes.colspan).toBe('1');
    }));

    it('should have set the correct aria-expanded (desktop)', () => {
      createTestComponent(BasicComponent);

      // expanded toggle section
      let cell = headerElements[0].query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      );
      expect(cell.nativeElement.getAttribute('aria-expanded')).toBe('true');

      // collapsed toggle section
      cell = headerElements[1].query(By.css('.nx-comparison-table__toggle-section-header-cell'));
      expect(cell.nativeElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('should not have set aria-expanded (mobile)', fakeAsync(() => {
      viewport.set('mobile');
      window.dispatchEvent(new Event('resize'));

      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      mobileHeaderElements = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__mobile-toggle-section-header'),
      );
      expect(mobileHeaderElements[0].attributes['aria-expanded']).toBeUndefined();
      expect(mobileHeaderElements[1].attributes['aria-expanded']).toBeUndefined();
    }));

    it('should toggle the section on ENTER and SPACE', () => {
      createTestComponent(BasicComponent);
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBe(true);

      const cell = headerElements[0].query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      ).nativeElement as HTMLElement;
      dispatchKeyboardEvent(cell, 'keydown', 0, 'Enter');
      fixture.detectChanges();
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBe(false);

      dispatchKeyboardEvent(cell, 'keydown', 0, ' ');
      fixture.detectChanges();
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBe(true);
    });
  });

  describe('overflow mode', () => {
    it('should toggle when clicking the full-width header cell', fakeAsync(() => {
      viewport.set('desktop');
      window.dispatchEvent(new Event('resize'));
      createTestComponent(OverflowToggleComponent);
      tick(THROTTLE_TIME);
      fixture.detectChanges();

      const headerCell = fixture.debugElement.query(
        By.css('.nx-comparison-table__toggle-section-header-cell'),
      );

      const expanded = headerInstances.toArray()[0]._toggleSection.isExpanded;
      headerCell.nativeElement.click();
      tick();
      fixture.detectChanges();
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBe(!expanded);
    }));
  });
});

@Component({
  selector: 'test-toggle-section-header-basic-component',
  template: `
    <nx-comparison-table>
      @for (el of data; track el) {
        @let element = $any(el);
        @if (element['type'] === 'toggleSection') {
          <ng-container nxComparisonTableToggleSection [isExpanded]="element['expanded']">
            <nx-comparison-table-toggle-section-header>{{
              element['header']
            }}</nx-comparison-table-toggle-section-header>
            @for (row of element['content']; track row) {
              <ng-container nxComparisonTableRow>
                @if (row['description']) {
                  <nx-comparison-table-description-cell>{{
                    row['description']
                  }}</nx-comparison-table-description-cell>
                }
                >
                @for (cell of row['cells']; track cell) {
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
          <ng-container nxComparisonTableRow [type]="$any(element)['type']">
            @if (element['description']) {
              <nx-comparison-table-description-cell>{{
                element['description']
              }}</nx-comparison-table-description-cell>
            }
            >
            @for (cell of element['cells']; track cell) {
              <nx-comparison-table-cell [type]="$any(element)['type']">{{
                cell
              }}</nx-comparison-table-cell>
            }
            @if ($any(element)['intersection']) {
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
class BasicComponent extends ToggleSectionTest {
  data = [
    { type: 'header', cells: ['This is a header cell'] },
    {
      type: 'toggleSection',
      header: 'Toggle section header',
      expanded: true,
      content: [
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell'] },
      ],
    },
    {
      type: 'toggleSection',
      header: 'Second toggle section header',
      expanded: false,
      content: [
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell'] },
      ],
    },
    { type: 'footer', cells: ['This is a footer cell'] },
  ];
}

@Component({
  selector: 'test-id-testing-component',
  template: `
    <nx-comparison-table>
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableToggleSection>
        <nx-comparison-table-toggle-section-header
          >Toggle section header</nx-comparison-table-toggle-section-header
        >
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell
            >This is a description cell</nx-comparison-table-description-cell
          >
          <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
      <ng-container nxComparisonTableToggleSection [isExpanded]="false">
        <nx-comparison-table-toggle-section-header [id]="headerId"
          >Second toggle section header</nx-comparison-table-toggle-section-header
        >
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell
            >This is a description cell</nx-comparison-table-description-cell
          >
          <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
        </ng-container>
      </ng-container>
      <ng-container nxComparisonTableRow type="footer">
        <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableModule],
})
class IdTestingComponent extends ToggleSectionTest {}

@Component({
  selector: 'test-overflow-toggle-component',
  template: `
    <nx-comparison-table [responsiveBreakpoints]="breakpoints" style="width: 600px;">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">Product 1</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">Product 2</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">Product 3</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">Product 4</nx-comparison-table-cell>
        <nx-comparison-table-cell type="header">Product 5</nx-comparison-table-cell>
      </ng-container>
      <ng-container nxComparisonTableToggleSection [isExpanded]="true">
        <nx-comparison-table-toggle-section-header
          >Toggle section header</nx-comparison-table-toggle-section-header
        >
        <ng-container nxComparisonTableRow>
          <nx-comparison-table-description-cell>Description</nx-comparison-table-description-cell>
          <nx-comparison-table-cell>A</nx-comparison-table-cell>
          <nx-comparison-table-cell>B</nx-comparison-table-cell>
          <nx-comparison-table-cell>C</nx-comparison-table-cell>
          <nx-comparison-table-cell>D</nx-comparison-table-cell>
          <nx-comparison-table-cell>E</nx-comparison-table-cell>
        </ng-container>
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
  imports: [NxComparisonTableModule],
  // A1 enables carousel/overflow mode; scoped to this host so it doesn't flip other hosts to tablet.
  providers: [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }],
})
class OverflowToggleComponent extends ToggleSectionTest {
  breakpoints: NxComparisonTableBreakpoint[] = [{ minWidth: 0, columns: 3 }];
}
