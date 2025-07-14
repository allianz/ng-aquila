import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { JsonPipe } from '@angular/common';
import { Component, Directive, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
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
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxRadioToggleComponent, RESET_VALUES } from './radio-toggle.component';
import { NxRadioToggleModule } from './radio-toggle.module';
import { NxRadioToggleButtonComponent } from './radio-toggle-button.component';

describe('NxRadioToggleComponent', () => {
  let fixture: ComponentFixture<RadioToggleTest>;
  let radioElements: NodeListOf<HTMLInputElement>;
  let labelElements: NodeListOf<HTMLLabelElement>;
  let toggleComponent: NxRadioToggleComponent;

  function createTestComponent(component: Type<RadioToggleTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    toggleComponent = fixture.componentInstance.radioToggles.toArray()[0];
    radioElements = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    labelElements = fixture.nativeElement.querySelectorAll('label') as NodeListOf<HTMLLabelElement>;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxRadioToggleModule,
        FormsModule,
        ReactiveFormsModule,
        AriaRadioToggle,
        NoSelectionRadioToggle,
        EmptyRadioToggle,
        MultiRadioToggle,
        SelectionRadioToggle,
        ModifiedRadioToggle,
        SingleDisableRadioToggle,
        AllDisableRadioToggle,
        LoopedRadioToggle,
        ModelRadioToggle,
        ReactiveFormToggle,
        ValidationToggle,
        FocusRadioToggle,
        RadioToggleGroupErrorTest,
      ],
    }).compileComponents();
  }));

  function checkSelection(a: boolean, b: boolean, c: boolean) {
    const checked = (index: number): boolean => radioElements.item(index).checked;

    expect(checked(0)).toBe(a);
    expect(checked(1)).toBe(b);
    expect(checked(2)).toBe(c);
  }

  function checkDisabled(a: boolean, b: boolean, c: boolean) {
    const disabled = (index: number): boolean =>
      !!radioElements.item(index).attributes.getNamedItem('disabled');

    expect(disabled(0)).toBe(a);
    expect(disabled(1)).toBe(b);
    expect(disabled(2)).toBe(c);
  }

  function click(index: number) {
    radioElements.item(index).click();
    fixture.detectChanges();
  }

  describe('basic', () => {
    it('should allow creating empty radio toggles', fakeAsync(() => {
      expect(() => createTestComponent(EmptyRadioToggle)).not.toThrow(new Error());
      expect(radioElements).toHaveSize(0);
    }));

    it('should project the radio buttons correctly into the view', () => {
      createTestComponent(NoSelectionRadioToggle);

      expect(labelElements.item(0).innerText).toBe('A');
      expect(labelElements.item(1).innerText).toBe('B');
      expect(labelElements.item(2).innerText).toBe('C');
    });

    it('should link the label to the input correctly', () => {
      createTestComponent(NoSelectionRadioToggle);

      for (let index = 0; index < radioElements.length; index++) {
        const inputElement = radioElements.item(index);
        const labelElement = labelElements.item(index);

        expect(inputElement.getAttribute('id')).toBe(labelElement.getAttribute('for'));
      }
    });

    it('should not select a option if no initial state is set', () => {
      createTestComponent(NoSelectionRadioToggle);
      checkSelection(false, false, false);
    });

    it('should enable all options by default', () => {
      createTestComponent(NoSelectionRadioToggle);
      checkDisabled(false, false, false);
    });

    it('should be able to handle clicking correctly', () => {
      createTestComponent(NoSelectionRadioToggle);
      checkSelection(false, false, false);

      click(0);
      checkSelection(true, false, false);

      click(1);
      checkSelection(false, true, false);

      click(2);
      checkSelection(false, false, true);
    });

    it('should create different ids for different radio toggles and the radio buttons', () => {
      createTestComponent(MultiRadioToggle);

      const toggles = fixture.componentInstance.radioToggles.toArray();
      expect(toggles[0].id).not.toBe(toggles[1].id);

      expect(toggles[0].toggleButtons.toArray()[0].toggleButtonId).not.toBe(
        toggles[0].toggleButtons.toArray()[1].toggleButtonId,
      );
      expect(toggles[1].toggleButtons.toArray()[0].toggleButtonId).not.toBe(
        toggles[1].toggleButtons.toArray()[1].toggleButtonId,
      );
    });

    it('should support preselected values', () => {
      createTestComponent(SelectionRadioToggle);
      checkSelection(false, true, false);
    });

    it('should add modifier classes to the radio button container', () => {
      createTestComponent(ModifiedRadioToggle);

      const containerElement: HTMLDivElement = fixture.nativeElement.querySelector('div');
      expect(containerElement).toHaveClass('nx-radio-toggle--negative');
      expect(containerElement).toHaveClass('nx-radio-toggle--small');
    });

    it('should support boolean values', fakeAsync(() => {
      createTestComponent(LoopedRadioToggle);
      const testInstance = fixture.componentInstance as LoopedRadioToggle;
      testInstance.data = [true, false];
      fixture.detectChanges();
      testInstance.value = false;
      fixture.detectChanges();
      tick();
      const toggleButtons = fixture.debugElement.queryAll(
        By.directive(NxRadioToggleButtonComponent),
      );
      expect(toggleButtons[0].componentInstance.selected).toBeFalse();
      expect(toggleButtons[1].componentInstance.selected).toBeTrue();
      testInstance.value = true;
      fixture.detectChanges();
      tick();
      expect(toggleButtons[0].componentInstance.selected).toBeTrue();
      expect(toggleButtons[1].componentInstance.selected).toBeFalse();
    }));
  });

  describe('reset values', () => {
    RESET_VALUES.forEach((resetValue, index) => {
      it(`should deselect all when no matching button with "${resetValue}" value present`, fakeAsync(() => {
        createTestComponent(LoopedRadioToggle);
        const testInstance = fixture.componentInstance as LoopedRadioToggle;
        testInstance.value = 'A';
        fixture.detectChanges();
        tick();
        const toggleButtons = fixture.debugElement.queryAll(
          By.directive(NxRadioToggleButtonComponent),
        );
        expect(toggleButtons[0].componentInstance.selected).toBeTrue();
        expect(toggleButtons[1].componentInstance.selected).toBeFalse();
        expect(toggleButtons[2].componentInstance.selected).toBeFalse();
        testInstance.value = resetValue;
        fixture.detectChanges();
        tick();
        expect(toggleButtons[0].componentInstance.selected).toBeFalse();
        expect(toggleButtons[1].componentInstance.selected).toBeFalse();
        expect(toggleButtons[2].componentInstance.selected).toBeFalse();
      }));

      it(`should select respective button for value "${resetValue}" if present`, fakeAsync(() => {
        createTestComponent(LoopedRadioToggle);
        const testInstance = fixture.componentInstance as LoopedRadioToggle;
        testInstance.data = RESET_VALUES;
        testInstance.value = 'some_value'; // HINT: it you let value empty, 'undefined' button is pre-selected.
        fixture.detectChanges();
        tick();
        testInstance.value = resetValue;
        fixture.detectChanges();
        tick();
        const toggleButtons = fixture.debugElement.queryAll(
          By.directive(NxRadioToggleButtonComponent),
        );
        RESET_VALUES.forEach((_, i) => {
          expect(toggleButtons[i].componentInstance.selected).toBe(i === index);
        });
      }));
    });
  });

  describe('disabling', () => {
    it('should support disabling of a single option', () => {
      createTestComponent(SingleDisableRadioToggle);
      checkDisabled(false, true, false);
    });

    it('should support disabling of the whole toggle component', () => {
      createTestComponent(AllDisableRadioToggle);
      checkDisabled(true, true, true);
    });
  });

  describe('dynamic', () => {
    it('should allow creating radio toggles with ngFor', fakeAsync(() => {
      expect(() => createTestComponent(LoopedRadioToggle)).not.toThrow(new Error());
      expect(radioElements).toHaveSize(3);
    }));

    it('should allow adding button toggles at runtime', fakeAsync(() => {
      createTestComponent(LoopedRadioToggle);

      const loopedToggle: LoopedRadioToggle = fixture.componentInstance as LoopedRadioToggle;
      expect(radioElements).toHaveSize(loopedToggle.data.length);

      loopedToggle.data.push('D');
      fixture.detectChanges();

      const toggleButtons = fixture.nativeElement.querySelectorAll('nx-radio-toggle-button');
      expect(toggleButtons).toHaveSize(loopedToggle.data.length);
    }));

    it('should set the correct classes when toggle buttons are added/removed', fakeAsync(() => {
      createTestComponent(LoopedRadioToggle);

      const loopedToggle: LoopedRadioToggle = fixture.componentInstance as LoopedRadioToggle;
      const toggleLabels = fixture.nativeElement.querySelectorAll(
        '.nx-radio-toggle__label-container',
      );

      expect(toggleLabels.item(0)).toHaveClass('nx-radio-toggle__label-container--first');
      expect(toggleLabels.item(toggleLabels.length - 1)).toHaveClass(
        'nx-radio-toggle__label-container--last',
      );

      loopedToggle.data.push('D');
      fixture.detectChanges();

      const toggleLabelsAfterAdd = fixture.nativeElement.querySelectorAll(
        '.nx-radio-toggle__label-container',
      );
      expect(toggleLabelsAfterAdd.item(toggleLabelsAfterAdd.length - 2)).not.toHaveClass(
        'nx-radio-toggle__label-container--last',
      );
      expect(toggleLabelsAfterAdd.item(toggleLabelsAfterAdd.length - 1)).toHaveClass(
        'nx-radio-toggle__label-container--last',
      );

      loopedToggle.data.shift();
      fixture.detectChanges();

      const toggleLabelsAfterDelete = fixture.nativeElement.querySelectorAll(
        '.nx-radio-toggle__label-container',
      );
      expect(toggleLabelsAfterDelete.item(0)).toHaveClass(
        'nx-radio-toggle__label-container--first',
      );
    }));
  });

  describe('with ngModel', () => {
    it('should be able to handle ngModel changes', fakeAsync(() => {
      function selectOptionInModel(option: string) {
        fixture.componentInstance.value = option;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }

      createTestComponent(ModelRadioToggle);

      checkSelection(false, false, false);

      selectOptionInModel('A');
      checkSelection(true, false, false);

      selectOptionInModel('B');
      checkSelection(false, true, false);

      selectOptionInModel('C');
      checkSelection(false, false, true);
    }));

    it('should emit change only once', () => {
      createTestComponent(ModelRadioToggle);

      click(1);
      expect((fixture.componentInstance as ModelRadioToggle).changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('with reactive forms', () => {
    it('should not fire change event when form the value changes', () => {
      createTestComponent(ReactiveFormToggle);

      const reactComp: ReactiveFormToggle = fixture.componentInstance as ReactiveFormToggle;

      let called = false;

      toggleComponent.registerOnChange(() => {
        called = true;
      });

      reactComp.testForm.patchValue({ reactiveToggle: 'A' });

      expect(called).toBeFalsy();
    });

    it('should support value changes in reactive forms', fakeAsync(() => {
      createTestComponent(ReactiveFormToggle);

      const reactComp: ReactiveFormToggle = fixture.componentInstance as ReactiveFormToggle;
      function setValue(value: string) {
        reactComp.testForm.controls.reactiveToggle.setValue(value);
        fixture.detectChanges();
        tick();
      }

      setValue('A');
      checkSelection(true, false, false);

      setValue('B');
      checkSelection(false, true, false);

      setValue('A');
      checkSelection(true, false, false);
    }));

    it('should reflect value changes by clicking in reactive forms', fakeAsync(() => {
      createTestComponent(ReactiveFormToggle);

      click(0);
      checkSelection(true, false, false);

      click(1);
      checkSelection(false, true, false);

      click(2);
      checkSelection(false, false, true);
      flush();
    }));

    it('should support disabling/enabling in reactive forms', fakeAsync(() => {
      createTestComponent(ReactiveFormToggle);

      const reactComp: ReactiveFormToggle = fixture.componentInstance as ReactiveFormToggle;

      reactComp.testForm.controls.reactiveToggle.disable();
      fixture.detectChanges();
      checkDisabled(true, true, true);

      reactComp.testForm.controls.reactiveToggle.enable();
      fixture.detectChanges();
      checkDisabled(false, false, false);
      flush();
    }));

    it('should patch operations in reactive forms', fakeAsync(() => {
      createTestComponent(ReactiveFormToggle);

      const reactComp: ReactiveFormToggle = fixture.componentInstance as ReactiveFormToggle;

      reactComp.testForm.patchValue({ reactiveToggle: 'A' });
      fixture.detectChanges();
      checkSelection(true, false, false);
      flush();
    }));

    it('should reset the form control', fakeAsync(() => {
      createTestComponent(ReactiveFormToggle);

      const reactComp: ReactiveFormToggle = fixture.componentInstance as ReactiveFormToggle;

      reactComp.testForm.patchValue({ reactiveToggle: 'A' });
      fixture.detectChanges();
      checkSelection(true, false, false);

      reactComp.testForm.reset();
      fixture.detectChanges();
      checkSelection(false, false, false);

      reactComp.testForm.patchValue({ reactiveToggle: 'A' });
      fixture.detectChanges();
      checkSelection(true, false, false);

      reactComp.testForm.controls.reactiveToggle.setValue('');
      fixture.detectChanges();
      checkSelection(false, false, false);

      reactComp.testForm.patchValue({ reactiveToggle: 'A' });
      fixture.detectChanges();
      checkSelection(true, false, false);
      flush();
    }));
  });

  describe('programmatic change', () => {
    it('should update aria-label on name change', () => {
      createTestComponent(NoSelectionRadioToggle);
      toggleComponent.name = 'new name';
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.nx-radio-toggle').getAttribute('aria-label'),
      ).toBe('new name');
    });

    it('should update children on disabled change', () => {
      createTestComponent(NoSelectionRadioToggle);

      toggleComponent.disabled = true;
      fixture.detectChanges();
      checkDisabled(true, true, true);

      toggleComponent.disabled = false;
      fixture.detectChanges();
      checkDisabled(false, false, false);
    });
  });

  describe('focus', () => {
    it('focus should be forwarded from radio toggle button to input', () => {
      createTestComponent(FocusRadioToggle);
      const radioBtnElm: HTMLElement =
        fixture.nativeElement.querySelector('nx-radio-toggle-button');
      radioBtnElm.focus();
      fixture.detectChanges();

      expect(_getFocusedElementPierceShadowDom()).toEqual(
        fixture.nativeElement.querySelector('input'),
      );
    });
  });

  describe('Validation', () => {
    it('should be invalid and untouched', () => {
      createTestComponent(ValidationToggle);
      const reactComp: ValidationToggle = fixture.componentInstance as ValidationToggle;
      expect(reactComp.testForm.touched).toBeFalse();
      expect(reactComp.testForm.status).toBe('INVALID');
      const radioBtnElm: HTMLElement =
        fixture.nativeElement.querySelector('nx-radio-toggle-button');
      expect(radioBtnElm).not.toHaveClass('has-error');
    });

    it('should be invalid and touched', () => {
      createTestComponent(ValidationToggle);
      const reactComp: ValidationToggle = fixture.componentInstance as ValidationToggle;
      click(0);
      expect(reactComp.testForm.touched).toBeTrue();
      expect(reactComp.testForm.status).toBe('INVALID');
      const radioBtnElm: HTMLElement =
        fixture.nativeElement.querySelector('nx-radio-toggle-button');
      expect(radioBtnElm).toHaveClass('has-error');
    });

    it('should be valid and touched', () => {
      createTestComponent(ValidationToggle);
      const reactComp: ValidationToggle = fixture.componentInstance as ValidationToggle;
      click(1);
      expect(reactComp.testForm.touched).toBeTrue();
      expect(reactComp.testForm.status).toBe('VALID');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(NoSelectionRadioToggle);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });

    it('should set aria-labels', () => {
      createTestComponent(AriaRadioToggle);
      const radioInputElements = fixture.debugElement.queryAll(
        By.css('nx-radio-toggle-button>input.nx-radio-toggle__input'),
      );
      expect(radioInputElements.length).toBe(2);
      expect(radioInputElements[0].nativeElement.getAttribute('aria-label')).toBe('cat');
      expect(radioInputElements[1].nativeElement.getAttribute('aria-label')).toBe('dog');
    });
  });

  describe('Error state', () => {
    it('should show the error if in error state', () => {
      createTestComponent(RadioToggleGroupErrorTest);

      let errorMessage = fixture.debugElement.query(By.css('nx-error'));
      const submitButton = fixture.debugElement.query(By.css('#submit-button'));

      expect(errorMessage).toBeNull();

      submitButton.nativeElement.click();
      fixture.detectChanges();

      errorMessage = fixture.debugElement.query(By.css('nx-error'));

      expect(errorMessage).not.toBeNull();
      expect(errorMessage.nativeElement.textContent).toContain('Required');
    });

    it('should not show error if form is in a valid state', () => {
      createTestComponent(RadioToggleGroupErrorTest);

      const toggleButtons = fixture.debugElement.queryAll(
        By.css('nx-radio-toggle-button>input.nx-radio-toggle__input'),
      );
      let errorMessage = fixture.debugElement.query(By.css('nx-error'));
      const submitButton = fixture.debugElement.query(By.css('#submit-button'));

      expect(errorMessage).toBeNull();

      toggleButtons[0].nativeElement.click();
      submitButton.nativeElement.click();
      fixture.detectChanges();

      errorMessage = fixture.debugElement.query(By.css('nx-error'));
      expect(errorMessage).toBeNull();
    });
  });

  describe('readonly', () => {
    it('should set aria-disabled to each input', () => {
      createTestComponent(RadioToggleGroupTest);
      const testInstance = fixture.componentInstance as RadioToggleGroupTest;
      testInstance.readonly = true;
      fixture.detectChanges();

      expect(radioElements.item(0).getAttribute('aria-disabled')).toBeTruthy();
      expect(radioElements.item(1).getAttribute('aria-disabled')).toBeTruthy();
    });

    it('should set class is-readonly to nx-radio-toggle', () => {
      createTestComponent(RadioToggleGroupTest);
      const testInstance = fixture.componentInstance as RadioToggleGroupTest;
      testInstance.readonly = true;
      fixture.detectChanges();

      const radios = fixture.nativeElement.querySelectorAll('nx-radio-toggle-button');
      radios.forEach((radio: any) => {
        expect(radio).toHaveClass('is-readonly');
      });
    });

    it('should set aria-readonly to group', () => {
      createTestComponent(RadioToggleGroupTest);
      const testInstance = fixture.componentInstance as RadioToggleGroupTest;
      testInstance.readonly = true;
      const group = fixture.nativeElement.querySelector('nx-radio-toggle>div');
      fixture.detectChanges();
      expect(group.getAttribute('aria-readonly')).toBeTruthy();
    });

    it('should preventDefault on click', () => {
      createTestComponent(RadioToggleGroupTest);
      const toggleButtons = fixture.debugElement.queryAll(
        By.directive(NxRadioToggleButtonComponent),
      );
      const testInstance = fixture.componentInstance as RadioToggleGroupTest;

      testInstance.readonly = true;
      fixture.detectChanges();

      click(0);
      fixture.detectChanges();
      expect(toggleButtons[0].componentInstance.selected).toBeFalse();

      click(1);
      fixture.detectChanges();
      expect(toggleButtons[1].componentInstance.selected).toBeFalse();
    });

    it('should set readonly programmatically with NxAbstractControl', () => {
      createTestComponent(RadioToggleGroupTest);
      const testInstance = fixture.componentInstance as RadioToggleGroupTest;
      fixture.detectChanges();

      testInstance.toggleGroup.setReadonly(true);
      fixture.detectChanges();

      const radios = fixture.nativeElement.querySelectorAll('nx-radio-toggle-button');
      radios.forEach((radio: any) => {
        expect(radio).toHaveClass('is-readonly');
      });
    });
  });
});

@Directive({ standalone: true })
abstract class RadioToggleTest {
  value: any;

  @ViewChildren(NxRadioToggleComponent) radioToggles!: QueryList<NxRadioToggleComponent>;
}

@Component({
  template: `<nx-radio-toggle [name]="'tst'">
    <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
    <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
    <nx-radio-toggle-button value="C">C</nx-radio-toggle-button>
  </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class NoSelectionRadioToggle extends RadioToggleTest {}

@Component({
  template: `<nx-radio-toggle>
    <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
    <nx-radio-toggle-button [selected]="true" value="B">B</nx-radio-toggle-button>
    <nx-radio-toggle-button value="C">C</nx-radio-toggle-button>
  </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class SelectionRadioToggle extends RadioToggleTest {}

@Component({
  template: `<nx-radio-toggle [variant]="'small negative'">
    <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
  </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class ModifiedRadioToggle extends RadioToggleTest {}

@Component({
  template: `<nx-radio-toggle>
    <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
    <nx-radio-toggle-button value="B" [disabled]="true">B</nx-radio-toggle-button>
    <nx-radio-toggle-button value="C">C</nx-radio-toggle-button>
  </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class SingleDisableRadioToggle extends RadioToggleTest {}

@Component({
  template: `<nx-radio-toggle [disabled]="true">
    <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
    <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
    <nx-radio-toggle-button value="C">C</nx-radio-toggle-button>
  </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class AllDisableRadioToggle extends RadioToggleTest {}
@Component({
  template: `<nx-radio-toggle [(ngModel)]="value" (ngModelChange)="changeSpy($event)">
    <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
    <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
    <nx-radio-toggle-button value="C">C</nx-radio-toggle-button>
  </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class ModelRadioToggle extends RadioToggleTest {
  changeSpy = jasmine.createSpy('change spy');
}

@Component({
  template: `<nx-radio-toggle [(ngModel)]="value">
    @for (value of data; track value) {
      <nx-radio-toggle-button [value]="value"> {{ value }} </nx-radio-toggle-button>
    }
  </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class LoopedRadioToggle extends RadioToggleTest {
  data: any[] = ['A', 'B', 'C'];
}

@Component({
  template: `<nx-radio-toggle> </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class EmptyRadioToggle extends RadioToggleTest {}

@Component({
  template: `
    <nx-radio-toggle>
      <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
      <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
    </nx-radio-toggle>
    <nx-radio-toggle>
      <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
      <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
    </nx-radio-toggle>
  `,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class MultiRadioToggle extends RadioToggleTest {}
@Component({
  template: `
    <nx-radio-toggle>
      <nx-radio-toggle-button value="A" ariaLabel="cat">A</nx-radio-toggle-button>
      <nx-radio-toggle-button value="B" ariaLabel="dog">B</nx-radio-toggle-button>
    </nx-radio-toggle>
  `,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class AriaRadioToggle extends RadioToggleTest {}

@Component({
  template: `<form novalidate [formGroup]="testForm">
    <nx-radio-toggle formControlName="reactiveToggle">
      <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
      <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
      <nx-radio-toggle-button value="C">C</nx-radio-toggle-button>
    </nx-radio-toggle>

    <p>Form value: {{ testForm.value | json }}</p>
    <p>Form status: {{ testForm.status | json }}</p>
  </form>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule, JsonPipe],
})
class ReactiveFormToggle extends RadioToggleTest {
  fb: FormBuilder = new FormBuilder();

  testForm = this.fb.group({
    reactiveToggle: new FormControl(
      {
        value: 'B',
        disabled: false,
      },
      {
        validators: Validators.required,
      },
    ),
  });
}

@Component({
  template: `<form [formGroup]="testForm">
    <nx-radio-toggle formControlName="testToggle">
      <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
      <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
      <nx-radio-toggle-button value="C">C</nx-radio-toggle-button>
    </nx-radio-toggle>
  </form>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class ValidationToggle extends RadioToggleTest {
  data = ['A', 'B', 'C'];
  testForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      testToggle: ['', this.customValidation],
    });
  }

  private customValidation(formGroup: FormGroup) {
    return formGroup.value !== 'B' ? { valid: false } : null;
  }
}

@Component({
  template: `<nx-radio-toggle>
    <nx-radio-toggle-button value="A" [selected]="true" tabindex="0"
      >Label A</nx-radio-toggle-button
    >
    <nx-radio-toggle-button value="B" tabindex="0">Label B</nx-radio-toggle-button>
  </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class FocusRadioToggle extends RadioToggleTest {}

@Component({
  template: `<nx-radio-toggle name="radioToggleGroupTest" [readonly]="readonly" #radioToggleGroup>
    <nx-radio-toggle-button value="0">0</nx-radio-toggle-button>
    <nx-radio-toggle-button value="1">1</nx-radio-toggle-button>
  </nx-radio-toggle>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule],
})
class RadioToggleGroupTest extends RadioToggleTest {
  readonly = false;
  @ViewChild('radioToggleGroup', { read: NxAbstractControl }) toggleGroup!: NxAbstractControl;
}
@Component({
  template: `<form [formGroup]="testForm">
    <nx-radio-toggle formControlName="reactiveToggle">
      <nx-radio-toggle-button value="A">A</nx-radio-toggle-button>
      <nx-radio-toggle-button value="B">B</nx-radio-toggle-button>
      <nx-radio-toggle-button value="C">C</nx-radio-toggle-button>
      <nx-error> Required. Greetings treveler! </nx-error>
    </nx-radio-toggle>

    <button type="submit" id="submit-button">submit</button>
  </form>`,
  imports: [NxRadioToggleModule, FormsModule, ReactiveFormsModule, NxErrorComponent],
})
class RadioToggleGroupErrorTest extends RadioToggleTest {
  fb: FormBuilder = new FormBuilder();

  testForm = this.fb.group({
    reactiveToggle: ['', Validators.required],
  });
}
