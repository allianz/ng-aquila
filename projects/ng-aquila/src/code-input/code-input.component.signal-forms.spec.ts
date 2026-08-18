import { BACKSPACE } from '@angular/cdk/keycodes';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxCodeInputComponent } from './code-input.component';
import { NxCodeInputModule } from './code-input.module';

// The code input is a `ControlValueAccessor` whose model value is the concatenated
// string of the individual boxes. Angular 22 signal forms bind to it through the
// `[formField]` backwards-compat path, so the model field is a `string`.

@Component({
  standalone: true,
  imports: [FormField, NxCodeInputModule],
  template: `<nx-code-input [length]="4" [formField]="codeForm.value"></nx-code-input>`,
})
class BasicSignalFormHost {
  model = signal({ value: '' });
  codeForm = form(this.model);
}

@Component({
  standalone: true,
  imports: [FormField, NxCodeInputModule],
  template: `<nx-code-input [length]="4" [formField]="codeForm.value"></nx-code-input>`,
})
class RequiredSignalFormHost {
  model = signal({ value: '' });
  codeForm = form(this.model, (schema) => {
    required(schema.value);
  });
}

@Component({
  standalone: true,
  imports: [FormField, NxCodeInputModule],
  template: `<nx-code-input [length]="4" [formField]="codeForm.value"></nx-code-input>`,
})
class DisabledSignalFormHost {
  model = signal({ value: '' });
  codeForm = form(this.model, (schema) => {
    disabled(schema.value);
  });
}

describe('NxCodeInputComponent signal forms', () => {
  function getInputs(fixture: ComponentFixture<unknown>): HTMLInputElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.nx-code-input__field'),
    ) as HTMLInputElement[];
  }

  function typeInto(input: HTMLInputElement, char: string) {
    input.focus();
    input.value = char;
    input.dispatchEvent(new InputEvent('input', { data: char }));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicSignalFormHost, RequiredSignalFormHost, DisabledSignalFormHost],
    }).compileComponents();
  });

  describe('model -> view', () => {
    // NOT a component bug: `writeValue()` populates `_keyCode` AND calls
    // `_cdr.markForCheck()`, so the OnPush view is refreshed after the signal-forms
    // model update. The boxes render their value through `[ngModel]="_keyCode[i]"`,
    // and NgModel writes the value onto the native input *asynchronously* (via a
    // resolved-promise microtask). The original test read `input.value` right after a
    // synchronous `detectChanges()`, before that microtask ran, so every box still read
    // ''. Running under fakeAsync and flushing the microtask makes the boxes reflect the
    // model value correctly.
    it('spreads a programmatic model value across the boxes', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();

      host.model.update((m) => ({ ...m, value: 'ABCD' }));
      fixture.detectChanges();
      // Flush NgModel's async writeValue -> native input.value propagation.
      flush();
      fixture.detectChanges();

      const inputs = getInputs(fixture);
      expect(inputs.map((i) => i.value)).toEqual(['A', 'B', 'C', 'D']);
    }));
  });

  describe('view -> model', () => {
    it('combines typed digits from each box into the model value', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();

      const inputs = getInputs(fixture);
      typeInto(inputs[0], '1');
      fixture.detectChanges();
      typeInto(inputs[1], '2');
      fixture.detectChanges();
      typeInto(inputs[2], '3');
      fixture.detectChanges();
      typeInto(inputs[3], '4');
      fixture.detectChanges();
      flush();

      expect(host.codeForm.value().value()).toBe('1234');
    }));

    it('moves focus to the previous box on backspace in an empty box', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      fixture.detectChanges();

      const inputs = getInputs(fixture);
      // Fill the first box, then focus the (empty) second box.
      typeInto(inputs[0], '1');
      fixture.detectChanges();
      inputs[1].focus();
      tick();
      fixture.detectChanges();

      // Backspace in the empty second box should jump focus back to the first box.
      dispatchKeyboardEvent(inputs[1], 'keydown', BACKSPACE);
      fixture.detectChanges();
      tick();

      expect(_getFocusedElementPierceShadowDom()).toBe(inputs[0]);
    }));
  });

  describe('touched on blur', () => {
    it('marks the field as touched once focus leaves the boxes', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();

      expect(host.codeForm.value().touched()).toBe(false);

      const inputs = getInputs(fixture);
      inputs[0].focus();
      inputs[0].dispatchEvent(new Event('blur'));
      // _onBlur defers the touch propagation via setTimeout.
      tick();
      flush();
      fixture.detectChanges();

      expect(host.codeForm.value().touched()).toBe(true);
    }));
  });

  describe('required validator', () => {
    it('is invalid while empty and valid once digits are entered', () => {
      const fixture = TestBed.createComponent(RequiredSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();

      expect(host.codeForm().invalid()).toBe(true);
      expect(
        host.codeForm
          .value()
          .errors()
          .some((e) => e.kind === 'required'),
      ).toBe(true);

      host.model.update((m) => ({ ...m, value: '1234' }));
      fixture.detectChanges();

      expect(host.codeForm().valid()).toBe(true);
    });
  });

  describe('disabled() rule', () => {
    // NOT a component bug: the component implements `setDisabledState()` (sets
    // `disabled` + `markForCheck`) and each box binds `[disabled]="disabled ? true :
    // false"`. Signal forms' `disabled()` rule reaches the CVA through the interop
    // NgControl, which propagates the disabled state to `setDisabledState` via an
    // effect (asynchronously) - exactly like the reactive-forms disabled test, which
    // also runs under fakeAsync with a `flush()`. The original test ran synchronously
    // with a single `detectChanges()`, so the per-box `[disabled]` bindings had not yet
    // been refreshed. Flushing the effect and re-running CD disables every box.
    it('disables every box', fakeAsync(() => {
      const fixture = TestBed.createComponent(DisabledSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(host.codeForm.value().disabled()).toBe(true);
      const codeInputElement = fixture.nativeElement.querySelector('nx-code-input');
      expect(codeInputElement).toHaveClass('is-disabled');
      getInputs(fixture).forEach((input) => {
        expect(input.disabled).toBe(true);
      });
    }));
  });
});
