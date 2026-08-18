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

    expect(input.checked).toBeFalse();
    expect(host.cardInstance().checked).toBeFalse();

    host.model.update((m) => ({ ...m, accepted: true }));
    fixture.detectChanges();

    expect(input.checked).toBeTrue();
    expect(host.cardInstance().checked).toBeTrue();
    expect(host.cardForm.accepted().value()).toBeTrue();
  });

  it('writes a click back into the form model (view -> model)', () => {
    const { fixture, host, input } = setup(BooleanCardHost);

    expect(host.cardForm.accepted().value()).toBeFalse();

    input.click();
    fixture.detectChanges();

    expect(host.cardInstance().checked).toBeTrue();
    expect(host.cardForm.accepted().value()).toBeTrue();

    // clicking again toggles back off (checkbox behaviour)
    input.click();
    fixture.detectChanges();

    expect(host.cardInstance().checked).toBeFalse();
    expect(host.cardForm.accepted().value()).toBeFalse();
  });

  it('marks the field as touched on blur', () => {
    const { fixture, host, input } = setup(BooleanCardHost);

    expect(host.cardForm.accepted().touched()).toBeFalse();

    dispatchFakeEvent(input, 'blur');
    fixture.detectChanges();

    expect(host.cardForm.accepted().touched()).toBeTrue();
  });

  it('honours a required() validator on the boolean field', () => {
    const { fixture, host, input } = setup(RequiredCardHost);

    // an unchecked (false) boolean is treated as empty by required()
    expect(host.cardForm.accepted().valid()).toBeFalse();
    expect(host.cardForm().invalid()).toBeTrue();

    input.click();
    fixture.detectChanges();

    expect(host.cardForm.accepted().value()).toBeTrue();
    expect(host.cardForm.accepted().valid()).toBeTrue();
    expect(host.cardForm().invalid()).toBeFalse();
  });

  it('disables the control through a disabled() schema rule', () => {
    const { host, input } = setup(DisabledCardHost);

    expect(host.cardForm.accepted().disabled()).toBeTrue();
    expect(host.cardInstance().disabled).toBeTrue();
    expect(input.disabled).toBeTrue();
  });
});
