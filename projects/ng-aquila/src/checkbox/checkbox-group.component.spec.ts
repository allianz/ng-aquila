import { Component, Directive, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';

import { NxCheckboxComponent, NxCheckboxGroupChangeEvent, NxCheckboxGroupComponent } from './checkbox.component';
import { NxCheckboxModule } from './checkbox.module';

@Directive()
abstract class CheckboxGroupTest {
    @ViewChild(NxCheckboxGroupComponent) checkboxGroupInstance!: NxCheckboxGroupComponent;
    @ViewChildren(NxCheckboxComponent) checkboxInstances!: QueryList<NxCheckboxComponent>;

    checked = false;
    myFormGroup!: FormGroup;
    labelSize!: string;
    disabled = false;
    negative = false;
}

describe('NxCheckboxGroupComponent', () => {
    let fixture: ComponentFixture<CheckboxGroupTest>;
    let testInstance: CheckboxGroupTest;
    let checkboxGroupInstance: NxCheckboxGroupComponent;
    let checkboxInstances: QueryList<NxCheckboxComponent>;
    let checkboxElements: NodeListOf<HTMLInputElement>;

    function createTestComponent(component: Type<CheckboxGroupTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        checkboxGroupInstance = testInstance.checkboxGroupInstance;
        checkboxInstances = testInstance.checkboxInstances;
        checkboxElements = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicCheckboxGroup, CheckboxGroupValidation, CheckboxGroupDynamic, CheckboxGroupReactive, ConditionalCheckboxGroupReactive],
            imports: [NxCheckboxModule, FormsModule, NxErrorModule, NxLabelModule, ReactiveFormsModule],
        }).compileComponents();
    }));

    it('should displays a checkbox-group with a checkboxes', () => {
        createTestComponent(BasicCheckboxGroup);
        expect(testInstance).toBeTruthy();
    });

    it('should inherit the same name as the checkbox-group', () => {
        createTestComponent(BasicCheckboxGroup);
        checkboxInstances.forEach(checkbox => {
            expect(checkbox.name).toBe('terms');
        });
    });

    it('should disable every checkbox inside a disabled checkbox group', () => {
        createTestComponent(BasicCheckboxGroup);
        checkboxGroupInstance.disabled = true;
        fixture.detectChanges();
        checkboxInstances.forEach(checkbox => {
            expect(checkbox.disabled).toBeTrue();
        });
    });

    it('should update disabled on formGroup update', () => {
        createTestComponent(CheckboxGroupValidation);
        expect(testInstance.myFormGroup.get('terms')!.disabled).toBeFalse();
        expect(checkboxGroupInstance.disabled).toBeFalse();

        testInstance.myFormGroup.get('terms')!.disable();
        expect(testInstance.myFormGroup.disabled).toBeTrue();
        expect(checkboxGroupInstance.disabled).toBeTrue();

        testInstance.myFormGroup.get('terms')!.enable();
        expect(testInstance.myFormGroup.disabled).toBeFalse();
        expect(checkboxGroupInstance.disabled).toBeFalse();
    });

    it('Every checkbox should be negative', () => {
        createTestComponent(BasicCheckboxGroup);
        checkboxGroupInstance.negative = true;
        fixture.detectChanges();
        checkboxInstances.forEach(checkbox => {
            expect(checkbox.negative).toBeTrue();
        });
    });

    it('should have nx-error children on error', fakeAsync(() => {
        createTestComponent(CheckboxGroupValidation);
        tick();

        // none of the checkboxes should be selected for an error
        [1, 2].forEach(i => checkboxElements[i].click());
        fixture.detectChanges();

        let errors = fixture.nativeElement.querySelectorAll('nx-error') as NodeListOf<HTMLInputElement>;
        expect(errors).toHaveSize(1);
        expect(checkboxGroupInstance.errorState).toBeTruthy();

        [0, 1, 2].forEach(i => checkboxElements[i].click());
        fixture.detectChanges();

        errors = fixture.nativeElement.querySelectorAll('nx-error') as NodeListOf<HTMLInputElement>;
        expect(errors).toHaveSize(0);
        expect(checkboxGroupInstance.errorState).toBeFalsy();
    }));

    it('should mark as checked the passed values', fakeAsync(() => {
        createTestComponent(CheckboxGroupValidation);
        const checkedValues = ['Term 2', 'Term 3'];
        fixture.detectChanges();
        tick();
        checkboxInstances.forEach(checkbox => {
            if (checkedValues.includes(checkbox.value)) {
                expect(checkbox.checked).toBeTrue();
            }
        });
    }));

    it('should unset the entire set of passed values correctly', fakeAsync(() => {
        createTestComponent(CheckboxGroupValidation);
        testInstance.myFormGroup.get('terms')?.setValue(['Term 2', 'Term 3']);
        testInstance.myFormGroup.get('terms')?.setValue([]);
        fixture.detectChanges();
        tick();
        checkboxInstances.forEach(checkbox => {
            expect(checkbox.checked).toBeFalse();
        });
    }));

    it('should add the checkboxes dynamically', fakeAsync(() => {
        createTestComponent(CheckboxGroupDynamic);
        fixture.detectChanges();
        tick();
        expect(checkboxInstances).toHaveSize(3);
    }));

    it('should add the checkboxes dynamically and checked', fakeAsync(() => {
        createTestComponent(CheckboxGroupDynamic);
        fixture.detectChanges();
        tick();
        checkboxInstances.forEach(checkbox => {
            expect(checkbox.checked).toBeTrue();
        });
    }));

    it('should add new checkbox and checked', fakeAsync(() => {
        createTestComponent(CheckboxGroupDynamic);
        const dynamicTest = fixture.componentInstance as CheckboxGroupDynamic;
        dynamicTest.addNewCb();
        fixture.detectChanges();
        tick();
        expect(checkboxInstances).toHaveSize(4);
    }));

    it('should remove one checkbox', fakeAsync(() => {
        createTestComponent(CheckboxGroupDynamic);
        const dynamicTest = fixture.componentInstance as CheckboxGroupDynamic;
        dynamicTest.removeCB();
        fixture.detectChanges();
        tick();
        expect(checkboxInstances).toHaveSize(2);
    }));

    it('should emit an event on checked changed', fakeAsync(() => {
        createTestComponent(BasicCheckboxGroup);

        const spy = jasmine.createSpy('checkbox selection');
        const subscription = fixture.componentInstance.checkboxGroupInstance.selectionChange.subscribe(spy);
        checkboxElements[0].click();
        fixture.detectChanges();
        tick();
        expect(spy).toHaveBeenCalledWith(jasmine.any(NxCheckboxGroupChangeEvent));
        expect(spy).toHaveBeenCalledTimes(1);
        subscription.unsubscribe();
    }));

    it('sets checked state of the children on initialisation', fakeAsync(() => {
        createTestComponent(CheckboxGroupReactive);
        const checkedValues = ['Term 1', 'Term 2'];
        fixture.detectChanges();
        tick();
        checkboxInstances.forEach(checkbox => {
            expect(checkbox.checked).toBe(checkedValues.includes(checkbox.value));
        });
    }));

    it('initializes correctly in a conditionally displayed checkbox group', fakeAsync(() => {
        createTestComponent(ConditionalCheckboxGroupReactive);
        tick();
        checkboxInstances.forEach((checkbox, i) => {
            expect(checkbox.checked).toBe(i !== 2);
        });
    }));

    it('should set the control to dirty when value changes in the DOM', fakeAsync(() => {
        createTestComponent(CheckboxGroupReactive);
        const submitButton = fixture.nativeElement.querySelector('#submit-button') as HTMLButtonElement;

        submitButton.click();
        tick();
        fixture.detectChanges();

        expect(testInstance.myFormGroup.get('terms')!.dirty).withContext('Expected control to start out pristine.').toBeFalse();

        checkboxElements[0].click();
        tick();
        fixture.detectChanges();

        expect(testInstance.myFormGroup.get('terms')!.dirty).withContext('Expected control to be dirty.').toBeTrue();
    }));

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicCheckboxGroup);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-checkbox-group name="terms">
            <nx-label [id]="'terms-label'">Accept terms</nx-label>
            <nx-checkbox>Term 1</nx-checkbox>
            <nx-checkbox>Term 2</nx-checkbox>
            <nx-checkbox>Term 3</nx-checkbox>
        </nx-checkbox-group>
    `,
})
class BasicCheckboxGroup extends CheckboxGroupTest {}

@Component({
    template: `
        <form [formGroup]="myFormGroup">
            <nx-checkbox-group name="terms" formControlName="terms" required>
                <nx-label>Accept terms</nx-label>
                <nx-checkbox value="Term 1">Term 1</nx-checkbox>
                <nx-checkbox value="Term 2">Term 2</nx-checkbox>
                <nx-checkbox value="Term 3">Term 3</nx-checkbox>
                <nx-error appearance="text"> Please accept all our terms and conditions </nx-error>
            </nx-checkbox-group>
        </form>
    `,
})
class CheckboxGroupValidation extends CheckboxGroupTest {
    myFormGroup!: FormGroup;

    checkboxGroupCheckedValues = ['Term 2', 'Term 3'];

    constructor(private readonly fb: FormBuilder) {
        super();
        this.createForm();
    }

    createForm() {
        this.myFormGroup = this.fb.group({
            terms: [this.checkboxGroupCheckedValues, Validators.required],
        });
    }
}

@Component({
    template: `
        <form [formGroup]="myFormGroup">
            <nx-checkbox-group name="terms" formControlName="terms" required>
                <nx-label [id]="'terms'">Select your choices</nx-label>
                <nx-error appearance="text"> Please select at least one checkbox. </nx-error>
                <nx-checkbox *ngFor="let key of data" [value]="key" checked>{{ key }}</nx-checkbox>
            </nx-checkbox-group>
        </form>
    `,
})
class CheckboxGroupDynamic extends CheckboxGroupTest {
    myFormGroup!: FormGroup;

    data = ['one', 'two', 'three'];
    i = 1;

    constructor(private readonly fb: FormBuilder) {
        super();
        this.createForm();
    }

    createForm() {
        this.myFormGroup = this.fb.group({
            terms: [[], Validators.required],
        });
    }

    addNewCb() {
        this.data.push('New Value ' + this.i);
        this.i++;
    }

    removeCB() {
        this.data.shift();
    }
}

@Component({
    template: `
        <form [formGroup]="myFormGroup">
            <nx-checkbox-group name="terms" formControlName="terms">
                <nx-label>Select your choices</nx-label>
                <nx-checkbox value="Term 1">Checkbox 1</nx-checkbox>
                <nx-checkbox value="Term 2">Checkbox 2</nx-checkbox>
                <nx-checkbox value="Term 3">Checkbox 3</nx-checkbox>
            </nx-checkbox-group>
            <p>Form value: {{ myFormGroup.value | json }}</p>
            <p>Form status: {{ myFormGroup.status | json }}</p>
            <button nxButton="primary small" id="submit-button" type="submit">Click</button>
        </form>
    `,
})
export class CheckboxGroupReactive extends CheckboxGroupTest {
    myFormGroup: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        super();
        this.myFormGroup = this.fb.group({
            terms: [['Term 1', 'Term 2'], null],
        });
    }
}

@Component({
    template: `
        <form [formGroup]="myFormGroup">
            <nx-checkbox-group formControlName="checkboxes">
                <nx-checkbox *ngFor="let checkbox of checkboxes" [value]="checkbox">{{ checkbox }}</nx-checkbox>
            </nx-checkbox-group>
        </form>
    `,
})
export class ConditionalCheckboxGroupReactive extends CheckboxGroupTest {
    myFormGroup: FormGroup;
    showCheckboxes = true;
    checkboxes: string[] = ['Term 1', 'Term 2', 'Term 3'];

    constructor(private readonly fb: FormBuilder) {
        super();
        this.myFormGroup = this.fb.group({
            checkboxes: [['Term 1', 'Term 2']],
        });
    }
}
