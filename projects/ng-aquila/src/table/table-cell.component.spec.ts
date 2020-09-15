import { ChangeDetectionStrategy, Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NxTableModule } from './table.module';
import { NxTableCellComponent } from './table-cell.component';
import * as axe from 'axe-core';
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

  beforeEach(async(() => {
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
    it('has no accessibility violations', (done) => {
      createTestComponent(BasicTableCellComponent);

      axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        done();
      });
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
