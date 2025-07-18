import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Type,
  ViewChild,
  viewChild,
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
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxCircleToggleModule } from '../circle-toggle.module';
import { NxCircleToggleComponent } from '../circle-toggle/circle-toggle.component';
import { NxCircleToggleGroupComponent } from './circle-toggle-group.component';

describe('NxToggleButtonGroup', () => {
  let fixture: ComponentFixture<ButtonToggleGroupTest>;
  let testInstance: ButtonToggleGroupTest;
  let toggleComponent: NxCircleToggleGroupComponent;
  let toggleInputs: NodeListOf<HTMLInputElement>;
  let toggleButtons: NodeListOf<HTMLElement>;
  let toggleNativeElement: HTMLElement;
  let input: HTMLInputElement;

  function createTestComponent(component: Type<ButtonToggleGroupTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;

    toggleComponent = fixture.componentInstance.buttonToggleGroup;
    toggleInputs = fixture.nativeElement.querySelectorAll('input');
    toggleButtons = fixture.nativeElement.querySelectorAll('nx-circle-toggle');
    const toggleDebugElement = fixture.debugElement.query(
      By.directive(NxCircleToggleGroupComponent),
    );
    toggleNativeElement = toggleDebugElement.nativeElement;
    input = fixture.nativeElement.querySelector('input');
  }

  function click(index: number) {
    toggleInputs.item(index).click();
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxCircleToggleModule,
        FormsModule,
        ReactiveFormsModule,
        SimpleCircleToggleGroupComponent,
        BooleanCircleToggleGroupComponent,
        NgModelCircleToggleGroupComponent,
        ReactiveCircleToggleGroupComponent,
        NgForCircleToggleGroupComponent,
        DisabledCircleToggleGroupComponent,
        CircleToggleOnPushComponent,
        EmptyToggleOnPushComponent,
        CircleToggleGroupWithDivComponent,
        ExpertCircleToggleGroupComponent,
        ReadonlyCircleToggleGroupComponent,
      ],
    }).compileComponents();
  }));

  it('should not allow more than one button to be checked at once', () => {
    createTestComponent(SimpleCircleToggleGroupComponent);

    click(0);
    expect(toggleInputs.item(0).checked).toBeTruthy();
    expect(toggleInputs.item(1).checked).toBeFalsy();
    expect(toggleInputs.item(2).checked).toBeFalsy();

    click(1);
    expect(toggleInputs.item(0).checked).toBeFalsy();
    expect(toggleInputs.item(1).checked).toBeTruthy();
    expect(toggleInputs.item(2).checked).toBeFalsy();
  });

  it('should fire group change events with the correct value', () => {
    createTestComponent(SimpleCircleToggleGroupComponent);
    spyOn(toggleComponent.valueChange, 'emit');
    click(0);

    expect(toggleComponent.valueChange.emit).toHaveBeenCalledWith('A');
  });

  it('should work with ngModel', fakeAsync(() => {
    createTestComponent(NgModelCircleToggleGroupComponent);
    expect(testInstance.modelValue).toBeFalsy();

    fixture.componentInstance.modelValue = 'A';
    fixture.detectChanges();
    tick();

    expect(toggleComponent.selectedButton?.value).toBe('A');
    expect(toggleComponent.buttons.toArray()[0].checked).toBeTruthy();

    click(1);
    expect(testInstance.modelValue).toBe('B');
  }));

  it('should go into errorState when control invalid', fakeAsync(() => {
    createTestComponent(ReactiveCircleToggleGroupComponent);

    const reactComp: ReactiveCircleToggleGroupComponent =
      fixture.componentInstance as ReactiveCircleToggleGroupComponent;

    reactComp.testGroup.controls.reactiveToggle.setValue(null);
    reactComp.testGroup.markAllAsTouched();
    fixture.detectChanges();
    const children = fixture.nativeElement.querySelectorAll('.nx-toggle-circle');

    tick();

    children.forEach((child: any) => {
      expect(child).toHaveClass('has-error');
    });
    expect(toggleComponent.errorState()).toBeTrue();
  }));

  it('should work with rective forms', fakeAsync(() => {
    createTestComponent(ReactiveCircleToggleGroupComponent);

    const reactComp: ReactiveCircleToggleGroupComponent =
      fixture.componentInstance as ReactiveCircleToggleGroupComponent;

    reactComp.testGroup.controls.reactiveToggle.setValue('A');
    fixture.detectChanges();
    tick();

    expect(toggleComponent.buttons.toArray()[0].checked).toBeTruthy();

    click(1);
    expect(reactComp.testGroup.value.reactiveToggle).toBe('B');
  }));

  it('should work with ngFor', () => {
    createTestComponent(NgForCircleToggleGroupComponent);
    const ngForComp: NgForCircleToggleGroupComponent =
      fixture.componentInstance as NgForCircleToggleGroupComponent;

    expect(toggleComponent.buttons.toArray()[0].value).toBe(ngForComp.testButtons[0].value);
    expect(toggleComponent.buttons.toArray()[1].value).toBe(ngForComp.testButtons[1].value);
  });

  it('should project the label and hint correctly into the view', () => {
    createTestComponent(SimpleCircleToggleGroupComponent);
    const toggles = fixture.nativeElement.querySelectorAll('nx-toggle-circle');

    toggles.forEach((toggle: any, index: any) => {
      const text = toggle.querySelector('.nx-toggle-circle__label-text') as HTMLSpanElement;
      const info = toggle.querySelector('.nx-toggle-circle__label-hint') as HTMLSpanElement;
      expect(text.textContent).toBe('text' + (index + 1));
      expect(info.textContent).toBe('info' + (index + 1));
    });
  });

  it('should create proper ids for the circle toggle children', fakeAsync(() => {
    createTestComponent(SimpleCircleToggleGroupComponent);
    tick();
    const ids = toggleComponent.buttons.map((toggle) => toggle.id);
    expect(ids[0]).not.toBe(ids[1]);
    expect(ids[1]).not.toBe(ids[2]);
  }));

  it('should assign the same name to all child toggles', () => {
    createTestComponent(SimpleCircleToggleGroupComponent);
    expect(toggleInputs.item(0).name).toBe(toggleInputs.item(1).name);
  });

  it('circle toggle components inherit disabled state from toggle group', fakeAsync(() => {
    createTestComponent(DisabledCircleToggleGroupComponent);

    fixture.detectChanges();
    tick();
    expect(toggleComponent.buttons.toArray()[0].disabled).toBeTrue();
    expect(toggleComponent.buttons.toArray()[1].disabled).toBeTrue();
    expect(toggleComponent.buttons.toArray()[2].disabled).toBeTrue();
  }));

  it('can be set to readonly and child toggles inherit the state', () => {
    createTestComponent(ReadonlyCircleToggleGroupComponent);
    expect(toggleNativeElement.getAttribute('aria-disabled')).toBe('true');
    toggleButtons.forEach((toggle) => expect(toggle).toHaveClass('is-readonly'));
  });

  it('implements NxAbstractControl', () => {
    createTestComponent(ReadonlyCircleToggleGroupComponent);
    (testInstance as ReadonlyCircleToggleGroupComponent).abstractControl().setReadonly(false);
    fixture.detectChanges();
    expect(toggleNativeElement.getAttribute('aria-disabled')).toBe('false');
    toggleButtons.forEach((toggle) => expect(toggle).not.toHaveClass('is-readonly'));

    (testInstance as ReadonlyCircleToggleGroupComponent).abstractControl().setReadonly(true);
    fixture.detectChanges();
    expect(toggleNativeElement.getAttribute('aria-disabled')).toBe('true');
    toggleButtons.forEach((toggle) => expect(toggle).toHaveClass('is-readonly'));
  });

  it('circle toggle components inherit negative style on change from toggle group', () => {
    createTestComponent(SimpleCircleToggleGroupComponent);
    toggleComponent.negative = true;
    fixture.detectChanges();
    const iconToggles = Array.from(toggleButtons).map((toggle) =>
      toggle.querySelector('nx-icon-toggle-button'),
    );
    iconToggles.forEach((toggle) => expect(toggle).toHaveClass('is-negative'));
  });

  it('circle toggle components inherit responsive property on change from toggle group', () => {
    createTestComponent(SimpleCircleToggleGroupComponent);
    toggleComponent.responsive = true;
    fixture.detectChanges();
    toggleButtons.forEach((toggle) => expect(toggle).toHaveClass('is-responsive'));
  });

  it('circle toggle components can be disabled individually', () => {
    createTestComponent(SimpleCircleToggleGroupComponent);
    const secondToggle = fixture.debugElement.queryAll(By.directive(NxCircleToggleComponent))[1];
    secondToggle.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(toggleButtons.item(1)).toHaveClass('is-disabled');
  });

  it('should not show check icon when in group', fakeAsync(() => {
    createTestComponent(NgModelCircleToggleGroupComponent);
    fixture.componentInstance.modelValue = 'B';
    fixture.detectChanges();
    flush();
    expect(toggleComponent.buttons.toArray()[1].checked).toBeTruthy();
    expect(toggleButtons.item(1).querySelector('.nx-toggle-circle__check-icon')).toBeFalsy();
  }));

  it('circle toggle gets correct styles on value change', fakeAsync(() => {
    createTestComponent(SimpleCircleToggleGroupComponent);
    toggleComponent.value = 'B';
    tick();
    fixture.detectChanges();
    flush();

    expect(toggleButtons.item(1).querySelector('nx-icon-toggle-button')).toHaveClass('is-flipped');
  }));

  it('circle toggle gets correct styles on value is true/false', fakeAsync(() => {
    createTestComponent(BooleanCircleToggleGroupComponent);
    toggleComponent.value = true;
    tick();
    fixture.detectChanges();

    expect(toggleButtons.item(0).querySelector('nx-icon-toggle-button')).not.toHaveClass(
      'is-flipped',
    );
    expect(toggleButtons.item(1).querySelector('nx-icon-toggle-button')).toHaveClass('is-flipped');

    toggleComponent.value = false;
    tick();
    fixture.detectChanges();

    expect(toggleButtons.item(0).querySelector('nx-icon-toggle-button')).toHaveClass('is-flipped');
    expect(toggleButtons.item(1).querySelector('nx-icon-toggle-button')).not.toHaveClass(
      'is-flipped',
    );

    toggleComponent.value = null;
    tick();
    fixture.detectChanges();

    expect(toggleButtons.item(0).querySelector('nx-icon-toggle-button')).not.toHaveClass(
      'is-flipped',
    );
    expect(toggleButtons.item(1).querySelector('nx-icon-toggle-button')).not.toHaveClass(
      'is-flipped',
    );
  }));

  it('recognizes descendants', () => {
    createTestComponent(CircleToggleGroupWithDivComponent);
    expect(toggleComponent.buttons).toHaveSize(3);
  });

  describe('programmatic change', () => {
    it('should update on disabled change', () => {
      createTestComponent(EmptyToggleOnPushComponent);
      toggleComponent.disabled = true;
      fixture.detectChanges();
      expect(toggleNativeElement).toHaveClass('is-disabled');
    });

    it('should update on id change', () => {
      createTestComponent(CircleToggleOnPushComponent);
      toggleComponent.id = 'testId';
      fixture.detectChanges();
      expect(toggleNativeElement.id).toBe('testId');
    });

    it('should update on name change', () => {
      createTestComponent(EmptyToggleOnPushComponent);
      toggleComponent.name = 'testName';
      fixture.detectChanges();
      expect(toggleNativeElement.getAttribute('name')).toBe('testName');
    });

    it('should update on responsive change', () => {
      createTestComponent(CircleToggleOnPushComponent);
      expect(toggleNativeElement).toHaveClass('is-responsive');
      toggleComponent.responsive = false;
      fixture.detectChanges();
      expect(toggleNativeElement).not.toHaveClass('is-responsive');
    });

    it('should reset when form value is null', fakeAsync(() => {
      createTestComponent(ReactiveCircleToggleGroupComponent);

      const reactComp: ReactiveCircleToggleGroupComponent =
        fixture.componentInstance as ReactiveCircleToggleGroupComponent;
      const buttonA = toggleButtons.item(0).querySelector('nx-icon-toggle-button');
      reactComp.testGroup.controls.reactiveToggle.setValue('A');
      tick();
      fixture.detectChanges();
      flush();

      expect(buttonA).toHaveClass('is-flipped');

      reactComp.testGroup.controls.reactiveToggle.setValue(null);
      tick();
      fixture.detectChanges();
      flush();
      expect(buttonA).not.toHaveClass('is-flipped');
    }));

    it('should reset when ngModel value is set to null', fakeAsync(() => {
      createTestComponent(NgModelCircleToggleGroupComponent);

      click(0);

      const buttonA = toggleButtons.item(0).querySelector('nx-icon-toggle-button');
      expect(buttonA).toHaveClass('is-flipped');

      fixture.componentInstance.modelValue = null;

      tick();
      fixture.detectChanges();
      flush();

      expect(buttonA).not.toHaveClass('is-flipped');
    }));

    it('should sync group value with clicked child item', fakeAsync(() => {
      createTestComponent(ReactiveCircleToggleGroupComponent);

      click(1);
      tick();
      fixture.detectChanges();
      expect(toggleComponent.value).toBe('B');
    }));
  });

  describe('appearance', () => {
    it('has default appearance', () => {
      createTestComponent(SimpleCircleToggleGroupComponent);
      expect(toggleComponent.appearance).toBe('default');
    });

    it('has expert appearance', () => {
      createTestComponent(ExpertCircleToggleGroupComponent);
      expect(toggleComponent.appearance).toBe('expert');
      expect(toggleNativeElement).toHaveClass('is-expert');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(SimpleCircleToggleGroupComponent);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });

    it('has no accessibility violations when readonly', async () => {
      createTestComponent(ReadonlyCircleToggleGroupComponent);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });

    it('has no accessibility violations when disabled', async () => {
      createTestComponent(DisabledCircleToggleGroupComponent);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });

    it('should set aria-required', () => {
      createTestComponent(ReactiveCircleToggleGroupComponent);
      const circleToggleGroup = fixture.nativeElement.querySelector('nx-circle-toggle-group');
      expect(circleToggleGroup.getAttribute('aria-required')).toBe('true');
    });

    it('should not set aria-required on each toggle when in a group', () => {
      createTestComponent(ReactiveCircleToggleGroupComponent);
      expect(input.getAttribute('aria-required')).toBeNull();
    });
  });
});

