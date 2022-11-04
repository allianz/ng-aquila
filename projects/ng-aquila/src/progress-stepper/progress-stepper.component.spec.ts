import { Component, Directive, ElementRef, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NxProgressStepperDirective } from './progress-stepper.component';
import { NxProgressStepperModule } from './progress-stepper.module';

@Directive()
abstract class ProgressStepperTest {
    @ViewChild(NxProgressStepperDirective) componentInstance!: NxProgressStepperDirective;
    @ViewChild(NxProgressStepperDirective, { read: ElementRef }) componentInstanceRef!: ElementRef;
}

describe('NxProgressStepperDirective', () => {
    let fixture: ComponentFixture<ProgressStepperTest>;
    let testInstance: ProgressStepperTest;
    let componentInstance: NxProgressStepperDirective;
    let componentInstanceRef: ElementRef;

    function createTestComponent(component: Type<ProgressStepperTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        componentInstance = testInstance.componentInstance;
        componentInstanceRef = testInstance.componentInstanceRef;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressStepperBasicComponent],
            imports: [NxProgressStepperModule, FormsModule],
        }).compileComponents();
    }));

    it('should create the component', fakeAsync(() => {
        createTestComponent(ProgressStepperBasicComponent);
        expect(componentInstance).toBeTruthy();
    }));

    it('should hold the correct number of steps', fakeAsync(() => {
        createTestComponent(ProgressStepperBasicComponent);
        expect(componentInstance._steps).toHaveSize(2);
    }));

    it('should use the custom current step label', () => {
        createTestComponent(ProgressStepperBasicComponent);
        expect(componentInstance.currentStepLabel).toBe('myLabel');
    });
});

/**
 * The loop for adding the steps is needed to test if the steps do work properly
 * when there is a level between `nxProgressStepper` and the `nx-step` children.
 */
@Component({
    template: `
        <div nxProgressStepper currentStepLabel="myLabel">
            <ng-container *ngFor="let step of steps">
                <nx-step [label]="step"> step {{ step }} content </nx-step>
            </ng-container>
        </div>
    `,
})
class ProgressStepperBasicComponent extends ProgressStepperTest {
    steps = ['step1', 'step2'];
}
