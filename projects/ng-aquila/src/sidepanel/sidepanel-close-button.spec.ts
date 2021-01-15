import { Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import * as axe from 'axe-core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxSidepanelModule } from './sidepanel.module';
import { NxSidepanelComponent, PositionType } from './sidepanel';
import { NxSidepanelCloseButtonComponent } from './sidepanel-close-button';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class SidepanelCloseButtonTest {
  @ViewChild(NxSidepanelComponent) sidebarInstance: NxSidepanelComponent;
  @ViewChild(NxSidepanelCloseButtonComponent) buttonInstance: NxSidepanelCloseButtonComponent;
}

describe('NxSidepanelCloseButtonComponent', () => {
  let fixture: ComponentFixture<SidepanelCloseButtonTest>;
  let testInstance: SidepanelCloseButtonTest;
  let sidepanelInstance: NxSidepanelComponent;
  let sidepanelElement: DebugElement;
  let buttonElement: HTMLButtonElement;

  function createTestComponent(component: Type<SidepanelCloseButtonTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    sidepanelInstance = testInstance.sidebarInstance;
    sidepanelElement = fixture.debugElement.query(By.css('nx-sidepanel'));
    buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicSidepanel
      ],
      imports: [
        BrowserAnimationsModule,
        NxSidepanelModule
      ]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicSidepanel);
    });

    it('creates the sidepanel', () => {
      expect(sidepanelInstance).toBeTruthy();
    });

    it('closes the panel on button click', () => {
      buttonElement.click();
      fixture.detectChanges();
      expect(sidepanelInstance.opened).toBe(false);
      expect(sidepanelElement.nativeElement.classList).toContain('is-closed');
    });
  });

  describe('a11y', () => {
    beforeEach(() => {
      createTestComponent(BasicSidepanel);
    });

    it('has no accessibility violations', function(done) {
      axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
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
  template: `
    <nx-sidepanel>
      Hello Sidepanel
      <button nxSidepanelCloseButton aria-label="Close Sidepanel"></button>
    </nx-sidepanel>
  `
})
class BasicSidepanel extends SidepanelCloseButtonTest {}