@Directive({ standalone: true })
abstract class ButtonToggleGroupTest {
  @ViewChild(NxCircleToggleGroupComponent) buttonToggleGroup!: NxCircleToggleGroupComponent;

  modelValue!: string | null;
  valueBinding = 'B';
  appearance = 'default';
}

@Component({
  template: `
    <nx-circle-toggle-group>
      <nx-circle-toggle
        value="A"
        icon="product-heart"
        hint="info1"
        label="text1"
      ></nx-circle-toggle>
      <nx-circle-toggle value="B" icon="product-bed" hint="info2" label="text2"></nx-circle-toggle>
      <nx-circle-toggle value="C" icon="product-bed" hint="info3" label="text3"></nx-circle-toggle>
    </nx-circle-toggle-group>
  `,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class SimpleCircleToggleGroupComponent extends ButtonToggleGroupTest {}

@Component({
  template: `
    <nx-circle-toggle-group>
      <nx-circle-toggle
        [value]="false"
        icon="product-heart"
        hint="info1"
        label="text1"
      ></nx-circle-toggle>
      <nx-circle-toggle
        [value]="true"
        icon="product-bed"
        hint="info2"
        label="text2"
      ></nx-circle-toggle>
    </nx-circle-toggle-group>
  `,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class BooleanCircleToggleGroupComponent extends ButtonToggleGroupTest {}

@Component({
  template: `
    <nx-circle-toggle-group [value]="valueBinding">
      <nx-circle-toggle
        value="A"
        icon="product-heart"
        hint="info1"
        label="text1"
      ></nx-circle-toggle>
      <nx-circle-toggle value="B" icon="product-bed" hint="info2" label="text2"></nx-circle-toggle>
      <nx-circle-toggle value="C" icon="product-bed" hint="info3" label="text3"></nx-circle-toggle>
    </nx-circle-toggle-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class CircleToggleOnPushComponent extends ButtonToggleGroupTest {}

@Component({
  template: `<nx-circle-toggle-group> </nx-circle-toggle-group>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class EmptyToggleOnPushComponent extends ButtonToggleGroupTest {}

@Component({
  template: `
    <nx-circle-toggle-group [(ngModel)]="modelValue" name="test">
      <nx-circle-toggle
        value="A"
        icon="product-heart"
        hint="info1"
        label="text1"
      ></nx-circle-toggle>
      <nx-circle-toggle value="B" icon="product-bed" hint="info2" label="text2"></nx-circle-toggle>
      <nx-circle-toggle value="C" icon="product-bed" hint="info3" label="text3"></nx-circle-toggle>
    </nx-circle-toggle-group>
  `,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class NgModelCircleToggleGroupComponent extends ButtonToggleGroupTest {}

@Component({
  template: `
    <form [formGroup]="testGroup">
      <nx-circle-toggle-group formControlName="reactiveToggle">
        <nx-circle-toggle
          value="A"
          icon="product-heart"
          hint="info1"
          label="text1"
        ></nx-circle-toggle>
        <nx-circle-toggle
          value="B"
          icon="product-bed"
          hint="info2"
          label="text2"
        ></nx-circle-toggle>
        <nx-circle-toggle
          value="C"
          icon="product-bed"
          hint="info3"
          label="text3"
        ></nx-circle-toggle>
      </nx-circle-toggle-group>
    </form>
  `,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class ReactiveCircleToggleGroupComponent extends ButtonToggleGroupTest {
  fb: FormBuilder = new FormBuilder();

  testGroup = this.fb.group({
    reactiveToggle: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        validators: Validators.required,
      },
    ),
  });
}
@Component({
  template: `
    <nx-circle-toggle-group>
      @for (item of testButtons; track item) {
        <nx-circle-toggle
          [value]="item.value"
          [icon]="item.icon"
          [hint]="item.hint"
          [label]="item.label"
        >
        </nx-circle-toggle>
      }
    </nx-circle-toggle-group>
  `,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class NgForCircleToggleGroupComponent extends ButtonToggleGroupTest {
  testButtons = [
    { value: 'A', icon: 'product-heart', hint: 'Hint A', label: 'Label A' },
    { value: 'B', icon: 'product-bed', hint: 'Hint B', label: 'Label B' },
  ];
}

@Component({
  template: `
    <nx-circle-toggle-group disabled="true">
      <nx-circle-toggle
        value="A"
        icon="product-heart"
        hint="info1"
        label="text1"
      ></nx-circle-toggle>
      <nx-circle-toggle value="B" icon="product-bed" hint="info2" label="text2"></nx-circle-toggle>
      <nx-circle-toggle value="C" icon="product-bed" hint="info3" label="text3"></nx-circle-toggle>
    </nx-circle-toggle-group>
  `,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class DisabledCircleToggleGroupComponent extends ButtonToggleGroupTest {}

@Component({
  template: `
    <nx-circle-toggle-group #group readonly>
      <nx-circle-toggle
        value="A"
        icon="product-heart"
        hint="info1"
        label="text1"
      ></nx-circle-toggle>
      <nx-circle-toggle value="B" icon="product-bed" hint="info2" label="text2"></nx-circle-toggle>
      <nx-circle-toggle value="C" icon="product-bed" hint="info3" label="text3"></nx-circle-toggle>
    </nx-circle-toggle-group>
  `,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class ReadonlyCircleToggleGroupComponent extends ButtonToggleGroupTest {
  abstractControl = viewChild.required('group', { read: NxAbstractControl });
}

@Component({
  template: `
    <nx-circle-toggle-group>
      <div>
        <nx-circle-toggle
          value="A"
          icon="product-heart"
          hint="info1"
          label="text1"
        ></nx-circle-toggle>
        <nx-circle-toggle
          value="B"
          icon="product-bed"
          hint="info2"
          label="text2"
        ></nx-circle-toggle>
        <nx-circle-toggle
          value="C"
          icon="product-bed"
          hint="info3"
          label="text3"
        ></nx-circle-toggle>
      </div>
    </nx-circle-toggle-group>
  `,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class CircleToggleGroupWithDivComponent extends ButtonToggleGroupTest {}

@Component({
  template: `
    <nx-circle-toggle-group appearance="expert">
      <nx-circle-toggle
        value="A"
        icon="product-heart"
        hint="info1"
        label="text1"
      ></nx-circle-toggle>
      <nx-circle-toggle value="B" icon="product-bed" hint="info2" label="text2"></nx-circle-toggle>
      <nx-circle-toggle value="C" icon="product-bed" hint="info3" label="text3"></nx-circle-toggle>
    </nx-circle-toggle-group>
  `,
  imports: [NxCircleToggleModule, FormsModule, ReactiveFormsModule],
})
class ExpertCircleToggleGroupComponent extends ButtonToggleGroupTest {}
