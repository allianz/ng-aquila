import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, Directive, ElementRef, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { dispatchKeyboardEvent } from '../../cdk-test-utils';
import { NxMultiStepperDirection } from '../progress-stepper.models';
import { NxProgressStepperModule } from '../progress-stepper.module';
import { NxMultiStepperComponent } from './multi-step.component';

@Directive()
abstract class MultiStepTest {
    @ViewChild(NxMultiStepperComponent) componentInstance!: NxMultiStepperComponent;
    @ViewChild(NxMultiStepperComponent, { read: ElementRef }) componentInstanceRef!: ElementRef;
}

describe('NxMultiStepperComponent', () => {
    let fixture: ComponentFixture<MultiStepTest>;
    let testInstance: MultiStepTest;
    let multiStepElementRef: ElementRef;
    let multiStepInstance: NxMultiStepperComponent;

    function getSteps(): HTMLElement[] {
        return Array.from(multiStepElementRef.nativeElement.querySelectorAll('nx-multi-step-item'));
    }

    function createTestComponent(component: Type<MultiStepTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        multiStepInstance = testInstance.componentInstance;
        multiStepElementRef = testInstance.componentInstanceRef;
    }

    function getStepHeaders() {
        return fixture.nativeElement.querySelectorAll('nx-multi-step-item');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                MultiStepBasicTest,
                LinearStepBasicTest,
                MultiStepCompletionTest,
                MultiStepValidationTest,
                MultiStepDirectionTest,
                MultiStepGroupTest,
            ],
            imports: [NxProgressStepperModule, NxInputModule, NxFormfieldModule, FormsModule, ReactiveFormsModule, NxDropdownModule],
        }).compileComponents();
    }));

    it('should create the component', fakeAsync(() => {
        createTestComponent(MultiStepBasicTest);
        expect(multiStepInstance).toBeTruthy();
    }));

    it('should show checked icon on completed item', () => {
        createTestComponent(MultiStepBasicTest);

        let checkIcon = fixture.debugElement.queryAll(By.css('nx-icon'));
        expect(checkIcon).toHaveSize(0);

        multiStepInstance.next();
        fixture.detectChanges();

        checkIcon = fixture.debugElement.queryAll(By.css('nx-icon'));
        expect(checkIcon).toHaveSize(1);
    });

    it('sets correctly selected class on the currently selected step', () => {
        createTestComponent(MultiStepCompletionTest);
        const completionStepper: MultiStepCompletionTest = fixture.componentInstance as MultiStepCompletionTest;

        let activeDot = fixture.nativeElement.querySelector('nx-multi-step-item .small-dot');
        expect(activeDot).not.toBeNull();

        completionStepper.completedOne = true;
        fixture.detectChanges();

        const firstElement = fixture.nativeElement.querySelectorAll('nx-multi-step-item')[0];
        activeDot = firstElement.querySelector('.small-dot');
        expect(activeDot).not.toBeNull();
    });

    it('updates the template on manual step completion via input binding', () => {
        createTestComponent(MultiStepCompletionTest);

        const completionStepper: MultiStepCompletionTest = fixture.componentInstance as MultiStepCompletionTest;

        let checkIcon = fixture.debugElement.queryAll(By.css('nx-icon'));
        expect(checkIcon).toHaveSize(0);

        completionStepper.completedTwo = true;
        fixture.detectChanges();

        checkIcon = fixture.debugElement.queryAll(By.css('nx-icon'));
        expect(checkIcon).toHaveSize(1);
    });

    it('should move focus with arrow keys', () => {
        createTestComponent(MultiStepBasicTest);
        const stepHeaders = getStepHeaders();
        dispatchKeyboardEvent(stepHeaders[0], 'keydown', RIGHT_ARROW);
        fixture.detectChanges();
        expect(testInstance.componentInstance._getFocusIndex()).toBe(1);
        expect(testInstance.componentInstance.selectedIndex).toBe(0);
    });

    it('should select tab when pressing ENTER or SPACE', () => {
        createTestComponent(MultiStepBasicTest);
        const stepHeaders = getStepHeaders();
        dispatchKeyboardEvent(stepHeaders[0], 'keydown', RIGHT_ARROW);
        fixture.detectChanges();
        dispatchKeyboardEvent(stepHeaders[1], 'keydown', ENTER);
        fixture.detectChanges();
        expect(testInstance.componentInstance._getFocusIndex()).toBe(1);
        expect(testInstance.componentInstance.selectedIndex).toBe(1);
        dispatchKeyboardEvent(stepHeaders[1], 'keydown', LEFT_ARROW);
        fixture.detectChanges();
        dispatchKeyboardEvent(stepHeaders[0], 'keydown', SPACE);
        fixture.detectChanges();
        expect(testInstance.componentInstance._getFocusIndex()).toBe(0);
        expect(testInstance.componentInstance.selectedIndex).toBe(0);
    });

    describe('on step click', () => {
        it('jumps to the correct step', () => {
            createTestComponent(MultiStepBasicTest);
            let stepToClick = fixture.nativeElement.querySelectorAll('nx-multi-step-item')[1];
            stepToClick.click();
            fixture.detectChanges();
            expect(multiStepInstance.selected?.label).toBe('Step 2');

            stepToClick = fixture.nativeElement.querySelectorAll('nx-multi-step-item')[0];
            stepToClick.click();
            fixture.detectChanges();
            expect(multiStepInstance.selected?.label).toBe('Step 1');
        });
    });

    describe('linear', () => {
        beforeEach(() => {
            createTestComponent(LinearStepBasicTest);
        });

        it('has disabled steps', () => {
            const steps = getSteps();
            expect(steps[0].getAttribute('aria-disabled')).toBeNull();
            expect(steps[1].getAttribute('aria-disabled')).toBe('true');
        });

        it('does not jump to a particular step when clicked', () => {
            const stepToClick = getSteps()[1];
            stepToClick.click();
            fixture.detectChanges();
            expect(multiStepInstance.selected?.label).toBe('Step1');
        });
    });

    describe('error validation', () => {
        it('shows errors on required fields on jump to a particular step if LINEAR', () => {
            createTestComponent(LinearStepBasicTest);
            multiStepInstance.next();
            fixture.detectChanges();

            expect(multiStepInstance.currentStep?.label).toBe('Step1');
            const formField = fixture.nativeElement.querySelector('nx-formfield');
            expect(formField).toHaveClass('has-error');
        });

        it('shows errors if a form is untouched on next() call', () => {
            createTestComponent(MultiStepValidationTest);

            multiStepInstance.next();
            fixture.detectChanges();

            const formFields = fixture.nativeElement.querySelectorAll('nx-formfield');
            formFields.forEach((formfield: any) => expect(formfield).toHaveClass('has-error'));
        });

        it('shows errors if a form is untouched on selectedIndex change', () => {
            createTestComponent(MultiStepValidationTest);

            multiStepInstance.selectedIndex = 1;
            fixture.detectChanges();

            const formFields = fixture.nativeElement.querySelectorAll('nx-formfield');
            formFields.forEach((formfield: any) => expect(formfield).toHaveClass('has-error'));
        });
    });

    describe('direction', () => {
        it('has horizontal direction by default', () => {
            createTestComponent(MultiStepBasicTest);
            expect(multiStepInstance.direction).toBe('horizontal');
        });

        describe('when changing the direction to vertical', () => {
            beforeEach(() => {
                createTestComponent(MultiStepDirectionTest);
                (fixture.componentInstance as MultiStepDirectionTest).direction = 'vertical';
                fixture.detectChanges();
            });

            it('has vertical direction', () => {
                expect(multiStepInstance.direction).toBe('vertical');
                expect(multiStepElementRef.nativeElement).toHaveClass('nx-multi-stepper--vertical');
                const steps: HTMLElement[] = Array.from(multiStepElementRef.nativeElement.querySelectorAll('nx-multi-step'));
                steps.forEach(step => {
                    expect(step).toHaveClass('nx-multi-step--vertical');
                });
            });

            it('should change step with UP and DOWN arrows', () => {
                const stepHeaders = getStepHeaders();
                dispatchKeyboardEvent(stepHeaders[0], 'keydown', DOWN_ARROW);
                fixture.detectChanges();
                expect(testInstance.componentInstance._getFocusIndex()).toBe(1);
                expect(testInstance.componentInstance.selectedIndex).toBe(0);

                dispatchKeyboardEvent(stepHeaders[1], 'keydown', UP_ARROW);
                fixture.detectChanges();
                expect(testInstance.componentInstance._getFocusIndex()).toBe(0);
            });
        });
    });

    describe('groups', () => {
        beforeEach(() => {
            createTestComponent(MultiStepGroupTest);
        });

        it('renders the groups', () => {
            const groups: any[] = Array.from(multiStepElementRef.nativeElement.querySelectorAll('.nx-multi-stepper__group'));

            expect(groups).toHaveSize(2);

            groups.forEach((group: HTMLElement, i) => {
                const label = group.querySelector('.nx-multi-stepper__group-label');
                expect(label!.textContent?.trim()).toBe(`Group ${i + 1}`);
            });
        });

        it('renders the steps', () => {
            const steps: any[] = Array.from(multiStepElementRef.nativeElement.querySelectorAll('nx-multi-step-item'));

            steps.forEach((step: HTMLElement) => expect(step).toHaveClass('nx-multi-step-item--vertical'));
        });

        it('should set tabindexes correctly', () => {
            const stepHeaders = getStepHeaders();
            expect(stepHeaders[0].getAttribute('tabindex')).toBe('0');
            expect(stepHeaders[1].getAttribute('tabindex')).toBe('-1');
            expect(stepHeaders[2].getAttribute('tabindex')).toBe('-1');

            stepHeaders[2].click();
            fixture.detectChanges();

            expect(stepHeaders[0].getAttribute('tabindex')).toBe('-1');
            expect(stepHeaders[1].getAttribute('tabindex')).toBe('-1');
            expect(stepHeaders[2].getAttribute('tabindex')).toBe('0');
        });

        describe('on step click', () => {
            it('jumps to the correct step', () => {
                createTestComponent(MultiStepGroupTest);
                let stepToClick = fixture.nativeElement.querySelectorAll('nx-multi-step-item')[1];
                stepToClick.click();
                fixture.detectChanges();
                expect(multiStepInstance.selected?.label).toBe('Step 2');

                stepToClick = fixture.nativeElement.querySelectorAll('nx-multi-step-item')[0];
                stepToClick.click();
                fixture.detectChanges();
                expect(multiStepInstance.selected?.label).toBe('Step 1');
            });
        });

        describe('active state', () => {
            beforeEach(() => {
                createTestComponent(MultiStepGroupTest);
            });

            it('first step does not have active state', () => {
                const step = fixture.nativeElement.querySelector('nx-multi-step-item');
                expect(step).not.toHaveClass('is-active');
            });

            it('first step has active state', () => {
                multiStepInstance.selectedIndex = 1;
                fixture.detectChanges();

                const step = fixture.nativeElement.querySelector('nx-multi-step-item');
                expect(step).toHaveClass('is-active');
            });
        });

        describe('completed state', () => {
            beforeEach(() => {
                createTestComponent(MultiStepGroupTest);
            });

            it('is not completed', () => {
                const step = fixture.nativeElement.querySelector('nx-multi-step-item');
                expect(step).not.toHaveClass('is-completed');
            });

            it('is completed', () => {
                (testInstance as MultiStepGroupTest).completedOne = true;
                fixture.detectChanges();

                const step = fixture.nativeElement.querySelector('nx-multi-step-item');
                expect(step).toHaveClass('is-completed');
            });
        });

        describe('form disable', () => {
            beforeEach(() => {
                createTestComponent(MultiStepValidationTest);
            });

            it('should be complete when form is valid then disabled', () => {
                const comp: MultiStepValidationTest = fixture.componentInstance as MultiStepValidationTest;
                comp.manualCompletionForm.setValue({
                    name: 'Joestar',
                    fruit: 'Locacaca',
                });
                comp.manualCompletionForm.get('name')?.disable();
                comp.manualCompletionForm.get('fruit')?.disable();

                fixture.detectChanges();

                const step = fixture.nativeElement.querySelector('nx-multi-step-item');
                expect(step).toHaveClass('is-completed');
            });

            it('should be incomplete when form is disabled and not valid', () => {
                const comp: MultiStepValidationTest = fixture.componentInstance as MultiStepValidationTest;
                comp.manualCompletionForm.get('name')?.disable();
                comp.manualCompletionForm.get('fruit')?.disable();

                fixture.detectChanges();

                const step = fixture.nativeElement.querySelector('nx-multi-step-item');
                expect(step).not.toHaveClass('is-completed');
            });
        });
    });

    describe('programmatic', () => {
        beforeEach(() => {
            createTestComponent(MultiStepBasicTest);
        });

        it('has vertical direction', () => {
            multiStepInstance.direction = 'vertical';
            fixture.detectChanges();
            expect(multiStepElementRef.nativeElement).toHaveClass('nx-multi-stepper--vertical');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(MultiStepBasicTest);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('should set tabindexes and aria-selected on step headers', () => {
            createTestComponent(MultiStepBasicTest);
            const stepHeaders = getStepHeaders();
            expect(stepHeaders[0].getAttribute('tabindex')).toBe('0');
            expect(stepHeaders[1].getAttribute('tabindex')).toBe('-1');
            expect(stepHeaders[0].getAttribute('aria-selected')).toBe('true');
            expect(stepHeaders[1].getAttribute('aria-selected')).toBe('false');

            stepHeaders[1].click();
            fixture.detectChanges();

            expect(stepHeaders[0].getAttribute('tabindex')).toBe('-1');
            expect(stepHeaders[1].getAttribute('tabindex')).toBe('0');
            expect(stepHeaders[0].getAttribute('aria-selected')).toBe('false');
            expect(stepHeaders[1].getAttribute('aria-selected')).toBe('true');
        });
    });
});

