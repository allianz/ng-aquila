import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxIndicatorComponent } from './indicator.component';
import { NxIndicatorModule } from './indicator.module';

@Directive()
abstract class IndicatorTest {
    @ViewChild(NxIndicatorComponent) indicatorInstance!: NxIndicatorComponent;
}

describe('NxIndicatorComponent', () => {
    let fixture: ComponentFixture<IndicatorTest>;
    let testInstance: IndicatorTest;
    let indicatorInstance: NxIndicatorComponent;
    let indicatorNativeElement: HTMLButtonElement;

    function createTestComponent(component: Type<IndicatorTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        indicatorInstance = testInstance.indicatorInstance;
        indicatorNativeElement = fixture.nativeElement.querySelector('nx-indicator') as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicIndicator],
            imports: [NxIndicatorModule],
        }).compileComponents();
    }));

    it('creates the component', waitForAsync(() => {
        createTestComponent(BasicIndicator);
        expect(indicatorInstance).toBeTruthy();
    }));

    describe('basic indicator', () => {
        beforeEach(() => {
            createTestComponent(BasicIndicator);
        });

        it('has no positioning classes by default', () => {
            expect(indicatorNativeElement).toHaveClass('nx-indicator');
            expect(indicatorNativeElement.classList).toHaveSize(1);
        });

        it('sets positioning class when passed through input', () => {
            indicatorInstance.position = 'over-icon';
            fixture.detectChanges();

            expect(indicatorNativeElement).toHaveClass('nx-indicator--over-icon');
        });

        it('sets multiple positioning classes when passed through input', () => {
            indicatorInstance.position = 'over-text with-overlap';
            fixture.detectChanges();

            expect(indicatorNativeElement).toHaveClass('nx-indicator--over-text');
            expect(indicatorNativeElement).toHaveClass('nx-indicator--with-overlap');
        });
    });
});

@Component({
    template: `<nx-indicator [position]="position">1</nx-indicator>`,
})
class BasicIndicator extends IndicatorTest {
    position = '';
}
