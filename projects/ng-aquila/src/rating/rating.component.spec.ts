import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  signal,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent, dispatchMouseEvent } from '../cdk-test-utils';
import { NxRatingComponent, RatingSize } from './rating.component';
import { NxRatingModule } from './rating.module';

describe('NxRatingComponent', () => {
  let fixture: ComponentFixture<RatingTest>;
  let testInstance: RatingTest;
  let startLabel: HTMLSpanElement;
  let endLabel: HTMLSpanElement;
  let icons: HTMLElement[];
  let inputs: HTMLElement[];
  let testComponent: NxRatingComponent;
  let iconNativeElement: HTMLElement;

  function createTestComponent(component: Type<RatingTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    startLabel = fixture.nativeElement.querySelector('.nx-rating__label--start');
    endLabel = fixture.nativeElement.querySelector('.nx-rating__label--end');
    icons = Array.from(fixture.nativeElement.querySelectorAll('nx-icon'));
    inputs = Array.from(fixture.nativeElement.querySelectorAll('input'));
    iconNativeElement = fixture.nativeElement.querySelector('nx-icon') as HTMLButtonElement;
    testComponent = testInstance.rating;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NxRatingModule,
        SizeRatingComponent,
        SimpleRatingComponent,
        SimpleBindingRatingComponent,
        NgModelBindingRatingComponent,
        ReactiveBindingRatingComponent,
        RatingOnPushComponent,
        TemplateDrivenOnPushComponent,
        NonInteractiveRatingComponent,
      ],
    }).compileComponents();
  }));

  function getIcons() {
    return fixture.debugElement.queryAll(By.css('nx-icon'));
  }

  function getSelectedStars() {
    return getIcons().filter((dbgEl) => dbgEl.componentInstance.name === 'star');
  }

  function checkVisualSelection(...expected: boolean[]) {
    expected.forEach((value, index) => {
      expect(testComponent.getIconName(index + 1)).toBe(value ? 'star' : 'star-o');
    });
  }

  function checkSelection(...expected: boolean[]) {
    expected.forEach((value, index) => {
      expect(testComponent.isSelected(index + 1)).toBe(value);
    });
  }

  function click(index: number) {
    icons[--index].click();
    fixture.detectChanges();
    tick();
  }

  describe('basic', () => {
    it('should display five unchecked stars in default', fakeAsync(() => {
      createTestComponent(SimpleRatingComponent);
      checkVisualSelection(false, false, false, false, false);
    }));

    it('should render the labels correctly', fakeAsync(() => {
      createTestComponent(SimpleRatingComponent);

      expect(startLabel.textContent?.trim()).toBe('poor');
      expect(endLabel.textContent?.trim()).toBe('great');
    }));

    it('should handle clicking correctly', fakeAsync(() => {
      createTestComponent(SimpleRatingComponent);
      click(1);
      expect(testComponent.value).toBe(1);
      checkVisualSelection(true, false, false, false, false);
      click(5);
      expect(testComponent.value).toBe(5);
      checkVisualSelection(true, true, true, true, true);
      click(2);
      checkVisualSelection(true, true, false, false, false);
      expect(testComponent.value).toBe(2);
    }));

    it('should not accept clicking in disabled mode', fakeAsync(() => {
      createTestComponent(SimpleRatingComponent);
      testComponent.disabled = true;
      click(1);
      expect(testComponent.value).toBe(0);
      checkVisualSelection(false, false, false, false, false);
    }));

    it('should emit rating value on keyboard event ENTER', () => {
      createTestComponent(SimpleRatingComponent);

      vi.spyOn(testComponent.valueChange, 'emit').mockReturnValue(undefined);

      dispatchKeyboardEvent(inputs[0], 'keyup', ENTER);
      fixture.detectChanges();

      expect(testComponent.valueChange.emit).toHaveBeenCalledWith(1);
    });

    it('should fill/unfill color when hover/unhover', () => {
      createTestComponent(SimpleRatingComponent);

      dispatchMouseEvent(icons[3], 'mouseenter');
      fixture.detectChanges();
      checkVisualSelection(true, true, true, true, false);

      dispatchMouseEvent(icons[3], 'mouseleave');
      fixture.detectChanges();

      checkVisualSelection(false, false, false, false, false);
    });
  });

  describe('non-interactive', () => {
    it('should not accept clicking in non-interactive mode', fakeAsync(() => {
      createTestComponent(NonInteractiveRatingComponent);
      (testInstance as NonInteractiveRatingComponent).value = 3;
      fixture.detectChanges();
      click(1);
      expect(testComponent.value).toBe(3);
      checkVisualSelection(true, true, true, false, false);
    }));

    it('should not change fill on hover in non-interactive mode', () => {
      createTestComponent(NonInteractiveRatingComponent);
      (testInstance as NonInteractiveRatingComponent).value = 2;
      fixture.detectChanges();

      dispatchMouseEvent(icons[3], 'mouseenter');
      fixture.detectChanges();

      checkVisualSelection(true, true, false, false, false);
    });

    it('does not render any radio inputs in non-interactive mode', () => {
      createTestComponent(NonInteractiveRatingComponent);
      expect(fixture.nativeElement.querySelectorAll('input')).toHaveLength(0);
    });

    it('adds the non-interactive class', () => {
      createTestComponent(NonInteractiveRatingComponent);
      expect(fixture.nativeElement.querySelector('.nx-rating--non-interactive')).toBeTruthy();
    });

    it('uses img role and falls back to the display value as aria-label when no group label is set', () => {
      createTestComponent(NonInteractiveRatingComponent);
      (testInstance as NonInteractiveRatingComponent).value = 3.25;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.nx-rating__container');
      expect(container.getAttribute('role')).toBe('img');
      expect(container.getAttribute('aria-label')).toBe('3.5');
    });

    it('clamps the aria-label fallback to 0 for negative values', () => {
      createTestComponent(NonInteractiveRatingComponent);
      (testInstance as NonInteractiveRatingComponent).value = -5;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.nx-rating__container');
      expect(container.getAttribute('aria-label')).toBe('0');
      checkVisualSelection(false, false, false, false, false);
    });

    it('clamps the aria-label fallback to 5 for values above 5', () => {
      createTestComponent(NonInteractiveRatingComponent);
      (testInstance as NonInteractiveRatingComponent).value = 10;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.nx-rating__container');
      expect(container.getAttribute('aria-label')).toBe('5');
      checkVisualSelection(true, true, true, true, true);
    });
  });

  describe('half star', () => {
    const FULL = 'star' as const;
    const HALF = 'star-half-full' as const;
    const EMPTY = 'star-o' as const;

    function iconNames() {
      return [1, 2, 3, 4, 5].map((rating) => testComponent.getIconName(rating));
    }

    const cases: ReadonlyArray<[number, Array<typeof FULL | typeof HALF | typeof EMPTY>]> = [
      [0.0, [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY]],
      [0.24, [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY]],
      [0.25, [HALF, EMPTY, EMPTY, EMPTY, EMPTY]],
      [0.74, [HALF, EMPTY, EMPTY, EMPTY, EMPTY]],
      [0.75, [FULL, EMPTY, EMPTY, EMPTY, EMPTY]],
      [1.24, [FULL, EMPTY, EMPTY, EMPTY, EMPTY]],
      [2.25, [FULL, FULL, HALF, EMPTY, EMPTY]],
      [3.5, [FULL, FULL, FULL, HALF, EMPTY]],
      [4.25, [FULL, FULL, FULL, FULL, HALF]],
      [4.74, [FULL, FULL, FULL, FULL, HALF]],
      [4.75, [FULL, FULL, FULL, FULL, FULL]],
      [5.0, [FULL, FULL, FULL, FULL, FULL]],
    ];

    cases.forEach(([value, expected]) => {
      it(`renders ${expected.join(',')} for non-interactive value ${value}`, fakeAsync(() => {
        createTestComponent(NonInteractiveRatingComponent);
        (testInstance as NonInteractiveRatingComponent).value = value;
        fixture.detectChanges();
        expect(iconNames()).toEqual(expected);
      }));
    });

    it('does not render half stars in interactive mode', fakeAsync(() => {
      createTestComponent(SimpleRatingComponent);
      testComponent.value = 3.5;
      fixture.detectChanges();
      expect(iconNames()).toEqual([FULL, FULL, FULL, EMPTY, EMPTY]);
    }));
  });

  describe('with nxValue binding', () => {
    it('should support simple binding over nxValue', fakeAsync(() => {
      createTestComponent(SimpleBindingRatingComponent);
      click(5);
      const simpleBinding = testInstance as SimpleBindingRatingComponent;
      expect(simpleBinding.theValue).toBe(5);
    }));
  });

  describe('with ngModel', () => {
    it('should support binding over ngModel', fakeAsync(() => {
      createTestComponent(NgModelBindingRatingComponent);
      click(5);
      const simpleBinding = testInstance as NgModelBindingRatingComponent;
      expect(simpleBinding.theValue).toBe(5);
    }));
  });

  describe('with reactive forms', () => {
    it('should support reactive forms', fakeAsync(() => {
      createTestComponent(ReactiveBindingRatingComponent);
      click(5);
      const simpleBinding = testInstance as ReactiveBindingRatingComponent;
      expect(simpleBinding.testForm.get('rating')?.value).toBe(5);
    }));

    it('should toggle disabled', () => {
      createTestComponent(ReactiveBindingRatingComponent);
      const instance = testInstance as ReactiveBindingRatingComponent;
      instance.testForm.controls.rating.disable();
      fixture.detectChanges();
      let outerSpanDisabled = fixture.nativeElement.querySelector('.nx-rating--disabled');
      expect(testInstance.rating.disabled).toBe(true);
      expect(outerSpanDisabled).toBeTruthy();

      instance.testForm.controls.rating.enable();
      fixture.detectChanges();
      outerSpanDisabled = fixture.nativeElement.querySelector('.nx-rating--disabled');
      expect(testInstance.rating.disabled).toBe(false);
      expect(outerSpanDisabled).toBeFalsy();
    });
  });

  describe('programmatic tests', () => {
    it('updates view on change of "disabled"', () => {
      createTestComponent(RatingOnPushComponent);
      let hasDisabledClass = fixture.nativeElement.querySelector('.nx-rating--disabled');
      expect(testInstance.rating.disabled).toBe(false);
      expect(hasDisabledClass).toBeFalsy();

      testInstance.rating.disabled = true;
      fixture.detectChanges();
      hasDisabledClass = fixture.nativeElement.querySelector('.nx-rating--disabled');
      expect(hasDisabledClass).toBeTruthy();
    });

    it('updates view on change of "negative"', () => {
      createTestComponent(RatingOnPushComponent);
      let hasNegativeClass = fixture.nativeElement.querySelector('.nx-rating--negative');
      expect(testInstance.rating.negative).toBe(false);
      expect(hasNegativeClass).toBeFalsy();

      testInstance.rating.negative = true;
      fixture.detectChanges();
      hasNegativeClass = fixture.nativeElement.querySelector('.nx-rating--negative');
      expect(hasNegativeClass).toBeTruthy();
    });

    it('updates view on value change', () => {
      createTestComponent(RatingOnPushComponent);
      // check how many stars are filled (=checked)
      let starsSelected = getSelectedStars();
      expect(testInstance.rating.value).toBe(2);
      expect(starsSelected).toHaveLength(2);

      testInstance.rating.value = 4;
      fixture.detectChanges();
      starsSelected = getSelectedStars();
      expect(starsSelected).toHaveLength(4);
    });

    it('updates view on template driven value set initially', fakeAsync(() => {
      createTestComponent(TemplateDrivenOnPushComponent);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
      const selectedStars = getSelectedStars();
      const rating = fixture.debugElement.query(By.css('nx-rating'));
      expect(testInstance.rating.value).toBe(2);
      expect(selectedStars).toHaveLength(2);
    }));

    it('updates view on change of "startLabel"', fakeAsync(() => {
      createTestComponent(RatingOnPushComponent);
      let startLabelContent = fixture.nativeElement.querySelector(
        '.nx-rating__label--start',
      ).textContent;
      expect(startLabelContent).toBe('startLabel');

      testInstance.rating.startLabel = 'newStartLabel';
      fixture.detectChanges();
      startLabelContent = fixture.nativeElement.querySelector(
        '.nx-rating__label--start',
      ).textContent;
      expect(startLabelContent).toBe('newStartLabel');
    }));

    it('updates view on change of "endLabel"', fakeAsync(() => {
      createTestComponent(RatingOnPushComponent);
      let endLabelContent =
        fixture.nativeElement.querySelector('.nx-rating__label--end').textContent;
      expect(endLabelContent).toBe('endLabel');

      testInstance.rating.endLabel = 'newEndLabel';
      fixture.detectChanges();
      endLabelContent = fixture.nativeElement.querySelector('.nx-rating__label--end').textContent;
      expect(endLabelContent).toBe('newEndLabel');
    }));

    it('updates view on change of "ariaLabel"', () => {
      createTestComponent(RatingOnPushComponent);
      let ariaLabel = fixture.nativeElement
        .querySelector('.nx-rating__input')
        .getAttribute('aria-label');
      expect(ariaLabel).toBe('1');

      (testInstance as RatingOnPushComponent).ariaInputLabels.set([
        'one',
        'two',
        'three',
        'four',
        'five',
      ]);
      fixture.detectChanges();
      ariaLabel = fixture.nativeElement
        .querySelector('.nx-rating__input')
        .getAttribute('aria-label');
      expect(ariaLabel).toBe('one');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(SimpleBindingRatingComponent);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });

  describe('validation', () => {
    let errorFixture: ComponentFixture<ErrorRatingComponent>;
    let ratingElement: HTMLElement;

    beforeEach(() => {
      errorFixture = TestBed.createComponent(ErrorRatingComponent);
      errorFixture.detectChanges();
      ratingElement = errorFixture.nativeElement.querySelector('nx-rating');
    });

    it('shows no error while the control is untouched', () => {
      expect(ratingElement.classList).not.toContain('has-error');
      expect(ratingElement.querySelector('nx-error')).toBeNull();
    });

    it('projects the nx-error and links it once the control is touched and invalid', () => {
      errorFixture.componentInstance.control.markAsTouched();
      errorFixture.detectChanges();
      errorFixture.detectChanges();

      const group = ratingElement.querySelector('[role="radiogroup"]')!;
      const error = ratingElement.querySelector('nx-error')!;
      expect(ratingElement.classList).toContain('has-error');
      expect(group.getAttribute('aria-invalid')).toBe('true');
      expect(
        error.querySelector(`[id="${group.getAttribute('aria-describedby')}"]`),
      ).not.toBeNull();
    });

    it('clears the error when a valid rating is selected', () => {
      errorFixture.componentInstance.control.markAsTouched();
      errorFixture.detectChanges();
      errorFixture.detectChanges();
      expect(ratingElement.classList).toContain('has-error');

      ratingElement.querySelectorAll<HTMLInputElement>('input[type="radio"]')[2].click();
      errorFixture.detectChanges();
      errorFixture.detectChanges();

      expect(ratingElement.classList).not.toContain('has-error');
      expect(ratingElement.querySelector('nx-error')).toBeNull();
    });

    it('marks the control as touched when a radio input loses focus', () => {
      const input = ratingElement.querySelector<HTMLInputElement>('input[type="radio"]')!;
      input.dispatchEvent(new Event('blur'));
      errorFixture.detectChanges();

      expect(errorFixture.componentInstance.control.touched).toBe(true);
    });

    it('never shows an error when the rating is non-interactive', () => {
      errorFixture.componentInstance.interactive = false;
      errorFixture.componentInstance.control.markAsTouched();
      errorFixture.detectChanges();
      errorFixture.detectChanges();

      expect(ratingElement.classList).not.toContain('has-error');
      expect(ratingElement.querySelector('nx-error')).toBeNull();
    });

    it('shows the error after the parent form is submitted', () => {
      const submitFixture = TestBed.createComponent(SubmitRatingComponent);
      submitFixture.detectChanges();
      const element: HTMLElement = submitFixture.nativeElement;
      expect(element.querySelector('nx-error')).toBeNull();

      element.querySelector('form')!.dispatchEvent(new Event('submit'));
      submitFixture.detectChanges();
      submitFixture.detectChanges();

      expect(element.querySelector('nx-error')).not.toBeNull();
    });

    it('works with ngModel', async () => {
      const modelFixture = TestBed.createComponent(NgModelRatingComponent);
      modelFixture.detectChanges();
      await modelFixture.whenStable();
      const element: HTMLElement = modelFixture.nativeElement;
      element
        .querySelector<HTMLInputElement>('input[type="radio"]')!
        .dispatchEvent(new Event('blur'));
      modelFixture.detectChanges();
      modelFixture.detectChanges();

      expect(element.querySelector('nx-rating')!.classList).toContain('has-error');
    });
  });

  describe('sizes', () => {
    it('adds the class name for size to the icon', waitForAsync(() => {
      createTestComponent(SizeRatingComponent);
      expect(iconNativeElement).toHaveClass('nx-icon--m');
    }));

    it('should change icon size on binding changes', () => {
      createTestComponent(SizeRatingComponent);
      (testInstance as SizeRatingComponent).size = 's';
      fixture.detectChanges();
      expect(iconNativeElement).toHaveClass('nx-icon--s');
    });
  });
});

