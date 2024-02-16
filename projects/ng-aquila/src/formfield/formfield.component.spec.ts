import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NxInputDirective, NxInputModule } from '@aposin/ng-aquila/input';

import { NxFormfieldErrorDirective } from './error.directive';
import { AppearanceType, FloatLabelType, FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions, NxFormfieldComponent } from './formfield.component';
import { NxFormfieldHintDirective } from './hint.directive';
import { NxFormfieldNoteDirective } from './note.directive';

const formfieldDefaultOptions: FormfieldDefaultOptions = {
    appearance: 'outline',
    nxFloatLabel: 'always',
};

// NxInputModule also imports NxFormfieldModule
@Directive()
abstract class FormfieldTest {
    @ViewChild(NxFormfieldComponent) textfieldInstance!: NxFormfieldComponent;
    @ViewChild(NxInputDirective) inputInstance!: NxInputDirective;
    @ViewChild(NxFormfieldErrorDirective) formfieldError!: NxFormfieldErrorDirective;
    @ViewChild(NxFormfieldNoteDirective) formfieldNote!: NxFormfieldNoteDirective;
    @ViewChild(NxFormfieldHintDirective) formfieldHint!: NxFormfieldHintDirective;

    testForm!: FormGroup;
    currentValue: any;
    appearance!: AppearanceType;
    floatLabel!: FloatLabelType;
    disabled = false;
    readonly = false;
    updateOn = 'change';
}

