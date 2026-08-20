import { NxErrorModule, NxLabelModule } from '@allianz/ng-aquila/base';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  NxCheckboxComponent,
  NxCheckboxGroupChangeEvent,
  NxCheckboxGroupComponent,
} from './checkbox.component';
import { NxCheckboxModule } from './checkbox.module';

@Directive({ standalone: true })
abstract class CheckboxGroupTest {
  @ViewChild(NxCheckboxGroupComponent)
  checkboxGroupInstance!: NxCheckboxGroupComponent;
  @ViewChildren(NxCheckboxComponent)
  checkboxInstances!: QueryList<NxCheckboxComponent>;

  checked = false;
  myFormGroup!: FormGroup;
  labelSize!: string;
  disabled = false;
  negative = false;
  readonly = false;
}

describe('NxCheckboxGroupComponent', () => {
  let fixture: ComponentFixture<CheckboxGroupTest>;
  let testInstance: CheckboxGroupTest;
  let checkboxGroupInstance: NxCheckboxGroupComponent;
  let checkboxInstances: QueryList<NxCheckboxComponent>;
  let checkboxElements: NodeListOf<HTMLInputElement>;

  function createTestComponent(component: Type<CheckboxGroupTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    checkboxGroupInstance = testInstance.checkboxGroupInstance;
    checkboxInstances = testInstance.checkboxInstances;
    checkboxElements = fixture.nativeElement.querySelectorAll(
      'input',
    ) as NodeListOf<HTMLInputElement>;
  }

  function blurGroup() {
    const group = fixture.nativeElement.querySelector('nx-checkbox-group') as HTMLElement;
    group.dispatchEvent(new FocusEvent('focusout', { relatedTarget: null }));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxCheckboxModule,
        FormsModule,
        NxErrorModule,
        NxLabelModule,
        ReactiveFormsModule,
        BasicCheckboxGroup,
        CheckboxGroupValidation,
        CheckboxGroupDynamic,
        CheckboxGroupReactive,
        ConditionalCheckboxGroupReactive,
        ConfigurableCheckboxGroup,
        CheckboxGroupOnPush,
        CheckboxGroupAriaLabelledBy,
        CheckboxGroupAriaLabelledByWithError,
      ],
    }).compileComponents();
  }));

  it('should displays a checkbox-group with a checkboxes', () => {
    createTestComponent(BasicCheckboxGroup);
    expect(testInstance).toBeTruthy();
  });

  it('should inherit the same name as the checkbox-group', () => {
    createTestComponent(BasicCheckboxGroup);
    checkboxInstances.forEach((checkbox) => {
      expect(checkbox.name).toBe('terms');
    });
  });

  it('should disable every checkbox inside a disabled checkbox group', () => {
    createTestComponent(BasicCheckboxGroup);
    checkboxGroupInstance.disabled = true;
    fixture.detectChanges();
    checkboxInstances.forEach((checkbox) => {
      expect(checkbox.disabled).toBe(true);
    });
  });

  it('should set every checkbox to readonly', () => {
    createTestComponent(ConfigurableCheckboxGroup);
    testInstance.readonly = true;
    fixture.detectChanges();
    checkboxInstances.forEach((checkbox) => {
      expect(checkbox.readonly).toBe(true);
    });
  });

  it('should set readonly programmatically with NxAbstractControl', () => {
    createTestComponent(CheckboxGroupOnPush);
    (testInstance as CheckboxGroupOnPush).group.setReadonly(true);
    fixture.detectChanges();
    checkboxElements.forEach((element) => {
      expect(element).toHaveClass('is-readonly');
    });
  });

  it('should update disabled on formGroup update', () => {
    createTestComponent(CheckboxGroupValidation);
    expect(testInstance.myFormGroup.get('terms')!.disabled).toBe(false);
    expect(checkboxGroupInstance.disabled).toBe(false);

    testInstance.myFormGroup.get('terms')!.disable();
    expect(testInstance.myFormGroup.disabled).toBe(true);
    expect(checkboxGroupInstance.disabled).toBe(true);

    testInstance.myFormGroup.get('terms')!.enable();
    expect(testInstance.myFormGroup.disabled).toBe(false);
    expect(checkboxGroupInstance.disabled).toBe(false);
  });

  it('Every checkbox should be negative', () => {
    createTestComponent(BasicCheckboxGroup);
    checkboxGroupInstance.negative = true;
    fixture.detectChanges();
    checkboxInstances.forEach((checkbox) => {
      expect(checkbox.negative).toBe(true);
    });
  });

  it('should have nx-error children on error', fakeAsync(() => {
    createTestComponent(CheckboxGroupValidation);
    tick();

    // none of the checkboxes should be selected for an error
    [1, 2].forEach((i) => checkboxElements[i].click());
    blurGroup();
    fixture.detectChanges();

    let errors = fixture.nativeElement.querySelectorAll('nx-error') as NodeListOf<HTMLInputElement>;

    const group = fixture.nativeElement.querySelector('nx-checkbox-group');
    const labelId = fixture.nativeElement.querySelector('.nx-label__content')?.id;
    const errorId = errors[0]?.querySelector('.nx-error__content')?.id;

    expect(errors).toHaveLength(1);
    expect(checkboxGroupInstance.errorState).toBeTruthy();
    expect(group.getAttribute('aria-labelledby')).toBe(`${labelId} ${errorId}`);

    [0, 1, 2].forEach((i) => checkboxElements[i].click());
    fixture.detectChanges();

    errors = fixture.nativeElement.querySelectorAll('nx-error') as NodeListOf<HTMLInputElement>;
    expect(errors).toHaveLength(0);
    expect(checkboxGroupInstance.errorState).toBeFalsy();
  }));

  it('should not be touched when toggling checkboxes without leaving the group', fakeAsync(() => {
    createTestComponent(CheckboxGroupValidation);
    tick();

    [1, 2].forEach((i) => checkboxElements[i].click());
    fixture.detectChanges();

    expect(testInstance.myFormGroup.get('terms')!.touched).toBe(false);
  }));

  it('should not be touched when moving focus between checkboxes in the group', fakeAsync(() => {
    createTestComponent(CheckboxGroupValidation);
    tick();

    const group = fixture.nativeElement.querySelector('nx-checkbox-group') as HTMLElement;
    group.dispatchEvent(new FocusEvent('focusout', { relatedTarget: checkboxElements[1] }));

    expect(testInstance.myFormGroup.get('terms')!.touched).toBe(false);
  }));

  it('should be touched after focus leaves the group', fakeAsync(() => {
    createTestComponent(CheckboxGroupValidation);
    tick();

    blurGroup();

    expect(testInstance.myFormGroup.get('terms')!.touched).toBe(true);
  }));

  it('should display error message on submit', fakeAsync(() => {
    createTestComponent(CheckboxGroupValidationNoInitialSelect);

    const submitButton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    tick();
    fixture.detectChanges();
    flush();

    const errorElement = fixture.nativeElement.querySelector('nx-error');

    expect(errorElement).toBeDefined();
    expect(errorElement.textContent).toBe(' Please accept all our terms and conditions ');
  }));

  it('should mark as checked the passed values', fakeAsync(() => {
    createTestComponent(CheckboxGroupValidation);
    const checkedValues = ['Term 2', 'Term 3'];
    fixture.detectChanges();
    tick();
    checkboxInstances.forEach((checkbox) => {
      if (checkedValues.includes(checkbox.value)) {
        expect(checkbox.checked).toBe(true);
      }
    });
  }));

  it('should unset the entire set of passed values correctly', fakeAsync(() => {
    createTestComponent(CheckboxGroupValidation);
    testInstance.myFormGroup.get('terms')?.setValue(['Term 2', 'Term 3']);
    testInstance.myFormGroup.get('terms')?.setValue([]);
    fixture.detectChanges();
    tick();
    checkboxInstances.forEach((checkbox) => {
      expect(checkbox.checked).toBe(false);
    });
  }));

  it('should add the checkboxes dynamically', fakeAsync(() => {
    createTestComponent(CheckboxGroupDynamic);
    fixture.detectChanges();
    tick();
    expect(checkboxInstances).toHaveLength(3);
  }));

  it('should add the checkboxes dynamically and checked', fakeAsync(() => {
    createTestComponent(CheckboxGroupDynamic);
    fixture.detectChanges();
    tick();
    checkboxInstances.forEach((checkbox) => {
      expect(checkbox.checked).toBe(true);
    });
  }));

  it('should add new checkbox and checked', fakeAsync(() => {
    createTestComponent(CheckboxGroupDynamic);
    const dynamicTest = fixture.componentInstance as CheckboxGroupDynamic;
    dynamicTest.addNewCb();
    fixture.detectChanges();
    tick();
    expect(checkboxInstances).toHaveLength(4);
  }));

  it('should update the form control value when a checkbox is added', fakeAsync(() => {
    createTestComponent(CheckboxGroupDynamic);
    fixture.detectChanges();
    tick();

    const dynamicTest = fixture.componentInstance as CheckboxGroupDynamic;
    dynamicTest.addNewCb();
    fixture.detectChanges();
    tick();

    expect(testInstance.myFormGroup.get('terms')!.value).toEqual([
      'one',
      'two',
      'three',
      'New Value 1',
    ]);
  }));

  it('should keep the form control pristine when a checkbox is added programmatically', fakeAsync(() => {
    createTestComponent(CheckboxGroupDynamic);
    fixture.detectChanges();
    tick();

    const dynamicTest = fixture.componentInstance as CheckboxGroupDynamic;
    dynamicTest.addNewCb();
    fixture.detectChanges();
    tick();

    expect(testInstance.myFormGroup.get('terms')!.pristine).toBe(true);
  }));

  it('should remove one checkbox', fakeAsync(() => {
    createTestComponent(CheckboxGroupDynamic);
    const dynamicTest = fixture.componentInstance as CheckboxGroupDynamic;
    dynamicTest.removeCB();
    fixture.detectChanges();
    tick();
    expect(checkboxInstances).toHaveLength(2);
  }));

  it('should update the form control value when a checkbox is removed', fakeAsync(() => {
    createTestComponent(CheckboxGroupDynamic);
    fixture.detectChanges();
    tick();

    const dynamicTest = fixture.componentInstance as CheckboxGroupDynamic;
    dynamicTest.removeCB();
    fixture.detectChanges();
    tick();

    expect(testInstance.myFormGroup.get('terms')!.value).toEqual(['two', 'three']);
  }));

  it('should emit an event on checked changed', fakeAsync(() => {
    createTestComponent(BasicCheckboxGroup);

    const spy = vi.fn().mockName('checkbox selection');
    const subscription =
      fixture.componentInstance.checkboxGroupInstance.selectionChange.subscribe(spy);
    checkboxElements[0].click();
    fixture.detectChanges();
    tick();
    expect(spy).toHaveBeenCalledWith(expect.any(NxCheckboxGroupChangeEvent));
    expect(spy).toHaveBeenCalledTimes(1);
    subscription.unsubscribe();
  }));

  it('sets checked state of the children on initialisation', fakeAsync(() => {
    createTestComponent(CheckboxGroupReactive);
    const checkedValues = ['Term 1', 'Term 2'];
    fixture.detectChanges();
    tick();
    checkboxInstances.forEach((checkbox) => {
      expect(checkbox.checked).toBe(checkedValues.includes(checkbox.value));
    });
  }));

  it('initializes correctly in a conditionally displayed checkbox group', fakeAsync(() => {
    createTestComponent(ConditionalCheckboxGroupReactive);
    tick();
    checkboxInstances.forEach((checkbox, i) => {
      expect(checkbox.checked).toBe(i !== 2);
    });
  }));

  it('should set the control to dirty when value changes in the DOM', fakeAsync(() => {
    createTestComponent(CheckboxGroupReactive);
    const submitButton = fixture.nativeElement.querySelector('#submit-button') as HTMLButtonElement;

    submitButton.click();
    tick();
    fixture.detectChanges();

    expect(
      testInstance.myFormGroup.get('terms')!.dirty,
      'Expected control to start out pristine.',
    ).toBe(false);

    checkboxElements[0].click();
    tick();
    fixture.detectChanges();

    expect(testInstance.myFormGroup.get('terms')!.dirty, 'Expected control to be dirty.').toBe(
      true,
    );
  }));

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicCheckboxGroup);
      await expect(fixture.nativeElement).toBeAccessible();
    });

    it('should include ariaLabelledBy in aria-labelledby', () => {
      createTestComponent(CheckboxGroupAriaLabelledBy);
      const groupEl = fixture.nativeElement.querySelector('nx-checkbox-group') as HTMLElement;

      expect(groupEl.getAttribute('aria-labelledby')).not.toContain('external-label');

      (fixture as ComponentFixture<CheckboxGroupAriaLabelledBy>).componentInstance.ariaLabelledBy =
        'external-label';
      fixture.detectChanges();

      expect(groupEl.getAttribute('aria-labelledby')).toContain('external-label');
    });

    it('should merge ariaLabelledBy with the internal nx-label id', () => {
      createTestComponent(CheckboxGroupAriaLabelledBy);
      (fixture as ComponentFixture<CheckboxGroupAriaLabelledBy>).componentInstance.ariaLabelledBy =
        'external-label';
      fixture.detectChanges();

      const labelId = fixture.nativeElement.querySelector('.nx-label__content')?.id;
      const groupEl = fixture.nativeElement.querySelector('nx-checkbox-group') as HTMLElement;
      const ariaLabelledBy = groupEl.getAttribute('aria-labelledby');

      expect(ariaLabelledBy).toBe(`external-label ${labelId}`);
    });

    it('should merge ariaLabelledBy with nx-label id and error id', fakeAsync(() => {
      createTestComponent(CheckboxGroupAriaLabelledByWithError);
      const instance = fixture.componentInstance as CheckboxGroupAriaLabelledByWithError;
      instance.ariaLabelledBy = 'external-label';
      fixture.detectChanges();
      tick();

      // trigger error state by submitting with no values selected
      instance.myFormGroup.markAllAsTouched();
      fixture.detectChanges();

      const groupEl = fixture.nativeElement.querySelector('nx-checkbox-group') as HTMLElement;
      const labelId = fixture.nativeElement.querySelector('.nx-label__content')?.id;
      const errorId = fixture.nativeElement.querySelector('.nx-error__content')?.id;
      const ariaLabelledBy = groupEl.getAttribute('aria-labelledby');

      expect(ariaLabelledBy).toBe(`external-label ${labelId} ${errorId}`);
    }));
  });
});

