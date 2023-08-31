import { CONTROL, DOWN_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Directive, Injectable, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { createKeyboardEvent, dispatchFakeEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxCodeInputComponent } from './code-input.component';
import { NxCodeInputModule } from './code-input.module';
import { NxCodeInputIntl } from './code-input-intl';

@Injectable()
class MyIntl extends NxCodeInputIntl {
    inputFieldAriaLabel = 'Test';
    ofLabel = 'testOf';
}

@Directive()
abstract class CodeInputTest {
    @ViewChild(NxCodeInputComponent) codeInputInstance!: NxCodeInputComponent;

    negative = false;
    disabled = false;
    tabindex = 0;
    type = 'text';

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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxCodeInputModule, FormsModule, ReactiveFormsModule],
            declarations: [CodeInputTest1, CodeInputTest2, CodeInputTest3, NumberCodeInput, ConfigurableCodeInput, OverrideDefaultLabelsCodeInput],
            providers: [NxCodeInputIntl],
        }).compileComponents();
    }));

    it('creates a 4 character input form', () => {
        createTestComponent(CodeInputTest1);
        expect(testInstance).toBeTruthy();
        expect(testInstance.codeInputInstance._keyCode).toEqual(['', '', '', '']);
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
        expect(codeInputElement).toHaveClass('nx-code-input');
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
        expect(codeInputElement).toHaveClass('ng-invalid');
    });

    it('should set selection range on keydown paste', () => {
        createTestComponent(CodeInputTest1);
        inputElement.value = '1';
        inputElement.focus();
        expect(inputElement.selectionStart).toBe(1);
        expect(inputElement.selectionEnd).toBe(1);
        dispatchKeyboardEvent(inputElement, 'keydown', CONTROL);
        fixture.detectChanges();
        expect(inputElement.selectionStart).toBe(0);
        expect(inputElement.selectionEnd).toBe(1);
    });

    it('should set selection range on mousedown', () => {
        createTestComponent(CodeInputTest1);
        inputElement.value = '1';
        inputElement.focus();
        expect(inputElement.selectionStart).toBe(1);
        expect(inputElement.selectionEnd).toBe(1);
        inputElement.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();
        expect(inputElement.selectionStart).toBe(0);
        expect(inputElement.selectionEnd).toBe(1);
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
        dispatchFakeEvent(lastInput, 'blur');
        tick();
        fixture.detectChanges();
        expect(codeInputElement).toHaveClass('has-error');
    }));

    it('should give code-input element has-error class on submit', fakeAsync(() => {
        createTestComponent(CodeInputTest3);

        expect(codeInputElement).not.toHaveClass('has-error');

        const submitButton = fixture.nativeElement.querySelector('#submit-button') as HTMLButtonElement;
        submitButton.click();
        tick();
        fixture.detectChanges();

        expect(codeInputElement).toHaveClass('has-error');
    }));

    it('should paste', () => {
        createTestComponent(CodeInputTest1);

        inputElement.focus();
        inputElement.dispatchEvent(new InputEvent('input', { data: 'abcd' }));
        fixture.detectChanges();
        ['A', 'B', 'C', 'D'].forEach((char, i) => {
            const input = codeInputElement.querySelector(`input:nth-child(${i + 1})`) as HTMLInputElement;
            expect(input.value).toBe(char);
        });
    });

    it('should work on browser autofill', () => {
        /**
         * important: this test will not fail if you add maxlength="1" in the template again.
         * on android chrome e.g. what will happen then that it will create two input events. first one with the whole pasted value
         * and a second one only with the first character. we can't really simulate this behaviour in a test.
         */
        createTestComponent(CodeInputTest1);
        inputElement.focus();
        fixture.detectChanges();

        inputElement.dispatchEvent(new InputEvent('input', { data: '1234' }));
        fixture.detectChanges();

        ['1', '2', '3', '4'].forEach((char, i) => {
            const input = codeInputElement.querySelector(`input:nth-child(${i + 1})`) as HTMLInputElement;
            expect(input.value).toBe(char);
        });
    });

    it('should ignore non-number characters on paste on number input', () => {
        createTestComponent(NumberCodeInput);
        inputElement.focus();
        inputElement.dispatchEvent(new InputEvent('input', { data: '1a23' }));
        fixture.detectChanges();

        ['1', '2', '3', ''].forEach((char, i) => {
            const input = codeInputElement.querySelector(`input:nth-child(${i + 1})`) as HTMLInputElement;
            expect(input.value).toBe(char);
        });

        expect(testInstance.codeInputInstance._keyCode).toEqual(['1', '2', '3', '']);
    });

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
        createTestComponent(ConfigurableCodeInput);
        testInstance.tabindex = 1;
        fixture.detectChanges();
        expect(codeInputElement.getAttribute('tabindex')).toBe('-1');

        const inputElements = codeInputElement.querySelectorAll('.nx-code-input__field');
        Array.from(inputElements).forEach(inputEl => {
            expect((inputEl as HTMLElement).getAttribute('tabindex')).toBe(`1`);
        });
    });

    it('should change the input type', fakeAsync(() => {
        createTestComponent(ConfigurableCodeInput);
        fixture.componentInstance.type = 'number';
        fixture.detectChanges();
        const inputEl = fixture.nativeElement.querySelector('.nx-code-input__field') as HTMLInputElement;
        expect(inputEl.getAttribute('type')).toBe('number');
    }));

    describe('negative', () => {
        it('should create a basic code input with negative set to false', () => {
            createTestComponent(CodeInputTest1);
            expect(testInstance.codeInputInstance.negative).toBeFalse();
        });

        it('should update on negative change', () => {
            createTestComponent(ConfigurableCodeInput);
            expect(testInstance.codeInputInstance.negative).toBeFalse();
            expect(codeInputElement).not.toHaveClass('is-negative');

            testInstance.negative = true;
            fixture.detectChanges();
            expect(testInstance.codeInputInstance.negative).toBeTrue();
            expect(codeInputElement).toHaveClass('is-negative');

            testInstance.negative = false;
            fixture.detectChanges();
            expect(testInstance.codeInputInstance.negative).toBeFalse();
            expect(codeInputElement).not.toHaveClass('is-negative');
        });
    });

    describe('disabled', () => {
        it('should create a basic code input with disabled set to false', () => {
            createTestComponent(CodeInputTest1);
            expect(testInstance.codeInputInstance.disabled).toBeFalse();
        });

        it('should update on disabled change', fakeAsync(() => {
            createTestComponent(ConfigurableCodeInput);
            const inputElements = codeInputElement.querySelectorAll('.nx-code-input__field');
            expect(testInstance.codeInputInstance.disabled).toBeFalse();
            expect(codeInputElement).not.toHaveClass('is-disabled');

            testInstance.disabled = true;
            fixture.detectChanges();
            flush();

            expect(testInstance.codeInputInstance.disabled).toBeTrue();
            expect(codeInputElement).toHaveClass('is-disabled');

            Array.from(inputElements).forEach(inputEl => {
                expect((inputEl as HTMLElement).getAttribute('disabled')).toBe('');
            });

            testInstance.disabled = false;
            fixture.detectChanges();
            flush();

            expect(testInstance.codeInputInstance.disabled).toBeFalse();
            expect(codeInputElement).not.toHaveClass('is-disabled');

            Array.from(inputElements).forEach(inputEl => {
                expect((inputEl as HTMLElement).getAttribute('disabled')).toBeNull();
            });
        }));

        it('should update disabled on formGroup update', () => {
            createTestComponent(CodeInputTest1);
            expect(testInstance.codeInputInstance.disabled).toBeFalse();

            const form = (testInstance as CodeInputTest1).codeForm;
            form.get('keyCode')!.disable();
            expect(testInstance.codeInputInstance.disabled).toBeTrue();

            form.get('keyCode')!.enable();
            expect(testInstance.codeInputInstance.disabled).toBeFalse();
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
            <nx-code-input [length]="4" convertTo="upper" formControlName="keyCode"></nx-code-input>
        </form>
    `,
})
class CodeInputTest1 extends CodeInputTest {
    inputValue = '';
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
    inputValue2 = '';
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
    inputValue3 = '';
    codeForm3: FormGroup = new FormGroup({
        keyCode3: new FormControl(this.inputValue3, {
            validators: [Validators.required, Validators.minLength(6)],
            updateOn: 'blur',
        }),
    });
}

@Component({
    template: `<nx-code-input [length]="4" type="number"></nx-code-input>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class NumberCodeInput extends CodeInputTest {}

@Component({
    template: `<nx-code-input [negative]="negative" [disabled]="disabled" [length]="4" [tabindex]="tabindex" [type]="type"> </nx-code-input>`,
})
class ConfigurableCodeInput extends CodeInputTest {}

@Component({
    template: `<nx-code-input [length]="4"></nx-code-input>`,
    providers: [{ provide: NxCodeInputIntl, useClass: MyIntl }],
})
class OverrideDefaultLabelsCodeInput extends CodeInputTest {}
