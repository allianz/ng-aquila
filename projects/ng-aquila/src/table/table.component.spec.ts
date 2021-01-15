import { ChangeDetectionStrategy, Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxTableComponent } from './table.component';
import { NxTableModule } from './table.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NxHeaderCellDirective } from './header-cell.directive';
import { NxTableCellComponent } from './table-cell.component';
import { NxTableRowComponent } from './table-row.component';

@Directive()
abstract class TableTest {
  @ViewChild(NxTableComponent) tableInstance: NxTableComponent;
}

describe(NxTableComponent.name, () => {
  const ZEBRA_CSS_CLASS = 'nx-table--zebra';
  const CONDENSED_CSS_CLASS = 'nx-table--condensed';

  let fixture: ComponentFixture<TableTest>;
  let testInstance: TableTest;
  let tableInstance: NxTableComponent;
  let tableElement: DebugElement;

  function createTestComponent(component: Type<TableTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    tableInstance = testInstance.tableInstance;
    tableElement = fixture.debugElement.query(By.directive(NxTableComponent));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SimpleTableComponent,
        ZebraTableComponent,
        CondensedTableComponent
      ],
      imports: [NxTableModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  describe('basic', () => {
    it('has created the component', () => {
      createTestComponent(SimpleTableComponent);
      expect(tableInstance).toBeTruthy();
    });

    it('every header cell has the bem class', () => {
      createTestComponent(SimpleTableComponent);
      tableElement.queryAll(By.directive(NxHeaderCellDirective)).forEach(element => {
        expect(element.nativeElement.classList.contains('nx-header-cell')).toBeTruthy();
      });
    });

    it('has zebra styling', () => {
      createTestComponent(ZebraTableComponent);
      expect(tableElement.nativeElement.classList.contains(ZEBRA_CSS_CLASS)).toBeTruthy();
    });

    it('has condensed styling', () => {
      createTestComponent(CondensedTableComponent);
      expect(tableElement.nativeElement.classList.contains(CONDENSED_CSS_CLASS)).toBeTruthy();
    });

    it('every table cell contains the bem class', () => {
      createTestComponent(SimpleTableComponent);
      tableElement.queryAll(By.directive(NxTableCellComponent)).forEach(element => {
        expect(element.nativeElement.classList.contains('nx-table-cell')).toBeTruthy();
      });
    });

    it('every table row contains the bem class', () => {
      createTestComponent(SimpleTableComponent);
      tableElement.queryAll(By.directive(NxTableRowComponent)).forEach(element => {
        expect(element.nativeElement.classList.contains('nx-table-row')).toBeTruthy();
      });
    });
  });

  describe('programatic', () => {
    it('zebra change to false should deactivate the zebra mode', () => {
      createTestComponent(ZebraTableComponent);
      tableInstance.zebra = false;
      fixture.detectChanges();
      expect(tableElement.nativeElement.classList.contains(ZEBRA_CSS_CLASS)).toBeFalsy();
    });

    it('zebra change to true should activate the zebra mode', () => {
      createTestComponent(SimpleTableComponent);
      tableInstance.zebra = true;
      fixture.detectChanges();
      expect(tableElement.nativeElement.classList.contains(ZEBRA_CSS_CLASS)).toBeTruthy();
    });

    it('condensed change to false should deactivate the condensed mode', () => {
      createTestComponent(CondensedTableComponent);
      tableInstance.condensed = false;
      fixture.detectChanges();
      expect(tableElement.nativeElement.classList.contains(CONDENSED_CSS_CLASS)).toBeFalsy();
    });

    it('condensed change to true should activate the condensed mode', () => {
      createTestComponent(SimpleTableComponent);
      tableInstance.condensed = true;
      fixture.detectChanges();
      expect(tableElement.nativeElement.classList.contains(CONDENSED_CSS_CLASS)).toBeTruthy();
    });
  });
});

@Component({
  template: `
  <table nxTable>
    <thead>
      <tr nxTableRow>
        <th nxHeaderCell></th>
      </tr>
    </thead>
    <tbody>
        <tr nxTableRow>
          <td nxCell></td>
        </tr>
    </tbody>
  </table>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class SimpleTableComponent extends TableTest { }

@Component({
  template: `
  <table nxTable zebra>
    <thead>
      <tr nxTableRow>
        <th nxHeaderCell></th>
      </tr>
    </thead>
    <tbody>
        <tr nxTableRow>
          <td nxTableCell></td>
        </tr>
    </tbody>
  </table>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ZebraTableComponent extends TableTest { }

@Component({
  template: `
  <table nxTable condensed>
    <thead>
      <tr nxTableRow>
        <th nxHeaderCell></th>
      </tr>
    </thead>
    <tbody>
      <tr nxTableRow>
        <td nxTableCell></td>
      </tr>
    </tbody>
  </table>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class CondensedTableComponent extends TableTest { }
