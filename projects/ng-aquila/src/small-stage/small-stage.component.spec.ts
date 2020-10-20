import { Component, DebugElement, Type, ViewChild, Directive } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';

import { NxSmallStageComponent } from './small-stage.component';
import { NxSmallStageModule } from './small-stage.module';
import { By } from '@angular/platform-browser';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class SmallStageTest {
  @ViewChild(NxSmallStageComponent) smallStageInstance: NxSmallStageComponent;
}

describe('NxSmallStageComponent', () => {
  let fixture: ComponentFixture<SmallStageTest>;
  let testInstance: SmallStageTest;
  let smallStageInstance: NxSmallStageComponent;
  let smallStageDebugElement: DebugElement;

  const createTestComponent = (component: Type<SmallStageTest>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    smallStageInstance = testInstance.smallStageInstance;
    smallStageDebugElement = fixture.debugElement.query(By.directive(NxSmallStageComponent));
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicSmallStage,
        DynamicSmallStage,
      ],
      imports: [
        NxSmallStageModule,
      ]
    }).compileComponents();
  }));

  it('creates the small stage', waitForAsync(() => {
    createTestComponent(BasicSmallStage);
    expect(smallStageInstance).toBeTruthy();
  }));

  it('should change class when input changes', () => {
    createTestComponent(DynamicSmallStage);
    (testInstance as DynamicSmallStage).contentNarrow = true;
    fixture.detectChanges();
    expect(smallStageDebugElement.nativeElement.classList.contains('nx-small-stage--content-narrow')).toBe(true);
  });

  describe('a11y', () => {
    it('has no accessbility violations', function (done) {
      createTestComponent(BasicSmallStage);

      axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        // const violationMessages = results.violations.map(item => item.description);
        done();
      });
    });
  });
});

@Component({
  template: `
    <nx-small-stage>
      <p>text</p>
    </nx-small-stage>
  `
})
class BasicSmallStage extends SmallStageTest {
}

@Component({
  template: `
    <nx-small-stage [contentNarrow]="contentNarrow">
      <p>text</p>
    </nx-small-stage>
  `
})
class DynamicSmallStage extends SmallStageTest {
  contentNarrow = false;
}
