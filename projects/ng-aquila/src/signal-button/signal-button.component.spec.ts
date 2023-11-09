import { ENTER, ESCAPE, SPACE } from '@angular/cdk/keycodes';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxSignalButtonComponent } from './signal-button.component';
import { NxSignalButtonModule } from './signal-button.module';

@Directive()
abstract class SignalButtonTestDirective {
    @ViewChild(NxSignalButtonComponent) signalButtonInstance!: NxSignalButtonComponent;
}

describe('NxSignalButtonComponent', () => {
    let fixture: ComponentFixture<SignalButtonTestDirective>;
    let testInstance: SignalButtonTestDirective;
    let signalButtonInstance: NxSignalButtonComponent;
    let buttonNativeElement: HTMLButtonElement;
    let overlayContainer: OverlayContainer;

    function createTestComponent(component: Type<SignalButtonTestDirective>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        signalButtonInstance = testInstance.signalButtonInstance;
        buttonNativeElement = fixture.debugElement.query(By.css('button'))?.nativeElement as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [OverlayModule, NxSignalButtonModule, NxFormfieldModule, NxInputModule],
            declarations: [SignalButtonComponent],
        });
    }));

    beforeEach(() => {
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
        })();
    });

    function checkPopoverOpen(open: boolean) {
        fixture.detectChanges();
        tick();
        const content = getPopoverContent();
        if (open) {
            expect(content).toBeTruthy();
        } else {
            expect(content).toBeFalsy();
        }
    }

    function getCloseIcon(): HTMLSpanElement {
        return overlayContainer.getContainerElement().querySelector('.nx-popover__close-icon') as HTMLSpanElement;
    }

    function getPopoverContent(): HTMLDivElement {
        return overlayContainer.getContainerElement().querySelector('.nx-popover__content') as HTMLDivElement;
    }

    function getContextClass(context: any): HTMLDivElement {
        return fixture.debugElement.query(By.css('.context-' + context))?.nativeElement as HTMLDivElement;
    }

    function click() {
        buttonNativeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
    }

    describe('open by click', () => {
        it('should open the popover on click"', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();
            checkPopoverOpen(true);
            expect(getCloseIcon()).toBeTruthy();
        }));

        it('should close the popover by clicking on the close icon', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();
            getCloseIcon().click();
            expect(getPopoverContent()).toBeFalsy();
            flush();
        }));

        it('should close the popover by clicking on element again', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();
            click();
            expect(getPopoverContent()).toBeFalsy();
        }));

        it('should close the popover by clicking outside for nxTrigger="click"', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();
            document.body.dispatchEvent(new MouseEvent('click'));
            fixture.detectChanges();
            expect(getPopoverContent()).toBeFalsy();
            flush();
        }));

        it('should create focus trap', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();
            const focusTrapAnchors = overlayContainer.getContainerElement().querySelectorAll('.cdk-focus-trap-anchor');
            expect(focusTrapAnchors.length).toBeGreaterThan(0);
        }));

        it('should close the popover by clicking anywhere outside the component', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();
            flush();
            dispatchFakeEvent(document.body, 'click');
            fixture.detectChanges();
            flush();
            expect(getPopoverContent()).toBeFalsy();
        }));

        it('should close the popover by hitting Esc key', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();

            dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);

            expect(getPopoverContent()).toBeFalsy();
            flush();
        }));

        it('should not close the popover when clicking on it', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();
            getPopoverContent().click();
            fixture.detectChanges();
            checkPopoverOpen(true);
        }));
    });

    describe('keyboard', () => {
        it('should open popover by space key', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            buttonNativeElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: SPACE, which: SPACE }));

            fixture.detectChanges();
            flush();

            checkPopoverOpen(true);
        }));

        it('should open popover by enter key', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            buttonNativeElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: ENTER, which: ENTER }));

            fixture.detectChanges();
            flush();

            checkPopoverOpen(true);
        }));

        it('should close popover when hit space key on close button', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();
            checkPopoverOpen(true);

            getCloseIcon().dispatchEvent(new KeyboardEvent('keyup', { keyCode: SPACE, which: SPACE }));

            fixture.detectChanges();
            flush();

            checkPopoverOpen(false);
        }));

        it('should close popover when hit enter on close button', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            click();
            checkPopoverOpen(true);

            getCloseIcon().dispatchEvent(new KeyboardEvent('keyup', { keyCode: ENTER, which: ENTER }));

            fixture.detectChanges();

            flush();

            checkPopoverOpen(false);
        }));

        it('should not call preventDefault if trigger is button element', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            fixture.detectChanges();

            const keydownEvent = new KeyboardEvent('keydown', { keyCode: SPACE, which: SPACE });
            const spy = spyOn(keydownEvent, 'preventDefault');
            buttonNativeElement.dispatchEvent(keydownEvent);

            fixture.detectChanges();
            flush();

            checkPopoverOpen(true);
            expect(spy).not.toHaveBeenCalled();
        }));
    });

    describe('Focus states', () => {
        it('Should return back focus after closing popover', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            buttonNativeElement.focus();
            click();
            fixture.detectChanges();
            spyOn(buttonNativeElement, 'focus').and.callThrough();
            getCloseIcon().click();
            tick();

            expect(buttonNativeElement.focus).toHaveBeenCalled();
            flush();
        }));
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(SignalButtonComponent);
            buttonNativeElement.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });

    describe('Context', () => {
        it('should set warning context class', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            signalButtonInstance.context = 'warning';
            click();
            expect(getContextClass('warning')).toBeTruthy();
        }));

        it('should set error context class', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            signalButtonInstance.context = 'error';
            click();
            expect(getContextClass('error')).toBeTruthy();
        }));

        it('should set success context class', fakeAsync(() => {
            createTestComponent(SignalButtonComponent);
            signalButtonInstance.context = 'success';
            click();
            expect(getContextClass('success')).toBeTruthy();
        }));
    });
});

@Component({
    template: `<nx-signal-button [context]="context">This is the content of the success popover</nx-signal-button>`,
})
class SignalButtonComponent extends SignalButtonTestDirective {
    context = 'success';
}
