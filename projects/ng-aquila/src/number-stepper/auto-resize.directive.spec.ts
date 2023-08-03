import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NxAutoResizeDirective } from './auto-resize.directive';
import { NxNumberStepperModule } from './number-stepper.module';

@Directive()
abstract class ResizeTest {
    value = '10000';
    @ViewChild(NxAutoResizeDirective) inputInstance!: NxAutoResizeDirective;
}

describe('NxAutoResizeDirective', () => {
    let fixture: ComponentFixture<ResizeTest>;
    let testInstance: ResizeTest;
    let inputInstance: NxAutoResizeDirective;
    let nativeElement: HTMLInputElement | HTMLTextAreaElement;
    let styles;

    function createTestComponent(component: Type<ResizeTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        inputInstance = testInstance.inputInstance;
        nativeElement = fixture.nativeElement.querySelector('input');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DefaultResize, DisabledResize, MinWidthResize, BorderPaddingResize, InitTest, InitOnPushTest],
            imports: [FormsModule, NxNumberStepperModule],
        }).compileComponents();
    }));

    it('should change input width on initialization', () => {
        createTestComponent(InitTest);
        // autoresize implementation is pretty limited to input and change event at the moment
        // so we fake the event for initialization. the number stepper component takes care in its
        // context for this
        nativeElement.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        styles = window.getComputedStyle(nativeElement);
        expect(parseFloat(styles.width)).toBeGreaterThan(22);
    });

    it('should change input width on initialization with onPush', () => {
        createTestComponent(InitOnPushTest);
        nativeElement.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        styles = window.getComputedStyle(nativeElement);
        expect(parseFloat(styles.width)).toBeGreaterThan(22);
    });

    it('should change the input width', () => {
        createTestComponent(DefaultResize);
        styles = window.getComputedStyle(nativeElement);
        const before = parseFloat(styles.width);
        nativeElement.value = '1000';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        styles = window.getComputedStyle(nativeElement);
        const after = parseFloat(styles.width);
        expect(before).toBeLessThan(after);
    });

    it('should not change the width if disabled', () => {
        createTestComponent(DisabledResize);
        styles = window.getComputedStyle(nativeElement);
        const before = parseFloat(styles.width);
        nativeElement.value = '1000';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        styles = window.getComputedStyle(nativeElement);
        const after = parseFloat(styles.width);
        expect(before).toEqual(after);
    });

    it('should not change below min-width', () => {
        createTestComponent(MinWidthResize);
        styles = window.getComputedStyle(nativeElement);
        nativeElement.value = '1000';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        nativeElement.value = '';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        styles = window.getComputedStyle(nativeElement);
        const after = parseFloat(styles.width);
        expect(after).toBeGreaterThanOrEqual(22);
    });

    it('should attach event listeners without binding', () => {
        createTestComponent(DefaultResize);
        nativeElement.value = '1000';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        styles = window.getComputedStyle(nativeElement);
        expect(parseFloat(styles.width)).toBeGreaterThan(22);
    });

    it('should remove event listeners on destroy', () => {
        createTestComponent(DefaultResize);
        spyOn(nativeElement, 'removeEventListener');

        fixture.destroy();
        expect(nativeElement.removeEventListener).toHaveBeenCalledWith('input', testInstance.inputInstance.updateInputWidth, true);
        expect(nativeElement.removeEventListener).toHaveBeenCalledWith('change', testInstance.inputInstance.updateInputWidth, true);
    });

    it('should add event listeners when enabled', () => {
        createTestComponent(DisabledResize);
        inputInstance.resize = true;
        nativeElement.value = '1000';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        styles = window.getComputedStyle(nativeElement);
        expect(parseFloat(styles.width)).toBeGreaterThan(22);
    });

    it('should remove event listeners when disabled', () => {
        createTestComponent(DefaultResize);
        inputInstance.resize = false;
        nativeElement.value = '1000';
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        styles = window.getComputedStyle(nativeElement);
        expect(parseFloat(styles.width)).toBe(22);
    });

    describe('Error handling', () => {
        it('should not throw even environment does not have Canvas', fakeAsync(() => {
            createTestComponent(DefaultResize);

            expect(() => {
                const getContext = HTMLCanvasElement.prototype.getContext;
                HTMLCanvasElement.prototype.getContext = () => null;
                nativeElement.value = '1000';
                nativeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();
                tick();

                HTMLCanvasElement.prototype.getContext = getContext;
            }).not.toThrow();
        }));
    });
});

@Component({
    template: `<input [nxAutoResize] class="testinput" />`,
    styles: ['.testinput { width: 22px; }'],
})
class DefaultResize extends ResizeTest {}

@Component({
    template: `<input [nxAutoResize] class="testinput" [(value)]="value" />`,
    styles: ['.testinput { width: 22px; }'],
})
class InitTest extends ResizeTest {}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<input [nxAutoResize] class="testinput" [(value)]="value" />`,
    styles: ['.testinput { width: 22px; }'],
})
class InitOnPushTest extends ResizeTest {}

@Component({
    template: `<input [nxAutoResize]="false" class="testinput" />`,
    styles: ['.testinput { width: 22px; }'],
})
class DisabledResize extends ResizeTest {}

@Component({
    template: `<input [nxAutoResize] class="testinput" />`,
    styles: ['.testinput { width: 22px; min-width: 22px; }'],
})
class MinWidthResize extends ResizeTest {}

@Component({
    template: `<input [nxAutoResize] class="testinput" />`,
    styles: ['.testinput { width: 22px; padding: 1px; border: 1px solid black}'],
})
class BorderPaddingResize extends ResizeTest {}