@Component({
  selector: 'test-basic-checkbox-group',
  template: `
    <nx-checkbox-group name="terms">
      <nx-label [id]="'terms-label'">Accept terms</nx-label>
      <nx-checkbox>Term 1</nx-checkbox>
      <nx-checkbox>Term 2</nx-checkbox>
      <nx-checkbox>Term 3</nx-checkbox>
    </nx-checkbox-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCheckboxModule, FormsModule, NxErrorModule, NxLabelModule, ReactiveFormsModule],
})
class BasicCheckboxGroup extends CheckboxGroupTest {}

@Component({
  selector: 'test-configurable-checkbox-group',
  template: `
    <nx-checkbox-group name="terms" [disabled]="disabled" [readonly]="readonly">
      <nx-label [id]="'terms-label'">Accept terms</nx-label>
      <nx-checkbox>Term 1</nx-checkbox>
      <nx-checkbox>Term 2</nx-checkbox>
      <nx-checkbox>Term 3</nx-checkbox>
    </nx-checkbox-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCheckboxModule, FormsModule, NxErrorModule, NxLabelModule, ReactiveFormsModule],
})
class ConfigurableCheckboxGroup extends CheckboxGroupTest {}

@Component({
  selector: 'test-checkbox-group-validation',
  template: `
    <form [formGroup]="myFormGroup">
      <nx-checkbox-group name="terms" formControlName="terms" required>
        <nx-label>Accept terms</nx-label>
        <nx-checkbox value="Term 1">Term 1</nx-checkbox>
        <nx-checkbox value="Term 2">Term 2</nx-checkbox>
        <nx-checkbox value="Term 3">Term 3</nx-checkbox>
        <nx-error appearance="text"> Please accept all our terms and conditions </nx-error>
      </nx-checkbox-group>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCheckboxModule, FormsModule, NxErrorModule, NxLabelModule, ReactiveFormsModule],
})
class CheckboxGroupValidation extends CheckboxGroupTest {
  myFormGroup!: FormGroup;

  checkboxGroupCheckedValues = ['Term 2', 'Term 3'];

  constructor(private readonly fb: FormBuilder) {
    super();
    this.createForm();
  }

  createForm() {
    this.myFormGroup = this.fb.group({
      terms: [this.checkboxGroupCheckedValues, Validators.required],
    });
  }
}

@Component({
  selector: 'test-checkbox-group-validation-no-initial-select',
  template: `
    <form [formGroup]="myFormGroup">
      <nx-checkbox-group name="terms" formControlName="terms" required>
        <nx-label>Accept terms</nx-label>
        <nx-checkbox value="Term 1">Term 1</nx-checkbox>
        <nx-checkbox value="Term 2">Term 2</nx-checkbox>
        <nx-checkbox value="Term 3">Term 3</nx-checkbox>
        <nx-error appearance="text"> Please accept all our terms and conditions </nx-error>
      </nx-checkbox-group>
      <button type="submit">submit</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCheckboxModule, FormsModule, NxErrorModule, NxLabelModule, ReactiveFormsModule],
})
class CheckboxGroupValidationNoInitialSelect extends CheckboxGroupTest {
  myFormGroup!: FormGroup;

