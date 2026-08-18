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

    expect(host.toggleInstance.inGroup).toBeFalse();
    expect(host.toggleInstance.toggleGroup).toBeNull();
    expect(input.type).toBe('checkbox');
  });

  describe('model -> view', () => {
    it('reflects a truthy model value as a checked toggle', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.toggleInstance.checked).toBeFalse();
      expect(input.checked).toBeFalse();

      host.model.update((m) => ({ ...m, enabled: true }));
      fixture.detectChanges();

      expect(host.toggleInstance.checked).toBeTrue();
      expect(input.checked).toBeTrue();
      expect(input.getAttribute('aria-checked')).toBe('true');
    });

    it('reflects a falsy model value as an unchecked toggle', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      host.model.update((m) => ({ ...m, enabled: true }));
      fixture.detectChanges();
      expect(input.checked).toBeTrue();

      host.model.update((m) => ({ ...m, enabled: false }));
      fixture.detectChanges();

      expect(host.toggleInstance.checked).toBeFalse();
      expect(input.checked).toBeFalse();
      expect(input.getAttribute('aria-checked')).toBe('false');
    });
  });

  describe('view -> model', () => {
    it('flips the boolean form value when the input is clicked', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.myForm.enabled().value()).toBeFalse();

      input.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().value()).toBeTrue();
      expect(host.model().enabled).toBeTrue();
      expect(input.checked).toBeTrue();

      // A standalone toggle can be unchecked again; inside a group the selected toggle stays
      // selected because the group is a radio group.
      input.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().value()).toBeFalse();
      expect(host.model().enabled).toBeFalse();
    });

    it('flips the boolean form value when the label is clicked', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      label.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().value()).toBeTrue();
    });

    it('marks the field dirty after user interaction', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.myForm.enabled().dirty()).toBeFalse();

      input.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().dirty()).toBeTrue();
    });
  });

  describe('touched on blur', () => {
    it('marks the field touched when the toggle itself is blurred', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.myForm.enabled().touched()).toBeFalse();

      dispatchFakeEvent(input, 'blur');
      fixture.detectChanges();

      expect(host.myForm.enabled().touched()).toBeTrue();
    });

    it('does not mark the field touched before any interaction', () => {
      fixture = create(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance as BasicCircleToggleSignalFormHost;

      expect(host.myForm.enabled().touched()).toBeFalse();
    });
  });

  describe('required validator', () => {
    it('is invalid while off and valid once switched on', () => {
      fixture = create(RequiredCircleToggleSignalFormHost);
      const host = fixture.componentInstance as RequiredCircleToggleSignalFormHost;

      expect(host.myForm().invalid()).toBeTrue();
      expect(
        host.myForm
          .enabled()
          .errors()
          .some((error) => error.kind === 'required'),
      ).toBeTrue();

      input.click();
      fixture.detectChanges();

      expect(host.myForm().valid()).toBeTrue();
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

      expect(host.myForm.enabled().disabled()).toBeTrue();
      expect(host.toggleInstance.disabled).toBeTrue();
      expect(input.disabled).toBeTrue();
    }));

    it('does not update the form value when a disabled toggle is clicked', fakeAsync(() => {
      fixture = create(DisabledCircleToggleSignalFormHost);
      const host = fixture.componentInstance as DisabledCircleToggleSignalFormHost;
      flush();
      fixture.detectChanges();

      input.click();
      fixture.detectChanges();

      expect(host.myForm.enabled().value()).toBeFalse();
    }));
  });
});
