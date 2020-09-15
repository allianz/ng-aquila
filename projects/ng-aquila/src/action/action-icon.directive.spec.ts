import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, async, TestBed} from '@angular/core/testing';
import * as axe from 'axe-core';
import { NxActionIconDirective } from './action-icon.directive';
import { NxActionModule } from './action.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class ActionIconTest {
  @ViewChild(NxActionIconDirective) actionIconInstance: NxActionIconDirective;
}

describe(NxActionIconDirective.name, () => {
  let fixture: ComponentFixture<ActionIconTest>;
  let testInstance: ActionIconTest;
  let actionIconInstance: NxActionIconDirective;
  let actionIconElement: HTMLElement;

  function createTestComponent(component: Type<ActionIconTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    actionIconInstance = testInstance.actionIconInstance;
    actionIconElement = fixture.nativeElement.querySelector('[nxActionIcon]');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicActionIcon
      ],
      imports: [
        NxActionModule
      ]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicActionIcon);
    });

    it('default action icon includes the bem block element', async(() => {
      expect(actionIconElement.classList.contains('nx-action__icon')).toBeTruthy();
    }));
  });

  describe('a11y', () => {
    it('has no accessibility violations', function(done) {
      createTestComponent(BasicActionIcon);

      axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
        const violationMessages = results.violations.map(item => item.description).join('\n');
        if (violationMessages.length) {
          expect(violationMessages).toBeFalsy();
        }
        done();
      });
    });
  });
});

@Component({
  template: `
    <span nxActionIcon></span>
  `
})
class BasicActionIcon extends ActionIconTest { }
