import { ChangeDetectionStrategy, Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxTableModule } from '../table.module';
import { NxExpandableTableRowComponent } from './expandable-table-row.component';
import * as axe from 'axe-core';
import { By } from '@angular/platform-browser';

@Directive()
abstract class ExpandableTableRowTest {
  @ViewChild(NxExpandableTableRowComponent) expandableTableRowInstance: NxExpandableTableRowComponent;
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
        BasicExpandableTableRowComponent
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

  describe('programatic', () => {
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

  describe('a11y', () => {
    it('has no accessibility violations', (done) => {
      createTestComponent(BasicExpandableTableRowComponent);

      axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        done();
      });
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
