import { Component, Directive, ElementRef, Type, ViewChild } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NxLabelModule } from '@aposin/ng-aquila/base';

import { NxStepperNextDirective, NxStepperPreviousDirective } from '../buttons';
import { NxProgressStepperDirective } from '../progress-stepper.component';
import { NxProgressStepperModule } from '../progress-stepper.module';
import { NxSingleStepperComponent } from './single-step.component';

@Directive()
abstract class SingleStepTest {
    @ViewChild(NxProgressStepperDirective) componentInstance!: NxProgressStepperDirective;
    @ViewChild(NxProgressStepperDirective, { read: ElementRef }) componentInstanceRef!: ElementRef;

    selectedIndex = 0;
}

describe('NxSingleStepperComponent', () => {
    let fixture: ComponentFixture<SingleStepTest>;
    let testInstance: SingleStepTest;
    let singleStepInstance: NxSingleStepperComponent;

    function createTestComponent(component: Type<SingleStepTest>) {
        fixture = TestBed.createComponent(component);
        testInstance = fixture.componentInstance;
        singleStepInstance = fixture.debugElement.query(By.css('nx-single-stepper')).componentInstance;
    }

    function getPreviousButton(index: number) {
        return fixture.debugElement.queryAll(By.directive(NxStepperPreviousDirective))[index].nativeElement;
    }

    function getNextButton(index: number) {
        return fixture.debugElement.queryAll(By.directive(NxStepperNextDirective))[index].nativeElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SingleStepBasicTest, SingleStepCustomLabelTest, SingleStepTitleTest, DirectivesTest],
            imports: [NxProgressStepperModule, NxLabelModule],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        }).compileComponents();
    }));

    it('should create the component', fakeAsync(() => {
        createTestComponent(SingleStepBasicTest);
        expect(singleStepInstance).toBeTruthy();
    }));

    it('should accept custom next label', fakeAsync(() => {
        createTestComponent(SingleStepCustomLabelTest);
        expect(singleStepInstance.rightLabel).toBe('right');
    }));

    it('should show a title', fakeAsync(() => {
        createTestComponent(SingleStepTitleTest);
        expect(fixture.nativeElement.innerText).toContain('MyTitle');
    }));

    it('should move to the next step on click', fakeAsync(() => {
        createTestComponent(DirectivesTest);
        flush();
        const nextButton = getNextButton(0);
        nextButton.click();
        expect(singleStepInstance.selectedIndex).toBe(1);
    }));

    it('should move to the previous step on click', fakeAsync(() => {
        createTestComponent(DirectivesTest);
        flush();
        testInstance.selectedIndex = 2;
        fixture.detectChanges();
        const previousButton = getPreviousButton(2);
        previousButton.click();
        expect(singleStepInstance.selectedIndex).toBe(1);
    }));

    it('should disable the previous button', fakeAsync(() => {
        createTestComponent(DirectivesTest);
        flush();
        const previousButton = getPreviousButton(1);
        expect(previousButton.disabled).toBeTrue();
        testInstance.selectedIndex = 1;
        fixture.detectChanges();
        expect(previousButton.disabled).toBeFalse();
        testInstance.selectedIndex = 0;
        fixture.detectChanges();
        expect(previousButton.disabled).toBeTrue();
    }));

    it('should disable next button', fakeAsync(() => {
        createTestComponent(DirectivesTest);
        flush();
        const nextButton = getNextButton(2);
        const secondNextButton = getNextButton(3);
        expect(nextButton.disabled).toBeFalse();
        testInstance.selectedIndex = 3;
        fixture.detectChanges();
        expect(nextButton.disabled).toBeTrue();
        expect(secondNextButton.disabled).toBeTrue();
        testInstance.selectedIndex = 2;
        fixture.detectChanges();
        expect(nextButton.disabled).toBeFalse();
    }));

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(SingleStepBasicTest);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-single-stepper>
            <nx-step label="Step 1"> step 1 content </nx-step>
            <nx-step label="Step 2"> step 2 content </nx-step>
        </nx-single-stepper>
    `,
})
class SingleStepBasicTest extends SingleStepTest {}

@Component({
    template: `
        <nx-single-stepper nextLabel="right">
            <nx-step label="Step 1"> step 1 content </nx-step>
            <nx-step label="Step 2"> step 2 content </nx-step>
        </nx-single-stepper>
    `,
})
class SingleStepCustomLabelTest extends SingleStepTest {}

@Component({
    template: `
        <nx-single-stepper>
            <nx-label>MyTitle</nx-label>
            <nx-step label="Step 1"> step 1 content </nx-step>
            <nx-step label="Step 2"> step 2 content </nx-step>
        </nx-single-stepper>
    `,
})
class SingleStepTitleTest extends SingleStepTest {}

@Component({
    template: `
        <nx-single-stepper [selectedIndex]="selectedIndex">
            <nx-step label="Step 1">
                step 1 content

                <button type="button" nxStepperPrevious>Previous</button>
                <button type="button" nxStepperNext>Next</button>
            </nx-step>
            <nx-step label="Step 2">
                step 2 content

                <button type="button" nxStepperPrevious>Previous</button>
                <button type="button" nxStepperNext>Next</button>
            </nx-step>
            <nx-step label="Step 3">
                step 3 content

                <button type="button" nxStepperPrevious>Previous</button>
                <button type="button" nxStepperNext>Next</button>
            </nx-step>
            <nx-step label="Step 4">
                step 4 content

                <button type="button" nxStepperPrevious>Previous</button>
                <button type="button" nxStepperNext>Next</button>
            </nx-step>
        </nx-single-stepper>
    `,
})
class DirectivesTest extends SingleStepTest {}
