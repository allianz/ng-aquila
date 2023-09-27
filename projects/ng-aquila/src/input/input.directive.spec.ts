import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NxInputDirective, NxInputModule } from '@aposin/ng-aquila/input';

import { createFakeEvent } from '../cdk-test-utils';

@Directive()
abstract class InputTest {
    @ViewChild(NxInputDirective) inputInstance!: NxInputDirective;
    type = 'text';
    required = false;
    disabled = false;
    readonly = false;
    currentValue: any;
    formControl: any;
    floatLabel: any;
    appearance: any;
    placeholderText!: string;
}

describe('NxInputDirective', () => {
    let fixture: ComponentFixture<InputTest>;
    let testInstance: InputTest;
    let inputInstance: NxInputDirective;
    let nativeElement: HTMLInputElement | HTMLTextAreaElement;

    function createTestComponent(component: Type<InputTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        inputInstance = testInstance.inputInstance;
        nativeElement = fixture.nativeElement.querySelector('.c-input');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                BasicInput,
                BasicTextarea,
                TypedAndRequiredInput,
                RequiredInput,
                NgModelInput,
                BasicInputWithFormControl,
                BasicInputWithRequiredFormControl,
                ConfigurableInput,
                InputWithLabelAndPlaceholder,
                NoChangeDetectionInput,
            ],
            imports: [FormsModule, NxInputModule, ReactiveFormsModule],
        }).compileComponents();
    }));

    it('creates the Input', waitForAsync(() => {
        createTestComponent(BasicInput);
        expect(inputInstance).toBeTruthy();
    }));

    it('default includes the bem block element', waitForAsync(() => {
        createTestComponent(BasicInput);
        expect(nativeElement).toHaveClass('c-input');
    }));

    it('should add a class to the form field', fakeAsync(() => {
        createTestComponent(BasicInput);
        fixture.detectChanges();
        tick();
        const formField = fixture.debugElement.query(By.css('.nx-formfield')).nativeElement;

        expect(formField).toHaveClass('nx-formfield--type-nx-input');
    }));

    it('defaults to type text', waitForAsync(() => {
        createTestComponent(BasicInput);
        expect(nativeElement.type).toBe('text');
    }));

    it('reject forbidden types', fakeAsync(() => {
        expect(() => {
            createTestComponent(TypedAndRequiredInput);
            testInstance.type = 'button';

            fixture.detectChanges();
            tick();
        }).toThrowError("Input of type 'button' is not supported");
    }));

    it('recognizes never empty inputs like date', fakeAsync(() => {
        createTestComponent(TypedAndRequiredInput);
        testInstance.type = 'date';

        fixture.detectChanges();
        tick();

        expect(inputInstance.empty).toBeFalsy();
    }));

    describe('Autofillmonitor', () => {
        it('should autofill monitor input field', fakeAsync(() => {
            createTestComponent(BasicInput);
            const autofillTriggerEvent: any = createFakeEvent('animationstart');
            autofillTriggerEvent.animationName = 'cdk-text-field-autofill-start';
            // Dispatch an "animationstart" event on the input to trigger the
            // autofill monitor.
            nativeElement.dispatchEvent(autofillTriggerEvent);
            fixture.detectChanges();
            tick();
            expect(nativeElement).toHaveClass('cdk-text-field-autofilled');
            expect(nativeElement).toHaveClass('is-filled');
        }));
    });

    describe('ngModel', () => {
        it('recognize and assign ngControl', fakeAsync(() => {
            createTestComponent(NgModelInput);

            fixture.detectChanges();
            tick();

            expect(inputInstance.ngControl).toBeDefined();
        }));

        it('reflect ngModel errors', fakeAsync(() => {
            createTestComponent(NgModelInput);
            inputInstance.ngControl!.control!.markAsTouched();

            fixture.detectChanges();
            tick();

            expect(inputInstance.errorState).toBeTruthy();
        }));

        it('ngModel respects change detection trigger', fakeAsync(() => {
            createTestComponent(NgModelInput);
            const input = nativeElement;
            input.focus();
            input.value = '';
            input.dispatchEvent(new Event('input'));

            fixture.detectChanges();
            tick();
            expect(inputInstance.errorState).toBeFalsy();

            input.blur();
            fixture.detectChanges();
            tick();
            expect(inputInstance.errorState).toBeTruthy();
        }));
    });

    describe('Textarea', () => {
        it('is working with nxInput', waitForAsync(() => {
            createTestComponent(BasicTextarea);
            expect(inputInstance).toBeTruthy();
        }));

        it('should add a class to the form field', fakeAsync(() => {
            createTestComponent(BasicTextarea);
            fixture.detectChanges();
            tick();
            const formField = fixture.debugElement.query(By.css('.nx-formfield')).nativeElement;
            expect(formField).toHaveClass('nx-formfield--type-textarea');
        }));
    });

    describe('native behaviours', () => {
        it('should forward the disabled state to the native element', () => {
            createTestComponent(ConfigurableInput);
            fixture.detectChanges();
            expect(nativeElement.disabled).toBeFalse();

            testInstance.disabled = true;
            fixture.detectChanges();
            expect(nativeElement.disabled).toBeTrue();
        });

        it('should forward the required state to the native element', () => {
            createTestComponent(ConfigurableInput);
            fixture.detectChanges();
            expect(nativeElement.required).toBeFalse();

            testInstance.required = true;
            fixture.detectChanges();
            expect(nativeElement.required).toBeTrue();
        });

        it('should forward the readonly state to the native element', () => {
            createTestComponent(ConfigurableInput);
            fixture.detectChanges();
            expect(nativeElement.readOnly).toBeFalse();

            testInstance.readonly = true;
            fixture.detectChanges();
            expect(nativeElement.readOnly).toBeTrue();
        });
    });

    describe('readonly', () => {
        it('notifies formfield about state changes', () => {
            createTestComponent(BasicInput);
            const spy = jasmine.createSpy('stateChangesSpy');
            const subscription = inputInstance.stateChanges.subscribe(spy);
            inputInstance.readonly = true;
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });

        it('should reflect readonly state when setReadonly changed', () => {
            createTestComponent(BasicInput);
            const container = fixture.debugElement.query(By.css('nx-formfield'))!.nativeElement;

            inputInstance.setReadonly(true);
            fixture.detectChanges();
            expect(container).toHaveClass('is-readonly');

            inputInstance.setReadonly(false);
            fixture.detectChanges();
            expect(container).not.toHaveClass('is-readonly');
        });
    });

    describe('formControl', () => {
        it('should update when the form field value is patched without emitting', fakeAsync(() => {
            createTestComponent(BasicInputWithFormControl);
            spyOn(fixture.componentInstance.inputInstance.stateChanges, 'next');
            fixture.componentInstance.formControl.patchValue('value', { emitEvent: false });
            fixture.detectChanges();
            tick();
            expect(fixture.componentInstance.inputInstance.stateChanges.next).toHaveBeenCalled();
        }));
    });

    describe('placeholder', () => {
        it('should show the native placeholder with nxFloatLabel set to true', () => {
            createTestComponent(InputWithLabelAndPlaceholder);
            fixture.detectChanges();

            const container = fixture.debugElement.query(By.css('nx-formfield'))!.nativeElement;
            const label = fixture.debugElement.query(By.css('.nx-formfield__label'))!.nativeElement;
            const input = fixture.debugElement.query(By.css('input'))!.nativeElement;

            testInstance.placeholderText = 'This is a placeholder';

            fixture.detectChanges();

            expect(container).toHaveClass('is-floating');
            expect(label.textContent.trim()).toBe('Label');
            expect(input.getAttribute('placeholder')).toBe('This is a placeholder');

            input.value = 'Value';
            fixture.detectChanges();

            expect(input.getAttribute('placeholder')).toBeFalsy();
            expect(container).toHaveClass('is-floating');
        });

        it('should show the native placeholder when using an outline', () => {
            createTestComponent(InputWithLabelAndPlaceholder);
            fixture.detectChanges();

            const container = fixture.debugElement.query(By.css('nx-formfield'))!.nativeElement;
            const label = fixture.debugElement.query(By.css('.nx-formfield__label'))!.nativeElement;
            const input = fixture.debugElement.query(By.css('input'))!.nativeElement;

            testInstance.placeholderText = 'This is a placeholder';
            testInstance.appearance = 'outline';
            testInstance.floatLabel = 'always';

            fixture.detectChanges();

            expect(container).toHaveClass('is-floating');
            expect(label.textContent.trim()).toBe('Label');
            expect(input.getAttribute('placeholder')).toBe('This is a placeholder');

            input.value = 'Value';
            fixture.detectChanges();

            expect(input.getAttribute('placeholder')).toBeFalsy();
            expect(container).toHaveClass('is-floating');
        });

        it('should always show the native placeholder when floatLabel is set to "always"', () => {
            createTestComponent(InputWithLabelAndPlaceholder);

            testInstance.floatLabel = 'always';
            testInstance.placeholderText = 'This is a placeholder';

            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('input'))!.nativeElement;
            expect(input.getAttribute('placeholder')).toBe('This is a placeholder');
        });

        it('should not add the `placeholder` attribute if there is no placeholder', () => {
            createTestComponent(InputWithLabelAndPlaceholder);
            fixture.detectChanges();
            const input = fixture.debugElement.query(By.css('input'))!.nativeElement;

            expect(input.hasAttribute('placeholder')).toBeFalse();
        });
    });

    describe('a11y', () => {
        it('sets aria-required', waitForAsync(() => {
            createTestComponent(RequiredInput);
            const ariaRequired = nativeElement.attributes.getNamedItem('aria-required')!.value;

            expect(ariaRequired).toBe('true');
        }));

        it('sets aria-required when form control is required', waitForAsync(() => {
            createTestComponent(BasicInputWithRequiredFormControl);
            const ariaRequired = nativeElement.attributes.getNamedItem('aria-required')!.value;

            expect(ariaRequired).toBe('true');
        }));

        it('sets aria-invalid', fakeAsync(() => {
            createTestComponent(NgModelInput);
            inputInstance.ngControl!.control!.markAsTouched();

            fixture.detectChanges();
            tick();

            const ariaInvalid = nativeElement.attributes.getNamedItem('aria-invalid')!.value;
            expect(ariaInvalid).toBe('true');
        }));

        it('can set aria-label', fakeAsync(() => {
            createTestComponent(BasicInput);
            inputInstance.setAriaLabel('custom label');

            fixture.detectChanges();
            tick();

            const label = nativeElement.attributes.getNamedItem('aria-label')!.value;
            expect(label).toBe('custom label');
        }));
    });
});

