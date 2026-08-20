import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxCheckboxComponent } from './checkbox.component';
import { NxCheckboxModule } from './checkbox.module';

@Component({
  selector: 'test-basic-signal-form-checkbox',
  template: `<nx-checkbox [formField]="checkboxForm.enabled" [indeterminate]="indeterminate()"
    >Accept terms</nx-checkbox
  >`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NxCheckboxModule, FormField],
})
class BasicSignalFormCheckbox {
  @ViewChild(NxCheckboxComponent) checkboxInstance!: NxCheckboxComponent;
  readonly model = signal({ enabled: false });
  readonly indeterminate = signal(false);
  readonly checkboxForm = form(this.model);
}

@Component({
  selector: 'test-required-signal-form-checkbox',
  template: `<nx-checkbox [formField]="checkboxForm.enabled">Accept terms</nx-checkbox>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NxCheckboxModule, FormField],
})
class RequiredSignalFormCheckbox {
  @ViewChild(NxCheckboxComponent) checkboxInstance!: NxCheckboxComponent;
  readonly model = signal({ enabled: false });
  readonly checkboxForm = form(this.model, (schema) => {
    required(schema.enabled, { message: 'You must accept the terms' });
  });
}

@Component({
  selector: 'test-disabled-signal-form-checkbox',
  template: `<nx-checkbox [formField]="checkboxForm.enabled">Accept terms</nx-checkbox>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NxCheckboxModule, FormField],
})
class DisabledSignalFormCheckbox {
  @ViewChild(NxCheckboxComponent) checkboxInstance!: NxCheckboxComponent;
  readonly model = signal({ enabled: false });
  readonly checkboxForm = form(this.model, (schema) => {
    disabled(schema.enabled, { when: () => true });
  });
}

@Component({
  selector: 'test-dynamic-signal-form-checkbox-group',
  template: `
    <nx-checkbox-group [formField]="groupForm.picked">
      @for (option of options(); track option) {
        <nx-checkbox [value]="option" checked>{{ option }}</nx-checkbox>
      }
    </nx-checkbox-group>
  `,
  imports: [NxCheckboxModule, FormField],
})
class DynamicSignalFormCheckboxGroup {
  readonly options = signal(['a', 'b']);
  readonly model = signal({ picked: [] as string[] });
  readonly groupForm = form(this.model);
}

