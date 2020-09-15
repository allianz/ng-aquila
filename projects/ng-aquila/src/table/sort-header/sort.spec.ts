import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { ViewChild, Component, Type, Directive } from '@angular/core';
import { inject } from '@angular/core/testing';
import { SortDirection, SortEvent } from './sort.directive';
import { NxSortHeaderComponent } from './sort-header.component';
import { NxTableModule } from '../table.module';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { dispatchKeyboardEvent } from '../../cdk-test-utils';
import { NxSortHeaderIntl } from './sort-header-intl';

interface DataStructure {
  name: string;
  count: number;
}

class MyIntl extends NxSortHeaderIntl {
  sortAscendingAriaLabel = 'aufsteigend sortieren';
  sortDescendingAriaLabel = 'absteigend sortieren';
}

@Directive()
abstract class SortHeaderTest {
  @ViewChild('nameHeader') nameHeader: NxSortHeaderComponent;
  @ViewChild('countHeader') countHeader: NxSortHeaderComponent;

  active: string = 'name';
  direction: SortDirection = 'desc';
  data: DataStructure[] = [
    { name: 'rabbit', count: 5 },
    { name: 'bunny', count: 15 },
    { name: 'coney', count: 1000 }
  ];

  sortTable(sort: SortEvent) {
    this.data = this.data.sort((a, b) => {
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, sort.direction);
        case 'count': return this.compare(a.count, b.count, sort.direction);
        default: return 0;
      }
    });
  }

  compare(a: string | number, b: string | number, direction: SortDirection) {
      return (a < b ? -1 : 1) * (direction === 'asc' ? 1 : -1);
  }
}

