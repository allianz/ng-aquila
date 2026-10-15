import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { NxSurface } from '@allianz/ng-aquila/surface';
import { fakeScrollStrategyFunction } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Inject,
  signal,
  Type,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject, Subscription } from 'rxjs';
import { onTestFinished } from 'vitest';
import { userEvent } from 'vitest/browser';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { SurfaceProbeComponent } from '../surface/surface.test-utils';
import { NxPopoverComponent } from './popover.component';
import { NxPopoverModule } from './popover.module';
import { NxPopoverIntl } from './popover-intl';
import {
  NX_POPOVER_SCROLL_STRATEGY,
  NxPopoverTriggerDirective,
  POPOVER_DEFAULT_OPTIONS,
  PopoverDefaultOptions,
  PopoverDirection,
} from './popover-trigger.directive';

const popoverDefaultOptions: PopoverDefaultOptions = {
  popoverWidth: '',
  popoverMaxWidth: '',
};

@Component({
  selector: 'nx-popover-test-component',
  template: '<span class="my-test-component">This is a test component</span>',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class NxTestComponent {}

@Directive({ standalone: true })
abstract class PopoverTest {
  @ViewChild(NxPopoverComponent)
  popoverInstance!: NxPopoverComponent;
  @ViewChild(NxPopoverTriggerDirective)
  triggerInstance!: NxPopoverTriggerDirective;
  @ViewChild(NxTestComponent)
  testComponentInstance!: NxTestComponent;

  closeable = false;
  popoverWidth!: string;
  popoverMaxWidth!: string;
}

describe('NxPopoverTriggerDirective', () => {
  let fixture: ComponentFixture<PopoverTest>;
  let testInstance: PopoverTest;
  let popoverInstance: NxPopoverComponent;
  let triggerInstance: NxPopoverTriggerDirective;
  let buttonNativeElement: HTMLButtonElement;
  let overlayContainer: OverlayContainer;
  let focusMonitor: FocusMonitor;

  function createTestComponent<T extends PopoverTest>(component: Type<T>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    popoverInstance = testInstance.popoverInstance;
    triggerInstance = testInstance.triggerInstance;
    buttonNativeElement = fixture.debugElement.query(By.css('button'))
      ?.nativeElement as HTMLButtonElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxIconModule],
      providers: [{ provide: POPOVER_DEFAULT_OPTIONS, useValue: popoverDefaultOptions }],
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
      overlayContainer = oc;
      focusMonitor = fm;
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
    return overlayContainer
      .getContainerElement()
      .querySelector('.nx-popover__close-icon') as HTMLSpanElement;
  }

  function getPopoverArrow(): SVGElement {
    return overlayContainer.getContainerElement().querySelector('.nx-popover__arrow') as SVGElement;
  }

  function getPopoverByDirection(direction: any): HTMLDivElement {
    return overlayContainer
      .getContainerElement()
      .querySelector('.nx-popover--' + direction) as HTMLDivElement;
  }

  function getPopoverContent(): HTMLDivElement {
    return overlayContainer
      .getContainerElement()
      .querySelector('.nx-popover__content') as HTMLDivElement;
  }

  function getOverlayPane(): HTMLDivElement {
    return overlayContainer
      .getContainerElement()
      .querySelector('.cdk-overlay-pane') as HTMLDivElement;
  }

  function hover() {
    buttonNativeElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick();
  }

  function mouseLeave() {
    buttonNativeElement.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    tick();
  }

  function click() {
    buttonNativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();
  }

  function getBackdrop(): HTMLElement {
    return overlayContainer
      .getContainerElement()
      .querySelector('.cdk-overlay-backdrop') as HTMLElement;
  }

  describe('popover state', () => {
    it('should ignore set tabIndex for triggerType "hover"', fakeAsync(() => {
      createTestComponent(PopoverShowClose);

      popoverInstance.tabIndex = 42;
      hover();
      expect(getPopoverContent().getAttribute('tabindex')).toBeFalsy();
    }));

    it('should ignore set tabIndex for triggerType "click" and use default', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);

      popoverInstance.tabIndex = 42;
      click();
      expect(getPopoverContent().getAttribute('tabindex')).toBe('-1');
    }));

    it('should set tabIndex for triggerType "manual"', fakeAsync(() => {
      createTestComponent(ManualTrigger);
      popoverInstance.tabIndex = 42;
      vi.spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit').mockReturnValue(
        undefined,
      );
      click();

      expect(getPopoverContent().getAttribute('tabindex')).toBe('42');
    }));

    it('should use default tabIndex for triggerType "manual"', fakeAsync(() => {
      createTestComponent(ManualTrigger);
      vi.spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit').mockReturnValue(
        undefined,
      );
      click();

      expect(getPopoverContent().getAttribute('tabindex')).toBe('-1');
    }));

    it('should set active state for triggerType "manual" with implemented NxTriggerButton', fakeAsync(() => {
      createTestComponent(ManualTrigger);

      click();
      expect(buttonNativeElement.classList.contains('is-trigger-test-active')).toBe(true);

      click();
      expect(buttonNativeElement.classList.contains('is-trigger-test-active')).toBe(false);
    }));

    it('should have correct boolean value in popoverShowChange event data', fakeAsync(() => {
      createTestComponent(ManualTrigger);
      const manualTrigger = fixture.componentInstance as ManualTrigger;

      click();
      expect(manualTrigger.lastShowChangeEventData).toBe(true);

      click();
      expect(manualTrigger.lastShowChangeEventData).toBe(false);
    }));
  });

  describe('open by hover', () => {
    beforeEach(waitForAsync(() => {
      popoverDefaultOptions.popoverMaxWidth = '100px';
    }));

    it('should not display the close icon on hover when nxPopoverCloseable is true', fakeAsync(() => {
      createTestComponent(PopoverShowClose);
      hover();
      expect(getCloseIcon()).toBeFalsy();
    }));

    it('should not set tabindex on content wrapper', fakeAsync(() => {
      createTestComponent(PopoverShowClose);
      hover();
      expect(getPopoverContent().getAttribute('tabindex')).toBeFalsy();
    }));

    it('should not create focus trap', fakeAsync(() => {
      createTestComponent(PopoverShowClose);
      hover();
      const focusTrapAnchors = overlayContainer
        .getContainerElement()
        .querySelectorAll('.cdk-focus-trap-anchor');
      expect(focusTrapAnchors.length).toBe(0);
    }));

    it('popover should not have focus', fakeAsync(() => {
      createTestComponent(PopoverShowClose);
      hover();
      expect(
        overlayContainer.getContainerElement().contains(_getFocusedElementPierceShadowDom()),
      ).toBe(false);
    }));

    it('should support display to left', fakeAsync(() => {
      createTestComponent(PopoverHoverComponent);
      (testInstance as PopoverHoverComponent).direction = 'left';
      fixture.detectChanges();
      hover();
      expect(getPopoverByDirection('left')).toBeTruthy();
    }));

    it('should support display to top', fakeAsync(() => {
      createTestComponent(PopoverHoverComponent);
      (testInstance as PopoverHoverComponent).direction = 'top';
      fixture.detectChanges();
      hover();
      expect(getPopoverByDirection('top')).toBeTruthy();
    }));

    it('should support display to bottom', fakeAsync(() => {
      createTestComponent(PopoverHoverComponent);
      (testInstance as PopoverHoverComponent).direction = 'bottom';
      fixture.detectChanges();
      hover();
      expect(getPopoverByDirection('bottom')).toBeTruthy();
    }));

    it('should support display to right', fakeAsync(() => {
      createTestComponent(PopoverHoverComponent);
      hover();
      expect(getPopoverByDirection('right')).toBeTruthy();
    }));

    it('should support open and close the popover on mouseenter/mouseleave for nxTrigger="hover"', fakeAsync(() => {
      createTestComponent(PopoverHoverComponent);
      buttonNativeElement.dispatchEvent(new Event('mouseenter'));
      checkPopoverOpen(true);
      buttonNativeElement.dispatchEvent(new Event('mouseleave'));
      checkPopoverOpen(false);
    }));

    it('should not display the close icon for nxTrigger="hover"', fakeAsync(() => {
      createTestComponent(PopoverHoverComponent);
      hover();
      expect(getCloseIcon()).toBeFalsy();
    }));

    it('should emit closed event on mouseleave', fakeAsync(() => {
      createTestComponent(PopoverHoverComponent);
      const spy = vi.fn().mockName('closed spy');

      const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);

      hover();
      mouseLeave();
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    }));

    it('should listen to keyboard focus in child elements', fakeAsync(() => {
      createTestComponent(PopoverHoverFormfieldComponent);
      const inputElement = fixture.nativeElement.querySelector('input');
      focusMonitor.focusVia(inputElement, 'keyboard');
      fixture.detectChanges();
      flush();
      expect(getPopoverContent()).toBeTruthy();
      dispatchKeyboardEvent(inputElement, 'keydown', TAB);
      fixture.detectChanges();
      flush();
      expect(getPopoverContent()).toBeFalsy();
    }));
  });

  describe('open by click', () => {
    it('should support open the popover on click for nxTrigger="click"', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      checkPopoverOpen(true);
      expect(getCloseIcon()).toBeTruthy();
    }));

    it('should display the close icon for nxTrigger="click"', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      expect(getCloseIcon()).toBeTruthy();
    }));

    it('should hide the close icon for nxTrigger="click" and [nxPopoverCloseable]="false"', fakeAsync(() => {
      createTestComponent(PopoverHideCloseForClick);
      click();
      expect(getCloseIcon()).toBeFalsy();
    }));

    it('should support not open the popover on mouseenter for nxTrigger="click"', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      hover();
      checkPopoverOpen(false);
    }));

    it('should close the popover by clicking on the close icon for nxTrigger="click"', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      getCloseIcon().click();
      expect(getPopoverContent()).toBeFalsy();
      flush();
    }));

    it('should close the popover by clicking on element again for nxTrigger="click"', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      click();
      expect(getPopoverContent()).toBeFalsy();
    }));

    it('should close the popover by clicking outside for nxTrigger="click"', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      document.body.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(getPopoverContent()).toBeFalsy();
      flush();
    }));

    it('should open correctly inside shadow dom', fakeAsync(() => {
      createTestComponent(PopoverClickShadowDomComponent);
      click();
      fixture.detectChanges();
      flush();
      checkPopoverOpen(true);
    }));

    it('should close by clicking other element inside shadow dom', fakeAsync(() => {
      createTestComponent(PopoverClickShadowDomComponent);
      click();
      const button = fixture.debugElement.query(By.css('.other')).nativeElement;
      button.click();
      fixture.detectChanges();
      flush();
      expect(getPopoverContent()).toBeFalsy();
    }));

    it('should create focus trap', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      const focusTrapAnchors = overlayContainer
        .getContainerElement()
        .querySelectorAll('.cdk-focus-trap-anchor');
      expect(focusTrapAnchors.length).toBeGreaterThan(0);
    }));

    it('should not close when clicked outside if closeOnClickOutside is set to false', fakeAsync(() => {
      createTestComponent(ClickOnDocument);
      (testInstance as ClickOnDocument).closable = false;
      fixture.detectChanges();

      click();
      document.body.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(getPopoverContent()).toBeTruthy();
    }));

    it('should emit closed event when clicking outside', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      const spy = vi.fn().mockName('closed spy');

      const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);

      click();
      document.body.dispatchEvent(new MouseEvent('click'));
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
      flush();
    }));

    it('should emit closed event on trigger click', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      const spy = vi.fn().mockName('closed spy');

      const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);
      click();
      click();
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    }));

    it('should emit closed event on close icon click', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);

      const spy = vi.fn().mockName('closed spy');
      const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);

      click();
      getCloseIcon().click();
      flush();
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    }));

    it('should emit closed event when overlay is clicked', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);

      const spy = vi.fn().mockName('closed spy');
      const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);

      click();
      overlayContainer.getContainerElement().click();
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
      flush();
    }));

    it('should close the popover by clicking anywhere outside the component', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      flush();
      dispatchFakeEvent(document.body, 'click');
      fixture.detectChanges();
      flush();
      expect(getPopoverContent()).toBeFalsy();
    }));

    it('should close the popover by hitting Esc key', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);

      expect(getPopoverContent()).toBeFalsy();
      flush();
    }));

    it('should not close the popover when clicking on it', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      getPopoverContent().click();
      fixture.detectChanges();
      checkPopoverOpen(true);
    }));

    it('should set trigger button active state with implemented NxTriggerButton', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);

      click();
      expect(buttonNativeElement.classList.contains('is-trigger-test-active')).toBe(true);

      click();
      expect(buttonNativeElement.classList.contains('is-trigger-test-active')).toBe(false);
    }));
  });

  describe('keyboard', () => {
    it('should open popover by space key', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      buttonNativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { keyCode: SPACE, which: SPACE }),
      );

      fixture.detectChanges();
      flush();

      checkPopoverOpen(true);
    }));

    it('should open popover by enter key', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      buttonNativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { keyCode: ENTER, which: ENTER }),
      );

      fixture.detectChanges();
      flush();

      checkPopoverOpen(true);
    }));

    it('should close popover when hit space key on close button', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      checkPopoverOpen(true);

      getCloseIcon().dispatchEvent(new KeyboardEvent('keyup', { keyCode: SPACE, which: SPACE }));

      fixture.detectChanges();
      flush();

      checkPopoverOpen(false);
    }));

    it('should close popover when hit enter on close button', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      checkPopoverOpen(true);

      getCloseIcon().dispatchEvent(new KeyboardEvent('keyup', { keyCode: ENTER, which: ENTER }));

      fixture.detectChanges();

      flush();

      checkPopoverOpen(false);
    }));

    it('should call preventDefault if trigger is not button element', fakeAsync(() => {
      createTestComponent(PopoverDivTrigger);
      fixture.detectChanges();

      const triggerElement = fixture.debugElement.query(By.css('.trigger'));
      const keydownEvent = new KeyboardEvent('keydown', { keyCode: SPACE, which: SPACE });
      const spy = vi.spyOn(keydownEvent, 'preventDefault').mockReturnValue(undefined);
      triggerElement.nativeElement.dispatchEvent(keydownEvent);

      fixture.detectChanges();
      flush();

      checkPopoverOpen(true);
      expect(spy).toHaveBeenCalled();
    }));

    it('should not call preventDefault if trigger is button element', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      fixture.detectChanges();

      const keydownEvent = new KeyboardEvent('keydown', { keyCode: SPACE, which: SPACE });
      const spy = vi.spyOn(keydownEvent, 'preventDefault').mockReturnValue(undefined);
      buttonNativeElement.dispatchEvent(keydownEvent);

      fixture.detectChanges();
      flush();

      checkPopoverOpen(true);
      expect(spy).not.toHaveBeenCalled();
    }));
  });

  describe('modal popover', () => {
    it('should show a backdrop', fakeAsync(() => {
      createTestComponent(ModalPopover);
      click();
      const backdrop = getBackdrop();
      expect(backdrop).toBeTruthy();
    }));

    it('should close popover on backdrop click', fakeAsync(() => {
      createTestComponent(ModalPopover);
      click();
      const backdrop = getBackdrop();
      backdrop.click();
      flush();
      expect(getPopoverContent()).toBeFalsy();
    }));

    it('should not close when backdrop is clicked if closeOnClickOutside is set to false', fakeAsync(() => {
      createTestComponent(ModalPopover);
      (testInstance as ModalPopover).closable = false;
      fixture.detectChanges();
      click();

      const backdrop = getBackdrop();
      backdrop.click();
      fixture.detectChanges();
      flush();

      expect(getPopoverContent()).toBeTruthy();
    }));

    it('should emit closed event on backdrop click', fakeAsync(() => {
      createTestComponent(ModalPopover);
      const spy = vi.fn().mockName('closed spy');

      const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);
      click();
      const backdrop = getBackdrop();
      backdrop.click();
      flush();
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    }));

    it('should behave correctly if closeOnClickOutside is set to true', fakeAsync(() => {
      createTestComponent(ModalPopover);
      click();
      const backdrop = getBackdrop();
      backdrop.click();
      flush();
      expect(getPopoverContent()).toBeFalsy();
    }));

    it('should behave correctly if closeOnClickOutside is set to false', fakeAsync(() => {
      createTestComponent(ModalPopover);

      (testInstance as ClickOnDocument).closable = false;
      fixture.detectChanges();

      click();
      const backdrop = getBackdrop();
      backdrop.click();
      flush();
      expect(getPopoverContent()).toBeTruthy();
    }));
  });

  describe('show change event emission', () => {
    it('should emit a show change event on manual popover with esc key', fakeAsync(() => {
      createTestComponent(ManualTrigger);
      vi.spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit').mockReturnValue(
        undefined,
      );
      click();
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(true);

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);

      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(false);
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(2);
      flush();
    }));

    it('should emit a show change event on click popover', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      vi.spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit').mockReturnValue(
        undefined,
      );
      click();
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(true);
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(1);
      click();
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(false);
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(2);
    }));

    it('should emit a show change event on hover popover', fakeAsync(() => {
      createTestComponent(PopoverHoverComponent);
      vi.spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit').mockReturnValue(
        undefined,
      );
      hover();
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(true);
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(1);
      mouseLeave();
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(false);
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(2);
    }));

    it('should emit a show change event on closing due to scroll', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      vi.spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit').mockReturnValue(
        undefined,
      );
      click();
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(true);
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(1);
      dispatchFakeEvent(document, 'scroll');
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(false);
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(2);
    }));

    it('should release the focus trap and focus monitoring when closed by scroll', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      click();
      const trigger = fixture.componentInstance.triggerInstance as any;
      const destroySpy = vi.spyOn(trigger._focusTrap, 'destroy');
      const stopSpy = vi.spyOn(trigger._focusMonitor, 'stopMonitoring');
      const monitored = [...trigger._monitoredElements];
      expect(monitored.length).toBeGreaterThan(0);

      dispatchFakeEvent(document, 'scroll');

      expect(destroySpy).toHaveBeenCalled();
      monitored.forEach((el) => expect(stopSpy).toHaveBeenCalledWith(el));
      expect(trigger._monitoredElements).toEqual([]);
    }));

    it('should be closed on scroll', fakeAsync(() => {
      createTestComponent(ScrollablePopover);
      vi.spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit').mockReturnValue(
        undefined,
      );
      const spy = vi.fn().mockName('closed spy');
      const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);
      click();

      const scrollingContainerEl = fixture.debugElement.query(By.css('.scrollWindow'));
      scrollingContainerEl.nativeElement.scrollTop = 250;
      dispatchFakeEvent(scrollingContainerEl.nativeElement, 'scroll');
      expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(false);
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    }));
  });

  describe('lazyload content', () => {
    it('Should not load content', fakeAsync(() => {
      createTestComponent(LazyloadContent);
      expect(fixture.componentInstance.testComponentInstance).toBeFalsy();
    }));

    it('Content should be loaded after opening', fakeAsync(() => {
      createTestComponent(LazyloadContent);
      click();
      expect(fixture.componentInstance.testComponentInstance).toBeTruthy();
    }));

    it('Content should be destroyed after closing', fakeAsync(() => {
      createTestComponent(LazyloadContent);
      click();
      click();
      flush();
      expect(fixture.componentInstance.testComponentInstance).toBeFalsy();
    }));
  });

  describe('i18n', () => {
    it('should change the dropdown top label via provider', fakeAsync(() => {
      createTestComponent(I18nTest);
      click();
      const closeIcon = overlayContainer
        .getContainerElement()
        .querySelector('.nx-popover__close-icon') as Element;
      expect(closeIcon.getAttribute('aria-label')).toBe('custom close label');
    }));
  });

  describe('fallbacks', () => {
    it('should support fallback position', fakeAsync(() => {
      createTestComponent(PopoverFallBackComponent);

      // Force the trigger to the right edge so "right" placement cannot fit
      const triggerEl = fixture.debugElement.query(By.css('button')).nativeElement as HTMLElement;
      triggerEl.style.position = 'fixed';
      triggerEl.style.right = '0';
      triggerEl.style.top = '50px';
      fixture.detectChanges();
      tick();

      (testInstance as PopoverFallBackComponent).direction = 'right';
      fixture.detectChanges();
      hover();
      expect(getPopoverByDirection('right')).toBeFalsy();
    }));

    it('should support correct arrow position', fakeAsync(() => {
      createTestComponent(PopoverFallBackComponent);
      hover();
      const elementOffsetLeft = Number(getPopoverArrow().style.left.split('p')[0]);
      const expected = Math.round(
        buttonNativeElement.getBoundingClientRect().left +
          buttonNativeElement.getBoundingClientRect().width / 2,
      );
      expect(expected).toEqual(Math.round(elementOffsetLeft));
    }));
  });

  describe('Focus states', () => {
    it('Should return back focus after closing popover', fakeAsync(() => {
      createTestComponent(PopoverClickComponent);
      buttonNativeElement.focus();
      click();
      fixture.detectChanges();
      vi.spyOn(buttonNativeElement, 'focus');
      getCloseIcon().click();
      tick();

      expect(buttonNativeElement.focus).toHaveBeenCalled();
      flush();
    }));
  });

  // Real key presses: synthetic events skip default actions like scrolling and button activation.
  describe('focus restoration with real keyboard input', () => {
    let focusWhenRemoved: Element | null | undefined;

    async function openWithKeyboard(trigger: HTMLElement, key: string) {
      trigger.focus();
      await userEvent.keyboard(key);
      await vi.waitFor(() =>
        expect(getPopoverContent()?.contains(_getFocusedElementPierceShadowDom())).toBe(true),
      );
      focusWhenRemoved = undefined;
      testInstance.popoverInstance.closed.subscribe(() => {
        focusWhenRemoved = _getFocusedElementPierceShadowDom();
      });
    }

    async function expectClosedWithFocusOn(trigger: HTMLElement) {
      await vi.waitFor(() => expect(getPopoverContent()).toBeNull());
      await new Promise((resolve) => setTimeout(resolve, 50));
      fixture.detectChanges();
      expect(getPopoverContent()).toBeNull();
      expect(focusWhenRemoved).toBe(trigger);
      expect(_getFocusedElementPierceShadowDom()).toBe(trigger);
    }

    describe.each([
      ['button trigger', 'button'],
      ['non-button trigger', 'div'],
    ] as const)('%s', (_triggerName, triggerElement) => {
      let trigger: HTMLElement;

      beforeEach(() => {
        const keyboardFixture = TestBed.createComponent(PopoverKeyboardComponent);
        keyboardFixture.componentInstance.triggerElement = triggerElement;
        keyboardFixture.detectChanges();
        fixture = keyboardFixture;
        testInstance = keyboardFixture.componentInstance;
        trigger = keyboardFixture.nativeElement.querySelector('.trigger');
      });

      // Space is left out for <button>: if focus hasn't moved into the popover by keyup, the native click closes it again.
      it.each(
        triggerElement === 'button'
          ? [['Enter', '{Enter}']]
          : [
              ['Space', ' '],
              ['Enter', '{Enter}'],
            ],
      )('opens with %s, stays open and does not scroll the page', async (_, key) => {
        await openWithKeyboard(trigger, key);
        await new Promise((resolve) => setTimeout(resolve, 50));
        expect(getPopoverContent()).not.toBeNull();
        expect(window.scrollY).toBe(0);
      });

      it.each([
        ['Space', ' '],
        ['Enter', '{Enter}'],
      ])('closes with %s on the close button and returns focus', async (_, key) => {
        await openWithKeyboard(trigger, '{Enter}');
        await userEvent.tab();
        expect(_getFocusedElementPierceShadowDom()).toBe(getCloseIcon());

        await userEvent.keyboard(key);

        await expectClosedWithFocusOn(trigger);
        expect(window.scrollY).toBe(0);
      });

      it('closes with Escape and returns focus', async () => {
        await openWithKeyboard(trigger, '{Enter}');
        await userEvent.keyboard('{Escape}');
        await expectClosedWithFocusOn(trigger);
      });

      it('does not take focus away from an element clicked outside', async () => {
        await openWithKeyboard(trigger, '{Enter}');
        const outside: HTMLInputElement = fixture.nativeElement.querySelector('input');

        await userEvent.click(outside);

        await vi.waitFor(() => expect(getPopoverContent()).toBeNull());
        await new Promise((resolve) => setTimeout(resolve, 50));
        expect(document.activeElement).toBe(outside);
      });
    });

    describe('trigger inside shadow DOM', () => {
      beforeEach(() => createTestComponent(PopoverClickShadowDomComponent));

      it('closes with Escape and returns focus into the shadow root', async () => {
        await openWithKeyboard(buttonNativeElement, '{Enter}');
        await userEvent.keyboard('{Escape}');
        await expectClosedWithFocusOn(buttonNativeElement);
      });

      it('closes with Space on the close button and returns focus into the shadow root', async () => {
        await openWithKeyboard(buttonNativeElement, '{Enter}');
        await userEvent.tab();
        await userEvent.keyboard(' ');
        await expectClosedWithFocusOn(buttonNativeElement);
      });
    });

    describe('focus inside shadow DOM', () => {
      let trigger: HTMLElement;

      function createKeyboardComponent<T extends PopoverTest>(component: Type<T>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        trigger = fixture.nativeElement.querySelector('.trigger');
      }

      it('returns focus when a web component inside the popover is focused', async () => {
        createKeyboardComponent(PopoverWithShadowDomContentComponent);
        await openWithKeyboard(trigger, '{Enter}');
        const innerInput = overlayContainer
          .getContainerElement()
          .querySelector('test-shadow-dom-input')!
          .shadowRoot!.querySelector('input')!;
        innerInput.focus();
        expect(_getFocusedElementPierceShadowDom()).toBe(innerInput);

        await userEvent.keyboard('{Escape}');

        await expectClosedWithFocusOn(trigger);
      });

      it('returns focus when the overlay container lives inside a shadow root', async () => {
        const host = document.createElement('div');
        const container = overlayContainer.getContainerElement();
        document.body.appendChild(host);
        host.attachShadow({ mode: 'open' }).appendChild(container);
        onTestFinished(() => {
          document.body.appendChild(container);
          host.remove();
        });
        createKeyboardComponent(PopoverKeyboardComponent);
        await openWithKeyboard(trigger, '{Enter}');

        await userEvent.keyboard('{Escape}');

        await expectClosedWithFocusOn(trigger);
      });
    });

    it('returns focus when closed while focus is in a nested popover from lazy content', async () => {
      const nestedFixture = TestBed.createComponent(NestedPopoverComponent);
      nestedFixture.detectChanges();
      const outerTrigger: HTMLElement = nestedFixture.nativeElement.querySelector('.trigger');
      outerTrigger.focus();
      await userEvent.keyboard('{Enter}');
      const innerTrigger = await vi.waitFor(() =>
        overlayContainer.getContainerElement().querySelector<HTMLElement>('.inner-trigger')!,
      );
      innerTrigger.focus();
      await userEvent.keyboard('{Enter}');
      await vi.waitFor(() =>
        expect(
          overlayContainer.getContainerElement().querySelectorAll('.nx-popover__content'),
        ).toHaveLength(2),
      );
      const innerContent = overlayContainer
        .getContainerElement()
        .querySelectorAll('.nx-popover__content')[1];
      await vi.waitFor(() =>
        expect(innerContent.contains(_getFocusedElementPierceShadowDom())).toBe(true),
      );

      nestedFixture.componentInstance.outer.close();

      expect(
        overlayContainer.getContainerElement().querySelector('.nx-popover__content'),
      ).toBeNull();
      expect(_getFocusedElementPierceShadowDom()).toBe(outerTrigger);
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(PopoverClickComponent);
      buttonNativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      await expect(fixture.nativeElement).toBeAccessible();
    });

    it('has aria-haspopup', async () => {
      createTestComponent(PopoverClickComponent);
      expect(buttonNativeElement.getAttribute('aria-haspopup')).toBe('dialog');
    });
  });

  describe('directionality of overlay', () => {
    it('should be set to ltr by default', fakeAsync(() => {
      createTestComponent(PopoverHoverComponent);
      click();
      fixture.detectChanges();
      const direction = (triggerInstance as any).overlayRef.getDirection();
      expect(direction).toBe('ltr');
    }));

    it('should be set to rtl if container direction is rtl', fakeAsync(() => {
      createTestComponent(PopoverWithinRTLContainer);
      click();
      fixture.detectChanges();
      const direction = (triggerInstance as any).overlayRef.getDirection();
      expect(direction).toBe('rtl');
    }));

    it('should be updated respectively, when ancestor dir changes', fakeAsync(() => {
      createTestComponent(PopoverWithinRTLContainer);
      click();
      fixture.detectChanges();
      (testInstance as PopoverWithinRTLContainer).direction = 'ltr';
      fixture.detectChanges();
      click();
      fixture.detectChanges();
      const direction = (triggerInstance as any).overlayRef.getDirection();
      expect(direction).toBe('ltr');
    }));
  });

  describe('when ancestor directionality changes', () => {
    it('popover should be closed', fakeAsync(() => {
      createTestComponent(PopoverWithinRTLContainer);
      click();
      fixture.detectChanges();
      vi.spyOn(triggerInstance as any, 'closePopover').mockReturnValue(undefined);
      (testInstance as PopoverWithinRTLContainer).direction = 'ltr';
      fixture.detectChanges();
      expect((triggerInstance as any).closePopover).toHaveBeenCalled();
    }));

    it('overlayRef disposed and unset', fakeAsync(() => {
      createTestComponent(PopoverWithinRTLContainer);
      const triggerInstanceWithPrivateAccess = triggerInstance as any;
      click();
      fixture.detectChanges();
      vi.spyOn(triggerInstanceWithPrivateAccess.overlayRef, 'dispose').mockReturnValue(undefined);
      const disposeFunction = triggerInstanceWithPrivateAccess.overlayRef.dispose;
      (testInstance as PopoverWithinRTLContainer).direction = 'ltr';
      fixture.detectChanges();
      expect(disposeFunction).toHaveBeenCalledTimes(1);
      expect(triggerInstanceWithPrivateAccess.overlayRef).toBeNull();
      flush();
    }));
  });

  describe('popover default width', () => {
    beforeEach(waitForAsync(() => {
      popoverDefaultOptions.popoverWidth = '500px';
      popoverDefaultOptions.popoverMaxWidth = '400px';
    }));

    it('popover should use default width', fakeAsync(() => {
      createTestComponent(PopoverDefaultWidthComponent);
      click();
      expect(getOverlayPane().clientWidth).toBe(400);
    }));

    it('popover width should be less than or equal to default max-width', fakeAsync(() => {
      createTestComponent(PopoverDefaultWidthComponent);
      click();
      expect(getOverlayPane().clientWidth).toBeLessThanOrEqual(400);
    }));

    it('popover width should be undefined when there are no default settings', fakeAsync(() => {
      delete popoverDefaultOptions.popoverWidth;
      createTestComponent(PopoverDefaultWidthComponent);
      click();
      expect(getOverlayPane().clientWidth).toBeLessThanOrEqual(400);
      expect((testInstance as PopoverWidthComponent).popoverMaxWidth).toBeUndefined();
    }));

    it('popover max-width should be undefined when there are no default settings', fakeAsync(() => {
      delete popoverDefaultOptions.popoverMaxWidth;
      createTestComponent(PopoverDefaultWidthComponent);
      click();
      expect(getOverlayPane().clientWidth).toBe(500);
      expect((testInstance as PopoverWidthComponent).popoverMaxWidth).toBeUndefined();
    }));
  });

  describe('popover property width', () => {
    beforeEach(waitForAsync(() => {
      popoverDefaultOptions.popoverWidth = '500px';
      popoverDefaultOptions.popoverMaxWidth = '400px';
    }));

    it('popover should use default max-width if the property popoverMaxWidth has not been set', fakeAsync(() => {
      createTestComponent(PopoverWidthComponent);
      (testInstance as PopoverWidthComponent).popoverWidth = '600px';
      fixture.detectChanges();
      click();
      expect(getOverlayPane().clientWidth).toBe(400);
      expect((testInstance as PopoverWidthComponent).popoverMaxWidth).toBeUndefined();
    }));

    it('popover should use default width if the property popoverWidth has not been set', fakeAsync(() => {
      createTestComponent(PopoverWidthComponent);
      (testInstance as PopoverWidthComponent).popoverMaxWidth = '600px';
      fixture.detectChanges();
      click();
      expect(getOverlayPane().clientWidth).toBe(500);
    }));

    it('popover should use width if max-width > width', fakeAsync(() => {
      createTestComponent(PopoverWidthComponent);
      (testInstance as PopoverWidthComponent).popoverMaxWidth = '700px';
      (testInstance as PopoverWidthComponent).popoverWidth = '500px';
      fixture.detectChanges();
      click();
      expect(getOverlayPane().clientWidth).toBe(500);
    }));

    it('popover should use max-width if max-width < width', fakeAsync(() => {
      createTestComponent(PopoverWidthComponent);
      (testInstance as PopoverWidthComponent).popoverMaxWidth = '500px';
      (testInstance as PopoverWidthComponent).popoverWidth = '700px';
      fixture.detectChanges();
      click();
      expect(getOverlayPane().clientWidth).toBe(500);
    }));
  });

  describe('inverse', () => {
    function getPopover(): HTMLElement {
      return overlayContainer.getContainerElement().querySelector('.nx-popover') as HTMLElement;
    }

    it('is not inverse by default', fakeAsync(() => {
      createTestComponent(PopoverInverseComponent);
      click();

      expect(popoverInstance.inverse()).toBe(false);
      expect(getPopover().classList).not.toContain('nx-popover--inverse');
      expect(getPopover().getAttribute('data-nx-surface')).toBe('default');
    }));

    it('paints the attention surface when inverse is set', fakeAsync(() => {
      createTestComponent(PopoverInverseComponent);
      (testInstance as PopoverInverseComponent).inverse = true;
      fixture.detectChanges();
      click();

      expect(popoverInstance.inverse()).toBe(true);
      expect(getPopover().classList).toContain('nx-popover--inverse');
      expect(getPopover().getAttribute('data-nx-surface')).toBe('attention');
    }));

    // The panel paints its own background, so its content must adapt to that panel rather than to
    // whatever surface the trigger sits on.
    it('publishes the attention surface to its content', fakeAsync(() => {
      createTestComponent(PopoverInverseComponent);
      (testInstance as PopoverInverseComponent).inverse = true;
      fixture.detectChanges();
      click();

      expect(probeSurface()).toBe('attention');
    }));

    it('publishes the default surface to its content when not inverse', fakeAsync(() => {
      createTestComponent(PopoverInverseComponent);
      click();

      expect(probeSurface()).toBe('default');
    }));

    // Unlike the other adopters, the popover never derives `inverse` from its surroundings: a light
    // popover opened from a button on a dark header is a valid design choice.
    it('never reacts to an attention surface enclosing it', fakeAsync(() => {
      createTestComponent(PopoverOnSurfaceComponent);
      click();

      expect(popoverInstance.inverse()).toBe(false);
      expect(getPopover().classList).not.toContain('nx-popover--inverse');
      expect(probeSurface()).toBe('default');
    }));

    it('is inverse on an enclosing surface only when asked', fakeAsync(() => {
      createTestComponent(PopoverOnSurfaceComponent);
      (testInstance as PopoverOnSurfaceComponent).inverse = true;
      fixture.detectChanges();
      click();

      expect(popoverInstance.inverse()).toBe(true);
      expect(getPopover().classList).toContain('nx-popover--inverse');
    }));

    // The bare `inverse` attribute is what the docs example ships, so the string-coercion path
    // needs to resolve to true rather than to the attribute's empty-string value.
    it('treats a bare inverse attribute as true', fakeAsync(() => {
      createTestComponent(PopoverBareInverseComponent);
      click();

      expect(popoverInstance.inverse()).toBe(true);
      expect(getPopover().classList).toContain('nx-popover--inverse');
    }));

    // Reacting to the input while open matters: the popover is only instantiated once, so a value
    // pushed after the panel is attached must still repaint it.
    it('reacts to the input changing while open', fakeAsync(() => {
      createTestComponent(PopoverInverseComponent);
      click();
      expect(getPopover().classList).not.toContain('nx-popover--inverse');

      (testInstance as PopoverInverseComponent).inverse = true;
      fixture.detectChanges();

      expect(getPopover().classList).toContain('nx-popover--inverse');
    }));

    function probeSurface(): string | null {
      return overlayContainer
        .getContainerElement()
        .querySelector('nx-surface-probe')!
        .getAttribute('data-resolved-surface');
    }
  });

  it('should be able to override the scroll strategy in parent injector', () => {
    TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [PopoverClickComponent, NxPopoverModule, NxInputModule],
        providers: [
          {
            provide: NX_POPOVER_SCROLL_STRATEGY,
            useFactory: () => fakeScrollStrategyFunction,
          },
        ],
      })
      .compileComponents();
    createTestComponent(PopoverClickComponent);
    expect((testInstance as PopoverClickComponent).scrollStrategy).toBe(fakeScrollStrategyFunction);
  });
});