describe('NxCheckboxComponent signal forms', () => {
  let fixture: ComponentFixture<any>;
  let inputElement: HTMLInputElement;
  let labelElement: HTMLLabelElement;

  function create<T>(component: new () => T): ComponentFixture<T> {
    const created = TestBed.createComponent(component);
    created.detectChanges();
    inputElement = created.nativeElement.querySelector('input') as HTMLInputElement;
    labelElement = created.nativeElement.querySelector('label') as HTMLLabelElement;
    return created;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxCheckboxModule,
        BasicSignalFormCheckbox,
        RequiredSignalFormCheckbox,
        DisabledSignalFormCheckbox,
        DynamicSignalFormCheckboxGroup,
      ],
    }).compileComponents();
  }));

  describe('model -> view', () => {
    it('reflects a truthy model value as a checked control', () => {
      fixture = create(BasicSignalFormCheckbox);
      const host = fixture.componentInstance as BasicSignalFormCheckbox;

      expect(host.checkboxInstance.checked).toBe(false);
      expect(inputElement.checked).toBe(false);

      host.model.update((m) => ({ ...m, enabled: true }));
      fixture.detectChanges();

      expect(host.checkboxInstance.checked).toBe(true);
      expect(inputElement.checked).toBe(true);
    });

    it('reflects a falsy model value as an unchecked control', () => {
      fixture = create(BasicSignalFormCheckbox);
      const host = fixture.componentInstance as BasicSignalFormCheckbox;

      host.model.update((m) => ({ ...m, enabled: true }));
      fixture.detectChanges();
      expect(inputElement.checked).toBe(true);

      host.model.update((m) => ({ ...m, enabled: false }));
      fixture.detectChanges();

      expect(host.checkboxInstance.checked).toBe(false);
      expect(inputElement.checked).toBe(false);
    });
  });

  describe('view -> model', () => {
    it('flips the boolean form value when the input is clicked', () => {
      fixture = create(BasicSignalFormCheckbox);
      const host = fixture.componentInstance as BasicSignalFormCheckbox;

      expect(host.checkboxForm.enabled().value()).toBe(false);

      inputElement.click();
      fixture.detectChanges();

      expect(host.checkboxForm.enabled().value()).toBe(true);
      expect(host.model().enabled).toBe(true);
      expect(inputElement.checked).toBe(true);

      inputElement.click();
      fixture.detectChanges();

      expect(host.checkboxForm.enabled().value()).toBe(false);
      expect(host.model().enabled).toBe(false);
    });

    it('flips the boolean form value when the label is clicked', () => {
      fixture = create(BasicSignalFormCheckbox);
      const host = fixture.componentInstance as BasicSignalFormCheckbox;

      labelElement.click();
      fixture.detectChanges();

      expect(host.checkboxForm.enabled().value()).toBe(true);
    });

    it('marks the field dirty after user interaction', () => {
      fixture = create(BasicSignalFormCheckbox);
      const host = fixture.componentInstance as BasicSignalFormCheckbox;

      expect(host.checkboxForm.enabled().dirty()).toBe(false);

      inputElement.click();
      fixture.detectChanges();

      expect(host.checkboxForm.enabled().dirty()).toBe(true);
    });
  });

  describe('touched on blur', () => {
    it('marks the field as touched when the control is blurred', () => {
      fixture = create(BasicSignalFormCheckbox);
      const host = fixture.componentInstance as BasicSignalFormCheckbox;

      expect(host.checkboxForm.enabled().touched()).toBe(false);

      dispatchFakeEvent(inputElement, 'blur');
      fixture.detectChanges();

      expect(host.checkboxForm.enabled().touched()).toBe(true);
    });
  });

  describe('required validator', () => {
    it('is invalid while unchecked and valid once checked', () => {
      fixture = create(RequiredSignalFormCheckbox);
      const host = fixture.componentInstance as RequiredSignalFormCheckbox;

      expect(host.checkboxForm().invalid()).toBe(true);
      expect(host.checkboxForm.enabled().errors().length).toBeGreaterThan(0);
      expect(host.checkboxForm.enabled().errors()[0].kind).toBe('required');

      inputElement.click();
      fixture.detectChanges();

      expect(host.checkboxForm().valid()).toBe(true);
      expect(host.checkboxForm.enabled().errors().length).toBe(0);
    });
  });

  describe('disabled rule', () => {
    it('disables the native input when the schema disables the field', () => {
      fixture = create(DisabledSignalFormCheckbox);
      const host = fixture.componentInstance as DisabledSignalFormCheckbox;

      expect(host.checkboxForm.enabled().disabled()).toBe(true);
      expect(host.checkboxInstance.disabled).toBe(true);
      expect(inputElement.disabled).toBe(true);
    });

    it('does not update the form value when a disabled control is clicked', () => {
      fixture = create(DisabledSignalFormCheckbox);
      const host = fixture.componentInstance as DisabledSignalFormCheckbox;

      inputElement.click();
      fixture.detectChanges();

      expect(host.checkboxForm.enabled().value()).toBe(false);
    });
  });

  describe('checkbox-specific edge cases', () => {
    it('clears the indeterminate state once the control is toggled through the form', () => {
      fixture = create(BasicSignalFormCheckbox);
      const host = fixture.componentInstance as BasicSignalFormCheckbox;

      host.indeterminate.set(true);
      fixture.detectChanges();
      expect(host.checkboxInstance.indeterminate).toBe(true);
      expect(inputElement.indeterminate).toBe(true);

      inputElement.click();
      fixture.detectChanges();

      expect(host.checkboxInstance.indeterminate).toBe(false);
      expect(host.checkboxForm.enabled().value()).toBe(true);
    });
  });

  describe('nx-checkbox-group', () => {
    it('does not throw when the checkbox list changes after the initial render', fakeAsync(() => {
      const created = TestBed.createComponent(DynamicSignalFormCheckboxGroup);
      const host = created.componentInstance;
      created.detectChanges();
      flush();

      expect(() => {
        host.options.update((options) => [...options, 'c']);
        created.detectChanges();
        flush();
      }).not.toThrow();
    }));

    it('updates the field value when a checkbox is added', fakeAsync(() => {
      const created = TestBed.createComponent(DynamicSignalFormCheckboxGroup);
      const host = created.componentInstance;
      created.detectChanges();
      flush();

      host.options.update((options) => [...options, 'c']);
      created.detectChanges();
      flush();

      expect(host.model().picked).toEqual(['a', 'b', 'c']);
    }));

    it('updates the field value when a checkbox is removed', fakeAsync(() => {
      const created = TestBed.createComponent(DynamicSignalFormCheckboxGroup);
      const host = created.componentInstance;
      created.detectChanges();
      flush();

      host.options.update((options) => options.slice(1));
      created.detectChanges();
      flush();

      expect(host.model().picked).toEqual(['b']);
    }));

    it('keeps the field pristine when the checkbox list changes programmatically', fakeAsync(() => {
      const created = TestBed.createComponent(DynamicSignalFormCheckboxGroup);
      const host = created.componentInstance;
      created.detectChanges();
      flush();

      host.options.update((options) => [...options, 'c']);
      created.detectChanges();
      flush();

      expect(host.groupForm.picked().dirty()).toBe(false);
    }));
  });
});
