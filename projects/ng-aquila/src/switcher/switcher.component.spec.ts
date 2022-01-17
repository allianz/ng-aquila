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

    beforeEach(
        waitForAsync(() => {
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
        }),
    );

    it('creates switcher with label', () => {
        createTestComponent(BasicSwitcher);
        expect(switcherInstance).toBeTruthy();
        expect(labelElement).not.toBeNull();
        expect(labelElement!.textContent?.trim()).toBe('basicLabel');
        expect(labelElement.getAttribute('for')).toBe(inputElement.id);
        expect(labelElement.classList).toContain('has-label');
    });

    it('creates switcher without label', () => {
        createTestComponent(LabellessSwitcher);
        expect(switcherInstance).toBeTruthy();
        expect(labelElement!.textContent!.trim()).toBe('');
        expect(labelElement.classList).not.toContain('has-label');
    });

    it('renders the switcher with a large label', () => {
        createTestComponent(BasicSwitcher);
        expect(switcherInstance.labelSize).toBe('large');
        expect(switcherNativeElement.classList).toContain('nx-switcher--large-label');
    });

    it('changes the label size on [labelSize] input', () => {
        createTestComponent(LabelSizeSwitcher);
        fixture.componentInstance.labelSize = 'small';
        fixture.detectChanges();
        expect(switcherInstance.labelSize).toBe('small');
        expect(switcherNativeElement.classList).toContain('nx-switcher--small-label');
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
        expect(switcherInstance.checked).toBe(false);

        const reactInstance = testInstance as SwitcherReactiveForm;
        reactInstance.testForm.patchValue({ reactiveSwitcher: true });
        fixture.detectChanges();
        tick();
        expect(switcherInstance.checked).toBe(true);
    }));

    it('disables the switcher when its reactive form is disabled', fakeAsync(() => {
        createTestComponent(SwitcherReactiveForm);
        const reactInstance = testInstance as SwitcherReactiveForm;

        expect(inputElement.disabled).toBe(false);
        expect(switcherInstance.disabled).toBe(false);

        reactInstance.testForm.disable();
        fixture.detectChanges();
        tick();

        expect(inputElement.disabled).toBe(true);
        expect(switcherInstance.disabled).toBe(true);
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
        expect(switcherInstance.checked).toBe(false);
        expect(inputElement.checked).toBe(false);
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
            expect(switcherNativeElement.classList.contains('is-negative')).toBe(true);
        });

        it('updates view on big change', () => {
            createTestComponent(BasicSwitcherOnPush);

            switcherInstance.big = true;
            fixture.detectChanges();
            expect(switcherNativeElement.classList.contains('is-big')).toBe(true);
        });

        it('updates view on labelSize change', () => {
            createTestComponent(BasicSwitcherOnPush);
            switcherInstance.labelSize = 'small';
            fixture.detectChanges();
            expect(switcherNativeElement.classList).toContain('nx-switcher--small-label');
            switcherInstance.labelSize = 'large';
            fixture.detectChanges();
            expect(switcherNativeElement.classList).not.toContain('nx-switcher--small-label');
        });

        it('updates view on disabled change', () => {
            createTestComponent(BasicSwitcherOnPush);

            switcherInstance.disabled = true;
            fixture.detectChanges();
            expect(switcherNativeElement.classList.contains('is-disabled')).toBe(true);
        });

        it('updates view on labelPosition value change', () => {
            createTestComponent(BasicSwitcherOnPush);
            expect(switcherNativeElement.classList.contains('is-swapped')).toBe(false);

            switcherInstance.labelPosition = 'left';
            fixture.detectChanges();
            expect(switcherNativeElement.classList.contains('is-swapped')).toBe(true);
        });

        it('updates view on checked change', () => {
            createTestComponent(BasicSwitcherOnPush);
            expect(switcherNativeElement.classList.contains('is-checked')).toBe(false);
            switcherInstance.checked = true;
            fixture.detectChanges();
            expect(switcherNativeElement.classList.contains('is-checked')).toBe(true);
        });
    });

    describe('Validation', () => {
        it('Should not show the error initially', () => {
            createTestComponent(ValidationSwitcherForm);
            const reactInstance = testInstance as ValidationSwitcherForm;
            expect(reactInstance.testForm.touched).toBe(false);
            expect(reactInstance.testForm.status).toBe('INVALID');
            expect(switcherNativeElement.classList).not.toContain('has-error');
            expect(switcherNativeElement.classList).toContain('ng-untouched');
        });

        it('Should reflect the error state', fakeAsync(() => {
            createTestComponent(ValidationSwitcherForm);
            const reactInstance = testInstance as ValidationSwitcherForm;
            assertChecked(false);
            expect(switcherNativeElement.classList).not.toContain('has-error');
            inputElement.click();
            fixture.detectChanges();
            tick();
            assertChecked(true);
            expect(reactInstance.testForm.touched).toBe(true);
            expect(reactInstance.testForm.status).toBe('VALID');
            expect(switcherNativeElement.classList).not.toContain('has-error');
            expect(switcherNativeElement.classList).toContain('ng-touched');
            inputElement.click();
            fixture.detectChanges();
            tick();
            assertChecked(false);
            expect(switcherNativeElement.classList.contains('has-error')).toBe(true);
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
    template: ` <nx-switcher [(checked)]="checked" id="testSwitcher">basicLabel</nx-switcher> `,
})
class BasicSwitcher extends SwitcherTest {}

@Component({
    template: ` <nx-switcher [(checked)]="checked" id="testSwitcher">basicLabel</nx-switcher> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicSwitcherOnPush extends SwitcherTest {}

@Component({
    template: ` <nx-switcher [(ngModel)]="checked">templateLabel</nx-switcher> `,
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
    template: ` <nx-switcher [labelSize]="labelSize" id="testSwitcher">basicLabel</nx-switcher> `,
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

    constructor(private fb: FormBuilder) {
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
    template: ` <nx-switcher [(checked)]="checked" id="testSwitcher"></nx-switcher> `,
})
class LabellessSwitcher extends SwitcherTest {}