@Directive({
  selector: '[triggerTest]',
  standalone: true,
  providers: [{ provide: NxTriggerButton, useExisting: TriggerButtonTestDirective }],
  host: { '[class.is-trigger-test-active]': 'active()' },
})
class TriggerButtonTestDirective extends NxTriggerButton {
  active = signal(false);

  setTriggerInactive() {
    this.active.set(false);
  }
  setTriggerActive() {
    this.active.set(true);
  }
}

@Component({
  selector: 'test-popover-hover-component',
  template: `<div
      style="width: 400px; height: 400px; display: flex; justify-content: center; align-items: center;"
    >
      <button
        [nxPopoverTriggerFor]="popoverHover"
        [nxPopoverDirection]="direction"
        nxPopoverTrigger="hover"
        [nxPopoverCloseable]="closeable"
      >
        Hover
      </button>
    </div>

    <nx-popover #popoverHover>
      <span>Content</span>
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverHoverComponent extends PopoverTest {
  direction: PopoverDirection = 'right';
}
@Component({
  selector: 'test-popover-hover-formfield-component',
  template: `<div
      style="width: 400px; height: 400px; display: flex; justify-content: center; align-items: center;"
    >
      <nx-formfield label="Label" [nxPopoverTriggerFor]="popoverHover" nxPopoverTrigger="hover">
        <input nxInput />
      </nx-formfield>
    </div>

    <nx-popover #popoverHover>
      <span>Content</span>
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverHoverFormfieldComponent extends PopoverTest {}

@Component({
  selector: 'test-popover-click-component',
  template: `<div>
      <button
        [nxPopoverTriggerFor]="popoverHover"
        nxPopoverDirection="right"
        nxPopoverTrigger="click"
        triggerTest
      >
        Hover
      </button>
    </div>

    <nx-popover #popoverHover>
      <span>Content</span>
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    OverlayModule,
    NxPopoverModule,
    NxFormfieldModule,
    NxInputModule,
    TriggerButtonTestDirective,
    NxIconModule,
  ],
})
class PopoverClickComponent extends PopoverTest {
  constructor(
    @Inject(NX_POPOVER_SCROLL_STRATEGY)
    public scrollStrategy: any,
  ) {
    super();
  }
}

@Component({
  selector: 'test-popover-inverse',
  template: `<button [nxPopoverTriggerFor]="popover" nxPopoverTrigger="click">Open</button>

    <nx-popover #popover [inverse]="inverse">
      <span>Content</span>
      <nx-surface-probe />
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, SurfaceProbeComponent],
})
class PopoverInverseComponent extends PopoverTest {
  inverse = false;
}

/** `inverse` written as a bare attribute, the way the docs example does. */
@Component({
  selector: 'test-popover-bare-inverse',
  template: `<button [nxPopoverTriggerFor]="popover" nxPopoverTrigger="click">Open</button>

    <nx-popover #popover inverse>
      <span>Content</span>
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule],
})
class PopoverBareInverseComponent extends PopoverTest {}

/** Both the trigger and the popover sit on an attention surface, which it must ignore. */
@Component({
  selector: 'test-popover-on-surface',
  template: `<div nxSurface="attention">
    <button [nxPopoverTriggerFor]="popover" nxPopoverTrigger="click">Open</button>
    <nx-popover #popover [inverse]="inverse">
      <span>Content</span>
      <nx-surface-probe />
    </nx-popover>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxSurface, SurfaceProbeComponent],
})
class PopoverOnSurfaceComponent extends PopoverTest {
  inverse = false;
}

