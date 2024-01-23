import { ChangeDetectionStrategy, Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxCheckboxChangeEvent, NxCheckboxComponent } from './checkbox.component';
import { NxCheckboxModule } from './checkbox.module';

@Directive()
abstract class CheckboxTest {
    @ViewChild(NxCheckboxComponent) checkboxInstance!: NxCheckboxComponent;

    checked = false;
    indeterminate = false;
    testForm!: FormGroup;
    labelSize!: string;
    disabled = false;
    negative = false;
}

describe('NxCheckboxComponent', () => {
    let fixture: ComponentFixture<CheckboxTest>;
    let testInstance: CheckboxTest;
    let checkboxInstance: NxCheckboxComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;

    function createTestComponent(component: Type<CheckboxTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        checkboxInstance = testInstance.checkboxInstance;
        inputElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        labelElement = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
        checkboxDebugElement = fixture.debugElement.query(By.directive(NxCheckboxComponent));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
    }

    function assertChecked(checked: boolean) {
        fixture.detectChanges();
        expect(testInstance.checked).toBe(checked);
        expect(checkboxInstance.checked).toBe(checked);
        expect(inputElement.checked).toBe(checked);
    }

    function assertIndeterminate(indeterminate: boolean) {
        fixture.detectChanges();
        expect(testInstance.indeterminate).toBe(indeterminate);
        expect(checkboxInstance.indeterminate).toBe(indeterminate);
        expect(inputElement.indeterminate).toBe(indeterminate);
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                BasicCheckbox,
                LabellessCheckbox,
                CheckboxTemplateDriven,
                CheckboxDisabled,
                ReactiveCheckbox,
                CheckboxLabelSize,
                CheckboxOnPush,
                CheckboxNegative,
            ],
            imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
        }).compileComponents();
    }));

    it('displays a checkbox with a label', () => {
        createTestComponent(BasicCheckbox);
        expect(inputElement).not.toBeNull();
        expect(labelElement).not.toBeNull();
        expect(labelElement.textContent!.trim()).not.toBe('');
        expect(labelElement.htmlFor).toBe(inputElement.id);
        expect(labelElement).toHaveClass('has-label');
    });

    it('displays a checkbox without a label', () => {
        createTestComponent(LabellessCheckbox);
        expect(inputElement).not.toBeNull();
        expect(labelElement.textContent!.trim()).toBe('');
        expect(checkboxNativeElement).not.toHaveClass('has-label');
    });

    it('renders the checkbox with a small label', () => {
        createTestComponent(BasicCheckbox);
        expect(checkboxInstance.labelSize).toBe('small');
    });

    it('sets the given label', () => {
        createTestComponent(BasicCheckbox);
        expect(labelElement.textContent!.trim()).toBe('Hello NX');
    });

    it('can be disabled', () => {
        createTestComponent(CheckboxDisabled);

        expect(inputElement.disabled).toBeTrue();
    });

    it('creates a non-negative checkbox', () => {
        createTestComponent(BasicCheckbox);
        expect(checkboxNativeElement).not.toHaveClass('nx-checkbox--negative');
    });

    it('updates on [negative] change', () => {
        createTestComponent(CheckboxNegative);
        expect(checkboxNativeElement).not.toHaveClass('nx-checkbox--negative');

        fixture.componentInstance.negative = true;
        fixture.detectChanges();
        expect(checkboxInstance.negative).toBeTrue();
        expect(checkboxNativeElement).toHaveClass('nx-checkbox--negative');

        fixture.componentInstance.negative = false;
        fixture.detectChanges();
        expect(checkboxInstance.negative).toBeFalse();
        expect(checkboxNativeElement).not.toHaveClass('nx-checkbox--negative');
    });

    it('toggles the checked state based on [checked] input', () => {
        createTestComponent(BasicCheckbox);
        assertChecked(false);
        assertIndeterminate(false);
        fixture.componentInstance.checked = true;
        assertChecked(true);
        assertIndeterminate(false);
    });

    it('toggles the indeterminate state based on [indeterminate] input', () => {
        createTestComponent(BasicCheckbox);
        assertChecked(false);
        assertIndeterminate(false);
        fixture.componentInstance.indeterminate = true;
        assertChecked(false);
        assertIndeterminate(true);
    });

    it('emits proper change event objects on checkbox checked change', fakeAsync(() => {
        createTestComponent(BasicCheckbox);

        spyOn(checkboxInstance.checkedChange, 'emit');
        const spy = jasmine.createSpy('checkbox selection spy');
        const subscription = fixture.componentInstance.checkboxInstance.checkboxChange.subscribe(spy);
        labelElement.click();
        fixture.detectChanges();
        flush();
        expect(spy).toHaveBeenCalledWith(jasmine.any(NxCheckboxChangeEvent));
        expect(checkboxInstance.checkedChange.emit).toHaveBeenCalledWith(true);

        subscription.unsubscribe();
    }));

    it('toggles the checked state based on user actions', fakeAsync(() => {
        createTestComponent(BasicCheckbox);
        assertChecked(false);
        assertIndeterminate(false);

        labelElement.click();
        tick();

        assertChecked(true);
        assertIndeterminate(false);

        labelElement.click();
        tick();

        assertChecked(false);
        assertIndeterminate(false);
    }));

    it('changes the label size on [labelSize] input', () => {
        createTestComponent(CheckboxLabelSize);
        fixture.componentInstance.labelSize = 'large';
        fixture.detectChanges();
        expect(checkboxInstance.labelSize).toBe('large');
        expect(checkboxNativeElement).toHaveClass('nx-checkbox--label-large');

        fixture.componentInstance.labelSize = 'small';
        fixture.detectChanges();
        expect(checkboxInstance.labelSize).toBe('small');
        expect(checkboxNativeElement).not.toHaveClass('nx-checkbox--label-large');
    });

    it('focuses the checkbox when calling focus()', () => {
        createTestComponent(BasicCheckbox);
        checkboxInstance.focus();
        expect(checkboxNativeElement.querySelector('.nx-checkbox__input')).toEqual(document.activeElement);
    });

    describe('ngModel support', () => {
        function flushAndAssertChecked(checked: boolean) {
            fixture.detectChanges();
            tick();
            assertChecked(checked);
        }

        it('toggles the checked state based on [ngModel] input', fakeAsync(() => {
            createTestComponent(CheckboxTemplateDriven);
            flushAndAssertChecked(false);
            fixture.componentInstance.checked = true;
            flushAndAssertChecked(true);
            fixture.componentInstance.checked = false;
            flushAndAssertChecked(false);
        }));

        it('should be invalid if required', () => {
            createTestComponent(CheckboxTemplateDriven);

            expect(checkboxNativeElement).toHaveClass('ng-valid');
            (fixture as ComponentFixture<CheckboxTemplateDriven>).componentInstance.required = true;
            fixture.detectChanges();
            expect(checkboxNativeElement).toHaveClass('ng-invalid');
        });
    });

    describe('programmatic tests', () => {
        it('updates view on labelSize change', () => {
            createTestComponent(CheckboxOnPush);
            checkboxInstance.labelSize = 'large';
            fixture.detectChanges();
            expect(checkboxNativeElement).toHaveClass('nx-checkbox--label-large');

            checkboxInstance.labelSize = 'small';
            fixture.detectChanges();
            expect(checkboxNativeElement).not.toHaveClass('nx-checkbox--label-large');
        });

        it('updates view on [negative] change', () => {
            createTestComponent(CheckboxOnPush);
            checkboxInstance.negative = true;
            fixture.detectChanges();
            expect(checkboxNativeElement).toHaveClass('nx-checkbox--negative');

            checkboxInstance.negative = false;
            fixture.detectChanges();
            expect(checkboxNativeElement).not.toHaveClass('nx-checkbox--negative');
        });
    });

    describe('reactive support', () => {
        // Ensures that setDisabledState is implemented correctly.
        it('accepts disabled from the form model', fakeAsync(() => {
            createTestComponent(ReactiveCheckbox);
            testInstance.testForm.controls.checkbox.disable();

            fixture.detectChanges();
            tick();

            expect(inputElement.disabled).toBeTrue();
        }));

        it('toggles error states accordingly when in a reactive form', fakeAsync(() => {
            createTestComponent(ReactiveCheckbox);
            expect(checkboxNativeElement).not.toHaveClass('has-error');
            checkboxInstance.ngControl!.control!.markAsTouched();
            fixture.detectChanges();
            flush();
            expect(checkboxNativeElement).toHaveClass('has-error');
        }));

        it('should set the control to dirty when value changes in the DOM', fakeAsync(() => {
            createTestComponent(ReactiveCheckbox);
            const submitButton = fixture.nativeElement.querySelector('#submit-button') as HTMLButtonElement;

            submitButton.click();
            tick();
            fixture.detectChanges();
            flush();

            expect(testInstance.testForm.get('checkbox')!.dirty).withContext('Expected control to start out pristine.').toBeFalse();

            labelElement.click();
            tick();
            fixture.detectChanges();
            flush();

            expect(testInstance.testForm.get('checkbox')!.dirty).withContext('Expected control to be dirty.').toBeTrue();
        }));
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicCheckbox);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-checkbox [(checked)]="checked" [(indeterminate)]="indeterminate">Hello NX</nx-checkbox>`,
})
class BasicCheckbox extends CheckboxTest {}

@Component({
    template: `<nx-checkbox></nx-checkbox>`,
})
class LabellessCheckbox extends CheckboxTest {}

@Component({
    template: `<nx-checkbox disabled="true">Label</nx-checkbox>`,
})
class CheckboxDisabled extends CheckboxTest {}
@Component({
    template: `<nx-checkbox [labelSize]="labelSize">Label</nx-checkbox>`,
})
class CheckboxLabelSize extends CheckboxTest {}

@Component({
    template: `<nx-checkbox [disabled]="disabled" [negative]="negative" [labelSize]="labelSize">Label</nx-checkbox>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class CheckboxOnPush extends CheckboxTest {}

@Component({
    template: `<nx-checkbox [(ngModel)]="checked" [required]="required"></nx-checkbox>`,
})
class CheckboxTemplateDriven extends CheckboxTest {
    required = false;
}

@Component({
    template: `<nx-checkbox [negative]="negative"></nx-checkbox>`,
})
class CheckboxNegative extends CheckboxTest {}

@Component({
    template: `
        <form [formGroup]="testForm">
            <nx-checkbox formControlName="checkbox"> Hello NX </nx-checkbox>
            <button nxButton="primary small" type="submit" id="submit-button">Click</button>
        </form>
    `,
})
class ReactiveCheckbox extends CheckboxTest {
    fb;
    constructor() {
        super();

        this.fb = new FormBuilder();

        this.testForm = this.fb.group({
            checkbox: new FormControl({ value: false, disabled: false }, { validators: Validators.requiredTrue }),
        });
    }
}
