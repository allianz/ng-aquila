import { AnimationEvent } from '@angular/animations';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { CdkScrollable, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { ChangeDetectionStrategy, Component, DebugElement, ElementRef, EventEmitter, NgZone, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, flushMicrotasks, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { createKeyboardEvent } from '../cdk-test-utils';
import { NX_TOOLTIP_DEFAULT_OPTIONS, NX_TOOLTIP_PANEL_CLASS, NxTooltipDirective } from './tooltip.directive';
import { NxTooltipModule } from './tooltip.module';

function createFakeEvent(type: string, bubbles = false, cancelable = true) {
    return new Event(type, { bubbles, cancelable });
}

export function dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element): KeyboardEvent {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode)) as KeyboardEvent;
}

function dispatchEvent(node: Node | Window, event: Event): Event {
    node.dispatchEvent(event);
    return event;
}

function dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
}

function patchElementFocus(element: HTMLElement) {
    element.focus = () => dispatchFakeEvent(element, 'focus');
    element.blur = () => dispatchFakeEvent(element, 'blur');
}

const initialTooltipMessage = 'initial tooltip message';

describe('NxTooltipDirective', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let dir: { value: Direction; change: EventEmitter<Direction> };
    let platform: { IOS: boolean; isBrowser: boolean; ANDROID: boolean };
    let focusMonitor: FocusMonitor;

    beforeEach(() => {
        // Set the default Platform override that can be updated before component creation.
        platform = { IOS: false, isBrowser: true, ANDROID: false };

        TestBed.configureTestingModule({
            imports: [NxTooltipModule, OverlayModule, NoopAnimationsModule],
            declarations: [BasicTooltipDemo, ScrollableTooltipDemo, OnPushTooltipDemo, DynamicTooltipsDemo, TooltipOnTextFields, SelectableTooltip],
            providers: [
                { provide: Platform, useFactory: () => platform },
                {
                    provide: Directionality,
                    useFactory: () => (dir = { value: 'ltr', change: new EventEmitter() }),
                },
            ],
        });

        TestBed.compileComponents();
    });

    beforeEach(waitForAsync(() => {
        inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            focusMonitor = fm;
        })();
    }));

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        // Since we're resetting the testing module in some of the tests,
        // we can potentially have multiple overlay containers.
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    describe('basic usage', () => {
        let fixture: ComponentFixture<BasicTooltipDemo>;
        let buttonDebugElement: DebugElement;
        let buttonElement: HTMLButtonElement;
        let tooltipDirective: NxTooltipDirective;

        beforeEach(() => {
            fixture = TestBed.createComponent(BasicTooltipDemo);
            fixture.detectChanges();
            buttonDebugElement = fixture.debugElement.query(By.css('button'));
            buttonElement = buttonDebugElement.nativeElement as HTMLButtonElement;
            tooltipDirective = buttonDebugElement.injector.get<NxTooltipDirective>(NxTooltipDirective);
        });

        it('should show and hide the tooltip', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);

            tooltipDirective.show();
            tick(200); // Tick for the show delay (default is 200)

            expect(tooltipDirective._isTooltipVisible()).toBeTrue();

            fixture.detectChanges();

            // wait till animation has finished
            tick(500);

            // Make sure tooltip is shown to the user and animation has finished
            const tooltipElement = overlayContainerElement.querySelector('.nx-tooltip') as HTMLElement;
            expect(tooltipElement instanceof HTMLElement).toBeTrue();
            expect(tooltipElement.style.opacity).toBe('1');

            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);

            // After hide called, a timeout delay is created that will to hide the tooltip.
            const tooltipDelay = 1000;
            tooltipDirective.hide(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();

            // After the tooltip delay elapses, expect that the tooltip is not visible.
            tick(tooltipDelay);
            fixture.detectChanges();
            expect(tooltipDirective._isTooltipVisible()).toBeFalse();

            // On animation complete, should expect that the tooltip has been detached.
            flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));

        it('should be able to re-open a tooltip if it was closed by detaching the overlay', fakeAsync(() => {
            tooltipDirective.show();
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();
            fixture.detectChanges();
            tick(500);

            tooltipDirective._overlayRef?.detach();
            tick(200);
            fixture.detectChanges();
            expect(tooltipDirective._isTooltipVisible()).toBeFalse();
            flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);

            tooltipDirective.show();
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();
        }));

        it('should show with delay', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);

            const tooltipDelay = 1000;
            tooltipDirective.show(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBeFalse();

            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain('');

            tick(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
        }));

        it('should set a css class on the overlay panel element', fakeAsync(() => {
            tooltipDirective.show();
            fixture.detectChanges();
            tick(200);

            const overlayRef = tooltipDirective._overlayRef;

            expect(!!overlayRef).toBeTruthy();
            expect(overlayRef?.overlayElement)
                .withContext('Expected the overlay panel element to have the tooltip panel class set.')
                .toHaveClass(NX_TOOLTIP_PANEL_CLASS);
        }));

        it('should not show if disabled', fakeAsync(() => {
            // Test that disabling the tooltip will not set the tooltip visible
            tooltipDirective.disabled = true;
            tooltipDirective.show();
            fixture.detectChanges();
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeFalse();

            // Test to make sure setting disabled to false will show the tooltip
            // Sanity check to make sure everything was correct before (detectChanges, tick)
            tooltipDirective.disabled = false;
            tooltipDirective.show();
            fixture.detectChanges();
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();
        }));

        it('should hide if disabled while visible', fakeAsync(() => {
            // Display the tooltip with a timeout before hiding.
            tooltipDirective.hideDelay = 1000;
            tooltipDirective.show();
            fixture.detectChanges();
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();

            // Set tooltip to be disabled and verify that the tooltip hides.
            tooltipDirective.disabled = true;
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeFalse();
        }));

        it('should hide if the message is cleared while the tooltip is open', fakeAsync(() => {
            tooltipDirective.show();
            fixture.detectChanges();
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();

            fixture.componentInstance.message = '';
            fixture.detectChanges();
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeFalse();
        }));

        it('should not show if hide is called before delay finishes', waitForAsync(() => {
            assertTooltipInstance(tooltipDirective, false);

            const tooltipDelay = 1000;

            tooltipDirective.show(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBeFalse();

            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain('');
            tooltipDirective.hide();

            fixture.whenStable().then(() => {
                expect(tooltipDirective._isTooltipVisible()).toBeFalse();
            });
        }));

        it('should not show tooltip if message is not present or empty', () => {
            assertTooltipInstance(tooltipDirective, false);

            tooltipDirective.message = '';
            fixture.detectChanges();
            tooltipDirective.show();
            assertTooltipInstance(tooltipDirective, false);

            tooltipDirective.message = '   ';
            fixture.detectChanges();
            tooltipDirective.show();
            assertTooltipInstance(tooltipDirective, false);
        });

        it('should not follow through with hide if show is called after', fakeAsync(() => {
            tooltipDirective.show();
            tick(200); // Tick for the show delay (default is 200)
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();

            // After hide called, a timeout delay is created that will to hide the tooltip.
            const tooltipDelay = 1000;
            tooltipDirective.hide(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();

            // Before delay time has passed, call show which should cancel intent to hide tooltip.
            tooltipDirective.show();
            tick(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();
        }));

        it('should be able to update the tooltip position while open', fakeAsync(() => {
            tooltipDirective.position = 'bottom';
            tooltipDirective.show();
            tick(200);

            assertTooltipInstance(tooltipDirective, true);

            // @ts-expect-error fix nullability
            spyOn(tooltipDirective._overlayRef, 'updatePosition').and.callThrough();

            tooltipDirective.position = 'top';
            fixture.detectChanges();
            tick(100);

            assertTooltipInstance(tooltipDirective, true);
            expect(tooltipDirective._overlayRef?.updatePosition).toHaveBeenCalled();
        }));

        it('should not throw when updating the position for a closed tooltip', fakeAsync(() => {
            tooltipDirective.position = 'left';
            tooltipDirective.show(0);
            fixture.detectChanges();
            tick();

            tooltipDirective.hide(0);
            fixture.detectChanges();
            tick();

            // At this point the animation should be able to complete itself and trigger the
            // _animationDone function, but for unknown reasons in the test infrastructure,
            // this does not occur. Manually call the hook so the animation subscriptions get invoked.
            tooltipDirective._tooltipInstance?._animationDone({
                fromState: 'visible',
                toState: 'hidden',
                totalTime: 150,
                phaseName: 'done',
            } as AnimationEvent);

            expect(() => {
                tooltipDirective.position = 'right';
                fixture.detectChanges();
                tick();
            }).not.toThrow();
        }));

        it('should be able to modify the tooltip message', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);

            tooltipDirective.show();
            tick(200); // Tick for the show delay (default is 200)
            expect(tooltipDirective._tooltipInstance?.visibility).toBe('visible');

            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);

            const newMessage = 'new tooltip message';
            tooltipDirective.message = newMessage;

            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain(newMessage);
        }));

        it('should be removed after parent destroyed', fakeAsync(() => {
            tooltipDirective.show();
            tick(200); // Tick for the show delay (default is 200)
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();

            fixture.destroy();
            expect(overlayContainerElement.childNodes).toHaveSize(0);
            expect(overlayContainerElement.textContent).toBe('');
        }));

        it('should have an aria-described element with the tooltip message', () => {
            const dynamicTooltipsDemoFixture = TestBed.createComponent(DynamicTooltipsDemo);
            const dynamicTooltipsComponent = dynamicTooltipsDemoFixture.componentInstance;

            dynamicTooltipsComponent.tooltips = ['Tooltip One', 'Tooltip Two'];
            dynamicTooltipsDemoFixture.detectChanges();

            const buttons = dynamicTooltipsComponent.getButtons();
            const firstButtonAria = buttons[0].getAttribute('aria-describedby');
            expect(document.querySelector(`#${firstButtonAria}`)?.textContent).toBe('Tooltip One');

            const secondButtonAria = buttons[1].getAttribute('aria-describedby');
            expect(document.querySelector(`#${secondButtonAria}`)?.textContent).toBe('Tooltip Two');
        });

        it('should not try to dispose the tooltip when destroyed and done hiding', fakeAsync(() => {
            tooltipDirective.show();
            fixture.detectChanges();
            tick(150);

            const tooltipDelay = 1000;
            tooltipDirective.hide();
            tick(tooltipDelay); // Change the tooltip state to hidden and trigger animation start

            // Store the tooltip instance, which will be set to null after the button is hidden.
            const tooltipInstance = tooltipDirective._tooltipInstance;
            fixture.componentInstance.showButton = false;
            fixture.detectChanges();

            // At this point the animation should be able to complete itself and trigger the
            // _animationDone function, but for unknown reasons in the test infrastructure,
            // this does not occur. Manually call this and verify that doing so does not
            // throw an error.
            tooltipInstance?._animationDone({
                fromState: 'visible',
                toState: 'hidden',
                totalTime: 150,
                phaseName: 'done',
            } as AnimationEvent);
        }));

        it('should complete the afterHidden stream when tooltip is destroyed', fakeAsync(() => {
            tooltipDirective.show();
            fixture.detectChanges();
            tick(150);

            const spy = jasmine.createSpy('complete spy');
            const subscription = tooltipDirective._tooltipInstance?.afterHidden().subscribe({ complete: spy });

            tooltipDirective.hide(0);
            tick(200);
            fixture.detectChanges();
            tick(500);

            expect(spy).toHaveBeenCalled();
            subscription?.unsubscribe();
        }));

        it('should consistently position before and after overlay origin in ltr and rtl dir', () => {
            tooltipDirective.position = 'left';
            const leftOrigin = tooltipDirective._getOrigin(tooltipDirective.position);
            tooltipDirective.position = 'right';
            const rightOrigin = tooltipDirective._getOrigin(tooltipDirective.position);

            // Test expectations in RTL
            dir.value = 'rtl';
            dir.change.emit('rtl');
            fixture.detectChanges();
            expect(tooltipDirective._getOrigin(tooltipDirective.position)).toEqual(leftOrigin);
            tooltipDirective.position = 'left';
            expect(tooltipDirective._getOrigin(tooltipDirective.position)).toEqual(rightOrigin);
        });

        it('should consistently position before and after overlay position in ltr and rtl dir', () => {
            dir.value = 'ltr';
            dir.change.emit('ltr');
            fixture.detectChanges();
            tooltipDirective.position = 'left';
            const leftOverlayPosition = tooltipDirective._getOverlayPosition(tooltipDirective.position);
            tooltipDirective.position = 'right';
            const rightOverlayPosition = tooltipDirective._getOverlayPosition(tooltipDirective.position);

            // Test expectations in RTL
            dir.value = 'rtl';
            dir.change.emit('rtl');
            fixture.detectChanges();
            expect(tooltipDirective._getOverlayPosition(tooltipDirective.position)).toEqual(leftOverlayPosition);
            tooltipDirective.position = 'left';
            expect(tooltipDirective._getOverlayPosition(tooltipDirective.position)).toEqual(rightOverlayPosition);
        });

        it('should throw when trying to assign an invalid position', () => {
            expect(() => {
                fixture.componentInstance.position = 'everywhere';
                fixture.detectChanges();
                tooltipDirective.show();
            }).toThrowError('Tooltip position "everywhere" is invalid.');
        });

        it('should pass the layout direction to the tooltip', fakeAsync(() => {
            dir.value = 'rtl';

            tooltipDirective.show();
            tick(200);
            fixture.detectChanges();

            const tooltipWrapper = overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box');

            expect(tooltipWrapper).withContext('Expected tooltip to be shown.').toBeTruthy();
            expect(tooltipWrapper?.getAttribute('dir')).withContext('Expected tooltip to be in RTL mode.').toBe('rtl');
        }));

        it('should keep the overlay direction in sync with the trigger direction', fakeAsync(() => {
            dir.value = 'rtl';
            dir.change.emit('rtl');
            tooltipDirective.show();
            tick(200);
            fixture.detectChanges();
            tick(500);

            let tooltipWrapper = overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box');
            expect(tooltipWrapper?.getAttribute('dir')).withContext('Expected tooltip to be in RTL.').toBe('rtl');

            tooltipDirective.hide(0);
            tick(200);
            fixture.detectChanges();
            tick(500);

            dir.value = 'ltr';
            dir.change.emit('ltr');
            tooltipDirective.show();
            tick(200);
            fixture.detectChanges();
            tick(500);

            tooltipWrapper = overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box');
            expect(tooltipWrapper?.getAttribute('dir')).withContext('Expected tooltip to be in LTR.').toBe('ltr');
        }));

        it('should be able to set the tooltip message as a number', fakeAsync(() => {
            fixture.componentInstance.message = 100;
            fixture.detectChanges();

            expect(tooltipDirective.message).toBe('100');
        }));

        it('should hide when clicking away', fakeAsync(() => {
            tooltipDirective.show();
            tick(200);
            fixture.detectChanges();
            tick(500);

            expect(tooltipDirective._isTooltipVisible()).toBeTrue();
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);

            document.body.click();
            tick(200);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();

            expect(tooltipDirective._isTooltipVisible()).toBeFalse();
            expect(overlayContainerElement.textContent).toBe('');
        }));

        it('should not hide immediately if a click fires while animating', fakeAsync(() => {
            tooltipDirective.show();
            tick(200);
            fixture.detectChanges();

            document.body.click();
            fixture.detectChanges();
            tick(500);

            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
        }));

        it('should not throw when pressing ESCAPE', fakeAsync(() => {
            expect(() => {
                dispatchKeyboardEvent(buttonElement, 'keydown', ESCAPE);
                fixture.detectChanges();
            }).not.toThrow();

            // Flush due to the additional tick that is necessary for the FocusMonitor.
            flush();
        }));

        it('should not show the tooltip on progammatic focus', fakeAsync(() => {
            patchElementFocus(buttonElement);
            assertTooltipInstance(tooltipDirective, false);

            focusMonitor.focusVia(buttonElement, 'program');
            tick(200);
            fixture.detectChanges();
            tick(500);

            expect(overlayContainerElement.querySelector('.nx-tooltip')).toBeNull();
        }));

        it('should not show the tooltip on mouse focus', fakeAsync(() => {
            patchElementFocus(buttonElement);
            assertTooltipInstance(tooltipDirective, false);

            focusMonitor.focusVia(buttonElement, 'mouse');
            tick(200);
            fixture.detectChanges();
            tick(500);

            expect(overlayContainerElement.querySelector('.nx-tooltip')).toBeNull();
        }));

        it('should not show the tooltip on touch focus', fakeAsync(() => {
            patchElementFocus(buttonElement);
            assertTooltipInstance(tooltipDirective, false);

            focusMonitor.focusVia(buttonElement, 'touch');
            tick(200);
            fixture.detectChanges();
            tick(500);

            expect(overlayContainerElement.querySelector('.nx-tooltip')).toBeNull();
        }));

        it('should not hide the tooltip when calling `show` twice in a row', fakeAsync(() => {
            tooltipDirective.show();
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();
            fixture.detectChanges();
            tick(500);

            const overlayRef = tooltipDirective._overlayRef;

            // @ts-expect-error
            spyOn(overlayRef, 'detach').and.callThrough();

            tooltipDirective.show();
            tick(200);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();
            fixture.detectChanges();
            tick(500);

            expect(overlayRef?.detach).not.toHaveBeenCalled();
        }));
    });

    describe('fallback positions', () => {
        let fixture: ComponentFixture<BasicTooltipDemo>;
        let tooltip: NxTooltipDirective;

        beforeEach(() => {
            fixture = TestBed.createComponent(BasicTooltipDemo);
            fixture.detectChanges();
            tooltip = fixture.debugElement.query(By.css('button')).injector.get<NxTooltipDirective>(NxTooltipDirective);
        });

        it('should set a origin position', () => {
            tooltip.position = 'left';
            expect(tooltip._getOrigin(tooltip.position).originX).toBe('start');

            tooltip.position = 'right';
            expect(tooltip._getOrigin(tooltip.position).originX).toBe('end');

            tooltip.position = 'top';
            expect(tooltip._getOrigin(tooltip.position).originY).toBe('top');

            tooltip.position = 'bottom';
            expect(tooltip._getOrigin(tooltip.position).originY).toBe('bottom');
        });

        it('should set overlay position', () => {
            tooltip.position = 'left';
            expect(tooltip._getOverlayPosition(tooltip.position).overlayX).toBe('end');

            tooltip.position = 'right';
            expect(tooltip._getOverlayPosition(tooltip.position).overlayX).toBe('start');

            tooltip.position = 'top';
            expect(tooltip._getOverlayPosition(tooltip.position).overlayY).toBe('bottom');

            tooltip.position = 'bottom';
            expect(tooltip._getOverlayPosition(tooltip.position).overlayY).toBe('top');
        });
    });

    describe('scrollable usage', () => {
        let fixture: ComponentFixture<ScrollableTooltipDemo>;
        let buttonDebugElement: DebugElement;
        let tooltipDirective: NxTooltipDirective;

        beforeEach(() => {
            fixture = TestBed.createComponent(ScrollableTooltipDemo);
            fixture.detectChanges();
            buttonDebugElement = fixture.debugElement.query(By.css('button'));
            tooltipDirective = buttonDebugElement.injector.get<NxTooltipDirective>(NxTooltipDirective);
        });

        it('should hide tooltip if clipped after changing positions', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);

            // Show the tooltip and tick for the show delay (default is 200)
            tooltipDirective.show();
            fixture.detectChanges();
            tick(200);

            // Expect that the tooltip is displayed
            expect(tooltipDirective._isTooltipVisible()).withContext('Expected tooltip to be initially visible').toBeTrue();

            // Scroll the page
            fixture.componentInstance.scrollDown();
            tick(200);
            fixture.detectChanges();
            expect(tooltipDirective._isTooltipVisible()).withContext('Expected tooltip hidden when scrolled out of view, after throttle limit').toBeFalse();
        }));

        it('should execute the `hide` call, after scrolling away, inside the NgZone', fakeAsync(() => {
            const inZoneSpy = jasmine.createSpy('in zone spy');

            tooltipDirective.show();
            fixture.detectChanges();
            tick(200);

            if (tooltipDirective._tooltipInstance !== null) {
                spyOn(tooltipDirective._tooltipInstance, 'hide').and.callFake(() => {
                    inZoneSpy(NgZone.isInAngularZone());
                });
            }

            fixture.componentInstance.scrollDown();
            tick(100);
            fixture.detectChanges();

            expect(inZoneSpy).toHaveBeenCalledWith(true);
        }));
    });

    describe('with OnPush', () => {
        let fixture: ComponentFixture<OnPushTooltipDemo>;
        let buttonDebugElement: DebugElement;
        let buttonElement: HTMLButtonElement;
        let tooltipDirective: NxTooltipDirective;

        beforeEach(() => {
            fixture = TestBed.createComponent(OnPushTooltipDemo);
            fixture.detectChanges();
            buttonDebugElement = fixture.debugElement.query(By.css('button'));
            buttonElement = buttonDebugElement.nativeElement as HTMLButtonElement;
            tooltipDirective = buttonDebugElement.injector.get<NxTooltipDirective>(NxTooltipDirective);
        });

        it('should show and hide the tooltip', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);

            tooltipDirective.show();
            tick(200); // Tick for the show delay (default is 200)
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();

            fixture.detectChanges();

            // wait until animation has finished
            tick(500);

            // Make sure tooltip is shown to the user and animation has finished
            const tooltipElement = overlayContainerElement.querySelector('.nx-tooltip') as HTMLElement;
            expect(tooltipElement instanceof HTMLElement).toBeTrue();
            expect(tooltipElement.style.opacity).toBe('1');

            // After hide called, a timeout delay is created that will to hide the tooltip.
            const tooltipDelay = 1000;
            tooltipDirective.hide(tooltipDelay);
            expect(tooltipDirective._isTooltipVisible()).toBeTrue();

            // After the tooltip delay elapses, expect that the tooltip is not visible.
            tick(tooltipDelay);
            fixture.detectChanges();
            expect(tooltipDirective._isTooltipVisible()).toBeFalse();

            // On animation complete, should expect that the tooltip has been detached.
            flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));

        it('should have rendered the tooltip text on init', fakeAsync(() => {
            tooltipDirective.show();
            fixture.detectChanges();
            flush();

            const tooltipElement = overlayContainerElement.querySelector('.nx-tooltip') as HTMLElement;
            expect(tooltipElement.textContent).toContain('initial tooltip message');
        }));
    });

    describe('special cases', () => {
        it('should not open on `mouseenter` on iOS', () => {
            platform.IOS = true;

            const fixture = TestBed.createComponent(BasicTooltipDemo);

            fixture.detectChanges();
            fixture.componentInstance.button.nativeElement.dispatchEvent(new Event('mouseenter'));

            fixture.detectChanges();

            assertTooltipInstance(fixture.componentInstance.tooltip, false);
        });

        it('should not open on `mouseenter` on Android', () => {
            platform.ANDROID = true;

            const fixture = TestBed.createComponent(BasicTooltipDemo);

            fixture.detectChanges();
            fixture.componentInstance.button.nativeElement.dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();

            assertTooltipInstance(fixture.componentInstance.tooltip, false);
        });
    });

    describe('selection of contents', () => {
        it('is disabled by default', () => {
            const fixture = TestBed.createComponent(BasicTooltipDemo);
            fixture.detectChanges();
            const userSelectStyle = fixture.componentInstance.button.nativeElement.style.userSelect;
            expect(userSelectStyle).toBe('none');
        });

        it('is allowed for input by default', () => {
            const fixture = TestBed.createComponent(TooltipOnTextFields);
            fixture.detectChanges();
            const userSelectStyle = fixture.componentInstance.input.nativeElement.style.userSelect;
            expect(userSelectStyle).toBe('auto');
        });

        it('is allowed for textarea by default', () => {
            const fixture = TestBed.createComponent(TooltipOnTextFields);
            fixture.detectChanges();
            const userSelectStyle = fixture.componentInstance.textarea.nativeElement.style.userSelect;
            expect(userSelectStyle).toBe('auto');
        });

        it('is allowed if nxTooltipSelectable input provided', () => {
            const fixture = TestBed.createComponent(SelectableTooltip);
            fixture.detectChanges();
            const userSelectStyle = fixture.componentInstance.button.nativeElement.style.userSelect;
            expect(userSelectStyle).toBe('auto');
        });

        it('is allowed on input even if nxTooltipSelectable explicitly set to false', () => {
            const fixture = TestBed.createComponent(SelectableTooltip);
            fixture.detectChanges();
            fixture.componentInstance.selectable = false;
            const userSelectStyle = fixture.componentInstance.input.nativeElement.style.userSelect;
            expect(userSelectStyle).toBe('auto');
        });

        it('is allowed on textarea even if nxTooltipSelectable explicitly set to false', () => {
            const fixture = TestBed.createComponent(SelectableTooltip);
            fixture.detectChanges();
            fixture.componentInstance.selectable = false;
            const userSelectStyle = fixture.componentInstance.textarea.nativeElement.style.userSelect;
            expect(userSelectStyle).toBe('auto');
        });
    });
});

