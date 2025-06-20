import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NxErrorComponent } from '@aposin/ng-aquila/base';

import { NxAbstractControl } from '../shared';
import { NxCheckboxChangeEvent, NxCheckboxComponent } from './checkbox.component';
import { NxCheckboxModule } from './checkbox.module';

@Directive({ standalone: true })
abstract class CheckboxTest {
    @ViewChild(NxCheckboxComponent) checkboxInstance!: NxCheckboxComponent;
    checked = false;
    indeterminate = false;
    testForm!: FormGroup;
    labelSize!: string;
    disabled = false;
    negative = false;
    readonly = false;
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
        // expect(testInstance.checked).toBe(checked);
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
            imports: [
                NxCheckboxModule,
                FormsModule,
                ReactiveFormsModule,
                BasicCheckbox,
                LabellessCheckbox,
                CheckboxTemplateDriven,
                CheckboxDisabled,
                ReactiveCheckbox,
                CheckboxLabelSize,
                CheckboxOnPush,
                CheckboxNegative,
                CheckboxA11y,
                CheckboxConfigurable,
            ],
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

    it('can be set to readonly', () => {
        createTestComponent(CheckboxConfigurable);
        testInstance.readonly = true;
        fixture.detectChanges();
        // expect is-readonly class
        expect(checkboxNativeElement).toHaveClass('is-readonly');
        expect(inputElement).toHaveClass('is-readonly');
        expect(inputElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('cannot be toggled when readonly', () => {
        createTestComponent(CheckboxConfigurable);
        testInstance.readonly = true;
        fixture.detectChanges();
        labelElement.click();
        fixture.detectChanges();
        expect(testInstance.checkboxInstance.checked).toBeFalse();
        expect(inputElement.checked).toBeFalse();
    });

    it('should prevent default on click when readonly', () => {
        createTestComponent(CheckboxConfigurable);
        testInstance.readonly = true;
        fixture.detectChanges();
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        inputElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(inputElement.checked).toBeFalse();
        expect(event.defaultPrevented).toBeTrue();
    });

    it('can be set to readonly programmatically via NxAbstractControl', () => {
        createTestComponent(AbstractControlCheckbox);
        (testInstance as AbstractControlCheckbox).checkboxControl.setReadonly(true);
        fixture.detectChanges();
        expect(checkboxNativeElement).toHaveClass('is-readonly');
        expect(inputElement).toHaveClass('is-readonly');
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

    it('should set can-hover class', () => {
        createTestComponent(CheckboxConfigurable);
        expect(checkboxNativeElement).toHaveClass('can-hover');
        testInstance.disabled = true;
        fixture.detectChanges();
        expect(checkboxNativeElement).not.toHaveClass('can-hover');
        testInstance.disabled = false;
        testInstance.readonly = true;
        expect(checkboxNativeElement).not.toHaveClass('can-hover');
        testInstance.readonly = false;
        testInstance.negative = true;
        expect(checkboxNativeElement).not.toHaveClass('can-hover');
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

    it('should not preventDefault on click', () => {
        createTestComponent(BasicCheckbox);

        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        inputElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(inputElement.checked).toBeTrue();
        expect(event.defaultPrevented).toBeFalse();
    });

    it('toggles the checked state based on user actions', () => {
        createTestComponent(BasicCheckbox);
        assertChecked(false);
        assertIndeterminate(false);

        labelElement.click();
        assertChecked(true);
        assertIndeterminate(false);

        labelElement.click();
        assertChecked(false);
        assertIndeterminate(false);
    });

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
        expect(checkboxNativeElement.querySelector('.nx-checkbox__input')).toEqual(_getFocusedElementPierceShadowDom());
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

        it('has no accessibility violations with readonly', async () => {
            createTestComponent(CheckboxConfigurable);
            testInstance.readonly = true;
            fixture.detectChanges();
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('should set aria-label, aria-labelledBy', async () => {
            createTestComponent(CheckboxA11y);

            expect(inputElement.getAttribute('aria-label')).toBeFalsy();
            expect(inputElement.getAttribute('aria-labelledby')).toBeFalsy();

            (fixture as ComponentFixture<CheckboxA11y>).componentInstance.ariaLabel = 'label';
            (fixture as ComponentFixture<CheckboxA11y>).componentInstance.ariaLabelledBy = 'labelBy';
            fixture.detectChanges();

            expect(inputElement.getAttribute('aria-label')).toBe('label');
            expect(inputElement.getAttribute('aria-labelledby')).toBe('labelBy');
        });

        it('should set aria-describedby', () => {
            createTestComponent(ReactiveCheckbox);
            checkboxInstance.ngControl!.control!.markAsTouched();
            fixture.detectChanges();
            const errorId = (testInstance as ReactiveCheckbox).error?.id;

            expect(inputElement.getAttribute('aria-describedby')).toBe(errorId);
        });
    });
});

@Component({
    template: `<nx-checkbox [(checked)]="checked" [(indeterminate)]="indeterminate">Hello NX</nx-checkbox>`,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
})
class BasicCheckbox extends CheckboxTest {}

@Component({
    template: `<nx-checkbox></nx-checkbox>`,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
})
class LabellessCheckbox extends CheckboxTest {}

@Component({
    template: `<nx-checkbox disabled="true">Label</nx-checkbox>`,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
})
class CheckboxDisabled extends CheckboxTest {}
@Component({
    template: `<nx-checkbox [labelSize]="labelSize">Label</nx-checkbox>`,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
})
class CheckboxLabelSize extends CheckboxTest {}

@Component({
    template: `<nx-checkbox [disabled]="disabled" [readonly]="readonly" [negative]="negative" [labelSize]="labelSize">Label</nx-checkbox>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
})
class CheckboxOnPush extends CheckboxTest {}

@Component({
    template: `<nx-checkbox>Label</nx-checkbox>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
})
class AbstractControlCheckbox extends CheckboxTest {
    @ViewChild(NxAbstractControl) checkboxControl!: NxAbstractControl;
}

@Component({
    template: `<nx-checkbox [disabled]="disabled" [readonly]="readonly" [negative]="negative" [labelSize]="labelSize">Label</nx-checkbox>`,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
})
class CheckboxConfigurable extends CheckboxTest {}

@Component({
    template: `<nx-checkbox [(ngModel)]="checked" [required]="required"></nx-checkbox>`,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
})
class CheckboxTemplateDriven extends CheckboxTest {
    required = false;
}

@Component({
    template: `<nx-checkbox [ariaLabel]="ariaLabel" [ariaLabelledBy]="ariaLabelledBy"></nx-checkbox>`,
    imports: [NxCheckboxModule],
})
class CheckboxA11y extends CheckboxTest {
    ariaLabel: string | null = null;
    ariaLabelledBy: string | null = null;
}

@Component({
    template: `<nx-checkbox [negative]="negative"></nx-checkbox>`,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule],
})
class CheckboxNegative extends CheckboxTest {}

@Component({
    template: `
        <form [formGroup]="testForm">
            <nx-checkbox formControlName="checkbox">
                Hello NX
                <nx-error>This is error</nx-error>
            </nx-checkbox>
            <button nxButton="primary small" type="submit" id="submit-button">Click</button>
        </form>
    `,
    imports: [NxCheckboxModule, FormsModule, ReactiveFormsModule, NxErrorComponent],
})
class ReactiveCheckbox extends CheckboxTest {
    @ViewChild(NxErrorComponent) error!: NxErrorComponent;

    fb;
    constructor() {
        super();

        this.fb = new FormBuilder();

        this.testForm = this.fb.group({
            checkbox: new FormControl({ value: false, disabled: false }, { validators: Validators.requiredTrue }),
        });
    }
}
