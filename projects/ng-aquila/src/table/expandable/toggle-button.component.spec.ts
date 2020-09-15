import { ChangeDetectionStrategy, Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NxTableModule } from '../table.module';
import { By } from '@angular/platform-browser';
import { NxToggleButtonComponent, NxExpandable } from './toggle-button.component';
import { BehaviorSubject } from 'rxjs';

@Directive()
abstract class ToggleButtonTest {
  @ViewChild(NxToggleButtonComponent) toggleButtonInstance: NxToggleButtonComponent;
  target: NxExpandable;
}

describe(NxToggleButtonComponent.name, () => {
  let fixture: ComponentFixture<ToggleButtonTest>;
  let testInstance: ToggleButtonTest;
  let toggleButtonInstance: NxToggleButtonComponent;
  let toggleButtonElement: DebugElement;

  function createTestComponent(component: Type<ToggleButtonTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    toggleButtonInstance = testInstance.toggleButtonInstance;
    toggleButtonElement = fixture.debugElement.query(By.css('.nx-toggle-button'));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicToggleButtonComponent
      ],
      imports: [NxTableModule]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicToggleButtonComponent);
    });

    it('creates the component', () => {
      expect(toggleButtonInstance).toBeTruthy();
    });

    it('doesn\'t have the expanded state', () => {
      expect(toggleButtonElement.nativeElement.classList.contains('is-expanded')).toBeFalsy();
    });

    describe('when clicking the button', () => {
      beforeEach(() => {
        toggleButtonElement.triggerEventHandler('click', {});
        fixture.detectChanges();
      });

      it('toggled the target', () => {
        expect(testInstance.target.toggle).toHaveBeenCalled();
      });

      it('has the expanded state', () => {
        expect(toggleButtonElement.nativeElement.classList.contains('is-expanded')).toBeTruthy();
      });

      describe('and clicking the button again', () => {
        beforeEach(() => {
          toggleButtonElement.triggerEventHandler('click', {});
          fixture.detectChanges();
        });

        it('toggled the target', () => {
          expect(testInstance.target.toggle).toHaveBeenCalled();
        });

        it('doesn\'t have the expanded state', () => {
          expect(toggleButtonElement.nativeElement.classList.contains('is-expanded')).toBeFalsy();
        });
      });
    });
  });
});

@Component({
  template: `
    <nx-toggle-button [target]="target" ariaLabel="toggle all rows"></nx-toggle-button>
 `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class BasicToggleButtonComponent extends ToggleButtonTest {
  target: NxExpandable;

  constructor() {
    super();
    const expanded = new BehaviorSubject(false);
    this.target = {
      expanded,
      toggle: jasmine.createSpy('toggle').and.callFake(() => expanded.next(!expanded.value)),
      expand: jasmine.createSpy('expand'),
      close: jasmine.createSpy('close')
    };
  }
}
