import { Component, Type, ViewChild, ChangeDetectionStrategy, Directive } from '@angular/core';
import { ComponentFixture, async, TestBed} from '@angular/core/testing';
import * as axe from 'axe-core';
import { NxMenuButtonComponent, NxMenuButtonType } from './menu-button.component';
import { NxMenuModule } from './menu.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class MenuButtonTest {
  expandable: boolean;
  expanded: boolean;
  type: NxMenuButtonType;
  @ViewChild(NxMenuButtonComponent) menuButtonInstance: NxMenuButtonComponent;
}

describe(NxMenuButtonComponent.name, () => {
  let fixture: ComponentFixture<MenuButtonTest>;
  let testInstance: MenuButtonTest;
  let menuButtonInstance: NxMenuButtonComponent;
  let menuButtonElement: HTMLElement;

  function createTestComponent(component: Type<MenuButtonTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    menuButtonInstance = testInstance.menuButtonInstance;
    menuButtonElement = fixture.nativeElement.querySelector('[nxMenuButton]');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NxMenuModule
      ],
      declarations: [
        BasicMenuButton,
        DefaultMenuButton
      ]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicMenuButton);
    });

    it('creates the menu button', async(() => {
      expect(menuButtonInstance).toBeTruthy();
    }));

    it('default menu button includes the bem block element', async(() => {
      expect(menuButtonElement.classList.contains('nx-menu-button')).toBeTruthy();
    }));

    it('is not expandable', () => {
      expect(menuButtonElement.classList.contains('is-expandable')).toBeFalsy();
    });

    it('is not expanded', () => {
      expect(menuButtonElement.classList.contains('is-expanded')).toBeFalsy();
    });

    describe('expandable menu button', () => {
      beforeEach(() => {
        testInstance.expandable = true;
        fixture.detectChanges();
      });

      it('is expandable', () => {
        expect(menuButtonElement.classList.contains('is-expandable')).toBeTruthy();
      });
    });

    describe('expanded menu button', () => {
      beforeEach(() => {
        testInstance.expandable = true;
        testInstance.expanded = true;
        fixture.detectChanges();
      });

      it('is expanded', () => {
        expect(menuButtonElement.classList.contains('is-expanded')).toBeTruthy();
      });
    });

    describe('menu button type', () => {
      it('has the modifier for root button', () => {
        testInstance.type = 'root';
        fixture.detectChanges();
        expect(menuButtonElement.classList.contains('nx-menu-button--root')).toBeTruthy();
      });

      it('has the modifier for nested button', () => {
        testInstance.type = 'nested';
        fixture.detectChanges();
        expect(menuButtonElement.classList.contains('nx-menu-button--nested')).toBeTruthy();
      });
    });
  });

  describe('programatic changes', () => {
    beforeEach(() => {
      createTestComponent(DefaultMenuButton);
    });

    describe('expandable menu button', () => {
      beforeEach(() => {
        menuButtonInstance.expandable = true;
        fixture.detectChanges();
      });

      it('is expandable', () => {
        expect(menuButtonElement.classList.contains('is-expandable')).toBeTruthy();
      });
    });

    describe('expanded menu button', () => {
      beforeEach(() => {
        menuButtonInstance.expandable = true;
        menuButtonInstance.expanded = true;
        fixture.detectChanges();
      });

      it('is expanded', () => {
        expect(menuButtonElement.classList.contains('is-expanded')).toBeTruthy();
      });
    });

    describe('menu button type', () => {
      it('has the modifier for root button', () => {
        menuButtonInstance.type = 'root';
        fixture.detectChanges();
        expect(menuButtonElement.classList.contains('nx-menu-button--root')).toBeTruthy();
      });

      it('has the modifier for nested button', () => {
        menuButtonInstance.type = 'nested';
        fixture.detectChanges();
        expect(menuButtonElement.classList.contains('nx-menu-button--nested')).toBeTruthy();
      });
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', function(done) {
      createTestComponent(BasicMenuButton);

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
    <button nxMenuButton>
      example menu button
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class DefaultMenuButton extends MenuButtonTest { }

@Component({
  template: `
    <a nxMenuButton [nxType]="type" [expandable]="expandable" [expanded]="expanded">
      example menuButton
    </a>
  `
})
class BasicMenuButton extends MenuButtonTest { }
