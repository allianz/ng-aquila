import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';
import { NxMenuLinkDirective } from './menu-link.directive';
import { NxMenuModule } from './menu.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class MenuLinkTest {
  @ViewChild(NxMenuLinkDirective) menuLinkInstance: NxMenuLinkDirective;
}

describe(NxMenuLinkDirective.name, () => {
  let fixture: ComponentFixture<MenuLinkTest>;
  let testInstance: MenuLinkTest;
  let menuLinkInstance: NxMenuLinkDirective;
  let menuLinkNativeElement: HTMLElement;

  function createTestComponent(component: Type<MenuLinkTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    menuLinkInstance = testInstance.menuLinkInstance;
    menuLinkNativeElement = <HTMLElement>fixture.nativeElement.querySelector('[nxMenuLink]');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicMenuLink
      ],
      imports: [
        NxMenuModule
      ]
    }).compileComponents();
  }));

  describe('basic menu link', () => {
    beforeEach(() => {
      createTestComponent(BasicMenuLink);
    });

    it('creates the menu link', async(() => {
      expect(menuLinkInstance).toBeTruthy();
    }));

    it('menu link includes the bem block element', async(() => {
      expect(menuLinkNativeElement.classList.contains('nx-menu__link')).toBe(true);
    }));
  });

  describe('a11y', () => {
    it('has no accessibility violations', function(done) {
      createTestComponent(BasicMenuLink);
      axe.run(fixture.nativeElement, {},  (_: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        const violationMessages = results.violations.map(item => item.description);
        if (violationMessages.length) {
          console.log(violationMessages);
        }
        done();
      });
    });
  });
});

@Component({
  template: `<a nxMenuLink></a>`
})
class BasicMenuLink extends MenuLinkTest {}