  checkboxGroupCheckedValues = [];

  constructor(private readonly fb: FormBuilder) {
    super();
    this.createForm();
  }

  createForm() {
    this.myFormGroup = this.fb.group({
      terms: [this.checkboxGroupCheckedValues, Validators.required],
    });
  }
}

@Component({
  selector: 'test-checkbox-group-dynamic',
  template: `
    <form [formGroup]="myFormGroup">
      <nx-checkbox-group name="terms" formControlName="terms" required>
        <nx-label [id]="'terms'">Select your choices</nx-label>
        <nx-error appearance="text"> Please select at least one checkbox. </nx-error>
        @for (key of data; track key) {
          <nx-checkbox [value]="key" checked>{{ key }}</nx-checkbox>
        }
      </nx-checkbox-group>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCheckboxModule, FormsModule, NxErrorModule, NxLabelModule, ReactiveFormsModule],
})
class CheckboxGroupDynamic extends CheckboxGroupTest {
  myFormGroup!: FormGroup;

  data = ['one', 'two', 'three'];
  i = 1;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.createForm();
  }

  createForm() {
    this.myFormGroup = this.fb.group({
      terms: [[], Validators.required],
    });
  }

  addNewCb() {
    this.data.push('New Value ' + this.i);
    this.i++;
  }

  removeCB() {
    this.data.shift();
  }
}

@Component({
  selector: 'test-checkbox-group-reactive',
  template: `
    <form [formGroup]="myFormGroup">
      <nx-checkbox-group name="terms" formControlName="terms">
        <nx-label>Select your choices</nx-label>
        <nx-checkbox value="Term 1">Checkbox 1</nx-checkbox>
        <nx-checkbox value="Term 2">Checkbox 2</nx-checkbox>
        <nx-checkbox value="Term 3">Checkbox 3</nx-checkbox>
      </nx-checkbox-group>
      <p>Form value: {{ myFormGroup.value | json }}</p>
      <p>Form status: {{ myFormGroup.status | json }}</p>
      <button nxButton="primary small" id="submit-button" type="submit">Click</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NxCheckboxModule,
    FormsModule,
    NxErrorModule,
    NxLabelModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
})
export class CheckboxGroupReactive extends CheckboxGroupTest {
  myFormGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.myFormGroup = this.fb.group({
      terms: [['Term 1', 'Term 2'], null],
    });
  }
}

