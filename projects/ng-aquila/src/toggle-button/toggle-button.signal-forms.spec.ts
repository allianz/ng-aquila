import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, readonly, required, submit } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxToggleButtonComponent } from './toggle-button.component';
import { NxToggleButtonGroupComponent } from './toggle-button-group.component';

/** Signal forms tests for `nx-toggle-button-group`. */
@Component({
  selector: 'nx-required-host',
  imports: [FormField, NxToggleButtonGroupComponent, NxToggleButtonComponent, NxErrorComponent],
  template: `
    <nx-toggle-button-group [formField]="intervalForm.interval">
      @for (item of intervals; track item.value) {
        <nx-toggle-button [value]="item.value">{{ item.label }}</nx-toggle-button>
      }
      <nx-error>Please choose an interval</nx-error>
    </nx-toggle-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RequiredHost {
  group = viewChild.required(NxToggleButtonGroupComponent);
  intervals = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  model = signal({ interval: '' });
  intervalForm = form(this.model, (path) => {
    required(path.interval);
  });
}

@Component({
  selector: 'nx-disabled-host',
  imports: [FormField, NxToggleButtonGroupComponent, NxToggleButtonComponent],
  template: `
    <nx-toggle-button-group [formField]="intervalForm.interval">
      <nx-toggle-button value="monthly">Monthly</nx-toggle-button>
      <nx-toggle-button value="yearly">Yearly</nx-toggle-button>
    </nx-toggle-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledHost {
  group = viewChild.required(NxToggleButtonGroupComponent);
  model = signal({ interval: 'monthly' });
  intervalForm = form(this.model, (path) => {
    disabled(path.interval);
  });
}

@Component({
  selector: 'nx-readonly-host',
  imports: [FormField, NxToggleButtonGroupComponent, NxToggleButtonComponent],
  template: `
    <nx-toggle-button-group [formField]="intervalForm.interval">
      <nx-toggle-button value="monthly">Monthly</nx-toggle-button>
      <nx-toggle-button value="yearly">Yearly</nx-toggle-button>
    </nx-toggle-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReadonlyHost {
  group = viewChild.required(NxToggleButtonGroupComponent);
  model = signal({ interval: 'monthly' });
  intervalForm = form(this.model, (path) => {
    readonly(path.interval);
  });
}

describe('NxToggleButtonGroupComponent signal forms', () => {
  function setup<T>(component: new () => T): {
    fixture: ComponentFixture<T>;
    host: T;
    inputs: HTMLInputElement[];
  } {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return {
      fixture,
      host: fixture.componentInstance,
      inputs: Array.from(
        fixture.nativeElement.querySelectorAll('input.nx-toggle-button__input'),
      ) as HTMLInputElement[],
    };
  }

  function groupElement(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('nx-toggle-button-group') as HTMLElement;
  }

  function radiogroupElement(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('.nx-toggle-button-group__buttons') as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RequiredHost, DisabledHost, ReadonlyHost],
    }).compileComponents();
  }));

  it('reflects the model value into the selected button (model -> view)', () => {
    const { fixture, host, inputs } = setup(RequiredHost);

    host.model.update((model) => ({ ...model, interval: 'quarterly' }));
    fixture.detectChanges();

    expect(inputs[1].checked).toBe(true);
    expect(inputs[0].checked).toBe(false);
  });

  it('writes a click back into the form model (view -> model)', () => {
    const { fixture, host, inputs } = setup(RequiredHost);

    inputs[2].click();
    fixture.detectChanges();

    expect(host.model().interval).toBe('yearly');
    expect(host.intervalForm.interval().value()).toBe('yearly');
  });

  // The group owns the touched state of the field: it only reports touched once the focus leaves
  // the whole group, so that moving between the buttons does not touch the field.
  it('marks the field as touched when the focus leaves the group', () => {
    const { fixture, host } = setup(RequiredHost);

    expect(host.intervalForm.interval().touched()).toBe(false);

    dispatchFakeEvent(groupElement(fixture), 'focusout');
    fixture.detectChanges();

    expect(host.intervalForm.interval().touched()).toBe(true);
  });

  it('does not mark the field as touched while the focus stays inside the group', () => {
    const { fixture, host, inputs } = setup(RequiredHost);

    groupElement(fixture).dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: inputs[1] }),
    );
    fixture.detectChanges();

    expect(host.intervalForm.interval().touched()).toBe(false);
  });

  it('honours a required() validator', () => {
    const { fixture, host, inputs } = setup(RequiredHost);

    expect(host.intervalForm.interval().valid()).toBe(false);

    inputs[0].click();
    fixture.detectChanges();

    expect(host.intervalForm.interval().valid()).toBe(true);
  });

  it('shows the projected error once the field is invalid and touched', () => {
    const { fixture } = setup(RequiredHost);

    expect(fixture.nativeElement.querySelector('nx-error')).toBeNull();

    dispatchFakeEvent(groupElement(fixture), 'focusout');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('nx-error')).not.toBeNull();
    expect(radiogroupElement(fixture).getAttribute('aria-invalid')).toBe('true');
  });

  // The error has to show up for a group the user never focused. Signal forms gets there by marking
  // every field as touched on submit, so no submitting state is involved.
  it('shows the projected error after submitting an invalid form', async () => {
    const { fixture, host } = setup(RequiredHost);

    await submit(host.intervalForm, async () => undefined);
    fixture.detectChanges();

    expect(host.intervalForm.interval().touched()).toBe(true);
    expect(fixture.nativeElement.querySelector('nx-error')).not.toBeNull();
    expect(radiogroupElement(fixture).getAttribute('aria-invalid')).toBe('true');
  });

  it('marks the group as required', () => {
    const { fixture } = setup(RequiredHost);

    expect(radiogroupElement(fixture).getAttribute('aria-required')).toBe('true');
  });

  it('disables the group through a disabled() schema rule', () => {
    const { host, inputs } = setup(DisabledHost);

    expect(host.group().disabled()).toBe(true);
    inputs.forEach((input) => expect(input.disabled).toBe(true));
  });

  it('does not update the model when a disabled button is clicked', () => {
    const { fixture, host, inputs } = setup(DisabledHost);

    inputs[1].click();
    fixture.detectChanges();

    expect(host.model().interval).toBe('monthly');
  });

  it('sets the group readonly through a readonly() schema rule', () => {
    const { fixture, host, inputs } = setup(ReadonlyHost);

    expect(host.group()._isReadonly()).toBe(true);
    expect(radiogroupElement(fixture).getAttribute('aria-readonly')).toBe('true');

    inputs[1].click();
    fixture.detectChanges();

    expect(host.model().interval).toBe('monthly');
  });
});
