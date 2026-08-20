import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AriaPolite, NxSpinnerComponent, SpinnerSize } from './spinner.component';
import { NxSpinnerModule } from './spinner.module';

@Directive({ standalone: true })
abstract class SpinnerTest {
  @ViewChild(NxSpinnerComponent)
  spinnerInstance!: NxSpinnerComponent;

  size: SpinnerSize = 'small';
  negative!: boolean;
  inverse!: boolean;
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
    spinnerNativeElement = fixture.nativeElement.querySelector('nx-spinner') as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxSpinnerModule, BasicTestSpinner, OnPushSpinner, ConfigurableSpinner],
    }).compileComponents();
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
    expect(spinnerNativeElement).toHaveClass('nx-spinner--small');
    expect(componentInstance.size).toBe('small');

    testInstance.size = 'medium';
    fixture.detectChanges();
    expect(spinnerNativeElement).toHaveClass('nx-spinner--medium');
    expect(componentInstance.size).toBe('medium');

    testInstance.size = 'large';
    fixture.detectChanges();
    expect(spinnerNativeElement).toHaveClass('nx-spinner--large');
    expect(componentInstance.size).toBe('large');
  });

  it('should update on negative change', () => {
    createTestComponent(ConfigurableSpinner);
    expect(componentInstance.negative).toBe(false);
    expect(spinnerNativeElement).not.toHaveClass('nx-spinner--negative');

    testInstance.negative = true;
    fixture.detectChanges();
    expect(componentInstance.negative).toBe(true);
    expect(spinnerNativeElement).toHaveClass('nx-spinner--negative');
  });

  it('should update on inverse change', () => {
    createTestComponent(ConfigurableSpinner);
    expect(componentInstance.inverse()).toBe(false);
    expect(spinnerNativeElement).not.toHaveClass('nx-spinner--negative');

    testInstance.inverse = true;
    fixture.detectChanges();
    expect(componentInstance.inverse()).toBe(true);
    expect(spinnerNativeElement).toHaveClass('nx-spinner--negative');
  });

  it('should apply negative class when either negative or inverse is true', () => {
    createTestComponent(ConfigurableSpinner);
    expect(spinnerNativeElement).not.toHaveClass('nx-spinner--negative');

    testInstance.negative = true;
    fixture.detectChanges();
    expect(spinnerNativeElement).toHaveClass('nx-spinner--negative');

    testInstance.negative = false;
    testInstance.inverse = true;
    fixture.detectChanges();
    expect(spinnerNativeElement).toHaveClass('nx-spinner--negative');

    testInstance.negative = true;
    fixture.detectChanges();
    expect(spinnerNativeElement).toHaveClass('nx-spinner--negative');
  });

  describe('programmatic changes', () => {
    it('should update on size change', () => {
      createTestComponent(OnPushSpinner);

      componentInstance.size = 'medium';
      fixture.detectChanges();
      expect(spinnerNativeElement).toHaveClass('nx-spinner--medium');
    });

    it('should update on negative change', () => {
      createTestComponent(OnPushSpinner);

      componentInstance.negative = true;
      fixture.detectChanges();
      expect(spinnerNativeElement).toHaveClass('nx-spinner--negative');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicTestSpinner);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });

  describe('AriaLive attribute', () => {
    beforeEach(waitForAsync(() => {
      createTestComponent(BasicTestSpinner);
    }));

    it('should set aria-live to assertive by default', () => {
      expect(spinnerNativeElement.getAttribute('aria-live')).toBe('assertive');
    });

    it('should set aria-live to polite', () => {
      (testInstance as BasicTestSpinner).ariaPoliteness = 'polite';
      fixture.detectChanges();
      expect(spinnerNativeElement.getAttribute('aria-live')).toBe('polite');
    });

    it('should set aria-live to off', () => {
      (testInstance as BasicTestSpinner).ariaPoliteness = 'off';
      fixture.detectChanges();
      expect(spinnerNativeElement.getAttribute('aria-live')).toBe('off');
    });

    it('should set aria-live to assertive', () => {
      (testInstance as BasicTestSpinner).ariaPoliteness = 'assertive';
      fixture.detectChanges();
      expect(spinnerNativeElement.getAttribute('aria-live')).toBe('assertive');
    });

    it('should update aria-live when ariaLive input changes', () => {
      (testInstance as BasicTestSpinner).ariaPoliteness = 'polite';
      fixture.detectChanges();
      expect(spinnerNativeElement.getAttribute('aria-live')).toBe('polite');

      (testInstance as BasicTestSpinner).ariaPoliteness = 'off';
      fixture.detectChanges();
      expect(spinnerNativeElement.getAttribute('aria-live')).toBe('off');
    });

    it('should set aria-live to off by default', () => {
      createTestComponent(TestAriaLiveSpinnerComponent);
      expect(spinnerNativeElement.getAttribute('aria-live')).toBe('off');
    });
  });
});

@Component({
  selector: 'test-basic-test-spinner',
  template: `<nx-spinner [ariaPoliteness]="ariaPoliteness"></nx-spinner>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSpinnerModule],
})
class BasicTestSpinner extends SpinnerTest {
  ariaPoliteness: AriaPolite = 'assertive';
}

@Component({
  selector: 'test-configurable-spinner',
  template: `<nx-spinner [size]="size" [negative]="negative" [inverse]="inverse"></nx-spinner>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSpinnerModule],
})
class ConfigurableSpinner extends SpinnerTest {}

@Component({
  selector: 'test-on-push-spinner',
  template: `<nx-spinner [size]="size" [negative]="negative"></nx-spinner>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxSpinnerModule],
})
class OnPushSpinner extends SpinnerTest {}

@Component({
  selector: 'test-test-aria-live-spinner-component',
  template: ` <nx-spinner [ariaPoliteness]="'off'"></nx-spinner> `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSpinnerModule],
})
class TestAriaLiveSpinnerComponent extends SpinnerTest {}
