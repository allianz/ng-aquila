import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxCircleToggleModule } from './circle-toggle.module';
import { NxCircleToggleComponent } from './circle-toggle/circle-toggle.component';

/**
 * Signal forms tests for a standalone `nx-circle-toggle`, i.e. one without a wrapping
 * `nx-circle-toggle-group`.
 *
 * Without a group the toggle is a field of its own: it renders a checkbox, its model value is the
 * boolean checked state, and it marks the field touched on its OWN blur. Inside a group the
 * touched state is owned by the group instead and is only reported once the focus leaves the whole
 * group — that behaviour is covered by `circle-toggle-group.signal-forms.spec.ts`.
 *
 * The toggle registers its value accessor through `ngControl.valueAccessor = this`, so
 * `[formField]` binds to it via the Angular 22 backwards-compat interop path.
 */
@Component({
  selector: 'test-circle-toggle.signal-forms-basic-circle-toggle-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxCircleToggleModule],
  template: `
    <nx-circle-toggle
      [formField]="myForm.enabled"
      icon="product-heart"
      hint="info1"
      label="text1"
    ></nx-circle-toggle>
  `,
})
class BasicCircleToggleSignalFormHost {
  @ViewChild(NxCircleToggleComponent) toggleInstance!: NxCircleToggleComponent;
  readonly model = signal({ enabled: false });
  readonly myForm = form(this.model);
}

@Component({
  selector: 'test-circle-toggle.signal-forms-required-circle-toggle-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxCircleToggleModule],
  template: `
    <nx-circle-toggle
      [formField]="myForm.enabled"
      icon="product-heart"
      hint="info1"
      label="text1"
    ></nx-circle-toggle>
  `,
})
class RequiredCircleToggleSignalFormHost {
  @ViewChild(NxCircleToggleComponent) toggleInstance!: NxCircleToggleComponent;
  readonly model = signal({ enabled: false });
  readonly myForm = form(this.model, (p) => {
    required(p.enabled, { message: 'This must be enabled' });
  });
}

@Component({
  selector: 'test-circle-toggle.signal-forms-disabled-circle-toggle-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxCircleToggleModule],
  template: `
    <nx-circle-toggle
      [formField]="myForm.enabled"
      icon="product-heart"
      hint="info1"
      label="text1"
    ></nx-circle-toggle>
  `,
})
class DisabledCircleToggleSignalFormHost {
  @ViewChild(NxCircleToggleComponent) toggleInstance!: NxCircleToggleComponent;
  readonly model = signal({ enabled: false });
  readonly myForm = form(this.model, (p) => {
    disabled(p.enabled);
  });
}

describe('NxCircleToggleComponent signal forms', () => {
  let fixture: ComponentFixture<any>;
  let input: HTMLInputElement;
  let label: HTMLLabelElement;

  function create<T>(component: new () => T): ComponentFixture<T> {
    const created = TestBed.createComponent(component);
    created.detectChanges();
    input = created.nativeElement.querySelector('input') as HTMLInputElement;
    label = created.nativeElement.querySelector('label') as HTMLLabelElement;
    return created;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BasicCircleToggleSignalFormHost,
        RequiredCircleToggleSignalFormHost,
        DisabledCircleToggleSignalFormHost,
      ],
    }).compileComponents();
  }));

  it('renders a checkbox when used without a group', () => {
    fixture = create(BasicCircleToggleSignalFormHost);
    const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

    expect(host.toggleInstance.inGroup).toBe(false);
    expect(host.toggleInstance.toggleGroup).toBeNull();
    expect(input.type).toBe('checkbox');
  });

  describe('model -> view', () => {
    it('reflects a truthy model value as a checked toggle', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.toggleInstance.checked).toBe(false);
      expect(input.checked).toBe(false);

      host.model.update((m) => ({ ...m, enabled: true }));
      fixture.detectChanges();

      expect(host.toggleInstance.checked).toBe(true);
      expect(input.checked).toBe(true);
      expect(input.getAttribute('aria-checked')).toBe('true');
    });

    it('reflects a falsy model value as an unchecked toggle', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      host.model.update((m) => ({ ...m, enabled: true }));
      fixture.detectChanges();
      expect(input.checked).toBe(true);

      host.model.update((m) => ({ ...m, enabled: false }));
      fixture.detectChanges();

      expect(host.toggleInstance.checked).toBe(false);
      expect(input.checked).toBe(false);
      expect(input.getAttribute('aria-checked')).toBe('false');
    });
  });

  describe('view -> model', () => {
    it('flips the boolean form value when the input is clicked', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.myForm.enabled().value()).toBe(false);

      input.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().value()).toBe(true);
      expect(host.model().enabled).toBe(true);
      expect(input.checked).toBe(true);

      // A standalone toggle can be unchecked again; inside a group the selected toggle stays
      // selected because the group is a radio group.
      input.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().value()).toBe(false);
      expect(host.model().enabled).toBe(false);
    });

    it('flips the boolean form value when the label is clicked', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      label.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().value()).toBe(true);
    });

    it('marks the field dirty after user interaction', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.myForm.enabled().dirty()).toBe(false);

      input.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().dirty()).toBe(true);
    });
  });

  describe('touched on blur', () => {
    it('marks the field touched when the toggle itself is blurred', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.myForm.enabled().touched()).toBe(false);

      dispatchFakeEvent(input, 'blur');
      fixture.detectChanges();

      expect(host.myForm.enabled().touched()).toBe(true);
    });

    it('does not mark the field touched before any interaction', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.myForm.enabled().touched()).toBe(false);
    });
  });

  describe('required validator', () => {
    it('is invalid while off and valid once switched on', () => {
      fixture = create(RequiredCircleToggleSignalFormHost);
      const host = fixture.componentInstance as RequiredCircleToggleSignalFormHost;

      expect(host.myForm().invalid()).toBe(true);
      expect(
        host.myForm
          .enabled()
          .errors()
          .some((error) => error.kind === 'required'),
      ).toBe(true);

      input.click();
      fixture.detectChanges();

      expect(host.myForm().valid()).toBe(true);
      expect(host.myForm.enabled().errors()).toEqual([]);
    });

    it('sets aria-required on the toggle input', () => {
      fixture = create(RequiredCircleToggleSignalFormHost);

      // A standalone toggle sets aria-required on its own input; inside a group the attribute is
      // set on the group instead.
      expect(input.getAttribute('aria-required')).toBe('true');
    });
  });

  describe('disabled rule', () => {
    it('disables the toggle input when the schema disables the field', fakeAsync(() => {
      fixture = create(DisabledCircleToggleSignalFormHost);
      const host = fixture.componentInstance as DisabledCircleToggleSignalFormHost;
      flush();
      fixture.detectChanges();

      expect(host.myForm.enabled().disabled()).toBe(true);
      expect(host.toggleInstance.disabled).toBe(true);
      expect(input.disabled).toBe(true);
    }));

    it('does not update the form value when a disabled toggle is clicked', fakeAsync(() => {
      fixture = create(DisabledCircleToggleSignalFormHost);
      const host = fixture.componentInstance as DisabledCircleToggleSignalFormHost;
      flush();
      fixture.detectChanges();

      input.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().value()).toBe(false);
    }));
  });
});
