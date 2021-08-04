import { ChangeDetectionStrategy, Component, Type, ViewChild, DebugElement, ElementRef, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxTableModule } from './table.module';
import { NxTableRowComponent } from './table-row.component';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from '../cdk-test-utils';

@Directive()
class TableRowTest {
  @ViewChild(NxTableRowComponent) tableRowInstance!: NxTableRowComponent;
}

function hasClass(element: ElementRef, className: string): boolean {
  return element.nativeElement.classList.contains(className);
}

describe(NxTableRowComponent.name, () => {
  let fixture: ComponentFixture<TableRowTest>;
  let testInstance: TableRowTest;
  let tableRowInstance: NxTableRowComponent;
  let tableRowElement: DebugElement;

  function createTestComponent(component: Type<TableRowTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    tableRowInstance = testInstance.tableRowInstance;
    tableRowElement = fixture.debugElement.query(By.directive(NxTableRowComponent));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicTableRowComponent,
        SelectableTableRowComponent
      ],
      imports: [NxTableModule]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicTableRowComponent);
    });

    it('creates the component', () => {
      expect(tableRowInstance).toBeTruthy();
    });

    it('has the bem class', () => {
      expect(hasClass(tableRowElement, 'nx-table-row')).toBeTruthy();
    });

    it('renders the content', () => {
      expect(tableRowElement.nativeElement.textContent).toBe('example content');
    });

    it('is not selectable', () => {
      expect(tableRowInstance.selectable).toBeFalsy();
      expect(hasClass(tableRowElement, 'nx-table-row--selectable')).toBeFalsy();
    });

    it('has no tabindex', () => {
      expect(tableRowElement.nativeElement.getAttribute('tabindex')).toBe(null);
    });

    describe('when clicking a row', () => {
      beforeEach(() => {
        tableRowElement.nativeElement.click();
        fixture.detectChanges();
      });

      it('is not selected', () => {
        expect(tableRowInstance.selected).toBeFalsy();
        expect(hasClass(tableRowElement, 'is-selected')).toBeFalsy();
      });
    });
  });

  describe('selectable', () => {
    beforeEach(() => {
      createTestComponent(SelectableTableRowComponent);
    });

    it('has the selectable class', () => {
      expect(hasClass(tableRowElement, 'nx-table-row--selectable')).toBeTruthy();
    });

    it('has a aria-seleted attribute', () => {
      expect(tableRowElement.nativeElement.getAttribute('aria-selected')).toBe('false');
    });

    describe('when selecting the row by click', () => {
      beforeEach(() => {
        spyOn(testInstance as SelectableTableRowComponent, 'onSelect').and.callThrough();
        dispatchMouseEvent(tableRowElement.nativeElement, 'click');
        fixture.detectChanges();
      });

      it('fires a "select" event', () => {
        expect((testInstance as SelectableTableRowComponent).onSelect).toHaveBeenCalledTimes(1);
      });

      it('is selected', () => {
        expect(tableRowInstance.selected).toBeTruthy();
        expect(hasClass(tableRowElement, 'is-selected')).toBeTruthy();
        expect(tableRowElement.nativeElement.getAttribute('aria-selected')).toBe('true');
      });

      describe('and deselecting the row by click', () => {
        beforeEach(() => {
          tableRowElement.nativeElement.click();
          fixture.detectChanges();
        });

        it('is not selected', () => {
          expect(tableRowInstance.selected).toBeFalsy();
          expect(hasClass(tableRowElement, 'is-selected')).toBeFalsy();
          expect(tableRowElement.nativeElement.getAttribute('aria-selected')).toBe('false');
        });
      });
    });

    ['a', 'button', 'input', 'label'].forEach((type) => {
      describe(`when clicking a "${type}" in the row`, () => {
        beforeEach(() => {
          tableRowElement.nativeElement.querySelector(type).click();
          fixture.detectChanges();
        });

        it('is not selected', () => {
          expect(tableRowInstance.selected).toBeFalsy();
          expect(hasClass(tableRowElement, 'is-selected')).toBeFalsy();
        });
      });
    });

    describe('when selecting a row by pressing space', () => {
      beforeEach(() => {
        tableRowElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: 'Space'}));
        fixture.detectChanges();
      });

      it('is selected', () => {
        expect(tableRowInstance.selected).toBeTruthy();
        expect(hasClass(tableRowElement, 'is-selected')).toBeTruthy();
      });
    });
  });

  describe('programatic', () => {
    describe('when selecting a row', () => {
      beforeEach(() => {
        createTestComponent(BasicTableRowComponent);
        tableRowInstance.selected = true;
        fixture.detectChanges();
      });

      it('is selected', () => {
        expect(tableRowInstance.selected).toBeTruthy();
        expect(hasClass(tableRowElement, 'is-selected')).toBeTruthy();
      });
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicTableRowComponent);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  template: `
    <tr nxTableRow>example content</tr>
 `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class BasicTableRowComponent extends TableRowTest { }

@Component({
  template: `
    <tr nxTableRow
        [selectable]="selectable"
        [selected]="selected"
        (select)="onSelect()">
      <td>
        <a>example link</a>
      </td>
      <td>
        <input id="input" type="text">
        <label for="input">example label</label>
      </td>
      <td>
        <button>example button</button>
      </td>
    </tr>
 `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class SelectableTableRowComponent extends TableRowTest {
  selectable: boolean = true;
  selected: boolean = false;

  onSelect() {
    this.selected = !this.selected;
  }
}
