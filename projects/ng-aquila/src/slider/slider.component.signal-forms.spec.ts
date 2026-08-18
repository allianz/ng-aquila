import { RIGHT_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, max, min } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxSliderComponent } from './slider.component';
import { NxSliderModule } from './slider.module';

/**
 * Signal Forms interop tests for the slider (Angular 22, `[formField]` /
 * ControlValueAccessor backwards-compat path). The model field is a NUMBER that
 * starts at 0 (never null).
 */

// 100px wide, absolutely positioned so simulated click coordinates are predictable.
const styles = `.slider-container { width: 100px; position: absolute; top: 0; left: 0; }`;

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxSliderModule],
  styles: [styles],
  // `[min]`/`[max]` cannot be bound on a `[formField]` node (NG8022); the slider's
  // own defaults are min 0 / max 100, which is what these tests assume.
  template: `
    <div class="slider-container">
      <nx-slider [step]="1" [formField]="myForm.amount"></nx-slider>
    </div>
  `,
})
class BasicSignalFormSlider {
  model = signal({ amount: 0 });
  myForm = form(this.model);
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxSliderModule],
  styles: [styles],
  template: `
    <div class="slider-container">
      <nx-slider [step]="1" [formField]="myForm.amount"></nx-slider>
    </div>
  `,
})
class ValidatedSignalFormSlider {
  model = signal({ amount: 0 });
  myForm = form(this.model, (p) => {
    min(p.amount, 10);
    max(p.amount, 50);
  });
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxSliderModule],
  styles: [styles],
  // `[min]`/`[max]` cannot be bound on a `[formField]` node (NG8022); defaults are 0/100.
  template: `
    <div class="slider-container">
      <nx-slider [step]="1" [formField]="myForm.amount"></nx-slider>
    </div>
  `,
})
class DisabledSignalFormSlider {
  model = signal({ amount: 0 });
  myForm = form(this.model, (p) => {
    disabled(p.amount, { when: () => true });
  });
}

describe('NxSliderComponent signal forms', () => {
  function setup<T>(component: new () => T): {
    fixture: ComponentFixture<T>;
    host: T;
    slider: NxSliderComponent;
    sliderEl: HTMLElement;
    handle: HTMLElement;
    slide: HTMLElement;
  } {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    const host = fixture.componentInstance;
    const debugEl = fixture.debugElement.query(By.directive(NxSliderComponent));
    const slider = debugEl.componentInstance as NxSliderComponent;
    const sliderEl = debugEl.nativeElement as HTMLElement;
    const handle = sliderEl.querySelector('.nx-slider__handle') as HTMLElement;
    const slide = sliderEl.querySelector('.nx-slider__slide') as HTMLElement;
    return { fixture, host, slider, sliderEl, handle, slide };
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxSliderModule,
        BasicSignalFormSlider,
        ValidatedSignalFormSlider,
        DisabledSignalFormSlider,
      ],
    }).compileComponents();
  }));

  describe('model to view', () => {
    it('reflects a numeric model value into the slider', fakeAsync(() => {
      const { fixture, host, slider, handle } = setup(BasicSignalFormSlider);

      expect(slider.value).toBe(0);

      host.model.update((m) => ({ ...m, amount: 40 }));
      fixture.detectChanges();
      tick();

      expect(slider.value).toBe(40);
      expect(handle.getAttribute('aria-valuenow')).toBe('40');
      expect(
        (fixture.nativeElement.querySelector('.nx-slider__filler') as HTMLElement).style.width,
      ).toBe('40%');
      expect(host.myForm.amount().value()).toBe(40);
    }));
  });

  describe('view to model', () => {
    it('writes the value back into the form model on arrow-key interaction', fakeAsync(() => {
      const { fixture, host, sliderEl } = setup(BasicSignalFormSlider);

      expect(host.myForm.amount().value()).toBe(0);

      dispatchKeyboardEvent(sliderEl, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      tick();

      expect(host.myForm.amount().value()).toBe(1);

      dispatchKeyboardEvent(sliderEl, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      tick();

      expect(host.myForm.amount().value()).toBe(2);
    }));

    it('writes the value back into the form model on click', fakeAsync(() => {
      const { fixture, host, slide } = setup(BasicSignalFormSlider);

      // container is 100px wide at left:0, so a click at clientX 20 == value 20
      slide.dispatchEvent(
        new MouseEvent('click', { clientX: 20, clientY: 5, bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();
      tick();

      expect(host.myForm.amount().value()).toBe(20);
    }));
  });

  describe('touched on blur', () => {
    // The handle is the only focusable part of the slider, so the slider is a standalone
    // control that touches the field on the handle's own blur.
    it('marks the field touched when the handle is blurred', fakeAsync(() => {
      const { fixture, host, handle } = setup(BasicSignalFormSlider);

      expect(host.myForm.amount().touched()).toBe(false);

      handle.dispatchEvent(new Event('focus'));
      dispatchFakeEvent(handle, 'blur');
      fixture.detectChanges();
      tick();

      expect(host.myForm.amount().touched()).toBe(true);
    }));

    it('does not mark the field touched before any interaction', fakeAsync(() => {
      const { host } = setup(BasicSignalFormSlider);

      expect(host.myForm.amount().touched()).toBe(false);
      tick();
    }));
  });

  describe('validation wiring (schema min/max)', () => {
    it('is invalid below the schema min and becomes valid once satisfied', fakeAsync(() => {
      const { fixture, host, sliderEl } = setup(ValidatedSignalFormSlider);

      expect(host.myForm().invalid()).toBe(true);
      expect(host.myForm.amount().errors().length).toBeGreaterThan(0);

      host.model.update((m) => ({ ...m, amount: 20 }));
      fixture.detectChanges();
      tick();

      expect(host.myForm().valid()).toBe(true);
      expect(host.myForm.amount().errors().length).toBe(0);

      // push above the max via keyboard-free model update to re-check max wiring
      host.model.update((m) => ({ ...m, amount: 80 }));
      fixture.detectChanges();
      tick();

      expect(host.myForm().invalid()).toBe(true);
    }));
  });

  describe('disabled rule', () => {
    it('disables the slider when disabled() is applied', fakeAsync(() => {
      const { fixture, slider, sliderEl } = setup(DisabledSignalFormSlider);

      tick();
      fixture.detectChanges();

      expect(slider.disabled).toBe(true);
      expect(sliderEl).toHaveClass('nx-slider--disabled');
      expect(sliderEl.getAttribute('aria-disabled')).toBe('true');
    }));

    it('does not change the model on keyboard interaction while disabled', fakeAsync(() => {
      const { fixture, host, sliderEl } = setup(DisabledSignalFormSlider);

      dispatchKeyboardEvent(sliderEl, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      tick();

      expect(host.myForm.amount().value()).toBe(0);
    }));
  });
});