describe('NxFormfieldComponent', () => {
    let fixture: ComponentFixture<FormfieldTest>;
    let formfieldInstance: NxFormfieldComponent;

    let testInstance: FormfieldTest;
    let formfieldElement: HTMLElement;
    let inputElement: HTMLElement;
    let labelElement: HTMLLabelElement;

    function createTestComponent(component: Type<FormfieldTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();

        testInstance = fixture.componentInstance;
        formfieldElement = fixture.nativeElement.querySelector('nx-formfield');
        inputElement = fixture.nativeElement.querySelector('.c-input');
        labelElement = fixture.nativeElement.querySelector('.nx-formfield__label');
        formfieldInstance = testInstance.textfieldInstance;
    }

    function fillWithContent(value: any) {
        testInstance.currentValue = value;

        // this round will assign it through ngModel to the input directly
        fixture.detectChanges();
        tick();

        // Input Control is updated by now. Now propagate a next round of changes,
        // so that the formfield can update itself
        fixture.detectChanges();
        tick();
    }

    describe('basic', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ReactiveFormsModule, FormsModule, NxInputModule],
                declarations: [
                    BasicFormfield,
                    NoInputFormfield,
                    DirectivesFormfield,
                    ErrorFormfield,
                    NoteFormfield,
                    NgModelFormfield,
                    FloatingFormfield,
                    CustomLabelAndInputFormfield,
                    CustomLabelFormfield,
                    OutlineFormfield,
                    OnPushFormfield,
                    NativeSelectFormfield,
                    ConditionalInputComponent,
                    NoChangeDetectionFormfield,
                ],
            }).compileComponents();
        }));

        it('creates a formfield', () => {
            createTestComponent(BasicFormfield);

            expect(testInstance).toBeTruthy();
        });

        // bug Expression has changed after it was checked
        it('does not throw an error when the control is conditionally loaded', () => {
            expect(() => {
                createTestComponent(ConditionalInputComponent);
            }).not.toThrowError();
        });

        it('enforces NxFormfieldControl presence', () => {
            expect(() => {
                createTestComponent(NoInputFormfield);
            }).toThrowError('Formfield must contain a NxFormfieldControl like input[nxInput] or a custom implementation');
        });

        it('display a given prefix', () => {
            createTestComponent(DirectivesFormfield);
            expect(fixture.nativeElement.textContent).toContain('content-prefix');
        });

        it('display a given suffix', () => {
            createTestComponent(DirectivesFormfield);
            expect(fixture.nativeElement.textContent).toContain('content-suffix');
        });

        it('display a given appendix', () => {
            createTestComponent(DirectivesFormfield);
            expect(fixture.nativeElement.textContent).toContain('content-appendix');
        });

        it('display a given hint', () => {
            createTestComponent(DirectivesFormfield);
            expect(fixture.nativeElement.textContent).toContain('content-hint');
        });

        it('display a given label via `nx-formfield-label`', () => {
            createTestComponent(CustomLabelFormfield);
            expect(fixture.nativeElement.textContent).toContain('Label');
        });

        it('prefers a label directive over label input', () => {
            createTestComponent(CustomLabelAndInputFormfield);
            expect(fixture.nativeElement.textContent).toBe('directiveLabel');
        });

        it("doesn't show the error by default", () => {
            createTestComponent(DirectivesFormfield);
            expect(fixture.nativeElement.textContent).not.toContain('content-error');
        });

        it('reflects filled state in css', fakeAsync(() => {
            createTestComponent(NgModelFormfield);
            fillWithContent('fill with content');

            expect(formfieldElement).toHaveClass('is-filled');
        }));

        it('assigns the label', () => {
            createTestComponent(BasicFormfield);
            expect(fixture.nativeElement.textContent).toContain('Given Label');
        });

        it('floats the label when filled', fakeAsync(() => {
            createTestComponent(NgModelFormfield);
            fillWithContent('fill with content');

            expect(formfieldElement).toHaveClass('is-floating');
        }));

        it('always floats the label when floatLabel is set to "always"', () => {
            createTestComponent(FloatingFormfield);
            testInstance.floatLabel = 'always';
            fixture.detectChanges();
            expect(formfieldElement).toHaveClass('is-floating');
        });

        // The former value of 1.6rem for the translateY transition on the elemen ..nx-formfield__label
        // was calculated es 19.2px. This caused a jumping label after the transition- but only in Firefox 61 and previous.
        // Probably because Firefox switches back from the GPU where subpixels are rendered without any issues
        // After the transition the value snaps back to 19px and we saw the 0.2px as a small jump
        // This is kind of testing the CSS but let's see if this test saves us
        // from getting into this issue again. This will test with Chrome (where we did not habe this issue)
        // but the underlying calculations we test are the same.
        // In case you wonder: We do not need to explicitly wait for the label float up, a single Angular tick
        // is enough to populate the calucalted matrix value.
        it('vertical translation required to float the label has no subpixels', fakeAsync(() => {
            createTestComponent(NgModelFormfield);

            fillWithContent('fill with content');

            const floatingLabel = formfieldElement.querySelector('.nx-formfield__label');
            const floatingLabelStyles = window.getComputedStyle(floatingLabel as Element);

            const caluclatedMatrix = floatingLabelStyles.webkitTransform;
            expect(caluclatedMatrix).toBe('matrix(1, 0, 0, 1, 0, -16)');
        }));

        it('reflects control error state in css', fakeAsync(() => {
            createTestComponent(ErrorFormfield);
            testInstance.inputInstance.ngControl!.control!.markAsTouched();

            fixture.detectChanges();
            tick();

            expect(formfieldElement).toHaveClass('has-error');
        }));

        it('respects change detection trigger', fakeAsync(() => {
            createTestComponent(NoChangeDetectionFormfield);
            const input = inputElement as HTMLInputElement;
            input.focus();
            input.value = '';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            expect(inputElement).toHaveClass('ng-invalid');
            expect(formfieldElement).toHaveClass('is-focused');
            expect(formfieldElement).not.toHaveClass('has-error');

            input.blur();
            formfieldElement.blur();
            fixture.detectChanges();
            tick();
            expect(formfieldElement).toHaveClass('has-error');
        }));

        it('should reflect view when ngControl changed', fakeAsync(() => {
            createTestComponent(NgModelFormfield);

            expect(labelElement.querySelector('span')?.textContent).toContain('Optional');
            fixture.detectChanges();
            testInstance.inputInstance.ngControl!.control!.setValidators(Validators.required);
            testInstance.inputInstance.ngControl!.control?.updateValueAndValidity();
            fixture.detectChanges();

            expect(labelElement.querySelector('span')?.textContent).not.toContain('Optional');
        }));

        it('shows the error instead of a given note', fakeAsync(() => {
            createTestComponent(ErrorFormfield);
            fixture.detectChanges();

            expect(fixture.nativeElement.textContent).not.toContain('content-error');
            expect(fixture.nativeElement.textContent).toContain('content-note');

            testInstance.inputInstance.ngControl!.control!.markAsTouched();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            tick();

            expect(testInstance.inputInstance.errorState).toBeTruthy();
            expect(fixture.nativeElement.textContent).toContain('content-error');
            expect(fixture.nativeElement.textContent).not.toContain('content-note');
        }));

        it('keeps the note without an error message available', fakeAsync(() => {
            createTestComponent(NoteFormfield);
            expect(fixture.nativeElement.textContent).toContain('content-note');

            testInstance.inputInstance.ngControl!.control!.markAsTouched();

            fixture.detectChanges();
            tick();

            expect(fixture.nativeElement.textContent).toContain('content-note');
        }));

        it('should render the formfield with no outline on default', () => {
            createTestComponent(BasicFormfield);
            expect(fixture.nativeElement).not.toHaveClass('has-outline');
        });

        it('should display the formfield with the correct appearance', () => {
            createTestComponent(OutlineFormfield);
            expect(formfieldElement).not.toHaveClass('has-outline');

            fixture.componentInstance.appearance = 'outline';
            fixture.detectChanges();
            expect(formfieldElement).toHaveClass('has-outline');

            fixture.componentInstance.appearance = 'auto';
            fixture.detectChanges();
            expect(formfieldElement).not.toHaveClass('has-outline');
        });

        it('should add is-disabled class when control is disabled', () => {
            createTestComponent(BasicFormfield);
            expect(formfieldElement).not.toHaveClass('is-disabled');
            testInstance.disabled = true;
            fixture.detectChanges();
            expect(formfieldElement).toHaveClass('is-disabled');
        });

        it('should add is-readonly class when control is readonly', () => {
            createTestComponent(BasicFormfield);
            expect(formfieldElement).not.toHaveClass('is-readonly');
            testInstance.readonly = true;
            fixture.detectChanges();
            expect(formfieldElement).toHaveClass('is-readonly');
        });

        describe('programmatic tests', () => {
            it('updates on appearance change', () => {
                createTestComponent(OnPushFormfield);
                expect(formfieldElement).not.toHaveClass('has-outline');

                formfieldInstance.appearance = 'outline';
                fixture.detectChanges();
                expect(formfieldElement).toHaveClass('has-outline');

                formfieldInstance.appearance = 'auto';
                fixture.detectChanges();
                expect(formfieldElement).not.toHaveClass('has-outline');
            });
        });

        describe('a11y', () => {
            it('has no accessibility violations', async () => {
                createTestComponent(BasicFormfield);
                await expectAsync(fixture.nativeElement).toBeAccessible();
            });

            it('adds hints to aria described by', fakeAsync(() => {
                createTestComponent(DirectivesFormfield);
                tick();
                fixture.detectChanges();

                const ariaDescribedBy = inputElement.attributes.getNamedItem('aria-describedby')!.value;
                tick();
                fixture.detectChanges();

                expect(ariaDescribedBy).toContain(testInstance.formfieldHint.id);
            }));

            it('updates described by with the error id', fakeAsync(() => {
                let ariaDescribedBy;

                createTestComponent(ErrorFormfield);
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                tick();
                // before only the not id is set
                ariaDescribedBy = inputElement.attributes.getNamedItem('aria-describedby')!.value;
                expect(ariaDescribedBy).toBe(testInstance.formfieldNote.id);

                testInstance.inputInstance.ngControl!.control!.markAsTouched();
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                tick();

                // the error id should join the list of describedBy ids.
                ariaDescribedBy = inputElement.attributes.getNamedItem('aria-describedby')!.value;
                expect(ariaDescribedBy).toBe(testInstance.formfieldError.id);
            }));

            it('updates aria-owns and attribute for to the control id', () => {
                createTestComponent(BasicFormfield);
                const ariaOwns = labelElement.attributes.getNamedItem('aria-owns')!.value;
                const attrFor = labelElement.attributes.getNamedItem('for')!.value;

                expect(ariaOwns).toBe(testInstance.inputInstance.id);
                expect(attrFor).toBe(testInstance.inputInstance.id);
            });
        });

        describe('Native Select', () => {
            it('Should create a formfield with a Native select', () => {
                createTestComponent(NativeSelectFormfield);
                expect(testInstance).toBeTruthy();
            });
        });

        it('should have an "auto" appearance if no default options are provided', () => {
            createTestComponent(OutlineFormfield);
            expect(testInstance.textfieldInstance.appearance).toBe('auto');
            expect(formfieldElement).not.toHaveClass('has-outline');
        });

        it('should have an "auto" floatingLabel if no default options are provided', () => {
            createTestComponent(OutlineFormfield);
            expect(testInstance.textfieldInstance.floatLabel).toBe('auto');
            expect(formfieldElement).not.toHaveClass('is-floating');
        });
    });

    describe('Default options', () => {
        beforeEach(waitForAsync(() => {
            formfieldDefaultOptions.appearance = 'outline';
            formfieldDefaultOptions.nxFloatLabel = 'always';
            formfieldDefaultOptions.updateOn = 'blur';
            TestBed.configureTestingModule({
                imports: [ReactiveFormsModule, FormsModule, NxInputModule],
                declarations: [BasicFormfield, OutlineFormfield, FloatingFormfield],
                providers: [{ provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldDefaultOptions }],
            }).compileComponents();
        }));

        it('should have an "auto" appearance if empty default options are provided', inject(
            [FORMFIELD_DEFAULT_OPTIONS],
            (defaultOptions: FormfieldDefaultOptions) => {
                delete defaultOptions.appearance;
                createTestComponent(BasicFormfield);
                expect(testInstance.textfieldInstance.appearance).toBe('auto');
                expect(formfieldElement).not.toHaveClass('has-outline');
            },
        ));

        it('should have an "auto" floatingLabel if empty default options are provided', inject(
            [FORMFIELD_DEFAULT_OPTIONS],
            (defaultOptions: FormfieldDefaultOptions) => {
                delete defaultOptions.nxFloatLabel;
                createTestComponent(BasicFormfield);
                expect(testInstance.textfieldInstance.floatLabel).toBe('auto');
                expect(formfieldElement).not.toHaveClass('is-floating');
            },
        ));

        it('should have updateOn set to "change" if empty default options are provided', inject(
            [FORMFIELD_DEFAULT_OPTIONS],
            (defaultOptions: FormfieldDefaultOptions) => {
                delete defaultOptions.updateOn;
                createTestComponent(BasicFormfield);
                expect(testInstance.textfieldInstance.updateOn).toBe('change');
            },
        ));

        it('should have a custom default appearance if default options contain a custom appearance', () => {
            createTestComponent(BasicFormfield);
            expect(testInstance.textfieldInstance.appearance).toBe('outline');
            expect(formfieldElement).toHaveClass('has-outline');
        });

        it('should have a custom default floatingLabel if default options contain a custom floatLabel', () => {
            createTestComponent(BasicFormfield);
            expect(testInstance.textfieldInstance.floatLabel).toBe('always');
            expect(formfieldElement).toHaveClass('is-floating');
        });

        it('should have a custom default updateOn if default options contain a custom updateOn', () => {
            createTestComponent(BasicFormfield);
            expect(testInstance.textfieldInstance.updateOn).toBe('blur');
        });

        it('should override a custom default appearance', () => {
            createTestComponent(OutlineFormfield);
            expect(testInstance.textfieldInstance.appearance).toBe('outline');

            fixture.componentInstance.appearance = 'auto';
            fixture.detectChanges();
            expect(testInstance.textfieldInstance.appearance).toBe('auto');
            expect(formfieldElement).not.toHaveClass('has-outline');
        });

        it('should override a custom default floatLabel', () => {
            createTestComponent(FloatingFormfield);
            expect(testInstance.textfieldInstance.floatLabel).toBe('always');

            testInstance.floatLabel = 'auto';
            fixture.detectChanges();
            expect(testInstance.textfieldInstance.floatLabel).toBe('auto');
            expect(formfieldElement).not.toHaveClass('is-floating');
        });

        it('changes the appearance on injection token change', inject([FORMFIELD_DEFAULT_OPTIONS], (defaultOptions: FormfieldDefaultOptions) => {
            createTestComponent(BasicFormfield);
            expect(testInstance.textfieldInstance.appearance).toBe('outline');
            expect(formfieldElement).toHaveClass('has-outline');

            defaultOptions.appearance = 'auto';
            fixture.detectChanges();
            expect(testInstance.textfieldInstance.appearance).toBe('auto');
            expect(formfieldElement).not.toHaveClass('has-outline');
        }));

        it('changes floatLabel on injection token change', inject([FORMFIELD_DEFAULT_OPTIONS], (defaultOptions: FormfieldDefaultOptions) => {
            createTestComponent(BasicFormfield);
            expect(testInstance.textfieldInstance.floatLabel).toBe('always');
            expect(formfieldElement).toHaveClass('is-floating');

            defaultOptions.nxFloatLabel = 'auto';
            fixture.detectChanges();
            expect(testInstance.textfieldInstance.floatLabel).toBe('auto');
            expect(formfieldElement).not.toHaveClass('is-floating');
        }));
    });
});