@Component({
    template: `
        <nx-multi-stepper [direction]="direction">
            <nx-step label="Step 1"> step 1 content </nx-step>
            <nx-step label="Step 2"> step 2 content </nx-step>
        </nx-multi-stepper>
    `,
})
class MultiStepDirectionTest extends MultiStepTest {
    direction!: NxMultiStepperDirection;
}

@Component({
    template: `
        <nx-multi-stepper [linear]="true" currentStepLabel="Step">
            <nx-step label="Step1" [stepControl]="manualCompletionForm">
                <form [formGroup]="manualCompletionForm">
                    <nx-formfield label="Name">
                        <input nxInput required formControlName="form1" />
                    </nx-formfield>
                </form>
            </nx-step>
            <nx-step label="Step2"></nx-step>
        </nx-multi-stepper>
    `,
})
class LinearStepBasicTest extends MultiStepTest {
    _formBuilder: FormBuilder = new FormBuilder();
    manualCompletionForm = this._formBuilder.group({ form1: ['', Validators.required] });
}

@Component({
    template: `
        <nx-multi-stepper>
            <nx-step label="Step 1" [completed]="completedOne"> step 1 content </nx-step>
            <nx-step label="Step 2" [completed]="completedTwo"> step 2 content </nx-step>
        </nx-multi-stepper>
    `,
})
class MultiStepCompletionTest extends MultiStepTest {
    completedOne = false;
    completedTwo = false;
}