@Component({
  selector: 'test-conditional-checkbox-group-reactive',
  template: `
    <form [formGroup]="myFormGroup">
      <nx-checkbox-group formControlName="checkboxes">
        @for (checkbox of checkboxes; track checkbox) {
          <nx-checkbox [value]="checkbox">{{ checkbox }}</nx-checkbox>
        }
      </nx-checkbox-group>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCheckboxModule, FormsModule, NxErrorModule, NxLabelModule, ReactiveFormsModule],
})
export class ConditionalCheckboxGroupReactive extends CheckboxGroupTest {
  myFormGroup: FormGroup;
  showCheckboxes = true;
  checkboxes: string[] = ['Term 1', 'Term 2', 'Term 3'];

  constructor(private readonly fb: FormBuilder) {
    super();
    this.myFormGroup = this.fb.group({
      checkboxes: [['Term 1', 'Term 2']],
    });
  }
}

@Component({
  selector: 'test-checkbox-group-on-push',
  template: `
    <form>
      <nx-checkbox-group #checkboxGroup>
        @for (checkbox of checkboxes; track checkbox) {
          <nx-checkbox [value]="checkbox">{{ checkbox }}</nx-checkbox>
        }
      </nx-checkbox-group>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxCheckboxModule, NxErrorModule, NxLabelModule],
})
export class CheckboxGroupOnPush extends CheckboxGroupTest {
  checkboxes: string[] = ['Term 1', 'Term 2', 'Term 3'];
  @ViewChild('checkboxGroup', { read: NxAbstractControl })
  group!: NxAbstractControl;
}