@Component({
    template: `
        <nx-formfield label="Given Label">
            <input nxInput [disabled]="disabled" [readonly]="readonly" />
        </nx-formfield>
    `,
})
class BasicFormfield extends FormfieldTest {}
@Component({
    template: `<nx-formfield></nx-formfield>`,
})
class NoInputFormfield extends FormfieldTest {}

@Component({
    template: `
        <nx-formfield>
            <nx-formfield-label>Label</nx-formfield-label>
            <input nxInput />
        </nx-formfield>
    `,
})
class CustomLabelFormfield extends FormfieldTest {}

@Component({
    template: `
        <nx-formfield>
            <input nxInput />

            <span nxFormfieldPrefix>content-prefix</span>
            <span nxFormfieldSuffix>content-suffix</span>
            <span nxFormfieldHint>content-hint</span>
            <span nxFormfieldNote>content-note</span>
            <span nxFormfieldError>content-error</span>
            <span nxFormfieldAppendix>content-appendix</span>
        </nx-formfield>
    `,
})
class DirectivesFormfield extends FormfieldTest {}

@Component({
    template: `
        <nx-formfield>
            <input nxInput required [(ngModel)]="currentValue" />
            <span nxFormfieldNote>content-note</span>
            <span nxFormfieldError>content-error</span>
        </nx-formfield>
    `,
})
class ErrorFormfield extends FormfieldTest {}