@Component({
  selector: 'test-popover-click-shadow-dom-component',
  template: `<div>
      <button
        [nxPopoverTriggerFor]="popoverHover"
        nxPopoverDirection="right"
        nxPopoverTrigger="click"
      >
        Hover
      </button>
    </div>

    <button class="other">Other button</button>

    <nx-popover #popoverHover>
      <span>Content</span>
    </nx-popover>`,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverClickShadowDomComponent extends PopoverTest {}

@Component({
  selector: 'test-popover-show-close',
  template: `<div>
      <button
        [nxPopoverTriggerFor]="popoverHover"
        nxPopoverDirection="right"
        nxPopoverTrigger="hover"
        [nxPopoverCloseable]="true"
      >
        Hover
      </button>
    </div>

    <nx-popover #popoverHover>
      <span>Content</span>
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverShowClose extends PopoverTest {}

@Component({
  selector: 'test-popover-hide-close',
  template: `<div>
      <button
        [nxPopoverTriggerFor]="popoverHover"
        nxPopoverDirection="right"
        nxPopoverTrigger="hover"
        [nxPopoverCloseable]="false"
      >
        Hover
      </button>
    </div>

    <nx-popover #popoverHover>
      <span>Content</span>
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverHideClose extends PopoverTest {}

@Component({
  selector: 'test-popover-hide-close-for-click',
  template: `<div>
      <button
        [nxPopoverTriggerFor]="popoverHover"
        nxPopoverDirection="right"
        nxPopoverTrigger="click"
        [nxPopoverCloseable]="false"
      >
        Hover
      </button>
    </div>

    <nx-popover #popoverHover>
      <span>Content</span>
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverHideCloseForClick extends PopoverTest {}

@Component({
  selector: 'test-popover-fall-back-component',
  template: `<div>
      <button
        [nxPopoverTriggerFor]="popoverHover"
        [nxPopoverDirection]="direction"
        nxPopoverTrigger="hover"
        [nxPopoverCloseable]="false"
      >
        Hover
      </button>
    </div>

    <nx-popover #popoverHover>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s.
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverFallBackComponent extends PopoverTest {
  direction: PopoverDirection = 'right';
}

@Component({
  selector: 'test-modal-popover',
  template: `<div>
      <button
        [nxPopoverTriggerFor]="popoverHover"
        nxPopoverDirection="right"
        nxPopoverTrigger="click"
        [nxPopoverCloseable]="false"
        [closeOnClickOutside]="closable"
        [nxPopoverModal]="true"
      >
        Hover
      </button>
    </div>

    <nx-popover #popoverHover>
      <span>Content</span>
    </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class ModalPopover extends PopoverTest {
  closable = true;
}

@Component({
  selector: 'test-lazyload-content',
  template: `
    <button [nxPopoverTriggerFor]="popoverLazyloadContent" nxPopoverTrigger="click">click</button>

    <nx-popover #popoverLazyloadContent>
      <ng-template nxPopoverContent>
        <nx-popover-test-component></nx-popover-test-component>
      </ng-template>
    </nx-popover>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxTestComponent, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class LazyloadContent extends PopoverTest {}

@Component({
  selector: 'test-manual-trigger',
  template: `
    <button
      #popoverTrigger="nxPopoverTrigger"
      [nxPopoverTriggerFor]="popoverManual"
      [nxPopoverShow]="popoverManualOpenFlag()"
      (nxPopoverShowChange)="popoverOnShowChange($event)"
      nxPopoverDirection="top"
      (click)="onTrigger()"
      nxPopoverTrigger="manual"
      triggerTest
    >
      Manual
    </button>

    <nx-popover #popoverManual>
      <div><span>Trigger manually</span></div>
    </nx-popover>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    OverlayModule,
    NxPopoverModule,
    NxFormfieldModule,
    NxInputModule,
    TriggerButtonTestDirective,
  ],
})
class ManualTrigger extends PopoverTest {
  popoverManualOpenFlag = signal(false);

  onTrigger = () => {
    this.popoverManualOpenFlag.update((flag) => !flag);
  };

  lastShowChangeEventData: any;

  popoverOnShowChange(current: any) {
    setTimeout(() => (this.lastShowChangeEventData = current));
  }
}

@Component({
  selector: 'test-click-on-document',
  template: `<div>
      <button
        [nxPopoverTriggerFor]="popoverHover"
        nxPopoverDirection="right"
        nxPopoverTrigger="click"
        [closeOnClickOutside]="closable"
      >
        Hover
      </button>
    </div>

    <nx-popover #popoverHover> </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class ClickOnDocument extends PopoverTest {
  closable = true;
}

@Component({
  selector: 'test-scrollable-popover',
  template: `<div
      cdkScrollable
      class="scrollWindow"
      style="padding: 100px; margin: 300px;height: 200px; width: 200px; overflow: auto;"
    >
      <button [nxPopoverTriggerFor]="popoverInScrollableContainer" nxPopoverTrigger="click">
        Click
      </button>
    </div>

    <nx-popover #popoverInScrollableContainer> </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class ScrollablePopover extends PopoverTest {}

@Component({
  selector: 'test-popover-within-rtl-container',
  template: `<div [dir]="direction">
      <button
        [nxPopoverTriggerFor]="popoverHover"
        nxPopoverDirection="right"
        nxPopoverTrigger="click"
        [closeOnClickOutside]="closeable"
      >
        Directionality
      </button>
    </div>

    <nx-popover #popoverHover> </nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverWithinRTLContainer extends PopoverTest {
  direction: Direction = 'rtl';
}

@Component({
  selector: 'test-i18n-test',
  template: `<button [nxPopoverTriggerFor]="popover">Click</button
    ><nx-popover #popover></nx-popover>`,
  providers: [
    {
      provide: NxPopoverIntl,
      useValue: { closeIconLabel: 'custom close label', changes: new Subject() },
    },
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class I18nTest extends PopoverTest {}

@Component({
  selector: 'test-popover-div-trigger',
  template: `<div
      [nxPopoverTriggerFor]="popoverClick"
      nxPopoverTrigger="click"
      tabindex="1"
      class="trigger"
    >
      Div
    </div>
    <nx-popover #popoverClick>Content</nx-popover><button></button>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverDivTrigger extends PopoverTest {}

@Component({
  selector: 'test-popover-keyboard',
  template: `
    @if (triggerElement === 'button') {
      <button class="trigger" [nxPopoverTriggerFor]="popover" nxPopoverTrigger="click">
        Trigger
      </button>
    } @else {
      <div class="trigger" tabindex="0" [nxPopoverTriggerFor]="popover" nxPopoverTrigger="click">
        Trigger
      </div>
    }
    <input aria-label="outside" />
    <div style="height: 300vh"></div>
    <nx-popover #popover>
      <span>Content</span>
    </nx-popover>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPopoverModule],
})
class PopoverKeyboardComponent extends PopoverTest {
  triggerElement: 'button' | 'div' = 'button';
}

@Component({
  selector: 'test-shadow-dom-input',
  template: `<input aria-label="inside shadow DOM" />`,
  encapsulation: ViewEncapsulation.ShadowDom,
})
class ShadowDomInputComponent {}

@Component({
  selector: 'test-popover-with-shadow-dom-content',
  template: `
    <button class="trigger" [nxPopoverTriggerFor]="popover" nxPopoverTrigger="click">
      Trigger
    </button>
    <nx-popover #popover>
      <test-shadow-dom-input />
    </nx-popover>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPopoverModule, ShadowDomInputComponent],
})
class PopoverWithShadowDomContentComponent extends PopoverTest {}

@Component({
  selector: 'test-nested-popover',
  template: `
    <button
      class="trigger"
      #outer="nxPopoverTrigger"
      [nxPopoverTriggerFor]="outerPopover"
      nxPopoverTrigger="click"
    >
      Outer
    </button>
    <nx-popover #outerPopover>
      <ng-template nxPopoverContent>
        <button class="inner-trigger" [nxPopoverTriggerFor]="innerPopover" nxPopoverTrigger="click">
          Inner
        </button>
      </ng-template>
    </nx-popover>
    <nx-popover #innerPopover>
      <span>Inner content</span>
    </nx-popover>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPopoverModule],
})
class NestedPopoverComponent {
  @ViewChild('outer') outer!: NxPopoverTriggerDirective;
}

@Component({
  selector: 'test-popover-width-component',
  template: `<button
      [nxPopoverTriggerFor]="popoverPropertyWidth"
      nxPopoverTrigger="click"
      [nxPopoverWidth]="popoverWidth"
      [nxPopoverMaxWidth]="popoverMaxWidth"
    >
      Click
    </button>

    <nx-popover #popoverPropertyWidth></nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverWidthComponent extends PopoverTest {}

@Component({
  selector: 'test-popover-default-width-component',
  template: `<button [nxPopoverTriggerFor]="popoverDefaultWidth" nxPopoverTrigger="click">
      Click
    </button>

    <nx-popover #popoverDefaultWidth></nx-popover>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
})
class PopoverDefaultWidthComponent extends PopoverTest {}
