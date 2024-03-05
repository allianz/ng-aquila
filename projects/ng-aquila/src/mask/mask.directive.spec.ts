import { A, BACKSPACE, DELETE, EIGHT, NINE, NUMPAD_ONE, NUMPAD_ZERO, ONE, SEMICOLON, ZERO } from '@angular/cdk/keycodes';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { createKeyboardEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxMaskDirective } from './mask.directive';
import { NxMaskModule } from './mask.module';

export function assertInputValue(nativeElement: HTMLInputElement, inputValue: string, asserted: string) {
    let selectionPosition: number;
    nativeElement.value = '';

    for (let i = 0; i < inputValue.length; i++) {
        selectionPosition = nativeElement.value.length;

        nativeElement.selectionStart = selectionPosition;
        nativeElement.selectionEnd = selectionPosition;

        // keydown event
        // I trigger this with key 'A' because the key currently is irrelevant in the keydown handler
        // (besides DELETE and BACKSPACE, which are not entered here because it's only strings).
        dispatchKeyboardEvent(nativeElement, 'keydown', A);

        // input event
        nativeElement.value += inputValue[i];
        nativeElement.dispatchEvent(new Event('input'));
    }

    expect(nativeElement.value).toBe(asserted);
}

@Directive()
abstract class MaskTest {
    @ViewChild(NxMaskDirective) maskInstance!: NxMaskDirective;

    mask!: string;
    separators: string[] = ['(', ')', ':', '-'];
    dropSpecialCharacters = false;
    validateMask = true;
    modelVal!: any;
    convertTo!: string;
    deactivateMask = false;

    testForm: FormGroup = new FormGroup({
        maskInput: new FormControl('', {}),
    });
}

