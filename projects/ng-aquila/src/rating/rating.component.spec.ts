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
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent, dispatchMouseEvent } from '../cdk-test-utils';
import { NxRatingComponent } from './rating.component';
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

      spyOn(testComponent.valueChange, 'emit');

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
      expect(testInstance.rating.disabled).toBeTrue();
      expect(outerSpanDisabled).toBeTruthy();

      instance.testForm.controls.rating.enable();
      fixture.detectChanges();
      outerSpanDisabled = fixture.nativeElement.querySelector('.nx-rating--disabled');
      expect(testInstance.rating.disabled).toBeFalse();
      expect(outerSpanDisabled).toBeFalsy();
    });
  });

  describe('programmatic tests', () => {
    it('updates view on change of "disabled"', () => {
      createTestComponent(RatingOnPushComponent);
      let hasDisabledClass = fixture.nativeElement.querySelector('.nx-rating--disabled');
      expect(testInstance.rating.disabled).toBeFalse();
      expect(hasDisabledClass).toBeFalsy();

      testInstance.rating.disabled = true;
      fixture.detectChanges();
      hasDisabledClass = fixture.nativeElement.querySelector('.nx-rating--disabled');
      expect(hasDisabledClass).toBeTruthy();
    });

    it('updates view on change of "negative"', () => {
      createTestComponent(RatingOnPushComponent);
      let hasNegativeClass = fixture.nativeElement.querySelector('.nx-rating--negative');
      expect(testInstance.rating.negative).toBeFalse();
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
      expect(starsSelected).toHaveSize(2);

      testInstance.rating.value = 4;
      fixture.detectChanges();
      starsSelected = getSelectedStars();
      expect(starsSelected).toHaveSize(4);
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
      expect(selectedStars).toHaveSize(2);
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
      await expectAsync(fixture.nativeElement).toBeAccessible();
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
  @ViewChild(NxRatingComponent) rating: any;
}

@Component({
  template: `<nx-rating startLabel="poor" endLabel="great"></nx-rating>`,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class SimpleRatingComponent extends RatingTest {}

@Component({
  template: `<nx-rating [(value)]="theValue"></nx-rating>`,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class SimpleBindingRatingComponent extends RatingTest {
  theValue: any;
}

@Component({
  template: `<nx-rating [(ngModel)]="theValue"></nx-rating>`,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class NgModelBindingRatingComponent extends RatingTest {
  theValue: any;
}

@Component({
  template: `
    <form [formGroup]="testForm">
      <nx-rating formControlName="rating"></nx-rating>
    </form>
  `,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class ReactiveBindingRatingComponent extends RatingTest {
  testForm = new FormBuilder().group({
    rating: new FormControl(),
  });
}

@Component({
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
  template: `<nx-rating [(ngModel)]="ngModelValue"></nx-rating>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class TemplateDrivenOnPushComponent extends RatingTest {
  ngModelValue = 2;
}

@Component({
  template: `<nx-rating [size]="size"></nx-rating>`,
  imports: [FormsModule, ReactiveFormsModule, NxRatingModule],
})
class SizeRatingComponent extends RatingTest {
  size = 'm';
}
