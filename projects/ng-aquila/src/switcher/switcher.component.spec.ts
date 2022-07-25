import { ChangeDetectionStrategy, Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxSwitcherComponent } from './switcher.component';
import { NxSwitcherModule } from './switcher.module';

@Directive()
abstract class SwitcherTest {
    @ViewChild(NxSwitcherComponent) switcherInstance!: NxSwitcherComponent;
    checked = false;
    labelSize = 'large';
}

describe('NxSwitcherComponent', () => {
    let fixture: ComponentFixture<SwitcherTest>;
    let testInstance: SwitcherTest;
    let switcherInstance: NxSwitcherComponent;
    let switcherDebugElement: DebugElement;
    let switcherNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    const createTestComponent = (component: Type<SwitcherTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        switcherInstance = testInstance.switcherInstance;
        switcherDebugElement = fixture.debugElement.query(By.directive(NxSwitcherComponent));
        switcherNativeElement = switcherDebugElement.nativeElement;
        inputElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        labelElement = switcherNativeElement.querySelector('label') as HTMLLabelElement;
    };

    const assertChecked = (checked: boolean) => {
        fixture.detectChanges();
        expect(switcherInstance.checked).toBe(checked);
        expect(inputElement.checked).toBe(checked);
        expect(inputElement.getAttribute('aria-checked')).toBe(checked.toString());
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                BasicSwitcher,
                SwitcherTemplateDriven,
                SwitcherReactiveForm,
                BasicSwitcherOnPush,
                LabelSizeSwitcher,
                ValidationSwitcherForm,
                LabellessSwitcher,
            ],
            imports: [NxSwitcherModule, FormsModule, ReactiveFormsModule],
        }).compileComponents();
    }));

    it('creates switcher with label', () => {
        createTestComponent(BasicSwitcher);
        expect(switcherInstance).toBeTruthy();
        expect(labelElement).not.toBeNull();
        expect(labelElement!.textContent?.trim()).toBe('basicLabel');
        expect(labelElement.getAttribute('for')).toBe(inputElement.id);
        expect(labelElement).toHaveClass('has-label');
    });

    it('creates switcher without label', () => {
        createTestComponent(LabellessSwitcher);
        expect(switcherInstance).toBeTruthy();
        expect(labelElement!.textContent!.trim()).toBe('');
        expect(labelElement).not.toHaveClass('has-label');
    });

    it('renders the switcher with a large label', () => {
        createTestComponent(BasicSwitcher);
        expect(switcherInstance.labelSize).toBe('large');
        expect(switcherNativeElement).toHaveClass('nx-switcher--large-label');
    });

    it('changes the label size on [labelSize] input', () => {
        createTestComponent(LabelSizeSwitcher);
        fixture.componentInstance.labelSize = 'small';
        fixture.detectChanges();
        expect(switcherInstance.labelSize).toBe('small');
        expect(switcherNativeElement).toHaveClass('nx-switcher--small-label');
    });

    it('toggles the checked state based on [checked] input', () => {
        createTestComponent(BasicSwitcher);
        assertChecked(false);
        fixture.componentInstance.checked = true;
        assertChecked(true);
    });

    it('toggles the checked state based on [ngModel] input', fakeAsync(() => {
        createTestComponent(SwitcherTemplateDriven);
        assertChecked(false);

        fixture.componentInstance.checked = true;
        fixture.detectChanges();
        tick();
        assertChecked(true);
    }));

    it('toggles the checked state based on the reactive form value', fakeAsync(() => {
        createTestComponent(SwitcherReactiveForm);
        expect(switcherInstance.checked).toBeFalse();

        const reactInstance = testInstance as SwitcherReactiveForm;
        reactInstance.testForm.patchValue({ reactiveSwitcher: true });
        fixture.detectChanges();
        tick();
        expect(switcherInstance.checked).toBeTrue();
    }));

    it('disables the switcher when its reactive form is disabled', fakeAsync(() => {
        createTestComponent(SwitcherReactiveForm);
        const reactInstance = testInstance as SwitcherReactiveForm;

        expect(inputElement.disabled).toBeFalse();
        expect(switcherInstance.disabled).toBeFalse();

        reactInstance.testForm.disable();
        fixture.detectChanges();
        tick();

        expect(inputElement.disabled).toBeTrue();
        expect(switcherInstance.disabled).toBeTrue();
    }));

    it('does not handle clicks when the switcher is disabled', fakeAsync(() => {
        createTestComponent(SwitcherReactiveForm);
        const reactInstance = testInstance as SwitcherReactiveForm;
        reactInstance.testForm.disable();
        fixture.detectChanges();
        tick();

        inputElement.click();
        fixture.detectChanges();
        tick();
        expect(switcherInstance.checked).toBeFalse();
        expect(inputElement.checked).toBeFalse();
    }));

    it('toggles on click', () => {
        createTestComponent(BasicSwitcher);
        assertChecked(false);
        inputElement.click();
        assertChecked(true);
        labelElement.click();
        assertChecked(false);
    });

    describe('programmatic change', () => {
        it('updates view on id change', () => {
            createTestComponent(BasicSwitcher);
            switcherInstance.id = 'newId';
            fixture.detectChanges();
            expect(inputElement.id).toBe('newId');
        });

        it('updates view on name change', () => {
            createTestComponent(BasicSwitcher);
            switcherInstance.name = 'newName';
            fixture.detectChanges();
            expect(inputElement.name).toBe('newName');
        });

        it('updates view on negative change', () => {
            createTestComponent(BasicSwitcherOnPush);
            switcherInstance.negative = true;
            fixture.detectChanges();
            expect(switcherNativeElement).toHaveClass('is-negative');
        });

        it('updates view on big change', () => {
            createTestComponent(BasicSwitcherOnPush);

            switcherInstance.big = true;
            fixture.detectChanges();
            expect(switcherNativeElement).toHaveClass('is-big');
        });

        it('updates view on labelSize change', () => {
            createTestComponent(BasicSwitcherOnPush);
            switcherInstance.labelSize = 'small';
            fixture.detectChanges();
            expect(switcherNativeElement).toHaveClass('nx-switcher--small-label');
            switcherInstance.labelSize = 'large';
            fixture.detectChanges();
            expect(switcherNativeElement).not.toHaveClass('nx-switcher--small-label');
        });

        it('updates view on disabled change', () => {
            createTestComponent(BasicSwitcherOnPush);

            switcherInstance.disabled = true;
            fixture.detectChanges();
            expect(switcherNativeElement).toHaveClass('is-disabled');
        });

        it('updates view on labelPosition value change', () => {
            createTestComponent(BasicSwitcherOnPush);
            expect(switcherNativeElement).not.toHaveClass('is-swapped');

            switcherInstance.labelPosition = 'left';
            fixture.detectChanges();
            expect(switcherNativeElement).toHaveClass('is-swapped');
        });

        it('updates view on checked change', () => {
            createTestComponent(BasicSwitcherOnPush);
            expect(switcherNativeElement).not.toHaveClass('is-checked');
            switcherInstance.checked = true;
            fixture.detectChanges();
            expect(switcherNativeElement).toHaveClass('is-checked');
        });
    });

    describe('Validation', () => {
        it('Should not show the error initially', () => {
            createTestComponent(ValidationSwitcherForm);
            const reactInstance = testInstance as ValidationSwitcherForm;
            expect(reactInstance.testForm.touched).toBeFalse();
            expect(reactInstance.testForm.status).toBe('INVALID');
            expect(switcherNativeElement).not.toHaveClass('has-error');
            expect(switcherNativeElement).toHaveClass('ng-untouched');
        });

        it('Should reflect the error state', fakeAsync(() => {
            createTestComponent(ValidationSwitcherForm);
            const reactInstance = testInstance as ValidationSwitcherForm;
            assertChecked(false);
            expect(switcherNativeElement).not.toHaveClass('has-error');
            inputElement.click();
            fixture.detectChanges();
            tick();
            assertChecked(true);
            expect(reactInstance.testForm.touched).toBeTrue();
            expect(reactInstance.testForm.status).toBe('VALID');
            expect(switcherNativeElement).not.toHaveClass('has-error');
            expect(switcherNativeElement).toHaveClass('ng-touched');
            inputElement.click();
            fixture.detectChanges();
            tick();
            assertChecked(false);
            expect(switcherNativeElement).toHaveClass('has-error');
        }));
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicSwitcher);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-switcher [(checked)]="checked" id="testSwitcher">basicLabel</nx-switcher>`,
})
class BasicSwitcher extends SwitcherTest {}

@Component({
    template: `<nx-switcher [(checked)]="checked" id="testSwitcher">basicLabel</nx-switcher>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicSwitcherOnPush extends SwitcherTest {}

@Component({
    template: `<nx-switcher [(ngModel)]="checked">templateLabel</nx-switcher>`,
})
class SwitcherTemplateDriven extends SwitcherTest {}

@Component({
    template: `
        <form [formGroup]="testForm">
            <nx-switcher formControlName="reactiveSwitcher"> switcher </nx-switcher>
        </form>
    `,
})
class SwitcherReactiveForm extends SwitcherTest {
    testForm = new FormBuilder().group({
        reactiveSwitcher: new FormControl({ value: false, disabled: false }, { validators: Validators.required }),
    });
}

@Component({
    template: `<nx-switcher [labelSize]="labelSize" id="testSwitcher">basicLabel</nx-switcher>`,
})
class LabelSizeSwitcher extends SwitcherTest {}

@Component({
    template: `
        <form [formGroup]="testForm">
            <nx-switcher formControlName="switcherValidationTestReactive"> switcher </nx-switcher>
        </form>
    `,
})
class ValidationSwitcherForm extends SwitcherTest {
    testForm!: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        super();
        this.createForm();
    }

    createForm() {
        this.testForm = this.fb.group({
            switcherValidationTestReactive: [false, Validators.requiredTrue],
        });
    }
}

@Component({
    template: `<nx-switcher [(checked)]="checked" id="testSwitcher"></nx-switcher>`,
})
class LabellessSwitcher extends SwitcherTest {}
