import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DebugElement,
  Directive,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NxTableModule } from '../table.module';
import { NxExpandableTableCellComponent } from './expandable-table-cell.component';
import { NxExpandableTableRowComponent } from './expandable-table-row.component';

@Directive({ standalone: true })
abstract class ExpandableTableCellTest {
  @ViewChild(NxExpandableTableCellComponent)
  expandableTableCellInstance!: NxExpandableTableCellComponent;
  @ViewChild(NxExpandableTableRowComponent)
  expandableTableRowInstance!: NxExpandableTableRowComponent;

  isIndented = false;

  constructor(readonly cdr: ChangeDetectorRef) {}
}

describe(NxExpandableTableCellComponent.name, () => {
  let fixture: ComponentFixture<ExpandableTableCellTest>;
  let testInstance: ExpandableTableCellTest;
  let expandableTableCellInstance: NxExpandableTableCellComponent;
  let expandableTableRowInstance: NxExpandableTableRowComponent;
  let expandableTableCellElement: DebugElement;

  function createTestComponent(component: Type<ExpandableTableCellTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    expandableTableCellInstance = testInstance.expandableTableCellInstance;
    expandableTableRowInstance = testInstance.expandableTableRowInstance;
    expandableTableCellElement = fixture.debugElement.query(
      By.directive(NxExpandableTableCellComponent),
    );
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxTableModule, NoopAnimationsModule, BasicExpandableTableCellComponent],
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicExpandableTableCellComponent);
    });

    it('creates the component', () => {
      expect(expandableTableCellInstance).toBeTruthy();
    });

    it('has the bem class', () => {
      expect(expandableTableCellElement.nativeElement).toHaveClass('nx-expandable-table-cell');
    });

    it('renders the content', () => {
      expect(expandableTableCellElement.nativeElement.textContent).toBe('example content');
    });
  });

  describe('programatic', () => {
    beforeEach(fakeAsync(() => {
      createTestComponent(BasicExpandableTableCellComponent);
      tick();
    }));

    it('is not expanded', () => {
      const content = expandableTableCellElement.query(
        By.css('.nx-expandable-table-cell__content'),
      );
      expect(content.nativeElement.style.height).toBe('0px');
    });

    describe('when row is expanded', () => {
      beforeEach(fakeAsync(() => {
        expandableTableRowInstance.expand();
        fixture.detectChanges();
        tick();
      }));

      it('is expanded', () => {
        const content = expandableTableCellElement.query(
          By.css('.nx-expandable-table-cell__content'),
        );
        expect(content.nativeElement.style.height).toBe('');
      });

      describe('and row is closed', () => {
        beforeEach(fakeAsync(() => {
          expandableTableRowInstance.close();
          fixture.detectChanges();
          tick();
        }));

        it('is not expanded', () => {
          const content = expandableTableCellElement.query(
            By.css('.nx-expandable-table-cell__content'),
          );
          expect(content.nativeElement.style.height).toBe('0px');
        });
      });
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicExpandableTableCellComponent);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });

  describe('indented input', () => {
    beforeEach(() => {
      createTestComponent(BasicExpandableTableCellComponent);
    });

    it('is not indented by default', () => {
      expect(expandableTableCellElement.nativeElement).not.toHaveClass(
        'nx-expandable-table-cell--indented',
      );
    });

    it('applies indented class when set to true', () => {
      testInstance.isIndented = true;
      testInstance.cdr.detectChanges();
      expect(expandableTableCellElement.nativeElement).toHaveClass(
        'nx-expandable-table-cell--indented',
      );
    });
  });
});

@Component({
  template: `
    <tr nxExpandableTableRow>
      <td nxExpandableTableCell [indented]="isIndented">example content</td>
    </tr>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxTableModule],
})
class BasicExpandableTableCellComponent extends ExpandableTableCellTest {}
