import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxInputHarness } from '@allianz/ng-aquila/input/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { NxFormfieldHarness } from './nx-formfield-harness';

describe('NxFormfieldHarness', () => {
  it('should get label', async () => {
    const fixture = TestBed.createComponent(MainFormfieldTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const formfield = await loader.getHarness(NxFormfieldHarness.with({ label: 'Foo' }));

    expect(await formfield.getLabel()).toBe('Foo');
  });

  it('should not get errors when control is valid', async () => {
    const fixture = TestBed.createComponent(ValidControlTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.componentInstance.control.markAllAsTouched();

    const formfield = await loader.getHarness(NxFormfieldHarness);
    const errors = await formfield.getErrors();
    expect(errors).toHaveLength(0);
  });

  it('should get errors when control is invalid', async () => {
    const fixture = TestBed.createComponent(InvalidControlTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.componentInstance.control.markAsTouched();
    const formfield = await loader.getHarness(NxFormfieldHarness);

    expect(await formfield.getErrorTexts()).toEqual(['Error 1', 'Error 2']);
    expect(await formfield.getErrorTexts({ text: 'Error 1' })).toEqual(['Error 1']);
    expect(await formfield.getErrorTexts({ text: /2/ })).toEqual(['Error 2']);
  });

  it('should get notes', async () => {
    const fixture = TestBed.createComponent(NotesTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const formfield = await loader.getHarness(NxFormfieldHarness);

    expect(await formfield.getNoteTexts()).toEqual(['Note 1', 'Note 2']);
    expect(await formfield.getNoteTexts({ text: 'Note 1' })).toEqual(['Note 1']);
    expect(await formfield.getNoteTexts({ text: /2/ })).toEqual(['Note 2']);
  });

  it('should get invalid status if control has validation error', async () => {
    const fixture = TestBed.createComponent(ValidationErrorTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.componentInstance.control.markAllAsTouched();

    const formfield = await loader.getHarness(NxFormfieldHarness);
    const input = await formfield.getHarness(NxInputHarness);
    await input.setValue('123');

    expect(await formfield.isValid()).toBe(false);
  });

  it('should get prefix', async () => {
    const fixture = TestBed.createComponent(MainFormfieldTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const formfields = await loader.getAllHarnesses(NxFormfieldHarness);
    const formfield = formfields[1]; // Prefix formfield

    const prefix = await formfield.getPrefix();
    expect(await prefix?.text()).toBe('The Prefix');
  });

  it('should get suffix', async () => {
    const fixture = TestBed.createComponent(MainFormfieldTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const formfields = await loader.getAllHarnesses(NxFormfieldHarness);
    const formfield = formfields[2]; // Suffix formfield

    const suffix = await formfield.getSuffix();
    expect(await suffix?.text()).toBe('The Suffix');
  });

  it('should get appendix', async () => {
    const fixture = TestBed.createComponent(MainFormfieldTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const formfields = await loader.getAllHarnesses(NxFormfieldHarness);
    const formfield = formfields[3]; // Appendix formfield

    const appendix = await formfield.getAppendix();
    expect(await appendix?.text()).toBe('The Appendix');
  });

  it('should get hint', async () => {
    const fixture = TestBed.createComponent(MainFormfieldTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const formfields = await loader.getAllHarnesses(NxFormfieldHarness);
    const formfield = formfields[4]; // Hint formfield

    expect(await formfield.getHintText()).toBe('The Hint');
  });

  it('should get is readonly', async () => {
    const fixture = TestBed.createComponent(MainFormfieldTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const formfields = await loader.getAllHarnesses(NxFormfieldHarness);
    const formfield = formfields[5]; // Readonly formfield

    expect(await formfield.isReadonly()).toBe(true);
  });

  it('should get is inline', async () => {
    const fixture = TestBed.createComponent(MainFormfieldTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const formfields = await loader.getAllHarnesses(NxFormfieldHarness);

    expect(await formfields[6].isInline()).toBe(true); // Inline formfield
    expect(await formfields[5].isInline()).toBe(false); // Readonly (non-inline) formfield
  });

  it('should get status and status message', async () => {
    const fixture = TestBed.createComponent(StatusTest);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const [positive, plain] = await loader.getAllHarnesses(NxFormfieldHarness);

    expect(await positive.getStatus()).toBe('positive');
    expect(await positive.getStatusMessageText()).toBe('Account verified');

    expect(await plain.getStatus()).toBeNull();
    expect(await plain.getStatusMessageText()).toBeNull();
  });

  describe('filters', () => {
    let loader: HarnessLoader;

    beforeEach(() => {
      const fixture = TestBed.createComponent(FilterTest);
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should find by label', async () => {
      expect(await loader.getAllHarnesses(NxFormfieldHarness.with({ label: 'Foo' }))).toHaveLength(
        1,
      );
      expect(await loader.getAllHarnesses(NxFormfieldHarness.with({ label: /B/ }))).toHaveLength(2);
    });

    it('should find by hasErrors', async () => {
      const fixture = TestBed.createComponent(ErrorFilterTest);
      fixture.detectChanges();
      const errorLoader = TestbedHarnessEnvironment.loader(fixture);

      fixture.componentInstance.control.markAllAsTouched();
      expect(
        await errorLoader.getAllHarnesses(NxFormfieldHarness.with({ hasErrors: true })),
      ).toHaveLength(1);
      expect(
        await errorLoader.getAllHarnesses(NxFormfieldHarness.with({ hasErrors: false })),
      ).toHaveLength(1);
    });

    it('should find by readonly', async () => {
      expect(
        await loader.getAllHarnesses(NxFormfieldHarness.with({ readonly: true })),
      ).toHaveLength(1);
      expect(
        await loader.getAllHarnesses(NxFormfieldHarness.with({ readonly: false })),
      ).toHaveLength(5);
    });

    it('should find by inline', async () => {
      expect(await loader.getAllHarnesses(NxFormfieldHarness.with({ inline: true }))).toHaveLength(
        1,
      );
      expect(await loader.getAllHarnesses(NxFormfieldHarness.with({ inline: false }))).toHaveLength(
        5,
      );
    });

    it('should find by status', async () => {
      const fixture = TestBed.createComponent(StatusTest);
      fixture.detectChanges();
      const statusLoader = TestbedHarnessEnvironment.loader(fixture);

      expect(
        await statusLoader.getAllHarnesses(NxFormfieldHarness.with({ status: 'positive' })),
      ).toHaveLength(1);
      expect(
        await statusLoader.getAllHarnesses(NxFormfieldHarness.with({ status: null })),
      ).toHaveLength(1);
    });
  });
});

@Component({
  selector: 'test-main-formfield-test',
  template: `
    <!-- Index 0: Label test -->
    <nx-formfield label="Foo">
      <input nxInput />
    </nx-formfield>

    <!-- Index 1: Prefix test -->
    <nx-formfield>
      <span nxFormfieldPrefix>The Prefix</span>
      <input nxInput />
    </nx-formfield>

    <!-- Index 2: Suffix test -->
    <nx-formfield>
      <input nxInput />
      <span nxFormfieldSuffix>The Suffix</span>
    </nx-formfield>

    <!-- Index 3: Appendix test -->
    <nx-formfield>
      <input nxInput />
      <span nxFormfieldAppendix>The Appendix</span>
    </nx-formfield>

    <!-- Index 4: Hint test -->
    <nx-formfield>
      <input nxInput />
      <span nxFormfieldHint>The Hint</span>
    </nx-formfield>

    <!-- Index 5: Readonly test -->
    <nx-formfield>
      <input nxInput readonly />
    </nx-formfield>

    <!-- Index 6: Inline test -->
    <nx-formfield label="Inline" [inline]="true">
      <input nxInput />
    </nx-formfield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxInputModule, ReactiveFormsModule],
})
class MainFormfieldTest {}

@Component({
  selector: 'test-valid-control-test',
  template: `
    <nx-formfield>
      <input nxInput minlength="5" [formControl]="control" />
      <nx-error nxFormfieldError>Error 1</nx-error>
      <nx-error nxFormfieldError>Error 2</nx-error>
    </nx-formfield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxInputModule, ReactiveFormsModule],
})
class ValidControlTest {
  control = new FormControl('');
}

@Component({
  selector: 'test-invalid-control-test',
  template: `
    <nx-formfield>
      <input nxInput [formControl]="control" />
      <div nxFormfieldError><nx-error class="nested-error">Error 1</nx-error></div>
      <nx-error nxFormfieldError>Error 2</nx-error>
    </nx-formfield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxInputModule, ReactiveFormsModule],
})
class InvalidControlTest {
  control = new FormControl('', Validators.required);
}

@Component({
  selector: 'test-notes-test',
  template: `
    <nx-formfield>
      <input nxInput [formControl]="control" />
      <div nxFormfieldNote>Note 1</div>
      <div nxFormfieldNote>Note 2</div>
    </nx-formfield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxInputModule, ReactiveFormsModule],
})
class NotesTest {
  control = new FormControl('');
}

@Component({
  selector: 'test-validation-error-test',
  template: `
    <nx-formfield>
      <input nxInput minlength="5" [formControl]="control" />
      <nx-error nxFormfieldError>Error 1</nx-error>
    </nx-formfield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxInputModule, ReactiveFormsModule],
})
class ValidationErrorTest {
  control = new FormControl('', Validators.minLength(5));
}

@Component({
  selector: 'test-nx-formfield-harness-filter-test',
  template: `
    <nx-formfield label="Foo"><input nxInput /></nx-formfield>
    <nx-formfield label="Bar"><input nxInput /></nx-formfield>
    <nx-formfield label="Baz"><input nxInput /></nx-formfield>
    <nx-formfield><input nxInput [readonly]="true" /></nx-formfield>
    <nx-formfield><input nxInput /></nx-formfield>
    <nx-formfield [inline]="true"><input nxInput /></nx-formfield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxInputModule, ReactiveFormsModule],
})
class FilterTest {}

@Component({
  selector: 'test-status-test',
  template: `
    <nx-formfield label="Foo" appearance="outline" status="positive">
      <input nxInput />
      <span nxFormfieldStatusMessage>Account verified</span>
    </nx-formfield>
    <nx-formfield label="Bar" appearance="outline"><input nxInput /></nx-formfield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxInputModule, ReactiveFormsModule],
})
class StatusTest {}

@Component({
  selector: 'test-error-filter-test',
  template: `
    <nx-formfield>
      <input nxInput [formControl]="control" />
      <nx-error nxFormfieldError>ErrorMessage</nx-error>
    </nx-formfield>
    <nx-formfield>
      <input nxInput nxFormfieldError />
      <nx-error nxFormfieldError>ErrorMessage</nx-error>
    </nx-formfield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFormfieldModule, NxInputModule, ReactiveFormsModule],
})
class ErrorFilterTest {
  control = new FormControl<string>('', Validators.required);
}
