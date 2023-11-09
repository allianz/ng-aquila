import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { Component, Directive, Type, ViewChild, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { Subject, Subscription } from 'rxjs';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxPopoverComponent } from './popover.component';
import { NxPopoverModule } from './popover.module';
import { NxPopoverIntl } from './popover-intl';
import { NxPopoverTriggerDirective, POPOVER_DEFAULT_OPTIONS, PopoverDefaultOptions } from './popover-trigger.directive';

const popoverDefaultOptions: PopoverDefaultOptions = {
    popoverWidth: '',
    popoverMaxWidth: '',
};

@Component({
    selector: 'nx-test-component',
    template: '<span>This is a test component</span>',
})
class NxTestComponent {}

@Directive()
abstract class PopoverTest {
    @ViewChild(NxPopoverComponent) popoverInstance!: NxPopoverComponent;
    @ViewChild(NxPopoverTriggerDirective) triggerInstance!: NxPopoverTriggerDirective;
    @ViewChild(NxTestComponent) testComponentInstance!: NxTestComponent;

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

    function createTestComponent(component: Type<PopoverTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        popoverInstance = testInstance.popoverInstance;
        triggerInstance = testInstance.triggerInstance;
        buttonNativeElement = fixture.debugElement.query(By.css('button'))?.nativeElement as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [OverlayModule, NxPopoverModule, NxFormfieldModule, NxInputModule],
            declarations: [
                PopoverShowClose,
                PopoverHideClose,
                PopoverHoverComponent,
                PopoverClickComponent,
                PopoverHideCloseForClick,
                ModalPopover,
                LazyloadContent,
                NxTestComponent,
                PopoverFallBackComponent,
                ManualTrigger,
                ClickOnDocument,
                ScrollablePopover,
                PopoverWithinRTLContainer,
                PopoverClickShadowDomComponent,
                I18nTest,
                PopoverDivTrigger,
                PopoverHoverFormfieldComponent,
                PopoverWidthComponent,
                PopoverDefaultWidthComponent,
            ],
            providers: [{ provide: POPOVER_DEFAULT_OPTIONS, useValue: popoverDefaultOptions }],
        });

        // Simple trick to simulate that the user is using `preserveWhitespaces: true`
        // as we had a bug with it. (see ngx-ndbx #3215)
        // This shouldn't be an issue for the tests as they should work regardless,
        // but it would indicate quickly if something is wrong
        TestBed.overrideComponent(NxPopoverComponent, {
            set: {
                preserveWhitespaces: true,
            },
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
        return overlayContainer.getContainerElement().querySelector('.nx-popover__close-icon') as HTMLSpanElement;
    }

    function getPopoverArrow(): HTMLDivElement {
        return overlayContainer.getContainerElement().querySelector('.nx-popover__arrow') as HTMLDivElement;
    }

    function getPopoverByDirection(direction: any): HTMLDivElement {
        return overlayContainer.getContainerElement().querySelector('.nx-popover--' + direction) as HTMLDivElement;
    }

    function getPopoverContent(): HTMLDivElement {
        return overlayContainer.getContainerElement().querySelector('.nx-popover__content') as HTMLDivElement;
    }

    function getOverlayPane(): HTMLDivElement {
        return overlayContainer.getContainerElement().querySelector('.cdk-overlay-pane') as HTMLDivElement;
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
        return overlayContainer.getContainerElement().querySelector('.cdk-overlay-backdrop') as HTMLElement;
    }

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
            const focusTrapAnchors = overlayContainer.getContainerElement().querySelectorAll('.cdk-focus-trap-anchor');
            expect(focusTrapAnchors.length).toBe(0);
        }));

        it('popover should not have focus', fakeAsync(() => {
            createTestComponent(PopoverShowClose);
            hover();
            expect(overlayContainer.getContainerElement().contains(document.activeElement)).toBeFalse();
        }));

        it('should support display to left', fakeAsync(() => {
            createTestComponent(PopoverHoverComponent);
            triggerInstance.direction = 'left';
            hover();
            expect(getPopoverByDirection('left')).toBeTruthy();
        }));

        it('should support display to top', fakeAsync(() => {
            createTestComponent(PopoverHoverComponent);
            triggerInstance.direction = 'top';
            hover();
            expect(getPopoverByDirection('top')).toBeTruthy();
        }));

        it('should support display to bottom', fakeAsync(() => {
            createTestComponent(PopoverHoverComponent);
            triggerInstance.direction = 'bottom';
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
            const spy = jasmine.createSpy('closed spy');

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
            const focusTrapAnchors = overlayContainer.getContainerElement().querySelectorAll('.cdk-focus-trap-anchor');
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
            const spy = jasmine.createSpy('closed spy');

            const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);

            click();
            document.body.dispatchEvent(new MouseEvent('click'));
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
            flush();
        }));

        it('should emit closed event on trigger click', fakeAsync(() => {
            createTestComponent(PopoverClickComponent);
            const spy = jasmine.createSpy('closed spy');

            const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);
            click();
            click();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        }));

        it('should emit closed event on close icon click', fakeAsync(() => {
            createTestComponent(PopoverClickComponent);

            const spy = jasmine.createSpy('closed spy');
            const subscription: Subscription = testInstance.popoverInstance.closed.subscribe(spy);

            click();
            getCloseIcon().click();
            flush();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        }));

        it('should emit closed event when overlay is clicked', fakeAsync(() => {
            createTestComponent(PopoverClickComponent);

            const spy = jasmine.createSpy('closed spy');
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
    });

    describe('keyboard', () => {
        it('should open popover by space key', fakeAsync(() => {
            createTestComponent(PopoverClickComponent);
            buttonNativeElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: SPACE, which: SPACE }));

            fixture.detectChanges();
            flush();

            checkPopoverOpen(true);
        }));

        it('should open popover by enter key', fakeAsync(() => {
            createTestComponent(PopoverClickComponent);
            buttonNativeElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: ENTER, which: ENTER }));

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
            const spy = spyOn(keydownEvent, 'preventDefault');
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
            const spy = spyOn(keydownEvent, 'preventDefault');
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
            const spy = jasmine.createSpy('closed spy');

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
        it('should emit a show change event on manual popover with esc key ', fakeAsync(() => {
            createTestComponent(ManualTrigger);
            spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit');
            click();
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(true);

            dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);

            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(false);
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(2);
            flush();
        }));

        it('should emit a show change event on click popover', fakeAsync(() => {
            createTestComponent(PopoverClickComponent);
            spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit');
            click();
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(true);
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(1);
            click();
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(false);
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(2);
        }));

        it('should emit a show change event on hover popover', fakeAsync(() => {
            createTestComponent(PopoverHoverComponent);
            spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit');
            hover();
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(true);
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(1);
            mouseLeave();
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(false);
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(2);
        }));

        it('should emit a show change event on closing due to scroll', fakeAsync(() => {
            createTestComponent(PopoverClickComponent);
            spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit');
            click();
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(true);
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(1);
            dispatchFakeEvent(document, 'scroll');
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledWith(false);
            expect(fixture.componentInstance.triggerInstance.changeShow.emit).toHaveBeenCalledTimes(2);
        }));

        it('should be closed on scroll', fakeAsync(() => {
            createTestComponent(ScrollablePopover);
            spyOn(fixture.componentInstance.triggerInstance.changeShow, 'emit');
            const spy = jasmine.createSpy('closed spy');
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
            const closeIcon = overlayContainer.getContainerElement().querySelector('.nx-popover__close-icon') as Element;
            expect(closeIcon.getAttribute('aria-label')).toBe('custom close label');
        }));
    });

    describe('fallbacks', () => {
        it('should support fallback position', fakeAsync(() => {
            createTestComponent(PopoverFallBackComponent);
            triggerInstance.direction = 'right';
            hover();
            expect(getPopoverByDirection('right')).toBeFalsy();
        }));

        it('should support correct arrow position', fakeAsync(() => {
            createTestComponent(PopoverFallBackComponent);
            hover();
            const elementOffsetLeft = Number(getPopoverArrow().style.left.split('p')[0]);
            const expected = Math.round(buttonNativeElement.getBoundingClientRect().left + buttonNativeElement.getBoundingClientRect().width / 2);
            expect(expected).toEqual(Math.round(elementOffsetLeft));
        }));
    });

    describe('Focus states', () => {
        it('Should return back focus after closing popover', fakeAsync(() => {
            createTestComponent(PopoverClickComponent);
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
            createTestComponent(PopoverClickComponent);
            buttonNativeElement.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            await expectAsync(fixture.nativeElement).toBeAccessible();
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
            spyOn(triggerInstance as any, 'closePopover');
            (testInstance as PopoverWithinRTLContainer).direction = 'ltr';
            fixture.detectChanges();
            expect((triggerInstance as any).closePopover).toHaveBeenCalled();
        }));

        it('overlayRef disposed and unset', fakeAsync(() => {
            createTestComponent(PopoverWithinRTLContainer);
            const triggerInstanceWithPrivateAccess = triggerInstance as any;
            click();
            fixture.detectChanges();
            spyOn(triggerInstanceWithPrivateAccess.overlayRef, 'dispose');
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
});

@Component({
    template: `<div style="width: 400px; height: 400px; display: flex; justify-content: center; align-items: center;">
            <button [nxPopoverTriggerFor]="popoverHover" nxPopoverTrigger="hover" [nxPopoverCloseable]="closeable">Hover</button>
        </div>

        <nx-popover #popoverHover>
            <span>Content</span>
        </nx-popover>`,
})
class PopoverHoverComponent extends PopoverTest {}
@Component({
    template: `<div style="width: 400px; height: 400px; display: flex; justify-content: center; align-items: center;">
            <nx-formfield label="Label" [nxPopoverTriggerFor]="popoverHover" nxPopoverTrigger="hover">
                <input nxInput />
            </nx-formfield>
        </div>

        <nx-popover #popoverHover>
            <span>Content</span>
        </nx-popover>`,
})
class PopoverHoverFormfieldComponent extends PopoverTest {}

@Component({
    template: `<div>
            <button [nxPopoverTriggerFor]="popoverHover" nxPopoverDirection="right" nxPopoverTrigger="click">Hover</button>
        </div>

        <nx-popover #popoverHover>
            <span>Content</span>
        </nx-popover>`,
})
class PopoverClickComponent extends PopoverTest {}

@Component({
    template: `<div>
            <button [nxPopoverTriggerFor]="popoverHover" nxPopoverDirection="right" nxPopoverTrigger="click">Hover</button>
        </div>

        <button class="other">Other button</button>

        <nx-popover #popoverHover>
            <span>Content</span>
        </nx-popover>`,
    encapsulation: ViewEncapsulation.ShadowDom,
})
class PopoverClickShadowDomComponent extends PopoverTest {}

@Component({
    template: `<div>
            <button [nxPopoverTriggerFor]="popoverHover" nxPopoverDirection="right" nxPopoverTrigger="hover" [nxPopoverCloseable]="true">Hover</button>
        </div>

        <nx-popover #popoverHover>
            <span>Content</span>
        </nx-popover>`,
})
class PopoverShowClose extends PopoverTest {}

@Component({
    template: `<div>
            <button [nxPopoverTriggerFor]="popoverHover" nxPopoverDirection="right" nxPopoverTrigger="hover" [nxPopoverCloseable]="false">Hover</button>
        </div>

        <nx-popover #popoverHover>
            <span>Content</span>
        </nx-popover>`,
})
class PopoverHideClose extends PopoverTest {}

@Component({
    template: `<div>
            <button [nxPopoverTriggerFor]="popoverHover" nxPopoverDirection="right" nxPopoverTrigger="click" [nxPopoverCloseable]="false">Hover</button>
        </div>

        <nx-popover #popoverHover>
            <span>Content</span>
        </nx-popover>`,
})
class PopoverHideCloseForClick extends PopoverTest {}

@Component({
    template: `<div>
            <button [nxPopoverTriggerFor]="popoverHover" nxPopoverDirection="right" nxPopoverTrigger="hover" [nxPopoverCloseable]="false">Hover</button>
        </div>

        <nx-popover #popoverHover>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s.
        </nx-popover>`,
})
class PopoverFallBackComponent extends PopoverTest {}

@Component({
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
})
class ModalPopover extends PopoverTest {
    closable = true;
}

@Component({
    template: `
        <button [nxPopoverTriggerFor]="popoverLazyloadContent" nxPopoverTrigger="click">click</button>

        <nx-popover #popoverLazyloadContent>
            <ng-template nxPopoverContent>
                <nx-test-component></nx-test-component>
            </ng-template>
        </nx-popover>
    `,
})
class LazyloadContent extends PopoverTest {}

@Component({
    template: `
        <button
            #popoverTrigger="nxPopoverTrigger"
            nxButton="primary small"
            [nxPopoverTriggerFor]="popoverManual"
            [nxPopoverShow]="popoverManualOpenFlag"
            (nxPopoverShowChange)="popoverOnShowChange($event)"
            nxPopoverDirection="top"
            (click)="popoverManualOpenFlag = !popoverManualOpenFlag"
            nxPopoverTrigger="manual"
        >
            Manual
        </button>

        <nx-popover #popoverManual>
            <div><span>Trigger manually</span></div>
        </nx-popover>
    `,
})
class ManualTrigger extends PopoverTest {
    popoverManualOpenFlag = false;

    popoverOnShowChange(current: any) {
        setTimeout(() => (this.popoverManualOpenFlag = !current));
    }
}

@Component({
    template: `<div>
            <button [nxPopoverTriggerFor]="popoverHover" nxPopoverDirection="right" nxPopoverTrigger="click" [closeOnClickOutside]="closable">Hover</button>
        </div>

        <nx-popover #popoverHover> </nx-popover>`,
})
class ClickOnDocument extends PopoverTest {
    closable = true;
}

@Component({
    template: `<div cdkScrollable class="scrollWindow" style="padding: 100px; margin: 300px;height: 200px; width: 200px; overflow: auto;">
            <button [nxPopoverTriggerFor]="popoverInScrollableContainer" nxPopoverTrigger="click">Click</button>
        </div>

        <nx-popover #popoverInScrollableContainer> </nx-popover>`,
})
class ScrollablePopover extends PopoverTest {}

@Component({
    template: `<div [dir]="direction">
            <button [nxPopoverTriggerFor]="popoverHover" nxPopoverDirection="right" nxPopoverTrigger="click" [closeOnClickOutside]="closable">
                Directionality
            </button>
        </div>

        <nx-popover #popoverHover> </nx-popover>`,
})
class PopoverWithinRTLContainer extends PopoverTest {
    direction = 'rtl';
}

@Component({
    template: `<button [nxPopoverTriggerFor]="popover">Click</button><nx-popover #popover></nx-popover>`,
    providers: [
        {
            provide: NxPopoverIntl,
            useValue: { closeIconLabel: 'custom close label', changes: new Subject() },
        },
    ],
})
class I18nTest extends PopoverTest {}

@Component({
    template: `<div [nxPopoverTriggerFor]="popoverClick" nxPopoverTrigger="click" tabindex="1" class="trigger">Div</div>
        <nx-popover #popoverClick>Content</nx-popover><button></button>`,
})
class PopoverDivTrigger extends PopoverTest {}

@Component({
    template: `<button
            [nxPopoverTriggerFor]="popoverPropertyWidth"
            nxPopoverTrigger="click"
            [nxPopoverWidth]="popoverWidth"
            [nxPopoverMaxWidth]="popoverMaxWidth"
        >
            Click
        </button>

        <nx-popover #popoverPropertyWidth></nx-popover>`,
})
class PopoverWidthComponent extends PopoverTest {}

@Component({
    template: `<button [nxPopoverTriggerFor]="popoverDefaultWidth" nxPopoverTrigger="click">Click</button>

        <nx-popover #popoverDefaultWidth></nx-popover>`,
})
class PopoverDefaultWidthComponent extends PopoverTest {}