@Component({
    template: `
        <nx-formfield label="Input">
            <input nxInput />
        </nx-formfield>
    `,
})
class BasicInput extends InputTest {}

@Component({
    template: `<input nxInput [type]="type" />`,
})
class TypedAndRequiredInput extends InputTest {}

@Component({
    template: `<input nxInput required />`,
})
class RequiredInput extends InputTest {}

@Component({
    template: `<input nxInput [(ngModel)]="currentValue" required />`,
})
class NgModelInput extends InputTest {}

@Component({
    template: `<input nxInput [(ngModel)]="currentValue" required [updateOn]="blur" />`,
})
class NoChangeDetectionInput extends InputTest {}

@Component({
    template: `
        <nx-formfield label="Textarea">
            <textarea nxInput></textarea>
        </nx-formfield>
    `,
})
class BasicTextarea extends InputTest {}

@Component({
    template: `
        <nx-formfield label="Label">
            <input nxInput [formControl]="formControl" />
        </nx-formfield>
    `,
})
class BasicInputWithFormControl extends InputTest {
    formControl = new FormControl('');
}

@Component({
    template: `
        <nx-formfield label="Label">
            <input nxInput [formControl]="formControl" />
        </nx-formfield>
    `,
})
class BasicInputWithRequiredFormControl extends InputTest {
    formControl = new FormControl('', Validators.required);
}

@Component({
    template: `<input nxInput [required]="required" [disabled]="disabled" [readonly]="readonly" />`,
})
class ConfigurableInput extends InputTest {}

@Component({
    template: `
        <nx-formfield label="Label" [floatLabel]="floatLabel" [appearance]="appearance">
            <input nxInput [placeholder]="placeholderText" />
        </nx-formfield>
    `,
})
class InputWithLabelAndPlaceholder extends InputTest {
    floatLabel = 'auto';
    appearance = 'auto';
    placeholderText = '';
}
