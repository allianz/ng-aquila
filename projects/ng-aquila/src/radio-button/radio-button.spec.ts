import { Component, QueryList, Type, ViewChild, ViewChildren, ChangeDetectionStrategy, Directive } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, flush, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { NxRadioComponent, NxRadioGroupComponent } from './radio-button';
import { NxRadioModule } from './radio-button.module';
import { NxErrorComponent, NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';

@Directive()
abstract class RadioTest {
    @ViewChildren(NxRadioComponent) radioInstances!: QueryList<NxRadioComponent>;
    @ViewChild(NxRadioGroupComponent) radioGroup!: NxRadioGroupComponent;

    templateModel = '1';
    testForm: any;
    disabled = false;
    negative: any;

    groupNegative: any;
    radioNegative: any;
}

describe('NxRadioComponent', () => {
    let fixture: ComponentFixture<RadioTest>;
    let testInstance: RadioTest;
    let radioInstances: QueryList<NxRadioComponent>;
    let radioElements: NodeListOf<HTMLInputElement>;
    let labelElements: NodeListOf<HTMLLabelElement>;

    function createTestComponent(component: Type<RadioTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        radioInstances = testInstance.radioInstances;
        radioElements = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        labelElements = fixture.nativeElement.querySelectorAll('label') as NodeListOf<HTMLLabelElement>;
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NxRadioModule, FormsModule, ReactiveFormsModule, NxLabelModule, NxErrorModule],
                declarations: [
                    BasicRadio,
                    LabellessRadio,
                    ConfigurableRadio,
                    BasicRadioGroup,
                    MultipleRadio,
                    DynamicRadio,
                    MultipleRadioDisabled,
                    GroupWithNgModel,
                    ReactiveRadio,
                    BasicRadioOnPush,
                    MultipleRadioOnPush,
                    RadioGroupTest,
                    RadioGroupValidation,
                    RadioGroupValidationTouched,
                ],
            }).compileComponents();
        }),
    );

    function getRadioLabelElement(radioElement: HTMLElement): HTMLLabelElement {
        return radioElement.querySelector('label')!;
    }

    function getRadioInputElement(radioElement: HTMLElement): HTMLInputElement {
        return radioElement.querySelector('input')!;
    }

    function assertChecked(index: number, checked: boolean) {
        fixture.detectChanges();
        expect(radioInstances.toArray()[index].checked).toBe(checked);
        expect(radioElements.item(index).checked).toBe(checked);
    }

    describe('standalone radio', () => {
        it('displays a radio with a label', () => {
            createTestComponent(BasicRadio);
            expect(radioElements.item(0)).not.toBeNull();
            expect(labelElements.item(0)).not.toBeNull();
            expect(labelElements.item(0).htmlFor).toBe(radioElements.item(0).id);
        });

        it('displays a radio without a label', () => {
            createTestComponent(LabellessRadio);
            expect(labelElements.item(0).textContent!.trim()).toBe('');

            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(labelElements.item(0).classList).not.toContain('has-label');
        });

        it('sets the given label', () => {
            createTestComponent(BasicRadio);
            expect(labelElements.item(0).textContent?.trim()).toBe('Label');

            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(labelElements.item(0).classList).toContain('has-label');
        });

        it('a click on the label changes the checked attribute', () => {
            createTestComponent(BasicRadio);
            assertChecked(0, false);
            labelElements.item(0).click();
            assertChecked(0, true);
        });

        it('displays the dot when checked', () => {
            createTestComponent(BasicRadio);
            expect(fixture.nativeElement.querySelectorAll('.nx-radio__dot').length).toBe(0);
            testInstance.radioInstances.toArray()[0].checked = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelectorAll('.nx-radio__dot').length).toBe(1);
        });

        it('radio component emits change event', () => {
            createTestComponent(BasicRadio);
            const instance = radioInstances.toArray()[0];
            const changeHandler = jasmine.createSpy('changeHandler');

            const subscription = instance.valueChange.subscribe(changeHandler);
            labelElements.item(0).click();

            const latestCall = changeHandler.calls.mostRecent();
            const returnValue = latestCall.args[0];

            expect(changeHandler).toHaveBeenCalled();
            expect(returnValue.source).toEqual(instance);

            subscription.unsubscribe();
        });

        it('renders a non-negative radio button on default', () => {
            createTestComponent(BasicRadio);
            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(radioInstances.toArray()[0].negative).toBe(false);
            expect(radioElement.classList).not.toContain('nx-radio--negative');
        });

        it('updates negative styling on change', () => {
            createTestComponent(ConfigurableRadio);
            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(radioElement.classList).toContain('nx-radio--negative');
            expect(radioInstances.toArray()[0].negative).toBe(true);

            testInstance.negative = false;
            fixture.detectChanges();
            expect(radioElement.classList).not.toContain('nx-radio--negative');
            expect(radioInstances.toArray()[0].negative).toBe(false);
        });
    });

    describe('inside radio group', () => {
        it('should set initial value via nxValue', () => {
            createTestComponent(MultipleRadio);
            expect(testInstance.radioGroup.value).toBe('1');
            assertChecked(1, true);
        });

        it('should emit stateChanges on name and disabled changes', () => {
            createTestComponent(MultipleRadio);
            let spy = jasmine.createSpy('changeSpy');
            let subscription = testInstance.radioGroup._stateChanges.subscribe(spy);
            testInstance.radioGroup.name = 'newName';
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
            spy = jasmine.createSpy('changeSpy');
            subscription = testInstance.radioGroup._stateChanges.subscribe(spy);
            testInstance.radioGroup.disabled = true;
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });

        it('should not throw when items are created with ngFor loop', () => {
            expect(() => createTestComponent(DynamicRadio)).not.toThrow();
        });

        it('radio group assigns the same name to all child radios', () => {
            createTestComponent(MultipleRadio);

            Array.from(radioElements).map(radio => {
                expect(radio.name).toBe('groupTest');
            });
        });

        it('should update the items name if the group name changes', () => {
            createTestComponent(DynamicRadio);
            (testInstance as DynamicRadio).name = 'newName';
            fixture.detectChanges();
            expect(radioInstances.toArray()[0].name).toBe('newName');
        });

        it('changing a child radio causes the parent group to emit a change event', () => {
            createTestComponent(MultipleRadio);
            const instance = radioInstances.toArray()[0];
            const changeHandler = jasmine.createSpy('changeHandler');

            const subscription = testInstance.radioGroup.groupValueChange.subscribe(changeHandler);
            labelElements.item(0).click();

            expect(changeHandler).toHaveBeenCalled();

            const latestCall = changeHandler.calls.mostRecent();
            const returnValue = latestCall.args[0];

            expect(returnValue.source).toEqual(instance);
            expect(returnValue.value).toEqual('0');

            subscription.unsubscribe();
        });

        it('radios in the same group can be alternately selected', () => {
            createTestComponent(MultipleRadio);

            assertChecked(0, false);
            assertChecked(1, true);

            labelElements.item(0).click();
            assertChecked(0, true);
            assertChecked(1, false);

            labelElements.item(1).click();
            assertChecked(0, false);
            assertChecked(1, true);
        });

        it('child radio components inherit disabled state from radio group', () => {
            createTestComponent(MultipleRadioDisabled);
            expect(radioElements.item(0).disabled).toBe(true);
            expect(radioElements.item(1).disabled).toBe(true);
        });

        it('should toggle disabled state', () => {
            createTestComponent(MultipleRadioDisabled);
            testInstance.disabled = false;
            fixture.detectChanges();
            expect(radioElements.item(0).disabled).toBe(false);
            expect(radioElements.item(1).disabled).toBe(false);
            testInstance.disabled = true;
            fixture.detectChanges();
            expect(radioElements.item(0).disabled).toBe(true);
            expect(radioElements.item(1).disabled).toBe(true);
        });

        it('should create a basic radio-group with non-negative styling', () => {
            createTestComponent(BasicRadioGroup);
            const radioElementsNative = fixture.nativeElement.querySelectorAll('nx-radio');
            const radioGroupNative = fixture.nativeElement.querySelector('nx-radio-group');
            expect(radioGroupNative.classList).not.toContain('nx-radio-group--negative');
            radioElementsNative.forEach((radio: any) => {
                expect(radio.classList).not.toContain('nx-radio--negative');
            });
            expect(testInstance.radioGroup.negative).toBe(false);
            testInstance.radioInstances.toArray().forEach(radio => {
                expect(radio.negative).toBe(false);
            });
        });

        it('should update on group negative change', () => {
            createTestComponent(MultipleRadio);
            const radioElementsNative = fixture.nativeElement.querySelectorAll('nx-radio');
            const radioGroupNative = fixture.nativeElement.querySelector('nx-radio-group');
            expect(radioGroupNative.classList).toContain('nx-radio-group--negative');
            radioElementsNative.forEach((radio: any) => {
                expect(radio.classList).toContain('nx-radio--negative');
            });
            expect(testInstance.radioGroup.negative).toBe(true);
            testInstance.radioInstances.toArray().forEach(radio => {
                expect(radio.negative).toBe(true);
            });

            testInstance.groupNegative = false;
            fixture.detectChanges();

            expect(radioGroupNative.classList).not.toContain('nx-radio-group--negative');
            radioElementsNative.forEach((radio: any) => {
                expect(radio.classList).not.toContain('nx-radio--negative');
            });
            expect(testInstance.radioGroup.negative).toBe(false);
            testInstance.radioInstances.toArray().forEach(radio => {
                expect(radio.negative).toBe(false);
            });
        });

        it('should not update a single radio on negative change in group', () => {
            createTestComponent(MultipleRadio);
            testInstance.groupNegative = false;
            testInstance.radioNegative = true;
            fixture.detectChanges();

            const radioElementsNative = fixture.nativeElement.querySelectorAll('nx-radio');
            const radioGroupNative = fixture.nativeElement.querySelector('nx-radio-group');
            expect(radioGroupNative.classList).not.toContain('nx-radio-group--negative');
            radioElementsNative.forEach((radio: any) => {
                expect(radio.classList).not.toContain('nx-radio--negative');
            });
            expect(testInstance.radioGroup.negative).toBe(false);
            testInstance.radioInstances.toArray().forEach(radio => {
                expect(radio.negative).toBe(false);
            });
        });

        it('focuses the radio when calling focus()', () => {
            createTestComponent(BasicRadio);
            radioInstances.toArray()[0].focus();
            expect(fixture.nativeElement.querySelector('.nx-radio__input')).toEqual(document.activeElement);
        });
    });

    describe('in radio group with ngModel', () => {
        it('should set initial value from ngModel', fakeAsync(() => {
            createTestComponent(GroupWithNgModel);
            flush();
            expect(testInstance.radioGroup.value).toBe('1');
            assertChecked(1, true);
        }));

        it('should update the ngModel value on selection change', () => {
            createTestComponent(GroupWithNgModel);
            labelElements.item(0).click();
            expect(testInstance.radioGroup.value).toBe('0');
            expect(testInstance.templateModel).toBe('0');
            assertChecked(0, true);
        });
    });

    describe('in radio group with reactive forms', () => {
        it('updates initial group value in reactive form', () => {
            createTestComponent(ReactiveRadio);

            expect(testInstance.radioGroup.value).toBe('1');
            assertChecked(1, true);
        });

        it('should toggle the disabled state', () => {
            createTestComponent(ReactiveRadio);
            testInstance.testForm.controls.radioTestReactive.disable();
            fixture.detectChanges();
            Array.from(radioElements).map(radio => {
                expect(radio.disabled).toBe(true);
            });

            testInstance.testForm.controls.radioTestReactive.enable();
            fixture.detectChanges();
            Array.from(radioElements).map(radio => {
                expect(radio.disabled).toBe(false);
            });
        });
    });

    describe('programmatic change in radio button', () => {
        let radioInstance: NxRadioComponent;
        beforeEach(() => {
            createTestComponent(BasicRadio);
            radioInstance = radioInstances.toArray()[0];
        });

        it('should update on id change', () => {
            radioInstance.id = 'custom-radio-id';
            fixture.detectChanges();
            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(getRadioInputElement(radioElement).getAttribute('id')).toBe('custom-radio-id-input');
            expect(getRadioLabelElement(radioElement).getAttribute('id')).toBe('custom-radio-id-label');
        });

        it('should update on label size change', () => {
            fixture.destroy();
            createTestComponent(BasicRadioOnPush);
            radioInstance = radioInstances.toArray()[0];
            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(radioElement.classList).not.toContain('nx-radio-button--small-label');
            expect(radioElement.classList).toContain('nx-radio-button--big-label');

            radioInstance.labelSize = 'small';
            fixture.detectChanges();
            expect(radioElement.classList).toContain('nx-radio-button--small-label');
            expect(radioElement.classList).not.toContain('nx-radio-button--big-label');
        });

        it('should update view on negative input change (nx-radio)', () => {
            fixture.destroy();
            createTestComponent(BasicRadioOnPush);
            radioInstance = radioInstances.toArray()[0];
            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(radioElement.classList.contains('nx-radio--negative')).toBeFalsy();
            radioInstance.negative = true;
            fixture.detectChanges();
            expect(radioElement.classList.contains('nx-radio--negative')).toBeTruthy();
        });

        it('should update on disabled change', () => {
            radioInstance.disabled = true;
            fixture.detectChanges();
            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(getRadioInputElement(radioElement).disabled).toBe(true);
        });

        it('should update on name change', () => {
            radioInstance.name = 'custom-name';
            fixture.detectChanges();
            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(getRadioInputElement(radioElement).name).toBe('custom-name');
        });

        it('should update on checked change', () => {
            radioInstance.checked = true;
            fixture.detectChanges();
            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(getRadioInputElement(radioElement).checked).toBe(true);
        });

        it('should update on required change', () => {
            fixture.destroy();
            createTestComponent(BasicRadioOnPush);
            radioInstance = radioInstances.toArray()[0];
            radioInstance.required = true;
            fixture.detectChanges();
            const radioElement = fixture.nativeElement.querySelector('nx-radio');
            expect(radioElement.getAttribute('required')).toBe('true');
        });
    });

    describe('programmatic change in radio group', () => {
        it('should update on id change', () => {
            createTestComponent(MultipleRadioOnPush);
            testInstance.radioGroup.id = 'custom-id';
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('nx-radio-group').getAttribute('id')).toBe('custom-id');
        });

        it('should update on disabled change', () => {
            createTestComponent(MultipleRadio);
            testInstance.radioGroup.disabled = true;
            fixture.detectChanges();
            expect(radioElements.item(0).disabled).toBe(true);
        });

        it('should update on negative input change', () => {
            createTestComponent(MultipleRadioOnPush);
            const radioGroupNative = fixture.nativeElement.querySelector('nx-radio-group');
            const radioButtonsNative = fixture.nativeElement.querySelectorAll('nx-radio');
            expect(radioGroupNative.classList.contains('nx-radio-group--negative')).toBeFalsy();
            radioButtonsNative.forEach((radio: any) => {
                expect(radio.classList.contains('nx-radio--negative')).toBeFalsy();
            });
            testInstance.radioGroup.negative = true;
            fixture.detectChanges();
            expect(radioGroupNative.classList.contains('nx-radio-group--negative')).toBeTruthy();
            radioButtonsNative.forEach((radio: any) => {
                expect(radio.classList.contains('nx-radio--negative')).toBeTruthy();
            });
        });

        it('should update on required change', () => {
            createTestComponent(MultipleRadioOnPush);
            testInstance.radioGroup.required = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('nx-radio-group').getAttribute('required')).toBe('true');
            testInstance.radioGroup.required = false;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('nx-radio-group').getAttribute('required')).toBe('false');
        });

        it('should update on name change', () => {
            createTestComponent(MultipleRadioOnPush);
            testInstance.radioGroup.name = 'custom-name';
            fixture.detectChanges();
            Array.from(radioElements).map(radio => {
                expect(radio.name).toBe('custom-name');
            });
        });

        it('should update on value change', () => {
            createTestComponent(MultipleRadio);
            testInstance.radioGroup.value = '0';
            fixture.detectChanges();
            assertChecked(0, true);
            assertChecked(1, false);
        });
    });

    describe('Validation', () => {
        it('Should be invalid on submitting the form', () => {
            createTestComponent(RadioGroupValidation);
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            const radios = fixture.nativeElement.querySelectorAll('nx-radio');
            expect(radios[0].classList).toContain('has-error');
        });

        it('Should be invalid when touched', () => {
            createTestComponent(RadioGroupValidationTouched);
            fixture.detectChanges();
            const radios = fixture.nativeElement.querySelectorAll('nx-radio');
            expect(radios[0].classList).toContain('has-error');
        });

        it('Should be valid', () => {
            createTestComponent(RadioGroupValidationTouched);
            fixture.nativeElement.querySelector('button').click();
            radioElements[0].click();
            fixture.detectChanges();
            const radios = fixture.nativeElement.querySelectorAll('nx-radio');
            expect(radios[0].classList).not.toContain('has-error');
        });

        it('Should display nx-errors when invalid', () => {
            createTestComponent(RadioGroupValidation);
            let errors = fixture.nativeElement.querySelectorAll('nx-error');
            expect(errors.length).toBe(0);

            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            errors = fixture.nativeElement.querySelectorAll('nx-error');
            expect(errors.length).toBe(1);
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicRadio);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('has no accessibility violations', async () => {
            createTestComponent(RadioGroupTest);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: ` <nx-radio>Label</nx-radio> `,
})
class BasicRadio extends RadioTest {}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <nx-radio>Label</nx-radio> `,
})
class BasicRadioOnPush extends RadioTest {}

@Component({
    template: ` <nx-radio [negative]="negative">Label</nx-radio> `,
})
class ConfigurableRadio extends RadioTest {
    negative = true;
}

@Component({
    template: ` <nx-radio></nx-radio> `,
})
class LabellessRadio extends RadioTest {}

@Component({
    template: `
        <nx-radio-group [name]="name" [(ngModel)]="templateModel">
            <nx-radio *ngFor="let fruit of data" [nxValue]="fruit">{{ fruit }}</nx-radio>
            <nx-radio nxValue="1">1</nx-radio>
        </nx-radio-group>
    `,
})
class DynamicRadio extends RadioTest {
    data = ['Lemons', 'Apples', 'Oranges'];
    name = 'dynamicTest';
}

@Component({
    template: `
        <nx-radio-group name="groupTest">
            <nx-radio nxValue="0">0</nx-radio>
            <nx-radio nxValue="1">1</nx-radio>
        </nx-radio-group>
    `,
})
class BasicRadioGroup extends RadioTest {}

@Component({
    template: `
        <nx-radio-group name="groupTest" [(nxValue)]="templateModel" [negative]="groupNegative">
            <nx-radio nxValue="0" [negative]="radioNegative">0</nx-radio>
            <nx-radio nxValue="1">1</nx-radio>
        </nx-radio-group>
    `,
})
class MultipleRadio extends RadioTest {
    groupNegative = true;
    radioNegative = false;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <nx-radio-group name="groupTest">
            <nx-radio nxValue="0">0</nx-radio>
            <nx-radio nxValue="1">1</nx-radio>
        </nx-radio-group>
    `,
})
class MultipleRadioOnPush extends RadioTest {}

@Component({
    template: `
        <nx-radio-group name="groupTest" [nxDisabled]="disabled">
            <nx-radio nxValue="0">0</nx-radio>
            <nx-radio nxValue="1">1</nx-radio>
        </nx-radio-group>
    `,
})
class MultipleRadioDisabled extends RadioTest {
    disabled = true;
}

@Component({
    template: `
        <form [formGroup]="testForm">
            <nx-radio-group name="reactiveTest" formControlName="radioTestReactive">
                <nx-radio nxValue="0">0</nx-radio>
                <nx-radio nxValue="1">1</nx-radio>
            </nx-radio-group>
            <p>Form value: {{ testForm.value | json }}</p>
            <p>Form status: {{ testForm.status | json }}</p>
        </form>
    `,
})
class ReactiveRadio extends RadioTest {
    public fb;

    constructor() {
        super();

        this.fb = new FormBuilder();

        this.testForm = this.fb.group({
            radioTestReactive: new FormControl('1'),
        });
    }
}
@Component({
    template: `
        <nx-radio-group name="groupTest" [(ngModel)]="templateModel">
            <nx-radio nxValue="0">0</nx-radio>
            <nx-radio nxValue="1">1</nx-radio>
        </nx-radio-group>
    `,
})
class GroupWithNgModel extends RadioTest {}

@Component({
    template: `
        <form [formGroup]="testForm" (ngSubmit)="onSubmit()">
            <nx-radio-group name="reactiveTest" formControlName="radioTestReactive" [required]="true">
                <nx-label [size]="'small'">What do you prefer?</nx-label>
                <nx-error appearance="text"> Please make a choice. </nx-error>
                <nx-radio nxValue="coffee" [labelSize]="'small'" class="radio-item">Coffee</nx-radio>
                <nx-radio nxValue="tea" [labelSize]="'small'" class="radio-item">Tea</nx-radio>
                <nx-radio nxValue="water" [labelSize]="'small'" class="radio-item">Water</nx-radio>
            </nx-radio-group>
            <br />
            <button type="submit" nxButton="primary">Submit</button>
        </form>
    `,
})
class RadioGroupValidation extends RadioTest {
    testForm!: FormGroup;
    submitted = false;
    @ViewChild(NxErrorComponent) radioGroupError!: NxErrorComponent;

    constructor(private formBuilder: FormBuilder) {
        super();

        this.createForm();
    }

    createForm() {
        this.testForm = this.formBuilder.group({
            radioTestReactive: [null, Validators.required],
        });
    }

    onSubmit() {
        this.submitted = true;
    }
}

@Component({
    template: `
        <form [formGroup]="testForm" (ngSubmit)="onSubmit()">
            <nx-radio-group name="reactiveTest" formControlName="radioTestReactive" [required]="true">
                <nx-label [size]="'small'">What do you prefer?</nx-label>
                <nx-error appearance="text"> Please make a choice. </nx-error>
                <nx-radio nxValue="coffee" [labelSize]="'small'" class="radio-item">Coffee</nx-radio>
                <nx-radio nxValue="tea" [labelSize]="'small'" class="radio-item">Tea</nx-radio>
                <nx-radio nxValue="water" [labelSize]="'small'" class="radio-item">Water</nx-radio>
            </nx-radio-group>
            <br />
            <button type="submit" nxButton="primary">Submit</button>
        </form>
    `,
})
class RadioGroupValidationTouched extends RadioTest {
    testForm!: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder) {
        super();

        this.createForm();

        Object.keys(this.testForm.controls).forEach(field => {
            const control = this.testForm.get(field);
            control!.markAsTouched({ onlySelf: true });
        });
    }

    createForm() {
        this.testForm = this.formBuilder.group({
            radioTestReactive: [null, Validators.required],
        });
    }

    onSubmit() {
        this.submitted = true;
    }
}

@Component({
    template: `
        <nx-radio-group name="radioGroupTest">
            <nx-label>What do you prefer?</nx-label>
            <nx-radio nxValue="0">0</nx-radio>
            <nx-radio nxValue="1">1</nx-radio>
        </nx-radio-group>
    `,
})
class RadioGroupTest extends RadioTest {}
