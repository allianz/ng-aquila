import { ChangeDetectionStrategy, Component, Type, ViewChild, DebugElement, Directive, ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxTableModule } from '../table.module';
import { NxExpandableTableRowComponent } from './expandable-table-row.component';
import { By } from '@angular/platform-browser';

@Directive()
abstract class ExpandableTableRowTest {
  isExpanded: boolean = true;
  @ViewChild(NxExpandableTableRowComponent) expandableTableRowInstance!: NxExpandableTableRowComponent;

  constructor(public cdr: ChangeDetectorRef) {}
}

describe(NxExpandableTableRowComponent.name, () => {
  let fixture: ComponentFixture<ExpandableTableRowTest>;
  let testInstance: ExpandableTableRowTest;
  let expandableTableRowInstance: NxExpandableTableRowComponent;
  let expandableTableRowElement: DebugElement;

  function createTestComponent(component: Type<ExpandableTableRowTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    expandableTableRowInstance = testInstance.expandableTableRowInstance;
    expandableTableRowElement = fixture.debugElement.query(By.directive(NxExpandableTableRowComponent));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicExpandableTableRowComponent,
        ConfigurableExpandableTableRowComponent
      ],
      imports: [NxTableModule]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicExpandableTableRowComponent);
    });

    it('creates the component', () => {
      expect(expandableTableRowInstance).toBeTruthy();
    });

    it('has the bem class', () => {
      expect(expandableTableRowElement.nativeElement.classList.contains('nx-expandable-table-row')).toBeTruthy();
    });

    it('renders the content', () => {
      expect(expandableTableRowElement.nativeElement.textContent).toBe('example content');
    });
  });

  describe('programmatic', () => {
    beforeEach(() => {
      createTestComponent(BasicExpandableTableRowComponent);
    });

    it('is not expanded', () => {
      expect(expandableTableRowInstance.expanded.value).toBe(false);
    });

    describe('when toggled', () => {
      beforeEach(() => {
        expandableTableRowInstance.toggle();
      });

      it('is expanded', () => {
        expect(expandableTableRowInstance.expanded.value).toBe(true);
      });
    });

    describe('when expanded', () => {
      beforeEach(() => {
        expandableTableRowInstance.expand();
      });

      it('is expanded', () => {
        expect(expandableTableRowInstance.expanded.value).toBe(true);
      });
    });

    describe('when closed', () => {
      beforeEach(() => {
        expandableTableRowInstance.expanded.next(true);
        expandableTableRowInstance.close();
      });

      it('is not expanded', () => {
        expect(expandableTableRowInstance.expanded.value).toBe(false);
      });
    });
  });

  describe('isExpanded input', () => {
    beforeEach(() => {
      createTestComponent(ConfigurableExpandableTableRowComponent);
    });

    it('sets expanded', () => {
      expect(expandableTableRowInstance.expanded.value).toBe(true);
    });

    it('updates expanded on isExpanded change', () => {
      testInstance.isExpanded = false;
      testInstance.cdr.detectChanges();
      expect(expandableTableRowInstance.expanded.value).toBe(false);
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicExpandableTableRowComponent);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  template: `
    <tr nxExpandableTableRow>example content</tr>
 `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class BasicExpandableTableRowComponent extends ExpandableTableRowTest { }

@Component({
  template: `
    <tr nxExpandableTableRow [isExpanded]="isExpanded">example content</tr>
 `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ConfigurableExpandableTableRowComponent extends ExpandableTableRowTest {}
