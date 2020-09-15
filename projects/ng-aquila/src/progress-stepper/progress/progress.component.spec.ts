import { Component, ElementRef, Type, ViewChild, Directive } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxProgressStepperDirective } from '../progress-stepper.component';
import { NxProgressStepperModule } from '../progress-stepper.module';
import { NxProgressStepperComponent } from './progress.component';

import * as axe from 'axe-core';

// We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class ProgressTest {
  @ViewChild(NxProgressStepperDirective) componentInstance: NxProgressStepperDirective;
  @ViewChild(NxProgressStepperDirective,  { read: ElementRef }) componentInstanceRef: ElementRef;
  progress = 1;
}

describe('NxProgressStepperComponent', () => {
  let fixture: ComponentFixture<ProgressTest>;
  let testInstance: ProgressTest;
  let componentInstance: NxProgressStepperDirective;
  let componentInstanceRef: ElementRef;
  let progressInstance: NxProgressStepperComponent;

  function createTestComponent(component: Type<ProgressTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    componentInstance = testInstance.componentInstance;
    componentInstanceRef = testInstance.componentInstanceRef;
    progressInstance = fixture.debugElement.query(By.css('nx-progress-stepper')).componentInstance;
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProgressBasicTest,
          ProgressBindingTest,
          ProgressClampTest
        ],
        imports: [
          NxProgressStepperModule
        ],
      }).compileComponents();
    })
  );

  it(
    'should create the component',
    fakeAsync(() => {
      createTestComponent(ProgressBasicTest);
      expect(progressInstance).toBeTruthy();
    })
  );

  it(
    'should set the progress to 0',
    fakeAsync(() => {
      createTestComponent(ProgressBasicTest);
      expect(progressInstance.progress).toBe(0);
    })
  );

  it(
    'should bind the progress',
    fakeAsync(() => {
      createTestComponent(ProgressBindingTest);
      expect(progressInstance.progress).toBe(0.33);
    })
  );

  it(
    'should clamp the progress between 0 and 1',
    fakeAsync(() => {
      createTestComponent(ProgressClampTest);
      expect(progressInstance.progress).toBe(1);
      testInstance.progress = -1;
      fixture.detectChanges();
      expect(progressInstance.progress).toBe(0);
    })
  );

  describe('a11y', () => {

    it('has no accessibility violations for basic use case', function (done) {
      createTestComponent(ProgressBasicTest);

      axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        done();
      });
    });
  });
});

@Component({
  template: `
  <nx-progress-stepper>
  <nx-step label='Step 1'>
        step 1 content
      </nx-step>
      <nx-step label='Step 2'>
        step 2 content
      </nx-step>
  </nx-progress-stepper>>
  `
})
class ProgressBasicTest extends ProgressTest {}

@Component({
  template: `
    <nx-progress-stepper progress="0.33">
    <nx-step label='Step 1'>
        step 1 content
      </nx-step>
      <nx-step label='Step 2'>
        step 2 content
      </nx-step>
    </nx-progress-stepper>
  `
})
class ProgressBindingTest extends ProgressTest {}
@Component({
  template: `
    <nx-progress-stepper [progress]="progress">
    <nx-step label='Step 1'>
        step 1 content
      </nx-step>
      <nx-step label='Step 2'>
        step 2 content
      </nx-step>
    </nx-progress-stepper>
  `
})
class ProgressClampTest extends ProgressTest { }
