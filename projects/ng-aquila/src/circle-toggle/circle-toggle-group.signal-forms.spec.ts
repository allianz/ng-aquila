import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxCircleToggleModule } from './circle-toggle.module';

/**
 * Signal forms tests for the circle-toggle group (`nx-circle-toggle-group` is the CVA host).
 *
 * The group registers the value accessor through `ngControl.valueAccessor = this`, so
 * `[formField]` binds to it via the Angular 22 backwards-compat interop path. Note the group's
 * `writeValue` defers with `Promise.resolve().then(...)`, so model -> view assertions need a
 * microtask flush (`tick()`).
 */

@Component({
  selector: 'test-circle-toggle-group.signal-forms-basic-circle-toggle-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxCircleToggleModule],
  template: `
    <nx-circle-toggle-group [formField]="myForm.choice">
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
})
class BasicCircleToggleSignalFormHost {
  model = signal({ choice: '' });
  myForm = form(this.model);
}

@Component({
  selector: 'test-circle-toggle-group.signal-forms-required-circle-toggle-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxCircleToggleModule],
  template: `
    <nx-circle-toggle-group [formField]="myForm.choice">
      <nx-circle-toggle
        value="A"
        icon="product-heart"
        hint="info1"
        label="text1"
      ></nx-circle-toggle>
      <nx-circle-toggle value="B" icon="product-bed" hint="info2" label="text2"></nx-circle-toggle>
    </nx-circle-toggle-group>
  `,
})
class RequiredCircleToggleSignalFormHost {
  model = signal({ choice: '' });
  myForm = form(this.model, (p) => {
    required(p.choice);
  });
}

@Component({
  selector: 'test-circle-toggle-group.signal-forms-disabled-circle-toggle-signal-form-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxCircleToggleModule],
  template: `
    <nx-circle-toggle-group [formField]="myForm.choice">
      <nx-circle-toggle
        value="A"
        icon="product-heart"
        hint="info1"
        label="text1"
      ></nx-circle-toggle>
      <nx-circle-toggle value="B" icon="product-bed" hint="info2" label="text2"></nx-circle-toggle>
    </nx-circle-toggle-group>
  `,
})
class DisabledCircleToggleSignalFormHost {
  model = signal({ choice: '' });
  myForm = form(this.model, (p) => {
    disabled(p.choice);
  });
}

describe('NxCircleToggleGroupComponent signal forms', () => {
  function inputs(fixture: ComponentFixture<unknown>): NodeListOf<HTMLInputElement> {
    return fixture.nativeElement.querySelectorAll('input');
  }

  function checked(fixture: ComponentFixture<unknown>): boolean[] {
    return Array.from(inputs(fixture)).map((input) => input.checked);
  }

  function settle(fixture: ComponentFixture<unknown>): void {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
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

  describe('model -> view', () => {
    it('selects the toggle matching the model value', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance;
      settle(fixture);

      expect(checked(fixture)).toEqual([false, false, false]);

      host.model.update((m) => ({ ...m, choice: 'B' }));
      settle(fixture);
      flush();

      expect(checked(fixture)).toEqual([false, true, false]);
    }));

    it('moves the selection when the model value changes', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance;
      settle(fixture);

      host.model.update((m) => ({ ...m, choice: 'A' }));
      settle(fixture);
      flush();
      expect(checked(fixture)).toEqual([true, false, false]);

      host.model.update((m) => ({ ...m, choice: 'C' }));
      settle(fixture);
      flush();
      expect(checked(fixture)).toEqual([false, false, true]);
    }));
  });

  describe('view -> model', () => {
    it('updates the form field value when a toggle is clicked', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance;
      settle(fixture);

      inputs(fixture).item(1).click();
      settle(fixture);

      expect(host.myForm.choice().value()).toBe('B');
      expect(host.model().choice).toBe('B');

      inputs(fixture).item(2).click();
      settle(fixture);

      expect(host.myForm.choice().value()).toBe('C');
      flush();
    }));
  });

  describe('touched on blur', () => {
    // The group owns the touched state of the field: a toggle inside a group only reports touched
    // once the focus leaves the whole group, so that moving between the toggles of the group does
    // not touch the field. Standalone toggles touch on their own blur, see
    // `circle-toggle.signal-forms.spec.ts`.
    it('marks the field touched when the focus leaves the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance;
      settle(fixture);

      expect(host.myForm.choice().touched()).toBe(false);

      const group = fixture.nativeElement.querySelector('nx-circle-toggle-group') as HTMLElement;
      dispatchFakeEvent(group, 'focusout');
      settle(fixture);

      expect(host.myForm.choice().touched()).toBe(true);
      flush();
    }));

    it('does not mark the field touched when a toggle inside the group is blurred', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance;
      settle(fixture);

      dispatchFakeEvent(inputs(fixture).item(0), 'blur');
      settle(fixture);

      expect(host.myForm.choice().touched()).toBe(false);
      flush();
    }));

    it('does not mark the field touched while the focus stays inside the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicCircleToggleSignalFormHost);
      const host = fixture.componentInstance;
      settle(fixture);

      const group = fixture.nativeElement.querySelector('nx-circle-toggle-group') as HTMLElement;
      group.dispatchEvent(
        new FocusEvent('focusout', { bubbles: true, relatedTarget: inputs(fixture).item(1) }),
      );
      settle(fixture);

      expect(host.myForm.choice().touched()).toBe(false);
      flush();
    }));
  });

  describe('required validator', () => {
    it('is invalid until an option is chosen', fakeAsync(() => {
      const fixture = TestBed.createComponent(RequiredCircleToggleSignalFormHost);
      const host = fixture.componentInstance;
      settle(fixture);

      expect(host.myForm().invalid()).toBe(true);
      expect(
        host.myForm
          .choice()
          .errors()
          .some((e) => e.kind === 'required'),
      ).toBe(true);

      inputs(fixture).item(0).click();
      settle(fixture);

      expect(host.myForm().valid()).toBe(true);
      expect(host.myForm.choice().errors()).toEqual([]);
      flush();
    }));

    it('sets aria-required on the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(RequiredCircleToggleSignalFormHost);
      settle(fixture);

      const group = fixture.nativeElement.querySelector('nx-circle-toggle-group');
      expect(group.getAttribute('aria-required')).toBe('true');
      flush();
    }));
  });

  describe('disabled rule', () => {
    it('disables every toggle input in the group', fakeAsync(() => {
      const fixture = TestBed.createComponent(DisabledCircleToggleSignalFormHost);
      const host = fixture.componentInstance;
      settle(fixture);

      expect(host.myForm.choice().disabled()).toBe(true);
      inputs(fixture).forEach((input) => {
        expect(input.disabled).toBe(true);
      });
      flush();
    }));

    it('does not update the model when a disabled toggle is clicked', fakeAsync(() => {
      const fixture = TestBed.createComponent(DisabledCircleToggleSignalFormHost);
      const host = fixture.componentInstance;
      settle(fixture);

      inputs(fixture).item(1).click();
      settle(fixture);

      expect(host.myForm.choice().value()).toBe('');
      flush();
    }));
  });
});
