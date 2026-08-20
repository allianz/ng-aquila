import { ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, max, min } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxRatingComponent } from './rating.component';
import { NxRatingModule } from './rating.module';

/**
 * Signal Forms interop tests for the rating (Angular 22, `[formField]` /
 * ControlValueAccessor backwards-compat path). The model field is a NUMBER
 * (selected star 0-5) that starts at 0 (never null).
 */

@Component({
  selector: 'test-basic-signal-form-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxRatingModule],
  template: `<nx-rating [formField]="myForm.stars"></nx-rating>`,
})
class BasicSignalFormRating {
  model = signal({ stars: 0 });
  myForm = form(this.model);
}

@Component({
  selector: 'test-validated-signal-form-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxRatingModule],
  template: `<nx-rating [formField]="myForm.stars"></nx-rating>`,
})
class ValidatedSignalFormRating {
  model = signal({ stars: 0 });
  myForm = form(this.model, (p) => {
    // a valid rating is 1..5; 0 (no selection) is invalid
    min(p.stars, 1);
    max(p.stars, 5);
  });
}

@Component({
  selector: 'test-disabled-signal-form-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxRatingModule],
  template: `<nx-rating [formField]="myForm.stars"></nx-rating>`,
})
class DisabledSignalFormRating {
  model = signal({ stars: 0 });
  myForm = form(this.model, (p) => {
    disabled(p.stars, { when: () => true });
  });
}

describe('NxRatingComponent signal forms', () => {
  function setup<T>(component: new () => T): {
    fixture: ComponentFixture<T>;
    host: T;
    rating: NxRatingComponent;
    inputs: HTMLInputElement[];
    icons: HTMLElement[];
  } {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    const host = fixture.componentInstance;
    const debugEl = fixture.debugElement.query(By.directive(NxRatingComponent));
    const rating = debugEl.componentInstance as NxRatingComponent;
    const inputs = Array.from(
      fixture.nativeElement.querySelectorAll('input'),
    ) as HTMLInputElement[];
    const icons = Array.from(fixture.nativeElement.querySelectorAll('nx-icon')) as HTMLElement[];
    return { fixture, host, rating, inputs, icons };
  }

  // Clicks the star at the given 1-based rating value.
  function clickStar(icons: HTMLElement[], value: number) {
    icons[value - 1].click();
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxRatingModule,
        BasicSignalFormRating,
        ValidatedSignalFormRating,
        DisabledSignalFormRating,
      ],
    }).compileComponents();
  }));

  describe('model to view', () => {
    it('reflects a numeric model value into the selected stars', fakeAsync(() => {
      const { fixture, host, rating } = setup(BasicSignalFormRating);

      expect(rating.value).toBe(0);

      host.model.update((m) => ({ ...m, stars: 3 }));
      fixture.detectChanges();
      tick();

      expect(rating.value).toBe(3);
      // stars 1..3 are visually checked, 4 and 5 are not
      expect(rating.getIconName(3)).toBe('star');
      expect(rating.getIconName(4)).toBe('star-o');
      expect(host.myForm.stars().value()).toBe(3);
    }));
  });

  describe('view to model', () => {
    it('writes the clicked star back into the form model as a number', fakeAsync(() => {
      const { fixture, host, icons } = setup(BasicSignalFormRating);

      expect(host.myForm.stars().value()).toBe(0);

      clickStar(icons, 4);
      fixture.detectChanges();
      tick();

      expect(host.myForm.stars().value()).toBe(4);
      expect(typeof host.myForm.stars().value()).toBe('number');
    }));

    it('writes the selected rating into the form model on keyboard ENTER', fakeAsync(() => {
      const { fixture, host, inputs } = setup(BasicSignalFormRating);

      dispatchKeyboardEvent(inputs[1], 'keyup', ENTER);
      fixture.detectChanges();
      tick();

      expect(host.myForm.stars().value()).toBe(2);
    }));
  });

  describe('touched', () => {
    // The rating marks itself touched when a selection is made (it has no blur
    // handling of its own). Assert touched flips on interaction.
    it('marks the field touched after a star is selected', fakeAsync(() => {
      const { fixture, host, icons } = setup(BasicSignalFormRating);

      expect(host.myForm.stars().touched()).toBe(false);

      clickStar(icons, 2);
      fixture.detectChanges();
      tick();

      expect(host.myForm.stars().touched()).toBe(true);
    }));
  });

  describe('validation wiring (schema min/max)', () => {
    it('is invalid with no selection and becomes valid once a star is clicked', fakeAsync(() => {
      const { fixture, host, icons } = setup(ValidatedSignalFormRating);

      expect(host.myForm().invalid()).toBe(true);
      expect(host.myForm.stars().errors().length).toBeGreaterThan(0);

      clickStar(icons, 3);
      fixture.detectChanges();
      tick();

      expect(host.myForm.stars().value()).toBe(3);
      expect(host.myForm().valid()).toBe(true);
      expect(host.myForm.stars().errors().length).toBe(0);
    }));
  });

  describe('disabled rule', () => {
    it('disables every rating input when disabled() is applied', fakeAsync(() => {
      const { fixture, rating, inputs } = setup(DisabledSignalFormRating);

      tick();
      fixture.detectChanges();

      expect(rating.disabled).toBe(true);
      inputs.forEach((input) => expect(input.disabled).toBe(true));
    }));

    it('does not change the model when clicking while disabled', fakeAsync(() => {
      const { fixture, host, icons } = setup(DisabledSignalFormRating);

      clickStar(icons, 4);
      fixture.detectChanges();
      tick();

      expect(host.myForm.stars().value()).toBe(0);
    }));
  });
});
