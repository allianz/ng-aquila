import { fakeScrollStrategyFunction } from '@allianz/ng-aquila/utils';
import { FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkScrollable, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  ElementRef,
  EventEmitter,
  Inject,
  NgZone,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { createKeyboardEvent } from '../cdk-test-utils';
import {
  NX_TOOLTIP_DEFAULT_OPTIONS,
  NX_TOOLTIP_PANEL_CLASS,
  NX_TOOLTIP_SCROLL_STRATEGY,
  NxTooltipDirective,
  TooltipPosition,
} from './tooltip.directive';
import { NxTooltipModule } from './tooltip.module';

function createFakeEvent(type: string, bubbles = false, cancelable = true) {
  return new Event(type, { bubbles, cancelable });
}

export function dispatchKeyboardEvent(
  node: Node,
  type: string,
  key: string,
  target?: Element,
): KeyboardEvent {
  return dispatchEvent(node, createKeyboardEvent(type, 0, key)) as KeyboardEvent;
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
  let dir: {
    value: Direction;
    change: EventEmitter<Direction>;
  };
  let platform: {
    IOS: boolean;
    isBrowser: boolean;
    ANDROID: boolean;
  };
  let focusMonitor: FocusMonitor;

  beforeEach(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = { IOS: false, isBrowser: true, ANDROID: false };

    TestBed.configureTestingModule({
      animationsEnabled: true,
      imports: [
        NxTooltipModule,
        OverlayModule,
        BasicTooltipDemo,
        ScrollableTooltipDemo,
        OnPushTooltipDemo,
        DynamicTooltipsDemo,
        TooltipOnTextFields,
        SelectableTooltip,
      ],
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

      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      fixture.detectChanges();

      // wait till animation has finished (70ms CSS animation)
      tick(100);

      // Make sure tooltip is shown to the user and animation has finished
      const tooltipElement = overlayContainerElement.querySelector('.nx-tooltip') as HTMLElement;
      expect(tooltipElement instanceof HTMLElement).toBe(true);
      expect(tooltipElement.classList.contains('fade-in')).toBe(true);

      expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);

      // After hide called, a timeout delay is created that will to hide the tooltip.
      const tooltipDelay = 1000;
      tooltipDirective.hide(tooltipDelay);
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      // After the tooltip delay elapses, expect that the tooltip is not visible.
      tick(tooltipDelay);
      fixture.detectChanges();
      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      // On animation complete, should expect that the tooltip has been detached.
      tick(100); // Wait for CSS animation to complete
      flushMicrotasks();
      assertTooltipInstance(tooltipDirective, false);
    }));

    it('should be able to re-open a tooltip if it was closed by detaching the overlay', fakeAsync(() => {
      tooltipDirective.show();
      tick(200);
      expect(tooltipDirective._isTooltipVisible()).toBe(true);
      fixture.detectChanges();
      tick(500);

      tooltipDirective._overlayRef?.detach();
      tick(200);
      fixture.detectChanges();
      expect(tooltipDirective._isTooltipVisible()).toBe(false);
      flushMicrotasks();
      assertTooltipInstance(tooltipDirective, false);

      tooltipDirective.show();
      tick(200);
      flush();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);
    }));

    it('should show with delay', fakeAsync(() => {
      assertTooltipInstance(tooltipDirective, false);

      const tooltipDelay = 1000;
      tooltipDirective.show(tooltipDelay);
      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      tick(tooltipDelay);
      fixture.detectChanges();
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      tick(100); // Wait for animation
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
    }));

    it('should set a css class on the overlay panel element', fakeAsync(() => {
      tooltipDirective.show();
      fixture.detectChanges();
      tick(200);
      flush();

      const overlayRef = tooltipDirective._overlayRef;

      expect(!!overlayRef).toBeTruthy();
      expect(
        overlayRef?.overlayElement,
        'Expected the overlay panel element to have the tooltip panel class set.',
      ).toHaveClass(NX_TOOLTIP_PANEL_CLASS);
    }));

    it('should not show if disabled', fakeAsync(() => {
      // Test that disabling the tooltip will not set the tooltip visible
      tooltipDirective.disabled = true;
      tooltipDirective.show();
      fixture.detectChanges();
      tick(200);
      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      // Test to make sure setting disabled to false will show the tooltip
      // Sanity check to make sure everything was correct before (detectChanges, tick)
      tooltipDirective.disabled = false;
      tooltipDirective.show();
      fixture.detectChanges();
      tick(200);
      flush();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);
    }));

    it('should hide if disabled while visible', fakeAsync(() => {
      // Display the tooltip with a timeout before hiding.
      fixture.componentInstance.hideDelay = 1000;
      fixture.detectChanges();
      tooltipDirective.show();
      fixture.detectChanges();
      tick(200);
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      // Set tooltip to be disabled and verify that the tooltip hides.
      tooltipDirective.disabled = true;
      tick(200);
      expect(tooltipDirective._isTooltipVisible()).toBe(false);
    }));

    it('should hide if the message is cleared while the tooltip is open', fakeAsync(() => {
      tooltipDirective.show();
      fixture.detectChanges();
      tick(200);
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      fixture.componentInstance.message = '';
      fixture.detectChanges();
      tick(200);
      expect(tooltipDirective._isTooltipVisible()).toBe(false);
    }));

    it('should not show if hide is called before delay finishes', fakeAsync(() => {
      assertTooltipInstance(tooltipDirective, false);

      const tooltipDelay = 1000;

      tooltipDirective.show(tooltipDelay);
      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      tick(tooltipDelay / 2); // Wait for half the delay
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(false);
      tooltipDirective.hide();

      tick(tooltipDelay); // Wait for remaining time
      fixture.detectChanges();
      expect(tooltipDirective._isTooltipVisible()).toBe(false);
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
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      // After hide called, a timeout delay is created that will to hide the tooltip.
      const tooltipDelay = 1000;
      tooltipDirective.hide(tooltipDelay);
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      // Before delay time has passed, call show which should cancel intent to hide tooltip.
      tooltipDirective.show();
      tick(tooltipDelay);
      expect(tooltipDirective._isTooltipVisible()).toBe(true);
    }));

    it('should be able to update the tooltip position while open', fakeAsync(() => {
      tooltipDirective.position = 'bottom';
      tooltipDirective.show();
      tick(200);

      assertTooltipInstance(tooltipDirective, true);

      // @ts-expect-error fix nullability
      vi.spyOn(tooltipDirective._overlayRef, 'updatePosition');

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
      flush();

      // At this point the animation should be able to complete itself and trigger the
      // _animationDone function, but for unknown reasons in the test infrastructure,
      // this does not occur. Manually call the hook so the animation subscriptions get invoked.
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
      flush();
      expect(overlayContainerElement.textContent).toContain(newMessage);
    }));

    it('should be removed after parent destroyed', fakeAsync(() => {
      tooltipDirective.show();
      tick(200); // Tick for the show delay (default is 200)
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      flush();
      fixture.destroy();
      expect(overlayContainerElement.childNodes).toHaveLength(0);
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
      expect(tooltipInstance).not.toBeNull();

      // Hiding has already finished, so the overlay was detached. Destroying the host must
      // still dispose cleanly rather than throwing on the already-detached overlay.
      expect(() => {
        fixture.componentInstance.showButton = false;
        fixture.detectChanges();
        tick(500);
      }).not.toThrow();

      expect(tooltipDirective._tooltipInstance).toBeNull();
    }));

    it('should complete the afterHidden stream when tooltip is destroyed', fakeAsync(() => {
      tooltipDirective.show();
      fixture.detectChanges();
      tick(150);

      const spy = vi.fn().mockName('complete spy');
      const subscription = tooltipDirective._tooltipInstance
        ?.afterHidden()
        .subscribe({ complete: spy });

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
      expect(tooltipDirective._getOverlayPosition(tooltipDirective.position)).toEqual(
        leftOverlayPosition,
      );
      tooltipDirective.position = 'left';
      expect(tooltipDirective._getOverlayPosition(tooltipDirective.position)).toEqual(
        rightOverlayPosition,
      );
    });

    it('should throw when trying to assign an invalid position', () => {
      expect(() => {
        fixture.componentInstance.position = 'everywhere' as any;
        fixture.detectChanges();
        tooltipDirective.show();
      }).toThrowError('Tooltip position "everywhere" is invalid.');
    });

    it('should pass the layout direction to the tooltip', fakeAsync(() => {
      dir.value = 'rtl';

      tooltipDirective.show();
      tick(200);
      fixture.detectChanges();
      flush();

      const tooltipWrapper = overlayContainerElement.querySelector(
        '.cdk-overlay-connected-position-bounding-box',
      );

      expect(tooltipWrapper, 'Expected tooltip to be shown.').toBeTruthy();
      expect(tooltipWrapper?.getAttribute('dir'), 'Expected tooltip to be in RTL mode.').toBe(
        'rtl',
      );
    }));

    it('should keep the overlay direction in sync with the trigger direction', fakeAsync(() => {
      dir.value = 'rtl';
      dir.change.emit('rtl');
      tooltipDirective.show();
      tick(200);
      fixture.detectChanges();
      tick(500);

      let tooltipWrapper = overlayContainerElement.querySelector(
        '.cdk-overlay-connected-position-bounding-box',
      );
      expect(tooltipWrapper?.getAttribute('dir'), 'Expected tooltip to be in RTL.').toBe('rtl');

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

      tooltipWrapper = overlayContainerElement.querySelector(
        '.cdk-overlay-connected-position-bounding-box',
      );
      expect(tooltipWrapper?.getAttribute('dir'), 'Expected tooltip to be in LTR.').toBe('ltr');
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
      tick(100); // Wait for CSS animation

      expect(tooltipDirective._isTooltipVisible()).toBe(true);
      expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);

      document.body.click();
      tick(200);
      fixture.detectChanges();
      tick(100); // Wait for CSS animation
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(false);
      expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should not hide when clicking on the tooltip itself, e.g. to copy its text', fakeAsync(() => {
      tooltipDirective.show();
      tick(200);
      fixture.detectChanges();
      tick(100); // Wait for CSS animation

      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      const tooltipElement = overlayContainerElement.querySelector('.nx-tooltip') as HTMLElement;
      tooltipElement.dispatchEvent(createFakeEvent('click', true));
      tick(200);
      fixture.detectChanges();
      tick(100);

      expect(tooltipDirective._isTooltipVisible()).toBe(true);
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
        dispatchKeyboardEvent(buttonElement, 'keydown', 'Escape');
        fixture.detectChanges();
      }).not.toThrow();

      // Flush due to the additional tick that is necessary for the FocusMonitor.
      flush();
    }));

    it('should hide the tooltip when pressing ESCAPE while it is visible', fakeAsync(() => {
      tooltipDirective.show();
      tick(200);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      dispatchKeyboardEvent(buttonElement, 'keydown', 'Escape');
      tick(0);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      flush();
    }));

    it('should call preventDefault on ESCAPE so the browser does not run its own default action for the key (e.g. exiting native fullscreen)', fakeAsync(() => {
      tooltipDirective.show();
      tick(200);
      fixture.detectChanges();

      const event = createKeyboardEvent('keydown', 0, 'Escape');
      vi.spyOn(event, 'preventDefault');
      buttonElement.dispatchEvent(event);
      tick(0);
      fixture.detectChanges();

      expect(event.preventDefault).toHaveBeenCalled();

      flush();
    }));

    it('should hide a hover-triggered tooltip when pressing ESCAPE without focusing the trigger', fakeAsync(() => {
      // Hover-triggered tooltips don't move focus onto the trigger, so ESCAPE must still
      // be picked up even though `document.activeElement` isn't the trigger element.
      buttonElement.dispatchEvent(createFakeEvent('mouseenter'));
      tick(200);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);
      expect(document.activeElement).not.toBe(buttonElement);

      dispatchKeyboardEvent(document.body, 'keydown', 'Escape');
      tick(0);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      flush();
    }));

    it('should hide immediately on ESCAPE even if a longer hide delay is already counting down', fakeAsync(() => {
      // Leaving the trigger schedules a hide after `hideDelay`, which must not block ESCAPE
      // from hiding the tooltip right away instead of waiting out the rest of that delay.
      fixture.componentInstance.hideDelay = 10000;
      fixture.detectChanges();

      buttonElement.dispatchEvent(createFakeEvent('mouseenter'));
      tick(200);
      fixture.detectChanges();
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      buttonElement.dispatchEvent(createFakeEvent('mouseleave'));
      fixture.detectChanges();
      expect(
        tooltipDirective._isTooltipVisible(),
        'still visible while the hide delay counts down',
      ).toBe(true);

      dispatchKeyboardEvent(document.body, 'keydown', 'Escape');
      tick(0);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      flush();
    }));

    it('should not announce the message when the focused trigger already describes it', fakeAsync(() => {
      // The trigger carries an `aria-describedby` pointing at a hidden copy of the message, so a
      // screen reader reads it out on focus already. Announcing it again would duplicate it.
      const liveAnnouncer = TestBed.inject(LiveAnnouncer);
      const announceSpy = vi
        .spyOn(liveAnnouncer, 'announce')
        .mockImplementation(() => Promise.resolve());

      patchElementFocus(buttonElement);
      focusMonitor.focusVia(buttonElement, 'keyboard');
      tick(200);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);
      expect(buttonElement.hasAttribute('aria-describedby')).toBe(true);
      expect(announceSpy).not.toHaveBeenCalled();

      flush();
    }));

    it('should announce the message when the tooltip is shown without focusing the trigger', fakeAsync(() => {
      // A hover- or programmatically-triggered tooltip doesn't move focus, so the trigger's
      // `aria-describedby` is never read out and the announcement is the only way the message
      // reaches a screen reader.
      const liveAnnouncer = TestBed.inject(LiveAnnouncer);
      const announceSpy = vi
        .spyOn(liveAnnouncer, 'announce')
        .mockImplementation(() => Promise.resolve());

      buttonElement.dispatchEvent(createFakeEvent('mouseenter'));
      tick(200);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);
      expect(announceSpy).toHaveBeenCalledWith(initialTooltipMessage);

      flush();
    }));

    it('should not re-announce the message when re-entering the trigger before a pending hide elapses', fakeAsync(() => {
      // Leaving and quickly re-entering the trigger doesn't change the tooltip's visible state
      // at all (it was showing before, it's still showing now), so nothing should be announced
      // a second time.
      const liveAnnouncer = TestBed.inject(LiveAnnouncer);
      const announceSpy = vi
        .spyOn(liveAnnouncer, 'announce')
        .mockImplementation(() => Promise.resolve());

      buttonElement.dispatchEvent(createFakeEvent('mouseenter'));
      tick(200);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);
      expect(announceSpy).toHaveBeenCalledTimes(1);

      // Leaving schedules a hide after the default hide delay (200ms).
      buttonElement.dispatchEvent(createFakeEvent('mouseleave'));

      // Re-entering before that delay elapses calls `show()` again while the tooltip is still
      // visible with a hide pending.
      tick(100);
      buttonElement.dispatchEvent(createFakeEvent('mouseenter'));
      tick(200); // Wait well past the show delay to make sure nothing gets rescheduled.
      fixture.detectChanges();

      expect(
        tooltipDirective._isTooltipVisible(),
        'Expected the tooltip to still be visible throughout.',
      ).toBe(true);
      expect(
        announceSpy,
        'Expected the message not to be announced a second time.',
      ).toHaveBeenCalledTimes(1);

      flush();
    }));

    it('should cancel a tooltip that is still waiting out its show delay when pressing ESCAPE', fakeAsync(() => {
      // Otherwise the tooltip would still pop up after the user already pressed ESCAPE
      // to get rid of it.
      buttonElement.dispatchEvent(createFakeEvent('mouseenter'));
      tick(100);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      dispatchKeyboardEvent(document.body, 'keydown', 'Escape');
      tick(0);
      fixture.detectChanges();

      // Wait well past the show delay to make sure it doesn't appear anymore.
      tick(500);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      flush();
    }));

    it('should ignore ESCAPE when it is pressed with a modifier key', fakeAsync(() => {
      // Combinations like `Cmd + ESCAPE` are reserved for the browser and the OS.
      tooltipDirective.show();
      tick(200);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      const event = createKeyboardEvent('keydown', 0, 'Escape', { meta: true });
      vi.spyOn(event, 'preventDefault');
      document.body.dispatchEvent(event);
      tick(0);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);
      expect(event.preventDefault).not.toHaveBeenCalled();

      flush();
    }));

    it('should stay open when the mouse moves from the trigger onto the tooltip', fakeAsync(() => {
      tooltipDirective.show();
      tick(200);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      const tooltipElement = overlayContainerElement.querySelector('.nx-tooltip') as HTMLElement;

      // Leaving the trigger schedules a hide after the default hide delay (200ms).
      buttonElement.dispatchEvent(createFakeEvent('mouseleave'));

      // Moving onto the tooltip itself before the delay elapses should cancel the hide.
      tick(100);
      tooltipElement.dispatchEvent(createFakeEvent('mouseenter'));
      tick(100);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      // Leaving the tooltip should hide it again.
      tooltipElement.dispatchEvent(createFakeEvent('mouseleave'));
      tick(200);
      fixture.detectChanges();

      expect(tooltipDirective._isTooltipVisible()).toBe(false);
    }));

    it('should not flicker closed when the pointer moves from the tooltip back to the trigger through an element in between', fakeAsync(() => {
      // The pointer's path from the tooltip back to the trigger can cross other elements
      // (e.g. the small gap left for the tooltip's arrow), so `mouseleave`'s `relatedTarget`
      // can't be relied on to detect "moving back onto the trigger" -- the fix instead relies
      // on the tooltip's mouseleave using the same hide delay as the trigger's mouseleave, so
      // that the trigger's mouseenter has a chance to cancel the pending hide either way.
      tooltipDirective.show();
      tick(200);
      fixture.detectChanges();

      const tooltipElement = overlayContainerElement.querySelector('.nx-tooltip') as HTMLElement;

      buttonElement.dispatchEvent(createFakeEvent('mouseleave'));
      tick(100);
      tooltipElement.dispatchEvent(createFakeEvent('mouseenter'));
      tick(100);
      fixture.detectChanges();

      expect(
        tooltipDirective._isTooltipVisible(),
        'Expected tooltip to stay visible while moving from the trigger to itself.',
      ).toBe(true);

      // Leaving the tooltip towards some in-between element schedules a hide after the
      // tooltip's hide delay, same as leaving the trigger would.
      tooltipElement.dispatchEvent(createFakeEvent('mouseleave'));

      // Re-entering the trigger before that delay elapses should cancel the pending hide.
      tick(100);
      buttonElement.dispatchEvent(createFakeEvent('mouseenter'));
      tick(100);
      fixture.detectChanges();

      expect(
        tooltipDirective._isTooltipVisible(),
        'Expected tooltip to stay visible while moving back onto the trigger.',
      ).toBe(true);
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
      expect(tooltipDirective._isTooltipVisible()).toBe(true);
      fixture.detectChanges();
      tick(500);

      const overlayRef = tooltipDirective._overlayRef;

      // @ts-expect-error
      vi.spyOn(overlayRef, 'detach');

      tooltipDirective.show();
      tick(200);
      expect(tooltipDirective._isTooltipVisible()).toBe(true);
      fixture.detectChanges();
      tick(500);

      expect(overlayRef?.detach).not.toHaveBeenCalled();
    }));

    it('should be able to override the scroll strategy in parent injector', () => {
      TestBed.resetTestingModule()
        .configureTestingModule({
          animationsEnabled: true,
          imports: [BasicTooltipDemo, NxTooltipModule],
          providers: [
            {
              provide: NX_TOOLTIP_SCROLL_STRATEGY,
              useFactory: () => fakeScrollStrategyFunction,
            },
          ],
        })
        .compileComponents();
      fixture = TestBed.createComponent(BasicTooltipDemo);
      fixture.detectChanges();
      expect(fixture.componentInstance.scrollStrategy).toBe(fakeScrollStrategyFunction);
    });
  });

  describe('ESCAPE with multiple tooltips open', () => {
    let fixture: ComponentFixture<TooltipOnTextFields>;
    let firstTooltip: NxTooltipDirective;
    let secondTooltip: NxTooltipDirective;

    beforeEach(() => {
      fixture = TestBed.createComponent(TooltipOnTextFields);
      fixture.detectChanges();

      const directives = fixture.debugElement
        .queryAll(By.directive(NxTooltipDirective))
        .map((debugElement) => debugElement.injector.get<NxTooltipDirective>(NxTooltipDirective));
      [firstTooltip, secondTooltip] = directives;
    });

    it('should only close the most recently opened tooltip, matching the CDK overlay stack', fakeAsync(() => {
      // ESCAPE is routed through the shared CDK `OverlayKeyboardDispatcher`, which only
      // forwards the event to the topmost overlay whose predicate matches, instead of every
      // tooltip's own listener reacting independently. This also means that if some other,
      // unrelated overlay (e.g. a datepicker popup) is opened on top of a tooltip, pressing
      // ESCAPE closes only that topmost overlay and leaves the tooltip untouched.
      firstTooltip.show();
      tick(200);
      fixture.detectChanges();
      secondTooltip.show();
      tick(200);
      fixture.detectChanges();

      expect(firstTooltip._isTooltipVisible()).toBe(true);
      expect(secondTooltip._isTooltipVisible()).toBe(true);

      dispatchKeyboardEvent(document.body, 'keydown', 'Escape');
      tick(0);
      fixture.detectChanges();

      expect(
        secondTooltip._isTooltipVisible(),
        'Expected the most recently opened tooltip to close.',
      ).toBe(false);
      expect(
        firstTooltip._isTooltipVisible(),
        'Expected the other, still-open tooltip to be unaffected.',
      ).toBe(true);

      flush();
    }));
  });

  describe('fallback positions', () => {
    let fixture: ComponentFixture<BasicTooltipDemo>;
    let tooltip: NxTooltipDirective;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicTooltipDemo);
      fixture.detectChanges();
      tooltip = fixture.debugElement
        .query(By.css('button'))
        .injector.get<NxTooltipDirective>(NxTooltipDirective);
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
      tick(200); // Wait for show delay
      fixture.detectChanges();

      // Expect that the tooltip is displayed
      expect(tooltipDirective._isTooltipVisible(), 'Expected tooltip to be initially visible').toBe(
        true,
      );

      // Scroll the page
      fixture.componentInstance.scrollDown();
      tick(200); // Wait for scroll handling
      fixture.detectChanges();
      expect(
        tooltipDirective._isTooltipVisible(),
        'Expected tooltip hidden when scrolled out of view, after throttle limit',
      ).toBe(false);
    }));

    it('should execute the `hide` call, after scrolling away, inside the NgZone', fakeAsync(() => {
      const inZoneSpy = vi.fn().mockName('in zone spy');

      tooltipDirective.show();
      tick(200); // Wait for show delay
      fixture.detectChanges();

      if (tooltipDirective._tooltipInstance !== null) {
        vi.spyOn(tooltipDirective._tooltipInstance, 'hide').mockImplementation(() => {
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
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      fixture.detectChanges();

      // wait until animation has finished (70ms CSS animation)
      tick(100);

      // Make sure tooltip is shown to the user and animation has finished
      const tooltipElement = overlayContainerElement.querySelector('.nx-tooltip') as HTMLElement;
      expect(tooltipElement instanceof HTMLElement).toBe(true);
      expect(tooltipElement.classList.contains('fade-in')).toBe(true);

      // After hide called, a timeout delay is created that will to hide the tooltip.
      const tooltipDelay = 1000;
      tooltipDirective.hide(tooltipDelay);
      expect(tooltipDirective._isTooltipVisible()).toBe(true);

      // After the tooltip delay elapses, expect that the tooltip is not visible.
      tick(tooltipDelay);
      fixture.detectChanges();
      expect(tooltipDirective._isTooltipVisible()).toBe(false);

      // On animation complete, should expect that the tooltip has been detached.
      tick(100); // Wait for CSS animation
      flushMicrotasks();

      assertTooltipInstance(tooltipDirective, false);
    }));

    it('should have rendered the tooltip text on init', fakeAsync(() => {
      tooltipDirective.show();
      tick(200);
      fixture.detectChanges();
      flush();

      const tooltipElement = overlayContainerElement.querySelector('.nx-tooltip') as HTMLElement;
      console.log(tooltipElement);
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
      animationsEnabled: true,
      imports: [NxTooltipModule, OverlayModule, TooltipDispose],
      providers: [
        {
          provide: Location,
          useClass: SpyLocation,
        },
      ],
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
    expect(overlayContainerElement.childNodes).toHaveLength(0);
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
        animationsEnabled: true,
        imports: [NxTooltipModule, OverlayModule, BasicTooltipDemo],
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
    tooltipDirective = fixture.debugElement
      .query(By.css('button'))
      .injector.get<NxTooltipDirective>(NxTooltipDirective);

    tooltipDirective.show();
    fixture.detectChanges();
    tick();

    expect(tooltipDirective._isTooltipVisible()).toBe(false);
    tick(1337);
    fixture.detectChanges();
    expect(tooltipDirective._isTooltipVisible()).toBe(true);

    tooltipDirective.hide();
    fixture.detectChanges();
    tick();

    expect(tooltipDirective._isTooltipVisible()).toBe(true);
    tick(7331);
    fixture.detectChanges();
    expect(tooltipDirective._isTooltipVisible()).toBe(false);
  }));

  it('should be able to override the default position', fakeAsync(() => {
    TestBed.resetTestingModule()
      .configureTestingModule({
        animationsEnabled: true,

        imports: [NxTooltipModule, OverlayModule],
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
    tooltipDirective = newFixture.debugElement
      .query(By.css('button'))
      .injector.get<NxTooltipDirective>(NxTooltipDirective);

    tooltipDirective.show();
    newFixture.detectChanges();
    tick();
    flush();

    expect(tooltipDirective.position).toBe('right');
    expect(tooltipDirective._getOverlayPosition(tooltipDirective.position).overlayX).toBe('start');
  }));
});

@Component({
  selector: 'nx-app',
  template: `@if (showButton) {
    <button
      #button
      [nxTooltip]="message"
      [nxTooltipPosition]="position"
      [nxTooltipHideDelay]="hideDelay"
    >
      Button
    </button>
  }`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTooltipModule, OverlayModule],
})
class BasicTooltipDemo {
  position: TooltipPosition = 'bottom';
  message: any = initialTooltipMessage;
  showButton = true;
  showTooltipClass = false;
  hideDelay = 200;
  @ViewChild(NxTooltipDirective)
  tooltip!: NxTooltipDirective;
  @ViewChild('button')
  button!: ElementRef<HTMLButtonElement>;

  constructor(
    @Inject(NX_TOOLTIP_SCROLL_STRATEGY)
    public scrollStrategy: any,
  ) {}
}

@Component({
  selector: 'nx-app',
  template: `<div
    cdk-scrollable
    style="padding: 100px; margin: 300px;
                               height: 200px; width: 200px; overflow: auto;"
  >
    @if (showButton) {
      <button style="margin-bottom: 600px" [nxTooltip]="message" [nxTooltipPosition]="position">
        Button
      </button>
    }
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTooltipModule, OverlayModule],
})
class ScrollableTooltipDemo {
  position: TooltipPosition = 'bottom';
  message: string = initialTooltipMessage;
  showButton = true;

  @ViewChild(CdkScrollable)
  scrollingContainer!: CdkScrollable;

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
  imports: [NxTooltipModule, OverlayModule],
})
class OnPushTooltipDemo {
  position: TooltipPosition = 'bottom';
  message: string = initialTooltipMessage;
}

@Component({
  selector: 'nx-app',
  template: `@for (tooltip of tooltips; track tooltip) {
    <button [nxTooltip]="tooltip">Button {{ tooltip }}</button>
  }`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTooltipModule, OverlayModule],
})
class DynamicTooltipsDemo {
  tooltips: string[] = [];

  constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

  getButtons() {
    return this._elementRef.nativeElement.querySelectorAll('button');
  }
}

@Component({
  selector: 'test-tooltip-on-text-fields',
  template: `
    <input #input nxTooltip="Something" />

    <textarea #textarea nxTooltip="Another thing"></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTooltipModule, OverlayModule],
})
class TooltipOnTextFields {
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  @ViewChild('textarea')
  textarea!: ElementRef<HTMLTextAreaElement>;
}

@Component({
  selector: 'nx-app',
  template: `<button #button [nxTooltip]="message">Button</button>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTooltipModule],
})
class TooltipDemoWithoutPositionBinding {
  message: any = initialTooltipMessage;
  @ViewChild(NxTooltipDirective)
  tooltip!: NxTooltipDirective;
  @ViewChild('button')
  button!: ElementRef<HTMLButtonElement>;
}

@Component({
  selector: 'nx-app',
  template: `<button
    nxButton
    [nxTooltipShowDelay]="1000"
    [nxTooltipHideDelay]="1500"
    nxTooltip="This message appears after 1 second"
    type="button"
    #hover
  >
    Delayed tooltip
  </button>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTooltipModule, OverlayModule],
})
class TooltipDispose {
  @ViewChild(NxTooltipDirective)
  tooltip!: NxTooltipDirective;
  @ViewChild('hover')
  buttonHover!: ElementRef<HTMLButtonElement>;
}

@Component({
  selector: 'nx-app',
  template: `
    <button #button [nxTooltip]="message" [nxTooltipSelectable]="selectable">Button</button>
    <input #input [nxTooltipSelectable]="selectable" nxTooltip="Something" />

    <textarea #textarea [nxTooltipSelectable]="selectable" nxTooltip="Another thing"></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTooltipModule, OverlayModule],
})
class SelectableTooltip {
  message: any = initialTooltipMessage;
  selectable = true;
  @ViewChild('button')
  button!: ElementRef<HTMLButtonElement>;
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  @ViewChild('textarea')
  textarea!: ElementRef<HTMLTextAreaElement>;
}

@Component({
  selector: 'test-manual-trigger-tooltip-test-component',
  template: `<button #button [nxTooltip]="'Tooltip'" [manualTrigger]="manualTrigger">
    Button
  </button>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTooltipModule],
})
class ManualTriggerTooltipTestComponent {
  manualTrigger = false;
  @ViewChild('button')
  button!: ElementRef<HTMLButtonElement>;
  @ViewChild(NxTooltipDirective)
  tooltip!: NxTooltipDirective;
}