describe('navigation', () => {
    let mockLocation: SpyLocation;
    let overlayContainerElement: HTMLElement;
    let overlayContainer: OverlayContainer;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxTooltipModule, BrowserAnimationsModule, OverlayModule],
            providers: [
                {
                    provide: Location,
                    useClass: SpyLocation,
                },
            ],
            declarations: [TooltipDispose],
        }).compileComponents();
    }));

    beforeEach(inject([Location, OverlayContainer], (l: Location, oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
        mockLocation = l as SpyLocation;
    }));

    it('should not throw error if tooltip gets triggered after navigation', fakeAsync(() => {
        const fixture = TestBed.createComponent(TooltipDispose);
        fixture.detectChanges();
        fixture.componentInstance.buttonHover.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        assertTooltipInstance(fixture.componentInstance.tooltip, true);
        mockLocation.simulateUrlPop('');
        flush();
        // should dispose
        expect(overlayContainerElement.childNodes).toHaveSize(0);
        mockLocation.back();
        flush();
        // should not throw portal already disposed error
        expect(() => {
            fixture.componentInstance.buttonHover.nativeElement.dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();
            flush();
        }).not.toThrow();
        assertTooltipInstance(fixture.componentInstance.tooltip, true);
        fixture.destroy();
        flush();
    }));
});

