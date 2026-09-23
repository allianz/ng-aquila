import { DOWN_ARROW, END, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxSliderComponent } from './slider.component';
import { NxSliderModule } from './slider.module';

const createKeyboardEvent = (keyCode: number) => {
  const event = document.createEvent('KeyboardEvent') as any;
  Object.defineProperties(event, {
    keyCode: { get: () => keyCode },
    which: { get: () => keyCode },
  });
  return event;
};

@Directive({ standalone: true })
abstract class SliderTest {
  @ViewChild(NxSliderComponent)
  sliderInstance!: NxSliderComponent;
  stepSize = 1;
  min = 0;
  max = 10;
  value = 0;
  width = 100;
  thumbLabel = false;
  hideLabels = true;
}

interface Coordinates {
  x: number;
  y: number;
}

describe('NxSliderComponent', () => {
  let fixture: ComponentFixture<SliderTest>;
  let testInstance: SliderTest;
  let sliderInstance: NxSliderComponent;
  let sliderDebugElement: DebugElement;
  let sliderNativeElement: HTMLElement;

  const createTestComponent = (component: Type<SliderTest>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    sliderInstance = testInstance.sliderInstance;
    sliderDebugElement = fixture.debugElement.query(By.directive(NxSliderComponent));
    sliderNativeElement = sliderDebugElement.nativeElement;
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxSliderModule,
        FormsModule,
        ReactiveFormsModule,
        BasicSlider,
        ConfigurableSlider,
        InvertedSlider,
        DisabledSlider,
        NegativeSlider,
        FloatSlider,
        TruncateTestSlider,
        SimpleBindingSlider,
        NgModelSlider,
        ReactiveFormsSlider,
        BasicSliderOnPush,
        InverseSlider,
        CriticalSlider,
        ProjectedErrorSlider,
        AppendixSlider,
        AriaLabelledBySlider,
        ProjectedLabelSlider,
        ProjectedLabelWithoutIdSlider,
        LabelInfoSlider,
      ],
    }).compileComponents();
  }));

  /**
   * Helper function to fake a slide event.
   *
   * Creates all relevant mouse events and dispatches them.
   */
  const dispatchSlideEvent = (finish: Coordinates) => {
    sliderInstance._dragStart();
    const dragEvent = new MouseEvent('mousemove', {
      screenX: finish.x,
      clientX: finish.x,
      screenY: finish.y,
      clientY: finish.y,
    });
    const releaseEvent = new MouseEvent('mouseup', {
      screenX: finish.x,
      clientX: finish.x,
      screenY: finish.y,
      clientY: finish.y,
    });
    document.dispatchEvent(dragEvent);
    document.dispatchEvent(releaseEvent);
  };

  function getFillerWidth() {
    const filler = fixture.nativeElement.querySelector('.nx-slider__filler');
    return filler.style.width;
  }

  function blurHandle() {
    dispatchFakeEvent(fixture.nativeElement.querySelector('.nx-slider__handle'), 'blur');
    fixture.detectChanges();
  }

  describe('basic', () => {
    it('creates the Slider', () => {
      createTestComponent(BasicSlider);
      expect(sliderInstance).toBeTruthy();
      expect(sliderNativeElement.hasAttribute('aria-disabled')).toBe(false);
    });

    it('renders the Slider with a label', () => {
      createTestComponent(BasicSlider);
      const labelElement: HTMLLabelElement = sliderNativeElement.querySelector(
        'label',
      ) as HTMLLabelElement;
      const anchorElement: HTMLElement = sliderNativeElement.querySelector(
        '.nx-slider__handle',
      ) as HTMLElement;
      expect(labelElement).not.toBeNull();
      expect(labelElement.textContent?.trim()).toBe('testLabel');
      expect(labelElement.id).toBe('testSlider-label');
      expect(anchorElement.id).toBe('testSlider-handle');
    });

    it('should use internal label by default for aria-labelledby', () => {
      createTestComponent(BasicSlider);
      const handleElement: HTMLElement = sliderNativeElement.querySelector(
        '.nx-slider__handle',
      ) as HTMLElement;
      expect(handleElement.getAttribute('aria-labelledby')).toBe('testSlider-label');
    });

    it('should use custom ariaLabelledBy when provided', () => {
      createTestComponent(AriaLabelledBySlider);
      const handleElement: HTMLElement = sliderNativeElement.querySelector(
        '.nx-slider__handle',
      ) as HTMLElement;
      expect(handleElement.getAttribute('aria-labelledby')).toBe('custom-external-label');
    });

    it('should update aria-labelledby when ariaLabelledBy input changes', () => {
      createTestComponent(AriaLabelledBySlider);
      const handleElement: HTMLElement = sliderNativeElement.querySelector(
        '.nx-slider__handle',
      ) as HTMLElement;

      expect(handleElement.getAttribute('aria-labelledby')).toBe('custom-external-label');

      (testInstance as AriaLabelledBySlider).customLabelId = 'another-label';
      fixture.detectChanges();

      expect(handleElement.getAttribute('aria-labelledby')).toBe('another-label');
    });

    it('renders a projected nx-label when no label input is given', () => {
      createTestComponent(ProjectedLabelSlider);
      expect(sliderNativeElement.querySelector('nx-label')?.textContent?.trim()).toBe(
        'Projected label',
      );
      expect(sliderNativeElement.querySelector('.nx-slider__label')).toBeNull();
    });

    it('uses the projected label for aria-labelledby', () => {
      createTestComponent(ProjectedLabelSlider);
      const handleElement = sliderNativeElement.querySelector('.nx-slider__handle')!;
      expect(handleElement.getAttribute('aria-labelledby')).toBe('projected-label');
    });

    it('falls back to the auto-generated id of a projected nx-label without an id', () => {
      createTestComponent(ProjectedLabelWithoutIdSlider);
      const labelledBy = sliderNativeElement
        .querySelector('.nx-slider__handle')!
        .getAttribute('aria-labelledby');

      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy!)?.textContent?.trim()).toBe('Projected label');
    });

    it('prefers the label input over a projected nx-label', () => {
      createTestComponent(ProjectedLabelSlider);
      (testInstance as ProjectedLabelSlider).label = 'Label input';
      fixture.detectChanges();

      const labelElement = sliderNativeElement.querySelector('.nx-slider__label')!;
      expect(labelElement.textContent?.trim()).toBe('Label input');
      expect(sliderNativeElement.querySelectorAll('nx-label').length).toBe(1);
      expect(
        sliderNativeElement.querySelector('.nx-slider__handle')!.getAttribute('aria-labelledby'),
      ).toBe(labelElement.querySelector('label')!.id);
    });

    // `<label for>` cannot reach the handle, since it is a div with role="slider".
    it('focuses the handle when the label is clicked', () => {
      createTestComponent(BasicSlider);

      sliderNativeElement.querySelector<HTMLElement>('.nx-label__content')!.click();

      const handle = sliderNativeElement.querySelector('.nx-slider__handle')!;
      expect(document.activeElement).toBe(handle);
      // The focus ring hangs on this class, so without it the click looks like nothing happened.
      expect(handle.classList).toContain('cdk-keyboard-focused');
    });

    it('focuses the handle when a projected label is clicked', () => {
      createTestComponent(ProjectedLabelSlider);

      sliderNativeElement.querySelector<HTMLElement>('.nx-label__content')!.click();

      const handle = sliderNativeElement.querySelector('.nx-slider__handle')!;
      expect(document.activeElement).toBe(handle);
      expect(handle.classList).toContain('cdk-keyboard-focused');
    });

    it('does not focus the handle when the info icon inside the label is clicked', () => {
      createTestComponent(LabelInfoSlider);

      sliderNativeElement.querySelector<HTMLElement>('.test-info__icon')!.click();

      const handle = sliderNativeElement.querySelector('.nx-slider__handle')!;
      expect(document.activeElement).not.toBe(handle);
      expect(handle.classList).not.toContain('cdk-keyboard-focused');
    });

    it('does not focus the handle of a disabled slider when the label is clicked', () => {
      createTestComponent(DisabledSlider);

      sliderNativeElement.querySelector<HTMLElement>('.nx-label__content')!.click();

      expect(document.activeElement).not.toBe(
        sliderNativeElement.querySelector('.nx-slider__handle'),
      );
    });

    it('renders the Slider with a thumb label', () => {
      createTestComponent(BasicSlider);
      const thumbLabel = fixture.nativeElement.querySelector('.nx-slider__value');
      expect(testInstance.sliderInstance.thumbLabel).toBe(true);
      expect(thumbLabel).not.toBeNull();
    });

    it('renders the Slider with Min and Max labels', () => {
      createTestComponent(BasicSlider);
      const thumbLabel = fixture.nativeElement.querySelector('.nx-slider__value-label');
      expect(testInstance.sliderInstance.thumbLabel).toBe(true);
      expect(thumbLabel).not.toBeNull();
    });

    it('should set the default values', () => {
      createTestComponent(BasicSlider);
      expect(sliderInstance.value).toBe(0);
      expect(sliderInstance.min).toBe(0);
      expect(sliderInstance.max).toBe(100);
    });

    it('should correctly calculate percentages', () => {
      createTestComponent(ConfigurableSlider);
      testInstance.min = 10;
      testInstance.max = 110;
      testInstance.value = 60;
      fixture.detectChanges();
      expect(sliderInstance._percentageValue).toBe(50);
    });

    it('should clamp the percentage', () => {
      createTestComponent(ConfigurableSlider);
      testInstance.value = 1000;
      fixture.detectChanges();
      expect(sliderInstance._percentageValue).toBe(100);
      testInstance.value = -1000;
      fixture.detectChanges();
      expect(sliderInstance._percentageValue).toBe(0);
    });

    it('should correctly set the value on click', () => {
      createTestComponent(BasicSlider);
      const event = new MouseEvent('MouseEvent', {
        screenX: 20,
        clientX: 20,
        screenY: 10,
        clientY: 10,
      });
      sliderInstance._sliderClick(event);

      const value = sliderInstance.value;
      expect(value).toBe(20);
      expect(sliderInstance._percentageValue).toBe(20);
    });

    it('should stay within range', () => {
      createTestComponent(BasicSlider);

      expect(sliderInstance.value).toBe(0);

      const leftArrowEvent = createKeyboardEvent(LEFT_ARROW);
      sliderInstance._handleKeypress(leftArrowEvent);
      expect(sliderInstance.value).toBe(0);

      sliderInstance.value = 100;

      const rightArrowEvent = createKeyboardEvent(RIGHT_ARROW);
      sliderInstance._handleKeypress(rightArrowEvent);
      expect(sliderInstance.value).toBe(100);
    });

    it('calculates valid steps correctly', () => {
      createTestComponent(ConfigurableSlider);
      testInstance.min = 1;
      // minimum is valid step
      testInstance.value = 1;
      fixture.detectChanges();
      expect(sliderInstance._isValidStep()).toBe(true);
      // all multitudes are valid
      testInstance.value = 3;
      fixture.detectChanges();
      expect(sliderInstance._isValidStep()).toBe(true);
      testInstance.value = 2.5;
      fixture.detectChanges();
      expect(sliderInstance._isValidStep()).toBe(false);
      testInstance.stepSize = 0.28;
      testInstance.value = 1.28;
      fixture.detectChanges();
      expect(sliderInstance._isValidStep()).toBe(true);
      testInstance.value = 2.12;
      fixture.detectChanges();
      expect(sliderInstance._isValidStep()).toBe(true);
      testInstance.value = 1.5;
      fixture.detectChanges();
      expect(sliderInstance._isValidStep()).toBe(false);
    });

    it('should snap to the nearest valid step on click', () => {
      createTestComponent(ConfigurableSlider);
      testInstance.min = 0;
      testInstance.stepSize = 10;
      testInstance.max = 100;
      testInstance.width = 1000;
      fixture.detectChanges();
      let event = new MouseEvent('MouseEvent', {
        screenX: 260,
        clientX: 260,
        screenY: 10,
        clientY: 10,
      });
      sliderInstance._sliderClick(event);

      let value = sliderInstance.value;
      expect(value).toBe(30);
      expect(sliderInstance._percentageValue).toBe(30);

      event = new MouseEvent('MouseEvent', {
        screenX: 230,
        clientX: 230,
        screenY: 10,
        clientY: 10,
      });
      sliderInstance._sliderClick(event);

      value = sliderInstance.value;
      expect(value).toBe(20);
      expect(sliderInstance._percentageValue).toBe(20);
    });

    it('should snap to the nearest valid step on keyboard event', () => {
      createTestComponent(ConfigurableSlider);
      testInstance.min = 1;
      testInstance.max = 10;
      testInstance.value = 10;
      testInstance.stepSize = 0.28;
      fixture.detectChanges();

      const leftArrowEvent = createKeyboardEvent(LEFT_ARROW);
      sliderInstance._handleKeypress(leftArrowEvent);
      expect(sliderInstance.value).toBe(9.96);
    });

    it('should snap to the next valid step on slide', () => {
      createTestComponent(ConfigurableSlider);
      testInstance.min = 0;
      testInstance.stepSize = 10;
      testInstance.max = 100;
      testInstance.width = 1000;
      fixture.detectChanges();

      dispatchSlideEvent({ x: 260, y: 10 });

      expect(sliderInstance.value).toBe(30);
    });

    it('_isMinimum is true when the value equals nxMin', () => {
      createTestComponent(ConfigurableSlider);
      testInstance.min = 2;
      testInstance.value = 2;
      fixture.detectChanges();
      expect(sliderInstance._isMinimum()).toBe(true);
      testInstance.value = 3;
      fixture.detectChanges();
      expect(sliderInstance._isMinimum()).toBe(false);
    });

    it('should set value to maximun when press end button', () => {
      createTestComponent(ConfigurableSlider);
      testInstance.min = 0;
      testInstance.max = 100;
      fixture.detectChanges();

      const endButtonEvent = createKeyboardEvent(END);
      sliderInstance._handleKeypress(endButtonEvent);
      expect(sliderInstance.value).toBe(100);
    });

    it('should set value to minimun when press end button', () => {
      createTestComponent(ConfigurableSlider);
      testInstance.min = 0;
      testInstance.max = 100;
      fixture.detectChanges();

      const homeButtonEvent = createKeyboardEvent(HOME);
      sliderInstance._handleKeypress(homeButtonEvent);
      expect(sliderInstance.value).toBe(0);
    });
  });

  describe('inverted', () => {
    it('should correctly set the value on click if inverted', () => {
      createTestComponent(InvertedSlider);
      const event = new MouseEvent('MouseEvent', {
        screenX: 20,
        clientX: 20,
        screenY: 10,
        clientY: 10,
      });
      sliderInstance._sliderClick(event);

      const value = sliderInstance.value;
      expect(value).toBe(80);
      expect(sliderInstance._percentageValue).toBe(20);
    });
  });

  describe('disabling', () => {
    it('can be disabled', () => {
      createTestComponent(DisabledSlider);
      // initial value is 42
      expect(sliderInstance.value).toBe(42);

      const rightArrowEvent = createKeyboardEvent(RIGHT_ARROW);
      sliderInstance._handleKeypress(rightArrowEvent);
      // value of disabled slider should not have changed
      expect(sliderInstance.value).toBe(42);
      expect(sliderNativeElement.hasAttribute('aria-disabled')).toBe(true);
      expect(sliderNativeElement.tabIndex).toBe(-1);
      expect(sliderNativeElement).toHaveClass('nx-slider--disabled');
    });
  });

  describe('no thumb label', () => {
    it('does not show thumb label', () => {
      createTestComponent(ConfigurableSlider);
      const thumbLabel = fixture.nativeElement.querySelector('.nx-slider__value');
      expect(testInstance.sliderInstance.thumbLabel).toBe(false);
      expect(thumbLabel).toBeNull();
    });

    it('hides Min and Max labels', () => {
      createTestComponent(ConfigurableSlider);
      const thumbLabels = fixture.nativeElement.querySelector('.nx-slider__value-label');
      expect(testInstance.sliderInstance.hideLabels).toBe(true);
      expect(thumbLabels).toBeNull();
    });
  });

  describe('with negative vales', () => {
    it('should be able to handle negative values', () => {
      createTestComponent(NegativeSlider);
      const event = new MouseEvent('MouseEvent', {
        screenX: 20,
        clientX: 20,
        screenY: 10,
        clientY: 10,
      });
      sliderInstance._sliderClick(event);

      const value = sliderInstance.value;
      expect(value).toBe(-30);
      expect(sliderInstance._percentageValue).toBe(20);
    });
  });

  describe('with float values', () => {
    it('should be able to handle float values', () => {
      createTestComponent(FloatSlider);
      const event = new MouseEvent('MouseEvent', {
        screenX: 20,
        clientX: 20,
        screenY: 10,
        clientY: 10,
      });
      sliderInstance._sliderClick(event);

      const value = sliderInstance.value;
      expect(value).toBe(0.2);
      expect(sliderInstance._percentageValue).toBe(20);
    });

    it('should truncate long decimal values based on step', () => {
      createTestComponent(TruncateTestSlider);

      // simulate the dragging of the slider
      dispatchSlideEvent({ x: 85, y: 85 });

      const value = sliderInstance.value;
      // 1.7 is one of the first values that break
      expect(value).toBe(1.7);
    });

    it('should truncate long decimal values by keyboard events', () => {
      createTestComponent(FloatSlider);
      const rightArrowEvent = createKeyboardEvent(RIGHT_ARROW);
      sliderInstance._handleKeypress(rightArrowEvent);
      expect(sliderInstance.value).toBe(0.1);
      sliderInstance._handleKeypress(rightArrowEvent);
      expect(sliderInstance.value).toBe(0.2);
      sliderInstance._handleKeypress(rightArrowEvent);
      // 0.3 usually breaks to 0.30000000000000004 if not handled correctly
      expect(sliderInstance.value).toBe(0.3);
    });
  });

  describe('with simple binding', () => {
    it('should set initial value correctly', () => {
      createTestComponent(SimpleBindingSlider);
      expect(sliderInstance.value).toBe(10);
      expect(getFillerWidth()).toBe('10%');
    });

    it('should have working two way binding', () => {
      createTestComponent(SimpleBindingSlider);

      dispatchSlideEvent({ x: 30, y: 10 });
      fixture.detectChanges();

      expect(sliderInstance.value).toBe(30);
      expect(testInstance.value).toBe(30);
    });
  });

  describe('with ngModel', () => {
    it('should write the model value', fakeAsync(() => {
      createTestComponent(NgModelSlider);
      tick();
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(10);
      expect(getFillerWidth()).toBe('10%');
    }));

    it('should update the model value after sliding', fakeAsync(() => {
      createTestComponent(NgModelSlider);
      tick();
      fixture.detectChanges();

      dispatchSlideEvent({ x: 30, y: 10 });
      tick();
      fixture.detectChanges();

      expect(sliderInstance.value).toBe(30);
      expect(testInstance.value).toBe(30);
    }));

    it('should be touched when the handle is blurred', fakeAsync(() => {
      createTestComponent(NgModelSlider);
      tick();
      fixture.detectChanges();
      const ngModel = (testInstance as NgModelSlider).ngModel;

      expect(ngModel.touched).toBe(false);

      blurHandle();
      tick();

      expect(ngModel.touched).toBe(true);
    }));
  });

  describe('with reactive forms', () => {
    it('should write the form control value', () => {
      createTestComponent(ReactiveFormsSlider);
      expect(sliderInstance.value).toBe(10);
      expect(getFillerWidth()).toBe('10%');
    });

    it('should update form value after sliding', () => {
      createTestComponent(ReactiveFormsSlider);
      const instance = testInstance as ReactiveFormsSlider;

      dispatchSlideEvent({ x: 30, y: 10 });
      fixture.detectChanges();

      expect(sliderInstance.value).toBe(30);
      expect(instance.testForm.controls.slide.value).toBe(30);
    });

    // The handle is the only focusable part of the slider, so the slider is a standalone
    // control that marks itself touched on the handle's own blur.
    it('should be touched when the handle is blurred', () => {
      createTestComponent(ReactiveFormsSlider);
      const control = (testInstance as ReactiveFormsSlider).testForm.controls.slide;

      expect(control.touched).toBe(false);

      blurHandle();

      expect(control.touched).toBe(true);
    });

    it('should not be touched before any interaction', () => {
      createTestComponent(ReactiveFormsSlider);

      expect((testInstance as ReactiveFormsSlider).testForm.controls.slide.touched).toBe(false);
    });

    it('should toggle disabled', () => {
      createTestComponent(ReactiveFormsSlider);
      const instance = testInstance as ReactiveFormsSlider;
      instance.testForm.controls.slide.disable();
      fixture.detectChanges();
      expect(sliderNativeElement).toHaveClass('nx-slider--disabled');
      expect(testInstance.sliderInstance.disabled).toBe(true);
      expect(sliderNativeElement.hasAttribute('aria-disabled')).toBe(true);

      instance.testForm.controls.slide.enable();
      fixture.detectChanges();
      expect(sliderNativeElement).not.toHaveClass('nx-slider--disabled');
      expect(testInstance.sliderInstance.disabled).toBe(false);
      expect(sliderNativeElement.hasAttribute('aria-disabled')).toBe(false);
    });
  });

  describe('show appendix', () => {
    it('display a given appendix', () => {
      createTestComponent(AppendixSlider);
      expect(fixture.nativeElement.querySelector('.nx-slider__appendix')).toBeTruthy();
    });
  });

  describe('programmatic change', () => {
    it('should update after tabindex change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.tabindex = 5;
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.nx-slider__handle').getAttribute('tabindex'),
      ).toBe('5');
    });

    it('should update after label change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.label = 'programmatic label';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.nx-slider__label').textContent.trim()).toBe(
        'programmatic label',
      );
    });

    it('should update after disabled change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.disabled = true;
      fixture.detectChanges();
      expect(sliderNativeElement).toHaveClass('nx-slider--disabled');
    });

    it('should update after inverted change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.inverted = true;
      fixture.detectChanges();
      expect(getFillerWidth()).toBe('100%');

      testInstance.sliderInstance.inverted = false;
      fixture.detectChanges();
      expect(getFillerWidth()).toBe('0%');
    });

    it('should update after value change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.value = 50;
      fixture.detectChanges();
      expect(getFillerWidth()).toBe('50%');
    });

    it('should update after min change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.min = -100;
      fixture.detectChanges();
      expect(getFillerWidth()).toBe('50%');
    });

    it('should update after max change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.value = 25;
      fixture.detectChanges();
      expect(getFillerWidth()).toBe('25%');
      testInstance.sliderInstance.max = 50;
      fixture.detectChanges();
      expect(getFillerWidth()).toBe('50%');
    });

    it('should update after negative change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.negative = true;
      fixture.detectChanges();
      expect(sliderNativeElement).toHaveClass('nx-slider--negative');
    });

    it('should apply the inverse styles via the legacy negative input', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.negative = true;
      fixture.detectChanges();
      expect(sliderNativeElement).toHaveClass('nx-slider--negative');
      expect(testInstance.sliderInstance.inverse()).toBe(true);
    });

    it('should apply the inverse styles via the inverse input', () => {
      createTestComponent(InverseSlider);
      (testInstance as InverseSlider).inverse = true;
      fixture.detectChanges();
      expect(sliderNativeElement).toHaveClass('nx-slider--negative');
      expect(testInstance.sliderInstance.inverse()).toBe(true);
    });

    it('should update after id change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.id = 'slider-with-id';
      fixture.detectChanges();
      const labelElement: HTMLLabelElement = sliderNativeElement.querySelector(
        'label',
      ) as HTMLLabelElement;
      const anchorElement: HTMLElement = sliderNativeElement.querySelector(
        '.nx-slider__handle',
      ) as HTMLElement;
      expect(labelElement.id).toBe('slider-with-id-label');
      expect(anchorElement.id).toBe('slider-with-id-handle');
    });

    it('should update after thumb label change', () => {
      createTestComponent(BasicSliderOnPush);
      testInstance.sliderInstance.thumbLabel = false;
      fixture.detectChanges();
      let thumbLabel = fixture.nativeElement.querySelector('.nx-slider__value');
      expect(testInstance.sliderInstance.thumbLabel).toBe(false);
      expect(thumbLabel).toBeNull();

      testInstance.sliderInstance.thumbLabel = true;
      fixture.detectChanges();
      thumbLabel = fixture.nativeElement.querySelector('.nx-slider__value');
      expect(testInstance.sliderInstance.thumbLabel).toBe(true);
      expect(thumbLabel).not.toBeNull();
    });

    it('Should emit change event only once on drag', () => {
      createTestComponent(BasicSlider);
      const onChangeSpy = vi.fn().mockName('slider onChange');
      sliderInstance.valueChange.subscribe(onChangeSpy);
      dispatchSlideEvent({ x: 260, y: 10 });
      fixture.detectChanges();
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('critical', () => {
    function getHandle() {
      return fixture.nativeElement.querySelector('.nx-slider__handle') as HTMLElement;
    }

    function getControl() {
      return (testInstance as CriticalSlider).testForm.controls.slide;
    }

    function submitForm() {
      dispatchFakeEvent(fixture.nativeElement.querySelector('form'), 'submit');
      fixture.detectChanges();
    }

    it('stays neutral while the invalid control is untouched', () => {
      createTestComponent(CriticalSlider);

      expect(getControl().invalid).toBe(true);
      expect(sliderNativeElement).not.toHaveClass('nx-slider--critical');
      expect(getHandle().hasAttribute('aria-invalid')).toBe(false);
    });

    it('turns critical once the invalid control is touched', () => {
      createTestComponent(CriticalSlider);

      blurHandle();

      expect(sliderNativeElement).toHaveClass('nx-slider--critical');
      expect(getHandle().getAttribute('aria-invalid')).toBe('true');
    });

    it('turns critical when the form is submitted with an untouched invalid control', () => {
      createTestComponent(CriticalSlider);
      expect(getControl().touched).toBe(false);

      submitForm();

      expect(sliderNativeElement).toHaveClass('nx-slider--critical');
      expect(getHandle().getAttribute('aria-invalid')).toBe('true');
    });

    it('leaves the critical state once the control becomes valid', () => {
      createTestComponent(CriticalSlider);
      blurHandle();
      expect(sliderNativeElement).toHaveClass('nx-slider--critical');

      getControl().setValue(60);
      fixture.detectChanges();

      expect(sliderNativeElement).not.toHaveClass('nx-slider--critical');
      expect(getHandle().hasAttribute('aria-invalid')).toBe(false);
    });

    it('projects every error only in the critical state', () => {
      createTestComponent(CriticalSlider);
      expect(fixture.nativeElement.querySelector('nx-error')).toBeNull();
      expect(getHandle().hasAttribute('aria-describedby')).toBe(false);

      blurHandle();

      const errorContents: HTMLElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('nx-error .nx-error__content'),
      );
      expect(errorContents.length).toBe(2);
      expect(getHandle().getAttribute('aria-describedby')).toBe(
        errorContents.map((content) => content.getAttribute('id')).join(' '),
      );
    });

    it('stays neutral without a form control', () => {
      createTestComponent(BasicSlider);

      expect(sliderNativeElement).not.toHaveClass('nx-slider--critical');
      expect(getHandle().hasAttribute('aria-invalid')).toBe(false);
      expect(fixture.nativeElement.querySelector('.nx-slider__error')).toBeNull();
    });

    it('shows a projected error without a form control', () => {
      createTestComponent(ProjectedErrorSlider);

      expect(fixture.nativeElement.querySelector('.nx-slider__error nx-error')).not.toBeNull();
    });
  });

  describe('a11y', () => {
    it('should handle keyboard events', () => {
      createTestComponent(BasicSlider);

      expect(sliderInstance.value).toBe(0);

      const rightArrowEvent = createKeyboardEvent(RIGHT_ARROW);
      sliderInstance._handleKeypress(rightArrowEvent);
      expect(sliderInstance.value).toBe(1);

      const upArrowEvent = createKeyboardEvent(UP_ARROW);
      sliderInstance._handleKeypress(upArrowEvent);
      expect(sliderInstance.value).toBe(2);

      const leftArrowEvent = createKeyboardEvent(LEFT_ARROW);
      sliderInstance._handleKeypress(leftArrowEvent);
      expect(sliderInstance.value).toBe(1);

      const downArrowEvent = createKeyboardEvent(DOWN_ARROW);
      sliderInstance._handleKeypress(downArrowEvent);
      expect(sliderInstance.value).toBe(0);
    });

    it('should handle keyboard events correctly if inverted', () => {
      createTestComponent(InvertedSlider);

      expect(sliderInstance.value).toBe(0);

      const leftArrowEvent = createKeyboardEvent(LEFT_ARROW);
      sliderInstance._handleKeypress(leftArrowEvent);
      expect(sliderInstance.value).toBe(1);

      const upArrowEvent = createKeyboardEvent(UP_ARROW);
      sliderInstance._handleKeypress(upArrowEvent);
      expect(sliderInstance.value).toBe(2);

      const rightArrowEvent = createKeyboardEvent(RIGHT_ARROW);
      sliderInstance._handleKeypress(rightArrowEvent);
      expect(sliderInstance.value).toBe(1);

      const downArrowEvent = createKeyboardEvent(DOWN_ARROW);
      sliderInstance._handleKeypress(downArrowEvent);
      expect(sliderInstance.value).toBe(0);
    });

    it('should focus the handle element by clicking on the label', () => {
      createTestComponent(BasicSlider);
      const label = fixture.nativeElement.querySelector('.nx-slider__label');
      label.click();
      const handle = fixture.nativeElement.querySelector('.nx-slider__handle');
      expect(_getFocusedElementPierceShadowDom()).toBe(handle);
    });

    it('has no accessibility violations', async () => {
      createTestComponent(BasicSlider);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });

  describe('label position', () => {
    it('offsets the value label when it would overflow the viewport edge', async () => {
      createTestComponent(BasicSlider);
      await fixture.whenStable();
      fixture.detectChanges();

      const label: HTMLElement = sliderNativeElement.querySelector('.nx-slider__value')!;
      expect(label.getBoundingClientRect().left).toBe(4);
    });
  });
});

// make the slider 100px wide and position it reliably, so we have nice predictable coordinates for simulated clicks
const styles = `
  .slider-container { width: 100px; position: absolute; top: 0; left: 0;}
`;

@Component({
  selector: 'test-basic-slider',
  template: `
    <div class="slider-container">
      <nx-slider id="testSlider" label="testLabel"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class BasicSlider extends SliderTest {}

@Component({
  selector: 'test-basic-slider-on-push',
  template: `
    <div class="slider-container">
      <nx-slider id="testSlider" label="testLabel"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class BasicSliderOnPush extends SliderTest {}

@Component({
  selector: 'test-inverse-slider',
  template: `
    <div class="slider-container">
      <nx-slider id="testSlider" label="testLabel" [inverse]="inverse"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class InverseSlider extends SliderTest {
  inverse = false;
}

@Component({
  selector: 'test-critical-slider',
  template: `
    <form [formGroup]="testForm">
      <div class="slider-container">
        <nx-slider [formControl]="testForm.controls.slide">
          <nx-error>Too small.</nx-error>
          <nx-error>Pick at least 40.</nx-error>
        </nx-slider>
      </div>
    </form>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class CriticalSlider extends SliderTest {
  testForm = new FormBuilder().group({
    slide: new FormControl(10, Validators.min(40)),
  });
}

@Component({
  selector: 'test-projected-error-slider',
  template: `
    <nx-slider>
      <nx-error>Too small.</nx-error>
    </nx-slider>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule],
})
class ProjectedErrorSlider extends SliderTest {}

@Component({
  selector: 'test-configurable-slider',
  template: `
    <div class="slider-container" [style.width.px]="width">
      <nx-slider
        id="testSlider"
        label="testLabel"
        [min]="min"
        [max]="max"
        [step]="stepSize"
        [value]="value"
        [thumbLabel]="thumbLabel"
        [hideLabels]="hideLabels"
      >
      </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class ConfigurableSlider extends SliderTest {}

@Component({
  selector: 'test-negative-slider',
  template: `
    <div class="slider-container">
      <nx-slider [min]="-50" [max]="50" [step]="1"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class NegativeSlider extends SliderTest {}

@Component({
  selector: 'test-truncate-test-slider',
  template: `
    <div class="slider-container">
      <nx-slider [min]="0" [max]="2" [step]="0.1"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class TruncateTestSlider extends SliderTest {}

@Component({
  selector: 'test-float-slider',
  template: `
    <div class="slider-container">
      <nx-slider [min]="0" [max]="1" [step]="0.1"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class FloatSlider extends SliderTest {}

@Component({
  selector: 'test-disabled-slider',
  template: `
    <div class="slider-container">
      <nx-slider label="testLabel" [value]="42" [disabled]="true"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class DisabledSlider extends SliderTest {}

@Component({
  selector: 'test-inverted-slider',
  template: `
    <div class="slider-container">
      <nx-slider [inverted]="true"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class InvertedSlider extends SliderTest {}

@Component({
  selector: 'test-simple-binding-slider',
  template: `
    <div class="slider-container">
      <nx-slider [(value)]="value"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class SimpleBindingSlider extends SliderTest {
  value = 10;
}

@Component({
  selector: 'test-ng-model-slider',
  template: `
    <div class="slider-container">
      <nx-slider [(ngModel)]="value"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class NgModelSlider extends SliderTest {
  @ViewChild(NgModel) ngModel!: NgModel;
  value = 10;
}

@Component({
  selector: 'test-reactive-forms-slider',
  template: `
    <div class="slider-container">
      <nx-slider [formControl]="testForm.controls.slide"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class ReactiveFormsSlider extends SliderTest {
  testForm = new FormBuilder().group({
    slide: new FormControl(10),
  });
}

@Component({
  selector: 'test-appendix-slider',
  template: `
    <div class="slider-container">
      <nx-slider [min]="-50" [max]="50" [step]="1">
        <span nxSliderAppendix></span>
      </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class AppendixSlider extends SliderTest {}

@Component({
  selector: 'test-aria-labelled-by-slider',
  template: `
    <div class="slider-container">
      <label id="custom-external-label">External Label</label>
      <nx-slider [min]="0" [max]="100" [ariaLabelledBy]="customLabelId"> </nx-slider>
    </div>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule, FormsModule, ReactiveFormsModule],
})
class AriaLabelledBySlider extends SliderTest {
  customLabelId = 'custom-external-label';
}

@Component({
  selector: 'test-projected-label-slider',
  template: `
    <nx-slider [min]="0" [max]="100" [label]="label">
      <nx-label id="projected-label">Projected label</nx-label>
    </nx-slider>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule],
})
class ProjectedLabelSlider extends SliderTest {
  label = '';
}

@Component({
  selector: 'test-projected-label-without-id-slider',
  template: `
    <nx-slider [min]="0" [max]="100">
      <nx-label>Projected label</nx-label>
    </nx-slider>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule],
})
class ProjectedLabelWithoutIdSlider extends SliderTest {}

/** The button stands in for `nx-info-icon`: the click lands on a child of the `nxLabelInfo` element. */
@Component({
  selector: 'test-label-info-slider',
  template: `
    <nx-slider [min]="0" [max]="100">
      <nx-label>
        Projected label
        <button nxLabelInfo type="button">
          <span class="test-info__icon">i</span>
        </button>
      </nx-label>
    </nx-slider>
  `,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSliderModule],
})
class LabelInfoSlider extends SliderTest {}
