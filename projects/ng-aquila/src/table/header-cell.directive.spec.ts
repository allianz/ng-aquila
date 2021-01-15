import { ChangeDetectionStrategy, Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxTableModule } from './table.module';
import { NxHeaderCellDirective } from './header-cell.directive';
import * as axe from 'axe-core';
import { By } from '@angular/platform-browser';

@Directive()
abstract class HeaderCellTest {
  @ViewChild(NxHeaderCellDirective) headerCellInstance: NxHeaderCellDirective;
}

describe(NxHeaderCellDirective.name, () => {
  let fixture: ComponentFixture<HeaderCellTest>;
  let testInstance: HeaderCellTest;
  let HeaderCellInstance: NxHeaderCellDirective;
  let HeaderCellElement: DebugElement;

  function createTestComponent(component: Type<HeaderCellTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    HeaderCellInstance = testInstance.headerCellInstance;
    HeaderCellElement = fixture.debugElement.query(By.directive(NxHeaderCellDirective));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicHeaderCellComponent
      ],
      imports: [NxTableModule]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicHeaderCellComponent);
    });

    it('creates the component', () => {
      expect(HeaderCellInstance).toBeTruthy();
    });

    it('has the bem class', () => {
      expect(HeaderCellElement.nativeElement.classList.contains('nx-header-cell')).toBeTruthy();
    });

    it('renders the content', () => {
      expect(HeaderCellElement.nativeElement.textContent).toBe('example content');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', (done) => {
      createTestComponent(BasicHeaderCellComponent);

      axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        done();
      });
    });
  });
});

@Component({
  template: `
    <td nxHeaderCell>example content</td>
 `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class BasicHeaderCellComponent extends HeaderCellTest { }