@Component({
    template: `
        <nx-formfield updateOn="blur">
            <input nxInput required [(ngModel)]="currentValue" />
            <span nxFormfieldNote>content-note</span>
            <span nxFormfieldError>content-error</span>
        </nx-formfield>
    `,
})
class NoChangeDetectionFormfield extends FormfieldTest {}

@Component({
    template: `
        <nx-formfield>
            <input nxInput required [(ngModel)]="currentValue" />
            <span nxFormfieldNote>content-note</span>
        </nx-formfield>
    `,
})
class NoteFormfield extends FormfieldTest {}
@Component({
    template: `
        <nx-formfield label="Given Label" optionalLabel="Optional">
            <input nxInput [(ngModel)]="currentValue" />
        </nx-formfield>
    `,
})
class NgModelFormfield extends FormfieldTest {}

@Component({
    template: `
        <nx-formfield [floatLabel]="floatLabel">
            <input nxInput [(ngModel)]="currentValue" />
        </nx-formfield>
    `,
})
class FloatingFormfield extends FormfieldTest {}

@Component({
    template: `
        <nx-formfield>
            <select nxInput>
                <option></option>
                <option>Snoopy</option>
                <option>Charlie brown</option>
                <option>Sally Brown</option>
            </select>
        </nx-formfield>
    `,
})
class NativeSelectFormfield extends FormfieldTest {}

@Component({
    template: `
        <nx-formfield label="inputLabel">
            <nx-formfield-label>directiveLabel</nx-formfield-label>
            <input nxInput />
        </nx-formfield>
    `,
})
class CustomLabelAndInputFormfield extends FormfieldTest {}

@Component({
    template: `
        <nx-formfield [appearance]="appearance">
            <input nxInput />
        </nx-formfield>
    `,
})
class OutlineFormfield extends FormfieldTest {}

@Component({
    template: `<nx-formfield [appearance]="appearance">
        <input nxInput />
    </nx-formfield>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnPushFormfield extends FormfieldTest {}

@Component({
    template: `<nx-formfield label="IBAN">
        <input *ngIf="true" nxInput />
        <span nxFormfieldHint>my hint</span>
    </nx-formfield>`,
})
class ConditionalInputComponent extends FormfieldTest {}
