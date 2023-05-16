import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxSpinnerComponent, SpinnerSize } from './spinner.component';
import { NxSpinnerModule } from './spinner.module';

@Directive()
abstract class SpinnerTest {
    @ViewChild(NxSpinnerComponent) spinnerInstance!: NxSpinnerComponent;

    size: SpinnerSize = 'small';
    negative!: boolean;
}

describe('nxSpinnerComponent', () => {
    let fixture: ComponentFixture<SpinnerTest>;
    let testInstance: SpinnerTest;
    let componentInstance: NxSpinnerComponent;
    let spinnerNativeElement: HTMLElement;

    function createTestComponent(component: Type<SpinnerTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        componentInstance = testInstance.spinnerInstance;
        spinnerNativeElement = fixture.nativeElement.querySelector('nx-spinner') as HTMLElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicTestSpinner, OnPushSpinner, ConfigurableSpinner],
            imports: [NxSpinnerModule],
        }).compileComponents();
    }));

    it('should create', () => {
        createTestComponent(BasicTestSpinner);
        expect(componentInstance).toBeTruthy();
    });

    it('should render a small spinner by default', () => {
        createTestComponent(BasicTestSpinner);
        expect(spinnerNativeElement.className).toMatch('nx-spinner--small');
        expect(componentInstance.size).toBe('small');
    });

    it('should update on size change', () => {
        createTestComponent(ConfigurableSpinner);
        expect(spinnerNativeElement).toHaveClass('nx-spinner--small');
        expect(componentInstance.size).toBe('small');

        testInstance.size = 'medium';
        fixture.detectChanges();
        expect(spinnerNativeElement).toHaveClass('nx-spinner--medium');
        expect(componentInstance.size).toBe('medium');

        testInstance.size = 'large';
        fixture.detectChanges();
        expect(spinnerNativeElement).toHaveClass('nx-spinner--large');
        expect(componentInstance.size).toBe('large');
    });

    it('should update on negative change', () => {
        createTestComponent(ConfigurableSpinner);
        expect(componentInstance.negative).toBeFalse();
        expect(spinnerNativeElement).not.toHaveClass('nx-spinner--negative');

        testInstance.negative = true;
        fixture.detectChanges();
        expect(componentInstance.negative).toBeTrue();
        expect(spinnerNativeElement).toHaveClass('nx-spinner--negative');
    });

    describe('programmatic changes', () => {
        it('should update on size change', () => {
            createTestComponent(OnPushSpinner);

            componentInstance.size = 'medium';
            fixture.detectChanges();
            expect(spinnerNativeElement).toHaveClass('nx-spinner--medium');
        });

        it('should update on negative change', () => {
            createTestComponent(OnPushSpinner);

            componentInstance.negative = true;
            fixture.detectChanges();
            expect(spinnerNativeElement).toHaveClass('nx-spinner--negative');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicTestSpinner);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-spinner></nx-spinner>`,
})
class BasicTestSpinner extends SpinnerTest {}

@Component({
    template: `<nx-spinner [size]="size" [negative]="negative"></nx-spinner>`,
})
class ConfigurableSpinner extends SpinnerTest {}

@Component({
    template: `<nx-spinner [size]="size" [negative]="negative"></nx-spinner>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnPushSpinner extends SpinnerTest {}