@Component({
  selector: 'test-checkbox-group-aria-labelled-by',
  template: `
    <nx-checkbox-group name="terms" [ariaLabelledBy]="ariaLabelledBy">
      <nx-label>Accept terms</nx-label>
      <nx-checkbox>Term 1</nx-checkbox>
      <nx-checkbox>Term 2</nx-checkbox>
    </nx-checkbox-group>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCheckboxModule, FormsModule, NxErrorModule, NxLabelModule, ReactiveFormsModule],
})
class CheckboxGroupAriaLabelledBy extends CheckboxGroupTest {
  ariaLabelledBy: string | null = null;
}

@Component({
  selector: 'test-checkbox-group-aria-labelled-by-with-error',
  template: `
    <form [formGroup]="myFormGroup">
      <nx-checkbox-group
        name="terms"
        formControlName="terms"
        [ariaLabelledBy]="ariaLabelledBy"
        required
      >
        <nx-label>Accept terms</nx-label>
        <nx-checkbox value="Term 1">Term 1</nx-checkbox>
        <nx-checkbox value="Term 2">Term 2</nx-checkbox>
        <nx-error appearance="text">Please accept all our terms and conditions</nx-error>
      </nx-checkbox-group>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCheckboxModule, FormsModule, NxErrorModule, NxLabelModule, ReactiveFormsModule],
})
class CheckboxGroupAriaLabelledByWithError extends CheckboxGroupTest {
  ariaLabelledBy: string | null = null;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.myFormGroup = this.fb.group({
      terms: [[], Validators.required],
    });
  }
}
