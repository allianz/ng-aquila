import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { NxSidebarToggleComponent } from './sidebar-toggle';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';

@Directive()
abstract class ToggleTest {
  @ViewChild(NxSidebarToggleComponent) buttonInstance: NxSidebarToggleComponent;
}

describe('NxSidebarToggleButton', () => {
  let fixture: ComponentFixture<ToggleTest>;
  let testInstance: ToggleTest;
  let buttonInstance: NxSidebarToggleComponent;
  let buttonNativeElement: HTMLButtonElement;

  function createTestComponent(component: Type<ToggleTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    buttonInstance = testInstance.buttonInstance;
    buttonNativeElement = <HTMLButtonElement>fixture.nativeElement.querySelector('.nx-sidebar__toggle-button');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicSidebarToggleComponent ],
      imports: [
        NxButtonModule,
        NxSidebarModule
      ]
    }).compileComponents();
  }));

  it('creates the toggle with the correct base class bindings', () => {
    createTestComponent(BasicSidebarToggleComponent);
    expect(buttonInstance.type).toBe('tertiary');
    expect(buttonInstance.size).toBe('small-medium');
    expect(buttonNativeElement.classList).toContain('nx-button--tertiary');
    expect(buttonNativeElement.classList).toContain('nx-button--small-medium');
  });
});

@Component({
  template: `
    <nx-sidebar>
      <nx-sidebar-footer>
        <button nxSidebarToggle></button>
      </nx-sidebar-footer>
    </nx-sidebar>
  `
})
class BasicSidebarToggleComponent extends ToggleTest {}
