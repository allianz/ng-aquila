import { NxSpinnerModule } from './spinner.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, Type, ChangeDetectionStrategy, Directive } from '@angular/core';
import { NxSpinnerComponent, SpinnerSize } from './spinner.component';
import * as axe from 'axe-core';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class SpinnerTest {
  @ViewChild(NxSpinnerComponent) spinnerInstance: NxSpinnerComponent;

  size: SpinnerSize = 'small';
  negative: boolean;
}

describe('nxSpinnerComponent', () => {

  let fixture: ComponentFixture<SpinnerTest>;
  let testInstance: SpinnerTest;
  let componentInstance: NxSpinnerComponent;
  let spinnerNativeElement: HTMLElement;

  function createTestComponent(component: Type<SpinnerTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    componentInstance = testInstance.spinnerInstance;
    spinnerNativeElement = <HTMLElement>fixture.nativeElement.querySelector('nx-spinner');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicTestSpinner,
        OnPushSpinner,
        ConfigurableSpinner
      ],
      imports: [ NxSpinnerModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    createTestComponent(BasicTestSpinner);
    expect(componentInstance).toBeTruthy();
  });

  it('should render a small spinner by default', () => {
    createTestComponent(BasicTestSpinner);
    expect(spinnerNativeElement.className).toMatch('nx-spinner--small');
    expect(componentInstance.size).toBe('small');
  });

  it('should update on size change', () => {
    createTestComponent(ConfigurableSpinner);
    expect(spinnerNativeElement.classList).toMatch('nx-spinner--small');
    expect(componentInstance.size).toBe('small');

    testInstance.size = 'medium';
    fixture.detectChanges();
    expect(spinnerNativeElement.classList).toMatch('nx-spinner--medium');
    expect(componentInstance.size).toBe('medium');

    testInstance.size = 'large';
    fixture.detectChanges();
    expect(spinnerNativeElement.classList).toMatch('nx-spinner--large');
    expect(componentInstance.size).toBe('large');
  });

  it('should update on negative change', () => {
    createTestComponent(ConfigurableSpinner);
    expect(componentInstance.negative).toBe(false);
    expect(spinnerNativeElement.classList).not.toContain('nx-spinner--negative');

    testInstance.negative = true;
    fixture.detectChanges();
    expect(componentInstance.negative).toBe(true);
    expect(spinnerNativeElement.classList).toContain('nx-spinner--negative');
  });

  describe('programmatic changes', () => {
    it('should update on size change', () => {
      createTestComponent(OnPushSpinner);

      componentInstance.size = 'medium';
      fixture.detectChanges();
      expect(spinnerNativeElement.classList).toMatch('medium');
    });

    it('should update on negative change', () => {
      createTestComponent(OnPushSpinner);

      componentInstance.negative = true;
      fixture.detectChanges();
      expect(spinnerNativeElement.classList).toContain('nx-spinner--negative');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', function(done) {
      createTestComponent(BasicTestSpinner);

      axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        const violationMessages = results.violations.map(item => item.description);
        done();
      });
    });
  });

});

@Component( {
  template: `<nx-spinner></nx-spinner>`
}) class BasicTestSpinner extends SpinnerTest {}

@Component({
  template: `<nx-spinner [nxSize]='size' [negative]='negative'></nx-spinner>`
}) class ConfigurableSpinner extends SpinnerTest {}

@Component( {
  template: `<nx-spinner [nxSize]='size' [negative]='negative'></nx-spinner>`,
  changeDetection: ChangeDetectionStrategy.OnPush
}) class OnPushSpinner extends SpinnerTest {}
