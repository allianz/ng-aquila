import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
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
import { assertInputValue } from './mask.directive.spec';
import { NxMaskDirective } from './mask.directive';
import { NxMaskModule } from './mask.module';

// Host that drives an nxMask input through an Angular 22 signal form (interop option 3:
// the mask provides NG_VALUE_ACCESSOR, so `[formField]` binds to it via the CVA path).
@Component({
  template: `
    <input [nxMask]="mask()" [deactivateMask]="deactivate()" [formField]="maskForm.value" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxMaskModule],
  standalone: true,
})
class MaskSignalFormHostComponent {
  @ViewChild(NxMaskDirective) maskInstance!: NxMaskDirective;

  readonly mask = signal('00-00');
  readonly deactivate = signal(false);

  readonly model = signal({ value: '' });
  readonly maskForm = form(this.model);
}

// Host with a `required` validator in the schema.
@Component({
  template: `<input [nxMask]="mask()" [formField]="maskForm.value" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxMaskModule],
  standalone: true,
})
class RequiredMaskSignalFormHostComponent {
  @ViewChild(NxMaskDirective) maskInstance!: NxMaskDirective;

  readonly mask = signal('00-00');

  readonly model = signal({ value: '' });
  readonly maskForm = form(this.model, (schemaPath) => {
    required(schemaPath.value);
  });
}

// Host with a `disabled` rule in the schema.
@Component({
  template: `<input [nxMask]="mask()" [formField]="maskForm.value" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NxMaskModule],
  standalone: true,
})
class DisabledMaskSignalFormHostComponent {
  @ViewChild(NxMaskDirective) maskInstance!: NxMaskDirective;

  readonly mask = signal('00-00');

  readonly model = signal({ value: '' });
  readonly maskForm = form(this.model, (schemaPath) => {
    disabled(schemaPath.value);
  });
}

describe('NxMaskDirective signal forms', () => {
  let nativeElement: HTMLInputElement;

  function createHost<T extends object>(component: {
    new (...args: any[]): T;
  }): ComponentFixture<T> {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    return fixture;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxMaskModule,
        MaskSignalFormHostComponent,
        RequiredMaskSignalFormHostComponent,
        DisabledMaskSignalFormHostComponent,
      ],
    }).compileComponents();
  }));

  describe('model -> view', () => {
    it('masks the value written from the form model into the input', fakeAsync(() => {
      const fixture = createHost(MaskSignalFormHostComponent);
      const host = fixture.componentInstance;

      host.model.update((m) => ({ ...m, value: '1234' }));
      fixture.detectChanges();
      tick();
      flush();

      expect(nativeElement.value).toBe('12-34');
    }));
  });

  describe('view -> model', () => {
    it('writes the masked user input back into the form field value', fakeAsync(() => {
      const fixture = createHost(MaskSignalFormHostComponent);
      const host = fixture.componentInstance;

      // types '1', '2', '3', '4' char by char (keydown + input) like the reactive spec.
      assertInputValue(nativeElement, '1234', '12-34');
      fixture.detectChanges();
      tick();
      flush();

      // the input reformats with the separator ...
      expect(nativeElement.value).toBe('12-34');
      // ... and the signal form field value reflects the masked value (dropSpecialCharacters off).
      expect(host.maskForm.value().value()).toBe('12-34');
    }));

    it('drops chars that do not match the mask and stays in sync with the model', fakeAsync(() => {
      const fixture = createHost(MaskSignalFormHostComponent);
      const host = fixture.componentInstance;

      host.mask.set('0000');
      fixture.detectChanges();

      // letters are rejected by a numeric mask.
      assertInputValue(nativeElement, '1abc', '1');
      fixture.detectChanges();
      tick();
      flush();

      expect(nativeElement.value).toBe('1');
      expect(host.maskForm.value().value()).toBe('1');
    }));
  });

  describe('touched on blur', () => {
    it('marks the field as touched when the input is blurred', fakeAsync(() => {
      const fixture = createHost(MaskSignalFormHostComponent);
      const host = fixture.componentInstance;

      expect(host.maskForm.value().touched()).toBe(false);

      dispatchFakeEvent(nativeElement, 'blur');
      fixture.detectChanges();
      tick();

      expect(host.maskForm.value().touched()).toBe(true);
    }));
  });

  describe('required validator', () => {
    it('is invalid while empty and valid once the model has a value', fakeAsync(() => {
      const fixture = createHost(RequiredMaskSignalFormHostComponent);
      const host = fixture.componentInstance;

      expect(host.maskForm().invalid()).toBe(true);
      expect(host.maskForm.value().errors().length).toBeGreaterThan(0);

      host.model.update((m) => ({ ...m, value: '1234' }));
      fixture.detectChanges();
      tick();
      flush();

      expect(host.maskForm().valid()).toBe(true);
      expect(host.maskForm.value().errors().length).toBe(0);
    }));
  });

  describe('disabled rule', () => {
    it('disables the native input when the disabled rule applies', fakeAsync(() => {
      const fixture = createHost(DisabledMaskSignalFormHostComponent);
      const host = fixture.componentInstance;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(host.maskForm.value().disabled()).toBe(true);
      expect(nativeElement.disabled).toBe(true);
    }));
  });

  describe('deactivateMask', () => {
    it('does not apply the mask when deactivateMask is set', fakeAsync(() => {
      const fixture = createHost(MaskSignalFormHostComponent);
      const host = fixture.componentInstance;

      host.mask.set('00-00');
      host.deactivate.set(true);
      fixture.detectChanges();
      tick();

      // with the mask deactivated no separator is inserted and the raw value is kept.
      assertInputValue(nativeElement, '1234', '1234');
      fixture.detectChanges();
      tick();
      flush();

      expect(nativeElement.value).toBe('1234');
      expect(host.maskForm.value().value()).toBe('1234');
    }));
  });
});
