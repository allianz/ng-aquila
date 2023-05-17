import { ChangeDetectionStrategy, Component, DebugElement, Directive, Injectable, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxNumberStepperComponent } from './number-stepper.component';
import { NxNumberStepperModule } from './number-stepper.module';
import { NxNumberStepperIntl } from './number-stepper-intl';

@Injectable()
class MyIntl extends NxNumberStepperIntl {
    decrementAriaLabel = 'verringern';
    incrementAriaLabel = 'erhöhen';
}

@Directive()
abstract class NumberStepperTest {
    value = 0;
    min = 0;
    max = 2;
    step = 1;
    negative = false;
    leadingZero = true;
    disabled = false;
    inputAriaLabel = 'input label';
    incrementAriaLabel = 'increase number';
    decrementAriaLabel = 'decrease number';
    readonlyInput = false;
    testForm: FormGroup = new FormBuilder().group({ stepper: 3 });
    @ViewChild(NxNumberStepperComponent) stepperInstance!: NxNumberStepperComponent;

    onSubmit() {}
}

describe('NxNumberStepperComponent', () => {
    let fixture: ComponentFixture<NumberStepperTest>;
    let testInstance: NumberStepperTest;
    let stepperInstance: NxNumberStepperComponent;
    let upButton: HTMLButtonElement;
    let downButton: HTMLButtonElement;
    let inputElement: HTMLInputElement;
    let label: HTMLLabelElement;
    let stepperDebugElement: DebugElement;
    let stepperNativeElement: HTMLElement;

    function createTestComponent(component: Type<NumberStepperTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        stepperInstance = testInstance.stepperInstance;
        upButton = fixture.nativeElement.querySelector('button.nx-stepper__up') as HTMLButtonElement;
        downButton = fixture.nativeElement.querySelector('button.nx-stepper__down') as HTMLButtonElement;
        inputElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
        stepperDebugElement = fixture.debugElement.query(By.directive(NxNumberStepperComponent));
        stepperNativeElement = stepperDebugElement.nativeElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxNumberStepperModule, FormsModule, ReactiveFormsModule],
            providers: [{ provide: NxNumberStepperIntl, useClass: MyIntl }],
            declarations: [
                BasicStepper,
                SimpleBindingStepper,
                ConfigurableStepper,
                NgModelStepper,
                ResizeOnInitTest,
                StepperOnPush,
                ResizeOnInitTestOnPush,
                DirectivesStepper,
                ReactiveFormStepper,
                ReactiveFormOnBlurStepper,
                DisableableStepper,
            ],
        }).compileComponents();
    }));

    function clickUp() {
        upButton.click();
        fixture.detectChanges();
        tick();
    }

    function clickDown() {
        downButton.click();
        fixture.detectChanges();
        tick();
    }

    function assertInputValue(value: any) {
        expect(inputElement.value).toBe(value);
    }

    describe('basic number stepper', () => {
        it('should have up and down buttons and an input', () => {
            createTestComponent(BasicStepper);
            expect(upButton).not.toBeNull();
            expect(downButton).not.toBeNull();
        });

        it('default includes the bem block element', () => {
            createTestComponent(BasicStepper);
            expect(stepperDebugElement.nativeElement).toHaveClass('nx-stepper');
        });

        it('should have a label', () => {
            createTestComponent(BasicStepper);
            expect(label).not.toBeNull();
        });

        it('should count up by 1 by default', fakeAsync(() => {
            createTestComponent(BasicStepper);
            clickUp();
            expect(stepperInstance.value).toBe(1);
            assertInputValue('01');
        }));

        it('should have min = 0 by default and not decrement', fakeAsync(() => {
            createTestComponent(BasicStepper);
            clickDown();
            expect(downButton.disabled).toBeTrue();
            expect(stepperInstance.value).toBe(0);
            assertInputValue('00');
        }));

        it('should create a non-negative number-stepper', () => {
            createTestComponent(BasicStepper);
            expect(stepperNativeElement).not.toHaveClass('is-negative');
        });

        it('should create a non-disabled number-stepper', () => {
            createTestComponent(BasicStepper);
            expect(stepperNativeElement).not.toHaveClass('is-disabled');
        });
    });

    describe('button disabling', () => {
        it('should disable the down button on min', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -2;
            testInstance.max = 2;
            testInstance.step = 2;
            fixture.detectChanges();
            clickDown();
            expect(downButton.disabled).toBeTrue();
        }));

        it('should not disable the down button for correct values', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -10;
            fixture.detectChanges();
            clickDown();
            expect(downButton.disabled).toBeFalse();
        }));

        it('should disable the up button on max', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -2;
            testInstance.max = 2;
            testInstance.step = 2;
            fixture.detectChanges();
            clickUp();
            expect(upButton.disabled).toBeTrue();
        }));

        it('should not disable the up button for correct values', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            clickUp();
            expect(upButton.disabled).toBeFalse();
        }));

        it('should not disable the down button on init for correct values', fakeAsync(() => {
            createTestComponent(NgModelStepper);
            testInstance.value = 3;
            fixture.detectChanges();

            // because the triggerResize is defered we need to flush and run change detection again
            flush();
            fixture.detectChanges();
            flush();
            expect(downButton.disabled).toBeFalse();
        }));

        it('should disable the down button if user input is below the minimum', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -2;
            testInstance.max = 2;
            testInstance.step = 2;
            inputElement.value = '-10';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            expect(downButton.disabled).toBeTrue();
        }));

        it('should disable the up button if user input is over the maximum', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -2;
            testInstance.max = 2;
            testInstance.step = 2;
            inputElement.value = '10';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            expect(upButton.disabled).toBeTrue();
        }));
    });

    describe('additional directives', () => {
        it('displays a given prefix', () => {
            createTestComponent(DirectivesStepper);
            expect(fixture.nativeElement.textContent).toContain('prefix');
        });

        it('displays a given suffix', () => {
            createTestComponent(DirectivesStepper);
            expect(fixture.nativeElement.textContent).toContain('suffix');
        });
    });

    describe('min/max', () => {
        it('should not count over the maximum', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.max = 2;
            testInstance.step = 2;
            fixture.detectChanges();
            clickUp();
            clickUp();
            expect(stepperInstance.value).toBe(2);
            assertInputValue('02');
        }));

        it('should not count below the minimum', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -2;
            testInstance.step = 2;
            fixture.detectChanges();
            clickDown();
            clickDown();
            expect(stepperInstance.value).toBe(-2);
            assertInputValue('-2');
        }));

        it('should be invalid for numbers above max', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -2;
            testInstance.step = 2;
            fixture.detectChanges();
            tick();
            expect(stepperInstance.isValidStep(20)).toBeFalse();
        }));

        it('should be invalid for numbers below min', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -2;
            testInstance.step = 2;
            fixture.detectChanges();
            tick();
            expect(stepperInstance.isValidStep(-20)).toBeFalse();
        }));
    });

    describe('step sizes', () => {
        it('should count down by 1', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -10;
            fixture.detectChanges();
            clickDown();
            expect(stepperInstance.value).toBe(-1);
            assertInputValue('-1');
        }));

        it('should count up by custom stepsize 2', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.step = 2;
            fixture.detectChanges();
            clickUp();
            expect(stepperInstance.value).toBe(2);
            assertInputValue('02');
        }));

        it('should count down by custom stepsize 2', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.min = -2;
            testInstance.step = 2;
            fixture.detectChanges();
            assertInputValue('00');
            clickDown();
            expect(stepperInstance.value).toBe(-2);
            assertInputValue('-2');
        }));
    });

    describe('floating point', () => {
        it('should work correctly for float', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.step = 0.5;
            fixture.detectChanges();
            clickUp();
            expect(stepperInstance.value).toBe(0.5);
            inputElement.value = '0.33';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            clickUp();
            expect(stepperInstance.value).toBe(0.5);
            assertInputValue('0.5');
        }));
    });

    describe('ngModel', () => {
        it('should set the ngModel value to null on wrong input', fakeAsync(() => {
            createTestComponent(NgModelStepper);
            inputElement.value = '0.33aa';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(testInstance.value).toBeNull();
            clickUp();
            expect(testInstance.value).toBe(1);
        }));

        it('should reflect ngModel value in input', fakeAsync(() => {
            createTestComponent(NgModelStepper);
            clickUp();
            expect(testInstance.value).toBe(1);
        }));
    });

    describe('simple binding', () => {
        it('should bind to nxValue', fakeAsync(() => {
            createTestComponent(SimpleBindingStepper);
            testInstance.value = 2;
            fixture.detectChanges();
            tick();
            assertInputValue('02');
        }));
    });

    describe('resizing', () => {
        it('should resize on initialization', fakeAsync(() => {
            createTestComponent(ResizeOnInitTest);
            // because the triggerResize is defered we need to flush and run change detection again
            flush();
            fixture.detectChanges();
            flush();
            const computedStyles = window.getComputedStyle(inputElement);
            expect(parseFloat(computedStyles.width)).toBeGreaterThan(55);
        }));

        it('should resize after increment/decrement', fakeAsync(() => {
            createTestComponent(ResizeOnInitTest);
            clickDown();
            fixture.detectChanges();
            const computedStyles = window.getComputedStyle(inputElement);
            // 56px is the current width of the normal stepper input
            expect(parseFloat(computedStyles.width)).toBe(56);
            clickUp();
            fixture.detectChanges();
            expect(parseFloat(computedStyles.width)).toBeGreaterThan(56);
        }));
    });

    describe('negative styling', () => {
        it('updates on [negative] change', () => {
            createTestComponent(ConfigurableStepper);
            expect(stepperNativeElement).not.toHaveClass('is-negative');

            fixture.componentInstance.negative = true;
            fixture.detectChanges();
            expect(stepperInstance.negative).toBeTrue();
            expect(stepperNativeElement).toHaveClass('is-negative');

            fixture.componentInstance.negative = false;
            fixture.detectChanges();
            expect(stepperInstance.negative).toBeFalse();
            expect(stepperNativeElement).not.toHaveClass('is-negative');
        });
    });

    describe('number formatting', () => {
        it('should display value correctly on [leadingZero] change and click', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.stepperInstance.value = 1;
            fixture.detectChanges();
            clickUp();
            assertInputValue('02');
            testInstance.stepperInstance.leadingZero = false;
            clickDown();
            assertInputValue('1');
        }));

        it('updates view on [leadingZero] change without click', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            testInstance.stepperInstance.value = 2;
            fixture.detectChanges();
            assertInputValue('02');
            testInstance.stepperInstance.leadingZero = false;
            fixture.detectChanges();
            flush();
            assertInputValue('2');
        }));

        it('correctly displays user input when leadingZero is active', fakeAsync(() => {
            createTestComponent(ConfigurableStepper);
            tick();
            assertInputValue('00');

            inputElement.value = '00';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            assertInputValue('00');

            inputElement.value = '01';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            assertInputValue('01');

            inputElement.value = '0';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            assertInputValue('00');

            inputElement.value = '1';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            assertInputValue('01');

            inputElement.value = '000';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            assertInputValue('00');
            flush();
        }));
    });

    describe('reactive', () => {
        it('should not submit form on buttons click', fakeAsync(() => {
            createTestComponent(ReactiveFormStepper);
            const submitButton = fixture.nativeElement.querySelector('#submit-button') as HTMLButtonElement;
            spyOn(testInstance, 'onSubmit');

            clickUp();
            expect(testInstance.onSubmit).not.toHaveBeenCalled();

            clickDown();
            expect(testInstance.onSubmit).not.toHaveBeenCalled();

            submitButton.click();
            expect(testInstance.onSubmit).toHaveBeenCalledTimes(1);
        }));

        it('should be updated only on blur', () => {
            createTestComponent(ReactiveFormOnBlurStepper);
            inputElement.value = '2';
            inputElement.dispatchEvent(new Event('input'));
            expect(testInstance.testForm.get('count')!.value).withContext('Expected value to remain unchanged until blur.').toBe(0);

            inputElement.dispatchEvent(new Event('blur'));
            fixture.detectChanges();

            expect(testInstance.testForm.get('count')!.value).withContext('Expected value to change once control is blurred.').toBe(2);
        });
    });

    describe('with onPush', () => {
        it('should resize on initilization when wrapped in onPush', fakeAsync(() => {
            createTestComponent(ResizeOnInitTestOnPush);
            // because the triggerResize is defered we need to flush and run change detection again
            flush();
            fixture.detectChanges();
            flush();
            const computedStyles = window.getComputedStyle(inputElement);
            expect(parseFloat(computedStyles.width)).toBeGreaterThan(55);
        }));
    });

    describe('programmatic change', () => {
        it('should update on label change', () => {
            createTestComponent(BasicStepper);
            testInstance.stepperInstance.label = 'Programmatic label';
            fixture.detectChanges();
            expect(label.textContent!.trim()).toBe('Programmatic label');
        });

        it('should update on resize change', () => {
            createTestComponent(BasicStepper);
            testInstance.stepperInstance.value = 1000000;
            fixture.detectChanges();
            testInstance.stepperInstance.resize = true;
            fixture.detectChanges();
            fixture.detectChanges();
            const computedStyles = window.getComputedStyle(inputElement);
            expect(parseFloat(computedStyles.width)).toBeGreaterThan(55);
        });

        it('should update on value change', () => {
            // This test basically can't fail at the moment as the input value gets
            // changed by direct DOM manipulation at the moment. This was a design decision at that time
            // to separate the input value from the internal model which can be null on wrong user input
            createTestComponent(BasicStepper);
            testInstance.stepperInstance.value = 1000;
            fixture.detectChanges();
            expect(inputElement.value).toBe('1000');
        });

        it('updates view on [negative] change', () => {
            createTestComponent(StepperOnPush);
            stepperInstance.negative = true;
            fixture.detectChanges();

            expect(stepperNativeElement).toHaveClass('is-negative');
            let button = fixture.nativeElement.querySelector('.nx-button--negative');
            expect(button).not.toBeNull();

            stepperInstance.negative = false;
            fixture.detectChanges();
            button = fixture.nativeElement.querySelector('.nx-button--negative');

            expect(button).toBeNull();
            expect(stepperNativeElement).not.toHaveClass('is-negative');
        });
    });

    describe('nxDisable Input', () => {
        describe('when set to true', () => {
            beforeEach(() => {
                createTestComponent(DisableableStepper);
                testInstance.disabled = true;
                fixture.detectChanges();
            });

            it('disables up button', () => {
                expect(upButton.disabled).toBeTrue();
            });

            it('disables down button', () => {
                expect(downButton.disabled).toBeTrue();
            });

            it('disables input', () => {
                expect(inputElement.disabled).toBeTrue();
            });

            it('sets host class to .is-disabled', () => {
                expect(stepperNativeElement).toHaveClass('is-disabled');
            });
        });
    });

    describe('nxReadonly Input', () => {
        it('should not be readonly input field by default', () => {
            createTestComponent(ConfigurableStepper);
            expect(inputElement.getAttribute('readonly')).toBeNull();
        });

        it('should be readonly input field when set readonlyInput', () => {
            createTestComponent(ConfigurableStepper);
            testInstance.readonlyInput = true;
            fixture.detectChanges();

            expect(inputElement.getAttribute('readonly')).not.toBeNull();
        });
    });

    describe('a11y', () => {
        it('should use injected subclass for button aria-labels', inject([NxNumberStepperIntl], (intl: NxNumberStepperIntl) => {
            createTestComponent(BasicStepper);
            expect(downButton.getAttribute('aria-label')).toBe('verringern');
        }));

        it('should use inputs for button aria-labels', () => {
            createTestComponent(ConfigurableStepper);
            expect(downButton.getAttribute('aria-label')).toBe('decrease number');
            expect(upButton.getAttribute('aria-label')).toBe('increase number');
        });

        it('should set the aria-label of the input via input', () => {
            createTestComponent(ConfigurableStepper);
            expect(inputElement.getAttribute('aria-label')).toBe('input label');
        });

        it('should react on change of inputs for aria-labels', () => {
            createTestComponent(ConfigurableStepper);
            expect(downButton.getAttribute('aria-label')).toBe('decrease number');
            expect(upButton.getAttribute('aria-label')).toBe('increase number');
            expect(inputElement.getAttribute('aria-label')).toBe('input label');

            fixture.componentInstance.incrementAriaLabel = 'new increase';
            fixture.componentInstance.decrementAriaLabel = 'new decrease';
            fixture.componentInstance.inputAriaLabel = 'new input label';

            fixture.detectChanges();

            expect(downButton.getAttribute('aria-label')).toBe('new decrease');
            expect(upButton.getAttribute('aria-label')).toBe('new increase');
            expect(inputElement.getAttribute('aria-label')).toBe('new input label');
        });

        it('should give precedence to inputs and not injected attributes for aria-labels', inject([NxNumberStepperIntl], (intl: NxNumberStepperIntl) => {
            createTestComponent(ConfigurableStepper);
            expect(downButton.getAttribute('aria-label')).toBe('decrease number');
            expect(upButton.getAttribute('aria-label')).toBe('increase number');
            expect(inputElement.getAttribute('aria-label')).toBe('input label');
        }));

        it('should rerender when the i18n aria labels change', inject([NxNumberStepperIntl], (intl: NxNumberStepperIntl) => {
            createTestComponent(BasicStepper);
            intl.decrementAriaLabel = 'verringern um einen Test';
            intl.changes.next();
            fixture.detectChanges();
            expect(downButton.getAttribute('aria-label')).toBe('verringern um einen Test');
        }));

        it('has no accessibility violations', async () => {
            createTestComponent(BasicStepper);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-number-stepper label="Test"></nx-number-stepper>`,
})
class BasicStepper extends NumberStepperTest {}

@Component({
    template: `<nx-number-stepper [(value)]="value"></nx-number-stepper>`,
})
class SimpleBindingStepper extends NumberStepperTest {}

@Component({
    template: `<nx-number-stepper max="10000000" step="1000000" [(value)]="value" resize="true"></nx-number-stepper>`,
})
class ResizeOnInitTest extends NumberStepperTest {
    value = 100000;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<nx-number-stepper [(value)]="value" [resize]="true"></nx-number-stepper>`,
})
class ResizeOnInitTestOnPush extends NumberStepperTest {
    value = 1000000;
}

@Component({
    template: `<nx-number-stepper [(ngModel)]="value"></nx-number-stepper>`,
})
class NgModelStepper extends NumberStepperTest {}

@Component({
    template: `
        <nx-number-stepper
            [min]="min"
            [max]="max"
            [step]="step"
            [negative]="negative"
            [leadingZero]="leadingZero"
            [inputAriaLabel]="inputAriaLabel"
            [incrementAriaLabel]="incrementAriaLabel"
            [decrementAriaLabel]="decrementAriaLabel"
            [readonly]="readonlyInput"
        ></nx-number-stepper>
    `,
})
class ConfigurableStepper extends NumberStepperTest {}

@Component({
    template: `<nx-number-stepper [disabled]="disabled" [min]="-10"></nx-number-stepper>`,
})
class DisableableStepper extends NumberStepperTest {}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<nx-number-stepper [negative]="negative"></nx-number-stepper>`,
})
class StepperOnPush extends NumberStepperTest {}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <nx-number-stepper>
            <nx-number-stepper-prefix>prefix</nx-number-stepper-prefix>
            <nx-number-stepper-suffix>suffix</nx-number-stepper-suffix>
        </nx-number-stepper>
    `,
})
class DirectivesStepper extends NumberStepperTest {}

@Component({
    template: `
        <form [formGroup]="testForm" (ngSubmit)="onSubmit()">
            <nx-number-stepper></nx-number-stepper>
            <button id="submit-button">Submit</button>
        </form>
    `,
})
class ReactiveFormStepper extends NumberStepperTest {}

@Component({
    template: `
        <form [formGroup]="testForm">
            <nx-number-stepper formControlName="count"></nx-number-stepper>
        </form>
    `,
})
class ReactiveFormOnBlurStepper extends NumberStepperTest {
    constructor(private readonly fb: FormBuilder) {
        super();
        this.testForm = this.fb.group(
            {
                count: 0,
            },
            { updateOn: 'blur' },
        );
    }
}
