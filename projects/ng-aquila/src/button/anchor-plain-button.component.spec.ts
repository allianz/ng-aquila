import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { NxAnchorPlainButtonComponent } from './anchor-plain-button.component';

import { NxButtonModule } from './button.module';

// tslint:disable:component-class-suffix
@Directive()
abstract class ButtonTest {
  @ViewChild('button') buttonInstance: NxAnchorPlainButtonComponent;

  disabled: boolean = false;
}

@Component({
  template: `
    <a [nxPlainButton]="classNames" #button>Hello Button</a>
  `
})
class BasicButton extends ButtonTest {}

describe('NxAnchorPlainButtonComponent', () => {
  let fixture: ComponentFixture<ButtonTest>;
  let testInstance: ButtonTest;
  let buttonElement: HTMLAnchorElement;

  function createTestComponent(component: Type<ButtonTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxButtonModule
      ],
      declarations: [
        BasicButton
      ]
    }).compileComponents();
  }));

  it('should create the button component', () => {
    createTestComponent(BasicButton);
    expect(testInstance.buttonInstance).toBeTruthy();
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.textContent).toBe('Hello Button');
  });

  it('prevents default when the anchor button is disabled', fakeAsync(() => {
    createTestComponent(BasicButton);
    const clickSpy = jasmine.createSpy('clickSpy');
    buttonElement.addEventListener('click', clickSpy);
    testInstance.buttonInstance.disabled = true;
    buttonElement.click();
    expect(clickSpy).toHaveBeenCalledTimes(0);
  }));

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicButton);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });

});
