import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxInputHarness } from '@aposin/ng-aquila/input/testing';

import { NxFormfieldHarness } from './nx-formfield-harness';

describe('NxFormfieldHarness', () => {
    it('should get label', async () => {
        const { loader } = createTestComponent(`<nx-formfield label="Foo"><input nxInput /></nx-formfield>`);
        const formfield = await loader.getHarness(NxFormfieldHarness);

        expect(await formfield.getLabel()).toBe('Foo');
    });

    it('should not get errors when control is valid', async () => {
        const { loader, control } = createTestComponent(
            `<nx-formfield>
                <input nxInput minlength="5" [formControl]="control">
                <nx-error nxFormfieldError>Error 1</nx-error>
                <nx-error nxFormfieldError>Error 2</nx-error>
            </nx-formfield>`,
            new FormControl(''),
        );
        control.markAllAsTouched();

        const formfield = await loader.getHarness(NxFormfieldHarness);
        const errors = await formfield.getErrors();
        expect(errors).toHaveSize(0);
    });

    it('should get errors when control is invalid', async () => {
        const { loader, control } = createTestComponent(
            `<nx-formfield>
                <input nxInput [formControl]="control">
                <div nxFormfieldError><nx-error class="nested-error">Error 1</nx-error></div>
                <nx-error nxFormfieldError>Error 2</nx-error>
            </nx-formfield>`,
            new FormControl('', Validators.required),
        );
        control.markAsTouched();
        const formfield = await loader.getHarness(NxFormfieldHarness);

        expect(await formfield.getErrorTexts()).toEqual(['Error 1', 'Error 2']);
        expect(await formfield.getErrorTexts({ text: 'Error 1' })).toEqual(['Error 1']);
        expect(await formfield.getErrorTexts({ text: /2/ })).toEqual(['Error 2']);
    });

    it('should get notes', async () => {
        const { loader } = createTestComponent(
            `<nx-formfield>
                <input nxInput [formControl]="control">
                <div nxFormfieldNote>Note 1</div>
                <div nxFormfieldNote>Note 2</div>
            </nx-formfield>`,
        );
        const formfield = await loader.getHarness(NxFormfieldHarness);

        expect(await formfield.getNoteTexts()).toEqual(['Note 1', 'Note 2']);
        expect(await formfield.getNoteTexts({ text: 'Note 1' })).toEqual(['Note 1']);
        expect(await formfield.getNoteTexts({ text: /2/ })).toEqual(['Note 2']);
    });

    it('should get invalid status if control has validation error', async () => {
        const { loader, control } = createTestComponent(
            `<nx-formfield>
                <input nxInput minlength="5" [formControl]="control">
                <nx-error nxFormfieldError>Error 1</nx-error>
            </nx-formfield>`,
            new FormControl('', Validators.minLength(5)),
        );
        control.markAllAsTouched();

        const formfield = await loader.getHarness(NxFormfieldHarness);
        const input = await formfield.getHarness(NxInputHarness);
        await input.setValue('123');
    });

    it('should get prefix', async () => {
        const { loader } = createTestComponent(`<nx-formfield><span nxFormfieldPrefix>The Prefix</span><input nxInput></nx-formfield>`);
        const formfield = await loader.getHarness(NxFormfieldHarness);

        const prefix = await formfield.getPrefix();
        expect(await prefix?.text()).toBe('The Prefix');
    });

    it('should get suffix', async () => {
        const { loader } = createTestComponent(`<nx-formfield><input nxInput><span nxFormfieldSuffix>The Suffix</span></nx-formfield>`);
        const formfield = await loader.getHarness(NxFormfieldHarness);

        const suffix = await formfield.getSuffix();
        expect(await suffix?.text()).toBe('The Suffix');
    });

    it('should get appendix', async () => {
        const { loader } = createTestComponent(`<nx-formfield><input nxInput><span nxFormfieldAppendix>The Appendix</span></nx-formfield>`);
        const formfield = await loader.getHarness(NxFormfieldHarness);

        const appendix = await formfield.getAppendix();
        expect(await appendix?.text()).toBe('The Appendix');
    });

    it('should get hint', async () => {
        const { loader } = createTestComponent(`<nx-formfield><input nxInput><span nxFormfieldHint>The Hint</span></nx-formfield>`);
        const formfield = await loader.getHarness(NxFormfieldHarness);

        expect(await formfield.getHintText()).toBe('The Hint');
    });

    describe('filters', () => {
        it('should find by label', async () => {
            const { loader } = createTestComponent(
                `<nx-formfield label="Foo"><input nxInput /></nx-formfield>
                 <nx-formfield label="Bar"><input nxInput /></nx-formfield>
                 <nx-formfield label="Baz"><input nxInput /></nx-formfield>`,
            );

            expect(await loader.getAllHarnesses(NxFormfieldHarness.with({ label: 'Foo' }))).toHaveSize(1);
            expect(await loader.getAllHarnesses(NxFormfieldHarness.with({ label: /B/ }))).toHaveSize(2);
        });

        it('should find by hasErrors', async () => {
            const { loader, control } = createTestComponent(
                `<nx-formfield><input nxInput [formControl]="control"><nx-error nxFormfieldError>ErrorMessage</nx-error></nx-formfield>
                <nx-formfield><input nxInput nxFormfieldError><nx-error nxFormfieldError>ErrorMessage</nx-error></nx-formfield>`,
                new FormControl<string>('', Validators.required),
            );
            control.markAllAsTouched();
            expect(await loader.getAllHarnesses(NxFormfieldHarness.with({ hasErrors: true }))).toHaveSize(1);
            expect(await loader.getAllHarnesses(NxFormfieldHarness.with({ hasErrors: false }))).toHaveSize(1);
        });
    });
});

export function createTestComponent(template: string, control: FormControl = new FormControl<string>('')) {
    @Component({ template, standalone: true, imports: [NxFormfieldModule, NxInputModule, ReactiveFormsModule] })
    class Comp {
        control = control;
    }
    const fixture = TestBed.createComponent(Comp);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return { loader, fixture, control };
}
