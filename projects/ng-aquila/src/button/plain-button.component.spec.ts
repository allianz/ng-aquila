import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, async, TestBed} from '@angular/core/testing';

import { NxButtonModule } from './button.module';
import { NxPlainButtonComponent } from './plain-button.component';

// tslint:disable:component-class-suffix
@Directive()
abstract class ButtonTest {
  @ViewChild('button') buttonInstance: NxPlainButtonComponent;
}

describe('NxBreadcrumbComponent', () => {
  let fixture: ComponentFixture<ButtonTest>;
  let testInstance: ButtonTest;
  let buttonElement: HTMLButtonElement;

  function createTestComponent(component: Type<ButtonTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    buttonElement = <HTMLButtonElement>fixture.nativeElement.querySelector('button');
  }

  beforeEach(async(() => {
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
});

@Component({
  template: `
    <button nxButton #button class="some-arbitray-class-name">Hello Button</button>
  `
})
class BasicButton extends ButtonTest {
}
