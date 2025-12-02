import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, DebugElement, Directive, QueryList, Type, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../../cdk-test-utils';
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
      imports: [NxComparisonTableModule, BasicComponent, IdTestingComponent],
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
      const wrapper = headerElements[0].nativeElement.querySelector(
        '.nx-comparison-table-toggle-section__header-wrapper',
      );
      expect(wrapper.id).toMatch(/nx-comparison-table-toggle-section-header-\d+$/);
    });

    it('should set id on input change', () => {
      createTestComponent(IdTestingComponent);
      expect(headerInstances.toArray()[1].id).toBe('toggle-header');
      let wrapper = headerElements[1].nativeElement.querySelector(
        '.nx-comparison-table-toggle-section__header-wrapper',
      );
      expect(wrapper.id).toBe('toggle-header');

      testInstance.headerId = 'test-toggle-header';
      fixture.detectChanges();
      expect(headerInstances.toArray()[1].id).toBe('test-toggle-header');
      wrapper = headerElements[1].nativeElement.querySelector(
        '.nx-comparison-table-toggle-section__header-wrapper',
      );
      expect(wrapper.id).toBe('test-toggle-header');
    });

    it('should call toggle() on desktop', fakeAsync(() => {
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBeTrue();

      const spy = spyOn(headerInstances.toArray()[0], 'toggle').and.callThrough();
      const wrapper = headerElements[0].nativeElement.querySelector(
        '.nx-comparison-table-toggle-section__header-wrapper',
      );
      wrapper.click();
      tick();
      fixture.detectChanges();
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBeFalse();
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

      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBeTrue();
      const spy = spyOn(headerInstances.toArray()[0], 'toggle').and.callThrough();
      mobileHeaderElements = fixture.debugElement.queryAll(
        By.css('.nx-comparison-table__mobile-toggle-section-header'),
      );
      mobileHeaderElements[0].nativeElement.click();
      tick();
      fixture.detectChanges();
      tick();

      expect(spy).not.toHaveBeenCalled();
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBeTrue();
    }));
  });

  describe('a11y', () => {
    it('should have set the correct roles / scopes (desktop)', fakeAsync(() => {
      createTestComponent(BasicComponent);
      tick(THROTTLE_TIME);
      expect(headerElements[0].attributes.role).toBe('row');
      const wrapper = headerElements[0].nativeElement.querySelector(
        '.nx-comparison-table-toggle-section__header-wrapper',
      ) as HTMLElement;
      expect(wrapper.getAttribute('role')).toBe('rowheader');
      expect(wrapper.getAttribute('aria-colspan')).toBe('2');
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
      let wrapper = headerElements[0].nativeElement.querySelector(
        '.nx-comparison-table-toggle-section__header-wrapper',
      ) as HTMLElement;
      expect(wrapper.getAttribute('aria-expanded')).toBe('true');

      // collapsed toggle section
      wrapper = headerElements[1].nativeElement.querySelector(
        '.nx-comparison-table-toggle-section__header-wrapper',
      ) as HTMLElement;
      expect(wrapper.getAttribute('aria-expanded')).toBe('false');
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
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBeTrue();

      const wrapper = headerElements[0].nativeElement.querySelector(
        '.nx-comparison-table-toggle-section__header-wrapper',
      ) as HTMLElement;
      dispatchKeyboardEvent(wrapper, 'keydown', ENTER);
      fixture.detectChanges();
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBeFalse();

      dispatchKeyboardEvent(wrapper, 'keydown', SPACE);
      fixture.detectChanges();
      expect(headerInstances.toArray()[0]._toggleSection.isExpanded).toBeTrue();
    });
  });
});

@Component({
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
  imports: [NxComparisonTableModule],
})
class IdTestingComponent extends ToggleSectionTest {}
