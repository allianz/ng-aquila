import { Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { NxFileUploaderComponent } from './file-uploader.component';
import { FileItem } from './file-uploader.model';
import { NxFileUploaderModule } from './file-uploader.module';

// The file uploader is a `ControlValueAccessor` whose model value is an array of
// `FileItem`. Angular 22 signal forms bind to it through the `[formField]`
// backwards-compat path, so the model field is a `FileItem[]` (initial value `[]`,
// never null).
//
// IMPORTANT: The component's `_resetValidators()` (invoked from `ngOnInit`) calls
// `this.ngControl.control.setValidators(...)`. Under signal forms the injected
// `NgControl` is an internal `InteropNgControl` that does NOT implement
// `setValidators`, so binding `[formField]` with the default (blocking) validators
// throws at initialization. Setting `noBlockingValidators` short-circuits
// `_resetValidators()`, which is why the interaction hosts below opt in to it.
//
// TODO: the uploader is not fully signal-forms compatible yet; the `xit` tests below are
// skipped until it is. Each one names the specific gap it covers.

@Component({
  selector: 'test-file-uploader.component.signal-forms-basic-signal-form-host',
  standalone: true,
  imports: [FormField, NxFileUploaderModule],
  template: `<nx-file-uploader
    [formField]="uploadForm.value"
    [noBlockingValidators]="true"
    multiple
  ></nx-file-uploader>`,
})
class BasicSignalFormHost {
  @ViewChild(NxFileUploaderComponent) uploader!: NxFileUploaderComponent;
  model = signal({ value: [] as FileItem[] });
  uploadForm = form(this.model);
}

@Component({
  selector: 'test-file-uploader.component.signal-forms-required-signal-form-host',
  standalone: true,
  imports: [FormField, NxFileUploaderModule],
  template: `<nx-file-uploader
    [formField]="uploadForm.value"
    [noBlockingValidators]="true"
    multiple
  ></nx-file-uploader>`,
})
class RequiredSignalFormHost {
  @ViewChild(NxFileUploaderComponent) uploader!: NxFileUploaderComponent;
  model = signal({ value: [] as FileItem[] });
  uploadForm = form(this.model, (schema) => {
    required(schema.value);
  });
}

@Component({
  selector: 'test-file-uploader.component.signal-forms-disabled-signal-form-host',
  standalone: true,
  imports: [FormField, NxFileUploaderModule],
  template: `<nx-file-uploader
    [formField]="uploadForm.value"
    [noBlockingValidators]="true"
    multiple
  ></nx-file-uploader>`,
})
class DisabledSignalFormHost {
  @ViewChild(NxFileUploaderComponent) uploader!: NxFileUploaderComponent;
  model = signal({ value: [] as FileItem[] });
  uploadForm = form(this.model, (schema) => {
    disabled(schema.value);
  });
}

@Component({
  selector: 'test-default-validator-host',
  standalone: true,
  imports: [FormField, NxFileUploaderModule],
  template: `<nx-file-uploader [formField]="uploadForm.value" multiple></nx-file-uploader>`,
})
class DefaultValidatorHost {
  @ViewChild(NxFileUploaderComponent) uploader!: NxFileUploaderComponent;
  model = signal({ value: [] as FileItem[] });
  uploadForm = form(this.model);
}

describe('NxFileUploaderComponent signal forms', () => {
  function addFile(
    uploader: NxFileUploaderComponent,
    fixture: ComponentFixture<unknown>,
    name: string,
    type = 'text/html',
  ) {
    let fakeFile = new File(['3555'], name, { type });
    fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
    const fileList = { 0: fakeFile, length: 1, item: () => fakeFile };
    uploader._onFileChange({ type: 'change', target: { files: fileList } });
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BasicSignalFormHost,
        RequiredSignalFormHost,
        DisabledSignalFormHost,
        DefaultValidatorHost,
      ],
    }).compileComponents();
  });

  // TODO: make the file uploader signal-forms compatible, then re-enable.
  // `writeValue()` assigns `this._value` but never calls `markForCheck()`, so a
  // programmatic model update does not re-render the OnPush view and 0 rows appear.
  it.skip('renders a file row for each item in the model array', () => {
    const fixture = TestBed.createComponent(BasicSignalFormHost);
    const host = fixture.componentInstance;
    fixture.detectChanges();

    const file = new File(['1'], 'preset.txt', { type: 'text/plain' });
    host.model.update((m) => ({ ...m, value: [new FileItem(file)] }));
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.nx-file-uploader--file-row');
    expect(rows.length).toBe(1);
    expect(host.uploader.value?.length).toBe(1);
  });

  describe('view -> model', () => {
    it('pushes an added file into the form model array', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();

      expect(host.uploadForm.value().value()).toEqual([]);

      addFile(host.uploader, fixture, 'added.txt');
      flush();

      const modelValue = host.uploadForm.value().value();
      expect(modelValue.length).toBe(1);
      expect(modelValue[0].name).toBe('added.txt');
    }));

    // TODO: make the file uploader signal-forms compatible, then re-enable.
    // Removing a file makes signal forms materialize the per-index child-field tree and
    // deep-walk each `FileItem` (which carries an `EventEmitter`, a `File` and getter-only
    // properties), which overflows the stack inside `@angular/forms`. The component needs
    // to expose a plain value shape.
    it.skip('removes a file from the form model array when the delete action is clicked', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();

      addFile(host.uploader, fixture, 'first.txt');
      addFile(host.uploader, fixture, 'second.txt');
      flush();
      expect(host.uploadForm.value().value().length).toBe(2);

      const deleteAction = fixture.nativeElement.querySelector(
        '.nx-file-uploader--file-row-actions button',
      ) as HTMLElement;
      deleteAction.click();
      fixture.detectChanges();
      flush();

      expect(host.uploadForm.value().value().length).toBe(1);
      expect(host.uploadForm.value().value()[0].name).toBe('second.txt');
    }));
  });

  describe('touched', () => {
    // The file uploader has no blur handler; it marks itself touched via
    // `onTouchedCallback()` when a file is added/removed. Assert that path instead
    // of a blur (which the control does not listen to).
    it('marks the field as touched once a file is added', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();

      expect(host.uploadForm.value().touched()).toBe(false);

      addFile(host.uploader, fixture, 'added.txt');
      flush();

      expect(host.uploadForm.value().touched()).toBe(true);
    }));
  });

  // TODO: make the file uploader signal-forms compatible, then re-enable.
  // Signal forms' `isEmpty` only treats '', false, null and NaN as empty, so `required`
  // does not flag an empty file array the way reactive `Validators.required` does.
  it.skip('is invalid while the file list is empty and valid once a file is added', fakeAsync(() => {
    const fixture = TestBed.createComponent(RequiredSignalFormHost);
    const host = fixture.componentInstance;
    fixture.detectChanges();

    expect(host.uploadForm().invalid()).toBe(true);
    expect(
      host.uploadForm
        .value()
        .errors()
        .some((e) => e.kind === 'required'),
    ).toBe(true);

    addFile(host.uploader, fixture, 'added.txt');
    flush();

    expect(host.uploadForm().valid()).toBe(true);
  }));

  describe('disabled() rule', () => {
    it('disables the uploader and its native file input', () => {
      const fixture = TestBed.createComponent(DisabledSignalFormHost);
      const host = fixture.componentInstance;
      fixture.detectChanges();

      expect(host.uploadForm.value().disabled()).toBe(true);
      expect(host.uploader.disabled).toBe(true);

      const nativeInput = fixture.nativeElement.querySelector(
        'input[type=file]',
      ) as HTMLInputElement;
      expect(nativeInput.hasAttribute('disabled')).toBe(true);
    });
  });

  // TODO: make the file uploader signal-forms compatible, then re-enable.
  // With the default blocking validators, `ngOnInit` -> `_resetValidators()` calls
  // `this.ngControl.control.setValidators(...)`, which the signal-forms `InteropNgControl`
  // does not implement, so the component throws while initializing. Until then the other
  // hosts here opt out via `noBlockingValidators`.
  it.skip('initializes without throwing when bound with [formField]', fakeAsync(() => {
    const fixture = TestBed.createComponent(DefaultValidatorHost);
    expect(() => {
      fixture.detectChanges();
      flush();
    }).not.toThrow();
    expect(fixture.componentInstance.uploader).toBeTruthy();
  }));
});
