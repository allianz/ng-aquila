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
        StartImageSmallStage,
        EndImageSmallStage,
        TwoImageSmallStage,
        SmallStageWithHeader,
        ThreeImageSmallStage,
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

  describe('start image', () => {
    it('does not render image container if no directive present', () => {
      createTestComponent(EndImageSmallStage);
      fixture.detectChanges();
      expect(smallStageDebugElement.nativeElement.querySelector('.image-container--start')).toBeNull();
    });
    it('properly pics src for image', () => {
      createTestComponent(StartImageSmallStage);
      fixture.detectChanges();
      const style = smallStageDebugElement.componentInstance._startImageInlineStyle;
      expect(style).toBe('url(foo)');
    });
  });

  describe('end image', () => {
    it('does not render image container if no directive present', () => {
      createTestComponent(StartImageSmallStage);
      fixture.detectChanges();
      expect(smallStageDebugElement.nativeElement.querySelector('.image-container--end')).toBeNull();
    });
    it('properly pics src for image', () => {
      createTestComponent(EndImageSmallStage);
      fixture.detectChanges();
      const style = smallStageDebugElement.componentInstance._endImageInlineStyle;
      expect(style).toBe('url(bar)');
    });
  });

  describe('narrow image', () => {
    it('properly pics src for image', () => {
      createTestComponent(ThreeImageSmallStage);
      fixture.detectChanges();
      const style = smallStageDebugElement.componentInstance._narrowScreenImageInlineStyle;
      expect(style).toBe('url(baz)');
    });
    it('falls back to end image src if narrow image directive missing', () => {
      createTestComponent(TwoImageSmallStage);
      fixture.detectChanges();
      const style = smallStageDebugElement.componentInstance._narrowScreenImageInlineStyle;
      expect(style).toBe('url(bar)');
    });
    it('sets inner position class properly if present on directive', () => {
      createTestComponent(ThreeImageSmallStage);
      fixture.detectChanges();
      const narrowScreenImageInnerClassList = smallStageDebugElement.nativeElement
        .querySelector('.image-container-narrow-screen__inner').classList;
      expect(narrowScreenImageInnerClassList.contains('image-container-narrow-screen__inner--center')).toBeTrue();
    });
    it('uses default end positioning when directive not present', () => {
      createTestComponent(TwoImageSmallStage);
      fixture.detectChanges();
      const narrowScreenImageInnerClassList = smallStageDebugElement.nativeElement
        .querySelector('.image-container-narrow-screen__inner').classList;
      expect(narrowScreenImageInnerClassList.contains('image-container-narrow-screen__inner--end')).toBeTrue();
    });
  });

  it('sets respective class when only start image present', () => {
    createTestComponent(StartImageSmallStage);
    fixture.detectChanges();
    expect(smallStageDebugElement.nativeElement.classList.contains('nx-small-stage--only-start-image')).toBe(true);
  });
  it('sets respective class when only end image present', () => {
    createTestComponent(EndImageSmallStage);
    fixture.detectChanges();
    expect(smallStageDebugElement.nativeElement.classList.contains('nx-small-stage--only-end-image')).toBe(true);
  });
  it('sets respective class when both images present', () => {
    createTestComponent(TwoImageSmallStage);
    fixture.detectChanges();
    expect(smallStageDebugElement.nativeElement.classList.contains('nx-small-stage--two-images')).toBe(true);
  });
  it('sets respective class when header present', () => {
    createTestComponent(SmallStageWithHeader);
    fixture.detectChanges();
    expect(smallStageDebugElement.nativeElement.classList.contains('nx-small-stage--w-header')).toBe(true);
  });

  describe('a11y', () => {
    it('has no accessbility violations', function (done) {
      createTestComponent(BasicSmallStage);

      axe.run(fixture.nativeElement, {
        rules: {
          'color-contrast': { enabled: false }
        }
      }, (error: Error, results: axe.AxeResults) => {
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
      <nx-small-stage-content>text</nx-small-stage-content>
    </nx-small-stage>
  `
})
class BasicSmallStage extends SmallStageTest {
}

@Component({
  template: `
    <nx-small-stage>
      <nx-small-stage-start-image src="foo"></nx-small-stage-start-image>
      <nx-small-stage-content>text</nx-small-stage-content>
    </nx-small-stage>
  `
})
class StartImageSmallStage extends SmallStageTest {}

@Component({
  template: `
    <nx-small-stage>
      <nx-small-stage-content>text</nx-small-stage-content>
      <nx-small-stage-end-image src="bar"></nx-small-stage-end-image>
    </nx-small-stage>
  `
})
class EndImageSmallStage extends SmallStageTest {}

@Component({
  template: `
    <nx-small-stage>
      <nx-small-stage-start-image src="foo"></nx-small-stage-start-image>
      <nx-small-stage-content>text</nx-small-stage-content>
      <nx-small-stage-end-image src="bar"></nx-small-stage-end-image>
    </nx-small-stage>
  `
})
class TwoImageSmallStage extends SmallStageTest {}

@Component({
  template: `
    <nx-small-stage>
      <nx-small-stage-start-image src="foo"></nx-small-stage-start-image>
      <nx-small-stage-content>text</nx-small-stage-content>
      <nx-small-stage-end-image src="bar"></nx-small-stage-end-image>
      <nx-small-stage-narrow-screen-image position='center' src="baz"></nx-small-stage-narrow-screen-image>
    </nx-small-stage>
  `
})
class ThreeImageSmallStage extends SmallStageTest {}

@Component({
  template: `
    <nx-small-stage>
      <nx-small-stage-header>Header</nx-small-stage-header>
      <nx-small-stage-start-image src="foo"></nx-small-stage-start-image>
      <nx-small-stage-content>text</nx-small-stage-content>
      <nx-small-stage-end-image src="bar"></nx-small-stage-end-image>
    </nx-small-stage>
  `
})
class SmallStageWithHeader extends SmallStageTest {}
