import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxSwitcherComponent } from './switcher.component';
import { NxSwitcherModule } from './switcher.module';

@Component({
  template: `<nx-switcher [formField]="switcherForm.enabled">Enable feature</nx-switcher>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NxSwitcherModule, FormField],
})
class BasicSignalFormSwitcher {
  @ViewChild(NxSwitcherComponent) switcherInstance!: NxSwitcherComponent;
  readonly model = signal({ enabled: false });
  readonly switcherForm = form(this.model);
}

@Component({
  template: `<nx-switcher [formField]="switcherForm.enabled">Enable feature</nx-switcher>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NxSwitcherModule, FormField],
})
class RequiredSignalFormSwitcher {
  @ViewChild(NxSwitcherComponent) switcherInstance!: NxSwitcherComponent;
  readonly model = signal({ enabled: false });
  readonly switcherForm = form(this.model, (schema) => {
    required(schema.enabled, { message: 'This must be enabled' });
  });
}

@Component({
  template: `<nx-switcher [formField]="switcherForm.enabled">Enable feature</nx-switcher>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NxSwitcherModule, FormField],
})
class DisabledSignalFormSwitcher {
  @ViewChild(NxSwitcherComponent) switcherInstance!: NxSwitcherComponent;
  readonly model = signal({ enabled: false });
  readonly switcherForm = form(this.model, (schema) => {
    disabled(schema.enabled, { when: () => true });
  });
}

describe('NxSwitcherComponent signal forms', () => {
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
        NxSwitcherModule,
        BasicSignalFormSwitcher,
        RequiredSignalFormSwitcher,
        DisabledSignalFormSwitcher,
      ],
    }).compileComponents();
  }));

  describe('model -> view', () => {
    it('reflects a truthy model value as a checked switcher', () => {
      fixture = create(BasicSignalFormSwitcher);
      const host = fixture.componentInstance as BasicSignalFormSwitcher;

      expect(host.switcherInstance.checked).toBeFalse();
      expect(inputElement.checked).toBeFalse();

      host.model.update((m) => ({ ...m, enabled: true }));
      fixture.detectChanges();

      expect(host.switcherInstance.checked).toBeTrue();
      expect(inputElement.checked).toBeTrue();
      expect(inputElement.getAttribute('aria-checked')).toBe('true');
    });

    it('reflects a falsy model value as an unchecked switcher', () => {
      fixture = create(BasicSignalFormSwitcher);
      const host = fixture.componentInstance as BasicSignalFormSwitcher;

      host.model.update((m) => ({ ...m, enabled: true }));
      fixture.detectChanges();
      expect(inputElement.checked).toBeTrue();

      host.model.update((m) => ({ ...m, enabled: false }));
      fixture.detectChanges();

      expect(host.switcherInstance.checked).toBeFalse();
      expect(inputElement.checked).toBeFalse();
      expect(inputElement.getAttribute('aria-checked')).toBe('false');
    });
  });

  describe('view -> model', () => {
    it('flips the boolean form value when the input is clicked', () => {
      fixture = create(BasicSignalFormSwitcher);
      const host = fixture.componentInstance as BasicSignalFormSwitcher;

      expect(host.switcherForm.enabled().value()).toBeFalse();

      inputElement.click();
      fixture.detectChanges();

      expect(host.switcherForm.enabled().value()).toBeTrue();
      expect(host.model().enabled).toBeTrue();
      expect(inputElement.checked).toBeTrue();

      inputElement.click();
      fixture.detectChanges();

      expect(host.switcherForm.enabled().value()).toBeFalse();
      expect(host.model().enabled).toBeFalse();
    });

    it('flips the boolean form value when the label is clicked', () => {
      fixture = create(BasicSignalFormSwitcher);
      const host = fixture.componentInstance as BasicSignalFormSwitcher;

      labelElement.click();
      fixture.detectChanges();

      expect(host.switcherForm.enabled().value()).toBeTrue();
    });

    it('marks the field dirty after user interaction', () => {
      fixture = create(BasicSignalFormSwitcher);
      const host = fixture.componentInstance as BasicSignalFormSwitcher;

      expect(host.switcherForm.enabled().dirty()).toBeFalse();

      inputElement.click();
      fixture.detectChanges();

      expect(host.switcherForm.enabled().dirty()).toBeTrue();
    });
  });

  describe('touched on blur', () => {
    it('marks the field as touched when the control is blurred', () => {
      fixture = create(BasicSignalFormSwitcher);
      const host = fixture.componentInstance as BasicSignalFormSwitcher;

      expect(host.switcherForm.enabled().touched()).toBeFalse();

      dispatchFakeEvent(inputElement, 'blur');
      fixture.detectChanges();

      expect(host.switcherForm.enabled().touched()).toBeTrue();
    });
  });

  describe('required validator', () => {
    it('is invalid while off and valid once switched on', () => {
      fixture = create(RequiredSignalFormSwitcher);
      const host = fixture.componentInstance as RequiredSignalFormSwitcher;

      expect(host.switcherForm().invalid()).toBeTrue();
      expect(host.switcherForm.enabled().errors().length).toBeGreaterThan(0);
      expect(host.switcherForm.enabled().errors()[0].kind).toBe('required');

      inputElement.click();
      fixture.detectChanges();

      expect(host.switcherForm().valid()).toBeTrue();
      expect(host.switcherForm.enabled().errors().length).toBe(0);
    });
  });

  describe('disabled rule', () => {
    it('disables the native input when the schema disables the field', () => {
      fixture = create(DisabledSignalFormSwitcher);
      const host = fixture.componentInstance as DisabledSignalFormSwitcher;

      expect(host.switcherForm.enabled().disabled()).toBeTrue();
      expect(host.switcherInstance.disabled).toBeTrue();
      expect(inputElement.disabled).toBeTrue();
    });

    it('does not update the form value when a disabled control is clicked', () => {
      fixture = create(DisabledSignalFormSwitcher);
      const host = fixture.componentInstance as DisabledSignalFormSwitcher;

      inputElement.click();
      fixture.detectChanges();

      expect(host.switcherForm.enabled().value()).toBeFalse();
    });
  });

  describe('switcher-specific edge cases', () => {
    it('marks the field as touched when toggled by a click (switcher touches on toggle)', () => {
      fixture = create(BasicSignalFormSwitcher);
      const host = fixture.componentInstance as BasicSignalFormSwitcher;

      expect(host.switcherForm.enabled().touched()).toBeFalse();

      inputElement.click();
      fixture.detectChanges();

      expect(host.switcherForm.enabled().touched()).toBeTrue();
    });
  });
});