@Directive({ standalone: true })
class RatingTest {
  @ViewChild(NxRatingComponent)
  rating: any;
}

@Component({
  selector: 'test-simple-rating-component',
  template: `<nx-rating startLabel="poor" endLabel="great"></nx-rating>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class SimpleRatingComponent extends RatingTest {}

@Component({
  selector: 'test-simple-binding-rating-component',
  template: `<nx-rating [(value)]="theValue"></nx-rating>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class SimpleBindingRatingComponent extends RatingTest {
  theValue: any;
}

@Component({
  selector: 'test-ng-model-binding-rating-component',
  template: `<nx-rating [(ngModel)]="theValue"></nx-rating>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class NgModelBindingRatingComponent extends RatingTest {
  theValue: any;
}

@Component({
  selector: 'test-reactive-binding-rating-component',
  template: `
    <form [formGroup]="testForm">
      <nx-rating formControlName="rating"></nx-rating>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class ReactiveBindingRatingComponent extends RatingTest {
  testForm = new FormBuilder().group({
    rating: new FormControl(),
  });
}

@Component({
  selector: 'test-rating-on-push-component',
  template: `<nx-rating
    [value]="currentValue"
    [startLabel]="startLabel"
    [endLabel]="endLabel"
    [ariaRatingLabels]="ariaInputLabels()"
  ></nx-rating>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class RatingOnPushComponent extends RatingTest {
  ariaInputLabels = signal(['1', '2', '3', '4', '5']);

  startLabel = 'startLabel';
  endLabel = 'endLabel';
  currentValue = 2;
}

@Component({
  selector: 'test-template-driven-on-push-component',
  template: `<nx-rating [(ngModel)]="ngModelValue"></nx-rating>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class TemplateDrivenOnPushComponent extends RatingTest {
  ngModelValue = 2;
}

@Component({
  selector: 'test-size-rating-component',
  template: `<nx-rating [size]="size"></nx-rating>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class SizeRatingComponent extends RatingTest {
  size: RatingSize = 'm';
}

@Component({
  selector: 'test-non-interactive-rating-component',
  template: `<nx-rating [value]="value" [interactive]="false"></nx-rating>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class NonInteractiveRatingComponent extends RatingTest {
  value = 0;
}

@Component({
  selector: 'test-error-rating-component',
  template: `<nx-rating [formControl]="control" [interactive]="interactive">
    <nx-error>Please rate</nx-error>
  </nx-rating>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ReactiveFormsModule, NxRatingModule, NxErrorComponent],
})
class ErrorRatingComponent {
  control = new FormControl(0, Validators.min(1));
  interactive = true;
}

@Component({
  selector: 'test-submit-rating-component',
  template: `<form [formGroup]="form">
    <nx-rating formControlName="rating"><nx-error>Please rate</nx-error></nx-rating>
  </form>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ReactiveFormsModule, NxRatingModule, NxErrorComponent],
})
class SubmitRatingComponent {
  form = new FormGroup({ rating: new FormControl(0, Validators.min(1)) });
}

@Component({
  selector: 'test-ng-model-rating-component',
  template: `<nx-rating [(ngModel)]="value" required #model="ngModel">
    <nx-error>Please rate</nx-error>
  </nx-rating>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, NxRatingModule, NxErrorComponent],
})
class NgModelRatingComponent {
  value: number | null = null;
}