describe('NxMaskDirective', () => {
    let fixture: ComponentFixture<MaskTest>;
    let testInstance: MaskTest;
    let maskInstance: NxMaskDirective;
    let nativeElement: HTMLInputElement;

    function createTestComponent(component: Type<MaskTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        maskInstance = testInstance.maskInstance;
        nativeElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    }

    function setMask(mask: string) {
        testInstance.mask = mask;
        fixture.detectChanges();
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicMaskComponent, ConfigurableMaskComponent, ValidationMaskComponent, HookedMaskComponent, NgModelMask],
            imports: [FormsModule, ReactiveFormsModule, NxMaskModule],
        }).compileComponents();
    }));

    it('creates the input', () => {
        createTestComponent(BasicMaskComponent);
        expect(maskInstance).toBeTruthy();
    });

    it('sets mask input', () => {
        createTestComponent(BasicMaskComponent);
        expect(maskInstance.mask).toBe('');

        testInstance.mask = '00-00';
        fixture.detectChanges();
        expect(maskInstance.mask).toBe('00-00');
    });

    it('accepts only numbers', () => {
        createTestComponent(BasicMaskComponent);
        setMask('0000');

        assertInputValue(nativeElement, '1', '1');
        assertInputValue(nativeElement, '12', '12');
        assertInputValue(nativeElement, '123', '123');
        assertInputValue(nativeElement, '1234', '1234');
        assertInputValue(nativeElement, '12345', '1234');
        assertInputValue(nativeElement, '123456', '1234');

        assertInputValue(nativeElement, '1abc', '1');
        assertInputValue(nativeElement, 'aLD', '');
        assertInputValue(nativeElement, '12-34', '1234'), assertInputValue(nativeElement, '12-34-', '1234');
    });

    it('accepts only letters', () => {
        createTestComponent(BasicMaskComponent);
        setMask('SSSS');

        assertInputValue(nativeElement, 'A', 'A');
        assertInputValue(nativeElement, 'a', 'a');
        assertInputValue(nativeElement, 'abc', 'abc');
        assertInputValue(nativeElement, 'aAbBcC', 'aAbB');

        assertInputValue(nativeElement, 'a123', 'a');
        assertInputValue(nativeElement, 'a12b', 'ab');
        assertInputValue(nativeElement, 'ab,cd', 'abcd');
    });

    it('should handle number values in model', fakeAsync(() => {
        createTestComponent(ConfigurableMaskComponent);
        setMask('000');
        testInstance.modelVal = 123;
        fixture.detectChanges();
        flush();
        expect(nativeElement.value).toBe('123');

        testInstance.modelVal = 0;
        fixture.detectChanges();
        flush();
        expect(nativeElement.value).toBe('0');

        testInstance.modelVal = 420;
        fixture.detectChanges();
        flush();
        expect(nativeElement.value).toBe('420');
    }));

    it('accepts digits and letters', () => {
        createTestComponent(BasicMaskComponent);
        setMask('AAAA');
        setMask('AA');
        setMask('AAA');
        setMask('AAAA');

        assertInputValue(nativeElement, '1', '1');
        assertInputValue(nativeElement, '12', '12');
        assertInputValue(nativeElement, '123', '123');
        assertInputValue(nativeElement, '1234', '1234');
        assertInputValue(nativeElement, '12345', '1234');
        assertInputValue(nativeElement, '123456', '1234');

        assertInputValue(nativeElement, 'A', 'A');
        assertInputValue(nativeElement, 'a', 'a');
        assertInputValue(nativeElement, 'abc', 'abc');
        assertInputValue(nativeElement, 'aAbBcC', 'aAbB');

        assertInputValue(nativeElement, 'A12BC', 'A12B');
        assertInputValue(nativeElement, 'A12BC5', 'A12B');
        assertInputValue(nativeElement, 'A1-1B', 'A11B');
        assertInputValue(nativeElement, 'A1-1BC', 'A11B');
    });

    it('updates separators', () => {
        createTestComponent(ConfigurableMaskComponent);
        setMask('(00-00)');
        expect(maskInstance.separators).toEqual(['(', ')', ':', '-']);

        testInstance.separators = ['$', '%', '&'];
        fixture.detectChanges();
        expect(maskInstance.separators).toEqual(['$', '%', '&']);
    });

    it('updates value on separators change', () => {
        createTestComponent(ConfigurableMaskComponent);
        setMask('(00-00)');
        assertInputValue(nativeElement, '1234', '(12-34)');

        testInstance.separators = ['(', ')'];
        fixture.detectChanges();
        expect(nativeElement.value).toBe('(12');
    });

    it('adds separators', () => {
        createTestComponent(BasicMaskComponent);

        setMask('00-00');
        assertInputValue(nativeElement, '1', '1');
        assertInputValue(nativeElement, '12', '12-');
        assertInputValue(nativeElement, '123', '12-3');
        assertInputValue(nativeElement, '1234', '12-34');
        assertInputValue(nativeElement, '12345', '12-34');

        setMask('(SS) 00:00:00');
        assertInputValue(nativeElement, 'A', '(A');
        assertInputValue(nativeElement, 'OO', '(OO) ');
        assertInputValue(nativeElement, 'oo1', '(oo) 1');
        assertInputValue(nativeElement, 'oo1234', '(oo) 12:34:');
        assertInputValue(nativeElement, 'ooabcd1234', '(oo) 12:34:');
        assertInputValue(nativeElement, 'oo12345678', '(oo) 12:34:56');
    });

    it('removes last separator on BACKSPACE pressed', () => {
        createTestComponent(BasicMaskComponent);
        setMask('00-00');
        assertInputValue(nativeElement, '11', '11-');
        dispatchKeyboardEvent(nativeElement, 'keydown', BACKSPACE);
        fixture.detectChanges();
        expect(nativeElement.value).toBe('11');
    });

    it('updates value on mask change', () => {
        createTestComponent(BasicMaskComponent);
        setMask('00-00');
        assertInputValue(nativeElement, '1234', '12-34');
        setMask('AS.SS');
        expect(nativeElement.value).toBe('1');
    });

    it('returns correct unmaskedValue', () => {
        createTestComponent(BasicMaskComponent);
        setMask('(SS) 00:00:00');
        assertInputValue(nativeElement, 'oo12345678', '(oo) 12:34:56');
        expect(maskInstance.getUnmaskedValue()).toBe('oo123456');
    });

    it('sets dropSpecialCharacters to false on default', () => {
        createTestComponent(BasicMaskComponent);
        expect(maskInstance.dropSpecialCharacters).toBeFalse();
    });

    it('updates dropSpecialCharacters value on change', () => {
        createTestComponent(ConfigurableMaskComponent);
        setMask('00:00-00');

        expect(maskInstance.dropSpecialCharacters).toBeFalse();
        assertInputValue(nativeElement, '123456', '12:34-56');
        expect(testInstance.modelVal).toBe('12:34-56');

        testInstance.dropSpecialCharacters = true;
        fixture.detectChanges();
        expect(maskInstance.dropSpecialCharacters).toBeTrue();
        expect(nativeElement.value).toBe('12:34-56');
        expect(testInstance.modelVal).toBe('123456');

        testInstance.dropSpecialCharacters = false;
        fixture.detectChanges();
        expect(maskInstance.dropSpecialCharacters).toBeFalse();
        expect(nativeElement.value).toBe('12:34-56');
        expect(testInstance.modelVal).toBe('12:34-56');
    });

    it('modelVal should be unmasked when dropSpecialCharacters is true', () => {
        createTestComponent(ConfigurableMaskComponent);
        setMask('00:00-00');

        testInstance.dropSpecialCharacters = true;
        fixture.detectChanges();
        assertInputValue(nativeElement, '123456', '12:34-56');
        expect(maskInstance.dropSpecialCharacters).toBeTrue();
        expect(nativeElement.value).toBe('12:34-56');
        expect(testInstance.modelVal).toBe('123456');
    });

    it('sets deactivateMask to false on default', () => {
        createTestComponent(BasicMaskComponent);
        expect(maskInstance.deactivateMask).toBeFalse();
    });

    describe('validation', () => {
        it('sets validateMask to true on default', () => {
            createTestComponent(BasicMaskComponent);
            expect(maskInstance.validateMask).toBeTrue();
        });

        it('should mark valid if value empty', () => {
            createTestComponent(ValidationMaskComponent);
            testInstance.mask = '00:00-00';
            fixture.detectChanges();

            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeTrue();

            nativeElement.value = '';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeTrue();
        });

        it('should mark invalid if value is too short', () => {
            createTestComponent(ValidationMaskComponent);
            testInstance.mask = '00:00-00';
            fixture.detectChanges();

            nativeElement.value = '1234';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeFalse();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeFalse();

            nativeElement.value = '123456';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeTrue();
        });

        it('updates validateMask value on change', () => {
            createTestComponent(ConfigurableMaskComponent);
            expect(fixture.componentInstance.validateMask).toBeTrue();
            testInstance.validateMask = false;
            expect(fixture.componentInstance.validateMask).toBeFalse();
        });

        it('should not validate with validateMask turned off', () => {
            createTestComponent(ValidationMaskComponent);
            testInstance.mask = '00:00-00';
            testInstance.validateMask = false;
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeTrue();

            nativeElement.value = '1234';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeTrue();
        });

        it('updates the validated value after validateMask change', () => {
            createTestComponent(ValidationMaskComponent);
            testInstance.mask = '00:00-00';
            fixture.detectChanges();

            nativeElement.value = '1234';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeFalse();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeFalse();

            testInstance.validateMask = false;
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeTrue();

            testInstance.validateMask = true;
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeFalse();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeFalse();
        });

        it('should validate when switching from deactive mask to active', () => {
            createTestComponent(ValidationMaskComponent);
            testInstance.mask = '00:00-00';
            testInstance.validateMask = true;
            testInstance.deactivateMask = true;
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeTrue();

            // mask deactive, the input should be valid even the value is incorrect.
            nativeElement.value = '1234';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeTrue();

            // mask activate, the input should be invalid if the value is incorrect.
            testInstance.deactivateMask = false;
            nativeElement.value = '1234';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(testInstance.testForm.valid).toBeFalse();
            expect(testInstance.testForm.get('maskInput')!.valid).toBeFalse();
        });
    });

    describe('test ngModel', () => {
        it('calls onChange after init without any updateConfig calls', () => {
            createTestComponent(NgModelMask);
            assertInputValue(nativeElement, 'ABCD', 'ABCD');
            expect(testInstance.modelVal).toBe('ABCD');
        });

        it('updates ngModel on backspace', () => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');
            expect(testInstance.modelVal).toBe('12:34:56');

            nativeElement.setSelectionRange(8, 8);
            const keydownEvent = createKeyboardEvent('keydown', BACKSPACE);
            const spy = spyOn(keydownEvent, 'preventDefault');
            nativeElement.dispatchEvent(keydownEvent);

            fixture.detectChanges();
            expect(nativeElement.value).toBe('12:34:5');
            expect(testInstance.modelVal).toBe('12:34:5');
            expect(spy).toHaveBeenCalledTimes(1);

            nativeElement.dispatchEvent(keydownEvent);
            nativeElement.dispatchEvent(keydownEvent);
            fixture.detectChanges();
            expect(nativeElement.value).toBe('12:34');
            expect(testInstance.modelVal).toBe('12:34');
            expect(spy).toHaveBeenCalledTimes(3);
        });

        it('updates ngModel on delete', () => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');
            expect(testInstance.modelVal).toBe('12:34:56');

            nativeElement.setSelectionRange(7, 7);
            const keydownEvent = createKeyboardEvent('keydown', DELETE);
            const spy = spyOn(keydownEvent, 'preventDefault');
            nativeElement.dispatchEvent(keydownEvent);
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:34:5');
            expect(testInstance.modelVal).toBe('12:34:5');
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('updates a ngModel value with mask value', fakeAsync(() => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('00:00:00');
            fixture.componentInstance.modelVal = '12:34:56';
            fixture.detectChanges();
            flush();

            expect(nativeElement.value).toBe('12:34:56');
            expect(testInstance.modelVal).toBe('12:34:56');
        }));

        it('updates model to uppercase', () => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('AAAA');
            testInstance.convertTo = 'upper';
            fixture.detectChanges();
            assertInputValue(nativeElement, 'test', 'TEST');
            expect(testInstance.modelVal).toBe('TEST');
        });

        it('should not update model to uppercase if deactivateMask set', fakeAsync(() => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('AAAA');
            testInstance.convertTo = 'upper';
            testInstance.deactivateMask = true;
            fixture.detectChanges();
            tick();
            assertInputValue(nativeElement, 'test', 'test');
            expect(testInstance.modelVal).toBe('test');
        }));

        it('should keep preset model value if deactiveMask set', () => {
            createTestComponent(PresetDeactiveMaskComponent);
            setMask('AA-AA');

            fixture.detectChanges();
            expect(testInstance.modelVal).toBe('AAAA');
        });

        it('should update ngModel on mask change', fakeAsync(() => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('AAAA');
            testInstance.modelVal = 'test';
            fixture.detectChanges();
            flush();
            expect(testInstance.modelVal).toBe('test');
            setMask('AAA');
            fixture.detectChanges();
            flush();
            expect(testInstance.modelVal).toBe('tes');
        }));

        it('should update ngModel on separator change', fakeAsync(() => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('00:00:00');
            testInstance.modelVal = '12:34:56';
            fixture.detectChanges();
            tick();
            expect(nativeElement.value).toBe('12:34:56');
            expect(testInstance.modelVal).toBe('12:34:56');

            setMask('(00-00)');
            testInstance.modelVal = '(12-34)';

            testInstance.separators = ['(', ')'];
            expect(nativeElement.value).toBe('(12-34)');
            expect(testInstance.modelVal).toBe('(12-34)');
            fixture.detectChanges();
            tick();
            expect(nativeElement.value).toBe('(12');
        }));

        it('should update ngModel on convertTo change', fakeAsync(() => {
            createTestComponent(ConfigurableMaskComponent);
            testInstance.mask = 'AAAA';
            fixture.detectChanges();
            testInstance.modelVal = 'test';
            fixture.detectChanges();
            tick();
            expect(testInstance.modelVal).toBe('test');
            testInstance.convertTo = 'upper';
            fixture.detectChanges();
            tick();
            expect(testInstance.modelVal).toBe('TEST');
        }));

        it('should update ngModel on dropSpecialCharacters change', fakeAsync(() => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('00:00:00');
            testInstance.modelVal = '12:34:56';
            fixture.detectChanges();
            tick();
            expect(nativeElement.value).toBe('12:34:56');
            expect(testInstance.modelVal).toBe('12:34:56');
            testInstance.dropSpecialCharacters = true;
            fixture.detectChanges();
            tick();
            expect(testInstance.modelVal).toBe('123456');
        }));

        it('should update ngModel on deactivateMask change', fakeAsync(() => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('00:00:00');
            testInstance.modelVal = '12:34:56';
            fixture.detectChanges();
            tick();
            expect(testInstance.modelVal).toBe('12:34:56');
            testInstance.deactivateMask = true;
            fixture.detectChanges();
            tick();
            expect(testInstance.modelVal).toBe('123456');
            testInstance.deactivateMask = false;
            fixture.detectChanges();
            tick();
            expect(testInstance.modelVal).toBe('12:34:56');
        }));

        it('should update input value on deactivateMask change', fakeAsync(() => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('00:00:00');
            testInstance.modelVal = '12:34:56';
            fixture.detectChanges();
            tick();
            expect(nativeElement.value).toBe('12:34:56');
            testInstance.deactivateMask = true;
            fixture.detectChanges();
            tick();
            expect(nativeElement.value).toBe('123456');
            testInstance.deactivateMask = false;
            fixture.detectChanges();
            tick();
            expect(nativeElement.value).toBe('12:34:56');
        }));
    });

    it('should not accept characters if mask is filled up', () => {
        createTestComponent(BasicMaskComponent);
        setMask('00:00:00');
        assertInputValue(nativeElement, '123456', '12:34:56');

        nativeElement.setSelectionRange(3, 3);
        const keydownEvent = createKeyboardEvent('keydown', ZERO);
        nativeElement.dispatchEvent(keydownEvent);
        nativeElement.value = '12:034:56';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(nativeElement.value).toBe('12:34:56');
        expect(nativeElement.selectionStart).toBe(3);
        expect(nativeElement.selectionEnd).toBe(3);
    });

    it('should accept one character if mask is filled up and one character is selected', () => {
        createTestComponent(BasicMaskComponent);
        setMask('00:00:00');
        assertInputValue(nativeElement, '123456', '12:34:56');

        nativeElement.setSelectionRange(3, 5);
        const keydownEvent = createKeyboardEvent('keydown', ZERO);
        nativeElement.dispatchEvent(keydownEvent);
        nativeElement.value = '12:0:56';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(nativeElement.value).toBe('12:05:6');
        expect(nativeElement.selectionStart).toBe(4);
        expect(nativeElement.selectionEnd).toBe(4);

        assertInputValue(nativeElement, '123456', '12:34:56');
        nativeElement.setSelectionRange(3, 4);
        nativeElement.dispatchEvent(keydownEvent);
        nativeElement.value = '12:04:56';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(nativeElement.value).toBe('12:04:56');
        expect(nativeElement.selectionStart).toBe(4);
        expect(nativeElement.selectionEnd).toBe(4);
    });

    describe('mouse position', () => {
        it('entering correct letter', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');

            nativeElement.dispatchEvent(new Event('focus'));
            expect(nativeElement.selectionStart).toBe(0);
            expect(nativeElement.selectionEnd).toBe(0);

            dispatchKeyboardEvent(nativeElement, 'keydown', ONE);
            nativeElement.value = '1';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(nativeElement.selectionStart).toBe(1);
            expect(nativeElement.selectionEnd).toBe(1);

            assertInputValue(nativeElement, '12345', '12:34:5');
            nativeElement.setSelectionRange(3, 3);
            dispatchKeyboardEvent(nativeElement, 'keydown', ZERO);
            nativeElement.value = '12:034:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:03:45');
            expect(nativeElement.selectionStart).toBe(4);
            expect(nativeElement.selectionEnd).toBe(4);
        });

        it('entering correct numpad numbers', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');

            nativeElement.dispatchEvent(new Event('focus'));
            expect(nativeElement.selectionStart).toBe(0);
            expect(nativeElement.selectionEnd).toBe(0);

            let eventData = { keyCode: NUMPAD_ONE, location: 3 };
            let keyboardEvent = new KeyboardEvent('keydown', eventData);
            nativeElement.dispatchEvent(keyboardEvent);
            nativeElement.value = '1';
            nativeElement.dispatchEvent(new Event('input'));
            expect(nativeElement.selectionStart).toBe(1);
            expect(nativeElement.selectionEnd).toBe(1);

            assertInputValue(nativeElement, '12345', '12:34:5');
            nativeElement.setSelectionRange(3, 3);
            eventData = { keyCode: NUMPAD_ZERO, location: 3 };
            keyboardEvent = new KeyboardEvent('keydown', eventData);
            nativeElement.dispatchEvent(keyboardEvent);
            nativeElement.value = '12:034:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:03:45');
            expect(nativeElement.selectionStart).toBe(4);
            expect(nativeElement.selectionEnd).toBe(4);
        });

        it('switches position behind selector', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '12345', '12:34:5');

            nativeElement.setSelectionRange(1, 1);
            dispatchKeyboardEvent(nativeElement, 'keydown', NINE);
            nativeElement.value = '192:34:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('19:23:45');
            expect(nativeElement.selectionStart).toBe(3);
            expect(nativeElement.selectionEnd).toBe(3);

            // test multiple separators
            setMask('00:-00:00');
            assertInputValue(nativeElement, '12345', '12:-34:5');
            nativeElement.setSelectionRange(1, 1);
            dispatchKeyboardEvent(nativeElement, 'keydown', NINE);
            nativeElement.value = '192:-34:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('19:-23:45');
            expect(nativeElement.selectionStart).toBe(4);
            expect(nativeElement.selectionEnd).toBe(4);
        });

        it('entering false letter', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');

            nativeElement.setSelectionRange(1, 1);
            dispatchKeyboardEvent(nativeElement, 'keydown', A);
            nativeElement.value = '1A2:34:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:34:56');
            expect(nativeElement.selectionStart).toBe(1);
            expect(nativeElement.selectionEnd).toBe(1);
        });

        it('entering backspace', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');

            // try to delete separator
            nativeElement.setSelectionRange(3, 3);
            const keydownEvent = createKeyboardEvent('keydown', BACKSPACE);
            const spy = spyOn(keydownEvent, 'preventDefault');
            nativeElement.dispatchEvent(keydownEvent);
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:34:56');
            expect(nativeElement.selectionStart).toBe(2);
            expect(nativeElement.selectionEnd).toBe(2);
            expect(spy).toHaveBeenCalledTimes(1);

            // try to delete letter
            nativeElement.setSelectionRange(4, 4);
            nativeElement.dispatchEvent(keydownEvent);
            nativeElement.value = '12:4:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:45:6');
            expect(nativeElement.selectionStart).toBe(3);
            expect(nativeElement.selectionEnd).toBe(3);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('entering delete', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');

            // try to delete separator
            nativeElement.setSelectionRange(2, 2);
            const keyEvent = createKeyboardEvent('keydown', DELETE);
            const spy = spyOn(keyEvent, 'preventDefault');
            nativeElement.dispatchEvent(keyEvent);
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:34:56');
            expect(nativeElement.selectionStart).toBe(2);
            expect(nativeElement.selectionEnd).toBe(2);
            expect(spy).toHaveBeenCalledTimes(1);

            // try to delete letter
            nativeElement.setSelectionRange(3, 3);
            nativeElement.dispatchEvent(keyEvent);
            nativeElement.value = '12:4:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:45:6');
            expect(nativeElement.selectionStart).toBe(3);
            expect(nativeElement.selectionEnd).toBe(3);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('sets correct position when backspacing first character', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');

            nativeElement.setSelectionRange(1, 1);
            dispatchKeyboardEvent(nativeElement, 'keydown', BACKSPACE);
            nativeElement.value = '2:34:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('23:45:6');
            expect(nativeElement.selectionStart).toBe(0);
            expect(nativeElement.selectionEnd).toBe(0);
        });

        it('deletes marked row of characters (with delete pressed)', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');

            nativeElement.setSelectionRange(3, 5);
            dispatchKeyboardEvent(nativeElement, 'keydown', DELETE);
            nativeElement.value = '12::56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:56:');
            expect(nativeElement.selectionStart).toBe(3);
            expect(nativeElement.selectionEnd).toBe(3);

            assertInputValue(nativeElement, '123456', '12:34:56');
            nativeElement.setSelectionRange(2, 4);
            dispatchKeyboardEvent(nativeElement, 'keydown', DELETE);
            nativeElement.value = '124:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:45:6');
            expect(nativeElement.selectionStart).toBe(3);
            expect(nativeElement.selectionEnd).toBe(3);

            setMask('00:-00:00');
            assertInputValue(nativeElement, '123456', '12:-34:56');
            nativeElement.setSelectionRange(2, 5);
            dispatchKeyboardEvent(nativeElement, 'keydown', DELETE);
            nativeElement.value = '12:4:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:-45:6');
            expect(nativeElement.selectionStart).toBe(4);
            expect(nativeElement.selectionEnd).toBe(4);
        });

        it('deletes marked row of characters (with backspace pressed)', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');

            nativeElement.setSelectionRange(3, 5);
            dispatchKeyboardEvent(nativeElement, 'keydown', BACKSPACE);
            nativeElement.value = '12::56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:56:');
            expect(nativeElement.selectionStart).toBe(3);
            expect(nativeElement.selectionEnd).toBe(3);

            assertInputValue(nativeElement, '123456', '12:34:56');
            nativeElement.setSelectionRange(2, 4);
            dispatchKeyboardEvent(nativeElement, 'keydown', BACKSPACE);
            nativeElement.value = '124:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:45:6');
            expect(nativeElement.selectionStart).toBe(3);
            expect(nativeElement.selectionEnd).toBe(3);

            setMask('00:-00:00');
            assertInputValue(nativeElement, '123456', '12:-34:56');
            nativeElement.setSelectionRange(2, 5);
            dispatchKeyboardEvent(nativeElement, 'keydown', BACKSPACE);
            nativeElement.value = '12:4:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:-45:6');
            expect(nativeElement.selectionStart).toBe(4);
            expect(nativeElement.selectionEnd).toBe(4);
        });

        it('deletes marked row of characters (with character pressed)', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');

            // mark characters between two separators
            nativeElement.setSelectionRange(3, 5);
            dispatchKeyboardEvent(nativeElement, 'keydown', NINE);
            nativeElement.value = '12:9:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:95:6');
            expect(nativeElement.selectionStart).toBe(4);
            expect(nativeElement.selectionEnd).toBe(4);

            // separator contained in marked characters
            assertInputValue(nativeElement, '123456', '12:34:56');
            nativeElement.setSelectionRange(2, 5);
            dispatchKeyboardEvent(nativeElement, 'keydown', EIGHT);
            nativeElement.value = '12:8:6';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:86:');
            expect(nativeElement.selectionStart).toBe(4);
            expect(nativeElement.selectionEnd).toBe(4);
        });

        it('removes last character on backspace if separator', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '1234', '12:34:');

            nativeElement.setSelectionRange(6, 6);
            const keydownEvent = createKeyboardEvent('keydown', BACKSPACE);
            const spy = spyOn(keydownEvent, 'preventDefault');
            nativeElement.dispatchEvent(keydownEvent);
            fixture.detectChanges();

            expect(nativeElement.selectionStart).toBe(5);
            expect(nativeElement.selectionEnd).toBe(5);
            expect(nativeElement.value).toBe('12:34');
            expect(spy).toHaveBeenCalled();
        });

        it('removes last character on delete if separator', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '1234', '12:34:');

            nativeElement.setSelectionRange(5, 5);
            const keydownEvent = createKeyboardEvent('keydown', DELETE);
            const spy = spyOn(keydownEvent, 'preventDefault');
            nativeElement.dispatchEvent(keydownEvent);
            fixture.detectChanges();

            expect(nativeElement.selectionStart).toBe(5);
            expect(nativeElement.selectionEnd).toBe(5);
            expect(nativeElement.value).toBe('12:34');
            expect(spy).toHaveBeenCalled();
        });

        it('entering separator', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');

            nativeElement.setSelectionRange(2, 2);
            dispatchKeyboardEvent(nativeElement, 'keydown', SEMICOLON);
            nativeElement.value = '12::34:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('12:34:56');
            expect(nativeElement.selectionStart).toBe(3);
            expect(nativeElement.selectionEnd).toBe(3);
        });

        it('pasting something', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123', '12:3');

            let data = new DataTransfer();
            data.items.add('123', 'text/plain');
            let pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(1, 1);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = '11232:3';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('11:23:23');
            expect(nativeElement.selectionStart).toBe(6);
            expect(nativeElement.selectionEnd).toBe(6);

            assertInputValue(nativeElement, '123', '12:3');
            data = new DataTransfer();
            data.items.add('12ab3', 'text/plain');
            pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(1, 1);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = '11232:3';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('11:23:23');
            expect(nativeElement.selectionStart).toBe(6);
            expect(nativeElement.selectionEnd).toBe(6);
        });

        it('does not paste if input is filled up', () => {
            createTestComponent(BasicMaskComponent);
            setMask('00:00:00');
            assertInputValue(nativeElement, '123456', '12:34:56');

            const data = new DataTransfer();
            data.items.add('123', 'text/plain');
            const pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            const spy = spyOn(pasteEvent, 'preventDefault');
            nativeElement.setSelectionRange(3, 3);
            nativeElement.dispatchEvent(pasteEvent);
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledTimes(1);

            // try with selectionStart !== selectionEnd
            nativeElement.setSelectionRange(3, 5);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = '12:123:56';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(spy).toHaveBeenCalledTimes(1); // eventDefault is NOT called again
            expect(nativeElement.value).toBe('12:12:56');
            expect(nativeElement.selectionStart).toBe(6);
            expect(nativeElement.selectionEnd).toBe(6);
        });
    });

    describe('case-sensitivity', () => {
        it('should not change case if none set', () => {
            createTestComponent(BasicMaskComponent);
            setMask('AAAA');
            assertInputValue(nativeElement, 'TeSt', 'TeSt');
        });

        it('should change the user input', () => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('AAAA');

            testInstance.convertTo = 'lower';
            fixture.detectChanges();
            assertInputValue(nativeElement, 'TEST', 'test');
            expect(testInstance.modelVal).toBe('test');

            // testInstance.convertTo = 'upper';
            // fixture.detectChanges();
            // assertInputValue(nativeElement, 'test', 'TEST');
            // expect(testInstance.modelVal).toBe('TEST');

            // testInstance.convertTo = '';
            // fixture.detectChanges();
            // assertInputValue(nativeElement, 'TeSt', 'TeSt');
            // expect(testInstance.modelVal).toBe('TeSt');
        });

        it('should not change case if deactivateMask set', () => {
            createTestComponent(ConfigurableMaskComponent);
            setMask('AAAA');
            testInstance.convertTo = 'lower';
            testInstance.deactivateMask = true;
            fixture.detectChanges();
            assertInputValue(nativeElement, 'TeSt', 'TeSt');
            expect(testInstance.modelVal).toBe('TeSt');
        });
    });

    it('should update value on convertTo change', () => {
        createTestComponent(ConfigurableMaskComponent);
        setMask('AAAA');

        assertInputValue(nativeElement, 'TeSt', 'TeSt');

        testInstance.convertTo = 'upper';
        fixture.detectChanges();
        expect(nativeElement.value).toBe('TEST');
    });

    describe('test programmatic functions', () => {
        it('should not call onChange on setMask() call', () => {
            createTestComponent(HookedMaskComponent);

            const component = fixture.componentInstance as HookedMaskComponent;
            testInstance.mask = 'A';
            fixture.detectChanges();
            expect(testInstance.maskInstance.mask).toBe('A');

            const spy = spyOn(component, 'customOnChange');
            maskInstance.registerOnChange(component.customOnChange);

            testInstance.maskInstance.setMask('0');
            fixture.detectChanges();
            expect(testInstance.maskInstance.mask).toBe('0');
            expect(spy).toHaveBeenCalledTimes(0);
        });
    });

    describe('hooks', () => {
        it('should register afterInputHook', () => {
            createTestComponent(HookedMaskComponent);
            setMask('A');

            const component = fixture.componentInstance as HookedMaskComponent;
            const spy = spyOn(component, 'customInputHook');
            maskInstance.registerAfterInputHook(component.customInputHook);

            assertInputValue(nativeElement, '1', '1');
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should register beforeInputHook', () => {
            createTestComponent(HookedMaskComponent);
            setMask('A');

            const component = fixture.componentInstance as HookedMaskComponent;
            const spy = spyOn(component, 'customPasteHook');
            maskInstance.registerBeforePasteHook(component.customPasteHook);

            const data = new DataTransfer();
            data.items.add('1', 'text/plain');
            const pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(1, 1);
            nativeElement.dispatchEvent(pasteEvent);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});

@Component({
    template: `<input [nxMask]="mask" />`,
})
class BasicMaskComponent extends MaskTest {}

@Component({
    template: `
        <input
            [nxMask]="mask"
            [separators]="separators"
            [dropSpecialCharacters]="dropSpecialCharacters"
            [validateMask]="validateMask"
            [nxConvertTo]="convertTo"
            [deactivateMask]="deactivateMask"
            [(ngModel)]="modelVal"
        />
    `,
})
class ConfigurableMaskComponent extends MaskTest {}

@Component({
    template: `
        <form [formGroup]="testForm">
            <input [nxMask]="mask" formControlName="maskInput" [validateMask]="validateMask" [deactivateMask]="deactivateMask" />
        </form>
    `,
})
class ValidationMaskComponent extends MaskTest {}

@Component({
    template: ` <input [nxMask]="mask" [(ngModel)]="modelVal" [deactivateMask]="true" /> `,
})
class PresetDeactiveMaskComponent extends MaskTest {
    modelVal = 'AAAA';
}

@Component({
    template: ` <input [nxMask]="mask" [(ngModel)]="modelVal" /> `,
})
class NgModelMask extends MaskTest {
    modelVal = 'AAAA';
    mask = 'AAAA';
}

@Component({
    template: `<input [nxMask]="mask" [separators]="separators" />`,
})
class HookedMaskComponent extends MaskTest {
    customInputHook = () => {};
    customPasteHook = () => {};
    customOnChange = () => {};
}