describe('NxTooltipComponent', () => {
    let fixture: ComponentFixture<BasicTooltipDemo>;
    let tooltipDirective: NxTooltipDirective;

    it('should be able to override the default show and hide delays', fakeAsync(() => {
        TestBed.resetTestingModule()
            .configureTestingModule({
                imports: [NxTooltipModule, OverlayModule, NoopAnimationsModule],
                declarations: [BasicTooltipDemo],
                providers: [
                    {
                        provide: NX_TOOLTIP_DEFAULT_OPTIONS,
                        useValue: { showDelay: 1337, hideDelay: 7331 },
                    },
                ],
            })
            .compileComponents();

        fixture = TestBed.createComponent(BasicTooltipDemo);
        fixture.detectChanges();
        tooltipDirective = fixture.debugElement.query(By.css('button')).injector.get<NxTooltipDirective>(NxTooltipDirective);

        tooltipDirective.show();
        fixture.detectChanges();
        tick();

        expect(tooltipDirective._isTooltipVisible()).toBeFalse();
        tick(1337);
        expect(tooltipDirective._isTooltipVisible()).toBeTrue();

        tooltipDirective.hide();
        fixture.detectChanges();
        tick();

        expect(tooltipDirective._isTooltipVisible()).toBeTrue();
        tick(7331);
        expect(tooltipDirective._isTooltipVisible()).toBeFalse();
    }));

    it('should be able to override the default position', fakeAsync(() => {
        TestBed.resetTestingModule()
            .configureTestingModule({
                imports: [NxTooltipModule, OverlayModule, NoopAnimationsModule],
                declarations: [TooltipDemoWithoutPositionBinding],
                providers: [
                    {
                        provide: NX_TOOLTIP_DEFAULT_OPTIONS,
                        useValue: { position: 'right' },
                    },
                ],
            })
            .compileComponents();

        const newFixture = TestBed.createComponent(TooltipDemoWithoutPositionBinding);
        newFixture.detectChanges();
        tooltipDirective = newFixture.debugElement.query(By.css('button')).injector.get<NxTooltipDirective>(NxTooltipDirective);

        tooltipDirective.show();
        newFixture.detectChanges();
        tick();

        expect(tooltipDirective.position).toBe('right');
        expect(tooltipDirective._getOverlayPosition(tooltipDirective.position).overlayX).toBe('start');
    }));
});

