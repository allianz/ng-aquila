import { ChangeDetectionStrategy, Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxTableModule } from './table.module';
import { NxTableCellComponent } from './table-cell.component';
import { By } from '@angular/platform-browser';

@Directive()
abstract class TableCellTest {
  @ViewChild(NxTableCellComponent) tableCellInstance: NxTableCellComponent;
}

describe(NxTableCellComponent.name, () => {
  let fixture: ComponentFixture<TableCellTest>;
  let testInstance: TableCellTest;
  let tableCellInstance: NxTableCellComponent;
  let tableCellElement: DebugElement;

  function createTestComponent(component: Type<TableCellTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    tableCellInstance = testInstance.tableCellInstance;
    tableCellElement = fixture.debugElement.query(By.directive(NxTableCellComponent));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicTableCellComponent
      ],
      imports: [NxTableModule]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicTableCellComponent);
    });

    it('creates the component', () => {
      expect(tableCellInstance).toBeTruthy();
    });

    it('has the bem class', () => {
      expect(tableCellElement.nativeElement.classList.contains('nx-table-cell')).toBeTruthy();
    });

    it('renders the content', () => {
      expect(tableCellElement.nativeElement.textContent).toBe('example content');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicTableCellComponent);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  template: `
    <td nxTableCell>example content</td>
 `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class BasicTableCellComponent extends TableCellTest { }
