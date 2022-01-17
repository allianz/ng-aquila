import { DOWN_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Directive, Injectable, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { createKeyboardEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxCodeInputIntl } from './code-input-intl';
import { NxCodeInputComponent } from './code-input.component';
import { NxCodeInputModule } from './code-input.module';

@Injectable()
class MyIntl extends NxCodeInputIntl {
    inputFieldAriaLabel = 'Test';
    ofLabel = 'testOf';
}

@Directive()
abstract class CodeInputTest {
    @ViewChild(NxCodeInputComponent) codeInputInstance!: NxCodeInputComponent;

    negative: boolean = false;
    disabled: boolean = false;

    onSubmit() {}
}

describe('NxCodeInputComponent', () => {
    let fixture: ComponentFixture<CodeInputTest>;
    let testInstance: CodeInputTest;
    let codeInputElement: HTMLElement;
    let inputElement: HTMLInputElement;

    function createTestComponent(component: Type<CodeInputTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;

        codeInputElement = fixture.nativeElement.querySelector('nx-code-input');
        inputElement = fixture.nativeElement.querySelector('.nx-code-input__field') as HTMLInputElement;
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NxCodeInputModule, FormsModule, ReactiveFormsModule],
                declarations: [
                    CodeInputTest1,
                    CodeInputTest2,
                    CodeInputTest3,
                    NumberCodeInput,
                    ConfigurableCodeInput,
                    OnPushCodeInput,
                    OverrideDefaultLabelsCodeInput,
                ],
                providers: [NxCodeInputIntl],
            }).compileComponents();
        }),
    );

    it('creates a 4 character input form', () => {
        createTestComponent(CodeInputTest1);
        expect(testInstance).toBeTruthy();
    });

    it('should have a codeLength of 4', () => {
        createTestComponent(CodeInputTest1);
        expect(testInstance.codeInputInstance.codeLength).toBe(4);
    });

    it('should be a 6 input form per default', () => {
        createTestComponent(CodeInputTest2);
        expect(testInstance.codeInputInstance.codeLength).toBe(6);
    });

    it('should have a class nx-code-input', () => {
        createTestComponent(CodeInputTest1);
        expect(codeInputElement.classList.contains('nx-code-input')).toBe(true);
    });

    it('should auto capitalize input', fakeAsync(() => {
        createTestComponent(CodeInputTest1);
        inputElement.value = 'a';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        tick();
        expect(inputElement.value).toBe('A');
    }));

    it('should be rendered invalid', () => {
        createTestComponent(CodeInputTest1);
        expect(codeInputElement.classList.contains('ng-invalid')).toBe(true);
    });

    it('should select second input on right arrow', fakeAsync(() => {
        createTestComponent(CodeInputTest1);
        inputElement.focus();
        tick();
        fixture.detectChanges();

        // in order to trigger the right arrow event on an input we need an event of type input.
        inputElement.value = '5';
        dispatchKeyboardEvent(inputElement, 'keydown', RIGHT_ARROW);
        inputElement.dispatchEvent(new Event('input'));
        tick();
        fixture.detectChanges();

        expect(document.activeElement).toEqual(codeInputElement.querySelector('input:nth-child(2)'));
    }));

    it('should give code-input element has-error class on blur (with onPush)', fakeAsync(() => {
        createTestComponent(CodeInputTest3);

        const lastInput = fixture.nativeElement.querySelector('input:last-child');
        lastInput.focus();
        lastInput.blur();
        tick();
        fixture.detectChanges();
        expect(codeInputElement.classList.contains('has-error')).toBe(true);
    }));

    it('should give code-input element has-error class on submit', fakeAsync(() => {
        createTestComponent(CodeInputTest3);

        expect(codeInputElement.classList).not.toContain('has-error');

        const submitButton = fixture.nativeElement.querySelector('#submit-button') as HTMLButtonElement;
        submitButton.click();
        tick();
        fixture.detectChanges();

        expect(codeInputElement.classList).toContain('has-error');
    }));

    it('should paste', fakeAsync(() => {
        createTestComponent(CodeInputTest1);
        const data = new DataTransfer();
        data.items.add('abcd', 'text/plain');
        const clipboard = new ClipboardEvent('paste', {
            clipboardData: data,
        } as ClipboardEventInit);

        inputElement.focus();
        inputElement.dispatchEvent(clipboard);
        fixture.detectChanges();
        tick(1);
        ['A', 'B', 'C', 'D'].forEach((char, i) => {
            const input = codeInputElement.querySelector(`input:nth-child(${i + 1})`) as HTMLInputElement;
            expect(input.value).toBe(char);
        });
    }));

    it('should ignore non-number characters on paste on number input', fakeAsync(() => {
        createTestComponent(NumberCodeInput);
        const data = new DataTransfer();
        data.items.add('1a23', 'text/plain');
        const clipboard = new ClipboardEvent('paste', {
            clipboardData: data,
        } as ClipboardEventInit);

        inputElement.focus();
        inputElement.dispatchEvent(clipboard);
        fixture.detectChanges();
        tick(1);

        ['1', '2', '3', ''].forEach((char, i) => {
            const input = codeInputElement.querySelector(`input:nth-child(${i + 1})`) as HTMLInputElement;
            expect(input.value).toBe(char);
        });

        // @ts-ignore
        expect(testInstance.codeInputInstance._keyCode).toEqual(['1', '2', '3', undefined]);
    }));

    it('should prevent default on down arrow press in an empty input', fakeAsync(() => {
        createTestComponent(NumberCodeInput);

        inputElement.focus();
        fixture.detectChanges();
        tick();

        const keydownEvent = createKeyboardEvent('keydown', DOWN_ARROW);
        const spy = spyOn(keydownEvent, 'preventDefault');
        inputElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('should not prevent default on up arrow press in an empty input', fakeAsync(() => {
        createTestComponent(NumberCodeInput);

        inputElement.focus();
        fixture.detectChanges();
        tick();

        const keydownEvent = createKeyboardEvent('keydown', UP_ARROW);
        const spy = spyOn(keydownEvent, 'preventDefault');
        inputElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(0);
    }));

    it('should prevent default on up arrow press if value is 9', fakeAsync(() => {
        createTestComponent(NumberCodeInput);

        inputElement.focus();
        fixture.detectChanges();
        tick();

        inputElement.value = '9';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        tick();

        const keydownEvent = createKeyboardEvent('keydown', UP_ARROW);
        const spy = spyOn(keydownEvent, 'preventDefault');
        inputElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('should not prevent default on up arrow press if value is 5', fakeAsync(() => {
        createTestComponent(NumberCodeInput);

        inputElement.value = '5';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        tick();

        inputElement.focus();
        fixture.detectChanges();
        tick();

        const keydownEvent = createKeyboardEvent('keydown', UP_ARROW);
        const spy = spyOn(keydownEvent, 'preventDefault');
        inputElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();

        const keyupEvent = createKeyboardEvent('keydown', DOWN_ARROW);
        inputElement.dispatchEvent(keyupEvent);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(0);
    }));

    it('should set tabindex on default', () => {
        createTestComponent(CodeInputTest1);
        expect(testInstance.codeInputInstance.tabindex).toBe(0);
    });

    it('should set the passed tabindex', () => {
        createTestComponent(CodeInputTest1);
        testInstance.codeInputInstance.tabindex = 1;
        fixture.detectChanges();
        expect(codeInputElement.getAttribute('tabindex')).toBe('-1');

        const inputElements = codeInputElement.querySelectorAll('.nx-code-input__field');
        Array.from(inputElements).forEach(inputEl => {
            expect((inputEl as HTMLElement).getAttribute('tabindex')).toBe(`1`);
        });
    });

    it('should change the input type', fakeAsync(() => {
        createTestComponent(CodeInputTest3);
        fixture.componentInstance.codeInputInstance.type = 'number';
        fixture.detectChanges();
        const inputEl = fixture.nativeElement.querySelector('.nx-code-input__field') as HTMLInputElement;
        expect(inputEl.getAttribute('type')).toBe('number');
    }));

    describe('negative', () => {
        it('should create a basic code input with negative set to false', () => {
            createTestComponent(CodeInputTest1);
            expect(testInstance.codeInputInstance.negative).toBe(false);
        });

        it('should update on negative change', () => {
            createTestComponent(ConfigurableCodeInput);
            expect(testInstance.codeInputInstance.negative).toBe(false);
            expect(codeInputElement.classList).not.toContain('is-negative');

            testInstance.negative = true;
            fixture.detectChanges();
            expect(testInstance.codeInputInstance.negative).toBe(true);
            expect(codeInputElement.classList).toContain('is-negative');

            testInstance.negative = false;
            fixture.detectChanges();
            expect(testInstance.codeInputInstance.negative).toBe(false);
            expect(codeInputElement.classList).not.toContain('is-negative');
        });

        it('should update on negative change (programmatic change)', () => {
            createTestComponent(OnPushCodeInput);

            testInstance.codeInputInstance.negative = true;
            fixture.detectChanges();
            expect(codeInputElement.classList).toContain('is-negative');

            testInstance.codeInputInstance.negative = false;
            fixture.detectChanges();
            expect(codeInputElement.classList).not.toContain('is-negative');
        });
    });

    describe('disabled', () => {
        it('should create a basic code input with disabled set to false', () => {
            createTestComponent(CodeInputTest1);
            expect(testInstance.codeInputInstance.disabled).toBe(false);
        });

        it('should update on disabled change', () => {
            createTestComponent(ConfigurableCodeInput);
            const inputElements = codeInputElement.querySelectorAll('.nx-code-input__field');
            expect(testInstance.codeInputInstance.disabled).toBe(false);
            expect(codeInputElement.classList).not.toContain('is-disabled');

            testInstance.disabled = true;
            fixture.detectChanges();
            expect(testInstance.codeInputInstance.disabled).toBe(true);
            expect(codeInputElement.classList).toContain('is-disabled');

            Array.from(inputElements).forEach(inputEl => {
                expect((inputEl as HTMLElement).getAttribute('disabled')).toBe('');
            });

            testInstance.disabled = false;
            fixture.detectChanges();
            expect(testInstance.codeInputInstance.disabled).toBe(false);
            expect(codeInputElement.classList).not.toContain('is-disabled');
            Array.from(inputElements).forEach(inputEl => {
                expect((inputEl as HTMLElement).getAttribute('disabled')).toBe(null);
            });
        });

        it('should update on disabled change (programmatic change)', () => {
            createTestComponent(OnPushCodeInput);

            testInstance.codeInputInstance.disabled = true;
            fixture.detectChanges();
            expect(codeInputElement.classList).toContain('is-disabled');

            testInstance.codeInputInstance.disabled = false;
            fixture.detectChanges();
            expect(codeInputElement.classList).not.toContain('is-disabled');
        });

        it('should update disabled on formGroup update', () => {
            createTestComponent(CodeInputTest1);
            expect(testInstance.codeInputInstance.disabled).toBe(false);

            const form = (testInstance as CodeInputTest1).codeForm;
            form.get('keyCode')!.disable();
            expect(testInstance.codeInputInstance.disabled).toBe(true);

            form.get('keyCode')!.enable();
            expect(testInstance.codeInputInstance.disabled).toBe(false);
        });
    });

    it('should overwrite the default aria labels', () => {
        createTestComponent(OverrideDefaultLabelsCodeInput);
        const inputElements = codeInputElement.querySelectorAll('.nx-code-input__field');

        Array.from(inputElements).forEach((inputEl, index) => {
            expect((inputEl as HTMLElement).getAttribute('aria-label')).toBe(`Test ${index + 1} testOf ${inputElements.length}`);
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(CodeInputTest1);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <form class="nx-code-input-demo-form" [formGroup]="codeForm" (ngSubmit)="onSubmit()">
            <nx-code-input [length]="4" nxConvertTo="upper" formControlName="keyCode"></nx-code-input>
        </form>
    `,
})
class CodeInputTest1 extends CodeInputTest {
    inputValue: string = '';
    codeForm: FormGroup = new FormGroup({
        keyCode: new FormControl(this.inputValue, {
            validators: [Validators.required, Validators.pattern('[A-Z]+'), Validators.minLength(4)],
            updateOn: 'submit',
        }),
    });
}

@Component({
    template: `
        <form class="nx-code-input-demo-form" #form2="ngForm" [formGroup]="codeForm2" (ngSubmit)="onSubmit()">
            <nx-code-input formControlName="keyCode2"></nx-code-input>
        </form>
    `,
})
class CodeInputTest2 extends CodeInputTest {
    inputValue2: string = '';
    codeForm2: FormGroup = new FormGroup({
        keyCode2: new FormControl(this.inputValue2, {
            validators: [Validators.required, Validators.minLength(6)],
            updateOn: 'blur',
        }),
    });
}

@Component({
    template: `
        <form class="nx-code-input-demo-form" #form3="ngForm" [formGroup]="codeForm3" (ngSubmit)="onSubmit()">
            <nx-code-input formControlName="keyCode3"></nx-code-input>
            <button nxButton="primary small" id="submit-button">Submit</button>
            <button nxButton="secondary small" (click)="form.resetForm()">Clear</button>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class CodeInputTest3 extends CodeInputTest {
    inputValue3: string = '';
    codeForm3: FormGroup = new FormGroup({
        keyCode3: new FormControl(this.inputValue3, {
            validators: [Validators.required, Validators.minLength(6)],
            updateOn: 'blur',
        }),
    });
}

@Component({
    template: ` <nx-code-input [length]="4" type="number"></nx-code-input> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class NumberCodeInput extends CodeInputTest {}

@Component({
    template: ` <nx-code-input [negative]="negative" [disabled]="disabled" [length]="4"> </nx-code-input> `,
})
class ConfigurableCodeInput extends CodeInputTest {}

@Component({
    template: ` <nx-code-input [negative]="negative" [length]="4"> </nx-code-input> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnPushCodeInput extends CodeInputTest {}

@Component({
    template: ` <nx-code-input [length]="4"></nx-code-input> `,
    providers: [{ provide: NxCodeInputIntl, useClass: MyIntl }],
})
class OverrideDefaultLabelsCodeInput extends CodeInputTest {}