@Component({
    selector: 'nx-app',
    template: `<button #button *ngIf="showButton" [nxTooltip]="message" [nxTooltipPosition]="position">Button</button>`,
})
class BasicTooltipDemo {
    position = 'bottom';
    message: any = initialTooltipMessage;
    showButton = true;
    showTooltipClass = false;
    @ViewChild(NxTooltipDirective) tooltip!: NxTooltipDirective;
    @ViewChild('button') button!: ElementRef<HTMLButtonElement>;
}

@Component({
    selector: 'nx-app',
    template: `<div
        cdk-scrollable
        style="padding: 100px; margin: 300px;
                               height: 200px; width: 200px; overflow: auto;"
    >
        <button *ngIf="showButton" style="margin-bottom: 600px" [nxTooltip]="message" [nxTooltipPosition]="position">Button</button>
    </div>`,
})
class ScrollableTooltipDemo {
    position = 'bottom';
    message: string = initialTooltipMessage;
    showButton = true;

    @ViewChild(CdkScrollable) scrollingContainer!: CdkScrollable;

    scrollDown() {
        const scrollingContainerEl = this.scrollingContainer.getElementRef().nativeElement;
        scrollingContainerEl.scrollTop = 250;

        // Emit a scroll event from the scrolling element in our component.
        // This event should be picked up by the scrollable directive and notify.
        // The notification should be picked up by the service.
        dispatchFakeEvent(scrollingContainerEl, 'scroll');
    }
}

