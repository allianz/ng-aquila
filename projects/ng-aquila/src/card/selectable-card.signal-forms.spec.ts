import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxCardModule } from './card.module';
import { NxSelectableCardComponent } from './selectable-card.component';

/**
 * Signal forms tests for `nx-selectable-card`.
 *
 * The selectable card is a boolean CVA: it writes `!!value` to `checked` and emits the boolean
 * `checked` state through `onChange`. Therefore the bound model field must be a `boolean`.
 * The card self-registers its value accessor via `ngControl.valueAccessor = this`, which the
 * `[formField]` interop `NgControl` supports.
 */
@Component({
  selector: 'test-boolean-card-host',
  standalone: true,
  imports: [FormField, NxCardModule],
  template: `
    <nx-selectable-card [formField]="cardForm.accepted">
      <p>Accept the terms and conditions</p>
    </nx-selectable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BooleanCardHost {
  cardInstance = viewChild.required(NxSelectableCardComponent);
  model = signal({ accepted: false });
  cardForm = form(this.model);
}

@Component({
  selector: 'test-required-card-host',
  standalone: true,
  imports: [FormField, NxCardModule],
  template: `
    <nx-selectable-card [formField]="cardForm.accepted">
      <p>Accept the terms and conditions</p>
    </nx-selectable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RequiredCardHost {
  cardInstance = viewChild.required(NxSelectableCardComponent);
  model = signal({ accepted: false });
  cardForm = form(this.model, (p) => {
    required(p.accepted);
  });
}

@Component({
  selector: 'test-disabled-card-host',
  standalone: true,
  imports: [FormField, NxCardModule],
  template: `
    <nx-selectable-card [formField]="cardForm.accepted">
      <p>Accept the terms and conditions</p>
    </nx-selectable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledCardHost {
  cardInstance = viewChild.required(NxSelectableCardComponent);
  model = signal({ accepted: false });
  cardForm = form(this.model, (p) => {
    disabled(p.accepted);
  });
}

describe('NxSelectableCardComponent signal forms', () => {
  function setup<T>(component: new () => T): {
    fixture: ComponentFixture<T>;
    host: T;
    input: HTMLInputElement;
  } {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return {
      fixture,
      host: fixture.componentInstance,
      input: fixture.nativeElement.querySelector('input') as HTMLInputElement,
    };
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BooleanCardHost, RequiredCardHost, DisabledCardHost],
    }).compileComponents();
  }));

  it('reflects the model boolean into the checked state (model -> view)', () => {
    const { fixture, host, input } = setup(BooleanCardHost);

    expect(input.checked).toBe(false);
    expect(host.cardInstance().checked).toBe(false);

    host.model.update((m) => ({ ...m, accepted: true }));
    fixture.detectChanges();

    expect(input.checked).toBe(true);
    expect(host.cardInstance().checked).toBe(true);
    expect(host.cardForm.accepted().value()).toBe(true);
  });

  it('writes a click back into the form model (view -> model)', () => {
    const { fixture, host, input } = setup(BooleanCardHost);

    expect(host.cardForm.accepted().value()).toBe(false);

    input.click();
    fixture.detectChanges();

    expect(host.cardInstance().checked).toBe(true);
    expect(host.cardForm.accepted().value()).toBe(true);

    // clicking again toggles back off (checkbox behaviour)
    input.click();
    fixture.detectChanges();

    expect(host.cardInstance().checked).toBe(false);
    expect(host.cardForm.accepted().value()).toBe(false);
  });

  it('marks the field as touched on blur', () => {
    const { fixture, host, input } = setup(BooleanCardHost);

    expect(host.cardForm.accepted().touched()).toBe(false);

    dispatchFakeEvent(input, 'blur');
    fixture.detectChanges();

    expect(host.cardForm.accepted().touched()).toBe(true);
  });

  it('honours a required() validator on the boolean field', () => {
    const { fixture, host, input } = setup(RequiredCardHost);

    // an unchecked (false) boolean is treated as empty by required()
    expect(host.cardForm.accepted().valid()).toBe(false);
    expect(host.cardForm().invalid()).toBe(true);

    input.click();
    fixture.detectChanges();

    expect(host.cardForm.accepted().value()).toBe(true);
    expect(host.cardForm.accepted().valid()).toBe(true);
    expect(host.cardForm().invalid()).toBe(false);
  });

  it('disables the control through a disabled() schema rule', () => {
    const { host, input } = setup(DisabledCardHost);

    expect(host.cardForm.accepted().disabled()).toBe(true);
    expect(host.cardInstance().disabled).toBe(true);
    expect(input.disabled).toBe(true);
  });
});