describe ('NxSort', () => {
  let fixture: ComponentFixture<SortHeaderTest>;
  let testInstance: SortHeaderTest;
  let nameHeader: NxSortHeaderComponent;
  let countHeader: NxSortHeaderComponent;

  function createTestComponent(component: Type<SortHeaderTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    nameHeader = testInstance.nameHeader;
    countHeader = testInstance.countHeader;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicSortTableComponent,
        ConfigurableSortTableComponent
      ],
      imports: [NxTableModule],
      providers: [
        {provide: NxSortHeaderIntl, useClass: MyIntl}
      ]
    }).compileComponents();
  }));

  describe('basic', () => {

    it('creates the component', () => {
      createTestComponent(BasicSortTableComponent);
      expect(nameHeader).toBeTruthy();
      expect(countHeader).toBeTruthy();
    });

    it('renders table without sorting', () => {
      createTestComponent(BasicSortTableComponent);
      expect(testInstance.data).toEqual(
        [{ name: 'rabbit', count: 5 }, { name: 'bunny', count: 15 }, { name: 'coney', count: 1000 }]
      );
    });

    it('sorts ascending on click', () => {
      createTestComponent(BasicSortTableComponent);

      const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
      nameHeaderElement.click();
      fixture.detectChanges();

      expect(testInstance.data).toEqual(
        [{ name: 'bunny', count: 15 }, { name: 'coney', count: 1000 }, { name: 'rabbit', count: 5}]
      );
    });

    it('sorts descending on second click', () => {
      createTestComponent(BasicSortTableComponent);

      const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
      nameHeaderElement.click();
      nameHeaderElement.click();
      fixture.detectChanges();

      expect(testInstance.data).toEqual(
        [{ name: 'rabbit', count: 5}, { name: 'coney', count: 1000 }, { name: 'bunny', count: 15 }]
      );
    });
  });

  describe('icons', () => {
    it('shows both icons for a unsorted column', () => {
      createTestComponent(BasicSortTableComponent);
      const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
      const chevronUpElement = <HTMLElement>nameHeaderElement.querySelector('.nx-sort-header__icon-up');
      const chevronDownElement = <HTMLElement>nameHeaderElement.querySelector('.nx-sort-header__icon-down');

      expect(chevronUpElement.classList).not.toContain('.nx-sort-header__hidden-icon');
      expect(chevronDownElement.classList).not.toContain('.nx-sort-header__hidden-icon');

      const countHeaderElement = fixture.nativeElement.querySelector('#countHeader');
      countHeaderElement.click();
      fixture.detectChanges();

      expect(chevronUpElement.classList).not.toContain('nx-sort-header__hidden-icon');
      expect(chevronDownElement.classList).not.toContain('nx-sort-header__hidden-icon');
    });

    it('hides one icon when sorted', () => {
      createTestComponent(BasicSortTableComponent);

      const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
      const chevronUpElement = <HTMLElement>nameHeaderElement.querySelector('.nx-sort-header__icon-up');
      const chevronDownElement = <HTMLElement>nameHeaderElement.querySelector('.nx-sort-header__icon-down');

      // sort ascending
      nameHeaderElement.click();
      fixture.detectChanges();
      expect(chevronUpElement.classList).not.toContain('nx-sort-header__hidden-icon');
      expect(chevronDownElement.classList).toContain('nx-sort-header__hidden-icon');

      // sort descending
      nameHeaderElement.click();
      fixture.detectChanges();
      expect(chevronUpElement.classList).toContain('nx-sort-header__hidden-icon');
      expect(chevronDownElement.classList).not.toContain('nx-sort-header__hidden-icon');

      const countHeaderElement = fixture.nativeElement.querySelector('#countHeader');
      countHeaderElement.click();
      fixture.detectChanges();
      expect(chevronUpElement.classList).not.toContain('nx-sort-header__hidden-icon');
      expect(chevronDownElement.classList).not.toContain('nx-sort-header__hidden-icon');
    });
  });

  describe('configurable tests', () => {
    it('creates table with initial sorting', () => {
      createTestComponent(ConfigurableSortTableComponent);
      expect(testInstance.data).toEqual(
        [{ name: 'rabbit', count: 5}, { name: 'coney', count: 1000 }, { name: 'bunny', count: 15 }]
      );
    });

    it('sorts after active change', () => {
      createTestComponent(ConfigurableSortTableComponent);
      testInstance.active = 'count';
      fixture.detectChanges();
      expect(testInstance.data).toEqual(
        [{ name: 'coney', count: 1000 }, { name: 'bunny', count: 15 }, { name: 'rabbit', count: 5}]
      );
    });

    it('sorts after direction change', () => {
      createTestComponent(ConfigurableSortTableComponent);
      testInstance.direction = 'asc';
      fixture.detectChanges();
      expect(testInstance.data).toEqual(
        [{ name: 'bunny', count: 15 }, { name: 'coney', count: 1000 }, { name: 'rabbit', count: 5}]
      );
    });

    it('still sorts on click when inputs are set in code', () => {
      createTestComponent(ConfigurableSortTableComponent);
      const countHeaderElement = fixture.nativeElement.querySelector('#countHeader');
      countHeaderElement.click();
      fixture.detectChanges();

      expect(testInstance.data).toEqual(
        [{ name: 'rabbit', count: 5}, { name: 'bunny', count: 15 }, { name: 'coney', count: 1000 }]
      );
      expect(testInstance.active).toBe('count');
      expect(testInstance.direction).toBe('asc');
    });
  });

  describe('a11y', () => {
    it('has the correct aria label for an unsorted column', () => {
      createTestComponent(BasicSortTableComponent);
      const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader .nx-sort-header__icons-container');
      expect(nameHeaderElement.getAttribute('aria-label')).toBe('aufsteigend sortieren');
    });

    it('has the correct aria label for a sorted column', () => {
      createTestComponent(BasicSortTableComponent);

      const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader .nx-sort-header__icons-container');
      nameHeaderElement.click();
      fixture.detectChanges();
      expect(nameHeaderElement.getAttribute('aria-label')).toBe('absteigend sortieren');

      nameHeaderElement.click();
      fixture.detectChanges();
      expect(nameHeaderElement.getAttribute('aria-label')).toBe('aufsteigend sortieren');
    });

    it('should rerender when aria labels change', inject([NxSortHeaderIntl],
      (intl: NxSortHeaderIntl) => {
        createTestComponent(BasicSortTableComponent);
        const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader .nx-sort-header__icons-container');
        intl.sortAscendingAriaLabel = 'aufsteigend sortieren nach';
        intl.changes.next();
        fixture.detectChanges();
        expect(nameHeaderElement.getAttribute('aria-label')).toBe('aufsteigend sortieren nach');
    }));

    it('should sort on ENTER press', () => {
      createTestComponent(BasicSortTableComponent);

      const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
      const iconButtonElement = <HTMLDivElement>nameHeaderElement.querySelector('.nx-sort-header__icons-container');
      dispatchKeyboardEvent(iconButtonElement, 'keydown', ENTER);
      fixture.detectChanges();

      expect(testInstance.data).toEqual(
        [{ name: 'bunny', count: 15 }, { name: 'coney', count: 1000 }, { name: 'rabbit', count: 5}]
      );
    });

    it('should sort on SPACE press', () => {
      createTestComponent(BasicSortTableComponent);

      const nameHeaderElement = fixture.nativeElement.querySelector('#nameHeader');
      const iconButtonElement = <HTMLDivElement>nameHeaderElement.querySelector('.nx-sort-header__icons-container');
      dispatchKeyboardEvent(iconButtonElement, 'keydown', SPACE);
      fixture.detectChanges();

      expect(testInstance.data).toEqual(
        [{ name: 'bunny', count: 15 }, { name: 'coney', count: 1000 }, { name: 'rabbit', count: 5}]
      );
    });
  });

});

@Component({
  template: `
    <table nxTable nxSort (sortChange)="sortTable($event)">
    <thead>
      <tr nxTableRow>
        <th nxHeaderCell nxSortHeaderCell="name" #nameHeader id="nameHeader">
          Name
        </th>
        <th nxHeaderCell nxSortHeaderCell="count" #countHeader id="countHeader">
          Count
        </th>
      </tr>
    </thead>
  </table>
  `
})
class BasicSortTableComponent extends SortHeaderTest { }

@Component({
  template: `
    <table nxTable nxSort (sortChange)="sortTable($event)" [(active)]="active" [(direction)]="direction">
    <thead>
      <tr nxTableRow>
        <th nxHeaderCell nxSortHeaderCell="name" #nameHeader id="nameHeader">
          Name
        </th>
        <th nxHeaderCell nxSortHeaderCell="count" #countHeader id="countHeader">
          Count
        </th>
      </tr>
    </thead>
  </table>
  `
})
class ConfigurableSortTableComponent extends SortHeaderTest { }