@Component({
    selector: 'nx-app',
    template: `<button [nxTooltip]="message" [nxTooltipPosition]="position">Button</button>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnPushTooltipDemo {
    position = 'bottom';
    message: string = initialTooltipMessage;
}

@Component({
    selector: 'nx-app',
    template: `<button *ngFor="let tooltip of tooltips" [nxTooltip]="tooltip">Button {{ tooltip }}</button>`,
})
class DynamicTooltipsDemo {
    tooltips: string[] = [];

    constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

    getButtons() {
        return this._elementRef.nativeElement.querySelectorAll('button');
    }
}

@Component({
    template: `
        <input #input nxTooltip="Something" />

        <textarea #textarea nxTooltip="Another thing"></textarea>
    `,
})
class TooltipOnTextFields {
    @ViewChild('input') input!: ElementRef<HTMLInputElement>;
    @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;
}

@Component({
    selector: 'nx-app',
    template: `<button #button [nxTooltip]="message">Button</button>`,
})
class TooltipDemoWithoutPositionBinding {
    message: any = initialTooltipMessage;
    @ViewChild(NxTooltipDirective) tooltip!: NxTooltipDirective;
    @ViewChild('button') button!: ElementRef<HTMLButtonElement>;
}

@Component({
    selector: 'nx-app',
    template: `<button nxButton [nxTooltipShowDelay]="1000" [nxTooltipHideDelay]="1500" nxTooltip="This message appears after 1 second" type="button" #hover>
        Delayed tooltip
    </button>`,
})
class TooltipDispose {
    @ViewChild(NxTooltipDirective) tooltip!: NxTooltipDirective;
    @ViewChild('hover') buttonHover!: ElementRef<HTMLButtonElement>;
}

@Component({
    selector: 'nx-app',
    template: `
        <button #button [nxTooltip]="message" [nxTooltipSelectable]="selectable">Button</button>
        <input #input [nxTooltipSelectable]="selectable" nxTooltip="Something" />

        <textarea #textarea [nxTooltipSelectable]="selectable" nxTooltip="Another thing"></textarea>
    `,
})
class SelectableTooltip {
    message: any = initialTooltipMessage;
    selectable = true;
    @ViewChild('button') button!: ElementRef<HTMLButtonElement>;
    @ViewChild('input') input!: ElementRef<HTMLInputElement>;
    @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;
}

/** Asserts whether a tooltip directive has a tooltip instance. */
function assertTooltipInstance(tooltip: NxTooltipDirective, shouldExist: boolean): void {
    // Note that we have to cast this to a boolean, because Jasmine will go into an infinite loop
    // if it tries to stringify the `_tooltipInstance` when an assertion fails. The infinite loop
    // happens due to the `_tooltipInstance` having a circular structure.
    expect(!!tooltip._tooltipInstance).toBe(shouldExist);
}