@Component({
    template: `
        <nx-multi-stepper [linear]="true">
            <nx-step label="Your name" [stepControl]="manualCompletionForm">
                <form [formGroup]="manualCompletionForm">
                    <nx-formfield label="Name">
                        <input nxInput formControlName="name" />
                    </nx-formfield>
                    <nx-formfield label="Name">
                        <nx-dropdown formControlName="fruit">
                            <nx-dropdown-item value="banana">Banana</nx-dropdown-item>
                        </nx-dropdown>
                    </nx-formfield>
                    <button type="button" nxStepperNext>Next</button>
                </form>
            </nx-step>
            <nx-step label="Done"> asdf </nx-step>
        </nx-multi-stepper>
    `,
})
class MultiStepValidationTest extends MultiStepTest {
    manualCompletionForm = new FormGroup({
        name: new FormControl('', Validators.required),
        fruit: new FormControl('', Validators.required),
    });
}

@Component({
    template: `
        <nx-multi-stepper>
            <nx-step label="Step 1"> step 1 content </nx-step>
            <nx-step label="Step 2"> step 2 content </nx-step>
        </nx-multi-stepper>
    `,
})
class MultiStepBasicTest extends MultiStepTest {}

@Component({
    template: `
        <nx-multi-stepper direction="vertical">
            <nx-step-group label="Group 1">
                <nx-step label="Step 1" [completed]="completedOne"> step 1 content </nx-step>
                <nx-step label="Step 2"> step 2 content </nx-step>
            </nx-step-group>
            <nx-step-group label="Group 2">
                <nx-step label="Step 3"> step 3 content </nx-step>
                <nx-step label="Step 4"> step 4 content </nx-step>
            </nx-step-group>
        </nx-multi-stepper>
    `,
})
class MultiStepGroupTest extends MultiStepTest {
    completedOne = false;
}