/** Asserts whether a tooltip directive has a tooltip instance. */
function assertTooltipInstance(tooltip: NxTooltipDirective, shouldExist: boolean): void {
  // Note that we have to cast this to a boolean, because Jasmine will go into an infinite loop
  // if it tries to stringify the `_tooltipInstance` when an assertion fails. The infinite loop
  // happens due to the `_tooltipInstance` having a circular structure.
  expect(!!tooltip._tooltipInstance).toBe(shouldExist);
}

describe('manualTrigger input', () => {
  let fixture: ComponentFixture<ManualTriggerTooltipTestComponent>;
  let component: ManualTriggerTooltipTestComponent;
  let buttonElement: HTMLButtonElement;
  let tooltipDirective: NxTooltipDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      animationsEnabled: true,

      imports: [ManualTriggerTooltipTestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ManualTriggerTooltipTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = component.button.nativeElement;
    tooltipDirective = component.tooltip;
  });

  it('should not show or hide the tooltip automatically when manualTrigger is true', fakeAsync(() => {
    component.manualTrigger = true;
    fixture.detectChanges();

    buttonElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick(200);
    expect(tooltipDirective._isTooltipVisible()).toBe(false);

    buttonElement.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    tick(200);
    expect(tooltipDirective._isTooltipVisible()).toBe(false);

    component.manualTrigger = false;
    fixture.detectChanges();
    buttonElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick(200);
    expect(tooltipDirective._isTooltipVisible()).toBe(true);
  }));
});
