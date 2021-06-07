import { Component, Type, ViewChild, Directive } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxMenuItemDirective } from './menu-item.directive';
import { NxMenuModule } from './menu.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class MenuItemTest {
  @ViewChild(NxMenuItemDirective) menuGroupInstance: NxMenuItemDirective;
}

describe(NxMenuItemDirective.name, () => {
  let fixture: ComponentFixture<MenuItemTest>;
  let testInstance: MenuItemTest;
  let menuGroupInstance: NxMenuItemDirective;
  let menuGroupNativeElement: HTMLElement;

  function createTestComponent(component: Type<MenuItemTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    menuGroupInstance = testInstance.menuGroupInstance;
    menuGroupNativeElement = (fixture.nativeElement.querySelector('[nxMenuItem]') as HTMLElement);
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicMenuItem
      ],
      imports: [
        NxMenuModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  describe('basic menu item', () => {
    beforeEach(() => {
      createTestComponent(BasicMenuItem);
    });

    it('creates the menu item', waitForAsync(() => {
      expect(menuGroupInstance).toBeTruthy();
    }));

    it('menu item includes the bem block element', waitForAsync(() => {
      expect(menuGroupNativeElement.classList.contains('nx-menu__item')).toBe(true);
    }));
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicMenuItem);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  template: `<div nxMenuItem></div>`
})
class BasicMenuItem extends MenuItemTest {}
